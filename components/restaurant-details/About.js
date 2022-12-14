import { View, Text, Image } from "react-native";
import React from "react";

export default function About(props) {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;
  const formattedCategories = categories
    .map((category) => category.title)
    .join(" | ");

  const description = `${formattedCategories} ${
    price ? " | " + price : ""
  } | ${rating} 🌟 (${reviews}+)`;

  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName title={name} />
      <RestaurantDescription body={description} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = (props) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.title}
  </Text>
);

const RestaurantDescription = (props) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      color: "grey",
      fontWeight: "700",
      fontSize: 12,
    }}
  >
    {props.body}
  </Text>
);
