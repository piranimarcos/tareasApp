const fs = require("fs");

const archive = "./db/data.json";

const saveDB = (data) => {
  fs.writeFileSync(archive, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(archive)) return null;

  const data = fs.readFileSync(archive, { encoding: "utf-8" });
  return JSON.parse(data)
};

module.exports = {
  saveDB,
  readDB
};
