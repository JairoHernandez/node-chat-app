var moment = require('moment');

var date = moment();
//date.add(1, 'year');
date.add(100, 'year').subtract(9, 'months');
console.log(date.format('MMM YYYY')); // May 2018
console.log(date.format('MMM Do, YYYY')); // May 16th, 2018

// 10:35 am fortmat
// 6:01 am

var createAt = 1234;
var date2 = moment(createAt); // default epoch + createAt
console.log(date2.format('h:mm a'));

var someTimestamp = moment().valueOf(); // epoch time
console.log(someTimestamp);