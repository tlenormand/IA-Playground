'use strict';

import _Modal from './_Modal';
import Register from './Register';
import SignIn from './SignIn';
import Loader from './Loader';
import Stats from './Stats';

export const modals = {
    Register: {
        name: 'Register',
        component: Register,
        options: {
            title: 'Register your account',
        },
    },
    SignIn: {
        name: 'Sign In',
        component: SignIn,
        options: {
            title: 'Sign in to your account',
        },
    },
    _Modal: {
        name: '_Modal',
        component: _Modal,
        options: {
            title: 'Modal',
        },
    },
    Loader: {
        name: 'Loader',
        component: Loader,
        options: {
            title: 'Loader',
        },
    },
    Stats: {
        name: 'Stats',
        component: Stats,
        options: {
            title: 'Stats',
        },
    },
};
