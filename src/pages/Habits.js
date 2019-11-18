import { IonButton, IonItem, IonLabel } from '@ionic/react';
import React, { useContext } from 'react';
import { AppContext, deleteHabit, showHabitModal } from 'utils/State';
import { BasePage } from 'components/BasePage';

export const Habits = () => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <BasePage>
            {state.habits.map((habit, index) => (
                <IonItem key={index}>
                    <IonLabel className="ion-text-wrap">{habit.label}</IonLabel>
                    <IonButton onClick={() => dispatch(showHabitModal({index}))}>
                        Edit
                    </IonButton>
                    <IonButton color="danger" onClick={() => dispatch(deleteHabit({index}))}>
                        Delete
                    </IonButton>
                </IonItem>
            ))}
        </BasePage>
    );
};

