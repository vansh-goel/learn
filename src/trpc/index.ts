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
  }),
  deletePlaylist: privateProcedure.input(
    z.object({
      playlistId: z.string(),
    })).mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      return await db.playlist.delete({
        where: {
            userId,
            playlistId: input.playlistId,
        },
      });
  }),
  createVideo: privateProcedure.input(
    z.object({
      videoId: z.string(),
      playlistId: z.string(),
      title: z.string(),
      watched: z.boolean(),
    })).mutation(async ({ input }) => {
      return await db.video.create({
        data: {
          id: input.videoId,
          playlistId: input.playlistId,
          title: input.title,
          watched: input.watched,
        },
      });
  }),

  watchVideo: privateProcedure.input(
    z.object({
      videoId: z.string(),
      playlistId: z.string(),
      watched: z.boolean(),
    })).mutation(async ({ input }) => {
      return await db.video.update({
        where: {
          id: input.videoId,
        },
        data: {
          watched: input.watched,
        },
      });
  }),

getVideos: privateProcedure.input(
  z.object({
    playlistId: z.string(),
  })).query(async ({ input }) => {
    return await db.video.findMany({
      where: {
        playlistId: input.playlistId,
      },
      select: {
        id: true,
        title: true,
        watched: true, // Include watched status in the response
        playlistId: true,
      },
    });
}),

  getWatchedVideos: privateProcedure.input(
    z.object({
      id: z.string(),
    })).query(async ({ input }) => {
      return await db.video.findFirst({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          watched: true, // Include watched status in the response
          playlistId: true,
        },
      });
  }),
});
export type AppRouter = typeof appRouter;