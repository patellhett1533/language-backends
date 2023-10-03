const User = require("../model/User");

exports.setResult = async (req, res) => {
  const test = req.params.id;
  const { result } = req.body;
  const user = await User.findById(req.user._id);
  const quiz = { result, test };

  if (result) {
    if (User.find({ quiz: { test: { $eq: test } } })) {
      await user.updateOne({ $pull: { quiz: { test: test } } });
      await user
        .updateOne({ $push: { quiz } })
        .then(res.status(200).json({ message: "Result Stored" }));
    } else {
      await user
        .updateOne({ $push: { quiz } })
        .then(res.status(200).json({ message: "Result Stored" }));
    }
  } else {
    res.status(400).json({ message: "result is compulsory" });
  }
};

exports.getResult = async (req, res) => {
  const test = req.params.id;
  const user = await User.findById(req.user._id);

  const quizItem = user.quiz.find((item) => item.test == test);
  if (quizItem) {
    res.status(200).json(quizItem.result);
  } else {
    res.status(200).json({ message: "hello" });
  }
};
