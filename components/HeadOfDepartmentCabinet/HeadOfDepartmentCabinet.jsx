"use client"

import { getAllAuthUserData } from "@/lib/actions/expertCabinet/getAllAuthUserData";
import { getDepartmentExperts } from "@/lib/actions/headOfDepartmentCabinet/getDepartmentExperts";
import setExpertToReferral from "@/lib/actions/headOfDepartmentCabinet/setExpertToReferral";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

const { default: getAllReceivedReferrals } = require("@/lib/actions/headOfDepartmentCabinet/getAllReceivedReferrals");

const HeadOfDepartmentCabinet = ({ user, jwt }) => {
    const [departmentExperts, setDepartmentExperts] = useState(undefined);
    const [receivedReferralList, setReceivedReferralList] = useState(undefined);
    const [authUserAllData, setAuthUserAllData] = useState(undefined);
    const [selectedExpert, setSelectedExpert] = useState(undefined);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedReferral, setSelectedReferral] = useState(undefined)

    const closeDialog = () => {
        setDialogOpen(false)
        setSelectedReferral(undefined)
        setSelectedExpert(undefined)
    }

    const handleOpenDialog = (referral) => {
        setSelectedReferral(referral);
        setDialogOpen(true)
    }

    const handleSetExpert = async () => {
        const response = await setExpertToReferral(jwt, selectedReferral.id, selectedExpert.id)
        const updatedReferralList = receivedReferralList.map(referral => {
            if (referral.id === response.id) {
                return {
                    ...referral,
                    attributes: {
                        ...referral.attributes,
                        recipient: response.attributes.recipient
                    },
                };
            }
            return referral;
        });

        setReceivedReferralList(updatedReferralList);
        alert("Направлення успішно призначене експерту")
        closeDialog()
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!authUserAllData && user) {
                const response = await getAllAuthUserData(jwt, user.headOfDepartmentId)
                setAuthUserAllData(response)
                const receivedReferralsResponse = await getAllReceivedReferrals(jwt, response.attributes.department.data.id);
                setReceivedReferralList(receivedReferralsResponse);
                const departmentExpertsResponse = await getDepartmentExperts(jwt, response.attributes.department.data.id);
                setDepartmentExperts(departmentExpertsResponse)
            }
        };
        fetchData();
    }, [authUserAllData, receivedReferralList, departmentExperts])

    if(receivedReferralList) {
        if(receivedReferralList.length === 0) {
            return (
                <>
                    <div className="border-b border-headerFirst border-opacity-30 pb-2">
                        <h2>Отримані направлення:</h2>
                        <h2 className="my-4 text-center">Направлень не призначено!</h2>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="border-b border-headerFirst pb-2 flex flex-col">
                        <h2 className="border-b border-headerFirst border-opacity-30 pb-2">Отримані направлення:</h2>
                        <div className="flex flex-col w-full gap-2 mt-5 pb-2">
                            {receivedReferralList && receivedReferralList.map((referral) => (
                                <div key={referral.id} className={`${referral.attributes.recipient.data === null ? "px-3 flex flex-row gap-2 py-1 justify-between items-center bg-[#edcdd2]" : 'px-3 flex flex-row gap-2 py-1 justify-between items-center hover:bg-[#d9e9fc]'}`}>
                                    <div className="w-[180px]">{referral.attributes.referralTitle}</div>
                                    <div className="w-[250px]">В:{referral.attributes.recipient_department.data.attributes.title}</div>
                                    {referral.attributes.recipient.data === null ?
                                        <div className="w-[280px]">Експерта не призначено!</div> :
                                        <div className="w-[280px]">Експерт: {referral.attributes.recipient.data.attributes.name}</div>
                                    }
                                    <Button variant="outlined"
                                        disabled={referral.attributes.recipient.data !== null}
                                        onClick={() => handleOpenDialog(referral)}
                                    >Відкрити</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Dialog open={isDialogOpen} onClose={closeDialog}>
                        <DialogTitle>Призначити експерта</DialogTitle>
                        <DialogContent>
                        <FormControl fullWidth className="my-2 w-full">
                            <InputLabel id="select-expert" className="ml-2">Оберіть експерта</InputLabel>
                            <Select
                                className="mx-2"
                                labelId="select-expert"
                                value={selectedExpert?.id ? selectedExpert.id : ''}
                                onChange={(e) => setSelectedExpert(departmentExperts.find(item => item.id === e.target.value))}
                                label="Оберіть експерта"
                            >
                                <MenuItem value={undefined}>
                                    <em>Оберіть експерта</em>
                                </MenuItem>
                                {departmentExperts && departmentExperts.map((department) => (
                                        <MenuItem key={department.id} value={department.id}>{department.attributes.name}</MenuItem>
                                    ))}

                            </Select>
                        </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeDialog}>Закрити</Button>
                            <Button disabled={!selectedExpert} onClick={handleSetExpert}>Призначити</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )
        }
    } else {
        return(
            <h1>Завантаження данних</h1>
        )
    }
    
}

export default HeadOfDepartmentCabinet;