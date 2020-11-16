
# SlowFood Challenge



The objective was to create an online platform for a restaurant to accept online orders and save them to [API backend](https://slowfood-api-aug-2020-team-2.herokuapp.com/)


Features
* User registration/login
* Adding items to order
* Preview order 
* Save the order to backend
* Show confirmation message



## Authors:

[Mauro Avellaneda](https://github.com/mauroavellaneda)
[Emiliano Mainero](https://github.com/emiliano-ma)
[Johan Berglund](https://github.com/johanperjulius1)
[Sebastian Niewiadomski](https://github.com/SebastianN97)



## Clone:

To run this app locally, you need to clone both this and the [API](https://github.com/mauroavellaneda/slowfood-api-aug-2020-team-2.git) and follow the instructions there. When the API is running, run `$ yarn start` and visit http://localhost:3001.

## Testing:

The application was developed with a test driven approach  using [Cypress](https://cypress.io). To run the tests locally, run `$ yarn cy:open` which executes commands for both starting the local server and Cypress.Having the API running is not necessary for this, since the tests use mock data.

## Styling:

Styling was done with the help of [Semantic UI for React](https://react.semantic-ui.com/)

## Additional dependencies used:

In addition to the packages already mentioned, we used:
* [axios](https://github.com/axios/axios#readme) for making HTTP calls
* [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom#readme) for routing
