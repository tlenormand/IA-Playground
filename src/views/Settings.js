'use strict';

import React from 'react';
import { Text, View } from 'react-native';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}

export default Settings;