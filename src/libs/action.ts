"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: user?.id,
      },
    });

    // console.log(existingFollowReq, "<---diacceptFollowReq");

    if (existingFollowReq) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowReq.id,
        },
      });

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
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });
    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: user?.id,
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

export const updateProfile = async (prevState: { success: boolean; error: boolean }, payload: { formData: FormData; cover: string }) => {
  const { formData, cover } = payload;

  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(Object.entries(fields).filter(([_, value]) => value !== ""));

  const Profile = z.object({
    name: z.string({ invalid_type_error: "Name must be a string." }).max(20, { message: "Name must be less than 20 characters." }).optional(),

    surname: z.string({ invalid_type_error: "Surname must be a string." }).max(20, { message: "Surname must be less than 20 characters." }).optional(),

    cover: z.string({ invalid_type_error: "Cover must be a string." }).optional(),

    description: z.string({ invalid_type_error: "Description must be a string." }).max(225, { message: "Description must be less than 225 characters." }).optional(),

    city: z.string({ invalid_type_error: "City must be a string." }).max(20, { message: "City must be less than 20 characters." }).optional(),

    school: z.string({ invalid_type_error: "School must be a string." }).max(20, { message: "School must be less than 20 characters." }).optional(),

    work: z.string({ invalid_type_error: "Work must be a string." }).max(20, { message: "Work must be less than 20 characters." }).optional(),

    website: z.string({ invalid_type_error: "Website must be a string." }).max(20, { message: "Website must be less than 20 characters." }).optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.flatten().fieldErrors;
    console.log(errorMessages, "<----errorprofile");

    return { success: false, error: true, errors: errorMessages };
  }

  const { userId: clerkId } = auth();

  if (!clerkId) return { success: false, error: true };

  try {
    await prisma.user.update({
      where: {
        clerkId: clerkId,
      },
      data: validatedFields.data,
    });

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const switchLikePost = async (postId: string) => {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authenticated!");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        clerkId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          clerkId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};
export const switchLikeComment = async (commentId: string) => {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authenticated!");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        commentId,
        clerkId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          commentId,
          clerkId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const addComment = async (desc: string, postId: string) => {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authenticated!");
  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        postId,
        clerkId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1, { message: "Description is required" }).max(225, { message: "Description must be less than 225 characters" });

  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    const errorMessages = validatedDesc.error.flatten().fieldErrors;
    console.log(errorMessages, "<----errorprofile");

    return { success: false, error: true, errors: errorMessages };
  }

  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authenticated!");

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        img,
        clerkId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};

export const addStory = async (img: string) => {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authenticated!");

  try {
    const existingStroy = await prisma.story.findFirst({
      where: {
        clerkId,
      },
    });

    if (existingStroy) {
      await prisma.story.delete({
        where: {
          id: existingStroy.id,
        },
      });
    }

    const createStroy = await prisma.story.create({
      data: {
        img,
        clerkId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createStroy;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string) => {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not Authenticated!");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        clerkId: clerkId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
