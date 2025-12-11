import axios from 'axios';

export const FormularioEstudiante = async (estudiante) => {
    const response = await fetch("http://localhost:3005/formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estudiante)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errores ? errorData.errores.map(e => e.msg).join(", ") : errorData.error);
    }

    return response.json();
};

