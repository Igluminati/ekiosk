import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Handles GET requests to fetch all items.
 * 
 * @returns {Promise<NextApiResponse>} A promise that resolves with the Next.js API route response object.
 */
export async function GET() {
  try {
    const items = await prisma.catalogueItem.findMany();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ message: 'Failed to fetch items.', error }, { status: 500 });
  }
}

/**
 * Handles POST requests to create a new item.
 * 
 * @param {NextApiRequest} req - The Next.js API route request object.
 * @returns {Promise<NextApiResponse>} A promise that resolves with the Next.js API route response object.
 */
export async function POST(req) {
  try {
    const data = await req.json();

    const newItem = await prisma.catalogueItem.create({
      data: data,
    });
    console.log('New item created:', newItem);
    return NextResponse.json({ message: 'Item created successfully!' });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ message: 'Failed to create item.', error }, { status: 400 });
  }
}
