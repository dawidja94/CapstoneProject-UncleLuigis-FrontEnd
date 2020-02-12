// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


function FeedTab() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={"md-keypad"} size={20} color={"blue"} />
            <Text>Feed Tab here!</Text>
        </View>
    );
}

function MainTab() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Main Tab here!</Text>
        </View>
    );
}

function AboutTab() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>About Tab here!</Text>
        </View>
    );
}

function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        console.log(route);

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

function DetailsScreen({navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title={"This is some other screen?"} onPress={() => navigation.navigate('Settings')}/>
      </View>
    );
}

function SettingsScreen({navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
        <Button title={"This is some other, other screen?"} onPress={() => navigation.navigate('Details')}/>
      </View>
    );
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
