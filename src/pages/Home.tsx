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
  IonTitle,
  IonToolbar
  } from '@ionic/react';
import { book, build, colorFill, grid } from 'ionicons/icons';
import React from 'react';
import './Home.css';

const HomePage: React.FC = () => {
  const loggedIn = false;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Habitus</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!loggedIn &&
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
              <IonIcon slot="start" color="medium" icon={book} />
              <IonLabel>Ionic Documentation</IonLabel>
            </IonItem>
            <IonItem href="https://ionicframework.com/docs/building/scaffolding" target="_blank">
              <IonIcon slot="start" color="medium" icon={build} />
              <IonLabel>Scaffold Out Your App</IonLabel>
            </IonItem>
            <IonItem href="https://ionicframework.com/docs/layout/structure" target="_blank">
              <IonIcon slot="start" color="medium" icon={grid} />
              <IonLabel>Change Your App Layout</IonLabel>
            </IonItem>
            <IonItem href="https://ionicframework.com/docs/theming/basics" target="_blank">
              <IonIcon slot="start" color="medium" icon={colorFill} />
              <IonLabel>Theme Your App</IonLabel>
            </IonItem>
          </IonList>
        }

      </IonContent>
    </IonPage>
  );
};

export default HomePage;
