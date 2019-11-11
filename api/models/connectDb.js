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
        unique: true
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

const connectDb = () => {
    return mongoose.connect((MONGODB_URI || "mongodb+srv://adm:fktlfey@cluster0-z38lz.gcp.mongodb.net/noter?retryWrites=true&w=majority")
        , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
};

module.exports = { connectDb, User };