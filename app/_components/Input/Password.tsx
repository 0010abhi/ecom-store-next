
export default function PasswordInput({ name, placeholder, value, onChange }: any) {
    return (<div style={{ display: 'flex', minWidth: '300px' }}>
        <input style={{
            height: '20px',
            padding: '8px',
            marginBottom: '12px',
        }} name={name} placeholder={placeholder} type="password" value={value} onChange={onChange} />
    </div>);
}