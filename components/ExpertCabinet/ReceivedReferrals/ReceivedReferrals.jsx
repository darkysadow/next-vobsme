"use client"

import { addResponseToReferral } from "@/lib/actions/expertCabinet/addResponseToReferral";
import changeReferralStatus from "@/lib/actions/expertCabinet/changeReferralStatus";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";

const ReceivedReferrals = ({ receivedReferralList, jwt }) => {
    const [referralList, setReferralList] = useState(receivedReferralList);
    const [isReceivedReferralDialogOpen, setIsReceivedReferralDialogOpen] = useState(false);
    const [selectedReceivedReferral, setSelectedReceivedReferral] = useState(undefined);
    const DEFAULT_FILE_NAME = "Файл не обрано!"
    const [file, setFile] = useState({ fileName: DEFAULT_FILE_NAME, file: null })

    const setFileData = (target) => {
        const file = target.files[0];
        setFile(prevState => ({ ...prevState, fileName: file.name }));
        setFile(prevState => ({ ...prevState, file }));
    }

    

    const handleOpenReceivedDialog = (referral) => {
        console.log(referral)
        setSelectedReceivedReferral(referral)
        setIsReceivedReferralDialogOpen(true);
    }

    const closeReceivedDialog = () => {
        setIsReceivedReferralDialogOpen(false)
        setSelectedReceivedReferral(undefined)
    }

    const handleChangeReferralStatus = async (status) => {
        const response = await changeReferralStatus(jwt, selectedReceivedReferral.id, status)
        const updatedReferralList = referralList.map(referral => {
            if (referral.id === response.id) {
                return {
                    ...referral,
                    attributes: {
                        ...referral.attributes,
                        status: response.attributes.status,
                    },
                };
            }
            return referral;
        });

        setReferralList(updatedReferralList);
        setSelectedReceivedReferral(response)

    }

    const handleSubmitReferral = async (e) => {
        const response = await addResponseToReferral(jwt, selectedReceivedReferral.id, e)
        closeReceivedDialog();
        handleChangeReferralStatus('з відповіддю')
        alert("Направлення успішно відправлене")

    }


    if (referralList.length === 0) {
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
                        {referralList && referralList.map((referral) => (
                            <div key={referral.id} className="flex flex-row gap-2 py-1 justify-between items-center hover:bg-[#d9e9fc]">
                                <div className="w-[180px]">{referral.attributes.referralTitle}</div>
                                <div className="w-[250px]">В:{referral.attributes.recipient_department.data.attributes.title}</div>
                                <div className="w-[180px]">Стан: {referral.attributes.status}</div>
                                <Button variant="outlined"
                                    disabled={referral.attributes.status === 'з відповіддю'}
                                    onClick={() => handleOpenReceivedDialog(referral)}
                                >Відкрити</Button>
                            </div>
                        ))}
                    </div>
                </div>
                <Dialog open={isReceivedReferralDialogOpen} onClose={closeReceivedDialog}>
                    <form action={(e) => handleSubmitReferral(e)}>
                        <DialogTitle>{selectedReceivedReferral && selectedReceivedReferral.attributes.referralTitle}</DialogTitle>
                        <DialogContent>
                            <div className="flex flex-row">Стан: <p style={{ textTransform: 'capitalize' }}> {selectedReceivedReferral && selectedReceivedReferral.attributes.status}</p></div>
                            <div className='flex flex-col justify-start my-3'>
                                Файл направлення: <br />{selectedReceivedReferral && selectedReceivedReferral.attributes.referralDocument.data.attributes.url.split('/').pop()}
                                <Button variant="outlined">Завантажити файл</Button>
                            </div>
                            <div className='flex flex-col justify-start my-3'>
                                {(selectedReceivedReferral && selectedReceivedReferral.attributes.status === "надіслане") && <Button variant="outlined" onClick={() => handleChangeReferralStatus('отримане')}>Об'єкт(и) отримано</Button>}
                                {(selectedReceivedReferral && selectedReceivedReferral.attributes.status === "отримане") && <Button variant="outlined" onClick={() => handleChangeReferralStatus('в обробці')}>Почати роботу</Button>}
                                {(selectedReceivedReferral && selectedReceivedReferral.attributes.status === "в обробці") && (
                                    <><div className="my-3">
                                        Додайте файл висновку:
                                    </div>
                                        <Stack style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center' }}>
                                            <Button variant="outlined" component="label">
                                                {file.fileName === DEFAULT_FILE_NAME ? "Додати документ" : "Замінити документ"}
                                                <input type="file" name="files" hidden onInput={(event) => { setFileData(event.target) }} accept=".pdf, .doc, .docx" />
                                            </Button>
                                            <Typography>{file.fileName}</Typography>
                                        </Stack></>
                                )}


                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeReceivedDialog}>
                                Закрити
                            </Button>
                            {(selectedReceivedReferral && selectedReceivedReferral.attributes.status === "в обробці") && <Button
                                type={"submit"}
                                disabled={!file.file || file.fileName === DEFAULT_FILE_NAME}>
                            Відправити
                            </Button>}
                        </DialogActions>
                    </form>
                </Dialog>
            </>
        )
    }

}

export default ReceivedReferrals;