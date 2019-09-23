export default class {
    constructor(options){
        this.maxZoom = options.maxZoom || null;
        this.minClusterSize = options.minClusterSize || 2;
        this.gridSize = options.gridSize || 120;
        this.averageCenter = options.averageCenter;
        this.drawMarkerArea = options.drawMarkerArea;
        this.extraModeEnabled = options.extraModeEnabled;
        this.styles = options.styles || null;
    }
}