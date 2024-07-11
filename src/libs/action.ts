"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";

export const switchFollow = async (userId: string) => {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authenticated!");

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: clerkId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: clerkId,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: clerkId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authenticated!");

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: clerkId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: clerkId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const acceptFollowReq = async (userId: string) => {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authentication!");

  try {
    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: clerkId,
      },
    });

    if (existingFollowReq) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowReq.id,
        },
      });
    } else {
      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: clerkId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};
export const declineFollowReq = async (userId: string) => {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authentication!");

  try {
    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: clerkId,
      },
    });

    if (existingFollowReq) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowReq.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const updateProfile = async (formData: FormData, cover: any) => {
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(Object.entries(fields).filter(([_, value]) => value !== ""));

  console.log({ filteredFields, cover }, "<----functionupdateuser");

  const Profile = z.object({
    name: z.string().optional(),
    surname: z.string().max(60).optional(),
    cover: z.string().optional(),
    description: z.string().max(225).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors, "<----errorprofile");
    return "error";
  }

  const { userId: clerkId } = auth();

  if (!clerkId) return "error";

  try {
    await prisma.user.update({
      where: {
        clerkId: clerkId,
      },
      data: validatedFields.data,
    });
  } catch (error) {
    console.log(error);
  }
};
