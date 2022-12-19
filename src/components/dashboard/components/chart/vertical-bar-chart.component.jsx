import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: false
        },
        title: {
            display: true,
            text: 'Speed Range In Km/h',
            position: 'bottom',
            color: '#00000099',
            font: {
                size: 16
            },
            padding: 20
        }
    }
};

const labels = [
    '<= 10',
    '11 - 20',
    '21 - 30',
    '31 - 40',
    '41 - 50',
    '51 - 60',
    '61 - 70',
    '71 - 80',
    '81 - 90',
    '91 - 100',
    '101 - 110',
    '111 - 120',
    '> 120'
];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
        // {
        //     label: 'Dataset 2',
        //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)'
        // }
    ]
};

export function VerticalBarChart() {
    return <Bar options={options} data={data} />;
}
