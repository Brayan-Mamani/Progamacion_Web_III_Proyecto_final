import express from 'express';
import cors from 'cors';
import cursoRuta from './rutas/cursoRuta.js';
import estudianteRuta from './rutas/estudianteRuta.js';
import formularioRuta from './rutas/formularioRuta.js';
const app= express();

app.use(cors());
app.use(express.json());
app.use('/',cursoRuta);
app.use('/',estudianteRuta);
app.use('/',formularioRuta)

const puerto =3005;
app.listen(puerto,()=>{
    console.log(`servidor en http://localhost:${puerto}`);

});