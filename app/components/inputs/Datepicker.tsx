import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as MUIDataPicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'

type DatePickerProps = {
  value: dayjs.Dayjs;
  onChange: (date: dayjs.Dayjs) => void;
  label?: string;
  disableFuture?: boolean;
  maxDate?: dayjs.Dayjs;
  minDate?: dayjs.Dayjs;
}

export const DatePicker = (props: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDataPicker 
        value={props.value}
        // @ts-ignore
        onChange={props.onChange} 
        format="DD/MM/YYYY"
        label={props.label}
        disableFuture={props.disableFuture}
        maxDate={props.maxDate}
        minDate={props.minDate}
      />
    </LocalizationProvider>
  );
}