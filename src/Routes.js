import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Components/Home';
import Layout from './HOC/Layout';
import SignIn from './Components/SignIn';

import Dashboard from './Components/admin/Dashboard';

const Routes = props => {
    return (
    	<Layout>
			<Switch>
				<Route exact component={Home} path="/" />
				<Route exact component={SignIn} path="/sign_in" />
				<Route exact component={Dashboard} path="/dashboard" />
			</Switch>
    	</Layout>
    );
}

export default Routes;
