import * as mm from "@magenta/music";
import * as Tone from "tone";

export default class Player extends mm.BasePlayer {
  constructor() {
    super();
    this.bassSynth = new Tone.Synth({
      volume: 8,
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.4,
        decay: 0.1,
        sustain: 0.7,
        release: 0.3
      }
    }).toMaster();

    this.reverb = new Tone.Reverb();

    this.polySynth = new Tone.Synth({
      volume: 5,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.4,
        decay: 0.8,
        sustain: 0.7,
        release: 0.3
      }
    })
      .connect(this.reverb)
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
