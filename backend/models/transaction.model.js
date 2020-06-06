const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Credit", "Debit"],
      required: true,
    },
    sender: {
      type: Number,
      minlength: 16,
      maxlength: 16,
      required: true,
    },
    receiver: {
      type: Number,
      minlength: 16,
      maxlength: 16,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
