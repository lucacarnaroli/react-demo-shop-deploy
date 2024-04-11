import { selectAuthIsLogged, useAuth } from "@/services/auth";
import { PropsWithChildren } from "react";

// definiamo tramite i generics un type col quale fare un intersezione ovvero una sorta di merge quindi avremo i childerns che la proprietà else
interface IfLoggedProps {
    else?: React.ReactNode
}

export function IfLogged (props: PropsWithChildren<IfLoggedProps>){
    const ifLogged = useAuth(selectAuthIsLogged)

    return (
        <>
        {
            ifLogged ?
            props.children :
            props.else
        }
        </>
    )
}