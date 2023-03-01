# AssignmentOne
CompanyOne Quality Engineer job interview assignment

## Some significant decisions I made

#### UI Tests
- Every function that performs actions should check if its actions had the desired effect. I tried to ensure this by asserting the state of the DOM structure after every step (as long as it was possible/feasible to do so). This ensures the tests to be more stable and if (or when, depends on our optimism levels) tests fail, they will fail at the actual step things went wrong. It also helps us to chain commands together with greater confidence.
- I used only two pages in the page object model in this implementation since all of the website was functioning within only these two pages from what I could see. The URLs kept changing but the page layout was essentially the same so one homepage and one playground page was implemented as page objects.
- I couldn't implement the drag-and-drop test case. It was not something I came across in my career and I couldn't figure out how to do it so in the interest of time I left it unimplemented.

#### API tests
- I cut a lot of corners while writing these tests, and I'm aware how flaky they currently are. For example, in the API tests, I basically treated the whole suite as a suite that runs every test sequentially and as a result those tests depend on each other to pass. This is not good design and I consciously chose to do that in the interest of time. I assure you I know better :)
- I used an anti-pattern of Cypress and cleaned up the tests using an after() block. That's not a good way to design tests. Each test should prepare its own running environment before its execution.


## To run the tests

https://docs.cypress.io/guides/getting-started/

or simply

`npx cypress run`

<img width="620" alt="image" src="https://user-images.githubusercontent.com/45148827/222186328-f9c47a7e-7a02-4c97-82af-2aca973fb308.png">
