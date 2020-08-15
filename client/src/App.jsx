import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sounds from "./components/Sounds";
import "./socket";
import SignInForm from "./components/SignInForm";
import SoundsPanel from "./components/SoundsPanel";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/signin">
                    <SignInForm />
                </Route>
                <Route path="/panel">
                    <SoundsPanel />
                </Route>
                <Route path="/">
                    <Sounds />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
