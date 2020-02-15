// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, AsyncStorage, TouchableHighlightBase, Image, TextInput, TouchableHighlightComponent } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './components/Navigation/HomeScreen';


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
class SignIn extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      token: ""
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userlogin').then((value) => {
      console.log(value)
      this.setState({
        token: value
      });
    });
  }

  render() {
    if (this.state.token !== "" && this.state.token !== null && this.state.token !== undefined) {
      this.props.navigation.navigate('Main');
    }
    else {
      return (
        <View style={{justifyContent: "center", alignItems: "center", paddingTop: 50}}>
          <Image source={require('./restaurantlogo250px.png')} style={{}}/>
          <Text>{"\n"}</Text>
          <TextInput secureTextEntry={false} placeholder="Username" style={{fontSize: 35, borderBottomColor: "#CD212A", borderBottomWidth: 2, marginBottom: 10, minWidth: '80%'}}/>
          <TextInput secureTextEntry={true} placeholder="Password" style={{fontSize: 35, borderBottomColor: "#CD212A", borderBottomWidth: 2, marginBottom: 10, minWidth: '80%'}}/>
          <Text style={{color: "blue"}}>{"\n"}New User?{"\n"}</Text>
          <Button title="Submit Login" onPress={this.handleBtnPress} color="#CD212A"/>
        </View>
      );
    }
  }

  private handleBtnPress = (): void => {
    this.props.navigation.navigate("NormalSignedIn");
  }
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppContainer = 
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
</NavigationContainer>;

function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 100 }}
      source={require('./restaurantlogo100px.png')}
    />
  );
}

function HambugerButton() {
  return <Ionicons name="md-menu" size={35} style={{paddingLeft: 15}} onPress={() => {}}/>
}

// function App() {
//   return (
//     <NavigationContainer> 
//     <Stack.Navigator screenOptions={{headerLeft: HambugerButton}}>
//       <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: true}}/>
//       <Stack.Screen name="NormalSignedIn" component={NormalSignedIn} />
//     </Stack.Navigator>
//   </NavigationContainer>
//   );
// }

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  HambugerButton() {
    return <Ionicons name="md-key" size={35} color="white" onPress={this.handleToggle()} />
  }

  handleToggle = (): void => {
    console.log("What the heck");
    console.log(this.props.navigation);
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <NavigationContainer> 
      <Stack.Navigator screenOptions={{headerLeft: HambugerButton, headerRight: null, headerTitle: "Uncle Luigi's Bistro", headerTitleStyle: {color: "white", textTransform: "uppercase", alignSelf: "center", textAlign: "center", flex: 1,}, headerStyle: {backgroundColor: "#008C45"}}}>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: true}}/>
        <Stack.Screen name="NormalSignedIn" component={NormalSignedIn} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

function NormalSignedIn() {
  return (
      <Drawer.Navigator drawerStyle={{backgroundColor: "#F4F5F0"}} drawerContentOptions={{activeBackgroundColor: "#CD212A", inactiveTintColor: "black", activeTintColor: "white"}}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
  );
}

export default App;
