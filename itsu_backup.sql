--
-- PostgreSQL database dump
--



-- Dumped from database version 16.14
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-10 19:39:26

CREATE DATABASE itsu_db;
\c itsu_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 16537)
-- Name: aranceles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aranceles (
    id integer NOT NULL,
    descripcion character varying(120) NOT NULL,
    monto_centavos bigint NOT NULL,
    moneda character varying(3) DEFAULT 'USD'::character varying,
    obligatorio boolean DEFAULT true
);


ALTER TABLE public.aranceles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16536)
-- Name: aranceles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aranceles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.aranceles_id_seq OWNER TO postgres;

--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 219
-- Name: aranceles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aranceles_id_seq OWNED BY public.aranceles.id;


--
-- TOC entry 224 (class 1259 OID 16901)
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
-- TOC entry 223 (class 1259 OID 16900)
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
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 223
-- Name: asignaturas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asignaturas_id_seq OWNED BY public.asignaturas.id;


--
-- TOC entry 216 (class 1259 OID 16409)
-- Name: estudiantes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudiantes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    usuario_id uuid NOT NULL,
    cedula_identidad character varying(20) NOT NULL,
    primer_nombre character varying(60) NOT NULL,
    segundo_nombre character varying(60),
    primer_apellido character varying(60) NOT NULL,
    segundo_apellido character varying(60),
    telefono character varying(20),
    indice_acumulado numeric(4,2) DEFAULT 0.00,
    estado_matricula character varying(20) DEFAULT 'activo'::character varying
);


ALTER TABLE public.estudiantes OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16545)
-- Name: facturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facturas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    estudiante_id uuid NOT NULL,
    periodo_id integer NOT NULL,
    monto_total_centavos bigint NOT NULL,
    moneda character varying(3) DEFAULT 'USD'::character varying,
    estado_pago character varying(20) DEFAULT 'pendiente'::character varying,
    fecha_emision date DEFAULT CURRENT_DATE,
    fecha_vencimiento date NOT NULL
);


ALTER TABLE public.facturas OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16931)
-- Name: inscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inscripciones (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    estudiante_id uuid NOT NULL,
    seccion_id uuid NOT NULL,
    nota_final numeric(4,2) DEFAULT NULL::numeric,
    inasistencias integer DEFAULT 0,
    estado_materia character varying(20) DEFAULT 'cursando'::character varying
);


ALTER TABLE public.inscripciones OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16501)
-- Name: periodos_lectivos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.periodos_lectivos (
    id integer NOT NULL,
    codigo character varying(15) NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    activo boolean DEFAULT false
);


ALTER TABLE public.periodos_lectivos OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16500)
-- Name: periodos_lectivos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.periodos_lectivos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.periodos_lectivos_id_seq OWNER TO postgres;

--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 217
-- Name: periodos_lectivos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.periodos_lectivos_id_seq OWNED BY public.periodos_lectivos.id;


--
-- TOC entry 225 (class 1259 OID 16911)
-- Name: secciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.secciones (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    asignatura_id integer NOT NULL,
    periodo_id integer NOT NULL,
    codigo_seccion character varying(20) NOT NULL,
    horario jsonb NOT NULL,
    aula character varying(50),
    cupo_maximo integer DEFAULT 30
);


ALTER TABLE public.secciones OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16564)
-- Name: transacciones_pagos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transacciones_pagos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    factura_id uuid NOT NULL,
    referencia_bancaria character varying(100) NOT NULL,
    metodo_pago character varying(50) NOT NULL,
    monto_pagado_centavos bigint NOT NULL,
    fecha_pago timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    estado_transaccion character varying(20) DEFAULT 'pendiente'::character varying
);


ALTER TABLE public.transacciones_pagos OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16398)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(150) NOT NULL,
    password_digest character varying(255) NOT NULL,
    rol character varying(30) NOT NULL,
    activo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 4677 (class 2604 OID 16540)
-- Name: aranceles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aranceles ALTER COLUMN id SET DEFAULT nextval('public.aranceles_id_seq'::regclass);


--
-- TOC entry 4687 (class 2604 OID 16904)
-- Name: asignaturas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignaturas ALTER COLUMN id SET DEFAULT nextval('public.asignaturas_id_seq'::regclass);


--
-- TOC entry 4675 (class 2604 OID 16504)
-- Name: periodos_lectivos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodos_lectivos ALTER COLUMN id SET DEFAULT nextval('public.periodos_lectivos_id_seq'::regclass);


--
-- TOC entry 4884 (class 0 OID 16537)
-- Dependencies: 220
-- Data for Name: aranceles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aranceles (id, descripcion, monto_centavos, moneda, obligatorio) FROM stdin;
\.


--
-- TOC entry 4888 (class 0 OID 16901)
-- Dependencies: 224
-- Data for Name: asignaturas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asignaturas (id, codigo, nombre, unidades_credito) FROM stdin;
1	PROG-101	Programación Web con Python y JS	4
\.


--
-- TOC entry 4880 (class 0 OID 16409)
-- Dependencies: 216
-- Data for Name: estudiantes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estudiantes (id, usuario_id, cedula_identidad, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, indice_acumulado, estado_matricula) FROM stdin;
c211de1f-98c2-4a8c-91cc-49da78c605ed	73f6b10b-7333-4d70-83e7-da4426a39e0d	V-00000000	Estudiante	\N	Prueba	\N	+0000000000	0.00	activo
\.


--
-- TOC entry 4885 (class 0 OID 16545)
-- Dependencies: 221
-- Data for Name: facturas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facturas (id, estudiante_id, periodo_id, monto_total_centavos, moneda, estado_pago, fecha_emision, fecha_vencimiento) FROM stdin;
\.


--
-- TOC entry 4890 (class 0 OID 16931)
-- Dependencies: 226
-- Data for Name: inscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inscripciones (id, estudiante_id, seccion_id, nota_final, inasistencias, estado_materia) FROM stdin;
cd72925d-70a9-4698-92f4-9ce7b18b0f42	c211de1f-98c2-4a8c-91cc-49da78c605ed	77332915-d5c6-4ca1-8c81-36e52bb891ab	\N	0	cursando
\.


--
-- TOC entry 4882 (class 0 OID 16501)
-- Dependencies: 218
-- Data for Name: periodos_lectivos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.periodos_lectivos (id, codigo, fecha_inicio, fecha_fin, activo) FROM stdin;
1	2026-I	2026-01-15	2026-05-30	t
\.


--
-- TOC entry 4889 (class 0 OID 16911)
-- Dependencies: 225
-- Data for Name: secciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.secciones (id, asignatura_id, periodo_id, codigo_seccion, horario, aula, cupo_maximo) FROM stdin;
77332915-d5c6-4ca1-8c81-36e52bb891ab	1	1	SEC-01	[{"dia": "Lunes", "bloque": "18:00-20:00"}, {"dia": "Miercoles", "bloque": "18:00-20:00"}]	Laboratorio 3	30
\.


--
-- TOC entry 4886 (class 0 OID 16564)
-- Dependencies: 222
-- Data for Name: transacciones_pagos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transacciones_pagos (id, factura_id, referencia_bancaria, metodo_pago, monto_pagado_centavos, fecha_pago, estado_transaccion) FROM stdin;
\.


--
-- TOC entry 4879 (class 0 OID 16398)
-- Dependencies: 215
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, email, password_digest, rol, activo, created_at, updated_at) FROM stdin;
73f6b10b-7333-4d70-83e7-da4426a39e0d	estudiante@itsu.edu.ve	1234	estudiante	t	2026-06-10 19:22:29.838861-04	2026-06-10 19:22:29.838861-04
\.


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 219
-- Name: aranceles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aranceles_id_seq', 1, false);


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 223
-- Name: asignaturas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asignaturas_id_seq', 1, true);


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 217
-- Name: periodos_lectivos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.periodos_lectivos_id_seq', 1, true);


--
-- TOC entry 4710 (class 2606 OID 16544)
-- Name: aranceles aranceles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aranceles
    ADD CONSTRAINT aranceles_pkey PRIMARY KEY (id);


--
-- TOC entry 4718 (class 2606 OID 16908)
-- Name: asignaturas asignaturas_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignaturas
    ADD CONSTRAINT asignaturas_codigo_key UNIQUE (codigo);


--
-- TOC entry 4720 (class 2606 OID 16906)
-- Name: asignaturas asignaturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignaturas
    ADD CONSTRAINT asignaturas_pkey PRIMARY KEY (id);


--
-- TOC entry 4699 (class 2606 OID 16420)
-- Name: estudiantes estudiantes_cedula_identidad_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_cedula_identidad_key UNIQUE (cedula_identidad);


--
-- TOC entry 4701 (class 2606 OID 16416)
-- Name: estudiantes estudiantes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_pkey PRIMARY KEY (id);


--
-- TOC entry 4703 (class 2606 OID 16418)
-- Name: estudiantes estudiantes_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_usuario_id_key UNIQUE (usuario_id);


--
-- TOC entry 4712 (class 2606 OID 16553)
-- Name: facturas facturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_pkey PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 16939)
-- Name: inscripciones inscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4706 (class 2606 OID 16509)
-- Name: periodos_lectivos periodos_lectivos_codigo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodos_lectivos
    ADD CONSTRAINT periodos_lectivos_codigo_key UNIQUE (codigo);


--
-- TOC entry 4708 (class 2606 OID 16507)
-- Name: periodos_lectivos periodos_lectivos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.periodos_lectivos
    ADD CONSTRAINT periodos_lectivos_pkey PRIMARY KEY (id);


--
-- TOC entry 4722 (class 2606 OID 16919)
-- Name: secciones secciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.secciones
    ADD CONSTRAINT secciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 16571)
-- Name: transacciones_pagos transacciones_pagos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transacciones_pagos
    ADD CONSTRAINT transacciones_pagos_pkey PRIMARY KEY (id);


--
-- TOC entry 4716 (class 2606 OID 16573)
-- Name: transacciones_pagos transacciones_pagos_referencia_bancaria_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transacciones_pagos
    ADD CONSTRAINT transacciones_pagos_referencia_bancaria_key UNIQUE (referencia_bancaria);


--
-- TOC entry 4727 (class 2606 OID 16941)
-- Name: inscripciones unique_estudiante_seccion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT unique_estudiante_seccion UNIQUE (estudiante_id, seccion_id);


--
-- TOC entry 4695 (class 2606 OID 16408)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4697 (class 2606 OID 16406)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4704 (class 1259 OID 16956)
-- Name: idx_estudiantes_usuario_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_estudiantes_usuario_id ON public.estudiantes USING btree (usuario_id);


--
-- TOC entry 4723 (class 1259 OID 16957)
-- Name: idx_inscripciones_estudiante_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inscripciones_estudiante_id ON public.inscripciones USING btree (estudiante_id);


--
-- TOC entry 4728 (class 2606 OID 16421)
-- Name: estudiantes estudiantes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4729 (class 2606 OID 16554)
-- Name: facturas facturas_estudiante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_estudiante_id_fkey FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id) ON DELETE CASCADE;


--
-- TOC entry 4730 (class 2606 OID 16559)
-- Name: facturas facturas_periodo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES public.periodos_lectivos(id) ON DELETE CASCADE;


--
-- TOC entry 4734 (class 2606 OID 16942)
-- Name: inscripciones inscripciones_estudiante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_estudiante_id_fkey FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id) ON DELETE CASCADE;


--
-- TOC entry 4735 (class 2606 OID 16947)
-- Name: inscripciones inscripciones_seccion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_seccion_id_fkey FOREIGN KEY (seccion_id) REFERENCES public.secciones(id) ON DELETE CASCADE;


--
-- TOC entry 4732 (class 2606 OID 16920)
-- Name: secciones secciones_asignatura_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.secciones
    ADD CONSTRAINT secciones_asignatura_id_fkey FOREIGN KEY (asignatura_id) REFERENCES public.asignaturas(id) ON DELETE CASCADE;


--
-- TOC entry 4733 (class 2606 OID 16925)
-- Name: secciones secciones_periodo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.secciones
    ADD CONSTRAINT secciones_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES public.periodos_lectivos(id) ON DELETE CASCADE;


--
-- TOC entry 4731 (class 2606 OID 16574)
-- Name: transacciones_pagos transacciones_pagos_factura_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transacciones_pagos
    ADD CONSTRAINT transacciones_pagos_factura_id_fkey FOREIGN KEY (factura_id) REFERENCES public.facturas(id) ON DELETE CASCADE;


-- Completed on 2026-06-10 19:39:27

--
-- PostgreSQL database dump complete
--
