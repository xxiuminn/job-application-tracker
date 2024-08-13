-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "salary" VARCHAR(50) NOT NULL,
    "location" TEXT NOT NULL,
    "attachment" TEXT[],
    "list_id" INTEGER NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "list_user_id_key" ON "list"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "job_list_id_key" ON "job"("list_id");

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
