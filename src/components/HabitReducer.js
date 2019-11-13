import React from "react";

export const HabitReducer = () => {
  const reducer = (state, action) => {
    // debugger;
    switch (action.type) {
      case "ADD_THING": {
        return { ...state, things: [...state.things, action.data] };
      }
      case "DELETE_THING": {
        return {
          ...state,
          things: [
            ...state.things.slice(0, action.index),
            ...state.things.slice(action.index + 1)
          ]
        };
      }
      case "EDIT_THING": {
        return {
          ...state,
          things: [
            ...state.things.slice(0, action.index),
            action.data,
            ...state.things.slice(action.index + 1)
          ]
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = React.useReducer(reducer, {
    things: []
  });

  return {
    state,
    dispatch
  };
};

