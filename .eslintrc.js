module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    extends: "standard",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    rules: {
        semi: [2, "always"]
    }
};