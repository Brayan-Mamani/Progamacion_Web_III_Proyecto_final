import { useEffect, useState } from "react"
import {ObtenerEstudiante,EnviarEstudiante,EliminarEstudiante,ActualizarEstudiante} from '../../services/estudiantes.service'
import {mostrarCursos} from '../../services/curso.service'
import { Pencil,Trash  } from 'lucide-react';
import Swal from 'sweetalert2'

const estudiante=()=>{
    const [estudiante,SetEstudiante]=useState([]);
    const [curso,SetCurso]=useState([]);
    const [Abrir,SetAbrir]=useState(false);
    const [formData,SetformData]=useState({
        nombre:'',
        apellido:'',
        id_curso:''
    })
    const [modoEdicion,SetModoEdicion]=useState(false)
    const [estudianteEditado,SetEstudianteEditado]=useState(null);

    const CambioEntrada=(e)=>{
        const {name,value}=e.target;
        SetformData({
            ...formData,
            [name]:value
        })
    }

    useEffect(()=>{
        const cargarDatos= async()=>{
            const resultadoEstudiante = await ObtenerEstudiante();
            SetEstudiante(resultadoEstudiante);
            
            const resultadoCurso = await mostrarCursos();
            SetCurso(resultadoCurso);
        }
        cargarDatos();
    },[])
//seccion de crear y actualizar
    const CrearEstudiante=async(e)=>{
        e.preventDefault();
        try{// seccion de actualizr a un estudiante
            if(modoEdicion){
                await ActualizarEstudiante(estudianteEditado,{
                    nombre:formData.nombre,
                    apellido:formData.apellido,
                    id_curso:formData.id_curso,
                })
                const resultado = await ObtenerEstudiante();
                SetEstudiante(resultado);
                SetAbrir(false)
                SetModoEdicion(false);
                SetEstudianteEditado(null);
                SetformData({
                    nombre:'',
                    apellido:'',
                    id_curso:''
                })
                Swal.fire({
                    title: "¡Actualizado Correctamente!",
                    icon: "success",
                    draggable: true,
                    timer:4000,
                    showCancelButton:false
                });
            }else{
                if(formData.nombre==='' || formData.apellido===''){
                    return Swal.fire({
                        title: "¡No se aceptan campos vacíos!",
                        icon: "error",
                        draggable: true,
                        timer:4000,
                        showCancelButton:false
                    });
                }
                //seccion de crear un nuevo estudiante
                await EnviarEstudiante({
                    nombre:formData.nombre,
                    apellido:formData.apellido,
                    id_curso:formData.id_curso || null,
                })
                const resultado = await ObtenerEstudiante();
                SetEstudiante(resultado);
                SetformData({
                    nombre:'',
                    apellido:'',
                    id_curso:''
                })
                SetAbrir(false);
                Swal.fire({
                    title: "¡Se creó exitosamente!",
                    icon: "success",
                    draggable: true,
                    timer:4000
                });
            }
        }catch(error){
            console.log(error)
        }
    }

    const AbrirModalEditar =(estudiante)=>{
        SetModoEdicion(true)
        SetEstudianteEditado(estudiante.id_estudiante)
        SetformData({
            nombre:estudiante.nombre,
            apellido:estudiante.apellido,
            id_curso:estudiante.id_curso || ''
        })
        SetAbrir(true);
    }
//seccion de eliminacion
    const EliminarEstudiantes=async(id_estudiante)=>{
        Swal.fire({
            title: "¿Estás seguro de eliminar este producto?",
            text: "No podrás revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Eliminar"
        }).then(async(result) => {
            if (result.isConfirmed) {
               try{
                 await EliminarEstudiante(id_estudiante);
                 const resultado = await ObtenerEstudiante();
                 SetEstudiante(resultado);
                 Swal.fire({
                    title: "¡Se eliminó exitosamente!",
                    icon: "success",
                    draggable: true,
                    timer:4000,
                    showCancelButton:false
                });
               }catch(error){
                 console.log(error);
               }
            }
        });
    }
    
    return(
        // seccion de la base tabla estudinate  
        <div className="">
            <div className="flex justify-end">
                <button onClick={()=>SetAbrir(true)} className="border p-2 border-gray-300 rounded-xl hover:bg-[#0000FF] hover:text-white hover:border-[#0000FF] mb-4">Crear Estudiante</button>
            </div>
            <div className="border border-gray-300 rounded-2xl p-4 shadow-2xl shadow-gray-300">
                <table className="table-auto w-full border-separate border-spacing-x-5">
                    <thead>
                        <tr>
                            <th className="bg-gray-300 py-3 border-gray-400 rounded-xl font-mono">id</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono">nombre</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono">apellido</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono">curso</th>
                            <th className="bg-gray-300 rounded-xl font-mono">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*seccion de la coneccion de la base de datos  */}
                        {
                         estudiante.map((estudiante)=>(
                            <tr key={estudiante.id_estudiante}>
                                <td className="font-mono text-center py-2">{estudiante.id_estudiante}</td>
                                <td className="font-mono text-center">{estudiante.nombre}</td>
                                <td className="font-mono text-center">{estudiante.apellido}</td>
                                <td className="font-mono text-center">{estudiante.id_curso || 'Sin curso'}</td>
                                <td className="flex justify-center gap-2 items-center py-2">
                                    <Pencil onClick={()=>AbrirModalEditar(estudiante)} className="hover:text-blue-500 cursor-pointer" size={20} />
                                    <Trash onClick={()=>EliminarEstudiantes(estudiante.id_estudiante)} className="hover:text-red-700 cursor-pointer" size={20}/>
                                </td>
                            </tr>
                         ))   
                        }
                    </tbody>
                </table>
            </div>
            {
                Abrir &&(
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-amber-50 w-96 rounded-2xl">
                            {
                                modoEdicion?(
                                    <div className="w-full rounded-t-2xl bg-[#0000FF] py-4 text-white">
                                        <h3 className="text-center font-mono">Editar Estudiante</h3>
                                    </div>
                                ):(
                                    <div className="w-full rounded-t-2xl bg-[#0000FF] py-4 text-white">
                                        <h3 className="text-center font-mono">Crear nuevo Estudiante</h3>
                                    </div>
                                )
                            }
                            {/*seccionn de acutualizacion y creacion  */}
                            <div className="px-10 mt-6 pb-6">
                                <form className="flex flex-col gap-3">
                                    <label className="font-mono">Nombre:</label>
                                    <input 
                                        type="text" 
                                        onChange={CambioEntrada} 
                                        name="nombre" 
                                        value={formData.nombre} 
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1"
                                    />
                                    
                                    <label className="font-mono">Apellido:</label>
                                    <input 
                                        type="text" 
                                        onChange={CambioEntrada} 
                                        name="apellido" 
                                        value={formData.apellido} 
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1"
                                    />
                                    
                                    <label className="font-mono">Curso:</label>
                                    <select 
                                        onChange={CambioEntrada} 
                                        name="id_curso" 
                                        value={formData.id_curso}
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1"
                                    >{/*bara de seleccion de grado */}
                                        <option value="">Seleccione un curso</option>
                                        {curso.map((cur)=>(
                                            <option key={cur.id_curso} value={cur.id_curso}>{cur.grado}</option>
                                        ))}
                                    </select>
                                    
                        
                                </form>
                                {/* botones de crear y actualizar estudiante */}
                                <div className="flex justify-end gap-4 mt-6">
                                    {modoEdicion?(
                                        <button onClick={CrearEstudiante} className="border px-4 py-1 rounded-2xl hover:bg-[#0000FF] hover:border-[#0000FF] hover:text-white">Editar</button>
                                    ):(
                                        <button onClick={CrearEstudiante} className="border px-4 py-1 rounded-2xl hover:bg-[#0000FF] hover:border-[#0000FF] hover:text-white">Crear</button>
                                    )}
                                    <button onClick={()=>SetAbrir(false)} className="border px-4 py-1 rounded-2xl hover:bg-red-600 hover:border-red-600 hover:text-white">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default estudiante
