import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import { Navigation } from "react-native-navigation";

type Props = {};
export default class Tela2 extends Component<Props> {
  render() {
    return (
      <View>
        <Text style={styles.tamanhoTexto}>Tela 2</Text>
        <Button
          onPress={this.botaoVoltar.bind(this)}
          title="Voltar"
        />
      </View>
    );
  }

  botaoVoltar() {
    Navigation.popToRoot(this.props.componentId);
  }
}

const styles = StyleSheet.create({
  tamanhoTexto: {
    fontSize: 20
  },
});