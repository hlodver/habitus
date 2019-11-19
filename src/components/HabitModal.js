import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonInput,
    IonItem,
    IonLabel,
    IonModal
} from '@ionic/react';

export const HabitModal = (props) => {
    // manage the Input
    const [inputValue, setInputValue] = useState();
    const { habit, visible, handleFormSubmit } = props;
    const isNew = !habit;
    // we are using this to set the initial value of the
    // input field
    useEffect(() => {
        setInputValue(!habit ? '' : habit.label);
    },[habit]);

    const handleClick = (v) => {
      handleFormSubmit(v);
      setInputValue('');
    };
    return (
        <IonModal isOpen={visible}>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{isNew ? 'Add' : 'Edit'} a daily Habit</IonCardTitle>
                    <IonCardSubtitle>
                        What habit would you like to {isNew ? 'add' : 'edit'}?
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonLabel position="floating">Short description</IonLabel>
                        <IonInput
                            value={inputValue}
                            onInput={e => setInputValue(e.target.value)}
                        />
                    </IonItem>
                    <IonButton onClick={() => handleClick(inputValue)}>Save</IonButton>
                    <IonButton onClick={() => handleClick(null)}>Cancel</IonButton>
                </IonCardContent>
            </IonCard>
        </IonModal>
    );
};

