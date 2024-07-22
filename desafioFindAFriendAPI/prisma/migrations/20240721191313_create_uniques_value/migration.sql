/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[andress]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `pets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orgs_phone_key" ON "orgs"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_andress_key" ON "orgs"("andress");

-- CreateIndex
CREATE UNIQUE INDEX "pets_email_key" ON "pets"("email");
