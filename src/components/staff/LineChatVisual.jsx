import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineChartVisual({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart width="100%" height={300} className='w-full h-full' data={data}>
                <XAxis dataKey="age_bracket" />
                <YAxis dataKey={"user_count"} domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="user_count" stroke="#87E0B5" strokeWidth={4} />
            </LineChart>
        </ResponsiveContainer>

    )
}
