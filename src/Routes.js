import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Components/Home';
import Layout from './HOC/Layout';
import SignIn from './Components/SignIn';

const Routes = props => {
    return (
    	<Layout>
			<Switch>
				<Route exact component={Home} path="/" />
				<Route exact component={SignIn} path="/sign_in" />
			</Switch>
    	</Layout>
    );
}

export default Routes;
