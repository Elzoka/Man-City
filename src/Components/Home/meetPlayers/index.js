import React, { Component } from 'react';
import Reveal from 'react-reveal';
import Stripes from '../../../Resources/images/stripes.png';
import {Tag} from '../../UI/misc';
import Cards from './Cards';

class MeetPlayers extends Component {

    state = {
		show: false
    }

    renderTheTags = () => {
        const text = "meet the players";
        return text.split(" ").map((word, i) => (
            <div
				key={i}
			>    
                <Tag
                    bck="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                        display: 'inline-block',
                        marginBottom: '20px'
                    }}
                >
                    {word}
                </Tag>
            </div>
        ));
    }
    
    render() {
        return (
            <Reveal
				fraction={0.7}
				onReveal={() => {
					this.setState({show: true})
				}}
            >
                <div
                    className="home_meetplayers"
                    style={{
                        background: `#fff url(${Stripes})`
                    }}
                >
                    <div className="container">
                        <div className="home_meetplayers_wrapper">

                            <div className="home_card_wrapper">
                                <Cards show={this.state.show}/>
                            </div>

                            <div className="home_text_wrapper">
                                {this.renderTheTags()}
                                <div>
                                    <Tag
                                        bck="#fff"
                                        size="27px"
                                        color="#0e1731"
                                        link
                                        linkTo="/the_team"
                                        add={{
                                            display: 'inline-block',
                                            marginBottom: '27px',
                                            border: "1px solid #0e1731"
                                        }}
                                    >
                                        meet them here
                                    </Tag>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Reveal>
        );
    }
}

export default MeetPlayers;