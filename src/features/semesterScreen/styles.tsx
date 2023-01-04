import {StyleSheet} from 'react-native';
import {Colors} from '../../conf';
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.secondary,
    
  },
  topView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 8,
    height: 50,
    backgroundColor: Colors.secondary,
    marginBottom: 10,
  },
  viewTopic: {
    flex: 0.5,
    alignItems: 'center',
  },
  viewTitle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewContent: {
    flex: 7.5,
    width: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 8,
  },
  row: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  title: {
    color: Colors.thrid,
    fontSize: 20,
    fontWeight: 'bold',
  },
  topic: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  seprator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CEDCCE',
  },
});
export default styles;
