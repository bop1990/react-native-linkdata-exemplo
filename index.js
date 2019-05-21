/**
 * @format
 */


import App from './App';
import Tela2 from './screens/Tela2';
import { Navigation } from "react-native-navigation";

Navigation.registerComponent("App", () => App);
Navigation.registerComponent("Tela2", () => Tela2);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    //global
    root: {
      stack: {
        children: [{
          component: {
            name: 'App',
            options: {
              topBar: {
                  title: {
                      text: 'Título App'
                  }
              }
            }
          }
        }]
      }
      
    }
  });

  Navigation.setDefaultOptions({
    topBar: {
      visible: true
    }
  });

});
