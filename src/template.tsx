import React  from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from './TouchableOpacity';

export const styled = (Component: React.ComponentType) => (styles: any) => {
    return (props: any) => <Component {...props} style={styles} />;
};


export const Module = () => {
    return (
        <TouchableOpacity>
            <Comp1 />
            <Comp2 />
            <Comp3 />
            <Comp4 />
            <Comp5 />
        </TouchableOpacity>
    );
};

var _a;

// incorrect
const Comp1 = styled(View)(_a || (_a = null));
const Comp2 = styled(View)(_a || (_a = null));
const Comp3 = styled(View)(_a || (_a = null));
const Comp4 = styled(View)(_a || (_a = null));
const Comp5 = styled(View)(_a || (_a = null));

// correct
// const Comp1 = styled(View)(_a || null);
// const Comp2 = styled(View)(_a || null);
// const Comp3 = styled(View)(_a || null);
// const Comp4 = styled(View)(_a || null);
// const Comp5 = styled(View)(_a || null);
