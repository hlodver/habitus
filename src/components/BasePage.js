import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import React, { useContext } from 'react';
import { addNewHabit, AppContext, editHabit, hideHabitModal, showHabitModal } from 'utils/State';
import { HabitModal } from 'components/HabitModal';
import { ErrorModal } from 'components/ErrorModal';

export const BasePage = (props) => {
    const { state, dispatch } = useContext(AppContext);

    const handleFormSubmit = (value) => {
        if (value) {
            state.modal.index != null
            ? dispatch(editHabit({ index: state.modal.index, habit: { label: value } }))
            : dispatch(addNewHabit({ habit: { label: value }}));
            dispatch(hideHabitModal());
        }
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle className="title">Habitus</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => dispatch(showHabitModal({index: null}))}>
                            <IonIcon icon={addCircleOutline}/>
                        </IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <HabitModal visible={state.modal.visible} habit={state.modal.index !== null ? state.habits[state.modal.index] : null} handleFormSubmit={handleFormSubmit}/>
                <ErrorModal/>
                {props.children}
            </IonContent>
        </IonPage>
    );
};

