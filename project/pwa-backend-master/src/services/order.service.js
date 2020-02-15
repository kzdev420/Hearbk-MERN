import addYears from "date-fns/addYears";
import formatISO9075 from "date-fns/formatISO9075";
import User from "../entities/user.entity";
import { validateToken } from "../utilities/jwt";
import {
  DetachPaymentError,
  PaymentError,
  FileUploadError,
} from "../utilities/errorHandlers";
import FeedbackEntity from "../entities/feedback.entity";
import DiscoverEntity from "../entities/discover.entity";
import { MEDIA_TYPE_ENUM, FEEDBACK_TYPE } from "../constants/EnumsConstants";
import uploadFileToPinnata from "../utilities/ipfsFileUpload";
import {
  createPaymentMethod,
  createStripeCustomer,
  createPremiumSubscription,
  detachPaymentMethod,
} from "../utilities/stripeHelper";
import PromotionEntity from "../entities/promotion.entity";
import UserPromotionEntity from "../entities/userpromotions.entity";

const submitStripePayment = async (payload, token) => {
  const stripeObj = require("stripe")(process.env.STRIPE_KEY);
  const { saveCardDetails, paymentToken, isAddPremium } = payload;
  const user = new User();
  const { email } = await validateToken(token);
  let { user_stripe_id = undefined } = await user.findOne({
    email,
  });
  if (saveCardDetails || isAddPremium) {
    if (user_stripe_id) {
      await createPaymentMethod(paymentToken, user_stripe_id);
    } else {
      const { id } = await createStripeCustomer(email, paymentToken);
      const updateUserCall = await user.updateUser(email, {
        user_stripe_id: id,
      });
      user_stripe_id = id;
    }
    if (isAddPremium) {
      const subscriptionRes = await createPremiumSubscription(user_stripe_id);
      const updateUserCall = await user.updateUser(email, {
        premiumSubscriptionId: subscriptionRes.id,
        subscriptionEndDate: addYears(Date.now(), 1).toISOString(),
      });
    }
  }
  let response;
  if (payload.paymentFromSaveCard && user_stripe_id) {
    response = await stripeObj.paymentIntents.create({
      confirm: true,
      amount: payload.amount * 100,
      currency: payload.currency,
      payment_method: payload.paymentToken,
      customer: user_stripe_id,
    });
  } else {
    response = await stripeObj.charges.create({
      amount: payload.amount * 100,
      currency: payload.currency,
      description: payload.description,
      ...(saveCardDetails || isAddPremium
        ? { customer: user_stripe_id }
        : { source: payload.paymentToken }),
    });
  }
  return response;
};

const addTracksToFeedbacks = async (tracks, paymentToken, userId) => {
  const feedbackIdsArray = await Promise.all(
    tracks.map(async (track) => {
      const FILE_UPLOAD = MEDIA_TYPE_ENUM[1];
      const feedBackEntity = new FeedbackEntity();
      const newFeedbackAdded = await feedBackEntity.addFeedback({
        trackTitle: track.trackTitle,
        created_on: formatISO9075(Date.now()),
        mediaType: track.mediaType,
        paymentToken: paymentToken,
        userId,
        genreId: track.genreId,
        numberOfFeedbacks: track.selectedFeedback === 1 ? 10 : 100,
        trackUrl:
          track.mediaType === FILE_UPLOAD
            ? "http://dummyurltobeadded.com"
            : track.trackUrl,
      });
      return {
        feedbackId: newFeedbackAdded.insertedId.toString(),
        trackId: track.id,
      };
    })
  );
  return feedbackIdsArray;
};

export const detachPaymentService = async (payload, token) => {
  try {
    const tokenDetails = await validateToken(token);
    const detachResponse = await detachPaymentMethod(payload);
    return detachResponse;
  } catch (e) {
    throw new DetachPaymentError(e);
  }
};

export const postOrderForFeedbackService = async (payload, token) => {
  try {
    const tokenDetails = await validateToken(token);
    const { tracks, paymentToken, promoCode } = payload;
    if (payload.promoCode) {
      const PromoEntity = new PromotionEntity();
      const UserPromotion = new UserPromotionEntity();
      const promo = await PromoEntity.findOne({ code: promoCode });
      if (promo && promo.maxUsage > promo.timesUsed) {
        const usedPromotionsByUser = await UserPromotion.find({
          promoCode,
          userId: tokenDetails._id,
        });
        if (usedPromotionsByUser.length < promo.maxUsagePerUser) {
          Promise.all([
            UserPromotion.insertOne({
              promoCode,
              userId: tokenDetails._id,
              created_on: formatISO9075(Date.now()),
            }),
            PromoEntity.updateTimesUsed(promoCode),
          ]);
          return await addTracksToFeedbacks(
            tracks,
            paymentToken,
            tokenDetails._id
          );
        }
        else {
          throw new PaymentError();
        }
      } else {
        throw new PaymentError();
      }
    }
    const postPaymentResponse = await submitStripePayment(payload, token);
    return await addTracksToFeedbacks(tracks, paymentToken, tokenDetails._id);
  } catch (e) {
    throw new PaymentError(e);
  }
};

export const uploadTrackForFeedbackService = async (
  fileToUpload,
  feedbackId
) => {
  try {
    const pinataIPFSUpload = await uploadFileToPinnata(fileToUpload);
    const feedBackEntity = new FeedbackEntity();
    return feedBackEntity.updateFeedback(feedbackId, {
      trackUrl: `https://gateway.pinata.cloud/ipfs/${pinataIPFSUpload.IpfsHash}`,
    });
  } catch (e) {
    throw new FileUploadError(e);
  }
};

export const getOrderHistoryService = async (token) => {
  const tokenDetails = await validateToken(token);
  const Discover = new DiscoverEntity();
  const Feedback = new FeedbackEntity();
  const feedbacks = await Feedback.find({ userId: tokenDetails._id });
  let totalListeners = 0;
  let hitCount = 0;
  const feedbackHistory = await Promise.all(
    feedbacks.map(async (feedback) => {
      const discoversForTrack = await Discover.find({
        feedbackId: feedback._id.toString(),
      });
      totalListeners = totalListeners + discoversForTrack.length;
      const hitPercentage =
        discoversForTrack.filter((d) => d.feedbackType === FEEDBACK_TYPE.HIT)
          .length / discoversForTrack.length;
      const missPercentage =
        discoversForTrack.filter((d) => d.feedbackType === FEEDBACK_TYPE.MISS)
          .length / discoversForTrack.length;
      const potentialPercentage =
        discoversForTrack.filter(
          (d) => d.feedbackType === FEEDBACK_TYPE.POTENTIAL
        ).length / discoversForTrack.length;
      if (hitPercentage * 100 > 50) {
        hitCount++;
      }
      return {
        id: feedback._id.toString(),
        trackTitle: feedback.trackTitle,
        stats: {
          hit: hitPercentage * 100,
          miss: missPercentage * 100,
          potential: potentialPercentage * 100,
        },
        listenersCount: discoversForTrack.length,
        created_on: feedback.created_on,
        updated_on: feedback.updated_on,
      };
    })
  );
  return {
    campaign: feedbacks.length,
    totalListeners,
    hitRate: (hitCount / feedbacks.length) * 100,
    trackStats: feedbackHistory,
  };
};
