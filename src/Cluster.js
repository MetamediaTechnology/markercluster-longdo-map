import {ClusterIcon} from './Icon';
import LLBBox from './LLBBox';
const longdo = window.longdo;
export default class{
    
    constructor(markerCluster,config,iloader){
        this._markerCluster = markerCluster;
        this._config = config;
        this._map = markerCluster._map;
        
        this._center = null;
        this._markers = [];
        this._bounds = null;
        this._clusterIcon = new ClusterIcon(this,this._config,iloader);
    }

    addMarker(marker,tile){
        if(this._markers.indexOf(marker) !== -1){
            return false;
        }
        if(!this._center){
            this._center = marker.location();
            this._calculateBounds();
        }else{
            if(this._config.averageCenter){
                this._center = longdo.Util.averageLocation(longdo.Projections.EPSG3857,
                    this._center,marker.location());
            }
        }
        marker.isAdded = true;
        this._markers.push(marker);

        if(this._config.swarmModeEnabled){
            //TODO
            if(!this._gridids){
                this._gridids = [];
            }
            this._gridids.push(new LLBBox().generateFrom(
                longdo.Util.boundOfTile(longdo.Projections.EPSG3857,tile)
            ).getNxNGridCord(marker.location(),4));

            
            if(!this._markersToShow){
                this._markersToShow = [marker];
            }else if(this._markersToShow.length <= 64){
                let markersInSameGrid = 0;
                const that = this;
                this._gridids.forEach(function(value){
                    const gridid = that._gridids[that._gridids.length-1];
                    markersInSameGrid += gridid.u === value.u && gridid.v === value.v ? 1 : 0;
                });

                if(markersInSameGrid % 8 !== 0){
                    return true;
                }
                this._markersToShow.push(marker);
            }else{
                return true;
            }
            if(!marker.active()){
                this._map.Overlays.add(marker);
            }
            this.updateIcon();
            return true;
        }

        const len = this._markers.length;
        if (len < this._config.minClusterSize){
            if(!marker.active()){
                this._map.Overlays.add(marker);
            }
        }
        if(len === this._config.minClusterSize){
            let lenc = len;
            while(lenc--){
                const m = this._markers[lenc];
                if(m.active()){
                    this._map.Overlays.remove(m);
                }
            }
        }
        if(len >= this._config.minClusterSize){
            let lenc = len;
            while(lenc--){
                const m = this._markers[lenc];
                if(m.active()){
                    this._map.Overlays.remove(m);
                }
            }
        }
        this.updateIcon();
        return true;
    }
    remove(){
        this._clusterIcon.remove();
        this._markers.length = 0;
        delete this._markers;
    }

    _calculateBounds(){
        this._bounds = 
        this._markerCluster.getExtendedBounds(new LLBBox().generateRect(this._center));
    }
    updateIcon(){
        const zoom = this._map.zoom();
        const mz = this._config.maxZoom;
        if(mz && zoom > mz || zoom === 20){
            let len = this._markers.length;
            while(len--){
                const marker = this._markers[len];
                if(!marker.active()){
                    this._map.Overlays.add(marker);
                }
            }
            return;
        }

        if(this._config.swarmModeEnabled){
            
            //TODO
            return;
        }

        if(this._markers.length < this._config.minClusterSize){
            this._clusterIcon.hide();
            return;
        }
        const sums = this._markers.length;
        this._clusterIcon.setCenter(this._center);
        this._clusterIcon.setSums(sums);
        this._clusterIcon.show();
    }

    isMarkerInClusterBounds(marker){
        return this._bounds.isLocInBounds(marker.location());
    }
    containsMarker(marker){
        let len = this._markers.length;
        while(len--){
            if(this._markers[len] === marker){
                return true;
            }
        }
        return false;
    }
}