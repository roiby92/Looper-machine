import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './components/NavBar'
import Pads from './Containers/Pads';
import Controlers from './components/Controlers';
import { Grid } from '@material-ui/core';
import { Howl } from 'howler';
import HeavyFunkGroove from './AudioFiles/BassWarwickHeavyFunkGroove.mp3'
import ElectricGuitarCoutrySlide from './AudioFiles/electricGuitarCoutrySlide.mp3'
import FutureFunkBeats from './AudioFiles/futureFunkBeats25.mp3'
import GrooveBTanggu from './AudioFiles/GrooveBTanggu.mp3'
import MazePolitics from './AudioFiles/MazePolitics.mp3'
import PASGROOVE from './AudioFiles/PAS3GROOVE.mp3'
import SilentStarOrganSynth from './AudioFiles/SilentStarOrganSynth.mp3'
import StompySlosh from './AudioFiles/StompySlosh.mp3'
import StutterBreakBeats from './AudioFiles/stutterBreakBeats16.mp3'

const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: '#595454',
    height: '100vh',
    width: '100wh'
  }
}));


function App() {
  const classes = useStyles();
  const [audioSounds, setAudioSounds] = useState([
    {
      id: 1,
      sound: new Howl({
        src: HeavyFunkGroove,
        loop: true,
        volume: 0,
      })
    },
    {
      id: 2,
      sound: new Howl({
        src: ElectricGuitarCoutrySlide,
        loop: true,
        volume: 0
      })
    },
    {
      id: 3,
      sound: new Howl({
        src: FutureFunkBeats,
        loop: true,
        volume: 0,
      })
    },
    {
      id: 4,
      sound: new Howl({
        src: GrooveBTanggu,
        loop: true,
        volume: 0,
      })
    },
    {
      id: 5,
      sound: new Howl({
        src: MazePolitics,
        loop: true,
        volume: 0,
      })
    },
    {
      id: 6,
      sound: new Howl({
        src: PASGROOVE,
        loop: true,
        volume: 0,
      })
    },
    {
      id: 7,
      sound: new Howl({
        src: SilentStarOrganSynth,
        loop: true,
        volume: 0,
      })
    },
    {
      id: 8,
      sound: new Howl({
        src: StompySlosh,
        loop: true,
        volume: 0,
      })
    },
    {
      id: 9,
      sound: new Howl({
        src: StutterBreakBeats,
        loop: true,
        volume: 0,
      })
    },
  ]);
  const [isOn, setIsOn] = useState(false)
  // const [record, setRecord] = useState({
  //   isRecording: false,

  // })

  const play = () => {
    const audioSoundsCopy = [...audioSounds];
    audioSoundsCopy.forEach(as => {
      as.sound.play();
    });
    setAudioSounds(audioSoundsCopy);
    setIsOn(true);
  };

  const stop = () => {
    const audioSoundsCopy = [...audioSounds];
    audioSoundsCopy.forEach(as => {
      as.sound.volume(0)
      as.sound.stop();
    });
    setAudioSounds(audioSoundsCopy);
    setIsOn(false)
  }

  const changePlayingStatus = id => {
    if (isOn) {
      const audioSoundsCopy = [...audioSounds];
      const audioSound = audioSoundsCopy.find(as => as.id === id);
      if (audioSound.sound._volume === 0) {
        audioSound.sound.volume(0.5);
      }
      else {
        audioSound.sound.volume(0);
      };
      setAudioSounds(audioSoundsCopy);
    }
    else {
      alert('cannot play audio withaout push the play buttonm')
    };
  };


  return (
    <div className={classes.app}>
      <Grid container justify="center" direction="row">
        <NavBar />
        <Pads audioSounds={audioSounds} changePlayingStatus={changePlayingStatus} />
        <Controlers play={play} stop={stop} />
      </Grid>
    </div>
  );
}

export default App;
