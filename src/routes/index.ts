import { lazy } from 'react';

const Doctor = lazy(() => import('../pages/Doctor/Dashboard'));
const Patient = lazy(() => import('../pages/Patient/Dashboard'));
const Chat = lazy(() => import('../pages/Chat'));
const Ai = lazy(() => import('../pages/Ai'));
const Records = lazy(() => import('../pages/Patient/Records'));
const Admin = lazy(() => import('../pages/Admin/Dashboard'));
const Patients = lazy(() => import('../pages/Doctor/Patients'));
const Record = lazy(() => import('../pages/Doctor/Patient'));
const Doctors = lazy(() => import('../pages/Patient/Doctors'));
const Summary = lazy(() => import('../pages/Patient/Summary'));
const Log = lazy(() => import('../pages/Patient/Log'));
const Reminders = lazy(() => import('../pages/Patient/Reminders'));
const News = lazy(() => import('../pages/Patient/News'));
const DoctorProfile = lazy(() => import('../pages/Patient/Profile'));
const PatientProfile = lazy(() => import('../pages/Doctor/Profile'));
const Docs = lazy(() => import('../pages/Admin/Doctors'));


const coreRoutes = [
  {
    path: '/doctor',
    title: 'Doctor',
    component: Doctor,
  },
  {
    path: '/chat',
    title: 'Chat',
    component: Chat,
  },
  {
    path: '/ai',
    title: 'Ai',
    component: Ai,
  },
  {
    path: '/patient/records',
    title: 'Records',
    component: Records,
  },
  {
    path: '/patient/dashboard',
    title: 'Patient',
    component: Patient,
  },
  {
    path: '/admin',
    title: 'Admin',
    component: Admin,
  },
  {
    path: '/admin/doctors',
    title: 'Doctors',
    component: Docs,
  },
  {
    path: '/patient/doctors',
    title: 'Doctors',
    component: Doctors,
  },
  {
    path: '/doctor/patients',
    title: 'Patients',
    component: Patients,
  },
  {
    path: '/doctor/patient',
    title: 'Patient',
    component: Record,
  },
  {
    path: '/doctor/profile',
    title: 'Profile',
    component: PatientProfile,
  },
  {
    path: '/patient/profile',
    title: 'Profile',
    component: DoctorProfile,
  },
  {
    path: '/patient/summary',
    title: 'Summary',
    component: Summary,
  },
  {
    path: '/patient/log',
    title: 'Log',
    component: Log,
  },
  {
    path: '/patient/reminders',
    title: 'Reminders',
    component: Reminders,
  },
  {
    path: '/patient/news',
    title: 'News',
    component: News,
  }
];

const routes = [...coreRoutes];
export default routes;
