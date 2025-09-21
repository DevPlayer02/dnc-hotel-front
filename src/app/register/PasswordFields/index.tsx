'use client'

import TextField from "@/components/Form/TextField"
import { ChangeEvent, useState } from "react";

const PasswordFields = () => { 
    const [passwordMatches, setPasswordMatches] = useState<boolean>(true);

    const HandlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = e.target.value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        setPasswordMatches(confirmPassword === password)
        console.log({ password, confirmPassword })
    }

    return (
        <>
            <TextField
                label="Password"
                type="password"
                name="password"
                id="password"
                className="mt-3"
                required
            />
            <TextField
                label="Confirm password"
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="mt-3"
                onChange={HandlePasswordChange}
                required
                error={passwordMatches ? false : "Passwords do not match"}
            />
        </>
    )
}

export default PasswordFields;
