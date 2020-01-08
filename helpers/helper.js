const data = require('../data/users.json')

// exports.newID = (data)=> {
//   let id;
//   if (data.length > 0) {
//     id = data[data.length - 1].id + 1
// } else {
//   id = 1;
//     }
// }

exports.newID = () => {
  let id;
  if (data.length > 0) {
    id = data[data.length - 1].id + 1;
  } else {
    id = 1;
  }
  return id;
};
