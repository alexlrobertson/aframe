import fs from 'fs';

function getFileData(filename) {
  return new Promise(function (resFile, rejFile) {
    fs.readFile('./posts/' + filename, 'utf8', function (err, data) {
      if (err) {
        rejFile(err);
      }

      resFile(data);
    });
  });
}

module.exports = {
  findAll: function () {
    return new Promise(function (res, rej) {
      fs.readdir('./posts', function (err, files) {
        if (err) {
          rej(err);
        }
        Promise.all(files.map(getFileData))
          .then(function (posts) {
            res(posts);
          })
          .catch(function (fileErr) {
            rej(fileErr);
          });
      });
    });
  },
  findById: function (id) {
    return new Promise(function (resolve, reject) {
      fs.readFile('./posts/' + id + '.md', 'utf8', function (err, data) {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    });
  }
};
