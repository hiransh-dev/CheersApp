const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const path = require("path");
const Orders = require(path.join(__dirname, "/dbOrders"));

const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    orderHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Orders",
      },
    ],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isStaff: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
