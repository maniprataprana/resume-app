import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './store/index';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Dasboard from './components/dasbboard/Dasboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';

import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;

	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());

		window.location.href = '/';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Navbar />

						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:handle" component={Profile} />
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dasboard} />
								<PrivateRoute
									exact
									path="/create-profile"
									component={CreateProfile}
								/>
								<PrivateRoute
									exact
									path="/edit-profile"
									component={EditProfile}
								/>
								<PrivateRoute
									exact
									path="/add-experience"
									component={AddExperience}
								/>
								<PrivateRoute
									exact
									path="/add-education"
									component={AddEducation}
								/>
								<PrivateRoute exact path="/feed" component={Posts} />
								<PrivateRoute exact path="/post/:id" component={Post} />
							</Switch>
							<Route exact path="/not-found" component={NotFound} />
						</div>

						<Footer />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
