import express from "express";

const port = 4001;
const app = express();

const posts = {};

app.get("/inventory", (req, res) => {
  res.send(posts);
});

app.listen(port, () => {
  console.log(`Inventory service listening on port ${port}`);
  console.log('V4');
});
