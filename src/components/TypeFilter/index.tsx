import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context";
import PokemonCard from "@/components/pokemonCard";

const TypeFilter: React.FC = () => {
  const { filterType, setFilterType, pokemonList, setPokemonList } =
    useAppContext();
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?limit=151"
        );
        const data = response.data.results;

        setPokemonList(data);

        const types: string[] = [];
        for (const pokemon of data) {
          const pokemonDetails = await axios.get(pokemon.url);
          types.push(
            ...pokemonDetails.data.types.map((type: any) => type.type.name)
          );
        }

        setUniqueTypes([...new Set(types)]);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, [setPokemonList]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // const filteredPokemonList = pokemonList.filter(pokemon => {
  //   return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //          String(pokemonList.findIndex(item => item.name === searchTerm.toLowerCase())) === searchTerm.toLowerCase();
  // });

  return (
    <div className="typeFilter">
      <label htmlFor="typeFilter">Filtrer par type:</label>
      <select
        id="typeFilter"
        value={filterType || ""}
        onChange={handleTypeChange}
      >
        <option value="">All types</option>
        {uniqueTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {/* <label htmlFor="pokemonSearch">Rechercher un Pokémon:</label>
      <input type="text" id="pokemonSearch" value={searchTerm} onChange={handleSearchTermChange} />
      {filteredPokemonList.map(pokemon => (
        <PokemonCard key={pokemon.name} name={pokemon.name} types={[]} />
      ))} */}
    </div>
  );
};

export default TypeFilter;
