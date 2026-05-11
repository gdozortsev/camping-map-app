import type { NextApiRequest, NextApiResponse } from 'next'
import { createClerkClient } from '@clerk/clerk-sdk-node'
import dotenv from 'dotenv'

dotenv.config()

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      error: 'Email is required'
    })
  }

  try {
    // Find user by email
    const users = await clerkClient.users.getUserList({
      emailAddress: [email]
    })

    if (users.length === 0) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    const user = users[0]

    return res.status(200).json({
      success: true,
      message: 'User found',
      userId: user.id
    })
  } catch (error: any) {
    console.error('Signin error:', error)

    return res.status(500).json({
      error: error?.errors?.[0]?.message || 'Failed to sign in'
    })
  }
}