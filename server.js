const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Replace with your MongoDB URL
mongoose.connect("mongodb://127.0.0.1:27017/bookdb")
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number
});

const Book = mongoose.model("Book", BookSchema);

app.post("/books", async (req,res)=>{
  await Book.create(req.body);
  res.send("Book Added");
});

app.get("/books", async (req,res)=>{
  const books = await Book.find();
  res.json(books);
});

app.delete("/books/:id", async(req,res)=>{
  await Book.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// Update Book
app.put("/books/:id", async(req,res)=>{

  await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true }
  );

  res.send("Updated");
});


app.listen(3000, ()=>{
  console.log("Server running on 3000");
});
app.use(cors());

