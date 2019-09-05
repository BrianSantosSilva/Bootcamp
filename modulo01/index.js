const express = require("express");

const server = express();

server.use(express.json());
//localhost:3000/users/1

const users = ["Robson", "Claúdio", "Victor"];

server.use((req, res, next) => {
  console.time("Request");

  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();

  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "user does not exists" });
  }
  req.user = user;
  return next();
}

//retorno
server.get("/users", (req, res) => {
  return res.json(users);
});

//retorno
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

//Criação
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
