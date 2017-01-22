import * as rnd from './randomise';
import Renderer from './renderer';

import Bar from './bar';

$(() => {
    const trebleOptions = new rnd.Options(4, 4, [2, 6], [
        { value: 1, weight: 0.15 },
        { value: 2, weight: 0.2 },
        { value: 4, weight: 0.6 },
        { value: 8, weight: 0.05 }
    ]);
    const bassOptions = new rnd.Options(4, 4, [-5, -1], [
        { value: 1, weight: 0.25 },
        { value: 2, weight: 0.75 }
    ]);

    const barGenerator = _ =>
        new Bar(rnd.bar(trebleOptions), rnd.bar(bassOptions));

    const renderer = new Renderer($('#music-canvas'));
    renderer.draw(barGenerator, 4);
});
