let users = require('../models/usersArray');

module.exports = {
    getOneUser: (req, res) => {
        let foundUser = users.filter((user) => {
          if (user.id === req.params.id) {
            return res.status(200).json({ confirmation: 'success', user });
          }
        });
        if (!foundUser.length)
          return res
            .status(400)
            .json({ confirmation: 'fail', message: 'User Does Not Exist' });
      }, 

    createNewUser: (req, res) => {
        //validate inputs
        if (!req.body.name || !req.body.email || !req.body.password) {
          return res
            .status(400)
            .json({ confirmation: 'fail', message: 'All Inputs Must Be filled' });
        }
      
        //check if user exists
        let existingUser = users.filter(
          (foundUser) => foundUser.email === req.body.email
        );
        if (existingUser.length) {
          return res.status(400).send('User Already Exists');
        }
      
        //create a new user object
        const newUser = {};
      
        //values for newUser based on req.body inputs in postman
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.id = String(users.length + 1);
        // add user to array
        users.push(newUser);
        //return the new user
        return res.status(200).json({ confirmation: 'sucess', newUser });
      },

    updateUser: (req, res) => {
        //grab the inputted information
        let updatedUser = req.body;
      
        //search the users array
        users.filter((foundUser) => {
          //find the user
          if (foundUser.id === req.params.id) {
            //change values for user if inputted
            foundUser.name = updatedUser.name ? updatedUser.name : foundUser.name;
            foundUser.description = updatedUser.description ? updatedUser.description : foundUser.description;
            foundUser.playtime = updatedUser.playtime ? updatedUser.playtime : foundUser.playtime;
            foundUser.yearReleased = updatedUser.yearReleased ? updatedUser.yearReleased : foundUser.yearReleased;
      
          }
        });
        //return array of users
        return res.status(200).json({ message: 'User Updates', users });
      },
    deleteUser: (req, res) => {
        //filter user based on id parameter in address
        let removeUser = users.filter((foundUser) => {
          return foundUser.id !== req.params.id;
        });
        //mutate users array and replace with removeUser array
        users = removeUser;
        //return results
        return res.status(200).json({ confirmation: 'success', users });
      }
    }