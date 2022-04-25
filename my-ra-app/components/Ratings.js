import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";



const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>Song: {item.song} {"\n"}
                                            User: {item.username} {"\n"}
                                            Rating: {item.rating} {"\n"}
                                            Review: {item.review}
    </Text>
  </TouchableOpacity>
);

const Test = () => {

  const [ratings, setRatings] = useState([]);  
  const [selectedId, setSelectedId] = useState(null);



  useEffect(async () =>
  {
      const res = await fetch("http://127.0.0.1:8000/api/ratings/");
      //console.log(res.json());
      refreshRatings();
      
  }, []);


  const refreshRatings = () => {

      fetch("http://127.0.0.1:8000/api/ratings/")
          .then((response) => response.json())  
          .then((res) => setRatings(res) )
          .catch((error) => console.error(error))
        
         
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Test;