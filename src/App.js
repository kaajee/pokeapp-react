import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";
import Footer from "./components/layout/Footer";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <main role="main" className="container">
                    <Switch>
                        <Route exact path="/" component={Dashboard}/>
                        <Route exact path="/pokemon/:pokemonIndex" component={Pokemon}/>
                    </Switch>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
