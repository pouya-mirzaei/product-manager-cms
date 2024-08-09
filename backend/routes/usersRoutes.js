const express = require('express');
const SabzLearnShopDB = require('./../db/SabzLearnShop');

const usersRouter = express.Router();

// routes

usersRouter.get('/', (req, res) => {
  let selectAllUsersQuery = `SELECT * FROM Users`;

  SabzLearnShopDB.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.delete('/:userID', (req, res) => {
  let userID = req.params.userID;

  // Fetch the current deleted status of the user
  let getUserQuery = `SELECT deleted FROM users WHERE id = ${userID}`;
  SabzLearnShopDB.query(getUserQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching user');
      return;
    }

    const currentDeletedStatus = result[0].deleted;
    const newDeletedStatus = !currentDeletedStatus; // Toggle the status

    let updateUserQuery = `UPDATE users SET deleted = ${newDeletedStatus} WHERE id = ${userID}`;
    SabzLearnShopDB.query(updateUserQuery, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating user');
      } else {
        res.send(result);
      }
    });
  });
});

usersRouter.put('/:userID', (req, res) => {
  let userID = req.params.userID;
  let body = req.body;

  let editUserQuery = `UPDATE Users SET firsname="${body.firsname}", lastname="${body.lastname}", username="${body.username}", password="${body.password}", phone=${body.phone}, city="${body.city}", email="${body.email}", address="${body.address}" ,score=${body.score}, buy=${body.buy} WHERE id = ${userID}`;

  SabzLearnShopDB.query(editUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = usersRouter;
