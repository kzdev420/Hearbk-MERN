import bcrypt from "bcrypt";
import UserEntity from "../entities/user.entity";
import AppConstants from "../constants/AppConstants";
import {
  InternalServerError,
  UnauthorisedRequestError,
  FileUploadError,
  UserExistsError,
} from "../utilities/errorHandlers";
import { validateToken, generateAccessToken } from "../utilities/jwt";
import uploadFileToPinnata from "../utilities/ipfsFileUpload";
import { getObjectId } from "../connection";
import { getPaymentMethods } from "../utilities/stripeHelper";
const { SALT_ROUNDS } = AppConstants;

export const getUserDetails = async () => {
  const User = new UserEntity();
  const { _id } = await validateToken(userToken);
  const userDetails = await User.findOne({ _id });
  return userDetails;
};

export const validateUserTokenService =  async(token) => {
    const tokenDetails =  await validateToken(token);
    return tokenDetails;
};

/**Register new user */
export const registerUserService = async (payload) => {
  return bcrypt
    .hash(payload.password, SALT_ROUNDS)
    .then(async (hash) => {
      const User = new UserEntity();
      const existingUser = await User.findOne({ email: payload.email });
      if (existingUser) {
        throw new UserExistsError();
      }
      const data = await User.insertOne({ ...payload, password: hash });
      return {
        id: data.insertedId,
      };
    })
    .catch((e) => e);
};

/** Authorise User */
export const authoriseUserService = async (userQuery) => {
  const User = new UserEntity();
  const userData = await User.findOne({ email: userQuery.email });
  let password = userData.password;
  if (password.startsWith("$2y")) {
    console.log("Password replaced");
    password = password.replace(/\$2y/, "$2a");
  }
  return bcrypt.compare(userQuery.password, password).then(async (res) => {
    if (res) {
      const tokenData = await generateAccessToken({
        email: userData.email,
        _id: userData._id.toString(),
      });
      return {
        token: tokenData,
        isPremiumUser: !!userData.premiumSubscriptionId,
        isFirstUserLogin: userData.isFirstUserLogin !== undefined ? userData.isFirstUserLogin : true,
      };
    } else {
      throw new UnauthorisedRequestError("Invalid password");
    }
  });
};

/** update user details */

export const updateUserService = async (userToken, updateData) => {
  const User = new UserEntity();
  try {
    const { email } = await validateToken(userToken);
    return await User.updateUser(email, { ...updateData, isFirstUserLogin: false });
  } catch (e) {
    throw new InternalServerError(e);
  }
};

export const uploadUserProfileImageService = async (fileToUpload, payload) => {
  try {
    const pinataFileUploadResponse = await uploadFileToPinnata(fileToUpload);
    const userEntity = new UserEntity();
    const { id } = payload;
    return await userEntity.updateOne(
      { _id: getObjectId(id) },
      {
        profile_image: `https://gateway.pinata.cloud/ipfs/${pinataFileUploadResponse.IpfsHash}`,
      }
    );
  } catch (e) {
    throw new FileUploadError(e);
  }
};

export const getUserPaymentMethodsService = async (token) => {
  const User = new UserEntity();
  const { _id } = await validateToken(token);
  const { user_stripe_id: userStripeId } = await User.findOne({
    _id: getObjectId(_id),
  });
  const response = await getPaymentMethods(userStripeId);
  if (response.data && response.data.length > 0) {
    return response.data.map((cardDetails) => ({
      paymentId: cardDetails.id,
      cardDetails: {
        brand: cardDetails.card.brand,
        last4: cardDetails.card.last4,
      },
    }));
  } return [];
};

export const getUserDetailsService = async (token) => {
  try {
    const User = new UserEntity();
    const { _id } = await validateToken(token);
    const userDetails = await User.findOne({ _id: getObjectId(_id) });
    delete userDetails.password;
    return userDetails;
  } catch (e) {
    throw new InternalServerError(e);
  }
};