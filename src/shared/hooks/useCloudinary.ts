export function useCloudinary() {
    function uploadImage(): Promise<{ img: string, tmb: string}>{
        return new Promise(function(resolve, reject){
            const openWidget = window.cloudinary.openUploadWidget({
                cloudName: 'dg0z1p0fz', 
                uploadPreset: 'ml_default',
                sources: ['local', 'url', 'camera']
            },
                (error: any, result: any) => {
                    
                    if(error){
                        reject(new Error('Opss qualcosa è andato storto! Riprova!'))
                    }

                    if (!error && result.event === "success"){
                        const img = result.info.url 
                        const tmb = result.info.thumbnail_url
                        resolve({ img, tmb })
                    }
                }
            )
            openWidget.open()
        })
        
    }

    return {
        uploadImage
    }
}