import "../../globals";
import { Image, StyleSheet, Text, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { AuthProvider } from "@arcana/auth-rn";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";

const auth = new AuthProvider(
  "xar_dev_92ecc87db08e4c13b1fcd9b37ca9bf54fa874355",
  "com.anonymous.reactnativepg://"
);
export default function HomeScreen() {
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {!loggedIn ? (
        <>
          <Button
            title="Login with Google"
            onPress={async () => {
              await auth.login("google");
              const userInfo = auth.getUserInfo();
              const privateKey = auth.getPrivateKey();
              setUserData(userInfo);
              setPrivateKey(privateKey);
              setLoggedIn(true);
              console.log({ userInfo, privateKey });
            }}
          />
        </>
      ) : (
        <>
          <ThemedText type="title">Logged in</ThemedText>
          <ThemedText>
            Name: <ThemedText type="bold">{userData.name}</ThemedText>
          </ThemedText>
          <ThemedText>
            Email: <ThemedText type="bold">{userData.email}</ThemedText>
          </ThemedText>
          <ThemedText>
            Private Key: <ThemedText type="bold">{privateKey}</ThemedText>
          </ThemedText>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
