import React from "react";
import { Dimensions, Image, StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import Container from "./components/Container";
import Label from "./components/Label";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  floor,
  not,
  set,
  useCode,
} from "react-native-reanimated";
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from "react-native-redash";


import { RadioButton, Paragraph } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export const assets = [
  require("./assets/3.jpg"),
  require("./assets/2.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/1.jpg"),
];


const snapPoints = assets.map((_, i) => i * -width);


const Swiper = () => {

  const [heightValue, setHeightValue] = React.useState();
  const [genderValue, setGenderValue] = React.useState();


  const GenderPicker = () => {

    return (
        <RadioButton.Group
          onValueChange={(newValue) => setGenderValue(newValue)}
          value={genderValue}
          // value={(value) => {
          //   value;
          // }}
        >
          <View style={styles.row}>
            <Paragraph>Male</Paragraph>
            <RadioButton value="Male"></RadioButton>
          </View>
          <View style={styles.row}>
            <Paragraph>Female</Paragraph>
            <RadioButton value="Female"></RadioButton>
          </View>
        </RadioButton.Group>
    );
  };
  const Slide1 = () => {
    return (
      <ScrollView style={styles.scroll}>
      <View style={styles.picture}>
      {/* <View style={styles.pictures}> */}
      <GenderPicker/>
      </View>
      </ScrollView>
    );
  }
  const Slide2 = () => {
    return (
      <View style={styles.picture}>
      <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 8 }}>Frame dog!</Text>
      </View>
    );
  }
  const Slide3 = () => {
    return (
      <View  style={styles.picture}>
      <Container>
           <Label text="Enter Height" />
           <TextInput
             style={styles.textInput}
             value={heightValue}
             onChangeText={(value) => {
              console.log("T1:value" + value + ", heightValue:" + heightValue)
              setHeightValue(value );
            }}
           />
           </Container>
        {/* <Container>
            <TextInput
            placeholder="height"
            keyboardType="numeric"
            style={styles.input}
            value={heightValue}
            onChangeText={(value) => {
              console.log("T2:value" + value + ", heightValue:" + heightValue)
              setHeightValue(value );
            }}
          />
            </Container> */}
      </View>
    );
  }

  const handleCalculate = () => {
    console.log("handleCalculate, heightValue:" + heightValue);
    console.log("handleCalculate, genderValue:" + genderValue);
  }


  const Slide4 = () => {
    return (
      <View  style={styles.picture}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCalculate}
        >
          <Text style={styles.buttonText}>Calculate </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const classAssets = [
    <Slide1/>,
    <Slide2/>,
    <Slide3/>,
    <Slide4/>,
  ];

  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const {
    gestureHandler,
    state,
    velocity,
    translation,
  } = usePanGestureHandler();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
          debug("index", index),
        ]),
      ]),
    ],
    []
  );
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[styles.pictures, { transform: [{ translateX }] }]}
          >
            {classAssets.map((asset, index) => (
              <View key={index}  >
             {asset}
            </View>

              // {assets.map((source) => (
              // <View key={source} style={styles.picture}>
              //   <Image style={styles.image} {...{ source }} />
              // </View>
            ))}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#E1D7D8",
    // padding: 30,
  },
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    height: "80pt",
    // backgroundColor: "black",
  },
  row: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pictures: {
    width: width * assets.length,
    height,
    flexDirection: "row",
  },
  picture: {
    flexDirection: "column",
    flexWrap: "wrap",
    width,
    height,
    overflow: "hidden",
    // justifyContent: 'center'
  },
  textInput: {
    height: 80,
    width: width / 2,
    fontSize: 30,
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    height: 80,
    textAlign: "center",
    width: width / 2,
    fontSize: 20,
    marginTop: 24,
    color: "#FFCB1F",
    // justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  button: {
    backgroundColor: "#1D1D1B",
  },
  buttonText: {
    alignSelf: "center",
    padding: 30,
    fontSize: 25,
    color: "#FFCB1F",
    fontWeight: "bold",
  },
});


export default Swiper;