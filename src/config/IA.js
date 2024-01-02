'use strict';

const IAConfig = {
    layers: [
        {
            type: 'Input',
            label: 'Input',
            properties: {
                inputShape: {
                    label: 'Input shape',
                    placeholder: 'width, height, channels',
                    value: [],  // see atariGames inputShape
                    type: Array,
                },
            }
        }, {
            type: 'Dense',
            label: 'Dense',
            properties: {
                units: {
                    label: 'Layer units',
                    placeholder: 'Number of neurons',
                    value: 128,
                    type: Number,
                },
                activation: {
                    label: 'Activation function',
                    value: 'relu',
                    type: String,
                    picker: ['relu', 'sigmoid', 'tanh', 'softmax', 'linear'],
                }
            }
        }, {
            type: 'Conv2D',
            label: 'Conv2D',
            properties: {
                filters: {
                    label: 'Layer filters',
                    placeholder: 'Number of filters',
                    value: 32,
                    type: Number,
                },
                kernel_size: {
                    label: 'Kernel size',
                    placeholder: 'width, height',
                    value: 8,
                    type: Number,
                },
                strides: {
                    label: 'Strides',
                    placeholder: 'width, height',
                    value: 4,
                    type: Number,
                },
                activation: {
                    label: 'Activation function',
                    value: 'relu',
                    type: String,
                    picker: ['relu', 'sigmoid', 'tanh', 'softmax'],
                }
            }
        }, {
            type: 'Flatten',
            label: 'Flatten',
            properties: {},
        }, {
            type: 'MaxPooling2D',
            label: 'MaxPooling2D',
            properties: {
                pool_size: {
                    label: 'Pool size',
                    placeholder: 'width, height',
                    value: [2, 2],
                    type: Array,
                },
            }
        }
    ],

    atariAction: {
        0: 'NOOP',
        1: 'FIRE',
        2: 'UP',
        3: 'RIGHT',
        4: 'LEFT',
        5: 'DOWN',
        6: 'UPRIGHT',
        7: 'UPLEFT',
        8: 'DOWNRIGHT',
        9: 'DOWNLEFT',
        10: 'UPFIRE',
        11: 'RIGHTFIRE',
        12: 'LEFTFIRE',
        13: 'DOWNFIRE',
        14: 'UPRIGHTFIRE',
        15: 'UPLEFTFIRE',
        16: 'DOWNRIGHTFIRE',
        17: 'DOWNLEFTFIRE'
    },

    atariGames: [{
        name: 'Breakout',
        value: 'Breakout-v5',
        inputShape: [210, 160, 3],
        inputs: {
            0: 0,  // action 0 => NOOP
            1: 1,  // action 1 => FIRE
            2: 3,  // action 2 => RIGHT
            3: 4,  // action 3 => LEFT
        },
    }, {
        name: 'Assault',
        value: 'Assault-v5',
        inputShape: [210, 160, 3],
        inputs: {
            0: 0,  // action 0 => NOOP
            1: 1,  // action 1 => FIRE
            2: 2,  // action 2 => UP
            3: 3,  // action 3 => RIGHT
            4: 4,  // action 4 => LEFT
            5: 11,  // action 5 => DOWNFIRE
            6: 12,  // action 6 => UPRIGHTFIRE
        },
    }]}
;


export { IAConfig };
