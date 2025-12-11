import {db} from '../config/db.js';

//lista para mostrar todos los estudiantes
export const listaEstudiantes =async()=>{
    const [resultado]=await db.query('SELECT * FROM estudiante');
    return resultado;
}
//lista para obtener la lista por grado
export const listaCurso =async (id_curso)=>{
    const [resultado]=await db.query('SELECT * FROM estudiante WHERE id_curso = ?', [id_curso]);
    return resultado;
};
// Para insertar un estudiante a un curso
export const insertarEstudiante =async (estudiante)=>{
    const {nombre,apellido,id_curso}=estudiante;
    await db.query('INSERT INTO estudiante( nombre, apellido, id_curso) VALUES (?,?,?)',[nombre,apellido,id_curso]);
    return {mensaje:"se agrego "};
};
// Para actualizar un estudiante de un curso
export const actualizarEstudiante = async (estudiante, id_estudiante) => {
    const { nombre, apellido, id_curso } = estudiante;

    await db.query(
        'UPDATE estudiante SET nombre=?, apellido=?, id_curso=? WHERE id_estudiante=?',
        [nombre, apellido, id_curso || null, id_estudiante]
    );

    return { mensaje: "Se actualizó correctamente" };
};

// Para eliminar un estudiante  de un curso
export const eliminarEstudiante = async (id_estudiante) => {
    await db.query('DELETE FROM estudiante WHERE id_estudiante=?', [id_estudiante]);
    return id_estudiante;
    
};


export const obtPorCurso = async (id_curso) => {
    const [resultado] = await db.query('SELECT e.*, c.grado AS curso_grado FROM estudiante e INNER JOIN curso c ON c.id_curso = e.id_curso WHERE c.id_curso = ?', [id_curso]);
    return resultado;
};