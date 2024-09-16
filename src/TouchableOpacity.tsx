// This file generates a flow inside the react-native-gesture-handler package

// https://github.com/software-mansion/react-native-gesture-handler/blob/2.19.0/src/index.ts#L165
// -> ...
// -> https://github.com/software-mansion/react-native-gesture-handler/blob/a64f74a30142284d67218efb393a7c6e5acae55c/src/handlers/gestures/reanimatedWrapper.ts#L33

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
