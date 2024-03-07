// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAppContext } from '../../context';
// import PokemonCard from '@/components/pokemonCard';

// useEffect(() => {
//     const fetchPokemonData = async () => {
//       try {
//         const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151');
//         const data = response.data.results;
        
//         setPokemonList(data);

//         const types: string[] = [];
//         for (const pokemon of data) {
//           const pokemonDetails = await axios.get(pokemon.url);
//           types.push(...pokemonDetails.data.types.map((type: any) => type.type.name));
//         }

//         setUniqueTypes([...new Set(types)]);
//       } catch (error) {
//         console.error('Error fetching Pokemon data:', error);
//       }
//     };

//     fetchPokemonData();
//   }
// const filteredPokemonList = pokemonList.filter(pokemon => {
//     return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//            String(pokemonList.findIndex(item => item.name === searchTerm.toLowerCase())) === searchTerm.toLowerCase();
//   });
