import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenuButton,
    IonPage,
    IonButton,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { HabitReducer } from 'components/HabitReducer';
import { addCircleOutline } from 'ionicons/icons';

import { book, build, colorFill, grid } from 'ionicons/icons';
import React, { useState } from 'react';
import './Home.css';
import { EditHabit } from 'components/Edit';

export const Home = (props) => {
    // eslint-disable-next-line
    const [modalInfo, setModalInfo] = useState({ isVisible: false, value: '' });
    // eslint-disable-next-line
    let { state, dispatch } = HabitReducer();

    const loggedIn = false;
    // eslint-disable-next-line
    const addNewEntry = _data => {
        debugger;
        dispatch({ type: 'ADD_THING', data: _data });
    };

    const deleteEntry = _index => {
        dispatch({ type: 'DELETE_THING', index: _index });
    };

    const editEntry = (_index, _data) => {
        debugger;
        let payload = { index: _index, data: _data };
        dispatch({ type: 'EDIT_THING', ...payload });
    };

    const modalInfoWithEntry = (_entryValue, _index) => {
        debugger;
        setModalInfo({ isVisible: true, value: _entryValue, index: _index });
    };
    // eslint-disable-next-line
    const handleFormSubmit = _formResponse => {
        if (_formResponse.value) {
            modalInfo.index != null
                ? editEntry(modalInfo.index, _formResponse.value)
                : addNewEntry(_formResponse.value);
        }
        // reset the mondalInfo state
        setModalInfo({ ...modalInfo, isVisible: false, value: '' });
    };

    console.log('state', state);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle className="title">Habitus</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => modalInfoWithEntry()}>
                            <IonIcon icon={addCircleOutline}/>
                        </IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                <EditHabit initValue={modalInfo} handleFormSubmit={handleFormSubmit} />

                {state.things.map((_thing, _index) => (
                    <IonItem key={_index}>
                        <IonLabel className="ion-text-wrap">{_thing}</IonLabel>
                        <IonButton onClick={() => modalInfoWithEntry(_thing, _index)}>
                            Edit
                        </IonButton>
                        <IonButton color="danger" onClick={() => deleteEntry(_index)}>
                            Delete
                        </IonButton>
                    </IonItem>
                ))}

                {!loggedIn && !state.things.length &&
                <IonCard className="welcome-card">
                    <img src="/assets/shapes.svg" alt=""/>
                    <IonCardHeader>
                        <IonCardSubtitle>Get Started</IonCardSubtitle>
                        <IonCardTitle>Welcome to Habitus</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>
                            Please create an account to continue. We are using auth0 for login.
                        </p>
                    </IonCardContent>
                </IonCard>}

                {loggedIn &&
                <IonList lines="none">
                    <IonListHeader>
                        <IonLabel>Resources</IonLabel>
                    </IonListHeader>
                    <IonItem href="https://ionicframework.com/docs/" target="_blank">
                        <IonIcon slot="start" color="medium" icon={book}/>
                        <IonLabel>Ionic Documentation</IonLabel>
                    </IonItem>
                    <IonItem href="https://ionicframework.com/docs/building/scaffolding" target="_blank">
                        <IonIcon slot="start" color="medium" icon={build}/>
                        <IonLabel>Scaffold Out Your App</IonLabel>
                    </IonItem>
                    <IonItem href="https://ionicframework.com/docs/layout/structure" target="_blank">
                        <IonIcon slot="start" color="medium" icon={grid}/>
                        <IonLabel>Change Your App Layout</IonLabel>
                    </IonItem>
                    <IonItem href="https://ionicframework.com/docs/theming/basics" target="_blank">
                        <IonIcon slot="start" color="medium" icon={colorFill}/>
                        <IonLabel>Theme Your App</IonLabel>
                    </IonItem>
                </IonList>
                }

            </IonContent>
        </IonPage>
    );
};

