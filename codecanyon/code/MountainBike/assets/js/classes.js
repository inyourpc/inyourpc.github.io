function init() {
  function n() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    menuCanvas.width = gameCanvas.width = WIDTH;
    menuCanvas.height = gameCanvas.height = HEIGHT;
    menu_mc.resize(WIDTH, HEIGHT, 500, 400);
    game_mc.resize(WIDTH, HEIGHT, 500, 400)
  }
  gameCanvas = document.getElementById('gameCanvas');
  menuCanvas = document.getElementById('menuCanvas');
  menu_mc = new createjs.Container;
  game_mc = new createjs.Container;
  menu_mc.resize = function (n, t, i, r) {
    var u = 1;
    u = n / t >= i / r ? t / r : n / i;
    this.scaleX = this.scaleY = u;
    this.x = (n - i * u) / 2;
    this.y = (t - r * u) / 2;
    this.progress_mc && this.progress_mc.arrow_mc.resize(n, t)
  };
  game_mc.resize = function (n, t, i, r) {
    var u = 1;
    u = n / t >= i / r ? t / r : n / i;
    this.scaleX = this.scaleY = u;
    this.x = (n - i * u) / 2;
    this.y = (t - r * u) / 2
  };
  images = images || {
  };
  ss = ss || {
  };
  window.addEventListener('resize', n);
  n();
  loader = new createjs.LoadQueue(!1);
  loader.installPlugin(createjs.Sound);
  loader.on('fileload', handleFileLoad);
  loader.on('progress', handleProgress);
  loader.loadManifest(lib.properties.manifest)
}
var loadingstarted=false;
var adshown=false;

var adshownalready=false;

function handleFileLoad(n) {
  if(!loadingstarted){
  console.log(document.getElementById("preloader_text"));
  var element = document.getElementById("preloader_text");
  element.innerHTML = "";
  loadingstarted = true;
  }

  n.item.type == 'image' && (images[n.item.id] = n.result);
  n.item.id == 'cover_img' ? loading()  : n.item.id == 'over_1' ? handleComplete()  : n.item.id == 'over_6' && (createjs.Sound.play('fogaudio'), setTimeout(EventProcess.process_1, 3000))
}
function loading() {
  ss.logo_mc_atlas_ = loader.getResult('logo_mc_atlas_');
  createjs.Ticker.setFPS(lib.properties.fps);
  menuStage = new createjs.Stage(menuCanvas);
  menu_mc.intro_mc = new lib.logo_mc;
  menu_mc.addChild(menu_mc.intro_mc);
  menuStage.addChild(menu_mc);
  menuStage.update();
  menuStage.enableMouseOver();
  createjs.Touch.enable(menuStage);
  createjs.Ticker.addEventListener('tick', menuStage)
}
function handleComplete() {
  console.log('complete load');
  ss.play_mc_atlas_ = loader.getResult('play_mc_atlas_');
  ss.game_mc_atlas_ = loader.getResult('game_mc_atlas_');
  ss.message_mc_atlas_ = loader.getResult('message_mc_atlas_');
  ss.small_menu_mc_atlas_ = loader.getResult('small_menu_mc_atlas_');
  menu_mc.play_mc = new lib.play_mc;
  menu_mc.progress_mc = new lib.progress_mc;
  menu_mc.progress_mc.arrow_mc.resize(WIDTH, HEIGHT);
  menu_mc.progress_mc.arrow_mc.visible = isMobile();
  menu_mc.messages_mc = new lib.game_messages;
  menu_mc.small_fog_logo = new lib.small_fog_logo;
  game_mc.level_mc = new Level;
  game_mc.addChild(game_mc.level_mc);
  gameStage = new createjs.Stage(gameCanvas);
  gameStage.enableDOMEvents(!1);
  createjs.Ticker.addEventListener('tick', gameStage)
}
function handleProgress() {
  menu_mc.intro_mc && (menu_mc.intro_mc.prel.instance.scaleX = loader.progress, menu_mc.intro_mc.text.text = '' + Math.round(loader.progress * 100))
}
function bodyOnload() {
  document.readyState === 'complete' ? init()  : setTimeout(bodyOnload)
}
var PiVal = {
  isEmpty: function (n) {
    return n == undefined
  }
},
PiObj = {
  getCount: function (n) {
    var t = 0;
    for (var i in n) typeof n[i] == 'object' && t++;
    return t
  },
  copy: function (n, t) {
    for (var i in n) typeof n[i] == 'object' ? (t[i] = {
    }, this.copy(n[i], t[i]))  : t[i] = n[i]
  }
},
PiMath = {
  tr: function (n) {
    var t = Math.pow(10, digits);
    return n *= t,
    n = Math.round(n),
    n / t
  },
  percToVal: function (n, t, i) {
    var r = Math.abs(n - t);
    return r * i / 100 + n
  },
  valToPerc: function (n, t, i) {
    var r = Math.abs(n - t);
    return (i - n) * 100 / r
  }
},
PiGeo = {
  RADIAN: 57.2957795130823,
  DEGREE: 0.0174532925199433,
  distance: function (n, t, i, r) {
    var u = n - i,
    f = t - r;
    return Math.sqrt(u * u + f * f)
  },
  angle: function (n, t, i, r) {
    return Math.atan2(i - n, r - t) * this.RADIAN
  }
},
Vector = function (n, t) {
  this.x = n;
  this.y = t
},
RimParticle,
Rectangle,
Particle,
ParticleSystem,
Constraint,
AngularConstraint,
Point,
Line,
Surface,
Wheel,
CircleSurface,
Level,
gameCanvas,
menuCanvas,
loader,
gameStage,
menuStage,
WIDTH,
HEIGHT,
menu_mc,
game_mc,
level_data,
isMobile,
EventProcess,
Key;
Vector.prototype = {
  init: function (n, t) {
    this.x = n;
    this.y = t
  },
  dot: function (n) {
    return this.x * n.x + this.y * n.y
  },
  cross: function (n) {
    return this.x * n.y - this.y * n.x
  },
  plus: function (n) {
    return this.x += n.x,
    this.y += n.y,
    this
  },
  plusNew: function (n) {
    return new Vector(this.x + n.x, this.y + n.y)
  },
  minus: function (n) {
    return this.x -= n.x,
    this.y -= n.y,
    this
  },
  minusNew: function (n) {
    return new Vector(this.x - n.x, this.y - n.y)
  },
  mult: function (n) {
    return this.x *= n,
    this.y *= n,
    this
  },
  multNew: function (n) {
    return new Vector(this.x * n, this.y * n)
  },
  distance: function (n) {
    var t = this.x - n.x,
    i = this.y - n.y;
    return Math.sqrt(t * t + i * i)
  },
  normalize: function () {
    var n = Math.sqrt(this.x * this.x + this.y * this.y);
    return this.x /= n,
    this.y /= n,
    this
  },
  x: null,
  y: null
};
RimParticle = function (n, t) {
  this.init(n, t)
};
RimParticle.prototype = {
  curr: null,
  prev: null,
  vs: null,
  speed: null,
  maxTorque: null,
  wr: null,
  init: function (n, t) {
    this.curr = new Vector(n, 0);
    this.prev = new Vector(0, 0);
    this.vs = 0;
    this.speed = 0;
    this.maxTorque = t;
    this.wr = n
  },
  verlet: function (n) {
    var r,
    u;
    this.speed = Math.max( - this.maxTorque, Math.min(this.maxTorque, this.speed + this.vs));
    var t = - this.curr.y,
    i = this.curr.x,
    f = Math.sqrt(t * t + i * i);
    t /= f;
    i /= f;
    this.curr.x += this.speed * t;
    this.curr.y += this.speed * i;
    var e = this.prev.x,
    o = this.prev.y,
    s = this.prev.x = this.curr.x,
    h = this.prev.y = this.curr.y;
    this.curr.x += n.coeffDamp * (s - e);
    this.curr.y += n.coeffDamp * (h - o);
    r = Math.sqrt(this.curr.x * this.curr.x + this.curr.y * this.curr.y);
    u = (r - this.wr) / r;
    this.curr.x -= this.curr.x * u;
    this.curr.y -= this.curr.y * u
  }
};
Rectangle = function (n, t, i, r) {
  this.init(n, t, i, r)
};
Rectangle.prototype = {
  p0: null,
  p1: null,
  p2: null,
  p3: null,
  init: function (n, t, i, r) {
    var u = n.addParticle(t.x - i / 2, t.y - r / 2, 0),
    f = n.addParticle(t.x + i / 2, t.y - r / 2, 0),
    e = n.addParticle(t.x + i / 2, t.y + r / 2, 0),
    o = n.addParticle(t.x - i / 2, t.y + r / 2, 0);
    n.addConstraint(u, f);
    n.addConstraint(f, e);
    n.addConstraint(e, o);
    n.addConstraint(o, u);
    n.addConstraint(u, e);
    n.addConstraint(f, o);
    this.p0 = u;
    this.p1 = f;
    this.p2 = e;
    this.p3 = o
  }
};
Particle = function (n, t, i) {
  this.init(n, t, i)
};
Particle.prototype = {
  curr: null,
  prev: null,
  temp: null,
  mass: null,
  init: function (n, t, i) {
    this.curr = new Vector(n, t);
    this.prev = new Vector(n, t);
    this.temp = new Vector(0, 0);
    this.mass = i == undefined || i < 0 ? 0 : i
  },
  verlet: function (n) {
    this.temp.x = this.curr.x;
    this.temp.y = this.curr.y;
    this.curr.x += n.coeffDamp * (this.curr.x - this.prev.x) + n.gravity.x;
    this.curr.y += n.coeffDamp * (this.curr.y - this.prev.y) + n.gravity.y + this.mass;
    this.prev.x = this.temp.x;
    this.prev.y = this.temp.y
  },
  checkCollision: function (n, t) {
    n.resolveParticleCollision(this, t)
  },
  setPos: function (n, t) {
    this.curr.x = n;
    this.curr.y = t;
    this.prev.x = n;
    this.prev.y = t
  },
  paint: function () {
  }
};
ParticleSystem = function () {
  this.init()
};
ParticleSystem.prototype = {
  _particles_ar: null,
  _surfaces_ar: null,
  _constraints_ar: null,
  _wheels_ar: null,
  _s_count: 0,
  _p_count: 0,
  _c_count: 0,
  _w_count: 0,
  gravity: null,
  coeffRest: null,
  coeffFric: null,
  coeffDamp: null,
  init: function () {
    this._particles_ar = [
    ];
    this._surfaces_ar = [
    ];
    this._constraints_ar = [
    ];
    this._wheels_ar = [
    ];
    this.gravity = new Vector(0, 1);
    this.coeffRest = 1 + 0.5;
    this.coeffFric = 0.01;
    this.coeffDamp = 0.99
  },
  addParticle: function (n, t, i) {
    var r = new Particle(n, t, i);
    return this._particles_ar.push(r),
    this._p_count = this._particles_ar.length,
    r
  },
  addWheel: function (n) {
    this._wheels_ar.push(n);
    this._w_count = this._wheels_ar.length
  },
  addSurface: function (n) {
    this._surfaces_ar.push(n);
    this._s_count = this._surfaces_ar.length
  },
  addCircleSurface: function (n) {
    this._surfaces_ar.push(n);
    this._s_count = this._surfaces_ar.length
  },
  addConstraint: function (n, t) {
    var i = new Constraint(n, t);
    return this._constraints_ar.push(i),
    this._c_count = this._constraints_ar.length,
    i
  },
  addRectangle: function (n, t, i) {
    return new Rectangle(this, n, t, i)
  },
  addAngularConstraint: function (n, t, i) {
    var r = new AngularConstraint(n, t, i);
    return this._constraints_ar.push(r),
    this._c_count = this._constraints_ar.length,
    r
  },
  setKfr: function (n) {
    this.coeffRest = 1 + n
  },
  setFriction: function (n) {
    this.coeffFric = n
  },
  setDamping: function (n) {
    this.coeffDamp = n
  },
  setGravity: function (n, t) {
    this.gravity.x = n;
    this.gravity.y = t
  },
  verlet: function () {
    for (var n = 0; n < this._p_count; n++) this._particles_ar[n].verlet(this);
    for (n = 0; n < this._w_count; n++) this._wheels_ar[n].verlet(this)
  },
  satisfy_constraints_ar: function () {
    for (var n = 0; n < this._c_count; n++) this._constraints_ar[n].resolve()
  },
  checkCollisions: function () {
    for (var t, i, n = 0; n < this._s_count; n++) {
      for (t = 0; t < this._p_count; t++) this._particles_ar[t].checkCollision(this._surfaces_ar[n], this);
      for (i = 0; i < this._w_count; i++) this._wheels_ar[i].checkCollision(this._surfaces_ar[n], this)
    }
  },
  paintSurfaces: function () {
    for (var n = 0; n < this._surfaces_ar.length; n++) this._surfaces_ar[n].paint()
  },
  paintParticles: function () {
    for (var n = 0; n < this._particles_ar.length; n++) this._particles_ar[n].paint()
  },
  paintConstraints: function () {
    for (var n = 0; n < this._constraints_ar.length; n++) this._constraints_ar[n].paint()
  },
  paintWheels: function () {
    for (var n = 0; n < this._wheels_ar.length; n++) this._wheels_ar[n].paint()
  },
  timeStep: function () {
    this.verlet();
    this.satisfy_constraints_ar();
    this.checkCollisions()
  }
};
Constraint = function (n, t) {
  this.init(n, t)
};
Constraint.prototype = {
  p1: null,
  p2: null,
  restLength: null,
  init: function (n, t) {
    this.p1 = n;
    this.p2 = t;
    this.restLength = n.curr.distance(t.curr)
  },
  resolve: function () {
    var i = this.p1.curr.minusNew(this.p2.curr),
    n = this.p1.curr.distance(this.p2.curr),
    r = (n - this.restLength) / n,
    t = i.mult(r * 0.5);
    this.p1.curr.minus(t);
    this.p2.curr.plus(t)
  },
  setRestLength: function (n) {
    this.restLength = n
  },
  paint: function () {
  }
};
AngularConstraint = function (n, t, i) {
  this.init(n, t, i)
};
AngularConstraint.prototype = {
  pA: null,
  pB: null,
  pC: null,
  pD: null,
  lineA: null,
  lineB: null,
  lineC: null,
  coeffStiff: null,
  targetTheta: null,
  init: function (n, t, i) {
    this.pA = n.curr;
    this.pB = t.curr;
    this.pC = i.curr;
    this.lineA = new Line(this.pA, this.pB);
    this.lineB = new Line(this.pB, this.pC);
    this.pD = new Vector(this.pB.x + 0, this.pB.y - 1);
    this.lineC = new Line(this.pB, this.pD);
    this.targetTheta = this.calcTheta(this.pA, this.pB, this.pC);
    this.coeffStiff = 4
  },
  resolve: function () {
    var i = this.getCentroid();
    this.lineC.p2.x = this.lineC.p1.x + 0;
    this.lineC.p2.y = this.lineC.p1.y - 1;
    var r = this.pA.distance(this.pB),
    u = this.pB.distance(this.pC),
    h = this.calcTheta(this.pA, this.pB, this.pC),
    c = this.calcTheta(this.pA, this.pB, this.pD),
    l = this.calcTheta(this.pC, this.pB, this.pD),
    f = (this.targetTheta - h) / 2,
    e = c + f * this.coeffStiff,
    o = l - f * this.coeffStiff;
    this.pA.x = r * Math.sin(e) + this.pB.x;
    this.pA.y = r * Math.cos(e) + this.pB.y;
    this.pC.x = u * Math.sin(o) + this.pB.x;
    this.pC.y = u * Math.cos(o) + this.pB.y;
    var s = this.getCentroid(),
    n = s.x - i.x,
    t = s.y - i.y;
    this.pA.x -= n;
    this.pA.y -= t;
    this.pB.x -= n;
    this.pB.y -= t;
    this.pC.x -= n;
    this.pC.y -= t
  },
  calcTheta: function (n, t, i) {
    var r = new Vector(t.x - n.x, t.y - n.y),
    u = new Vector(i.x - t.x, i.y - t.y),
    f = r.dot(u),
    e = r.cross(u);
    return Math.atan2(e, f)
  },
  theta: function (n) {
    return n == undefined ? this.targetTheta : (this.targetTheta = n, this.targetTheta)
  },
  paint: function () {
  },
  getCentroid: function () {
    var n = (this.pA.x + this.pB.x + this.pC.x) / 3,
    t = (this.pA.y + this.pB.y + this.pC.y) / 3;
    return new Vector(n, t)
  }
};
Point = function (n, t) {
  this.x = n;
  this.y = t;
  this.pn = new Vector(0, 0)
};
Point.prototype = {
  x: null,
  y: null,
  pn: null,
  init: function (n, t) {
    this.x = n;
    this.y = t;
    this.pn = new Vector(0, 0)
  },
  distance: function (n) {
    return PiGeo.distance(this.x, this.y, n.x, n.y)
  }
};
Line = function (n, t) {
  this.p1 = {
    x: n.x,
    y: n.y
  };
  this.p2 = {
    x: t.x,
    y: t.y
  }
};
Line.prototype = {
  p1: null,
  p2: null,
  init: function (n, t) {
    this.p1 = {
      x: n.x,
      y: n.y
    };
    this.p2 = {
      x: t.x,
      y: t.y
    }
  }
};
Surface = function (n, t) {
  this.init(n, t)
};
Surface.prototype = {
  p1: null,
  p2: null,
  rise: null,
  run: null,
  invRun: null,
  invB: null,
  slope: null,
  isOrientH: null,
  normal: null,
  init: function (n, t) {
    this.p1 = new Point(n.x, n.y);
    this.p2 = new Point(t.x, t.y);
    this.isOrientH = !0;
    this.normal = new Vector(0, 0);
    this.calcNormal();
    this.rise = this.p2.y - this.p1.y;
    this.run = this.p2.x - this.p1.x;
    this.invRun = 1 / this.run;
    this.slope = this.rise / this.run;
    this.invB = 1 / (this.run * this.run + this.rise * this.rise)
  },
  setIsOrientH: function (n) {
    this.isOrientH = n
  },
  calcNormal: function () {
    var t = this.p2.x - this.p1.x,
    i = this.p2.y - this.p1.y,
    n;
    this.normal.x = i;
    this.normal.y = - t;
    n = Math.sqrt(this.normal.x * this.normal.x + this.normal.y * this.normal.y);
    this.normal.x /= n;
    this.normal.y /= n
  },
  paint: function () {
  },
  resolveWheelCollision: function (n) {
    var t,
    r,
    i,
    u,
    f;
    this.bounds(n.wp.curr, n.contactRadius) && (this.getClosestPoint(n.wp.curr, n.closestPoint), t = n.closestPoint.minusNew(n.wp.curr), t.normalize(), this.inequality(n.wp.curr) && (r = Math.abs(t.x), t.x = this.normal.x < 0 ? r : - r, t.y = Math.abs(t.y)), i = n.wp.curr.plusNew(t.mult(n.wr)), this.segmentInequality(i) && (u = i.x - n.closestPoint.x, f = i.y - n.closestPoint.y, n.wp.curr.x -= u, n.wp.curr.y -= f, n.resolve(this.normal)))
  },
  resolveParticleCollision: function (n, t) {
    var i,
    r;
    if (this.boundedSegmentInequality(n.curr) && (i = n.curr.minusNew(n.prev), r = this.normal.dot(i), r < 0)) {
      var u = i.minusNew(this.normal.multNew(r)),
      f = u.multNew(t.coeffFric),
      e = this.normal.multNew(r * t.coeffRest),
      o = e.plusNew(f),
      s = i.minusNew(o),
      h = this.normal.dot(n.curr.minusNew(this.p1)) * t.coeffRest;
      n.curr.minus(this.normal.multNew(h));
      n.prev = n.curr.minusNew(s)
    }
  },
  segmentInequality: function (n) {
    var t = this.findU(n),
    i = this.inequality(n);
    return t >= 0 && t <= 1 && i
  },
  boundedSegmentInequality: function (n) {
    var t;
    return (t = this.isOrientH ? n.x >= this.p1.x && n.x <= this.p2.x : this.p1.y < this.p2.y ? n.y >= this.p1.y && n.y <= this.p2.y : n.y <= this.p1.y && n.y >= this.p2.y, t) ? this.inequality(n)  : !1
  },
  inequality: function (n) {
    var t = this.slope * (n.x - this.p1.x) + (this.p1.y - n.y);
    return t <= 0
  },
  bounds: function (n, t) {
    return n.x >= this.p1.x - t && n.x <= this.p2.x + t
  },
  getClosestPoint: function (n, t) {
    var i = this.findU(n),
    r,
    u;
    if (i <= 0) return this.p1;
    if (i >= 1) return this.p2;
    r = this.p1.x + i * (this.p2.x - this.p1.x);
    u = this.p1.y + i * (this.p2.y - this.p1.y);
    t.x = r;
    t.y = u
  },
  findU: function (n) {
    var t = (n.x - this.p1.x) * this.run + (n.y - this.p1.y) * this.rise;
    return t * this.invB
  }
};
Wheel = function (n, t, i, r) {
  this.init(n, t, i, r)
};
Wheel.prototype = {
  wr: null,
  wp: null,
  rp: null,
  closestPoint: null,
  contactRadius: null,
  coeffSlip: null,
  init: function (n, t, i, r) {
    this.wr = i;
    this.wp = new Particle(n, t, r);
    this.rp = new RimParticle(this.wr, 2);
    this.contactRadius = this.wr;
    this.coeffSlip = 0;
    this.closestPoint = new Vector(0, 0)
  },
  verlet: function (n) {
    this.rp.verlet(n);
    this.wp.verlet(n)
  },
  checkCollision: function (n) {
    n.resolveWheelCollision(this)
  },
  paint: function () {
  },
  getInfor: function () {
    return {
      x: this.wp.curr.x,
      y: this.wp.curr.y,
      rotation: - Math.atan2(this.rp.curr.x, this.rp.curr.y) * 57.29578
    }
  },
  resolve: function (n) {
    var t = - this.rp.curr.y,
    i = this.rp.curr.x,
    u = Math.sqrt(t * t + i * i),
    r;
    t /= u;
    i /= u;
    var e = t * this.rp.speed,
    o = i * this.rp.speed,
    s = this.wp.curr.x - this.wp.prev.x,
    h = this.wp.curr.y - this.wp.prev.y,
    c = s + e,
    l = h + o,
    f = - n.y * c + n.x * l;
    this.rp.prev.x = this.rp.curr.x - f * t;
    this.rp.prev.y = this.rp.curr.y - f * i;
    r = 1 - this.coeffSlip;
    this.wp.curr.x += r * this.rp.speed * - n.y;
    this.wp.curr.y += r * this.rp.speed * n.x;
    this.rp.speed *= this.coeffSlip
  }
};
CircleSurface = function (n, t, i) {
  this.init(n, t, i)
};
CircleSurface.prototype = {
  init: function (n, t, i) {
    this.cx = n;
    this.cy = t;
    this.r = i
  },
  paint: function () {
  },
  resolveWheelCollision: function (n) {
    var t = this.cx - n.wp.curr.x,
    i = this.cy - n.wp.curr.y,
    r = Math.sqrt(t * t + i * i),
    u = n.wr + this.r - r,
    f;
    u > 0 && (t /= r, i /= r, n.wp.curr.x -= t * u, n.wp.curr.y -= i * u, f = new Vector( - t, - i), n.resolve(f))
  },
  resolveParticleCollision: function (n) {
    var t = new Vector(this.cx, this.cy),
    u = t.distance(n.curr),
    i,
    r;
    u <= this.r && (i = n.curr.minusNew(t).normalize(), r = t.plusNew(i.multNew(this.r)), n.curr = r)
  }
};
Level = function () {
  function d(n, t, i, r) {
    var u = Math.atan2(t, n),
    f = Math.atan2(r, i),
    e = 0;
    return e = f >= u ? f - u : 2 * Math.PI - (u - f),
    e >= Math.PI
  }
  var n,
  o,
  e,
  p;
  this.initialize();
  n = this;
  this.sound_paused = !1;
  o = document.createElement('canvas');
  o.setAttribute('width', 100);
  o.setAttribute('height', 100);
  var h = new createjs.Stage(o),
  c = new createjs.DOMElement('under'),
  l = new createjs.DOMElement('over');
  for (this.medkits = [
  ], e = 0; e < 13; e++) this.medkits[e] = new lib.classesPirrestBigFootMedkit,
  this.medkits[e].setTransform(0, 0, 1, 1, 0, 0, 0, 40, 40);
  this.star_mc_0 = new lib.finish;
  this.star_mc_0.setTransform(0, 0, 0.7, 0.7);
  this.star_mc = new lib.finish;
  this.star_mc.setTransform(0, 0, 0.7, 0.7);
  this.wheel_1_mc = new lib.jeep_wheel;
  this.wheel_2_mc = new lib.jeep_wheel;
  this.jeep_body_mc = new lib.jeep_body;
  var t = this.jeep_body_mc,
  a = t.stick_back_mc,
  v = t.stick_front_mc,
  w = t.stick_front_point_mc,
  b = t.stick_back_point_mc,
  i = t.driver_mc,
  r,
  u,
  f,
  k,
  y,
  s;
  this.linstenKeys = function () {
    var t = 1,
    n;
    i.drive_mc.stop();
    n = 1.4;
    Key.isDown(Key.LEFT) ? (i.move('back'), r.wp.mass = n, u.wp.mass = - n)  : Key.isDown(Key.RIGHT) ? (i.move('front'), r.wp.mass = - n / 2, u.wp.mass = n / 1.5)  : (i.move('normal'), r.wp.mass = 0, u.wp.mass = 0);
    Key.isDown(Key.UP) ? (i.drive_mc.play(), EventProcess.energeReduce(), r.rp.vs = t, u.rp.vs = t / 6)  : Key.isDown(Key.DOWN) ? (r.rp.vs = - t / 2, u.rp.vs = 0)  : (r.rp.vs = 0, u.rp.vs = 0)
  };
  this.moveCamera = function () {
    var r = 250 - t.x,
    u = 200 - t.y,
    e = r - this.x,
    o = u - this.y,
    f = PiGeo.distance(r, u, this.x, this.y),
    n = f * 0.35,
    i = 0.35;
    n > 50 && (n = 50, i = n / f);
    this.x += e * i;
    this.y += o * i;
    EventProcess.distBarUpdate(t.x, k, y)
  };
  this.start = function (n) {
    var v,
    a,
    e,
    o,
    t;
    for (Key.off(), Key.on(), this.game_over = !1, this.game_paused = !1, k = n.start_x, y = n.end_x, this.p_system = new ParticleSystem, this.p_system.setDamping(n.damping), this.p_system.setGravity(n.gravity.x, n.gravity.y), this.p_system.setKfr(n.kfr), this.p_system.setFriction(n.friction), v = n.surface, t = 0; t < v.length; t++) this.p_system.addSurface(new Surface(v[t][0], v[t][1]));
    for (a = n.circleSurface, t = 0; t < a.length; t++) this.p_system.addCircleSurface(new CircleSurface(a[t].x, a[t].y, a[t].r));
    for (e = n.wheel_1_position, r = new Wheel(e.x, e.y, 29 / 2, 0), this.p_system.addWheel(r), o = n.wheel_2_position, u = new Wheel(o.x, o.y, 29 / 2, 0), this.p_system.addWheel(u), f = this.p_system.addParticle((e.x + o.x) / 2, e.y - 40), this.p_system.addConstraint(r.wp, f), this.p_system.addConstraint(u.wp, f), this.p_system.addConstraint(u.wp, r.wp), s = n.ground_mc, h.removeAllChildren(), h.addChild(s), h.update(), c.htmlElement.src = n.under.src, c.set(n.under.position), l.htmlElement.src = n.over.src, l.set(n.over.position), this.wheel_1_mc.set({
      x: e.x,
      y: e.y
    }), this.wheel_2_mc.set({
      x: o.x,
      y: o.y
    }), this.jeep_body_mc.set({
      x: f.curr.x,
      y: f.curr.y
    }), t = 0; t < this.medkits.length; t++) this.medkits[t].visible = !1,
    this.medkits[t].active = !1,
    this.medkits[t].gotoAndStop(0);
    for (t = 0; t < n.medkits.length; t++) this.medkits[t].set(n.medkits[t]),
    this.medkits[t].visible = !0,
    this.medkits[t].active = !0,
    this.medkits[t].gotoAndStop(0);
    for (this.star_mc_0.set(n.star_mc_0), this.star_mc.set(n.star_mc), i.move('normal'), this.removeAllChildren(), this.addChild(c), t = 0; t < n.medkits.length; t++) this.addChild(this.medkits[t]);
    this.addChild(this.star_mc_0, this.star_mc, this.wheel_1_mc, this.wheel_2_mc, this.jeep_body_mc, l);
    this.x = this.y = 0;
    this.sound_paused || (createjs.Sound.stop(), createjs.Sound.play('looop', {
      loop: - 1
    }));
    createjs.Ticker.removeEventListener('tick', p);
    createjs.Ticker.addEventListener('tick', p)
  };
  this.gamePause = function () {
    n.game_paused = !0;
    i.drive_mc.stop();
    createjs.Sound.stop()
  };
  this.gameUnPause = function () {
    n.game_paused = !1;
    n.sound_paused || n.game_paused || (createjs.Sound.stop(), createjs.Sound.play('looop', {
      loop: - 1
    }))
  };
  this.gameOver = function (t) {
    n.game_over = !0;
    i.drive_mc.stop();
    createjs.Sound.stop();
    EventProcess.gameOver(t)
  };
  this.gameComplete = function () {
    n.game_over = !0;
    i.drive_mc.stop();
    createjs.Sound.stop();
    EventProcess.gameComplete()
  };
  p = function () {
    var o,
    h,
    e,
    c;
    if (!n.game_over && !n.game_paused) for (n.linstenKeys(), n.p_system.timeStep(), n.wheel_1_mc.set(r.getInfor()), n.wheel_2_mc.set(u.getInfor()), t.rotation = - PiGeo.angle(n.wheel_1_mc.x, n.wheel_1_mc.y, n.wheel_2_mc.x, n.wheel_2_mc.y) + 90, t.y = f.curr.y, t.x = f.curr.x, o = n.localToGlobal(n.wheel_1_mc.x, n.wheel_1_mc.y), h = n.localToGlobal(n.wheel_2_mc.x, n.wheel_2_mc.y), o = t.globalToLocal(o.x, o.y), h = t.globalToLocal(h.x, h.y), a.x = o.x, a.y = o.y, v.x = h.x, v.y = h.y, a.rotation = - PiGeo.angle(o.x, o.y, b.x, b.y) + 90, v.rotation = - PiGeo.angle(h.x, h.y, w.x, w.y) + 90, n.moveCamera(), e = i.localToGlobal(i.headhit_mc.x, i.headhit_mc.y), e = n.globalToLocal(e.x, e.y), e = s.globalToLocal(e.x, e.y), s.hitTest(e.x, e.y) && n.gameOver(!0), d(t.x - n.wheel_1_mc.x, t.y - n.wheel_1_mc.y, n.wheel_2_mc.x - n.wheel_1_mc.x, n.wheel_2_mc.y - n.wheel_1_mc.y) && n.gameOver(!0), t.x >= y && n.gameComplete(), c = 0; c < n.medkits.length; c++) n.medkits[c].active && Math.abs(n.medkits[c].x - t.x) < 50 && (n.medkits[c].destroy(), EventProcess.energeIncrease())
  }
};
Level.prototype = new createjs.Container;
level_data = {
  level_1: {
    damping: 0.98,
    gravity: {
      x: 0,
      y: 0.55
    },
    kfr: 0.1,
    friction: 0.8,
    surface: [
      [{
        x: - 64.44639166820457,
        y: 275.34946958862287
      },
      {
        x: 500.71400978210386,
        y: 270.58554552056586
      }
      ],
      [
        {
          x: 101.36062538309216,
          y: 91.78110320429215
        },
        {
          x: 104.30442982469606,
          y: 272.3468989697405
        }
      ],
      [
        {
          x: 500.2649725512758,
          y: 272.68005312376164
        },
        {
          x: 621.550535754131,
          y: 264.31762120677723
        }
      ],
      [
        {
          x: 621.4696566274657,
          y: 264.6363143369378
        },
        {
          x: 742.738702648045,
          y: 273.2349529651521
        }
      ],
      [
        {
          x: 743.3589729139219,
          y: 273.843829866052
        },
        {
          x: 864.807665760281,
          y: 270.3609007954655
        }
      ],
      [
        {
          x: 865.2230327324252,
          y: 269.96071791639446
        },
        {
          x: 983.9303618172739,
          y: 259.95073182542427
        }
      ],
      [
        {
          x: 984.6591290975527,
          y: 259.48845750770766
        },
        {
          x: 1063.8195405556098,
          y: 259.1673146876155
        }
      ],
      [
        {
          x: 1064.3579078966043,
          y: 258.8152754722673
        },
        {
          x: 1119.5087974682729,
          y: 252.7429813548111
        }
      ],
      [
        {
          x: 1119.0367150642926,
          y: 253.2443595822062
        },
        {
          x: 1201.8234622320235,
          y: 209.9267569894243
        }
      ],
      [
        {
          x: 1201.7345162728386,
          y: 210.56111743302012
        },
        {
          x: 1279.4456504818118,
          y: 170.32806568504867
        }
      ],
      [
        {
          x: 1279.9830952986633,
          y: 170.0693825757479
        },
        {
          x: 1388.0506573391258,
          y: 148.76623352142298
        }
      ],
      [
        {
          x: 1383.5884236422114,
          y: 162.9139469157691
        },
        {
          x: 1417.7016654132672,
          y: 196.37255496914594
        }
      ],
      [
        {
          x: 1417.1609446547177,
          y: 196.47780998851772
        },
        {
          x: 1469.965673558441,
          y: 216.50172245347545
        }
      ],
      [
        {
          x: 1475.7931715570996,
          y: 236.3239205712112
        },
        {
          x: 1535.0808853914355,
          y: 255.49902855781437
        }
      ],
      [
        {
          x: 1599.4639065558515,
          y: 258.93909179331393
        },
        {
          x: 1622.6657216312492,
          y: 247.6242008434619
        }
      ],
      [
        {
          x: 1623.3835830853438,
          y: 248.18408687628704
        },
        {
          x: 1654.0285170670932,
          y: 221.23331469339365
        }
      ],
      [
        {
          x: 1655.2421092443774,
          y: 221.1784660900094
        },
        {
          x: 1678.065544357945,
          y: 197.03360248267535
        }
      ],
      [
        {
          x: 1678.1729450696166,
          y: 196.5429999925028
        },
        {
          x: 1733.0915423669162,
          y: 173.80731788492056
        }
      ],
      [
        {
          x: 1731.6613374845278,
          y: 173.61381726526866
        },
        {
          x: 1812.1346253354457,
          y: 159.72174976387333
        }
      ],
      [
        {
          x: 1814.3021323259015,
          y: 188.69635631613818
        },
        {
          x: 1941.8485712523727,
          y: 253.30800119673182
        }
      ],
      [
        {
          x: 1945.298674476698,
          y: 252.79686385240512
        },
        {
          x: 2025.1506599595803,
          y: 276.10012595112306
        }
      ],
      [
        {
          x: 2025.9942925638254,
          y: 276.59038795419184
        },
        {
          x: 2099.5516646265733,
          y: 254.7168482264181
        }
      ],
      [
        {
          x: 2099.789627910035,
          y: 253.41695287842032
        },
        {
          x: 2134.269012058843,
          y: 260.46255474901494
        }
      ],
      [
        {
          x: 2132.9692618912964,
          y: 260.7254942696481
        },
        {
          x: 2237.4293680690553,
          y: 329.3052667563757
        }
      ],
      [
        {
          x: 2238.3014081543174,
          y: 329.73633338631095
        },
        {
          x: 2338.5650802955915,
          y: 335.245557446654
        }
      ],
      [
        {
          x: 2339.6628764915977,
          y: 334.73904529181965
        },
        {
          x: 2450.484137594831,
          y: 308.86840986303554
        }
      ],
      [
        {
          x: 2450.1205581367217,
          y: 308.0392242645467
        },
        {
          x: 2584.124649367316,
          y: 272.5716009516935
        }
      ],
      [
        {
          x: 2583.432753268118,
          y: 273.11662309709305
        },
        {
          x: 2721.862624174653,
          y: 268.7112080428481
        }
      ],
      [
        {
          x: 2723.6431650033096,
          y: 269.95825510724325
        },
        {
          x: 2860.0613728141884,
          y: 246.3169079022328
        }
      ],
      [
        {
          x: 2861.5431650033097,
          y: 246.35825510724322
        },
        {
          x: 2997.9613728141885,
          y: 222.71690790223278
        }
      ],
      [
        {
          x: 2996.5477269671205,
          y: 223.38541431786206
        },
        {
          x: 3134.3043021264293,
          y: 210.02217304271636
        }
      ],
      [
        {
          x: 3136.778799660615,
          y: 210.8296553907383
        },
        {
          x: 3273.9545511113965,
          y: 228.30827272487915
        }
      ],
      [
        {
          x: 3273.8907854215277,
          y: 228.68662186036642
        },
        {
          x: 3597.611559670045,
          y: 251.09851031137345
        }
      ],
      [
        {
          x: 3599.307420127102,
          y: 252.33366609138312
        },
        {
          x: 3662.7653585036805,
          y: 246.97180652642436
        }
      ],
      [
        {
          x: 3661.9286950292208,
          y: 248.13934451210372
        },
        {
          x: 3745.806930388605,
          y: 271.3782725853975
        }
      ],
      [
        {
          x: 3746.118303538961,
          y: 272.2024880402468
        },
        {
          x: 3833.106647570338,
          y: 271.70320587671625
        }
      ],
      [
        {
          x: 3831.6975376892347,
          y: 270.9192667921025
        },
        {
          x: 3917.7040854732136,
          y: 258.3544003669402
        }
      ],
      [
        {
          x: 3918.3097344558114,
          y: 257.24030497147015
        },
        {
          x: 3964.2408511907593,
          y: 258.412767116098
        }
      ],
      [
        {
          x: 3963.9340008829404,
          y: 259.63629306306115
        },
        {
          x: 4007.9485477059907,
          y: 245.4338791498737
        }
      ],
      [
        {
          x: 4008.4727968799834,
          y: 243.96496253585252
        },
        {
          x: 4063.2312187470507,
          y: 258.2123733402164
        }
      ],
      [
        {
          x: 4062.8430487243963,
          y: 258.5934796316416
        },
        {
          x: 4097.814134204798,
          y: 240.90267079421284
        }
      ],
      [
        {
          x: 4138.47584237782,
          y: 252.5741692164881
        },
        {
          x: 4175.497893472597,
          y: 269.30630066277155
        }
      ],
      [
        {
          x: 4224.731232649988,
          y: 267.0491422303124
        },
        {
          x: 4351.351283501656,
          y: 246.2536171510838
        }
      ],
      [
        {
          x: 4355.435911749507,
          y: 245.58192468220074
        },
        {
          x: 4419.569522883132,
          y: 238.59011983931765
        }
      ],
      [
        {
          x: 4419.687548863869,
          y: 238.738454337041
        },
        {
          x: 4484.155260781952,
          y: 237.40569139975588
        }
      ],
      [
        {
          x: 4485.773081084291,
          y: 236.80783309875522
        },
        {
          x: 4543.182366488083,
          y: 207.54009195896117
        }
      ],
      [
        {
          x: 4543.422385125538,
          y: 206.23908885656488
        },
        {
          x: 4605.819692389889,
          y: 190.44556758490768
        }
      ],
      [
        {
          x: 4606.410927994956,
          y: 191.3986569062247
        },
        {
          x: 4740.010845002942,
          y: 178.7933947725283
        }
      ],
      [
        {
          x: 4740.092577095264,
          y: 178.74513044146772
        },
        {
          x: 4823.194939026828,
          y: 164.5564728095669
        }
      ],
      [
        {
          x: 4822.969896679729,
          y: 165.03067590140773
        },
        {
          x: 5041.57709480277,
          y: 86.74757792493926
        }
      ],
      [
        {
          x: 5042.187574587309,
          y: 86.22491851701335
        },
        {
          x: 5233.225560333206,
          y: 28.678273687355784
        }
      ],
      [
        {
          x: 5234.406858404266,
          y: 27.849842394578616
        },
        {
          x: 5377.486987653567,
          y: - 10.608932143923596
        }
      ],
      [
        {
          x: 5379.561954255938,
          y: - 11.363393607110766
        },
        {
          x: 5439.985601765205,
          y: - 16.701439192895975
        }
      ],
      [
        {
          x: 5438.731892798062,
          y: - 14.952253861007648
        },
        {
          x: 5734.883854248591,
          y: - 18.622859669910724
        }
      ],
      [
        {
          x: 5733.03287593589,
          y: - 19.037504854102565
        },
        {
          x: 5770.517917589838,
          y: - 173.90202031262106
        }
      ]
    ],
    circleSurface: [
      {
        x: 1387.8,
        y: 156.59999999999997,
        r: 17 / 2
      },
      {
        x: 1472.3,
        y: 226.90000000000003,
        r: 21 / 2
      },
      {
        x: 1529.4,
        y: 273.00000000000006,
        r: 8
      },
      {
        x: 1532.8,
        y: 262.3999999999999,
        r: 8
      },
      {
        x: 1537.9,
        y: 284.3,
        r: 8
      },
      {
        x: 1551.9,
        y: 286.8,
        r: 8
      },
      {
        x: 1565.9,
        y: 280.2,
        r: 8
      },
      {
        x: 1578.4,
        y: 280.2,
        r: 8
      },
      {
        x: 1591.9,
        y: 274.59999999999997,
        r: 8
      },
      {
        x: 1596.9,
        y: 266.09999999999997,
        r: 8
      },
      {
        x: 1812.8,
        y: 174.3,
        r: 15
      },
      {
        x: 2242.6,
        y: 324.8999999999999,
        r: 6
      },
      {
        x: 2339.1,
        y: 331.3,
        r: 5
      },
      {
        x: 2340.6,
        y: 324.3999999999999,
        r: 5
      },
      {
        x: 2519.5,
        y: 288.8,
        r: 6
      },
      {
        x: 3925.4,
        y: 276.7,
        r: 28
      },
      {
        x: 4114.6,
        y: 260.3999999999999,
        r: 25
      },
      {
        x: 4200.7,
        y: 272.3999999999999,
        r: 25
      },
      {
        x: 4274.6,
        y: 267.59999999999997,
        r: 25
      },
      {
        x: 4308.7,
        y: 267.3,
        r: 25
      }
    ],
    medkits: [
      {
        x: 1811.5,
        y: 128.9
      },
      {
        x: 2509.9,
        y: 238.7
      },
      {
        x: 4703.5,
        y: 151.8
      },
    ],
    star_mc_0: {
      x: 189,
      y: 200,
      visible: !1
    },
    star_mc: {
      x: 5610.9,
      y: - 65.7
    },
    under: {
      src: './images/under_1.jpg',
      position: {
        x: - 363,
        y: - 326.3
      }
    },
    over: {
      src: './images/over_1.png',
      position: {
        x: 840,
        y: - 545
      }
    },
    ground_mc: (new lib.level_1_ground).set({
      x: 254.1,
      y: 258.1
    }),
    wheel_1_position: {
       x: 173,
       y: 244
    },
    wheel_2_position: {
      x: 225,
      y: 244
    },
    start_x: 120,
    end_x: 5610
  },
  level_2: {
    damping: 0.98,
    gravity: {
      x: 0,
      y: 0.55
    },
    kfr: 0.1,
    friction: 0.8,
    surface: [
      [{
        x: 2478.2821429606593,
        y: - 452.94298408934975
      },
      {
        x: 2498.0882026059285,
        y: - 455.87174731318305
      }
      ],
      [
        {
          x: 2466.299440732147,
          y: - 446.10499475037267
        },
        {
          x: 2478.439594454306,
          y: - 452.58730565747055
        }
      ],
      [
        {
          x: 4815.28715811667,
          y: - 42.79985703371387
        },
        {
          x: 4862.01839945594,
          y: - 62.19653142035486
        }
      ],
      [
        {
          x: 4767.219467943051,
          y: - 34.780920924618904
        },
        {
          x: 4817.260099826923,
          y: - 42.49447504247693
        }
      ],
      [
        {
          x: 4867.55329333113,
          y: - 65.54337910610678
        },
        {
          x: 5065.004443586306,
          y: - 144.07957143271142
        }
      ],
      [
        {
          x: 4673.347229968828,
          y: - 35.35141628435689
        },
        {
          x: 4766.370596606377,
          y: - 35.97842822761612
        }
      ],
      [
        {
          x: 4560.812498716774,
          y: - 36.66538619261229
        },
        {
          x: 4673.108306082635,
          y: - 34.9055670133441
        }
      ],
      [
        {
          x: 4477.397600762069,
          y: - 60.70639530901767
        },
        {
          x: 4560.901660399766,
          y: - 36.936353002603454
        }
      ],
      [
        {
          x: 4236.817007928764,
          y: - 211.0578739517289
        },
        {
          x: 4471.669676549218,
          y: - 60.62292108725126
        }
      ],
      [
        {
          x: 3997.2828079428964,
          y: - 391.82452627904706
        },
        {
          x: 4236.88380747524,
          y: - 212.7922841414049
        }
      ],
      [
        {
          x: 3847.9041236366647,
          y: - 478.301770061657
        },
        {
          x: 3999.8079779326827,
          y: - 391.94597569987013
        }
      ],
      [
        {
          x: 3698.122100199608,
          y: - 551.6040882557947
        },
        {
          x: 3848.1062923125987,
          y: - 478.0786756880081
        }
      ],
      [
        {
          x: 3617.4653405641607,
          y: - 578.3081414213674
        },
        {
          x: 3694.750993970153,
          y: - 555.2771409554132
        }
      ],
      [
        {
          x: 3596.244948079311,
          y: - 595.1735168731044
        },
        {
          x: 3618.9074083259784,
          y: - 578.3986369374329
        }
      ],
      [
        {
          x: 3566.4176636166035,
          y: - 621.7161837403627
        },
        {
          x: 3596.5062113595236,
          y: - 595.4635284241708
        }
      ],
      [
        {
          x: 3520.335187741386,
          y: - 637.2357001150491
        },
        {
          x: 3566.055499388562,
          y: - 620.6830550240448
        }
      ],
      [
        {
          x: 3482.358709824765,
          y: - 658.9192831337987
        },
        {
          x: 3520.981164753939,
          y: - 636.8095167569581
        }
      ],
      [
        {
          x: 3451.419902435751,
          y: - 660.5468296688745
        },
        {
          x: 3481.0978106461416,
          y: - 659.1256300640144
        }
      ],
      [
        {
          x: 3388.094043108379,
          y: - 670.977555705278
        },
        {
          x: 3450.198426713722,
          y: - 660.5861886018375
        }
      ],
      [
        {
          x: 3335.7615081040612,
          y: - 661.3626358034487
        },
        {
          x: 3386.06409157873,
          y: - 671.3582499455167
        }
      ],
      [
        {
          x: 3243.4392407671025,
          y: - 657.8727283971979
        },
        {
          x: 3334.4545241487335,
          y: - 660.4630313978993
        }
      ],
      [
        {
          x: 3186.5041549071584,
          y: - 636.6472916165123
        },
        {
          x: 3244.400611149095,
          y: - 657.637735055107
        }
      ],
      [
        {
          x: 3114.1168782184354,
          y: - 615.2664121605598
        },
        {
          x: 3186.492914815862,
          y: - 636.4587000689644
        }
      ],
      [
        {
          x: 3029.565629240445,
          y: - 584.4700355219376
        },
        {
          x: 3113.257808206233,
          y: - 614.6760858847219
        }
      ],
      [
        {
          x: 2980.0032799929195,
          y: - 568.0655810068873
        },
        {
          x: 3030.921777126473,
          y: - 584.8421823083399
        }
      ],
      [
        {
          x: 2928.2640412687733,
          y: - 547.5287685840436
        },
        {
          x: 2979.659929671293,
          y: - 567.9701636074141
        }
      ],
      [
        {
          x: 2880.608195066608,
          y: - 543.1031275492022
        },
        {
          x: 2927.745572313946,
          y: - 548.2377806906952
        }
      ],
      [
        {
          x: 2851.337572440815,
          y: - 526.5347060563909
        },
        {
          x: 2880.774763341022,
          y: - 542.6482438781035
        }
      ],
      [
        {
          x: 2818.783649116168,
          y: - 516.6186979866635
        },
        {
          x: 2851.311882705783,
          y: - 525.9470103752183
        }
      ],
      [
        {
          x: 2770.5804645832354,
          y: - 504.47362805769865
        },
        {
          x: 2817.939486860464,
          y: - 515.9084168252676
        }
      ],
      [
        {
          x: 2732.727281343055,
          y: - 497.93605407697163
        },
        {
          x: 2770.968476930665,
          y: - 505.08530399306255
        }
      ],
      [
        {
          x: 2694.616273712612,
          y: - 492.23738302689526
        },
        {
          x: 2733.0770877025698,
          y: - 497.8895917010184
        }
      ],
      [
        {
          x: 2652.6679805805875,
          y: - 489.3932598719793
        },
        {
          x: 2694.3138589648806,
          y: - 491.62744941799957
        }
      ],
      [
        {
          x: 2608.2398680999545,
          y: - 480.30219241035945
        },
        {
          x: 2651.742752136677,
          y: - 489.21214867177554
        }
      ],
      [
        {
          x: 2531.8634046174802,
          y: - 447.83156692114244
        },
        {
          x: 2607.329557664344,
          y: - 478.68870565263103
        }
      ],
      [
        {
          x: 2499.056789644532,
          y: - 455.7419083031947
        },
        {
          x: 2532.5807473354776,
          y: - 448.65118121587943
        }
      ],
      [
        {
          x: 2453.6987915025647,
          y: - 432.7782275927052
        },
        {
          x: 2466.2482573365924,
          y: - 446.0522143941338
        }
      ],
      [
        {
          x: 2429.492171747159,
          y: - 399.8925211146169
        },
        {
          x: 2453.6439927834217,
          y: - 432.53592647656865
        }
      ],
      [
        {
          x: 2407.077316898135,
          y: - 384.81453012968944
        },
        {
          x: 2429.997988805712,
          y: - 399.4416409591646
        }
      ],
      [
        {
          x: 2367.8447984760132,
          y: - 383.964121653446
        },
        {
          x: 2406.3061283767847,
          y: - 384.6326627163674
        }
      ],
      [
        {
          x: 2329.7287789842135,
          y: - 380.4209623257144
        },
        {
          x: 2368.070157572416,
          y: - 383.78093732902886
        }
      ],
      [
        {
          x: 2284.739800043087,
          y: - 356.04859888462505
        },
        {
          x: 2329.8685716829705,
          y: - 379.29517517036237
        }
      ],
      [
        {
          x: 2247.1219374632988,
          y: - 321.2541738470104
        },
        {
          x: 2284.347142734461,
          y: - 355.79927202014915
        }
      ],
      [
        {
          x: 2215.0467599971116,
          y: - 301.5395249414049
        },
        {
          x: 2247.464373656912,
          y: - 320.97641724286234
        }
      ],
      [
        {
          x: 2156.726482663457,
          y: - 269.6240177288127
        },
        {
          x: 2215.175131142282,
          y: - 300.2388876576925
        }
      ],
      [
        {
          x: 2115.3626313165346,
          y: - 254.0662234911266
        },
        {
          x: 2156.82432274694,
          y: - 270.15970988495485
        }
      ],
      [
        {
          x: 2080.379532613202,
          y: - 223.5171473283128
        },
        {
          x: 2114.6587227605205,
          y: - 253.17759354895017
        }
      ],
      [
        {
          x: 2037.6522603508668,
          y: - 207.04156333546447
        },
        {
          x: 2079.9901982110487,
          y: - 223.3735955017664
        }
      ],
      [
        {
          x: 1965.5742068114707,
          y: - 209.6374774177195
        },
        {
          x: 2037.3363607235317,
          y: - 207.00776255036166
        }
      ],
      [
        {
          x: 1928.8040628345145,
          y: - 202.9013813623426
        },
        {
          x: 1966.306557328948,
          y: - 210.09506835712153
        }
      ],
      [
        {
          x: 1886.702904101581,
          y: - 190.6662067081541
        },
        {
          x: 1929.243665627533,
          y: - 202.19364347820505
        }
      ],
      [
        {
          x: 1838.553501345519,
          y: - 182.10144219657317
        },
        {
          x: 1886.3346608346542,
          y: - 190.56420261562099
        }
      ],
      [
        {
          x: 1790.38306174768,
          y: - 186.80555381179622
        },
        {
          x: 1838.6872236286958,
          y: - 181.70306201277938
        }
      ],
      [
        {
          x: 1742.353658520822,
          y: - 216.34973058522826
        },
        {
          x: 1790.7404605010934,
          y: - 186.70668564114885
        }
      ],
      [
        {
          x: 1692.2439523187875,
          y: - 234.37319225363785
        },
        {
          x: 1742.0463360582207,
          y: - 214.78105118192607
        }
      ],
      [
        {
          x: 1682.4058498142888,
          y: - 235.50189315559342
        },
        {
          x: 1692.6565441062664,
          y: - 234.20100657778355
        }
      ],
      [
        {
          x: 1662.486178845404,
          y: - 229.6987118322323
        },
        {
          x: 1682.6835665791666,
          y: - 235.1370943748501
        }
      ],
      [
        {
          x: 1642.168732009997,
          y: - 226.43585191336027
        },
        {
          x: 1662.5254524881898,
          y: - 229.59989850643382
        }
      ],
      [
        {
          x: 1612.019858417809,
          y: - 216.28087024333163
        },
        {
          x: 1642.2314796372016,
          y: - 226.34895827708476
        }
      ],
      [
        {
          x: 1587.5614299357158,
          y: - 213.33683906880228
        },
        {
          x: 1611.8887564832494,
          y: - 216.1643544765451
        }
      ],
      [
        {
          x: 1554.9683505162945,
          y: - 198.0843662932583
        },
        {
          x: 1587.3776111339137,
          y: - 212.68091342963666
        }
      ],
      [
        {
          x: 1513.1841803324146,
          y: - 192.96647769518117
        },
        {
          x: 1555.4707311891768,
          y: - 197.969654720492
        }
      ],
      [
        {
          x: 1482.8179335423017,
          y: - 190.7807268295465
        },
        {
          x: 1513.7152497471156,
          y: - 192.73529241604754
        }
      ],
      [
        {
          x: 1452.0621130871764,
          y: - 186.47262916572734
        },
        {
          x: 1482.7942872144047,
          y: - 190.4672416889754
        }
      ],
      [
        {
          x: 1432.438670354096,
          y: - 182.83821567589203
        },
        {
          x: 1452.1412232618825,
          y: - 186.68709048513443
        }
      ],
      [
        {
          x: 1397.8892476451515,
          y: - 172.9392009950927
        },
        {
          x: 1432.263774334788,
          y: - 182.69264672220714
        }
      ],
      [
        {
          x: 1378.1337588216782,
          y: - 172.5595716939789
        },
        {
          x: 1398.0226604914328,
          y: - 173.2902851019601
        }
      ],
      [
        {
          x: 1366.0433080503892,
          y: - 166.63977541926653
        },
        {
          x: 1378.0318042193285,
          y: - 172.5893355546458
        }
      ],
      [
        {
          x: 1326.2201025361937,
          y: - 162.73669951541706
        },
        {
          x: 1365.5592750388207,
          y: - 165.84199947742928
        }
      ],
      [
        {
          x: 1297.4190907521672,
          y: - 155.0417406546564
        },
        {
          x: 1326.5193289349065,
          y: - 162.82226648722894
        }
      ],
      [
        {
          x: 1276.081808188581,
          y: - 140.0920705844386
        },
        {
          x: 1296.9850560843668,
          y: - 154.66387456967908
        }
      ],
      [
        {
          x: 1261.7406584887121,
          y: - 137.8444961146588
        },
        {
          x: 1276.322587606656,
          y: - 140.1175873341738
        }
      ],
      [
        {
          x: 1250.8434867246667,
          y: - 125.03968555546679
        },
        {
          x: 1261.8659744916133,
          y: - 137.46467007675216
        }
      ],
      [
        {
          x: 1223.5307841710164,
          y: - 104.84791245354641
        },
        {
          x: 1250.9685743183709,
          y: - 124.85068108437821
        }
      ],
      [
        {
          x: 1189.388555788302,
          y: - 82.8718051746896
        },
        {
          x: 1223.5578402913848,
          y: - 104.64831981759447
        }
      ],
      [
        {
          x: 1171.58718783629,
          y: - 76.30380635066835
        },
        {
          x: 1189.5708061080384,
          y: - 83.33002054443281
        }
      ],
      [
        {
          x: 1151.5419231067174,
          y: - 64.21468024972076
        },
        {
          x: 1171.7541167849272,
          y: - 76.05030785864363
        }
      ],
      [
        {
          x: 1128.9873800236094,
          y: - 46.25413419047012
        },
        {
          x: 1151.384720415396,
          y: - 64.0477688857282
        }
      ],
      [
        {
          x: 1109.6590400667028,
          y: - 41.4978792534046
        },
        {
          x: 1129.1896262396294,
          y: - 46.144876728745245
        }
      ],
      [
        {
          x: 1080.7383184366406,
          y: - 31.475093211262518
        },
        {
          x: 1109.0771989971608,
          y: - 41.41762305756719
        }
      ],
      [
        {
          x: 1060.8811650497323,
          y: - 22.754246309278617
        },
        {
          x: 1080.8980133546818,
          y: - 31.545079265954833
        }
      ],
      [
        {
          x: 1043.5308521220206,
          y: - 9.88197960976155
        },
        {
          x: 1061.1762804754057,
          y: - 22.81965638404069
        }
      ],
      [
        {
          x: 1023.9860315695958,
          y: - 0.6497258658390025
        },
        {
          x: 1043.872361919157,
          y: - 9.856314146811409
        }
      ],
      [
        {
          x: 1002.7441177580562,
          y: 10.120332185455506
        },
        {
          x: 1024.5787045807608,
          y: - 0.8002095172478363
        }
      ],
      [
        {
          x: 954.1844152222776,
          y: 15.43699131589653
        },
        {
          x: 1002.3030425807523,
          y: 10.252781545638443
        }
      ],
      [
        {
          x: 896.4105095272394,
          y: 29.58915127502367
        },
        {
          x: 954.5838787028705,
          y: 15.33891389309299
        }
      ],
      [
        {
          x: 825.9853279873786,
          y: 33.96196759968586
        },
        {
          x: 896.2801495049795,
          y: 29.60498047524935
        }
      ],
      [
        {
          x: 799.4663860611033,
          y: 37.95590889319426
        },
        {
          x: 826.6137683312367,
          y: 33.73015148412746
        }
      ],
      [
        {
          x: 761.99691776082,
          y: 36.28557412318686
        },
        {
          x: 799.500132843572,
          y: 38.579605033603116
        }
      ],
      [
        {
          x: 724.589645775926,
          y: 33.074867492513846
        },
        {
          x: 761.9853243011856,
          y: 36.380205584134124
        }
      ],
      [
        {
          x: 687.6265144501243,
          y: 38.98821850900036
        },
        {
          x: 724.7321432209817,
          y: 33.041110561480934
        }
      ],
      [
        {
          x: 320.4467812727515,
          y: 125.17628975141291
        },
        {
          x: 350.1923426430509,
          y: 130.47576555244754
        }
      ],
      [
        {
          x: 249.6302339833936,
          y: 119.10135899516416
        },
        {
          x: 318.3391812295394,
          y: 124.45813716178196
        }
      ],
      [
        {
          x: 148.42117379461436,
          y: 113.62713365545521
        },
        {
          x: 250.81352549519684,
          y: 118.78803214546902
        }
      ],
      [
        {
          x: 571.343368730367,
          y: 64.80815230235478
        },
        {
          x: 598.9070217791084,
          y: 47.516719521679576
        }
      ],
      [
        {
          x: 498.06540192537244,
          y: 100.9840860027466
        },
        {
          x: 531.5601047763936,
          y: 74.147503937927
        }
      ],
      [
        {
          x: 6154.003032082108,
          y: - 117.77699751852016
        },
        {
          x: 6296.073073433823,
          y: - 115.509405994029
        }
      ],
      [
        {
          x: 6015.555592590033,
          y: - 124.54213647005179
        },
        {
          x: 6154.530404030595,
          y: - 118.43858446647587
        }
      ],
      [
        {
          x: 5797.637060795183,
          y: - 115.85447395875129
        },
        {
          x: 5853.876919844165,
          y: - 124.15390208065521
        }
      ],
      [
        {
          x: 5758.798593211367,
          y: - 100.05392888200087
        },
        {
          x: 5797.7024562492925,
          y: - 116.646687233954
        }
      ],
      [
        {
          x: 5703.3392595506775,
          y: - 98.15506079388794
        },
        {
          x: 5759.445695345352,
          y: - 100.3471357055043
        }
      ],
      [
        {
          x: 5669.744406553028,
          y: - 77.63510502145495
        },
        {
          x: 5703.458695697874,
          y: - 97.90759091879241
        }
      ],
      [
        {
          x: 5625.272255050686,
          y: - 64.74748285283998
        },
        {
          x: 5670.218718942986,
          y: - 77.08489399043879
        }
      ],
      [
        {
          x: 598.9796775616148,
          y: 48.23458698786145
        },
        {
          x: 687.4678129738152,
          y: 39.008819050628595
        }
      ],
      [
        {
          x: 532.599428654175,
          y: 73.36608969867109
        },
        {
          x: 571.3475014781325,
          y: 65.25742615716888
        }
      ],
      [
        {
          x: 453.99052500360835,
          y: 121.40420809003005
        },
        {
          x: 497.4592338824225,
          y: 102.46195391031566
        }
      ],
      [
        {
          x: 5855.960075686084,
          y: - 123.85640630581537
        },
        {
          x: 6015.139059780942,
          y: - 125.49018674665271
        }
      ],
      [
        {
          x: 5530.927655166755,
          y: - 70.35154578726495
        },
        {
          x: 5624.985593350527,
          y: - 64.30124904927085
        }
      ],
      [
        {
          x: 5497.900336290045,
          y: - 59.298474805486066
        },
        {
          x: 5529.855406302456,
          y: - 68.90777386951183
        }
      ],
      [
        {
          x: 350.97818330217524,
          y: 131.38510542626935
        },
        {
          x: 453.91194549471214,
          y: 120.2284931765648
        }
      ],
      [
        {
          x: - 210.8154620155094,
          y: 109.97176561109657
        },
        {
          x: 147.27608470300925,
          y: 114.44099582881555
        }
      ],
      [
        {
          x: - 47.43937461690786,
          y: - 72.11889679570783
        },
        {
          x: - 44.495570175304,
          y: 108.44689896974049
        }
      ]
    ],
    circleSurface: [
      {
        x: 5389.5,
        y: 70.1,
        r: 25
      },
      {
        x: 5391.3,
        y: 103.3,
        r: 25
      },
      {
        x: 5389.5,
        y: 35.7,
        r: 25
      },
      {
        x: 5389.5,
        y: 8.1,
        r: 25
      },
      {
        x: 5389.5,
        y: - 27.1,
        r: 25
      },
      {
        x: 5421.1,
        y: - 51.9,
        r: 25
      },
      {
        x: 5493.7,
        y: - 35,
        r: 25
      },
      {
        x: 5471.1,
        y: - 34.4,
        r: 25
      },
      {
        x: 5455.2,
        y: - 38.1,
        r: 25
      },
      {
        x: 5439.5,
        y: - 46.7,
        r: 25
      },
      {
        x: 5405.2,
        y: - 62.9,
        r: 25
      },
      {
        x: 5389.5,
        y: - 68.9,
        r: 25
      },
      {
        x: 5064.1,
        y: 46.1,
        r: 25
      },
      {
        x: 5065.4,
        y: 1.2,
        r: 25
      },
      {
        x: 5064.1,
        y: - 38.1,
        r: 25
      },
      {
        x: 5065.4,
        y: - 81.2,
        r: 25
      },
      {
        x: 5068.5,
        y: - 118.9,
        r: 25
      }
    ],
    medkits: [
      {
        x: 2525.7,
        y: - 492.1
      },
      {
        x: 3333,
        y: - 734.2
      },
      {
        x: 4303.5,
        y: - 283.2
      },
    ],
    star_mc_0: {
      x: 122,
      y: 46,
      visible: !0
    },
    star_mc: {
      x: 5966.8,
      y: - 162.3
    },
    under: {
      src: './images/under_2.jpg',
      position: {
        x: - 234.8 - 250,
        y: - 882.8 - 200
      }
    },
    over: {
      src: './images/over_2.png',
      position: {
        x: 162,
        y: - 465
      }
    },
    ground_mc: (new lib.level_2_ground).set({
      x: - 46.7,
      y: 200.2
    }),
    wheel_1_position: {
       x: 96,
      y: 96
    },
    wheel_2_position: {
      x: 148,
      y: 96
    },
    start_x: - 44,
    end_x: 5966.8
  },
  level_3: {
    damping: 0.98,
    gravity: {
      x: 0,
      y: 0.55
    },
    kfr: 0.1,
    friction: 0.8,
    surface: [
      [{
        x: 3731.8776767398854,
        y: 248.40795554048498
      },
      {
        x: 3941.2237638934103,
        y: 233.08928400837496
      }
      ],
      [
        {
          x: 3626.912516634492,
          y: 258.4610838778007
        },
        {
          x: 3731.5637138159495,
          y: 249.63474865372865
        }
      ],
      [
        {
          x: 5618.944136146141,
          y: - 369.6235603594845
        },
        {
          x: 5660.945450570337,
          y: - 364.09852835596814
        }
      ],
      [
        {
          x: 5541.8177091985335,
          y: - 376.08449117600196
        },
        {
          x: 5618.400749394816,
          y: - 370.0539240969718
        }
      ],
      [
        {
          x: 5382.613481837591,
          y: - 425.0963115142785
        },
        {
          x: 5504.469682157546,
          y: - 388.2928657981092
        }
      ],
      [
        {
          x: 5326.009159937359,
          y: - 432.1803638429297
        },
        {
          x: 5383.464679692706,
          y: - 424.7700203527226
        }
      ],
      [
        {
          x: 5268.714214818152,
          y: - 423.15817871999394
        },
        {
          x: 5326.089982406408,
          y: - 431.68727167636183
        }
      ],
      [
        {
          x: 5183.083610663433,
          y: - 384.33130322298655
        },
        {
          x: 5268.468299981217,
          y: - 423.32526942425386
        }
      ],
      [
        {
          x: 4903.285878679837,
          y: - 230.11969804564916
        },
        {
          x: 5026.307182556907,
          y: - 298.4366709322293
        }
      ],
      [
        {
          x: 4784.751223407303,
          y: - 156.48559549187507
        },
        {
          x: 4904.675493758404,
          y: - 230.10365966607156
        }
      ],
      [
        {
          x: 4209.437411497731,
          y: 177.7056474882354
        },
        {
          x: 4326.345985541673,
          y: 139.23631262250154
        }
      ],
      [
        {
          x: 4141.392049242081,
          y: 211.45358894385546
        },
        {
          x: 4208.064702947118,
          y: 177.49729879124635
        }
      ],
      [
        {
          x: 3205.510176922177,
          y: 258.12331502392163
        },
        {
          x: 3409.9777857308263,
          y: 262.0551315345344
        }
      ],
      [
        {
          x: 2195.497884026678,
          y: - 416.00684768002054
        },
        {
          x: 2311.733042267423,
          y: - 433.3760856814127
        }
      ],
      [
        {
          x: 2112.4602569408353,
          y: - 381.5132208074059
        },
        {
          x: 2196.023806226081,
          y: - 415.795633803756
        }
      ],
      [
        {
          x: 1838.3342750406844,
          y: - 223.2099515110971
        },
        {
          x: 1924.5838293640418,
          y: - 257.2838288370227
        }
      ],
      [
        {
          x: 1550.9463960518292,
          y: - 164.39286611239905
        },
        {
          x: 1673.9505272252175,
          y: - 185.31919293484708
        }
      ],
      [
        {
          x: 1119.1392142091509,
          y: - 4.1041817413324
        },
        {
          x: 1229.4866750536698,
          y: - 62.59011343577782
        }
      ],
      [
        {
          x: 979.2564309149835,
          y: 65.52481551992457
        },
        {
          x: 1119.2069463359437,
          y: - 5.245480207927201
        }
      ],
      [
        {
          x: 3941.409350925075,
          y: 231.68965249600083
        },
        {
          x: 4141.186101961906,
          y: 211.36978551395407
        }
      ],
      [
        {
          x: 2441.0553421572336,
          y: - 43.37942531159021
        },
        {
          x: 3008.137764353208,
          y: 210.45267709735808
        }
      ],
      [
        {
          x: 1925.1761646831626,
          y: - 257.54685879742766
        },
        {
          x: 2034.2739995994457,
          y: - 329.54422826034227
        }
      ],
      [
        {
          x: 5860.160356649905,
          y: - 350.07798350891915
        },
        {
          x: 6077.359843476777,
          y: - 349.6393365625656
        }
      ],
      [
        {
          x: 5661.6611885927705,
          y: - 362.98230939476
        },
        {
          x: 5861.002179848291,
          y: - 351.18045508001575
        }
      ],
      [
        {
          x: 5507.090573906025,
          y: - 389.3507245379294
        },
        {
          x: 5541.985660938517,
          y: - 376.1329616033462
        }
      ],
      [
        {
          x: 5024.988595925435,
          y: - 299.4372589305914
        },
        {
          x: 5181.934352240481,
          y: - 383.0880943818788
        }
      ],
      [
        {
          x: 4675.763402084657,
          y: - 65.29722935912534
        },
        {
          x: 4784.650560253531,
          y: - 154.54947766641794
        }
      ],
      [
        {
          x: 4552.260948219093,
          y: 20.636921160439783
        },
        {
          x: 4674.375691350731,
          y: - 61.92358110846635
        }
      ],
      [
        {
          x: 4334.538343249003,
          y: 140.5756917673096
        },
        {
          x: 4549.194664019893,
          y: 22.22354716018819
        }
      ],
      [
        {
          x: 3410.949589406924,
          y: 262.24185803935364
        },
        {
          x: 3626.0939673669864,
          y: 259.5294623864503
        }
      ],
      [
        {
          x: 3007.565706307515,
          y: 211.9848800426094
        },
        {
          x: 3207.184081772312,
          y: 256.9353867449298
        }
      ],
      [
        {
          x: 2037.339102924302,
          y: - 332.58962757832904
        },
        {
          x: 2113.0688350876276,
          y: - 381.94930171087327
        }
      ],
      [
        {
          x: 1672.5639329579756,
          y: - 183.6159894035919
        },
        {
          x: 1836.458817254412,
          y: - 222.77945594394942
        }
      ],
      [
        {
          x: 1230.3070207199587,
          y: - 64.39234056454463
        },
        {
          x: 1361.94218421391,
          y: - 120.81051278698308
        }
      ],
      [
        {
          x: 836.5150543649494,
          y: 126.41953458366177
        },
        {
          x: 979.58490109368,
          y: 64.46396509215015
        }
      ],
      [
        {
          x: 539.3350447647082,
          y: 183.60574044682056
        },
        {
          x: 838.3043452950714,
          y: 124.07573337991883
        }
      ],
      [
        {
          x: 89.14365203373755,
          y: 170.48700367628092
        },
        {
          x: 541.8680489990011,
          y: 184.86287834318276
        }
      ],
      [
        {
          x: 170.96062538309212,
          y: - 12.21889679570782
        },
        {
          x: 173.90442982469597,
          y: 168.3468989697405
        }
      ]
    ],
    circleSurface: [
      {
        x: 4378.7,
        y: 158.4,
        r: 41.575
      },
      {
        x: 4353.9,
        y: 170.6,
        r: 41.575
      },
      {
        x: 4226.1,
        y: 211.2,
        r: 41.575
      },
      {
        x: 2440.3,
        y: - 65.5,
        r: 32.550000000000004
      },
      {
        x: 4296.5,
        y: - 375.8,
        r: 32.550000000000004
      },
      {
        x: 3825.3,
        y: - 369,
        r: 32.550000000000004
      },
      {
        x: 3644.1,
        y: - 279.3,
        r: 26.924999999999997
      },
      {
        x: 3830.2,
        y: - 369.9,
        r: 26.924999999999997
      },
      {
        x: 3533.1,
        y: - 171.9,
        r: 26.875
      },
      {
        x: 3340.6,
        y: - 104.6,
        r: 26.875
      },
      {
        x: 3485.9,
        y: - 133.9,
        r: 26.875
      },
      {
        x: 3509.9,
        y: - 152.8,
        r: 26.875
      },
      {
        x: 3424,
        y: - 110.7,
        r: 26.875
      },
      {
        x: 3232.4,
        y: - 110.6,
        r: 26.875
      },
      {
        x: 3278.2,
        y: - 112.3,
        r: 26.875
      },
      {
        x: 3456.5,
        y: - 118.3,
        r: 26.875
      },
      {
        x: 3159.4,
        y: - 111.8,
        r: 20.549999999999997
      },
      {
        x: 3199.4,
        y: - 114.9,
        r: 20.549999999999997
      },
      {
        x: 3333.4,
        y: - 103.9,
        r: 26.875
      },
      {
        x: 4617.6,
        y: - 322.3,
        r: 22.375
      },
      {
        x: 4551,
        y: - 337.7,
        r: 32.324999999999996
      },
      {
        x: 4078.5,
        y: - 219.9,
        r: 41.525
      },
      {
        x: 3842.3,
        y: - 372.2,
        r: 26.924999999999997
      },
      {
        x: 3788.1,
        y: - 340.9,
        r: 26.924999999999997
      },
      {
        x: 3766.3,
        y: - 328.3,
        r: 26.924999999999997
      },
      {
        x: 3034.8,
        y: - 232.9,
        r: 20.125
      },
      {
        x: 2987.4,
        y: - 204.5,
        r: 20.125
      },
      {
        x: 3013.6,
        y: - 216.2,
        r: 29.4
      },
      {
        x: 2345.3,
        y: - 394.4,
        r: 45.95
      },
      {
        x: 1844.1,
        y: - 186.6,
        r: 41.925000000000004
      },
      {
        x: 1546.1,
        y: - 125.5,
        r: 41.925000000000004
      },
      {
        x: 1474,
        y: - 124.3,
        r: 30.2
      },
      {
        x: 1512.9,
        y: - 90.5,
        r: 70.325
      },
      {
        x: 784.5,
        y: 134.6,
        r: 29.5
      },
      {
        x: 801.6,
        y: 144,
        r: 29.5
      },
      {
        x: 626.3,
        y: 161.8,
        r: 21.224999999999998
      },
      {
        x: 650.1,
        y: 170.2,
        r: 23.575
      },
      {
        x: 1448.2,
        y: - 119.9,
        r: 30.2
      },
      {
        x: 1417.8,
        y: - 104.3,
        r: 41.625
      },
      {
        x: 1379.4,
        y: - 99,
        r: 32.675
      },
      {
        x: 2439.6,
        y: - 48.2,
        r: 45.95
      },
      {
        x: 2483.6,
        y: 2.5,
        r: 45.95
      },
      {
        x: 4019.4,
        y: - 203.7,
        r: 41.525
      },
      {
        x: 4044.9,
        y: - 210.8,
        r: 41.525
      },
      {
        x: 4127.1,
        y: - 246.8,
        r: 54.37499999999999
      },
      {
        x: 3973,
        y: - 187.5,
        r: 41.525
      },
      {
        x: 4162.4,
        y: - 277.1,
        r: 41.575
      },
      {
        x: 4182.9,
        y: - 292,
        r: 41.575
      },
      {
        x: 4218.3,
        y: - 317.2,
        r: 41.575
      },
      {
        x: 4245.5,
        y: - 337.7,
        r: 41.575
      },
      {
        x: 4261.5,
        y: - 351.4,
        r: 41.575
      },
      {
        x: 4529.8,
        y: - 339.8,
        r: 32.324999999999996
      },
      {
        x: 4504.8,
        y: - 333.4,
        r: 41.575
      },
      {
        x: 4492.1,
        y: - 343,
        r: 41.575
      },
      {
        x: 4483.5,
        y: - 347.8,
        r: 41.575
      },
      {
        x: 4453,
        y: - 371,
        r: 41.575
      },
      {
        x: 3217.6,
        y: - 113.8,
        r: 22.275
      },
      {
        x: 3246.5,
        y: - 106.8,
        r: 32.05
      },
      {
        x: 3267.2,
        y: - 110.8,
        r: 26.875
      },
      {
        x: 3356.8,
        y: - 102.6,
        r: 26.875
      },
      {
        x: 3184.7,
        y: - 116.3,
        r: 20.549999999999997
      },
      {
        x: 3311.4,
        y: - 113.3,
        r: 33.2
      },
      {
        x: 3383.8,
        y: - 103.7,
        r: 26.875
      },
      {
        x: 3439.3,
        y: - 114.8,
        r: 26.875
      },
      {
        x: 3471.2,
        y: - 130,
        r: 23.575
      },
      {
        x: 3413.5,
        y: - 106,
        r: 26.924999999999997
      },
      {
        x: 3499.4,
        y: - 144.4,
        r: 26.924999999999997
      },
      {
        x: 3519.9,
        y: - 164.2,
        r: 24.85
      },
      {
        x: 3539.2,
        y: - 178.4,
        r: 26.924999999999997
      },
      {
        x: 3553,
        y: - 194.5,
        r: 26.924999999999997
      },
      {
        x: 3570.9,
        y: - 212,
        r: 26.924999999999997
      },
      {
        x: 3582.4,
        y: - 224.4,
        r: 26.924999999999997
      },
      {
        x: 3590,
        y: - 237.4,
        r: 24.875
      },
      {
        x: 3605.7,
        y: - 248.9,
        r: 26.924999999999997
      },
      {
        x: 3615.6,
        y: - 258.8,
        r: 26.924999999999997
      },
      {
        x: 3628,
        y: - 268.5,
        r: 26.924999999999997
      },
      {
        x: 3663.7,
        y: - 283.3,
        r: 31.125000000000004
      },
      {
        x: 3682.4,
        y: - 299.1,
        r: 24.875
      },
      {
        x: 3702.4,
        y: - 306,
        r: 26.924999999999997
      },
      {
        x: 3724.2,
        y: - 314.3,
        r: 26.924999999999997
      },
      {
        x: 3743.1,
        y: - 322.4,
        r: 24.875
      },
      {
        x: 2603.5,
        y: - 254,
        r: 30.7
      },
      {
        x: 2523.1,
        y: - 258.5,
        r: 25.974999999999998
      },
      {
        x: 2568.6,
        y: - 258.8,
        r: 25.924999999999997
      },
      {
        x: 2554.3,
        y: - 255,
        r: 30.7
      },
      {
        x: 2638.7,
        y: - 244.6,
        r: 30.7
      },
      {
        x: 2683.1,
        y: - 227.9,
        r: 30.7
      },
      {
        x: 2861,
        y: - 174.9,
        r: 45.225
      },
      {
        x: 2664.9,
        y: - 232.4,
        r: 30.7
      },
      {
        x: 2715.2,
        y: - 214.8,
        r: 33.25
      },
      {
        x: 2742.1,
        y: - 208,
        r: 30.7
      },
      {
        x: 2766.7,
        y: - 202.8,
        r: 30.7
      },
      {
        x: 2794.2,
        y: - 191.5,
        r: 30.7
      },
      {
        x: 2820.9,
        y: - 189.8,
        r: 30.7
      },
      {
        x: 2900,
        y: - 171.7,
        r: 26.700000000000003
      },
      {
        x: 2941.8,
        y: - 174.3,
        r: 33.300000000000004
      },
      {
        x: 2976.9,
        y: - 197.3,
        r: 21.775
      },
      {
        x: 4395.4,
        y: - 392.9,
        r: 41.575
      },
      {
        x: 4584.9,
        y: - 329,
        r: 35.825
      },
      {
        x: 3138.4,
        y: - 255.7,
        r: 32.75
      },
      {
        x: 773,
        y: 144,
        r: 29.5
      },
      {
        x: 617.8,
        y: 182,
        r: 30.7
      },
      {
        x: 2338.3,
        y: - 273.2,
        r: 45.95
      },
      {
        x: 2338.3,
        y: - 309.6,
        r: 45.95
      },
      {
        x: 3134.8,
        y: - 112.9,
        r: 12.174999999999999
      },
      {
        x: 2500.4,
        y: - 262.3,
        r: 18.224999999999998
      },
      {
        x: 4411.7,
        y: - 384.6,
        r: 41.575
      },
      {
        x: 4279.1,
        y: - 359.8,
        r: 41.575
      },
      {
        x: 4326.9,
        y: - 384.3,
        r: 41.575
      },
      {
        x: 4368.5,
        y: - 384.6,
        r: 61.875
      },
      {
        x: 3904.6,
        y: - 192.2,
        r: 29.875
      },
      {
        x: 3938.5,
        y: - 188.2,
        r: 31.1
      },
      {
        x: 3816.9,
        y: - 358.6,
        r: 32.550000000000004
      },
      {
        x: 3246.1,
        y: - 272.1,
        r: 18.3
      },
      {
        x: 3223,
        y: - 269.3,
        r: 19.175
      },
      {
        x: 3197,
        y: - 261.5,
        r: 25.8
      },
      {
        x: 3169.8,
        y: - 260.9,
        r: 27.500000000000004
      },
      {
        x: 3117.4,
        y: - 254,
        r: 33.175
      },
      {
        x: 3093.1,
        y: - 247.1,
        r: 30.099999999999998
      },
      {
        x: 3062.3,
        y: - 243.1,
        r: 20.150000000000002
      },
      {
        x: 2463.9,
        y: - 22.4,
        r: 45.95
      },
      {
        x: 2414.4,
        y: - 95.4,
        r: 30.15
      },
      {
        x: 2364.3,
        y: - 113.1,
        r: 45.95
      },
      {
        x: 2355.6,
        y: - 174.3,
        r: 45.95
      },
      {
        x: 2347.7,
        y: - 238.2,
        r: 45.95
      },
      {
        x: 2338.3,
        y: - 335,
        r: 45.95
      },
      {
        x: 2318.7,
        y: - 366.5,
        r: 72.6
      }
    ],
    medkits: [
      {
        x: 3986.6,
        y: - 297.7
      },
      {
        x: 4126.7,
        y: - 353.9
      },
      {
        x: 3619,
        y: - 330.5
      },
      {
        x: 3449.8,
        y: - 193.6
      },
      {
        x: 1130.3,
        y: - 63.7
      },
      {
        x: 3307.6,
        y: - 193.3
      },
      {
        x: 3202.7,
        y: - 347.7
      },
      {
        x: 2926.1,
        y: - 269.4
      },
      {
        x: 4503.4,
        y: - 443.8
      },
      {
        x: 4597.6,
        y: - 420
      },
      {
        x: 4424.7,
        y: - 470.7
      },
      {
        x: 4235.3,
        y: - 437.2
      },
      {
        x: 2625,
        y: - 336
      }
    ],
    star_mc_0: {
      x: 235,
      y: 110,
      visible: !0
    },
    star_mc: {
      x: 5675.6,
      y: - 403.75
    },
    under: {
      src: './images/under_3.jpg',
      position: {
        x: - 307,
        y: - 872.6
      }
    },
    over: {
      src: '',
      position: {
        x: 0,
        y: 0
      }
    },
    ground_mc: (new lib.level_3_ground).set({
      x: 254.1,
      y: 260.1
    }),
    wheel_1_position: {
      x: 209,
      y: 160
    },
    wheel_2_position: {
      x: 261,
      y: 160
    },
    start_x: 174,
    end_x: 5675.6
  },
  level_4: {
    damping: 0.98,
    gravity: {
      x: 0,
      y: 0.55
    },
    kfr: 0.1,
    friction: 0.8,
    surface: [
      [{
        x: 1832.0271070848526,
        y: 1332.858939480287
      },
      {
        x: 1923.6085283509774,
        y: 1357.2367589249502
      }
      ],
      [
        {
          x: 170.61463377035915,
          y: 211.65610080135517
        },
        {
          x: 268.7544184819109,
          y: 220.8174602403399
        }
      ],
      [
        {
          x: 270.17163618724186,
          y: 218.52329321848975
        },
        {
          x: 459.9251180920345,
          y: 220.46240255205947
        }
      ],
      [
        {
          x: 3143.8557766856047,
          y: 1602.8117950625603
        },
        {
          x: 3243.180639998888,
          y: 1611.1571516036295
        }
      ],
      [
        {
          x: 2963.4013721004662,
          y: 1551.1470072297323
        },
        {
          x: 3143.1544089934414,
          y: 1603.3722909891592
        }
      ],
      [
        {
          x: 3254.6719974296957,
          y: 1735.8749930249628
        },
        {
          x: 3443.3101049465204,
          y: 2162.7672139173924
        }
      ],
      [
        {
          x: 3784.2081423755803,
          y: 2334.6154652066807
        },
        {
          x: 3842.997229865522,
          y: 2672.0108389154793
        }
      ],
      [
        {
          x: 2806.3778026871546,
          y: 1451.0539414228197
        },
        {
          x: 2963.517117323153,
          y: 1553.1190635592714
        }
      ],
      [
        {
          x: 2763.454791947091,
          y: 1398.5197722125429
        },
        {
          x: 2808.7690209188618,
          y: 1451.4177517457342
        }
      ],
      [
        {
          x: 2699.8143063457396,
          y: 1250.1706891171987
        },
        {
          x: 2761.4659076914595,
          y: 1397.5385487627416
        }
      ],
      [
        {
          x: 2514.3681906928045,
          y: 1197.8893945685452
        },
        {
          x: 2657.2836517065984,
          y: 1071.781822689555
        }
      ],
      [
        {
          x: 2342.033693991741,
          y: 1313.0111257791093
        },
        {
          x: 2520.4598480278128,
          y: 1199.2034811945032
        }
      ],
      [
        {
          x: 2137.158284660016,
          y: 1362.2098709800505
        },
        {
          x: 2343.098982481905,
          y: 1312.6385170583203
        }
      ],
      [
        {
          x: 1924.4971327105602,
          y: 1358.067777609671
        },
        {
          x: 2136.4416182689642,
          y: 1363.4821994055362
        }
      ],
      [
        {
          x: 1717.358086647026,
          y: 1322.0434076949496
        },
        {
          x: 1832.4393375536595,
          y: 1332.6392575789594
        }
      ],
      [
        {
          x: 5171.501084017937,
          y: 4008.1745790989776
        },
        {
          x: 5400.2655291185,
          y: 4104.306564737635
        }
      ],
      [
        {
          x: 5025.284905544686,
          y: 3832.2570076230836
        },
        {
          x: 5171.249958259526,
          y: 4007.8578433954517
        }
      ],
      [
        {
          x: 1298.838883297854,
          y: 1021.634830722476
        },
        {
          x: 1523.302461083551,
          y: 1228.6348725404532
        }
      ],
      [
        {
          x: 5435.946057643874,
          y: 4115.916366420634
        },
        {
          x: 5788.203091561301,
          y: 4120.3564596287
        }
      ],
      [
        {
          x: 4678.556330124693,
          y: 3713.87721971541
        },
        {
          x: 4948.900828825851,
          y: 3766.3030985828123
        }
      ],
      [
        {
          x: 1523.6140736290938,
          y: 1232.7333482138963
        },
        {
          x: 1715.5888110345702,
          y: 1323.3309031648903
        }
      ],
      [
        {
          x: 1087.8829499999629,
          y: 799.2169714463807
        },
        {
          x: 1300.1325360887952,
          y: 1019.6221755798572
        }
      ],
      [
        {
          x: 1009.9100662994512,
          y: 719.4523867694136
        },
        {
          x: 1092.8595717306632,
          y: 800.1490582107892
        }
      ],
      [
        {
          x: 811.2837078809681,
          y: 462.74754560243815
        },
        {
          x: 1006.7077055274739,
          y: 717.2285815675145
        }
      ],
      [
        {
          x: 699.439295053609,
          y: 320.8893967099008
        },
        {
          x: 811.0400086417714,
          y: 458.1876605431079
        }
      ],
      [
        {
          x: 581.6163179838848,
          y: 246.26502538984235
        },
        {
          x: 700.0138246421628,
          y: 320.68819437708044
        }
      ],
      [
        {
          x: 459.9064821454739,
          y: 219.23248545119577
        },
        {
          x: 581.316681534711,
          y: 245.0963546177703
        }
      ],
      [
        {
          x: 2.6968666222748503,
          y: 212.4387412844733
        },
        {
          x: 169.86268273614502,
          y: 211.67656283834805
        }
      ],
      [
        {
          x: 42.55221390673185,
          y: 46.66478983214287
        },
        {
          x: 45.32984575083155,
          y: 218.04656035438555
        }
      ]
    ],
    circleSurface: [
      {
        x: 3876.1,
        y: 2653.3,
        r: 35.65
      },
      {
        x: 3918,
        y: 2666.6,
        r: 26.674999999999997
      },
      {
        x: 3906,
        y: 2691,
        r: 35.65
      },
      {
        x: 4110.7,
        y: 2890.2,
        r: 65.525
      },
      {
        x: 4097.8,
        y: 2957.4,
        r: 65.525
      },
      {
        x: 4106.4,
        y: 2924.7,
        r: 65.525
      },
      {
        x: 4368.9,
        y: 3379.3,
        r: 38.125
      },
      {
        x: 4375.6,
        y: 3401.9,
        r: 38.125
      },
      {
        x: 4432.7,
        y: 3459.8,
        r: 38.125
      },
      {
        x: 4476.8,
        y: 3467.3,
        r: 38.125
      },
      {
        x: 4353.5,
        y: 3141.1,
        r: 65.525
      },
      {
        x: 4103,
        y: 3058.1,
        r: 65.525
      },
      {
        x: 4151.8,
        y: 2807.6,
        r: 65.525
      },
      {
        x: 4138.2,
        y: 2858.6,
        r: 65.525
      },
      {
        x: 4153.4,
        y: 3114.2,
        r: 37.075
      },
      {
        x: 4167.1,
        y: 3128.9,
        r: 37.075
      },
      {
        x: 4241.3,
        y: 3152,
        r: 37.075
      },
      {
        x: 4264.9,
        y: 3148.8,
        r: 37.075
      },
      {
        x: 4448.6,
        y: 3477.8,
        r: 51.525
      },
      {
        x: 3671.6,
        y: 2312.9,
        r: 42.05
      },
      {
        x: 3692.7,
        y: 2347.8,
        r: 77.025
      },
      {
        x: 4281.8,
        y: 3151.5,
        r: 37.075
      },
      {
        x: 4536.1,
        y: 3447.1,
        r: 41.275
      },
      {
        x: 4573,
        y: 3423.8,
        r: 41.275
      },
      {
        x: 4472.1,
        y: 3476,
        r: 41.275
      },
      {
        x: 4406.8,
        y: 3451.4,
        r: 41.275
      },
      {
        x: 4501.1,
        y: 3466.3,
        r: 41.275
      },
      {
        x: 4484.1,
        y: 3475.2,
        r: 41.275
      },
      {
        x: 4369,
        y: 3321.4,
        r: 41.275
      },
      {
        x: 4363.2,
        y: 3387.9,
        r: 41.275
      },
      {
        x: 4441.6,
        y: 3475,
        r: 41.275
      },
      {
        x: 4363.2,
        y: 3341.2,
        r: 41.275
      },
      {
        x: 4363.8,
        y: 3271.7,
        r: 65.525
      },
      {
        x: 4367.9,
        y: 3441.3,
        r: 65.525
      },
      {
        x: 4145.1,
        y: 3098.4,
        r: 37.075
      },
      {
        x: 4157.6,
        y: 3123.8,
        r: 37.075
      },
      {
        x: 4181.3,
        y: 3141,
        r: 37.075
      },
      {
        x: 4209.3,
        y: 3150.6,
        r: 37.075
      },
      {
        x: 4229.8,
        y: 3159.8,
        r: 37.075
      },
      {
        x: 4311.9,
        y: 3163.8,
        r: 65.525
      },
      {
        x: 4376,
        y: 3138.5,
        r: 65.525
      },
      {
        x: 1496.1,
        y: 1312.4,
        r: 105.125
      },
      {
        x: 2140.8,
        y: 1409.1,
        r: 50.975
      },
      {
        x: 4041.7,
        y: 2767.1,
        r: 78.175
      },
      {
        x: 4082.3,
        y: 2740.4,
        r: 65.525
      },
      {
        x: 3558.2,
        y: 2347.5,
        r: 107.69999999999999
      },
      {
        x: 3501.1,
        y: 2315.3,
        r: 107.69999999999999
      },
      {
        x: 3446.6,
        y: 2279,
        r: 107.69999999999999
      },
      {
        x: 3403.8,
        y: 2244.3,
        r: 107.69999999999999
      },
      {
        x: 3261.4,
        y: 1787.1,
        r: 50.975
      },
      {
        x: 3248.7,
        y: 1730.2,
        r: 60.475
      },
      {
        x: 3245.6,
        y: 1682.7,
        r: 50.975
      },
      {
        x: 3232.7,
        y: 1655.6,
        r: 50.975
      },
      {
        x: 2666.7,
        y: 1258.8,
        r: 50.975
      },
      {
        x: 2662.7,
        y: 1201.6,
        r: 50.975
      },
      {
        x: 2676.2,
        y: 1141.8,
        r: 50.975
      },
      {
        x: 2690.9,
        y: 1098.4,
        r: 50.975
      },
      {
        x: 4429.4,
        y: 3096.7,
        r: 65.525
      },
      {
        x: 4400.4,
        y: 3115.1,
        r: 65.525
      },
      {
        x: 4666.2,
        y: 3397.1,
        r: 65.525
      },
      {
        x: 4612,
        y: 3427.2,
        r: 65.525
      },
      {
        x: 4099.6,
        y: 3034.1,
        r: 65.525
      },
      {
        x: 4098.6,
        y: 3000.6,
        r: 65.525
      },
      {
        x: 4673.2,
        y: 3764.8,
        r: 65.525
      },
      {
        x: 4633.7,
        y: 3711.8,
        r: 65.525
      },
      {
        x: 4633.7,
        y: 3651,
        r: 65.525
      },
      {
        x: 4658.1,
        y: 3576.3,
        r: 65.525
      },
      {
        x: 4697.3,
        y: 3520,
        r: 65.525
      },
      {
        x: 4726,
        y: 3474.4,
        r: 65.525
      },
      {
        x: 4689.2,
        y: 3388.9,
        r: 65.525
      },
      {
        x: 4733.8,
        y: 3400.4,
        r: 85.3
      },
      {
        x: 4122,
        y: 2725.6,
        r: 65.525
      },
      {
        x: 4951.4,
        y: 3820.2,
        r: 65.525
      },
      {
        x: 5400.9,
        y: 4158.7,
        r: 65.525
      },
      {
        x: 4918.7,
        y: 3815.2,
        r: 65.525
      },
      {
        x: 4971.8,
        y: 3845.7,
        r: 65.525
      },
      {
        x: 4641.1,
        y: 3407.5,
        r: 65.525
      },
      {
        x: 4575.6,
        y: 3450.8,
        r: 65.525
      },
      {
        x: 4527,
        y: 3478.2,
        r: 65.525
      },
      {
        x: 4399.9,
        y: 3190,
        r: 65.525
      },
      {
        x: 4440.3,
        y: 3134.1,
        r: 65.525
      },
      {
        x: 4411.6,
        y: 3104.2,
        r: 65.525
      },
      {
        x: 4460.4,
        y: 3090.1,
        r: 65.525
      },
      {
        x: 4080.9,
        y: 2761.5,
        r: 65.525
      },
      {
        x: 3999.9,
        y: 2771.5,
        r: 78.175
      },
      {
        x: 3948.5,
        y: 2771.5,
        r: 78.175
      },
      {
        x: 4163.6,
        y: 2741.5,
        r: 85.425
      },
      {
        x: 3875.8,
        y: 2753.1,
        r: 78.175
      },
      {
        x: 3820,
        y: 2717,
        r: 78.175
      },
      {
        x: 3774.8,
        y: 2648.5,
        r: 78.175
      },
      {
        x: 3731.1,
        y: 2395.1,
        r: 124.22500000000001
      },
      {
        x: 3551.4,
        y: 2344,
        r: 78.175
      },
      {
        x: 3614.8,
        y: 2361.4,
        r: 103.35000000000001
      },
      {
        x: 3503.8,
        y: 2344,
        r: 78.175
      },
      {
        x: 3417.2,
        y: 2306.6,
        r: 78.175
      }
    ],
    medkits: [
    ],
    star_mc_0: {
      x: 129,
      y: 155,
      visible: !0
    },
    star_mc: {
      x: 5507,
      y: 4072.3
    },
    under: {
      src: './images/under_4.jpg',
      position: {
        x: - 363,
        y: - 305.5
      }
    },
    over: {
      src: '',
      position: {
        x: 0,
        y: 0
      }
    },
    ground_mc: (new lib.level_4_ground).set({
      x: 254.1,
      y: 260.1
    }),
    wheel_1_position: {
      x: 103,
      y: 196
    },
    wheel_2_position: {
       x: 155,
       y: 196
    },
    start_x: 45,
    end_x: 5507
  },
  level_5: {
    damping: 0.98,
    gravity: {
      x: 0,
      y: 0.55
    },
    kfr: 0.1,
    friction: 0.8,
    surface: [
      [{
        x: 2861.89296198958,
        y: 687.2255659780542
      },
      {
        x: 2930.5914580691497,
        y: 751.0431704176233
      }
      ],
      [
        {
          x: 2710.6245270465856,
          y: 547.8755951002369
        },
        {
          x: 2862.8221448329796,
          y: 687.5548110385675
        }
      ],
      [
        {
          x: 6165.230347321959,
          y: 70.81711863432031
        },
        {
          x: 6165.641249631985,
          y: 232.11273268594795
        }
      ],
      [
        {
          x: 6092.281804665613,
          y: 250.2573438607095
        },
        {
          x: 6164.274580139375,
          y: 231.10492136159857
        }
      ],
      [
        {
          x: 6041.619258137552,
          y: 247.59778286762398
        },
        {
          x: 6091.978984566914,
          y: 250.74416348030445
        }
      ],
      [
        {
          x: 5975.303904465803,
          y: 239.25403314195626
        },
        {
          x: 6040.807026402815,
          y: 248.16631239615947
        }
      ],
      [
        {
          x: 5925.844271664417,
          y: 245.31263484434635
        },
        {
          x: 5975.056334277462,
          y: 240.03467601827452
        }
      ],
      [
        {
          x: 5857.089127908615,
          y: 261.1230948592951
        },
        {
          x: 5901.152978709393,
          y: 250.83249338966183
        }
      ],
      [
        {
          x: 5813.150740586014,
          y: 249.192809996706
        },
        {
          x: 5856.929854930083,
          y: 260.9115960792729
        }
      ],
      [
        {
          x: 5762.071599933869,
          y: 217.1448980391396
        },
        {
          x: 5813.723637465432,
          y: 249.37032141631198
        }
      ],
      [
        {
          x: 5684.7065795575545,
          y: 243.24690441423803
        },
        {
          x: 5719.710726165958,
          y: 220.13480790142802
        }
      ],
      [
        {
          x: 5646.389372938563,
          y: 240.85742682150158
        },
        {
          x: 5685.4773037580235,
          y: 242.1842912656059
        }
      ],
      [
        {
          x: 5593.999904318152,
          y: 220.30682221354348
        },
        {
          x: 5646.731524910822,
          y: 242.2184531357442
        }
      ],
      [
        {
          x: 5572.586997557312,
          y: 186.82255736550536
        },
        {
          x: 5594.934194377727,
          y: 219.2340965185547
        }
      ],
      [
        {
          x: 5568.611382398202,
          y: 144.4279163257949
        },
        {
          x: 5571.995414079118,
          y: 186.99124658298413
        }
      ],
      [
        {
          x: 5566.781828468794,
          y: 65.97388739568717
        },
        {
          x: 5569.754876731446,
          y: 143.21906141340781
        }
      ],
      [
        {
          x: 5538.06775653638,
          y: - 6.469605136087887
        },
        {
          x: 5565.776837498092,
          y: 65.77131430197913
        }
      ],
      [
        {
          x: 5479.162347633796,
          y: - 18.700152039232012
        },
        {
          x: 5515.603541543918,
          y: - 14.577749292663658
        }
      ],
      [
        {
          x: 5286.1088629870765,
          y: - 48.97869694545174
        },
        {
          x: 5329.874452311921,
          y: - 57.72751589711851
        }
      ],
      [
        {
          x: 5256.695584589431,
          y: - 53.96445375274364
        },
        {
          x: 5285.892348762973,
          y: - 49.749489245822915
        }
      ],
      [
        {
          x: 5204.228514468933,
          y: - 23.875606844468546
        },
        {
          x: 5256.662590857487,
          y: - 52.98904245896237
        }
      ],
      [
        {
          x: 5116.664737302356,
          y: - 16.427463870670156
        },
        {
          x: 5176.6423293185235,
          y: - 19.273821884382
        }
      ],
      [
        {
          x: 5079.139883240646,
          y: - 30.274674332208505
        },
        {
          x: 5117.596292048914,
          y: - 15.48194315870991
        }
      ],
      [
        {
          x: 5044.537156635062,
          y: - 44.77026347945759
        },
        {
          x: 5079.1409424307,
          y: - 29.984738036999556
        }
      ],
      [
        {
          x: 5008.280146678018,
          y: - 49.479442431445435
        },
        {
          x: 5045.5316126417565,
          y: - 44.15384034788042
        }
      ],
      [
        {
          x: 4959.370561542105,
          y: - 45.479230374093014
        },
        {
          x: 5009.207230320333,
          y: - 49.347007266471806
        }
      ],
      [
        {
          x: 4889.997921020036,
          y: - 12.382911078919951
        },
        {
          x: 4922.779262741224,
          y: - 29.68399003252111
        }
      ],
      [
        {
          x: 4842.35982441382,
          y: 16.89205204893265
        },
        {
          x: 4890.330771045027,
          y: - 12.35280355518901
        }
      ],
      [
        {
          x: 4774.9300343719815,
          y: 36.360159402111655
        },
        {
          x: 4802.282803126582,
          y: 28.25564032585862
        }
      ],
      [
        {
          x: 4732.390081810516,
          y: 59.36735842461621
        },
        {
          x: 4775.491727345686,
          y: 36.65532861306963
        }
      ],
      [
        {
          x: 4691.5579783291905,
          y: 85.72875828665153
        },
        {
          x: 4733.059648728374,
          y: 60.21014742952358
        }
      ],
      [
        {
          x: 4596.563506543567,
          y: 170.26865143337673
        },
        {
          x: 4670.649020398589,
          y: 103.26758127895737
        }
      ],
      [
        {
          x: 4509.693268814535,
          y: 213.94309679256423
        },
        {
          x: 4596.752820493588,
          y: 171.14856977750912
        }
      ],
      [
        {
          x: 4420.661538113719,
          y: 253.4948235556498
        },
        {
          x: 4509.529454131238,
          y: 214.4915429666641
        }
      ],
      [
        {
          x: 4287.18560426173,
          y: 260.0912346824386
        },
        {
          x: 4406.35976339763,
          y: 254.80549204292282
        }
      ],
      [
        {
          x: 4153.066387368683,
          y: 259.35897918398547
        },
        {
          x: 4287.5596157971495,
          y: 260.3578770207306
        }
      ],
      [
        {
          x: 4083.9097193461253,
          y: 276.9301126294335
        },
        {
          x: 4153.044468821802,
          y: 259.62884975832037
        }
      ],
      [
        {
          x: 3955.5685981782112,
          y: 317.8139480265254
        },
        {
          x: 4068.4455202967138,
          y: 280.15085233520585
        }
      ],
      [
        {
          x: 3886.723100765808,
          y: 333.42894366246134
        },
        {
          x: 3956.86818961598,
          y: 318.0708015807685
        }
      ],
      [
        {
          x: 47.7326052558059,
          y: 196.78682475651294
        },
        {
          x: 168.2592997540524,
          y: 198.72270448582395
        }
      ],
      [
        {
          x: 3747.273770729475,
          y: 406.4535114988418
        },
        {
          x: 3827.608407569466,
          y: 344.54349007430386
        }
      ],
      [
        {
          x: 3697.060707129111,
          y: 419.80166235029617
        },
        {
          x: 3745.97140644769,
          y: 406.675509632626
        }
      ],
      [
        {
          x: 3656.5902036896323,
          y: 447.32828178350536
        },
        {
          x: 3696.98409361178,
          y: 419.4055243810314
        }
      ],
      [
        {
          x: 3582.749016798993,
          y: 485.64640797628556
        },
        {
          x: 3657.1787311634653,
          y: 447.0843509302317
        }
      ],
      [
        {
          x: 3535.520549623959,
          y: 499.96777875514374
        },
        {
          x: 3583.0382186172046,
          y: 485.76837361097074
        }
      ],
      [
        {
          x: 3485.9790207027436,
          y: 520.6870885574145
        },
        {
          x: 3534.9721232061584,
          y: 499.75960108065584
        }
      ],
      [
        {
          x: 3448.302402281029,
          y: 559.1030519910167
        },
        {
          x: 3486.017705362993,
          y: 521.1711208058585
        }
      ],
      [
        {
          x: 3380.922670876631,
          y: 638.0740248290006
        },
        {
          x: 3449.6008630879296,
          y: 560.6734696915347
        }
      ],
      [
        {
          x: 3274.592874100172,
          y: 708.1815717553468
        },
        {
          x: 3380.5790475316294,
          y: 637.2086456894369
        }
      ],
      [
        {
          x: 3114.9254160404466,
          y: 730.9942648276444
        },
        {
          x: 3241.970126790933,
          y: 717.6288724905223
        }
      ],
      [
        {
          x: 3007.1968892131413,
          y: 743.0019908474036
        },
        {
          x: 3095.9580023781914,
          y: 731.7943160349744
        }
      ],
      [
        {
          x: 2931.588157217493,
          y: 751.6959920657591
        },
        {
          x: 3007.307529191959,
          y: 742.710581402218
        }
      ],
      [
        {
          x: 2555.099276180344,
          y: 408.90754349964425
        },
        {
          x: 2709.232284755724,
          y: 546.4481334812997
        }
      ],
      [
        {
          x: 2364.2086213710436,
          y: 212.92912560516575
        },
        {
          x: 2555.635808700744,
          y: 407.4370977015294
        }
      ],
      [
        {
          x: 2216.7090837694,
          y: 248.43729155552526
        },
        {
          x: 2253.4752944801526,
          y: 219.84540459484103
        }
      ],
      [
        {
          x: 2163.8279936957006,
          y: 259.034674001504
        },
        {
          x: 2216.801162381703,
          y: 248.687688529187
        }
      ],
      [
        {
          x: 2098.980064437888,
          y: 274.21367485392284
        },
        {
          x: 2163.3447852987124,
          y: 259.611819577686
        }
      ],
      [
        {
          x: 2057.17472270551,
          y: 296.7540787639753
        },
        {
          x: 2099.1572885056203,
          y: 275.6196514748487
        }
      ],
      [
        {
          x: 1999.5610708684098,
          y: 296.3587513416869
        },
        {
          x: 2056.2594303460046,
          y: 296.0073277377002
        }
      ],
      [
        {
          x: 1946.470320393507,
          y: 295.6294354851988
        },
        {
          x: 1999.4109539414771,
          y: 296.2002353972169
        }
      ],
      [
        {
          x: 1898.479361516383,
          y: 288.78931222007037
        },
        {
          x: 1946.3682999899174,
          y: 295.4486759192567
        }
      ],
      [
        {
          x: 1789.1889951409937,
          y: 277.06167799152774
        },
        {
          x: 1897.4223563864587,
          y: 288.14726473778114
        }
      ],
      [
        {
          x: 1620.136900157675,
          y: 288.3937851876804
        },
        {
          x: 1686.7500214933905,
          y: 279.13019566130157
        }
      ],
      [
        {
          x: 1412.5088391270838,
          y: 157.59928135651955
        },
        {
          x: 1609.9837480486506,
          y: 279.34100371750367
        }
      ],
      [
        {
          x: 1049.5005694256195,
          y: 54.50572964334579
        },
        {
          x: 1413.9919742510456,
          y: 66.11996480487313
        }
      ],
      [
        {
          x: 323.61258671278335,
          y: 199.55511085632594
        },
        {
          x: 461.94737352011697,
          y: 201.58130333720163
        }
      ],
      [
        {
          x: 168.02412229239022,
          y: 197.76013167590858
        },
        {
          x: 262.1105351922189,
          y: 203.66683952740675
        }
      ],
      [
        {
          x: 260.8647832740196,
          y: 203.1622280169049
        },
        {
          x: 321.06501501135574,
          y: 200.7485520297371
        }
      ],
      [
        {
          x: 466.93417974573094,
          y: 205.63369759949475
        },
        {
          x: 1045.9518223139403,
          y: 57.35112783570429
        }
      ],
      [
        {
          x: - 92.27704871417019,
          y: 186.9393020160227
        },
        {
          x: 48.00374937150623,
          y: 196.80228723580672
        }
      ],
      [
        {
          x: - 71.34778609326816,
          y: 25.76478983214288
        },
        {
          x: - 68.57015424916845,
          y: 197.14656035438554
        }
      ]
    ],
    circleSurface: [
      {
        x: 2922.6,
        y: 774.9,
        r: 30.4
      },
      {
        x: 2359.2,
        y: 217.6,
        r: 13.600000000000001
      },
      {
        x: 5923.1,
        y: 256.9,
        r: 15.825
      },
      {
        x: 5908.4,
        y: 262.2,
        r: 15.825
      },
      {
        x: 5741.8,
        y: 236.7,
        r: 29.45
      },
      {
        x: 5525.4,
        y: - 8.8,
        r: 17.599999999999998
      },
      {
        x: 5452.4,
        y: - 29.6,
        r: 15.325
      },
      {
        x: 5464.8,
        y: - 22.3,
        r: 19.275000000000002
      },
      {
        x: 5415.1,
        y: - 37.6,
        r: 15.325
      },
      {
        x: 5436,
        y: - 28,
        r: 24.925
      },
      {
        x: 5406.6,
        y: - 46.3,
        r: 15.325
      },
      {
        x: 5399.2,
        y: - 54.2,
        r: 15.325
      },
      {
        x: 5388.5,
        y: - 54.9,
        r: 15.325
      },
      {
        x: 5375.4,
        y: - 49.2,
        r: 22.15
      },
      {
        x: 5354.4,
        y: - 41.8,
        r: 22.15
      },
      {
        x: 5341,
        y: - 42.6,
        r: 22.15
      },
      {
        x: 5194.4,
        y: - 9.5,
        r: 22.15
      },
      {
        x: 4950,
        y: - 31.9,
        r: 18.725
      },
      {
        x: 4938.8,
        y: - 33.1,
        r: 14.224999999999998
      },
      {
        x: 4929,
        y: - 30.2,
        r: 17.075000000000003
      },
      {
        x: 4838,
        y: 27.5,
        r: 14.224999999999998
      },
      {
        x: 4828.4,
        y: 27.5,
        r: 14.224999999999998
      },
      {
        x: 4815.6,
        y: 29.9,
        r: 17.575
      },
      {
        x: 4699.5,
        y: 117.8,
        r: 36.95
      },
      {
        x: 4415.5,
        y: 273.4,
        r: 24.5
      },
      {
        x: 4083.7,
        y: 313.8,
        r: 42.025
      },
      {
        x: 3888.7,
        y: 346.3,
        r: 19.8
      },
      {
        x: 3873.2,
        y: 346.3,
        r: 19.8
      },
      {
        x: 3856.2,
        y: 369.2,
        r: 42.025
      },
      {
        x: 3272,
        y: 739.9,
        r: 38.4
      },
      {
        x: 3247.8,
        y: 730.1,
        r: 17.8
      },
      {
        x: 3106.9,
        y: 759.3,
        r: 35.6
      },
      {
        x: 2353.6,
        y: 227.9,
        r: 21.075
      },
      {
        x: 2281,
        y: 233.1,
        r: 21.075
      },
      {
        x: 2306.4,
        y: 229.6,
        r: 21.075
      },
      {
        x: 2295.8,
        y: 242.1,
        r: 31.724999999999998
      },
      {
        x: 2329.3,
        y: 241.5,
        r: 40.550000000000004
      },
      {
        x: 2270.3,
        y: 244.3,
        r: 31.724999999999998
      },
      {
        x: 1898.9,
        y: 288,
        r: 6.225
      },
      {
        x: 1778.5,
        y: 303.5,
        r: 31.724999999999998
      },
      {
        x: 1718.4,
        y: 297.1,
        r: 26.05
      },
      {
        x: 1744.8,
        y: 312.8,
        r: 46.675
      },
      {
        x: 1695.6,
        y: 307.4,
        r: 32.95
      },
      {
        x: 1608.5,
        y: 293.9,
        r: 20.375
      },
      {
        x: 1404.3,
        y: 167.4,
        r: 20.375
      },
      {
        x: 1400.8,
        y: 154.8,
        r: 20.375
      },
      {
        x: 1404,
        y: 128.9,
        r: 20.375
      },
      {
        x: 1404,
        y: 104.1,
        r: 20.375
      },
      {
        x: 1053.4,
        y: 64.6,
        r: 14.774999999999999
      },
      {
        x: 1406.6,
        y: 83.7,
        r: 20.375
      },
      {
        x: 470.5,
        y: 217.5,
        r: 24.525
      }
    ],
    medkits: [
      {
        x: 1118.4,
        y: 26
      },
      {
        x: 5141.9,
        y: - 62.1
      },
      {
        x: 3896.9,
        y: 274
      },
      {
        x: 2695.8,
        y: 481.1
      }
    ],
    star_mc_0: {
      x: - 5,
      y: 138.2,
      visible: !0
    },
    star_mc: {
      x: 5967,
      y: 206.4
    },
    under: {
      src: './images/under_5.jpg',
      position: {
        x: - 445,
        y: - 454.05
      }
    },
    over: {
      src: './images/over_5.png',
      position: {
        x: 115.35,
        y: - 253.45
      }
    },
    ground_mc: (new lib.level_5_ground).set({
      x: - 898,
      y: - 1915
    }),
    wheel_1_position: {
      x: - 31,
      y: 175
    },
    wheel_2_position: {
      x: 21,
      y: 175
    },
    start_x: - 68,
    end_x: 5967
  },
  level_6: {
    damping: 0.98,
    gravity: {
      x: 0,
      y: 0.55
    },
    kfr: 0.1,
    friction: 0.8,
    surface: [
      [{
        x: 11617.92472875654,
        y: 256.40855607405
      },
      {
        x: 11654.024481894914,
        y: 56.78553370036735
      }
      ],
      [
        {
          x: 11523.04103201961,
          y: 280.9893976622115
        },
        {
          x: 11616.518992746918,
          y: 254.25080246653485
        }
      ],
      [
        {
          x: 11479.362454893937,
          y: 283.1537384028373
        },
        {
          x: 11523.288048617958,
          y: 280.4631168797277
        }
      ],
      [
        {
          x: 11393.477751679438,
          y: 285.6530923871862
        },
        {
          x: 11478.052332817262,
          y: 282.89793143504164
        }
      ],
      [
        {
          x: 11352.691053743887,
          y: 272.38826490593436
        },
        {
          x: 11393.914768055074,
          y: 285.33763595953565
        }
      ],
      [
        {
          x: 11209.482213249685,
          y: 266.6846191196137
        },
        {
          x: 11340.116247397036,
          y: 271.08885199631334
        }
      ],
      [
        {
          x: 11172.905157262365,
          y: 259.1875755981659
        },
        {
          x: 11211.360275324909,
          y: 265.843118468215
        }
      ],
      [
        {
          x: 11133.5120996431,
          y: 258.10761334611556
        },
        {
          x: 11172.581791238337,
          y: 258.15176409153264
        }
      ],
      [
        {
          x: 11046.574767198745,
          y: 242.90902535026717
        },
        {
          x: 11131.817251888928,
          y: 258.0233357877592
        }
      ],
      [
        {
          x: 10992.359341061538,
          y: 233.51113882991328
        },
        {
          x: 11046.373791221815,
          y: 242.75068322027545
        }
      ],
      [
        {
          x: 10886.249831710575,
          y: 240.90054473562031
        },
        {
          x: 10992.019654977727,
          y: 235.20044956401054
        }
      ],
      [
        {
          x: 10781.86887382112,
          y: 251.47214283561985
        },
        {
          x: 10887.289392993885,
          y: 241.16385799892277
        }
      ],
      [
        {
          x: 10675.025053450088,
          y: 249.97754949718848
        },
        {
          x: 10780.903575147808,
          y: 252.13658302910204
        }
      ],
      [
        {
          x: 10600.008616561247,
          y: 253.88500888791944
        },
        {
          x: 10676.562236232034,
          y: 250.03211344460033
        }
      ],
      [
        {
          x: 10496.02926234147,
          y: 258.8893852437881
        },
        {
          x: 10599.25542527466,
          y: 253.51766264211602
        }
      ],
      [
        {
          x: 10391.880641624468,
          y: 252.8979339043992
        },
        {
          x: 10494.984426724943,
          y: 258.8049091536458
        }
      ],
      [
        {
          x: 10338.077423140685,
          y: 250.26494888057144
        },
        {
          x: 10393.219709857858,
          y: 252.79119135957706
        }
      ],
      [
        {
          x: 10215.160800154554,
          y: 255.40522160390765
        },
        {
          x: 10336.758230552,
          y: 251.4445881914977
        }
      ],
      [
        {
          x: 10139.815960235128,
          y: 246.4081642230975
        },
        {
          x: 10215.31722468456,
          y: 254.7258401678515
        }
      ],
      [
        {
          x: 10098.795255057954,
          y: 243.64289289195705
        },
        {
          x: 10140.641094420556,
          y: 245.95905632312264
        }
      ],
      [
        {
          x: 9988.669110699842,
          y: 237.211197214841
        },
        {
          x: 10097.063914420993,
          y: 243.15329507645066
        }
      ],
      [
        {
          x: 9944.6893392563,
          y: 239.1723511078843
        },
        {
          x: 9989.339942181072,
          y: 237.3807193434307
        }
      ],
      [
        {
          x: 9901.792972910102,
          y: 250.0692368354038
        },
        {
          x: 9945.114547093683,
          y: 239.1089678523213
        }
      ],
      [
        {
          x: 9849.07809686466,
          y: 259.1069459970307
        },
        {
          x: 9901.29343553417,
          y: 250.35908506521542
        }
      ],
      [
        {
          x: 9810.245059261199,
          y: 259.47905067796086
        },
        {
          x: 9849.113146178566,
          y: 259.31702964759177
        }
      ],
      [
        {
          x: 9745.550022261472,
          y: 268.42279159059893
        },
        {
          x: 9801.861047438935,
          y: 260.28784871341924
        }
      ],
      [
        {
          x: 9630.866958704592,
          y: 270.72977118256995
        },
        {
          x: 9745.680944525384,
          y: 268.75743033730924
        }
      ],
      [
        {
          x: 9579.150675222523,
          y: 284.93494030812155
        },
        {
          x: 9613.170185222905,
          y: 274.8544170994983
        }
      ],
      [
        {
          x: 9514.880046008877,
          y: 283.54364655296996
        },
        {
          x: 9578.027305662097,
          y: 284.5131187373772
        }
      ],
      [
        {
          x: 9470.06892033922,
          y: 283.56259124211374
        },
        {
          x: 9516.05067324267,
          y: 283.1563087245693
        }
      ],
      [
        {
          x: 9444.023309305909,
          y: 279.4419468915228
        },
        {
          x: 9468.97906778946,
          y: 283.2879653281381
        }
      ],
      [
        {
          x: 9342.076138340997,
          y: 250.3148822828517
        },
        {
          x: 9443.592436037787,
          y: 278.88292562602936
        }
      ],
      [
        {
          x: 9284.607315900112,
          y: 243.29667665060546
        },
        {
          x: 9343.747637517763,
          y: 250.14184854799373
        }
      ],
      [
        {
          x: 9190.813729630252,
          y: 238.02035447646125
        },
        {
          x: 9283.500650793874,
          y: 243.52668789055352
        }
      ],
      [
        {
          x: 9098.506104877348,
          y: 237.82560500293252
        },
        {
          x: 9191.266136652628,
          y: 236.7777565255154
        }
      ],
      [
        {
          x: 9005.214862691766,
          y: 230.5020887316955
        },
        {
          x: 9097.900898540021,
          y: 237.14343969800316
        }
      ],
      [
        {
          x: 8912.403172774331,
          y: 237.31699183941157
        },
        {
          x: 9004.999137418661,
          y: 230.6007622418005
        }
      ],
      [
        {
          x: 8825.716167052155,
          y: 173.3095567749543
        },
        {
          x: 8890.386049397886,
          y: 170.79017600976024
        }
      ],
      [
        {
          x: 8800.255069496097,
          y: 170.4097564544221
        },
        {
          x: 8826.187600694828,
          y: 173.3608137818133
        }
      ],
      [
        {
          x: 8768.525799074794,
          y: 184.23826815497492
        },
        {
          x: 8796.724439878311,
          y: 176.6560214355623
        }
      ],
      [
        {
          x: 8677.509292283003,
          y: 212.43334553841382
        },
        {
          x: 8746.191178534093,
          y: 198.32077878243254
        }
      ],
      [
        {
          x: 8430.12848802877,
          y: 299.9720343130323
        },
        {
          x: 8647.542965850502,
          y: 188.51800775487504
        }
      ],
      [
        {
          x: 8334.402380945749,
          y: 312.28093133147735
        },
        {
          x: 8431.73289445831,
          y: 299.8944843797534
        }
      ],
      [
        {
          x: 8271.15821849885,
          y: 313.41638401699174
        },
        {
          x: 8334.893103586039,
          y: 312.1758798733292
        }
      ],
      [
        {
          x: 8234.969734307026,
          y: 322.29020283672133
        },
        {
          x: 8271.908463016463,
          y: 313.32786751011594
        }
      ],
      [
        {
          x: 8152.514407305783,
          y: 323.9210405013673
        },
        {
          x: 8234.709282725114,
          y: 322.3279739692694
        }
      ],
      [
        {
          x: 7976.739947679842,
          y: 330.1287702847677
        },
        {
          x: 8140.286766206087,
          y: 327.95044872378776
        }
      ],
      [
        {
          x: 7943.468082521629,
          y: 320.4459618276448
        },
        {
          x: 7978.6523316685525,
          y: 330.0846427436202
        }
      ],
      [
        {
          x: 7917.885701143533,
          y: 319.7165292364412
        },
        {
          x: 7943.088608522238,
          y: 320.34446082370624
        }
      ],
      [
        {
          x: 7884.706256744354,
          y: 310.5530110566323
        },
        {
          x: 7918.08994741817,
          y: 320.06197833784586
        }
      ],
      [
        {
          x: 7850.082140239665,
          y: 309.7514775878011
        },
        {
          x: 7884.802224257215,
          y: 310.99991964198296
        }
      ],
      [
        {
          x: 7793.848213310629,
          y: 297.3997506339216
        },
        {
          x: 7849.458739060587,
          y: 309.890961694887
        }
      ],
      [
        {
          x: 7746.574690876428,
          y: 299.1239574618324
        },
        {
          x: 7793.919524518318,
          y: 297.3100353516687
        }
      ],
      [
        {
          x: 7712.174758622647,
          y: 288.14488902193654
        },
        {
          x: 7746.971999872316,
          y: 298.42099131864114
        }
      ],
      [
        {
          x: 7662.547371623992,
          y: 285.97307551991565
        },
        {
          x: 7712.409001534511,
          y: 287.7568223255023
        }
      ],
      [
        {
          x: 7595.79055787143,
          y: 265.7978497905539
        },
        {
          x: 7662.666098889184,
          y: 285.8153011663584
        }
      ],
      [
        {
          x: 7522.263497692331,
          y: 251.61044492569286
        },
        {
          x: 7590.931775575442,
          y: 264.16846859854087
        }
      ],
      [
        {
          x: 7454.607636497582,
          y: 241.2160513278792
        },
        {
          x: 7513.726718532827,
          y: 246.7776508558825
        }
      ],
      [
        {
          x: 7394.903918133977,
          y: 240.1800678805925
        },
        {
          x: 7454.269341758025,
          y: 241.50057079133802
        }
      ],
      [
        {
          x: 7364.899674817382,
          y: 247.19273418011804
        },
        {
          x: 7395.210010072717,
          y: 240.17143197118094
        }
      ],
      [
        {
          x: 7335.39016148977,
          y: 252.437530861067
        },
        {
          x: 7364.4688772680565,
          y: 247.8260207303556
        }
      ],
      [
        {
          x: 7297.347939931825,
          y: 267.9474820150432
        },
        {
          x: 7334.295118679695,
          y: 252.8531347097463
        }
      ],
      [
        {
          x: 7237.187013734204,
          y: 277.9531964734474
        },
        {
          x: 7296.2394865523565,
          y: 269.11494669980334
        }
      ],
      [
        {
          x: 7189.513377454867,
          y: 290.68791442078964
        },
        {
          x: 7237.011550349646,
          y: 279.11144722834973
        }
      ],
      [
        {
          x: 7140.491866954537,
          y: 295.20172280479255
        },
        {
          x: 7189.203668400242,
          y: 290.5683946366037
        }
      ],
      [
        {
          x: 7049.151435737548,
          y: 296.5893709257223
        },
        {
          x: 7139.371452781693,
          y: 294.7083072494539
        }
      ],
      [
        {
          x: 6968.964636242403,
          y: 291.0869921891577
        },
        {
          x: 7050.673365567873,
          y: 297.0260321803565
        }
      ],
      [
        {
          x: 6887.167490557998,
          y: 287.51596288447166
        },
        {
          x: 6969.058461701397,
          y: 290.9244267893456
        }
      ],
      [
        {
          x: 6805.665608752311,
          y: 281.7996706889743
        },
        {
          x: 6887.484621606763,
          y: 286.6368099802247
        }
      ],
      [
        {
          x: 6723.661855396917,
          y: 271.85390689851187
        },
        {
          x: 6805.146894446315,
          y: 280.6821112526325
        }
      ],
      [
        {
          x: 6641.266976947091,
          y: 268.3164384933847
        },
        {
          x: 6723.19683577331,
          y: 271.68889200913276
        }
      ],
      [
        {
          x: 6532.768351595381,
          y: 267.9168622114964
        },
        {
          x: 6641.6397837076465,
          y: 266.75824457634224
        }
      ],
      [
        {
          x: 6497.625371555691,
          y: 262.63793479354126
        },
        {
          x: 6534.313543770651,
          y: 269.7516112358176
        }
      ],
      [
        {
          x: 6394.844902289343,
          y: 239.7815663262582
        },
        {
          x: 6497.445157524786,
          y: 263.8915444809948
        }
      ],
      [
        {
          x: 6256.14390977696,
          y: 235.0466422399097
        },
        {
          x: 6393.312235019181,
          y: 239.9167593066967
        }
      ],
      [
        {
          x: 6118.656678180967,
          y: 228.41861860485207
        },
        {
          x: 6258.222473050621,
          y: 234.58035280891013
        }
      ],
      [
        {
          x: 5891.0299390633645,
          y: 216.63397960164207
        },
        {
          x: 6115.905981408636,
          y: 229.20409547731578
        }
      ],
      [
        {
          x: 5838.943711812213,
          y: 227.9343501937885
        },
        {
          x: 5882.422804253115,
          y: 219.0336498553013
        }
      ],
      [
        {
          x: 5752.749114321287,
          y: 241.64614139999526
        },
        {
          x: 5838.584329502754,
          y: 229.4339328875584
        }
      ],
      [
        {
          x: 5575.037209651155,
          y: 250.87315344977904
        },
        {
          x: 5728.95851557739,
          y: 246.978039207259
        }
      ],
      [
        {
          x: 5385.840827583198,
          y: 262.38092653730126
        },
        {
          x: 5548.761000196339,
          y: 257.01954344109265
        }
      ],
      [
        {
          x: 5314.1101467133685,
          y: 246.6394309693018
        },
        {
          x: 5387.656540977482,
          y: 261.5909772354117
        }
      ],
      [
        {
          x: 5171.514007434926,
          y: 221.74353313765502
        },
        {
          x: 5272.263874683056,
          y: 230.96274977921885
        }
      ],
      [
        {
          x: 5079.163612661833,
          y: 217.45995567018986
        },
        {
          x: 5171.658036167671,
          y: 222.90541601095322
        }
      ],
      [
        {
          x: 5044.707984702503,
          y: 221.8466130520444
        },
        {
          x: 5080.829815988247,
          y: 217.28282541848202
        }
      ],
      [
        {
          x: 5028.423147293338,
          y: 188.25440455700922
        },
        {
          x: 5044.254992276656,
          y: 221.09345059102466
        }
      ],
      [
        {
          x: 4983.318165491766,
          y: 210.9331590045955
        },
        {
          x: 5001.116208546806,
          y: 183.79989137220474
        }
      ],
      [
        {
          x: 4550.732900688287,
          y: 256.8603750245413
        },
        {
          x: 4595.915276229509,
          y: 240.7831280446633
        }
      ],
      [
        {
          x: 4420.844765248137,
          y: 263.51116877390115
        },
        {
          x: 4550.149432711032,
          y: 258.08735818445376
        }
      ],
      [
        {
          x: 4272.8413624745735,
          y: 292.73848198012473
        },
        {
          x: 4343.032462135248,
          y: 284.4909585685072
        }
      ],
      [
        {
          x: 4201.8247688935335,
          y: 295.45742886958885
        },
        {
          x: 4272.459833460183,
          y: 293.1122705241478
        }
      ],
      [
        {
          x: 4166.171856082574,
          y: 305.3797682562936
        },
        {
          x: 4202.855001316956,
          y: 295.7195972581579
        }
      ],
      [
        {
          x: 4033.3997868830543,
          y: 312.4010157950877
        },
        {
          x: 4089.8291183057795,
          y: 308.4644991643271
        }
      ],
      [
        {
          x: 3596.8622763084736,
          y: 267.747655453283
        },
        {
          x: 3634.842030986148,
          y: 274.0127992364418
        }
      ],
      [
        {
          x: 3563.696981012706,
          y: 257.0350688070066
        },
        {
          x: 3597.0219889209006,
          y: 267.9617603428183
        }
      ],
      [
        {
          x: 3530.3463005349163,
          y: 244.5864336276881
        },
        {
          x: 3562.9870651025135,
          y: 257.41332835878654
        }
      ],
      [
        {
          x: 3473.486998553948,
          y: 237.55206902131815
        },
        {
          x: 3530.3138350373274,
          y: 244.70600732768412
        }
      ],
      [
        {
          x: 3324.8228069055235,
          y: 225.99474923913826
        },
        {
          x: 3419.7549523631055,
          y: 225.49509854068594
        }
      ],
      [
        {
          x: 2705.3396381917396,
          y: 258.67251769074585
        },
        {
          x: 2813.7430520016205,
          y: 267.62291205991966
        }
      ],
      [
        {
          x: 2615.6522484709194,
          y: 252.65178348313447
        },
        {
          x: 2691.076688060713,
          y: 253.9280755992225
        }
      ],
      [
        {
          x: 2411.430974888491,
          y: 259.5298959116723
        },
        {
          x: 2472.139629989561,
          y: 253.18809168737303
        }
      ],
      [
        {
          x: 2355.5915829329315,
          y: 262.8864214817037
        },
        {
          x: 2403.718860011406,
          y: 259.24377120865563
        }
      ],
      [
        {
          x: 2313.7432440720813,
          y: 266.97506811780886
        },
        {
          x: 2349.8130421606884,
          y: 263.3835393559716
        }
      ],
      [
        {
          x: 2163.8633328042633,
          y: 285.31429564111903
        },
        {
          x: 2241.775533322808,
          y: 280.8560120747583
        }
      ],
      [
        {
          x: 2036.9722466533563,
          y: 290.35627416056764
        },
        {
          x: 2163.0904589402203,
          y: 285.38538997709327
        }
      ],
      [
        {
          x: 1669.9731745114154,
          y: 271.3445871006708
        },
        {
          x: 1759.3300225334751,
          y: 291.9537031312657
        }
      ],
      [
        {
          x: 1607.4399884069312,
          y: 271.07983022165047
        },
        {
          x: 1671.1417329583846,
          y: 271.83870116019426
        }
      ],
      [
        {
          x: 1556.2785757428737,
          y: 262.3636652865907
        },
        {
          x: 1608.8455692075383,
          y: 271.24652243313454
        }
      ],
      [
        {
          x: 1422.3737300903044,
          y: 259.6629934768225
        },
        {
          x: 1557.1942387800852,
          y: 262.9319030241673
        }
      ],
      [
        {
          x: 1074.9253697467886,
          y: 255.55408021228624
        },
        {
          x: 1250.4245381647452,
          y: 256.3678846148918
        }
      ],
      [
        {
          x: 4912.023442901591,
          y: 216.22090667419246
        },
        {
          x: 4985.103070527259,
          y: 211.5305946276667
        }
      ],
      [
        {
          x: 4874.209105079705,
          y: 204.88159621108747
        },
        {
          x: 4912.390636303364,
          y: 217.00398761776802
        }
      ],
      [
        {
          x: 4790.049284822895,
          y: 155.9380713431491
        },
        {
          x: 4795.610419190583,
          y: 197.3200189718497
        }
      ],
      [
        {
          x: 4733.629970382327,
          y: 154.39247371468346
        },
        {
          x: 4789.959985160867,
          y: 155.19345314599195
        }
      ],
      [
        {
          x: 4678.562262611209,
          y: 182.3381691259523
        },
        {
          x: 4720.9197390954905,
          y: 167.46601733532123
        }
      ],
      [
        {
          x: 4342.667010625135,
          y: 285.3600336306859
        },
        {
          x: 4411.283324961094,
          y: 264.3923195934115
        }
      ],
      [
        {
          x: 4095.629241500142,
          y: 309.48678794113306
        },
        {
          x: 4166.205180471251,
          y: 305.0142638946497
        }
      ],
      [
        {
          x: 3925.921935775267,
          y: 313.306097616588
        },
        {
          x: 4033.5306077390564,
          y: 312.4605308306409
        }
      ],
      [
        {
          x: 3877.892760781418,
          y: 307.5514862760061
        },
        {
          x: 3926.184694434997,
          y: 315.062701956464
        }
      ],
      [
        {
          x: 3819.832650412623,
          y: 296.40151195147075
        },
        {
          x: 3862.7891191711706,
          y: 303.8584641972563
        }
      ],
      [
        {
          x: 3733.646264912801,
          y: 282.73128723199136
        },
        {
          x: 3804.359662916965,
          y: 295.54711930426436
        }
      ],
      [
        {
          x: 3646.591011917476,
          y: 276.29342357815693
        },
        {
          x: 3726.3802581930863,
          y: 282.463039106694
        }
      ],
      [
        {
          x: 3420.340655828682,
          y: 225.511126642074
        },
        {
          x: 3466.3209265001096,
          y: 234.85883732342555
        }
      ],
      [
        {
          x: 3273.923230928585,
          y: 238.24115094496804
        },
        {
          x: 3325.2239655821586,
          y: 225.73300791717946
        }
      ],
      [
        {
          x: 3116.220638860886,
          y: 272.83020132037683
        },
        {
          x: 3238.0642061492545,
          y: 252.49575135376048
        }
      ],
      [
        {
          x: 3056.0570998528387,
          y: 279.01453663510193
        },
        {
          x: 3116.964483971465,
          y: 273.4385129778639
        }
      ],
      [
        {
          x: 2927.3973286082155,
          y: 278.0832064481711
        },
        {
          x: 3054.880496137377,
          y: 279.8633229420375
        }
      ],
      [
        {
          x: 2853.8109332597314,
          y: 273.9205652474279
        },
        {
          x: 2928.831408371988,
          y: 278.6965958096514
        }
      ],
      [
        {
          x: 2815.7950811862174,
          y: 268.33069376474725
        },
        {
          x: 2851.5629097370124,
          y: 274.45274454540373
        }
      ],
      [
        {
          x: 2486.5677771465257,
          y: 252.20503788172542
        },
        {
          x: 2616.3368461305727,
          y: 253.05464250371844
        }
      ],
      [
        {
          x: 2242.582913248395,
          y: 279.90781386063514
        },
        {
          x: 2301.1924346842316,
          y: 270.2462708129518
        }
      ],
      [
        {
          x: 1959.9673695595961,
          y: 296.9245348281777
        },
        {
          x: 2024.6830584619333,
          y: 294.75729167248204
        }
      ],
      [
        {
          x: 1758.7412981773462,
          y: 293.1648557780039
        },
        {
          x: 1958.2599591784453,
          y: 296.2692620543253
        }
      ],
      [
        {
          x: 1248.8321826110478,
          y: 255.1533330551991
        },
        {
          x: 1422.6560519684988,
          y: 259.27557984594273
        }
      ],
      [
        {
          x: 1035.677122049535,
          y: 248.342026825881
        },
        {
          x: 1077.307457301154,
          y: 256.16886800465886
        }
      ],
      [
        {
          x: 969.7461358349433,
          y: 247.69348688681683
        },
        {
          x: 1036.3374704149535,
          y: 248.26881188466353
        }
      ],
      [
        {
          x: 844.6075878451901,
          y: 242.84031825121923
        },
        {
          x: 967.6039948534017,
          y: 248.11220606018802
        }
      ],
      [
        {
          x: 720.9905258344022,
          y: 240.0905174548479
        },
        {
          x: 844.1569552224308,
          y: 242.15174810758
        }
      ],
      [
        {
          x: 548.8191953223496,
          y: 233.94343034623523
        },
        {
          x: 722.363109733775,
          y: 239.4991768091191
        }
      ],
      [
        {
          x: 482.6908495880803,
          y: 219.21211767370968
        },
        {
          x: 548.7177075489169,
          y: 233.36865894689868
        }
      ],
      [
        {
          x: 321.4336404177622,
          y: 193.86867977228914
        },
        {
          x: 448.77629393106236,
          y: 209.70621067807093
        }
      ],
      [
        {
          x: 248.7442621067221,
          y: 203.65382897393386
        },
        {
          x: 322.51498029115453,
          y: 193.50900943127795
        }
      ],
      [
        {
          x: 198.0192581375523,
          y: 201.09778286762398
        },
        {
          x: 248.37898456691397,
          y: 204.24416348030445
        }
      ],
      [
        {
          x: 131.7039044658018,
          y: 192.75403314195626
        },
        {
          x: 197.20702640281408,
          y: 201.66631239615947
        }
      ],
      [
        {
          x: 82.34427166441705,
          y: 198.81263484434635
        },
        {
          x: 131.55633427746233,
          y: 193.53467601827452
        }
      ],
      [
        {
          x: 13.489127908614998,
          y: 214.62309485929515
        },
        {
          x: 57.55297870939251,
          y: 204.33249338966186
        }
      ],
      [
        {
          x: - 30.349259413986353,
          y: 202.692809996706
        },
        {
          x: 13.429854930082278,
          y: 214.4115960792729
        }
      ],
      [
        {
          x: - 81.42840006613059,
          y: 170.6448980391396
        },
        {
          x: - 29.776362534567618,
          y: 202.87032141631198
        }
      ],
      [
        {
          x: - 138.15225852946298,
          y: - 18.43770032411716
        },
        {
          x: - 97.67811896590833,
          y: 173.8108618358894
        }
      ]
    ],
    circleSurface: [
      {
        x: 11343.6,
        y: 290.6,
        r: 25
      },
      {
        x: 9810.1,
        y: 281,
        r: 25
      },
      {
        x: 9627.3,
        y: 292.3,
        r: 25
      },
      {
        x: 8820,
        y: 157.7,
        r: 6.45
      },
      {
        x: 8908.7,
        y: 246.5,
        r: 12.675
      },
      {
        x: 8894.2,
        y: 244.1,
        r: 12.35
      },
      {
        x: 8892.8,
        y: 229.8,
        r: 12.35
      },
      {
        x: 8891.6,
        y: 216.2,
        r: 12.35
      },
      {
        x: 8890.6,
        y: 204.7,
        r: 12.35
      },
      {
        x: 8890.6,
        y: 192.3,
        r: 12.35
      },
      {
        x: 8890.6,
        y: 181.9,
        r: 12.35
      },
      {
        x: 8799.6,
        y: 175.8,
        r: 6.45
      },
      {
        x: 8769.8,
        y: 197.8,
        r: 15.1
      },
      {
        x: 8750.6,
        y: 203.4,
        r: 15.1
      },
      {
        x: 8663.2,
        y: 211.6,
        r: 20.525
      },
      {
        x: 8650.2,
        y: 193.3,
        r: 9.1
      },
      {
        x: 8148.6,
        y: 345.2,
        r: 25
      },
      {
        x: 7588.1,
        y: 285.7,
        r: 25
      },
      {
        x: 7513,
        y: 270,
        r: 25
      },
      {
        x: 5890.5,
        y: 233.3,
        r: 20.549999999999997
      },
      {
        x: 5745.5,
        y: 271.2,
        r: 34.975
      },
      {
        x: 5576.1,
        y: 265.8,
        r: 18.025
      },
      {
        x: 5563,
        y: 273,
        r: 25.6
      },
      {
        x: 5285.4,
        y: 249.7,
        r: 15.45
      },
      {
        x: 5312.4,
        y: 258.2,
        r: 15.45
      },
      {
        x: 5291.7,
        y: 258.4,
        r: 21.725
      },
      {
        x: 5273.5,
        y: 247.2,
        r: 18.9
      },
      {
        x: 4863,
        y: 212.3,
        r: 17.724999999999998
      },
      {
        x: 4834.9,
        y: 223.8,
        r: 24.075
      },
      {
        x: 4814.3,
        y: 218.7,
        r: 24.075
      },
      {
        x: 4800,
        y: 216.8,
        r: 24.075
      },
      {
        x: 4738.7,
        y: 175.7,
        r: 24.075
      },
      {
        x: 4678.3,
        y: 204.5,
        r: 24.075
      },
      {
        x: 4656.7,
        y: 222.6,
        r: 19.475
      },
      {
        x: 3870.3,
        y: 331.1,
        r: 30.8
      },
      {
        x: 3807.8,
        y: 317.2,
        r: 25.025
      },
      {
        x: 3728.7,
        y: 304.2,
        r: 25.025
      },
      {
        x: 3638.2,
        y: 292.5,
        r: 21.025
      },
      {
        x: 3468,
        y: 245.7,
        r: 14.149999999999999
      },
      {
        x: 3247.3,
        y: 264,
        r: 19.275000000000002
      },
      {
        x: 2036.8,
        y: 310.5,
        r: 25
      },
      {
        x: 5015.9,
        y: 200.2,
        r: 24.05
      },
      {
        x: 4613.1,
        y: 241.5,
        r: 19.475
      },
      {
        x: 4632.1,
        y: 228.3,
        r: 19.475
      },
      {
        x: 4419.8,
        y: 284.8,
        r: 24.975
      },
      {
        x: 4092.4,
        y: 335.4,
        r: 30.45
      },
      {
        x: 3275.4,
        y: 268.8,
        r: 34.125
      },
      {
        x: 2695.5,
        y: 285,
        r: 34.125
      },
      {
        x: 2479.9,
        y: 263.8,
        r: 16.35
      },
      {
        x: 2407.7,
        y: 278.3,
        r: 22.650000000000002
      },
      {
        x: 2352.2,
        y: 276.6,
        r: 17
      },
      {
        x: 2312.9,
        y: 279.9,
        r: 16.950000000000003
      },
      {
        x: 472.7,
        y: 228.4,
        r: 19.05
      },
      {
        x: 450.5,
        y: 231.4,
        r: 26.625
      },
      {
        x: 79.6,
        y: 210.4,
        r: 15.825
      },
      {
        x: 64.8,
        y: 215.7,
        r: 15.825
      },
      {
        x: - 101.8,
        y: 190.2,
        r: 29.45
      }
    ],
    medkits: [
      {
        x: 6295.1,
        y: 200.4
      },
      {
        x: 7110.1,
        y: 264.7
      },
      {
        x: 9725.1,
        y: 234.4
      },
      {
        x: 8380.9,
        y: 281.8
      },
      {
        x: 6139.5,
        y: 198.5
      },
      {
        x: 4851.9,
        y: 179.5
      },
      {
        x: 4548.3,
        y: 210.1
      }
    ],
    star_mc_0: {
      x: 139.4,
      y: 138.8,
      visible: !0
    },
    star_mc: {
      x: 11326.6,
      y: 231.3
    },
    under: {
      src: './images/under_6.jpg',
      position: {
        x: - 559,
        y: - 340.6
      }
    },
    over: {
      src: './images/over_6.png',
      position: {
        x: 692.3,
        y: 93.5
      }
    },
    ground_mc: (new lib.level_6_ground).set({
      x: - 898,
      y: - 1915
    }),
    wheel_1_position: {
       x: 138,
       y: 175
    },
    wheel_2_position: {
      x: 190,
      y: 175
    },
    start_x: - 99,
    end_x: 11326.6
  }
};
isMobile = function () {
  return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? !0 : !1
};
EventProcess = {
  success: !1,
  currentLevel: 1,
  soundPause: !1,
  energeLoss: function () {
    game_mc.level_mc.gameOver(!1)
  },
  gameComplete: function () {
    adshown=true;
    gdsdk.showBanner();
    console.log("Game Complete");
    EventProcess.success = !0;
    menu_mc.messages_mc.gotoAndStop('level_completed');
  },
  gameOver: function (n) {
    //console.log(menu_mc.progress_mc.life);

    if(!(menu_mc.progress_mc.life-1)){
      adshown=true;
      gdsdk.showBanner();
      adshownalready=true;
    }
    n && menu_mc.progress_mc.lifeReduce();
    EventProcess.success = !1;
    menu_mc.messages_mc.gotoAndStop('level_completed')
  },
  energeReduce: function () {
    menu_mc.progress_mc.energeReduce()
  },
  energeIncrease: function () {
    menu_mc.progress_mc.energeIncrease()
  },
  distBarUpdate: function (n, t, i) {
    menu_mc.progress_mc.distBarUpdate(n, t, i)
  },
  continueClick: function () {
    EventProcess.success == !0 ? (menu_mc.progress_mc.life = 3, menu_mc.progress_mc.totalScore += menu_mc.progress_mc.levelScore, menu_mc.progress_mc.init(), EventProcess.currentLevel++, EventProcess.currentLevel < 7 ? (EventProcess.success = !1, game_mc.level_mc.start(level_data['level_' + EventProcess.currentLevel]), menu_mc.messages_mc.gotoAndStop('empty'))  : (game_mc.level_mc.gamePause(), EventProcess.process_1()))  : menu_mc.progress_mc.life > 0 ? (menu_mc.progress_mc.init(), EventProcess.success = !1, game_mc.level_mc.start(level_data['level_' + EventProcess.currentLevel]), menu_mc.messages_mc.gotoAndStop('empty'))  : (game_mc.level_mc.gamePause(), EventProcess.process_1())
  },
  gamePauseClick: function () {
     //gdsdk.showBanner();

    game_mc.level_mc.game_over || (game_mc.level_mc.game_paused ? (game_mc.level_mc.game_paused = !1, menu_mc.messages_mc.gotoAndPlay('un_pause'))  : (game_mc.level_mc.game_paused = !0, menu_mc.messages_mc.gotoAndPlay('pause')))
  },
  soundPauseClick: function () {
    game_mc.level_mc.sound_paused ? game_mc.level_mc.game_paused || game_mc.level_mc.game_over || (createjs.Sound.stop(), game_mc.level_mc.sound_paused = !1, createjs.Sound.play('looop', {
      loop: - 1
    }))  : (createjs.Sound.stop(), game_mc.level_mc.sound_paused = !0)
  },
  mainMenuClick: function () {
    game_mc.level_mc.gamePause();
    EventProcess.process_1()
  },
  process_1: function () {
    Key.off();
    menu_mc.removeAllChildren();
    gameStage.removeAllChildren();
    document.getElementById('under').style.visibility = 'hidden';
    document.getElementById('over').style.visibility = 'hidden';
    menu_mc.play_mc.instructions.visible = !1;
    menu_mc.addChild(menu_mc.play_mc, menu_mc.small_fog_logo)
  },
  playmoreClick: function () {
    EventProcess.openInNewTab('http://www.fog.com/')
  },
  freeGamesClick: function () {
    EventProcess.openInNewTab('http://www.freegamesforyourwebsite.com/')
  },
  playClick: function () {
	  adshown=false;
    if(!adshownalready){
       gdsdk.showBanner(); 
    }else{
      start_game();
    }
    

  },
  freeOnlineClick: function () {
    EventProcess.openInNewTab('https://www.freeonlinegames.com/')
  },
  logoClick: function () {
    EventProcess.openInNewTab('http://www.fog.com/')
  },
  openInNewTab: function (n) {
    window.open(n, '_blank')
  }
};
function start_game(){
    adshown=false;
	  menu_mc.removeAllChildren();
    menu_mc.progress_mc.life = 3;
    menu_mc.progress_mc.totalScore = 0;
    menu_mc.progress_mc.init();
    menu_mc.addChild(menu_mc.progress_mc);
    EventProcess.currentLevel = 1;
    EventProcess.success = !1;
    menu_mc.messages_mc.gotoAndStop('empty');
    menu_mc.addChild(menu_mc.messages_mc, menu_mc.small_fog_logo);
    gameStage.addChild(game_mc);
    game_mc.level_mc.start(level_data.level_1)
}
Key = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  state: [
    !1,
    !1,
    !1,
    !1
  ],
  isDown: function (n) {
    return this.state[n]
  },
  keydown: function (n) {
    n.keyCode >= 37 && n.keyCode <= 40 && (n.preventDefault(), Key.state[n.keyCode - 37] = !0);
    n.keyCode == 80 ? EventProcess.gamePauseClick()  : n.keyCode == 83 ? EventProcess.soundPauseClick()  : n.keyCode == 32 && game_mc.level_mc.game_over && EventProcess.continueClick()
  },
  keyup: function (n) {
    n.keyCode >= 37 && n.keyCode <= 40 && (n.preventDefault(), Key.state[n.keyCode - 37] = !1)
  },
  arrrowDown: function (n) {
    Key.state[Key[n]] = !0
  },
  arrrowUp: function (n) {
    Key.state[Key[n]] = !1
  },
  on: function () {
    Key.state = [
      !1,
      !1,
      !1,
      !1
    ];
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup)
  },
  off: function () {
    document.removeEventListener('keydown', this.keydown);
    document.removeEventListener('keyup', this.keyup)
  }
};
bodyOnload()