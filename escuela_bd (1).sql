-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2025 a las 01:30:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `escuela_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id_curso` int(11) NOT NULL,
  `grado` varchar(20) NOT NULL,
  `paralelo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id_curso`, `grado`, `paralelo`) VALUES
(1, '1ro de primaria', 'A'),
(2, '2do de primaria', 'A'),
(3, '3ro de primaria', 'A'),
(4, '4to de primaria', 'A'),
(5, '5to de primaria', 'A'),
(6, '6to de primaria', 'A'),
(16, '1ro de secundaria', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id_estudiante` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id_estudiante`, `nombre`, `apellido`, `id_curso`) VALUES
(2, 'lara', 'Contreras', 1),
(3, 'pepe', 'perez', 3),
(4, 'misael', 'romer', 3),
(5, 'veronica', 'maldonado', 3),
(6, 'mauro', 'quispe', 3),
(7, 'Kalef', 'Mamani', 1),
(8, 'gomez', 'sosa', 2),
(9, 'pepe', 'perez', 1),
(10, 'Ramiro', 'perez', 5),
(34, 'Ismael', 'Anguz', 2),
(91, 'ramiro', 'vaca', 1),
(92, 'lara', 'Contreras', 1),
(98, 'lara', 'Contreras', 1),
(99, 'lara', 'Contreras', 1),
(108, 'pepe', 'grillo', 6),
(109, 'Jhery', 'perez', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formulario`
--

CREATE TABLE `formulario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `formulario`
--

INSERT INTO `formulario` (`id`, `nombre`, `apellido`, `email`, `password`) VALUES
(1, 'Juan', 'Martinez', 'Juanito@gmail.com', 'Jmartinez1'),
(2, 'angelino', 'mamani', 'ahgs@gmail.com', 'Angel123'),
(3, 'angelino', 'mamani', 'ahgs@gmail.com', 'Angel123$'),
(4, 'Rogelio', 'Lujan', 'Lujan123@gmail.com', 'LUrol123$'),
(5, 'Rogelio', 'Lujan', 'Lujan123@gmail.com', 'LUrol123$'),
(6, 'lara', 'Contreras', 'gjk@gmail.com', 'adriN12%'),
(7, 'lara', 'Contreras', 'gjk@gmail.com', 'adriN12%'),
(8, 'pepe', 'perez', 'pepiti@gamil.com', 'Pepito69$');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id_estudiante`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `formulario`
--
ALTER TABLE `formulario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT de la tabla `formulario`
--
ALTER TABLE `formulario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `estudiante_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
