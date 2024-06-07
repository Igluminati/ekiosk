import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Handles POST requests to create a new order.
 * 
 * @param {NextApiRequest} req - The Next.js API route request object.
 * @returns {Promise<NextApiResponse>} A promise that resolves with the Next.js API route response object.
 */
export async function POST(req) {
  try {
    console.log('Prisma client initialized:', prisma); // Log prisma object

    // Wait for Prisma to connect
    await prisma.$connect();
    console.log('Prisma client connected');

    const data = await req.json();
    console.log('Received data:', data);
    const { cardNumber, expiryDate, cvc, name, phone, email, items } = data;

    const newOrder = await prisma.Orders.create({ // Use Orders with capital T
      data: {
        cardNumber,
        expiryDate,
        cvc,
        name,
        phone,
        email,
        trackingNo: '',
        fulfilled: false,
        items: {
          createMany: {
            data: items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      },
      include: {
        items: true,
      },
    });

    console.log('New order created:', newOrder);

    return NextResponse.json({ message: 'Order created successfully!', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Failed to create order.', error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}