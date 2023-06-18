const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//add mongoose paginate

const MenuSchema = new Schema(
  {
    title: String,
    desc: String /*ABV & Units*/,
    price: Number,
    category: {
      type: String,
      enum: ["Drinks", "Food", "Soft Drinks"],
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
        // "Bar Snacks",
        // "Food",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", MenuSchema);
