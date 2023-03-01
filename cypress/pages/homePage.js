class homePage {
    locators = {
        buttonList: "#app div.home-body div.card.mt-4.top-card"
    };
    goToPage() {
        cy.visit("/");
    };

    selectSubCategory(category) {
        cy.get(this.locators.buttonList).contains(category).click();
        cy.get("div.playgound-body").should("exist");
    };
}

module.exports = new homePage();
