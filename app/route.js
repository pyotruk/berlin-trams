/**
 * Tram route.
 * Routes is edge of the graph.
 *
 * @param id
 * @param nodes {Array}
 */

var Route = function (id, nodes) {
    var self = this;

    const STEP = 0.1;
    const EPS = __config__.point.equalsEps;

    self.id = id;
    self.nodes = nodes;

    var direction = -1;

    self.toString = function () {
        return 'Route#' + self.id;
    };

    self.getFirstStop = function () {
        return self.nodes[0];
    };

    self.getStep = function () {
        return STEP;
    };

    self.getDirection = function () {
        return direction;
    };

    var adjustToEnd = function (currentPos) {
        return PointUtils.adjustToNearestEndOfLine(
            currentPos,
            self.nodes[0],
            self.nodes[self.nodes.length - 1],
            EPS
        );
    };

    var isOutside = function (currentPos) {
        return !PointUtils.isPolarPointBelongsToLine(
            currentPos,
            self.nodes[0],
            self.nodes[self.nodes.length - 1],
            EPS
        );
    };

    self.move = function (currentPos) {
        var newPos = new Point(
            currentPos.r + direction * STEP,
            currentPos.fi
        );
        if (isOutside(newPos)) {
            direction = -1 * direction;
            newPos = adjustToEnd(newPos);
            console.log(self + ' >> END reached >> direction changed to [' + direction + '].');
        }
        if (PointUtils.isPole(newPos, EPS)) {
            direction = -1 * direction;
            newPos.handlePoleCross();
            console.log(self + ' >> POLE reached >> direction changed to [' + direction + '].');
        }
        return newPos;
    };

    /**
     * @param currentPos
     * @returns number - current stop`s index or -1 if we have not yet reached the stop
     */
    self.isStop = function (currentPos) {
        for (var i in self.nodes) {
            if (self.nodes.hasOwnProperty(i) &&
                self.nodes[i].equals(currentPos)) {
                return parseInt(i);
            }
        }
        return -1;
    };

    self.findNextStop = function (currentPos) {
        var currentStopIndex = PointUtils.findNearestLinePointIndex(currentPos, self.nodes);
        if (currentStopIndex < 0) return null;

        var nextStopPos = currentPos.clone();
        nextStopPos.r += direction * 1; //TODO distance between stops
        var nextStopIndex = PointUtils.findNearestLinePointIndex(nextStopPos, self.nodes);

        return self.nodes[nextStopIndex];
    };

};