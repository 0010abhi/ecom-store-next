'use client';

export default function LogInButton() {
    function handleLogIn() {
        // Go To LogIn
        window.location.href = '/login';
    }

    return <button className="border p-4 border-white" onClick={() => {handleLogIn()}}>Log In</button>
}