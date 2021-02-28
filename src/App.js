import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Header from "./components/layout/Header";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";
import Footer from "./components/layout/Footer";
import MyPokemon from "./components/pokemon/MyPokemon";
import MyPokemonDetail from "./components/pokemon/MyPokemonDetail";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <main role="main" className="container">
                    <Switch>
                        <Route exact path="/" component={Dashboard}/>
                        <Route exact path="/pokemon/:pokemonIndex" component={Pokemon}/>
                        <Route exact path="/my-pokemon" component={MyPokemon}/>
                        <Route exact path="/my-pokemon/:pokemonSlug" component={MyPokemonDetail}/>
                    </Switch>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
