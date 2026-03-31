
interface TextInputType {
    name: string;
    value: string | undefined;
    onChange: (e: any) => void;
    placeholder?: string;
}

export default function TextInput({ name, placeholder, value, onChange }: TextInputType) {
    return (<div style={{ display: 'flex', minWidth: '300px' }}>
        <input style={{
            height: '20px',
            padding: '8px',
            marginBottom: '12px',
        }} name={name} placeholder={placeholder} type="text" value={value} onChange={onChange} />
    </div>);
}