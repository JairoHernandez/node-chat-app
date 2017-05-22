[{
    id: '/#agvadar3w',
    name: 'Andrew',
    room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id) which is socketid
// getUser(id)
// getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id, name, room}; // object to push onto array
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        // return user that was removed
        /** MY WAY
         * var users = this.users.filter((user) => user.id !== id);
        return users;*/
        var user = this.getUser(id); // { id: '1', name: 'Mike', room: 'Node Course' }
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
            // [ { id: '2', name: 'Jen', room: 'React Course' },
            //   { id: '3', name: 'Julie', room: 'Node Course' } ]
        }
        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    // Get all of the users whose room matches the room parameter.
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room); // when returning true array keeps user row in array
        
        // covert array of objects to array of strings(the names)
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};

/**Older way of creating users using a function to push them in to an array 
var users = [];
var addUser = (id, name, room) => {
    users.push();
};
modules.export = {addUser}; */

/**Newer way with classes 
class Person {
    constructor(name, age) { // constructor function is called by default and is optional
        this.name = name;
        this.age = age;
    }
    getUserDescription() {
        return `${this.name} is ${this.age} year(s) old`
    }
}

var me = new Person('Jairo', 37);
console.log(me.name, me.age);
console.log(me.getUserDescription()); */