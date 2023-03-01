class BooksClient {
    constructor(accountClient) {
        this.accountClient = accountClient;
        this.baseUrl = 'https://demoqa.com/BookStore/v1';
    };

    getAvailableBooks() {
        return cy.request({
            method: 'GET',
            url: `${this.baseUrl}/Books`
        }).then(res => res.body);
    };

    // implemented using custom cypress task to demonstrate how tasks can be utilised for more complex logic
    // even though this use-case is pretty basic
    getBooksObject() {
        return this.getAvailableBooks().then((obj) => cy.task('getISBNs', obj.books));
    };

    addBookToAccount(isbn, failOnStatusCode = true) {
        return this.accountClient.enrichHeaders()
            .then((headers) => {
                cy.request({
                    method: 'POST',
                    url: `${this.baseUrl}/Books`,
                    headers,
                    body: {
                        userId: this.accountClient.user.id,
                        collectionOfIsbns: [{
                            isbn
                        }]
                    },
                    failOnStatusCode
                });
            });
    };

    removeBookFromAccount(isbn, failOnStatusCode = true) {
        return this.accountClient.enrichHeaders()
            .then((headers) => {
                cy.request({
                    method: 'DELETE',
                    url: `${this.baseUrl}/Book`,
                    headers,
                    body: {
                        isbn,
                        userId: this.accountClient.user.id
                    },
                    failOnStatusCode
                });
            });
    };
}

export default BooksClient;
