import BaseEntityFactory from "../factory/base.entity";
import DBConstants from "../constants/DBConstants";
import { getDBCollection } from "../connection";

const { USER_PROMOTION } = DBConstants;

class UserPromotionEntity extends BaseEntityFactory {
    constructor() {
        super(getDBCollection(USER_PROMOTION));
    }
}

export default UserPromotionEntity;