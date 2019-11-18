import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Menu } from 'components/Menu';
import { Home } from 'pages/Home';
import { Habits } from 'pages/Habits';
import { home, list } from 'ionicons/icons';
import { AppContextProvider } from 'utils/State';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const appPages = [
    {
        title: 'Home',
        url: '/home',
        icon: home
    },
    {
        title: 'Habits',
        url: '/home/stats',
        icon: list
    }
];

const App = () => (
    <IonApp>
        <IonReactRouter>
            <IonSplitPane contentId="main">
                <AppContextProvider>
                    <Menu appPages={appPages}/>
                    <IonRouterOutlet id="main">
                        <Route path="/home" component={Home} exact={true}/>
                        <Route path="/home/stats" component={Habits} exact={true}/>
                        <Route path="/" render={() => <Redirect to="/home" exact={true}/>}/>
                    </IonRouterOutlet>
                </AppContextProvider>
            </IonSplitPane>
        </IonReactRouter>
    </IonApp>
);

export default App;
