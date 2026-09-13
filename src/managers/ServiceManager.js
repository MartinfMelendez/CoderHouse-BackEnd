const services = [
    {
        id: 1,
        name: "Corte de cabello",
        description: "Corte de cabello clásico o moderno.",
        duration: 45,
        price: 8500,
        category: "Belleza",
        available: true
    },
    {
        id: 2,
        name: "Masaje relajante",
        description: "Masaje corporal para aliviar tensión y estrés.",
        duration: 60,
        price: 15000,
        category: "Bienestar",
        available: true
    },
    {
        id: 3,
        name: "Limpieza facial",
        description: "Limpieza profunda e hidratación del rostro.",
        duration: 50,
        price: 12000,
        category: "Estética",
        available: false
    },
    {
        id: 4,
        name: "Manicura",
        description: "Cuidado y esmaltado de uñas.",
        duration: 40,
        price: 7000,
        category: "Belleza",
        available: true
    },
    {
        id: 5,
        name: "Pedicura",
        description: "Cuidado completo de pies y uñas.",
        duration: 50,
        price: 9000,
        category: "Belleza",
        available: true
    },
    {
        id: 6,
        name: "Clases de yoga",
        description: "Clase guiada de yoga para todos los niveles.",
        duration: 60,
        price: 6000,
        category: "Deporte",
        available: true
    },
    {
        id: 7,
        name: "Entrenamiento personal",
        description: "Sesión personalizada con entrenador profesional.",
        duration: 60,
        price: 18000,
        category: "Deporte",
        available: false
    },
    {
        id: 8,
        name: "Asesoría nutricional",
        description: "Consulta personalizada sobre alimentación saludable.",
        duration: 45,
        price: 14000,
        category: "Salud",
        available: true
    },
    {
        id: 9,
        name: "Sesión de fotografía",
        description: "Sesión fotográfica profesional en estudio.",
        duration: 90,
        price: 25000,
        category: "Fotografía",
        available: true
    },
    {
        id: 10,
        name: "Diseño de logo",
        description: "Diseño de identidad visual y logo para tu proyecto.",
        duration: 120,
        price: 35000,
        category: "Diseño",
        available: false
    }
];


class Service {
    static id = services.length + 1;

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


export function getAllService() {
    try {
        if (services.length === 0) {
            throw new Error("No hay servicios disponibles")
        }
        return [...services];
    }
    catch (error) {
        return error.message
    }

}

export function getServiceById(id) {
    try {
        const service = services.find(service => service.id == id);
        if (!service) {
            throw new Error("Servicio no encontrado")
        }
        return service;
    }

    catch (error) {
        return error.message
    }
}

export function addService(name, description, duration, price, category, available) {
    try {
        if(!name || !description || duration === undefined || !category || available === undefined){
            throw new Error("Todos los campos son obligatorios")
        }
        if(price === undefined ||  isNaN(price) || price <= 0){
            throw new Error("El precio debe ser un número positivo")
        }
const newService = new Service(name, description, duration, price, category, available)
        services.push(newService)
        return newService

    }
    catch(error){
        return error.message
    }
}

export function updateService(id,name, description, duration, price, category, available) {
    try{
const service = services.find(service => service.id == id);
        if(!service){
            throw new Error("Servicio no encontrado")
        }
        service.name = name ?? service.name;
        service.description = description ?? service.description;
        service.duration = duration ?? service.duration;
        service.price = price ?? service.price;
        service.category = category ?? service.category;
        service.available = available ?? service.available;
        return service;
    }
    catch(error){
        return error.message
    }
}

export function deleteService(id) {
    try {
        const index =  services.findIndex(service => service.id == id);
        if(index === -1){
throw new Error("Servicio no encontrado")
        }
        const serviceDeleted = services.splice(index, 1);
        return serviceDeleted[0]
    }
    catch (error) {
        return error.message
    }
}