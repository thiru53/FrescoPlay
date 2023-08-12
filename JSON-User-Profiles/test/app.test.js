const md5 = require("md5");
const app = require("../src/app");
const data = require("../src/data.json");

//testing the types of json
test("Checking the types of json", () => {
    expect(typeof data.profiles[0].name).toEqual("string");
    expect(typeof data.profiles[0].age).toEqual("number");
    expect(typeof data.profiles[0].email_id).toEqual("string");
    expect(typeof data.profiles[0].password).toEqual("string");
    expect(typeof data.profiles[0].work_experience).toEqual("number");
    expect(typeof data.profiles[0].id).toEqual("number");
    expect(typeof data.profiles[0].educational_qualifications).toEqual(typeof []);
});

//getting all the user profiles
test("Retriving all the user profiles", () => {
    const users = JSON.stringify(app.getUsers(undefined));
    expect(md5(users)).toEqual("2890a8870867e0ed058ef2174c96b3f4");
});

//getting user by id
test("Retriving a single user by id", () => {
    const user = JSON.stringify(app.getUsers(3));
    expect(md5(user)).toEqual("f03e921d998b2da31e9f3888be439b5e");
});

//getting users sorted by age ascending
test("Retriving the users sorted in ascending order", () => {
    const users = JSON.stringify(app.getUsers("sortByAgeAsc"));
    expect(md5(users)).toEqual("1e8bfa692a7914bb3aa24a068ff00db3");
});

//getting users sorted by age descending
test("Retriving the users sorted in descending order", () => {
    const users = JSON.stringify(app.getUsers("sortByAgeDesc"));
    expect(md5(users)).toEqual("ac0d0d100c0e486263e5f16bb6277393");
});

//adding user data
test("Adding a user profile", () => {
    const data = {
        id: 5,
        name: "New User",
        email_id: "newuser@gmail.com",
        age: 31,
        educational_qualifications: ["Ph.D"],
        work_experience: 10,
        password: "NewPassword@12"
    }
    const users = app.getUsers(undefined);
    app.addUser(data);
    expect(users.length).toBe(5);
    expect(users[4].email_id).toBe("newuser@gmail.com");
});

//adding with age lesser than 20
test("Adding a user profile with invalid age", () => {
    const data = {
        id: 5,
        name: "New User",
        email_id: "newuser@gmail.com",
        age: 18,
        educational_qualifications: ["Ph.D"],
        work_experience: 10,
        password: "NewPassword@12"
    }
    const users = app.getUsers(undefined);
    const response = app.addUser(data);
    expect(users.length).toBe(5);
    expect(response).toBe("Validations failed for some fields!!!")
});

//adding with invalid email
test("Adding a user profile with invalid email", () => {
    const data = {
        id: 5,
        name: "New User",
        email_id: "newuser#gmail.com",
        age: 32,
        educational_qualifications: ["Ph.D"],
        work_experience: 10,
        password: "NewPassword@12"
    }
    const users = app.getUsers(undefined);
    const response = app.addUser(data);
    expect(users.length).toBe(5);
    expect(response).toBe("Validations failed for some fields!!!")
});

//adding with password of length lesser than 8 characters
test("Adding a user profile with invalid password", () => {
    const data = {
        id: 5,
        name: "New User",
        email_id: "newuser@gmail.com",
        age: 33,
        educational_qualifications: ["Ph.D"],
        work_experience: 10,
        password: "New@12"
    }
    const users = app.getUsers(undefined);
    const response = app.addUser(data);
    expect(users.length).toBe(5);
    expect(response).toBe("Validations failed for some fields!!!")
});

//Updating user data
test("Updating a user profile", () => {
    const data = {
        email_id: "updateduser@gmail.com",
        age: 45,
        work_experience: 20,
        educational_qualifications: "Ph.D",
        password: "Updated@12"
    }
    app.updateUser(data, 2);
    const user = app.getUsers(2);
    expect(user[0].age).toBe(45);
    expect(user[0].email_id).toBe("updateduser@gmail.com");
    expect(user[0].password).toBe("Updated@12");
    expect(user[0].work_experience).toBe(20);
    expect(user[0].educational_qualifications).toEqual(expect.arrayContaining(["B.Sc", "MBA", "Ph.D"]));
});

//Updating user data with invalid age
test("Updating a user profile with invalid age", () => {
    const data = {
        email_id: "updateduser@gmail.com",
        age: 18,
        work_experience: 20,
        educational_qualifications: "Ph.D",
        password: "Updated@12"
    }
    const response = app.updateUser(data, 2);
    const users = app.getUsers(undefined);
    expect(users.length).toBe(5);
    expect(response).toBe("Validations failed for some fields!!!")
});

//Updating user data with invalid email
test("Updating a user profile with invalid email", () => {
    const data = {
        email_id: "updateduser#gmail.com",
        age: 34,
        work_experience: 20,
        educational_qualifications: "Ph.D",
        password: "Updated@12"
    }
    const response = app.updateUser(data, 2);
    const users = app.getUsers(undefined);
    expect(users.length).toBe(5);
    expect(response).toBe("Validations failed for some fields!!!")
});

//Updating user data with invalid password
test("Updating a user profile with invalid password", () => {
    const data = {
        email_id: "updateduser@gmail.com",
        age: 33,
        work_experience: 20,
        educational_qualifications: "Ph.D",
        password: "Up@12"
    }
    const response = app.updateUser(data, 2);
    const users = app.getUsers(undefined);
    expect(users.length).toBe(5);
    expect(response).toBe("Validations failed for some fields!!!")
});

//Updating user data with invalid id
test("Updating a user profile with invalid id", () => {
    const data = {
        email_id: "updateduser@gmail.com",
        age: 33,
        work_experience: 20,
        educational_qualifications: "Ph.D",
        password: "Updated@12"
    }
    const response = app.updateUser(data, 12);
    const users = app.getUsers(undefined);
    expect(users.length).toBe(5);
    expect(response).toBe("Invalid id")
});

//deleting a user profile
test("Deleting a user profile", () => {
    app.deleteUser(4);
    const users = app.getUsers(undefined);
    expect(users.length).toBe(4);
});

//deleting a user profile
test("Deleting a user profile", () => {
    app.deleteUser(4);
    const users = app.getUsers(undefined);
    const user = app.getUsers(4);
    expect(users.length).toBe(4);
    expect(user[0]).toBe(undefined);
});

//deleting a user profile with invalid id
test("Deleting a user profile with invalid id", () => {
    const response = app.deleteUser(4);
    const users = app.getUsers(undefined);
    expect(users.length).toBe(4);
    expect(response).toBe("Invalid id");
});