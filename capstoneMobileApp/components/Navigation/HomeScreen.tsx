import React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

/**
 * @function HomeScreen
 * 
 * @description This returns and creates the main Home Screen with the custom tabs on the bottom of the screen.
 * @param param0 
 */
export default function HomeScreen ({ navigation }): any {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
    
            if (route.name === 'Feed') {
            iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } 
            else if (route.name === 'Main') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            else if (route.name === "Profile") {
            iconName = focused ? 'md-keypad' : 'md-key'
            }
    
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
        },
        })}
        tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        }}>
            <Tab.Screen name="Feed" component={FeedTab}></Tab.Screen>
            <Tab.Screen name="Main" component={MainTab}></Tab.Screen>
            <Tab.Screen name="Profile" component={AboutTab}></Tab.Screen>
        </Tab.Navigator>
    );
}

// These functions below create the associated screens that correlate to the custom tabs on the bottom of the HomeScreen.
function FeedTab() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={"md-keypad"} size={20} color={"blue"} />
            <Text>Feed Tab here! 2</Text>
        </View>
    );
}

function MainTab({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Main Tab here! 2</Text>
            <Button title="Press To Log Out" onPress={() => navigation.navigate("SignIn")}/>
        </View>
    );
}

function AboutTab() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>About Tab here! 2</Text>
        </View>
    );
}

function btnPress({navigation}) {
    navigation.navigate("SignIn")
}