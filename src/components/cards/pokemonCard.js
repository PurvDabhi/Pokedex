import React, { useEffect, useState } from 'react';

export default function PokemonCard({ number, name }) {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            setPokemonData(data);
        };

        fetchPokemon();
    }, [name]);

    const handleCardClick = () => {
        window.location.href = `/pokemon/${name}`;
    };

    return (
        <article className="content-card" onClick={handleCardClick}>
            {pokemonData ? (
                <div>
                    <img src={pokemonData.sprites.front_default} alt={name} className="img-card" />
                    <div className="inf-card">
                        <h2 className="inter-bold name-card">{name}</h2>
                        <h3 className="inter-medium number-card">#{number}</h3>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </article>
    );
}
