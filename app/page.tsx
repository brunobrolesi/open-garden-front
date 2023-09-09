'use client';
import React, { useState, useEffect } from 'react';
import { MeasurementChart } from './components/charts/MeasurementChart';
import { getMeasurements } from './service/getMeasurements';
import { Measurement } from './model/measurement';
import { DatePicker } from './components/inputs/Datepicker';
import dayjs from 'dayjs'

export default function Home() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [fromDate, setFromDate] = useState<dayjs.Dayjs>(dayjs().subtract(1, 'day'));
  const [toDate, setToDate] = useState<dayjs.Dayjs>(dayjs());
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    getMeasurements(fromDate, toDate).then((res) => setMeasurements(res))
      .catch((err) => setError(err)).finally(() => setLoading(false));
  }, [fromDate, toDate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="flex min-h-screen flex-col space-y-4 items-center justify-between p-24">
      <div className="flex space-x-20">
        <DatePicker
          value={fromDate}
          onChange={(date: dayjs.Dayjs) => setFromDate(date)}
          label='from'
          disableFuture={true}
        />
        <DatePicker value={toDate}
          onChange={(date: dayjs.Dayjs) => setToDate(date)}
          label='to'
          disableFuture={true}
          minDate={fromDate}
        />
      </div>
      <div className="grow min-w-[80%]">
      <MeasurementChart measurements={measurements} />
      </div>
    </main>
  )
}
