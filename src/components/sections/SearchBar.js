import React, { useState } from "react";
import pokeball from "../../assets/images/pokeball.svg";

export default function SearchBar({ lookFor }) {
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        if (search.trim() !== "") {
            lookFor(search.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const clearSearch = () => {
        setSearch("");
    };

    return (
        <section className="container-searchbar">
            <article className="content-searchbar">
                <h1 className="inter-bold title-search">Which Pokémon do you want to catch?</h1>
                <div className="inline-inp-btn">
                    <input
                        type="text"
                        name="searchb"
                        id="searchb"
                        className="search-input"
                        placeholder="Ex: Pikachu..."
                        autoComplete="on"
                        value={search}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                    {search && (
                        <button className="btn-clear" onClick={clearSearch}>
                            <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                    <button className="btn-search" onClick={handleSearch}>
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </article>
            <article className="container-pokeball">
                <img src={pokeball} alt="Pokeball" className="pokeball" />
            </article>
        </section>
    );
}
