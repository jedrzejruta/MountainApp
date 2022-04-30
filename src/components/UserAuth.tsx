import React, { useEffect, useState }  from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import { SignIn, userCredentials } from './UserLogin';
import { SignUp, SignOut } from './UserLogin';
import stylesheet from '../styles/Style';

const AuthUser = (): JSX.Element|null => {
	const [initializing, setInitializing] = useState<boolean>(true);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
	const [email, setEmail] = useState<userCredentials['email']>('');
	const [password, setPassword] = useState<userCredentials['password']>('');
	const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
		setUser(user);
		if(initializing)
			setInitializing(false);
	};
	const signOutAlert = () => {
		Alert.alert(
			'SignOut',
			'You have been succesfully signed out',
			[
				{
					text: 'OK',
					onPress: () => console.log('OK pressed')
				}
			]
		);
	};

	useEffect( () => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	});

	if (initializing) return null;

	if (!user) {
		return (
			<View style={{flex: 1}}>
				<View>
					<Text>Enter credentials</Text>
					<TextInput
						keyboardType="email-address"
						placeholder="email"
						onChangeText={email => setEmail(email)}
						defaultValue={email}
						autoCapitalize="none"
						style={{borderBottomColor: 'gray', borderBottomWidth: 1, fontSize: 16}}
					/>
					<TextInput
						placeholder="password"
						onChangeText={password => setPassword(password)}
						defaultValue={password}
						secureTextEntry={true}
						autoCapitalize="none"
						style={{borderBottomColor: 'gray', borderBottomWidth: 1, fontSize: 16}}
					/>
				</View>
				<View style={{
					flexDirection: 'row',
					marginTop: 15
				}}>

					<Pressable style={ ( pressed ) => [
						{
							backgroundColor: pressed ? 'black' : 'blue',
							width: '50%',
							marginRight: 5
						},
						stylesheet.button
					]}
					onPress={() =>
						SignUp({email, password}) } >
						<Text style={stylesheet.textButton}>Sign Up</Text>
					</Pressable>
					<Pressable style={ ( pressed ) => [
						{
							backgroundColor: pressed ? 'black' : 'blue',
							width: '50%',
						},
						stylesheet.button
					]} onPress={() => SignIn({email, password}) }>
						<Text style={stylesheet.textButton}>Sign In</Text>
					</Pressable>
						
				</View>
			</View>

		);
	}
	return (
		<View>
			<Text>Hello {user.email}!</Text>
			<Pressable
				style={{...stylesheet.button}}
				onPress={() => {
					SignOut(),
					signOutAlert(); }}
			>
				<Text style={stylesheet.textButton}>Sign out</Text>
			</Pressable>
		</View>

	);
};

export default AuthUser;