import { string, number, date, object, array, bool } from "yup";
import { GENDER_ENUM, USER_FEEDBACK_TYPE } from "../constants/EnumsConstants";
import { validateSchema } from "../utilities";
import BaseEntityFactory from "../factory/base.entity";
import DBConstants from "../constants/DBConstants";
import { getDBCollection } from "../connection";

const { USERS_COLLECTION } = DBConstants;

const BaseUserSchema = {
  email: string().email().required(),
  display_name: string().required(),
  gender: string().oneOf(GENDER_ENUM),
  date_of_birth: date(),
  headline: string(),
  price: number(),
  country: string(),
  city: string(),
  profile_image: string(),
  user_name: string().required(),
  user_stripe_id: string(),
  listener_tags: array().of(string().length(24)),
  favourite_genres: array().of(string().length(24)),
};

const NewUserSchema = object({
  ...BaseUserSchema,
  password: string().required(),
});

const UpdateUserSchema = object({
  display_name: string(),
  gender: string().oneOf(GENDER_ENUM),
  date_of_birth: date(),
  headline: string(),
  price: number(),
  country: string(),
  city: string(),
  profile_image: string(),
  user_name: string(),
  user_stripe_id: string(),
  premiumSubscriptionId: string(),
  subscriptionEndDate: string(),
  listener_tags: array().of(string().length(24)),
  favourite_genres: array().of(string().length(24)),
  feedback_type: array().of(string().oneOf(USER_FEEDBACK_TYPE)),
  isFirstUserLogin: bool(),
});

class User extends BaseEntityFactory {
  constructor() {
    super(getDBCollection(USERS_COLLECTION));
  }
  validateNewUserSchema(doc) {
    return validateSchema(doc, NewUserSchema);
  }
  validateUserUpdateSchema(doc) {
    return validateSchema(doc, UpdateUserSchema);
  }
  async updateUser(userEmail, doc) {
    const isValidSchema = this.validateUserUpdateSchema(doc);
    if (isValidSchema) {
      this.updateOne({ email: userEmail }, doc);
    } else {
      console.log("Invalid request");
      throw Error("request invalid");
    }
  }
}

export default User;
