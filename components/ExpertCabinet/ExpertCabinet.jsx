"use client"

import { getAllAuthUserData } from "@/lib/actions/expertCabinet/getAllAuthUserData";
import { getDepartmentsList } from "@/lib/actions/expertCabinet/getDepartmentsList";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { postNewRefferal } from "@/lib/actions/expertCabinet/postNewReferral";
import getAllSendedReferrals from "@/lib/actions/expertCabinet/getAllSendedReferrals";
import SendedReferrals from "./SendedReferrals/SendedReferrals";
import ReceivedReferrals from "./ReceivedReferrals/ReceivedReferrals";
import getAllReceivedReferrals from "@/lib/actions/expertCabinet/getAllReceivedReferrals";

const ExpertCabinet = ({ user, jwt }) => {
    const [departmentsList, setDepartmentsList] = useState(undefined);
    const [authUserAllData, setAuthUserAllData] = useState(undefined);
    const [sendedReferralsList, setSendedReferralsList] = useState(undefined);
    const [receivedReferralsList, setReceivedReferralsList] = useState(undefined)


    useEffect(() => {
        const fetchData = async () => {
            if (!authUserAllData && user) {
                const response = await getAllAuthUserData(jwt, user.expertId)
                
                setAuthUserAllData(response)
                const sendedReferralsResponse = await getAllSendedReferrals(jwt, response.id)
                setSendedReferralsList(sendedReferralsResponse)
                const receivedReferralsResponse = await getAllReceivedReferrals(jwt, response.id);
                setReceivedReferralsList(receivedReferralsResponse);
            }
            if (!departmentsList) {
                const response = await getDepartmentsList(jwt);
                setDepartmentsList(response)
            }
            
        };
        fetchData();
    }, [authUserAllData, departmentsList, sendedReferralsList, receivedReferralsList])

    if (authUserAllData && departmentsList && sendedReferralsList && (receivedReferralsList !== undefined)) {
        return (
            <div className="w-full">
                <ReceivedReferrals 
                    receivedReferralList={receivedReferralsList}
                    jwt={jwt}
                />
                <SendedReferrals 
                    referralList={sendedReferralsList} 
                    departmentsList={departmentsList} 
                    authUserAllData={authUserAllData}
                    jwt={jwt}
                />
            </div>
        )
    } else {
        return (
            <Preloader />
        )
    }
}


export default ExpertCabinet;