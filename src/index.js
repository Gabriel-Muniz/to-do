import Tasks from "./classes/tasks";
import Project from "./classes/projects";

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

console.log(task1.getTask());

let project1 = new Project("Shark pog");
project1.addTask(task1);
project1.addTask(task2);
project1.logTasks();
