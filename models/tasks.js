const Task = require("./task");

class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => list.push(this._list[key]));
    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTaskFromArr(task = []) {
    task.forEach((t) => {
      this._list[t.id] = t;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);

    this._list[task.id] = task;
  }

  listComplete(task = []) {
    console.log();

    this.listArr.forEach((task, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completed } = task;
      const state = completed ? "Completade".green : "Pendiente".red;

      console.log(`${idx}. ${desc} :: ${state}`);
    });
  }

  listComepletedTasks(completedOpt = true) {
    console.log();
    let cont = 0;

    this.listArr.forEach((task, i) => {
      const { desc, completed } = task;
      const state = completed ? "Completada".green : "Pendiente".red;

      if (completedOpt) {
        if (completed) {
          cont++;
          console.log(`${(cont + ".").green} ${desc} :: ${completed.green}`);
        }
      } else {
        if (!completed) {
          cont++;
          console.log(`${(cont + ".").green} ${desc} :: ${state}`);
        }
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completed) {
        task.completed = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) this._list[task.id].completed = null;
    });
  }
}

module.exports = Tasks;
