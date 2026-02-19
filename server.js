const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Replace with YOUR MongoDB URL
mongoose.connect("mongodb://127.0.0.1:27017/bookdb")
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

// Schema
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number
});

const Book = mongoose.model("Book", BookSchema);

// Add Book
app.post("/books", async (req,res)=>{
  await Book.create(req.body);
  res.send("Book Added");
});

// Get Books
app.get("/books", async (req,res)=>{
  const books = await Book.find();
  res.json(books);
});

// Delete Book
app.delete("/books/:id", async(req,res)=>{
  await Book.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// Start Server
app.listen(3000, ()=>{
  console.log("Server running on 3000");
});


