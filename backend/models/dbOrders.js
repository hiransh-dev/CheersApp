const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const path = require("path");
const Menu = require(path.join(__dirname, "/dbMenu"));
const User = require(path.join(__dirname, "/dbUsers"));

const OrderSchema = new Schema(
  {
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
    ],
    orderTotal: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
