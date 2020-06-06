const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const accountNumber = Number(req.body.accountNumber);
  const balance = Number(req.body.balance);
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    name,
    accountNumber,
    balance,
    username,
    password,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/update/:accNumber").post((req, res) => {
  User.findOne({ accountNumber: Number(req.params.accNumber) }).then((user) => {
    user.balance = req.body.balance;
    user
      .save()
      .then(() => res.json("User updated!"))
      .catch((err) => res.status(400).json("Error:" + err));
  });
});

router.route("/balance").get((req, res) => {
  User.aggregate([
    { $group: { _id: "", balance: { $sum: "$balance" } } },
    { $project: { totalDeposit: "$balance" } },
  ])
    .then((balance) => {
      res.json(balance[0]);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
