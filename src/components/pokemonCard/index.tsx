"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface PokemonCardProps {
  name: string;
  types: string[]; 
}

interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[]; 
  sprites: { front_default: string };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, types }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const [shinySprite, setShinySprite] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = response.data;

        setPokemonDetails({
          id: data.id,
          name: data.name,
          types: data.types,
          sprites: data.sprites,
        });

        // Récupérer le sprite shiny du Pokémon depuis l'API
        const shinyResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/shiny`);
        const shinyData = shinyResponse.data;
        setShinySprite(shinyData.sprites.front_default);
      } catch (error) {
        console.error(`Error fetching details for ${name}:`, error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  // Objet associant chaque type de Pokémon à son URL d'image correspondante
  const typeImages: Record<string, string> = {
    normal: 'types/Normal.png',
    fire: 'types/Fire.png',
    water: 'types/Water.png',
    electric: 'types/Electric.png',
    grass: 'types/Grass.webp',
    ice: 'types/Ice.webp',
    fighting: 'types/Fighting.png',
    poison: 'types/Poison.png',
    ground: 'types/Ground.png',
    flying: 'types/Flying.png',
    psychic: 'types/Psy.png',
    bug: 'types/Bug.png',
    rock: 'types/Rock.png',
    ghost: 'types/Ghost.webp',
    dragon: 'types/Dragon.webp',
    dark: 'types/Dark.png',
    steel: 'types/Steel.webp',
    fairy: 'types/Fairy.png',
  };
  
  return (
    <Link href={`/pokemon/${name}`}>

    <div 
      className="pokemon-card" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {pokemonDetails && (
        <>
          <p className="pokemon-name">{pokemonDetails.name}</p>
          <img
            className="pokemon-image" 
            src={isHovered && shinySprite ? shinySprite : pokemonDetails.sprites.front_default} 
            alt={`${name} sprite`} 
          />
          <div className='pokemon-types'>
            {pokemonDetails.types.map((type, index) => (
              <div key={index} className={`pokemon-type ${type.type.name}`}>
                <img
                  className="img-type" 
                  src={typeImages[type.type.name]} 
                  alt={`${type.type.name} type`} 
                />
                <p>{type.type.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </Link>

  );
};

export default PokemonCard;
