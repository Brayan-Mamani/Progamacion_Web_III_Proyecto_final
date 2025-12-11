import express from 'express';
import { listaEstudiante,muestraLista,insertaEstudiante,actualizaEstudiante,eliminaEstudiante, muestraEstudiantesPorCurso} from '../controladores/estudianteControlador.js';

const rutas =express.Router();

rutas.get('/estudiante',listaEstudiante)
rutas.get('/estudiante/:id_curso',muestraLista);
rutas.post('/estudiante/adi',insertaEstudiante);
rutas.put('/estudiante/:id_estudiante',actualizaEstudiante);
rutas.delete('/estudiante/:id_estudiante',eliminaEstudiante);
rutas.get('/estudiante/curso/:id_curso', muestraEstudiantesPorCurso);

export default rutas;
