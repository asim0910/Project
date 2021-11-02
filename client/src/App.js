import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
//import Routes from './components/routing/Routes';
import Login from "../src/Components/auth/Login";
import Register from "../src/Components/auth/Register";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import PrivateRoute from "./Components/Routing/PrivateRoute";
import Upload from "./Components/UploadPage/Upload";
import UserProfile from "./Components/UserProfile/UserProfile";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/upload' component={Upload} />
              <PrivateRoute exact path='/dashboard' component={UserProfile} />
            </div>
            {/*<Route component={Routes} />*/}
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
