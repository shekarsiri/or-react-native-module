import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  // type ViewProps,
  // requireNativeComponent,
  TouchableOpacity,
} from 'react-native';
import Openreplay from '@openreplay/react-native';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    Openreplay.multiply(3, 7).then((results: number) => {
      setResult(results);
      console.log('OpenReplay started >>');
      Openreplay.setMetadata('key', 'value');
      Openreplay.setUserID('user-id');
    });
    // Openreplay.start().then((value: string) => {
    //   console.log('OpenReplay started >>' + value);
    //   Openreplay.setMetadata('key', 'value');
    //   Openreplay.setUserID('user-id');
    // });
    // Openreplay.setMetadata('key', 'value');
    // Openreplay.setUserID('user-id');
  }, []);

  const apiTest = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Openreplay.ORTouchTrackingView style={styles.container}>
      <View style={styles.content}>
        <Text>Result: {result}</Text>

        <Openreplay.CustomView>
          <Text>Testing..</Text>
        </Openreplay.CustomView>

        <TouchableOpacity style={styles.button} onPress={apiTest}>
          <Text>Request</Text>
        </TouchableOpacity>

        {/*<Openreplay.ORTrackedInput*/}
        {/*  style={styles.input}*/}
        {/*  onChangeText={onChangeNumber}*/}
        {/*  value={number}*/}
        {/*  placeholder="Enter a number"*/}
        {/*  numberOfLines={1}*/}
        {/*/>*/}

        <Openreplay.ORSanitizedView style={styles.sanitizedView}>
          <Text>This is a sanitized view</Text>
        </Openreplay.ORSanitizedView>
      </View>
    </Openreplay.ORTouchTrackingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  content: {
    width: '90%', // adjusts the width to use 90% of the container width
    padding: 20,
  },
  customView: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 10,
  },
  sanitizedView: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#eee',
  },
});
