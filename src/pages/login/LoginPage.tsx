import { FormEvent, useEffect } from "react"
import { userLogin } from "./hooks/userLogin";
import { selectAuthError, selectAuthIsLogged, useAuth } from "@/services/auth";
import { ServerError } from "@/shared/";
import { useNavigate } from "react-router-dom";


export function LoginPage() {

    const login = useAuth(state => state.login)
    const error = useAuth(selectAuthError)
    const isLogged = useAuth(selectAuthIsLogged)
    const navigate = useNavigate()

    const { form, isValid, changeHandler } = userLogin()

    // uso questo hook perchè così verra chiamata solo al momento in cui isLogged cambierà di valore
    useEffect(() => {
        if (isLogged) {
            navigate('/cms')
        }
    }, [isLogged])

    function doLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        login(form.username, form.password)
    }

    return (
        <div className="page-sm">
            <div className="pb-2">
                {error && <ServerError/>} 
            </div>
            <form onSubmit={doLogin} className="flex flex-col gap-3">
                <input type="text" name="username" className="rounded" placeholder="Username" value={form.username} onChange={changeHandler}/>
                <input type="password" name="password" className="rounded" placeholder="Password" value={form.password} onChange={changeHandler}/>
                <button disabled={!isValid} className="btn accent" type="submit">Sign in</button>
            </form>
        </div>
    )
}