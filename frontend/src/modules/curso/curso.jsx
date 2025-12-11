import { useEffect, useState } from "react"
import {mostrarCursos,insertaCurso,actualizaCurso,eliminaCurso} from '../../services/curso.service'
import { Pencil,Trash  } from 'lucide-react';
import Swal from 'sweetalert2'

const curso = () => {
    const [curso,SetCurso]=useState([]);
    const [Abrir,SetAbrir]=useState(false);
    const [formData,SetformData]=useState({
        grado:'',
        paralelo:''
    })
    const [modoEdicion,SetModoEdicion]=useState(false)
    const [cursoEditada,SetCursoEditada]=useState(null);

    const CambioEntrada=(e)=>{
        const {name,value}=e.target;
        SetformData({
            ...formData,
            [name]:value
        })
    }

    useEffect(()=>{
        const cargarCurso= async()=>{
            const resultado = await mostrarCursos();
            SetCurso(resultado);
        }
        cargarCurso();
    },[])
// seccion de crear un curso
    const CrearCurso=async(e)=>{
        e.preventDefault();
        try{
            // actualizar un curso
            if(modoEdicion){
                await actualizaCurso(cursoEditada,{
                    grado:formData.grado,
                    paralelo:formData.paralelo
                })
                const resultado = await mostrarCursos();
                SetCurso(resultado);
                SetAbrir(false)
                SetModoEdicion(false);
                SetCursoEditada(null);
                SetformData({
                    grado:'',
                    paralelo:''
                })
                Swal.fire({
                    title: "¡Actualizado Correctamente!",
                    icon: "success",
                    draggable: true,
                    timer:4000,
                    showCancelButton:false
                });
            }else{
                if(formData.nombre===''){
                    return Swal.fire({
                        title: "¡El grado es obligatorio!",
                        icon: "error",
                        draggable: true,
                        timer:4000,
                        showCancelButton:false
                    });
                }// else para agragar un nuevo curso
                await insertaCurso({
                    grado:formData.grado,
                    paralelo:formData.paralelo
                })
                const resultado = await mostrarCursos();
                SetCurso(resultado);
                SetformData({
                    grado:'',
                    paralelo:''
                })
                SetAbrir(false);
                // alerta que se creo bien 
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

    const AbrirModalEditar =(curso)=>{
        SetModoEdicion(true)
        SetCursoEditada(curso.id_curso)
        SetformData({
            grado:curso.grado,
            paralelo:curso.paralelo || ''
        })
        SetAbrir(true);
    }
// en aqui se re aliza la eliminacion logica 
    const eliminaCursos =async(id_curso)=>{
        Swal.fire({
            title: "¿Estás seguro de eliminar esta categoría?",
            text: "No podrás revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Eliminar"
        }).then(async(result) => {
            if (result.isConfirmed) {
               try{
                 await eliminaCurso(id_curso);
                 const resultado = await mostrarCursos();
                 SetCurso(resultado);
                 //mensaje de eliminacion exitosa
                 Swal.fire({
                    title: "¡Se eliminó exitosamente!",
                    icon: "success",
                    draggable: true,
                    timer:4000,
                    showCancelButton:false
                });
               }catch(error){
                 console.log(error);
                 //mensaje de que no se puede eliminar
                 Swal.fire({
                    title: "Error al eliminar",
                    text: error.response?.data?.error || "No se puede eliminar la categoría",
                    icon: "error",
                    draggable: true,
                    timer:4000,
                    showCancelButton:false
                });
               }
            }
        });
    }
    
    return(
        // tabla de curso 
        <div className="">
            <div className="flex justify-end">
                <button onClick={()=>SetAbrir(true)} className="border p-2 border-gray-300 rounded-xl hover:bg-[#0000FF] hover:text-white hover:border-[#0000FF] mb-4">Crear Curso</button>
            </div>
            <div className="border border-gray-300 rounded-2xl p-4 shadow-2xl shadow-gray-300">
                <table className="table-auto w-full border-separate border-spacing-x-5">
                    <thead>
                        <tr>
                            <th className="bg-gray-300 py-3 border-gray-400 rounded-xl font-mono">id</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono">grado</th>
                            <th className="bg-gray-300 border-gray-400 rounded-xl font-mono">paralelo</th>
                            <th className="bg-gray-300 rounded-xl font-mono">Acciones</th>
                        </tr>
                    </thead>
                    {/* aqui se enlasa curso para traer todo de la base de datos*/ }
                    <tbody>
                        {
                         curso.map((curso)=>(
                            <tr key={curso.id_curso}>
                                <td className="font-mono text-center py-2">{curso.id_curso}</td>
                                <td className="font-mono text-center">{curso.grado}</td>
                                <td className="font-mono text-center">{curso.paralelo || 'Sin descripción'}</td>
                                <td className="flex justify-center gap-2 items-center py-2">
                                    <Pencil onClick={()=>AbrirModalEditar(curso)} className="hover:text-blue-500 cursor-pointer" size={20} />
                                    <Trash onClick={()=>eliminaCursos(curso.id_curso)} className="hover:text-red-700 cursor-pointer" size={20}/>
                                </td>
                            </tr>
                         ))   
                        }
                    </tbody>
                </table>
            </div>
            {
                Abrir &&(
                    //aqui se encuentra  los botones de editar y  crear un nuevo curso 
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-amber-50 w-96 rounded-2xl">
                            {
                                modoEdicion?(
                                    <div className="w-full rounded-t-2xl bg-[#0000FF] py-4 text-white">
                                        <h3 className="text-center font-mono">Editar Curso</h3>
                                    </div>
                                ):(
                                    <div className="w-full rounded-t-2xl bg-[#0000FF] py-4 text-white">
                                        <h3 className="text-center font-mono">Crear nueva Curso</h3>
                                    </div>
                                )
                            }
                            {/*este div ayuda  arealizar el registro o la actualizacion de un nuevo curso */}
                            <div className="px-10 mt-6 pb-6">
                                <form className="flex flex-col gap-3">
                                    <label className="font-mono">Grado:</label>
                                    <input 
                                        type="text" 
                                        onChange={CambioEntrada} 
                                        name="grado" 
                                        value={formData.grado} 
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1"
                                    />
                                    
                                    <label className="font-mono">Paralelo:</label>
                                    <textarea 
                                        onChange={CambioEntrada} 
                                        name="paralelo" 
                                        value={formData.paralelo} 
                                        rows="3"
                                        className="border border-gray-400 rounded-2xl outline-none pl-2 py-1 resize-none"
                                    />
                                </form>
                                {/* este div se encuentra todo lo relacionado a los botones de crear actualizar  */}
                                <div className="flex justify-end gap-4 mt-6">
                                    {modoEdicion?(
                                        <button onClick={CrearCurso} className="border px-4 py-1 rounded-2xl hover:bg-[#0000FF] hover:border-[#0000FF] hover:text-white">Editar</button>
                                    ):(
                                        <button onClick={CrearCurso} className="border px-4 py-1 rounded-2xl hover:bg-[#0000FF] hover:border-[#0000FF] hover:text-white">Crear</button>
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

export default curso
