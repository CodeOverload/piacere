const VF = Vex.Flow;

export default class {
    constructor(el, width, height) {
        this.width = el.width();
        this.renderer = new VF.Renderer(el.get(0), VF.Renderer.Backends.SVG);
        this.renderer.resize(this.width, height);
        this.context = this.renderer.getContext();
        this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    }
    
    draw(bars) {
        let x = 0;
        let y = 0;
        let barNumber = 0;
        const barWidth = 200;
        const firstBarExtraWidth = 60;
        const barsPerRow = ~~((this.width - firstBarExtraWidth) / barWidth);
        bars.forEach(barNotes => {
            let notes = barNotes.map(n => n.flowNote);
            const stave = new VF.Stave(x, y, barWidth + (barNumber === 0 ? firstBarExtraWidth : 0));
            if (barNumber === 0) {
                stave.addClef("treble").addTimeSignature("4/4");
            }
            stave.setContext(this.context).draw();

            //const beams = VF.Beam.generateBeams(notes);    
            //Vex.Flow.Formatter.FormatAndDraw(this.context, stave, notes);
            //beams.forEach(b => b.setContext(this.context).draw());
            
            // TODO set time signature correctly (e.g. via ctor param)
            let voice = new VF.Voice({num_beats: 4, beat_value: 4});
            voice.addTickables(notes);
            const beams = VF.Beam.generateBeams(notes);
            let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 200);
            voice.draw(this.context, stave);
            beams.forEach(b => b.setContext(this.context).draw());
            
            x += stave.width;
            barNumber = (barNumber + 1) % barsPerRow;
            if (barNumber === 0) {
                x = 0;
                y += 100;
            }
        });
    }
}

