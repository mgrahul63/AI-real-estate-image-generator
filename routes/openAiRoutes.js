import { Router } from "express";
import {
  generateImage,
  generateSocialMediaPoster,
  generateText,
  generateTextAndImage,
} from "../controllers/openAiControllers.js";

const router = Router();

// for openai test
router.post("/generateText", generateText);

// for openai test
router.post("/generateImage", generateImage);

// for image and text generation
router.post("/generateTextAndImage", generateTextAndImage);

// for generate social media poster
router.post("/generateSocialMediaPoster", generateSocialMediaPoster);

export default router;
