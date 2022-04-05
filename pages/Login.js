import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import Container from "../components/Container";
import Button from "../components/Button";
import Label from "../components/Label";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
//style={{ backgroundColor: "#ffffff" }}
export default class Login extends Component {
  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.main}>
          <View>
            <Container>
              <Label text="Username" />
              <TextInput style={styles.textInput} />
            </Container>
            <Container>
              <Label text="Password" />
              <TextInput secureTextEntry={true} style={styles.textInput} />
            </Container>
          </View>
          <View style={styles.footer}>
            <Container>
              <Button
                label="Sign In"
                styles={{
                  button: styles.primaryButton,
                  label: styles.buttonWhiteText,
                }}
                onPress={this.press.bind(this)}
              />
            </Container>
          </View>
        </View>
      </ScrollView>
    );
  }

  press() {}
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#E1D7D8",
    padding: 30,
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 80,
    width: width / 2,
    fontSize: 30,
    backgroundColor: "#FFF",
  },
  buttonWhiteText: {
    fontSize: 20,
    color: "#FFF",
  },
  primaryButton: {
    backgroundColor: "#34A853",
  },
  inline: {
    flexDirection: "row",
  },
  footer: {
    marginTop: 100,
  },
});
