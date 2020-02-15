import { string, number, date, object } from "yup";
import { GENDER_ENUM, FEEDBACK_TYPE } from "../constants/EnumsConstants";
import { validateSchema } from "../utilities";
import BaseEntityFactory from "../factory/base.entity";
import DBConstants from "../constants/DBConstants";
import { getDBCollection } from "../connection";

const { DISCOVER_COLLECTION } = DBConstants;

const BaseSchema = object({
  feedbackId: string()
    .length(24)
    .required(),
  userId: string()
    .length(24)
    .required(),
  feedbackType: string()
    .oneOf(Object.values(FEEDBACK_TYPE))
    .required(),
});

class DiscoverEntity extends BaseEntityFactory {
  constructor() {
    super(getDBCollection(DISCOVER_COLLECTION));
  }
  async validateNewDiscoverSchema(doc) {
    const isValid = await validateSchema(doc, BaseSchema);
    return isValid;
  }
  async getDiscoversForUser(userId) {
    const discovers = await this.collection.find({ userId }).toArray();
    return discovers;
  }
}

export default DiscoverEntity;
