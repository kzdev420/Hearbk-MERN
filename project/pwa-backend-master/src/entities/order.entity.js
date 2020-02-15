import { string, number, date, object } from "yup";
import { validateSchema } from "../utilities";
import BaseEntityFactory from "../factory/base.entity";
import DBConstants from "../constants/DBConstants";
import { getDBCollection } from "../connection";

const { ORDERS_COLLECTION } = DBConstants;

class OrderEntity extends BaseEntityFactory {
  constructor() {
    super(getDBCollection(ORDERS_COLLECTION));
  }
}

export default OrderEntity;
