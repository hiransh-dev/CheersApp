// CONNECT TO DB
const mongoose = require("mongoose");
const Menu = require("../models/dbMenu");

async function db_function() {
  await mongoose.connect("mongodb://127.0.0.1:27017/cheersapp_db");
  console.log("cheersapp_db is Connected");
}
db_function().catch((err) => {
  console.log(err);
});

const menuItems = [
  {
    title: "San Miguel",
    desc: "4.0% ABV | 2.3 Units",
    price: 2.75,
    category: "Drinks",
    subcategory: "Beers",
  },
  {
    title: "Guinness",
    desc: "4.0% ABV | 2.3 Units",
    price: 5,
    category: "Drinks",
    subcategory: "Beers",
  },
  {
    title: "Carling",
    desc: "4.0% ABV | 2.3 Units",
    price: 2.5,
    category: "Drinks",
    subcategory: "Beers",
  },
  {
    title: "Coors",
    desc: "4.0% ABV | 2.3 Units",
    price: 2.5,
    category: "Drinks",
    subcategory: "Beers",
  },
  {
    title: "Kronenbourg 1664",
    desc: "4.0% ABV | 2.3 Units",
    price: 2.5,
    category: "Drinks",
    subcategory: "Beers",
  },
  {
    title: "Jameson",
    desc: "40% ABV | 2.3 Units",
    price: 4,
    category: "Drinks",
    subcategory: "Whiskey",
  },
  {
    title: "Jack Daniel's",
    desc: "40% ABV | 2.3 Units",
    price: 4.5,
    category: "Drinks",
    subcategory: "Whiskey",
  },
  {
    title: "Ballantines",
    desc: "40% ABV | 2.3 Units",
    price: 5,
    category: "Drinks",
    subcategory: "Whiskey",
  },
  {
    title: "Old Speckled Hen",
    desc: "4.0% ABV | 2.3 Units",
    price: 5,
    category: "Drinks",
    subcategory: "Ale",
  },
  {
    title: "Captain Morgan",
    desc: "40% ABV",
    price: 5,
    category: "Drinks",
    subcategory: "Rum",
  },
  {
    title: "Stella",
    desc: "4.1% ABV",
    price: 3.5,
    category: "Drinks",
    subcategory: "Beers",
  },
  {
    title: "Asahi",
    desc: "4% ABV",
    price: 6.25,
    category: "Drinks",
    subcategory: "World Beers",
  },
  {
    title: "Abrachan",
    desc: "40% ABV",
    price: 4.25,
    category: "Drinks",
    subcategory: "Whiskey",
  },
  {
    title: "Corona",
    desc: "4.5% ABV",
    price: 4.5,
    category: "Drinks",
    subcategory: "Beers",
  },
  {
    title: "BBQ Chicken Burger",
    desc: "Juicy, tender BBQ chicken patty, topped with melted cheddar cheese, crispy bacon, and a tangy BBQ sauce.",
    price: 5,
    category: "Food",
    subcategory: "",
  },
  {
    title: "Jacket Potato with roasted Veggies",
    desc: "Crispy skin, fluffy flesh, and roasted vegetables bursting with flavor.",
    price: 5,
    category: "Food",
  },
  {
    title: "Jacket Potato with baked Beans",
    desc: "Crispy skin, fluffy flesh, and creamy baked beans. A classic comfort food that's sure to satisfy.",
    price: 5,
    category: "Food",
  },
  {
    title: "Spicy Chicken Wings",
    desc: "Juicy, crispy, and finger-licking good, our spicy chicken wings are tossed in a fiery sauce that will leave you begging for more.",
    price: 8,
    category: "Food",
  },
  {
    title: "Onion Rings",
    desc: "Crispy, golden-brown onion rings with a soft, oniony center. The perfect appetizer or side dish.",
    price: 6,
    category: "Food",
  },
  {
    title: "Chips",
    desc: "Thick-cut, golden-brown chips that are crispy on the outside and fluffy on the inside. Served with your choice of salt, vinegar, or ketchup.",
    price: 5,
    category: "Food",
  },
  {
    title: "Pasta Alfredo",
    desc: "Creamy, cheesy, and oh-so-satisfying. Our pasta alfredo is made with fresh pasta, creamy sauce, and a touch of Parmesan cheese.",
    price: 8.25,
    category: "Food",
  },
  {
    title: "Margherita pizza",
    desc: 'Juicy tomatoes, creamy mozzarella, and fresh basil. A taste of Italy that will make you say "Mamma mia!"',
    price: 10,
    category: "Food",
  },
  {
    title: "Pepperoni Pizza",
    desc: "Juicy pepperoni, melted mozzarella, and a crispy crust. The perfect pizza for a cheesy, meaty, and satisfying meal.",
    price: 10,
    category: "Food",
  },
  {
    title: "Coffee",
    desc: "",
    price: 2.5,
    category: "Soft Drinks",
  },
  {
    title: "Water",
    desc: "",
    price: 1.5,
    category: "Soft Drinks",
  },
  {
    title: "Sparkling Water",
    desc: "",
    price: 2,
    category: "Soft Drinks",
  },
  {
    title: "Coke",
    desc: "",
    price: 3.5,
    category: "Soft Drinks",
  },
  {
    title: "Lemonade",
    desc: "",
    price: 3,
    category: "Soft Drinks",
  },
];

function addToMenu() {
  try {
    menuItems.forEach(async (item) => {
      const newItem = new Menu(item);
      await newItem.save();
    });
    console.log("Dummy Menu Items seeded to DB.");
  } catch (e) {
    console.log(e);
  }
}
addToMenu();
