import { Accessor, Setter, createContext, useContext, createSignal } from "solid-js";


const GlobalContext = createContext();

export function GlobalContextProvider(props) {
    
    const [store, setStore] = createSignal({route: 'Home', domain: undefined, userAddress: undefined, userPrimary: undefined, isDomainOwner: undefined, isProfileOwner: undefined });
    
    return (
      <GlobalContext.Provider value={{ store, setStore }}>
        {props.children}
      </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);