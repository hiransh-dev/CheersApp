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
      required: true,
      enum: [
        "Beers",
        "World Beers",
        "Ale",
        "Whiskey",
        "Vodka",
        "Rum",
        "",
        // "Bar Snacks",
        // "Food",
      ],
    },
    outofstock: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// const subCategorySchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       enum: ["Drinks", "Food", "Soft Drinks"],
//       required: true,
//     },
//     subcategory: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Menu = mongoose.model("Menu", MenuSchema);
// const SubCategoryMenu = mongoose.model("SubCategoryMenu", subCategorySchema);

module.exports = mongoose.model("Menu", MenuSchema);
