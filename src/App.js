import React, { useCallback, useEffect, useState } from 'react'
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
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 2,
      sound: new Howl({
        src: ElectricGuitarCoutrySlide,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 3,
      sound: new Howl({
        src: FutureFunkBeats,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 4,
      sound: new Howl({
        src: GrooveBTanggu,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 5,
      sound: new Howl({
        src: MazePolitics,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 6,
      sound: new Howl({
        src: PASGROOVE,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 7,
      sound: new Howl({
        src: SilentStarOrganSynth,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 8,
      sound: new Howl({
        src: StompySlosh,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 9,
      sound: new Howl({
        src: StutterBreakBeats,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
  ]);

  const [isOn, setIsOn] = useState(false)
  const [timer, setTimer] = useState(false)
  const [standBy,setStandBy] = useState([])

  useEffect(() => {
    if (isOn) {
      if (timer === false) {
        return console.log('IM NULL');
      }
      else if (timer > 0) {
        setTimeout(() => {
          setTimer(timer - 1)
          console.log(timer);
        }, 1000)
      }
      else if (timer === 0) {
        setTimer(8)
      }
    }
    else {
      setTimer(false)
    }
  }, [isOn, timer])

  const play = useCallback(() => {
    setIsOn(true);
  }, []);

  const stop = () => {
    setIsOn(false);
    const audioSoundsCopy = [...audioSounds];
    audioSoundsCopy.forEach(as => {
      as.isPlaying = false
      as.sound.stop();
    });
    standBy.forEach(sb => {
      clearTimeout(sb)
    })
    setAudioSounds(audioSoundsCopy);
  };

  const pushToStandBy = (audioSound) => {
    return standBy.push(setTimeout(() => {
      audioSound.sound.play()
    }, parseInt(`${timer}000`)))
  }

  const turnOffSound = (audioSound) => {
    audioSound.isPlaying = false;
    audioSound.sound.stop();
    console.log('OFF', audioSound.id);
  }

  const checkStatus = () => {
    console.log(audioSounds.filter(as => as.isPlaying))
    if (audioSounds.filter(as => as.isPlaying).length === 0) {
      stop()
      alert('All Pads are off, looper is of, please reset the looper by click PLAY')
    }
  }

  const changePlayingStatus = (id) => {
    if (isOn) {
      const audioSoundsCopy = [...audioSounds];
      const audioSound = audioSoundsCopy.find(as => as.id === id);
      if (!audioSound.isPlaying) {
        audioSound.isPlaying = true;
        setAudioSounds(audioSoundsCopy);
        if (!timer) {
          setTimer(8)
          audioSound.sound.play()
          console.log(timer, 'STATUS');
        }
        else {
          console.log('SONG STAND BY WITH ' + timer + " sec")
          pushToStandBy(audioSound)
        };
      }
      else {
        turnOffSound(audioSound)
        setAudioSounds(audioSoundsCopy);
        checkStatus()
      }
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
