import mongoose, { Document } from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please type your name'],
  },
  email: {
    type: String,
    required: [true, 'Please type your email'],
    unique: true,
    validate: [validator.isEmail, 'Please type a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please type a password'],
    minlength: 8,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

UserSchema.virtual('tasksCount').get(function () {
  return this.tasks.length;
});

UserSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    delete ret.tasks;
    delete ret.id;
  },
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    delete ret.tasks;
    delete ret.id;
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
