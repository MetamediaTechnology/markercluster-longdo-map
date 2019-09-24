if(typeof window.longdo === 'undefined'){
    throw new Error('longdo API must be loaded before the longdomap markercluster plugin');
}
const longdo = window.longdo;
import {LLBBox} from "./LLBBox";
import Config from "./ConfigHandler";
import {IconLoader} from './Icon';
import Cluster from './Cluster';
export default class MarkerCluster{

    constructor(map, options){
        this._map = map;
        this._markers = [];
        this._clusters = [];
        this._prevZoom = 2;
        this._ready = false;
        this.config = new Config(options);
        this._iloader = new IconLoader(this,this.config);
        
        const that = this;
        this._map.Event.bind('ready',function() {
            if(!that._ready && !that._iloader.ready){return;}
            that._prevZoom = that._map.zoom;
            that.resetViewport();
            that._createClusters();
        });
        this._map.Event.bind('zoom', function (/*pivot*/){
            if(!that._ready && !that._iloader.ready){return;}
            const zoom = that._map.zoom();
            if(that._prevZoom !== zoom){
                that._prevZoom = zoom;
                that.resetViewport();
                that._createClusters();
            }
        });
        this._map.Event.bind('idle',function() {
            if(!that._ready && !that._iloader.ready){return;}
            //that.resetViewport();
            //that._createClusters();
        });
        this._map.Event.bind('drop',function() {
            if(!that._ready && !that._iloader.ready){return;}
            that.resetViewport();
            that._createClusters();
        });/*
        this._map.Event.bind('drag', function(move){
            if(that._ready){
                that.resetViewport();
                that._createClusters();
            }
        });
        */
    //    this._map.Event.bind('loadTile',function(str) {
    //         if(str !== 'finish' && !that._ready && !that._iloader.ready){return;}
    //         that.resetViewport();
    //         that._createClusters();
    //     });
        this._map.Event.bind('overlayClick', function(overlay){
            if(!that._ready){return;}
            let len = that._clusters.length;
            while(len--){
                const cl = that._clusters[len];
                if(overlay === cl._clusterIcon._clusterMarker){
                    const l = [];
                    let len2 = cl._markers.length;
                    while(len2--){
                        l.push(cl._markers[len2].location());
                    }
                    //that._map.bound(cl._bounds.getBounds());
                    that._map.bound(longdo.Util.locationBound(l));
                    setTimeout(function(){
                        that.resetViewport();
                        that._createClusters();
                    },0);
                    return;
                }
            }
        });
    }

    addMarkers(markers){
        if(markers instanceof longdo.Marker){
            markers = [markers];
        }
        let len = markers.length;
        while(len--){
            const m = markers[len];
            this._markers.push(m);
        }
        if(this.config.swarmModeEnabled && this.config.swarmAlg === 2){
            this.shuffle();
        }
    }
    shuffle(){
        for(let i = this._markers.length-1;i > 0; i--){
            const r = Math.floor(Math.random()*(i+1));
            const temp = this._markers[i];
            this._markers[i] = this._markers[r];
            this._markers[r] = temp;
        }
    }
    render(){
        this._ready = true;
        this.resetViewport();
        this._createClusters();
    }
    _createClusters(){
        if(!this._ready){return;}
        const mapBounds = LLBBox.generateFrom(this._map.bound());
        const bounds = mapBounds.extendSize(this.config.gridSize*Math.pow(2,-this._map.zoom()));
        let len = this._markers.length;
        while(len--){
            const m = this._markers[len];
            const loc = m.location();
            if(!m.isAdded && bounds.isLocInBounds(loc)){
                if(!this.config.swarmModeEnabled){
                    this._addToClosestCluster(m);
                }else{
                    if(this.config.swarmAlg === 2){
                        this._addToClosestCluster(m);
                    }else{
                        this._addToTiledCluster(m);
                    }
                }
                
            }
        }
    }
    _addToClosestCluster(marker){
        let distance = Number.POSITIVE_INFINITY;
        let clusterToAddTo = null;
        let len = this._clusters.length;
        while(len--){
            const cluster = this._clusters[len];
            const cen = cluster._center;
            if(cen){
                const d = longdo.Util.distance([cen,marker.location()]);
                if(d < distance){
                    distance = d;
                    clusterToAddTo = cluster;
                }
            }
        }
        if(clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)){
            clusterToAddTo.addMarker(marker);
        }else{
            const cluster = new Cluster(this,this.config,this._iloader);
            cluster.addMarker(marker);
            this._clusters.push(cluster);
        }
    }

    _addToTiledCluster(marker){
        const that = this;
        const locationToTile = function(loc){
            const point = longdo.Util.locationToPoint(longdo.Projections.EPSG3857,loc);
            point.z = 20-that._map.zoom();
            return longdo.Util.pointToTile(point);
        };
        const tile = locationToTile(marker.location());
        let len = this._clusters.length;
        while(len--){
            const cluster = this._clusters[len];
            if(cluster.u === tile.u && cluster.v === tile.v){
                cluster.addMarker(marker,tile);
                return;
            }
        }
        const cluster = new Cluster(this,this.config,this._iloader);
        cluster.u = tile.u;
        cluster.v = tile.v;
        cluster.addMarker(marker,tile);
        this._clusters.push(cluster);
    }

    _removeMarker(marker){
        const index = this._markers.indexOf(marker);
        if(index === -1){
            return false;
        }
        this._map.Overlays.remove(marker);
        this._markers.splice(index,1);
        return true;
    }

    removeMarker(marker){
        const removed = this._removeMarker(marker);
        if(removed){
            this.resetViewport();
            this._createClusters();
            return true;
        }
        return false;
    }

    removeMarkers(markers){
        const markersCopy = markers === this._markers ? this._markers.slice() : markers;
        let removed = false;
        let len = markersCopy.length;
        while(len--){
            const r = this._removeMarker(markersCopy[len]);
            removed = removed || r;
        }
        if(removed){
            this.resetViewport();
            this._createClusters();
            return true;
        }
        return false;
    }

    clearMarkers(){
        this.resetViewport();
        let len = this._markers.length;
        while(len--){
            const marker = this._markers[len];
            this._map.Overlays.remove(marker);
        }
        this._markers = [];
    }

    resetViewport(){
        let len = this._clusters.length;
        while(len--){
            this._clusters[len].remove();
        }
        len = this._markers.length;
        while(len--){
            const marker = this._markers[len];
            marker.isAdded = false;
            this._map.Overlays.remove(marker);
        }
        this._clusters = [];
    }
}
