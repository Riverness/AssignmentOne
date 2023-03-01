import BooksClient from "../APIHelpers/BooksClient";
import AccountClient from "../APIHelpers/AccountClient";

const USER = {
    userName: "Test_User", password: "Pa$$W0rd123"
};

const accountClient = new AccountClient(USER);
const booksClient = new BooksClient(accountClient);

context("Create User", () => {

    it("create user happy path (successful creation)", () => {
        accountClient.createNewUser().then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body).to.have.property("books");
            expect(res.body.books).to.have.length(0);
            expect(res.body).to.have.property("userID");
            expect(res.body.userID).to.not.be.null;
            accountClient.user["id"] = res.body.userID;
            console.log(res.body.userID);
        });
    });

    it("create user sad path (existing user error)", () => {
        accountClient.createNewUser(false).then((res) => {
            expect(res.status).to.eq(406);
            expect(res.body.code).to.eq("1204");
            expect(res.body.message).to.eq("User exists!");
        });
    });

    it("add book happy path", () => {
        booksClient.getBooksObject().then(booksObj => {
            booksClient.addBookToAccount(Object.keys(booksObj)[0])
                .then((res) => {
                    expect(res.status).to.eq(201)
                    expect(res.body.books[0].isbn).to.eq(Object.keys(booksObj)[0]);
                });
        });
    });

    it("add book sad path (existing book error)", () => {
        // implemented using custom task to demonstrate how tasks can be utilised for more complex logic
        booksClient.getBooksObject().then(booksObj => {
            booksClient.addBookToAccount(Object.keys(booksObj)[0], false)
                .then((res) => {
                    expect(res.status).to.eq(400);
                    expect(res.body.code).to.eq("1210");
                    expect(res.body.message).to.eq("ISBN already present in the User's Collection!");
                });
        });
    });

    it("remove book happy path", () => {
        booksClient.getBooksObject().then(booksObj => {
            booksClient.removeBookFromAccount(Object.keys(booksObj)[0])
                .then((res) => {
                    expect(res.status).to.eq(204);
                });
        });
    });

    it("remove book sad path (book not present error)", () => {
        booksClient.getBooksObject().then(booksObj => {
            booksClient.removeBookFromAccount(Object.keys(booksObj)[0], false)
                .then((res) => {
                    expect(res.status).to.eq(400);
                    expect(res.body.code).to.eq("1206");
                    expect(res.body.message).to.eq("ISBN supplied is not available in User's Collection!");
                });
        });
    });

    // cleaning up the environment after running the tests is not desirable however due to the
    // nature of the User API in this assignment (not knowing user ID), I had to use this anti pattern
    // https://docs.cypress.io/guides/references/best-practices#Using-after-or-afterEach-hooks
    after(() => {
        accountClient.deleteUser();
    });
});