import {
  levenshteinDistanceNoteVariance,
  levenshteinDistanceNoteStartTimes,
} from "../functions/levenshteinDistance";
import "../functions/maximinFitness";
import maximinFitness from "../functions/maximinFitness";
import Player from "../functions/player";

const mm = require("@magenta/music");

let player = new Player();
const melody = new mm.MusicRNN(
  "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn"
);
let cycleOne = [];
let cycleTwo = [];
let currentCycle = 1;
let position = 1;
let qpm = 60;
let threshold = -2;

export function produceMelody(setLoading) {
  setLoading(true);
  const a = Generate();
  const b = Generate();
  const c = Generate();

  Promise.all([a, b, c]).then((values) => {
    async function add() {
      cycleOne.push(values[0], values[1], values[0], values[1]);
      cycleOne.push(values[0], values[2], values[0], values[2]);
      cycleOne.push(values[0], values[1], values[0], values[1]);
      cycleOne.push(values[0], values[2], values[0], values[2]);
      setLoading(false);
    }
    add().then(() => {
      console.log(cycleOne);
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
    totalQuantizedSteps: 1,
  };

  return new Promise((resolve, reject) => {
    try {
      melody
        .continueSequence(
          seq,
          STEPS_PER_PROG + (NUM_REPS - 1) * STEPS_PER_PROG - 1,
          0.6
        )
        .then((contSeq) => {
          contSeq.notes.forEach((note) => {
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

    function genAll() {
      d = Generate();
      e = Generate();
      f = Generate();

      Promise.all([d, e, f]).then((values) => {
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
        if (dFit > threshold && eFit > threshold && fFit > threshold) {
          cycleTwo.push(values[0], values[1], values[0], values[1]);
          cycleTwo.push(values[0], values[2], values[0], values[2]);
          cycleTwo.push(values[0], values[1], values[0], values[1]);
          cycleTwo.push(values[0], values[2], values[0], values[2]);
          console.log(cycleTwo);
        } else {
          console.log("unfit scores = " + dFit + " " + eFit + " " + fFit);
          genAll();
        }
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

      Promise.all([a, b, c]).then((values) => {
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

        if (aFit > threshold && bFit > threshold && cFit > threshold) {
          cycleOne.push(values[0], values[1], values[0], values[1]);
          cycleOne.push(values[0], values[2], values[0], values[2]);
          cycleOne.push(values[0], values[1], values[0], values[1]);
          cycleOne.push(values[0], values[2], values[0], values[2]);
          console.log(cycleOne);
        } else {
          console.log("unfit scores = " + aFit + " " + bFit + " " + cFit);
          genAll();
        }
      });
    }
    genAll();
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
  qpm = tempo;
}

export function dispose() {
  melody.dispose();
  player.stop();
  cycleOne = [];
  cycleTwo = [];
}
