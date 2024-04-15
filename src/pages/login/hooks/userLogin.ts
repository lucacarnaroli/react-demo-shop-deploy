import { useState, ChangeEvent } from "react";

export function userLogin() {

    const [form, setForm] = useState({ username: '', password: ''})

    function changeHandler(e: ChangeEvent<HTMLInputElement>){
        const inputName = e.currentTarget.name
        const inputValue = e.currentTarget.value
        setForm(state => ({ ...state, [inputName]: inputValue}))
    }

    const isValid = form.username.length && form.password.length

    return {
        form,
        changeHandler,
        isValid
    }
}