# Deel Frontend Test - Part 2 - Questions


### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

The main difference between them is how they handle updates and comparisons of props and the state to determine if the component should be re-rendered.

The component itself is the basis for creating components in react and is re-rendered when its props or state changes.

The PureComponent performs a superficial comparison between the old and new props and states and if there are no changes, the component is not rendered again, avoiding unnecessary renderings. The PureComponent allows for a streamlined way of handling updates but care must be taken in its use as it can generate results that we don't expect.

#### Give an example where it might break my app.

For example, PureComponent could break my application if I use data structures such as arrays or objects, or for example wait for a response from an API to update a state, since the component is not re-rendered because it only does a superficial comparison. So it always shows outdated data.

```
  // Example with the problem using an array

  import React, { PureComponent } from 'react'

  class ExampleWithProblem extends PureComponent {
    render() {
      const { items } = this.props

      return (
        <div>
          {items.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        <div>
      )
    }
  }

```

To fix this problem I use `shouldComponentUpdate` to check if the props have changed and thus perform the component update process (if it is the case). In this way, I guarantee that the data is always updated and is seen correctly by users.

```
  // Example of how it would be solved with shouldComponentUpdate
  import React, { PureComponent } from 'react'

  class ExampleWithSolution extends PureComponent {
  shouldComponentUpdate(nextProps) {
    // Only rerender if the list of items has changed
    return nextProps.items !== this.props.items
  }

  render() {
    const { items } = this.props

    return (
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    )
  }
}
```

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

First I want to mention that `Context` is a way to create a shareable state that components can access without needing to pass props at each level. If the parent uses a Context the children can access it, so if the parent updates the data in the Context the child components should also update the representation of that data.

In this way, I wanted to make this clear since there lies a possible risk if `shouldComponentUpdate` is used since it allows us to control when a component should be updated, if `shouldComponentUpdate` doesn't take into account the `Context` it could never update the data of the child component when a change in context.

In this way, it must be guaranteed that the `shouldComponentUpdate`of the child component validates whether the context changed to update the component.


### 3. Describe 3 ways to pass information from a component to its PARENT.

  1. **The first would be sending callbacks as a prop:** In this case, in the Parent component I can create a function and pass it as a Prop to the child component. Then in the child component I can call the function and send any necessary data to the parent.

  ```
    // Example: Parent

      import React, { useState } from 'react'
      import ChildComponent from './ChildComponent'

      const Parent = () => {
        const [data, setData] = useState<string>('')

        const handleData = (newData) => {
          setData(newData)
        }

        return (
          <div>
            <ChildComponent onUpdate={handleData} />
            <p>Child data: {data}</p>
          </div>
        )
      }

      export default Parent
  ```

  ```
    // Example: Child

    import React from 'react'

    interface ChildProps {
      onUpdate: (data: string) => void;
    }

    const ChildComponent = (props: ChildProps) => {
      const sendData = () => {
        const data = '¡I’m your child!'
        props.onUpdate(data)
      }

      return (
        <button onClick={sendData}>Send Data to Parent</button>
      )
    }

    export default ChildComponent
  ```

   2. **Using Context:** As I mentioned earlier Context allows you to have a state from the parent component that child components can access without needing to send props up multiple levels. This way it would be similar to the previous one but using Context where the parent can have a callback in the context and the child can access through the context to this data or to this callback specifically and send the data to the parent.

   3. **Using Redux or another state management library.** With Redux we can create a global application state that all components can access. Status can be updated from anywhere in the app. In this way, the child component can send an action to update the Store, and the parent component that is also connected to the Store can receive the updated data and reactions or do the corresponding action with that data. I recommend Redux in complex applications with nested components or between components that are not directly related.

### 4. Give 2 ways to prevent components from re-rendering.

**In Class components**, as I have discussed in previous points, we could use `shouldComponentUpdate` and thus avoid re-rendering and only update the component when necessary.

In **functional components** we can use:

  1. **React.Memo()/React.useMemo():** Allows us to cache an expensive computed value that doesn't need to be recalculated on every render. It can also be used in functional components that perform expensive calculations based on their props, thus improving performance by preventing the component from recalculating or re-rendering if the props don't change.

  2. **React.useCallback():** Allows us to cache functions and prevent them from being created again on each render. Here it must be taken into account that it is called according to the change of its dependencies, if the dependencies or props do not change it is not called and the function will remain the same and the child components are not rendered again due to changes within the function. This greatly improves performance.

  ```
    // Example
    import React, { useState, useCallback, useMemo } from 'react'

    const ExampleComponent = () => {
      const [count, setCount] = useState(0)
      const [inputValue, setInputValue] = useState('')

      // Using useCallback to memoize the incrementCount function
      const incrementCount = useCallback(() => {
        setCount((prevCount) => prevCount + 1)
      }, [])

      // Using useMemo to memoize the result of the expensive calculation
      const expensiveResult = useMemo(() => {
        // Simulating an expensive calculation based on the 'inputValue' and 'count' state
        return inputValue.length + count
      }, [inputValue, count])

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={incrementCount}>Increment</button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p>Expensive Result: {expensiveResult}</p>
        </div>
      )
    }

    export default ExampleComponent
  ```

  For this example with `useCallback`, I ensure that `incrementCount` will keep the same reference unless the component state changes and using `useMemo` I memorize the result of an expensive calculation based on the `inputValue` and `count` state. And by updating the `useMemo` we prevent the expensive computation from being done on every render of the component and it will only be executed again when the `inputValue` or `count` dependencies change.

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment allows us to bundle multiple nodes or children together without adding an additional DOM element or HTML node. They were implemented in version 16 to avoid the many elements in the DOM that were not needed. We can use `<> </>` u literally like `<Fragment> </Fragment>`, but I prefer the first.

```
  // Example

  import React from 'react'

  const FragmentComponentExample = () => {
    return (
      <>
        <h1>Hi</h1>
        <p>Fragment Example</p>
      </>
    )
  }

  export default FragmentComponentExample
```

#### Give an example where it might break my app.

In a project in the past it happened to us that when we had 2 states within a fragment they were not updated correctly if one changed and researching I found out that the fragments do not share states, they are independent so that may be an answer to a case in which it could damage the App. And for this reason, grouping several states in the same fragment should be avoided.

```
  // Example

  import React, { useState, useCallback } from 'react'

  const FragmentComponentExample = () => {
  const [count, setCount] = useState<number>(0)
  const [name, setName] = useState<string>('')

  const handleIncrement = useCallback(() => {
      setCount((prevCount) => prevCount + 1)
    }, [])

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    }, [])

    return (
      <>
        <div>Count: {count}</div>
        <input type="text" value={text} onChange={handleNameChange} />
        <button onClick={handleIncrement}>Increment</button>
      </>
    )
  }

  export default FragmentComponentExample
```


### 6. Give 3 examples of the HOC pattern.

First of all, the HOC pattern is essentially a function that receives a component and returns the component with some additional functionalities, it's like a wrapper that doesn't modify the original component but rather adds functionalities to it and therefore allows us to reuse logic or functionalities that were required for some components. It's a good way to reuse.

  1. In the projects that I have worked on, I have used more than all the authentication HOC (`withAuthentication`) that uses it to restrict access to components if the user didn't have a valid session, that is, if he was not authenticated. This would be the first example.

  2. The second one I've used is `withStyling` which is used to add additional styles or classes to a component. It would be the second example.

  3. Example number three would be for error handling, it is very important to have default states or a secondary component to prevent my application from breaking, so I have used `withErrorBoundary` and it would be example three.

  4. We can also customize functionality with `withCustomFunctionality`, where for example you use it once to add a user tracking functionality or even Analytics functionality.


### 7. What's the difference in handling exceptions in promises, callbacks and async...await?

The differences lie in the approach and syntax used in each of the methods:

  1. **Promises:** It's used in asynchronous operations and is a value that can be available at any time or never arrive. It's handled with the then (successful case) and catch (error case) methods:

    ```
      // Example

      fetch('https://deel.example.com/data')
        .then(response => response.json())
        .then(data => {
          // Work with the received data
        })
        .catch(error => {
          // Handle the error if it occurs
          console.error('Error fetching data:', error)
        })
    ```

  2. **Callbacks:** They are used as arguments to other functions and are executed, for example, after asynchronous operations or events, etc. For error handling, the first argument is set to be the error (if any) and the second is the result.

  ```
    // Example

    const fetchData = (callback: (error: Error | null, data: any) => void) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      const data = {}
      const error = null
      callback(error, data)
      }, 500)
    }

    fetchData((error, data) => {
      if (error) {
        console.error('Error fetching data:', error.message)
      } else {
        // Work with the received data
      }
    })
  ```

  3. **async/await:** It's the way I work the most with asynchronous operations. Here we use try/catch to handle errors, and we use the await operator to wait for the result of a promise.

  ```
    // Example

    async function fetchData() {
      try {
        const response = await fetch('https:/deel.example.com/data')
        const data = await response.json()
        // Work with the received data
      } catch (error) {
        // Error
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()
  ```

### 8. How many arguments does setState take and why is it async.

There are `2 arguments`. The first is the new state that you want to update and the second is an optional callback that is executed after the state has been updated.

`setState` is asynchronous and this is to optimize performance and avoid re-renders. It is also processed in batches. Automatic batching was included in React 18 which allows all state updates to be batched, even within promises, set timeouts, and event callbacks. This generates great performance and radically improves performance as the rendering process is optimized.

```
  // Example

  setName(“Jona”, () => {
    // This callback will be executed after the state is updated and the component has re-rendered
    console.log('New name is: ', name)
  })
```

### 9. List the steps needed to migrate a Class to Function Component.

  1. Make sure you are using a version of React greater than 16.8.0 which was from the point where Hooks are supported.
  2. Remove the classes and their methods, for example, remove extends React.Component, constructor, and lifecycle methods, this.state, this in general, the render, etc.
  3. Create a function component with the same class name.
  4. Import the `useState` and `useEffect` hooks.
  5. Use the useState and useEffect hooks in the function component to handle state (`useState`) and lifecycle (`useEffect`).
  6. If you use Context or Refs you must update to `useContext` and `useRef`.
  7. Make sure to include the return that will `return` the react component.
  8. Update the code to use the function component instead of the class.
  9. Verify that the dependencies or third-party libraries continue to work, otherwise, you must find an equivalent that works in the updated version of react that supports Hooks.
  10. Remove unneeded dependencies and clean up the code.
  11. Verifying the operation of the component with tests.

  ```
    // Example with implemented steps of a basic case that includes states and life-cycle.

    // Original class
    class ClassComponentExample extends React.Component {
      constructor(props: Props) {
        super(props)
        this.state = {
          count: 0,
        }
      }

      componentDidMount() {
        this.timer = setInterval(() => {
          this.setState({
            count: this.state.count + 1,
          })
        }, 300)
      }

      componentWillUnmount() {
        clearInterval(this.timer)
      }

      render() {
        return (
          <div>
            The count is: {this.state.count}
          </div>
        )
      }
    }

    // ----------- Migration Process ----------

    // Functional component with Hooks
    const FunctionComponentExample = () => {
      const [count, setCount] = useState(0)

      useEffect(() => {
        const timer = setInterval(() => {
          setCount(count + 1)
        }, 300)

        return () => {
          clearInterval(timer)
        }
      }, [])

      return (
        <div>
          The count is: {count}
        </div>
      )
    }
  ```

### 10. List a few ways styles can be used with components.

  - Personally I really like to use `Styled Components (CSS-in-JS)` and in my case I use Emotion a lot.

  ```
    // Example

    import React from 'react'
    import styled from '@emotion/styled'

    const Container = styled.div`
      padding: 20px;
    `

    const StyledHeading = styled.h2`
      font-size: 24px;
      color: #333;
      margin-bottom: 20px;
    `

    const MyComponent = () => {
      return (
        <Container>
          <StyledHeading>¡Example with Emotion!</StyledHeading>
        </Container>
      )
    }

    export default MyComponent
  ```

  - `CSS modules`: It's a way of creating reusable styles that are encapsulated in a component. They must be used with `className`.
  - `Style Library`: A library such as Bootstrap, or Material-UI can be used to apply predefined styles and stylized components.
  - `Inline Styles`: Styles can be added directly to the HTML with the style attribute.
  - `CSS preprocessors` can be configured to create styles with SASS etc and then apply them to components.


### 11. How to render an HTML string coming from the server.

The most recommended is to use a library that allows you to render HTML safely, such as `react-html-parser`.

```
  // Example
  const parsedHtml = reactHtmlParser(htmlString)
```

Also using some libraries that offer `RichText tools` like these according to needs, for example, if Prismic is used as `CMS` it offers a tool to process RichText.

The least recommended because it's very insecure is `dangerouslySetInnerHTML` which allows rendering HTML, but it is not recommended because it is possible to inject malicious code.

```
  // Example
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  )
```

