import * as randomise from './randomise';
import Renderer from './renderer';

import Bar from "./bar";

(() => {
    const bars = Array(4).fill().map(_ => new Bar(randomise.randomiseNotes(4, 4), randomise.randomiseNotes(4, 4)));
    const renderer = new Renderer($('#music-canvas'), 500);
    renderer.draw(bars);
})();

