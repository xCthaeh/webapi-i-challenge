// implement your API here
const express = require("express");
const server = express();
const db = require("./data/db");

server.get("/", (req, res) => {
  res.send("One Ring to Rule Them All");
});

server.get("/users", (req, res) => {
  const users = [
    {
      name: "Samwise Gamgee",
      bio: "Gardener and poet. Married to Rose Cotton",
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    },
    {
      name: "Frodo Baggins",
      bio: "The ring bearer",
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    }
  ];

  res.status(200).json(users);
});

server.listen(8000, () => console.log("API is running..."));
