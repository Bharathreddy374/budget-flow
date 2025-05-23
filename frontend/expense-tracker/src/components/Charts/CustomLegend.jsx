import React from 'react';

const CustomLegend = (props) => {
    console.log("Legend props:",props)
  const { payload } = props;

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload?.map((entry, index) => (
        <div className="flex items-center space-x-2" key={`legend-${index}`}>
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
