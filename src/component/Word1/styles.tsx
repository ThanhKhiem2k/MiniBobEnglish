import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  container: {
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E6E8',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 19,
    color: '#000000',
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderColor: '#E8E6E8',
    top: 4,
  },
});
export default styles;
