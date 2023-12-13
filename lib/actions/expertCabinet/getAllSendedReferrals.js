"use server"

import { fetcher } from "@/lib/api"

export default async function getAllSendedReferrals(jwt, expertId) {
    const responseData = await fetcher(`${process.env.STRAPI_API_URL}/referrals?populate=*&filters[sender][id][$eq]=${expertId}`, {
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    })
        .then(response => response.data)
    return responseData
}