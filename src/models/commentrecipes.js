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

const selectPaginationByIdRecipes = ({ limit, offset, sortby, sort, querysearch }) => {
    return Pool.query(`select  commentrecipes.id , commentrecipes.recipes_id , commentrecipes.users_id , commentrecipes.comment ,  commentrecipes.created_on ,  recipes.id as recipes_id ,  recipes.name as recipes_name ,  recipes.users_id as recipes_users_id ,  recipes.description as recipes_description ,  recipes.photo_id as recipes_photo_id ,  recipes.videos_id as recipes_videos_id ,  recipes.category_id as recipes_category_id ,  recipes.created_on as recipes_created_on ,  recipes.updated_on as recipes_update_on , users.email as users_email , users.name as users_name , users.gender as users_gender , users.phone as users_phone , users.date_of_birth as users_date_of_birth , users.picture as users_picture , users.created_on as users_created_on , users.updated_on as users_updated_on  from commentrecipes ${querysearch}  order by ${sortby} ${sort} limit ${limit} offset ${offset} `)
}


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
    countData,
    selectPaginationByIdRecipes
}