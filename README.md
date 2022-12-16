[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/rn-classes)

![npm](https://img.shields.io/npm/v/rn-classes)

![npm](https://img.shields.io/npm/dt/rn-classes)

![GitHub last commit](https://img.shields.io/github/last-commit/paoloricciuti/rn-classes)

# rn-classes

Utility function that takes an object as input and let you merge different properties into a single object with a class-like definition. It's meant to be used as a quick way to style your react native component.

# Installation

You can install it with your package manager of choiche like this.

```shell
npm i rn-classes
```
```shell
yarn add rn-classes
```
```shell
pnpm i rn-classes
```

# Usage

```tsx
import { StyleSheet, Text, View } from "react-native";
import { createStyles } from "rn-classes";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    borderWidth: 1,
    borderColor: "blue",
  },
  selected: {
    borderColor: "red",
  }
});

const classes = createStyles(styles);

export function Test() {
  return (
      <View style={classes("container")}>
          <Text style={classes("item selected")}>Selected item</Text>
          <Text style={classes("item")}>Item</Text>
      </View>
    </>
  );
}
```

You can pass to the `classes` function everything you could pass to [clsx](https://github.com/lukeed/clsx) so, straight from their documentation

```js
import clsx from 'clsx';
// or
import { clsx } from 'clsx';

// Strings (variadic)
clsx('foo', true && 'bar', 'baz');
//=> 'foo bar baz'

// Objects
clsx({ foo:true, bar:false, baz:isTrue() });
//=> 'foo baz'

// Objects (variadic)
clsx({ foo:true }, { bar:false }, null, { '--foobar':'hello' });
//=> 'foo --foobar'

// Arrays
clsx(['foo', 0, false, 'bar']);
//=> 'foo bar'

// Arrays (variadic)
clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
clsx('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya');
//=> 'foo bar hello world cya'
```

What you will get back is an object that you can pass to the style tag of a react native component.

# Why not use [insert package name here]?

There are already countless packages that do a similar thing but they either are not typed very well (with `rn-classes` you get very good autocomplete based on the shape of your styles) or they don't actually provide a "cascade-like" experience like we have in regoular CSS.

In `rn-classes` infact if a "class" is declared after another it will have precedence.

For example let's say that you have your styles declared as such

```ts
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    borderWidth: 1,
    borderColor: "blue",
  },
  selected: {
    borderColor: "red",
  }
});
```

adding the class `classes("item selected")` or the class `classes("selected item")` will produce the same

```ts
{
    borderWidth: 1,
    borderColor: "red",
}
```