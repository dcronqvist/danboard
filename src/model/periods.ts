import axios from "axios";

export type Period = {
    startTimestamp: number
    endTimestamp: number
    start: Date
    end: Date
    year: number
}

export const getCurrentPeriod = async(accessToken: string): Promise<Period> => {
    const response = await axios.get("https://api.dcronqvist.se/v1/economy/periods/months/current", {
        headers: {
            Authorization: accessToken
        }
    }).then(response => response.data);

    return {
        startTimestamp: response.start_timestamp,
        endTimestamp: response.end_timestamp,
        start: new Date(response.start),
        end: new Date(response.end),
        year: response.year
    }
}