"use client";

import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList: React.FC = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allPokemonNames, setAllPokemonNames] = useState<string[]>([]);
  const [pokemon, setPokemon] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch Pokémon names
  const fetchPokemonNames = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      const data = await response.json();
      const names = data.results.map((result: any) => result.name);
      setAllPokemonNames(names);
    } catch (error) {
      console.error("Failed to fetch Pokémon names:", error);
    }
  };

  useEffect(() => {
    fetchPokemonNames(); // Fetch Pokémon names when the component mounts
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/pokemon?name=${pokemonName}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const result = await response.json();
      setPokemon(result);
      setError(null); // Clear error message if search is successful
    } catch (error: any) {
      setError(error.message); // Display error message
      setPokemon(null); // Clear previous result if search fails
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPokemonName(value);
    if (value) {
      const filteredSuggestions = allPokemonNames.filter((name) => 
        name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
      <div className="flex items-center mb-4">
        <input 
          type="text" 
          value={pokemonName}
          onChange={handleInputChange}
          className="flex-grow p-2 border border-gray-300 rounded-l-md text-gray-800"
          placeholder="Enter Pokemon Name"
        />
        <button 
          onClick={handleSearch}
          className="p-2 bg-blue-600 text-white rounded-r-md"
        >
          Search
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {suggestions.length > 0 && pokemonName && (
        <ul className="bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto shadow-md z-10">
          {suggestions.map((suggestion) => (
            <li 
              key={suggestion} 
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black"
              onClick={() => setPokemonName(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default PokemonList;
