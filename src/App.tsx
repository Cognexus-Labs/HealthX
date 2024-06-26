import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Patient from './pages/Patient/Dashboard';
import Records from './pages/Patient/Records';
import Patients from './pages/Doctor/Patients';
import Record from './pages/Doctor/Patient';
import Chat from './pages/Chat';
import Ai from './pages/Ai';
import Doctor from './pages/Doctor/Dashboard';
import Doctors from './pages/Patient/Doctors';
import Summary from './pages/Patient/Summary';
import Log from './pages/Patient/Log';
import Reminders from './pages/Patient/Reminders';
import News from './pages/Patient/News';
import Admin from './pages/Admin/Dashboard';
import Docs from './pages/Admin/Doctors';
import DoctorProfile from './pages/Doctor/Profile';
import PatientProfile from './pages/Patient/Profile';
import Homepage from './pages/Homepage';
import Loader from './common/Loader';
import routes from './routes';


const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const { userType } = "doctor";

  const Home = userType === 'doctor' ? Doctor : userType === 'patient' ? Patient : Homepage;

  return loading ? (
    <Loader />
  ) : (
    <>
    <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto'/>
  
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/homepage" index element={<Homepage />} />
        <Route path="/doctor/dashboard" element={<Doctor />} />
        <Route path="/patient/dashboard" element={<Patient />} />
        <Route path="/patient/records" element={<Records />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/doctor/patients" element={<Patients />} />
        <Route path="/doctor/patient" element={<Record />} />
        <Route path="/patient/doctors" element={<Doctors />} />
        <Route path="/patient/summary" element={<Summary />} />
        <Route path="/patient/log" element={<Log />} />
        <Route path="/patient/reminders" element={<Reminders />} />
        <Route path="/patient/news" element={<News />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/doctors" element={<Docs />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route element={<DefaultLayout />}>
          {/* <Route element={<Home />} /> */}
          {routes.map(({ path, component: Component }) => (
            <Route
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
