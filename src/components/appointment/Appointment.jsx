import { useState, useEffect } from 'react';
import Calendar from "./calendar/Calendar"
import Form from "./form/Form"
import ErrorModal from "./error-modal/ErrorModal"
import './Appointment.scss'

function App() {
    const [showCalendar, setShowCalendar] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [frontDate, setFrontDate] = useState("");
    const [backDate, setBackDate] = useState("2001-01-01T00:00:00.000Z");
    const[data, setData] =useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleToggleCalendarVisibility = () => {
        setShowCalendar(!showCalendar)
      }

    const handleToggleFormVisibility = () => {
        setShowForm(!showForm)
      }

    const updateFrontDateState = (newFrontDate) => {
        setFrontDate(newFrontDate);
    };

    const updateBackDateState = (newBackDate) => {
        setBackDate(newBackDate);
      };

      const fetchAppointment = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch('https://truckbusters-backend.onrender.com/api/v1/appointment');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setData(result);

        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      
      useEffect(() => {
        fetchAppointment();
      }, []);

      const handleCloseError = () => {
        setError(null);
    };

      let dataArray = [];

      if (data) {
        const momentsArray = data.appointments.map(appointment => appointment.moment);
        dataArray = momentsArray;
      }
   
    // Initialize an object to store moment occurrences
    const momentOccurrences = {};

    // Loop through momentsArray and count occurrences of each moment
    dataArray.forEach(moment => {
      if (momentOccurrences[moment]) {
        // If moment already exists in the object, increment its count
        momentOccurrences[moment]++;
      } else {
        // If moment doesn't exist in the object, initialize its count to 1
        momentOccurrences[moment] = 1;
      }
    });

    // Check if any moment occurs more than once
    const duplicateMoments = Object.keys(momentOccurrences).filter(moment => momentOccurrences[moment] > 1);

    return (
      <>
        <div className='appointment'>
          <h2 className='appointment__title'>Prendre rendez-vous</h2>
          <h2 className='appointment__title'>/ / / / / /</h2>
        </div>

        {isLoading && (
          <div className="loading">
            <p>Chargement en cours...</p>
          </div>
        )}
        
        {error && (
          <ErrorModal 
            open={!!error}
            onClose={handleCloseError}
          />
        )}

        {!isLoading && !error && (
          <>
            <Calendar duplicateMoments={duplicateMoments} configureFrontDate={updateFrontDateState} configureBackDate={updateBackDateState} calendarToggleVisibility={handleToggleCalendarVisibility} formToggleVisibility={handleToggleFormVisibility} displayCalendar={showCalendar} displayForm={showForm} />
            <Form getFrontDate={frontDate} getBackDate={backDate} calendarToggleVisibility={handleToggleCalendarVisibility} formToggleVisibility={handleToggleFormVisibility} displayForm={showForm} />
          </>
        )}

      </>
    )
  }
  
  export default App
  