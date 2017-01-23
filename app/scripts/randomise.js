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

function _randomHandPosition(noteRange) {
    const delta = noteRange[1] - noteRange[0] + 1;
    return ~~(Math.random() * delta) + noteRange[0];
}

export function bar(options) {
    return _randomNotes(_randomDurations([], 0, options), options);
}

export class BarOptions {
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

/**
 * Generates random hand positions. That is, the lowest pitch note each hand
 * should play
 *
 * @returns [l, r]
 */
export function hands(options) {
    const left = _randomHandPosition(options.lNoteRange);
    const rNoteRange = [
        Math.max(options.rNoteRange[0], left + 5),
        options.rNoteRange[1]
    ];
    const right = _randomHandPosition(rNoteRange);
    return [left, right];
}

export class HandsOptions {
    /**
     * Options to use for the hands function. Note that n1 < n2, and n3 < n4,
     * and n4 > n2 + 5 (the latter is so there's always space to place the
     * right hand if the left hand is placed at the very top of it's available range).
     *
     * @param lNoteRange the range of notes that the left hand lowest pitch note
     * should fall within; [n1, n2] inclusive
     * @param rNoteRante the range of notes that the right hand lowest pitch note
     * should fall within; [n3, n4] inclusive
     */
    constructor(lNoteRange, rNoteRange, minHandDistance) {
        this.lNoteRange = lNoteRange;
        this.rNoteRange = rNoteRange;
    }
}

