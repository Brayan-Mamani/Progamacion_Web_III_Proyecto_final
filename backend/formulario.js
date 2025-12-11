import express from 'express';
import { body, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

app.post('/formulario',
    [
        // Validacion del nombre
        body("nombre").isLength({ min: 2 }).withMessage("El nombre debe contener mínimo 2 caracteres"),
        // Validacion del apellido
        body("apellido").isLength({ min: 2 }).withMessage("El apellido debe contener mínimo 2 caracteres"),
        // Validacion del email
        body("email").isEmail().withMessage("Introduzca un email válido"),
        // Validacion del rol si es estudiante o docente
        body("rol").custom(value => {
            const rolesPermitidos = ["estudiante", "docente"];
            if (!rolesPermitidos.includes(value)) {
                throw new Error("El rol debe ser 'estudiante' o 'docente'");
            }
            return true;
        }),
        // la validacion del password si es debil, intermedio y fuerte  
        body('password')
            .isLength({ min: 6 })
            .withMessage('La contraseña debe tener al menos 6 caracteres')
            .custom((value, { req }) => {
            // .test  funcion  de falso o verdadero
                const May = /[A-Z]/.test(value);
                const Min = /[a-z]/.test(value);
                const Num = /[0-9]/.test(value);
                const Sim = /[^A-Za-z0-9]/.test(value);
            // pregunta que fuerza tiene la contraseña
                let fuerza = 'password débil';

                if (value.length >= 6 && May && Min) fuerza = 'password intermedia';
                if (value.length >= 8 && May && Min && Num && Sim) fuerza = 'password fuerte';

                req.passwordFuerza = fuerza;
                return true;
            })
    ],

    (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        res.json({
            mensaje: "Sus datos fueron registrados corectamente",
            fuerzaPassword: req.passwordFuerza
        });
    }
);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
