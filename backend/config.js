import { config } from 'dotenv'

config()
export const MONGODB_URI = process.env.MONGODB_URL

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

export const PORT = process.env.PORT
