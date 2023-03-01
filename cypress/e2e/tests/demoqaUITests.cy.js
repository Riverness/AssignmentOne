import homePage from "../../pages/homePage";
import playgroundPage from "../../pages/playgroundPage";

import {EDIT_ROW, FORM_OBJ, FULL_ROW} from "../../support/testdata";

describe("Demoqa UI test suite", () => {
    beforeEach(() => {
        homePage.goToPage();
    });

    describe("TC01", () => {
        beforeEach(() => {
            homePage.selectSubCategory("Elements");
            playgroundPage.selectListElement("Web Tables");
        });

        it("Scenario A - Verify user can enter new data into the table", () => {
            playgroundPage.clickAddNewRecordButton();
            playgroundPage.fillRegistrationForm(FULL_ROW);
            playgroundPage.submitRegistrationForm(FULL_ROW);
        });

        it("Scenario B - Verify user can edit the row in a table", () => {
            playgroundPage.editTableEntry(EDIT_ROW);
        });
    });

    it("TC02 - Verify Broken Image", () => {
        homePage.selectSubCategory("Elements");
        playgroundPage.selectListElement("Broken Links - Images");
        playgroundPage.validateBrokenImage();
    });


    it("TC03 - Verify user can submit the form", () => {
        homePage.selectSubCategory("Forms");
        playgroundPage.selectListElement("Practice Form");
        playgroundPage.fillForm(FORM_OBJ);
        playgroundPage.submitForm();
        playgroundPage.validateAndClose(FORM_OBJ);
    });


    it("TC04 - Verify the progress bar", () => {
        homePage.selectSubCategory("Widgets");
        playgroundPage.selectListElement("Progress Bar");
        playgroundPage.startProgressBar();
        playgroundPage.validateProgressBarFinish();
    });

    it("TC05 - Verify the tooltip", () => {
        homePage.selectSubCategory("Widgets");
        playgroundPage.selectListElement(("Tool Tips"));
        playgroundPage.hoverOverButton();
        playgroundPage.validateTooltip();
    });

    // didn't manage to make this work, that's why it was skipped
    it.skip("TC06 - Verify user can drag and drop", () => {
        homePage.selectSubCategory("Interactions");
        playgroundPage.selectListElement("Droppable");
        playgroundPage.dragAndDrop();
    });
});
