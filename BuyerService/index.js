import express from "express";

const port = 4000;
const app = express();

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(port, () => {
  console.log(`Buyer service listening on port ${port}`);
  console.log('V4');
});
