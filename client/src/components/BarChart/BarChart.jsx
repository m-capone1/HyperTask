import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({countPoints}) => {
  let points = countPoints();

  const chartData = {
    labels:["To-Do", "In Review", "In Progress", "Completed"],
    datasets: [
      {
        label: 'Story Points',
        data: [points.toDo, points.inProg, points.inRev, points.comp],
        backgroundColor: ['#050C9C', '#3572EF', '#3ABEF9', '#A7E6FF'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Story Points by Status',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Story Points Distribution</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;