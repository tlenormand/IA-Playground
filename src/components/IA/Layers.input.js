import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, StyleSheet, Picker, TouchableOpacity } from 'react-native';

export default function LayerComponents(props) {
  const [layer, setLayer] = useState(props.layer);

  useEffect(() => {
    setLayer(props.layer);
  }, [props.layer]);

  const handleInputChange = (text, property) => {
    try {
      const convertedValue = convertValue(text, layer.properties[property].type);
      props.updateLayerProperty(property, convertedValue, layer.position);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  const convertValue = (text, type) => {
    try {
      if (type === Number) {
        const number = parseFloat(text);
        return isNaN(number) ? 0 : number;
      } else if (type === Array) {
        let cleanedValue = text.replace(/\s/g, ''); // delete spaces
        cleanedValue = cleanedValue.replace(/,0+/g, ','); // delete leading zeros
        if (cleanedValue.endsWith(',')) {
          cleanedValue += '0';
        }
        return JSON.parse(`[${cleanedValue}]`);
      }
    } catch (error) {
      throw new Error(`Incorrect format: ${text} is not type ${type}`);
    }

    return text;
  };

  return (
    <View>
      {Object.entries(layer.properties).map(([key, value], index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Text>{value.label}: </Text>
          {layer.properties[key].picker ? (
            <Picker
              selectedValue={value.value}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => handleInputChange(itemValue, key)}
            >
              {value.picker.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.textInput]}
                value={value.value.toString()}
                placeholder={value.placeholder}
                onChangeText={(text) => handleInputChange(text, key)}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    marginLeft: 8,
  },
});
