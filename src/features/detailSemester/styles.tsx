import { StyleSheet } from 'react-native';
import { Colors } from '../../conf';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageHeader: {
    tintColor: Colors.secondary,
    height: 25,
  },
  imageHeaderPlayPause: {
    tintColor: Colors.secondary,
    height: 35,
  },
  iconCheck: {
    height: 50,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  herderTitle: {
    fontSize: 20,
    color: Colors.secondary,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  btnFinish: {
    backgroundColor: Colors.secondary,
    height: 40,
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFinish: { fontSize: 18, color: Colors.primary, fontWeight: 'bold' },
});
export default styles;
