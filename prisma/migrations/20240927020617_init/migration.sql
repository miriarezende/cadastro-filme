-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "title" TEXT,
    "year" TEXT,
    "release" TEXT,
    "genre" TEXT,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);
