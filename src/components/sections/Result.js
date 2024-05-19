import React, { useState } from 'react';
import Loader from "../pages/Loader";

export default function Result({ name, avatar, weight, height, types, abilities, stats }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const convertWeight = (weight) => {
        return (weight * 0.1).toFixed(2);
    };

    const convertHeight = (height) => {
        return (height * 0.1).toFixed(2);
    };

    const colorChange = (valor) => {
        if (valor <= 49) return "red";
        if (valor >= 50 && valor <= 79) return "yellow";
        return "green";
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <>
            <section className="content-poke">
                <article className="box1-poke">
                    <div className="poke-name">
                        <h1 className="inter-bold name-poke">{capitalizeFirstLetter(name)}</h1>
                        <span className="inter-medium values-rectangle">{capitalizeFirstLetter(types[0].type.name)}</span>
                        <span className="inter-medium values-rectangle" style={{ visibility: !types[1] ? 'hidden' : 'visible' }}>
                            {!types[1] ? "Nada" : capitalizeFirstLetter(types[1].type.name)}
                        </span>
                    </div>
                    <div className="physical">
                        <div>
                            <h3 className="inter-bold">Height:</h3>
                            <div>
                                <span className="inter-medium values-rectangle">{convertWeight(weight)} m</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="inter-bold">Weight:</h3>
                            <span className="inter-medium values-rectangle">{convertHeight(height)} kg</span>
                        </div>
                    </div>
                    <div className="group-habilities">
                        <h3 className="inter-bold">Habilities:</h3>
                        <div className="habilities">
                            <span className="inter-medium values-rectangle">{capitalizeFirstLetter(abilities[0].ability.name)}</span>
                            <span className="inter-medium values-rectangle" style={{ visibility: !abilities[1] ? 'hidden' : 'visible' }}>
                                {!abilities[1] ? "Nada" : capitalizeFirstLetter(abilities[1].ability.name)}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h3 className="inter-bold">Stats:</h3>
                        <div className="first-row-stats">
                            <div className="power">
                                <span className={`inter-medium values-round ${colorChange(stats[0].base_stat)}`}>{stats[0].base_stat}</span>
                                <h4 className="inter-bold">HP</h4>
                            </div>
                            <div className="power">
                                <span className={`inter-medium values-round ${colorChange(stats[1].base_stat)}`}>{stats[1].base_stat}</span>
                                <h4 className="inter-bold">Attack</h4>
                            </div>
                            <div className="power">
                                <span className={`inter-medium values-round ${colorChange(stats[2].base_stat)}`}>{stats[2].base_stat}</span>
                                <h4 className="inter-bold">Defense</h4>
                            </div>
                        </div>
                        <div className="second-row-stats">
                            <div className="power">
                                <span className={`inter-medium values-round ${colorChange(stats[3].base_stat)}`}>{stats[3].base_stat}</span>
                                <h4 className="inter-bold">Special Attack</h4>
                            </div>
                            <div className="power">
                                <span className={`inter-medium values-round ${colorChange(stats[4].base_stat)}`}>{stats[4].base_stat}</span>
                                <h4 className="inter-bold">Special Defense</h4>
                            </div>
                            <div className="power">
                                <span className={`inter-medium values-round ${colorChange(stats[5].base_stat)}`}>{stats[5].base_stat}</span>
                                <h4 className="inter-bold">Speed</h4>
                            </div>
                        </div>
                    </div>
                </article>
                <article className="box2-poke">
                    <div className="pokemon-image-container">
                        {!imageLoaded && <Loader />} {/* Show loader while image is loading */}
                        <img
                            src={avatar}
                            alt={name}
                            className={`pokemon-image ${imageLoaded ? 'loaded' : ''}`}
                            onLoad={handleImageLoad} // Handle image load event
                        />
                    </div>
                </article>
            </section>
        </>
    );
}
