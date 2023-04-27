import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    packages: [
      {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        availableQuantity: {
          type: Number,
          required: true,
        },
      },
    ],
    potency: {
      type: String,
      required: true,
    },
    mfd: {
      type: Date,
      required: true,
    },
    exp: {
      type: Date,
      required: true,
    },
    shippingWeight: {
      type: Number,
      required: true,
    },
    suggestedUse: {
      type: String,
      default: '',
    },
    ingredients: [
      {
        type: String,
      },
    ],
    allergens: [
      {
        type: String,
      },
    ],
    warnings: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Product = model('Product', ProductSchema);

export default Product;
