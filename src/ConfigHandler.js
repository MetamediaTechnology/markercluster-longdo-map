export default class {
    constructor(options){
        this.maxZoom = options.maxZoom || null;
        this.minClusterSize = options.minClusterSize || 2;
        this.gridSize = options.gridSize || 120;
        this.clusterRadius = options.clusterRadius || this.gridSize;
        this.averageCenter = options.averageCenter;
        this.drawMarkerArea = options.drawMarkerArea;
        this.swarmModeEnabled = options.swarmModeEnabled;
        this.swarmAlg = options.swarmAlg ? parseInt(options.swarmAlg,10) : null;
        this.styles = options.styles || null;
    }
}