import axios from "axios";
import sharp from "sharp";

import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();

import cloudinary from "../config/cloudinary.js";
import { ImageGenerate } from "../models/image-generate.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateText = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0,
    });
    const createdText = response.data.choices[0].text;
    return res.status(200).json({
      success: true,
      data: createdText,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  let imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });
    const imageUrl = response.data.data[0].url;
    return res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

// create text and image (FULL FREE VERSION)
const generateTextAndImage = async (req, res) => {
  const { prompt, email,displayName } = req.body;

  try {
    // =========================
    // 1. TEXT GENERATION (GROQ)
    // =========================
    const textResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `
You are a real estate expert.

Property data:
${prompt}

Return ONLY valid JSON:
{
  "description": "short property description",
  "price": "estimated price",
  "analysis": "investment insight"
}
            `,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const rawText = textResponse.data?.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      const match = rawText.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    } catch {
      parsed = null;
    }

    if (!parsed) {
      parsed = {
        description: rawText,
        price: "N/A",
        analysis: "N/A",
      };
    }

    // =========================
    // 2. SHORT PROMPT OBJECT
    // =========================
    const promptObj = Object.fromEntries(
      prompt.split("\n").map((line) => line.split(":")),
    );

    // =========================
    // 3. BUILD SHORT RANDOM IMAGE PROMPT
    // =========================
    const buildImagePrompt = (p) => {
      const buildingTypes = [
        "apartment building",
        "residential building",
        "apartment complex",
        "condominium",
        "modern flats",
        "housing complex",
      ];

      const styles = [
        "modern",
        "luxury",
        "minimal",
        "contemporary",
        "glass facade",
        "concrete design",
      ];

      const angles = [
        "front view",
        "aerial view",
        "street view",
        "corner view",
        "wide angle",
      ];

      const times = ["daylight", "sunset", "morning", "evening"];

      const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

      const seed = Date.now() + Math.random();

      return `${random(styles)} ${random(
        buildingTypes,
      )}, ${random(angles)}, ${random(times)}, realistic, ${p.city || "Bangladesh"}, seed ${seed}`;
    };

    const imagePrompt = buildImagePrompt(promptObj);

    // =========================
    // 4. FETCH IMAGE
    // =========================
    const fetchImage = async (url) => {
      try {
        const res = await axios.get(url, {
          responseType: "arraybuffer",
          timeout: 15000,
        });
        return res.data;
      } catch {
        return null;
      }
    };

    const uniqueSeed = Date.now() + Math.random();

    // =========================
    // 5. MULTIPLE IMAGE SOURCES
    // =========================
    const imageSources = [
      `https://image.pollinations.ai/p/${encodeURIComponent(
        imagePrompt + uniqueSeed,
      )}`,

      `https://image.pollinations.ai/p/${encodeURIComponent(
        "modern apartment building realistic " + uniqueSeed,
      )}`,

      `https://picsum.photos/800/600?random=${uniqueSeed}`,
    ];

    let imageBuffer = null;

    for (const url of imageSources) {
      imageBuffer = await fetchImage(url);
      if (imageBuffer) break;
    }

    if (!imageBuffer) {
      throw new Error("All image sources failed");
    }

    // =========================
    // 6. OPTIMIZE IMAGE
    // =========================
    const optimizedImage = await sharp(imageBuffer)
      .jpeg({ quality: 90 })
      .toBuffer();

    // =========================
    // 7. UPLOAD CLOUDINARY
    // =========================
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "ai-real-estate-image" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(optimizedImage);
    });

    // =========================
    // 8. SAVE DATABASE
    // =========================
    const savedData = await ImageGenerate.create({
      email,
      displayName,
      prompt,
      description: parsed.description,
      price: parsed.price,
      analysis: parsed.analysis,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    // =========================
    // 9. RESPONSE
    // =========================
    return res.status(200).json({
      success: true,
      data: savedData,
    });
  } catch (err) {
    console.log("ERROR:", err?.response?.data || err.message);

    return res.status(500).json({
      success: false,
      message: err?.response?.data?.error || err.message,
    });
  }
};

// const generateTextAndImage = async (req, res) => {
//   const { prompt, email } = req.body;

//   try {
//     // =========================
//     // 1. TEXT GENERATION (GROQ)
//     // =========================
//     const textResponse = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama-3.1-8b-instant",
//         messages: [
//           {
//             role: "user",
//             content: `
// You are a real estate expert.

// Property data:
// ${prompt}

// Return ONLY valid JSON:
// {
//   "description": "short property description",
//   "price": "estimated price",
//   "analysis": "investment insight"
// }
//             `,
//           },
//         ],
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     const rawText = textResponse.data?.choices?.[0]?.message?.content || "";

//     let parsed;
//     try {
//       const match = rawText.match(/\{[\s\S]*\}/);
//       parsed = match ? JSON.parse(match[0]) : null;
//     } catch {
//       parsed = null;
//     }

//     if (!parsed) {
//       parsed = {
//         description: rawText,
//         price: "N/A",
//         analysis: "N/A",
//       };
//     }

//     // =========================
//     // 2. IMAGE GENERATION (STABLE MULTI-SOURCE)
//     // =========================
//     const fetchImage = async (url) => {
//       try {
//         const res = await axios.get(url, {
//           responseType: "arraybuffer",
//           timeout: 8000,
//         });
//         return res.data;
//       } catch {
//         return null;
//       }
//     };

//     const imageSources = [
//       `https://image.pollinations.ai/p/luxury%20real%20estate%20building`,
//       `https://image.pollinations.ai/p/modern%20house%20architecture`,
//       `https://picsum.photos/800/600`,
//     ];

//     let imageBuffer = null;

//     for (const url of imageSources) {
//       imageBuffer = await fetchImage(url);
//       if (imageBuffer) break;
//     }

//     if (!imageBuffer) {
//       throw new Error("All image sources failed");
//     }

//     // =========================
//     // 3. IMAGE PROCESSING
//     // =========================
//     const optimizedImage = await sharp(imageBuffer)
//       .jpeg({ quality: 90 })
//       .toBuffer();

//     // =========================
//     // 4. UPLOAD TO CLOUDINARY
//     // =========================
//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ folder: "ai-real-estate-image" }, (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         })
//         .end(optimizedImage);
//     });

//     // =========================
//     // 5. SAVE TO DATABASE
//     // =========================
//     const savedData = await ImageGenerate.create({
//       email,
//       prompt,
//       description: parsed.description,
//       price: parsed.price,
//       analysis: parsed.analysis,
//       imageUrl: uploadResult.secure_url,
//       publicId: uploadResult.public_id,
//     });

//     // =========================
//     // 6. RESPONSE
//     // =========================
//     return res.status(200).json({
//       success: true,
//       data: savedData,
//     });
//   } catch (err) {
//     console.log("ERROR:", err?.response?.data || err.message);

//     return res.status(500).json({
//       success: false,
//       message: err?.response?.data?.error || err.message,
//     });
//   }
// };
// generate social media poster
const generateSocialMediaPoster = async (req, res) => {
  const { features, image } = req.body;
  try {
    // list the features
    const listedFeatures = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `List the key features from ${features}`,
      max_tokens: 1000,
      temperature: 0,
    });
    const listedFeaturesResponse = listedFeatures.data.choices[0].text;
    // generate final code response
    const finalResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I want to make a instagram post using JSX for react app. Page text must be white in color. There will be a heading <h1>THE BEAUTIFUL HOME IS NOW AVAILABLE!</h1> it will be bold in weight. I will give you information about the post. Include the information in the post.Here are the information: Key Features: \n- ${listedFeaturesResponse}\nImage: ${image}\nUse this image as background image with no-repeat.Overlay a slightest dark color over the background and add 1rem padding in inner div.\nFor key features use <ul><li></li></ul>\nText must be left\nParagraph will be small in font size/nUse 1.5rem padding in full page.\nUse Tailwind CSS for styling.Write some extra text for advertise\nDo not use inline styles. Make sure that for style use Tailwind CSS. For background image make sure that you can use tailwind css arbitrary value like bg-[url(imageLink)].`,
      max_tokens: 1000,
      temperature: 0,
    });
    const finalPosterResponse = finalResponse.data.choices[0].text;
    // check if a jsx response has errors
    const checkJsxErrors = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${finalPosterResponse}\ncheck this JSX code has any error.\nIf has any error either fix it or let it be as it is and give me only the code no additional text. Thank you.`,
      max_tokens: 1000,
      temperature: 0,
    });
    const fixedJsxErrors = checkJsxErrors.data.choices[0].text;
    return res.status(200).json({
      success: true,
      data: fixedJsxErrors,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

export {
  generateImage,
  generateSocialMediaPoster,
  generateText,
  generateTextAndImage,
};
