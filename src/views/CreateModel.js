import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, Picker, ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import API from '../services/api/service';
import { LoaderContext } from '../context/LoaderContext';
import IA from '../components/IA/index';
import { IAConfig } from '../config/IA';
import _ScrollView from '../components/customs/_ScrollView';
import { AuthContext } from '../context/AuthContext';


const CreateModel = () => {
  const { username } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const [config, setConfig] = useState(IAConfig);
  const [force, setForce] = useState(false);
  const [alreadyCreated, setAlreadyCreated] = useState(false);

  const [layers, setLayers] = useState([]);
  const [game, setGame] = useState('Breakout-v5');
  const [name, setName] = useState('Breakout-v5');
  // const [inputShape, setInputShape] = useState([210, 160, 3]);

  const onAddLayer = () => {
    const newLayers = [...layers];
    newLayers.push({ ...config.layers[0], position: layers.length });
    if (newLayers[newLayers.length - 1].type === 'Input') {  // inputShape depending on game
      newLayers[newLayers.length - 1].properties.inputShape.value = config.atariGames.find((element) => element.value === game).inputShape;
    }
    setLayers(newLayers);
  };

  const formatLayers = (layers) => {
    const formattedLayers = [];

    layers.forEach((layer) => {
      formattedLayers.push({
        type: layer.type,
        layerPosition: layer.position,
        inputShape: layer.properties.inputShape?.value,
        filters: layer.properties.filters?.value,
        strides: layer.properties.strides?.value,
        activation: layer.properties.activation?.value,
        units: layer.properties.units?.value,
      });
    });

    return formattedLayers;
  };

  const onCreateModel = async () => {
    setIsLoading(true);

    const response = await API().post('/models/create', {
      dockerInstance: {
        id: "",
        modelId: [],
        logsId: []
      },
      model: {
        modelConfigId: "",
        dockerInstanceIds: [],
        modelLayersIds: []
      },
      modelConfig: {
        userId: username,
        modelName: name,
        game: game,
        isNewModel: true,
        canLoadModel: false,
        canSaveModel: true,
        modelPath: "models/",
        modelTargetName: "model_target_test",
        modelTargetPath: "models/",
        parametersOptimizerType: "Adam",
        parametersOptimizerLearningRate: 0.00025,
        parametersOptimizerClipnorm: 1,
        parametersInputShape: [210, 160, 3],
        parametersLossFunctionType: "Huber"
      },
      modelLayers: {
        layers: formatLayers(layers)
      }
    });

    if (response.status = 409 && response.code === 409002) {
      alert('Model alreay exists');
    }

    setIsLoading(false);
  };

  const updateLayerProperty = (property, value, position) => {
    console.log('updateLayerProperty', property, value, position);
    const newLayers = [...layers];
  
    if (property === 'type') {
      const newType = value;
      newLayers[position] = {
        ...newLayers[position],
        type: newType,
        properties: { ...config.layers.find((layer) => layer.type === newType).properties },
      };
    } else {
      const propertyConfig = newLayers[position].properties[property];
  
      newLayers[position] = {
        ...newLayers[position],
        properties: {
          ...newLayers[position].properties,
          [property]: {
            ...propertyConfig,
            value: value,
          },
        },
      };
    }
  
    setLayers(newLayers);
    console.log('layers', layers);
  };

  const handleInfoButtonPress = (layer) => {
    // Ajoutez votre logique pour afficher la fenêtre contextuelle d'informations ici
    alert('Informations sur ' + layer.type);
  };

  const renderInfoButton = (layer) => {
    return (
      <TouchableOpacity style={{ opacity: 0.5 }} onPress={() => handleInfoButtonPress(layer) }>
        <Ionicons name="information-circle" size={32} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <_ScrollView>
        <View style={{ padding: 20 }}>
          <View style={{ marginBottom: 16 }}>
            <Button title="Create model" onPress={() => onCreateModel()} />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Button title="Add Layer" onPress={() => onAddLayer()} />
          </View>
      
          {/* Game */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Text>Game: </Text>
            <Picker
              selectedValue={game}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setGame(itemValue)}
            >
              {config.atariGames.map((game, index) => (
                <Picker.Item key={index} label={game.name} value={game.value} />
              ))}
            </Picker>
            <Text>Possible actions (output length): {Object.keys(config.atariGames.find((element) => element.value === game).inputs).length}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>

            <Text>Name: </Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => setName(text)}
              value={name}
              placeholder='Model name'
            />
          </View>
        </View>

        {/* Layers */}
        {layers.map((layer, index) => (
          <Card key={index} style={{ margin: 10, padding: 10, backgroundColor: 'transparent', backdropFilter: 'blur(10px)', margin: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <Title>Layer {layer.position}</Title>
              <Button title="Delete" onPress={() => setLayers(layers.filter((layer, i) => i !== index))} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              {renderInfoButton(layer)}
              <Text>Layer type:</Text>
              <Picker
                selectedValue={layer.type}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => updateLayerProperty('type', itemValue, index)}
              >
                {config.layers.map((layer, index) => (
                  <Picker.Item key={index} label={layer.label} value={layer.value} />
                ))}
              </Picker>
            </View>

            <IA.LayerComponents key={`layer-${index}`}
              layer={layer}
              layers={layers}
              updateLayerProperty={updateLayerProperty}
              />
          </Card>
        ))}
      </_ScrollView>
    </View>
  );
};

export default CreateModel;
