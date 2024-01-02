'use strict';

import Controller from '../Controller';


export default class RegisterController extends Controller {
    constructor() {
        super();
    }

//======================================================================================================================
// EVENTS
//======================================================================================================================

    onPressRegister(props) {
        this.register(props);
    }

//======================================================================================================================
// METHODS
//======================================================================================================================

    register(props) {
        console.log('register::', props)
        const { email, password } = this.state;
        const { navigation } = this.props;
        const { navigate } = navigation;

        if (email && password) {
            this.setState({ loading: true });
            this.registerUser(email, password)
                .then(() => {
                    this.setState({ loading: false });
                    navigate('Home');
                })
                .catch((error) => {
                    this.setState({ loading: false });
                    alert(error);
                });
        } else {
            alert('Please fill in all fields');
        }
    }
}