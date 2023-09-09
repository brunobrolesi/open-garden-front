import { useEffect, useState } from "react";
import { LineChart } from "./LineChart";
import { Measurement } from "../../model/measurement";
import { ChartData } from "chart.js";
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

type MeasurementChartProps = {
  measurements: Measurement[];
};

const mapMeasurementsToChartData = (measurements: Measurement[]): ChartData<'line'> => {
  dayjs.extend(customParseFormat)
  const labels = measurements.map((d: Measurement) => dayjs(d.time).utc().format('DD/MM/YYYY HH:mm'))
  const values = measurements.map((d: Measurement) => d.value)

  return {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: values,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        
      }
    ],
  }
}

export const MeasurementChart = (props : MeasurementChartProps) => {
  const [data, setData] = useState<ChartData<'line'>>({labels: [], datasets:[]});

  useEffect(() => {
    setData(mapMeasurementsToChartData(props.measurements))
  }, [props.measurements]);

  return (
    <>
    <LineChart data={data} />
    </>
  )
}