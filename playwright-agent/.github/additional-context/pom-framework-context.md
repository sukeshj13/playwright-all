Generate Playwright tests for all the test scenarios prov
ided in the test plan.
Requirements:
- Use TypeScript.
- Follow the Page Object Model (POM) design pattern.
- Create a separate Page Object class for each applicat
ion page.
- Keep page locators and reusable page actions inside t
he Page Object classes.
- Keep test assertions and business scenarios inside th
e test (.spec.ts) files.
- Use Playwright's built-in locators (getByRole, getByL
abel, getByText, getByPlaceholder, etc.) whenever possi
ble.
- Avoid XPath unless absolutely necessary.
- Write clean, readable, and maintainable code.
- Organize the generated files using the following stru
cture:
pages/
tests/
LoginPage.ts
login.spec.ts
- Reuse Page Object methods across multiple tests.
- Generate meaningful method names and comments where a
ppropriate.
- Follow Playwright and TypeScript best practices.