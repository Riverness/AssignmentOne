class BaseClient {
    constructor(user) {
        this.user = user;
        this.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
        this.authUrl = 'https://demoqa.com/Account/v1/GenerateToken';
    }

    enrichHeaders() {
        if (!this.token)
            this.getToken().then((token) => {
                this.headers["Authorization"] = `Bearer ${token}`
            });
        return cy.wrap(this.headers);
    }
    getToken() {
        if (this.token){
            return cy.wrap(this.token)
        }
        const body = {
            userName: this.user.userName,
            password: this.user.password
        };
        return cy.request({
            method: 'POST',
            url: this.authUrl,
            headers: this.headers,
            body
        }).then((response) => {
            this.token = response.body.token;
            return this.token;
        })
    }
}

export default BaseClient;