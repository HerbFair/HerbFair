import Review from '../models/Review.model';

const createReview = async (review) => {
    try {
        const data = await Review.create(review);
        await data.save();
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getReviewById = async (id) => {
    try {
        const data = await Review.findById(id);
        if (!data) {
            throw new Error('Review not found');
        }
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateReview = async (id, review) => {
    try {
        const data = await Review.findByIdAndUpdate(id, review, { new: true });
        if (!data) {
            throw new Error('Review not found');
        }
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteReview = async (id) => {
    try {
        const data = await Review.findByIdAndDelete(id);
        if (!data) {
            throw new Error('Review not found');
        }
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getAllRevviews = async () => {
    try {
        const data = await Review.find();
        if (!data) {
            throw new Error('No Reviews found');
        }
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

const ReviewRepository = {
    createReview,
    getReviewById,
    updateReview,
    deleteReview,
    getAllRevviews,
};

export default ReviewRepository;
