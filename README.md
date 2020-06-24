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
    import React from 'react';
    import App from './App';
    import { Provider, getStore, useStore } from 'react-neat'; // 引入

    // actions用来操作状态库中的state，同是它支持异步操作。
    const actions = {
      increment(state) {
        return { count: state.count + 1 };
      },
      async decrement(state) {
        return { count: state.count - 1 };
      },
    };

    export default function Index() {
      const userStore = getStore('user', actions); // 创建user store
      const storeReducer = useStore(userStore, { count: 0, name: 'my name' }); // 获取StoreReducer，它是操作store的核心

      return (
        {/* 通过Provider组件将storeReducer注入到根组件中，同时你还需要将userStore注入进去。 */}
        <Provider value={storeReducer} store={userStore}>
          <App></App>
        </Provider>
      );
    }
  ```

- **消费 store：**

  ```tsx
  //Login.tsx
  import React from "react";
  import { getStore, useStoreContext } from "react-neat"; // 引入

  export default function Login() {
    const { state, actions } = useStoreContext<any, any>(getStore("user")); // 获取userStore的StoreReducer，它提供了state以及actions用户获取以及操作状态。

    return (
      <section>
        <h2>login page</h2>
        <p>
          count: {state.count}, name: {state.name}
        </p>
        <button onClick={() => actions.increment()}>increment</button>
        <button onClick={() => actions.decrement()}>decrement</button>
      </section>
    );
  }
  ```

## 执照

[MIT](./LICENSE)
Copyright (c) 2019-present, code_xia
