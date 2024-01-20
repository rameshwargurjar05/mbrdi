import React, { useRef, useEffect, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import echarts, { EChartsOption, ECharts, SeriesOption } from 'echarts';

const LineChart: React.FC = () => {
  const chartRef = useRef<EChartsReact>(null);

  const initialOption: EChartsOption = {
    title: {
      text: 'line chart'
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
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ],

    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
        xAxisIndex: [0], // Zoom on the first xAxis
      },
    ],
  };

  const [chartData, setChartData] = useState(initialOption.series);


  useEffect(() => {
    if (chartRef.current) {
      const chartInstance: ECharts = chartRef.current.getEchartsInstance();
      chartInstance.setOption(initialOption);

      // Interpolate line chart value and plot next to the original data
      chartInstance.on('dataZoom', (event: any) => {
        // Handle the zoom event, you can use event.start and event.end to get the zoomed range
        console.log('Zoomed:', event);
      });

      // Save chart as an image
      const saveAsImageButton = document.getElementById('saveAsImage');
      if (saveAsImageButton) {
        saveAsImageButton.addEventListener('click', () => {
          const link = document.createElement('a');
          link.download = 'chart.png';
          const dataURL = chartInstance.getDataURL({
            pixelRatio: window.devicePixelRatio || 1,
            backgroundColor: chartInstance.getOption()?.backgroundColor || '#fff',
          });
          link.href = dataURL;
          link.click();
        });
      }

      // If 2 data is dragged to chart then delete one chart by selecting the specific line
      chartInstance.on('legendselectchanged', (event: any) => {
        const selectedSeries = event.selected;
        const seriesToDelete = Object.keys(selectedSeries).find(
          (seriesName) => selectedSeries[seriesName] === false
        );
        if (seriesToDelete) {
          // Delete the series from the state or take any other action
          setChartData((prevChartData) =>
            Array.isArray(prevChartData)
              ? prevChartData.filter((series) => series.name !== seriesToDelete)
              : []
          );
        }
        console.log(chartData,'tests');
      });

      // Provide 2 or more crosshairs on chart to mark multiple data points
      chartInstance.on('crosshairs', (event: any) => {
        // Handle the crosshair event, event has information about the data points
        console.log('Crosshair:', event);
      });
    }
  }, [chartData, initialOption]);

  return (
    <div>
      <EChartsReact ref={chartRef} option={initialOption} />
      <button id="saveAsImage">Save as Image</button>
    </div>
  );
};

export default LineChart;
