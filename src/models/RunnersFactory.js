import RunnersMemModel from "./DAO/runners.mem.model.js";

class RunnersFactory {
    static get(persistence) {
        switch (persistence) {
            case "MEM":
                console.log("Persistiendo en la memoria del servidor.");
                return new RunnersMemModel();
            default:
                console.log("Persistiendo en la memoria default.");
                return new RunnersMemModel();
        }
    }
}

export default RunnersFactory;