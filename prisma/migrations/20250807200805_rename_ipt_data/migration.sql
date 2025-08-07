/*
  Warnings:

  - You are about to drop the `IPTData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "IPTData";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "IptData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "maiorPreco" REAL NOT NULL,
    "menorPreco" REAL NOT NULL,
    "diferenca" REAL NOT NULL,
    "precoMedio" REAL NOT NULL,
    "anterior" REAL NOT NULL,
    "atual" REAL NOT NULL,
    "inflacao" REAL NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
