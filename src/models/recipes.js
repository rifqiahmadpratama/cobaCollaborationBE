const Pool = require('../config/db')
const selectAll = () => {
    return Pool.query(`select * from recipes`);
}
const selectPagination = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(`select * from recipes ${querysearch} order by ${sortby} ${sort} limit ${limit} offset ${offset}`)
}

const selectRecipes = (id) => {
    return Pool.query(`select * from recipes where id='${id}'`);
}

const insertRecipes = (
    id,
    photo_id,
    name,
    description,
    category_id,
    id_users

) => {
    return Pool.query(`insert into recipes ( id, photo_id, name, description, category_id, id_users )   values ( '${id}' , '${photo_id}' ,  '${name}' , '${description}' , '${category_id}' , '${id_users}' ) `)
}

const updateRecipes = (
    id,
    photo_id,
    name,
    description,
    category_id,
    users_id

) => {
    return Pool.query(`update recipes set photo_id = '${photo_id}' , name = '${name}' , description = '${description}' , category_id = '${category_id}' , id_users = '${users_id}' where id = '${id}' `)
}

const updateRecipesNoPhoto = (
    id,
    name,
    description,
    category_id,
    users_id

) => {
    return Pool.query(`update recipes set name = '${name}' , description = '${description}' , category_id = '${category_id}' , id_users = '${users_id}' where id = '${id}' `)
}

const deleteRecipes = (id) => {
    return Pool.query(`delete from recipes where id='${id}'`)
}

const selectCategory = (category_idLowerCase) => {
    return Pool.query(`select * from category where id='${category_idLowerCase}'`)
}

const selectUsers = (users_id) => {
    return Pool.query(`select * from users where users.id='${users_id}'`)
}

const countData = () => {
    return Pool.query("SELECT COUNT(*) FROM recipes");
};

module.exports = {
    selectAll,
    selectPagination,
    selectRecipes,
    insertRecipes,
    updateRecipes,
    updateRecipesNoPhoto,
    deleteRecipes,
    selectCategory,
    selectUsers,
    countData
}