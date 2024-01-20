import React, { useRef, useEffect, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import echarts, { EChartsOption, ECharts } from 'echarts';

interface LineChartProps {
  chartDatamain: any; 
}
const LineChart: React.FC<LineChartProps> = ({ chartDatamain }) => {
  const chartRef = useRef<EChartsReact>(null);

  const initialOption: EChartsOption = chartDatamain;

  const [chartData, setChartData] = useState(initialOption.series);


  useEffect(() => {
    if (chartRef.current) {
      const chartInstance: ECharts = chartRef.current.getEchartsInstance();
      chartInstance.setOption(initialOption);

      // Save chart as an image
      // const saveAsImageButton = document.getElementById('saveAsImage');
      // if (saveAsImageButton) {
      //   saveAsImageButton.addEventListener('click', () => {
      //     const link = document.createElement('a');
      //     link.download = 'chart.png';
      //     const dataURL = chartInstance.getDataURL({
      //       pixelRatio: window.devicePixelRatio || 1,
      //       backgroundColor: chartInstance.getOption()?.backgroundColor || '#fff',
      //     });
      //     link.href = dataURL;
      //     link.click();
      //   });
      // }

      // If 2 data is dragged to chart then delete one chart by selecting the specific line
      chartInstance.on('legendselectchanged', (event: any) => {
        const selectedSeries = event.selected;
        console.log(selectedSeries,'working')
        const seriesToDelete = Object.keys(selectedSeries).find(
          (seriesName) => selectedSeries[seriesName] === false
        );
       
        if (seriesToDelete) {         
          setChartData((prevChartData) =>
            Array.isArray(prevChartData)
              ? prevChartData.filter((series) => series.name !== seriesToDelete)
              : []
          );
        }
             
      });

      // Provide 2 or more crosshairs on chart to mark multiple data points
      chartInstance.on('crosshairs', (event: any) => {
        // Handle the crosshair event, event has information about the data points
        console.log('Crosshair:', event);
      });
    }
  }, [chartData, initialOption]);

  console.log(chartData,'chart available data')

  return (
    <div>
      <EChartsReact ref={chartRef} option={initialOption} />
      {/* <button id="saveAsImage">Save as Image</button> */}
    </div>
  );
};

export default LineChart;
