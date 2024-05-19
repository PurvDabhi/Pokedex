import React, { useState, useEffect } from 'react';
import Result from "../sections/Result";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Loader from "./Loader";
import Message from "./Message";
import "./Pokemon.css"; // Import CSS for Pokemon component

export default function Pokemon() {
    const { pokemon } = useParams();

    const pokeApi = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const { data, error } = useFetch(pokeApi);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(error?.err.err);
    const [evolutionChain, setEvolutionChain] = useState(null);

    useEffect(() => {
        setLoading(true);

        if (data) {
            setLoading(false);
        }

        if (error?.err.err) {
            setLoading(false);
            setErr(true);
        }
    }, [data, error]);

    useEffect(() => {
        const fetchEvolutionChain = async () => {
            if (data && data.species && data.species.url) {
                try {
                    const response = await fetch(data.species.url);
                    if (!response.ok) {
                        throw new Error('Failed to fetch evolution chain');
                    }
                    const speciesData = await response.json();
                    const evolutionChainUrl = speciesData.evolution_chain.url;
                    const evolutionChainResponse = await fetch(evolutionChainUrl);
                    if (!evolutionChainResponse.ok) {
                        throw new Error('Failed to fetch evolution chain data');
                    }
                    const evolutionChainData = await evolutionChainResponse.json();
                    setEvolutionChain(evolutionChainData);
                } catch (error) {
                    console.error('Error fetching evolution chain:', error);
                }
            }
        };

        fetchEvolutionChain();
    }, [data]);

    return (
        <section className="container">
            {loading && <Loader />}
            {err && <Message msg={`Error ${error?.err.status} ${error?.err.statusText}`} bgColor="#dc3545" />}

            {data && (
                <>
                    <Result
                        name={data.name}
                        avatar={data.sprites.other.dream_world.front_default}
                        weight={data.weight}
                        height={data.height}
                        types={data.types}
                        abilities={data.abilities}
                        stats={data.stats}
                    />
                    <div className="pokemon-images">
                        {Object.keys(data.sprites).map((key, index) => {
                            if (data.sprites[key] && typeof data.sprites[key] === "string") {
                                return (
                                    <img key={index} src={data.sprites[key]} alt={`${data.name}-${key}`} />
                                );
                            }
                            return null;
                        })}
                    </div>
                    {evolutionChain && (
                        <div className="evolution-chain">
                            <h2>Evolution Chain</h2>
                            <div className="chain-container">
                                {renderEvolutionChain(evolutionChain.chain)}
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

function renderEvolutionChain(chain) {
    return (
        <div className="evolution-chain">
            {renderChain(chain)}
        </div>
    );
}

function renderChain(chain) {
    const pokemonId = getPokemonIdFromUrl(chain.species.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    return (
        <React.Fragment key={chain.species.name}>
            <div className="pokemon-container">
                <img src={imageUrl} alt={chain.species.name} />
                {chain.evolves_to.length > 0 && (
                    <div className="arrow"></div>
                )}
            </div>
            {chain.evolves_to.map((child) => renderChain(child))}
        </React.Fragment>
    );
}

function getPokemonIdFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
}
