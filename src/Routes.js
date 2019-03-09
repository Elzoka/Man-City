import React from 'react';
import {Switch} from 'react-router-dom';

import PrivateRoutes from './Components/authRoutes/PrivateRoutes';
import PublicRoutes from './Components/authRoutes/PublicRoutes';
import Home from './Components/Home';
import Layout from './HOC/Layout';
import SignIn from './Components/SignIn';

import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches';
import AddEditMatch from './Components/admin/matches/addEditMatch';

const Routes = props => {
    return (
    	<Layout>
			<Switch>
				<PrivateRoutes {...props} exact component={Dashboard} path="/dashboard" />
				<PrivateRoutes {...props} exact component={AddEditMatch} path="/admin_matches/edit_match" />
				<PrivateRoutes {...props} exact component={AddEditMatch} path="/admin_matches/edit_match/:id" />
				<PrivateRoutes {...props} exact component={AdminMatches} path="/admin_matches" />
				<PublicRoutes {...props} exact component={Home} path="/"/>
				<PublicRoutes {...props} restricted exact component={SignIn} path="/sign_in"  />
			</Switch>
    	</Layout>
    );
}

export default Routes;
