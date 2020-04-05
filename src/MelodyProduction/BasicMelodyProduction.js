import Player from "../functions/player";

const mm = require("@magenta/music");

let playerBasic = new Player();
const melodyBasic = new mm.MusicRNN(
  "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn"
);
let cycleOne = [];
let cycleTwo = [];
let currentCycle = 1;
let position = 1;

export function produceMelodyBasic(setLoading) {
  setLoading(true);
  const a = Generate();
  const b = Generate();
  const c = Generate();

  Promise.all([a, b, c]).then(values => {
    async function add() {
      cycleOne.push(values[0], values[1], values[0], values[1]);
      cycleOne.push(values[0], values[2], values[0], values[2]);
      cycleOne.push(values[0], values[1], values[0], values[1]);
      cycleOne.push(values[0], values[2], values[0], values[2]);
      setLoading(false);
    }
    add().then(() => {
      console.log(cycleOne);
      playerBasic.start(cycleOne[0]).then(() => {
        Play(position);
      });
    });
  });
}

function Play(pos) {
  if (currentCycle === 1) {
    if (pos === 1) {
      Replace(2);
    }
    playerBasic.start(cycleOne[pos]).then(() => {
      position = (pos + 1) % 16;
      if (position % 16 === 1) {
        currentCycle = 2;
        Play(position);
      } else {
        Play(position);
      }
    });
  }
  if (currentCycle === 2) {
    if (pos === 1) {
      Replace(1);
    }
    playerBasic.start(cycleTwo[pos]).then(() => {
      position = (pos + 1) % 16;
      if (position % 16 === 1) {
        currentCycle = 1;
        Play(position);
      } else {
        Play(position);
      }
    });
  }
}

function Generate() {
  const STEPS_PER_CHORD = 2;
  const STEPS_PER_PROG = 4 * STEPS_PER_CHORD;
  const NUM_REPS = 4;

  let seq = {
    quantizationInfo: { stepsPerQuarter: 4 },
    notes: [],
    totalQuantizedSteps: 1
  };

  return new Promise((resolve, reject) => {
    try {
      melodyBasic
        .continueSequence(
          seq,
          STEPS_PER_PROG + (NUM_REPS - 1) * STEPS_PER_PROG - 1,
          0.6
        )
        .then(contSeq => {
          contSeq.notes.forEach(note => {
            note.quantizedStartStep += 1;
            note.quantizedEndStep += 1;
            seq.notes.push(note);
          });
          resolve(seq);
        });
    } catch {
      reject(console.log("Creation of melody failed."));
    }
  });
}

function Replace(cycle) {
  if (cycle === 2) {
    cycleTwo = [];
    let d, e, f;

    function genAll() {
      d = Generate();
      e = Generate();
      f = Generate();

      Promise.all([d, e, f]).then(values => {
        cycleTwo.push(values[0], values[1], values[0], values[1]);
        cycleTwo.push(values[0], values[2], values[0], values[2]);
        cycleTwo.push(values[0], values[1], values[0], values[1]);
        cycleTwo.push(values[0], values[2], values[0], values[2]);
        console.log(cycleTwo);
      });
    }
    genAll();
  }
  if (cycle === 1) {
    cycleOne = [];

    function genAll() {
      let a = Generate();
      let b = Generate();
      let c = Generate();

      Promise.all([a, b, c]).then(values => {
        cycleOne.push(values[0], values[1], values[0], values[1]);
        cycleOne.push(values[0], values[2], values[0], values[2]);
        cycleOne.push(values[0], values[1], values[0], values[1]);
        cycleOne.push(values[0], values[2], values[0], values[2]);
        console.log(cycleOne);
      });
    }
    genAll();
  }
}

export function PauseBasic() {
  playerBasic.pause();
}
export function ResumeBasic() {
  playerBasic.resume();
}
export function isPlayerInitiatedBasic() {
  return playerBasic.isPlaying();
}

export function disposeBasic() {
  melodyBasic.dispose();
  playerBasic.stop();
  cycleOne = [];
  cycleTwo = [];
}
