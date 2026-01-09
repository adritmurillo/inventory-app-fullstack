export default function FieldError({ error }) {
    if (!error) return null;
    return <div className="text-danger small mt-1">{error}</div>;
}
