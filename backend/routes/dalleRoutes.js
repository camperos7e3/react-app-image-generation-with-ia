import express from 'express'
import { OPENAI_API_KEY } from '../config.js'
import OpenAI from 'openai'

const router = express.Router()

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
})

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!!' })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body

    const aiResponse = await openai.images.generate({
      prompt,
      model: 'dall-e-2',
      n: 1,
      response_format: 'b64_json',
      size: '1024x1024'
    })

    // const image = aiResponse.data.data[0].b64_json
    console.log(aiResponse)

    res.status(200).json({ photo: 'image' })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send(error.error.message || 'Something went wrong')
  }
})

export default router
