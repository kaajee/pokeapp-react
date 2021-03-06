import React, {Component} from 'react';
import PokeApiLogo from "../../assets/pokeapi_256.png";

export default  class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <footer className="footer mt-4 pt-2 pb-2">
                    <div className="container">
                        <div>
                            Data From{' '}
                            <a href="https://pokeapi.co/" target="_blank" title="PokeApi" rel="noreferrer"
                               className="text-reset">
                                <img src={PokeApiLogo} alt="PokeApi.Co" width="63" height="25"/>
                            </a>
                        </div>
                        <div>Icons made by <a
                            href="https://www.flaticon.com/authors/roundicons-freebies" target="_blank"
                            title="Roundicons Freebies" rel="noreferrer" className="text-reset">Roundicons
                            Freebies</a> from <a href="https://www.flaticon.com/" target="_blank" title="Flaticon"
                                                 rel="noreferrer" className="text-reset">flaticon</a>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}
