class MailsService {
    constructor() {
    }

    // Método simulado
    sendAlertEmail(to, subject, message) {
        console.log("Simulación de envío de email");
        console.log("Para:", to);
        console.log("Asunto:", subject);
        console.log("Mensaje:", message);
        // no se envía nada realmente
        return true;
    }
}

    export default MailsService;