import { useEffect, useState, useRef } from 'react';
import './Form.scss'


const Form = (props) => {
    const { getFrontDate, getBackDate, displayForm, calendarToggleVisibility, formToggleVisibility } = props

    const appointmentDate = new Date(getBackDate);

    const[data, setData] =useState("");
    const[formData, setFormData] = useState({
        appointmentData: {
            "moment": appointmentDate,
            "deck": 1
          }
    })

    const formRef = useRef(null);

    useEffect(() => {
        appointmentDate.toISOString()
        
        if (formData.appointmentData.moment.toISOString() !== appointmentDate.toISOString()) {
            
            setFormData(prevFormData => ({
                ...prevFormData,
        appointmentData: {
            "moment": appointmentDate,
            "deck": 1
          }
    }));
        }
    }, [appointmentDate]);

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
          const postResponse = await fetch('https://truckbusters-backend.onrender.com/api/v1/appointment' || 'http://localhost:3002/api/v1/appointment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appointmentData: formData.appointmentData,
                companyData: {
                    name: document.getElementById('form__content__company__name').value,
                    email: document.getElementById('form__content__company__email').value,
                    phone: document.getElementById('form__content__company__phone').value
                }, 
                driverData: {
                    lastname: document.getElementById('form__content__driver__lastname').value,
                    firstname: document.getElementById('form__content__driver__firstname').value,
                    phone: document.getElementById('form__content__driver__phone').value
                },
                truckData: {
                    brand: document.getElementById('form__content__truck__brand').value,
                    model: document.getElementById('form__content__truck__model').value,
                    license_plate: document.getElementById('form__content__truck__license').value
                }
              })
          });
      
          if (!postResponse.ok) {
            throw new Error('Failed to send data');
          } else {
            formRef.current.reset();
            alert("rendez-vous pris avez succès, un email de confirmation vous a été envoyé");
          }
      
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      useEffect(() => {
        const fetchAppointment = async () => {
          try {
            const response = await fetch('https://truckbusters-backend.onrender.com/api/v1/appointment' || 'http://localhost:3002/api/v1/appointment');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData(result);

            return data
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchAppointment();
      }, []);

    return (
        <div style={{ display: displayForm ? 'block' : 'none' }} >
            <div className="form">
                <h2 className="form__title">Horaire choisie</h2>
                <div className="form__selected__hour">
                    <p>{getFrontDate}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="form__selected__hour__icon"
                    onClick={() => {
                        calendarToggleVisibility();
                        formToggleVisibility();
                        }
                    }
                    >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                </div>
            </div>
            <h2 className="form__title">Vos coordonnées</h2>
            <form className="form__content" onSubmit={handleSubmit} ref={formRef}>
            <h3 className="form__content__sub__title">L&apos;entreprise:</h3>
                <div className="form__content__group">
                    <div className="form__content__group__field">
                        <label className="form__content__label">Nom de l&apos;entreprise (*)</label>
                        <input
                        type="text"
                        id="form__content__company__name"
                        className="form__content__input"
                        required
                        placeholder=""
                        />
                    </div>
                    <div className="form__content__group__field">
                    <label className="form__content__label">Email de l&apos;entreprise (*)</label>
                    <input
                    type="email"
                    id="form__content__company__email"
                    className="form__content__input"
                    required
                    placeholder=""
                    />
                    </div>
                    <div className="form__content__group__field">
                        <label className="form__content__label">Téléphone de l&apos;entreprise</label>
                        <input
                        type="text"
                        id="form__content__company__phone"
                        className="form__content__input"
                        required
                        placeholder=""
                    />
                    </div>
                </div>
            <h3 className="form__content__sub__title">Le conducteur:</h3>
                <div className="form__content__group">
                    <div className="form__content__group__field">
                        <label className="form__content__label">Nom du conducteur (*)</label>
                        <input
                        type="text"
                        id="form__content__driver__lastname"
                        className="form__content__input"
                        required
                        placeholder=""
                        />
                    </div>
                    <div className="form__content__group__field">
                        <label className="form__content__label">Prénom du conducteur (*)</label>
                        <input
                        type="text"
                        id="form__content__driver__firstname"
                        className="form__content__input"
                        required
                        placeholder=""
                        />
                    </div>
                    <div className="form__content__group__field">
                        <label className="form__content__label">Téléphone du conducteur</label>
                        <input
                        type="text"
                        id="form__content__driver__phone"
                        className="form__content__input"
                        required
                        placeholder=""
                        />
                    </div>
                </div>
            <h3 className="form__content__sub__title">Le camion:</h3>
                <div className="form__content__group">
                    <div className="form__content__group__field">
                        <label className="form__content__label">Marque du camion (*)</label>
                        <input
                        type="text"
                        id="form__content__truck__brand"
                        className="form__content__input"
                        required
                        placeholder=""
                        />
                    </div>
                    <div className="form__content__group__field">
                        <label className="form__content__label">Modèle du camion (*)</label>
                        <input
                        type="text"
                        id="form__content__truck__model"
                        className="form__content__input"
                        required
                        placeholder=""
                        />
                    </div>
                    <div className="form__content__group__field">
                        <label className="form__content__label">Plaque d&apos;immatriculation du camion (*)</label>
                        <input
                        type="text"
                        id="form__content__truck__license"
                        className="form__content__input"
                        required
                        placeholder=""
                        />
                    </div>
                </div>

                <input
                    type="submit"
                    value="Confirmer"
                    className="form__submit"
                />
            </form>
        </div>
    )
}

export default Form