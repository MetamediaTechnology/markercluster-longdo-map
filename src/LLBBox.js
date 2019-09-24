const longdo = window.longdo;
export class LLBBox{
    constructor(locations){
        this._projection = longdo.Projections.EPSG3857;
        this._locationList = locations.slice();
        this._originalLocationList = this._locationList.slice();
        if(locations.length > 0){
            this._bounds = longdo.Util.locationBound(this._locationList);
        }
    }

    static generateFrom(bound){
        return new LLBBox(
            [
                {"lon":bound.minLon,"lat":bound.minLat},
                {'lon':bound.maxLon,'lat':bound.maxLat}]);
    }
    static generateRect(loc1,loc2){
        if(!loc2){
            loc2 = loc1;
        }
        return new LLBBox([loc1,loc2]);
    }

    getBounds(){
        return {'minLon':this._bounds.minLon,
                'minLat':this._bounds.minLat,
                'maxLon':this._bounds.maxLon,
                'maxLat':this._bounds.maxLat};
    }
    LT(){
        return {"lon": this._bounds.minLon, "lat": this._bounds.maxLat};
    }
    RT(){
        return {"lon": this._bounds.maxLon, "lat": this._bounds.maxLat}; 
    }
    LB(){
        return {"lon": this._bounds.minLon, "lat": this._bounds.minLat};
    }
    RB(){
        return {"lon": this._bounds.maxLon, "lat": this._bounds.minLat};
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

    drawArea(map){
        this._poly = new longdo.Polygon(this.getRectVertex());
        map.Overlays.add(this._poly);
    }
    removeArea(map){
        if(this._poly && this._poly.active()){
            map.Overlays.remove(this._poly);
            delete this._poly;
        }
    }

    getNxNGridCord(loc,n){
        if(!this.isLocInBounds(loc)){
            return null;
        }
        const xlen = (this._bounds.maxLon - this._bounds.minLon) / n;
        const ylen = (this._lat2y(this._bounds.maxLat) - this._lat2y(this._bounds.minLat)) / n;
        let lonoffset = loc.lon - this._bounds.minLon;
        const yoffset = -this._lat2y(loc.lat) + this._lat2y(this._bounds.maxLat);
        const xid = Math.floor(lonoffset / xlen), yid = Math.floor(yoffset / ylen);
        return {"u": xid,"v": yid};
    }

    /*
    Adapted from https://wiki.openstreetmap.org/wiki/Mercator
    */
    _y2lat(y) { return (Math.atan(Math.exp(y / (180 / Math.PI))) / (Math.PI / 4) - 1) * 90; }
    _lat2y(lat) { return Math.log(Math.tan((lat / 90 + 1) * (Math.PI / 4) )) * (180 / Math.PI); }
}

export class LLCircle{
    constructor(center,radius){
        this.center = center;
        this.sqrad = radius * radius;
    }
}