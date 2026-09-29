const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.json({ message: "Hello from Express on AWS EC2!" });
// });

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
