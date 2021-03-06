import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import FormField from '../../UI/formFields';
import Fileuploader from '../../UI/fileuploader';
import {validate} from '../../UI/misc';
import {Players, firebaseDB, firebase} from '../../../firebase';



class AddEditPlayers extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Last Name',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Number',
                    name: 'number_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        {key: 'Keeper', value: 'Keeper'},
                        {key: 'Defence', value: 'Defence'},
                        {key: 'Midfield', value: 'Midfield'},
                        {key: 'Striker', value: 'Striker'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        }
    }

    updateFields = (player, playerId, formType, defaultImg) => {
        const newFormdata = { ...this.state.formdata };

        for(let key in newFormdata){
            newFormdata[key].value = player[key];
            newFormdata[key].valid = true;
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formdata: newFormdata
        })
    }

    componentDidMount(){
        const playerId = this.props.match.params.id;

        if(!playerId){
            this.setState({formType: 'Add Player'});
        }else{
            firebaseDB.ref(`players/${playerId}`).once('value')
                .then(snapshot => {
                    const playerData = snapshot.val();

                    firebase.storage().ref('players')
                        .child(playerData.image).getDownloadURL()
                        .then(url => {
                            this.updateFields(playerData, playerId, 'Edit player', url);
                        })
                        .catch(e => {
                            this.updateFields({...playerData, image: ''}, playerId, 'Edit player', '');
                        })
                });
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

        if(formIsValid){
            if(this.state.formType === 'Edit player'){
                firebaseDB.ref(`players/${this.state.playerId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.setState({
                            formSuccess: 'Update correctly'
                        });
                        setTimeout(() => {
                            this.setState({
                                formSuccess: ''
                            })
                        }, 2000)
                    })
                    .catch(e => {
                        this.setState({formError: true});
                    });
            }else{
                Players.push(dataToSubmit)
                    .then(() => {
                        this.props.history.push('/admin_players');
                    })
                    .catch(e => {
                        this.setState({formError: true});
                    });
            }
        }else{
            this.setState({
                formError: true
            })
        }
    }

    updateForm = (element, content = '') => {
        const newFormdtata = {...this.state.formdata};
        const newElement = newFormdtata[element.id];

        newElement.value = content ||  element.event.target.value;

        let validData = validate(newElement);

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        
        this.setState({
            formError: false,
            formdata: newFormdtata
        });
    }

    resetImage = () => {
        const newFormdtata = { ...this.state.formdata };

        newFormdtata['image'].value = '';
        newFormdtata['image'].valid = false;

        this.setState({
            defaultImg: '',
            formdata: newFormdtata
        })
    }

    storeFilename = (filename) => {
        this.updateForm({
            id: 'image'
        }, filename)
    }

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>

                    <div>
                        <form onSubmit={this.submitForm}>

                            <Fileuploader
                                dir="players"
                                tag="Player image"
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formdata.image.value}
                                resetImage={this.resetImage}
                                filename={this.storeFilename}
                            />
                            <FormField
                                id={'name'}
                                formdata = {this.state.formdata.name}
                                change={this.updateForm}
                            />

                            <FormField
                                id={'lastname'}
                                formdata = {this.state.formdata.lastname}
                                change={this.updateForm}
                            />

                            <FormField
                                id={'number'}
                                formdata = {this.state.formdata.number}
                                change={this.updateForm}
                            />

                            <FormField
                                id={'position'}
                                formdata = {this.state.formdata.position}
                                change={this.updateForm}
                            />


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

export default AddEditPlayers;