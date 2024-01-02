'use strict';

import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import API from '../services/api/service';
import { modals } from '../modals/_modals';
import { LoaderContext } from '../context/LoaderContext';
import { screens } from '../views/_screens';
import _ScrollView from '../components/customs/_ScrollView';
import { AuthContext } from '../context/AuthContext';


const MyModels = (props) => {
    const { username } = useContext(AuthContext);

    const { isLoading, setIsLoading } = useContext(LoaderContext);
    const [isModalStatsVisible, setIsModalStatsVisible] = useState(false);

    const [models, setModels] = useState([]);
    const [showAdditionalData, setShowAdditionalData] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        props.navigation.addListener('focus', () => { initModels(); });
    }, [props.navigation]);

    const onToggleAdditionalData = (index) => { toggleAdditionalData(index); };
    const onPressStartTrainning = (model) => { pressStartTrainning(model); };
    const onPressStopTrainning = (model) => { pressStopTrainning(model); };
    const onPressStats = (model) => { pressStats(model); };
    const onPressDelete = (model) => { deleteModel(model); };

    const toggleAdditionalData = (index) => {
        setShowAdditionalData((prevShowAdditionalData) => ({
            ...prevShowAdditionalData,
            [index]: !prevShowAdditionalData[index],
        }));
    };

    const deleteModel = async (model) => {
        setIsLoading(true);

        await API().get('/models/delete', {}, {
            userId: username,
            modelName: model.modelConfig.modelName
        });

        initModels();

        setIsLoading(false);
    }

    const pressStartTrainning = async (model) => {
        setIsLoading(true);

        const data = {
            "userId": username,
            "modelName": model.modelConfig.modelName,
            "atariConfig": {
                "game": model.modelConfig.game,
                "epsilon": 1,
                "epsilonMin": 0.1,
                "canRender": false,
                "canTrain": true,
                "canSaveLogs": true,
                "canSendLogs": true
            },
            "dockerConfig": {
                "modelPath": model.modelConfig.modelPath,
                "canLoadModel": true,
                "canSaveModel": true,
                "canContainerize": true
            }
        }

        await API().post('/atari/train/start', data);

        const response = await API().get('/models/get', {}, { 
            // withCredentials: true,
            // "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            userId: username
        });
        setModels(response.data || []);

        initModels();

        setIsLoading(false);
    };

    const pressStopTrainning = async (model) => {
        setIsLoading(true);

        const data = {
            userId: username,
            modelName: model.modelConfig.modelName,
            dockerConfig: {
                modelPath: model.modelConfig.modelPath,
                canLoadModel: true,
                canSaveModel: true,
                canContainerize: true
            }
        }

        await API().post('/atari/train/stop', data);

        const response = await API().get('/models/get', {}, { userId: username });
        setModels(response.data);

        setIsLoading(false);
    };

    const getStats = async (model) => {
        setIsLoading(true);

        const response = await API().post('/logs/stats', {
            width: window.innerWidth - 100,
            height: 400
        }, {
            userId: username,
            modelName: model.modelConfig.modelName
        });
        console.log("getStats::",response);

        setIsLoading(false);
        return response;
    };

    const pressStats = async (model) => {
        const response = await getStats(model);
        if (response.data) { setStats(response.data); }
        if (response.success) { setIsModalStatsVisible(!isModalStatsVisible); }
    };

    const onOpenModalStats = () => { setIsModalStatsVisible(true); };
    const onCloseModalStats = () => { setIsModalStatsVisible(false); };

    const displayLayer = (layer) => {
        if (layer.type == "Input") {
            return (
                <View>
                    <Text>Input shape: {`[${layer.inputShape.map((shape) => shape)}]`}</Text>
                </View>
            );
        }
        if (layer.type == "Conv2D") {
            return (
                <View>
                    <Text>Filters: {layer.filters}</Text>
                    <Text>Kernel size: {layer.kernelSize}</Text>
                    <Text>Strides: {layer.strides}</Text>
                    <Text>Padding: {layer.padding}</Text>
                    <Text>Activation: {layer.activation}</Text>
                </View>
            );
        } else if (layer.type == "MaxPooling2D") {
            return (
                <View>
                    <Text>Pool size: {layer.poolSize}</Text>
                    <Text>Strides: {layer.strides}</Text>
                    <Text>Padding: {layer.padding}</Text>
                </View>
            );
        } else if (layer.type == "Flatten") {
            return (
                <View>
                </View>
            );
        } else if (layer.type == "Dense") {
            return (
                <View>
                    <Text>Units: {layer.units}</Text>
                    <Text>Activation: {layer.activation}</Text>
                </View>
            );
        }
    }

//======================================================================================================================
// USE EFFECT
//======================================================================================================================

    // after render (componentDidMount)
    useEffect(() => {
        initModels();
    }, []);

//======================================================================================================================
// METHODS
//======================================================================================================================

    const initModels = async () => {
        setIsLoading(true);
        const response = await API().get('/models/get', {}, {
            userId: username
        });

        if (response) {
            if (response.data == {}) {
                setModels([]);
            } else {
                setModels(response.data);
            }
        }
        setIsLoading(false);
    }

    return (
        <View style={{ flex: 1 }}>
            <_ScrollView>
            <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button title="New model" onPress={() => props.navigation.navigate(screens.CreateModel.options.title)} />
            </View>

            {models.map((model, index) => (
                <Card key={index} style={{ margin: 16, backgroundColor: 'transparent', backdropFilter: 'blur(10px)' }}>
                    <Card.Content>
                        {/* Header data */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginBottom: 16, flex: 1 }}>
                                <Text style={{ fontWeight: 'bold' }}>Name: </Text>
                                <Text>{model.modelConfig.modelName}</Text>
                            </View>

                            <View style={{ marginBottom: 16, flex: 1 }}>
                                <Text style={{ fontWeight: 'bold' }}>Game: </Text>
                                <Text>{model.modelConfig.game}</Text>
                            </View>

                            {/* TODO: get hours of training */}
                            <View style={{ marginBottom: 16, flex: 1 }}>
                                <Text style={{ fontWeight: 'bold' }}>Training: </Text>
                                <Text>Not implemented</Text>
                            </View>

                            <View style={{ marginBottom: 16, alignItems: 'center' }}>
                                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: model.isRunning ? 'red' : 'green' }}/>
                                <TouchableOpacity disabled={model.isRunning} onPress={() => onPressDelete(model)}>
                                    <Icon name="delete" size={24} color={model.isRunning ? 'grey' : 'red'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Button data */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            {/* TODO: Play button */}
                            <Button title="Play" onPress={() => props.navigation.navigate(screens.Atari.options.title, { model: model })} />
                            {model.isRunning ? (
                                <Button
                                    title="Stop trainning"
                                    onPress={() => onPressStopTrainning(model)}
                                />
                                ) : (
                                <Button
                                    title="Start trainning"
                                    onPress={() => onPressStartTrainning(model)}
                                />
                            )}
                            {/* TODO: Stats button */}
                            <Button title="Stats" onPress={() => onPressStats(model)} />

                        {/* Arrow to show additional data */}
                        <TouchableOpacity onPress={() => onToggleAdditionalData(index)}>
                        <View>
                            <Text>{showAdditionalData[index] ? '▼' : '▶'}</Text>
                        </View>
                        </TouchableOpacity>
                    </View>

                    {console.log("model",model)}

                    {/* Additional data */}
                    
                    {showAdditionalData[index] && (
                        <>
                            <Title>Additional data</Title>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                <Text style={{ fontWeight: 'bold' }}>Number of layers: </Text>
                                <Text>{model.modelLayers.length}</Text>
                            </View>
                        </>
                    )}

                    {showAdditionalData[index] && (
                        model.modelLayers.map((layer, index) => (
                            <>
                                <Text style={{ fontWeight: 'bold', marginTop: 16 }}>Layers {layer.layerPosition}: {layer.type}</Text>
                                {displayLayer(layer)}
                            </>
                        ))
                    )}
                    </Card.Content>
                </Card>
            ))}

            <modals.Stats.component visible={isModalStatsVisible} onCloseModal={onCloseModalStats} stats={stats} />
            </_ScrollView>
        </View>
    );
}

//======================================================================================================================
// STYLESHEET
//======================================================================================================================


export default MyModels;