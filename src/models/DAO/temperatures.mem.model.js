// import fetch from "node-fetch";
import MailsService from "../../services/mails.service.js";

class TemperaturesMemModel {
    constructor() {
        this.temperatures = [
            { magnitud: 10, unidad: "kelvin" },
            { magnitud: 0, unidad: "celsius" },
            { magnitud: -60, unidad: "farenheit" },
            { magnitud: 10, unidad: "kelvin" },
            { magnitud: -300, unidad: "celsius" },
            { magnitud: 40, unidad: "farenheit" },
        ];
        this.mailsService = new MailsService();
    }

    getAllTemperatures = async () => {
        return await this.temperatures
    };

    getTempsRange = async ({min, max}) => {
        const tempsRange = await this.temperatures.filter((t) => t.magnitud >= min && t.magnitud <= max)
        return  tempsRange
    };

    // postTemperatures = async (temperature) => {
    //     const { magnitud, unidad, autor, estado } = temperature
    //     const exists = this.temperatures.find(b => b.magnitud === magnitud);
    //     if (exists) {
    //         throw new Error("El código ya existe");
    //     }
    //     const newTemperature = {
    //         magnitud,
    //         unidad,
    //         autor,
    //         estado: "disponible"
    //     }; this.temperatures.push(newTemperature);
    //     return newTemperature;
    // }
    // // return { magnitud, unidad, autor, estado }
    // // }

    // Permite agregar más de una muestra por id, aunque la sonda ya exista
    // postTemperatures = async (temperature) => {
    //     const { magnitud, unidad } = temperature
    //     // SIEMPRE agrega una nuevo muestra
    //     this.temperatures.push({ magnitud, unidad });
    //     return {
    //         // newTemperature: { magnitud, unidad }
    //         magnitud, unidad 
    //     };
    // }

    // Implementación con llamada a MailsService ...
    postTemperatures = async (temperature) => {
        const { magnitud, unidad } = temperature;

        const normalizedUnit = unidad.toLowerCase();

        let isReportable = false;

        // Validaciones según la unidad
        switch (normalizedUnit) {
            case "kelvin":
            case "k":
                if (magnitud < 0) isReportable = true;
                break;

            case "celsius":
            case "c":
                if (magnitud < -273) isReportable = true;
                break;

            case "farenheit":
            case "f":
                if (magnitud < -460) isReportable = true;
                break;

            default:
                throw {
                    code: "invalid_unit",
                    status: 400,
                    message: "Unidad de temperatura no reconocida"
                };
        }

        // Siempre guardar la temperatura registrada
        this.temperatures.push({ magnitud, unidad });

        // Si es reportable → enviar mail
        if (isReportable) {
            this.mailsService.sendAlertEmail(
                "administrador@gmail.com",
                "ALERTA: Temperatura reportable registrada",
                `Se ha registrado una temperatura reportable:
                valor: ${magnitud} ${unidad}`
            );
        }

        // Respuesta normal
        return { magnitud, unidad, reportable: isReportable };
    };

    deleteTemperatures = async (identifier) => {
        const index = this.temperatures.findIndex((b) => b.magnitud == identifier);
        // console.log("INDEX: ", index)
        if (index === -1) {
            // lanzar Error para que el controller lo maneje
            throw { code: "temperature_not_available", status: 400, messasge: "temperature inexistent" };
        }
        // para obtener la temperatura eliminada → el elemento, no el array → usar ...
        //const removed = this.temperatures.splice(index, 1)[0]; // splice NO devuelve el elemento, sino un array con los elementos eliminados.

        // alternativa usando destructuring ...
        const [removed] = this.temperatures.splice(index, 1);

        // Las dos formas son destructuring, pero se aplican a estructuras distintas:
        // ✅ 1. [] destructura arrays

        // Cuando hacés:
        // const [removed] = this.temperatures.splice(index, 1);
        // Esto funciona porque:
        // splice(index, 1) devuelve un array
        // Ejemplo:
        // ["libroEliminado"]
        // Al usar destructuring de arrays ([]), el código toma el primer elemento del array:

        // ❌ 2. {} destructura objetos, no arrays
        // Cuando escribís:
        // const { removed } = this.temperatures.splice(index, 1);
        // Estás diciendo:
        // “Buscá dentro del objeto una propiedad con nombre removed”.
        // Pero:
        // splice NO devuelve un objeto, devuelve un array, por ejemplo:
        // ["libroEliminado"]
        // Al usar destructuring de arrays ([]), el código toma el primer elemento del array:
        // const [removed] = ["libroEliminado"];
        // removed = "libroEliminado"
        // Un array así no tiene propiedad removed, solo tiene índices:
        // 0: "libroEliminado"
        // length: 1
        // const { removed } = ["libroEliminado"];
        // console.log(removed); // → undefined
        // Por eso no funciona.

        // 🧠 Regla simple para recordar
        // Estructura	Destructuring
        // Array → ["a", "b", "c"]	const [x, y] = array;
        // Objeto → { a: 1, b: 2 }	const { a, b } = obj;

        // 👉 Usá [] cuando querés sacar elementos por posición.
        // 👉 Usá {} cuando querés sacar propiedades por nombre.

        // 📌 Conclusión clara
        // splice() devuelve un array, entonces solo se puede destructurar con corchetes [].
        return removed; // devolver el libro eliminado (objeto)
    };

}

export default TemperaturesMemModel  