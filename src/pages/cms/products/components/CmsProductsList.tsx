import clsx from "clsx"
import { Product } from "@/model/Product"

interface ProductListProps {
    items: Product[],
    activeItem: Partial<Product> | null
    onEditItem: (product: Partial<Product>) => void
    onDeleteItem: (id: string) => void
}

export function CmsProductsList(props: ProductListProps){
    
    return (
            <div className="mt-12">
                <table className="table-auto w-full hover">
                    <thead>
                        <tr>
                            <th className="text-left">Product</th>
                            <th className="text-left">Image</th>
                            <th >Cost</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.items.map(p => {
                                return (
                                    <tr 
                                        key={p.id} 
                                        className={clsx(
                                            'cursor-pointer', 
                                            { 'bg-sky-200 text-black pointer-events-none' : p.id === props.activeItem?.id }
                                        )}
                                        onClick={()=> props.onEditItem(p)}
                                    >
                                        
                                        <td>{p.name}</td>
                                        <td>{p.img && <img src={p.img} alt={p.name} className="h-16 w-28 object-cover rounded-lg"/>}</td>
                                        <td className="text-center">€ {p.cost}</td>
                                        <td className="text-center">
                                            <i className="fa fa-trash" onClick={(e)=>{
                                                e.stopPropagation() //se non ci fosse questo metodo si propagherebbe anche il setActive,evitando il bubbling
                                                props.onDeleteItem(p.id)
                                            }}></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {/* <pre>{JSON.stringify(state.activeItem, null, 2)}</pre> */}
            </div>
       
    )
}