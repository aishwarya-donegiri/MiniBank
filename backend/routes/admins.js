const router = require("express").Router();
let Admin = require("../models/admin.model");

router.route("/").get((req, res) => {
  Admin.find()
    .then((admins) => res.json(admins))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  const newadmin = new Admin({
    name,
    username,
    password,
  });

  newadmin
    .save()
    .then(() => res.json("Admin added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/login").post((req, res) => {
  Admin.findOne({ username: req.body.username })
    .then((admin) => {
      res.json(admin.password);
    })
    .catch((err) => res.json("error"));
});

module.exports = router;
