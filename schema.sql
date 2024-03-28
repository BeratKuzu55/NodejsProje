-- Öğrenci tablosunu oluştur
CREATE TABLE IF NOT EXISTS "ogrenci" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) UNIQUE NOT NULL,
    "deptid" INTEGER,
    "counter" INTEGER
);

-- Öğrenci_Bölüm tablosunu oluştur
CREATE TABLE IF NOT EXISTS "ogrenciBolum" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "ogrenci"("id"),
    "dept_id" INTEGER
);

-- Bölüm tablosunu oluştur
CREATE TABLE IF NOT EXISTS "bolum" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "dept_std_id" INTEGER
);
