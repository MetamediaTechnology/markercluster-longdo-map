if(typeof window.longdo === 'undefined'){
    throw new Error('longdo API must be loaded before the longdomap markercluster plugin');
}
const longdo = window.longdo;
import LLBBox from "./LLBBox.js";
import Config from "./ConfigHandler.js";
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
       this._map.Event.bind('loadTile',function(str) {
            if(str !== 'finish' && !that._ready && !that._iloader.ready){return;}
            that.resetViewport();
            that._createClusters();
        });
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
            const cluster = new Cluster(this,this.config,this._iloader);
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
        bounds.extendSize(this.config.gridSize*Math.pow(2,-this._map.zoom()));
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

    constructor(markerCluster,config,iloader){
        this._markerCluster = markerCluster;
        this._config = config;
        this._map = markerCluster._map;
        
        this._center = null;
        this._markers = [];
        this._bounds = null;
        this._clusterIcon = new ClusterIcon(this,this._config,iloader);
    }

    addMarker(marker){
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

        if(this._config.extraModeEnabled){
            //TODO
            let len = this._markers.length;
            while(len--){
                if(!marker.active()){
                    this._map.Overlays.add(marker);
                }
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

        if(this._config.extraModeEnabled){
            //TODO
            this._clusterIcon.setCenter(this._center);
            this._clusterIcon.show();
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
export class ClusterIcon{
    constructor(cluster,config,iloader){
        this._cluster = cluster;
        this._config = config;
        this._iloader = iloader;
        this._center = null;
        this._map = cluster._map;
        this._visible = false;
        this._sums = null;
        this._clusterMarker = new longdo.Marker({"lat":0,"lon":0},{
            "icon": this._cluster._markerCluster._iloader.getIcon(0),
            "weight": longdo.OverlayWeight.Top
        });
    }

    show(){
        if(!this._config.extraModeEnabled){
            const pos = this._center;
            if(this._clusterMarker.active()){
                this._map.Overlays.move(this._clusterMarker,pos);
            }else{
                this._clusterMarker.setLocation(pos);
                this._map.Overlays.add(this._clusterMarker);
                if(this._poly){
                    this._map.Overlays.remove(this._poly);
                }
                if(this._config.drawMarkerArea){
                    this._poly = new longdo.Polygon(this._cluster._bounds.getRectVertex(),{});
                    this._map.Overlays.add(this._poly);
                }
            }
            this._visible = true;
        }
    }
    remove(){
        this._map.Overlays.remove(this._clusterMarker);
        if(this._poly){
            this._map.Overlays.remove(this._poly);
            this._poly = null;
        }
    }
    hide(){
        this._map.Overlays.remove(this._clusterMarker);
        this._visible = false;
        if(this._config.drawMarkerArea){
            if(!this._poly){
                this._poly = new longdo.Polygon(this._cluster._bounds.getRectVertex(),{});
            }
            if(!this._poly.active()){
                this._map.Overlays.add(this._poly);
            }
        }
    }
    setCenter(center){
        this._center = center;
        if(this._clusterMarker){
            this._clusterMarker.move({"lat":center.lat,"lon":center.lon});
        }
    }
    setSums(sums){
        if(this._sums && sums === this._sums){return;}
        this._sums = sums;
        if(this._clusterMarker && this._clusterMarker.element()){
            this._iloader.changeNumber(this._clusterMarker.element(),this._sums);
        }
    }
}

class IconLoader{

    constructor(markercluster,config){
        this._markerCluster = markercluster;
        this._config = config;
        this._images = new Map();
        this.ready = false;
        this.useDefault = true;
        if(this._config.styles){
            this.loadStyles(this._config.styles);
        }
    }
    load(url,width,height,minThreshold){
        this.ready = false;
        this.useDefault = false;
        const img = new Image(width,height);
        this._images.set(img,{"ready":false,"minThreshold":minThreshold});
        const that = this;
        img.onload = function(){
            that._images.get(img).ready = true;
            if([...that._images.values()].every(elm => elm.ready)){
                that.ready = true;
                that._markerCluster.resetViewport();
                that._markerCluster._createClusters();
            }
        };
        img.src = url;
        return this._images.keys.length - 1;
    }
    loadStyles(styles){
        styles.sort((elm1,elm2) => 
        elm1.minThreshold < elm2.minThreshold ? 1 : elm1.minThreshold === elm2.minThreshold ?
         0 : -1); 
         let len = styles.length;
         while(len--){
             const style = styles[len];
             this.load(style.url,style.width,style.height,style.minThreshold);
         }
    }
    getIcon(index){
        const result = {"offset": { "x": 0, "y": 0}};
        if(this.useDefault || typeof index === 'undefined'){
            const elm = document.createElement("div");
            const elm2 = document.createElement('div');
            const elm3 = document.createElement('span');
            elm.appendChild(elm2);
            elm2.appendChild(elm3);
            elm.style.width = '40px';
            elm.style.height = '40px';
            elm.style.marginLeft = '-20px';
            elm.style.marginTop = '-20px';
            elm.style.overflow = 'hidden';
            elm.className += ' marker-cluster marker-cluster-small leaflet-marker-icon';
            result.html = elm.outerHTML;
            result.size = {"width":40,"height":40};
        }else{
            const img = [...this._images.keys()][index];
            const elm = document.createElement("div");
            elm.style.width = `${img.width}px`;
            elm.style.height = `${img.height}px`;
            elm.style.marginLeft = `-${img.width/2}px`;
            elm.style.marginTop = `-${img.height/2}px`;
            elm.style.background = `url('${encodeURI(img.src)}') no-repeat center top`;
            elm.style.lineHeight = elm.style.height;
            elm.style.color = 'black';
            elm.style.fontWeight = 'bold';
            elm.style.textAlign = 'center';
            result.html = elm.outerHTML;
            result.size = {"width":img.width,"height":img.height};
        }
        return result;
    }
    changeNumber(element,num){
        if(this.useDefault){
            element.children[0].children[0].children[0].innerText = `${num}`;
            const list = element.children[0].classList;
            list.remove('marker-cluster-large');
            list.remove('marker-cluster-medium');
            list.remove('marker-cluster-small');
            if(num < 10){
                list.add('marker-cluster-small');
            }else if(num < 100){
                list.add('marker-cluster-medium');
            }else{
                list.add('marker-cluster-large');
            }
        }else{
            element.children[0].innerText = `${num}`;
            const list = [...this._images.keys()];
            let len = list.length;
            while(len--){
                const img = list[len];
                if(num >= this._images.get(img).minThreshold){
                    let elm = element;
                    elm.style.width = `${img.width}px`;
                    elm.style.height = `${img.height}px`;
                    elm = elm.children[0];
                    elm.style.background = `url('${encodeURI(img.src)}') no-repeat center top`;
                    elm.style.width = `${img.width}px`;
                    elm.style.height = `${img.height}px`;
                    elm.style.lineHeight = elm.style.height;
                    break;
                }
            }
        }
    }
    
}
