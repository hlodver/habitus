import React, { createContext, useReducer, useEffect } from 'react';
import { equalDates, markedToday } from 'utils/dateStuff';
import { getStateFromLocalStorage } from 'utils/stateParser';

let AppContext = createContext();

// Initial state and the persistest state from local Storage
const initialState = {
    habits: [],
    modal: { visible: false, index: null },
    errorModal: { visible: false, message: '' }
};
//const persistedState = getStateFromLocalStorage();
const persistedState = {};

export const HABIT_ACTIONS = {
    ADD_HABIT: 'ADD_HABIT',
    EDIT_HABIT: 'EDIT_HABIT',
    DELETE_HABIT: 'DELETE_HABIT',
    MARK_HABIT: 'MARK_HABIT',
    UNMARK_HABIT: 'UNMARK_HABIT',
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

export const markHabit = (payload) => ({
    type: HABIT_ACTIONS.MARK_HABIT,
    payload
});

export const unMarkHabit = (payload) => ({
    type: HABIT_ACTIONS.UNMARK_HABIT,
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

const initHabit = {
    label: '',
    marked: []
};

// The reducer
let reducer = (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case HABIT_ACTIONS.ADD_HABIT: {
            const { label } = payload;
            // todo: Check if habit with same label already exists.
            return {
                ...state,
                habits: [
                    ...state.habits,
                    {
                        ...initHabit,
                        label: label
                    }
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
            const { label, index } = payload;
            return {
                ...state,
                habits: [
                    ...state.habits.slice(0, index),
                    {
                        ...state.habits[index],
                        label: label
                    },
                    ...state.habits.slice(index + 1)
                ]
            };
        }
        case HABIT_ACTIONS.MARK_HABIT: {
            const { index } = payload;
            const newHabit = { ...state.habits[index] };
            if (!markedToday(newHabit.marked)){
                newHabit.marked = [
                    ...newHabit.marked,
                    new Date()
                ]
                // Don't add the timestamp. Already there for this day.
            }
            return {
                ...state,
                habits: [
                    ...state.habits.slice(0, index),
                    newHabit,
                    ...state.habits.slice(index + 1)
                ]
            };
        }
        case HABIT_ACTIONS.UNMARK_HABIT: {
            const { index } = payload;
            const newHabit = { ...state.habits[index] };
            const d1 = new Date();

            if (markedToday(newHabit.marked)){
                newHabit.marked = newHabit.marked.filter(d2 => (!equalDates(d1,d2)));
            }
            return {
                ...state,
                habits: [
                    ...state.habits.slice(0, index),
                    newHabit,
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
