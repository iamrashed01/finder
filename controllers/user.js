const User = require('../model/user');

const getUsers = async (req, res) => {
  const user = await User.find();
  res.json({ data: user });
};

module.exports = { getUsers };
