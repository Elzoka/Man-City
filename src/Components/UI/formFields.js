import React from 'react';

const FormField = ({id, formdata, change}) => {

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
            case 'input':
                formTemplate = (
                    <div>
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            autoComplete="off"
                            onChange={event => change({event, id})}
                        
                        />

                        <div className="error_label">
                            {
                                formdata.validation && !formdata.valid
                                ?
                                formdata.validationMessage
                                :
                                null
                            }
                        </div>
                        
                    </div>
                )
                break;

            default:
                formTemplate = null;
                break;
        }

        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
}

export default FormField;