import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import {
  VideoView,
  useVideoPlayer
} from "expo-video";


import {
  ref,
  push,
  set
} from "firebase/database";


import {
  db
} from "../constants/firebase";




interface Props {

  exercise?: string;

  onRepUpdate: (rep:number)=>void;

}





export default function OpenCVVideo({

  exercise="pushup",

  onRepUpdate

}:Props){





const [video,setVideo] =
useState<string|null>(null);



const [loading,setLoading] =
useState(false);





const player =
useVideoPlayer(

  video ?? ""

);










async function pickVideo(){



const result =
await ImagePicker.launchImageLibraryAsync({

  mediaTypes:["videos"]

});





if(!result.canceled){



setVideo(

  result.assets[0].uri

);



}



}













async function sendVideo(){



if(!video || loading) return;





setLoading(true);






const form =
new FormData();





form.append(

"file",

{

  uri:video,

  name:"workout.mp4",

  type:"video/mp4"

} as any

);











try{



const response =
await fetch(



`http://10.0.2.2:8000/api/count/${exercise}`,



{

method:"POST",

body:form

}



);








const data =
await response.json();







console.log(

"STATUS:",

response.status

);







console.log(

"DATA:",

data

);









if(data.count !== undefined){





// update workout screen count

onRepUpdate(

data.count

);







// save to Firebase

const workoutRef =

push(

ref(db,"workouts")

);







await set(

workoutRef,

{

exercise:data.exercise,

count:data.count,

date:new Date().toISOString()

}

);







console.log(

"Saved to Firebase"

);





}







}

catch(error){



console.log(

"API ERROR:",

error

);



}



finally{



setLoading(false);



}





}















if(!video){



return(



<View style={styles.center}>





<TouchableOpacity



style={styles.button}



onPress={pickVideo}



>



<Text style={styles.text}>



Select Workout Video



</Text>



</TouchableOpacity>





</View>



)



}












return(



<View style={styles.container}>






<VideoView



player={player}



style={styles.video}



fullscreenOptions={{



enable:true



}}



/>









<TouchableOpacity



style={styles.button}



onPress={sendVideo}



disabled={loading}



>



<Text style={styles.text}>




{

loading

?

"Processing..."

:

"Count Reps"



}





</Text>



</TouchableOpacity>







</View>



)



}









const styles = StyleSheet.create({



container:{

flex:1

},





video:{

flex:1

},





center:{

flex:1,

justifyContent:"center",

alignItems:"center"

},





button:{

position:"absolute",

bottom:50,

alignSelf:"center",

backgroundColor:"#4F46E5",

padding:15,

borderRadius:20

},





text:{

color:"white"

}



});