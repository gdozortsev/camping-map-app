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

  const { email, password, firstName, lastName } = req.body

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      error: 'All fields are required'
    })
  }

  try {
    const user = await clerkClient.users.createUser({
      emailAddress: [email],
      password,
      firstName,
      lastName,

      publicMetadata: {
        role: 'user',
        app: 'federal-camping-map'
      }
    })

    console.log('User created:', user.id)

    return res.status(200).json({
      success: true,
      message: 'Account created successfully',
      userId: user.id
    })
  } catch (error: any) {
    console.error('Signup error:', error)

    return res.status(500).json({
      error: error?.errors?.[0]?.message || 'Failed to create account'
    })
  }
}