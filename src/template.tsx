import React  from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from './TouchableOpacity';

export const styled = (Component: React.ComponentType) => (styles: any) => {
    return (props: any) => <Component {...props} style={styles} />;
};


export const Module = () => {
    return (
        <TouchableOpacity>
            <Comp1 text={TextType.Simple} />
            <Comp2 text={TextType.Simple} />
            <Comp3 text={TextType.Simple} />
            <Comp4 text={TextType.Simple} />
            <Comp5 text={TextType.Simple} />
        </TouchableOpacity>
    );
};

enum TextType {
    Simple = 1,
}


const Comp1 = ({text }: { text: TextType }) => {
    return <Text>{text}</Text>;
};

const Comp2 = ({text}: { text: TextType }) => {
    return <Text>{text}</Text>;
};

const Comp3 = ({text}: { text: TextType }) => {
    return <Text>{text}</Text>;
};

const Comp4 = ({text}: { text: TextType }) => {
    return <Text>{text}</Text>;
};

const Comp5 = ({text}: { text: TextType }) => {
    return <Text>{text}</Text>;
};
