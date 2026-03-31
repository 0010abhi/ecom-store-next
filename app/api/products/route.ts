import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('Received GET request for products with id:', request.url, id);
    try {
        const connection = await pool.getConnection();

        if (id) {
            // Get single product
            const [rows] = await connection.query(
                'SELECT * FROM products WHERE id = ?',
                [id]
            );
            connection.release();
            return NextResponse.json(rows[0] || null);
        } else {
            // Get all products with pagination
            const page = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '20');
            const offset = (page - 1) * limit;

            const [products] = await connection.query(
                'SELECT * FROM products LIMIT ? OFFSET ?',
                [limit, offset]
            );

            const [countResult] = await connection.query('SELECT COUNT(*) as total FROM products');

            connection.release();
            return NextResponse.json({
                products,
                total: countResult[0]?.total || 0,
                page,
                limit,
                pages: Math.ceil((countResult[0]?.total || 0) / limit),
            });
        }
    } catch (error: any) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products', message: error.message },
            { status: 500 }
        );
    }
}
