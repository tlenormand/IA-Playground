import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, Animated } from 'react-native';
import modalStyles from '../css/modal'
// import { LoaderContext } from '../context/LoaderContext';
// import Loader from './Loader';
import {theme} from '../core/theme';

const _Modal = ({ visible, children, maxWidth=undefined, maxHeight=undefined }) => {
  // const { isLoading } = useContext(LoaderContext);

  const [show, setShow] = useState(visible);
  const [opacity] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(0));

  const showModal = () => {
    setShow(true);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }),
      Animated.spring(scale, {
        toValue: 1,
        tension: 20,
        friction: 8,
        useNativeDriver: false
      })
    ]).start();
  };

  const hideModal = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(scale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      })
    ]).start(() => setShow(false));
  };

  useEffect(() => {
    if (visible) {
      showModal();
    } else {
      hideModal();
    }
  }, [visible]);

  return (
    show && (
      <>
        <View transparent visible={show} onRequestClose={hideModal} style={modalStyles({}, {visible: show}).modal}>
          <View style={modalStyles({ maxWidth: maxWidth, maxHeight: maxHeight }).modalContainer}>
            <Animated.View style={[modalStyles().modalContent, { opacity, transform: [{ scale }], backgroundColor: theme.colors.elevation.level1 }]}>
              {children}
            </Animated.View>
          </View>
        </View>

        {/* <Loader isLoading={isLoading} /> */}
      </>
    )
  );
};


export default _Modal;
