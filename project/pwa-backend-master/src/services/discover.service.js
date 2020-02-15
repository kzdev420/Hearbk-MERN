import sortBy from "lodash/sortBy";
import DiscoverEntity from "../entities/discover.entity";
import FeedbackEntity from "../entities/feedback.entity";
import { validateToken } from "../utilities/jwt";
import UserEntity from "../entities/user.entity";
import { getObjectId } from "../connection";
import { InvalidRequestError } from "../utilities/errorHandlers";
import { MEDIA_TYPE_ENUM } from "../constants/EnumsConstants";

const getTracksForUser = async ({ _id, favourite_genres }) => {
  const Feedback = new FeedbackEntity();
  const Discover = new DiscoverEntity();
  const discovers = await Discover.getDiscoversForUser(_id.toString());
  let feedbacks = await Feedback.getTracksForDiscover();
  feedbacks = await Promise.all(
    feedbacks
      .filter((feedback) => feedback.userId !== _id.toString())
      .map(async (feedback) => {
        const User = new UserEntity();
        const {
          user_name = null,
          display_name = null,
          profile_image = null,
        } = (await User.findOne({
          _id: getObjectId(feedback.userId),
        })) || {};
        if (
          favourite_genres &&
          favourite_genres.length > 0 &&
          favourite_genres.some((g) => feedback.genreId === g)
        ) {
          feedback.priority = 0;
        }
        if (feedback.mediaType === MEDIA_TYPE_ENUM[0]) {
          let video_id = feedback.trackUrl.split("v=")[1];
          if (video_id) {
            const ampersandPosition = video_id.indexOf("&");
            if (ampersandPosition != -1) {
              video_id = video_id.substring(0, ampersandPosition);
            }
          } else {
            let trackSplitArray = feedback.trackUrl.split("/");
            video_id = trackSplitArray.slice(-1);
          }
          feedback.trackUrl = "https://www.youtube.com/embed/" + video_id;
        }
        return { ...feedback, user_name, display_name, profile_image };
      })
  );
  return sortBy(
    discovers.length > 0
      ? feedbacks.filter(
          (feedback) =>
            !discovers.some((discover) => {
              return discover.feedbackId === feedback._id.toString();
            })
        )
      : feedbacks,
    (f) => f.priority
  );
};

export const getDiscoverService = async (token) => {
  const tokenDetails = await validateToken(token);
  const User = new UserEntity();
  const userDetails = await User.findOne({
    _id: getObjectId(tokenDetails._id),
  });
  return await getTracksForUser(userDetails);
};

export const postDiscoverService = async (payload, token, feedbackId) => {
  const tokenDetails = await validateToken(token);
  const Discover = new DiscoverEntity();
  const Feedback = new FeedbackEntity();
  const isValid = await Discover.validateNewDiscoverSchema({
    ...payload,
    userId: tokenDetails._id,
  });
  if (!isValid) {
    throw new InvalidRequestError();
  }
  const response = await Promise.all[
    (Discover.insertOne({
      ...payload,
      feedbackId,
      userId: tokenDetails._id,
    }),
    Feedback.incrementFeedbacksGive(feedbackId))
  ];
  return response;
};
