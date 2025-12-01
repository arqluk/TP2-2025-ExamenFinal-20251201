import TemperaturesFactory from "../models/TemperaturesFactory.js";

class TemperaturesService {
    constructor() {
        this.model = TemperaturesFactory.get(process.env.PERSISTENCE);
    }

    getAllTemperatures = async () => {
        const temperatures = await this.model.getAllTemperatures();
        return temperatures
    };

    // getTempsRange = async (min, max) => {
    getTempsRange = async (range) => {
        const tempsRange = await this.model.getTempsRange(range);
        return tempsRange
    };
    
    postTemperatures = async (temperature) => {
        const newTemperature = await this.model.postTemperatures(temperature);
        return newTemperature
    };

    deleteTemperatures = async (identifier) => {
        const removedTemperature = await this.model.deleteTemperatures(identifier);
        return removedTemperature
    };
    
}

export default TemperaturesService;