import Tasks from "./classes/tasks";
import Project from "./classes/projects";
import appendProjects from "./scripts/projectHandler";

import "./styles/main.css";

let task1 = new Tasks(
  "Limpar o quarto",
  "Limpar o quarto pq ta foda",
  "28/01/2024",
  "URGENTE"
);

let task2 = new Tasks(
  "Procurar trabalhar",
  "Procurar ser sujeito homem e ir",
  "03/05/2024",
  "Moderado"
);

let task3 = new Tasks(
  "i've tried so hard",
  "Something its happening here man",
  "07/07/2024",
  "Baixa"
);

let task4 = new Tasks(
  "Complicado",
  "It's really complicated to be honest",
  "32/50/2025",
  "Moderado"
);

console.log(task1.getTask());

let project1 = new Project("Shark pog");
project1.addTask(task1);
project1.addTask(task2);
project1.logTasks();

let project2 = new Project("You are what you eat Sonic");
project2.addTask(task3);
project2.addTask(task4);
project2.logTasks();

appendProjects();