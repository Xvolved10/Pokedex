// components/PokemonList/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios'; //est utilisé pour effectuer des requêtes HTTP afin de récupérer des données depuis l'API Pokemon
import { useAppContext } from '../../context';
import PokemonCard from '../pokemonCard';

const PokemonList: React.FC = () => {
  const { pokemonList, setPokemonList, filterType } = useAppContext();
  const [pokemonDetails, setPokemonDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=100');
        const data = response.data.results;

        // Met à jour la liste des Pokémon dans le contexte
        setPokemonList(data);

        // Récupérez les détails pour chaque Pokémon de manière asynchrone
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

    // Appelez la fonction pour charger les données au montage du composant
    fetchPokemonData();
  }, [setPokemonList]);

  return (
    <div className="pokemon-list">
      {pokemonDetails.map((pokemon: any) => {
        // Obtenez la liste des types sous forme de tableau de chaînes
        const pokemonTypes = pokemon.types.map((type: any) => type.type.name);

        // Vérifiez si le filtre par type est actif, et si c'est le cas, vérifiez si le type est inclus dans les types du Pokémon
        const isFiltered = !filterType || pokemonTypes.includes(filterType);

        // Affichez la carte Pokemon uniquement si elle correspond au filtre
        if (isFiltered) {
          return <PokemonCard key={pokemon.name} name={pokemon.name} types={pokemonTypes} />;
        }

        return null; // Si le Pokémon ne correspond pas au filtre, retournez null comme toi Maxime
      })}
    </div>
  );
};

export default PokemonList;







