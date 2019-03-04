import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import FormField from '../../UI/formFields';
import {validate} from '../../UI/misc';

import {Promotions} from '../../../firebase';

class Enroll extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
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

    resetFormSuccess = (type) => {
        const newFormdata = {...this.state.formdata};

        for(let key in newFormdata){
            newFormdata[key].value = '';
            newFormdata[key].valid = false
            newFormdata[key].validationMessage = '';
        }
        this.setState({
            formError: false,
            formSuccess: type ? 'Congratulations' : 'already on the database',
            formdata: newFormdata
        });
        this.successMessage();
    }

    successMessage(){
        setTimeout(() => {
            this.setState({formSuccess: ''});
        }, 2000);
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
            Promotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
                .then(snapshot => {
                    if(snapshot.val()){
                        this.resetFormSuccess(false);
                    }else{
                        Promotions.push(dataToSubmit);
                        this.resetFormSuccess(true);
                    }
                })
        }else{
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={this.submitForm}>
                        <div className="enroll_title">
                            Enter your email
                        </div>
                        <div className="enroll_input">
                            <FormField
                                id={'email'}
                                formdata = {this.state.formdata.email}
                                change={this.updateForm}
                            />

                            {this.state.formError ? <div className="error_label"> Something is wrong, try again</div> : null}
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button
                                onClick={this.submitForm}
                            >
                                Enroll
                            </button>

                            <div className="enroll_discl">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. ext of the printing and typesetting industry.
                            </div>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;