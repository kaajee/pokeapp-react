import React, {Component} from 'react';
import PokeApiLogo from "../pokemon/pokeapi_256.png";

export default  class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <footer className="footer">
                    <div className="container">
                        {/*<span className="text-muted">Place sticky footer content here.</span>*/}
                        <div>
                            Data From{' '}
                            <a href="https://pokeapi.co/" target="_blank" title="PokeApi" rel="noopener" className="text-reset">
                                <img src={PokeApiLogo} alt="PokeApi.Co" width="63" height="25"/>
                            </a>
                        </div>
                        <div>Icons made by <a
                            href="https://www.flaticon.com/authors/roundicons-freebies" target="_blank" title="Roundicons Freebies" rel="noopener" className="text-reset">Roundicons
                            Freebies</a> from <a href="https://www.flaticon.com/" target="_blank" title="Flaticon" rel="noopener" className="text-reset">flaticon</a>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}
