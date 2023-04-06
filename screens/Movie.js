import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon } from 'react-native-elements'
import {REACT_APP_API_KEY} from "@env"

const deviceWidth = Dimensions.get('window').width;

export default function Movie({ route, navigation }) {
	const { itemPassed } = route.params;
	

	const [movieDetails, setMovieDetails] = useState();
	const imdbID = itemPassed["imdbID"];
	const [loading, setLoading] = useState(true);

	const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${REACT_APP_API_KEY}`

	useEffect(() => {
	  fetch(url) 
			.then(response => response.json())
			.then(json => {
				setMovieDetails(json)
				setLoading(false);
			})
	})

	//Details to display on the indiviudal movie screen
	const smallTextDialogArray = ["Director", "Year", "Rated", "Runtime"]

	if(loading){
		return null;
	}
	else{
		return (
			<ScrollView style={styles.background}>
			<View>
				<View style>
					<ImageBackground source={{uri: movieDetails["Poster"]}} style={styles.poster}>
						<View style={styles.backButtonContainer}>
							<Icon name='arrow-back' color="#fff" onPress={() => {
								navigation.goBack(null);
							}} iconStyle={styles.backIcon}/>
						</View>
						
					</ImageBackground>
					<Text style={styles.title}>{movieDetails["Title"]}</Text>
				</View>
					
					<Text style={styles.plot}>{movieDetails["Plot"]}</Text>
					<View style={styles.smallTextDialogContainer}>
						{smallTextDialogArray.map((item, key) => {
							return(<View key={key} style={styles.smallTextDialog}>
								<Text style={styles.Text}>{movieDetails[item]}</Text>
							</View>)
							
						})}
					</View>

				<View>
				<Text style={styles.title}>Ratings</Text>
				<View style={styles.RatingContainer}>
						{movieDetails["Ratings"].map((item, key) => {
							return(<View key={key} style={styles.ratingDialog}>
								<Text style={styles.subTitle}>{item["Source"]}</Text>
								<Text style={styles.Text}>{item["Value"]}</Text>
							</View>)
						})}
					</View>
				</View>
					
				<TouchableOpacity  style={styles.playButton}>
					<Text style={styles.playText}>Watch Now</Text>
				</TouchableOpacity>
			</View>
			</ScrollView>
		)
	}
	
}

const styles = StyleSheet.create({
	background:{
		backgroundColor: "#000",
		height: "100%"
	},
	Text:{
		color: "#fff",
		fontWeight:500,
		alignSelf: "center"
	},
	poster:{
		width: deviceWidth, 
		height: 550,
		alignItems: "left"
	},
	title:{
		fontSize:25,
		fontWeight: 600,
		color: "#fff",
		alignSelf: 'center',
		margin:15
	},
	subTitle:
	{
		fontSize:20,
		fontWeight: 600,
		color: "#fff",
		margin:15
	},
	plot:{
		fontSize:18,
		color:"#fff",
		fontFamily: "Helvetica",
		margin: 15
	},
	smallTextDialog:{
		backgroundColor:"#2a363b",
		borderRadius:10,
		alignSelf: 'flex-start',
		padding:10
	},
	ratingDialog:{
		backgroundColor:"#2a363b",
		borderRadius:10,
		alignSelf: 'flex-start',
		padding:10,
		marginVertical: 10
	},
	RatingContainer:{
		borderRadius:10,
		padding:10
	},
	smallTextDialogContainer:{
		flexDirection: 'row',
    alignItems: 'center',
		justifyContent:"space-evenly"
	},
	playButton:{
		backgroundColor: "red",
		borderRadius: 20,
		margin:20
	},
	playText:{
		fontSize: 20,
		color: "#fff",
		alignSelf: 'center',
		padding: 10,
		fontWeight:600	
	},
	backIcon: {
		margin: 15
	},
	backButtonContainer:{
		backgroundColor: "#2a363b",
		borderRadius: "50%",
		marginTop: 40,
		marginLeft: 15
	}
		
})