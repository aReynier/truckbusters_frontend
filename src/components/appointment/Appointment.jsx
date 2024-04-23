import { useState } from 'react';
import Calendar from "./calendar/Calendar"
import Form from "./form/Form"

function App() {
    const [showCalendar, setShowCalendar] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [frontDate, setFrontDate] = useState("");
    const [backDate, setBackDate] = useState("2001-01-01T00:00:00.000Z");

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

    return (
      <>
        <Calendar configureFrontDate={updateFrontDateState} configureBackDate={updateBackDateState} calendarToggleVisibility={handleToggleCalendarVisibility} formToggleVisibility={handleToggleFormVisibility} displayCalendar={showCalendar} displayForm={showForm} />
        <Form getFrontDate={frontDate} getBackDate={backDate} calendarToggleVisibility={handleToggleCalendarVisibility} formToggleVisibility={handleToggleFormVisibility} displayForm={showForm} />
      </>
    )
  }
  
  export default App
  