import renderImage from './image';
//import renderCircle from './circle';
//import renderPolygon from './polygon';
//import renderRectangle from './rectangle';
//import renderText from './text';

import * as Graphics from '../graphics';
import * as State from '../system/state';

export default class Renderer2D {

    types = {
        [ Graphics.Texture ]: renderImage,
        [ Array ]: this.renderGroup,
        [ null ]: this.unknown
    };

    get canvas ( ) { return State.internal.canvas }

    unknown ( ) { }

    renderGroup ( canvas, group ) {
        for ( let i = 0, count = group.length; i < count; i++ ) {
            this.render( group[ i ] );
        }
    }

    render ( entity ) {
        const type = entity ? entity.constructor : null;
        const renderer = this.types[ type ];

        return renderer && renderer( this.canvas, entity );
    }

    clear ( x = 0, y = 0, w = this.canvas.width, h = this.canvas.height ) {
        this.canvas.getContext( '2d' ).clearRect( x, y, w, h );
    }
}
