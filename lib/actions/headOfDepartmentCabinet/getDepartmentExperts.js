"use server"

import { fetcher } from "@/lib/api";

export async function getDepartmentExperts (jwt, departmentId) {
    try {
        return fetcher(
            `${process.env.STRAPI_API_URL}/cabinet-experts?filters[department][id][$eq]=${departmentId}`,
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