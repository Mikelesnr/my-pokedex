import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { Pokemon } from '../types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  try {
    console.log(name)
    const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon: Pokemon = response.data;
    console.log(pokemon)
    const result = {
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      forms: pokemon.forms.map((form) => form.name),
      imageUrl: pokemon.sprites.other['official-artwork'].front_default,
      types: pokemon.types.map((type) => type.type.name),
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Pokemon not found. Please check the spelling or try another one.' }, { status: 500 });
  }
}
