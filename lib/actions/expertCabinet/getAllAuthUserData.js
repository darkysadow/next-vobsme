"use server"

import { fetcher } from "@/lib/api";

export async function getAllAuthUserData (jwt, id) {
    try {
        return fetcher(
            `${process.env.STRAPI_API_URL}/cabinet-experts/${id}?populate=*`,
            {
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${jwt}`,
                }
            }
        ).then((data) => {
            
            return data.data;
        }).catch((error) => {
            console.error(error)
        })
    } catch (error) {
        console.error('Помилка при відправленні запиту:', error);
        throw error;
    }
}