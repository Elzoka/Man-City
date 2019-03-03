import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Components/Home';
import Layout from './HOC/Layout';

const Routes = props => {
    return (
    	<Layout>
			<Switch>
				<Route exact component={Home} path="/" />
			</Switch>
    	</Layout>
    );
}

export default Routes;
