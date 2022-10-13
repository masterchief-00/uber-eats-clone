import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import {
  getDatabase,
  ref,
  onValue,
  set,
  serverTimestamp,
} from "firebase/database";
import MenuItems from "../components/restaurant-details/MenuItems";

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Lasagna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
      },
    ],
  });
  const { items, restaurantName } = useSelector(
    (state) => state.cart.selectedItems
  );
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((previous, current) => previous + current, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  /*-----------------------------DOESN'T WORK-------------------------------- */

  let allOrders = [];
  let orders = [];
  let foods = [];
  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, "orders/");
    onValue(reference, (snapshot) => {
      allOrders = snapshot.val();
    });
    orders = Object.values(allOrders);
    orders.sort((a, b) => parseFloat(a.created_at) - parseFloat(b.created_at));

    let ordersObject = Object.assign({}, orders);
    let itemsObject = Object.assign({}, ordersObject[0].items);
    setLastOrder(itemsObject[0]);

    foods.push(lastOrder);
  }, [lastOrder.description]);

  /*-----------------------------DOESN'T WORK-------------------------------- */

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ paddingTop: 40, padding: 20 }}>
        <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.8}
          loop={false}
        />
        <Text>
          Your order at {restaurantName} has been completed for ${totalUSD}
        </Text>
        <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
          source={require("../assets/animations/cooking.json")}
          autoPlay
          speed={0.8}
          loop={true}
        />

        <StatusBar backgroundColor="transparent" style="dark" />
      </View>
    </View>
  );
}
