import React, { useContext } from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonModal
} from '@ionic/react';
import { AppContext, hideErrorModal } from 'utils/State';

export const ErrorModal = (props) => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <IonModal isOpen={state.errorModal.visible}>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Oopsie..  An error has ocurrend</IonCardTitle>
                    <IonCardSubtitle>
                        {state.errorModal.message}
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonButton onClick={() => dispatch(hideErrorModal())}>Continue</IonButton>
                </IonCardContent>
            </IonCard>
        </IonModal>
    );
};

