const express = require("express");

const server = express();

server.use(express.json());
server.use(logRequest);

const projects = [
  {
    id: 1,
    title: "teste",
    tasks: ["nova tarefa"]
  }
];

let qtdAcessoAplication = 0;

function logRequest(req, res, next) {
  qtdAcessoAplication++;

  console.log(`Essa aplicação teve ${qtdAcessoAplication} requisições.`);

  return next();
}

function verificaSetemID(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Projeto não encontrado!" });
  }

  return next();
}

//cadastra projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.json(projects);
});

//cadastra tarefa
server.post("/projects/:id/tasks", verificaSetemID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

//lista os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Altera titulo
server.put("/projects/:id", verificaSetemID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

//Deleta projeto
server.delete("/projects/:id", verificaSetemID, (req, res) => {
  const { id } = req.params;

  const index = projects.find(p => p.id == id);

  projects.splice(index, 1);

  //return res.send();
  return res.json(projects);
});

server.listen(3000);
