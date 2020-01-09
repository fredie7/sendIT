import data from '../data/users';

const newID = () => {
  let id;
  if (data.length > 0) {
    id = data[data.length - 1].id + 1;
  } else {
    id = 1;
  }
  return id;
};


const authController = {
  signup: (req, res) => {
    const userExists = data.find((info) => info.email === req.body.email);
    if (userExists) {
      res.status(400).json({ error: 'user already exists' });
    } else {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        id: newID(),
      };
      data.push(newUser);
      res.status(201).json(newUser);
    }
  },
};
export default authController;
