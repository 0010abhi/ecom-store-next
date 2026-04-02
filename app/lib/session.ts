
export async function decrypt(encryptedData: string | undefined): Promise<any> {
    if (!encryptedData) return null
    try {
        const decrypted = Buffer.from(encryptedData, 'base64').toString('utf-8')
        return JSON.parse(decrypted)
    } catch (error) {
        console.error('Error decrypting session:', error)
        return null
    }
}

export async function getSession(req: Request) {
    const cookieHeader = req.headers.get('cookie')
    if (!cookieHeader) return null

    const cookies = cookieHeader.split(';').reduce((acc: Record<string, string>, cookie) => {
        const [key, value] = cookie.trim().split('=')
        acc[key] = value
        return acc
    }, {})

    if (!cookies.session) return null

    const session = await decrypt(cookies.session)
    return session
}