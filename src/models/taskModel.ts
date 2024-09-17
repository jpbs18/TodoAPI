import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please provide a task description'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

TaskSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.id;
  },
});

TaskSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.id;
  },
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
