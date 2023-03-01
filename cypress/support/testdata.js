export const FULL_ROW = {
    findWith: "department",
    rowObj: {
        firstName: "Alden",
        lastName: "Cantrell",
        age: "30",
        userEmail: "test@test.com",
        salary: "12345",
        department: "QA"
    }
};

export const EDIT_ROW = {
    editBy: "Alden",
    findWith: "firstName",
    rowObj: {
        firstName: "CompanyName",
        lastName: "BV"
    }
};

export const FORM_OBJ = {
    textInputs: {
        firstName: "CompanyName",
        lastName: "BV",
        userEmail: "test@test.com",
        userNumber: "0123456789",
        // subjects: "Cypress Assignment", // Since this is not a selectable option, I will omit this from the test
        address: "Netherlands"
    },
    gender: "Male",
    hobbies: ["Reading"],
    state: "NCR",
    city: "Delhi",
    birthday: {
        day: "15",
        month: "0",
        year: "1990",
        validation: "15 Jan 1990"
    }
};