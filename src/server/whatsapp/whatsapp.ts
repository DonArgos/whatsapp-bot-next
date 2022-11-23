import { Client, LocalAuth } from "whatsapp-web.js";

export const createWhatsappClient = (clientId: string) => {
  return new Client({
    authStrategy: new LocalAuth({ clientId }),
  });
};
