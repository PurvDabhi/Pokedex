import React, { useState, useEffect } from 'react';
import SearchBar from "../sections/SearchBar";
import PokeCard from "../cards/pokemonCard";
import Loader from "./Loader";
import { useFetch } from '../../hooks/useFetch';

export default function Search() {
    const [pokeApi, setPokeApi] = useState("https://pokeapi.co/api/v2/pokemon/");
    const { data, isPending } = useFetch(pokeApi);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        if (data) {
            const getPokemons = async () => {
                const promises = data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    const json = await res.json();
                    return {
                        id: json.id,
                        name: json.name,
                        avatar: json.sprites.other.dream_world.front_default
                    };
                });
                const pokemonData = await Promise.all(promises);
                setPokemons(pokemonData);
            };

            getPokemons();
        }
    }, [data]);

    const handleLinks = (e, url) => {
        e.preventDefault();
        setPokemons([]);
        setPokeApi(url);
    };

    const handleSearch = async (search) => {
        if (search) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
                if (!response.ok) {
                    throw new Error('Pokémon not found');
                }
                const pokemonData = await response.json();
                setPokemons([{
                    id: pokemonData.id,
                    name: pokemonData.name,
                    avatar: pokemonData.sprites.other.dream_world.front_default
                }]);
            } catch (error) {
                console.error(error);
                setPokemons([]);
            }
        } else {
            setPokemons([]);
        }
    };

    return (
        <section className="container search-cont">
            {isPending && <Loader />}
            <SearchBar lookFor={handleSearch} />
            <section className="container-card">
                {pokemons.length === 0 ? (
                    <Loader />
                ) : (
                    pokemons.map((pokemon, index) => (
                        <PokeCard key={index} number={pokemon.id} name={pokemon.name} avatar={pokemon.avatar} />
                    ))
                )}
            </section>
            <div className="btns-next-prev">
                <button onClick={(e) => handleLinks(e, data?.previous)} style={{ visibility: data?.previous ? 'visible' : 'hidden' }}>
                    <svg className="w-6 h-6" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    <span className="inter-medium">Previous</span>
                </button>
                <button onClick={(e) => handleLinks(e, data.next)} style={{ visibility: data?.next ? 'visible' : 'hidden' }}>
                    <span className="inter-medium">Next</span>
                    <svg className="w-6 h-6" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </section>
    );
}
