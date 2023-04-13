import express from "express";

const port = 8080;
const app = express();

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
