import { useState, useEffect } from 'react';
import Calendar from "./calendar/Calendar"
import Form from "./form/Form"

function App() {
    const [showCalendar, setShowCalendar] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [frontDate, setFrontDate] = useState("");
    const [backDate, setBackDate] = useState("2001-01-01T00:00:00.000Z");
    const[data, setData] =useState("");

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

      useEffect(() => {
        const fetchAppointment = async () => {
          try {
            const response = await fetch('http://localhost:3002/api/v1/appointment');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData(result);

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchAppointment();
      }, []);

      let dataArray = [];

      if (data) {
        const momentsArray = data.appointments.map(appointment => appointment.moment);
        dataArray = momentsArray;
        console.log(dataArray);
      } else {
        console.log("Data is not available yet");
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

    if (duplicateMoments.length > 0) {
      console.log("Duplicate moments found:", duplicateMoments);
    } else {
      console.log("No duplicate moments found.");
    }

    return (
      <>
        <Calendar duplicateMoments={duplicateMoments} configureFrontDate={updateFrontDateState} configureBackDate={updateBackDateState} calendarToggleVisibility={handleToggleCalendarVisibility} formToggleVisibility={handleToggleFormVisibility} displayCalendar={showCalendar} displayForm={showForm} />
        <Form getFrontDate={frontDate} getBackDate={backDate} calendarToggleVisibility={handleToggleCalendarVisibility} formToggleVisibility={handleToggleFormVisibility} displayForm={showForm} />
      </>
    )
  }
  
  export default App
  