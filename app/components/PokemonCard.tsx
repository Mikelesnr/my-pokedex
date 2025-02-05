import React from 'react';

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  forms: string[];
  imageUrl: string;
  types: string[];
}

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 text-gray-800">
      <h2 className="text-2xl font-bold text-center mb-4">{pokemon.name}</h2>
      <img src={pokemon.imageUrl} alt={pokemon.name} className="w-32 h-32 mx-auto mb-4" />
      <div className="text-center">
        <p className="text-lg">Height: {pokemon.height}</p>
        <p className="text-lg">Weight: {pokemon.weight}</p>
        <p className="text-lg">Abilities: {pokemon.abilities.join(', ')}</p>
        <p className="text-lg">Types: {pokemon.types.join(', ')}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
