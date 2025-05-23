import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Customized,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length] || '#CCC'}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />

        {/* ✅ Fixed: Proper closing for showTextAnchor block */}
        {showTextAnchor && (
          <Customized
            component={({ width, height }) => {
              const cx = width / 2;
              const cy = height / 2;
              return (
                <>
                  <text
                    x={cx}
                    y={cy - 35}
                    textAnchor="middle"
                    fill="#666"
                    fontSize="14px"
                  >
                    {label}
                  </text>
                  <text
                    x={cx}
                    y={cy }
                    textAnchor="middle"
                    fill="#333"
                    fontSize="24px"
                    fontWeight="600"
                  >
                    {totalAmount}
                  </text>
                </>
              );
            }}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
