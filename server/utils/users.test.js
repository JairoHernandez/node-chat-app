const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    var users; // accessible in beforeEach() and test case(s) below.

    // Get's called before every single test case.
    beforeEach(() => {
        users = new Users();
        users.users = [
            { id: '1', name: 'Mike', room: 'Node Course' },
            { id: '2', name: 'Jen', room: 'React Course' },
            { id: '3', name: 'Julie', room: 'Node Course' }
        ];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        // For arrays or objects you have to use toEqual and not toBe.
        // console.log(users.users);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        /** MY WAYT
        var userId = users.users[0].id;
        var userRemoved = users.removeUser(userId); 
        //console.log(userRemoved); //[ { id: '2', name: 'Jen', room: 'React Course' },
                                  //    { id: '3', name: 'Julie', room: 'Node Course' } ]
        expect(userRemoved).toNotContain(users.users[0]);*/
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    
    it('should not remove user', () => {
        /**  MY WAY
        var id = '4'
        var userRemoved = users.removeUser(id); 
        //console.log(userRemoved); 
        expect(userRemoved).toEqual(users.users);*/
        var userId = '99';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

    it('shold return names for node course', () => {
        var userList = users.getUserList('Node Course');
        //console.log(userList); // [ 'Mike', 'Julie' ]
        expect(userList).toEqual(['Mike', 'Julie']);
    });

        it('shold return names for react course', () => {
        var userList = users.getUserList('React Course');
        // console.log(userList);
        expect(userList).toEqual(['Jen']);
    });
});