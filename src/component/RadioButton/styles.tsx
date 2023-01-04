import {StyleSheet} from 'react-native';
import {Colors} from '../../conf';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    // flexDirection: 'c',
    alignItems: 'center',
    height: '45%',
    width: '50%',
  },

  textContent: {
    fontSize: 18,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'stretch',
  },

  viewImage: {
    width: '80%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    marginBottom: 20,
  },
});
export default styles;
