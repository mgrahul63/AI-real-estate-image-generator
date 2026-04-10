import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    location: String,
    description: String,
    image: String,
  },
  { timestamps: true },
);

const propertiesCollection = mongoose.model("Property", propertySchema);

export { propertiesCollection };
