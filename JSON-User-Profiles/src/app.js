const fs = require('fs');
const md5 = require("md5");
const app = require("../src/app");
const data = require("../src/data.json");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * purpose - retriving the user details
 * @param {*} id - specifies the id of the user whose details should be retrived
 * @param {*} sortByAgeDesc - retrive all the users in descending order
 * @param {*} sortByAgeAsc - retrive all the users in ascending order
 * @param {*} qualification - retrive the useres having the specific qualification
 * @returns all the users if none of the upper params are determined
 */
const getUsers = (arg) => {
    console.log('arg ==> ', arg)
    if(arg === undefined) {
        return data.profiles;
    } else if(arg === 'sortByAgeAsc'){
            return data.profiles.sort((userA, userB) => userA.age - userB.age);
    } else if(arg === 'sortByAgeDesc'){
            return data.profiles.sort((userA, userB) => userB.age - userA.age);
    } else {
        return data.profiles.filter(user => user.id === arg);
    }
}

/**
 * purpose - adding a new user to the user profiles
 * @param {*} user - data of the user to be inserted
 * @returns error when validation of any data got failed
 */
const addUser = (user) => {
    try {
        const users = JSON.parse(JSON.stringify(data.profiles));
        users.push(user);

        fs.writeFile('data.json', JSON.stringify(users), 'utf8', err => {
          if (err) {
            console.error('Error writing to file:', err);
            return;
          }
          console.log('New user added and file updated successfully.');
        });
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
      }
}

/**
 * purpose - updating the user details
 * @param {*} user - data of the user to be updated
 * @param {*} id - id of the user to be updated
 * @returns invalid id when a id that is not existing is sent
 * @returns error when validation of any data got failed
 */
const updateUser = (user, id) => {

    if(!emailRegex.test(user.email_id)){
        return "Validations failed for some fields!!!";
    }
    const users = JSON.parse(JSON.stringify(data.profiles));
    const userToUpdate = users.find(user => user.id === id);
    
    if(userToUpdate){
        userToUpdate.email_id=user.email_id;
        userToUpdate.age = user.age;
        userToUpdate.password=user.password;
        userToUpdate.educational_qualifications = user.educational_qualifications;
        userToUpdate.work_experience=user.work_experience;
    
        const updatedUsersJSON = JSON.stringify(users, null, 2);
    
        fs.writeFile('data.json', updatedUsersJSON, 'utf8', err => {
            if (err) {
              console.error('Invalid updates:', err);
              return;
            }
            console.log('User object deleted successfully.');
        });
    } else {
        console.log('Invalid id');
    }


}

/**
 * purpose - deleting a user
 * @param {*} id - id of the user to be deleted
 * @returns invalid id when a id that is not existing is sent
 */
const deleteUser = (id) => {
    console.log('UserId for delete : ',id);

    try {
        const users = JSON.parse(JSON.stringify(data.profiles));
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            const updatedJson = JSON.stringify(users, null, 2);
    
            fs.writeFile(jsonFilePath, updatedJson, 'utf8', err => {
                if (err) {
                  console.error('Error writing file:', err);
                  return;
                }
                console.log('User deleted successfully.');
            });
        } else {
            console.log('User not found.');
        }
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
}

//exporting the methods
module.exports = { 
    getUsers, 
    addUser, 
    updateUser, 
    deleteUser 
}