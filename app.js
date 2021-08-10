const {
  inquireMenu,
  pause,
  readInput,
  listDeleteTask,
  confirm,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveArchive");
const Tasks = require("./models/tasks");

require("colors");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTaskFromArr(tasksDB);
  }

  do {
    opt = await inquireMenu();
    // console.log(opt);

    switch (opt) {
      case "1":
        const desc = await readInput("Descripcion:");
        tasks.createTask(desc);
        break;
      case "2":
        tasks.listComplete();
        break;
      case "3":
        tasks.listComepletedTasks(true);
        break;
      case "4":
        tasks.listComepletedTasks(false);
        break;
      case "6":
        const id = await listDeleteTask(tasks.listArr);
        if (id !== '0'){
          const ok = await confirm("¿Esta seguro de borrar la tarea?");
          if (ok) {
            tasks.deleteTask(id);
            console.log('Tarea borrada Correctamente'.blue)
          }
        }

        break;
    }

    saveDB(tasks.listArr);
    if (opt !== "0") await pause();
  } while (opt !== "0");
};

main();
