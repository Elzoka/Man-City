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

                        {
                            formdata.validation && !formdata.valid
                            ?
                                <div className="error_label" style={{height:'19px'}}>
                                    {formdata.validationMessage}
                                </div>
                            :
                                null
                        }
                        
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