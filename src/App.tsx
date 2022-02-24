import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

const BASE_URL = 'https://api.chucknorris.io';

type JokeResponse = {
  categories: string[];
  created_at: string;
  updated_at: string;
  icon_url: string;
  id: string;
  url: string;
  value: string;
} | null;

const fetchDevJokes = async (): Promise<JokeResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/jokes/random?category=dev`);

    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};

const App = () => {
  const [joke, setJoke] = useState('');

  const assignNewJoke = useCallback(async () => {
    const res = await fetchDevJokes();

    setJoke(prev => res?.value || prev);
  }, [setJoke]);

  useEffect(() => {
    assignNewJoke();
  }, [assignNewJoke]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/chuck.png')} />
      <Text style={styles.quote}>"{joke}"</Text>
      <TouchableOpacity style={styles.btn} onPress={assignNewJoke}>
        <Text style={styles.btnLabel}>I want to laugh harder!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c7ddeb',
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Al Nile',
  },
  image: {
    width: 300,
    height: 300,
    margin: 30,
  },
  btn: {
    backgroundColor: '#1174de',
    padding: 12,
    borderRadius: 15,
    position: 'absolute',
    bottom: 45,
  },
  btnLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});

export default App;
