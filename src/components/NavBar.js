'use strict';

import React, { useState, useRef, useEffect, useContext } from 'react';
import { TouchableOpacity, TouchableHighlight, StyleSheet, View, Text, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../views/_screens';
import { AuthContext } from '../context/AuthContext';
import checkAuthAndNavigate from '../utils/checkAuthAndNavigate';


export default function NavBar() {
  const { isAuth } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isSubMenuDeployed, setIsSubMenuDeployed] = useState(false);
  const subMenuHeight = 200; // adjust this to the height of your submenu

  const subMenuHeightRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(subMenuHeightRef.current, {
      toValue: subMenuHeight,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [subMenuHeight]);
  
  const toggleSubMenu = () => {
    if (isSubMenuDeployed) {
      Animated.timing(subMenuHeightRef.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setIsSubMenuDeployed(false));
    } else {
      setIsSubMenuDeployed(true);
      Animated.timing(subMenuHeightRef.current, {
        toValue: subMenuHeight,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const onPressSubMenu = (screenName) => {
    setIsSubMenuDeployed(false);
    PressNavigate(screenName)
  }

  const onPressNavigate = (screenName) => { PressNavigate(screenName) };

  const PressNavigate = (screenName) => {
    const successNav = checkAuthAndNavigate(navigation, screenName, isAuth);

    if (!successNav) {
      // display popup
      Alert.alert(
        'Non authentifié',
        'Vous devez être authentifié pour accéder à cette fonctionnalité.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'default',
          },
          // Ajoutez d'autres options selon vos besoins
        ],
        { cancelable: false }
      );
    }
  };
  
  return (
    <View style={ styles.NavBar }>
      <TouchableOpacity
        onPress={() => onPressNavigate(screens.Profile.name)}
      >
        <screens.Profile.options.logo />
      </TouchableOpacity>
  
      <TouchableOpacity onPress={toggleSubMenu}>
        <screens.Settings.options.logo/>
      </TouchableOpacity>
  
      {isSubMenuDeployed && (
        <Animated.View style={[styles.menu, styles.menuItem, {height: subMenuHeightRef.current}]}>
          <TouchableOpacity onPress={() => onPressSubMenu(screens.Atari.name)}>
            <View style={styles.subMenuItem}>
              <Text style={styles.subMenuText}>{screens.Atari.options.title}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressSubMenu(screens.MyModels.name)}>
            <View style={styles.subMenuItem}>
              <Text style={styles.subMenuText}>{screens.MyModels.options.title}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressSubMenu(screens.Submenu2.name)}>
            <View style={styles.subMenuItem}>
              <Text style={styles.subMenuText}>{screens.Submenu2.options.title}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  NavBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    columnGap: '20px',
    padding: '20px',
    opacity: 1,
  },
  menu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    height: '500px',
    // padding: '10px',
    borderRadius: 5,
    borderTopRightRadius: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // semi-transparent white color
    zIndex: 1,
  },
  menuItem: {
    paddingBottom: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
    height: 'auto',
  },
  subMenuText: {
    fontSize: 20,
  },
  subMenuItem: {
    padding: '15px',
    backgroundColor: 'rgba(237, 231, 225,0.8)', // semi-transparent white color
    borderRadius: 5,
    marginVertical: '2px',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
