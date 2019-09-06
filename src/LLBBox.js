const longdo = window.longdo;
export class LLBBox{

    constructor(){
        let locations = arguments.length === 0 ? [{'lat':0,'lon':0}] :
                        arguments.length === 1 ? 
                            (arguments[0] instanceof Array ? arguments[0] : [arguments[0]]) :
                        arguments[0] instanceof Array ? arguments[0] : [arguments[0]];
        this._projection = arguments.length <= 1 ? longdo.Projections.EPSG3857 : arguments[1];
        this.locationList = locations instanceof Array ? locations : [locations];
        this._bounds = longdo.Utils.locationBound(this.locationList);
    }

    getBounds(){
        return {'minLon':this._bounds.minLon,
                'minLat':this._bounds.minLat,
                'maxLon':this._bounds.maxLon,
                'maxLat':this._bounds.maxLat};
    }

    add(location){
        this._locationList.push(location);
        this._bounds = longdo.Utils.locationBound(this._locationList);
    }
    remove(location){
        this._locationList = this._locationList.filter((e) => e !== location);
    }
}