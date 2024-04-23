import './Modal.scss'

const Modal = (props) => {
    const { open, onClose, weekDay, monthNumber, month, year } = props

    return (
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
            <button className="modal__window__content__Hour">6H00</button>
            <button className="modal__window__content__Hour">8H00</button>
            <button className="modal__window__content__Hour">10H00</button>
            <button className="modal__window__content__Hour">12H00</button>
            <button className="modal__window__content__Hour">14H00</button>
        </div>
    </div>
    </div>
  )
}

export default Modal