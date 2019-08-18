const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    username: {
        type: String,
        required: true,
        unique: false
    }
});

UserSchema.pre('save', (next) => {
    // Check if document is new or a new password has been set
    if (this.isNew | this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if (err) { next(err); }
            document.password = hashedPassword;
            next();
        });
    } else {
        next();
    }
})

module.exports = mongoose.model('User', UserSchema);