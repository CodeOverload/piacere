import * as randomise from './randomise';
import Renderer from './renderer';

import Bar from './bar';

(() => {
    const trebleOptions = new randomise.RandomNotesOptions(4, 4, [2, 6], [
        { value: 1, weight: 0.15 },
        { value: 2, weight: 0.2 },
        { value: 4, weight: 0.6 },
        { value: 8, weight: 0.05 }
    ]);
    const bassOptions = new randomise.RandomNotesOptions(4, 4, [-5, -1], [
        { value: 1, weight: 0.25 },
        { value: 2, weight: 0.75 }
    ]);

    const bars = Array(9).fill().map(_ => new Bar(randomise.randomiseNotes(trebleOptions),
        randomise.randomiseNotes(bassOptions)));

    const renderer = new Renderer($('#music-canvas'), 500);
    renderer.draw(bars);
})();
