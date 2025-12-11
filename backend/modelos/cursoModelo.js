import {db} from '../config/db.js';

export const mostrarCurso =async ()=>{
    const [resultado]=await db.query('SELECT * FROM curso');
    return resultado;
};

export const insertarCurso =async (curso)=>{
    const {grado,paralelo}=curso;
    await db.query('INSERT INTO curso(grado, paralelo) VALUES (?,?)',[grado,paralelo]);
    return {mensaje:"se agrego un curso "};
};

export const actualizarCurso = async (id_curso, curso) => {
    const { grado, paralelo } = curso;
    await db.query('UPDATE curso SET grado=?,paralelo=? WHERE id_curso =? ', [grado, paralelo, id_curso]);
    return { id_curso, ...curso }; 
};

export const eliminarCurso = async (id_curso) => {
    await db.query('DELETE FROM curso WHERE id_curso=?', [id_curso]);
    return id_curso;
};

