import { useState } from 'react';
import Sidebar from '../../components/Sidebar.tsx';
import Header from '../../components/Header.tsx';
import Breadcrumb from '../../components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faWeight, faTint, faChartLine, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import ChartOne from '../../components/ChartOne.tsx';

const Overview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bloodPressure, setBloodPressure] = useState<number>(120);
  const [heartRate, setHeartRate] = useState<number>(75);
  const [sugarLevel, setSugarLevel] = useState<number>(90);
  const [bmi, setBmi] = useState<number>(22);
  const [weight, setWeight] = useState<number>(70);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <div className="flex flex-row mb-5 flex-wrap justify-evenly gap-5 md:gap-0">
                <Breadcrumb pageName="Health Overview" />
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">

                <div className="flex justify-between rounded-lg border border-stroke bg-white py-2 px-5 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div>
                    <span className="text-sm font-medium">Blood Pressure</span>
                    <h4 className="text-title-sm text-black dark:text-white">
                      {bloodPressure} mmHg
                    </h4>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-red-500 dark:bg-red-600">
                    <FontAwesomeIcon icon={faTint} style={{color: "#215660",}} />
                  </div>
                </div>

                <div className="flex justify-between rounded-lg border border-stroke bg-white py-2 px-5 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div>
                    <span className="text-sm font-medium">Heart Rate</span>
                    <h4 className="text-title-sm text-black dark:text-white">
                      {heartRate} bpm
                    </h4>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-500 dark:bg-blue-600">
                    <FontAwesomeIcon icon={faHeartbeat} style={{color: "#215660",}} />
                  </div>
                </div>

                <div className="flex justify-between rounded-lg border border-stroke bg-white py-2 px-5 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div>
                    <span className="text-sm font-medium">Sugar Level</span>
                    <h4 className="text-title-sm text-black dark:text-white">
                      {sugarLevel} mg/dL
                    </h4>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-green-500 dark:bg-green-600">
                    <FontAwesomeIcon icon={faChartLine} style={{color: "#215660",}} />
                  </div>
                </div>

                <div className="flex justify-between rounded-lg border border-stroke bg-white py-2 px-5 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div>
                    <span className="text-sm font-medium">BMI</span>
                    <h4 className="text-title-sm text-black dark:text-white">
                      {bmi}
                    </h4>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-purple-500 dark:bg-purple-600">
                    <FontAwesomeIcon icon={faBalanceScale} style={{color: "#215660",}} />
                  </div>
                </div>

                <div className="flex justify-between rounded-lg border border-stroke bg-white py-2 px-5 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div>
                    <span className="text-sm font-medium">Weight</span>
                    <h4 className="text-title-sm text-black dark:text-white">
                      {weight} kg
                    </h4>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-yellow-500 dark:bg-yellow-600">
                    <FontAwesomeIcon icon={faWeight} style={{color: "#215660",}} />
                  </div>
                </div>

              </div>

              <div className="mt-4">
                <ChartOne />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Overview;
