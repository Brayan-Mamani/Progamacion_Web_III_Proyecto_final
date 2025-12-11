import axios from "axios";

const URL = 'http://localhost:3005/curso';

export const mostrarCursos = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const insertaCurso = async (curso) => {
    try {
        const response = await axios.post(URL, curso);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const actualizaCurso = async (id_curso, curso) => {
    try {
        const response = await axios.put(`${URL}/${id_curso}`, curso);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const eliminaCurso = async (id_curso) => {
    try {
        const response = await axios.delete(`${URL}/${id_curso}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}