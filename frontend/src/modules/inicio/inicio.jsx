import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { FormularioEstudiante } from '../../services/formulario.service';
import Swal from 'sweetalert2';

const Inicio = () => {
    const [Abrir, SetAbrir] = useState(false);
    const [captchaValido, setCaptchaValido] = useState(null);
    const [formData, SetformData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: ''
    });

    const CambioEntrada = (e) => {
        const { name, value } = e.target;
        SetformData({ ...formData, [name]: value });
    };

    const CrearEstudiante = async (e) => {
        e.preventDefault();

        if (!captchaValido) {
            return Swal.fire({
                title: "Debe validar el CAPTCHA",
                icon: "warning",
                timer: 4000
            });
        }

        try {
            const resultado = await FormularioEstudiante({
                ...formData,
                captcha: captchaValido
            });

            Swal.fire({
                title: "¡Registro exitoso!",
                text: `Fuerza de contraseña: ${resultado.fuerzaPassword}`,
                icon: "success"
            });

            SetformData({ nombre: '', apellido: '', email: '', password: '' });
            setCaptchaValido(null);
            SetAbrir(false);

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
            });
        }
    };

    return (
        <div className="p-6 space-y-6">

    {/* Primera seccion del colegio  */}
    <section className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-center text-[#0000FF] mb-4">
            Colegio Santa Esperanza
        </h1>

        <p className="text-gray-700 leading-relaxed mb-4">
            El Colegio Santa Esperanza es una institución educativa dedicada a la formación
            integral de niños y jóvenes, promoviendo valores, creatividad y excelencia
            académica. Nuestro compromiso es brindar un ambiente seguro y motivador para
            el desarrollo personal y académico de cada estudiante.
        </p>

        {/* imagenes del colegio  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
                src="/imagenes/salon.jpg"
                className="rounded-xl shadow"
                alt="Salón de clases"
            />
            <img
                src="/imagenes/patio.webp"
                className="rounded-xl shadow"
                alt="Patio escolar"
            />
            <img
                src="/imagenes/casilleros.jpg"
                className="rounded-xl shadow"
                alt="Casilleros del colegio"
            />
        </div>

        <p className="text-gray-700 leading-relaxed mt-4">
            Contamos con modernas instalaciones, laboratorios de ciencias, salas de cómputo,
            biblioteca digital, áreas deportivas y espacios diseñados para fomentar el
            aprendizaje colaborativo. El equipo docente está conformado por profesionales
            altamente capacitados y comprometidos con la educación de calidad.
        </p>
    </section>
    {/* seccion donde contienes la historia del colegio */}
<section className="bg-white p-6 rounded-2xl shadow space-y-6">

    <h2 className="text-3xl font-bold text-center text-[#0000FF]">
        Reseña Histórica
    </h2>

    <p className="text-gray-700 leading-relaxed">
        El Colegio Santa Esperanza fue fundado el 12 de marzo de 1984 con el propósito de
        ofrecer una educación integral basada en valores, disciplina y excelencia
        académica. Inició como una pequeña institución de dos aulas, creada por un grupo
        de docentes visionarios que buscaban proporcionar una alternativa educativa
        innovadora para la comunidad local.
    </p>

    <p className="text-gray-700 leading-relaxed">
        Con el paso de los años, el colegio experimentó un crecimiento significativo,
        ampliando sus instalaciones, incorporando nuevas tecnologías y desarrollando
        programas académicos modernos adaptados a las necesidades del siglo XXI.
        La institución se ha destacado por su compromiso con el aprendizaje continuo,
        la formación humana y el bienestar de sus estudiantes.
    </p>

    <p className="text-gray-700 leading-relaxed">
        Hoy en día, el Colegio Santa Esperanza cuenta con una sólida reputación a nivel
        regional, reconocida por la calidad de sus maestros, su modelo educativo centrado
        en el estudiante y su dedicación al desarrollo de futuros líderes comprometidos
        con su comunidad.
    </p>

    {/* imagen del colegio  */}
    <div className="flex justify-center">
        <img
            src="./imagenes/escuela.jpg"
            alt="Edificio antiguo del colegio"
            className="rounded-xl shadow max-w-lg"
        />
    </div>
</section>

   {/* seccion de vison y mision en column  */}
<section className="bg-white p-6 rounded-2xl shadow space-y-8">

    <h2 className="text-3xl font-bold text-center text-[#0000FF] mb-6">
        Misión y Visión
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* la primera columna sera de mision*/}
        <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-[#0000FF] shadow">
            <h3 className="text-2xl font-semibold text-[#0000FF] mb-4 text-center">
                Misión
            </h3>

            <img
                src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
                alt="Misión del colegio"
                className="rounded-xl shadow mb-4 w-full"
            />

            <p className="text-gray-700 leading-relaxed">
                Nuestra misión es ofrecer una educación integral que fomente el pensamiento
                crítico, los valores humanos y el desarrollo personal. Buscamos formar
                estudiantes capaces de enfrentar los desafíos del futuro con responsabilidad,
                creatividad y un fuerte compromiso social.
            </p>
        </div>

        {/* la segunda columna sera de vision  */}
        <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-[#0000FF] shadow">
            <h3 className="text-2xl font-semibold text-[#0000FF] mb-4 text-center">
                Visión
            </h3>

            <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
                alt="Visión del colegio"
                className="rounded-xl shadow mb-4 w-full"
            />

            <p className="text-gray-700 leading-relaxed">
                Nuestra visión es consolidarnos como una institución educativa referente a
                nivel nacional, reconocida por la innovación pedagógica, la excelencia
                académica y la formación de ciudadanos íntegros que contribuyan activamente
                al bienestar y desarrollo sostenible de la sociedad.
            </p>
        </div>

    </div>

</section>


    {/* aqui se encuentra la seccion del boton par desplegar el formulario de registro */}
    <div className="flex justify-end">
        <button
            onClick={() => SetAbrir(true)}
            className="border p-2 border-gray-300 rounded-xl hover:bg-[#0000FF] hover:text-white hover:border-[#2C7873] mb-4"
        >
            Crear Registro
        </button>

        {Abrir && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-amber-50 w-96 rounded-2xl">
                    <div className="w-full rounded-t-2xl bg-[#0000FF] py-4 text-white">
                        <h3 className="text-center font-mono">Crear nuevo Registro</h3>
                    </div>

                    <div className="px-10 mt-6 pb-6">
                        <form onSubmit={CrearEstudiante} className="flex flex-col gap-3">

                            <label className="font-mono">Nombre:</label>
                            <input type="text" name="nombre" value={formData.nombre} onChange={CambioEntrada}
                                className="border border-gray-400 rounded-2xl pl-2 py-1" />

                            <label className="font-mono">Apellido:</label>
                            <input type="text" name="apellido" value={formData.apellido} onChange={CambioEntrada}
                                className="border border-gray-400 rounded-2xl pl-2 py-1" />

                            <label className="font-mono">Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={CambioEntrada}
                                className="border border-gray-400 rounded-2xl pl-2 py-1" />

                            <label className="font-mono">Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={CambioEntrada}
                                className="border border-gray-400 rounded-2xl pl-2 py-1" />

                            <ReCAPTCHA
                                sitekey="TU_SITE_KEY"
                                onChange={(value) => setCaptchaValido(value)}
                            />

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="border px-4 py-1 rounded-2xl hover:bg-[#0000FF] hover:text-white"
                                >
                                    Crear
                                </button>

                                <button
                                    type="button"
                                    className="border px-4 py-1 rounded-2xl hover:bg-red-600 hover:text-white"
                                    onClick={() => SetAbrir(false)}
                                >
                                    Cerrar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )}
    </div>

</div>

    );
};

export default Inicio;



