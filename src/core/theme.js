import { DefaultTheme } from 'react-native-paper';
import * as color from './colors';
import * as colorImage from './images';

// primary: This color is used for the primary action elements in the app, such as buttons, navigation, and links.
// onPrimary: This color is used to style the text and icons that appear on top of the primary background color.
// primaryContainer: This color is used to style containers or background elements that use the primary color scheme.
// onPrimaryContainer: This color is used to style the text and icons that appear on top of the primaryContainer background color.

// Colors:
// lightModeRedTheme / darkModeRedTheme
// lightModeDarkRedTheme / darkModeDarkRedTheme
// lightModeBlueTheme / darkModeBlueTheme
// lightModeGreenTheme / darkModeGreenTheme
// lightModePurpleTheme / darkModePurpleTheme

const useTheme = colorImage.lightImage06Theme1

export const theme = {
    ...DefaultTheme,
    ...useTheme,
    colors: {
        ...DefaultTheme.colors,
        ...useTheme.colors,
    }
}