if(typeof window.longdo === 'undefined'){
    throw new Error('longdo API must be loaded before the longdomap heatmap plugin');
}
const longdo = window.longdo;
export class MarkerCluster extends longdo.Marker{

    constructor(location, options){
        super(location,options);
        this.initialize();
    }

    initialize(group, zoom) {
        this._group = group;
        this._zoom = zoom;
    }
}
