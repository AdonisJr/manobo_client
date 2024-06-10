import react from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default function AreaChartVisual({ data }) {
    const transformData = (dataList) => {
        const result = [];
        const educationStatusCount = {};
      
        // Count occurrences of each education status
        dataList.forEach(item => {
          const status = item.education_status || 'UNKNOWN';
          if (educationStatusCount[status]) {
            educationStatusCount[status]++;
          } else {
            educationStatusCount[status] = 1;
          }
        });
      
        // Convert the count object to the desired array format
        for (const [status, count] of Object.entries(educationStatusCount)) {
          result.push({ education_status: status, count });
        }   
      
        return result;
      };
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transformData(data)}>
                <XAxis dataKey="education_status" />
                <YAxis/>
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#2F5744" fill="#f5f5f5" />
            </AreaChart>
        </ResponsiveContainer>
    )
}