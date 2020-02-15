import { string, number, date, object  } from 'yup';
import { GENDER_ENUM } from '../constants/EnumsConstants';
import { validateSchema } from '../utilities';
import BaseEntityFactory from '../factory/base.entity';
import DBConstants from '../constants/DBConstants';
import { getDBCollection } from '../connection';

const { LISTERNER_TAGS_COLLECTION } = DBConstants;

class ListenerTagsEntity extends BaseEntityFactory {
    constructor() {
        super(getDBCollection(LISTERNER_TAGS_COLLECTION));
    }
    async getAll() {
        return this.collection.find().toArray();
    }
};

export default ListenerTagsEntity;