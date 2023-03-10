const {defineConfig} = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://demoqa.com/",
        viewportHeight: 1080,
        viewportWidth: 1920,
        setupNodeEvents(on, config) {
            on('task', {
                getISBNs: async (obj) =>
                    Object.fromEntries(
                        obj.map(el => [el.isbn, {obj: el}])
                    )
            });
        }
    }
});
