import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function CategoryChart({ data }) {
    const COLORS = [
        '#0d6efd', 
        '#198754', 
        '#dc3545', 
        '#ffc107', 
        '#0dcaf0', 
        '#6610f2', 
        '#fd7e14', 
        '#20c997', 
        '#e83e8c', 
        '#6c757d'  
    ];

    const getColorForCategory = (categoryName) => {
        if (!categoryName) return COLORS[0];
        const sum = categoryName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return COLORS[sum % COLORS.length];
    };

    if (!data || data.length === 0) {
        return <div className="text-center py-5 text-muted">No hay datos para mostrar</div>;
    }

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={50}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColorForCategory(entry.label)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}