const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//add mongoose paginate

const MenuSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String /*ABV & Units*/,
      required: true,
    },
    price: {
      type: Number /*ABV & Units*/,
      required: true,
    },
    category: {
      type: String,
      enum: ["Drinks", "Food", "Soft Drinks"],
      required: true,
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", MenuSchema);
