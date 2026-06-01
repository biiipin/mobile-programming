import { COLORS } from "../constants/colors";
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { USER } from "../data/dashboardData";
import { useRouter } from "expo-router";


export default function Header(){
    const router=useRouter();
    return(
        <View style={styles.header}>
            <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.name}>{USER.name} 👋</Text>
        </View>

        <Pressable onPress={()=> router.push("/notifications")}>
            <Text style={styles.notification}> 🔔 </Text>
        </Pressable>
        </View>
    );
}

const styles= StyleSheet.create({
    header:{
        backgroundColor:COLORS.red,
        padding:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,

        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },

    greeting:{
        color:"#ffff",
        fontSize:22,
    },

    name:{
        color:"#fff",
        fontSize:25,
        fontWeight:"600",
        marginTop:5,
    },
    
    notification:{
        fontSize:25,
    },
});