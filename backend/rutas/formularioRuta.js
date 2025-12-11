import express from 'express';
import { registros, insertaRegistro, registrosManual } from '../controladores/formularioControlador.js';

const rutas =express.Router();

rutas.get('/formulario',registros);
rutas.post('/formulario/manual',registrosManual);
rutas.post('/formulario', insertaRegistro);


export default rutas;