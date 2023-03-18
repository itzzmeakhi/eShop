import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Rating = mongoose.model('Rating', ratingSchema);

export { ratingSchema };

export default Rating;