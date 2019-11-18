import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonItem,
    IonLabel
} from '@ionic/react';
import React, { useContext } from 'react';
import { AppContext } from 'utils/State';

import 'pages/Home.css';
import { BasePage } from 'components/BasePage';

export const Home = (props) => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(AppContext);
    const loggedIn = false;

    return (
        <BasePage>
            {state.habits.map((habit, index) => (
                <IonItem key={index}>
                    <IonLabel className="ion-text-wrap">{habit.label}</IonLabel>
                    <IonCheckbox/>
                </IonItem>
            ))}

            {!loggedIn && !state.habits.length &&
            <IonCard className="welcome-card">
                <img src="/assets/shapes.svg" alt=""/>
                <IonCardHeader>
                    <IonCardSubtitle>Get Started</IonCardSubtitle>
                    <IonCardTitle>Welcome to Habitus</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>
                        Please get started and add the habits you want to track. You can either click in the top right
                        corner or select "Habits" from the menu.
                    </p>
                </IonCardContent>
            </IonCard>}
        </BasePage>
    );
};

