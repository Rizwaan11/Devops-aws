const express = require("express");

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on AWS EC2!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
