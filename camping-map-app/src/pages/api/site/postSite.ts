import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const {
    title,
    address,
    price,
    accessRoad,
    activities,
    type,
    location
  } = req.body
  if (!title || !address || !location) {
    return res.status(400).json({
      error: 'Missing required fields: Title, Address, and/or Location.'
    })
  }
  // TODO: determine if we want to check if a Site with a certain field (i.e. Location) exists
  try {
    const newSite = await prisma.site.create({
      data : { title, address, price, accessRoad, activities, type, location }
    })
    res.status(201).json(newSite)
  } catch (error) {
    console.error('Error adding site: ', error);
    res.status(500).json({ error: "Failed to add site." });
  }
}
