import { Schema, model } from 'mongoose';

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Brand = model('Brand', BrandSchema);

export default Brand;
