import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo/logo.png';
import SidebarLinkGroup from './SidebarLinkGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-primary duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/dashboard" className="flex flex-row justify-between">
          <img src={Logo} alt="Logo" height={50} width={50} className='mr-5' />

         <div className='text-white text-2xl font-bold flex items-center mr-3'>
            HealthX
          </div> 
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className=" py-4 px-4 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">

            <li>
                <NavLink
                  to="/patient/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:border-r-4 dark:hover:bg-meta-4 ${
                    pathname.includes('dashboard') && 'border-r-4 dark:bg-meta-4'
                  }`}
                >
                   <FontAwesomeIcon icon={faCircleUser} style={{color: "#ffffff",}} />
                  Overview
                </NavLink>
              </li>
         
             <li>
                <NavLink
                  to="/patient/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:border-r-4 dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'border-r-4 dark:bg-meta-4'
                  }`}
                >
                   <FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} />
                  Profile
                </NavLink>
              </li>
             
              <li>
                <NavLink
                  to="/patient/records"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:border-r-4 border-fuchsia-600 dark:hover:bg-meta-4 ${
                    pathname.includes('records') &&
                    'border-r-4 dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon icon={faHospital} style={{color: "#fcfcfc",}} />
                  Medical Record
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/patient/doctors"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:border-r-4 border-fuchsia-600 dark:hover:bg-meta-4 ${
                    pathname.includes('doctors') &&
                    'border-r-4 dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon icon={faUserNurse} style={{color: "#fcfcfc",}} />
                  Doctors
                </NavLink>
              </li>

      
              <li>
                <NavLink
                  to="/ai"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:border-r-4 border-fuchsia-600 dark:hover:bg-meta-4 ${
                    pathname.includes('ai') &&
                    'border-r-4 dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon icon={faRobot} style={{color: "#fcfcfc",}} />
                  AI
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/patient/summary"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:border-r-4 border-fuchsia-600 dark:hover:bg-meta-4 ${
                    pathname.includes("summary") &&
                    'border-r-4 dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon icon={faNotesMedical} style={{color: "#fcfcfc",}} />
                  Summarizer
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/patient/log"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:border-r-4 border-fuchsia-600 dark:hover:bg-meta-4 ${
                    pathname.includes("log") &&
                    'border-r-4 dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon icon={faList} style={{color: "#fcfcfc",}} />
                  Health Log
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/patient/reminders"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:border-r-4 border-fuchsia-600 dark:hover:bg-meta-4 ${
                    pathname.includes("reminders") &&
                    'border-r-4 dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} style={{color: "#fcfcfc",}} />
                  Reminders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/patient/news"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:border-r-4 border-fuchsia-600 dark:hover:bg-meta-4 ${
                    pathname.includes("news") &&
                    'border-r-4 dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon icon={faNewspaper} style={{color: "#fcfcfc",}} />
                  News and Tips
                </NavLink>
              </li>
             
            </ul>
          </div>

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
