import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

/**
 * Singleton instance of the Prisma Client for interacting with the database.
 * @type {PrismaClient}
 */
const prisma = new PrismaClient();

/**
 * Handles POST requests to create a new item.
 * 
 * @param {NextApiRequest} req - The Next.js API route request object.
 * @returns {Promise<NextApiResponse>} A promise that resolves with the Next.js API route response object.
 */
export async function POST(req) {
  try {
    /**
     * Parses the request body as JSON and returns the parsed data.
     * 
     * @throws {SyntaxError} If the request body is not valid JSON.
     * @returns {Object} The parsed JSON data from the request body.
     */
    const data = await req.json();

    /**
     * Creates a new item in the database using the Prisma client.
     * 
     * @param {Object} data - The data to use for creating the new item.
     * @returns {Promise<import("@prisma/client").Item>} A promise that resolves with the newly created item object.
     * @throws {Prisma.PrismaClientKnownRequestError} An error thrown by Prisma if the create operation fails.
     */
    const newItem = await prisma.item.create({
      data: data, // Use data from request body
    });
    console.log('New item created:', newItem);
    return NextResponse.json({ message: 'Item created successfully!' });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ message: 'Failed to create item.', error }, { status: 400 }); // Send error response
  }
}