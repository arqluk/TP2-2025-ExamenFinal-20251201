import RunnersMemModel from "./DAO/runners.mem.model.js";
// import RunnersFsModel from "./DAO/runners.fs.model.js";

class RunnersFactory {
    static get(persistence) {
        switch (persistence) {
            case "MEM":
                console.log("Persistiendo en la memoria del servidor.");
                return new RunnersMemModel();
            // case "FS":
            //     console.log("Persistiendo en File System.");
            //     return new RunnersFsModel();
            default:
                console.log("Persistiendo en la memoria default.");
                return new RunnersMemModel();
        }
    }
}

export default RunnersFactory;