# 🤖 AI Estate Image Generator

AI Estate Image Generator is a Node.js backend project that uses OpenAI, MongoDB, and image processing tools to generate property descriptions, valuations, images, and social media posters for real estate applications.

It is designed for developers building real estate platforms that need AI automation for listings and marketing content.

---

## 🚀 What this project does

This backend turns simple property input into full AI-generated outputs:

- Generates property valuation with AI
- Creates realistic property images
- Writes professional property descriptions
- Builds social media poster content using JSX + Tailwind idea generation
- Stores and manages property data in MongoDB

---

## 🛠️ Technologies used

- Node.js
- Express.js
- MongoDB (Atlas)
- OpenAI API
- axios
- sharp
- imgbb-uploader
- morgan

---

## 🔗 API Endpoints

### AI Routes

- POST /openai/generateText → Generate property description
- POST /openai/generateImage → Generate property image
- POST /openai/generateTextAndImage → Full AI valuation + image + text
- POST /openai/generateSocialMediaPoster → Generate marketing poster

### Property Routes

- POST /properties → Save property
- GET /properties → Get all properties
- GET /properties/:id → Get single property
- GET /properties/user?email= → Get user properties
- PUT /properties/:id → Update property
- DELETE /properties/:id → Delete property

---

## ⚙️ Environment variables

Create a `.env` file:

DB_USER=your_mongodb_username  
DB_PASSWORD=your_mongodb_password  
OPENAI_API_KEY=your_openai_api_key  
imageAPIKey=your_imgbb_api_key

---

## 🧠 How it works

Frontend sends property data → backend processes with OpenAI → AI generates text, valuation, and image → data is stored in MongoDB → response is sent back to frontend.

---

## 🧪 Setup

npm install  
npm run dev

---

## ⚠️ Notes

- Add "type": "module" in package.json
- Make sure MongoDB Atlas network access is enabled (0.0.0.0/0)
- Always check environment variables before running

---

## 👨‍💻 Author

AI Estate Image Generator backend project built for real estate automation using AI.

---

## 📬 Contact

mgrahul639@gmail.com
