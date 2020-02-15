import GenreEntity from "../entities/genres.entity";


export const getGenresService = async() => {
    const genreEntity = new GenreEntity();
    return genreEntity.getAll();
};