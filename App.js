/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ToastAndroid} from 'react-native';
import { Navigation } from "react-native-navigation";
import SplashScreen from 'react-native-splash-screen';
import Bluetooth from './components/Bluetooth';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.bluetooth = new Bluetooth();
  }

  componentDidMount() {
      SplashScreen.hide(); 
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native! kkkkk</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>


        <Button
          onPress={this.botaoTela2.bind(this)}
          title="Tela 2"
        />

        <Text>{"\n\n"}</Text>

        <Button style={styles.margemTop}
          onPress={this.botaoBluetooth.bind(this)}
          title="Bluetooth"
        />
      </View>
    );
  }

  botaoBluetooth (){
    this.bluetooth.scanAndConnect();
    // this.bluetooth.teste();
    // this.bluetooth.dipositivos();

 
  }


  botaoTela2 () {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Tela2',
        options: {
          topBar: {
              title: {
                  text: 'Título Tela 2'
              }
          }
      }
      }
    }); 

    // ToastAndroid.show(this.props.componentId+' Tela 2', ToastAndroid.SHORT);
  };

  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  margemTop: {
    margin: 40,
    padding: 10
  },
});
