import axios from 'axios';

import config from '../config';

export const getLocation = async () => {
    try {
        const response = await axios.get(`${config.apiBASEURL}/location/fetchlocation`);
        return response.data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error;
    }
};