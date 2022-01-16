import React, { useReducer } from 'react'

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);
        //console.log("action>>", actions)
        console.log("$$$$$dispatch", dispatch)
        const boundActions = {};
        console.log('boundAction..........', boundActions)
        for (let key in actions) {
            console.log('////key//', key)
            boundActions[key] = actions[key](dispatch);
        }
        console.log("...dispatch.....", dispatch);
        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    }

    return { Context, Provider };
};