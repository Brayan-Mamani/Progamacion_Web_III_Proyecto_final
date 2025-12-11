import{listaEstudiantes,listaCurso,insertarEstudiante,actualizarEstudiante,eliminarEstudiante, obtPorCurso} from '../modelos/estudianteModelo.js';

export const listaEstudiante =async (req,res)=>{
    try{
        const resultado=await listaEstudiantes();
        res.json (resultado);
    }catch (error){
        res.status(500).json({error:error.message});
    } 
}

export const muestraLista =async (req,res)=>{
    try{
        const resultado=await listaCurso(req.params.id_curso);
        res.json (resultado);
    }catch (error){
        res.status(500).json({error:error.message});
    } 
}

export const insertaEstudiante =async (req,res)=>{
    try{
        const resultado=await insertarEstudiante(req.body);
        res.json (resultado);
    }catch (error){
        res.status(500).json({error:error.message});
    }    
}

export const actualizaEstudiante = async (req, res) => {
    try {
        const resultado = await actualizarEstudiante(req.body, req.params.id_estudiante);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
}
};

export const eliminaEstudiante = async (req, res) => {
    try {
        await eliminarEstudiante(req.params.id_estudiante);
        res.json({ message: ' eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const muestraEstudiantesPorCurso = async (req, res) => {
    try {
        const resultado = await obtPorCurso(req.params.id_curso);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};