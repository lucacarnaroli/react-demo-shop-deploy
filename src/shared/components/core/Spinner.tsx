import { useEffect, useState } from "react"

export function Spinner(){

    const [show, setShow] = useState(false)
    useEffect(() => {
        const debounce = setTimeout(() => {
            setShow(true)
        }, 1000)

        return () => clearTimeout(debounce)
    }, [])

 return show ?
        <div className="flex w-full justify-center my-5">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
        : null
    
}