import { Step } from "./models/Step";
import { Project } from "./models/Project";
import { Task } from "./models/Task";
import { renderProjectSidebar, renderProjectMainSection } from "./modules/projectView.js";
import { attachEventsToModules } from "./utils/domManager.js";
import "./styles/reset.css"
import "./styles/main.css"

// const step1 = new Step("Revisar álgebra", true);
// const step2 = new Step("Revisar geometria", false);
// const step9 = new Step("Revisar logaritmo", false);

// const step3 = new Step("Pesquisar tópicos principais", false);
// const step4 = new Step("Criar slides", false);

// const step5 = new Step("Reunir métricas de vendas", true);
// const step6 = new Step("Reunir feedback dos clientes", true);

// const step7 = new Step("Escrever introdução", true);
// const step8 = new Step("Analisar dados coletados", false);

// const task1 = new Task("Revisar Matemática", "2023-11-30", 50, [step1, step2, step9]);
// const task2 = new Task("Preparar apresentação de História", "2023-12-10", 20, [step3, step4]);
// const task3 = new Task("Coletar dados", "2023-11-10", 80, [step5, step6]);
// const task4 = new Task("Escrever relatório", "2023-11-18", 30, [step7, step8]);

// // task1.calcProgress();
// // task2.calcProgress();


// const project1 = new Project(
//   "Projeto de Estudos",
//   "Organizar estudos para o exame final",
//   "2023-12-15",
//   "Alta",
//   [task1, task2]
// );

// const project2 = new Project(
//   "Projeto de Trabalho",
//   "Concluir relatório trimestral",
//   "2023-11-20",
//   "Média",
//   [task3, task4]
// );

// let projects = [];
// projects.push(project1, project2);

if (!localStorage.getItem('projectsString')) {
  const placeHolderStep = new Step("Step 1 example");

  const placeHolderTask = new Task('Task 1 Example', '2023-11-20', 0, [placeHolderStep]);

  const placeHolderProject = new Project(
    "Make my own projects",
    "Start to organize my projects",
    "2023-11-20",
    "Medium",
    [placeHolderTask]
  );

  let projectsString = [];
  projectsString.push(placeHolderProject)
  localStorage.setItem('projectsString', JSON.stringify(projectsString));
}

const parsedProjects = JSON.parse(localStorage.getItem('projectsString'))

console.log(parsedProjects);


renderProjectSidebar(parsedProjects);
// renderProjectMainSection(project2);
attachEventsToModules()
