const Pool = require('../config/db')
const selectAll = () => {
    return Pool.query(`select * from commentrecipes`);
}

const selectAllSearch = (querysearch) => {
    return Pool.query(`select * from commentrecipes  ${querysearch} `);
}

const selectPagination = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(`select * from commentrecipes  ${querysearch}  order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
}
const selectCommentRecipes = (id) => {
    return Pool.query(`select * from commentrecipes where id='${id}'`);
}

const selectRecipes = (recipes_id) => {
    return Pool.query(`select * from recipes where id='${recipes_id}'`)
}

const selectUsers = (users_id) => {
    return Pool.query(`select * from users where id='${users_id}'`)
}

const insertCommentRecipes = (
    id,
    recipes_id,
    users_id,
    comment
) => {
    return Pool.query(`insert into commentrecipes ( id, recipes_id,  users_id , comment ) values ('${id}', '${recipes_id}', '${users_id}', '${comment}'  )`)
}

const updateCommentRecipes = (
    id, 
    recipes_id, 
    users_id,
    comment
) => {
    return Pool.query(`update commentrecipes set recipes_id = '${recipes_id}' , users_id = '${users_id}' , comment = '${comment}' WHERE id = '${id}'`)
}

const deleteCommentRecipes = (id) => {
    return Pool.query(`delete from commentrecipes where id='${id}'`)
}

const countData = () => {
    return Pool.query("SELECT COUNT(*) FROM commentrecipes");
};

module.exports = {
    selectAll,
    selectAllSearch,
    selectPagination,
    selectCommentRecipes,
    selectUsers,
    selectRecipes,
    insertCommentRecipes,
    updateCommentRecipes,
    deleteCommentRecipes,
    countData
}