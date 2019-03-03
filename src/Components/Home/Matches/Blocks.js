import React, { Component } from 'react';
import {Matches} from '../../../firebase';
import {firebaseLooper} from '../../UI/misc';
import MatchBlock from '../../UI/match_block';
import Slide from 'react-reveal/Slide';

class Blocks extends Component {

    state = {
        matches: []
    }

    componentDidMount() {
        Matches
            .limitToLast(6)
            .once('value')
            .then(snapshot => {
                const matches = firebaseLooper(snapshot).reverse();

                this.setState({matches});
            })
    }

    showMatches = () => (
        this.state.matches.map(match => (
            <Slide key={match.id} bottom>
                <div className="item">
                    <div className="wrapper">
                        <MatchBlock match={match}/>
                    </div>
                </div>
            </Slide>
        ))
    )

    render() {
        return (
            <div className="home_matches">
                {this.showMatches()}
            </div>
        );
    }
}

export default Blocks;