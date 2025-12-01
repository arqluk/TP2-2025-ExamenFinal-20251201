import TemperaturesMemModel from "./DAO/temperatures.mem.model.js";
// import TemperaturesFsModel from "./DAO/temperatures.fs.model.js";

class TemperaturesFactory {
    static get(persistence) {
        switch (persistence) {
            case "MEM":
                console.log("Persistiendo en la memoria del servidor.");
                return new TemperaturesMemModel();
            case "FS":
                console.log("Persistiendo en File System.");
                return new TemperaturesFsModel();
            default:
                console.log("Persistiendo en la memoria default.");
                return new TemperaturesMemModel();
        }
    }
}

export default TemperaturesFactory;