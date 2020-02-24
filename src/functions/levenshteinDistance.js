//build an array of all notes and their pitches then calculate ld

export function levenshteinDistanceNoteVariance(a, b) {
  let aNotes = [];
  let bNotes = [];

  a.notes.forEach(note => aNotes.push(note.pitch));
  b.notes.forEach(note => bNotes.push(note.pitch));

  const distanceMatrix = Array(bNotes.length + 1)
    .fill(null)
    .map(() => Array(bNotes.length + 1).fill(null));

  for (let i = 0; i <= aNotes.length; i += 1) {
    distanceMatrix[0][i] = i;
  }

  for (let j = 0; j <= bNotes.length; j += 1) {
    distanceMatrix[j][0] = j;
  }

  for (let j = 1; j <= bNotes.length; j += 1) {
    for (let i = 1; i <= aNotes.length; i += 1) {
      const indicator = aNotes[i - 1] === bNotes[j - 1] ? 0 : 1;
      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1, // deletion
        distanceMatrix[j - 1][i] + 1, // insertion
        distanceMatrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return distanceMatrix[bNotes.length][aNotes.length];
}

export function levenshteinDistanceNoteStartTimes(a, b) {
  let aNotes = [];
  let bNotes = [];

  a.notes.forEach(note => aNotes.push(note.quantizedStartStep));
  b.notes.forEach(note => bNotes.push(note.quantizedStartStep));

  const distanceMatrix = Array(bNotes.length + 1)
    .fill(null)
    .map(() => Array(bNotes.length + 1).fill(null));

  for (let i = 0; i <= aNotes.length; i += 1) {
    distanceMatrix[0][i] = i;
  }

  for (let j = 0; j <= bNotes.length; j += 1) {
    distanceMatrix[j][0] = j;
  }

  for (let j = 1; j <= bNotes.length; j += 1) {
    for (let i = 1; i <= aNotes.length; i += 1) {
      const indicator = aNotes[i - 1] === bNotes[j - 1] ? 0 : 1;
      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1, // deletion
        distanceMatrix[j - 1][i] + 1, // insertion
        distanceMatrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return distanceMatrix[bNotes.length][aNotes.length];
}
