"use client"

import ExpertCabinet from "@/components/ExpertCabinet/ExpertCabinet";
import HeadOfDepartmentCabinet from "@/components/HeadOfDepartmentCabinet/HeadOfDepartmentCabinet";
import Preloader from "@/components/Preloader/Preloader";
import { authMe } from "@/lib/actions/authorisation";
import { getTokenFromLocalCookie } from "@/lib/auth";
import { useFetchUser } from "@/lib/authProvider"
import { useEffect, useState } from "react";

export default function Cabinet() {
    const {user, loading} = useFetchUser();
    const jwt = getTokenFromLocalCookie();
    const [userRole, setUserRole] = useState(null);
    const [authUserData, setAuthUserData] = useState(null)
    const [isRoleLoading, setIsRoleLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            if (user && !loading) {
                if (!userRole) {
                    const response = await authMe(jwt);
                    setAuthUserData(response);
                    setUserRole(response.role.name);
                    setIsRoleLoading(false)
                }
            }
        };
        fetchData();
    }, [user, userRole, loading, jwt]);

    if(user && !loading) {
        if(userRole && !isRoleLoading) {
            switch (userRole) {
                case "expert":
                    return(
                        <main className="container mx-auto text-[black]">
                            <h1 className="text-center my-4">Кабінет судово-медичного експерта {authUserData.username}</h1>
                            <ExpertCabinet user={authUserData} jwt={jwt} />
                        </main>
                    )
                case 'headOfDepartment':
                    return(
                        <main className="container mx-auto text-[black]">
                            <h1 className="text-center my-4">Кабінет завідуючого відділом/відділенням {authUserData.username}</h1>
                            <HeadOfDepartmentCabinet user={authUserData} jwt={jwt}/>
                            </main>
                    )
                default:
                    break;
            }
        } else {
            return (
                <main  className="container mx-auto text-[black]">
                    <Preloader />
                </main>
                )
        }
    } else {
        return (
            <main className="container mx-auto text-[black] flex flex-row justify-center items-center">
                <h1>
                    Для доступу до сторінки потрібно авторизуватись!
                </h1>
            </main>
        )
    }
}
