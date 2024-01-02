import { screens } from '../views/_screens';


const checkAuthAndNavigate = (navigation, screenName, isAuth) => {
    const screen = screens[screenName];

    if ((screen.auth && isAuth) || !screen.auth) {
        navigation.navigate(screenName);
        return true;
    }

    return false;
}


export default checkAuthAndNavigate;
