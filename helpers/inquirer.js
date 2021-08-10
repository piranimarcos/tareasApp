const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas prendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquireMenu = async () => {
  console.clear();
  console.log("============================".green);
  console.log("       Seleccione menu      ".green);
  console.log("============================\n".green);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".green} para continuar`,
    },
  ];

  console.log("\n");

  return await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listDeleteTask = async (task = []) => {
  const choices = task.map((t, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: t.id,
      name: `${idx} ${t.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0. '.green + 'Cancelar'
  })

  const question = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);
  return id;
};

const confirm = async(message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showCheckList = async (task = []) => {
  const choices = task.map((t, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: t.id,
      name: `${idx} ${t.desc}`,
      checked: (t.completed) ? true : false
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
}; 

module.exports = {
  inquireMenu,
  pause,
  readInput,
  listDeleteTask,
  confirm,
  showCheckList
};
