import React, { useState, useEffect } from "react";
import {Button, Alert, TextInput, View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Modal} from "react-native";



const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>Song: {item.song} {"\n"}
                                            User: {item.username} {"\n"}
                                            Rating: {item.rating} {"\n"}
                                            Review: {item.review}
    </Text>
  </TouchableOpacity>
);

const Ratings = () => {

  const [ratings, setRatings] = useState([]);  
  const [selectedId, setSelectedId] = useState(null);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setinputText] = useState()
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(1);
  const [song, setSong] = useState("");
  const [review, setReview] = useState("");
  const [songId, setSongId] = useState(null);
  const [editItem, seteditItem] = useState();

  useEffect(async () =>
  {
      //const res = await fetch("http://127.0.0.1:8000/api/ratings/");
      //console.log(res.json());
      refreshRatings();
      
  }, []);


  const refreshRatings = () => {

      fetch("http://127.0.0.1:8000/api/ratings/")
          .then((response) => response.json())  
          .then((res) => setRatings(res) )
          .catch((error) => console.error(error))
        
         
  }

  const onPressItem = (item) => {
    setisModalVisible(true);
    setSelectedId(item.id);
    setRating(item.rating);
    setReview(item.review);
    seteditItem(item.id);

  }

  const handleEditItem = (editItem) => {
    const newData = ratings.map(item => {
      if (item.id === editItem) {
        item.review = review;
        item.rating = rating;

        fetch(`http://127.0.0.1:8000/api/ratings/${item.id}/`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          },
        body: JSON.stringify({
          username: item.username,
          song: item.song,
          review: item.review,
          rating: item.rating
        }),
        });
        return item;

      }
      return item;
    })
    setRatings(newData);
    refreshRatings();
  }

  const handleDeleteItem = (editItem) => {
    const newData = ratings.map(item => {
      if (item.id === editItem) {
        item.review = review;
        item.rating = rating;

        fetch(`http://127.0.0.1:8000/api/ratings/${item.id}/`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          }
        });
        return item;

      }
      return item;
    })
    setRatings(newData);
    refreshRatings();
  }

  const onPressSaveEdit = (rating) => {
    checkRating(rating);
    handleEditItem(editItem);
    setisModalVisible(false);
    refreshRatings();
  
  }

  const checkRating = (rating) => {
    
    if (rating > 5) 
    {
      Alert.alert("Input Error", "Ratings go up to 5!");
      return false;
    }
    else if (rating <= 0)
    {
      Alert.alert("Input error", "Ratings range from 1 to 5!");
      return false;
    }
    else{
      return true;
    }
  }

  const onPressDelete = (rating) => {
    handleDeleteItem(editItem);
    setisModalVisible(false);
    refreshRatings();

  }
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => onPressItem(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  

  return (
    <SafeAreaView style={styles.container}>

      
      <FlatList
        data={ratings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setisModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Button 
          title = "Back"
          onPress = {() => setisModalVisible(false)}
        />
        <Button 
          title = "Delete"
          onPress = {() => onPressDelete(rating)}
        />
          <Text style={styles.text}>Change Review:</Text>
          <TextInput 
          style={styles.textInput}
          onChangeText = {(text) => setReview(text)}
          defaultValue = {review}
          editable={true}
          multiline={false}
          
          />
        </View>
        <View style={styles.modalView}>
          <Text style={styles.text}>Change Rating:</Text>
          <TextInput 
          style={styles.textInput}
          keyboardType = 'numeric'
          onChangeText = {(text) => setRating(text)}
          defaultValue = {rating}
          editable={true}
          multiline={false}
          //onSubmitEditing = {(text) => checkRating(text)}
          />
        </View>
        <TouchableOpacity
          onPress = {() =>  checkRating(rating) && onPressSaveEdit(rating) }
          style = {styles.touchableSave}
        >
          <Text style = {styles.text}>Save</Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

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
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10
  },
  textInput: {
    width: '90%',
    height: 70,
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

export default Ratings;