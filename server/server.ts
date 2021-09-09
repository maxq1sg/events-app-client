import express from "express";
const app = express();

const port = 3001;

app.get("/test", (req, res) => {
  res.json({ mes: "maxi" });
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});

export default app;
