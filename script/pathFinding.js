// functions in this file are used to find enemy path
const SPLINE_INTERVAL = 0.007;
// initilize critical points
var CONTROL_POINTS_11 = new Array(new Element(175,0), new Element(175,0), new Element(250,90), new Element(400,115), 
                                    new Element(435,235), new Element(495,340), new Element(630,360), new Element(725,445),
                                    new Element(850,380), new Element(895,295), new Element(920,195), new Element(920, 195));

var CONTROL_POINTS_12 = new Array(new Element(0, 555), new Element(0, 555), new Element(135, 555),
                                    new Element(250, 490), new Element(255, 370), new Element(365, 290), 
                                    new Element(495, 340), new Element(630, 360), new Element(725, 445),
                                    new Element(850, 380), new Element(895, 295), new Element(920, 195), new Element(920, 195));

var CONTROL_POINTS_13 = new Array(new Element(1496, 685), new Element(1496, 685),
                                    new Element(1365, 685), new Element(1200, 685), new Element(1045, 625),
                                    new Element(865, 620), new Element(755, 560), new Element(725, 445),
                                    new Element(850, 380), new Element(895, 295), new Element(920, 195), new Element(920, 195));

var CONTROL_POINTS_21 = new Array(new Element(0, 465), new Element (0, 465), new Element(150, 465), new Element(300, 465), new Element(450, 465), new Element(600, 465), new Element(750, 465),
                                    new Element(890, 490), new Element(1020, 530), new Element(1170, 520), new Element(1230, 410), new Element(1270, 300), new Element(1390,255), new Element(1520, 255), new Element(1520, 255));
var CONTROL_POINTS_22 = new Array(new Element(470, 860), new Element(470,860), new Element(470, 740), new Element(470, 620), new Element(500, 515), new Element(600, 465), new Element(750, 465),
                                    new Element(890, 490), new Element(1020, 530), new Element(1170, 520), new Element(1230, 410), new Element(1270, 300), new Element(1390,255), new Element(1520, 255), new Element(1520, 255)); 
// implement Catmull-rom Spline
// getSplinePoints(float, array of control_points)
function getSplinePoints(t, control_points) {
    var p0, p1, p2, p3;
    p1 = Math.floor(t) + 1;
	p2 = p1 + 1;
	p3 = p2 + 1;
    p0 = p1 - 1;
    
    t = t - Math.floor(t);
    var tt = t * t;
    var ttt = tt * t;

    var q1 = -ttt + 2.0 * tt - t;
	var q2 = 3.0 * ttt - 5.0 * tt + 2.0;
	var q3 = -3.0 * ttt + 4.0 * tt + t;
    var q4 = ttt - tt;
    //console.log("!!!!!!!!!!!!!!!!!!!" + p1+", " +  p2 + ", "+ p3 + "," +p0);
    //console.log (control_points[p0]);
    var tx = 0.5 * (control_points[p0].position.x * q1 + control_points[p1].position.x * q2 + control_points[p2].position.x * q3 + control_points[p3].position.x * q4);
    var ty = 0.5 * (control_points[p0].position.y * q1 + control_points[p1].position.y * q2 + control_points[p2].position.y * q3 + control_points[p3].position.y * q4);
    
    return new Element(tx, ty);
}

// getSpline(array of control_points)
// call this function when setup game so that enemy will have its moving path
function getSpline(control_points) {
    // CONTROL_POINTS_11.forEach(function (point) {
    //     console.log((point.position.x +", " + point.position.y));
    // });
    var t;
    var enemyPath = new Array();
    for (t = 0; t < control_points.length - 3.0; t += SPLINE_INTERVAL) {
        // get spline point and add it into enemy path
        var Spoint = getSplinePoints(t, control_points)
        enemyPath.push(Spoint);

        // draw picture to show path   (for test)
        //pathFinding(Spoint.position.x, Spoint.position.y, t);
    }

    return enemyPath;
}

// (postion x, postion y, index of point)  could be used to draw path
function pathFinding(x, y, id) {
    var img = $('<img />').attr({
        'id': 'pp' + id,
        'src': './chosen_tower/stone_and_fire_tower/40.png'
    }).css({
        top: y,
        left: x,
        position: 'absolute'
    }).
    appendTo("#" + curGameLevel);
}

// for test
// draw all control points
function drawControlPoints(control_points) {
    control_points.forEach(function(point, index) {
        pathFinding(point.position.x, point.position.y, index);
    });
}

