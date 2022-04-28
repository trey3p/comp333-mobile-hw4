import {Button, Alert, TextInput, View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Modal} from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      alignItems: 'flex-start'
      //padding: 20,
      //marginVertical: 8,
      //marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    text: {
      marginVertical: 30,
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 10
    },
    textInput: {
      width: '90%',
      height: 50,
      borderColor: 'grey',
      borderWidth: 1,
      fontSize: 25
    },
    modalView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    touchableSave: {
      backgroundColor: 'grey',
      paddingHorizontal: 100,
      alignItems: 'center',
      marginTop: 20
    }
  
  
  });

export default styles;