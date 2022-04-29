import React, { useState, useEffect } from "react";
import {Button, Alert, TextInput, View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Modal} from "react-native";

import styles from "./Styles";



const Ratings = () => {

  const [ratings, setRatings] = useState([]);  
  const [selectedId, setSelectedId] = useState(null);
  const [isEditModalVisible, setisEditModalVisible] = useState(false);
  const [inputText, setinputText] = useState()
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(1);
  const [song, setSong] = useState("");
  const [review, setReview] = useState("");
  const [songId, setSongId] = useState(null);
  const [editItem, seteditItem] = useState();
  const [isAddModalVisible, setisAddModalVisible] = useState(false);

  useEffect(async () =>
  {
      //const res = await fetch("http://127.0.0.1:8000/api/ratings/");
      //console.log(res.json());
      refreshRatings();
      
  }, []);

  // Handles double rating error message
  const onSubmit = (e) => {
    let item = {username, song, rating, review};
    let match = ratings.find(element => element.username === username && element.song === song)
    if (match)
    {
      Alert.alert("You cannot double rate!");
      return false;
    }
    else{ return true; }

  }

  //Refresh, called after any delete, edit, save, operation
  const refreshRatings = () => {

      fetch("http://127.0.0.1:8000/api/ratings/")
          .then((response) => response.json())  
          .then((res) => setRatings(res) )
          .catch((error) => console.error(error))
        
         
  }

  const onPressItem = (item) => {
    setisEditModalVisible(true);
    setSelectedId(item.id);
    setSong(item.song);
    setRating(item.rating);
    setReview(item.review);
    seteditItem(item.id);

  }

  const handleEditItem = (editItem) => {
    const newData = ratings.map(item => {
      if (item.id === editItem) {
        item.song = song;
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
    return Promise.all(newData);
  }

   function handleDeleteItem(editItem) {
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
    });

    setRatings(newData);
    return Promise.all(newData);
    //refreshRatings();
  }

  const handleAddItem = () => {
    return fetch("http://127.0.0.1:8000/api/ratings/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
      body: JSON.stringify({
        username: username,
        song: song,
        review: review,
        rating: rating
      }),
      }).then((res) => res.json)
      .then((json) => {return json;});
 
  }
  
  const onPressSaveAdd = () => {
    if (onSubmit())
    {
      checkRating();
      handleAddItem().then(() => refreshRatings());
      //refreshRatings();
    }
    setisAddModalVisible(false);

    return rating;
    
  }

  const onPressSaveEdit = (rating) => {
    checkRating();
    handleEditItem(editItem).then(() => refreshRatings());
    setisEditModalVisible(false);
    
  }

  const checkRating = () => {
    if (!username.trim()) {
      Alert.alert("Input Error", "Please enter username!");
      return false;
    }
    else if (!song.trim()) {
      Alert.alert("Input Error", "Please enter song!");
      return false;
    }
    else if (!review.trim()) {
      Alert.alert("Input Error", "Please enter artist!");
      return false;
    }
    else if (rating > 5) 
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
    handleDeleteItem(editItem).then(() => refreshRatings());
    setisEditModalVisible(false);
  }

  const avgRating = (song) => {
    let items = ratings.filter((rating) => rating.song === song);
    var avg = 0;
    items.forEach(item => {
        avg += item.rating
  
        //console.log(item.rating)
        }
        );
    
    //console.log(avg);
    return Math.round(avg/items.length * 10) / 10
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>Song: {item.song} {"\n"}
                                              Artist: {item.review} {"\n"}
                                              User: {item.username} {"\n"}
                                              Rating: {item.rating} {"\n"}
                                              Avg. Rating: {avgRating(item.song)}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#f98dc9" : "#FFF";
    const color = item.id === selectedId ? '#FFF' : '#454545';

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
      <TouchableOpacity
        onPress = {() => setisAddModalVisible(true)}
        style = {styles.touchableSave}
      >
        <Text style = {styles.buttonText}>Post Rating</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        visible = {isAddModalVisible}
        onRequestClose = {() => setisAddModalVisible(false)}
      >
        <View style={styles.modalView}>
        <TouchableOpacity
          onPress = {() => setisAddModalVisible(false)}
          style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <Text style= {styles.text}>Username:</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {(text) => setUsername(text)}
          defaultValue = {""}
          editable = {true}
          placeholder = {"Enter your username."}
        />
        <Text style = {styles.text}>Song:</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {(text) => setSong(text)}
          defaultValue = {""}
          editable = {true}
          placeholderStyle = {{fontSize: 5}}
          placeholder = {"Enter the song to review."}
        />
        <Text style = {styles.text} >Artist:</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {(text) => setReview(text)}
          defaultValue = {""}
          editable = {true}
          placeholder = {"Enter the artist."}
        />
        <Text style = {styles.text}>Rating:</Text>
        <TextInput
          style = {styles.textInput}
          onChangeText = {(text) => setRating(text)}
          defaultValue = {""}
          editable = {true}
          placeholder = {"Ranging from 1 to 5!"}
        />
        </View>
        <TouchableOpacity
          onPress = {() => checkRating() && onPressSaveAdd(rating)}
          style = {styles.touchableSave}
        >
          <Text style = {styles.buttonText}>Save</Text>
        </TouchableOpacity>

      </Modal>
      <Modal
        animationType="fade"
        visible={isEditModalVisible}
        onRequestClose={() => setisEditModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress = {() => setisEditModalVisible(false)}
            style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress = {() => onPressDelete(false)}
            style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>

          <Text style={styles.text}>Change Song:</Text>
          <TextInput 
          style={styles.textInput}
          onChangeText = {(text) => setSong(text)}
          defaultValue = {song}
          editable={true}
          multiline={false}
          />

          <Text style={styles.text}>Change Artist:</Text>
          <TextInput 
          style={styles.textInput}
          onChangeText = {(text) => setReview(text)}
          defaultValue = {review}
          editable={true}
          multiline={false}
          />

          <Text style={styles.text}>Change Rating:</Text>
          <TextInput 
          style={styles.textInput}
          keyboardType = 'numeric'
          onChangeText = {(text) => setRating(text)}
          defaultValue = {rating.toString()}
          editable={true}
          multiline={false}
          //onSubmitEditing = {(text) => checkRating(text)}
          />
        </View>
        <TouchableOpacity
          onPress = {() =>  checkRating() && onPressSaveEdit(rating) }
          style = {styles.touchableSave}
        >
          <Text style = {styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};


export default Ratings;
