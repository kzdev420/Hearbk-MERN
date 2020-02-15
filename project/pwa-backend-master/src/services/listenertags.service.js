import ListenerTagsEntity from "../entities/listenertags.entity";


export const getListenerTagsService = async() => {
    const entity = new ListenerTagsEntity();
    return entity.getAll();
};