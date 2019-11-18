import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { menu } from 'ionicons/icons';
import React, { useContext } from 'react';
import { AppContext } from 'utils/State';

export const Stats = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Stats</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ListItems />
      </IonContent>
    </IonPage>
  );
};

const ListItems = () => {
  const { state, dispatch } = useContext(AppContext);
  const items = state.habits.map((h, i) => {
    return (
      <IonItem key={i}>
        <IonIcon icon={menu} slot="start" />
        {h}
        <div className="item-note" slot="end">
        </div>
      </IonItem>
    );
  });

  return <IonList>{items}</IonList>;
};

