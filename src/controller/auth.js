const User = require("../model/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "socialmedia";

exports.signup = async (req, res) => {
  if (req.method === "POST") {
    await User.findOne({ email: req.body.email })
      .exec()
      .then(async (user) => {
        if (user) {
          return res.status(400).json({ message: "Email already exists." });
        }

        const { firstname, lastname, email, password } = req.body;
        const _user = new User({
          firstname,
          lastname,
          email,
          password,
        });

        try {
          await _user
            .save()
            .then((data) => {
              return res.status(200).json(data);
            })
            .catch((err) => {
              return res.status(400).json(err);
            });
        } catch (error) {
          return res.status(400).json(error);
        }
      })
      .catch((error) => {
        return res.status(400).json({ message: error });
      });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (user.authenticate(req.body.password)) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {});
      const { _id, firstname, lastname, email, username } = user;

      res.status(200).json({
        token,
        user: {
          _id,
          firstname,
          lastname,
          email,
        },
      });
    } else {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
  } else {
    res.status(400).json({ message: "User doesn't exists" });
  }
};
