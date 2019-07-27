const mongoose = require('mongoose');

const {Schema} = mongoose;
/*
The reason why I'm use mongoDB

01. I use mac and it have MYSQL. but I use bitnami for using mysql. so If I use MYSQL, I need to some authentication with my finger.

02. But it is very small project, so I decide to use mongoDB, it is really useful at small project

03. But I can use MySQL and ORM(Object-Relation-Mapping)

*/

/*Schema Function*/
const User = new Schema({
    userId : String,
    userPassword : String,
    publishedDate: {
        type: Date,
        default: new Date()
    }
});

/*Making module for database modeling*/
module.exports = mongoose.model('User', User);
/*
mongoose.model('SchemaName','SchemaObject')
MongoDB make collection named SchemaNames which is the plural form
*/