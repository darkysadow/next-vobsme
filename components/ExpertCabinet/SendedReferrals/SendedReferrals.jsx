"use client"

import { postNewRefferal } from "@/lib/actions/expertCabinet/postNewReferral";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { log } from "util";

const SendedReferrals = ({ referralList, departmentsList, authUserAllData, jwt }) => {
    const [sendedReferralsList, setSendedReferralsList] = useState(referralList)
    const [departmentSelectedToSend, setDepartmentSelectedToSend] = useState(undefined);
    const [isNewReferralDialogOpen, setIsNewReferralDialogOpen] = useState(false)
    const [referralTitleData, setReferralTitleData] = useState('');
    const DEFAULT_FILE_NAME = "Файл не обрано!"
    const [file, setFile] = useState({ fileName: DEFAULT_FILE_NAME, file: null })
    const [isSendedReferralDialogOpen, setIsSendedReferralDialogOpen] = useState(false);
    const [selectedSendedReferral, setSelectedSendedReferral] = useState(undefined);

    const setFileData = (target) => {
        const file = target.files[0];
        setFile(prevState => ({ ...prevState, fileName: file.name }));
        setFile(prevState => ({ ...prevState, file }));
    }

    const closeAddDialog = () => {
        setDepartmentSelectedToSend(undefined);
        setIsNewReferralDialogOpen(false);
        setReferralTitleData('');
        setFile({ fileName: DEFAULT_FILE_NAME, file: null })
    }

    const handleOpenSendedDialog = (referral) => {
        console.log(referral)
        setSelectedSendedReferral(referral)
        setIsSendedReferralDialogOpen(true);
    }

    const closeSendedDialog = () => {
        setIsSendedReferralDialogOpen(false)
        setSelectedSendedReferral(undefined)
    }

    const handleSubmitReferral = async (e) => {
        const response = await postNewRefferal(jwt, authUserAllData.id, authUserAllData.attributes.department.data.id, e)
        closeAddDialog();
        setSendedReferralsList(prevState => [response, ...prevState])
        alert("Направлення успішно відправлене")

    }

    return (
        <>
            <div className="w-full my-4">
                <div className="flex flex-row justify-between items-center border-b border-headerFirst border-opacity-30 pb-2">
                    <h2>Надіслані направлення</h2>
                    <Button variant={"outlined"} onClick={() => setIsNewReferralDialogOpen(true)}>Створити нове +</Button>
                </div>
                <div className="flex flex-col w-full gap-2 mt-5 ">
                    {sendedReferralsList.map(referral => (
                        <div key={referral.id} className="flex flex-row gap-2 py-1 justify-between items-center hover:bg-[#d9e9fc]">
                            <div className="w-[180px]">{referral.attributes.referralTitle}</div>
                            <div className="w-[250px]">В:{referral.attributes.recipient_department.data.attributes.title}</div>
                            <div className="w-[180px]">Стан: {referral.attributes.status}</div>
                            <Button variant="outlined" 
                                    disabled={referral.attributes.status !== 'з відповіддю'} 
                                    onClick={() => handleOpenSendedDialog(referral)}
                            >Відкрити</Button>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog open={isSendedReferralDialogOpen} onClose={closeSendedDialog}>
                <DialogTitle>{selectedSendedReferral && selectedSendedReferral.attributes.referralTitle}</DialogTitle>
                <DialogContent>
                    <div className="flex flex-row">Стан: <p style={{textTransform: 'capitalize'}}> {selectedSendedReferral && selectedSendedReferral.attributes.status}</p></div>
                    <div className='flex flex-col justify-start my-3'>
                        Файл направлення: <br/>{selectedSendedReferral && selectedSendedReferral.attributes.referralDocument.data.attributes.url.split('/').pop()}
                        <Button variant="outlined">Завантажити файл</Button>
                    </div>
                    <div className="flex flex-col justify-start">
                        Висновок експерта<br/>
                        {selectedSendedReferral && selectedSendedReferral.attributes.recipient.data.attributes.name}<br/>
                        {selectedSendedReferral && selectedSendedReferral.attributes.recipient_department.data.attributes.title}<br/><br/>
                        Документ:<br/>
                        {selectedSendedReferral && selectedSendedReferral.attributes.responseDocument.data.attributes.name}<br/>
                        <Button variant="outlined">Завантажити файл</Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeSendedDialog}>
                        Закрити
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isNewReferralDialogOpen} onClose={closeAddDialog}>
                <form action={(e) => handleSubmitReferral(e)}>
                    <DialogTitle>Створити направлення</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={referralTitleData}
                            onChange={(e) => setReferralTitleData(e.target.value)}
                            label="Направлення:"
                            name="referralText"
                            className="my-2 w-full"
                        />
                        <FormControl fullWidth className="my-2 w-full">
                            <InputLabel id="select-department" className="ml-2">Оберіть відділення</InputLabel>
                            <Select
                                className="mx-2"
                                labelId="select-department"
                                value={departmentSelectedToSend?.id ? departmentSelectedToSend.id : ''}
                                onChange={(e) => setDepartmentSelectedToSend(departmentsList.find(item => item.id === e.target.value))}
                                label="Оберіть відділення"
                                name="department"
                            >
                                <MenuItem value={undefined}>
                                    <em>Оберіть Відділення</em>
                                </MenuItem>
                                {departmentsList && departmentsList.filter(item => item.id !== authUserAllData.attributes.department.data.id)
                                    .map((department) => (
                                        <MenuItem key={department.id} value={department.id}>{department.attributes.title}</MenuItem>
                                    ))}

                            </Select>
                        </FormControl>
                        <div className="my-3">
                            Додайте файл направлення:
                        </div>
                        <Stack style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center' }}>
                            <Button variant="outlined" component="label">
                                {file.fileName === DEFAULT_FILE_NAME ? "Додати документ" : "Замінити документ"}
                                <input type="file" name="files" hidden onInput={(event) => { setFileData(event.target) }} accept=".pdf, .doc, .docx" />
                            </Button>
                            <Typography>{file.fileName}</Typography>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeAddDialog}>
                            Закрити
                        </Button>
                        <Button
                            type={"submit"}
                            disabled={!departmentSelectedToSend || referralTitleData === '' || file.fileName === DEFAULT_FILE_NAME}>
                            Створити +
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default SendedReferrals;