import { string, number, object, array } from "yup";
import { MEDIA_TYPE_ENUM } from "../constants/EnumsConstants";
import { validateSchema } from "../utilities";
import BaseEntityFactory from "../factory/base.entity";
import DBConstants from "../constants/DBConstants";
import { getDBCollection, getObjectId } from "../connection";
import { InvalidRequestError } from "../utilities/errorHandlers";
import formatISO9075 from "date-fns/formatISO9075";

const BaseSchema = object({
  trackTitle: string().required(),
  mediaType: string()
    .oneOf(MEDIA_TYPE_ENUM)
    .required(),
  trackUrl: string().required(),
  userId: string().required(),
  paymentToken: string().required(),
  numberOfFeedbacks: number()
    .required()
    .default(0),
  genreId: array().of(string().length(24)),
  numberOfFeedbacksGiven: number()
    .required()
    .default(0),
});

const UpdateFeedbackSchema = object({
  trackTitle: string(),
  mediaType: string().oneOf(MEDIA_TYPE_ENUM),
  trackUrl: string().url(),
  paymentToken: string(),
  numberOfFeedbacks: number(),
  numberOfFeedbacksGiven: number(),
  genreId: array().of(string().length(24)),
});

class FeedbackEntity extends BaseEntityFactory {
  constructor() {
    super(getDBCollection(DBConstants.FEEDBACK_COLLECTION));
  }
  async addFeedback(doc) {
    const isValid = await validateSchema(doc, BaseSchema);
    if (isValid) {
      return await this.insertOne(doc);
    } else {
      throw new InvalidRequestError();
    }
  }
  async updateFeedback(feedbackId, doc) {
    const isValid = await validateSchema(doc, UpdateFeedbackSchema);
    if (isValid) {
      return await this.updateOne({ _id: getObjectId(feedbackId) }, doc);
    } else {
      throw new InvalidRequestError();
    }
  }
  async getTracksForDiscover() {
    const tracks = await this.collection.find().toArray();
    return tracks.filter((track) =>
      track.numberOfFeedbacksGiven
        ? track.numberOfFeedbacks > track.numberOfFeedbacksGiven
        : true
    );
  }
  async incrementFeedbacksGive(feedbackId) {
    return await this.collection.updateOne(
      { _id: getObjectId(feedbackId) },
      {
        $inc: {
          numberOfFeedbacksGiven: 1,
        },
        $set: {
          updated_on: formatISO9075(Date.now()),
        },
      }
    );
  }
}

export default FeedbackEntity;
