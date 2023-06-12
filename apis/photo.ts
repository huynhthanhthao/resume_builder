import axios from 'axios';

export const getPhotoUrl = async (formData: any) => {
    try {
        const { data } = await axios.post('/api/photo', formData);

        return data.photo;
    } catch (error) {
        console.log(error);
    }
};
