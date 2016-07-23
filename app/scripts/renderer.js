const VF = Vex.Flow;

export default class {
    constructor(el, height) {
        this.width = el.width();
        this.renderer = new VF.Renderer(el.get(0), VF.Renderer.Backends.SVG);
        this.renderer.resize(this.width, height);
        this.context = this.renderer.getContext();
        this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    }
    
    draw(bars) {
        let x = 0;
        let y = 0;
        const barWidth = 200;
        const firstBarExtraWidth = 60;
        const barsPerRow = ~~((this.width - firstBarExtraWidth) / barWidth);
        
        bars.forEach((bar, i) => {
            const firstInRow = i % barsPerRow === 0;
            if (firstInRow && i !== 0) {
                x = 0;
                y += 170;
            }
            
            const spec = {
                bar: bar, 
                x: x,   
                y: y,
                width: barWidth + (firstInRow ? firstBarExtraWidth : 0), 
                firstInRow: firstInRow
            };
            
            this._drawBar(spec);
            
            x += spec.width;
        });
    }
    
    _drawBar(spec) {
        const [tStave, tVoice, tBeams] = this._createStave(spec, "treble", spec.bar.trebleNotes);
        const [bStave, bVoice, bBeams] = this._createStave(spec, "bass", spec.bar.bassNotes);
        
        const voices = [tVoice, bVoice];
        const formatter = new VF.Formatter().format(voices, 200);
        tVoice.draw(this.context, tStave);
        bVoice.draw(this.context, bStave);
        tBeams.concat(bBeams).forEach(b => b.setContext(this.context).draw());
    }
    
    _createStave(spec, clef, notes) {
        const flowNotes = notes.map(n => n.toFlowNote(clef));
        const y = spec.y + (clef === "bass" ? 80 : 0);
        const stave = new VF.Stave(spec.x, y, spec.width);
        if (spec.firstInRow) {
        // TODO set time signature correctly (e.g. via ctor param)
            stave.addClef(clef).addTimeSignature("4/4");
        }
        stave.setContext(this.context).draw();
        
        const voice = new VF.Voice({num_beats: 4, beat_value: 4});
        voice.addTickables(flowNotes);
        const beams = VF.Beam.generateBeams(flowNotes);
        return [stave, voice, beams];
    }
}

