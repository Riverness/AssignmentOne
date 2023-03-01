const leftPanel = "#app div.playgound-body div.left-pannel";  // playground and panel are spelled wrong
const form = "form#userForm";
const datepicker = "div.react-datepicker";

class playgroundPage {
    locators = {
        elementListShown: `${leftPanel} div.element-list.show li.btn`,
        webTables: {
            addButton: "button#addNewRecordButton",
            dialog: {
                header: "div.modal-content div#registration-form-modal",
                formFieldInputs: {
                    firstName: `${form} input#firstName`,
                    lastName: `${form} input#lastName`,
                    userEmail: `${form} input#userEmail`,
                    age: `${form} input#age`,
                    salary: `${form} input#salary`,
                    department: `${form} input#department`
                },
                submitBtn: `${form} button#submit`
            },
            tableRows: "div.rt-tbody div.rt-tr-group",
            tableDataCols: {
                firstName: `div.rt-td:nth-of-type(1)`,
                lastName: `div.rt-td:nth-of-type(2)`,
                userEmail: `div.rt-td:nth-of-type(4)`,
                age: `div.rt-td:nth-of-type(3)`,
                salary: `div.rt-td:nth-of-type(5)`,
                department: `div.rt-td:nth-of-type(6)`
            },
            editBtn: "span[title=Edit]"
        },
        brokenImage: "img[src=\"/images/Toolsqa_1.jpg\"]",
        practiceForm: {
            textInputs: {
                firstName: `${form} input#firstName`,
                lastName: `${form} input#lastName`,
                userEmail: `${form} input#userEmail`,
                userNumber: `${form} input#userNumber`,
                // subjects: `${form} input#subjectsInput`,
                address: `${form} textArea#currentAddress`
            },
            genderDiv: `${form} div.custom-radio`,
            genderRadio: `${form} div.custom-radio input[value={0}]`,
            hobbiesLabel: `${form} div.custom-checkbox label.custom-control-label`,
            dropdowns: {
                show: `${form} div#{0}`,
                list: "div#{0} [class$=-menu]",
                text: "div#{0} [class$=-singleValue]"
            },
            pictureInput: "input[type=file]",
            birthday: `${form} input#dateOfBirthInput`,
            datepicker: {
                month: `${datepicker} select.react-datepicker__month-select`,
                year: `${datepicker} select.react-datepicker__year-select`,
                day: `${datepicker} [class*=--0{0}]`
            },
            submitBtn: `${form} button#submit`,
            dialog: {
                header: "div.modal-content div.modal-header",
                table: "table.table",
                closeBtn: "button#closeLargeModal"
            }
        },
        progressBar: {
            startStopBtn: "button#startStopButton",
            resetBtn: "button#resetButton",
            bar: "div.progress-bar"
        },
        hover: {
            button: "button#toolTipButton",
            tooltip: "div#buttonToolTip.tooltip"
        },
        dragBox: "div#simpleDropContainer.simple-drop-container div#draggable.drag-box",
        target: "div#simpleDropContainer.simple-drop-container div#droppable.drop-box"
    };

    selectListElement(element) {
        cy.get(this.locators.elementListShown).contains(element).click();
        cy.get(this.locators.elementListShown).contains(element).parent().should("have.class", "active");
    };

    clickAddNewRecordButton() {
        cy.get(this.locators.webTables.addButton).click();
        cy.get(this.locators.webTables.dialog.header)
            .should("be.visible")
            .and("have.text", "Registration Form");
    };

    fillRegistrationForm(obj) {
        Object.entries(obj.rowObj).forEach((input) => {
            const [key, value] = input;
            cy.get(this.locators.webTables.dialog.formFieldInputs[key]).clear().type(value);
            cy.get(this.locators.webTables.dialog.formFieldInputs[key]).should("have.value", value);
        });
    };

    submitRegistrationForm(obj) {
        cy.get(this.locators.webTables.dialog.submitBtn).should("be.enabled");
        cy.get(this.locators.webTables.dialog.submitBtn).click();
        cy.get(this.locators.webTables.tableRows).contains(obj.rowObj[obj.findWith]).parent().then(row => {
            Object.entries(obj.rowObj).forEach((col) => {
                const [key, value] = col;
                cy.wrap(row).find(this.locators.webTables.tableDataCols[key]).should("have.text", value);
            });
        });
    };

    editTableEntry(obj) {
        cy.get(this.locators.webTables.tableRows).contains(obj.editBy).parent().find(this.locators.webTables.editBtn).click();
        cy.get(this.locators.webTables.dialog.header)
            .should("be.visible")
            .and("have.text", "Registration Form").then(() => {
            this.fillRegistrationForm(obj);
            this.submitRegistrationForm(obj);
        });
    };

    validateBrokenImage() {
        cy.get(this.locators.brokenImage)
            .should("be.visible")
            .and($img => expect($img[0].naturalWidth).to.eq(0));
        // apparently broken images have naturalWidth parameter set to zero. I learned about this today
    };

    fillFormTextFields(obj) {
        Object.entries(obj.textInputs).forEach((input) => {
            const [key, value] = input;
            cy.get(this.locators.practiceForm.textInputs[key]).clear().type(value);
            cy.get(this.locators.practiceForm.textInputs[key]).should("have.value", value);
        });
    };

    selectFormGender(obj) {
        cy.get(this.locators.practiceForm.genderDiv).contains(obj.gender).click();
        cy.get(this.locators.practiceForm.genderRadio.format(obj.gender)).should("be.checked");
    };

    selectFormHobbies(obj) {
        Object.values(obj.hobbies).forEach((hobby) => {
            cy.get(this.locators.practiceForm.hobbiesLabel).contains(hobby).parent().click();
            cy.get(this.locators.practiceForm.hobbiesLabel).contains(hobby).siblings("input").should("be.checked");
        });
    };

    selectFormCityAndState(obj) {
        ["state", "city"].forEach((s) => {
            // intentionally avoided select()
            cy.get(this.locators.practiceForm.dropdowns.show.format(s)).click();
            cy.get(this.locators.practiceForm.dropdowns.list.format(s)).contains(obj[s]).click();
            cy.get(this.locators.practiceForm.dropdowns.text.format(s)).should("have.text", obj[s]);
        });
    };

    selectFormPicture() {
        cy.get(this.locators.practiceForm.pictureInput).selectFile("cypress/fixtures/cat.png");
    };

    selectBirthday(obj) {
        cy.get(this.locators.practiceForm.birthday).click();
        cy.get(this.locators.practiceForm.datepicker.month).select(obj.birthday.month)
            .should("have.value", obj.birthday.month);
        cy.get(this.locators.practiceForm.datepicker.year).select(obj.birthday.year)
            .should("have.value", obj.birthday.year);
        cy.get(this.locators.practiceForm.datepicker.day.format(obj.birthday.day)).click();
        cy.get(this.locators.practiceForm.birthday)
            .should("have.value", obj.birthday.validation);
    };

    fillForm(obj) {
        this.fillFormTextFields(obj);
        this.selectFormGender(obj);
        this.selectFormHobbies(obj);
        this.selectFormCityAndState(obj);
        this.selectFormPicture();
        this.selectBirthday(obj);
    };

    submitForm() {
        cy.get(this.locators.practiceForm.submitBtn).click();
        cy.get(this.locators.practiceForm.dialog.header)
            .should("be.visible")
            .and("have.text", "Thanks for submitting the form");
    };

    validateAndClose(obj) {
        Object.values(obj.textInputs).forEach(s => {
            cy.get(this.locators.practiceForm.dialog.table).contains(s).should("be.visible");
        });
        cy.get(this.locators.practiceForm.dialog.table).contains(obj.gender).should("be.visible");
        cy.get(this.locators.practiceForm.dialog.table).contains(obj.state).should("be.visible");
        cy.get(this.locators.practiceForm.dialog.table).contains(obj.city).should("be.visible");
        Object.values(obj.hobbies).forEach(hobby => {
            cy.get(this.locators.practiceForm.dialog.table).contains(hobby).should("be.visible");
        });
        cy.get(this.locators.practiceForm.dialog.table).contains("cat.png").should("be.visible");
        // cy.get(this.locators.practiceForm.dialog.table).contains(obj.birthday.validation).should("be.visible")
        // if this was a real app I would report a bug about the birthday showing weird on the form submission screen
        cy.get(this.locators.practiceForm.dialog.closeBtn).click();
    };

    startProgressBar() {
        cy.get(this.locators.progressBar.startStopBtn).should("be.visible").click();
        cy.get(this.locators.progressBar.startStopBtn).should("have.text", "Stop");
    };

    validateProgressBarFinish() {
        cy.get(this.locators.progressBar.bar, {timeout: 15000})
            .should("have.text", "100%")
            .and("have.class", "bg-success");
        cy.get(this.locators.progressBar.resetBtn)
            .should("be.visible")
            .and("have.text", "Reset");
    };

    hoverOverButton() {
        cy.get(this.locators.hover.button).trigger("mouseover");
        cy.get(this.locators.hover.tooltip).should("be.visible");
    };

    validateTooltip() {
        cy.get(this.locators.hover.tooltip).should("have.text", "You hovered over the Button");
    };

    /**
     * I haven't been able to get this one to work.
     * Working theory was taken from the following:
     * https://stackoverflow.com/questions/55361499/how-to-implement-drag-and-drop-in-cypress-test
     **/
    dragAndDrop() {
        cy.get(this.locators.dragBox).then(el => {
            const draggable = el[0];
            cy.get(this.locators.target).then(el => {
                const droppable = el[0];

                const coords = droppable.getBoundingClientRect()
                draggable.dispatchEvent(new MouseEvent('mousemove'));
                draggable.dispatchEvent(new MouseEvent('mousedown'));
                draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: 10, clientY: 0}));
                draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: coords.x + 10, clientY: coords.y + 10}));
                draggable.dispatchEvent(new MouseEvent('mouseup'));
            });
        });
    };
}

module.exports = new playgroundPage();
