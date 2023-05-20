import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        rating: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Review = model('Review', reviewSchema);

export default Review;
