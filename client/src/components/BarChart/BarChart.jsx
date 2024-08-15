import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './BarChart.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({countPoints}) => {
  let points = countPoints();

  const chartData = {
    labels: ["To-Do", "In Review", "In Progress", "Completed"],
    datasets: [
      {
        label: 'Story Points',
        data: [points.toDo, points.inProg, points.inRev, points.comp],
        backgroundColor: ['#050C9C', '#3572EF', '#3ABEF9', '#A7E6FF'],
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
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
    <div className='bar-chart'>
      <h2 className='bar-chart__header'>Story Points Distribution</h2>
      <div className='bar-chart__container'>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BarChart;