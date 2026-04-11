# 🤖 AI Estate Image Generator

A powerful AI-driven backend for real estate platforms that automatically generates **property descriptions, valuations, images, and marketing posters**.

This project is designed for developers building **modern real estate applications** that require AI-powered automation for listings, pricing insights, and marketing content.

---

# 🌐 Live Demo

Live Preview:
[https://ai-real-estate-image-generator-fron.vercel.app/](https://ai-real-estate-image-generator-fron.vercel.app/)

---

# 🚀 Project Overview

AI Estate Image Generator transforms simple property input into complete AI-generated outputs:

- 🧠 AI-powered property valuation
- 🖼️ Realistic property image generation
- ✍️ Professional property description writing
- 📢 Social media marketing poster generation
- 💾 Property data storage with MongoDB
- ☁️ Cloud image hosting with Cloudinary

This backend is ideal for:

- Real estate marketplaces
- Property listing platforms
- Rental management systems
- Property marketing tools
- AI automation learning projects

---

# 🧠 Features

### 🤖 AI Generation

- Generate property descriptions
- Generate realistic property images
- Generate property valuation
- Generate social media marketing posters
- Generate full AI listing (text + image + valuation)

### 🏠 Property Management

- Add property
- Get all properties
- Get single property
- Get user properties
- Update property
- Delete property

### 🔐 Authentication Support

- Firebase Authentication
- Email & Password Login
- Google Login
- GitHub Login
- Facebook Login

---

# 🛠️ Technologies Used

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- OpenAI API
- GROQ API
- Hugging Face API
- Cloudinary
- Axios
- Sharp
- imgbb-uploader
- Morgan

## Authentication

- Firebase Authentication

## Development Tools

- ESLint
- Vite Plugin React
- React Hooks ESLint Plugin

---

# 🔗 API Endpoints

# AI Routes

### Generate Property Description

POST /openai/generateText

---

### Generate Property Image

POST /openai/generateImage

---

### Generate Full AI Listing

POST /openai/generateTextAndImage

Returns:

- Property valuation
- Property description
- Generated image

---

### Generate Social Media Poster

POST /openai/generateSocialMediaPoster

---

# Property Routes

### Save Property

POST /properties

---

### Get All Properties

GET /properties

---

### Get Single Property

GET /properties/:id

---

### Get User Properties

GET /properties/user?email=

---

### Update Property

PUT /properties/:id

---

### Delete Property

DELETE /properties/:id

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_connection_url

OPENAI_API_KEY=your_openai_api_key
HF_API_KEY=your_huggingface_api_key
GROQ_API_KEY=your_groq_api_key

imageAPIKey=your_imgbb_api_key

CLOUDINARY_CLOUD_NAME=cloudinary_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret

---

# 🧠 How It Works

1. Frontend sends property data

2. Backend processes request using OpenAI, Groq, and Hugging Face

3. AI generates:
   - Property valuation
   - Property description
   - Property image
   - Social media poster

4. Image uploaded to Cloudinary

5. Data stored in MongoDB

6. Response returned to frontend

---

# 🚀 How To Run Locally

# Step 1 — Clone Frontend

Repository:

[https://github.com/mgrahul63/AI-real-estate-image-generator-frontend](https://github.com/mgrahul63/AI-real-estate-image-generator-frontend)

```bash
git clone https://github.com/mgrahul63/AI-real-estate-image-generator-frontend
cd AI-real-estate-image-generator-frontend
npm install
npm run dev
```

Frontend runs at:

[http://localhost:5173](http://localhost:5173)

---

# Step 2 — Clone Backend

Repository:

[https://github.com/mgrahul63/AI-real-estate-image-generator](https://github.com/mgrahul63/AI-real-estate-image-generator)

```bash
git clone https://github.com/mgrahul63/AI-real-estate-image-generator
cd AI-real-estate-image-generator
npm install
npm run server
```

Backend runs at:

[http://localhost:5000](http://localhost:5000)

---

# 🧪 Development Setup

```bash
npm install
npm run dev
```

---

# 📁 Project Structure

```
backend
 ├── routes
 ├── controllers
 ├── models
 ├── utils
 ├── config
 └── server.js
```

---

# ⚠️ Important Notes

- Add `"type": "module"` in package.json
- Enable MongoDB Atlas Network Access (0.0.0.0/0)
- Add environment variables before running project
- Make sure Cloudinary credentials are valid

---

# 🎯 Use Cases

- Real Estate SaaS Platform
- Property Marketplace
- Rental Listing Platform
- AI Automation Learning Project
- Property Marketing Tool

---

# 👨‍💻 Author

**MD. Rahul Mia**  
Frontend & Full Stack Developer
Jatiya Kabi Kazi Nazrul Islam University (JKKNIU)

---

# 📬 Contact

Email: [mgrahul639@gmail.com](mailto:mgrahul639@gmail.com)

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed for educational and development purposes.

---

# 🚀 Future Improvements

- Multi-image generation
- AI video generation for properties
- Smart pricing prediction
- Map integration
- Advanced analytics dashboard

---

**Built with AI for modern real estate platforms**
