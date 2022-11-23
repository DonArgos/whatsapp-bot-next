import { z } from "zod";
import { createWhatsappClient } from "../../whatsapp/whatsapp";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.whatsappClient.findMany();
  }),
  createWhatsappClient: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.whatsappClient.create({
        data: {
          userId: input.userId,
        },
      });
      // const whatsappClient = createWhatsappClient(client.id);
      // whatsappClient.on("qr", (qr) => {
      //   console.log("whatsappClient.on -> qr", qr);
      //   ctx.prisma.whatsappClient.update({
      //     where: { id: client.id },
      //     data: { token: qr },
      //   });
      // });
      // whatsappClient.initialize();
    }),
  deleteClient: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.whatsappClient.delete({
        where: { id: input.clientId },
      });
    }),
});
