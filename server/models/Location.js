import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const Location = mongoose.model('Location', LocationSchema);
export default Location;