import React, { useState, useEffect, useContext } from 'react';
import { Animated, View, Text, Modal, Image, TouchableOpacity } from 'react-native';

import API from '../services/api/service';
import img_loaderCat from '../assets/gif/loader_cat.gif';
import { LoaderContext } from '../context/LoaderContext';
import modalStyles from '../css/modal'
import { useTranslation } from 'react-i18next';


// ================================================================================
// @Loader
// ================================================================================
// @description
// Component that displays a loader
// ================================================================================
// @params
// none
// ================================================================================
// @return
// none
// ================================================================================
// @errors
// none
// ================================================================================
const Loader = () => {
  const { t, i18n } = useTranslation();
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [loadingText, setLoadingText] = useState(t('loaderLoading'));
  const [scale] = useState(new Animated.Value(0.5));
  const [opacity] = useState(new Animated.Value(0.5));

//======================================================================================================================
// USE EFFECT
//======================================================================================================================

useEffect(() => {
  isLoading
  ? document.addEventListener('keydown', handleKeyDown)
  : document.removeEventListener('keydown', handleKeyDown)

  if (isLoading) {
    openLoader();

    // Animate the loading text
    const intervalId = setInterval(() => {
      setLoadingText((text) => {
        if (text.endsWith("...")) {
          return t('loaderLoading');
        } else {
          return text + ".";
        }
      });
    }, 500);

    return (() => {
      clearInterval(intervalId);
    });
  } else {
    closeLoader();
  }
}, [isLoading]);

//======================================================================================================================
// EVENTS
//======================================================================================================================

  function handleKeyDown(event) { (event.key === 'Escape') ? pressOut() : null; }

  const pressOut = () => {
    if (API().canAbort) {
      API().cancelRequest();
      setIsLoading(false);
    }
  }

//======================================================================================================================
// METHODS
//======================================================================================================================

  const openLoader = () => {
    setDate(new Date());
    setModalVisible(true);
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          bounciness: 10,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  const closeLoader = async () => {
    // wait at least 500ms before closing the loader to avoid flickering
    const diff = new Date() - date;
    if (diff < 500) { await new Promise(resolve => setTimeout(resolve, 500 - diff)); }

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start(() => { setModalVisible(false); });
  };

//======================================================================================================================
// RENDER
//======================================================================================================================

  return (
    <Modal visible={modalVisible} transparent={true}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPressOut={() => { pressOut(); }}
        style={{width: '100%', height: '100%'}}
      >
        <Animated.View style={modalStyles({ transform: [{ scale: scale }], opacity: opacity}).animationLoader}>
          <View style={modalStyles({height: '50px', margin: 'auto', width: '50px'}).modalContainer}>
            <Image
              source={img_loaderCat}
              style={modalStyles().loaderImage}
              />
            <Text>{loadingText}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};


export default Loader;
