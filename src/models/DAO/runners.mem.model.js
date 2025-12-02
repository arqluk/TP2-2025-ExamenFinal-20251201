class RunnersMemModel {
    constructor() {
        this.runners = [
            { id: "COR123", latitud: -34.629696, longitud: -58.482918 }, // -34.629696, -58.482918
            { id: "COR124", latitud: -34.630208, longitud: -58.481941 }, // -34.630208, -58.481941
            { id: "COR125", latitud: -34.630050, longitud: -58.482842 }, // -34.630050, -58.482842
            { id: "COR126", latitud: -34.629696, longitud: -58.482918 }, // -34.629696, -58.482918
        ];
    }

    getAllRunners = async () => {
        return await this.runners
    };

    postRunners = async (runner) => {
        const {id, latitud, longitud} = runner
        const index = this.runners.findIndex((r) => r.id == id)
        const proximities = this.detectProximities(runner)
        if (index === -1) {
            this.runners.push({id, latitud, longitud})
        } else {
            this.runners[index] = {
            ...this.runners[index], 
            id,
            latitud,
            longitud
        };
        }
        return {
            runner: {id, latitud, longitud},
            proximities: proximities
        }
    };

    deleteRunners = async (identifier) => {
        const index = this.runners.findIndex((r) => r.id == identifier)
        let msg = ""
        if (index === -1) {
            msg = "Runner inexistent"
        } else {
            this.runners.splice(index, 1)
            msg = "Runner removed ok."
        }
        return msg
    };

    detectProximities = (newRunner) => {
        const proximitiesIds = []

        if (this.runners.length !== 0) {
            for (const runner of this.runners) {
                if (runner.id === newRunner.id) {
                    continue
                }
                const distance = this.calculateDistanceGPS(
                newRunner.latitud,
                newRunner.longitud,
                runner.latitud,
                runner.longitud
            );
                if (distance < 50) {
                    proximitiesIds.push(runner.id)
                }
           }
        }

        return proximitiesIds
    }

    calculateDistanceGPS = (lat1, lon1, lat2, lon2) => {
        const R = 6371000; // radio terrestre en metros
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const lat1Rad = lat1 * Math.PI / 180;
        const lat2Rad = lat2 * Math.PI / 180;
        const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // distancia en metros
        }

}

export default RunnersMemModel  