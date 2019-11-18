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
import { addCircleOutline } from 'ionicons/icons';
import React, { useState, useContext } from 'react';
import { book, build, colorFill, grid } from 'ionicons/icons';
import { AppContext, HABIT_ACTIONS } from 'utils/State';
import './Home.css';
import { EditHabit } from 'components/HabitEditor';

export const Home = (props) => {
    // eslint-disable-next-line
    const [modalInfo, setModalInfo] = useState({ isVisible: false, value: '' });
    const { state, dispatch } = useContext(AppContext);
    const loggedIn = false;
    const addNewEntry = _data => {
        dispatch({ type: HABIT_ACTIONS.ADD_HABIT, data: _data });
    };

    const deleteEntry = _index => {
        dispatch({ type: HABIT_ACTIONS.DELETE_HABIT, index: _index });
    };

    const editEntry = (_index, _data) => {
        let payload = { index: _index, data: _data };
        dispatch({ type: HABIT_ACTIONS.EDIT_HABIT, ...payload });
    };

    const modalInfoWithEntry = (_entryValue, _index) => {
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

                {state.habits.map((_thing, _index) => (
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

                {!loggedIn && !state.habits.length &&
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
