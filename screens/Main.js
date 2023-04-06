import { StyleSheet } from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import React from 'react'
import Movie from './Movie';
const Stack = createNativeStackNavigator();

export default function Main() {
	return (
			<NavigationContainer style={styles.background}>
			<Stack.Navigator screenOptions={{
					headerShown: false
				}} initialRouteName="Home">
				<Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Movie" component={Movie} />
			</Stack.Navigator>
		</NavigationContainer>
		
	)
}

const styles = StyleSheet.create({
	background:{
		color: "#000"
	}
})