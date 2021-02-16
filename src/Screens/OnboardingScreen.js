/**
 * Onboarding Screen
 * 
 * First Screen in the application
 * Displays three screens that give an overview of the app
 *
 */

import * as React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

//Done button
const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 8 }}
        {...props}
        ><Text style={{ fontSize: 16 }}> Done </Text>
    </TouchableOpacity>
);

function OnboardingScreen({ navigation }) {
    return (
        <Onboarding
            DoneButtonComponent={Done}
            onSkip={() => navigation.replace("SignIn")} //If Skip button clicked go to sign in page and replace
            onDone={() => navigation.replace("SignIn")} //If Done button clicked go to sign in page and replace
            pages={[
                //First Page
                {
                    backgroundColor: '#F5AF19',
                    image: <Image
                        style={{ width: 350, height: 230, alignItems: 'center', marginTop: 10 }}
                        source={require('../../assets/burger-2.png')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                //Second Page
                {
                    backgroundColor: '#FC5976',
                    image: <Image
                        style={{ width: 250, height: 130, alignItems: 'center', marginTop: 10 }}
                        source={require('../../assets/orange-food-truck.png')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                //Third Page
                {
                    backgroundColor: '#F5AF19',
                    image: <Image
                        style={{ width: 250, height: 130, alignItems: 'center', marginTop: 10 }}
                        source={require('../../assets/orange-food-truck.png')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
            ]}
            transitionAnimationDuration={0}
        />
    );
}
export default OnboardingScreen;