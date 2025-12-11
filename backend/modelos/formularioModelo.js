import {db} from '../config/db.js';

export const registro =async()=>{
    const [resultado]=await db.query('SELECT * FROM formulario ');
    return resultado;
}

export const registroManual =async (formulario)=>{
    const {nombre, apellido, email, password}=formulario;
    await db.query('INSERT INTO formulario(nombre, apellido, email, password) VALUES (?,?,?,?)',[nombre, apellido, email, password]);
    return {mensaje:"registro exitoso "};
};

export const insertarRegistro = async (formulario) => {
    const { nombre, apellido, email, password } = formulario;
    await db.query('INSERT INTO formulario(nombre, apellido, email, password) VALUES (?,?,?,?)',[nombre, apellido, email, password]);
    return { mensaje: "Registro exitoso" };
};