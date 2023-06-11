import axios from 'axios';
const Diacritics = require('diacritic');
export const getEmployee = async (username: string | any) => {
    try {
        const res = await axios.get(`/api/employee`, { params: { username } });
        return res.data ?? {};
    } catch (error) {
        console.log(error);
    }
};

export const createEmployee = async (params: any) => {
    try {
        const data = await axios.post(
            `/api/employee`,
            {
                username: params.username,
                userData: params,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};

export function formatUsername(fullName: string) {
    // Chuẩn hóa chuỗi tiếng Việt
    const normalizedFullName = Diacritics.clean(fullName);

    // // Tách chuỗi họ và tên thành danh sách các từ
    const nameParts = normalizedFullName.split(' ');

    const formattedName = nameParts[nameParts.length - 1] + '.' + nameParts[0];

    return formattedName.toLowerCase();
}
