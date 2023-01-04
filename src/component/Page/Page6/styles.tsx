import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../../conf';
const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  containerItem: {
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E6E8',
  },
  root: {
    paddingVertical: 5,
    paddingHorizontal: 10,

  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderColor: '#E8E6E8',
    top: 4,
  },
  text: {
    fontSize: sizeDevices == 'small' ? 16 : 23,
    fontWeight: 'bold',
    color: '#000000',
    margin: 10,
    marginLeft: 20,
  },
  textOptions: {
    fontWeight: 'bold',
    fontSize: sizeDevices == 'small' ? 16 : 23,
  },
  touchableImage: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  touchableImageSelect: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  optionSelect: {
    width: sizeDevices == 'small' ? 30 : 40,
    height: sizeDevices == 'small' ? 30 : 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 20,
    backgroundColor: Colors.primary,
  },
  option: {
    width: sizeDevices == 'small' ? 30 : 40,
    height: sizeDevices == 'small' ? 30 : 40,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 20,
  },
  textOptionsSelect: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: sizeDevices == 'small' ? 20 : 25,
  },
});
export default styles;
