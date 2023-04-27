import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Category = model('Category', CategorySchema);

export default Category;
