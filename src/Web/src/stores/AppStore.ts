import { observable } from 'mobx'
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { Auth } from '../services/auth'
import { Rest } from '../services/rest'


export class AppStore {
    @observable auth: Auth
    @observable session: CognitoUserSession;
    @observable accessToken: string;

    constructor() {
        this.auth = new Auth("theloar@gmail.com", "A@d3m4s8");
        this.signIn();
    }

    async signIn() {
        this.session = await this.auth.signIn();
        this.accessToken = this.session.getAccessToken().getJwtToken();
        let rest = new Rest(this.accessToken);
        rest.callApi();
    }
}