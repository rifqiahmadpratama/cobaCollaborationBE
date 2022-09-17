const Pool = require('../config/db')
const selectAll = () => {
    return Pool.query(`select * from savedrecipes`);
}

const selectPagination = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(`select * from savedrecipes  ${querysearch}  order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
}
const selectSavedRecipes = (id) => {
    return Pool.query(`select * from savedrecipes where id='${id}'`);
}

const selectRecipes = (id_recipes) => {
    return Pool.query(`select * from recipes where id='${id_recipes}'`)
}

const selectUsers = (id_users) => {
    return Pool.query(`select * from users where id='${id_users}'`)
}

const insertSavedRecipes = (
    id,
    id_recipes,
    id_users
) => {
    return Pool.query(`insert into savedrecipes ( id, id_recipes,  id_users ) values ('${id}', '${id_recipes}', '${id_users}'  )`)
}

const updateSavedRecipes = (
    id, id_recipes, id_users
) => {
    return Pool.query(`update savedrecipes set id_recipes = '${id_recipes}' , id_users = '${id_users}' WHERE id = '${id}'`)
}

const deleteSavedRecipes = (id) => {
    return Pool.query(`delete from savedrecipes where id='${id}'`)
}

module.exports = {
    selectAll,
    selectPagination,
    selectSavedRecipes,
    selectUsers,
    selectRecipes,
    insertSavedRecipes,
    updateSavedRecipes,
    deleteSavedRecipes
}