import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import windowSize from '../consts/Layout';
import Colors from '../consts/Colors';

interface Styles {
	container: ViewStyle,
	flexCenter: ViewStyle,
	textButton: TextStyle,
	pointStyle: ViewStyle,
	drawerButton: ViewStyle,
	button: ViewStyle,
	map: ViewStyle
	input: TextStyle,
	bottomExpandView: ViewStyle
}

const stylesheet = StyleSheet.create<Styles>({
	container: {
		width: windowSize.width,
		height: windowSize.height
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	textButton: {
		color: Colors.white,
		textAlign: 'center',
		fontSize: 20
	},
	pointStyle: {
		height: 25,
		width: 25,
		backgroundColor: Colors.blue,
		borderRadius: 50,
		borderColor: Colors.white,
		borderWidth: 3
	},
	drawerButton: {
		position: 'absolute',
		top: 100,
		left: 100,
		width: 50,
		height: 50
	},
	button: {
		color: Colors.white,
		paddingHorizontal: 20,
		paddingVertical: 15,
		fontSize: 18,
		backgroundColor: Colors.blue
	},
	map: {
		flex: 5
	},
	input: {
		flex: 1,
		position: 'relative',
		marginHorizontal: 20,
		paddingHorizontal: 20,
		borderRadius: 30,
		borderColor: Colors.blue,
		backgroundColor: Colors.white,
		fontSize: 20
	},
	bottomExpandView: {
		paddingLeft: 20,
		paddingVertical: 10,
		backgroundColor: Colors.white,
		position: 'absolute',
		bottom: 48,
		width: '100%'
	}
});

export default stylesheet;