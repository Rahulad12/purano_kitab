import React from "react";
import { Image, View } from "react-native";
const Profile = () => {
  return (
    <View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          borderRadius: 10,
          margin: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#f0f0f0",
            padding: 20,
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
