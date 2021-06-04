# React Neat

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/qq865738120/react-neat/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react-neat.svg?style=flat)](https://www.npmjs.com/package/react-neat)

react-neat 是一个 React Hooks 工具库，同时它也是一个轻量级的状态管理库。

## 安装

你可以选择使用 npm 或者 yarn 安装

- **使用 npm：**`npm install react-neat`
- **使用 yarn：**`yarn add react-neat`

## 快速入门

只需简单的几步就可以获得一个功能完善的状态管理库，跟这下面的步骤开始吧。

> tips：目前暂支持 hook 写法，因此需要使用>=16.8.0 的 React

- **在项目根组件中注入状态库：**

  ```tsx
  // index.tsx
  import React from "react";
  import App from "./App";
  import { Provider, getStore, useStore } from "react-neat"; // 引入

  const sleep = async t => new Promise(resolve => setTimeout(resolve, t));

  // actions用来操作状态库中的state，同是它支持异步操作。
  const actions = {
    // 同步action
    increment(state) {
      return { count: state.count + 1 };
    },
    // 异步action
    async decrement(state) {
      await sleep(2000);
      return { count: state.count - 1 };
    },
    // 传参
    setName(state, value) {
      return { name: value };
    }
  };

  export default function Index() {
    const userStore = getStore("user", actions); // 创建user store
    const storeReducer = useStore(userStore, { count: 0, name: "my name" }); // 获取StoreReducer，它是操作store的核心

    // 通过Provider组件将storeReducer注入到根组件中，同时你还需要将userStore注入进去。
    return (
      <Provider value={storeReducer} store={userStore}>
        <App></App>
      </Provider>
    );
  }
  ```

- **消费 store：**

  ```tsx
  // App.tsx
  import React from "react";
  import { getStore, useStoreContext } from "react-neat"; // 引入

  export default function App() {
    const { state, actions } = useStoreContext<any, any>(getStore("user")); // 获取userStore的StoreReducer，它提供了state以及actions用户获取以及操作状态。

    return (
      <section>
        <h2>login page</h2>
        <p>
          count: {state.count}, name: {state.name}
        </p>
        <button onClick={() => actions.increment()}>increment</button>
        <button onClick={() => actions.decrement()}>decrement</button>
        <button onClick={() => actions.setName("Bob")}>set name</button>
      </section>
    );
  }
  ```

  [点击这里](https://stackblitz.com/edit/react-neat-example?file=index.tsx)可以在线体验实例

## 进阶指南

通常我们可能需要创建多个`store`，为此提供了`Providers`组件可以方便的同时注入多个`store`。

- **在项目根组件中注入状态库：**

  ```tsx
  // index.tsx
  import React from 'react';
  import ReactDOM from "react-dom";
  import App from './App';
  import { Providers, getStore, useStore } from 'react-neat'; // 引入
  import userActions, { userInitState } from './actions/userActions'
  import bookActions, { bookInitState } from './actions/bookActions'

  export default function Index() {
    // 创建user store
    const userStore = getStore('user', userActions);
    // 创建book store
    const bookStore = getStore('book', bookActions);
    // 获取StoreReducer，它是操作store的核心
    const userStoreReducer = useStore(userStore, userInitState);
    const bookStoreReducer = useStore(bookStore, bookInitState);
  ```


    // 通过Providers组件将storeReducer注入到根组件中，同时你还需要将userStore注入。
    // 与Provider组件不同的是，Providers可以同时注入多个store。
    return (
      <Providers values={[userStoreReducer, bookStoreReducer]} stores={[userStore,bookStore]}>
        <App></App>
      </Providers>
    );

}

ReactDOM.render(<Index />, document.getElementById('root'));

````

```tsx
// actions/userActions

const sleep = async t => new Promise(resolve => setTimeout(resolve, t));

// actions用来操作状态库中的state，同是它支持异步操作。
const userActions = {
  // 同步action
  increment(state) {
    return { count: state.count + 1 };
  },
  // 异步action
  async decrement(state) {
    let count = 0;
    await sleep(2000);
    return { count: state.count - 1 };
  },
  // 传参
  setName(state, value) {
    return {name: value }
  }
};
export default userActions

// 状态初始化
export const userInitState = { count: 0, name: 'Toney' }
````

```tsx
// actions/bookActions

// actions用来操作状态库中的state，同是它支持异步操作。
const bookActions = {
  setName(state, value) {
    return { name: value };
  },
  setAuthor(state, value) {
    return { author: value };
  }
};
export default bookActions;

// 状态初始化
export const bookInitState = { name: "Natural", author: "Toney" };
```

- **消费 store：**

  ```tsx
  // App.tsx

  import React from "react";
  import { getStore, useStoreContext } from "react-neat"; // 引入

  export default function App() {
    // 获取userStore的StoreReducer，它提供了state以及actions用户获取以及操作状态。
    const userStore = useStoreContext<any, any>(getStore("user"));
    const bookStore = useStoreContext<any, any>(getStore("book"));

    return (
      <section>
        <h2>App page</h2>
        <h3>people</h3>
        <p>
          count: {userStore.state.count}, name: {userStore.state.name}
        </p>
        <button onClick={() => userStore.actions.increment()}>increment</button>
        <button onClick={() => userStore.actions.decrement()}>decrement</button>
        <button onClick={() => userStore.actions.setName("Bob")}>
          set name
        </button>

        <h3>book</h3>
        <p>
          name: {bookStore.state.name}, author: {bookStore.state.author}
        </p>
        <button
          onClick={() =>
            bookStore.actions.setName(
              "Brief History of Time: from the Big Bang to Black Holes"
            )
          }
        >
          set name
        </button>
        <button
          onClick={() => bookStore.actions.setAuthor("Stephen William Hawking")}
        >
          decrement
        </button>
      </section>
    );
  }
  ```

  [点击这里](https://stackblitz.com/edit/react-neat-example-multiple-ajwp3e?file=App.tsx)可以在线体验实例

## 执照

[MIT](./LICENSE)
Copyright (c) 2019-present, code_xia
