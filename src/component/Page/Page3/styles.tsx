import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../../conf';
const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginRight: 200

  },
  ViewImage: {
    width: '80%',
    height: sizeDevices == 'small' ? '25%' : '35%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    marginVertical: 20,
  },
  image: {
    width: '95%',
    height: '95%',
  },
  title: {
    fontSize: sizeDevices == 'small' ? 18 : 25,
    // fontWeight: 'bold',
  },
  question: {
    fontSize: sizeDevices == 'small' ? 25 : 35,
    color: '#000000',
    // fontWeight: 'bold',
  },
  viewQuestion: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // marginRight: 100
  },
  line: {
    borderBottomWidth: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 10,
  },
  root: {
    opacity: 0,
    flex: 1,
  },
});
export default styles;
