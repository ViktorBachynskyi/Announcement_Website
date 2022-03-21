import React from 'react';
import './Modal.scss';

type Props = {
  modalActive: boolean,
  setModalActive: (modalActive: boolean) => void,
};

export const Modal: React.FC<Props> = ({ modalActive, setModalActive, children }) => {
  return (
    <div className={modalActive ? 'modal active' : 'modal'}>
      <div className={modalActive ? 'modal__content active' : 'modal__content'}>
        <button
          type="button"
          className="modal__button-close"
          onClick={() => setModalActive(false)}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};
