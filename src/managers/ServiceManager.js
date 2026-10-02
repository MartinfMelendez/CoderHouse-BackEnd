import fs from 'fs/promises'
import raiz from '../utils/path.js';

const PATH = raiz + '/data/services.json'

const services = JSON.parse(
   await fs.readFile(PATH, "utf-8"))


class Service {
   static id = services.length > 0
        ? Math.max(...services.map(service => service.id)) + 1
        : 1;

    constructor(name, description, duration, price, category, available) {
        this.id = Service.id++;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.price = price;
        this.category = category;
        this.available = available;
    }

}


export async function getAll() { //Funcion para leer los archivos con FileSystem
    try {
        const archivoCompleto = await fs.readFile(PATH, 'utf-8')
        const datosArchivo = JSON.parse(archivoCompleto)
        return datosArchivo
    } catch (error) {
        return { error: "Error al leer el archivo", mesagge: error.message }
    }
}


export async function getServiceById(id) {
    try {

        const datos = await getAll()

        const service = datos.find(service => service.id == id);
        if (!service) {
            throw new Error("Servicio no encontrado")
        }
        return service;
    }

    catch (error) {
        return { error: "Error al obtener el servicio", message: error.message, status: 404 }
    }
}

export async function addService(name, description, duration, price, category, available) {
    try {
        if (!name || !description || !duration || !price || !category || available === undefined) {
            throw new Error("Todos los campos son obligatorios")
        }
        if (!price || isNaN(price) || price <= 0) {
            throw new Error("El precio debe ser un número positivo")
        }
        const newService = new Service(name, description, duration, price, category, available)

        const services = await getAll()
        services.push(newService)

        await fs.writeFile(PATH, JSON.stringify(services, null, 2), 'utf-8')
        return newService

    }
    catch (error) {
        return { error: "Error al agregar el servicio", message: error.message }
    }
}

export async function updateService(nid, data) {
    try {
        let service = await getServiceById(nid);
        if (service.status === 404) { throw new Error("Servicio no encontrado") }

        const{id, ...rest} = data; // Evitar actualizar el id
        service = { ...service, ...rest }
        const services = await getAll()
        const index = services.findIndex(service => service.id == nid);
        services[index] = service;
        await fs.writeFile(PATH, JSON.stringify(services, null, 2), 'utf-8')
        return service;
    }

    catch (error) {
        return { error: "Error al actualizar el servicio", message: error.message }
    }
}

export async function deleteService(id) {
    try {
        const services = await getAll()
        const index = services.findIndex(service => service.id == id);
        if (index === -1) {
            throw new Error("Servicio no encontrado")
        }
        const serviceDeleted = services.splice(index, 1);
        await fs.writeFile(PATH, JSON.stringify(services, null, 2), 'utf-8')
        return serviceDeleted[0]
    }
    catch (error) {
        return { error: "Error al eliminar el servicio", message: error.message }
    }
}

