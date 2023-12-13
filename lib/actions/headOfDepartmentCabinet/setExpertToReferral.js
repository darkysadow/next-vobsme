"use server"

import { fetcher } from "@/lib/api";

export default async function setExpertToReferral(jwt, refId, expertId) {
    const updatedData = {
        data: {
            recipient: {
                id: expertId
            }
        }
    }
    try {
        const response = await fetcher(`${process.env.STRAPI_API_URL}/referrals/${refId}?populate=*`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(updatedData),
            cache: 'no-store'
        });
        const data = await response.data
        return data;
    } catch (error) {
        console.error('Помилка при відправленні PUT-запиту:', error);
        throw error;
    }
}