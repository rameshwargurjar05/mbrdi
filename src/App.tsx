import React from 'react';
import './App.css';
import LineChart from './Component/LineChart';
function App() {
  return (
    <div className="App">
     <div className='chart-wrapper'>
      <div className='for-line-chart'>
          <LineChart/>
      </div>
     </div>
    </div>
  );
}

export default App;
