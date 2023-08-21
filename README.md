# React Exercise

## Requirements and Considerations

  1. Project in React with Typescript.
  2. No 3rd party libraries were used for Autocomplete development, basic tests with React Testing Library were included.
  3. The project was structured to continue to scale, a `Components` folder was created with the components that could be reused in the future.
  4. Implemented a basic CSS at the page level to render well on mobile and desktop. Project ready for deployment to Production, doesn't require envs or other additional configurations.
  5. A folder called `api` was created where there is `countries_api` to make use of https://restcountries.com/ and there is `mock_api` that simulates an asynchronous call (REST call simulation) that returns fruits for another use case of the autocomplete.
  6. The pure components were created in their props, that is, they don't require internal dependencies to work since the data layer has been separated in the `api` folder, in this way the data is obtained from different sources to be used in the Autocomplete. In the same way, for the suggestions, there is the possibility of being rendered as highlights or of another type.
  7. 2 Autocomplete use cases were implemented, the first with the country Search API and the second simulating a Rest call with fruits. 2 different data sources.
  8. Tab navigation and selection with Enter key are included. Additionally, accessibility, SEO improvements, etc.

## Props

| Prop                  | Type                           | Default Value                       | Description                                                                                                                                                           |
|-----------------------|--------------------------------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `placeholder`         | `string`                       | Type to search...  | The placeholder text for the input field.                                                                                                                             |
| `noSuggestionsMessage`| `string`                       | No suggestions found | The message to display when there are no suggestions available.                                                                                                      |
| `debounceTime`        | `number`                       | 300 | The debounce time in milliseconds for the input, to avoid excessive API calls. Default value is 300ms.                                                               |
| `onSelect`            | `(item: T) => void`            | Required                           | A callback function to handle the selection of a suggestion. It receives the selected item as a parameter.                                                           |
| `getSuggestionValue`  | `(item: T) => string`          | Required                           | A function that extracts the display value from the suggestion item.                                                                                                 |
| `renderSuggestion`    | `(item: T, inputValue: string) => React.ReactNode` | Required | A function that renders each suggestion item. It receives the suggestion item and the current input value as parameters and should return a React node.  |
| `fetchSuggestions`    | `(value: string, signal: AbortSignal) => Promise<T[]>` | Required                          | A function that fetches suggestions based on user input. It receives the current input value as a parameter and should return a Promise of an array of suggestions. |


## How to run the project

### Required steps

#### `Node Version`

A `.nvmrc` file is included to keep it in sync with the Node version. Use it or directly use nvm to use version `v18.6.0`

#### `yarn install`

To install all the dependencies to be able to run the project and thus generate the node_modules


### In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn test`

Launches the test runner in the interactive watch mode.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
