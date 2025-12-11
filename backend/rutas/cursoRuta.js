import express from 'express';
import { mostrarCursos,insertaCurso,actualizaCurso,eliminaCurso } from '../controladores/cursoControlador.js';

const rutas =express.Router();

rutas.get('/curso',mostrarCursos);
rutas.post('/curso',insertaCurso);
rutas.put('/curso/:id_curso',actualizaCurso);
rutas.delete('/curso/:id_curso',eliminaCurso);
export default rutas;