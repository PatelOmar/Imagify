import React, { Suspense, lazy, useState } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


import Home from "./pages/Home";
import PrivateGallery from "./pages/Private";
import PublicGallery from "./pages/Public";

export default function AppRouter() {
    return (
    <div className="App">
        <header className="App-header">
            <h1>Imagify</h1>
        </header>
            <Router>
                
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/gallery/private">
                        <PrivateGallery />
                    </Route>
                    <Route exact path="/gallery/public">
                        <PublicGallery />
                    </Route>
                </Switch>
            </Router>
      </div>
    );
  }