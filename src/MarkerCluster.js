if(typeof window.longdo === 'undefined'){
    throw new Error('longdo API must be loaded before the longdomap heatmap plugin');
}
const longdo = window.longdo;
import {LLBBox} from "./LLBBox.js";
export class MarkerCluster extends longdo.Marker{

    constructor(location, options){
        super(location,options);
    }

    initialize(group, zoom,child1,child2) {
        this._group = group;
        this._zoom = zoom;
        this._markers = [];
        this._childClusters = [];
        this.childCount = 0;
        this._iconNeedsUpdate = true;
        this._boundsNeedUpdate = true;

        this._bounds = new LLBBox();

        if(child1){
            this._addChild(child1);
        }
        if(child2){
            this._addChild(child2);
        }
    }

    getAllChildMarkers(storageArray){
        storageArray = storageArray || [];
        let len = this._childClusters.length;
        while(len--){
            this._childClusters[len].getAllChildMarkers(storageArray);
        }
        len = this._markers.length;
        while(len--){
            storageArray.push(this._markers[len]);
        }
        return storageArray;
    }

    getChildCount(){
        return this._childCount;
    }

    zoomToBounds(){
        //TODO
    }

    getBounds(){
        return this._bounds.getBounds();
    }
    _updateIcon(){
        //TODO
    }

    createIcon(){
        //TODO
    }
    createShadow(){
        //TODO
    }

    _addChild(new1, isNotificationFromChild){
        this._iconNeedsUpdate = true;
        this._boundsNeedUpdate = true;
        this._setClusterCenter(new1);

        if(new1 instanceof MarkerCluster){
            if(!isNotificationFromChild){
                this._childClusters.push(new1);
                new1.__parent = this;
            }
            this._childCount += new1._childCount;
        }else{
            if(!isNotificationFromChild){
                this._markers.push(new1);
            }
            this._childCount++;
        }
        if(this.__parent){
            this.__parent._addChild(new1, true);
        }

    }

    _setClusterCenter(child){
        if(!this._cLatLon){
            this._cLatLon = child._cLatLon || child._latlon;
        }
    }

    _resetBounds(){
        const bounds = this._bounds;
        bounds.minLat = -Infinity;
        bounds.minLon = -Infinity;
        bounds.maxlon = Infinity;
        bounds.maxLat = Infinity;
    }

    _recalculateBounds(){
        let markers = this._markers,
            childClusters = this._childClusters,
            latSum = 0,
            lonSum = 0,
            totalCount = this._childCount,
            len,child,childLatLon,childCount;
        
        if(totalCount === 0){
            return;
        }
        this._resetBounds();
        len = markers.length;
        while(len--){
            childLatLon = markers[len]._latlon;

            //TODO
            latSum += childLatLon.lat;
            lonSum += childLatLon.lon;
        }

        len = childClusters.length;
        while(len--){
            child = childClusters[len];
            if(child._boundsNeedUpdate){
                child._recalculateBounds();
            }
            //TODO
            childLatLon = child._wLatLon;
            childCount = child._childCount;

            latSum += childLatLon.lat * childCount;
            lonSum += childLatLon.lon * childCount;
        }
        this._latlon = this._wLatLon = {"lat": latSum/totalCount,"lon": lonSum / totalCount};
        this._boundsNeedUpdate = false;
    }

    _addToMap(startPos){
        if(startPos){
            this._backupLatlon = this._latlon;
            this.setLocation(this._latlon);
        }
        //TODO
    }

}
