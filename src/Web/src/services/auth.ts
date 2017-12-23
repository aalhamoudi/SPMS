import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, ICognitoUserAttributeData, ICognitoUserData, IAuthenticationDetailsData, CognitoUserSession } from 'amazon-cognito-identity-js';

import { poolData } from '../constants'


export class Auth {
    user: CognitoUser;
    userPool: CognitoUserPool;
    userData: ICognitoUserData;
    authenticationData: IAuthenticationDetailsData;
    authenticationDetails: AuthenticationDetails;

    attributes: Array<CognitoUserAttribute>;
    emailData: ICognitoUserAttributeData;
    emailAttribute: CognitoUserAttribute;
    nameData: ICognitoUserAttributeData;
    nameAttribute: CognitoUserAttribute;
    

    constructor(email: string, password: string) {
        this.userPool = new CognitoUserPool(poolData);
        this.userData = {
            Username: email,
            Pool: this.userPool
        };
        this.authenticationData = {
            Username: email,
            Password: password
        };
        this.authenticationDetails = new AuthenticationDetails(this.authenticationData);
        this.attributes = new Array<CognitoUserAttribute>();

        
    }

    signUp(name: string) {
        this.nameData = { Name: "name", Value: name };
        this.nameAttribute = new CognitoUserAttribute(this.nameData);
        this.attributes.push(this.nameAttribute);

        this.userPool.signUp(this.authenticationData.Username, this.authenticationData.Password, this.attributes, null, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            this.user = result.user;
        });
    }

    signIn(): Promise<CognitoUserSession>  {
        this.user = new CognitoUser(this.userData);

        let promise: Promise<CognitoUserSession> = new Promise((resolve, reject) => {
            this.user.authenticateUser(this.authenticationDetails, {
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (err) => {
                    reject(err);
                }
            });
        });
        
        return promise;

    }
}