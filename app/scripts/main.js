var VF = Vex.Flow;

import * as randomise from './randomise';
import Renderer from './renderer';

import Note from "./note";

(() => {
    const bars = Array(9).fill().map(_ => randomise.randomiseNotes(4, 4));
    
    bars[0] = [
        new Note("f/4", 4),
        new Note("f/4", 4),
        new Note("f/4", 8),
        new Note("f/4", 4),
        new Note("f/4", 8)
    ];
    
    bars[3] = [
        new Note("f/4", 4),
        new Note("f/4", 4),
        new Note("f/4", 4),
        new Note("f/4", 4)
    ];
    
    const renderer = new Renderer($('#music-canvas'), 500, 500);
    renderer.draw(bars);
})();


/*
(() => {
    let notes = [
      new VF.StaveNote({ keys: ['c/4'], duration: 'q' }),
      new VF.StaveNote({ keys: ['d/4'], duration: 'q' }),
      new VF.StaveNote({ keys: ['b/4'], duration: 'qr' }),
      new VF.StaveNote({ keys: ['g/4'], duration: 'q' })
    ];

    let stave = new VF.Stave(200 + 10, 40, 200);
    stave.setContext(context).draw();

    let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes);
    let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 180);
    voice.draw(context, stave);
})();

(() => {
    let notes = [
      new VF.StaveNote({ clef: 'bass', keys: ['c/3'], duration: 'h' }),
      new VF.StaveNote({ clef: 'bass', keys: ['b/2'], duration: 'q' }),
      new VF.StaveNote({ clef: 'bass', keys: ['b/2'], duration: 'q' })
    ];

    let stave = new VF.Stave(10, 130, 240);
    stave.addClef('bass').addTimeSignature('4/4');
    stave.setContext(context).draw();

    let voice = new VF.Voice({num_beats: 4, beat_value: 4});
    voice.addTickables(notes);
    let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 180);
    voice.draw(context, stave);
})();  */
