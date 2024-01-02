'use strict';

import * as React from 'react';
import { useContext } from 'react';
import { ImageBackground, View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CookiesProvider } from 'react-cookie';
import { Provider as PaperProvider } from 'react-native-paper';
import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';


//import Icon
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconIonicons from 'react-native-vector-icons/Ionicons';
// import Loader from './src/modals/Loader';

import { screens } from './src/views/_screens';
import { components } from './src/components/_components';
import { LoaderProvider } from './src/context/LoaderContext';
import { AuthProvider } from './src/context/AuthContext';
import Loader from './src/modals/Loader';
import i18n from './src/translations/i18n';


const Stack = createStackNavigator();
const randomBackgroundImage = require(`./src/assets/images/backgrounds/bg${Math.floor(Math.random() * 9) + 1}.jpg`);
// const randomBackgroundImage = require(`./src/assets/images/backgrounds/bg6.jpg`);

const darkRed = {
    "colors": {
      "primary": "rgb(255, 180, 168)",
      "onPrimary": "rgb(105, 1, 0)",
      "primaryContainer": "rgb(147, 1, 0)",
      "onPrimaryContainer": "rgb(255, 218, 212)",
      "secondary": "rgb(231, 189, 182)",
      "onSecondary": "rgb(68, 41, 37)",
      "secondaryContainer": "rgb(93, 63, 59)",
      "onSecondaryContainer": "rgb(255, 218, 212)",
      "tertiary": "rgb(222, 196, 140)",
      "onTertiary": "rgb(62, 46, 4)",
      "tertiaryContainer": "rgb(86, 68, 25)",
      "onTertiaryContainer": "rgb(251, 223, 166)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(32, 26, 25)",
      "onBackground": "rgb(237, 224, 221)",
      "surface": "rgb(32, 26, 25)",
      "onSurface": "rgb(237, 224, 221)",
      "surfaceVariant": "rgb(83, 67, 65)",
      "onSurfaceVariant": "rgb(216, 194, 190)",
      "outline": "rgb(160, 140, 137)",
      "outlineVariant": "rgb(83, 67, 65)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(237, 224, 221)",
      "inverseOnSurface": "rgb(54, 47, 46)",
      "inversePrimary": "rgb(192, 1, 0)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(43, 34, 32)",
        "level2": "rgb(50, 38, 36)",
        "level3": "rgb(57, 43, 41)",
        "level4": "rgb(59, 45, 42)",
        "level5": "rgb(63, 48, 45)"
      },
      "surfaceDisabled": "rgba(237, 224, 221, 0.12)",
      "onSurfaceDisabled": "rgba(237, 224, 221, 0.38)",
      "backdrop": "rgba(59, 45, 43, 0.4)"
    }
}

const darkTheme = {
  ...MD3DarkTheme,
  ...darkRed,
};

const combinedDarkTheme = {
  ...MD3DarkTheme,
  ...darkRed,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkRed.colors,
    background: 'transparent',
  },
};

const screensRoute = [{ key: 'Home' }, { key: 'Profile' }, { key: 'Settings' }, { key: 'Atari' }, { key: 'MyModels' }, { key: 'CreateModel' }, { key: 'Submenu2' }];

const App = () => {
  // constructor(props) {
  //   super(props);
  // }

    return (
      <>
        <ImageBackground source={randomBackgroundImage} style={styles.background} >
      {/* <PaperProvider theme={combinedDarkTheme}> */}
          <LoaderProvider>
            <CookiesProvider>
              <AuthProvider>
              <View style={{ flex: 1, overflow: 'hidden' }}>
                <NavigationContainer theme={combinedDarkTheme}>
                  <Stack.Navigator
                    initialRouteName="Home"
                  >
                    {screensRoute.map((route) => (
                      <Stack.Screen
                        name={ screens[route.key].name }
                        component={ screens[route.key].component }
                        options={{
                          // headerTitle: () => <screens.Home.options.logo />,
                          headerRight: () => <components.NavBar.component />,
                          headerStyle: styles.Header,
                          headerBackground: () => <View style={styles.backgroundHeader} />,
                        }}
                      />
                    ))}
                  </Stack.Navigator>
                </NavigationContainer>
              </View>
              </AuthProvider>
            </CookiesProvider>
            <Loader style={{zIndex: 999}}/>
          </LoaderProvider>
        </ImageBackground>
      </>
    );
}

const styles = StyleSheet.create({
  Header: {
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%"
  },
  backgroundHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // semi-transparent white color
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.1,
    // shadowColor: 'white',
  },
});

export default App;
