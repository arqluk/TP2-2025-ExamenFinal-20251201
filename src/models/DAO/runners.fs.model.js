// import fs from "fs";

// class RunnersFsModel {
//     constructor() {
//         this.filePath = "./runners.json";
//         this.initializeFile();
//     }

//     // constructor() {
//     //     this.entities = "runners.json"
//     // }

//     initializeFile = async () => {
//         try {
//             await fs.promises.access(this.filePath);
//         } catch {
//             await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 2));
//         }
//     };

//     getAllRunners = async () => {
//         const runners = await fs.promises.readFile(this.filePath, "utf-8");
//         return JSON.parse(runners);
//     };

//     postRunners = async (runner) => {
//         const runners = await fs.promises.readFile(this.filePath, "utf-8");
//         let runnersJs = JSON.parse(runners)

//         const { id, xa, ya, za } = runner
//         const index = runnersJs.findIndex((a) => a.id == id)
//         const collisions = await this.checkCollisions(runner)
//         if (index === -1) {
//             runnersJs.push({ id, xa, ya, za })
//         } else {
//             // runnersJs[index] = {id, xa, ya, za}

//             runnersJs[index] = {
//                 ...runnersJs[index], // conserva propiedades previas
//                 id,
//                 xa,
//                 ya,
//                 za
//             };
//         }

//         await fs.promises.writeFile(this.filePath, JSON.stringify(runnersJs, null, 2))

//         return {
//             runner: { id, xa, ya, za },
//             collisions: collisions
//         }
//     };

//     deleteRunners = async (identifier) => {
//         const runners = await fs.promises.readFile(this.filePath, "utf-8");
//         let runnersJs = JSON.parse(runners)
//         const index = runnersJs.findIndex((a) => a.id === identifier)
//         let msg = ""
//         if (index === -1) {
//             msg = "Aircratf inexistent"
//         }
//         else {
//             runnersJs.splice(index, 1)
//             await fs.promises.writeFile(this.filePath, JSON.stringify(runnersJs, null, 2))
//             msg = "Aircratf removed ok."
//         }
//         return msg
//     };

//     checkCollisions = async (newRunner) => {
//         const runners = await fs.promises.readFile(this.filePath, "utf-8");
//         let runnersJs = JSON.parse(runners)
//         const collisionsIds = []

//         if (runnersJs.length !== 0) {
//             for (const runner of runnersJs) {
//                 if (runner.id === newRunner.id) {
//                     continue
//                 }
//                 const distance = this.calculateDistance(newRunner, runner)
//                 if (distance < 500) {
//                     collisionsIds.push(runner.id)
//                 }
//             }
//         }

//         // for (const runner of this.runners) {
//         //     if (runner.id === newRunner.id) {
//         //         continue
//         //     }
//         //     const distance = this.calculateDistance(newRunner, runner)
//         //     if (distance < 500) {
//         //         collisionsIds.push(runner.id)
//         //     }
//         // }

//         return collisionsIds
//     }


//     calculateDistance = (runner1, runner2) => {
//         const dx = runner1.xa - runner2.xa;
//         const dy = runner1.ya - runner2.ya;
//         const dz = runner1.za - runner2.za;
//         return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
//     }


// }

// export default RunnersFsModel;