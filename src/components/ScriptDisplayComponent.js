import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native'; // Import necessary components from React Native
import { SampleScriptContext } from './SampleScriptContext'; // Import the context

const ScriptDisplayComponent = () => {
  const { sampleScriptData } = useContext(SampleScriptContext);
  useEffect(async () => {
    console.log('hello world 22@2' , );
   

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sample Script</Text>
      {sampleScriptData.map((entry) => (
        <View key={entry.title} style={styles.entry}>
          <Text style={styles.entryTitle}>{entry.title}</Text>
          <Text style={styles.entryContent}>{entry.content}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entry: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  entryContent: {
    fontSize: 14,
  },
});

export default ScriptDisplayComponent;
