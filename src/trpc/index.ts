import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { z } from 'zod';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log('user', user);
    if(user) console.log('user.email', user.email);

    if (!user || !user.email) {
      throw new TRPCError({ code : 'UNAUTHORIZED'})
    }

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id
      }
    })

    if(!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        }
      })
    }

    return { success: true };
  }),
  getPlaylists: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return await db.playlist.findMany({
      where: {
          userId
        }
      })
    }),

  createPlaylist: privateProcedure.input(
    z.object({
      playlistId: z.string(),
      description: z.string(),
      title: z.string(),
    })).mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      return await db.playlist.create({
        data: {
          userId,
          playlistId: input.playlistId,
          description: input.description,
          title: input.title,
        },
      });

  })
});
export type AppRouter = typeof appRouter;