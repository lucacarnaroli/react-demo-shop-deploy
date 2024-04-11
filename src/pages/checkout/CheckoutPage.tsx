import clsx from "clsx"
import { useCheckout } from './hooks/useCheckout'
import { ServerError } from "@/shared/"
export function CheckoutPage() {
     
    const { 
        validators, 
        actions, 
        user, 
        dirty, 
        totalCartCost,
        error
    } = useCheckout()

    return (
        <div className="max-w-sm mx-auto">
            { error && <ServerError message={error} /> }
            <h1>Checkout</h1>
            <div className="text-xl my-3 border-b">€ {totalCartCost}</div>
            <form action="" className="flex flex-col gap-3" onSubmit={ actions.sendOrder }>
                Your name:
                <input type="text" name="name" className={clsx({error: !validators.isValidName && dirty })} placeholder="Your name" value={user.name} onChange={actions.changeHandler}/>
                Your email:
                <input type="text" name="email" className={clsx({error: !validators.isValidEmail && dirty})} placeholder="Your email" value={user.email} onChange={actions.changeHandler}/>
                <button type="submit" className={clsx('btn', { primary: !validators.isValid, success: validators.isValid })} disabled={ !validators.isValid }>Confirm order</button>

            </form>
            
        </div>
    )
}