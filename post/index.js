import fs from 'fs';
import fm from 'front-matter';

function getFileData(filename) {
  return new Promise(function (resFile, rejFile) {
    fs.readFile('./posts/' + filename, 'utf8', function (err, data) {
      if (err) {
        rejFile(err);
      }

      const post = fm(data);

      post.id = filename.replace(/\.md$/, '');

      resFile(post);
    });
  });
}

function filterMdFiles(filename) {
  return filename.match(/\.md$/);
}

function findAll() {
  return new Promise(function (res, rej) {
    fs.readdir('./posts', function (err, files) {
      if (err) {
        rej(err);
      }
      Promise.all(files.filter(filterMdFiles).map(getFileData))
        .then(function (posts) {
          res(posts);
        })
        .catch(function (fileErr) {
          rej(fileErr);
        });
    });
  });
}

module.exports = {
  findAll,
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
