import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../modules/inicio/inicio';
import Curso from '../modules/curso/curso';
import Estudiante from '../modules/estudiante/estudiante';
import Reporte from '../modules/reporte/reporte';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" replace />} />
      <Route path="/inicio" element={<Dashboard />} />
      <Route path="/curso" element={<Curso/>} />
      <Route path='/estudiante' element={<Estudiante/>} />
      <Route path='/reporte' element={<Reporte/>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      
    </Routes>
  );
};

export default AppRoutes;