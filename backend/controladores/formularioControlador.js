import{registro,insertarRegistro, registroManual} from '../modelos/formularioModelo.js';
import { body, validationResult } from "express-validator";
// Lista de registro de usuarios 
export const registros =async (req,res)=>{
    try{
        const resultado=await registro();
        res.json (resultado);
    }catch (error){
        res.status(500).json({error:error.message});
    }
}
// insertar registros manualmente
export const registrosManual =async (req,res)=>{
    try{
        const resultado=await registroManual(req.body);
        res.json (resultado);
    }catch (error){
        res.status(500).json({error:error.message});
    }    
}
// insertar registros mediante el formulario  con las respectivas validaciones
export const insertaRegistro = [
    // validaciones de todos los parametros de registro
    body("nombre").isLength({ min: 2 }).withMessage("El nombre debe contener mínimo 2 caracteres"),
    body("apellido").isLength({ min: 2 }).withMessage("El apellido debe contener mínimo 2 caracteres"),
    body("email").isEmail().withMessage("Introduzca un email válido"),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').custom((value, { req }) => {

            const May = /[A-Z]/.test(value);
            const Min = /[a-z]/.test(value);
            const Num = /[0-9]/.test(value);
            const Sim = /[^A-Za-z0-9]/.test(value);

            let fuerza = 'password débil';
            if (value.length >= 6 && May && Min) fuerza = 'password intermedia';
            if (value.length >= 8 && May && Min && Num && Sim) fuerza = 'password fuerte';

            req.passwordFuerza = fuerza;
            return true;
        }),
    
    // Controlador
    async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        // aplicacion por el metdo try catch 
        try {
            const resultado = await insertarRegistro(req.body);
            res.json({
                ...resultado,
                fuerzaPassword: req.passwordFuerza
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
