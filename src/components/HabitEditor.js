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

/**
 * This component is used to edit or create a "thing"
 *
 * @param {*} param0
 */
export const EditHabit = ({ initValue, handleFormSubmit  }) => {
  // manage the Input
  const [inputValue, setInputValue] = useState();

  // we are using this to set the initial value of the
  // input field
  useEffect(() => {
    setInputValue(initValue.value || null);
  }, [initValue]);

  /**
   * this is called when the user clicks either the save or cancel
   * button, on Save we return the string the user entered in the
   * input field, on cancek we dont return anything
   * @param {*} _save
   */
  const handleClick = _save => {
    handleFormSubmit({ isVisible: false, value: _save && inputValue });
  };
  return (
    <IonModal isOpen={initValue && initValue.isVisible}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{!initValue.value ? 'Add' : 'Edit'} the Habit</IonCardTitle>
          <IonCardSubtitle>
            What habit would you like to add?
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
          <IonButton onClick={() => handleClick(true)}>Save</IonButton>
          <IonButton onClick={() => handleClick(null)}>Cancel</IonButton>
        </IonCardContent>
      </IonCard>
    </IonModal>
  );
};
