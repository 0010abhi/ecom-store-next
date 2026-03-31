
export default function OtpInput({ name, placeholder, value, onChange }: any) {
    return (<div style={{ display: 'flex', minWidth: '300px' }}>
        <input style={{
            height: '20px',
            padding: '8px',
            marginBottom: '12px',
        }} name={name} placeholder={placeholder} type="text" value={value} onChange={onChange} />
    </div>);
}