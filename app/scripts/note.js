var VF = Vex.Flow;

export default class {
    constructor(keys, duration) {
        this.keys = [keys];
        this.duration = duration;
    }
    
    get flowNote() {
        return new VF.StaveNote({ keys: this.keys, duration: '' + this.duration });
    }
}
