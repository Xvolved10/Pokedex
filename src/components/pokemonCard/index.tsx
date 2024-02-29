import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PokemonCardProps {
  name: string;
  id: number;
}

interface PokemonDetails {
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return (
      <div className="pokemon-card">
        <p className="pokemon-name">{name}</p>
        <p className="pokemon-id">Numéro: {id}</p>
        {pokemonDetails && (
          <div className="pokemon-details">
            {/* Utilisez une classe dynamique en fonction du type */}
            <p className={`pokemon-type ${pokemonDetails.types[0].type.name}`}>{pokemonDetails.types.map(type => type.type.name).join(' / ')}</p>
            <img className="pokemon-sprite" src={pokemonDetails.sprites.front_default} alt={`${name} sprite`} />
          </div>
        )}
      </div>
  );
};

export default PokemonCard;
