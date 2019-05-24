import React, {Component} from 'react';
import { BleManager } from 'react-native-ble-plx';
import {Platform, ToastAndroid, Alert, Text, View} from 'react-native';

type Props = {};
export default class Bluetooth extends Component<Props> {

    constructor() {
        super();
        this.manager = new BleManager();
        // this.state = {
        //     devices: [],
        // }

        this.devices = [];
        this.cont = 0;
    }


    componentWillMount() {
        // const subscription = this.manager.onStateChange((state) => {
        //     console.log('state: '+state);
        //     if (state === 'PoweredOn') {
        //         //this.scanAndConnect();
        //         console.log('PoweredOn');
        //         subscription.remove();
        //     }
        // }, true);

        if (Platform.OS === 'ios') {
            this.manager.onStateChange((state) => {
              if (state === 'PoweredOn') this.scanAndConnect()
            })
          } else {
            // this.scanAndConnect()
          }
    }

    teste(){
        setTimeout(() => {
        ToastAndroid.show('teste bt', ToastAndroid.SHORT)
        },5000);
    }

    dipositivos(){
        // this.setState(state => ({devices: [...state.devices, this.manager.devices(null)]}));

        // this.devices.push(this.manager.devices(null));
        this.manager.devices([]).then(device => {
            this.devices.push(device);
            console.log('>> devices');
            console.log(JSON.stringify(this.devices));
        });

       
        
    }

    scanAndConnect() {
        ToastAndroid.show('Scanning...', ToastAndroid.SHORT);

        this.cont = 0;

        // setInterval(() => {console.log('2 segundos')},2000);        

        // setTimeout(() => { 
        //     console.log('>>> scan stopping');
        //     this.manager.stopDeviceScan();
        //     console.log('>>> scan stopped');
        //     ToastAndroid.show('scan stopped...', ToastAndroid.SHORT);
        //     console.log('>>> devices');
        //     console.log(this.devices);
        // }, 10000);


        // this.manager.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
        this.manager.startDeviceScan(null, null, (error, device) => {
            
            if (error) {
                // Handle error (scanning will be stopped automatically)
                //ToastAndroid.show(error, ToastAndroid.LONG);
                console.log(error);
                
                if(error.errorCode == 102){
                    Alert.alert('Bluetooth desativado, favor ativar.');
                }else{
                    Alert.alert('Erro: '+error.errorCode+' '+error.message);
                }

                return
            }

            // console.log("achei "+JSON.stringify(device));
            console.log(device);
            if(device.name !== null || device.localName !== null){
                this.devices.push(device);
            }

            this.cont++;
            // console.log(this.cont);
            if(this.cont === 10){
                console.log('>>> scan stopping');
                this.manager.stopDeviceScan();
                console.log('>>> scan stopped');
                console.log('>>> devices');
                console.log(this.devices);
                this.cont = 0;
                ToastAndroid.show('scan stopped', ToastAndroid.SHORT);
            }


            // if(device.name !== null){
            //     this.setState(state => ({devices: [...state.devices, device]}));
            // }
            //this.devices = this.manager.devices();

            // this.manager.stopDeviceScan();
            // console.log('>> scan stop');
            
    
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name === 'TI BLE Sensor Tag' 
                || device.name === 'SensorTag'
                // || device.name === 'F1_CalebeCampos'
                // || device.name === 'WindowsCE'
                // || device.name === 'Leomar_r'
                ) {
                
                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();
                console.log('>> scan stop');
    
                // Proceed with connection.
                console.log('Dispositivo: '+device);
                this.connect();
            }
        });

        
        // setInterval(() => {console.log('3 segundos')},3000);
        

        // setTimeout(() => { 
        //     console.log('>>> scan stopping');
        //     this.manager.stopDeviceScan();
        //     console.log('>>> scan stopped');
        //     console.log('>>> devices');
        //     console.log(this.devices);
        // }, 10000);

        
    }

    connect() {
        device.connect()
        .then((device) => {
            return device.discoverAllServicesAndCharacteristics()
        })
        .then((device) => {
            // Do work on device with services and characteristics
            ToastAndroid.show('Dispositivo conectado: '+device.name, ToastAndroid.LONG);
            console.log('Dispositivo conectado: '+device.name);
        
        })
        .catch((error) => {
            // Handle errors
            ToastAndroid.show(error, ToastAndroid.LONG);
            console.log(error);
        });
    }
   

  
  
//   render() {
//     return (
//         <View>
//             <Text>Bluetooth</Text>
//         </View>
//     );
//   }

  
}



