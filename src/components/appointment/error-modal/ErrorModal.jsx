import './ErrorModal.scss';

const ErrorModal = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="error-modal" data-testid="error_modal">
            <div className="error-modal__content">
                <h2>Erreur de connexion</h2>
                <p>Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.</p>
                <div className="error-modal__actions">
                    <button onClick={onClose} className="error-modal__close" data-testid="error_modal__close__button">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;