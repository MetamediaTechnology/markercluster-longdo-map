if(typeof window.longdo === 'undefined'){
    throw new Error('longdo API must be loaded before the longdomap markercluster plugin');
}
const longdo = window.longdo;
import LLBBox from "./LLBBox.js";
export default class MarkerCluster{

    constructor(map, options){
        this._map = map;
        this._markers = [];
        this._clusters = [];
        this._styles = options.styles || [];
        this._prevZoom = 2;
        this._maxZoom = options.maxZoom || null;
        this._minClusterSize = options.minClusterSize || 2;
        this.sizes = [53,56,66,78,90];
        this._ready = false;
        this._gridSize = options.gridSize || 60;
        this._averageCenter = false;
        this._calculator = function(markers){
            const count = markers.length;
            return {'index': 0,'text': ''+ count};
        };

        const that = this;
        this._clusterMarkerImage = new Image();
        this._clusterMarkerImage.onload = function(){
            that._prevZoom = that._map.zoom;
            that._ready = true;
            that.resetViewport();
            that._createClusters();
        };
        this._clusterMarkerImage.src = './m1.png';
        this._map.Event.bind('zoom', function (/*pivot*/){
            if(!that._ready){return;}
            const zoom = that._map.zoom();
            if(that._prevZoom !== zoom){
                that._prevZoom = zoom;
                that.resetViewport();
                that._createClusters();
            }
        });
        this._map.Event.bind('idle',function() {
            if(!that._ready){return;}
            //that.resetViewport();
            //that._createClusters();
        });
        this._map.Event.bind('drop',function() {
            if(!that._ready){return;}
            that.resetViewport();
            that._createClusters();
        });
        this._map.Event.bind('overlayClick', function(overlay){
            if(!that._ready){return;}
            let len = that._clusters.length;
            while(len--){
                const cl = that._clusters[len];
                if(overlay === cl._clusterIcon._clusterMarker){
                    that._map.bound(cl._bounds.getBounds());
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
    }
    render(){
        this._ready = true;
        this.resetViewport();
        this._createClusters();
    }
    _createClusters(){
        if(!this._ready){return;}
        const mapBounds = new LLBBox().generateFrom(this._map.bound());
        const bounds = this.getExtendedBounds(mapBounds);
        let len = this._markers.length;
        while(len--){
            const m = this._markers[len];
            const loc = m.location();
            if(!m.isAdded && bounds.isLocInBounds(loc)){
                this._addToClosestCluster(m);
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
            const cluster = new Cluster(this,this._clusters.length);
            cluster.addMarker(marker);
            this._clusters.push(cluster);
        }
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

    getExtendedBounds(bounds){
        bounds.extendSize(this._gridSize*Math.pow(2,-this._map.zoom()));
        return bounds;
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
    repaint(){
        const oldClusters = this._clusters().slice();
        this._clusters.length = 0;
        this.resetViewport();
        this._createClusters();
        setTimeout(function() {
            let len = oldClusters.length;
            while(len--){
                oldClusters[len].remove();
            }
        },0);
    }
}

export class Cluster{

    constructor(markerCluster){
        this._markerCluster = markerCluster;
        this._map = markerCluster._map;
        
        this._center = null;
        this._markers = [];
        this._bounds = null;
        this._clusterIcon = new ClusterIcon(this,{},this._markerCluster._gridSize);
    }

    addMarker(marker){
        if(this._markers.indexOf(marker) !== -1){
            return false;
        }
        if(!this._center){
            this._center = marker.location();
            this._calculateBounds();
        }else{
            if(this._markerCluster._averageCenter){
                const l = this._markers.length + 1;
                const lat = (this._center.lat * (l-1) + marker.location().lat) / l;
                const lon = (this._center.lon * (l-1) + marker.location().lon) / l;
                this._center = {"lat":lat,"lon":lon};
                this._calculateBounds();
            }
        }
        marker.isAdded = true;
        this._markers.push(marker);

        const len = this._markers.length;
        if (len < this._markerCluster._minClusterSize){
            if(!marker.active()){
                this._map.Overlays.add(marker);
            }
        }
        if(len === this._markerCluster._minClusterSize){
            let lenc = len;
            while(lenc--){
                const m = this._markers[lenc];
                if(m.active()){
                    this._map.Overlays.remove(m);
                }
            }
        }
        if(len >= this._markerCluster._minClusterSize){
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
        this._markerCluster.getExtendedBounds(new LLBBox().generateRect(this._center,this._center));
    }
    updateIcon(){
        const zoom = this._map.zoom();
        const mz = this._markerCluster._maxZoom;
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
        if(this._markers.length < this._markerCluster._minClusterSize){
            this._clusterIcon.hide();
            return;
        }
        const sums = this._markerCluster._calculator(this._markers,0);
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
export class ClusterIcon{
    constructor(cluster,styles){
        this._styles = styles;
        this._cluster = cluster;
        this._center = null;
        this._map = cluster._map;
        this._visible = false;
        this._clusterMarker = null;
        this._sums = null;
        this._clusterMarker = new longdo.Marker({"lat":0,"lon":0},{
            "icon":{
                "html": `<div style="width:52px;height:52px;background:url(./m1.png) no-repeat center top;color:red;line-height:52px;amrgin:0;padding:0;position:relative;top:-26px;left:-26px;"><div style='margin-left:22px;'>-1</div></div>`,
                "offset": { "x": 0, "y": 0},
                "size": {"width":53,"height":53}
            },
            "weight": longdo.OverlayWeight.Top
        });
    }

    show(){
        const pos = this._center;
        if(this._clusterMarker.active()){
            this._map.Overlays.move(this._clusterMarker,pos);
            this._clusterMarker.title = '(id:'+this._cluster._cid + ')' + this._sums.text;
        }else{
            this._clusterMarker.setLocation(pos);
            this._map.Overlays.add(this._clusterMarker);
        }
        this._visible = true;
    }
    remove(){
        this._map.Overlays.remove(this._clusterMarker);
    }
    hide(){
        this._map.Overlays.remove(this._clusterMarker);
        this._visible = false;
    }
    setCenter(center){
        this._center = center;
        if(this._clusterMarker){
            this._clusterMarker.move({"lat":center.lat,"lon":center.lon});
        }
    }
    setSums(sums){
        if(this._sums && sums.text === this._sums.text){return;}
        this._sums = sums;
        this.index = sums.index;
        if(this._clusterMarker && this._clusterMarker.element()){
            this._clusterMarker.element().children[0].children[0].innerHTML = this._sums.text;
            this._clusterMarker.title = `(id:${this._cluster._cid})${this._sums.text}`;
        }
    }
}
