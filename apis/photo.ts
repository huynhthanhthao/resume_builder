export const getPhotoUrl = async (file: any) => {
    try {
        const CLOUDINARY_UPLOAD_PRESET = 'qle01vei';
        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drjynwuyt/upload';

        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        return await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        })
            .then((data) => {
                return data.json();
            })
            .catch((error) => {
                console.log('error', error);
            });
    } catch (error) {
        console.log(error);
    }
};
