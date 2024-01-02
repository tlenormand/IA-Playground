'use strict';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import Atari from './Atari';
import MyModels from './MyModels';
import CreateModel from './CreateModel';

export const screens = {
    Home: {
        name: 'Home',
        component: Home,
        auth: false,
        options: {
            title: 'Home',
            text: 'Home',
            logo: function () {<FontAwesomeIcon icon="fa-solid fa-bars" />
                return (
                    <Icon name="home" size={ 30 } color="black" />
                );
            }
        },
    },
    Profile: {
        name: 'Profile',
        component: Profile,
        auth: true,
        options: {
            title: 'Profile',
            text: 'Profile',
            logo: function () {
                return (
                    <Icon name="user" size={ 30 } color="black" />
                );
            }
        },
    },
    Settings: {
        name: 'Settings',
        component: Settings,
        auth: false,
        options: {
            title: 'Settings',
            text: 'Settings',   
            logo: function () {
                return (
                    <Icon name="bars" size={ 30 } color="black" />
                );
            }
        },
    },
    Atari: {
        name: 'Atari',
        component: Atari,
        auth: true,
        options: {
            title: 'Atari',
            text: 'Atari',
        },
    },
    MyModels: {
        name: 'MyModels',
        component: MyModels,
        auth: true,
        options: {
            title: 'MyModels',
            text: 'My models',
        },
    },
    CreateModel: {
        name: 'CreateModel',
        component: CreateModel,
        auth: true,
        options: {
            title: 'CreateModel',
            text: 'Create model',
        },
    },
    Submenu2: {
        name: 'Submenu2',
        component: Settings,
        auth: false,
        options: {
            title: 'Submenu2',
            text: 'Submenu2',
        },
    },
};
