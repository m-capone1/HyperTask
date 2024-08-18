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
        '#050C9C',
        '#3572EF',
        '#3ABEF9',
        '#A7E6FF'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div className='chart-container'>
      <h2 className='chart-container__header'>Progress Chart</h2>
      <div className='chart-container__chart'>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default DonutChart;