import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import Pagination from "../layout/Pagination";
import Loading from "../layout/Loading";

export default function PokemonList() {

    const [pokemon, setPokemon] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();

    useEffect(() => {
        let cancel
        axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setNextPageUrl(res.data.next);
            setPrevPageUrl(res.data.previous);
            setPokemon(res.data.results);
        })

        return () => cancel()
    }, [currentPageUrl])

    function gotoNextPage() {
        setCurrentPageUrl(nextPageUrl)
    }

    function gotoPrevPage() {
        setCurrentPageUrl(prevPageUrl)
    }

    return (
        <React.Fragment>
            {pokemon ? (<div className="row">
                {pokemon.map(pokemon_data => (
                    <PokemonCard
                        key={pokemon_data.name}
                        pokemon={pokemon_data}/>
                ))}
            </div>) : (<Loading />)}

            <Pagination
                gotoNextPage={nextPageUrl ? gotoNextPage : null}
                gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
            />
        </React.Fragment>
    );
}
