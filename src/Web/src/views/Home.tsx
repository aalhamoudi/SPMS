import * as React from 'react';
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { AppStore } from '../stores'

import { Auth } from '../services/auth'

type HomeProps = AppStore & RouteComponentProps<{}>;

@inject(stores => stores.appStore)
@observer
export default class Home extends React.Component<HomeProps, {}> {
    componentWillMount() {
        
    }

    public render() {
        return this.props.session === undefined ? <div></div> : <div>{this.props.session.isValid()}</div>
    }
}


