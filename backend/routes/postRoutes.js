import express from 'express'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config.js'
import { v2 as cloudinary } from 'cloudinary'

import Post from '../mongodb/models/post.js'

const router = express.Router()

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({ success: true, data: posts })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' })
  }
})

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body
    const photoUrl = await cloudinary.uploader.upload(photo)

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url
    })

    res.status(200).json({ success: true, data: newPost })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' })
  }
})

export default router
