-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "chatAsReceiverId" DROP NOT NULL,
ALTER COLUMN "chatAsSenderId" DROP NOT NULL;
