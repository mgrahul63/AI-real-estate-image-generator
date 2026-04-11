import mongoose from "mongoose";

const imageGenerateSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    displayName: {
      type: String,
    },

    prompt: {
      type: String,
    },

    description: {
      type: String,
    },

    price: {
      type: String,
    },

    imageUrl: {
      type: String,
    },

    publicId: {
      type: String,
    },
  },
  { timestamps: true },
);

const ImageGenerate = mongoose.model("ImageGenerate", imageGenerateSchema);

export { ImageGenerate };
