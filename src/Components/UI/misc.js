import React from 'react';
import {Link} from 'react-router-dom';


export const Tag = ({bck, add, color, size, link, linkTo, children}) => {
    const template = (
    <div style={{
        background: bck,
        fontSize: size,
        color,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...add
    }}>
        {children}
    </div>);

    const component = 
        link ? 
            <Link
                to={linkTo}
            >
                {template}
            </Link>
        :
            template;

    return component
};

export const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach(childSnapshot => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    return data;
}

export const validate = (element) => {
    let message = '';

    
    if(element.validation.required){
        message = element.value.trim() === '' ? 'This field is required': '';
    }
    
    if(!message && element.validation.email){
        message = !(/\S+@\S+\.\S+/.test(element.value)) ? 'Must be a valid email': '';
    }
    return !!message ? [false, message] : [true, ''];
}