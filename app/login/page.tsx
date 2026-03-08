'use client';
import { useState } from "react";

export default function LogIn() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function handleLogInSubmit(e: React.FormEvent) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include' // <--- CRITICAL for sessions
        });

        if (response.ok) {
            alert("Logged in!");
        } else {
            alert("Login failed");
        }
    };

    return (
        <div>
            <form onSubmit={handleLogInSubmit}>
                <input name="username" type="text" onChange={(e) => { setUsername(e.target.value) }} />
                <input name="password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}