export interface ServerErrorProps {
    message?: string
}

export function ServerError(props: ServerErrorProps) {
    return (
        <div className="bg-red-400 rounded text-white px-4 py-3" role="alert">
            <div className="flex flex-col">
                <p className="font-bold">
                    {
                        props.message || 'A server error occurs!'
                    }
                    
                </p>
            </div>
        </div>
    )
}