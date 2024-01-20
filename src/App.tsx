import React,{useEffect, useState} from 'react';
import './App.css';
import LineChart from './Component/LineChart';
import DriveRoute from './Component/DriveRoute';

interface SeriesEntry {
  name: string;
  type: string;
  stack: string;
  data: number[];
}

const chartData = {
  title: {
    // text: 'line chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [] as SeriesEntry[], // Initialize as an empty array

  // Add dataZoom property at the root level
  dataZoom: [
    {
      type: 'inside', // Enable zooming using the mouse wheel
      start: 50, // Start percentage of the zoomed area
      end: 100, // End percentage of the zoomed area
    },
    
    {
      type: 'inside', // Enable zooming using the mouse wheel
      yAxisIndex: 10, // Specify the yAxis index for zooming along the y-axis
      start: 10, // Start percentage of the zoomed area
      end: 100, // End percentage of the zoomed area
    },
  ],
};

// Generating 100 entries for the series
for (let i = 0; i < 15; i++) {
  chartData.series.push({
    name: `Series ${i + 1}`,
    type: 'line',
    stack: 'Total',    
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000)),
  });

  // Pushing only the name to legend.data
  chartData.legend.data.push(`Series ${i + 1}`);
}
console.log(chartData);

const geoMapData = {
  // Your geo map data structure
};


function App() {
  const [chartapidata, setchartapidata] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const retrievedDataString = localStorage.getItem('chartData');
    if (retrievedDataString !== null) {
      const retrievedData = JSON.parse(retrievedDataString);
      setchartapidata(retrievedData);
      setLoading(false); 
    }
    else {
         localStorage.setItem('chartData' , JSON.stringify(chartData))
    }
  }, []);

  return (
    <div className="App">
      <div className='chart-wrapper'>
        <div className='for-line-chart'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <LineChart chartDatamain={chartapidata} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
