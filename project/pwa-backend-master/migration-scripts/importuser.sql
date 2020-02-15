-- QUERY TO IMPORT USERS FROM MYSQL DATABASE --

SELECT
    users.password,
    users.email,
    listeners.display_name,
    listeners.gender,
    listeners.date_of_birth,
    listeners.headline,
    listeners.bio,
    listeners.price,
    listeners.country,
    listeners.state,
    listeners.city,
    listeners.profile_image,
    listeners.user_name
FROM
    users
    INNER JOIN listeners ON users.id = listeners.user_id;