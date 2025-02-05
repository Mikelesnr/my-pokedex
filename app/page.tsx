import React from 'react';
import PokemonList from './components/PokemonList';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Pokedex</h1>
      <PokemonList />
      <footer className="mt-8 text-gray-600">
        Built with Next.js and Tailwind CSS
      </footer>
    </div>
  );
}
