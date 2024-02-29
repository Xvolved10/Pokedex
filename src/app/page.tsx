//page.tsx

'use client';
import Image from "next/image";

import React from 'react';
import PokemonList from '@/components/PokemonList';
import TypeFilter from '@/components/TypeFilter';

const Home: React.FC = () => {
  return (
    <div>
      <div className="Pokedex-card">  
       <h1 className="Pokédex">Pokédex</h1>
      </div>
      <TypeFilter />
      <PokemonList />
    </div>
  );
};

export default Home;

 

