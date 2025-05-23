const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Income = require("./models/Income");
const Expense = require("./models/Expense");

const MONGO_URI="mongodb+srv://bharathreddy372k4:9qlrmzCO6Egmlcnj@expensetracker.mqofciw.mongodb.net/?retryWrites=true&w=majority&appName=expensetracker";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    // await User.deleteMany({});
    // await Income.deleteMany({});
    // await Expense.deleteMany({});

    // Create a user
    // const password = await bcrypt.hash("test1234", 10);
    const user = await User.create({
      fullname: "Lovely Lavanya",
      email: "littleprincess@user.com",
      pass: "1234567890",
      profileImageUrl: "https://cutedp.org/wp-content/uploads/2024/07/cute-girl-pic-6-698x1024.jpg",
    });

    const userId = user._id;

    // Dummy icons
    const icons = ["https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f915.png", "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b0.png", "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b3.png", "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4c8.png", "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4c9.png"];

    // Create 30 income records
    const incomeSources = ["Job", "Freelance", "Gift", "Bonus", "Selling Stuff"];
    for (let i = 0; i < 30; i++) {
      await Income.create({
        userId,
        icon: icons[i % icons.length],
        source: incomeSources[i % incomeSources.length],
        amount: Math.floor(Math.random() * 5000) + 1000,
        date: new Date(Date.now() - Math.random() * 1000000000),
      });
    }

    // Create 30 expense records
    const expenseCategories = ["Food", "Transport", "Rent", "Groceries", "Entertainment"];
    for (let i = 0; i < 30; i++) {
      await Expense.create({
        userId,
        icon: icons[i % icons.length],
        category: expenseCategories[i % expenseCategories.length],
        amount: Math.floor(Math.random() * 3000) + 500,
        date: new Date(Date.now() - Math.random() * 1000000000),
      });
    }

    console.log("Seeding complete.");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();
