//page.tsx

'use client';
import Image from "next/image";

import React from 'react';
import PokemonList from '@/components/PokemonList';
import TypeFilter from '@/components/TypeFilter';
import Link from "next/link";

const Home: React.FC = () => {
  return (
    
    <div className="page">
       <Link href="/">
              <h1 className="Pokédex">Pokédex</h1>
            </Link>
      <TypeFilter />
      <PokemonList />
    </div>
  );
};

export default Home;

 

