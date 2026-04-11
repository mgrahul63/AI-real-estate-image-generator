import { Router } from "express";
import { ObjectId } from "mongodb";
import { propertiesCollection } from "../collections/collections.js";
import { ImageGenerate } from "../models/image-generate.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    const filter = email ? { email } : {};

    const properties = await ImageGenerate.find(filter).lean();

    return res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch properties",
    });
  }
});

// post a property
router.post("/", async (req, res) => {
  try {
    const propertyData = req.body;
    const result = await propertiesCollection.insertOne(propertyData);
    // send response
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
});

// get a property
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await propertiesCollection.findOne(query);
    // send response
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
});

// delete a property
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await propertiesCollection.deleteOne(query);
    // send response
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
});

// update a property
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const updatedPropertyInfo = req.body;
    const options = { upsert: true };
    const updatedProperty = {
      $set: updatedPropertyInfo,
    };
    const result = await propertiesCollection.updateOne(
      query,
      updatedProperty,
      options,
    );
    // send response
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
