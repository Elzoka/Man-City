import React from 'react';

const FormField = ({id, formdata, change}) => {

    const createFormTemplate = (Input) => (
        <div>
            {
                formdata.showLabel ? 
                <div className="label_inputs">
                    {formdata.config.label}
                </div>
                :
                null
            }

            {Input}

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

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
            case 'input':
                formTemplate = createFormTemplate(
                    <input
                        {...formdata.config}
                        value={formdata.value}
                        autoComplete="off"
                        onChange={event => change({event, id})}
                    
                    />
                )
                
                break;
            case 'select':
                formTemplate = createFormTemplate(
                    <select
                        value={formdata.value}
                        onChange={event => change({event, id})} 
                    >
                        <option value="">
                            Select one
                        </option>
                        {
                            formdata.config.options.map(item => (
                                <option key={item.key} value={item.key}>
                                    {item.value}
                                </option>
                            ))
                        }
                    </select>

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