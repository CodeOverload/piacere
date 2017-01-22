import Note from './note';

function* _randomIterator(items) {
    let b = 1;
    while (items.length > 0) {
        const rand = Math.random() * b;
        let currWeight = 0;
        const index = items.findIndex(item => {
            currWeight += item.weight;
            return currWeight > rand - 0.001;
        });
        const item = items.splice(index, 1)[0];
        b -= item.weight;
        yield item.value;
    }
}

function _randomDurations(curNotes, curDuration, options) {
    const totalDuration = options.totalDuration;
    if (curDuration === totalDuration) return curNotes;
    const remainingDuration = totalDuration - curDuration;
    const availableDurations = _randomIterator(options.durations);
    for (let note of availableDurations) {
        const noteDuration = 1 / note;
        if (noteDuration <= remainingDuration) {
            const result = _randomDurations(curNotes.concat(note), curDuration + noteDuration, options);
            if (result) return result;
        }
    }
    return null;
}

function _randomNotes(durations, options) {
    const noteRange = options.noteRange;
    const availableValues = noteRange[1] - noteRange[0] + 1;
    return durations.map(duration => {
        const noteValue = ~~Math.min(Math.random() * availableValues, availableValues - 1) + noteRange[0];
        return new Note(noteValue, duration);
    });
}

export function randomiseNotes(options) {
    return _randomNotes(_randomDurations([], 0, options), options);
}

export class RandomNotesOptions {
    constructor(numBeats, beatValue, noteRange, durations) {
        this.numBeats = numBeats;
        this.beatValue = beatValue;
        this._durations = durations;
        this.noteRange = noteRange;
    }

    get totalDuration() {
        return this.numBeats / this.beatValue;
    }

    get durations() {
        return this._durations.slice();
    }
}

