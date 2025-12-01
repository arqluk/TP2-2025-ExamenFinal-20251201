import RunnersFactory from "../models/RunnersFactory.js";


class RunnersService {
    constructor() {
        this.model = RunnersFactory.get(process.env.PERSISTENCE);
    }

    getAllRunners = async () => {
        const runners = await this.model.getAllRunners();
        return runners
    };

    postRunners = async (runner) => {
        const newRunner = await this.model.postRunners(runner);
        return newRunner
    };

    deleteRunners = async (identifier) => {
        const removedRunner = await this.model.deleteRunners(identifier);
        return removedRunner
    };
}

export default RunnersService;