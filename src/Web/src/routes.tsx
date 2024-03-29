import * as React from 'react';
import { Route } from 'react-router-dom';

import { Layout } from './components/Layout';

import Home from './views/Home'

export const routes =
    <Layout>
        <Route exact path='/' component={ Home } />
    </Layout>;
