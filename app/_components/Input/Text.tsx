
interface TextInputType {
    name: string
    value: string | undefined
    onChange: (e: any) => void
    placeholder?: string
}

export default function TextInput({ name, placeholder, value, onChange }: TextInputType) {
    const inputId = `input-${name}`
    
    return (
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 5 }}>
            <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
                {name}
            </label>
            <input
                id={inputId}
                className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name={name}
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}