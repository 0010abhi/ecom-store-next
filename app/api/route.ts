import { NextRequest, NextResponse } from 'next'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')

    // Check if the user is authenticated
    if (!sessionCookie) {
        return NextResponse.json(
            { error: 'User is not authenticated' },
            { status: 401 }
        )
    }

    // Optionally parse and validate session data
    // You can add role-based checks here
    // if (session.user.role !== 'admin') {
    //     return NextResponse.json(
    //         { error: 'Unauthorized access: User does not have admin privileges.' },
    //         { status: 403 }
    //     )
    // }

    // Proceed with the route for authorized users
    return NextResponse.json({ success: true })
}

export async function POST(req: NextRequest) {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')

    // Check if the user is authenticated
    if (!sessionCookie) {
        return NextResponse.json(
            { error: 'User is not authenticated' },
            { status: 401 }
        )
    }

    // Proceed with the route for authorized users
    return NextResponse.json({ success: true })
}