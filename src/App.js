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
import Message from './components/Message';


const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: '#595454',
    height: '130vh',
    width: '130wh'
  }
}));


function App() {
  const classes = useStyles();
  const [audioSounds, setAudioSounds] = useState([
    {
      id: 1,
      name: 'Heavy funk groov',
      sound: new Howl({
        src: HeavyFunkGroove,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 2,
      name: 'electric guitar',
      sound: new Howl({
        src: ElectricGuitarCoutrySlide,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 3,
      name: 'Future Funk Beats',
      sound: new Howl({
        src: FutureFunkBeats,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 4,
      name: 'tanggu grove',
      sound: new Howl({
        src: GrooveBTanggu,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 5,
      name: 'Maze Politics',
      sound: new Howl({
        src: MazePolitics,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 6,
      name: 'pass groove',
      sound: new Howl({
        src: PASGROOVE,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 7,
      name: 'Silent Star Organ Synth',
      sound: new Howl({
        src: SilentStarOrganSynth,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 8,
      name: 'Stompy Slosh',
      sound: new Howl({
        src: StompySlosh,
        loop: true,
        volume: 0.5,
      }),
      isPlaying: false
    },
    {
      id: 9,
      name: 'Stutter Break Beats',
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
  const [standBy, setStandBy] = useState([])
  const [openMessage, setOpenMessage] = useState(false)
  const [message, setMessage] = useState('')

  const handleClose = () => setOpenMessage(false)

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
      as.sound.stop();
      as.isPlaying = false
    });
    standBy.forEach(sb => {
      sb.action = clearTimeout(sb.action)
      standBy.shift();
    })
    setAudioSounds(audioSoundsCopy);
  };

  const pushToStandBy = (audioSound) => {
    return standBy.push({
      id: audioSound.id,
      action: setTimeout(() => {
        audioSound.sound.play()
        standBy.shift()
      }, parseInt(`${timer}000`))
    }
    )
  }

  const turnOffSound = (audioSound) => {
    audioSound.isPlaying = false;
    audioSound.sound.stop();
    const clearAll = standBy.filter(sb => sb.id === audioSound.id)[0]
    if (clearAll) {
      clearAll.action = clearInterval(clearAll.action)
      standBy.shift();
      console.log(clearAll, standBy);
    }
    console.log('OFF', audioSound.id);
  }

  const checkStatus = () => {
    console.log(audioSounds.filter(as => as.isPlaying))
    if (audioSounds.filter(as => as.isPlaying).length === 0) {
      stop()
      setMessage("All Pads are off, looper is turn off,click Play OR Record Button's to start again")
      setOpenMessage(true)
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
      setMessage("Push Play OR Record Button's to get started")
      setOpenMessage(true)
    };
  };



  return (
    <div className={classes.app}>
      <Grid container justify="center" direction="row">
        <NavBar />
        <Pads audioSounds={audioSounds} changePlayingStatus={changePlayingStatus} />
        <Controlers play={play} stop={stop} />
        <Message openMessage={openMessage} message={message} handleClose={handleClose} />
      </Grid>
    </div>
  );
}

export default App;
