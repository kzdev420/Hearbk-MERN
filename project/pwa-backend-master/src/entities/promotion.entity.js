import BaseEntityFactory from "../factory/base.entity";
import DBConstants from "../constants/DBConstants";
import { getDBCollection } from "../connection";

const { PROMOTION_COLLECTION } = DBConstants;

class PromotionEntity extends BaseEntityFactory {
  constructor() {
    super(getDBCollection(PROMOTION_COLLECTION));
  }
  async updateTimesUsed(promoCode) {
    return await this.collection.updateOne(
      { code: promoCode },
      {
        $inc: {
          timesUsed: 1,
        },
      }
    );
  }
}

export default PromotionEntity;
