import clsx from "clsx"
import { Product } from "@/model/Product"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useCloudinary } from "@/shared/"



export interface CmsProductFormProps {
    activeItem: Partial<Product> | null,
    onCLose: () => void,
    createItem: (product: Partial<Product>) => void,
    editItem: (product: Partial<Product>) => void
}

const initialState: Partial<Product> = {
    name: '',
    cost: 0,
    description: '',
    img: '',
    tmb: '',
}

export function CmsProductForm(props: CmsProductFormProps) {

    const [formData, setFormData] = useState(initialState)
    const [dirty, setDirty] = useState<boolean>(false)

    const { uploadImage } = useCloudinary()

    useEffect(() => {
        if(props.activeItem?.id){
            setFormData({ ...props.activeItem })
        }else{
            setFormData(initialState)
        }
    }, [props.activeItem])

    function changeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name
        setFormData(s => ({ ...s, [name]: value }))
        setDirty(true)
    }

    function openWidget(){
        uploadImage()
            .then(res => setFormData(s=> ({...s, ...res})))
            .catch(err => alert(err))
    }

    function saveHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(props.activeItem?.id){
            props.editItem(formData)
        }else{
            props.createItem(formData)
        }
        
    }
    
    const isNameValid = formData.name?.length
    const isCostValid = formData.cost! > 0
    const isDescValid = formData.description?.length
    const isValid = isNameValid && isCostValid && isDescValid

    return (
        <div className={clsx(
            "fixed bg-slate-200 z-10 text-black top-0 w-96  h-full transition-all overflow-auto",
            { "-right-96": !props.activeItem, 'right-0': props.activeItem }
        )}>
            <form onSubmit={saveHandler}>
            
                <div className="flex justify-around h-20">
                    <button type="submit" className="w-1/2 text-white bg-green-500 hover:bg-green-600 disabled:opacity-35" disabled={!isValid}>Save</button>
                    <button type="button" className="w-1/2 text-white bg-slate-500 hover:bg-slate-600" onClick={props.onCLose}>Close</button>
                </div>
           
                {
                    formData.img && 
                        <img className="w-full" src={formData.img} alt={formData.name} />
                }
                

                <div className="flex flex-col gap-3 mx-4 mt-8">
                    <span>Product name</span>
                    <input className={clsx({'error': !isValid && dirty })} name="name" type="text" value={formData?.name} onChange={changeHandler} />
                    
                    <span>Product cost</span>
                    <input className={clsx({'error': !isCostValid && dirty })} name="cost" type="number" value={formData?.cost} onChange={changeHandler} />
                    
                    <span>Description</span>
                    <textarea className={clsx({'error': !isDescValid && dirty })} name="description" value={formData.description} onChange={changeHandler}></textarea>
                   
                       
                    <button className="btn accent" type="button" onClick={openWidget}>Upload image</button>
                    
                    
                </div>
                {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
            </form>
        </div>
    )
}