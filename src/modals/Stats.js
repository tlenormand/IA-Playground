import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Image } from 'react-native';
import API from '../services/api/service';
import useEffectDidMount from '../custom/hooks';
import { LoaderContext } from '../context/LoaderContext';
import styles from '../css/modal';
import modalStyles from '../css/modal'
import _Modal from './_Modal';
import { useTranslation } from 'react-i18next';


const Stats = (props) => {
  const { t, i18n } = useTranslation();
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [stats, setStats] = useState(props.stats);

  useEffectDidMount(() => {
    props.onCloseModal();
    if (props.visible) {
      setModalVisible(props.visible);
    }
  }, [props.visible]);

  useEffect(() => {
    setStats(props.stats);
    console.log(stats);
    getModalWidth();
  }, [props.stats]);

  const onValidModal = () => {
    pressStats();
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onValidModal();
    }
    if (event.key === 'Escape') {
      onCloseModal();
    }
  };

  const getModalWidth = () => {
    console.log("window.innerWidth",window.innerWidth);
    if (window.innerWidth < 768) {
      return '100%';
    } else {
      return '50%';
    }
  }

  const getModalHeight = () => {
    if (window.innerHeight < 768) {
      return '100%';
    } else {
      return '50%';
    }
  }

  useEffect(() => {
    !isLoading && modalVisible
      ? document.addEventListener('keydown', handleKeyDown)
      : document.removeEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading]);

  // Fonction pour convertir les données en base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Fonction pour récupérer l'image en base64
  const getImage = () => {
    return arrayBufferToBase64(stats.chartRewardGame.data);
  };

  return (
    <>
      <_Modal maxWidth={window.innerWidth} maxHeight={window.innerHeight} visible={modalVisible} style={modalStyles().modal }>
        <Text style={styles().modalTitle}>Statistics</Text>

        <View style={styles().modalBody}>
          <View style={styles().modalRow}>
            <Text style={styles().modalText}>{t('statsTotalTimeTrainning')}</Text>
            <Text style={styles().modalText}>
              {Math.floor(stats.ExecutedTimeTotal / 3600)}{t('commonHourShort')} {Math.round((stats.ExecutedTimeTotal % 3600) / 60)}{t('commonMinuteShort')}
            </Text>
          </View>

          <View style={styles().modalRow}>
            <Text style={styles().modalText}>{t('statsTotalLogSaved')}</Text>
            <Text style={styles().modalText}>{stats.total}</Text>
          </View>

          {stats.chartRewardGame && (
            <View>
              <Text style={styles().modalText}>{t('statsRewardByGame')}</Text>
              <Image source={{ uri: `data:image/png;base64,${getImage()}` }} style={{ width: stats.chartWidth, height: stats.chartHeight }} />
            </View>
          )}
        </View>

        <View style={styles().buttonContainer}>
          <Button title="Cancel" onPress={onCloseModal} />
        </View>
      </_Modal>
    </>
  );
};

export default Stats;
