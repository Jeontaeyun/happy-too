# Happy Too Login Task - Front

## 01. 리액트 네이티브

### (01) 리액트 네이티브란?

- React를 기반으로 웹 컴포넌트 대신에 네이티브 컴포넌트를 사용하여 IOS, 안드로이드 등에서 사용될 수 있는 모바일 어플리케이션을 제작하도록 도와주는 프레임워크이다.

- JSX, state, props, Component 등 대부분의 React 컨셉을 사용할 수 있으며, 안드로이드와 IOS에서 제공하는 네이티브 컴포넌트를 사용한다는 점에서 차별점을 둔다.

- ``` sudo npm i -g expo-cli ``` 를 통해서 Expo를 설치한다.

- ``` expo init $projectName ``` 을 통해서 리액트 네이티브 프로젝트를 생성한다.

### (02) 리액트 네이티브 기본 문법

```javascript

import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

```

와 같이 리액트의 문법을 따르지만, 리액트 네이티브 라이브러리의 컴포넌트를 따로 사용해야 한다.

