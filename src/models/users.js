const Pool = require("../config/db");

const findEmail = (email) => {
  return Pool.query(`SELECT * FROM users WHERE email='${email}'`);
};

const findUsername = (username) => {
  return Pool.query(`select * from users where username='${username}'`);
};

const create = (data) => {
  const { id, email, passwordHash, name, role, phone } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users(id,email,password,name,role,phone) VALUES('${id}','${email}','${passwordHash}','${name}','${role}','${phone}')`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const updateAccount = (email, name, genderLowerCase, phone, date_of_birth, picture, role) => {
  return Pool.query(` update users set name='${name}',  gender='${genderLowerCase}', phone='${phone}', date_of_birth='${date_of_birth}', picture='${picture}', role='${role}' where email='${email}'`);
};

const updateNoPict = (email, name, genderLowerCase, phone, date_of_birth, role) => {
  return Pool.query(` update users set name='${name}',  gender='${genderLowerCase}', phone='${phone}', date_of_birth='${date_of_birth}', role='${role}' where email='${email}'`);
};

const changeEmailAccount = (email, emailBody) => {
  return Pool.query(`update users set email='${emailBody}' where email='${email}'`);
};

const changePassword = (email, passwordNewHash) => {
  return Pool.query(`update users set password='${passwordNewHash}' where email='${email}'`);
};

const deleteAccount = (email) => {
  return Pool.query(`delete from users where email='${email}'`);
};

module.exports = {
  findEmail,
  findUsername,
  create,
  updateAccount,
  updateNoPict,
  changeEmailAccount,
  changePassword,
  deleteAccount,
};
