import auth from '@react-native-firebase/auth';

export type userCredentials = {
	email: string;
	password: string;
}

export const SignUp = ( {email, password} : userCredentials ): void => {

	auth().createUserWithEmailAndPassword(email,password)
		.then( () => {
			console.log(`User account created for ${email} address`);
		})
		.catch( error => {
			if (error.code === 'auth/email-already-in-use') {
				console.log(`email ${email} already in use`);
			}
		
			if (error.code === 'auth/invalid-email') {
				console.log('That email is invalid');
			}
			console.log(error);
		});

};

export const SignIn = ( {email, password} : userCredentials ) :void=> {
	auth()
		.signInWithEmailAndPassword(email, password)
		.then( () =>
			console.log('User signed in'))
		.catch(error => {
			console.log(error);
			//alert
		});
};

export const SignOut = () :void => {

	auth()
		.signOut()
		.then( () => console.log('User signed out!'));
};