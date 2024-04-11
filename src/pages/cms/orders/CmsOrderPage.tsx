import { useOrdersService } from "@/services/orders"
import { ServerError, Spinner } from "@/shared/"
import { useEffect } from "react"

export function CmsOrderPage() {

    const { actions, state} = useOrdersService()
    useEffect(() => {
        actions.getOrders()
    },[])

    

    return (
        <div>

            { state.pending && <Spinner /> }
            { state.error && <ServerError message={ state.error }/> }

            <table className="border-collapse table-auto w-full my-12">
                <thead>
                    <tr>
                        <th className="text-left">Client / Date</th>
                        <th className="text-left">Order info</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.orders.map(order => {
                            return (
                                <tr className="h-24" key={order.id}>
                                    <td>
                                        <div className="text-xl font-bold">{ order.user.name }</div>
                                        <div>{ new Date(order.created).toDateString() }</div>
                                    </td>
                                    <td className="text-left">
                                        <div>Total: €{ order.total }</div>
                                        <div>{ order.order.length } prod.</div>
                                    </td>
                                    <td className="text-center">
                                        {
                                            order.status === 'pending' && 
                                            <button className="btn accent" onClick={() => actions.toggleOrderStatus(order.id, 'done') }>Mark as done</button>
                                        }
                                        <button className="btn danger mx-2" onClick={() => actions.deleteOrders(order.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        
        </div>
    )
}