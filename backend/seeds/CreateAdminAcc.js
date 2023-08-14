// CONNECT TO DB
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

async function db_function() {
  await mongoose.connect("mongodb://127.0.0.1:27017/cheersapp_db");
  console.log("cheersapp_db is Connected");
}

db_function().catch((err) => {
  console.log(err);
});

// CREATE DB MODEL
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);

// CREATE ACCOUNT
console.log("Attempting to create an Admin Account");
const adminAccount = {
  username: "admin",
  isAdmin: true,
};
const adminAccountPassword = "admin";

try {
  async function createAdminAccount() {
    const adminAccountVar = await User.register(
      adminAccount,
      adminAccountPassword
    );
  }
  createAdminAccount().then(() => {
    console.log("Admin Account created");
    mongoose.connection.close();
  });
} catch (e) {
  console.log(e);
}
