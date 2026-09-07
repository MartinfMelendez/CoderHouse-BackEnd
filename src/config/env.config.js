import dotenv from "dotenv"
dotenv.config()
const variableRequerida = ["PORT"]

for(let variable of variableRequerida){
    if(!process.env[variable]){
        throw new Error(`La variable de entorno ${variable} es requerida`)
    }
}

export default {
    PORT: process.env.PORT
}