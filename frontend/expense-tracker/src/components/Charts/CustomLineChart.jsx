import React from 'react'
import { XAxis,YAxis,ResponsiveContainer,CartesianGrid,Area,AreaChart,Tooltip} from 'recharts'

const CustomLineChart = ({data}) => {
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
            <p className="text-xs font-semibold text-purple-800 mb-1">{`Category : ${payload[0].payload.category}`}</p>

              <p className="text-sm text-gray-600"> <span className="text-sm font-medium text-gray-900">
                ₹{payload[0].payload.amount}
                </span></p>
            </div>
          );
        }
        return null;
      }

  return (
<div className="bg-white shadow-md rounded-lg p-4">
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorAmount" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#4f46e5"
          fillOpacity={1}
          fill="url(#colorAmount)"
        />
      </AreaChart>
    </ResponsiveContainer>
</div>  )
}

export default CustomLineChart