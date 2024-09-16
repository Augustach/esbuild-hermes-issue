This is an example project to demonstrate the issue with esbuild and Hermes-compiled code. Due to certain esbuild optimizations, Hermes generates more bytecode compared to the standard Metro bundle.

It hepens for me with the folowing case:
I use `styled-components` and `react-native-gesture-handler` and found that then more I have `react-native-gesture-handler` components wrapped into `styled` the more my hermes output bundle.


It seems the problem not in the `styled-components` and `react-native-gesture-handler` themself but more `esbuild` and `hermes`.
The problem can be boiled down to the following code:


```ts
// TouchableOpacity.tsx
let Reanimated;

try {
    Reanimated = require('react-native-reanimated');
}  catch (e) {
    Reanimated = undefined;
}

export const TouchableOpacity = ({ children }) => {
    Reanimated.useSharedValue(0);
    return children;
};

// index.tsx
const { TouchableOpacity } from './TouchableOpacity'

const styled = (Component: React.ComponentType) => (styles: any) => {
    return (props: any) => <Component {...props} style={styles} />;
};

// input
const Comp = styled(View)``;

// output
// var _a;
// const Comp = styled(View)(_a || (_a = null));
```

It seems that the combination of `_a || (_a = null)` and ([this part](https://github.com/software-mansion/react-native-gesture-handler/blob/a64f74a30142284d67218efb393a7c6e5acae55c/src/handlers/gestures/reanimatedWrapper.ts#L33) in the `react-native-gesture-handler` lib ) are contributing to the large bundle size.

# How to reproduce

1.	Run the script `yarn copy-modules`. This will generate 1000 copies of the `./src/modules/index.tsx` file.
2.	Run `ESBUILD=true  yarn build` to create the esbuild bundle.
3.	Check the size of the `./output/index.android.bundle.hrs` Hermes bundle.
4. Run `ESBUILD=true yarn build` to create the metro bundle.
5.	Check the size of the `./output/index.android.bundle.hrs` Hermes bundle.

**Expected Result (ER)**: The size of the esbuild bundle should be less than or equal to the size of the Metro bundle.

**Actual Result (AR)**: The size of the esbuild bundle (~2.7MB) is much larger than the bundle (~1.3MB) produced by Metro.
