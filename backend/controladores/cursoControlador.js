import{mostrarCurso,insertarCurso,actualizarCurso,eliminarCurso} from '../modelos/cursoModelo.js';

export const mostrarCursos =async (req,res)=>{
    try{
        const resultado=await mostrarCurso();
        res.json (resultado);
    }catch (error){
        res.status(500).json({error:error.message});
    }
}
export const insertaCurso =async (req,res)=>{
    try{
        const resultado=await insertarCurso(req.body);
        res.json (resultado);
    }catch (error){
        res.status(500).json({error:error.message});
    }
}

export const actualizaCurso = async (req, res) => {
    try {
        const resultado = await actualizarCurso(req.params.id_curso, req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
}
};

export const eliminaCurso = async (req, res) => {
    try {
        await eliminarCurso(req.params.id_curso);
        res.json({ message: 'Curso eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
