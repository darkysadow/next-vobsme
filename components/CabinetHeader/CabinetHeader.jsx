"use client"

import React, { useState } from "react";
import { config } from "@fortawesome/fontawesome-svg-core"
import { UserProvider, useFetchUser } from "@/lib/authProvider";
import { tryLogin } from "@/lib/actions/authorisation";
import { setToken, unsetToken } from "@/lib/auth";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
config.autoAddCss = false

const CabinetHeader = () => {
    const { user, loading } = useFetchUser()
    const [formData, setFormData] = useState({ login: '', password: '' })
    const [isErrorDialogOpen, setErrorDialogOpen] = useState(false)
    const [error, setError] = useState(undefined)

    const handleLogout = () => {
        const logoutResult = unsetToken()
        if (logoutResult) {
            location.reload()
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const loginError = (error) => {
        setError(error)
        setErrorDialogOpen(true)
    }

    const closeErrorDialog = () => {
        setErrorDialogOpen(false)
        setError(undefined)
        setFormData({ login: '', password: '' })
    }


    const handleSubmit = async () => {
        const responseData = await tryLogin(formData)
        if (responseData.data === null) {
            loginError(responseData.error)
        } else {
            const isTokenSetted = setToken(responseData)
            if (isTokenSetted === true) {
                location.reload()

            }
        }
    }


    return (
        <UserProvider value={{ user, loading }}>
            <header>
                <div className='bg-headerFirst bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4478d7] to-headerFirst'>
                    <div className="container mx-auto px-5">
                        <div className='flex w-full justify-between items-center flex-row pt-5 pb-6 gap-3'>
                            <div className="flex flex-row gap-3">
                                <div className="flex flex-row items-center gap-5">
                                    {!loading && (user ? (
                                        <li className="list-none">Вітаємо, {user}</li>
                                    ) : (''))}
                                    {!loading && (user ? (
                                        <Button variant="contained" onClick={handleLogout}>Вийти</Button>
                                    ) : (''))}
                                </div>

                                {!loading && !user ? (
                                    <>
                                        <TextField className="bg-[white] rounded" size="small" label='Логін' variant="filled" 
                                            name="login" value={formData.login} onChange={handleChange} />
                                        <TextField className="bg-[white] rounded" type="password" size="small" label="Пароль" 
                                            name="password" variant="filled" value={formData.password} onChange={handleChange} />
                                        <Button variant="contained" onClick={handleSubmit}>Увійти</Button>
                                    </>
                                ) : ""}

                            </div>
                            <div className='w-[50px] h-[50px]'>
                                <img src={'/FTOWHITE.png'} className='w-full h-full' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Dialog open={isErrorDialogOpen} onClose={closeErrorDialog}>
                <DialogTitle>Помилка авторизації</DialogTitle>
                <DialogContent>
                    Помилка: <p className="text-red-600">{error?.message}</p><br />
                    Введіть коректні данні!
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeErrorDialog}>
                        Закрити
                    </Button>
                </DialogActions>
            </Dialog>
        </UserProvider>
    )
}

export default CabinetHeader;