
export class Rest {
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    callApi() {
        fetch('http://localhost:5000/api/values', this.getConfig()).then((result) => result.json()).then((data) => console.log(data));
    }

    getConfig() {
        return {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }
    }
}