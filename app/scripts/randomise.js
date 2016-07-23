
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

function _getAvailableNotes() {
  return [
    { value: 1, weight: 0.05 }, 
    { value: 2, weight: 0.2 }, 
    { value: 4, weight: 0.6 }, 
    { value: 8, weight: 0.05 }
  ];
}

function _randomiseNotes(curNotes, curDuration, numBeats, beatValue) {
    const totalDuration = numBeats / beatValue;
    if (curDuration === totalDuration) return curNotes;
    const remainingDuration = totalDuration - curDuration;
    const availableNotes = _randomIterator(_getAvailableNotes());
    for (let note of availableNotes) {
      const noteDuration = 1 / note;
      if (noteDuration <= remainingDuration) {
      	const result = _randomiseNotes(curNotes.concat(note), curDuration + noteDuration, numBeats, beatValue);
        if (result) return result;
      }
    }
    return null;
}

export function randomiseNotes(numBeats, beatValue) {
    return _randomiseNotes([], 0, numBeats, beatValue)
        .map(n => new Note("f/4", n));
}
