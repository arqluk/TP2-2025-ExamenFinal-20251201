// A implementar ....

// import fs from "fs";

// class TemperaturesFsModel {
//     constructor() {
//         this.filePath = "./temperatures.json";
//         this.initializeFile();
//     }

//     // constructor() {
//     //     this.entities = "temperatures.json"
//     // }

//     initializeFile = async () => {
//         try {
//             await fs.promises.access(this.filePath);
//         } catch {
//             await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 2));
//         }
//     };

//     getAllTemperatures = async () => {
//         const temperatures = await fs.promises.readFile(this.filePath, "utf-8");
//         return JSON.parse(temperatures);
//     };

//     postTemperatures = async (temperature) => {
//         const temperatures = await fs.promises.readFile(this.filePath, "utf-8");
//         let temperaturesJs = JSON.parse(temperatures)

//         const { id, xa, ya, za } = temperature
//         const index = temperaturesJs.findIndex((a) => a.id == id)
//         const collisions = await this.checkCollisions(temperature)
//         if (index === -1) {
//             temperaturesJs.push({ id, xa, ya, za })
//         } else {
//             // temperaturesJs[index] = {id, xa, ya, za}

//             temperaturesJs[index] = {
//                 ...temperaturesJs[index], // conserva propiedades previas
//                 id,
//                 xa,
//                 ya,
//                 za
//             };
//         }

//         await fs.promises.writeFile(this.filePath, JSON.stringify(temperaturesJs, null, 2))

//         return {
//             temperature: { id, xa, ya, za },
//             collisions: collisions
//         }
//     };

//     deleteTemperatures = async (identifier) => {
//         const temperatures = await fs.promises.readFile(this.filePath, "utf-8");
//         let temperaturesJs = JSON.parse(temperatures)
//         const index = temperaturesJs.findIndex((a) => a.id === identifier)
//         let msg = ""
//         if (index === -1) {
//             msg = "Aircratf inexistent"
//         }
//         else {
//             temperaturesJs.splice(index, 1)
//             await fs.promises.writeFile(this.filePath, JSON.stringify(temperaturesJs, null, 2))
//             msg = "Aircratf removed ok."
//         }
//         return msg
//     };

//     checkCollisions = async (newTemperature) => {
//         const temperatures = await fs.promises.readFile(this.filePath, "utf-8");
//         let temperaturesJs = JSON.parse(temperatures)
//         const collisionsIds = []

//         if (temperaturesJs.length !== 0) {
//             for (const temperature of temperaturesJs) {
//                 if (temperature.id === newTemperature.id) {
//                     continue
//                 }
//                 const distance = this.calculateDistance(newTemperature, temperature)
//                 if (distance < 500) {
//                     collisionsIds.push(temperature.id)
//                 }
//             }
//         }

//         // for (const temperature of this.temperatures) {
//         //     if (temperature.id === newTemperature.id) {
//         //         continue
//         //     }
//         //     const distance = this.calculateDistance(newTemperature, temperature)
//         //     if (distance < 500) {
//         //         collisionsIds.push(temperature.id)
//         //     }
//         // }

//         return collisionsIds
//     }


//     calculateDistance = (temperature1, temperature2) => {
//         const dx = temperature1.xa - temperature2.xa;
//         const dy = temperature1.ya - temperature2.ya;
//         const dz = temperature1.za - temperature2.za;
//         return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
//     }


// }

// export default TemperaturesFsModel;