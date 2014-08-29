var Matrix = require('../').matrix;
var Vector = require('../').vector;
var should = require('should');

describe('Creating matrices: ', function () {
  it('should create a Matrix', function () {
    var A = new Matrix(3,4);
    A.size.should.eql({rows: 3, cols: 4});
  });
  it('should create a square Matrix', function () {
    var B = new Matrix(2);
    B.size.should.eql({rows: 2, cols: 2});
  });
  it('should have trace === dim if identity', function (done){
    var C = new Matrix(7,7,true),
        D = C.trace();
    D.should.eql(7);
    done();
  });
  it('allows identity matrix iff matrix is square', function (){
      (function () {
        var A = new Matrix(7, 3, true);
      }).should.throw();
  });
  describe('2x2 matrices: ', function () {
    var A = new Matrix(2,2);
    var B = new Matrix(2,2);
    var D = new Matrix(2,2);

    it('should set a specific value', function () {
      // var A = new Matrix(3,4);
      A.set(0,0,1);
      A.set(0,1,2);
      A.set(1,0,3);
      A.set(1,1,4);
      A.m[1][1].should.eql(4);
    });

    it('should get the value at a specific location', function () {
      A.get(1,1).should.eql(4);
    });

    it('should add the two matrices together', function () {
      B.set(0,0,2);
      B.set(0,1,4);
      B.set(1,0,6);
      B.set(1,1,8);
      var C = A.add(B);
      C.get(0,0).should.eql(3);
      C.get(1,0).should.eql(9);
    });

    it('should multiply a vector by a matrix', function () {
      var v = new Vector(2,3);
      var C = A.dot(v);
      C.v.should.eql([8,18]);
    });

    it('should multiply two matrices together', function () {
      var C = A.dot(B);
      C.get(0,0).should.eql(14);
      C.get(0,1).should.eql(20);
      C.get(1,0).should.eql(30);
      C.get(1,1).should.eql(44);
    });

    it('should find the transpose of the matrix', function () {
      var C = A.transpose();
      C.get(0,0).should.eql(A.get(0,0));
      C.get(0,1).should.eql(A.get(1,0));
      C.get(1,1).should.eql(A.get(1,1));
      C.get(1,0).should.eql(A.get(0,1));
    });

    it('should calculate the determinant of the matrix', function () {
      var C = A.det();
      C.should.eql(-2);
    });

    it('should calculate the trace of the matrix', function () {
      var C = A.trace();
      C.should.eql(5);
    });

    it('should scale the matrix by a value', function () {
      var C = A.scale(-1);
      C.get(0,0).should.eql(-1);
      C.get(0,1).should.eql(-2);
      C.get(1,0).should.eql(-3);
      C.get(1,1).should.eql(-4);

    });
    
    it('scale detects out of bounds access', function () {
      D.set(0,0,2);
      D.set(0,1,4);
      D.set(0,2,Infinity);
      D.set(1,0,6);
      D.set(1,1,8);
      D.set(1,2,Infinity);
      var C = D.scale(-1);
      C.get(0,0).should.eql(-2);
      C.get(0,1).should.eql(-4);
      C.get(1,0).should.eql(-6);
      C.get(1,1).should.eql(-8);
      should.not.exist(C.get(0,2));
      should.not.exist(C.get(1,2));
    });
    
  });

  describe('3x3 matrices: ', function () {
    var  A = new Matrix(3,3);
    var  B = new Matrix(3,3);
    var  D = new Matrix(3,3);

    it('should set a specific value', function () {
      A.set(0,0,1);
      A.set(0,1,2);
      A.set(0,2,3);
      A.set(1,0,4);
      A.set(1,1,5);
      A.set(1,2,6);
      A.set(2,0,7);
      A.set(2,1,8);
      A.set(2,2,9);
      A.m[1][0].should.eql(4);
    });

    it('should get the value at a specific location', function () {
      A.get(1,1).should.eql(5);

    });

    it('should add the two matrices together', function () {
      B.set(0,0,2);
      B.set(0,1,4);
      B.set(0,2,6);
      B.set(1,0,8);
      B.set(1,1,10);
      B.set(1,2,12);
      B.set(2,0,14);
      B.set(2,1,16);
      B.set(2,2,18);
      var C = A.add(B);
      C.get(0,0).should.eql(3);
      C.get(1,0).should.eql(12);
    });

    it('should multiply a vector by a matrix', function () {
      var v = new Vector(2,3,4);
      var C = A.dot(v);
      C.v.should.eql([20, 47, 74]);
    });

    it('should multiply two matrices together', function () {
      var C = A.dot(B);
      C.get(0,0).should.eql(60);
      C.get(0,1).should.eql(72);
      C.get(0,2).should.eql(84);
      C.get(1,0).should.eql(132);
      C.get(1,1).should.eql(162);
      C.get(1,2).should.eql(192);
      C.get(2,0).should.eql(204);
      C.get(2,1).should.eql(252);
      C.get(2,2).should.eql(300);
    });

    it('should find the transpose of the matrix', function () {
      var C = A.transpose();
      C.get(0,0).should.eql(A.get(0,0));
      C.get(0,1).should.eql(A.get(1,0));
      C.get(1,1).should.eql(A.get(1,1));
      C.get(1,0).should.eql(A.get(0,1));
    });

    it('should calculate the determinant of the matrix', function () {
      var C = A.det();
      C.should.eql(0);

      D.set(0,0,0);
      D.set(0,1,1);
      D.set(0,2,1);
      D.set(1,0,1);
      D.set(1,1,1);
      D.set(1,2,1);
      D.set(2,0,1);
      D.set(2,1,1);
      D.set(2,2,1);
      var C = D.det();
      parseFloat(D.det().toFixed(12)).should.eql(0);      
    });

    it('should calculate the trace of the matrix', function () {
      var C = A.trace();
      C.should.eql(15);
    });

    it('should scale the matrix by a value', function () {
      var C = A.scale(-1);
      C.get(0,0).should.eql(-1);
      C.get(0,1).should.eql(-2);
      C.get(0,2).should.eql(-3);
      C.get(1,0).should.eql(-4);
      C.get(1,1).should.eql(-5);
      C.get(1,2).should.eql(-6);
      C.get(2,0).should.eql(-7);
      C.get(2,1).should.eql(-8);
      C.get(2,2).should.eql(-9);
    });
  });
  describe('4x4 matrix', function () {
    it('should calculate det', function () {
      var A = new Matrix(4, 4);
      A.setRow(0, [3,4,4,-1]);
      A.setRow(1, [2,1,5,3]);
      A.setRow(2, [2,1,3,4]);
      A.setRow(3, [0,-2,1,3]);

      parseFloat(A.det().toFixed(10)).should.eql(-23);
    });
    
    it('detects non-homogenous matrix', function () {
      (function () {
        var A = new Matrix(3, 4);
        A.getPoint();
      }).should.throw();
    });

    it('returns the specified point', function () {
      var A = new Matrix(4, 4);
      A.setRow(0, [3,4,4,-1]);
      A.setRow(1, [2,1,5,3]);
      A.setRow(2, [2,1,3,4]);
      A.setRow(3, [0,-2,1,3]);
      A.getPoint().v.should.eql([-1,3,4]);
    });

    it('calculates the rotation vector for the matrix', function () {
      var  D = new Matrix(4,4);
      D.setRow(0, [0.2,1,1,1]);
      D.setRow(1, [1,0.3,1,1]);
      D.setRow(2, [1,1,0.1,1]);
      D.setRow(3, [0,1,1,1]);
      D.calcRotVec().should.eql(new Vector(0, 0, 0));

      var  D = new Matrix(4,4);
      D.setRow(0, [-0.03,1,1,1]);
      D.setRow(1, [-1,-0.2,1,1]);
      D.setRow(2, [-1,-1,-0.1,1]);
      D.setRow(3, [0,-1,-1,-1]);
      D.calcRotVec().should.eql(new Vector(-1.338968862122, 1.338968862122, -1.338968862122));

    });

  });
  describe('5x5 matrix', function () {
    it('should calculate det', function () {
      var A = new Matrix(5, 5);
      A.setRow(0, [1,2,5,4,3]);
      A.setRow(1, [2,3,5,5,2]);
      A.setRow(2, [2,2,5,6,1]);
      A.setRow(3, [0,-2,1,3,2]);
      A.setRow(4, [1,2,0,5,4]);

      parseFloat(A.det().toFixed(10)).should.eql(81);
    });
  });
  describe('5x5 matrix', function () {
    it('should calculate det of sparse matrix', function () {
      var A = new Matrix(5, 5);
      A.setRow(0, [0,0,1,0,0]);
      A.setRow(1, [0,0,0,0,0]);
      A.setRow(2, [0,0,0,0,0]);
      A.setRow(3, [0,0,0,0,0]);
      A.setRow(4, [0,0,0,0,0]);

      parseFloat(A.det().toFixed(10)).should.eql(0);
    });
  });
  describe('determinant validation', function () {
    it('should get the same determinant via Doolittle or Cofactor calculation', function () {
      var A = new Matrix(5, 5);
      A.setRow(0, [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
      A.setRow(1, [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
      A.setRow(2, [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
      A.setRow(3, [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
      A.setRow(4, [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);

      parseFloat(A.det().toFixed(10)).should.eql(A.cofactorDet().toFixed(10));
    });
  });
  describe('not square matrix det', function () {
    it('should throw exception', function () {
      (function () {
        var A = new Matrix(3, 4);
        A.det();
      }).should.throw();
    });
  });
});
