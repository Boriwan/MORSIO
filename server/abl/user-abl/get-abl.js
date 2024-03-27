const UserDao = require("../../dao/user-dao");
const path = require("path");

let dao = new UserDao(
  path.join(__dirname, "..", "..", "storage", "users.json")
);

// console.log(userList);

async function GetAbl(req, res) {
  const user = await dao.get(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ error: "User does not exist" });
  }
}

module.exports = GetAbl;
