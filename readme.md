<div align="center">
    <img src="frontend/public/CheersLogo_nobg.png" width="300">
</div>

## 📑 Table of Contents

1. [Description](https://github.com/hirndev/CheersApp#-description)
2. [Purpose](https://github.com/hirndev/CheersApp#-purpose)
3. [Technologies](https://github.com/hirndev/CheersApp#-technologies)
4. [Features](https://github.com/hirndev/CheersApp#-features)
5. [Screenshots](https://github.com/hirndev/CheersApp#%EF%B8%8F-screenshots)
6. [Implementation](https://github.com/hirndev/CheersApp#%EF%B8%8F-implementation)
7. [Setup](https://github.com/hirndev/CheersApp#%EF%B8%8F-setup)
8. [ToDo](https://github.com/hirndev/CheersApp#-to-do)
9. [Attributions](https://github.com/hirndev/CheersApp#-attributions)
10. [License](https://github.com/hirndev/CheersApp#-license)

## 🌟 Description

Cheers!🍻
A fullstack WebApp for browsing and ordering from the Menu at a Pub. Users can place and view their orders and Admin can manage the Menu, process incoming Orders, view Order History, manage Users and Staff accounts.<br>

## 🌱 Purpose

An Open-source and online solution for local pubs.

## 🌐 Technologies

<div>
    <img style="height:3rem;width:auto;background-color:#606060;padding:2px;border-radius:10%;" src="readme_res/js.png">
    <img style="height:3rem;width:auto;background-color:#606060;padding:2px;border-radius:10%;" src="readme_res/html-5.png">
    <img style="height:3rem;width:auto;background-color:#606060;padding:2px;border-radius:10%;" src="readme_res/css-3.png">
</div>
<div>
    <img style="height:3rem;width:auto;background-color:#606060;padding:2px;border-radius:10%;" src="readme_res/vue-js.png">
    <img style="height:3rem;width:auto;background-color:#606060;padding:2px;border-radius:10%;" src="readme_res/node-js.png">
    <img style="height:3rem;width:auto;background-color:#606060;padding:2px;border-radius:10%;" src="readme_res/express-js.png">
    <img style="height:3rem;width:auto;background-color:#606060;padding:2px;border-radius:10%;" src="readme_res/mongodbcolor.png">
    <img style="height:3rem;width:auto;background-color:#606060;padding:2px;border-radius:10%;" src="readme_res/vuetify-logo.png">
</div>

## 🧮 Features

- Browse the menu with an interactive UI.
- Add Items from menu to cart and place an order.
- View placed order status and order history.

  ### Admin

- View incoming orders; mark them as fulfilled or cancelled.
- View all past orders by date and chart for earnings for (x) number of days.
- View all users and their order history.
- Add Items to menu, delete items and mark as out-of-stock.
- Add/Delete staff accounts.

<!-- ## Video -->

<!-- video embed -->

## 🖥️ Screenshots

## Users

- ### Homepage

<div style="display:flex">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers1.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers2.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_loggedin_home.png">
</div>

- ### Auth

<div style="display:flex">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_auth_signup.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_auth2.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_auth_loggedin.png">
</div>

- ### Menu

<div style="display:flex">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_menu1.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_menu2.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_menu3.png">
</div>

- ### Menu Out-of-Stock

<div style="display:flex">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_menu_outofstock.png">
</div>

- ### Orders

<div style="display:flex">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_cart.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_cart2.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_orders.png">
</div>

- ### UI Dialogs

<div style="display:flex">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_sidemenu.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_choose_subcategory.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_choosetable.png">
</div>

- ### Others

<div style="display:flex">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_pendingOrders.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/user/cheers_home_footer.png">
</div>

## Admin Dashboard

- ### Admin Auth

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_login.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_auth.png">

- ### Admin Orders

  Pending Orders <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_pending.png">

  Completed Orders <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_complete.png">
  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_complete2.png">

  Cancelled Orders <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_cancel.png">

- ### Menu Manage

  Menu <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_menu.png">

  Add to menu <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_addmenu.png">

  Deleted Menu <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_deletemenu.png">

- ### Accounts

  User Accounts <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_users.png">

  Staff Accounts <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_staff.png">

  Delete staff account <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_staffdelete.png">

  Add staff account <br>

  <img style="height:40rem;width:auto;margin:1rem;" src="readme_res/cheers_screenshots/admin/cheers_staffregister.png">

## ⚗️ Implementation

- 📡 Axios for API calls.
- 📈 ChartJS for plotting data on charts.
- 🔐 Authentication & Authorization with Passport in backend.
- 🛡️ Common Security safeguards

  ### Frontend

  - 🧼 Vee-Validate

  ### Backend

  - 👮 Joi Validations
  - ⛑️ Helmet
  - 🧼 SanitizeHTML
  - 🧼 ExpressMongoSanitize

<!-- ## 🔧 Structure -->

<!-- ADD STRUCTURE DIAGRAM  -->

## 🛠️ Setup

1. Install MongoDB.
2. Install NodeJS.
3. Run mongod.
4. In your terminal run command `npm install` from root and frontend folder, to install all the dependencies.
5. To start the server run `npm run server` from root. @ localhost:3000.
6. To start the client run to `npm run client` from root. @ localhost:5173.
7. In your browser head to `localhost:5173`.

## 🎯 To-do

- Write unit tests with vitest.
- Improve category & sub-category. Make it more dynamic.
- Add search functionality to menu.
- Edit menu items with help of vee-validate.

## 📣 Attributions

- Vuetify for building UI.
- A classic American sitcom; Cheers for the logo and example branding.
- BingAI for images.

## 📋 License

This project is licensed under the MIT License.
