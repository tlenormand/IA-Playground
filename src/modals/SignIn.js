import React, { useState, useContext  } from 'react';
import { View, Text, Button } from 'react-native';
import TextInput from '../components/customs/TextInput';
import styles from '../css/modal';
// import Loader from './Loader';
import API from '../services/api/service';
import { LoaderContext } from '../context/LoaderContext';
import useEffectDidMount from '../custom/hooks';
import _Modal from './_Modal'
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';


const SignIn = (props) => {

//======================================================================================================================
// STATE
//======================================================================================================================
  const { t, i18n } = useTranslation();
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const { setCookie } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [signIn, setSignIn] = useState({
    email: '',
    password: ''
  });

//======================================================================================================================
// USE EFFECT
//======================================================================================================================

useEffectDidMount(() => {
  props.onCloseModal();
  if (props.visible) {
    setModalVisible(props.visible);
  }
}, [props.visible]);

//======================================================================================================================
// EVENTS
//======================================================================================================================

  const onValidModal = () => { pressSignIn(); }
  const onCloseModal = () => {
    setSignIn({ ...signIn, password: '' });
    setModalVisible(false);
  }
  const onKeyPress = (event) => {
    if (event.key === 'Enter') { onValidModal(); }
    if (event.key === 'Escape') { onCloseModal(); }
  }

  const onPressSignIn = () => { pressSignIn(); }

//======================================================================================================================
// FUNCTIONS
//======================================================================================================================

  const pressSignIn = async () => {
    setIsLoading(true);
    const data = signIn;

    data.email ? data.email = data.email : null;
    data.password ? data.password = data.password : null;

    // wait 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // sign in
    try {
      const response = await API().post(`/logIn`, data);

      // if 409, email already exists
      if (response && response.data) {
        setCookie('user', response.data, { path: '/' });
      }

      console.log('response: ', response)

      if (response && response.success === true) {
        setModalVisible(false);
        onCloseModal();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

//======================================================================================================================
// RENDER
//======================================================================================================================

  return (
    <>
      {/* <Loader isLoading={isLoading} style={{flex: 1, alignItem: 'center', justifyContent: 'center', zIndex: 999}} /> */}

      <_Modal visible={modalVisible}>
        <Text style={styles().modalTitle}>SignIn</Text>

        <form>
          <TextInput
            label={t('signInEmailLabel')}
            placeholder={t('signInEmailPlaceholder')}
            value={ signIn.email }
            onChangeText={(email) => { setSignIn({ ...signIn, email: email }); }}
            onKeyPress={(event) => { onKeyPress(event); }}
            autoFocus={true}
            mode="flat"
            />
          <TextInput
            label={t('signInPasswordLabel')}
            placeholder={t('signInPasswordPlaceholder')}
            value={ signIn.password }
            secureTextEntry={true}
            onChangeText={(password) => { setSignIn({ ...signIn, password: password }); }}
            onKeyPress={(event) => { onKeyPress(event); }}
            mode="flat"
            />
        </form>

        <View style={styles().buttonContainer}>
          <Button
            title={t('commonClose')}
            onPress={() => { onCloseModal(); }}
            />
          <Button
            title={t('commonValidate')}
            onPress={() => { onPressSignIn(); }}
            />
        </View>
      </_Modal>
    </>
  );
}


export default SignIn;
