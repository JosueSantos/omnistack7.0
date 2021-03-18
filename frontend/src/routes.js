import React from 'react';
//importa a biblioteca para lidar com rotas no react
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';
import Comments from './pages/Comments';

function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={Feed}/>
            <Route path="/new" component={New} />
            <Route path="/comments" component={Comments} />
        </Switch>
    );
}

export default Routes;