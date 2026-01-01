import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ValuePieChart({ data }) {
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

    if (!data || data.length === 0) return <div className="text-center py-5 text-muted">Sin datos financieros</div>;

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="label"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColorForCategory(entry.label)} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) =>
                            `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        }
                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}