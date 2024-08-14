import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './DonutChart.scss';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DonutChart = ({countCards}) => {
    let cardCount = countCards();

  const data = {
    labels: ['To Do', 'In Progress', 'In Review','Completed'],
    datasets: [{
      label: 'Progress Chart',
      data: [cardCount.todo, cardCount.inprog, cardCount.inrev, cardCount.comp],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(0, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div className='chart-container'>
      <h2 className='chart-container__header'>Progress Chart</h2>
      <div className='chart'>
            <Doughnut data={data} />
      </div>
    </div>
  );
};

export default DonutChart;