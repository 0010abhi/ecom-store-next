'use client';
import { useState } from "react";

export default function About() {
    const [count, setCount] = useState(0);

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <h1>About Us</h1>
        <p>This is a template e-commerce store built with Next.js 13.</p>
        <p>Click count: {count}</p>
        <button onClick={() => setCount(count + 1)} style={{
            background: "#1a8917",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 4,
            cursor: "pointer"
        }}>Click me</button>
    </div>;
}       