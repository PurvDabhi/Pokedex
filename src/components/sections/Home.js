import React from 'react';
import { Link } from 'react-router-dom';
import pikachu from '../../assets/images/poke.svg';
import logout from '../../assets/images/logout.svg';
import trainer from '../../assets/images/trainers.svg';

export default function Home() {
    return (
        <>
            <section className="content-home">
                <article className="box1-home">
                    <h2 className="inter-bold">Let's catch them all!</h2>
                    <p className="inter-medium p-welcome">
                        Pokémon is a media franchise that originally started out as an RPG video game, but due to its popularity has managed to expand to other media entertainment such as TV series, movies, card games, clothes, among others, becoming a brand that is recognized in the world market.
                    </p>
                    <Link to="/search" className="inter-bold btn-home">
                        <span>Catch Pokemon’s</span>
                        <svg className="w-6 h-6" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </Link>
                </article>
                <article>
                    <div className="box2-home">
                        <img src={pikachu} alt="Hi Pikachu" />
                    </div>
                    <Link to="/trainer" className="trainer">
                        <img src={trainer} alt="trainer" />
                    </Link>
                    <div>
                        <Link to="/" className="logout">
                            <img src={logout} alt="logout" />
                        </Link>
                    </div>
                </article>
            </section>
        </>
    );
}
