var VF = Vex.Flow;

const notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function _toKey(noteIndex) {
    noteIndex += 42;
    const note = notes[(noteIndex + 2) % notes.length];
    const octave = ~~(noteIndex / notes.length) - 2;
    return note + '/' + octave;
}

export default class Note {
    constructor(notes, duration) {
        this.notes = [notes];
        this.duration = duration;
    }

    toFlowNote(clef) {
        return new VF.StaveNote({
            keys: this.notes.map(n => _toKey(n)),
            duration: '' + this.duration,
            clef: clef,
            stem_direction: clef === 'treble' ? 1 : -1
        });
    }
}
