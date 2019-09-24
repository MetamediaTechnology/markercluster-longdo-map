const longdo = window.longdo;
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
        if(!this._config.swarmModeEnabled){
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

export class IconLoader{

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