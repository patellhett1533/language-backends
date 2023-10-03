const User = require("../model/User");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: "user not found" });
  }
};
