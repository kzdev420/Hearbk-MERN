import bcrypt from "bcrypt";
import UserEntity from "../entities/user.entity";
import AppConstants from "../constants/AppConstants";
import {
  InternalServerError,
  UnauthorisedRequestError,
  FileUploadError,
  UserExistsError,
  UserDoesnotExistsError,
} from "../utilities/errorHandlers";
import { validateToken, generateAccessToken } from "../utilities/jwt";
import uploadFileToPinnata from "../utilities/ipfsFileUpload";
import { getObjectId } from "../connection";
import { getPaymentMethods } from "../utilities/stripeHelper";

let nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user:"AKIAQDDNFVXG2QOWMJPV", // generated ethereal user
    pass: "BJQA9yM/TL5LcXqs4zjwxjB42UNBj1RKEVTZ5dnlZk0E" // generated ethereal password
  }
});


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

/** reset password */

export const resetpasswordservice = async (userQuery) => {
  const userid = userQuery.id;
  return bcrypt
    .hash(userQuery.password, SALT_ROUNDS)
    .then(async (hash) => {
      const User = new UserEntity();
      const userData = await User.findOne({ userid });
      if (!userData) {
        throw new UserDoesnotExistsError();
      }
      const data = await userData.updateOne({ password: hash });
      return {
        id: data.insertedId,
      };
    })
    .catch((e) => e);
}

/** send reset password link */

export const sendresetpasswordlinkservice = async (userQuery) => {

  const User = new UserEntity();
  const userData = await User.findOne({ email: userQuery.email });
  if(!userData){
    throw new UserDoesnotExistsError();
  }
  const tokenData = await generateAccessToken({
    email: userData.email,
    _id: userData._id.toString(),
  });
  let mailOptions = {
    from: '"<hearbk admin>" admin@hearbk.com',
    to: userQuery.email,
    subject: 'Reset your account password',
    html: '<h4><b>Reset Password</b></h4>' +
    '<p>To reset your password, complete this form:</p>' +
    '<a href=' + 'https://hearbk.com/resetpassword/' + userData.id + '/' + token + '">' + 'https://hearbk.com/resetpassword/' + userData.id + '/' + tokenData + '</a>' +
    '<br><br>' +
    '<p>--Team</p>'
  }

  let mailSent = transporter.sendMail(mailOptions);
  if(mailSent){
    return {
      token: tokenData,
    };
  } else{
    return undefined;
  }
}

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