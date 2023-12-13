"use server"

import { fetcher } from "@/lib/api";

export async function addResponseToReferral(jwt, refId, formData) {
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
                data: {
                    responseDocument: postedDocumentId
                }
            }
            const response = await fetcher(
                `${process.env.STRAPI_API_URL}/referrals/${refId}?populate=*`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify(reqBody)
                }
            )
            const data = await response.data; 
            return data;
        } catch (error) {
            console.error('Помилка при відправленні PUT-запиту:', error);
            throw error;
        }
    } catch (error) {
        console.error('Помилка при відправленні POST-запиту:', error);
        throw error;
    }
    
}