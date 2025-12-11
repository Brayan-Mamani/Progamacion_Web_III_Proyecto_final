import axios from 'axios'

export const ObtenerEstudiante =async()=>{
    const resultado = await axios.get(' http://localhost:3005/estudiante')
    return resultado.data;
}
export const EnviarEstudiante=async(estudiante)=>{
    const resultado = await axios.post(' http://localhost:3005/estudiante/adi',estudiante)
    return resultado.data;
}
export const ActualizarEstudiante=async(id_curso,estudiante,id_estudiante)=>{
    const resultado = await axios.put(` http://localhost:3005/estudiante/${id_curso}${id_estudiante}`,estudiante)
    return resultado.data;
}
export const EliminarEstudiante=async(id_curso,id_estudiante)=>{
    const resultado = await axios.delete(` http://localhost:3005/estudiante/${id_curso}${id_estudiante}`)
    return resultado.data
}