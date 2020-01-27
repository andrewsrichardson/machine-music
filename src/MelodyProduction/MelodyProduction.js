const mm = require("@magenta/music");

const player = new mm.Player();
const melody = new mm.MusicRNN(
  "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn"
);
let seqList = [];
let position = 1;

export function produceMelody() {
  const a = Generate();
  const b = Generate();
  const c = Generate();
  Promise.all([a, b, c]).then(sequences => {
    sequences.forEach(currentItem => {
      seqList.push(currentItem);
    });
    player.start(seqList[0]).then(() => {
      Replace(0);
      Play(position);
    });
  });
}

function Play(pos) {
  player.start(seqList[pos]).then(() => {
    Replace(pos);
    position = (pos + 1) % 3;
    Play(position);
  });
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

function Replace(pos) {
  let a = Generate();
  a.then(seq => {
    seqList[pos] = seq;
  });
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
