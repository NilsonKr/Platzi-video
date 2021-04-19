import React from 'react';

const Context = React.createContext(null);

const ContextProvider = props => {
	return <Context.Provider value={{ hola: 'Hola' }}>{props.children}</Context.Provider>;
};

export default ContextProvider;
