var users = [];
var user = {
    id: '123',
    name: 'Andrew',
    room: 'The Office Fans'
}

function addUser(user) {
    var user = user; // object to push onto array
    users.push(user);
    return users
}

console.log(addUser(user));