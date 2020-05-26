const express = require("express");
const mongoose = require("mongoose");
const app = express();

const movieschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image : String ,
  summary : String,
});
const movies = mongoose.model("movies", movieschema);
app.use(express.json());

app.get("/movies", async (req, res, next) => {
  const allmovies = await movies.find();
  res.send({ data: allmovies });
});
app.get("/movies/:id", async (req, res, next) => {
  const movies = await movies.findById(req.params.id);
  res.send({ data: movies });
});
app.post("/movies", async (req, res, next) => {
  const newPerson = new movies({ name: req.body.name, image: req.body.image, summary:req.body.summary });
  await newPerson.save();
  res.send({ data: newPerson });
});

mongoose
  .connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => console.log("listing"));
  });