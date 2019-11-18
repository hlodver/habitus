import React, { createContext, useReducer, useEffect } from 'react';

let AppContext = createContext();


// Initial state and the persistest state from local Storage
const initialState = { habits: [] };
const persistedState = JSON.parse(window.localStorage.getItem('persistedState') || '{}');


export const HABIT_ACTIONS = {
    ADD_HABIT: 'ADD_HABIT',
    EDIT_HABIT: 'EDIT_HABIT',
    DELETE_HABIT: 'DELETE_HABIT'
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


// The reducer
let reducer = (state, action) => {
    switch (action.type) {
        case HABIT_ACTIONS.ADD_HABIT: {
            return { ...state, habits: [...state.habits, action.data] };
        }
        case HABIT_ACTIONS.DELETE_HABIT: {
            return {
                ...state,
                habits: [
                    ...state.habits.slice(0, action.index),
                    ...state.habits.slice(action.index + 1)
                ]
            };
        }
        case HABIT_ACTIONS.EDIT_HABIT: {
            return {
                ...state,
                habits: [
                    ...state.habits.slice(0, action.index),
                    action.data,
                    ...state.habits.slice(action.index + 1)
                ]
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
