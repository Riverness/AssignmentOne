import BaseClient from "./BaseClient";

class AccountClient extends BaseClient {
    constructor(user) {
        super(user);
        this.body = {
            userName: this.user.userName,
            password: this.user.password
        };
        this.baseUrl = 'https://demoqa.com/Account/v1';
    };

    createNewUser(failOnStatusCode = true) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}/User`,
            headers: this.headers,
            body: this.body,
            failOnStatusCode
        });
    };

    deleteUser() {
        this.enrichHeaders().then((headers) => {
            cy.request({
                method: 'DELETE',
                url: `${this.baseUrl}/User/${this.user.id}`,
                headers,
                body: this.body
            });
        });
    };
}

export default AccountClient;