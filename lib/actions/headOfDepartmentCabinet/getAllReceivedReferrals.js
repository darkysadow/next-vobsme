"use server"

import { fetcher } from "@/lib/api"

export default async function getAllReceivedReferrals(jwt, departmentId) {
    const responseData = await fetcher(`${process.env.STRAPI_API_URL}/referrals?populate=*&filters[recipient_department][id][$eq]=${departmentId}`, {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    })
        .then(response => response.data)
    return responseData
}