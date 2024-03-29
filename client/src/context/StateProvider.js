import { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

//wrap the app and provide the data layer

export const StateProvider = ({reducer,initialState,children})=>(
  <StateContext.Provider value = {useReducer(reducer,initialState)}>
    {children}
  </StateContext.Provider>
)

//pull the info from the data layer

export const useStateValue = ()=>useContext(StateContext)