import React from 'react';

import Header from '../Components/Header_Footer/Header';

const Layout = (props) => {
    return (
        <div>
            <Header />
            {props.children}
            footer
        </div>
    );
};

export default Layout;