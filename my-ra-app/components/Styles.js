import {Button, Alert, TextInput, View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Modal} from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      alignItems: 'flex-start',
      padding: 20,
      //marginVertical: 8,
      //marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    text: {
      textAlign: 'center',
      alignItems: 'center',
      marginVertical: 5,
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 10
    },
    textInput: {
      alignItems: 'center',
      marginVertical: 5,
      width: '90%',
      height: 50,
      paddingStart: 10,
      borderColor: '#d0d0d0',
      borderWidth: 1,
      fontSize: 25
    },
    modalView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10 
    },
    touchableSave: {
      backgroundColor: '#0bd3d3',
      paddingHorizontal: 0,
      alignItems: 'center',
      marginTop: 0,
      padding: 20
    },
    buttonContainer: {
      elevation: 8,
      backgroundColor: "#0bd3d3",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginVertical: 5
    },
    buttonText: {
      fontSize: 16,
      color: "#FFF",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  
  
  });

export default styles;