'use client';
// components/TypeFilter/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context';

const TypeFilter: React.FC = () => {
  const { filterType, setFilterType, pokemonList, setPokemonList } = useAppContext();
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=100');
        const data = response.data.results;
        setPokemonList(data);

        // Extraire dynamiquement les types uniques de la liste des Pokémon
        const types: string[] = [];
        for (const pokemon of data) {
          const pokemonDetails = await axios.get(pokemon.url);
          types.push(...pokemonDetails.data.types.map((type: any) => type.type.name));
        }
        setUniqueTypes([...new Set(types)]);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };


    fetchPokemonData();
  }, [setPokemonList]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  return (
    <div>
      <label htmlFor="typeFilter">Filter by type:</label>
      <select id="typeFilter" value={filterType || ''} onChange={handleTypeChange}>
        <option value="">All types</option>
        {/* Ajouter des options pour chaque type de Pokémon */}
        {uniqueTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;