import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import API from '../services/api/service';
import { AuthContext } from '../context/AuthContext';
import { modals } from '../modals/_modals';
import styles from '../css/home';

// import Loader from '../modals/Loader';


const Home = (props) => {
  const { t, i18n } = useTranslation();
  const { isAuth, username, removeCookie } = React.useContext(AuthContext);
  const [isModalRegisterVisible, setIsModalRegisterVisible] = useState(false);
  const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);

  const { colors } = useTheme();

//======================================================================================================================
// USE EFFECTS
//======================================================================================================================

//======================================================================================================================
// EVENT HANDLERS
//======================================================================================================================

  const onOpenModalRegister = () => { setIsModalRegisterVisible(true); };
  const onOpenModalSignIn = () => { setIsModalSignInVisible(true); };
  const onLogOut = () => { logOut() };

  const onCloseModalRegister = () => { setIsModalRegisterVisible(false); };
  const onCloseModalSignIn = () => { setIsModalSignInVisible(false); };

//======================================================================================================================
// METHODS
//======================================================================================================================

  const logOut = async () => {
    await API().get('/logOut');

    removeCookie('connect.sid');
    removeCookie('user');
  };


//======================================================================================================================
// RENDER
//======================================================================================================================

  return (
    <>
      {/* <Loader isLoading={isLoading} style={{flex: 1, alignItem: 'center', justifyContent: 'center', zIndex: 999}} /> */}

      <View style={styles().homeContainer}>
        {isAuth
        ? <Text style={{ color: colors.text }}>{t('greetingConnected', { username: username })}</Text>
        : <Text style={{ color: colors.text }}>{t('greetingNotConnected')}</Text>}
        <modals.Register.component visible={isModalRegisterVisible} onCloseModal={onCloseModalRegister} />
        <modals.SignIn.component visible={isModalSignInVisible} onCloseModal={onCloseModalSignIn} />

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          { isAuth ?
            <Button title={t('homeLogout')} onPress={onLogOut} />
            :
            <>
              <Button title={t('homeRegister')} onPress={onOpenModalRegister} />
              <Button title={t('homeLogin')} onPress={onOpenModalSignIn} />
            </>
          }
        </View>
      </View>
    </>
  );
};

//======================================================================================================================
// STYLESHEET
//======================================================================================================================


export default Home;
