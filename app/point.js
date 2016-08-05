/**
 * Point in polar coordinates.
 */

var Point = function (r, fi) {
    var self = this;

    const EPS = 0.11;

    self.r = r;
    self.fi = fi;

    self.equals = function (point) {
        return (Math.abs(self.r - point.r) < EPS) &&
            (Math.abs(self.fi - point.fi) < EPS);
    };

    self.toString = function () {
        return '[' + self.r + ',' + self.fi + ']';
    };
};