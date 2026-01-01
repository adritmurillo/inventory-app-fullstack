import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';

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

    const totalValue = data.reduce((sum, item) => sum + (item.value || 0), 0);

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '360px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={90}
                        outerRadius={135}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="label"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColorForCategory(entry.label)} />
                        ))}
                        <Label
                            value={`$${totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                            position="center"
                            style={{ fontSize: '1rem', fontWeight: 700, fill: '#212529' }}
                        />
                    </Pie>
                    <Tooltip
                        formatter={(value) =>
                            `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        }
                        contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" wrapperStyle={{ fontSize: '0.9rem' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}