// components/PokemonList/index.tsx
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context';
import PokemonCard from '../pokemonCard'; // Import PokemonCard

const PokemonList: React.FC = () => {
  const { pokemonList, setPokemonList, filterType } = useAppContext();
  const [filteredPokemonList, setFilteredPokemonList] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1025');
        const pokemonData = response.data.results.map((pokemon: any) => {
          const urlParts = pokemon.url.split('/');
          const id = urlParts[urlParts.length - 2]; // L'ID est l'avant-dernier élément de l'URL
          return { ...pokemon, id: parseInt(id) };
        });

        setPokemonList(pokemonData);
        setFilteredPokemonList(pokemonData); // Initialisation avec tous les Pokémon
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    // Call the function to load data on component mount
    fetchPokemonData();
  }, []);

  useEffect(() => {
    // Filtrer les Pokémon en fonction du type sélectionné
    if (filterType) {
      const filteredPokemon = pokemonList.filter((pokemon: any) =>
        pokemon.types.map((type: any) => type.type.name).includes(filterType)
      );
      setFilteredPokemonList(filteredPokemon);
    } else {
      setFilteredPokemonList(pokemonList);
    }
  }, [filterType, pokemonList]);

  return (
    <div className='pokemon-list'>
      {filteredPokemonList.map((pokemon: any) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} id={pokemon.id} />
      ))}
    </div>
  );
};

export default PokemonList;
