# insta-app

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "mongodb"
url = env("DATABASE_URL")
}

model User {
id String @id @default(auto()) @map("\_id") @db.ObjectId
clerkId String @unique
username String @unique
avatar String?
cover String?
name String?
surname String?
description String?
city String?
school String?
work String?
website String?
createdAt DateTime @default(now())
posts Post[]
comments Comment[]
likes Like[]
followers Follower[] @relation("UserFollowers")
followings Follower[] @relation("UserFollowings")
followRequestsSent FollowRequest[] @relation("FollowRequestsSent")
followRequestsReceived FollowRequest[] @relation("FollowRequestsReceived")
blocks Block[] @relation("BlocksSent")
blockedBy Block[] @relation("BlocksReceived")
stories Story[]
}

model Post {
id String @id @default(auto()) @map("\_id") @db.ObjectId
desc String
img String?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
clerkId String
user User @relation(fields: [clerkId], references: [clerkId], onDelete: Cascade)
comments Comment[]
likes Like[]
}

model Comment {
id String @id @default(auto()) @map("\_id") @db.ObjectId
desc String
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
clerkId String
user User @relation(fields: [clerkId], references: [clerkId], onDelete: Cascade)
postId String @db.ObjectId
post Post @relation(fields: [postId], references: [id], onDelete: Cascade)
likes Like[]
}

model Like {
id String @id @default(auto()) @map("\_id") @db.ObjectId
createdAt DateTime @default(now())
clerkId String
user User @relation(fields: [clerkId], references: [clerkId], onDelete: Cascade)
postId String? @db.ObjectId
post Post? @relation(fields: [postId], references: [id], onDelete: Cascade)
commentId String? @db.ObjectId
comment Comment? @relation(fields: [commentId], references: [id], onDelete: Cascade)
}

model Follower {
id String @id @default(auto()) @map("\_id") @db.ObjectId
createdAt DateTime @default(now())
followerId String
follower User @relation("UserFollowers", fields: [followerId], references: [clerkId], onDelete: Cascade)
followingId String
following User @relation("UserFollowings", fields: [followingId], references: [clerkId], onDelete: Cascade)
}

model FollowRequest {
id String @id @default(auto()) @map("\_id") @db.ObjectId
createdAt DateTime @default(now())
senderId String
sender User @relation("FollowRequestsSent", fields: [senderId], references: [clerkId], onDelete: Cascade)
receiverId String
receiver User @relation("FollowRequestsReceived", fields: [receiverId], references: [clerkId], onDelete: Cascade)

@@unique([senderId, receiverId])
}

model Block {
id String @id @default(auto()) @map("\_id") @db.ObjectId
createdAt DateTime @default(now())
blockerId String
blocker User @relation("BlocksSent", fields: [blockerId], references: [clerkId], onDelete: Cascade)
blockedId String
blocked User @relation("BlocksReceived", fields: [blockedId], references: [clerkId], onDelete: Cascade)

@@unique([blockerId, blockedId])
}

model Story {
id String @id @default(auto()) @map("\_id") @db.ObjectId
createdAt DateTime @default(now())
expiresAt DateTime
img String
clerkId String
user User @relation(fields: [clerkId], references: [clerkId], onDelete: Cascade)
}
