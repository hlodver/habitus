import React, { createContext, useReducer, useEffect } from 'react';

let AppContext = createContext();

// Initial state and the persistest state from local Storage
const initialState = {
    habits: [],
    modal: { visible: false, index: null },
    errorModal: { visible: false, message: '' }
};
const persistedState = JSON.parse(window.localStorage.getItem('persistedState') || '{}');

export const HABIT_ACTIONS = {
    ADD_HABIT: 'ADD_HABIT',
    EDIT_HABIT: 'EDIT_HABIT',
    DELETE_HABIT: 'DELETE_HABIT',
    SHOW_HABIT_MODAL: 'SHOW_HABIT_MODAL',
    HIDE_HABIT_MODAL: 'HIDE_HABIT_MODAL',
    SHOW_ERROR_MODAL: 'SHOW_ERROR_MODAL',
    HIDE_ERROR_MODAL: 'HIDE_ERROR_MODAL'
};

// Logging for easier debug
const logger = (reducer) => {
    const reducerWithLogger = (state, action) => {
        console.log('%cPrevious State:', 'color: #9E9E9E; font-weight: 700;', state);
        console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
        console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', reducer(state, action));
        return reducer(state, action);
    };
    return reducerWithLogger;
};

// Actions
export const addNewHabit = (payload) => ({
    type: HABIT_ACTIONS.ADD_HABIT,
    payload
});

export const deleteHabit = (payload) => ({
    type: HABIT_ACTIONS.DELETE_HABIT,
    payload
});

export const editHabit = (payload) => ({
    type: HABIT_ACTIONS.EDIT_HABIT,
    payload
});

export const showHabitModal = (payload) => ({
    type: HABIT_ACTIONS.SHOW_HABIT_MODAL,
    payload
});

export const hideHabitModal = (payload) => ({
    type: HABIT_ACTIONS.HIDE_HABIT_MODAL,
    payload
});

export const showErrorModal = (payload) => ({
    type: HABIT_ACTIONS.SHOW_ERROR_MODAL,
    payload
});

export const hideErrorModal = (payload) => ({
    type: HABIT_ACTIONS.HIDE_ERROR_MODAL,
    payload
});

// The reducer
let reducer = (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case HABIT_ACTIONS.ADD_HABIT: {
            const { habit } = payload;
            return {
                ...state,
                habits: [
                    ...state.habits,
                    habit
                ]
            };
        }
        case HABIT_ACTIONS.DELETE_HABIT: {
            const { index } = payload;
            return {
                ...state,
                habits: [
                    ...state.habits.slice(0, index),
                    ...state.habits.slice(index + 1)
                ]
            };
        }
        case HABIT_ACTIONS.EDIT_HABIT: {
            const { habit, index } = payload;
            return {
                ...state,
                habits: [
                    ...state.habits.slice(0, index),
                    habit,
                    ...state.habits.slice(index + 1)
                ]
            };
        }
        case HABIT_ACTIONS.SHOW_HABIT_MODAL: {
            const { index } = payload;
            // precautionary check
            return {
                ...state,
                modal: {
                    visible: true,
                    ...(index < state.habits.length) && { index }
                }
            };
        }
        case HABIT_ACTIONS.HIDE_HABIT_MODAL: {
            return {
                ...state,
                modal: { ...initialState.modal }
            };
        }
        case HABIT_ACTIONS.SHOW_ERROR_MODAL: {
            const { message } = payload;
            // precautionary check
            return {
                ...state,
                errorModal: {
                    visible: true,
                    message: message
                }
            };
        }
        case HABIT_ACTIONS.HIDE_ERROR_MODAL: {
            return {
                ...state,
                errorModal: {
                    ...initialState.errorModal
                }
            };
        }
        default: {
            return state;
        }
    }
};

const loggerReducer = logger(reducer);

function AppContextProvider (props) {
    const fullInitialState = {
        ...initialState,
        ...persistedState
    };

    let [state, dispatch] = useReducer(loggerReducer, fullInitialState);
    let value = { state, dispatch };

    // Runs every time the state is updated
    useEffect(() => {
        // Persist any state we want to
        window.localStorage['persistedState'] = JSON.stringify({
            ...state
        });
    }, [state]);

    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
}

const AppContextConsumer = AppContext.Consumer;

// Export it all
export { AppContext, AppContextConsumer, AppContextProvider };
