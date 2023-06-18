const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const path = require("path");
const Orders = require(path.join(__dirname, "/dbOrders"));

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
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (doc) {
  if (doc) {
    /* Set username to same as email */
    doc.username = doc.email;
  }
});

UserSchema.virtual("fullname").get(() => {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
