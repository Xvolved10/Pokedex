import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useAppContext } from '../../context';
import PokemonCard from '../pokemonCard';

const PokemonList: React.FC = () => {
  const { pokemonList, setPokemonList, filterType } = useAppContext();
  const [pokemonDetails, setPokemonDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151');
        const data = response.data.results;

        setPokemonList(data);

        const detailsPromises = data.map(async (pokemon: any) => {
          const detailsResponse = await axios.get(pokemon.url);
          return detailsResponse.data;
        });

        const detailsResults = await Promise.all(detailsPromises);
        setPokemonDetails(detailsResults);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, [setPokemonList]);

  return (
    <div className="pokemon-list">
      {pokemonDetails.map((pokemon: any) => {
        const pokemonTypes = pokemon.types.map((type: any) => type.type.name);

        const isFiltered = !filterType || pokemonTypes.includes(filterType);

        if (isFiltered) {
          return <PokemonCard key={pokemon.name} name={pokemon.name} types={pokemonTypes}  />;
        }

        return null; 
      })}
    </div>
  );
};

export default PokemonList;







