import Note from "./note";

function* _randomIterator(items) {
  let b = 1;
  while (items.length > 0) {
    const rand = Math.random() * b;
    let currWeight = 0;
    const index = items.findIndex(item => {
      if (currWeight += item.weight > rand - 0.001) return true;
    });
    const item = items.splice(index, 1)[0];
    b -= item.weight;
    yield item.value;
  }
}

function _randomiseNotes(curNotes, curDuration, options) {
    const totalDuration = options.totalDuration;
    if (curDuration === totalDuration) return curNotes;
    const remainingDuration = totalDuration - curDuration;
    const availableNotes = _randomIterator(options.notes);
    for (let note of availableNotes) {
      const noteDuration = 1 / note;
      if (noteDuration <= remainingDuration) {
        const result = _randomiseNotes(curNotes.concat(note), curDuration + noteDuration, options);
        if (result) return result;
      }
    }
    return null;
}

export function randomiseNotes(options) {
    return _randomiseNotes([], 0, options)
        .map(n => new Note("f/4", n));
}

export class RandomNotesOptions {
    constructor(numBeats, beatValue, notes) {
        this.numBeats = numBeats;
        this.beatValue = beatValue;
        this._notes = notes;
    }

    get totalDuration() {
        return this.numBeats / this.beatValue;
    }

    get notes() {
        return this._notes.slice();
    }
}

