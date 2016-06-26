# [redux-container-state-globalsaga](https://github.com/HansDP/redux-container-state-globalsaga)

Integrates redux-saga with redux-container-state. With this package, you can create sagas that have access to both local container state and global redux store-state.

This package encapsulates `redux-saga` into a dedicated redux store enhancer. Once installed, all features available in redux-saga become available as well.

## Example usage

##### Apply middleware on your store

```javascript
...
import { applyMiddleware, createStore, compose } from 'redux'
import { containerStateMiddleware } from 'redux-container-state'
import { sagaStoreEnhancer } from 'redux-container-state-globalsaga'

...
const storeFactory = compose(
  applyMiddleware(containerStateMiddleware()),
  sagaStoreEnhancer(),
  ...
)(createStore)
...
```

##### Use sagas in your `redux-container-state` view

```javascript
...
import { compose } from 'redux'
import { view, applyLocalMiddleware } from 'redux-container-state'
import { sagaViewEnhancer } from '../globalsaga'

import yourSaga from './sagas'

const viewWithMiddleware = compose(sagaViewEnhancer(rootSaga))(view)

export default viewWithMiddleware(({ model, dispatch }) => (
    <div style={{ width: '200px' }}>
        <button onClick={ () => dispatch({ type: 'SomeSagaTrigger' }) }>Trigger</button>
    </div>
))
...
```

## Complete example

There is a complete example available in the `examples` section of [redux-container-state](https://github.com/HansDP/redux-container-state). You can find it [here](https://github.com/HansDP/redux-container-state/tree/master/examples/globalsaga-pair-of-random-gif-viewers)

## Installation & Usage

You can install `redux-container-state-globalsaga` via npm.

```
npm install redux-container-state-globalsaga --save
```
