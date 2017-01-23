import * as rnd from './randomise';
import Renderer from './renderer';

import Bar from './bar';

export default class {
    constructor() {
        this.renderer = new Renderer($('#music-canvas'));
        this.newHandPositions();
    }

    refresh() {
        const trebleRange = [this._handPositions[1], this._handPositions[1] + 4];
        const trebleOptions = new rnd.BarOptions(4, 4, trebleRange, [
            { value: 1, weight: 0.15 },
            { value: 2, weight: 0.2 },
            { value: 4, weight: 0.6 },
            { value: 8, weight: 0.05 }
        ]);

        const bassRange = [this._handPositions[0], this._handPositions[0] + 4];
        const bassOptions = new rnd.BarOptions(4, 4, bassRange, [
            { value: 1, weight: 0.25 },
            { value: 2, weight: 0.75 }
        ]);

        const barGenerator = _ =>
            new Bar(rnd.bar(trebleOptions), rnd.bar(bassOptions));

        this.renderer.draw(barGenerator, 3);
    }

    newHandPositions() {
        const handOptions = new rnd.HandsOptions([-12, -3], [1, 8]);
        this._handPositions = rnd.hands(handOptions);
        this.refresh();
    }
}
