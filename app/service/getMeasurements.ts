import { Measurement } from "../model/measurement";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

export const getMeasurements = async (from: dayjs.Dayjs, to: dayjs.Dayjs): Promise<Measurement[]> => {
    dayjs.extend(utc)
    const fromUTC = from.utc().format() 
    const toUTC = to.utc().format() 

    // Define the URL for the API endpoint
    const apiUrl = `http://localhost:8080/measurements/sensors/2?from=${fromUTC}&to=${toUTC}`;
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "",
        },
        mode: 'cors',
    };
    // Fetch da
    const response = await fetch(encodeURI(apiUrl), options)
    const data = await response.json();
    return data.data
}