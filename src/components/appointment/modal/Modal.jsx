import './Modal.scss'

const Modal = (props) => {
    const { doConfigureFrontDate, doConfigureBackDate, formVisibility, open, onClose, calendarVisibility, weekDay, monthNumber, month, year, backDate } = props
    
    //shifted hours on purpose to match time zone
    const hours = [
        { label: '6H00', time: '04:00:00' },
        { label: '8H00', time: '06:00:00' },
        { label: '10H00', time: '08:00:00' },
        { label: '12H00', time: '10:00:00' },
        { label: '14H00', time: '12:00:00' }
      ]

    return (
    <div>
        <div className="modal" style={{ display: open ? 'flex' : 'none' }}>
        <div className="modal__window">
            <button className="modal__window--close" onClick={() => onClose(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <p className="modal__window__date">Le {weekDay} {monthNumber} {month} {year}</p>
            <p className="modal__window__info">Choix de votre heure</p>
            <div className="modal__window__content">
            {hours.map((hour, index) => (
                <button
                    key={index} // Using index as key is fine here if the items in the array are static
                    className="modal__window__content__Hour"
                    onClick={() => {
                    calendarVisibility();
                    formVisibility();
                    doConfigureFrontDate(`Le ${weekDay} ${monthNumber} ${month} ${year} à ${hour.label}`);
                    doConfigureBackDate(`${backDate}T${hour.time}.000Z`);
                    onClose(false);
                    }}
                >
                    {hour.label}
                </button>
            ))}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Modal