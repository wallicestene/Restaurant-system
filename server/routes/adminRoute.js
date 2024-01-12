const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const Reservation = require("../models/reservationModel");
const mongoose = require("mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        isVisible: false,
      },
    },
    {
      resource: Restaurant,
    },
    {
      resource: Reservation,
      options: {
        properties: {
          userId: {
            reference: "user",
          },
          restaurantId: {
            reference: "restaurant",
          },
        },
      },
    },
  ],
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "wallicestenewaweru@gmail.com",
  password: process.env.ADMIN_PASSWORD || "wallace",
};
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
  cookiePassword:
    process.env.ADMIN_COOKIE_PASS ||
    "supersecret-and-long-password-for-a-cookie",
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN;
    }

    return null;
  },
});

module.exports = router;
