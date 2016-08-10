describe('point-utils', function () {
    
    const EPS = __config__.point.equalsEps;

    it('Test affine transforms', function () {
        var point = PointUtils.affine(
            {x: 2, y: 42},
            [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]
        );
        expect(point.x).toEqual(2);
        expect(point.y).toEqual(42);

        point = PointUtils.affine(
            {x: 2, y: 42},
            [
                [1, 0, 0],
                [0, -1, 0],
                [0, 0, 1]
            ]
        );
        expect(point.x).toEqual(2);
        expect(point.y).toEqual(-42);

        point = PointUtils.affine(
            {x: 2, y: 42},
            [
                [1, 0, 2],
                [0, 1, -2],
                [0, 0, 1]
            ]
        );
        expect(point.x).toEqual(4);
        expect(point.y).toEqual(40);
    });

    it('Test normalizePolar()', function () {
        var point = PointUtils.normalizePolar({r: 1, fi: 1}, EPS);
        expect(point.r).toEqual(1);
        expect(point.fi).toEqual(1);

        point = PointUtils.normalizePolar({r: -1, fi: Math.PI}, EPS);
        expect(point.r).toEqual(1);
        expect(point.fi).toEqual(0);

        point = PointUtils.normalizePolar({r: -1.42, fi: 2 * Math.PI}, EPS);
        expect(point.r).toEqual(1.42);
        expect(point.fi).toEqual(Math.PI);

        point = PointUtils.normalizePolar({r: EPS / 10, fi: 2 * Math.PI}, EPS);
        expect(point.r).toEqual(0);
        expect(point.fi).toEqual(0);

        point = PointUtils.normalizePolar({r: -EPS / 10, fi: 2 * Math.PI}, EPS);
        expect(point.r).toEqual(0);
        expect(point.fi).toEqual(0);

        point = PointUtils.normalizePolar({r: -EPS / 10, fi: Math.PI}, EPS);
        expect(point.r).toEqual(0);
        expect(point.fi).toEqual(Math.PI);
    });

    it('Test isPolarPointBelongsToLine()', function () {
        expect(PointUtils.isPolarPointBelongsToLine(
            new Point(0.4, 0),
            new Point(1, Math.PI),
            new Point(1, 0),
            EPS
        )).toEqual(true);

        expect(PointUtils.isPolarPointBelongsToLine(
            new Point(1, 0),
            new Point(1, Math.PI),
            new Point(1, 0),
            EPS
        )).toEqual(true);

        expect(PointUtils.isPolarPointBelongsToLine(
            new Point(1, Math.PI),
            new Point(1, Math.PI),
            new Point(1, 0),
            EPS
        )).toEqual(true);

        expect(PointUtils.isPolarPointBelongsToLine(
            new Point(0, 0),
            new Point(1, Math.PI),
            new Point(1, 0),
            EPS
        )).toEqual(true);

        expect(PointUtils.isPolarPointBelongsToLine(
            new Point(0, 0),
            new Point(1, 2 / 3 * Math.PI),
            new Point(1, 5 / 3 * Math.PI),
            EPS
        )).toEqual(true);

        expect(PointUtils.isPolarPointBelongsToLine(
            new Point(1.1, 0),
            new Point(1, Math.PI),
            new Point(1, 0),
            EPS
        )).toEqual(false);

        expect(PointUtils.isPolarPointBelongsToLine(
            new Point(1.1, Math.PI),
            new Point(1, Math.PI),
            new Point(1, 0),
            EPS
        )).toEqual(false);
    });

    it('Test findNearestLinePointIndex()', function () {
        var nodes = [
            {r: 1.0, fi: 5 / 3 * Math.PI},
            {r: 0.0, fi: 0.0},
            {r: 1.0, fi: 2 / 3 * Math.PI}
        ];

        expect(PointUtils.findNearestLinePointIndex(
            {r: 1.0, fi: 2.0943951023931966},
            nodes,
            EPS
        )).toEqual(2);

        expect(PointUtils.findNearestLinePointIndex(
            {r: 0.1, fi: 2.0943951023931966},
            nodes,
            EPS
        )).toEqual(1);

        expect(PointUtils.findNearestLinePointIndex(
            {r: 0.6, fi: 2.0943951023931966},
            nodes,
            EPS
        )).toEqual(2);
    });

});