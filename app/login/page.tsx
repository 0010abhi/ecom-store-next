'use client';
import { useState } from "react";
import TextInput from "../_components/TextInput";

export default function LogIn() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function handleLogInSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // const response = await fetch('http://localhost:3000/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ username, password }),
        //     credentials: 'include' // <--- CRITICAL for sessions
        // });

        const response = await new Promise<Response>((resolve) => {
            setTimeout(() => {
                resolve(new Response(null, { status: 200 }));
            }, 7000);
        });
        if (response.ok) {
            alert("Logged in!");
        } else {
            alert("Login failed");
        }
        setLoading(false);
    };

    return (
        <div style={{
            display: 'flex',
            flexGrow: '1',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {
                loading ? <p>Logging in...</p> : <h1>Log In</h1>
            }
            <form onSubmit={handleLogInSubmit}>
                <TextInput name="username" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                <div>
                    <input name="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}