import {
  levenshteinDistanceNoteVariance,
  levenshteinDistanceNoteStartTimes
} from "../functions/levenshteinDistance";
import "../functions/maximinFitness";
import maximinFitness from "../functions/maximinFitness";

const mm = require("@magenta/music");

const player = new mm.Player();
const melody = new mm.MusicRNN(
  "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn"
);
let cycleOne = [];
let cycleTwo = [];
let currentCycle = 1;
let position = 1;

export function produceMelody(setLoading) {
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

      console.log(values[0].notes);

      console.log(
        "LD notes = " +
          levenshteinDistanceNoteVariance(values[0], values[1]) +
          "LD starts = " +
          levenshteinDistanceNoteStartTimes(values[0], values[1])
      );
      console.log(
        "fitness = " +
          maximinFitness(
            levenshteinDistanceNoteVariance(values[0], values[1]),
            levenshteinDistanceNoteStartTimes(values[0], values[1])
          )
      );
    }
    add().then(() => {
      player.start(cycleOne[0]).then(() => {
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
    player.start(cycleOne[pos]).then(() => {
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
    player.start(cycleTwo[pos]).then(() => {
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
      melody
        .continueSequence(
          seq,
          STEPS_PER_PROG + (NUM_REPS - 1) * STEPS_PER_PROG - 1,
          0.9
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

    let dFit, eFit, fFit;
    let d, e, f;

    async function checkFitness(resolve, reject) {
      d = Generate();
      e = Generate();
      f = Generate();
      Promise.all([d, e, f]).then(values => {
          dFit = maximinFitness(
            levenshteinDistanceNoteVariance(values[0], cycleOne[0]),
            levenshteinDistanceNoteStartTimes(values[0], cycleOne[0])
          );
          eFit = maximinFitness(
            levenshteinDistanceNoteVariance(values[1], cycleOne[1]),
            levenshteinDistanceNoteStartTimes(values[1], cycleOne[1])
          );
          fFit = maximinFitness(
            levenshteinDistanceNoteVariance(values[2], cycleOne[2]),
            levenshteinDistanceNoteStartTimes(values[2], cycleOne[2])
          );
          if (dFit > -4 && eFit > -4 && fFit > -4) {
            cycleTwo.push(values[0], values[1], values[0], values[1]);
            cycleTwo.push(values[0], values[2], values[0], values[2]);
            cycleTwo.push(values[0], values[1], values[0], values[1]);
            cycleTwo.push(values[0], values[2], values[0], values[2]);
            console.log(cycleTwo);
            unfit = false;
          }
          console.log("unfit scores = " + dFit + " " + eFit + " " + fFit);
  })
  new Promise((r, j) => {
    checkFitness(r, j);
  }).then((result) => {

  })
  }
}
  }
  if (cycle === 1) {
    cycleOne = [];
    let unfit = true;
    console.log("i was looking at the wrong loop...");
    while (unfit) {
      const a = Generate();
      const b = Generate();
      const c = Generate();

      Promise.all([a, b, c]).then(values => {
        let aFit = maximinFitness(
          levenshteinDistanceNoteVariance(values[0], cycleTwo[0]),
          levenshteinDistanceNoteStartTimes(values[0], cycleTwo[0])
        );
        let bFit = maximinFitness(
          levenshteinDistanceNoteVariance(values[1], cycleTwo[1]),
          levenshteinDistanceNoteStartTimes(values[1], cycleTwo[1])
        );
        let cFit = maximinFitness(
          levenshteinDistanceNoteVariance(values[2], cycleTwo[2]),
          levenshteinDistanceNoteStartTimes(values[2], cycleTwo[2])
        );

        if (aFit > -4 && bFit > -4 && cFit > -4) {
          //PASSED
          cycleOne.push(values[0], values[1], values[0], values[1]);
          cycleOne.push(values[0], values[2], values[0], values[2]);
          cycleOne.push(values[0], values[1], values[0], values[1]);
          cycleOne.push(values[0], values[2], values[0], values[2]);
          console.log(cycleOne);
          unfit = false;
        }
        //FAILED
        console.log("unfit scores = " + aFit + " " + bFit + " " + cFit);
      });
    }
  }
}

export function Pause() {
  player.pause();
}
export function Resume() {
  player.resume();
}
export function isPlayerInitiated() {
  return player.isPlaying();
}
export function setPlayerTempo(tempo) {
  player.setTempo(tempo);
}
