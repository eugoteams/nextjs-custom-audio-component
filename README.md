<!-- @format -->

# Nextjs Custom Audio Player

A custom player build on top of audio tag of html5.

Reference :https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

The above component takes the audioSrc as props and when the the sources is loaded it plays the audioSrc.

## Implementaion :

Copy the the AudioComponent Folder in to your project .

Then , import it in to the parentComponent.

```react
     <AudioComponent
        trackId={track}
        onTrackPlayEnded={onTrackEndListener}
        onPlayerNextTrack={onPlayerNextTrackListener}
        onPlayerPrevTrack={onPlayerPrevTrackListener}
      />
```

- ### trackId :

  you can pass trackId or the complete url which point to the audiofile and in the AudioComponent replace the src.

- ### onTrackPlayEnded:

  This event is fired when player has done playing the track.

- ### onPlayerNextTrack:

  This event is fired when user clicks on the forwardbutton.

- ### onPlayerPrevTrack:
  This event is fired when user clicks on the backbutton.

#### Note:

In the index when the onPlayerNextTrack and onPlayerPrevTrack events i have just incremented the trackID where as you can also move playercurrentTime to +5s /-5s.Same with onTrackPlayEnded .
