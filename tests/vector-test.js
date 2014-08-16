var v = require('../').vector;
var should = require('should');

describe('Creating vectors: ', function () {
  it('truly creates a vector', function () {
    var a = new v(1);
    a.isVector.should.eql(true);
  });
  
  it('Should pass with 3 arguments', function () {
    var a = new v(1,0,0);
    a.v.length.should.eql(3);
    a.v.should.eql([1,0,0]);
  });

  it('Should pass with 2 arguments', function () {
    var a = new v(1,0);
    a.v.length.should.eql(2);
    a.v.should.eql([1,0]);
  });

  it('should pass with 1 argument as an object', function () {
    var a = new v({x: 1, y: 0});
    a.v.length.should.eql(2);
    a.v.should.eql([1,0]);
  });

  it('should pass with 1 argument as a vector', function () {
    var a = new v([1,0]);
    a.v.length.should.eql(2);
    a.v.should.eql([1,0]);
  });
});

var a = new v(1,0,0);
var b = new v(1,1,0);
var d = new v(0,1,1);

describe('Between two vectors: ', function () {
  it('should add two vectors easily', function () {
    var c = a.add(b);
    c.v.length.should.eql(3);
    c.v.should.eql([ 2, 1, 0 ]);
    
    var c = a.add(d);
    c.v.length.should.eql(3);
    c.v.should.eql([ 1, 1, 1 ]);
  });

  it('should calculate the dot product', function () {
    var c = a.dot(b);
    c.should.eql(1);
    
    var c = a.dot(d);
    c.should.eql(0);
  });

  it('should calculate the cross product', function () {
    var c = a.cross(b);
    c.v.length.should.eql(3);
    c.v.should.eql([0,0,1]);
    
    var c = b.cross(a);
    c.v.length.should.eql(3);
    c.v.should.eql([0,0,-1]);
    
    var c = a.cross(d);
    c.v.length.should.eql(3);
    c.v.should.eql([0,-1,1]);
    
    var c = d.cross(b);
    c.v.length.should.eql(3);
    c.v.should.eql([-1,1,-1]);
  });

  it('should calculate the distance between the two', function () {
    var c = a.distanceFrom(b);
    c.should.eql(1);
    
    var c = a.distanceFrom(a);
    c.should.eql(0);
    
    var c = b.distanceFrom(d);
    c.should.eql(Math.sqrt(2));
  });

  it('should calculate the length of the vector', function () {
    var lenA = a.length();
    var lenB = b.length();
    lenA.should.eql(1);
    lenB.should.eql(Math.sqrt(2));
  })
});
