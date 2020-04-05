import * as mm from "@magenta/music";
import * as Tone from "tone";

export default class Player extends mm.BasePlayer {
  constructor() {
    super();
    this.bassSynth = new Tone.Synth({
      volume: 8,
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.2,
        decay: 0.4,
        sustain: 0.4,
        release: 0.6
      }
    }).toMaster();

    this.autopanner = new Tone.AutoPanner({
      frequency: 0.5,
      type: "sine",
      depth: 1
    })
      .toMaster()
      .start();

    this.reverb = new Tone.Reverb({
      decay: 3,
      wet: 1
    }).toMaster();

    this.AutoFilter = new Tone.AutoFilter().toMaster().start();

    this.polySynth = new Tone.Synth({
      volume: 5,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 10,
        decay: 0.8,
        sustain: 1,
        release: 4
      }
    })
      .connect(this.reverb)
      .connect(this.autopanner)
      .connect(this.AutoFilter)
      .toMaster();
    this.tone = Tone;
  }

  playNote(time, note) {
    // If there's a velocity, use it.
    const velocity = note.hasOwnProperty("velocity")
      ? note.velocity / 127
      : undefined;

    if (note.isDrum) {
      this.drumKit.playNote(note.pitch, time, velocity);
    } else {
      const freq = new Tone.Frequency(note.pitch, "midi");
      const dur = note.endTime - note.startTime;
      this.getSynth(note.instrument, note.program).triggerAttackRelease(
        freq,
        dur,
        time,
        velocity
      );
    }
  }

  getSynth(instrument, program) {
    if (program !== undefined && program >= 32 && program <= 39) {
      return this.bassSynth;
    } else {
      return this.polySynth;
    }
  }
}
