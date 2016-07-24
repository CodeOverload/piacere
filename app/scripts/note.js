var VF = Vex.Flow;

export default class Note {
    constructor(keys, duration) {
        this.keys = [keys];
        this.duration = duration;
    }

    toFlowNote(clef) {
        return new VF.StaveNote({
            keys: this.keys,
            duration: '' + this.duration,
            clef: clef,
            stem_direction: clef === "treble" ? 1 : -1
        });
    }
}
