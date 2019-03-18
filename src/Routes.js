import React from 'react';
import {Switch} from 'react-router-dom';

import PrivateRoutes from './Components/authRoutes/PrivateRoutes';
import PublicRoutes from './Components/authRoutes/PublicRoutes';
import Home from './Components/Home';
import Layout from './HOC/Layout';
import SignIn from './Components/SignIn';
import TheTeam from './Components/theTeam';
import TheMatches from './Components/theMatches';

import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches';
import AddEditMatch from './Components/admin/matches/addEditMatch';
import AdminPlayers from './Components/admin/players';
import AddEditPlayers from './Components/admin/players/addEditPlayers';

const Routes = props => {
    return (
    	<Layout>
			<Switch>

			<PrivateRoutes {...props} exact component={AddEditPlayers} path="/admin_players/add_players" />
				<PrivateRoutes {...props} exact component={AddEditPlayers} path="/admin_players/add_players/:id" />
				<PrivateRoutes {...props} exact component={AdminPlayers} path="/admin_players" />
				<PrivateRoutes {...props} exact component={Dashboard} path="/dashboard" />
				<PrivateRoutes {...props} exact component={AddEditMatch} path="/admin_matches/edit_match" />
				<PrivateRoutes {...props} exact component={AddEditMatch} path="/admin_matches/edit_match/:id" />
				<PrivateRoutes {...props} exact component={AdminMatches} path="/admin_matches" />
				<PublicRoutes {...props} exact component={TheTeam} path="/the_team"/>
				<PublicRoutes {...props} exact component={TheMatches} path="/the_matches"/>
				<PublicRoutes {...props} exact component={Home} path="/"/>
				<PublicRoutes {...props} restricted exact component={SignIn} path="/sign_in"  />
			</Switch>
    	</Layout>
    );
}

export default Routes;
