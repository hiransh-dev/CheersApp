const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const path = require("path");
const Menu = require(path.join(__dirname, "/dbMenu"));
const User = require(path.join(__dirname, "/dbUsers"));

const OrderSchema = new Schema(
  {
    orderItems: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
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
    paymentStatus: {
      type: Boolean,
      required: true,
      // add paypal id later
    },
    orderStatus: {
      // type: String,
      // enum: ["Pending", "Completed"],
      type: Boolean,
      // 0 = pending, 1 = complete
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
