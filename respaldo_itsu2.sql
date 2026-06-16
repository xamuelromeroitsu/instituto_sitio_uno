--
-- PostgreSQL database dump
--

\restrict MylXZgsuW4FQTFnngsdhBySZO1Gcjzx6bKL3FCSc9xI6LYnNW0FycDuUjq3jAT9

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asignaturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asignaturas (
    id integer NOT NULL,
    codigo character varying(20) NOT NULL,
    nombre character varying(120) NOT NULL,
    unidades_credito integer NOT NULL
);


ALTER TABLE public.asignaturas OWNER TO postgres;

--
-- Name: asignaturas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asignaturas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.asignaturas_id_seq OWNER TO postgres;

--
-- Name: asignaturas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asignaturas_id_seq OWNED BY public.asignaturas.id;


--
-- Name: estudiantes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudiantes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    usuario_id uuid NOT NULL,
    cedula_identidad character varying(20) NOT NULL,
    primer_nombre character varying(60) NOT NULL,
    primer_apellido character varying(60) NOT NULL,
    segundo_nombre character varying(60),
    segundo_apellido character varying(60),
    telefono character varying(20)
);


ALTER TABLE public.estudiantes OWNER TO postgres;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(150) NOT NULL,
    password_digest character varying(255) NOT NULL,
    rol character varying(30) DEFAULT 'estudiante'::character varying,
    activo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: asignaturas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignaturas ALTER COLUMN id SET DEFAULT nextval('public.asignaturas_id_seq'::regclass);


--
-- Data for Name: asignaturas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asignaturas (id, codigo, nombre, unidades_credito) FROM stdin;
1	CAR-EAU	Electrónica Automotriz	150
2	CAR-EEM	Electrónica de Equipos Médicos	150
3	CAR-EIN	Electrónica Industrial	150
4	CAR-PRG	Programación	145
\.


--
-- Data for Name: estudiantes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estudiantes (id, usuario_id, cedula_identidad, primer_nombre, primer_apellido, segundo_nombre, segundo_apellido, telefono) FROM stdin;
d0ef3fba-2031-4f14-917a-9a2c1925edf4	5a4ef3b1-0772-4ddd-bd8f-041f6b975235	V-99999	Test	User	\N	\N	\N
58ad00de-4d42-4871-a436-d8702e92f953	9cd9ec54-acb7-429d-95f2-a037cc749e0c	93458545	mami	amsas	\N	\N	\N
5ee483c3-1b2d-4444-9bdd-a53ddda4ce0d	8b077ba5-9897-4ed6-8c99-7af043287023	V-2244488	angelo	romero	\N	\N	\N
31432652-7eb3-4807-a0ef-3e5a325ab96d	ed1cfc43-37be-47a5-8b95-fcd962dc5975	V-32226948	xamuelromero	romero	\N	\N	\N
4c2f7aad-bb57-4049-a229-8c0a9069e319	595ea4e2-4b0b-4fde-928b-7307072e5811	V-01928347566	dan	cabal	\N	\N	\N
10bb35a6-e60f-45a5-bc26-68e92c2e2fd0	58224784-644e-43f6-a4c7-651148acfaa4	V-097328745234	alan	palazar	\N	\N	\N
328841cb-5432-4f00-861c-0c03bf0254fc	d155d873-40ab-4aa5-be18-44b0606b26ac	29349238492834	adel	palmares	\N	\N	\N
db0fc5d2-0429-4734-aed1-e4fce4fcdac7	b596f880-8ab1-41c2-8c03-2e6bb196b3e9	V-322269487	xamuel	romero	\N	\N	\N
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, email, password_digest, rol, activo, created_at) FROM stdin;
5a4ef3b1-0772-4ddd-bd8f-041f6b975235	test2@correo.com	$2a$12$.W71MjYJcMJQZZRG8ocDfeuCFKAwXMXsFxJtVGCP7WYkqDD/bVq2K	estudiante	t	2026-06-14 23:05:44.517237+00
9cd9ec54-acb7-429d-95f2-a037cc749e0c	yis@gmail.com	$2a$12$RTuFO569wz1/sVDkh0N7QOdfHat8qfDuf4lArxq2JIQxpJwHvQa/G	estudiante	t	2026-06-14 23:14:32.099183+00
8b077ba5-9897-4ed6-8c99-7af043287023	angelo@gmail.com	$2a$12$ZlYSKhsrtcTMdrGW1ovY1OiwRcYs06nE.vYOO76HS6/1nT46K36uG	estudiante	t	2026-06-14 23:40:51.159921+00
ed1cfc43-37be-47a5-8b95-fcd962dc5975	xamuelromero2@gmail.com	$2a$12$w24YQExXpyor0C9HCPjo4OoQdwKMr2UH7CgsxqvCQv4qBBSm24ACa	estudiante	t	2026-06-15 00:22:52.590077+00
595ea4e2-4b0b-4fde-928b-7307072e5811	daniel@gmail.com	$2a$12$cnZztbNriUpZ3VYQ.k7mzuqvvTsS328BqQk.RjH49NNPY6M/1H3by	estudiante	t	2026-06-15 01:03:41.022835+00
58224784-644e-43f6-a4c7-651148acfaa4	alanmendoza@gmail.com	$2a$12$tw5UKumM3Dc/rwtRjMz6Benavb4gXn9ivqCBdwqk7vNpL5rOoY/FS	estudiante	t	2026-06-16 00:34:03.568223+00
d155d873-40ab-4aa5-be18-44b0606b26ac	adel@gmail.com	$2a$12$h1ccOiPkagR4k63PSSzuTOV5YI.mFjp59H1cq8ix.sE9BRpIr14bW	estudiante	t	2026-06-16 00:54:16.445502+00
b596f880-8ab1-41c2-8c03-2e6bb196b3e9	xamuelromero.itsu@gmail.com	$2a$12$1cbsy7Ah9E9.TXuFIUc6VO0JMpeCTTCXYtncwjvMJMHtEBp.Ya/M2	estudiante	t	2026-06-16 01:12:43.371326+00
\.


--
-- Name: asignaturas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asignaturas_id_seq', 4, true);


--
-- Name: asignaturas asignaturas_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignaturas
    ADD CONSTRAINT asignaturas_codigo_key UNIQUE (codigo);


--
-- Name: asignaturas asignaturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignaturas
    ADD CONSTRAINT asignaturas_pkey PRIMARY KEY (id);


--
-- Name: estudiantes estudiantes_cedula_identidad_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_cedula_identidad_key UNIQUE (cedula_identidad);


--
-- Name: estudiantes estudiantes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: estudiantes fk_estudiante_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT fk_estudiante_usuario FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict MylXZgsuW4FQTFnngsdhBySZO1Gcjzx6bKL3FCSc9xI6LYnNW0FycDuUjq3jAT9

