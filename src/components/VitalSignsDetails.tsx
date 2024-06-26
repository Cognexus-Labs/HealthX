import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api"; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../pages/signin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faShare, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const VitalSignsDetails = (props) => {
  
  const [isCardOpen, setCardOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const popup = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [vitalSignsData, setVitalSignsData] = useState<{ patientId: string, bloodPressure: string; pulseRate: string; respiratoryRate: string; temperature: string; }>({
    bloodPressure: '',
    pulseRate: '',
    respiratoryRate: '',
    temperature: '',
    patientId: '',
  }); 

  const userType = localStorage.getItem("userType");

  const patientId = props.patientId;

  const getVitalSigns = useQuery(api.healthRecord.getVitalSigns, { patientId: patientId });
  const createVitalSigns = useMutation(api.healthRecord.createVitalSigns);
  // const updateVitalSigns = useMutation(api.healthRecord.updateVitalSigns);
  const deleteVitalSigns = useMutation(api.healthRecord.deleteVitalSigns);

  const showDeleteConfirmation = (patientId: string) => {
    setUserToDeleteId(patientId);
    setDeleteConfirmationVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setUserToDeleteId(null);
    setDeleteConfirmationVisible(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    const file = e.target.files?.[0];
  
      if (file) {
        setSelectedFileName(file.name);
      }
  
      if (name === 'phone' ) {
        const phoneRegex = /^[+]?[0-9\b]+$/;
          
        if (!value.match(phoneRegex) && value !== '') {
          return;
        }
      } else if (name === 'name' || name === 'nationality' || name === 'language') {
        const letterRegex = /^[A-Za-z\s]+$/;
        if (!value.match(letterRegex) && value !== '') {
          return;
        }
      }
  
    setVitalSignsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProfile = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); 
  
    // const requiredFields = ['name', 'gender', 'phone', 'nationality', 'language', 'address'];
    // const emptyFields = requiredFields.filter((field) => !formData[field]);
  
    // if (emptyFields.length > 0) {
    //   toast.error('Please fill in all required fields.', {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 3000, 
    //   });
    //   requiredFields.forEach((field) => {
    //     if (!formData[field]) {
    //       const inputElement = document.querySelector(`[name="${field}"]`);
    //       if (inputElement) {
    //         inputElement.parentElement?.classList.add('error-outline');
    //       }
    //     }
    //   });
    //   setLoading(false);
    //   return; 
    // }

    const vitalSignsdata = new FormData();
    vitalSignsdata.append('bloodPressure', vitalSignsData.bloodPressure);
    vitalSignsdata.append('pulseRate', vitalSignsData.pulseRate);
    vitalSignsdata.append('respiratoryRate', vitalSignsData.respiratoryRate);
    vitalSignsdata.append('temperature', vitalSignsData.temperature);

    setLoading(false);
  
    try {
      await createVitalSigns({ ...vitalSignsData, patientId: patientId });
  
      setVitalSignsData({
        bloodPressure: '',
        pulseRate: '',
        respiratoryRate: '',
        temperature: '',
        patientId: '',
      })
  
      setPopupOpen(false);
      toast.success('Successfully created health record', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, 
      });
  
      setLoading(false);
    } catch (err) {
        console.error('Error in creating Vital SIgns:', err);
        toast.error('Error in creating Vital Signs. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000, // Adjust the duration as needed
        });
        setLoading(false);
      } 
  };

  const deleteVitalSignsDetails = async (patientId: any) => {
    try {
      await deleteVitalSigns({ id: patientId});
      toast.success('Successfully deleted record', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, 
      });
      hideDeleteConfirmation();
    } catch (error) {
      console.error('Error in deleting record:', error);
      toast.error('Error in deleting record:', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, 
      });
    }
  };

  const formatDateTime = (date: any) => {
    const d = new Date(date);
    return d.toLocaleString();
  }

   return (
    <>
      <div className="flex flex-row gap-10 w-full bg-white dark:border-strokedark dark:bg-boxdark">
        <div className='w-full mb-5 font-medium text-black text-xl'>
          VitalSigns Information
        </div>
        <div className="flex flex-row mb-5 items-center gap-10 justify-end">
          {userType === 'doctor' && (
            <>
            <button
            ref={trigger}
            onClick={() => setPopupOpen(!popupOpen)}
            className=""
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
            {popupOpen && (
                <div
                  ref={popup}
                  className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                >
                  <div
                    className="bg-white lg:mt-15 lg:w-1/2 rounded-lg pt-3 px-4 shadow-md"
                    style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}
                  >
                    <div className="flex flex-row justify-between">
                      <h2 className="text-xl px-6.5 pt-6.5 font-semibold mb-4">VitalSigns Details</h2>
                      <div className="flex justify-end">
                        <button
                          onClick={() => setPopupOpen(false)} 
                          className="text-blue-500 hover:text-gray-700 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 fill-current bg-primary rounded-full p-1 hover:bg-opacity-90"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <form>
                    <div className= "rounded-sm px-6.5 bg-white dark:border-strokedark dark:bg-boxdark">
                      <h3 className="mb-2.5 block font-semibold dark:text-white"></h3>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-3/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Blood Pressure
                        </label>
                        <div className={`relative ${vitalSignsData.bloodPressure ? 'bg-light-blue' : ''}`}>
                        <input
                          type="text"
                          name="bloodPressure"
                          required
                          value={vitalSignsData.bloodPressure}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"/>
                        </div>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Heart Rate
                        </label>
                        <div className={`relative ${vitalSignsData.pulseRate ? 'bg-light-blue' : ''}`}>
                        <input
                           type="text" 
                          name="pulseRate"
                          required
                          value={vitalSignsData.pulseRate}
                          placeholder='Severity'
                          onChange={handleInputChange}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"/>
                        </div>
                      </div> 

                      <div className="w-full xl:w-3/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Respiratory Rate
                        </label>
                        <div className={`relative ${vitalSignsData.respiratoryRate ? 'bg-light-blue' : ''}`}>
                        <input
                            type='text'
                              name="respiratoryRate"
                              value={vitalSignsData.respiratoryRate}
                              onChange={handleInputChange}
                              required
                              placeholder='Reaction'
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"/>
                          </div>
                      </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                           
                      <div className="w-full xl:w-2/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Body Temperature
                        </label>
                        <div className={`relative ${vitalSignsData.temperature ? 'bg-light-blue' : ''}`}>
                        <input
                          type="text"
                          name="temperature"
                          value={vitalSignsData.temperature}
                          required
                          onChange={handleInputChange}
                          placeholder="Notes"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"/>
                        </div>
                      </div>
                    </div>                     
                    </div>

                    </form>
                      <button
                        type="button"
                        onClick={handleAddProfile}
                        disabled={loading}
                        className={`mr-5 mb-5 inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <div className="spinner"></div>
                            <span className="pl-1">Creating...</span>
                          </div>
                        ) : (
                          <>Add Details</>
                        )}
                      </button>
                  </div>
                </div>
                )}
            </>
          )}

          <button
            onClick={() => setCardOpen(!isCardOpen)}
            className=""
          >
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
      </div>

      {isCardOpen && (
        <>
            {getVitalSigns != null && getVitalSigns?.length > 0 ? (
            <>
            {getVitalSigns?.map((user, index) => (
          <div className="flex w-full" key={index}>
            <div className='w-1/3 mb-5'>
              <span className="text-xl">Blood Pressure</span>
              <h4 className="text-xl mt-1 font-medium text-black dark:text-white">
                {user.bloodPressure}
              </h4>
            </div>

            <div className='w-1/3 mb-5'>
              <span className="text-xl">Pulse Rate</span>
              <h4 className="text-xl mt-1 font-medium text-black dark:text-white">
                {user.pulseRate}
              </h4>
            </div>

            <div className='w-1/3 mb-5'>
              <span className="text-xl">Respiratory Rate</span>
              <h4 className="text-xl mt-1 font-medium text-black dark:text-white">
                {user.respiratoryRate}
              </h4>
            </div>

            <div className='w-1/3 mb-5'>
              <span className="text-xl">Temperature</span>
              <h4 className="text-xl mt-1 font-medium text-black dark:text-white">
                {user.temperature}
              </h4>
            </div>

            <div className='w-1/3 mb-5'>
              <span className="text-xl">Timestamp</span>
              <h4 className="text-xl mt-1 font-medium text-black dark:text-white">
                {formatDateTime(user._creationTime)}
              </h4>
            </div>

            {userType === 'doctor' && (
            <>
            <button
                onClick={() => showDeleteConfirmation(user._id)}
                className="rounded-lg bg-danger py-0 px-3 h-10 text-center font-medium text-white hover-bg-opacity-90"
              >
                Delete
              </button>
              {isDeleteConfirmationVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
                  <div className="bg-white p-5 rounded-lg shadow-md">
                    <p>Are you sure you want to delete your record?</p>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={hideDeleteConfirmation}
                        className="mr-4 rounded bg-primary py-2 px-3 text-white hover:bg-opacity-90"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          hideDeleteConfirmation();
                          deleteVitalSignsDetails(user._id);
                        }}
                        className="rounded bg-danger py-2 px-3 text-white hover:bg-opacity-90"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
               </>
              )}
          </div>
           ))}
            </>
          ) : (
            <div className="flex flex-row justify-center items-center w-full h-full">
              <div className="flex p-10 flex-col justify-center items-center">
                <p className="text-md font-medium text-black dark:text-white">
                  No VitalSigns Information
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );

};

export default VitalSignsDetails;
