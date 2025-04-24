CREATE TABLE "product" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "product_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"desc" varchar(512),
	"price" integer NOT NULL
);
