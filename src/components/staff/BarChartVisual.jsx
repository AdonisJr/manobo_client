import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import "./style.css";


export default function BarChartVisual({ members }) {
    const userCountPerYear = {};

    // Loop through the users array
    members.forEach(user => {
        // Extract the year from created_at for the current user
        const year = new Date(user.created_at).getFullYear();

        // If the year key doesn't exist in the userCountPerYear object, create it
        if (!userCountPerYear[year]) {
            userCountPerYear[year] = 0;
        }

        // Increment the count for the current year
        userCountPerYear[year]++;
    });

    // Convert the userCountPerYear object to the desired format
    const result = Object.keys(userCountPerYear).map(year => ({
        year: parseInt(year),
        count: userCountPerYear[year]
    }));

    return (
        <>
            <BarChart width={850} height={350} data={result} margin={{ top: 0, right: 0, left: 0, bottom: 5 }} className='bg-slate-200'>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fontSize: 14 }} label={{ value: '', position: 'insideBottom', fontSize: 16 }} angle={-10} textAnchor="end" interval={0} />
                <YAxis dataKey="count" domain={[0, dataMax => dataMax + 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#74E291" />
            </BarChart>
        </>

    )
}