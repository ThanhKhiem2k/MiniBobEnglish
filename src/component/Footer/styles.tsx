import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../conf';
const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    height: sizeDevices == 'small' ? 45 : 60,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  image: {
    height: 30,
    margin: 20,
  },
  text: {
    fontSize: sizeDevices == 'small' ? 25 : 30,
    fontWeight: 'bold',
    color: Colors.textNumber,
  },
});
export default styles;
