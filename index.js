// implement your API here
const express = require("express");
const server = express();
const db = require("./data/db");
const bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(cors());

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

server.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  db.findById(id)
    .then(user => {
      if (typeof user === "Array" && user.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      db.remove(id)
        .then(n => res.status(200).json(user[0]))
        .catch(error =>
          res
            .status(500)
            .json({ error: "The users information could not be retrieved." })
        );
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "The users information could not be removed." })
    );
});

server.put("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
  
    db.update(id, {
      name: req.body.name,
      bio: req.body.bio
    })
      .then(n => {
        db.findById(id)
          .then(user => res.status(200).json(user[0]))
          .catch(error =>
            res
              .status(500)
              .json({ error: "The users information could not be retrieved." })
          );
      })
      .catch(error =>
        res.status(500).json({ error: "The user could not be modified." })
      );


server.get("/api/users", (req, res) => {
    db.find()
      .then(users => res.status(200).json(users))
      .catch(error =>
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." })
      );
  });

  server.get("/api/users/:id", (req, res) => {
    db.findById(Number(req.params.id))
      .then(user => {
        if (typeof user === "Array" && user.length === 0) {
          return res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
        return res.status(200).json(user[0]);
      })
      .catch(error =>
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." })
      );
  });

server.listen(8000, () => console.log("API is running..."));
