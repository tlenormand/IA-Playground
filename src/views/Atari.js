'use strict';

import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Button, Text, Picker, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Slider } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import API from '../services/api/service';
import Loader from '../modals/Loader';
import { LoaderContext } from '../context/LoaderContext';
import _Modal from '../modals/_Modal';
import { modals } from '../modals/_modals';
import { set } from 'react-native-reanimated';
import modalStyles from '../css/modal';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';


const Atari = (props) => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const { username } = useContext(AuthContext);
  const [isCreated, setIsCreated] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [models, setModels] = useState([]);
  const [epsilon, setEpsilon] = useState(0);
  const [counter, setCounter] = useState(0);
  const [canRun, setCanRun] = useState(false);
  const [playerAction, setPlayerAction] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [create, setCreate] = useState({});
  const [step, setStep] = useState({});
  const [reset, setReset] = useState({});
  const [requestId, setRequestId] = useState(null);
  const navigation = useNavigation();


//======================================================================================================================
// USE EFFECT
//======================================================================================================================

  // after render (componentDidMount)
  useEffect(async () => {
    navigation.addListener('focus', async () => {
      initStep();
      const fetchedModels = await initModels();

      if (props.route?.params?.model) {
        initCreate(
          props.route.params.model.modelConfig.game,
          props.route.params.model.modelConfig.modelName
        );
      } else {
        initCreate(
          fetchedModels[0].modelConfig.game,
          fetchedModels[0].modelConfig.modelName
        );
      }

      setCounter(counter + 1);
    });
  }, []);

  useEffect(async () => {
    await initStep(playerAction);
  }, [playerAction]);

  useEffect(async (event) => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setPlayerAction(3);
      }
      if (event.key === 'ArrowRight') {
        setPlayerAction(2);
      }
      if (event.key === 'r') {
        setPlayerAction(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', () => { setPlayerAction(0); });
  
    if (isRunning) {
      await pressRun();
      setCounter(counter + 1);
    } else {
      pressStop();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', () => { setPlayerAction(0); });
    };

  }, [counter, isRunning]);

//======================================================================================================================
// EVENTS HANDLERS
//======================================================================================================================

  const handleNumberOfPlayersChange = async (value) => {
    setNumberOfPlayers(value);
    await initCreate(undefined, undefined, value);
    await initStep(undefined, value);
    await initReset(value);
  }

  const onPressCreate = async () => {
    setIsLoading(true);
    await pressCreate();
    setIsLoading(false);
  }

  const onPressReset = async () => {
    setIsLoading(true);
    await pressReset();
    setIsLoading(false);
  }

  const onPressDestroy = async () => {
    setIsLoading(true);
    await pressDestroy();
    setIsLoading(false);
  }

  const onPressRun = async () => { setIsRunning(true); }
  const onPressStop = async () => { setIsRunning(false); }

//======================================================================================================================
// METHODS
//======================================================================================================================

  const initCreate = async (defaultGame=undefined, defaultModel=undefined, playersNumber=undefined) => {
    let create_tmp = {};

    console.log("initCreate::", create, defaultGame, defaultModel, models);

    create_tmp.userId = username;
    create_tmp.game = defaultGame || create.game;
    create_tmp.modelName = defaultModel || create.modelName;

    if (numberOfPlayers > 0 || playersNumber > 0) {
      create_tmp.players = [{
        "type": "ia",
        "name": "ia1",
        "atariConfig": {
          "game": create_tmp.game,
          "epsilonMin": 0.1,
          "epsilon": epsilon,
          "canRender": false,
          "canTrain": false,
        },
        "modelConfig": {
          "modelName": create_tmp.modelName,
          "modelPath": "models/",
          "canLoadModel": true,
          "canSaveModel": false,
          "canContainerize": false,
        },
        "dockerConfig": {
            "canContainerize": false,
        },
        "logsConfig": {
          "canSaveLogs": false,
          "canSendLogs": false,
        }
      }
    ]}

    if (numberOfPlayers > 1 || playersNumber > 1) {
      create_tmp.players.push({
        "type": "player",
        "name": "player1",
        "atariConfig": {
          "game": create_tmp.game,
          "epsilonMin": 0.1,
          "epsilon": epsilon,
          "canRender": false,
          "canTrain": false,
        },
        "modelConfig": {
          "modelName": create_tmp.modelName,
          "modelPath": "models/",
          "canLoadModel": true,
          "canSaveModel": false,
          "canContainerize": false,
        },
        "dockerConfig": {
            "canContainerize": false,
        },
        "logsConfig": {
          "canSaveLogs": false,
          "canSendLogs": false,
        }
      });
    }

    initReset();
    setCreate(create_tmp);
    return create_tmp;
  }

  const initStep = async (action=0, playersNumber=undefined) => {
    let step_tmp;

    if (numberOfPlayers > 0 || playersNumber > 0) {
      step_tmp = {
        "userId": username,
        "players": [
          {
            "name": "ia1",
          }
        ]
      };
    }

    if (numberOfPlayers > 1 || playersNumber > 1) {
      step_tmp.players.push({
        "name": "player1",
        "action": action
      });
    }

    setStep(step_tmp);
    return step_tmp;
  }

  const initReset = async (playersNumber=undefined) => {
    let reset_tmp;

    if (numberOfPlayers > 0 || playersNumber > 0) {
      reset_tmp = {
        "userId": username,
        "reset": true,
        "players": [
          {
            "name": "ia1",
          }
        ]
      };
    }

    if (numberOfPlayers > 1 || playersNumber > 1) {
      reset_tmp.players.push({
        "name": "player1"
      });
    }

    setReset(reset_tmp);
  }

  const initModels = async () => {
    setIsLoading(true);
    const response = await API().get('/models/get', {}, {
        userId: username
    });

    if (response) { setModels(response.data); }
    setIsLoading(false);
    return response.data;
}

  const pressCreate = async () => {
    try {
      create.players.forEach((player) => {
        player.modelConfig.modelName = create.modelName;
      });
      const response = await API().post('/atari/create', create, {});
      if (response) {
        setIsCreated(true);
        setCanRun(true);
        await initStep();
      } else {
        setIsCreated(false);
        setCanRun(false);
      }

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const pressReset = async () => {
    const response = await requestEnvReset();
    setImages(response.data.data);
  }

  const pressDestroy = async () => {
    try {
      const response = await API().post('/atari/destroy', create, {});
      if (response) {
        setStep({});
        setIsCreated(false);
        setCanRun(false);
        setImage1('');
        setImage2('');
      }

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const pressRun = async () => {
    const response = await requestEnvStep();
    if (response === -1) {
      setIsRunning(false);
      setCanRun(false);
    }
  }
  
  const pressStop = () => { setIsRunning(false); }

  const requestEnvReset = async () => {
    try {
      const response = await API().post('/atari/reset', reset, {});

      setIsRunning(false);
      setCanRun(true);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const isPlayersDone = (players) => { return Object.values(players).every(player => player.done); }

  const requestEnvStep = async () => {
    try {
      const response = await API().post('/atari/step', step, {});

      if (response && response.data && response.data.data) {
        if (isPlayersDone(response.data.data)) { return -1; }
      }

      setImages(response.data.data);

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  const createCanvas = (image) => {
    const canvas = document.createElement('canvas');
    canvas.height = image.length;
    canvas.width = image[0].length;
    const context = canvas.getContext('2d');

    // fill canvas with image
    for (let y = 0; y < image.length; y++) {
      for (let x = 0; x < image[0].length; x++) {
        const pixelValue = image[y][x];
        context.fillStyle = `rgb(${pixelValue}, ${pixelValue}, ${pixelValue})`;
        context.fillRect(x, y, 1, 1);
      }
    }

    return canvas.toDataURL('image/png');
  }

  const setImages = (data) => {
    if (numberOfPlayers > 0) {
      const player = create.players[0].name;
      setImage1(createCanvas(data[player].state));
    }

      if (numberOfPlayers > 1) {
      const player = create.players[1].name;
      setImage2(createCanvas(data[player].state));
    }
  }

//======================================================================================================================
// RENDER
//======================================================================================================================

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
      <Loader isLoading={isLoading} style={{flex: 1, alignItem: 'center', justifyContent: 'center', zIndex: 999}} />

      {/* parameters */}
      <View style={{ flexDirection: 'column', gap: 10 }}>
        <View style={{ flexDirection: 'column', gap: 10, display: isCreated ? 'none' : 'flex' }}>
          {/* select game */}
          <View style={{ flexDirection: 'row', gap: 10 }} >
            <Text style={{ fontSize: 16 }}>Game: </Text>
            <Picker
              selectedValue={create.game}
              onValueChange={(value) => { setCreate({ ...create, game: value, modelName: models.find(model => model.modelConfig.game === value).modelConfig.modelName }); }}
            >
              <Picker.Item label="Breakout-v5" value="Breakout-v5" />
              <Picker.Item label="Assault-v5" value="Assault-v5" />
              <Picker.Item label="Pong-v5" value="Pong-v5" />
            </Picker>
          </View>

          {/* models */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={{ fontSize: 16 }}>Model: </Text>
            <Picker
              selectedValue={create.modelName}
              onValueChange={(value) => { setCreate({ ...create, modelName: value, game: models.find(model => model.modelConfig.modelName === value).modelConfig.game }); }}
            >
            {models.map((model, index) => {
              if (model.modelConfig.game !== create.game) { return; }
              return (
                <Picker.Item key={index} label={model.modelConfig.modelName} value={model.modelConfig.modelName} />
              );
            })}
            </Picker>

          </View>

        {/* epsilon */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={{ fontSize: 16 }}>IA Difficulty: </Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={100}
              thumbProps={{
                children: (
                  <Text style={{
                    fontSize: 14,
                    textAlign: 'center',
                    lineHeight: 40,
                  }}>
                    {Math.round((1 - epsilon) * 100)}%
                  </Text>
                ),
              }}
              step={1}
              value={Math.round(epsilon * 100)}
              onValueChange={(value) => { setEpsilon(value / 100); }}
            />
          </View>
      </View>

      {/* select number of players */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Text style={{ fontSize: 16 }}>Number of players: </Text>
        <Picker
          selectedValue={numberOfPlayers}
          onValueChange={handleNumberOfPlayersChange}
          disabled={isCreated}
        >
          <Picker.Item label="1 player (AI)" value={1} />
          <Picker.Item label="2 players (AI + player)" value={2} />
        </Picker>
      </View>
      </View>

      {/* space */}
      <View style={{ height: 10 }} />

      {/* run / stop / reset / create / destroy */}
      <View style={{ flexDirection: 'row', gap: 10}}>
        {isRunning ? (
          <Button
            title="Stop"
            onPress={onPressStop}
          />
        ) : (
          <Button
            title="Run"
            disabled={!canRun}
            onPress={onPressRun}
          />
        )}
        {isCreated && (
          <Button
            title="Reset"
            onPress={onPressReset}
          />
        ) || (
          <Button
            title="Create"
            onPress={onPressCreate}
          />
        )}
        <Button
          title="Destroy"
          onPress={onPressDestroy}
          disabled={isRunning || !isCreated}
        />
      </View>

      {/* space */}
      <View style={{ height: 10 }} />

      {/* images */}
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: image1 }}
          style={{ width: 160, height: 210, margin: 5 }}
        />
        {numberOfPlayers > 1 && (
          <Image
            source={{ uri: image2 }}
            style={{ width: 160, height: 210, margin: 5 }}
          />
        )}
      </View>

      {/* space */}
      <View style={{ height: 20 }} />

      {/* actions */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity style={modalStyles().button} onPressIn={() => { setPlayerAction(3); }} onPressOut={() => { setPlayerAction(0); }}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[modalStyles().button, { width: '80px', height: '80px' }]} onPressIn={() => { setPlayerAction(1); }} onPressOut={() => { setPlayerAction(0); }}>
          <MaterialIcons name="cached" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={modalStyles().button} onPressIn={() => { setPlayerAction(2); }} onPressOut={() => { setPlayerAction(0); }}>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

//======================================================================================================================
// STYLESHEET
//======================================================================================================================


export default Atari;
