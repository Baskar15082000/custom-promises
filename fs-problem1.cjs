const fs = require("fs");
function createDirectory(path) {
  return new Promise(function (resolve, reject) {
    fs.mkdir(path, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log(path + " created");
        return resolve(path);
      }
    });
  });
}
function createFile(path, count) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path + "/temp.json", "", (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log(path + "/temp" + count + ".json created");
        return resolve(path);
      }
    });
  });
}
function deleteFile(path, count) {
  return new Promise(function (resolve, reject) {
    fs.unlink(path + "/temp.json", (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log(path + "/temp" + count + ".json deleted");
        return resolve(path);
      }
    });
  });
}
let count = 1;
function recursive(path, num) {
  if (count > num) {
    return;
  }
  createFile(path, count)
    .then((path) => deleteFile(path, count))
    .then(() => {
      count++;
      recursive(path, num);
    })
    .catch("error");
}
function problem1(path, num) {
  createDirectory("./random")
    .then((data) => {
      recursive(data, num);
    })
    .catch("error");
}

module.exports = problem1;
