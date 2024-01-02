import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import API from '../services/api/service';
import useEffectDidMount from '../custom/hooks';
import { LoaderContext } from '../context/LoaderContext';
import styles from '../css/modal';
import _Modal from './_Modal'
import TextInput from '../components/customs/TextInput';
import { useTranslation } from 'react-i18next';


const Register = (props) => {

//======================================================================================================================
// STATE
//======================================================================================================================
  const { t, i18n } = useTranslation();
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [register, setRegister] = useState({
    username: '',
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

  const onValidModal = () => { pressRegister(); }
  const onCloseModal = () => {
    setRegister({ ...register, password: '' });
    setModalVisible(false);
  }

  const onPressRegister = () => { pressRegister(); }

//======================================================================================================================
// METHODS
//======================================================================================================================

  const setUsername = (username) => { setRegister({ ...register, username: username }); }
  const setEmail    = (email)    => { setRegister({ ...register, email: email       }); }
  const setPassword = (password) => { setRegister({ ...register, password: password }); }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') { onValidModal(); }
    if (event.key === 'Escape') { onCloseModal(); }
  }

  useEffect(() => {
    // add event listener if isLoading is false and modal is visible
    !isLoading && modalVisible
      ? document.addEventListener('keydown', handleKeyDown)
      : document.removeEventListener('keydown', handleKeyDown)
  
    // clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isLoading]);

  const pressRegister = async () => {
    setIsLoading(true);
    const data = register;

    // post register
    try {
      const response = await API().post('/register', data, {
        // withCredentials: true
      });

      console.log("response::", response);

      if (response && response.status === 201) {
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
      <_Modal visible={modalVisible}>
        <Text style={styles().modalTitle}>Register</Text>

        <form>
          <TextInput
            label={t('registerUsernameLabel')}
            placeholder={t('registerUsernamePlaceholder')}
            value={register.username}
            onChangeText={(username) => { setUsername(username); }}
            onKeyPress={(event) => { handleKeyDown(event) }}
            autoFocus={true}
            mode="flat"
            />
          <TextInput
            label={t('registerEmailLabel')}
            placeholder={t('registerEmailPlaceholder')}
            value={register.email}
            onChangeText={(email) => { setEmail(email); }}
            onKeyPress={(event) => { handleKeyDown(event) }}
            mode="flat"
            />
          <TextInput
            label={t('registerPasswordLabel')}
            placeholder={t('registerPasswordPlaceholder')}
            secureTextEntry={true}
            value={register.password}
            onChangeText={(password) => { setPassword(password); }}
            onKeyPress={(event) => { handleKeyDown(event) }}
            mode="flat"
            />
        </form>

        <View style={styles().buttonContainer}>
          <Button
            title={t('commonClose')}
            onPress={() => { onCloseModal(); }}
          />
          <Button
            title={t('registerRegister')}
            onPress={async () => { onPressRegister(); }}
          />
        </View>
      </_Modal>
    </>
  );
}


export default Register;
