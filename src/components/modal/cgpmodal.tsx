/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import translations from './translations.json';
import './cgpmodal.scss';

const CgpModal = (props: CgpModalProps) => {
    const { className, center, wrapClassName, modalClassName, openOnLoad, unmountOnClose, language } = props;
    const [modal, setModal] = useState(openOnLoad);
    const toggle = () => setModal(!modal);
    // Local Storage
    let setLocalStorage = () => {
        if (sessionStorage.getItem('cgp-modal-shown') === null) {
            sessionStorage.setItem('cgp-modal-shown', 'true');
        }
    };
    let getLocalStorage = () => {
        let cgpModalShown = sessionStorage.getItem('cgp-modal-shown');
        return cgpModalShown === 'true' ? false : true;
        // return true;
    };
    if (getLocalStorage()) {
        return (
            <Modal
                isOpen={modal}
                toggle={toggle}
                className={className}
                wrapClassName={wrapClassName}
                modalClassName={modalClassName}
                centered={center}
                unmountOnClose={unmountOnClose}
                onClosed={setLocalStorage}
                aria-labelledby="modal-heading"
                aria-describedby="modal-description"
            >
                <div id="modal-heading" className="modal-header">
                    <h2 className="modal-title">
                        {translations[language].home.title}
                    </h2>
                    <button type="button" className="close" aria-label="Close" onClick={toggle}><span aria-hidden="true">×</span></button>
                </div>
                <ModalBody id="modal-description" tag="div">
                    <p>{translations[language].home.description}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        {translations[language].buttonlabel}
                    </Button>
                </ModalFooter>
            </Modal>
        );
    } else {
        return null;
    }
};

interface CgpModalProps {
    className: string;
    center: boolean;
    wrapClassName: string;
    modalClassName: string;
    openOnLoad: boolean;
    unmountOnClose: boolean;
    language: 'en-CA' | 'fr-CA';
}

export default CgpModal;
