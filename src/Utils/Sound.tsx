import Sound from 'react-native-sound';

export const handleSoundClick = () => {
  let whoosh = new Sound('mouse_click_1.mp3', Sound.MAIN_BUNDLE, er => {
    if (er) {
      return;
    }
    whoosh.play(success => {
      if (success) {
        whoosh.release();
      } else {
        whoosh.stop();
      }
    });
  });
};
