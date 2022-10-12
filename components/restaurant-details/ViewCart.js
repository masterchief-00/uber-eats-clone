import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
  serverTimestamp,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL:'https://react-native-uber-eats-7da19-default-rtdb.firebaseio.com/',
  authDomain: "react-native-uber-eats-7da19.firebaseapp.com",
  projectId: "react-native-uber-eats-7da19",
  storageBucket: "react-native-uber-eats-7da19.appspot.com",
  messagingSenderId: "964459915208",
  appId: "1:964459915208:web:b71e8f14636893a40fc2fd",
};

export default function ViewCart({ navigation }) {
  const { items, restaurantName } = useSelector(
    (state) => state.cart.selectedItems
  );
  const [modalVisible, setModalVisibility] = useState(false);
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((previous, current) => previous + current, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  let myApp = initializeApp(firebaseConfig);

  const addOrderToFirebase = () => {
    const db = getDatabase();
    let r = (Math.random() + 1).toString(36).substring(7);
    const reference = ref(db, "orders/" + r);
    set(reference, {
      items: items,
      created_at: serverTimestamp(),
    });

    setModalVisibility(false);
    navigation.navigate("Order completed");
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisibility(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <View key={index}>
                <OrderItem item={item} />
              </View>
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>${totalUSD}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  padding: 13,
                  borderRadius: 30,
                  width: 180,
                  position: "relative",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onPress={() => addOrderToFirebase()}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  Checkout
                </Text>
                <Text
                  style={{ color: "white", position: "absolute", right: 20 }}
                >
                  {total ? "$" + totalUSD : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 20,
            zIndex: 999,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                alignItems: "center",
                padding: 10,
                borderRadius: 30,
                width: 250,
                position: "relative",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
              onPress={() => setModalVisibility(true)}
            >
              <Text style={{ color: "white", fontSize: 20 }}>View cart</Text>
              <Text style={{ color: "white" }}>${totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: 500,
    borderWidth: 1,
  },

  restaurantName: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },

  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  subtotalText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
  },
});
