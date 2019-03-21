import React, { Component } from 'react';

import {Matches} from '../../firebase';
import {firebaseLooper} from '../UI/misc';

import LeagueTable from './table';
import MatchesList from './MatchesList';

class TheMatches extends Component {

    state = {
        loading: true,
        matches: [],
        filterMatches: [],
        playedFilter: 'All',
        resultFilter: 'All'
    }

    componentDidMount(){
        Matches
            .once('value')
            .then(snapshot => {
                const matches = firebaseLooper(snapshot).reverse();

                this.setState({
                    loading: false,
                    filterMatches: matches,
                    matches
                })
            })
    }

    showPlayed = (played) => {
        const list = played === 'All' ? this.state.matches : this.state.matches.filter(match => match.final === played);

        this.setState({
            filterMatches: list,
            playedFilter: played,
            resultFilter: 'All'
        });
    }

    showResult = (result) => {
        const list = result === 'All' ? this.state.matches : this.state.matches.filter(match => match.result === result);

        this.setState({
            filterMatches: list,
            playedFilter: 'All',
            resultFilter: result
        });
    }

    render() {
        const {filterMatches, playedFilter, resultFilter} = this.state;
        return (
            <div className="the_matches_container">
               <div className="the_matches_wrapper">
                    <div className="left">

                        <div className="match_filters">
                            <div className="match_filters_box">
                                <div className="tag">
                                    Show Match
                                </div>
                                <div className="cont">
                                    <div className={`option ${playedFilter === 'All' ? 'active' : ''}`} onClick={() => this.showPlayed('All')}>
                                        All
                                    </div>
                                    <div className={`option ${playedFilter === 'Yes' ? 'active' : ''}`} onClick={() => this.showPlayed('Yes')}>
                                        Played
                                    </div>
                                    <div className={`option ${playedFilter === 'No' ? 'active' : ''}`} onClick={() => this.showPlayed('No')}>
                                        Not played
                                    </div>
                                </div>
                            </div>
                            <div className="match_filters_box">
                                <div className="tag">
                                    Result game
                                </div>
                                <div className="cont">
                                    <div className={`option ${resultFilter === 'All' ? 'active' : ''}`} onClick={() => this.showResult('All')}>
                                        All
                                    </div>
                                    <div className={`option ${resultFilter === 'W' ? 'active' : ''}`} onClick={() => this.showResult('W')}>
                                        W
                                    </div>
                                    <div className={`option ${resultFilter === 'L' ? 'active' : ''}`} onClick={() => this.showResult('L')}>
                                        L
                                    </div>
                                    <div className={`option ${resultFilter === 'F' ? 'active' : ''}`} onClick={() => this.showResult('D')}>
                                        D
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <MatchesList matches={filterMatches}/>
                    </div>
                    <div className="right">
                        <LeagueTable />
                    </div>
               </div>
            </div>
        );
    }
}

export default TheMatches;