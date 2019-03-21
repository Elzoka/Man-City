import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import FormField from '../../UI/formFields';
import {validate, firebaseLooper} from '../../UI/misc';
import {Matches, Teams, firebaseDB} from '../../../firebase';

class AddEditMatch extends Component {
    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formdata: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'statdium_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        {key: 'W', value: 'W'},
                        {key: 'L', value: 'L'},
                        {key: 'D', value: 'D'},
                        {key: 'n/a', value: 'n/a'}
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game played ?',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        {key: 'Yes', value: 'Yes'},
                        {key: 'No', value: 'No'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid =  true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = formIsValid && this.state.formdata[key].valid;
        }

        this.state.teams.forEach(team => {
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb;
            }

            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb;
            }

        })

        if(formIsValid){
            if(this.state.formType === 'Edit Match'){
                firebaseDB.ref(`matches/${this.state.matchId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        // this.successForm('Updated correctly');
                        this.setState({formSuccess: 'Updated correctly'});
                        setTimeout(() => {
                            this.setState({formSuccess: ''});
                        }, 2000);

                    })
                    .catch(e => {
                        this.setState({
                            formError: true
                        });
                    })
            }else{
                // add Match
                Matches.push(dataToSubmit)
                    .then(() => {
                        this.props.history.push('/admin_matches');
                    })
                    .catch(e => {
                        console.log(e);
                        this.setState({
                            formError: true
                        });
                    })
            }
        }else{
            this.setState({
                formError: true
            })
        }
    }


    updateForm = element => {
        const newFormdtata = {...this.state.formdata};
        const newElement = newFormdtata[element.id];
        newElement.value = element.event.target.value;

        let validData = validate(newElement);

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        
        this.setState({
            formError: false,
            formdata: newFormdtata
        });
    }

    updateFields = (match, teamOptions, teams, formType, matchId) => {
        const newFormdtata = {
            ...this.state.formdata
        }

        for(let key in newFormdtata){
            if(match){
                newFormdtata[key].value = match[key]
                newFormdtata[key].valid = true
            }

            if(['local', 'away'].includes(key)){
                newFormdtata[key].config.options = teamOptions;
            }
        }

        this.setState({
            formdata: newFormdtata,
            matchId,
            formType,
            teams
        })
    }

    componentDidMount(){
        const getTeams = (match, type) => {
            Teams.once('value').then(snapshot => {
                const teams = firebaseLooper(snapshot);
                const teamOptions = [];

                snapshot.forEach(childSnapshot => {
                    const shortName = childSnapshot.val().shortName;
                    teamOptions.push({
                        key: shortName,
                        value: shortName
                    })
                });

                this.updateFields(match, teamOptions, teams, type, matchId);
            })
        }

        const matchId = this.props.match.params.id;
        if(!matchId){
            // Add Match
            getTeams(null, 'Add Match');
        }else{
            firebaseDB.ref(`matches/${matchId}`).once('value')
                .then(snapshot => {
                    const match = snapshot.val();
                    
                    getTeams(match, 'Edit Match');

                });
        }
    }

    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>

                    <div>
                        <form onSubmit={this.submitForm}>
                            <FormField
                                id={'date'}
                                formdata = {this.state.formdata.date}
                                change={this.updateForm}
                            />
                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'local'}
                                            formdata = {this.state.formdata.local}
                                            change={this.updateForm}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            id={'resultLocal'}
                                            formdata = {this.state.formdata.resultLocal}
                                            change={this.updateForm}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'away'}
                                            formdata = {this.state.formdata.away}
                                            change={this.updateForm}
                                        />
                                    </div>
                                    <div>
                                      <FormField
                                            id={'resultAway'}
                                            formdata = {this.state.formdata.resultAway}
                                            change={this.updateForm}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="split_fields">
                                <FormField
                                    id={'referee'}
                                    formdata = {this.state.formdata.referee}
                                    change={this.updateForm}
                                />

                                <FormField
                                    id={'stadium'}
                                    formdata = {this.state.formdata.stadium}
                                    change={this.updateForm}
                                />
                            </div>

                            <div className="split_fields">
                                <FormField
                                    id={'result'}
                                    formdata = {this.state.formdata.result}
                                    change={this.updateForm}
                                />

                                <FormField
                                    id={'final'}
                                    formdata = {this.state.formdata.final}
                                    change={this.updateForm}
                                />
                            </div>

                            <div className="success_label">
                                {this.state.formSuccess}
                            </div>

                            {
                                this.state.formError ?
                                    <div className="error_label">
                                        Something is wrong
                                    </div>
                                    :
                                    ''
                            }

                            <div className="admin_submit">
                                <button onClick={this.submitForm}>
                                    {this.state.formType}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </AdminLayout>
        );
    }
}

export default AddEditMatch;