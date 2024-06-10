import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartVisual = ({ data }) => {

    const transformData = (dataList) => {
        const result = [];
        const educationStatusCount = {};

        // Count occurrences of each education status
        dataList.forEach(item => {
            const tribe = item.tribe || 'UNKNOWN';
            if (educationStatusCount[tribe]) {
                educationStatusCount[tribe]++;
            } else {
                educationStatusCount[tribe] = 1;
            }
        });

        // Convert the count object to the desired array format
        for (const [tribe, count] of Object.entries(educationStatusCount)) {
            result.push({ tribe: tribe, count });
        }

        return result;
    };
    const rawData = transformData(data)
    console.log(rawData)
    const transformDatas = (data) => {
        return data.map(item => ({
          name: item.tribe,
          value: item.count
        }));
      };
      const newData = transformDatas(rawData);
    return (
        <PieChart width={500} height={400}>
            <Pie
                data={newData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default PieChartVisual;
