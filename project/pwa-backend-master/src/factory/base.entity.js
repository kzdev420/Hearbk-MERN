class BaseEntityFactory {
    constructor(collection) {
        this.collection = collection;
    }
    async findOne(query) {
        return await this.collection.findOne(query);
    }
    async find(query) {
        return await this.collection.find(query).toArray();
    }
    async insertOne(query) {
        return await this.collection.insertOne(query);
    }
    async insertMany(query) {
        return await this.collection.insertMany(query);
    }
    async deleteOne(query) {
        return await this.collection.deleteOne(query);
    }
    async deleteMany(query) {
        return await this.collection.deleteMany(query);
    }
    async updateOne(predicate, query) {
        return await this.collection.updateOne(predicate, { $set: query });
    }
    async updateMany(predicate, query) {
        return await this.collection.updateMany(predicate, query);
    }
};

export default BaseEntityFactory;