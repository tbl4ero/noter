const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: {type: String},
    text: {type: String},
    noteId: {
        type: String
    }
});

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        index: true
    },
    password: {
        type: String,
        unique: false
    },
    token: {
        type: String,
        unique: true
    },
    notes: { 
        type: [noteSchema],
        unique: false
    }
});

userSchema.set('versionKey', false);

const User = mongoose.model('User', userSchema);
User.on('index', () => console.log("created index"));

const connectDb = (address) => {
    return mongoose.connect((address)
        , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
};

module.exports = { connectDb, User };