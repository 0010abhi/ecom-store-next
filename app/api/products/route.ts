import { db }       from '@/app/lib/db';
import { products } from '@/db/schema';
import { eq, sql }  from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  console.log('Received GET request for products with id:', request.url, id);

  try {
    if (id) {
      const row = await db
        .select()
        .from(products)
        .where(eq(products.id, Number(id)))
        .limit(1);

      return NextResponse.json(row[0] ?? null);
    }

    const page   = parseInt(searchParams.get('page')  ?? '1');
    const limit  = parseInt(searchParams.get('limit') ?? '20');
    const offset = (page - 1) * limit;

    const [rows, [{ total }]] = await Promise.all([
      db.select().from(products).limit(limit).offset(offset),
      db.select({ total: sql<number>`count(*)` }).from(products),
    ]);

    return NextResponse.json({
      products: rows,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', message },
      { status: 500 }
    );
  }
}
