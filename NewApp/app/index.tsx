// import React, { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const App = () => {
//   const [isToggle, setIsToggle] = useState(false);

//   const changeColor = () => {
//     setIsToggle(!isToggle);
//   };

//   return (
//     <View style={styles.container}>
//       <View
//         style={[styles.card, { backgroundColor: isToggle ? "red" : "skyblue" }]}
//       >
//         <Text style={styles.text}>Click button to change color</Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={changeColor}>
//         <Text style={styles.buttonText}> Change color</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   card: {
//     width: 250,
//     height: 150,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   text: {
//     color: "white",
//     fontSize: 20,
//     padding: 20,
//   },
//   button: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: "black",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default App;