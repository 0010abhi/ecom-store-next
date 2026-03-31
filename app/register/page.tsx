'use client';
import { useState } from 'react';
import TextInput from '../_components/Input/Text';
import EmailInput from '../_components/Input/Email';
import PasswordInput from '../_components/Input/Password';
import DateInput from '../_components/Input/Date';
import SubmitButton from '../_components/Button/Submit';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <div style={{ display: 'flex' }}>
            <h1>Register</h1>
        </div>

        <form>
            <TextInput name="name" placeholder="Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <EmailInput name="email" placeholder="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <PasswordInput name="password" placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <DateInput name="dob" placeholder="Date of Birth" value={dob} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)} />
            <SubmitButton title="Register" />
        </form>
    </div>;
}