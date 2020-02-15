import { MongoClient, ObjectId } from 'mongodb';
let dbConnection = undefined;

export const configureMongoClient = async() => {
    console.log(process.env.MONGODB_URL);
    const connnection = await MongoClient.connect(process.env.MONGODB_URL);
    dbConnection = connnection.db('hearbk');
};

export const getDBCollection = (collectionName) => dbConnection.collection(collectionName);

export const getObjectId = id => ObjectId(id);
