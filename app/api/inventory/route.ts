import { db }                         from '@/app/lib/db';
import { inventory, products }         from '@/db/schema';
import { eq, sql }                     from 'drizzle-orm';
import { NextRequest, NextResponse }   from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  try {
    if (productId) {
      const rows = await db
        .select({
          id:        inventory.id,
          productId: inventory.productId,
          title:     products.title,
          quantity:  inventory.quantity,
          warehouse: inventory.warehouse,
          updatedAt: inventory.updatedAt,
        })
        .from(inventory)
        .innerJoin(products, eq(inventory.productId, products.id))
        .where(eq(inventory.productId, Number(productId)));

      return NextResponse.json(rows);
    }

    const page   = parseInt(searchParams.get('page')  ?? '1');
    const limit  = parseInt(searchParams.get('limit') ?? '20');
    const offset = (page - 1) * limit;

    const [rows, [{ total }]] = await Promise.all([
      db
        .select({
          id:        inventory.id,
          productId: inventory.productId,
          title:     products.title,
          quantity:  inventory.quantity,
          warehouse: inventory.warehouse,
          updatedAt: inventory.updatedAt,
        })
        .from(inventory)
        .innerJoin(products, eq(inventory.productId, products.id))
        .limit(limit)
        .offset(offset),
      db.select({ total: sql<number>`count(*)` }).from(inventory),
    ]);

    return NextResponse.json({ inventory: rows, total, page, limit, pages: Math.ceil(total / limit) });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Inventory fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory', message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity, warehouse } = body;

    if (!productId || quantity == null) {
      return NextResponse.json({ error: 'productId and quantity are required' }, { status: 400 });
    }

    const [result] = await db
      .insert(inventory)
      .values({ productId: Number(productId), quantity: Number(quantity), warehouse });

    return NextResponse.json({ id: result.insertId, productId, quantity, warehouse }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Inventory insert error:', error);
    return NextResponse.json({ error: 'Failed to create inventory record', message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, quantity, warehouse } = body;

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    await db
      .update(inventory)
      .set({ ...(quantity != null && { quantity: Number(quantity) }), ...(warehouse !== undefined && { warehouse }) })
      .where(eq(inventory.id, Number(id)));

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Inventory update error:', error);
    return NextResponse.json({ error: 'Failed to update inventory', message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  try {
    await db.delete(inventory).where(eq(inventory.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Inventory delete error:', error);
    return NextResponse.json({ error: 'Failed to delete inventory record', message }, { status: 500 });
  }
}
