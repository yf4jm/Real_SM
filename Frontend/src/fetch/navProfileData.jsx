

import Api from '../AxiosInstance'; // Ensure the correct path to AxiosInstance

export const fetchProfile = async () => {
    try {
        const profileResponse = await Api.get('http://127.0.0.1:8000/api/profile');
        return profileResponse.data;
    } catch (error) {

    }
};
