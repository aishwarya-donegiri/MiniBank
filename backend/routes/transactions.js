const router = require("express").Router();
let Transaction = require("../models/transaction.model");

router.route("/").get((req, res) => {
  Transaction.find()
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const type = req.body.type;

  const sender = Number(req.body.sender);
  const receiver = Number(req.body.receiver);
  const amount = Number(req.body.amount);

  const newtransaction = new Transaction({
    type,
    sender,
    receiver,
    amount,
  });

  newtransaction
    .save()
    .then(() => res.json("Transaction added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:accountNumber").get((req, res) => {
  Transaction.find({
    $or: [
      { sender: req.params.accountNumber },
      { receiver: req.params.accountNumber },
    ],
  })
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
