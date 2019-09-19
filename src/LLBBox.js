const longdo = window.longdo;
export default class{
    constructor(){
        let locations = arguments.length === 0 ? [] :
                        arguments.length === 1 ? 
                            (arguments[0] instanceof Array ? arguments[0] : [arguments[0]]) :
                        arguments[0] instanceof Array ? arguments[0] : [arguments[0]];
        this._projection = arguments.length <= 1 ? longdo.Projections.EPSG3857 : arguments[1];
        this._locationList = locations instanceof Array ? locations : [locations];
        this._originalLocationList = this._locationList.slice();
        if(locations.length > 0){
            this._bounds = longdo.Util.locationBound(this._locationList);
        }
    }
    getBounds(){
        return {'minLon':this._bounds.minLon,
                'minLat':this._bounds.minLat,
                'maxLon':this._bounds.maxLon,
                'maxLat':this._bounds.maxLat};
    }
    getMinimumBounds(){
        const b = longdo.Util.locationBound(this._originalLocationList);
        return b;
    }

    add(location){
        this._locationList.push(location);
        this._originalLocationList.push(location);
        this._bounds = longdo.Util.locationBound(this._locationList);
    }
    remove(location){
        this._locationList = this._locationList.filter((e) => e !== location);
        this._originalLocationList = this._originalLocationList.filter((e) => e !== location);
        this._bounds = this.empty() ? null: longdo.Util.locationBound(this._locationList);
    }

    empty(){return this._locationList.length === 0;}

    generateFrom(bound){
        this._locationList.length = 0;
        this.add({"lon":bound.minLon,"lat":bound.minLat});
        this.add({"lon":bound.maxLon,"lat":bound.minLat});
        this.add({"lon":bound.minLon,"lat":bound.maxLat});
        this.add({'lon':bound.maxLon,'lat':bound.maxLat});
        this._bounds = longdo.Util.locationBound(this._locationList);
        return this;
    }
    generateRect(loc1,loc2){
        this._locationList.length = 0;
        this.add({"lon":loc1.lon,"lat":loc1.lat});
        this.add({"lon":loc1.lon,"lat":loc2.lat});
        this.add({"lon":loc2.lon,"lat":loc1.lat});
        this.add({"lon":loc2.lon,"lat":loc2.lat});
        this._bounds = longdo.Util.locationBound(this._locationList);
        return this;
    }
    getLocations(){
        return this._locationList.slice();
    }
    isLocInBounds(loc){
        const result = longdo.Util.contains(loc,this.getRectVertex());
        return result === null ? true : result;
    }
    extendSize(diff){
        const b = this._bounds;
        const maxy = this._projection.latToNorm(b.maxLat) + diff;
        const miny = this._projection.latToNorm(b.minLat) - diff;
        this._locationList.push({"lon":b.minLon - diff,"lat": this._projection.normToLat(miny)});
        this._locationList.push({"lon":b.minLon - diff,"lat": this._projection.normToLat(maxy)});
        this._locationList.push({"lon":b.minLon + diff,"lat": this._projection.normToLat(miny)});
        this._locationList.push({"lon":b.maxLon + diff,"lat": this._projection.normToLat(maxy)});
        this._bounds = longdo.Util.locationBound(this._locationList);
        return this;
    }
    getRectVertex(){
        return [{"lon":this._bounds.minLon,"lat":this._bounds.minLat},
        {"lon":this._bounds.minLon,"lat":this._bounds.maxLat},
        {"lon":this._bounds.maxLon,"lat":this._bounds.maxLat},
        {"lon":this._bounds.maxLon,"lat":this._bounds.minLat}];
    }

    /*
    Adapted from https://wiki.openstreetmap.org/wiki/Mercator
    */
    _y2lat(y) { return (Math.atan(Math.exp(y / (180 / Math.PI))) / (Math.PI / 4) - 1) * 90; }
    _lat2y(lat) { return Math.log(Math.tan((lat / 90 + 1) * (Math.PI / 4) )) * (180 / Math.PI); }

}