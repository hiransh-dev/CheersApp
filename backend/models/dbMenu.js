const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//add mongoose paginate

const path = require("path");

const MenuSchema = new Schema(
  {
    title: String,
    desc: String /*ABV & Units*/,
    price: Number,
    category: {
      type: String,
      enum: ["Drinks", "Food", "Bar Snacks", "Soft Drinks"],
    },
    subcategory: {
      type: String,
      enum: [
        "Beers",
        "World Beers",
        "Ale",
        "Whiskey",
        "Vodka",
        "Rum",
        // "Snacks",
        // "Food",
        // "Soft Drinks",
      ],
    },
    // imgsrc: String,
    // change imgsrc to object later with url, filename for cloudinary
    // author
    // reviews
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", MenuSchema);
