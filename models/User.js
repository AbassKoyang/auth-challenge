import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        minlength: 8, // Minimum length of 8 characters
        maxlength: 20, // Maximum length of 20 characters
        // Add any additional validation rules, such as a regular expression pattern
        match: /^[a-zA-Z0-9]+$/, // Alphanumeric characters only
      },
      
    image: {
        type: String,
    }

});

const User = models.User || model("User", UserSchema);
export default User;