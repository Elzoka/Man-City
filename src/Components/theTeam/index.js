import React, { Component } from 'react';

import PlayerCard from '../UI/PlayerCard';
import Fade from 'react-reveal/Fade';
import Stripes from '../../Resources/images/stripes.png';
import {Players} from '../../firebase';
import {firebaseLooper} from '../UI/misc';
import PlayerUrl from '../../Resources/images/players/Otamendi.png';

class TheTeam extends Component {

    state = {
        loading: true,
        players: []
    }

    componentDidMount(){
        Players.once('value')
            .then(snapshot => {
                const players = firebaseLooper(snapshot);
                // let promises = [];

                // for(let key in players){
                //     promises.push(
                //         new Promise((resolve, reject) => {
                //             firebase.storage().ref('players').child(players[key].image).getDownloadURL()
                //             .then(url => {
                //                 players[key].url = url;
                //                 resolve()
                //             })
                //             .catch(e => {
                //                 reject(e);
                //             })
                //         })
                //     )
                // }
        
                // Promise.all(promises)
                //     .then(() => {
                //         this.setState({loading: false, players});
                //     });
                this.setState({players, loading: false});
            });
    }

    showplayersByCategory = (category) => (
        this.state.players ? 
            this.state.players.map((player, i) => {
                return player.position === category ? 
                    <Fade delay={i * 20} left key={i}>
                        <div className="item">
                            <PlayerCard 
                                {...player}
                                bck={player.url || PlayerUrl}
                            />
                        </div>
                    </Fade>
                : null;
            })
        :null
    )

    render() {
        return (
            <div className="the_team_container" style={{
                background: `url(${Stripes}) repeat`
            }}>
                {
                    !this.state.loading ?
                        <div>
                            <div className="team_category_wrapper">
                                <div className="title">Keepers</div>
                                <div className="team_cards">
                                    {this.showplayersByCategory('Keeper')}
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Defence</div>
                                <div className="team_cards">
                                    {this.showplayersByCategory('Defence')}
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Midfield</div>
                                <div className="team_cards">
                                    {this.showplayersByCategory('Midfield')}
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Strikers</div>
                                <div className="team_cards">
                                    {this.showplayersByCategory('Striker')}
                                </div>
                            </div>
                        </div>
                    :null
                }
            </div>
        );
    }
}

export default TheTeam;