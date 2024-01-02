'use strict';

import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LoaderContext } from '../context/LoaderContext';
import { useTranslation } from 'react-i18next';
import CountryFlag from 'react-country-flag';
import { AuthContext } from '../context/AuthContext';


const Profile = (props) => {
  const { username, email, role } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const languages = [{
    label: 'profileLanguagesEn',
    value: 'en',
    countryCode: 'GB',
  }, {
    label: 'profileLanguagesFr',
    value: 'fr',
    countryCode: 'FR',
  }];

//======================================================================================================================
// EVENTS HANDLERS
//======================================================================================================================

  const onPressLanguage = (language) => { pressLanguage(language) };

//======================================================================================================================
// METHODS
//======================================================================================================================

  const pressLanguage = (language) => { i18n.changeLanguage(language); };

//======================================================================================================================
// RENDER
//======================================================================================================================

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>{t('profileScreen')}</Text>

        <View style={styles.container}>
          {languages.map((language, index) => (
            <TouchableOpacity key={index} onPress={() => onPressLanguage(language.value)}>
              <View style={{ flex: 1, flexDirection: 'row', borderRadius: '0.25em', alignItems: 'center', justifyContent: 'center', margin: 10, boxShadow: i18n.language === language.value ? '0 0 0 0.1rem rgba(0, 0, 0, 0.1)' : 'none' }}>
                <CountryFlag countryCode={language.countryCode} svg style={{ width: '2em', height: '1.5em', borderRadius: '0.25em', }} />
                <Text style={ styles.CountryName }>{t(language.label)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      <Text>{t('profileEmail', { email: email })}</Text>
      <Text>{t('profileUsername', { username: username })}</Text>
      <Text>{t('profileRole', { role: role })}</Text>
    </View>
  );
}

//======================================================================================================================
// STYLESHEET
//======================================================================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  CountryName: {
    margin: 2,
    marginLeft: 5
  }
});


export default Profile;
