
export default function SubmitButton({ title }: any) {
    return (<input type="submit" style={{
        background: "#1a8917",
        color: "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: 4,
        cursor: "pointer"
    }} value={title} />);
} 