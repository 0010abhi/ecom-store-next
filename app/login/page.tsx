'use client';
import { useState } from "react";
import { useAuth } from "../_context/AuthContext";
import { useRouter } from "next/navigation";
import TextInput from "../_components/Input/Text";
import SubmitButton from "../_components/Button/Submit";
import PasswordInput from "../_components/Input/Password";

export default function LogIn() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { login, loading } = useAuth();
    const router = useRouter();

    async function handleLogInSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        
        const success = await login(username, password);
        if (success) {
            alert("Logged in successfully!");
            router.push('/');
        } else {
            setError("Login failed. Username and password must be at least 3 characters.");
        }
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
            {error && <p style={{ color: '#e63946', marginBottom: '10px' }}>{error}</p>}
            <form onSubmit={handleLogInSubmit}>
                <TextInput name="username" placeholder="Username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value) }} />
                <PasswordInput name="password" placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} />
                <SubmitButton title="Log In" />
            </form>
        </div>
    )
}