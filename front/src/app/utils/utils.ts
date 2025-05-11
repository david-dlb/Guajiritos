export const validResponse = (status:number) => {
    let errors: number = 0
    if (status != 200 ) {
        errors += 1
    }
    if (status != 201 ) {
        errors += 1
    }
    if (errors == 2) {
        throw new Error("Error en la peticion")
    }
}