// implement abl
const UserDao = require("../../dao/user-dao");
const path = require("path");

let dao = new UserDao();

async function ListAllAbl(req, res) {
  const user = await dao.list();

  res.json(user);
}

module.exports = ListAllAbl;
