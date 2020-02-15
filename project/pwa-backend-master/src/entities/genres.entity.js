import BaseEntityFactory from "../factory/base.entity";
import DBConstants from "../constants/DBConstants";
import { getDBCollection } from "../connection";

const { GENRES_COLLECTION } = DBConstants;

class GenreEntity extends BaseEntityFactory {
  constructor() {
    super(getDBCollection(GENRES_COLLECTION));
  }
  async getAll() {
    return this.collection.find().toArray();
  }
}

export default GenreEntity;
