const { error } = require("console");
const { promises } = require("dns");
const fs = require("fs");
const { readFile, writeFile } = require("fs/promises");
readFile1 = (path) => {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
createFile = (path, data) => {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(path);
      }
    });
  });
};
deleteFile = (path) => {
  return new Promise(function (resolve, reject) {
    fs.unlink(path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(path);
      }
    });
  });
};
writeNames = (path, data) => {
  return new Promise(function (resolve, reject) {
    fs.appendFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

conversion = (data, type) => {
  if (type == "upper") {
    return data.toUpperCase();
  } else if (type == "lower") {
    return data.toLowerCase().replaceAll(".", ".\n");
  } else {
    return (data = data.split(".").sort().join(""));
  }
};
function problem2() {
  readFile1("./lipsum.txt")
    .then((data) => conversion(data, "upper"))
    .then((data) => createFile("./upper.txt", data))
    .then((path) => console.log(path + " created"))
    .then(() => writeNames("./fileNames.txt", "upper.txt"))
    .then((data) => console.log(data + " writtern"))
    .then(() => readFile1("./upper.txt"))
    .then((data) => conversion(data, "lower"))
    .then((data) => createFile("./lower.txt", data))
    .then((path) => console.log(path + " created"))
    .then(() => writeNames("fileNames.txt", "\nlower.txt"))
    .then((data) => console.log(data + " writtern"))
    .then(() => readFile1("./lower.txt"))
    .then((data) => conversion(data, "sort"))
    .then((data) => createFile("./sort.txt", data))
    .then((path) => console.log(path + " created"))
    .then(() => writeNames("fileNames.txt", "\nsort.txt"))
    .then((data) => console.log(data + " writtern"))
    .then(() => readFile1("fileNames.txt"))
    .then((data) => {
      data = data.split("\n");
      data.forEach((element) => {
        deleteFile(element).then((path) => console.log(path + " deleted"));
      });
    })
    .catch(console.log(error));
}
module.exports = problem2;
