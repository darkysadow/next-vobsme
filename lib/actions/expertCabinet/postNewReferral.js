"use server"

import { fetcher } from "@/lib/api";

export async function postNewRefferal (jwt, expertId, expertDepartment, formData) {
    let file = new FormData();
    file.append("files", formData.get('files'));

    try {
        const response = await fetcher(
            `${process.env.STRAPI_API_URL}/upload/`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: file
            }
        )
        const postedDocumentId = await response[0].id; 
        try {
            const reqBody = {
                referralTitle: formData.get('referralText'),
                referralDocument: postedDocumentId,
                status: "надіслане",
                sender: expertId,
                sender_department: expertDepartment,
                recipient_department: formData.get('department')
            }
            const response = await fetcher(
                `${process.env.STRAPI_API_URL}/referrals?populate=*`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({data: reqBody })
                }
            )
            const data = await response.data; 
            return data;
        } catch (error) {
            console.error('Помилка при відправленні POST-запиту:', error);
            throw error;
        }
    } catch (error) {
        console.error('Помилка при відправленні POST-запиту:', error);
        throw error;
    }
    
}