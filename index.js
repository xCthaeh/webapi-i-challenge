// implement your API here
const express = require("express");
const server = express();
const db = require("./data/db");
const bodyParser = require("body-parser");

server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("One Ring to Rule Them All");
});

server.get("/hobbit", (req, res) => {
  const hobbit = [
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

  res.status(200).json(hobbit);
});

server.post("/api/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a name and bio for the user." });
    }
  
    db.insert({
      name: req.body.name,
      bio: req.body.bio,
      created_at: Date.now(),
      updated_at: Date.now()
    })
      .then(id => res.status(201).json(id))
      .catch(error =>
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        })
      );
  });

server.listen(8000, () => console.log("API is running..."));
