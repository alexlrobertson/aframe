const posts = [
  {
    title: 'Foobar'
  }
];

module.exports = {
  findAll: function () {
    return new Promise(function (res) {
      res(posts);
    });
  },
  findById: function (id) {
    return new Promise(function (res) {
      if (!posts[id]) {
        res();
        return;
      }
      res(posts[id]);
    });
  }
};
