export function toBase64(file: File): Promise<string> { 
    //Promise es un valor que va a ser obtenido en el futuro

    return new Promise ((resolve, reject) => {
        //Resolve: exito Reject: error

        const lector =  new FileReader();
        lector.readAsDataURL(file);
        lector.onload = () => resolve(lector.result as string);
        lector.onerror = (error) => reject(error);
    });
} 