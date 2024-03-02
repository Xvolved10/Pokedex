// components/context/index.tsx
// annyeong haseo
'use client';
import { createContext, useContext, ReactNode, useState } from 'react';

interface AppContextProps {
  pokemonList: any[]; 
  setPokemonList: React.Dispatch<React.SetStateAction<any[]>>;
  filterType: string | null;
  setFilterType: React.Dispatch<React.SetStateAction<string | null>>;
}
// gamsahamnida
const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}
// kkakk-a juseyo 
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<any[]>([]); 
  const [filterType, setFilterType] = useState<string | null>(null);

  const contextValue: AppContextProps = {
    pokemonList,
    setPokemonList,
    filterType,
    setFilterType,
  };
// eolmayeyo
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// 안녕히 계세요