
interface TextInputType {
    name: string;
    value: string | undefined;
    onChange: (e: any) => void;
    placeholder?: string;
}

export default function TextInput({ name, placeholder, value, onChange }: TextInputType) {

    return (<div>
        <input name={name} placeholder={placeholder} type="text" value={value} onChange={onChange} />
    </div>);
}