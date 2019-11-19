import { IonItem, IonLabel, IonNote, IonList, IonListHeader } from '@ionic/react';
import React, { useContext } from 'react';
import { AppContext } from 'utils/State';
import { BasePage } from 'components/BasePage';
import { countLastXDays } from 'utils/dateStuff';
import 'pages/Stats.css';

export const Stats = () => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(AppContext);

    return (
        <BasePage>
            <IonList>
                <IonListHeader>
                    HABITS
                    <span className="headerRight">Finished last 30 days</span>
                </IonListHeader>
                {state.habits.map((habit, index) => (
                    <IonItem key={index}>
                        <IonLabel className="ion-text-wrap">{habit.label}</IonLabel>
                        <IonNote slot="end" color="primary" className="habitStat">{countLastXDays(habit.marked, 30)}</IonNote>


                    </IonItem>
                ))}
            </IonList>
        </BasePage>
    );
};

