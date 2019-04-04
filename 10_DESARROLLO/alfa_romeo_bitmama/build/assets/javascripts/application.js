/*!
 * VERSION: 1.18.2
 * DATE: 2015-12-22
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function ()
{
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c)
    {
        var d = function (a)
        {
            var b, c = [], d = a.length;
            for (b = 0; b !== d; c.push(a[b++]));
            return c
        }, e = function (a, b, c)
        {
            var d, e, f = a.cycle;
            for (d in f)e = f[d], a[d] = "function" == typeof e ? e.call(b[c], c) : e[c % e.length];
            delete a.cycle
        }, f = function (a, b, d)
        {
            c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = f.prototype.render
        }, g = 1e-10, h = c._internals, i = h.isSelector, j = h.isArray, k = f.prototype = c.to({}, .1, {}), l = [];
        f.version = "1.18.2", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function ()
        {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), c.prototype.invalidate.call(this)
        }, k.updateTo = function (a, b)
        {
            var d, e = this.ratio, f = this.vars.immediateRender || a.immediateRender;
            b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (d in a)this.vars[d] = a[d];
            if (this._initted || f)if (b)this._initted = !1, f && this.render(0, !0, !0); else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998)
            {
                var g = this._totalTime;
                this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1)
            } else if (this._initted = !1, this._init(), this._time > 0 || f)for (var h, i = 1 / (1 - e), j = this._firstPT; j;)h = j.s + j.c, j.c *= i, j.s = h - j.c, j = j._next;
            return this
        }, k.render = function (a, b, c)
        {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var d, e, f, i, j, k, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration, o = this._time, p = this._totalTime, q = this._cycle, r = this._duration, s = this._rawPrevTime;
            if (a >= n - 1e-7 ? (this._totalTime = n, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = r, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === r && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > s || 0 >= a && a >= -1e-7 || s === g && "isPause" !== this.data) && s !== a && (c = !0, s > g && (e = "onReverseComplete")), this._rawPrevTime = m = !b || a || s === a ? a : g)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== p || 0 === r && s > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === r && (this._initted || !this.vars.lazy || c) && (s >= 0 && (c = !0), this._rawPrevTime = m = !b || a || s === a ? a : g)), this._initted || (c = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (i = r + this._repeatDelay, this._cycle = this._totalTime / i >> 0, 0 !== this._cycle && this._cycle === this._totalTime / i && this._cycle--, this._time = this._totalTime - this._cycle * i, this._yoyo && 0 !== (1 & this._cycle) && (this._time = r - this._time), this._time > r ? this._time = r : this._time < 0 && (this._time = 0)), this._easeType ? (j = this._time / r, k = this._easeType, l = this._easePower, (1 === k || 3 === k && j >= .5) && (j = 1 - j), 3 === k && (j *= 2), 1 === l ? j *= j : 2 === l ? j *= j * j : 3 === l ? j *= j * j * j : 4 === l && (j *= j * j * j * j), 1 === k ? this.ratio = 1 - j : 2 === k ? this.ratio = j : this._time / r < .5 ? this.ratio = j / 2 : this.ratio = 1 - j / 2) : this.ratio = this._ease.getRatio(this._time / r)), o === this._time && !c && q === this._cycle)return void(p !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
            if (!this._initted)
            {
                if (this._init(), !this._initted || this._gc)return;
                if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))return this._time = o, this._totalTime = p, this._rawPrevTime = s, this._cycle = q, h.lazyTweens.push(this), void(this._lazy = [a, b]);
                this._time && !d ? this.ratio = this._ease.getRatio(this._time / r) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && a >= 0 && (this._active = !0), 0 === p && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === r) && (b || this._callback("onStart"))), f = this._firstPT; f;)f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
            this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, b, c), b || (this._totalTime !== p || d) && this._callback("onUpdate")), this._cycle !== q && (b || this._gc || this.vars.onRepeat && this._callback("onRepeat")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === r && this._rawPrevTime === g && m !== g && (this._rawPrevTime = 0))
        }, f.to = function (a, b, c)
        {
            return new f(a, b, c)
        }, f.from = function (a, b, c)
        {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c)
        }, f.fromTo = function (a, b, c, d)
        {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new f(a, b, d)
        }, f.staggerTo = f.allTo = function (a, b, g, h, k, m, n)
        {
            h = h || 0;
            var o, p, q, r, s = 0, t = [], u = function ()
            {
                g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k.apply(n || g.callbackScope || this, m || l)
            }, v = g.cycle, w = g.startAt && g.startAt.cycle;
            for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a = a || [], 0 > h && (a = d(a), a.reverse(), h *= -1), o = a.length - 1, q = 0; o >= q; q++)
            {
                p = {};
                for (r in g)p[r] = g[r];
                if (v && e(p, a, q), w)
                {
                    w = p.startAt = {};
                    for (r in g.startAt)w[r] = g.startAt[r];
                    e(p.startAt, a, q)
                }
                p.delay = s + (p.delay || 0), q === o && k && (p.onComplete = u), t[q] = new f(a[q], b, p), s += h
            }
            return t
        }, f.staggerFrom = f.allFrom = function (a, b, c, d, e, g, h)
        {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a, b, c, d, e, g, h)
        }, f.staggerFromTo = f.allFromTo = function (a, b, c, d, e, g, h, i)
        {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, f.staggerTo(a, b, d, e, g, h, i)
        }, f.delayedCall = function (a, b, c, d, e)
        {
            return new f(b, 0, {
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                callbackScope: d,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                immediateRender: !1,
                useFrames: e,
                overwrite: 0
            })
        }, f.set = function (a, b)
        {
            return new f(a, 0, b)
        }, f.isTweening = function (a)
        {
            return c.getTweensOf(a, !0).length > 0
        };
        var m = function (a, b)
        {
            for (var d = [], e = 0, f = a._first; f;)f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(m(f, b)), e = d.length), f = f._next;
            return d
        }, n = f.getAllTweens = function (b)
        {
            return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b))
        };
        f.killAll = function (a, c, d, e)
        {
            null == c && (c = !0), null == d && (d = !0);
            var f, g, h, i = n(0 != e), j = i.length, k = c && d && e;
            for (h = 0; j > h; h++)g = i[h], (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1))
        }, f.killChildTweensOf = function (a, b)
        {
            if (null != a)
            {
                var e, g, k, l, m, n = h.tweenLookup;
                if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a))for (l = a.length; --l > -1;)f.killChildTweensOf(a[l], b); else
                {
                    e = [];
                    for (k in n)for (g = n[k].target.parentNode; g;)g === a && (e = e.concat(n[k].tweens)), g = g.parentNode;
                    for (m = e.length, l = 0; m > l; l++)b && e[l].totalTime(e[l].totalDuration()), e[l]._enabled(!1, !1)
                }
            }
        };
        var o = function (a, c, d, e)
        {
            c = c !== !1, d = d !== !1, e = e !== !1;
            for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1;)g = h[j], (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
        };
        return f.pauseAll = function (a, b, c)
        {
            o(!0, a, b, c)
        }, f.resumeAll = function (a, b, c)
        {
            o(!1, a, b, c)
        }, f.globalTimeScale = function (b)
        {
            var d = a._rootTimeline, e = c.ticker.time;
            return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale
        }, k.progress = function (a)
        {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }, k.totalProgress = function (a)
        {
            return arguments.length ? this.totalTime(this.totalDuration() * a, !1) : this._totalTime / this.totalDuration()
        }, k.time = function (a, b)
        {
            return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
        }, k.duration = function (b)
        {
            return arguments.length ? a.prototype.duration.call(this, b) : this._duration
        }, k.totalDuration = function (a)
        {
            return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, k.repeat = function (a)
        {
            return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, k.repeatDelay = function (a)
        {
            return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, k.yoyo = function (a)
        {
            return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, f
    }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c)
    {
        var d = function (a)
        {
            b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
            var c, d, e = this.vars;
            for (d in e)c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
            i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
        }, e = 1e-10, f = c._internals, g = d._internals = {}, h = f.isSelector, i = f.isArray, j = f.lazyTweens, k = f.lazyRender, l = _gsScope._gsDefine.globals, m = function (a)
        {
            var b, c = {};
            for (b in a)c[b] = a[b];
            return c
        }, n = function (a, b, c)
        {
            var d, e, f = a.cycle;
            for (d in f)e = f[d], a[d] = "function" == typeof e ? e.call(b[c], c) : e[c % e.length];
            delete a.cycle
        }, o = g.pauseCallback = function ()
        {
        }, p = function (a)
        {
            var b, c = [], d = a.length;
            for (b = 0; b !== d; c.push(a[b++]));
            return c
        }, q = d.prototype = new b;
        return d.version = "1.18.2", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function (a, b, d, e)
        {
            var f = d.repeat && l.TweenMax || c;
            return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
        }, q.from = function (a, b, d, e)
        {
            return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e)
        }, q.fromTo = function (a, b, d, e, f)
        {
            var g = e.repeat && l.TweenMax || c;
            return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
        }, q.staggerTo = function (a, b, e, f, g, i, j, k)
        {
            var l, o, q = new d({
                onComplete: i,
                onCompleteParams: j,
                callbackScope: k,
                smoothChildTiming: this.smoothChildTiming
            }), r = e.cycle;
            for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++)l = m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a, o)), r && n(l, a, o), q.to(a[o], b, l, o * f);
            return this.add(q, g)
        }, q.staggerFrom = function (a, b, c, d, e, f, g, h)
        {
            return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
        }, q.staggerFromTo = function (a, b, c, d, e, f, g, h, i)
        {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
        }, q.call = function (a, b, d, e)
        {
            return this.add(c.delayedCall(0, a, b, d), e)
        }, q.set = function (a, b, d)
        {
            return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
        }, d.exportRoot = function (a, b)
        {
            a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            var e, f, g = new d(a), h = g._timeline;
            for (null == b && (b = !0), h._remove(g, !0), g._startTime = 0, g._rawPrevTime = g._time = g._totalTime = h._time, e = h._first; e;)f = e._next, b && e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e._delay), e = f;
            return h.add(g, 0), g
        }, q.add = function (e, f, g, h)
        {
            var j, k, l, m, n, o;
            if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a))
            {
                if (e instanceof Array || e && e.push && i(e))
                {
                    for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++)i(m = e[l]) && (m = new d({tweens: m})), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
                    return this._uncache(!0)
                }
                if ("string" == typeof e)return this.addLabel(e, f);
                if ("function" != typeof e)throw"Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                e = c.delayedCall(0, e)
            }
            if (b.prototype.add.call(this, e, f), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())for (n = this, o = n.rawTime() > e._startTime; n._timeline;)o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
            return this
        }, q.remove = function (b)
        {
            if (b instanceof a)
            {
                this._remove(b, !1);
                var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
                return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
            }
            if (b instanceof Array || b && b.push && i(b))
            {
                for (var d = b.length; --d > -1;)this.remove(b[d]);
                return this
            }
            return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
        }, q._remove = function (a, c)
        {
            b.prototype._remove.call(this, a, c);
            var d = this._last;
            return d ? this._time > d._startTime + d._totalDuration / d._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, q.append = function (a, b)
        {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
        }, q.insert = q.insertMultiple = function (a, b, c, d)
        {
            return this.add(a, b || 0, c, d)
        }, q.appendMultiple = function (a, b, c, d)
        {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
        }, q.addLabel = function (a, b)
        {
            return this._labels[a] = this._parseTimeOrLabel(b), this
        }, q.addPause = function (a, b, d, e)
        {
            var f = c.delayedCall(0, o, d, e || this);
            return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a)
        }, q.removeLabel = function (a)
        {
            return delete this._labels[a], this
        }, q.getLabelTime = function (a)
        {
            return null != this._labels[a] ? this._labels[a] : -1
        }, q._parseTimeOrLabel = function (b, c, d, e)
        {
            var f;
            if (e instanceof a && e.timeline === this)this.remove(e); else if (e && (e instanceof Array || e.push && i(e)))for (f = e.length; --f > -1;)e[f]instanceof a && e[f].timeline === this && this.remove(e[f]);
            if ("string" == typeof c)return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - this.duration() : 0, d);
            if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b])null == b && (b = this.duration()); else
            {
                if (f = b.indexOf("="), -1 === f)return null == this._labels[b] ? d ? this._labels[b] = this.duration() + c : c : this._labels[b] + c;
                c = parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1)), b = f > 1 ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d) : this.duration()
            }
            return Number(b) + c
        }, q.seek = function (a, b)
        {
            return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
        }, q.stop = function ()
        {
            return this.paused(!0)
        }, q.gotoAndPlay = function (a, b)
        {
            return this.play(a, b)
        }, q.gotoAndStop = function (a, b)
        {
            return this.pause(a, b)
        }, q.render = function (a, b, c)
        {
            this._gc && this._enabled(!0, !1);
            var d, f, g, h, i, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration, o = this._time, p = this._startTime, q = this._timeScale, r = this._paused;
            if (a >= n - 1e-7)this._totalTime = this._time = n, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = n + 1e-4; else if (1e-7 > a)if (this._totalTime = this._time = 0, (0 !== o || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a)this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a; else
            {
                if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)for (d = this._first; d && 0 === d._startTime;)d._duration || (f = !1), d = d._next;
                a = 0, this._initted || (i = !0)
            } else
            {
                if (this._hasPause && !this._forcingPlayhead && !b)
                {
                    if (a >= o)for (d = this._first; d && d._startTime <= a && !l;)d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (l = d), d = d._next; else for (d = this._last; d && d._startTime >= a && !l;)d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev;
                    l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = a
            }
            if (this._time !== o && this._first || c || i || l)
            {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== o && a > 0 && (this._active = !0), 0 === o && this.vars.onStart && 0 !== this._time && (b || this._callback("onStart")), m = this._time, m >= o)for (d = this._first; d && (g = d._next, m === this._time && (!this._paused || r));)(d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g; else for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused || r));)
                {
                    if (d._active || d._startTime <= o && !d._paused && !d._gc)
                    {
                        if (l === d)
                        {
                            for (l = d._prev; l && l.endTime() > this._time;)l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c), l = l._prev;
                            l = null, this.pause()
                        }
                        d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                    }
                    d = g
                }
                this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || n >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this._callback(h)))
            }
        }, q._hasPausedChild = function ()
        {
            for (var a = this._first; a;)
            {
                if (a._paused || a instanceof d && a._hasPausedChild())return !0;
                a = a._next
            }
            return !1
        }, q.getChildren = function (a, b, d, e)
        {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g;)g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
            return f
        }, q.getTweensOf = function (a, b)
        {
            var d, e, f = this._gc, g = [], h = 0;
            for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;)(d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
            return f && this._enabled(!1, !0), g
        }, q.recent = function ()
        {
            return this._recent
        }, q._contains = function (a)
        {
            for (var b = a.timeline; b;)
            {
                if (b === this)return !0;
                b = b.timeline
            }
            return !1
        }, q.shiftChildren = function (a, b, c)
        {
            c = c || 0;
            for (var d, e = this._first, f = this._labels; e;)e._startTime >= c && (e._startTime += a), e = e._next;
            if (b)for (d in f)f[d] >= c && (f[d] += a);
            return this._uncache(!0)
        }, q._kill = function (a, b)
        {
            if (!a && !b)return this._enabled(!1, !1);
            for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;)c[d]._kill(a, b) && (e = !0);
            return e
        }, q.clear = function (a)
        {
            var b = this.getChildren(!1, !0, !0), c = b.length;
            for (this._time = this._totalTime = 0; --c > -1;)b[c]._enabled(!1, !1);
            return a !== !1 && (this._labels = {}), this._uncache(!0)
        }, q.invalidate = function ()
        {
            for (var b = this._first; b;)b.invalidate(), b = b._next;
            return a.prototype.invalidate.call(this)
        }, q._enabled = function (a, c)
        {
            if (a === this._gc)for (var d = this._first; d;)d._enabled(a, !0), d = d._next;
            return b.prototype._enabled.call(this, a, c)
        }, q.totalTime = function (b, c, d)
        {
            this._forcingPlayhead = !0;
            var e = a.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, e
        }, q.duration = function (a)
        {
            return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
        }, q.totalDuration = function (a)
        {
            if (!arguments.length)
            {
                if (this._dirty)
                {
                    for (var b, c, d = 0, e = this._last, f = 999999999999; e;)b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, e._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
                    this._duration = this._totalDuration = d, this._dirty = !1
                }
                return this._totalDuration
            }
            return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
        }, q.paused = function (b)
        {
            if (!b)for (var c = this._first, d = this._time; c;)c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next;
            return a.prototype.paused.apply(this, arguments)
        }, q.usesFrames = function ()
        {
            for (var b = this._timeline; b._timeline;)b = b._timeline;
            return b === a._rootFramesTimeline
        }, q.rawTime = function ()
        {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, d
    }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (a, b, c)
    {
        var d = function (b)
        {
            a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
        }, e = 1e-10, f = b._internals, g = f.lazyTweens, h = f.lazyRender, i = new c(null, null, 1, 0), j = d.prototype = new a;
        return j.constructor = d, j.kill()._gc = !1, d.version = "1.18.2", j.invalidate = function ()
        {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this)
        }, j.addCallback = function (a, c, d, e)
        {
            return this.add(b.delayedCall(0, a, d, e), c)
        }, j.removeCallback = function (a, b)
        {
            if (a)if (null == b)this._kill(null, a); else for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;)c[d]._startTime === e && c[d]._enabled(!1, !1);
            return this
        }, j.removePause = function (b)
        {
            return this.removeCallback(a._internals.pauseCallback, b)
        }, j.tweenTo = function (a, c)
        {
            c = c || {};
            var d, e, f, g = {ease: i, useFrames: this.usesFrames(), immediateRender: !1};
            for (e in c)g[e] = c[e];
            return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001, f = new b(this, d, g), g.onStart = function ()
            {
                f.target.paused(!0), f.vars.time !== f.target.time() && d === f.duration() && f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale), c.onStart && f._callback("onStart")
            }, f
        }, j.tweenFromTo = function (a, b, c)
        {
            c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = {
                onComplete: this.seek,
                onCompleteParams: [a],
                callbackScope: this
            }, c.immediateRender = c.immediateRender !== !1;
            var d = this.tweenTo(b, c);
            return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
        }, j.render = function (a, b, c)
        {
            this._gc && this._enabled(!0, !1);
            var d, f, i, j, k, l, m, n, o = this._dirty ? this.totalDuration() : this._totalDuration, p = this._duration, q = this._time, r = this._totalTime, s = this._startTime, t = this._timeScale, u = this._rawPrevTime, v = this._paused, w = this._cycle;
            if (a >= o - 1e-7)this._locked || (this._totalTime = o, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (f = !0, j = "onComplete", k = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || 0 > u || u === e) && u !== a && this._first && (k = !0, u > e && (j = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = p, a = p + 1e-4); else if (1e-7 > a)if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== q || 0 === p && u !== e && (u > 0 || 0 > a && u >= 0) && !this._locked) && (j = "onReverseComplete", f = this._reversed), 0 > a)this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (k = f = !0, j = "onReverseComplete") : u >= 0 && this._first && (k = !0), this._rawPrevTime = a; else
            {
                if (this._rawPrevTime = p || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)for (d = this._first; d && 0 === d._startTime;)d._duration || (f = !1), d = d._next;
                a = 0, this._initted || (k = !0)
            } else if (0 === p && 0 > u && (k = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (l = p + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, a = p + 1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this._hasPause && !this._forcingPlayhead && !b)
            {
                if (a = this._time, a >= q)for (d = this._first; d && d._startTime <= a && !m;)d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (m = d), d = d._next; else for (d = this._last; d && d._startTime >= a && !m;)d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d), d = d._prev;
                m && (this._time = a = m._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== w && !this._locked)
            {
                var x = this._yoyo && 0 !== (1 & w), y = x === (this._yoyo && 0 !== (1 & this._cycle)), z = this._totalTime, A = this._cycle, B = this._rawPrevTime, C = this._time;
                if (this._totalTime = w * p, this._cycle < w ? x = !x : this._totalTime += p, this._time = q, this._rawPrevTime = 0 === p ? u - 1e-4 : u, this._cycle = w, this._locked = !0, q = x ? 0 : p, this.render(q, b, 0 === p), b || this._gc || this.vars.onRepeat && this._callback("onRepeat"), q !== this._time)return;
                if (y && (q = x ? p + 1e-4 : -1e-4, this.render(q, !0, !1)), this._locked = !1, this._paused && !v)return;
                this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B
            }
            if (!(this._time !== q && this._first || c || k || m))return void(r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
            if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== r && a > 0 && (this._active = !0), 0 === r && this.vars.onStart && 0 !== this._totalTime && (b || this._callback("onStart")), n = this._time, n >= q)for (d = this._first; d && (i = d._next, n === this._time && (!this._paused || v));)(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (m === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = i; else for (d = this._last; d && (i = d._prev, n === this._time && (!this._paused || v));)
            {
                if (d._active || d._startTime <= q && !d._paused && !d._gc)
                {
                    if (m === d)
                    {
                        for (m = d._prev; m && m.endTime() > this._time;)m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c), m = m._prev;
                        m = null, this.pause()
                    }
                    d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                }
                d = i
            }
            this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), j && (this._locked || this._gc || (s === this._startTime || t !== this._timeScale) && (0 === this._time || o >= this.totalDuration()) && (f && (g.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[j] && this._callback(j)))
        }, j.getActive = function (a, b, c)
        {
            null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
            var d, e, f = [], g = this.getChildren(a, b, c), h = 0, i = g.length;
            for (d = 0; i > d; d++)e = g[d], e.isActive() && (f[h++] = e);
            return f
        }, j.getLabelAfter = function (a)
        {
            a || 0 !== a && (a = this._time);
            var b, c = this.getLabelsArray(), d = c.length;
            for (b = 0; d > b; b++)if (c[b].time > a)return c[b].name;
            return null
        }, j.getLabelBefore = function (a)
        {
            null == a && (a = this._time);
            for (var b = this.getLabelsArray(), c = b.length; --c > -1;)if (b[c].time < a)return b[c].name;
            return null
        }, j.getLabelsArray = function ()
        {
            var a, b = [], c = 0;
            for (a in this._labels)b[c++] = {time: this._labels[a], name: a};
            return b.sort(function (a, b)
            {
                return a.time - b.time
            }), b
        }, j.progress = function (a, b)
        {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
        }, j.totalProgress = function (a, b)
        {
            return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
        }, j.totalDuration = function (b)
        {
            return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, j.time = function (a, b)
        {
            return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
        }, j.repeat = function (a)
        {
            return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, j.repeatDelay = function (a)
        {
            return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, j.yoyo = function (a)
        {
            return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, j.currentLabel = function (a)
        {
            return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
        }, d
    }, !0), function ()
    {
        var a = 180 / Math.PI, b = [], c = [], d = [], e = {}, f = _gsScope._gsDefine.globals, g = function (a, b, c, d)
        {
            this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a
        }, h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", i = function (a, b, c, d)
        {
            var e = {a: a}, f = {}, g = {}, h = {c: d}, i = (a + b) / 2, j = (b + c) / 2, k = (c + d) / 2, l = (i + j) / 2, m = (j + k) / 2, n = (m - l) / 8;
            return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
        }, j = function (a, e, f, g, h)
        {
            var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1, x = 0, y = a[0].a;
            for (j = 0; w > j; j++)n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j], v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5, p = l + (m - l) * e * .5, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, 0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y - k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++, y = p;
            n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y - n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]))
        }, k = function (a, d, e, f)
        {
            var h, i, j, k, l, m, n = [];
            if (f)for (a = [f].concat(a), i = a.length; --i > -1;)"string" == typeof(m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
            if (h = a.length - 2, 0 > h)return n[0] = new g(a[0][d], 0, 0, a[-1 > h ? 0 : 1][d]), n;
            for (i = 0; h > i; i++)j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k));
            return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n
        }, l = function (a, f, g, i, l, m)
        {
            var n, o, p, q, r, s, t, u, v = {}, w = [], x = m || a[0];
            l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);
            for (o in a[0])w.push(o);
            if (a.length > 1)
            {
                for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;)if (o = w[n], Math.abs(x[o] - u[o]) > .05)
                {
                    t = !1;
                    break
                }
                t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
            }
            for (b.length = c.length = d.length = 0, n = w.length; --n > -1;)o = w[n], e[o] = -1 !== l.indexOf("," + o + ","), v[o] = k(a, o, e[o], m);
            for (n = b.length; --n > -1;)b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]);
            if (!i)
            {
                for (n = w.length; --n > -1;)if (e[o])for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++)r = p[q + 1].da / c[q] + p[q].da / b[q], d[q] = (d[q] || 0) + r * r;
                for (n = d.length; --n > -1;)d[n] = Math.sqrt(d[n])
            }
            for (n = w.length, q = g ? 4 : 1; --n > -1;)o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (p.splice(0, q), p.splice(p.length - q, q));
            return v
        }, m = function (a, b, c)
        {
            b = b || "soft";
            var d, e, f, h, i, j, k, l, m, n, o, p = {}, q = "cubic" === b ? 3 : 2, r = "soft" === b, s = [];
            if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1)throw"invalid Bezier data";
            for (m in a[0])s.push(m);
            for (j = s.length; --j > -1;)
            {
                for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++)d = null == c ? a[k][m] : "string" == typeof(o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2), i[n++] = d;
                for (l = n - q + 1, n = 0, k = 0; l > k; k += q)d = i[k], e = i[k + 1], f = i[k + 2], h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
                i.length = n
            }
            return p
        }, n = function (a, b, c)
        {
            for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++)j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d
        }, o = function (a, b)
        {
            b = b >> 0 || 6;
            var c, d, e, f, g = [], h = [], i = 0, j = 0, k = b - 1, l = [], m = [];
            for (c in a)n(a[c], g, b);
            for (e = g.length, d = 0; e > d; d++)i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
            return {length: j, lengths: h, segments: l}
        }, p = _gsScope._gsDefine.plugin({
            propName: "bezier", priority: -1, version: "1.3.4", API: 2, global: !0, init: function (a, b, c)
            {
                this._target = a, b instanceof Array && (b = {values: b}), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
                var d, e, f, g, h, i = b.values || [], j = {}, k = i[0], n = b.autoRotate || c.vars.orientToBezier;
                this._autoRotate = n ? n instanceof Array ? n : [["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]] : null;
                for (d in k)this._props.push(d);
                for (f = this._props.length; --f > -1;)d = this._props[f], this._overwriteProps.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h = j);
                if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes)
                {
                    var p = o(this._beziers, this._timeRes);
                    this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                }
                if (n = this._autoRotate)for (this._initialRotations = [], n[0]instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;)
                {
                    for (g = 0; 3 > g; g++)d = n[f][g], this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
                    d = n[f][2], this._initialRotations[f] = this._func[d] ? this._func[d].call(this._target) : this._target[d]
                }
                return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
            }, set: function (b)
            {
                var c, d, e, f, g, h, i, j, k, l, m = this._segCount, n = this._func, o = this._target, p = b !== this._startRatio;
                if (this._timeRes)
                {
                    if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e)
                    {
                        for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;);
                        this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e], this._s2 = l[this._s1 = this._si = 0]
                    } else if (b < this._l1 && e > 0)
                    {
                        for (; e > 0 && (this._l1 = k[--e]) >= b;);
                        0 === e && b < this._l1 ? this._l1 = 0 : e++, this._l2 = k[e], this._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this._si = l.length - 1) - 1] || 0, this._s2 = l[this._si]
                    }
                    if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1)
                    {
                        for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;);
                        this._s1 = l[e - 1], this._si = e
                    } else if (b < this._s1 && e > 0)
                    {
                        for (; e > 0 && (this._s1 = l[--e]) >= b;);
                        0 === e && b < this._s1 ? this._s1 = 0 : e++, this._s2 = l[e], this._si = e
                    }
                    h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec
                } else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m;
                for (d = 1 - h, e = this._props.length; --e > -1;)f = this._props[e], g = this._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a, this._round[f] && (i = Math.round(i)), n[f] ? o[f](i) : o[f] = i;
                if (this._autoRotate)
                {
                    var q, r, s, t, u, v, w, x = this._autoRotate;
                    for (e = x.length; --e > -1;)f = x[e][2], v = x[e][3] || 0, w = x[e][4] === !0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], n[f] ? o[f](i) : o[f] = i)
                }
            }
        }), q = p.prototype;
        p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function (a, b, c)
        {
            return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
        }, p._cssRegister = function ()
        {
            var a = f.CSSPlugin;
            if (a)
            {
                var b = a._internals, c = b._parseToProxy, d = b._setPluginRatio, e = b.CSSPropTween;
                b._registerComplexSpecialProp("bezier", {
                    parser: function (a, b, f, g, h, i)
                    {
                        b instanceof Array && (b = {values: b}), i = new p;
                        var j, k, l, m = b.values, n = m.length - 1, o = [], q = {};
                        if (0 > n)return h;
                        for (j = 0; n >= j; j++)l = c(a, m[j], g, h, i, n !== j), o[j] = l.end;
                        for (k in b)q[k] = b[k];
                        return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [["left", "top", "rotation", j, !1]] : null != l.end.x ? [["x", "y", "rotation", j, !1]] : !1), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform), i._onInitTween(l.proxy, q, g._tween), h
                    }
                })
            }
        }, q._roundProps = function (a, b)
        {
            for (var c = this._overwriteProps, d = c.length; --d > -1;)(a[c[d]] || a.bezier || a.bezierThrough) && (this._round[c[d]] = b)
        }, q._kill = function (a)
        {
            var b, c, d = this._props;
            for (b in this._beziers)if (b in a)for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;)d[c] === b && d.splice(c, 1);
            return this._super._kill.call(this, a)
        }
    }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b)
    {
        var c, d, e, f, g = function ()
        {
            a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio
        }, h = _gsScope._gsDefine.globals, i = {}, j = g.prototype = new a("css");
        j.constructor = g, g.version = "1.18.2", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
            top: j,
            right: j,
            bottom: j,
            left: j,
            width: j,
            height: j,
            fontSize: j,
            padding: j,
            margin: j,
            perspective: j,
            lineHeight: ""
        };
        var k, l, m, n, o, p, q = /(?:\d|\-\d|\.\d|\-\.\d)+/g, r = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, s = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, t = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, u = /(?:\d|\-|\+|=|#|\.)*/g, v = /opacity *= *([^)]*)/i, w = /opacity:([^;]*)/i, x = /alpha\(opacity *=.+?\)/i, y = /^(rgb|hsl)/, z = /([A-Z])/g, A = /-([a-z])/gi, B = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, C = function (a, b)
        {
            return b.toUpperCase()
        }, D = /(?:Left|Right|Width)/i, E = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, F = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, G = /,(?=[^\)]*(?:\(|$))/gi, H = Math.PI / 180, I = 180 / Math.PI, J = {}, K = document, L = function (a)
        {
            return K.createElementNS ? K.createElementNS("http://www.w3.org/1999/xhtml", a) : K.createElement(a)
        }, M = L("div"), N = L("img"), O = g._internals = {_specialProps: i}, P = navigator.userAgent, Q = function ()
        {
            var a = P.indexOf("Android"), b = L("a");
            return m = -1 !== P.indexOf("Safari") && -1 === P.indexOf("Chrome") && (-1 === a || Number(P.substr(a + 8, 1)) > 3), o = m && Number(P.substr(P.indexOf("Version/") + 8, 1)) < 6, n = -1 !== P.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(P) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(P)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1
        }(), R = function (a)
        {
            return v.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }, S = function (a)
        {
            window.console && console.log(a)
        }, T = "", U = "", V = function (a, b)
        {
            b = b || M;
            var c, d, e = b.style;
            if (void 0 !== e[a])return a;
            for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];);
            return d >= 0 ? (U = 3 === d ? "ms" : c[d], T = "-" + U.toLowerCase() + "-", U + a) : null
        }, W = K.defaultView ? K.defaultView.getComputedStyle : function ()
        {
        }, X = g.getStyle = function (a, b, c, d, e)
        {
            var f;
            return Q || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || W(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(z, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : R(a)
        }, Y = O.convertToPixels = function (a, c, d, e, f)
        {
            if ("px" === e || !e)return d;
            if ("auto" === e || !d)return 0;
            var h, i, j, k = D.test(c), l = a, m = M.style, n = 0 > d;
            if (n && (d = -d), "%" === e && -1 !== c.indexOf("border"))h = d / 100 * (k ? a.clientWidth : a.clientHeight); else
            {
                if (m.cssText = "border:0 solid red;position:" + X(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e)m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e; else
                {
                    if (l = a.parentNode || K.body, i = l._gsCache, j = b.ticker.frame, i && k && i.time === j)return i.width * d / 100;
                    m[k ? "width" : "height"] = d + e
                }
                l.appendChild(M), h = parseFloat(M[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(M), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = Y(a, c, d, e, !0))
            }
            return n ? -h : h
        }, Z = O.calculateOffset = function (a, b, c)
        {
            if ("absolute" !== X(a, "position", c))return 0;
            var d = "left" === b ? "Left" : "Top", e = X(a, "margin" + d, c);
            return a["offset" + d] - (Y(a, b, parseFloat(e), e.replace(u, "")) || 0)
        }, $ = function (a, b)
        {
            var c, d, e, f = {};
            if (b = b || W(a, null))if (c = b.length)for (; --c > -1;)e = b[c], (-1 === e.indexOf("-transform") || za === e) && (f[e.replace(A, C)] = b.getPropertyValue(e)); else for (c in b)(-1 === c.indexOf("Transform") || ya === c) && (f[c] = b[c]); else if (b = a.currentStyle || a.style)for (c in b)"string" == typeof c && void 0 === f[c] && (f[c.replace(A, C)] = b[c]);
            return Q || (f.opacity = R(a)), d = La(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Ba && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f
        }, _ = function (a, b, c, d, e)
        {
            var f, g, h, i = {}, j = a.style;
            for (g in c)"cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(t, "") ? f : 0 : Z(a, g), void 0 !== j[g] && (h = new oa(j, g, j[g], h)));
            if (d)for (g in d)"className" !== g && (i[g] = d[g]);
            return {difs: i, firstMPT: h}
        }, aa = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        }, ba = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ca = function (a, b, c)
        {
            var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight), e = aa[b], f = e.length;
            for (c = c || W(a, null); --f > -1;)d -= parseFloat(X(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(X(a, "border" + e[f] + "Width", c, !0)) || 0;
            return d
        }, da = function (a, b)
        {
            if ("contain" === a || "auto" === a || "auto auto" === a)return a + " ";
            (null == a || "" === a) && (a = "0 0");
            var c = a.split(" "), d = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : c[0], e = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : c[1];
            return null == e ? e = "center" === d ? "50%" : "0" : "center" === e && (e = "50%"), ("center" === d || isNaN(parseFloat(d)) && -1 === (d + "").indexOf("=")) && (d = "50%"), a = d + " " + e + (c.length > 2 ? " " + c[2] : ""), b && (b.oxp = -1 !== d.indexOf("%"), b.oyp = -1 !== e.indexOf("%"), b.oxr = "=" === d.charAt(1), b.oyr = "=" === e.charAt(1), b.ox = parseFloat(d.replace(t, "")), b.oy = parseFloat(e.replace(t, "")), b.v = a), b || a
        }, ea = function (a, b)
        {
            return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b)
        }, fa = function (a, b)
        {
            return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a)
        }, ga = function (a, b, c, d)
        {
            var e, f, g, h, i, j = 1e-6;
            return null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : I) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h
        }, ha = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        }, ia = function (a, b, c)
        {
            return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
        }, ja = g.parseColor = function (a, b)
        {
            var c, d, e, f, g, h, i, j, k, l, m;
            if (a)if ("number" == typeof a)c = [a >> 16, a >> 8 & 255, 255 & a]; else
            {
                if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), ha[a])c = ha[a]; else if ("#" === a.charAt(0))4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a]; else if ("hsl" === a.substr(0, 3))if (c = m = a.match(q), b)
                {
                    if (-1 !== a.indexOf("="))return a.match(r)
                } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(a[3])), c[0] = ia(g + 1 / 3, d, e), c[1] = ia(g, d, e), c[2] = ia(g - 1 / 3, d, e); else c = a.match(q) || ha.transparent;
                c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]))
            } else c = ha.black;
            return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
        }, ka = function (a, b)
        {
            var c, d, e, f = a.match(la) || [], g = 0, h = f.length ? "" : a;
            for (c = 0; c < f.length; c++)d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = ja(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
            return h
        }, la = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (j in ha)la += "|" + j + "\\b";
        la = new RegExp(la + ")", "gi"), g.colorStringFilter = function (a)
        {
            var b, c = a[0] + a[1];
            la.lastIndex = 0, la.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = ka(a[0], b), a[1] = ka(a[1], b))
        }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
        var ma = function (a, b, c, d)
        {
            if (null == a)return function (a)
            {
                return a
            };
            var e, f = b ? (a.match(la) || [""])[0] : "", g = a.split(f).join("").match(s) || [], h = a.substr(0, a.indexOf(g[0])), i = ")" === a.charAt(a.length - 1) ? ")" : "", j = -1 !== a.indexOf(" ") ? " " : ",", k = g.length, l = k > 0 ? g[0].replace(q, "") : "";
            return k ? e = b ? function (a)
            {
                var b, m, n, o;
                if ("number" == typeof a)a += l; else if (d && G.test(a))
                {
                    for (o = a.replace(G, "|").split("|"), n = 0; n < o.length; n++)o[n] = e(o[n]);
                    return o.join(",")
                }
                if (b = (a.match(la) || [f])[0], m = a.split(b).join("").match(s) || [], n = m.length, k > n--)for (; ++n < k;)m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
                return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
            } : function (a)
            {
                var b, f, m;
                if ("number" == typeof a)a += l; else if (d && G.test(a))
                {
                    for (f = a.replace(G, "|").split("|"), m = 0; m < f.length; m++)f[m] = e(f[m]);
                    return f.join(",")
                }
                if (b = a.match(s) || [], m = b.length, k > m--)for (; ++m < k;)b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
                return h + b.join(j) + i
            } : function (a)
            {
                return a
            }
        }, na = function (a)
        {
            return a = a.split(","), function (b, c, d, e, f, g, h)
            {
                var i, j = (c + "").split(" ");
                for (h = {}, i = 0; 4 > i; i++)h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                return e.parse(b, h, f, g)
            }
        }, oa = (O._setPluginRatio = function (a)
        {
            this.plugin.setRatio(a);
            for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;)b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next;
            if (g.autoRotate && (g.autoRotate.rotation = h.rotation), 1 === a || 0 === a)for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;)
            {
                if (c = i.t, c.type)
                {
                    if (1 === c.type)
                    {
                        for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++)e += c["xn" + d] + c["xs" + (d + 1)];
                        c[f] = e
                    }
                } else c[f] = c.s + c.xs0;
                i = i._next
            }
        }, function (a, b, c, d, e)
        {
            this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d)
        }), pa = (O._parseToProxy = function (a, b, c, d, e, f)
        {
            var g, h, i, j, k, l = d, m = {}, n = {}, o = c._transform, p = J;
            for (c._transform = null, J = b, d = k = c.parse(a, b, d, e), J = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;)
            {
                if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new oa(d, "s", h, j, d.r), d.c = 0), 1 === d.type))for (g = d.l; --g > 0;)i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new oa(d, i, h, j, d.rxp[i]));
                d = d._next
            }
            return {proxy: m, end: n, firstMPT: j, pt: k}
        }, O.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m)
        {
            this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof pa || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this)
        }), qa = function (a, b, c, d, e, f)
        {
            var g = new pa(a, b, c, d - c, e, -1, f);
            return g.b = c, g.e = g.xs0 = d, g
        }, ra = g.parseComplex = function (a, b, c, d, e, f, g, h, i, j)
        {
            c = c || f || "", g = new pa(a, b, 0, 0, g, j ? 2 : 1, null, !1, h, c, d), d += "";
            var l, m, n, o, p, s, t, u, v, w, x, y, z, A = c.split(", ").join(",").split(" "), B = d.split(", ").join(",").split(" "), C = A.length, D = k !== !1;
            for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (A = A.join(" ").replace(G, ", ").split(" "), B = B.join(" ").replace(G, ", ").split(" "), C = A.length), C !== B.length && (A = (f || "").split(" "), C = A.length), g.plugin = i, g.setRatio = j, la.lastIndex = 0, l = 0; C > l; l++)if (o = A[l], p = B[l], u = parseFloat(o), u || 0 === u)g.appendXtra("", u, ea(p, u), p.replace(r, ""), D && -1 !== p.indexOf("px"), !0); else if (e && la.test(o))y = "," === p.charAt(p.length - 1) ? ")," : ")", z = -1 !== p.indexOf("hsl") && Q, o = ja(o, z), p = ja(p, z), v = o.length + p.length > 6, v && !Q && 0 === p[3] ? (g["xs" + g.l] += g.l ? " transparent" : "transparent", g.e = g.e.split(B[l]).join("transparent")) : (Q || (v = !1), z ? g.appendXtra(v ? "hsla(" : "hsl(", o[0], ea(p[0], o[0]), ",", !1, !0).appendXtra("", o[1], ea(p[1], o[1]), "%,", !1).appendXtra("", o[2], ea(p[2], o[2]), v ? "%," : "%" + y, !1) : g.appendXtra(v ? "rgba(" : "rgb(", o[0], p[0] - o[0], ",", !0, !0).appendXtra("", o[1], p[1] - o[1], ",", !0).appendXtra("", o[2], p[2] - o[2], v ? "," : y, !0), v && (o = o.length < 4 ? 1 : o[3], g.appendXtra("", o, (p.length < 4 ? 1 : p[3]) - o, y, !1))), la.lastIndex = 0; else if (s = o.match(q))
            {
                if (t = p.match(r), !t || t.length !== s.length)return g;
                for (n = 0, m = 0; m < s.length; m++)x = s[m], w = o.indexOf(x, n), g.appendXtra(o.substr(n, w - n), Number(x), ea(t[m], x), "", D && "px" === o.substr(w + x.length, 2), 0 === m), n = w + x.length;
                g["xs" + g.l] += o.substr(n)
            } else g["xs" + g.l] += g.l ? " " + p : p;
            if (-1 !== d.indexOf("=") && g.data)
            {
                for (y = g.xs0 + g.data.s, l = 1; l < g.l; l++)y += g["xs" + l] + g.data["xn" + l];
                g.e = y + g["xs" + l]
            }
            return g.l || (g.type = -1, g.xs0 = g.e), g.xfirst || g
        }, sa = 9;
        for (j = pa.prototype, j.l = j.pr = 0; --sa > 0;)j["xn" + sa] = 0, j["xs" + sa] = "";
        j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function (a, b, c, d, e, f)
        {
            var g = this, h = g.l;
            return g["xs" + h] += f && h ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new pa(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {s: b + c}, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
        };
        var ta = function (a, b)
        {
            b = b || {}, this.p = b.prefix ? V(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || ma(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
        }, ua = O._registerComplexSpecialProp = function (a, b, c)
        {
            "object" != typeof b && (b = {parser: c});
            var d, e, f = a.split(","), g = b.defaultValue;
            for (c = c || [g], d = 0; d < f.length; d++)b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new ta(f[d], b)
        }, va = function (a)
        {
            if (!i[a])
            {
                var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                ua(a, {
                    parser: function (a, c, d, e, f, g, j)
                    {
                        var k = h.com.greensock.plugins[b];
                        return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (S("Error: " + b + " js file not loaded."), f)
                    }
                })
            }
        };
        j = ta.prototype, j.parseComplex = function (a, b, c, d, e, f)
        {
            var g, h, i, j, k, l, m = this.keyword;
            if (this.multi && (G.test(c) || G.test(b) ? (h = b.replace(G, "|").split("|"), i = c.replace(G, "|").split("|")) : m && (h = [b], i = [c])), i)
            {
                for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++)b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
                b = h.join(", "), c = i.join(", ")
            }
            return ra(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
        }, j.parse = function (a, b, c, d, f, g, h)
        {
            return this.parseComplex(a.style, this.format(X(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
        }, g.registerSpecialProp = function (a, b, c)
        {
            ua(a, {
                parser: function (a, d, e, f, g, h, i)
                {
                    var j = new pa(a, e, 0, 0, g, 2, e, !1, c);
                    return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
                }, priority: c
            })
        }, g.useSVGTransformAttr = m || n;
        var wa, xa = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), ya = V("transform"), za = T + "transform", Aa = V("transformOrigin"), Ba = null !== V("perspective"), Ca = O.Transform = function ()
        {
            this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Ba ? g.defaultForce3D || "auto" : !1
        }, Da = window.SVGElement, Ea = function (a, b, c)
        {
            var d, e = K.createElementNS("http://www.w3.org/2000/svg", a), f = /([a-z])([A-Z])/g;
            for (d in c)e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
            return b.appendChild(e), e
        }, Fa = K.documentElement, Ga = function ()
        {
            var a, b, c, d = p || /Android/i.test(P) && !window.chrome;
            return K.createElementNS && !d && (a = Ea("svg", Fa), b = Ea("rect", a, {
                width: 100,
                height: 50,
                x: 100
            }), c = b.getBoundingClientRect().width, b.style[Aa] = "50% 50%", b.style[ya] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Ba), Fa.removeChild(a)), d
        }(), Ha = function (a, b, c, d, e)
        {
            var f, h, i, j, k, l, m, n, o, p, q, r, s, t, u = a._gsTransform, v = Ka(a, !0);
            u && (s = u.xOrigin, t = u.yOrigin), (!d || (f = d.split(" ")).length < 2) && (m = a.getBBox(), b = da(b).split(" "), f = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * m.width : parseFloat(b[0])) + m.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * m.height : parseFloat(b[1])) + m.y]), c.xOrigin = j = parseFloat(f[0]), c.yOrigin = k = parseFloat(f[1]), d && v !== Ja && (l = v[0], m = v[1], n = v[2], o = v[3], p = v[4], q = v[5], r = l * o - m * n, h = j * (o / r) + k * (-n / r) + (n * q - o * p) / r, i = j * (-m / r) + k * (l / r) - (l * q - m * p) / r, j = c.xOrigin = f[0] = h, k = c.yOrigin = f[1] = i), u && (e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (h = j - s, i = k - t, u.xOffset += h * v[0] + i * v[2] - h, u.yOffset += h * v[1] + i * v[3] - i) : u.xOffset = u.yOffset = 0), a.setAttribute("data-svg-origin", f.join(" "))
        }, Ia = function (a)
        {
            return !!(Da && "function" == typeof a.getBBox && a.getCTM && (!a.parentNode || a.parentNode.getBBox && a.parentNode.getCTM))
        }, Ja = [1, 0, 0, 1, 0, 0], Ka = function (a, b)
        {
            var c, d, e, f, g, h = a._gsTransform || new Ca, i = 1e5;
            if (ya ? d = X(a, za, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(E), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), h.x || 0, h.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, (h.svg || a.getBBox && Ia(a)) && (c && -1 !== (a.style[ya] + "").indexOf("matrix") && (d = a.style[ya], c = 0), e = a.getAttribute("transform"), c && e && (-1 !== e.indexOf("matrix") ? (d = e, c = 0) : -1 !== e.indexOf("translate") && (d = "matrix(1,0,0,1," + e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", c = 0))), c)return Ja;
            for (e = (d || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], sa = e.length; --sa > -1;)f = Number(e[sa]), e[sa] = (g = f - (f |= 0)) ? (g * i + (0 > g ? -.5 : .5) | 0) / i + f : f;
            return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
        }, La = O.getTransform = function (a, c, d, f)
        {
            if (a._gsTransform && d && !f)return a._gsTransform;
            var h, i, j, k, l, m, n = d ? a._gsTransform || new Ca : new Ca, o = n.scaleX < 0, p = 2e-5, q = 1e5, r = Ba ? parseFloat(X(a, Aa, c, !1, "0 0 0").split(" ")[2]) || n.zOrigin || 0 : 0, s = parseFloat(g.defaultTransformPerspective) || 0;
            if (n.svg = !(!a.getBBox || !Ia(a)), n.svg && (Ha(a, X(a, Aa, e, !1, "50% 50%") + "", n, a.getAttribute("data-svg-origin")), wa = g.useSVGTransformAttr || Ga), h = Ka(a), h !== Ja)
            {
                if (16 === h.length)
                {
                    var t, u, v, w, x, y = h[0], z = h[1], A = h[2], B = h[3], C = h[4], D = h[5], E = h[6], F = h[7], G = h[8], H = h[9], J = h[10], K = h[12], L = h[13], M = h[14], N = h[11], O = Math.atan2(E, J);
                    n.zOrigin && (M = -n.zOrigin, K = G * M - h[12], L = H * M - h[13], M = J * M + n.zOrigin - h[14]), n.rotationX = O * I, O && (w = Math.cos(-O), x = Math.sin(-O), t = C * w + G * x, u = D * w + H * x, v = E * w + J * x, G = C * -x + G * w, H = D * -x + H * w, J = E * -x + J * w, N = F * -x + N * w, C = t, D = u, E = v), O = Math.atan2(-A, J), n.rotationY = O * I, O && (w = Math.cos(-O), x = Math.sin(-O), t = y * w - G * x, u = z * w - H * x, v = A * w - J * x, H = z * x + H * w, J = A * x + J * w, N = B * x + N * w, y = t, z = u, A = v), O = Math.atan2(z, y), n.rotation = O * I, O && (w = Math.cos(-O), x = Math.sin(-O), y = y * w + C * x, u = z * w + D * x, D = z * -x + D * w, E = A * -x + E * w, z = u), n.rotationX && Math.abs(n.rotationX) + Math.abs(n.rotation) > 359.9 && (n.rotationX = n.rotation = 0, n.rotationY = 180 - n.rotationY), n.scaleX = (Math.sqrt(y * y + z * z) * q + .5 | 0) / q, n.scaleY = (Math.sqrt(D * D + H * H) * q + .5 | 0) / q, n.scaleZ = (Math.sqrt(E * E + J * J) * q + .5 | 0) / q, n.skewX = 0, n.perspective = N ? 1 / (0 > N ? -N : N) : 0, n.x = K, n.y = L, n.z = M, n.svg && (n.x -= n.xOrigin - (n.xOrigin * y - n.yOrigin * C), n.y -= n.yOrigin - (n.yOrigin * z - n.xOrigin * D))
                } else if ((!Ba || f || !h.length || n.x !== h[4] || n.y !== h[5] || !n.rotationX && !n.rotationY) && (void 0 === n.x || "none" !== X(a, "display", c)))
                {
                    var P = h.length >= 6, Q = P ? h[0] : 1, R = h[1] || 0, S = h[2] || 0, T = P ? h[3] : 1;
                    n.x = h[4] || 0, n.y = h[5] || 0, j = Math.sqrt(Q * Q + R * R), k = Math.sqrt(T * T + S * S), l = Q || R ? Math.atan2(R, Q) * I : n.rotation || 0, m = S || T ? Math.atan2(S, T) * I + l : n.skewX || 0, Math.abs(m) > 90 && Math.abs(m) < 270 && (o ? (j *= -1, m += 0 >= l ? 180 : -180, l += 0 >= l ? 180 : -180) : (k *= -1, m += 0 >= m ? 180 : -180)), n.scaleX = j, n.scaleY = k, n.rotation = l, n.skewX = m, Ba && (n.rotationX = n.rotationY = n.z = 0, n.perspective = s, n.scaleZ = 1), n.svg && (n.x -= n.xOrigin - (n.xOrigin * Q + n.yOrigin * S), n.y -= n.yOrigin - (n.xOrigin * R + n.yOrigin * T))
                }
                n.zOrigin = r;
                for (i in n)n[i] < p && n[i] > -p && (n[i] = 0)
            }
            return d && (a._gsTransform = n, n.svg && (wa && a.style[ya] ? b.delayedCall(.001, function ()
            {
                Pa(a.style, ya)
            }) : !wa && a.getAttribute("transform") && b.delayedCall(.001, function ()
            {
                a.removeAttribute("transform")
            }))), n
        }, Ma = function (a)
        {
            var b, c, d = this.data, e = -d.rotation * H, f = e + d.skewX * H, g = 1e5, h = (Math.cos(e) * d.scaleX * g | 0) / g, i = (Math.sin(e) * d.scaleX * g | 0) / g, j = (Math.sin(f) * -d.scaleY * g | 0) / g, k = (Math.cos(f) * d.scaleY * g | 0) / g, l = this.t.style, m = this.t.currentStyle;
            if (m)
            {
                c = i, i = -j, j = -c, b = m.filter, l.filter = "";
                var n, o, q = this.t.offsetWidth, r = this.t.offsetHeight, s = "absolute" !== m.position, t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k, w = d.x + q * d.xPercent / 100, x = d.y + r * d.yPercent / 100;
                if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, w += n - (n * h + o * i), x += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + w) + ", Dy=" + (o - (n * j + o * k) + x) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(F, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || v.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s)
                {
                    var y, z, A, B = 8 > p ? 1 : -1;
                    for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + w), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + x), sa = 0; 4 > sa; sa++)z = ba[sa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : Y(this.t, z, parseFloat(y), y.replace(u, "")) || 0, A = c !== d[z] ? 2 > sa ? -d.ieOffsetX : -d.ieOffsetY : 2 > sa ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === sa || 2 === sa ? 1 : B))) + "px"
                }
            }
        }, Na = O.set3DTransformRatio = O.setTransformRatio = function (a)
        {
            var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data, A = this.t.style, B = z.rotation, C = z.rotationX, D = z.rotationY, E = z.scaleX, F = z.scaleY, G = z.scaleZ, I = z.x, J = z.y, K = z.z, L = z.svg, M = z.perspective, N = z.force3D;
            if (((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !K && !M && !D && !C && 1 === G || wa && L || !Ba)return void(B || z.skewX || L ? (B *= H, x = z.skewX * H, y = 1e5, b = Math.cos(B) * E, e = Math.sin(B) * E, c = Math.sin(B - x) * -F, f = Math.cos(B - x) * F, x && "simple" === z.skewType && (s = Math.tan(x), s = Math.sqrt(1 + s * s), c *= s, f *= s, z.skewY && (b *= s, e *= s)), L && (I += z.xOrigin - (z.xOrigin * b + z.yOrigin * c) + z.xOffset, J += z.yOrigin - (z.xOrigin * e + z.yOrigin * f) + z.yOffset, wa && (z.xPercent || z.yPercent) && (p = this.t.getBBox(), I += .01 * z.xPercent * p.width, J += .01 * z.yPercent * p.height), p = 1e-6, p > I && I > -p && (I = 0), p > J && J > -p && (J = 0)), u = (b * y | 0) / y + "," + (e * y | 0) / y + "," + (c * y | 0) / y + "," + (f * y | 0) / y + "," + I + "," + J + ")", L && wa ? this.t.setAttribute("transform", "matrix(" + u) : A[ya] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[ya] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + I + "," + J + ")");
            if (n && (p = 1e-4, p > E && E > -p && (E = G = 2e-5), p > F && F > -p && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || z.skewX)B *= H, q = b = Math.cos(B), r = e = Math.sin(B), z.skewX && (B -= z.skewX * H, q = Math.cos(B), r = Math.sin(B), "simple" === z.skewType && (s = Math.tan(z.skewX * H), s = Math.sqrt(1 + s * s), q *= s, r *= s, z.skewY && (b *= s, e *= s))), c = -r, f = q; else
            {
                if (!(D || C || 1 !== G || M || L))return void(A[ya] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + I + "px," + J + "px," + K + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
                b = f = 1, c = e = 0
            }
            j = 1, d = g = h = i = k = l = 0, m = M ? -1 / M : 0, o = z.zOrigin, p = 1e-6, v = ",", w = "0", B = D * H, B && (q = Math.cos(B), r = Math.sin(B), h = -r, k = m * -r, d = b * r, g = e * r, j = q, m *= q, b *= q, e *= q), B = C * H, B && (q = Math.cos(B), r = Math.sin(B), s = c * q + d * r, t = f * q + g * r, i = j * r, l = m * r, d = c * -r + d * q, g = f * -r + g * q, j *= q, m *= q, c = s, f = t), 1 !== G && (d *= G, g *= G, j *= G, m *= G), 1 !== F && (c *= F, f *= F, i *= F, l *= F), 1 !== E && (b *= E, e *= E, h *= E, k *= E), (o || L) && (o && (I += d * -o, J += g * -o, K += j * -o + o), L && (I += z.xOrigin - (z.xOrigin * b + z.yOrigin * c) + z.xOffset, J += z.yOrigin - (z.xOrigin * e + z.yOrigin * f) + z.yOffset), p > I && I > -p && (I = w), p > J && J > -p && (J = w), p > K && K > -p && (K = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (p > b && b > -p ? w : b) + v + (p > e && e > -p ? w : e) + v + (p > h && h > -p ? w : h), u += v + (p > k && k > -p ? w : k) + v + (p > c && c > -p ? w : c) + v + (p > f && f > -p ? w : f), C || D || 1 !== G ? (u += v + (p > i && i > -p ? w : i) + v + (p > l && l > -p ? w : l) + v + (p > d && d > -p ? w : d), u += v + (p > g && g > -p ? w : g) + v + (p > j && j > -p ? w : j) + v + (p > m && m > -p ? w : m) + v) : u += ",0,0,0,0,1,0,", u += I + v + J + v + K + v + (M ? 1 + -K / M : 1) + ")", A[ya] = u
        };
        j = Ca.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, ua("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function (a, b, c, d, f, h, i)
            {
                if (d._lastParsedTransform === i)return f;
                d._lastParsedTransform = i;
                var j, k, l, m, n, o, p, q, r, s, t = a._gsTransform, u = a.style, v = 1e-6, w = xa.length, x = i, y = {}, z = "transformOrigin";
                if (i.display ? (m = X(a, "display"), u.display = "block", j = La(a, e, !0, i.parseTransform), u.display = m) : j = La(a, e, !0, i.parseTransform), d._transform = j, "string" == typeof x.transform && ya)m = M.style, m[ya] = x.transform, m.display = "block", m.position = "absolute", K.body.appendChild(M), k = La(M, null, !1), K.body.removeChild(M), k.perspective || (k.perspective = j.perspective), null != x.xPercent && (k.xPercent = fa(x.xPercent, j.xPercent)), null != x.yPercent && (k.yPercent = fa(x.yPercent, j.yPercent)); else if ("object" == typeof x)
                {
                    if (k = {
                            scaleX: fa(null != x.scaleX ? x.scaleX : x.scale, j.scaleX),
                            scaleY: fa(null != x.scaleY ? x.scaleY : x.scale, j.scaleY),
                            scaleZ: fa(x.scaleZ, j.scaleZ),
                            x: fa(x.x, j.x),
                            y: fa(x.y, j.y),
                            z: fa(x.z, j.z),
                            xPercent: fa(x.xPercent, j.xPercent),
                            yPercent: fa(x.yPercent, j.yPercent),
                            perspective: fa(x.transformPerspective, j.perspective)
                        }, q = x.directionalRotation, null != q)if ("object" == typeof q)for (m in q)x[m] = q[m]; else x.rotation = q;
                    "string" == typeof x.x && -1 !== x.x.indexOf("%") && (k.x = 0, k.xPercent = fa(x.x, j.xPercent)), "string" == typeof x.y && -1 !== x.y.indexOf("%") && (k.y = 0, k.yPercent = fa(x.y, j.yPercent)), k.rotation = ga("rotation"in x ? x.rotation : "shortRotation"in x ? x.shortRotation + "_short" : "rotationZ"in x ? x.rotationZ : j.rotation, j.rotation, "rotation", y), Ba && (k.rotationX = ga("rotationX"in x ? x.rotationX : "shortRotationX"in x ? x.shortRotationX + "_short" : j.rotationX || 0, j.rotationX, "rotationX", y), k.rotationY = ga("rotationY"in x ? x.rotationY : "shortRotationY"in x ? x.shortRotationY + "_short" : j.rotationY || 0, j.rotationY, "rotationY", y)), k.skewX = null == x.skewX ? j.skewX : ga(x.skewX, j.skewX), k.skewY = null == x.skewY ? j.skewY : ga(x.skewY, j.skewY), (l = k.skewY - j.skewY) && (k.skewX += l, k.rotation += l)
                }
                for (Ba && null != x.force3D && (j.force3D = x.force3D, p = !0), j.skewType = x.skewType || j.skewType || g.defaultSkewType, o = j.force3D || j.z || j.rotationX || j.rotationY || k.z || k.rotationX || k.rotationY || k.perspective, o || null == x.scale || (k.scaleZ = 1); --w > -1;)c = xa[w], n = k[c] - j[c], (n > v || -v > n || null != x[c] || null != J[c]) && (p = !0, f = new pa(j, c, j[c], n, f), c in y && (f.e = y[c]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
                return n = x.transformOrigin, j.svg && (n || x.svgOrigin) && (r = j.xOffset, s = j.yOffset, Ha(a, da(n), k, x.svgOrigin, x.smoothOrigin), f = qa(j, "xOrigin", (t ? j : k).xOrigin, k.xOrigin, f, z), f = qa(j, "yOrigin", (t ? j : k).yOrigin, k.yOrigin, f, z), (r !== j.xOffset || s !== j.yOffset) && (f = qa(j, "xOffset", t ? r : j.xOffset, j.xOffset, f, z), f = qa(j, "yOffset", t ? s : j.yOffset, j.yOffset, f, z)), n = wa ? null : "0px 0px"), (n || Ba && o && j.zOrigin) && (ya ? (p = !0, c = Aa, n = (n || X(a, c, e, !1, "50% 50%")) + "", f = new pa(u, c, 0, 0, f, -1, z), f.b = u[c], f.plugin = h, Ba ? (m = j.zOrigin, n = n.split(" "), j.zOrigin = (n.length > 2 && (0 === m || "0px" !== n[2]) ? parseFloat(n[2]) : m) || 0, f.xs0 = f.e = n[0] + " " + (n[1] || "50%") + " 0px", f = new pa(j, "zOrigin", 0, 0, f, -1, f.n), f.b = m, f.xs0 = f.e = j.zOrigin) : f.xs0 = f.e = n) : da(n + "", j)), p && (d._transformType = j.svg && wa || !o && 3 !== this._transformType ? 2 : 3), f
            }, prefix: !0
        }), ua("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), ua("borderRadius", {
            defaultValue: "0px", parser: function (a, b, c, f, g, h)
            {
                b = this.format(b);
                var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], z = a.style;
                for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++)this.p.indexOf("border") && (y[j] = V(y[j])), m = l = X(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = Y(a, "borderLeft", o, t), w = Y(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = Y(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = ra(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
                return g
            }, prefix: !0, formatter: ma("0px 0px 0px 0px", !1, !0)
        }), ua("backgroundPosition", {
            defaultValue: "0 0", parser: function (a, b, c, d, f, g)
            {
                var h, i, j, k, l, m, n = "background-position", o = e || W(a, null), q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"), r = this.format(b);
                if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && (m = X(a, "backgroundImage").replace(B, ""), m && "none" !== m))
                {
                    for (h = q.split(" "), i = r.split(" "), N.setAttribute("src", m), j = 2; --j > -1;)q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - N.width : a.offsetHeight - N.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
                    q = h.join(" ")
                }
                return this.parseComplex(a.style, q, r, f, g)
            }, formatter: da
        }), ua("backgroundSize", {defaultValue: "0 0", formatter: da}), ua("perspective", {
            defaultValue: "0px",
            prefix: !0
        }), ua("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), ua("transformStyle", {prefix: !0}), ua("backfaceVisibility", {prefix: !0}), ua("userSelect", {prefix: !0}), ua("margin", {parser: na("marginTop,marginRight,marginBottom,marginLeft")}), ua("padding", {parser: na("paddingTop,paddingRight,paddingBottom,paddingLeft")}), ua("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (a, b, c, d, f, g)
            {
                var h, i, j;
                return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(X(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
            }
        }), ua("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), ua("autoRound,strictUnits", {
            parser: function (a, b, c, d, e)
            {
                return e
            }
        }), ua("border", {
            defaultValue: "0px solid #000", parser: function (a, b, c, d, f, g)
            {
                return this.parseComplex(a.style, this.format(X(a, "borderTopWidth", e, !1, "0px") + " " + X(a, "borderTopStyle", e, !1, "solid") + " " + X(a, "borderTopColor", e, !1, "#000")), this.format(b), f, g)
            }, color: !0, formatter: function (a)
            {
                var b = a.split(" ");
                return b[0] + " " + (b[1] || "solid") + " " + (a.match(la) || ["#000"])[0]
            }
        }), ua("borderWidth", {parser: na("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}), ua("float,cssFloat,styleFloat", {
            parser: function (a, b, c, d, e, f)
            {
                var g = a.style, h = "cssFloat"in g ? "cssFloat" : "styleFloat";
                return new pa(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
            }
        });
        var Oa = function (a)
        {
            var b, c = this.t, d = c.filter || X(this.data, "filter") || "", e = this.s + this.c * a | 0;
            100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !X(this.data, "filter")) : (c.filter = d.replace(x, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(v, "opacity=" + e))
        };
        ua("opacity,alpha,autoAlpha", {
            defaultValue: "1", parser: function (a, b, c, d, f, g)
            {
                var h = parseFloat(X(a, "opacity", e, !1, "1")), i = a.style, j = "autoAlpha" === c;
                return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === X(a, "visibility", e) && 0 !== b && (h = 0), Q ? f = new pa(i, "opacity", h, b - h, f) : (f = new pa(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Oa), j && (f = new pa(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
            }
        });
        var Pa = function (a, b)
        {
            b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(z, "-$1").toLowerCase())) : a.removeAttribute(b))
        }, Qa = function (a)
        {
            if (this.t._gsClassPT = this, 1 === a || 0 === a)
            {
                this.t.setAttribute("class", 0 === a ? this.b : this.e);
                for (var b = this.data, c = this.t.style; b;)b.v ? c[b.p] = b.v : Pa(c, b.p), b = b._next;
                1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        ua("className", {
            parser: function (a, b, d, f, g, h, i)
            {
                var j, k, l, m, n, o = a.getAttribute("class") || "", p = a.style.cssText;
                if (g = f._classNamePT = new pa(a, d, 0, 0, g, 2), g.setRatio = Qa, g.pr = -11, c = !0, g.b = o, k = $(a, e), l = a._gsClassPT)
                {
                    for (m = {}, n = l.data; n;)m[n.p] = 1, n = n._next;
                    l.setRatio(1)
                }
                return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("\\s*\\b" + b.substr(2) + "\\b"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = _(a, k, $(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)
            }
        });
        var Ra = function (a)
        {
            if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data)
            {
                var b, c, d, e, f, g = this.t.style, h = i.transform.parse;
                if ("all" === this.e)g.cssText = "", e = !0; else for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;)c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Aa : i[c].p), Pa(g, c);
                e && (Pa(g, ya), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
            }
        };
        for (ua("clearProps", {
            parser: function (a, b, d, e, f)
            {
                return f = new pa(a, d, 0, 0, f, 2), f.setRatio = Ra, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
            }
        }), j = "bezier,throwProps,physicsProps,physics2D".split(","), sa = j.length; sa--;)va(j[sa]);
        j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function (a, b, h)
        {
            if (!a.nodeType)return !1;
            this._target = a, this._tween = h, this._vars = b, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = W(a, ""), f = this._overwriteProps;
            var j, n, p, q, r, s, t, u, v, x = a.style;
            if (l && "" === x.zIndex && (j = X(a, "zIndex", e), ("auto" === j || "" === j) && this._addLazySet(x, "zIndex", 0)), "string" == typeof b && (q = x.cssText, j = $(a, e), x.cssText = q + ";" + b, j = _(a, j, $(a)).difs, !Q && w.test(b) && (j.opacity = parseFloat(RegExp.$1)), b = j, x.cssText = q), b.className ? this._firstPT = n = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = n = this.parse(a, b, null), this._transformType)
            {
                for (v = 3 === this._transformType, ya ? m && (l = !0, "" === x.zIndex && (t = X(a, "zIndex", e), ("auto" === t || "" === t) && this._addLazySet(x, "zIndex", 0)), o && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (v ? "visible" : "hidden"))) : x.zoom = 1, p = n; p && p._next;)p = p._next;
                u = new pa(a, "transform", 0, 0, null, 2), this._linkCSSP(u, null, p), u.setRatio = ya ? Na : Ma, u.data = this._transform || La(a, e, !0), u.tween = h, u.pr = -1, f.pop()
            }
            if (c)
            {
                for (; n;)
                {
                    for (s = n._next, p = q; p && p.pr > n.pr;)p = p._next;
                    (n._prev = p ? p._prev : r) ? n._prev._next = n : q = n, (n._next = p) ? p._prev = n : r = n, n = s
                }
                this._firstPT = q
            }
            return !0
        }, j.parse = function (a, b, c, f)
        {
            var g, h, j, l, m, n, o, p, q, r, s = a.style;
            for (g in b)n = b[g], h = i[g], h ? c = h.parse(a, n, g, this, c, f, b) : (m = X(a, g, e) + "", q = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || q && y.test(n) ? (q || (n = ja(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = ra(s, g, m, n, !0, "transparent", c, 0, f)) : !q || -1 === n.indexOf(" ") && -1 === n.indexOf(",") ? (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ca(a, g, e), o = "px") : "left" === g || "top" === g ? (j = Z(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), r = q && "=" === n.charAt(1), r ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(u, "")) : (l = parseFloat(n), p = q ? n.replace(u, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (r ? l + j : l) + p : b[g], o !== p && "" !== p && (l || 0 === l) && j && (j = Y(a, g, j, o), "%" === p ? (j /= Y(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= Y(a, g, 1, p) : "px" !== p && (l = Y(a, g, l, p), p = "px"), r && (l || 0 === l) && (n = l + j + p)), r && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== s[g] && (n || n + "" != "NaN" && null != n) ? (c = new pa(s, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : S("invalid " + g + " tween value: " + b[g]) : (c = new pa(s, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p)) : c = ra(s, g, m, n, !0, null, c, 0, f)), f && c && !c.plugin && (c.plugin = f);
            return c
        }, j.setRatio = function (a)
        {
            var b, c, d, e = this._firstPT, f = 1e-6;
            if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)for (; e;)
            {
                if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type)if (1 === e.type)if (d = e.l, 2 === d)e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2; else if (3 === d)e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3; else if (4 === d)e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4; else if (5 === d)e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5; else
                {
                    for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)c += e["xn" + d] + e["xs" + (d + 1)];
                    e.t[e.p] = c
                } else-1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a); else e.t[e.p] = b + e.xs0;
                e = e._next
            } else for (; e;)2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next; else for (; e;)
            {
                if (2 !== e.type)if (e.r && -1 !== e.type)if (b = Math.round(e.s + e.c), e.type)
                {
                    if (1 === e.type)
                    {
                        for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)c += e["xn" + d] + e["xs" + (d + 1)];
                        e.t[e.p] = c
                    }
                } else e.t[e.p] = b + e.xs0; else e.t[e.p] = e.e; else e.setRatio(a);
                e = e._next
            }
        }, j._enableTransforms = function (a)
        {
            this._transform = this._transform || La(this._target, e, !0), this._transformType = this._transform.svg && wa || !a && 3 !== this._transformType ? 2 : 3
        };
        var Sa = function (a)
        {
            this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
        };
        j._addLazySet = function (a, b, c)
        {
            var d = this._firstPT = new pa(a, b, 0, 0, this._firstPT, 2);
            d.e = c, d.setRatio = Sa, d.data = this
        }, j._linkCSSP = function (a, b, c, d)
        {
            return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
        }, j._kill = function (b)
        {
            var c, d, e, f = b;
            if (b.autoAlpha || b.alpha)
            {
                f = {};
                for (d in b)f[d] = b[d];
                f.opacity = 1, f.autoAlpha && (f.visibility = 1)
            }
            return b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), a.prototype._kill.call(this, f)
        };
        var Ta = function (a, b, c)
        {
            var d, e, f, g;
            if (a.slice)for (e = a.length; --e > -1;)Ta(a[e], b, c); else for (d = a.childNodes, e = d.length; --e > -1;)f = d[e], g = f.type, f.style && (b.push($(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Ta(f, b, c)
        };
        return g.cascadeTo = function (a, c, d)
        {
            var e, f, g, h, i = b.to(a, c, d), j = [i], k = [], l = [], m = [], n = b._internals.reservedProps;
            for (a = i._targets || i.target, Ta(a, k, m), i.render(c, !0, !0), Ta(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;)if (f = _(m[e], k[e], l[e]), f.firstMPT)
            {
                f = f.difs;
                for (g in d)n[g] && (f[g] = d[g]);
                h = {};
                for (g in f)h[g] = k[e][g];
                j.push(b.fromTo(m[e], c, h, f))
            }
            return j
        }, a.activate([g]), g
    }, !0), function ()
    {
        var a = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.5",
            priority: -1,
            API: 2,
            init: function (a, b, c)
            {
                return this._tween = c, !0
            }
        }), b = function (a)
        {
            for (; a;)a.f || a.blob || (a.r = 1), a = a._next
        }, c = a.prototype;
        c._onInitAllProps = function ()
        {
            for (var a, c, d, e = this._tween, f = e.vars.roundProps.join ? e.vars.roundProps : e.vars.roundProps.split(","), g = f.length, h = {}, i = e._propLookup.roundProps; --g > -1;)h[f[g]] = 1;
            for (g = f.length; --g > -1;)for (a = f[g], c = e._firstPT; c;)d = c._next, c.pg ? c.t._roundProps(h, !0) : c.n === a && (2 === c.f && c.t ? b(c.t._firstPT) : (this._add(c.t, a, c.s, c.c), d && (d._prev = c._prev), c._prev ? c._prev._next = d : e._firstPT === c && (e._firstPT = d), c._next = c._prev = null, e._propLookup[a] = i)), c = d;
            return !1
        }, c._add = function (a, b, c, d)
        {
            this._addTween(a, b, c, c + d, b, !0), this._overwriteProps.push(b)
        }
    }(), function ()
    {
        _gsScope._gsDefine.plugin({
            propName: "attr", API: 2, version: "0.5.0", init: function (a, b, c)
            {
                var d;
                if ("function" != typeof a.setAttribute)return !1;
                for (d in b)this._addTween(a, "setAttribute", a.getAttribute(d) + "", b[d] + "", d, !1, d), this._overwriteProps.push(d);
                return !0
            }
        })
    }(), _gsScope._gsDefine.plugin({
        propName: "directionalRotation", version: "0.2.1", API: 2, init: function (a, b, c)
        {
            "object" != typeof b && (b = {rotation: b}), this.finals = {};
            var d, e, f, g, h, i, j = b.useRadians === !0 ? 2 * Math.PI : 360, k = 1e-6;
            for (d in b)"useRadians" !== d && (i = (b[d] + "").split("_"), e = i[0], f = parseFloat("function" != typeof a[d] ? a[d] : a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]()), g = this.finals[d] = "string" == typeof e && "=" === e.charAt(1) ? f + parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2)) : Number(e) || 0, h = g - f, i.length && (e = i.join("_"), -1 !== e.indexOf("short") && (h %= j, h !== h % (j / 2) && (h = 0 > h ? h + j : h - j)), -1 !== e.indexOf("_cw") && 0 > h ? h = (h + 9999999999 * j) % j - (h / j | 0) * j : -1 !== e.indexOf("ccw") && h > 0 && (h = (h - 9999999999 * j) % j - (h / j | 0) * j)), (h > k || -k > h) && (this._addTween(a, d, f, f + h, d), this._overwriteProps.push(d)));
            return !0
        }, set: function (a)
        {
            var b;
            if (1 !== a)this._super.setRatio.call(this, a); else for (b = this._firstPT; b;)b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next
        }
    })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a)
    {
        var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope, f = e.com.greensock, g = 2 * Math.PI, h = Math.PI / 2, i = f._class, j = function (b, c)
        {
            var d = i("easing." + b, function ()
            {
            }, !0), e = d.prototype = new a;
            return e.constructor = d, e.getRatio = c, d
        }, k = a.register || function ()
            {
            }, l = function (a, b, c, d, e)
        {
            var f = i("easing." + a, {easeOut: new b, easeIn: new c, easeInOut: new d}, !0);
            return k(f, a), f
        }, m = function (a, b, c)
        {
            this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
        }, n = function (b, c)
        {
            var d = i("easing." + b, function (a)
            {
                this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
            }, !0), e = d.prototype = new a;
            return e.constructor = d, e.getRatio = c, e.config = function (a)
            {
                return new d(a)
            }, d
        }, o = l("Back", n("BackOut", function (a)
        {
            return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
        }), n("BackIn", function (a)
        {
            return a * a * ((this._p1 + 1) * a - this._p1)
        }), n("BackInOut", function (a)
        {
            return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
        })), p = i("easing.SlowMo", function (a, b, c)
        {
            b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0
        }, !0), q = p.prototype = new a;
        return q.constructor = p, q.getRatio = function (a)
        {
            var b = a + (.5 - a) * this._p;
            return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
        }, p.ease = new p(.7, .7), q.config = p.config = function (a, b, c)
        {
            return new p(a, b, c)
        }, b = i("easing.SteppedEase", function (a)
        {
            a = a || 1, this._p1 = 1 / a, this._p2 = a + 1
        }, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function (a)
        {
            return 0 > a ? a = 0 : a >= 1 && (a = .999999999), (this._p2 * a >> 0) * this._p1
        }, q.config = b.config = function (a)
        {
            return new b(a)
        }, c = i("easing.RoughEase", function (b)
        {
            b = b || {};
            for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;)c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = {
                x: c,
                y: d
            };
            for (j.sort(function (a, b)
            {
                return a.x - b.x
            }), h = new m(1, 1, null), n = l; --n > -1;)g = j[n], h = new m(g.x, g.y, h);
            this._prev = new m(0, 0, 0 !== h.t ? h : h.next)
        }, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function (a)
        {
            var b = this._prev;
            if (a > b.t)
            {
                for (; b.next && a >= b.t;)b = b.next;
                b = b.prev
            } else for (; b.prev && a <= b.t;)b = b.prev;
            return this._prev = b, b.v + (a - b.t) / b.gap * b.c
        }, q.config = function (a)
        {
            return new c(a)
        }, c.ease = new c, l("Bounce", j("BounceOut", function (a)
        {
            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        }), j("BounceIn", function (a)
        {
            return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
        }), j("BounceInOut", function (a)
        {
            var b = .5 > a;
            return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
        })), l("Circ", j("CircOut", function (a)
        {
            return Math.sqrt(1 - (a -= 1) * a)
        }), j("CircIn", function (a)
        {
            return -(Math.sqrt(1 - a * a) - 1)
        }), j("CircInOut", function (a)
        {
            return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        })), d = function (b, c, d)
        {
            var e = i("easing." + b, function (a, b)
            {
                this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0), this._p2 = g / this._p2
            }, !0), f = e.prototype = new a;
            return f.constructor = e, f.getRatio = c, f.config = function (a, b)
            {
                return new e(a, b)
            }, e
        }, l("Elastic", d("ElasticOut", function (a)
        {
            return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
        }, .3), d("ElasticIn", function (a)
        {
            return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
        }, .3), d("ElasticInOut", function (a)
        {
            return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
        }, .45)), l("Expo", j("ExpoOut", function (a)
        {
            return 1 - Math.pow(2, -10 * a)
        }), j("ExpoIn", function (a)
        {
            return Math.pow(2, 10 * (a - 1)) - .001
        }), j("ExpoInOut", function (a)
        {
            return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
        })), l("Sine", j("SineOut", function (a)
        {
            return Math.sin(a * h)
        }), j("SineIn", function (a)
        {
            return -Math.cos(a * h) + 1
        }), j("SineInOut", function (a)
        {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        })), i("easing.EaseLookup", {
            find: function (b)
            {
                return a.map[b]
            }
        }, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (a, b)
{
    "use strict";
    var c = a.GreenSockGlobals = a.GreenSockGlobals || a;
    if (!c.TweenLite)
    {
        var d, e, f, g, h, i = function (a)
        {
            var b, d = a.split("."), e = c;
            for (b = 0; b < d.length; b++)e[d[b]] = e = e[d[b]] || {};
            return e
        }, j = i("com.greensock"), k = 1e-10, l = function (a)
        {
            var b, c = [], d = a.length;
            for (b = 0; b !== d; c.push(a[b++]));
            return c
        }, m = function ()
        {
        }, n = function ()
        {
            var a = Object.prototype.toString, b = a.call([]);
            return function (c)
            {
                return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
            }
        }(), o = {}, p = function (d, e, f, g)
        {
            this.sc = o[d] ? o[d].sc : [], o[d] = this, this.gsClass = null, this.func = f;
            var h = [];
            this.check = function (j)
            {
                for (var k, l, m, n, q, r = e.length, s = r; --r > -1;)(k = o[e[r]] || new p(e[r], [])).gsClass ? (h[r] = k.gsClass, s--) : j && k.sc.push(this);
                if (0 === s && f)for (l = ("com.greensock." + d).split("."), m = l.pop(), n = i(l.join("."))[m] = this.gsClass = f.apply(f, h), g && (c[m] = n, q = "undefined" != typeof module && module.exports, !q && "function" == typeof define && define.amd ? define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function ()
                {
                    return n
                }) : d === b && q && (module.exports = n)), r = 0; r < this.sc.length; r++)this.sc[r].check()
            }, this.check(!0)
        }, q = a._gsDefine = function (a, b, c, d)
        {
            return new p(a, b, c, d)
        }, r = j._class = function (a, b, c)
        {
            return b = b || function ()
            {
            }, q(a, [], function ()
            {
                return b
            }, c), b
        };
        q.globals = c;
        var s = [0, 0, 1, 1], t = [], u = r("easing.Ease", function (a, b, c, d)
        {
            this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? s.concat(b) : s
        }, !0), v = u.map = {}, w = u.register = function (a, b, c, d)
        {
            for (var e, f, g, h, i = b.split(","), k = i.length, l = (c || "easeIn,easeOut,easeInOut").split(","); --k > -1;)for (f = i[k], e = d ? r("easing." + f, null, !0) : j.easing[f] || {}, g = l.length; --g > -1;)h = l[g], v[f + "." + h] = v[h + f] = e[h] = a.getRatio ? a : a[h] || new a
        };
        for (f = u.prototype, f._calcEnd = !1, f.getRatio = function (a)
        {
            if (this._func)return this._params[0] = a, this._func.apply(null, this._params);
            var b = this._type, c = this._power, d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
            return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
        }, d = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], e = d.length; --e > -1;)f = d[e] + ",Power" + e, w(new u(null, null, 1, e), f, "easeOut", !0), w(new u(null, null, 2, e), f, "easeIn" + (0 === e ? ",easeNone" : "")), w(new u(null, null, 3, e), f, "easeInOut");
        v.linear = j.easing.Linear.easeIn, v.swing = j.easing.Quad.easeInOut;
        var x = r("events.EventDispatcher", function (a)
        {
            this._listeners = {}, this._eventTarget = a || this
        });
        f = x.prototype, f.addEventListener = function (a, b, c, d, e)
        {
            e = e || 0;
            var f, i, j = this._listeners[a], k = 0;
            for (null == j && (this._listeners[a] = j = []), i = j.length; --i > -1;)f = j[i], f.c === b && f.s === c ? j.splice(i, 1) : 0 === k && f.pr < e && (k = i + 1);
            j.splice(k, 0, {c: b, s: c, up: d, pr: e}), this !== g || h || g.wake()
        }, f.removeEventListener = function (a, b)
        {
            var c, d = this._listeners[a];
            if (d)for (c = d.length; --c > -1;)if (d[c].c === b)return void d.splice(c, 1)
        }, f.dispatchEvent = function (a)
        {
            var b, c, d, e = this._listeners[a];
            if (e)for (b = e.length, c = this._eventTarget; --b > -1;)d = e[b], d && (d.up ? d.c.call(d.s || c, {
                type: a,
                target: c
            }) : d.c.call(d.s || c))
        };
        var y = a.requestAnimationFrame, z = a.cancelAnimationFrame, A = Date.now || function ()
            {
                return (new Date).getTime()
            }, B = A();
        for (d = ["ms", "moz", "webkit", "o"], e = d.length; --e > -1 && !y;)y = a[d[e] + "RequestAnimationFrame"], z = a[d[e] + "CancelAnimationFrame"] || a[d[e] + "CancelRequestAnimationFrame"];
        r("Ticker", function (a, b)
        {
            var c, d, e, f, i, j = this, l = A(), n = b !== !1 && y ? "auto" : !1, o = 500, p = 33, q = "tick", r = function (a)
            {
                var b, g, h = A() - B;
                h > o && (l += h - p), B += h, j.time = (B - l) / 1e3, b = j.time - i, (!c || b > 0 || a === !0) && (j.frame++, i += b + (b >= f ? .004 : f - b), g = !0), a !== !0 && (e = d(r)), g && j.dispatchEvent(q)
            };
            x.call(j), j.time = j.frame = 0, j.tick = function ()
            {
                r(!0)
            }, j.lagSmoothing = function (a, b)
            {
                o = a || 1 / k, p = Math.min(b, o, 0)
            }, j.sleep = function ()
            {
                null != e && (n && z ? z(e) : clearTimeout(e), d = m, e = null, j === g && (h = !1))
            }, j.wake = function (a)
            {
                null !== e ? j.sleep() : a ? l += -B + (B = A()) : j.frame > 10 && (B = A() - o + 5), d = 0 === c ? m : n && y ? y : function (a)
                {
                    return setTimeout(a, 1e3 * (i - j.time) + 1 | 0)
                }, j === g && (h = !0), r(2)
            }, j.fps = function (a)
            {
                return arguments.length ? (c = a, f = 1 / (c || 60), i = this.time + f, void j.wake()) : c
            }, j.useRAF = function (a)
            {
                return arguments.length ? (j.sleep(), n = a, void j.fps(c)) : n
            }, j.fps(a), setTimeout(function ()
            {
                "auto" === n && j.frame < 5 && "hidden" !== document.visibilityState && j.useRAF(!1)
            }, 1500)
        }), f = j.Ticker.prototype = new j.events.EventDispatcher, f.constructor = j.Ticker;
        var C = r("core.Animation", function (a, b)
        {
            if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, V)
            {
                h || g.wake();
                var c = this.vars.useFrames ? U : V;
                c.add(this, c._time), this.vars.paused && this.paused(!0)
            }
        });
        g = C.ticker = new j.Ticker, f = C.prototype, f._dirty = f._gc = f._initted = f._paused = !1, f._totalTime = f._time = 0, f._rawPrevTime = -1, f._next = f._last = f._onUpdate = f._timeline = f.timeline = null, f._paused = !1;
        var D = function ()
        {
            h && A() - B > 2e3 && g.wake(), setTimeout(D, 2e3)
        };
        D(), f.play = function (a, b)
        {
            return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
        }, f.pause = function (a, b)
        {
            return null != a && this.seek(a, b), this.paused(!0)
        }, f.resume = function (a, b)
        {
            return null != a && this.seek(a, b), this.paused(!1)
        }, f.seek = function (a, b)
        {
            return this.totalTime(Number(a), b !== !1)
        }, f.restart = function (a, b)
        {
            return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
        }, f.reverse = function (a, b)
        {
            return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
        }, f.render = function (a, b, c)
        {
        }, f.invalidate = function ()
        {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        }, f.isActive = function ()
        {
            var a, b = this._timeline, c = this._startTime;
            return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime()) >= c && a < c + this.totalDuration() / this._timeScale
        }, f._enabled = function (a, b)
        {
            return h || g.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
        }, f._kill = function (a, b)
        {
            return this._enabled(!1, !1)
        }, f.kill = function (a, b)
        {
            return this._kill(a, b), this
        }, f._uncache = function (a)
        {
            for (var b = a ? this : this.timeline; b;)b._dirty = !0, b = b.timeline;
            return this
        }, f._swapSelfInParams = function (a)
        {
            for (var b = a.length, c = a.concat(); --b > -1;)"{self}" === a[b] && (c[b] = this);
            return c
        }, f._callback = function (a)
        {
            var b = this.vars;
            b[a].apply(b[a + "Scope"] || b.callbackScope || this, b[a + "Params"] || t)
        }, f.eventCallback = function (a, b, c, d)
        {
            if ("on" === (a || "").substr(0, 2))
            {
                var e = this.vars;
                if (1 === arguments.length)return e[a];
                null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = n(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
            }
            return this
        }, f.delay = function (a)
        {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
        }, f.duration = function (a)
        {
            return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, f.totalDuration = function (a)
        {
            return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
        }, f.time = function (a, b)
        {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
        }, f.totalTime = function (a, b, c)
        {
            if (h || g.wake(), !arguments.length)return this._totalTime;
            if (this._timeline)
            {
                if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming)
                {
                    this._dirty && this.totalDuration();
                    var d = this._totalDuration, e = this._timeline;
                    if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)for (; e._timeline;)e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (I.length && X(), this.render(a, b, !1), I.length && X())
            }
            return this
        }, f.progress = f.totalProgress = function (a, b)
        {
            var c = this.duration();
            return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio
        }, f.startTime = function (a)
        {
            return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
        }, f.endTime = function (a)
        {
            return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
        }, f.timeScale = function (a)
        {
            if (!arguments.length)return this._timeScale;
            if (a = a || k, this._timeline && this._timeline.smoothChildTiming)
            {
                var b = this._pauseTime, c = b || 0 === b ? b : this._timeline.totalTime();
                this._startTime = c - (c - this._startTime) * this._timeScale / a
            }
            return this._timeScale = a, this._uncache(!1)
        }, f.reversed = function (a)
        {
            return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, f.paused = function (a)
        {
            if (!arguments.length)return this._paused;
            var b, c, d = this._timeline;
            return a != this._paused && d && (h || a || g.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this
        };
        var E = r("core.SimpleTimeline", function (a)
        {
            C.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        f = E.prototype = new C, f.constructor = E, f.kill()._gc = !1, f._first = f._last = f._recent = null, f._sortChildren = !1, f.add = f.insert = function (a, b, c, d)
        {
            var e, f;
            if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren)for (f = a._startTime; e && e._startTime > f;)e = e._prev;
            return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
        }, f._remove = function (a, b)
        {
            return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        }, f.render = function (a, b, c)
        {
            var d, e = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = a; e;)d = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
        }, f.rawTime = function ()
        {
            return h || g.wake(), this._totalTime
        };
        var F = r("TweenLite", function (b, c, d)
        {
            if (C.call(this, c, d), this.render = F.prototype.render, null == b)throw"Cannot tween a null target.";
            this.target = b = "string" != typeof b ? b : F.selector(b) || b;
            var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType), i = this.vars.overwrite;
            if (this._overwrite = i = null == i ? T[F.defaultOverwrite] : "number" == typeof i ? i >> 0 : T[i], (h || b instanceof Array || b.push && n(b)) && "number" != typeof b[0])for (this._targets = g = l(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++)f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(l(f))) : (this._siblings[e] = Y(f, this, !1), 1 === i && this._siblings[e].length > 1 && $(f, this, null, 1, this._siblings[e])) : (f = g[e--] = F.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1); else this._propLookup = {}, this._siblings = Y(b, this, !1), 1 === i && this._siblings.length > 1 && $(b, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -k, this.render(-this._delay))
        }, !0), G = function (b)
        {
            return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
        }, H = function (a, b)
        {
            var c, d = {};
            for (c in a)S[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!P[c] || P[c] && P[c]._autoCSS) || (d[c] = a[c], delete a[c]);
            a.css = d
        };
        f = F.prototype = new C, f.constructor = F, f.kill()._gc = !1, f.ratio = 0, f._firstPT = f._targets = f._overwrittenProps = f._startAt = null, f._notifyPluginsOfEnabled = f._lazy = !1, F.version = "1.18.2", F.defaultEase = f._ease = new u(null, null, 1, 1), F.defaultOverwrite = "auto", F.ticker = g, F.autoSleep = 120, F.lagSmoothing = function (a, b)
        {
            g.lagSmoothing(a, b)
        }, F.selector = a.$ || a.jQuery || function (b)
        {
            var c = a.$ || a.jQuery;
            return c ? (F.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
        };
        var I = [], J = {}, K = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, L = function (a)
        {
            for (var b, c = this._firstPT, d = 1e-6; c;)b = c.blob ? a ? this.join("") : this.start : c.c * a + c.s, c.r ? b = Math.round(b) : d > b && b > -d && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next
        }, M = function (a, b, c, d)
        {
            var e, f, g, h, i, j, k, l = [a, b], m = 0, n = "", o = 0;
            for (l.start = a, c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(K) || [], f = b.match(K) || [], d && (d._next = null, d.blob = 1, l._firstPT = d), i = f.length, h = 0; i > h; h++)k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
                _next: l._firstPT,
                t: l,
                p: l.length - 1,
                s: g,
                c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
                f: 0,
                r: o && 4 > o
            }), m += k.length;
            return n += b.substr(m), n && l.push(n), l.setRatio = L, l
        }, N = function (a, b, c, d, e, f, g, h)
        {
            var i, j, k = "get" === c ? a[b] : c, l = typeof a[b], m = "string" == typeof d && "=" === d.charAt(1), n = {
                t: a,
                p: b,
                s: k,
                f: "function" === l,
                pg: 0,
                n: e || b,
                r: f,
                pr: 0,
                c: m ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - k || 0
            };
            return "number" !== l && ("function" === l && "get" === c && (j = b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3), n.s = k = g ? a[j](g) : a[j]()), "string" == typeof k && (g || isNaN(k)) ? (n.fp = g, i = M(k, d, h || F.defaultStringFilter, n), n = {
                t: i,
                p: "setRatio",
                s: 0,
                c: 1,
                f: 2,
                pg: 0,
                n: e || b,
                pr: 0
            }) : m || (n.s = parseFloat(k), n.c = parseFloat(d) - n.s || 0)), n.c ? ((n._next = this._firstPT) && (n._next._prev = n), this._firstPT = n, n) : void 0
        }, O = F._internals = {
            isArray: n,
            isSelector: G,
            lazyTweens: I,
            blobDif: M
        }, P = F._plugins = {}, Q = O.tweenLookup = {}, R = 0, S = O.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1,
            onOverwrite: 1,
            callbackScope: 1,
            stringFilter: 1
        }, T = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }, U = C._rootFramesTimeline = new E, V = C._rootTimeline = new E, W = 30, X = O.lazyRender = function ()
        {
            var a, b = I.length;
            for (J = {}; --b > -1;)a = I[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
            I.length = 0
        };
        V._startTime = g.time, U._startTime = g.frame, V._active = U._active = !0, setTimeout(X, 1), C._updateRoot = F.render = function ()
        {
            var a, b, c;
            if (I.length && X(), V.render((g.time - V._startTime) * V._timeScale, !1, !1), U.render((g.frame - U._startTime) * U._timeScale, !1, !1), I.length && X(), g.frame >= W)
            {
                W = g.frame + (parseInt(F.autoSleep, 10) || 120);
                for (c in Q)
                {
                    for (b = Q[c].tweens, a = b.length; --a > -1;)b[a]._gc && b.splice(a, 1);
                    0 === b.length && delete Q[c]
                }
                if (c = V._first, (!c || c._paused) && F.autoSleep && !U._first && 1 === g._listeners.tick.length)
                {
                    for (; c && c._paused;)c = c._next;
                    c || g.sleep()
                }
            }
        }, g.addEventListener("tick", C._updateRoot);
        var Y = function (a, b, c)
        {
            var d, e, f = a._gsTweenID;
            if (Q[f || (a._gsTweenID = f = "t" + R++)] || (Q[f] = {
                    target: a,
                    tweens: []
                }), b && (d = Q[f].tweens, d[e = d.length] = b, c))for (; --e > -1;)d[e] === b && d.splice(e, 1);
            return Q[f].tweens
        }, Z = function (a, b, c, d)
        {
            var e, f, g = a.vars.onOverwrite;
            return g && (e = g(a, b, c, d)), g = F.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
        }, $ = function (a, b, c, d, e)
        {
            var f, g, h, i;
            if (1 === d || d >= 4)
            {
                for (i = e.length, f = 0; i > f; f++)if ((h = e[f]) !== b)h._gc || h._kill(null, a, b) && (g = !0); else if (5 === d)break;
                return g
            }
            var j, l = b._startTime + k, m = [], n = 0, o = 0 === b._duration;
            for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || _(b, 0, o), 0 === _(h, j, o) && (m[n++] = h)) : h._startTime <= l && h._startTime + h.totalDuration() / h._timeScale > l && ((o || !h._initted) && l - h._startTime <= 2e-10 || (m[n++] = h)));
            for (f = n; --f > -1;)if (h = m[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted)
            {
                if (2 !== d && !Z(h, b))continue;
                h._enabled(!1, !1) && (g = !0)
            }
            return g
        }, _ = function (a, b, c)
        {
            for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;)
            {
                if (f += d._startTime, e *= d._timeScale, d._paused)return -100;
                d = d._timeline
            }
            return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * k > f - b ? k : (f += a.totalDuration() / a._timeScale / e) > b + k ? 0 : f - b - k
        };
        f._init = function ()
        {
            var a, b, c, d, e, f = this.vars, g = this._overwrittenProps, h = this._duration, i = !!f.immediateRender, j = f.ease;
            if (f.startAt)
            {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
                for (d in f.startAt)e[d] = f.startAt[d];
                if (e.overwrite = !1, e.immediateRender = !0, e.lazy = i && f.lazy !== !1, e.startAt = e.delay = null, this._startAt = F.to(this.target, 0, e), i)if (this._time > 0)this._startAt = null; else if (0 !== h)return
            } else if (f.runBackwards && 0 !== h)if (this._startAt)this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else
            {
                0 !== this._time && (i = !1), c = {};
                for (d in f)S[d] && "autoCSS" !== d || (c[d] = f[d]);
                if (c.overwrite = 0, c.data = "isFromStart", c.lazy = i && f.lazy !== !1, c.immediateRender = i, this._startAt = F.to(this.target, 0, c), i)
                {
                    if (0 === this._time)return
                } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
            }
            if (this._ease = j = j ? j instanceof u ? j : "function" == typeof j ? new u(j, f.easeParams) : v[j] || F.defaultEase : F.defaultEase, f.easeParams instanceof Array && j.config && (this._ease = j.config.apply(j, f.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)for (a = this._targets.length; --a > -1;)this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], g ? g[a] : null) && (b = !0); else b = this._initProps(this.target, this._propLookup, this._siblings, g);
            if (b && F._onPluginEvent("_onInitAllProps", this), g && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), f.runBackwards)for (c = this._firstPT; c;)c.s += c.c, c.c = -c.c, c = c._next;
            this._onUpdate = f.onUpdate, this._initted = !0
        }, f._initProps = function (b, c, d, e)
        {
            var f, g, h, i, j, k;
            if (null == b)return !1;
            J[b._gsTweenID] && X(), this.vars.css || b.style && b !== a && b.nodeType && P.css && this.vars.autoCSS !== !1 && H(this.vars, b);
            for (f in this.vars)if (k = this.vars[f], S[f])k && (k instanceof Array || k.push && n(k)) && -1 !== k.join("").indexOf("{self}") && (this.vars[f] = k = this._swapSelfInParams(k, this)); else if (P[f] && (i = new P[f])._onInitTween(b, this.vars[f], this))
            {
                for (this._firstPT = j = {
                    _next: this._firstPT,
                    t: i,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: f,
                    pg: 1,
                    pr: i._priority
                }, g = i._overwriteProps.length; --g > -1;)c[i._overwriteProps[g]] = this._firstPT;
                (i._priority || i._onInitAllProps) && (h = !0), (i._onDisable || i._onEnable) && (this._notifyPluginsOfEnabled = !0), j._next && (j._next._prev = j)
            } else c[f] = N.call(this, b, f, "get", k, f, 0, null, this.vars.stringFilter);
            return e && this._kill(e, b) ? this._initProps(b, c, d, e) : this._overwrite > 1 && this._firstPT && d.length > 1 && $(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (J[b._gsTweenID] = !0), h)
        }, f.render = function (a, b, c)
        {
            var d, e, f, g, h = this._time, i = this._duration, j = this._rawPrevTime;
            if (a >= i - 1e-7)this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === k && "isPause" !== this.data) && j !== a && (c = !0, j > k && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : k); else if (1e-7 > a)this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== k || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : k)), this._initted || (c = !0); else if (this._totalTime = this._time = a, this._easeType)
            {
                var l = a / i, m = this._easeType, n = this._easePower;
                (1 === m || 3 === m && l >= .5) && (l = 1 - l), 3 === m && (l *= 2), 1 === n ? l *= l : 2 === n ? l *= l * l : 3 === n ? l *= l * l * l : 4 === n && (l *= l * l * l * l), 1 === m ? this.ratio = 1 - l : 2 === m ? this.ratio = l : .5 > a / i ? this.ratio = l / 2 : this.ratio = 1 - l / 2
            } else this.ratio = this._ease.getRatio(a / i);
            if (this._time !== h || c)
            {
                if (!this._initted)
                {
                    if (this._init(), !this._initted || this._gc)return;
                    if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))return this._time = this._totalTime = h, this._rawPrevTime = j, I.push(this), void(this._lazy = [a, b]);
                    this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;)f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
                this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== h || d) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === k && g !== k && (this._rawPrevTime = 0))
            }
        }, f._kill = function (a, b, c)
        {
            if ("all" === a && (a = null), null == a && (null == b || b === this.target))return this._lazy = !1, this._enabled(!1, !1);
            b = "string" != typeof b ? b || this._targets || this.target : F.selector(b) || b;
            var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
            if ((n(b) || G(b)) && "number" != typeof b[0])for (d = b.length; --d > -1;)this._kill(a, b[d], c) && (i = !0); else
            {
                if (this._targets)
                {
                    for (d = this._targets.length; --d > -1;)if (b === this._targets[d])
                    {
                        h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
                        break
                    }
                } else
                {
                    if (b !== this.target)return !1;
                    h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                }
                if (h)
                {
                    if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (F.onOverwrite || this.vars.onOverwrite))
                    {
                        for (f in j)h[f] && (l || (l = []), l.push(f));
                        if ((l || !a) && !Z(this, c, b, l))return !1
                    }
                    for (f in j)(g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return i
        }, f.invalidate = function ()
        {
            return this._notifyPluginsOfEnabled && F._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -k, this.render(-this._delay)), this
        }, f._enabled = function (a, b)
        {
            if (h || g.wake(), a && this._gc)
            {
                var c, d = this._targets;
                if (d)for (c = d.length; --c > -1;)this._siblings[c] = Y(d[c], this, !0); else this._siblings = Y(this.target, this, !0)
            }
            return C.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? F._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
        }, F.to = function (a, b, c)
        {
            return new F(a, b, c)
        }, F.from = function (a, b, c)
        {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new F(a, b, c)
        }, F.fromTo = function (a, b, c, d)
        {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new F(a, b, d)
        }, F.delayedCall = function (a, b, c, d, e)
        {
            return new F(b, 0, {
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                callbackScope: d,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                immediateRender: !1,
                lazy: !1,
                useFrames: e,
                overwrite: 0
            })
        }, F.set = function (a, b)
        {
            return new F(a, 0, b)
        }, F.getTweensOf = function (a, b)
        {
            if (null == a)return [];
            a = "string" != typeof a ? a : F.selector(a) || a;
            var c, d, e, f;
            if ((n(a) || G(a)) && "number" != typeof a[0])
            {
                for (c = a.length, d = []; --c > -1;)d = d.concat(F.getTweensOf(a[c], b));
                for (c = d.length; --c > -1;)for (f = d[c], e = c; --e > -1;)f === d[e] && d.splice(c, 1)
            } else for (d = Y(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
            return d
        }, F.killTweensOf = F.killDelayedCallsTo = function (a, b, c)
        {
            "object" == typeof b && (c = b, b = !1);
            for (var d = F.getTweensOf(a, b), e = d.length; --e > -1;)d[e]._kill(c, a)
        };
        var aa = r("plugins.TweenPlugin", function (a, b)
        {
            this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = aa.prototype
        }, !0);
        if (f = aa.prototype, aa.version = "1.18.0", aa.API = 2, f._firstPT = null, f._addTween = N, f.setRatio = L, f._kill = function (a)
            {
                var b, c = this._overwriteProps, d = this._firstPT;
                if (null != a[this._propName])this._overwriteProps = []; else for (b = c.length; --b > -1;)null != a[c[b]] && c.splice(b, 1);
                for (; d;)null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
                return !1
            }, f._roundProps = function (a, b)
            {
                for (var c = this._firstPT; c;)(a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")]) && (c.r = b), c = c._next
            }, F._onPluginEvent = function (a, b)
            {
                var c, d, e, f, g, h = b._firstPT;
                if ("_onInitAllProps" === a)
                {
                    for (; h;)
                    {
                        for (g = h._next, d = e; d && d.pr > h.pr;)d = d._next;
                        (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h, (h._next = d) ? d._prev = h : f = h, h = g
                    }
                    h = b._firstPT = e
                }
                for (; h;)h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
                return c
            }, aa.activate = function (a)
            {
                for (var b = a.length; --b > -1;)a[b].API === aa.API && (P[(new a[b])._propName] = a[b]);
                return !0
            }, q.plugin = function (a)
            {
                if (!(a && a.propName && a.init && a.API))throw"illegal plugin definition.";
                var b, c = a.propName, d = a.priority || 0, e = a.overwriteProps, f = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_roundProps",
                    initAll: "_onInitAllProps"
                }, g = r("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function ()
                {
                    aa.call(this, c, d), this._overwriteProps = e || []
                }, a.global === !0), h = g.prototype = new aa(c);
                h.constructor = g, g.API = a.API;
                for (b in f)"function" == typeof a[b] && (h[f[b]] = a[b]);
                return g.version = a.version, aa.activate([g]), g
            }, d = a._gsQueue)
        {
            for (e = 0; e < d.length; e++)d[e]();
            for (f in o)o[f].func || a.console.log("GSAP encountered missing dependency: com.greensock." + f)
        }
        h = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
!function (a, b, c, d)
{
    function e(b, c)
    {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function (a, b)
        {
            this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Pipe, a.proxy(function (b, c)
        {
            this._pipe.push({filter: c.filter, run: a.proxy(c.run, this)})
        }, this)), this.setup(), this.initialize()
    }

    function f(a)
    {
        if (a.touches !== d)return {x: a.touches[0].pageX, y: a.touches[0].pageY};
        if (a.touches === d)
        {
            if (a.pageX !== d)return {x: a.pageX, y: a.pageY};
            if (a.pageX === d)return {x: a.clientX, y: a.clientY}
        }
    }

    function g(a)
    {
        var b, d, e = c.createElement("div"), f = a;
        for (b in f)if (d = f[b], "undefined" != typeof e.style[d])return e = null, [d, b];
        return [!1]
    }

    function h()
    {
        return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function i()
    {
        return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function j()
    {
        return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function k()
    {
        return "ontouchstart"in b || !!navigator.msMaxTouchPoints
    }

    function l()
    {
        return b.navigator.msPointerEnabled
    }

    var m, n, o;
    m = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, n = {isTouch: !1, isScrolling: !1, isSwiping: !1, direction: !1, inMotion: !1}, o = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Plugins = {}, e.Pipe = [{
        filter: ["width", "items", "settings"], run: function (a)
        {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"], run: function ()
        {
            var a = this._clones, b = this.$stage.children(".cloned");
            (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"], run: function ()
        {
            var a, b, c = this._clones, d = this._items, e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
            for (a = 0, b = Math.abs(e / 2); b > a; a++)e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"], run: function ()
        {
            var a, b, c, d = this.settings.rtl ? 1 : -1, e = (this.width() / this.settings.items).toFixed(3), f = 0;
            for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++)a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
        }
    }, {
        filter: ["width", "items", "settings"], run: function ()
        {
            var b, c, d = (this.width() / this.settings.items).toFixed(3), e = {
                width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                "padding-left": this.settings.stagePadding || "",
                "padding-right": this.settings.stagePadding || ""
            };
            if (this.$stage.css(e), e = {width: this.settings.autoWidth ? "auto" : d - this.settings.margin}, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function (a)
                {
                    return a > 1
                }).length > 0)for (b = 0, c = this._coordinates.length; c > b; b++)e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e); else this.$stage.children().css(e)
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a)
        {
            a.current && this.reset(this.$stage.children().index(a.current))
        }
    }, {
        filter: ["position"], run: function ()
        {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"], run: function ()
        {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding, g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++)a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], e.prototype.initialize = function ()
    {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0)
        {
            var b, c, e;
            if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e)return this.preloadAutoWidthImages(b), !1
        }
        this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, e.prototype.setup = function ()
    {
        var b = this.viewport(), c = this.options.responsive, d = -1, e = null;
        c ? (a.each(c, function (a)
        {
            b >= a && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function (a, b)
        {
            return b.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, e.prototype.optionsLogic = function ()
    {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function (b)
    {
        var c = this.trigger("prepare", {content: b});
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {content: c.data}), c.data
    }, e.prototype.update = function ()
    {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function (a)
        {
            return this[a]
        }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}
    }, e.prototype.width = function (a)
    {
        switch (a = a || e.Width.Default)
        {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function ()
    {
        if (0 === this._items.length)return !1;
        (new Date).getTime();
        this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, e.prototype.eventsCall = function ()
    {
        this.e._onDragStart = a.proxy(function (a)
        {
            this.onDragStart(a)
        }, this), this.e._onDragMove = a.proxy(function (a)
        {
            this.onDragMove(a)
        }, this), this.e._onDragEnd = a.proxy(function (a)
        {
            this.onDragEnd(a)
        }, this), this.e._onResize = a.proxy(function (a)
        {
            this.onResize(a)
        }, this), this.e._transitionEnd = a.proxy(function (a)
        {
            this.transitionEnd(a)
        }, this), this.e._preventClick = a.proxy(function (a)
        {
            this.preventClick(a)
        }, this)
    }, e.prototype.onThrottledResize = function ()
    {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function ()
    {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
    }, e.prototype.eventsRouter = function (a)
    {
        var b = a.type;
        "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
    }, e.prototype.internalEvents = function ()
    {
        var c = (k(), l());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function (a)
        {
            this.eventsRouter(a)
        }, this)), this.$stage.on("dragstart", function ()
        {
            return !1
        }), this.$stage.get(0).onselectstart = function ()
        {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function (a)
        {
            this.eventsRouter(a)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
    }, e.prototype.onDragStart = function (d)
    {
        var e, g, h, i;
        if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch)return !1;
        if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d)i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0; else if (this.state.inMotion && !this.support3d)return this.state.inMotion = !1, !1;
        this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function (a)
        {
            this.eventsRouter(a)
        }, this))
    }, e.prototype.onDragMove = function (a)
    {
        var c, e, g, h, i, j;
        this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, e.prototype.onDragEnd = function (b)
    {
        var d, e, f;
        if (this.state.isTouch)
        {
            if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0)return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
        }
    }, e.prototype.removeClick = function (c)
    {
        this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function ()
        {
            a(c).off("click.preventClick")
        }, 300)
    }, e.prototype.preventClick = function (b)
    {
        b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
    }, e.prototype.getTransformProperty = function ()
    {
        var a, c;
        return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
    }, e.prototype.closest = function (b)
    {
        var c = -1, d = 30, e = this.width(), f = this.coordinates();
        return this.settings.freeDrag || a.each(f, a.proxy(function (a, g)
        {
            return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
        }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
    }, e.prototype.animate = function (b)
    {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({left: b + "px"}) : this.$stage.animate({left: b}, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function ()
        {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, e.prototype.current = function (a)
    {
        if (a === d)return this._current;
        if (0 === this._items.length)return d;
        if (a = this.normalize(a), this._current !== a)
        {
            var b = this.trigger("change", {property: {name: "position", value: a}});
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function (a)
    {
        this._invalidated[a] = !0
    }, e.prototype.reset = function (a)
    {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function (b, c)
    {
        var e = c ? this._items.length : this._items.length + this._clones.length;
        return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
    }, e.prototype.relative = function (a)
    {
        return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function (a)
    {
        var b, c, d, e = 0, f = this.settings;
        if (a)return this._items.length - 1;
        if (!f.loop && f.center)b = this._items.length - 1; else if (f.loop || f.center)if (f.loop || f.center)b = this._items.length + f.items; else
        {
            if (!f.autoWidth && !f.merge)throw"Can not detect maximum absolute position.";
            for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width(); (d = this.coordinates(e)) && !(d * revert >= c);)b = ++e
        } else b = this._items.length - f.items;
        return b
    }, e.prototype.minimum = function (a)
    {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function (a)
    {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function (a)
    {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function (b)
    {
        var c = this._clones.length / 2, e = c + this._items.length, f = function (a)
        {
            return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
        };
        return b === d ? a.map(this._clones, function (a, b)
        {
            return f(b)
        }) : a.map(this._clones, function (a, c)
        {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function (a)
    {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function (b)
    {
        var c = null;
        return b === d ? a.map(this._coordinates, a.proxy(function (a, b)
        {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
    }, e.prototype.duration = function (a, b, c)
    {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function (c, d)
    {
        if (this.settings.loop)
        {
            var e = c - this.relative(this.current()), f = this.current(), g = this.current(), h = this.current() + e, i = 0 > g - h ? !0 : !1, j = this._clones.length + this._items.length;
            h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function ()
            {
                this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
    }, e.prototype.next = function (a)
    {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function (a)
    {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.transitionEnd = function (a)
    {
        return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
    }, e.prototype.viewport = function ()
    {
        var d;
        if (this.options.responsiveBaseElement !== b)d = a(this.options.responsiveBaseElement).width(); else if (b.innerWidth)d = b.innerWidth; else
        {
            if (!c.documentElement || !c.documentElement.clientWidth)throw"Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }, e.prototype.replace = function (b)
    {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function ()
        {
            return 1 === this.nodeType
        }).each(a.proxy(function (a, b)
        {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function (a, b)
    {
        b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
            content: a,
            position: b
        }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: a,
            position: b
        })
    }, e.prototype.remove = function (a)
    {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.addTriggerableEvents = function ()
    {
        var b = a.proxy(function (b, c)
        {
            return a.proxy(function (a)
            {
                a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
            }, this)
        }, this);
        a.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, a.proxy(function (a, c)
        {
            this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
        }, this))
    }, e.prototype.watchVisibility = function ()
    {
        function c(a)
        {
            return a.offsetWidth > 0 && a.offsetHeight > 0
        }

        function d()
        {
            c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
        }

        c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
    }, e.prototype.preloadAutoWidthImages = function (b)
    {
        var c, d, e, f;
        c = 0, d = this, b.each(function (g, h)
        {
            e = a(h), f = new Image, f.onload = function ()
            {
                c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
            }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
        })
    }, e.prototype.destroy = function ()
    {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var d in this._plugins)this._plugins[d].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function ()
        {
        }, this.$stage.off("dragstart", function ()
        {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, e.prototype.op = function (a, b, c)
    {
        var d = this.settings.rtl;
        switch (b)
        {
            case"<":
                return d ? a > c : c > a;
            case">":
                return d ? c > a : a > c;
            case">=":
                return d ? c >= a : a >= c;
            case"<=":
                return d ? a >= c : c >= a
        }
    }, e.prototype.on = function (a, b, c, d)
    {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function (a, b, c, d)
    {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function (b, c, d)
    {
        var e = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        }, f = a.camelCase(a.grep(["on", b, d], function (a)
        {
            return a
        }).join("-").toLowerCase()), g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({relatedTarget: this}, e, c));
        return this._supress[b] || (a.each(this._plugins, function (a, b)
        {
            b.onTrigger && b.onTrigger(g)
        }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
    }, e.prototype.suppress = function (b)
    {
        a.each(b, a.proxy(function (a, b)
        {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function (b)
    {
        a.each(b, a.proxy(function (a, b)
        {
            delete this._supress[b]
        }, this))
    }, e.prototype.browserSupport = function ()
    {
        if (this.support3d = j(), this.support3d)
        {
            this.transformVendor = i();
            var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = b.orientation
    }, a.fn.owlCarousel = function (b)
    {
        return this.each(function ()
        {
            a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document), function (a, b)
{
    var c = function (b)
    {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function (b)
            {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function (a, b)
                {
                    this.load(b)
                }, this); e++ < d;)this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    c.Defaults = {lazyLoad: !1}, c.prototype.load = function (c)
    {
        var d = this._core.$stage.children().eq(c), e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d)
        {
            var e, f = a(d), g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function ()
            {
                f.css("opacity", 1), this._core.trigger("loaded", {element: f, url: g}, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function ()
            {
                f.css({"background-image": "url(" + g + ")", opacity: "1"}), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, c.prototype.destroy = function ()
    {
        var a, b;
        for (a in this.handlers)this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
}(window.Zepto || window.jQuery, window, document), function (a)
{
    var b = function (c)
    {
        this._core = c, this._handlers = {
            "initialized.owl.carousel": a.proxy(function ()
            {
                this._core.settings.autoHeight && this.update()
            }, this), "changed.owl.carousel": a.proxy(function (a)
            {
                this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this), "loaded.owl.lazy": a.proxy(function (a)
            {
                this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    b.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, b.prototype.update = function ()
    {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, b.prototype.destroy = function ()
    {
        var a, b;
        for (a in this._handlers)this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
}(window.Zepto || window.jQuery, window, document), function (a, b, c)
{
    var d = function (b)
    {
        this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": a.proxy(function (a)
            {
                this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
            }, this), "refresh.owl.carousel changed.owl.carousel": a.proxy(function ()
            {
                this._playing && this.stop()
            }, this), "prepared.owl.carousel": a.proxy(function (b)
            {
                var c = a(b.content).find(".owl-video");
                c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
            }, this)
        }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a)
        {
            this.play(a)
        }, this))
    };
    d.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, d.prototype.fetch = function (a, b)
    {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube", d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"), e = a.attr("data-width") || this._core.settings.videoWidth, f = a.attr("data-height") || this._core.settings.videoHeight, g = a.attr("href");
        if (!g)throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1)c = "youtube"; else
        {
            if (!(d[3].indexOf("vimeo") > -1))throw new Error("Video URL not supported.");
            c = "vimeo"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, d.prototype.thumbnail = function (b, c)
    {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "", h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function (a)
        {
            e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
        };
        return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (a)
            {
                f = a[0].thumbnail_large, l(f)
            }
        }))
    }, d.prototype.stop = function ()
    {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, d.prototype.play = function (b)
    {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c, d, e = a(b.target || b.srcElement), f = e.closest("." + this._core.settings.itemClass), g = this._videos[f.attr("data-video")], h = g.width || "100%", i = g.height || this._core.$stage.height();
        "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
    }, d.prototype.isInFullScreen = function ()
    {
        var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
    }, d.prototype.destroy = function ()
    {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers)this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = d
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d)
{
    var e = function (b)
    {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function (a)
            {
                "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a)
            {
                this.swapping = "translated" == a.type
            }, this), "translate.owl.carousel": a.proxy(function ()
            {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {animateOut: !1, animateIn: !1}, e.prototype.swap = function ()
    {
        if (1 === this.core.settings.items && this.core.support3d)
        {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous), e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn, g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({left: b + "px"}).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
        }
    }, e.prototype.clear = function (b)
    {
        a(b.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, e.prototype.destroy = function ()
    {
        var a, b;
        for (a in this.handlers)this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c)
{
    var d = function (b)
    {
        this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": a.proxy(function ()
            {
                this.autoplay()
            }, this), "play.owl.autoplay": a.proxy(function (a, b, c)
            {
                this.play(b, c)
            }, this), "stop.owl.autoplay": a.proxy(function ()
            {
                this.stop()
            }, this), "mouseover.owl.autoplay": a.proxy(function ()
            {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this), "mouseleave.owl.autoplay": a.proxy(function ()
            {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    d.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, d.prototype.autoplay = function ()
    {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function ()
        {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
    }, d.prototype.play = function ()
    {
        return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }, d.prototype.stop = function ()
    {
        b.clearInterval(this.interval)
    }, d.prototype.pause = function ()
    {
        b.clearInterval(this.interval)
    }, d.prototype.destroy = function ()
    {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers)this.core.$element.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this))"function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
}(window.Zepto || window.jQuery, window, document), function (a)
{
    "use strict";
    var b = function (c)
    {
        this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function (b)
            {
                this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this), "add.owl.carousel": a.proxy(function (b)
            {
                this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this), "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a)
            {
                this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this), "change.owl.carousel": a.proxy(function (a)
            {
                if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind)
                {
                    var b = this._core.current(), c = this._core.maximum(), d = this._core.minimum();
                    a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
                }
            }, this), "changed.owl.carousel": a.proxy(function (a)
            {
                "position" == a.property.name && this.draw()
            }, this), "refreshed.owl.carousel": a.proxy(function ()
            {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    b.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, b.prototype.initialize = function ()
    {
        var b, c, d = this._core.settings;
        d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function (b)
        {
            var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(c, d.dotsSpeed)
        }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function ()
        {
            this.prev(d.navSpeed)
        }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function ()
        {
            this.next(d.navSpeed)
        }, this));
        for (c in this._overrides)this._core[c] = a.proxy(this[c], this)
    }, b.prototype.destroy = function ()
    {
        var a, b, c, d;
        for (a in this._handlers)this.$element.off(a, this._handlers[a]);
        for (b in this._controls)this._controls[b].remove();
        for (d in this.overides)this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))"function" != typeof this[c] && (this[c] = null)
    }, b.prototype.update = function ()
    {
        var a, b, c, d = this._core.settings, e = this._core.clones().length / 2, f = e + this._core.items().length, g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({
            start: a - e,
            end: a - e + g - 1
        }), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
    }, b.prototype.draw = function ()
    {
        var b, c, d = "", e = this._core.settings, f = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots)
        {
            if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b)
            {
                for (c = 0; c < this._controls.$indicators.children().length; c++)d += this._templates[this._core.relative(c)];
                this._controls.$indicators.html(d)
            } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(e.dots)
    }, b.prototype.onTrigger = function (b)
    {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
        }
    }, b.prototype.current = function ()
    {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, function (a)
        {
            return a.start <= b && a.end >= b
        }).pop()
    }, b.prototype.getPosition = function (b)
    {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, b.prototype.next = function (b)
    {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, b.prototype.prev = function (b)
    {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, b.prototype.to = function (b, c, d)
    {
        var e;
        d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
}(window.Zepto || window.jQuery, window, document), function (a, b)
{
    "use strict";
    var c = function (d)
    {
        this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function ()
            {
                "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this), "prepared.owl.carousel": a.proxy(function (b)
            {
                var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[c] = b.content
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function ()
        {
            var a = b.location.hash.substring(1), c = this._core.$stage.children(), d = this._hashes[a] && c.index(this._hashes[a]) || 0;
            return a ? void this._core.to(d, !1, !0) : !1
        }, this))
    };
    c.Defaults = {URLhashListener: !1}, c.prototype.destroy = function ()
    {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers)this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))"function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = c
}(window.Zepto || window.jQuery, window, document);
// plugin per aggiungere la paginazione numerata ad owl
;
(function ($, window, document, undefined)
{
    var Positions = function (scope)
    {
        this.owl = scope;
        this.owl._options = $.extend({}, Positions.Defaults, this.owl.options);
        this.containerPositions = undefined;
        this.owl_current = undefined;
        this.owl_total = undefined;

        //link callback events with owl carousel here
        this.createHtml();
        this.observeEvents();
    };
    Positions.Defaults = {
        positions: false
    };
    Positions.prototype.createHtml = function (e)
    {
        this.containerPositions = $(document.createElement("ul"));
        this.containerPositions.addClass("owl-positions");

        this.owl_current = $(document.createElement("li"))
            .addClass("owl-current")
            .appendTo(this.containerPositions)
        ;
        this.owl_total = $(document.createElement("li"))
            .addClass("owl-total")
            .appendTo(this.containerPositions)
        ;
    };
    Positions.prototype.appendHtml = function (e)
    {
        this.containerPositions.appendTo(this.owl.$element[0].lastChild);
        //inserisco i dati
        this.popolatePositions(e);
    };
    Positions.prototype.popolatePositions = function (e)
    {
        if (this.owl.settings.loop == true)
        {
            this.owl_current.text(e.page.index + 1);
            this.owl_total.text(e.page.count);
        } else
        {
            if (this.owl.settings.items > 1)
            {
                this.owl_current.text(e.page.index + 1);
                this.owl_total.text(e.page.count);
            } else
            {
                this.owl_current.text(e.item.index + 1);
                this.owl_total.text(e.item.count);
            }
        }
    };

    //mehtods:
    Positions.prototype.observeEvents = function ()
    {

        var self = this;
        // this.owl.$element.on("translated.owl.carousel", function(){
        //     self.createHtml.call(null, self.owl)
        // });

        this.owl.$element.on("initialized.owl.carousel", $.proxy(this.appendHtml, this));
        this.owl.$element.on("changed.owl.carousel", $.proxy(this.showPositions, this));
        this.owl.$element.on("translated.owl.carousel", $.proxy(this.popolatePositions, this));
    };
    Positions.prototype.showPositions = function (e)
    {
        if (this.owl.settings.positions)
        {
            this.containerPositions.show();
        } else
        {
            this.containerPositions.hide();
        }
    };
    //destroy:
    Positions.prototype.destroy = function ()
    {
        miontostart = null;
        delete Positions;

    };
    $.fn.owlCarousel.Constructor.Plugins['Positions'] = Positions;
})(window.Zepto || window.jQuery, window, document);
// plugin per aggiungere la paginazione numerata ad owl
;
(function ($, window, document, undefined)
{
    var Slidebar = function (scope)
    {
        this.owl = scope;
        this.owl._options = $.extend({}, Slidebar.Defaults, this.owl.options);

        this.slidebar = this.createHtml();
        this.observeEvents();
    };
    Slidebar.Defaults = {
        sliderbar: false,
        slideBarWidth: 270
    };
    Slidebar.prototype.setHandlerWidth = function (event, itemtoshow)
    {
        var handleSizeWidth;

        handleSizeWidth = Math.floor(270 / event.item.count * itemtoshow);
        return handleSizeWidth;
    };
    Slidebar.prototype.createHtml = function (e)
    {
        if (window.jQuery.ui)
        {
            var slidebar = $(document.createElement("div"));
            slidebar.addClass('owl-slidebar');
            return slidebar;
        } else
        {
            console.warn("manca componente jqueryUi");
        }
    };
    Slidebar.prototype.appendHtml = function (e)
    {

        this.slidebar.width(this.owl._options.slideBarWidth)
        this.slidebar.appendTo(this.owl.$element[0].lastChild);

        if (this.owl._options.sliderbar != this.owl.settings.sliderbar && this.owl.settings.sliderbar != undefined)
        {
            this.ActivateSlidebar(
                this.setHandlerWidth(e, e.page.size),
                e.item.count
            );
        } else
        {
            this.slidebar.hide();
        }
    };
    Slidebar.prototype.ActivateSlidebar = function (handlerWidth, total)
    {
        var
            self = this,
            storeValue = 0,
            newValue = 0,
            handlerFake = ''
            ;
        this.slidebar.slider({
            // max: steps,
            create: function ()
            {

                self.slidebar.append("<div class='ui-slider-handle-upper'></div>");

                handlerFake = self.slidebar.find(".ui-slider-handle-upper");
                console.log(handlerFake)
                handlerFake.css({
                    "width": handlerWidth + "px",
                    "margin-left": 0
                });
            },
            slide: function (event, ui)
            {

                handlerFake.css({
                    "width": handlerWidth + "px",
                    "margin-left": ( (handlerWidth * ui.value) / 100 ) + "px"
                });

                newValue = parseInt(ui.value * total / 100);

                if (newValue != storeValue)
                {
                    self.owl.$element.trigger("to.owl.carousel", [newValue, 500, true]);
                    // controllo se vado avanti
                    if (newValue > storeValue)
                    {
                        //self.carousel.trigger("next.owl.carousel");
                    } else
                    {
                        // o indietro
                        //self.carousel.trigger("prev.owl.carousel");
                    }
                    storeValue = newValue;
                }
            },
            change: function (event, ui)
            {

                handlerFake.css({
                    "width": handlerWidth + "px",
                    "margin-left": ( (handlerWidth * ui.value) / 100 ) + "px"
                });

                newValue = parseInt(ui.value * total / 100);

                if (newValue != storeValue)
                {
                    console.log(newValue)
                    //self.owl.$element.trigger("to.owl.carousel",[newValue, 500, true]);
                    // controllo se vado avanti
                    if (newValue > storeValue)
                    {
                        //self.carousel.trigger("next.owl.carousel");
                    } else
                    {
                        // o indietro
                        //self.carousel.trigger("prev.owl.carousel");
                    }
                    storeValue = newValue;
                }
            }
        });
    };
    Slidebar.prototype.showSlidebar = function (e)
    {
        if (this.owl.settings.slidebar)
        {
            this.slidebar.show();
        } else
        {
            this.slidebar.hide();
        }
    };
    //mehtods:
    Slidebar.prototype.setDragger = function (event)
    {
        if (typeof this.slidebar === "object" && this.owl.settings.sliderbar != undefined)
        {

            if (event.item.index == 0)
            {
                this.slidebar.slider("value", 0);
            } else
            {
                this.slidebar.slider("value", ((event.item.index + event.page.size) / event.item.count) * 100);
            }
        }

    };
    Slidebar.prototype.observeEvents = function ()
    {
        var self = this;

        this.owl.$element.on("initialized.owl.carousel", $.proxy(this.appendHtml, this));
        this.owl.$element.on("translated.owl.carousel", $.proxy(this.setDragger, this));
    };
    $.fn.owlCarousel.Constructor.Plugins['Slidebar'] = Slidebar;
})(window.Zepto || window.jQuery, window, document);
/*! jQuery UI - v1.11.4 - 2016-01-05
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, draggable.js, slider.js, effect.js, effect-fade.js, effect-transfer.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */


(function (e)
{
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
})(function (e)
{
    function t(t, s)
    {
        var n, a, o, r = t.nodeName.toLowerCase();
        return "area" === r ? (n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase() ? (o = e("img[usemap='#" + a + "']")[0], !!o && i(o)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t)
    }

    function i(t)
    {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function ()
        {
            return "hidden" === e.css(this, "visibility")
        }).length
    }

    e.ui = e.ui || {}, e.extend(e.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        scrollParent: function (t)
        {
            var i = this.css("position"), s = "absolute" === i, n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/, a = this.parents().filter(function ()
            {
                var t = e(this);
                return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
            }).eq(0);
            return "fixed" !== i && a.length ? a : e(this[0].ownerDocument || document)
        }, uniqueId: function ()
        {
            var e = 0;
            return function ()
            {
                return this.each(function ()
                {
                    this.id || (this.id = "ui-id-" + ++e)
                })
            }
        }(), removeUniqueId: function ()
        {
            return this.each(function ()
            {
                /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function (t)
        {
            return function (i)
            {
                return !!e.data(i, t)
            }
        }) : function (t, i, s)
        {
            return !!e.data(t, s[3])
        }, focusable: function (i)
        {
            return t(i, !isNaN(e.attr(i, "tabindex")))
        }, tabbable: function (i)
        {
            var s = e.attr(i, "tabindex"), n = isNaN(s);
            return (n || s >= 0) && t(i, !n)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (t, i)
    {
        function s(t, i, s, a)
        {
            return e.each(n, function ()
            {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }

        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"], a = i.toLowerCase(), o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight
        };
        e.fn["inner" + i] = function (t)
        {
            return void 0 === t ? o["inner" + i].call(this) : this.each(function ()
            {
                e(this).css(a, s(this, t) + "px")
            })
        }, e.fn["outer" + i] = function (t, n)
        {
            return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function ()
            {
                e(this).css(a, s(this, t, !0, n) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function (e)
    {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t)
    {
        return function (i)
        {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
        focus: function (t)
        {
            return function (i, s)
            {
                return "number" == typeof i ? this.each(function ()
                {
                    var t = this;
                    setTimeout(function ()
                    {
                        e(t).focus(), s && s.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus), disableSelection: function ()
        {
            var e = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function ()
            {
                return this.bind(e + ".ui-disableSelection", function (e)
                {
                    e.preventDefault()
                })
            }
        }(), enableSelection: function ()
        {
            return this.unbind(".ui-disableSelection")
        }, zIndex: function (t)
        {
            if (void 0 !== t)return this.css("zIndex", t);
            if (this.length)for (var i, s, n = e(this[0]); n.length && n[0] !== document;)
            {
                if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s))return s;
                n = n.parent()
            }
            return 0
        }
    }), e.ui.plugin = {
        add: function (t, i, s)
        {
            var n, a = e.ui[t].prototype;
            for (n in s)a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]])
        }, call: function (e, t, i, s)
        {
            var n, a = e.plugins[t];
            if (a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))for (n = 0; a.length > n; n++)e.options[a[n][0]] && a[n][1].apply(e.element, i)
        }
    };
    var s = 0, n = Array.prototype.slice;
    e.cleanData = function (t)
    {
        return function (i)
        {
            var s, n, a;
            for (a = 0; null != (n = i[a]); a++)try
            {
                s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove")
            } catch (o)
            {
            }
            t(i)
        }
    }(e.cleanData), e.widget = function (t, i, s)
    {
        var n, a, o, r, h = {}, l = t.split(".")[0];
        return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function (t)
        {
            return !!e.data(t, n)
        }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function (e, t)
        {
            return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t)
        }, e.extend(o, a, {
            version: s.version,
            _proto: e.extend({}, s),
            _childConstructors: []
        }), r = new i, r.options = e.widget.extend({}, r.options), e.each(s, function (t, s)
        {
            return e.isFunction(s) ? (h[t] = function ()
            {
                var e = function ()
                {
                    return i.prototype[t].apply(this, arguments)
                }, n = function (e)
                {
                    return i.prototype[t].apply(this, e)
                };
                return function ()
                {
                    var t, i = this._super, a = this._superApply;
                    return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
                }
            }(), void 0) : (h[t] = s, void 0)
        }), o.prototype = e.widget.extend(r, {widgetEventPrefix: a ? r.widgetEventPrefix || t : t}, h, {
            constructor: o,
            namespace: l,
            widgetName: t,
            widgetFullName: n
        }), a ? (e.each(a._childConstructors, function (t, i)
        {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
    }, e.widget.extend = function (t)
    {
        for (var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++)for (i in a[o])s = a[o][i], a[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
        return t
    }, e.widget.bridge = function (t, i)
    {
        var s = i.prototype.widgetFullName || t;
        e.fn[t] = function (a)
        {
            var o = "string" == typeof a, r = n.call(arguments, 1), h = this;
            return o ? this.each(function ()
            {
                var i, n = e.data(this, s);
                return "instance" === a ? (h = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + a + "'")
            }) : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each(function ()
            {
                var t = e.data(this, s);
                t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new i(a, this))
            })), h
        }
    }, e.Widget = function ()
    {
    }, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {disabled: !1, create: null},
        _createWidget: function (t, i)
        {
            i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = s++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (e)
                {
                    e.target === i && this.destroy()
                }
            }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function ()
        {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function ()
        {
            return this.element
        },
        option: function (t, i)
        {
            var s, n, a, o = t;
            if (0 === arguments.length)return e.widget.extend({}, this.options);
            if ("string" == typeof t)if (o = {}, s = t.split("."), t = s.shift(), s.length)
            {
                for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++)n[s[a]] = n[s[a]] || {}, n = n[s[a]];
                if (t = s.pop(), 1 === arguments.length)return void 0 === n[t] ? null : n[t];
                n[t] = i
            } else
            {
                if (1 === arguments.length)return void 0 === this.options[t] ? null : this.options[t];
                o[t] = i
            }
            return this._setOptions(o), this
        },
        _setOptions: function (e)
        {
            var t;
            for (t in e)this._setOption(t, e[t]);
            return this
        },
        _setOption: function (e, t)
        {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function ()
        {
            return this._setOptions({disabled: !1})
        },
        disable: function ()
        {
            return this._setOptions({disabled: !0})
        },
        _on: function (t, i, s)
        {
            var n, a = this;
            "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function (s, o)
            {
                function r()
                {
                    return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
                }

                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                var h = s.match(/^([\w:-]*)\s*(.*)$/), l = h[1] + a.eventNamespace, u = h[2];
                u ? n.delegate(u, l, r) : i.bind(l, r)
            })
        },
        _off: function (t, i)
        {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
        },
        _delay: function (e, t)
        {
            function i()
            {
                return ("string" == typeof e ? s[e] : e).apply(s, arguments)
            }

            var s = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function (t)
        {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function (t)
                {
                    e(t.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function (t)
                {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (t)
        {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function (t)
                {
                    e(t.currentTarget).addClass("ui-state-focus")
                }, focusout: function (t)
                {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (t, i, s)
        {
            var n, a, o = this.options[t];
            if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)for (n in a)n in i || (i[n] = a[n]);
            return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, e.each({show: "fadeIn", hide: "fadeOut"}, function (t, i)
    {
        e.Widget.prototype["_" + t] = function (s, n, a)
        {
            "string" == typeof n && (n = {effect: n});
            var o, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
            n = n || {}, "number" == typeof n && (n = {duration: n}), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function (i)
            {
                e(this)[t](), a && a.call(s[0]), i()
            })
        }
    }), e.widget;
    var a = !1;
    e(document).mouseup(function ()
    {
        a = !1
    }), e.widget("ui.mouse", {
        version: "1.11.4",
        options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
        _mouseInit: function ()
        {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function (e)
            {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function (i)
            {
                return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function ()
        {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (t)
        {
            if (!a)
            {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var i = this, s = 1 === t.which, n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function ()
                {
                    i.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e)
                {
                    return i._mouseMove(e)
                }, this._mouseUpDelegate = function (e)
                {
                    return i._mouseUp(e)
                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), a = !0, !0)) : !0
            }
        },
        _mouseMove: function (t)
        {
            if (this._mouseMoved)
            {
                if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button)return this._mouseUp(t);
                if (!t.which)return this._mouseUp(t)
            }
            return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        },
        _mouseUp: function (t)
        {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), a = !1, !1
        },
        _mouseDistanceMet: function (e)
        {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function ()
        {
            return this.mouseDelayMet
        },
        _mouseStart: function ()
        {
        },
        _mouseDrag: function ()
        {
        },
        _mouseStop: function ()
        {
        },
        _mouseCapture: function ()
        {
            return !0
        }
    }), e.widget("ui.draggable", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function ()
        {
            "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
        },
        _setOption: function (e, t)
        {
            this._super(e, t), "handle" === e && (this._removeHandleClassName(), this._setHandleClassName())
        },
        _destroy: function ()
        {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), this._mouseDestroy(), void 0)
        },
        _mouseCapture: function (t)
        {
            var i = this.options;
            return this._blurActiveElement(t), this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
        },
        _blockFrames: function (t)
        {
            this.iframeBlocks = this.document.find(t).map(function ()
            {
                var t = e(this);
                return e("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function ()
        {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _blurActiveElement: function (t)
        {
            var i = this.document[0];
            if (this.handleElement.is(t.target))try
            {
                i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && e(i.activeElement).blur()
            } catch (s)
            {
            }
        },
        _mouseStart: function (t)
        {
            var i = this.options;
            return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function ()
            {
                return "fixed" === e(this).css("position")
            }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._normalizeRightBottom(), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
        },
        _refreshOffsets: function (e)
        {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }, this.offset.click = {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top}
        },
        _mouseDrag: function (t, i)
        {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i)
            {
                var s = this._uiHash();
                if (this._trigger("drag", t, s) === !1)return this._mouseUp({}), !1;
                this.position = s.position
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
        },
        _mouseStop: function (t)
        {
            var i = this, s = !1;
            return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function ()
            {
                i._trigger("stop", t) !== !1 && i._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(), !1
        },
        _mouseUp: function (t)
        {
            return this._unblockFrames(), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.focus(), e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function ()
        {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function (t)
        {
            return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function ()
        {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function ()
        {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function (t)
        {
            var i = this.options, s = e.isFunction(i.helper), n = s ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
        },
        _setPositionRelative: function ()
        {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function (t)
        {
            "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left"in t && (this.offset.click.left = t.left + this.margins.left), "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top"in t && (this.offset.click.top = t.top + this.margins.top), "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _isRootNode: function (e)
        {
            return /(html|body)/i.test(e.tagName) || e === this.document[0]
        },
        _getParentOffset: function ()
        {
            var t = this.offsetParent.offset(), i = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function ()
        {
            if ("relative" !== this.cssPosition)return {top: 0, left: 0};
            var e = this.element.position(), t = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
                left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function ()
        {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function ()
        {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function ()
        {
            var t, i, s, n = this.options, a = this.document[0];
            return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, e(a).width() - this.helperProportions.width - this.margins.left, (e(a).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], s && (t = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0)
        },
        _convertPositionTo: function (e, t)
        {
            t || (t = this.position);
            var i = "absolute" === e ? 1 : -1, s = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
                left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function (e, t)
        {
            var i, s, n, a, o = this.options, r = this._isRootNode(this.scrollParent[0]), h = e.pageX, l = e.pageY;
            return r && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }), t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a), "y" === o.axis && (h = this.originalPageX), "x" === o.axis && (l = this.originalPageY)), {
                top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
                left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function ()
        {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
        },
        _normalizeRightBottom: function ()
        {
            "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
        },
        _trigger: function (t, i, s)
        {
            return s = s || this._uiHash(), e.ui.plugin.call(this, t, [i, s, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), e.Widget.prototype._trigger.call(this, t, i, s)
        },
        plugins: {},
        _uiHash: function ()
        {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), e.ui.plugin.add("draggable", "connectToSortable", {
        start: function (t, i, s)
        {
            var n = e.extend({}, i, {item: s.element});
            s.sortables = [], e(s.options.connectToSortable).each(function ()
            {
                var i = e(this).sortable("instance");
                i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", t, n))
            })
        }, stop: function (t, i, s)
        {
            var n = e.extend({}, i, {item: s.element});
            s.cancelHelperRemoval = !1, e.each(s.sortables, function ()
            {
                var e = this;
                e.isOver ? (e.isOver = 0, s.cancelHelperRemoval = !0, e.cancelHelperRemoval = !1, e._storedCSS = {
                    position: e.placeholder.css("position"),
                    top: e.placeholder.css("top"),
                    left: e.placeholder.css("left")
                }, e._mouseStop(t), e.options.helper = e.options._helper) : (e.cancelHelperRemoval = !0, e._trigger("deactivate", t, n))
            })
        }, drag: function (t, i, s)
        {
            e.each(s.sortables, function ()
            {
                var n = !1, a = this;
                a.positionAbs = s.positionAbs, a.helperProportions = s.helperProportions, a.offset.click = s.offset.click, a._intersectsWith(a.containerCache) && (n = !0, e.each(s.sortables, function ()
                {
                    return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== a && this._intersectsWith(this.containerCache) && e.contains(a.element[0], this.element[0]) && (n = !1), n
                })), n ? (a.isOver || (a.isOver = 1, s._parent = i.helper.parent(), a.currentItem = i.helper.appendTo(a.element).data("ui-sortable-item", !0), a.options._helper = a.options.helper, a.options.helper = function ()
                {
                    return i.helper[0]
                }, t.target = a.currentItem[0], a._mouseCapture(t, !0), a._mouseStart(t, !0, !0), a.offset.click.top = s.offset.click.top, a.offset.click.left = s.offset.click.left, a.offset.parent.left -= s.offset.parent.left - a.offset.parent.left, a.offset.parent.top -= s.offset.parent.top - a.offset.parent.top, s._trigger("toSortable", t), s.dropped = a.element, e.each(s.sortables, function ()
                {
                    this.refreshPositions()
                }), s.currentItem = s.element, a.fromOutside = s), a.currentItem && (a._mouseDrag(t), i.position = a.position)) : a.isOver && (a.isOver = 0, a.cancelHelperRemoval = !0, a.options._revert = a.options.revert, a.options.revert = !1, a._trigger("out", t, a._uiHash(a)), a._mouseStop(t, !0), a.options.revert = a.options._revert, a.options.helper = a.options._helper, a.placeholder && a.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(t), i.position = s._generatePosition(t, !0), s._trigger("fromSortable", t), s.dropped = !1, e.each(s.sortables, function ()
                {
                    this.refreshPositions()
                }))
            })
        }
    }), e.ui.plugin.add("draggable", "cursor", {
        start: function (t, i, s)
        {
            var n = e("body"), a = s.options;
            n.css("cursor") && (a._cursor = n.css("cursor")), n.css("cursor", a.cursor)
        }, stop: function (t, i, s)
        {
            var n = s.options;
            n._cursor && e("body").css("cursor", n._cursor)
        }
    }), e.ui.plugin.add("draggable", "opacity", {
        start: function (t, i, s)
        {
            var n = e(i.helper), a = s.options;
            n.css("opacity") && (a._opacity = n.css("opacity")), n.css("opacity", a.opacity)
        }, stop: function (t, i, s)
        {
            var n = s.options;
            n._opacity && e(i.helper).css("opacity", n._opacity)
        }
    }), e.ui.plugin.add("draggable", "scroll", {
        start: function (e, t, i)
        {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
        }, drag: function (t, i, s)
        {
            var n = s.options, a = !1, o = s.scrollParentNotHidden[0], r = s.document[0];
            o !== r && "HTML" !== o.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + o.offsetHeight - t.pageY < n.scrollSensitivity ? o.scrollTop = a = o.scrollTop + n.scrollSpeed : t.pageY - s.overflowOffset.top < n.scrollSensitivity && (o.scrollTop = a = o.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + o.offsetWidth - t.pageX < n.scrollSensitivity ? o.scrollLeft = a = o.scrollLeft + n.scrollSpeed : t.pageX - s.overflowOffset.left < n.scrollSensitivity && (o.scrollLeft = a = o.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (t.pageY - e(r).scrollTop() < n.scrollSensitivity ? a = e(r).scrollTop(e(r).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(r).scrollTop()) < n.scrollSensitivity && (a = e(r).scrollTop(e(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (t.pageX - e(r).scrollLeft() < n.scrollSensitivity ? a = e(r).scrollLeft(e(r).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(r).scrollLeft()) < n.scrollSensitivity && (a = e(r).scrollLeft(e(r).scrollLeft() + n.scrollSpeed)))), a !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(s, t)
        }
    }), e.ui.plugin.add("draggable", "snap", {
        start: function (t, i, s)
        {
            var n = s.options;
            s.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function ()
            {
                var t = e(this), i = t.offset();
                this !== s.element[0] && s.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        }, drag: function (t, i, s)
        {
            var n, a, o, r, h, l, u, d, c, p, f = s.options, m = f.snapTolerance, g = i.offset.left, v = g + s.helperProportions.width, y = i.offset.top, b = y + s.helperProportions.height;
            for (c = s.snapElements.length - 1; c >= 0; c--)h = s.snapElements[c].left - s.margins.left, l = h + s.snapElements[c].width, u = s.snapElements[c].top - s.margins.top, d = u + s.snapElements[c].height, h - m > v || g > l + m || u - m > b || y > d + m || !e.contains(s.snapElements[c].item.ownerDocument, s.snapElements[c].item) ? (s.snapElements[c].snapping && s.options.snap.release && s.options.snap.release.call(s.element, t, e.extend(s._uiHash(), {snapItem: s.snapElements[c].item})), s.snapElements[c].snapping = !1) : ("inner" !== f.snapMode && (n = m >= Math.abs(u - b), a = m >= Math.abs(d - y), o = m >= Math.abs(h - v), r = m >= Math.abs(l - g), n && (i.position.top = s._convertPositionTo("relative", {
                top: u - s.helperProportions.height,
                left: 0
            }).top), a && (i.position.top = s._convertPositionTo("relative", {
                top: d,
                left: 0
            }).top), o && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: h - s.helperProportions.width
            }).left), r && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left)), p = n || a || o || r, "outer" !== f.snapMode && (n = m >= Math.abs(u - y), a = m >= Math.abs(d - b), o = m >= Math.abs(h - g), r = m >= Math.abs(l - v), n && (i.position.top = s._convertPositionTo("relative", {
                top: u,
                left: 0
            }).top), a && (i.position.top = s._convertPositionTo("relative", {
                top: d - s.helperProportions.height,
                left: 0
            }).top), o && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: h
            }).left), r && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: l - s.helperProportions.width
            }).left)), !s.snapElements[c].snapping && (n || a || o || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, t, e.extend(s._uiHash(), {snapItem: s.snapElements[c].item})), s.snapElements[c].snapping = n || a || o || r || p)
        }
    }), e.ui.plugin.add("draggable", "stack", {
        start: function (t, i, s)
        {
            var n, a = s.options, o = e.makeArray(e(a.stack)).sort(function (t, i)
            {
                return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
            });
            o.length && (n = parseInt(e(o[0]).css("zIndex"), 10) || 0, e(o).each(function (t)
            {
                e(this).css("zIndex", n + t)
            }), this.css("zIndex", n + o.length))
        }
    }), e.ui.plugin.add("draggable", "zIndex", {
        start: function (t, i, s)
        {
            var n = e(i.helper), a = s.options;
            n.css("zIndex") && (a._zIndex = n.css("zIndex")), n.css("zIndex", a.zIndex)
        }, stop: function (t, i, s)
        {
            var n = s.options;
            n._zIndex && e(i.helper).css("zIndex", n._zIndex)
        }
    }), e.ui.draggable, e.widget("ui.slider", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function ()
        {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function ()
        {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function ()
        {
            var t, i, s = this.options, n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), a = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>", o = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), t = n.length; i > t; t++)o.push(a);
            this.handles = n.add(e(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (t)
            {
                e(this).data("ui-slider-handle-index", t)
            })
        },
        _createRange: function ()
        {
            var t = this.options, i = "";
            t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = e("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function ()
        {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
        },
        _destroy: function ()
        {
            this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function (t)
        {
            var i, s, n, a, o, r, h, l, u = this, d = this.options;
            return d.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: t.pageX,
                y: t.pageY
            }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (t)
            {
                var i = Math.abs(s - u.values(t));
                (n > i || n === i && (t === u._lastChangedValue || u.values(t) === d.min)) && (n = i, a = e(this), o = t)
            }), r = this._start(t, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), h = a.offset(), l = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - h.left - a.width() / 2,
                top: t.pageY - h.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, s), this._animateOff = !0, !0))
        },
        _mouseStart: function ()
        {
            return !0
        },
        _mouseDrag: function (e)
        {
            var t = {x: e.pageX, y: e.pageY}, i = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, i), !1
        },
        _mouseStop: function (e)
        {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function ()
        {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (e)
        {
            var t, i, s, n, a;
            return "horizontal" === this.orientation ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / t, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a)
        },
        _start: function (e, t)
        {
            var i = {handle: this.handles[t], value: this.value()};
            return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i)
        },
        _slide: function (e, t, i)
        {
            var s, n, a;
            this.options.values && this.options.values.length ? (s = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > s || 1 === t && s > i) && (i = s), i !== this.values(t) && (n = this.values(), n[t] = i, a = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i,
                values: n
            }), s = this.values(t ? 0 : 1), a !== !1 && this.values(t, i))) : i !== this.value() && (a = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i
            }), a !== !1 && this.value(i))
        },
        _stop: function (e, t)
        {
            var i = {handle: this.handles[t], value: this.value()};
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i)
        },
        _change: function (e, t)
        {
            if (!this._keySliding && !this._mouseSliding)
            {
                var i = {handle: this.handles[t], value: this.value()};
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, i)
            }
        },
        value: function (e)
        {
            return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), void 0) : this._value()
        },
        values: function (t, i)
        {
            var s, n, a;
            if (arguments.length > 1)return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0;
            if (!arguments.length)return this._values();
            if (!e.isArray(arguments[0]))return this.options.values && this.options.values.length ? this._values(t) : this.value();
            for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1)s[a] = this._trimAlignValue(n[a]), this._change(null, a);
            this._refreshValue()
        },
        _setOption: function (t, i)
        {
            var s, n = 0;
            switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (n = this.options.values.length), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!i), this._super(t, i), t)
            {
                case"orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                    break;
                case"value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case"values":
                    for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1)this._change(null, s);
                    this._animateOff = !1;
                    break;
                case"step":
                case"min":
                case"max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case"range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function ()
        {
            var e = this.options.value;
            return e = this._trimAlignValue(e)
        },
        _values: function (e)
        {
            var t, i, s;
            if (arguments.length)return t = this.options.values[e], t = this._trimAlignValue(t);
            if (this.options.values && this.options.values.length)
            {
                for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)i[s] = this._trimAlignValue(i[s]);
                return i
            }
            return []
        },
        _trimAlignValue: function (e)
        {
            if (this._valueMin() >= e)return this._valueMin();
            if (e >= this._valueMax())return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1, i = (e - this._valueMin()) % t, s = e - i;
            return 2 * Math.abs(i) >= t && (s += i > 0 ? t : -t), parseFloat(s.toFixed(5))
        },
        _calculateNewMax: function ()
        {
            var e = this.options.max, t = this._valueMin(), i = this.options.step, s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i;
            e = s + t, this.max = parseFloat(e.toFixed(this._precision()))
        },
        _precision: function ()
        {
            var e = this._precisionOf(this.options.step);
            return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e
        },
        _precisionOf: function (e)
        {
            var t = "" + e, i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _valueMin: function ()
        {
            return this.options.min
        },
        _valueMax: function ()
        {
            return this.max
        },
        _refreshValue: function ()
        {
            var t, i, s, n, a, o = this.options.range, r = this.options, h = this, l = this._animateOff ? !1 : r.animate, u = {};
            this.options.values && this.options.values.length ? this.handles.each(function (s)
            {
                i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), u["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", e(this).stop(1, 1)[l ? "animate" : "css"](u, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({left: i + "%"}, r.animate), 1 === s && h.range[l ? "animate" : "css"]({width: i - t + "%"}, {
                    queue: !1,
                    duration: r.animate
                })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({bottom: i + "%"}, r.animate), 1 === s && h.range[l ? "animate" : "css"]({height: i - t + "%"}, {
                    queue: !1,
                    duration: r.animate
                }))), t = i
            }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({width: i + "%"}, r.animate), "max" === o && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({width: 100 - i + "%"}, {
                queue: !1,
                duration: r.animate
            }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({height: i + "%"}, r.animate), "max" === o && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({height: 100 - i + "%"}, {
                queue: !1,
                duration: r.animate
            }))
        },
        _handleEvents: {
            keydown: function (t)
            {
                var i, s, n, a, o = e(t.target).data("ui-slider-handle-index");
                switch (t.keyCode)
                {
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_UP:
                    case e.ui.keyCode.PAGE_DOWN:
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, e(t.target).addClass("ui-state-active"), i = this._start(t, o), i === !1))return
                }
                switch (a = this.options.step, s = n = this.options.values && this.options.values.length ? this.values(o) : this.value(), t.keyCode)
                {
                    case e.ui.keyCode.HOME:
                        n = this._valueMin();
                        break;
                    case e.ui.keyCode.END:
                        n = this._valueMax();
                        break;
                    case e.ui.keyCode.PAGE_UP:
                        n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                        if (s === this._valueMax())return;
                        n = this._trimAlignValue(s + a);
                        break;
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (s === this._valueMin())return;
                        n = this._trimAlignValue(s - a)
                }
                this._slide(t, o, n)
            }, keyup: function (t)
            {
                var i = e(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass("ui-state-active"))
            }
        }
    });
    var o = "ui-effects-", r = e;
    e.effects = {effect: {}}, function (e, t)
    {
        function i(e, t, i)
        {
            var s = d[t.type] || {};
            return null == e ? i || !t.def ? null : t.def : (e = s.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : s.mod ? (e + s.mod) % s.mod : 0 > e ? 0 : e > s.max ? s.max : e)
        }

        function s(i)
        {
            var s = l(), n = s._rgba = [];
            return i = i.toLowerCase(), f(h, function (e, a)
            {
                var o, r = a.re.exec(i), h = r && a.parse(r), l = a.space || "rgba";
                return h ? (o = s[l](h), s[u[l].cache] = o[u[l].cache], n = s._rgba = o._rgba, !1) : t
            }), n.length ? ("0,0,0,0" === n.join() && e.extend(n, a.transparent), s) : a[i]
        }

        function n(e, t, i)
        {
            return i = (i + 1) % 1, 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + 6 * (t - e) * (2 / 3 - i) : e
        }

        var a, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", r = /^([\-+])=\s*(\d+\.?\d*)/, h = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (e)
            {
                return [e[1], e[2], e[3], e[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (e)
            {
                return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (e)
            {
                return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (e)
            {
                return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function (e)
            {
                return [e[1], e[2] / 100, e[3] / 100, e[4]]
            }
        }], l = e.Color = function (t, i, s, n)
        {
            return new e.Color.fn.parse(t, i, s, n)
        }, u = {
            rgba: {props: {red: {idx: 0, type: "byte"}, green: {idx: 1, type: "byte"}, blue: {idx: 2, type: "byte"}}},
            hsla: {
                props: {
                    hue: {idx: 0, type: "degrees"},
                    saturation: {idx: 1, type: "percent"},
                    lightness: {idx: 2, type: "percent"}
                }
            }
        }, d = {
            "byte": {floor: !0, max: 255},
            percent: {max: 1},
            degrees: {mod: 360, floor: !0}
        }, c = l.support = {}, p = e("<p>")[0], f = e.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)", c.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(u, function (e, t)
        {
            t.cache = "_" + e, t.props.alpha = {idx: 3, type: "percent", def: 1}
        }), l.fn = e.extend(l.prototype, {
            parse: function (n, o, r, h)
            {
                if (n === t)return this._rgba = [null, null, null, null], this;
                (n.jquery || n.nodeType) && (n = e(n).css(o), o = t);
                var d = this, c = e.type(n), p = this._rgba = [];
                return o !== t && (n = [n, o, r, h], c = "array"), "string" === c ? this.parse(s(n) || a._default) : "array" === c ? (f(u.rgba.props, function (e, t)
                {
                    p[t.idx] = i(n[t.idx], t)
                }), this) : "object" === c ? (n instanceof l ? f(u, function (e, t)
                {
                    n[t.cache] && (d[t.cache] = n[t.cache].slice())
                }) : f(u, function (t, s)
                {
                    var a = s.cache;
                    f(s.props, function (e, t)
                    {
                        if (!d[a] && s.to)
                        {
                            if ("alpha" === e || null == n[e])return;
                            d[a] = s.to(d._rgba)
                        }
                        d[a][t.idx] = i(n[e], t, !0)
                    }), d[a] && 0 > e.inArray(null, d[a].slice(0, 3)) && (d[a][3] = 1, s.from && (d._rgba = s.from(d[a])))
                }), this) : t
            }, is: function (e)
            {
                var i = l(e), s = !0, n = this;
                return f(u, function (e, a)
                {
                    var o, r = i[a.cache];
                    return r && (o = n[a.cache] || a.to && a.to(n._rgba) || [], f(a.props, function (e, i)
                    {
                        return null != r[i.idx] ? s = r[i.idx] === o[i.idx] : t
                    })), s
                }), s
            }, _space: function ()
            {
                var e = [], t = this;
                return f(u, function (i, s)
                {
                    t[s.cache] && e.push(i)
                }), e.pop()
            }, transition: function (e, t)
            {
                var s = l(e), n = s._space(), a = u[n], o = 0 === this.alpha() ? l("transparent") : this, r = o[a.cache] || a.to(o._rgba), h = r.slice();
                return s = s[a.cache], f(a.props, function (e, n)
                {
                    var a = n.idx, o = r[a], l = s[a], u = d[n.type] || {};
                    null !== l && (null === o ? h[a] = l : (u.mod && (l - o > u.mod / 2 ? o += u.mod : o - l > u.mod / 2 && (o -= u.mod)), h[a] = i((l - o) * t + o, n)))
                }), this[n](h)
            }, blend: function (t)
            {
                if (1 === this._rgba[3])return this;
                var i = this._rgba.slice(), s = i.pop(), n = l(t)._rgba;
                return l(e.map(i, function (e, t)
                {
                    return (1 - s) * n[t] + s * e
                }))
            }, toRgbaString: function ()
            {
                var t = "rgba(", i = e.map(this._rgba, function (e, t)
                {
                    return null == e ? t > 2 ? 1 : 0 : e
                });
                return 1 === i[3] && (i.pop(), t = "rgb("), t + i.join() + ")"
            }, toHslaString: function ()
            {
                var t = "hsla(", i = e.map(this.hsla(), function (e, t)
                {
                    return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e
                });
                return 1 === i[3] && (i.pop(), t = "hsl("), t + i.join() + ")"
            }, toHexString: function (t)
            {
                var i = this._rgba.slice(), s = i.pop();
                return t && i.push(~~(255 * s)), "#" + e.map(i, function (e)
                {
                    return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
                }).join("")
            }, toString: function ()
            {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }), l.fn.parse.prototype = l.fn, u.hsla.to = function (e)
        {
            if (null == e[0] || null == e[1] || null == e[2])return [null, null, null, e[3]];
            var t, i, s = e[0] / 255, n = e[1] / 255, a = e[2] / 255, o = e[3], r = Math.max(s, n, a), h = Math.min(s, n, a), l = r - h, u = r + h, d = .5 * u;
            return t = h === r ? 0 : s === r ? 60 * (n - a) / l + 360 : n === r ? 60 * (a - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= d ? l / u : l / (2 - u), [Math.round(t) % 360, i, d, null == o ? 1 : o]
        }, u.hsla.from = function (e)
        {
            if (null == e[0] || null == e[1] || null == e[2])return [null, null, null, e[3]];
            var t = e[0] / 360, i = e[1], s = e[2], a = e[3], o = .5 >= s ? s * (1 + i) : s + i - s * i, r = 2 * s - o;
            return [Math.round(255 * n(r, o, t + 1 / 3)), Math.round(255 * n(r, o, t)), Math.round(255 * n(r, o, t - 1 / 3)), a]
        }, f(u, function (s, n)
        {
            var a = n.props, o = n.cache, h = n.to, u = n.from;
            l.fn[s] = function (s)
            {
                if (h && !this[o] && (this[o] = h(this._rgba)), s === t)return this[o].slice();
                var n, r = e.type(s), d = "array" === r || "object" === r ? s : arguments, c = this[o].slice();
                return f(a, function (e, t)
                {
                    var s = d["object" === r ? e : t.idx];
                    null == s && (s = c[t.idx]), c[t.idx] = i(s, t)
                }), u ? (n = l(u(c)), n[o] = c, n) : l(c)
            }, f(a, function (t, i)
            {
                l.fn[t] || (l.fn[t] = function (n)
                {
                    var a, o = e.type(n), h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : s, l = this[h](), u = l[i.idx];
                    return "undefined" === o ? u : ("function" === o && (n = n.call(this, u), o = e.type(n)), null == n && i.empty ? this : ("string" === o && (a = r.exec(n), a && (n = u + parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))), l[i.idx] = n, this[h](l)))
                })
            })
        }), l.hook = function (t)
        {
            var i = t.split(" ");
            f(i, function (t, i)
            {
                e.cssHooks[i] = {
                    set: function (t, n)
                    {
                        var a, o, r = "";
                        if ("transparent" !== n && ("string" !== e.type(n) || (a = s(n))))
                        {
                            if (n = l(a || n), !c.rgba && 1 !== n._rgba[3])
                            {
                                for (o = "backgroundColor" === i ? t.parentNode : t; ("" === r || "transparent" === r) && o && o.style;)try
                                {
                                    r = e.css(o, "backgroundColor"), o = o.parentNode
                                } catch (h)
                                {
                                }
                                n = n.blend(r && "transparent" !== r ? r : "_default")
                            }
                            n = n.toRgbaString()
                        }
                        try
                        {
                            t.style[i] = n
                        } catch (h)
                        {
                        }
                    }
                }, e.fx.step[i] = function (t)
                {
                    t.colorInit || (t.start = l(t.elem, i), t.end = l(t.end), t.colorInit = !0), e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos))
                }
            })
        }, l.hook(o), e.cssHooks.borderColor = {
            expand: function (e)
            {
                var t = {};
                return f(["Top", "Right", "Bottom", "Left"], function (i, s)
                {
                    t["border" + s + "Color"] = e
                }), t
            }
        }, a = e.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(r), function ()
    {
        function t(t)
        {
            var i, s, n = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, a = {};
            if (n && n.length && n[0] && n[n[0]])for (s = n.length; s--;)i = n[s], "string" == typeof n[i] && (a[e.camelCase(i)] = n[i]); else for (i in n)"string" == typeof n[i] && (a[i] = n[i]);
            return a
        }

        function i(t, i)
        {
            var s, a, o = {};
            for (s in i)a = i[s], t[s] !== a && (n[s] || (e.fx.step[s] || !isNaN(parseFloat(a))) && (o[s] = a));
            return o
        }

        var s = ["add", "remove", "toggle"], n = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, i)
        {
            e.fx.step[i] = function (e)
            {
                ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (r.style(e.elem, i, e.end), e.setAttr = !0)
            }
        }), e.fn.addBack || (e.fn.addBack = function (e)
        {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }), e.effects.animateClass = function (n, a, o, r)
        {
            var h = e.speed(a, o, r);
            return this.queue(function ()
            {
                var a, o = e(this), r = o.attr("class") || "", l = h.children ? o.find("*").addBack() : o;
                l = l.map(function ()
                {
                    var i = e(this);
                    return {el: i, start: t(this)}
                }), a = function ()
                {
                    e.each(s, function (e, t)
                    {
                        n[t] && o[t + "Class"](n[t])
                    })
                }, a(), l = l.map(function ()
                {
                    return this.end = t(this.el[0]), this.diff = i(this.start, this.end), this
                }), o.attr("class", r), l = l.map(function ()
                {
                    var t = this, i = e.Deferred(), s = e.extend({}, h, {
                        queue: !1, complete: function ()
                        {
                            i.resolve(t)
                        }
                    });
                    return this.el.animate(this.diff, s), i.promise()
                }), e.when.apply(e, l.get()).done(function ()
                {
                    a(), e.each(arguments, function ()
                    {
                        var t = this.el;
                        e.each(this.diff, function (e)
                        {
                            t.css(e, "")
                        })
                    }), h.complete.call(o[0])
                })
            })
        }, e.fn.extend({
            addClass: function (t)
            {
                return function (i, s, n, a)
                {
                    return s ? e.effects.animateClass.call(this, {add: i}, s, n, a) : t.apply(this, arguments)
                }
            }(e.fn.addClass), removeClass: function (t)
            {
                return function (i, s, n, a)
                {
                    return arguments.length > 1 ? e.effects.animateClass.call(this, {remove: i}, s, n, a) : t.apply(this, arguments)
                }
            }(e.fn.removeClass), toggleClass: function (t)
            {
                return function (i, s, n, a, o)
                {
                    return "boolean" == typeof s || void 0 === s ? n ? e.effects.animateClass.call(this, s ? {add: i} : {remove: i}, n, a, o) : t.apply(this, arguments) : e.effects.animateClass.call(this, {toggle: i}, s, n, a)
                }
            }(e.fn.toggleClass), switchClass: function (t, i, s, n, a)
            {
                return e.effects.animateClass.call(this, {add: i, remove: t}, s, n, a)
            }
        })
    }(), function ()
    {
        function t(t, i, s, n)
        {
            return e.isPlainObject(t) && (i = t, t = t.effect), t = {effect: t}, null == i && (i = {}), e.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (n = s, s = i, i = {}), e.isFunction(s) && (n = s, s = null), i && e.extend(t, i), s = s || i.duration, t.duration = e.fx.off ? 0 : "number" == typeof s ? s : s in e.fx.speeds ? e.fx.speeds[s] : e.fx.speeds._default, t.complete = n || i.complete, t
        }

        function i(t)
        {
            return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
        }

        e.extend(e.effects, {
            version: "1.11.4", save: function (e, t)
            {
                for (var i = 0; t.length > i; i++)null !== t[i] && e.data(o + t[i], e[0].style[t[i]])
            }, restore: function (e, t)
            {
                var i, s;
                for (s = 0; t.length > s; s++)null !== t[s] && (i = e.data(o + t[s]), void 0 === i && (i = ""), e.css(t[s], i))
            }, setMode: function (e, t)
            {
                return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
            }, getBaseline: function (e, t)
            {
                var i, s;
                switch (e[0])
                {
                    case"top":
                        i = 0;
                        break;
                    case"middle":
                        i = .5;
                        break;
                    case"bottom":
                        i = 1;
                        break;
                    default:
                        i = e[0] / t.height
                }
                switch (e[1])
                {
                    case"left":
                        s = 0;
                        break;
                    case"center":
                        s = .5;
                        break;
                    case"right":
                        s = 1;
                        break;
                    default:
                        s = e[1] / t.width
                }
                return {x: s, y: i}
            }, createWrapper: function (t)
            {
                if (t.parent().is(".ui-effects-wrapper"))return t.parent();
                var i = {
                    width: t.outerWidth(!0),
                    height: t.outerHeight(!0),
                    "float": t.css("float")
                }, s = e("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }), n = {width: t.width(), height: t.height()}, a = document.activeElement;
                try
                {
                    a.id
                } catch (o)
                {
                    a = document.body
                }
                return t.wrap(s), (t[0] === a || e.contains(t[0], a)) && e(a).focus(), s = t.parent(), "static" === t.css("position") ? (s.css({position: "relative"}), t.css({position: "relative"})) : (e.extend(i, {
                    position: t.css("position"),
                    zIndex: t.css("z-index")
                }), e.each(["top", "left", "bottom", "right"], function (e, s)
                {
                    i[s] = t.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                }), t.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), t.css(n), s.css(i).show()
            }, removeWrapper: function (t)
            {
                var i = document.activeElement;
                return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t
            }, setTransition: function (t, i, s, n)
            {
                return n = n || {}, e.each(i, function (e, i)
                {
                    var a = t.cssUnit(i);
                    a[0] > 0 && (n[i] = a[0] * s + a[1])
                }), n
            }
        }), e.fn.extend({
            effect: function ()
            {
                function i(t)
                {
                    function i()
                    {
                        e.isFunction(a) && a.call(n[0]), e.isFunction(t) && t()
                    }

                    var n = e(this), a = s.complete, r = s.mode;
                    (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), i()) : o.call(n[0], s, i)
                }

                var s = t.apply(this, arguments), n = s.mode, a = s.queue, o = e.effects.effect[s.effect];
                return e.fx.off || !o ? n ? this[n](s.duration, s.complete) : this.each(function ()
                {
                    s.complete && s.complete.call(this)
                }) : a === !1 ? this.each(i) : this.queue(a || "fx", i)
            }, show: function (e)
            {
                return function (s)
                {
                    if (i(s))return e.apply(this, arguments);
                    var n = t.apply(this, arguments);
                    return n.mode = "show", this.effect.call(this, n)
                }
            }(e.fn.show), hide: function (e)
            {
                return function (s)
                {
                    if (i(s))return e.apply(this, arguments);
                    var n = t.apply(this, arguments);
                    return n.mode = "hide", this.effect.call(this, n)
                }
            }(e.fn.hide), toggle: function (e)
            {
                return function (s)
                {
                    if (i(s) || "boolean" == typeof s)return e.apply(this, arguments);
                    var n = t.apply(this, arguments);
                    return n.mode = "toggle", this.effect.call(this, n)
                }
            }(e.fn.toggle), cssUnit: function (t)
            {
                var i = this.css(t), s = [];
                return e.each(["em", "px", "%", "pt"], function (e, t)
                {
                    i.indexOf(t) > 0 && (s = [parseFloat(i), t])
                }), s
            }
        })
    }(), function ()
    {
        var t = {};
        e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, i)
        {
            t[i] = function (t)
            {
                return Math.pow(t, e + 2)
            }
        }), e.extend(t, {
            Sine: function (e)
            {
                return 1 - Math.cos(e * Math.PI / 2)
            }, Circ: function (e)
            {
                return 1 - Math.sqrt(1 - e * e)
            }, Elastic: function (e)
            {
                return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
            }, Back: function (e)
            {
                return e * e * (3 * e - 2)
            }, Bounce: function (e)
            {
                for (var t, i = 4; ((t = Math.pow(2, --i)) - 1) / 11 > e;);
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
            }
        }), e.each(t, function (t, i)
        {
            e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function (e)
            {
                return 1 - i(1 - e)
            }, e.easing["easeInOut" + t] = function (e)
            {
                return .5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2
            }
        })
    }(), e.effects, e.effects.effect.fade = function (t, i)
    {
        var s = e(this), n = e.effects.setMode(s, t.mode || "toggle");
        s.animate({opacity: n}, {queue: !1, duration: t.duration, easing: t.easing, complete: i})
    }, e.effects.effect.transfer = function (t, i)
    {
        var s = e(this), n = e(t.to), a = "fixed" === n.css("position"), o = e("body"), r = a ? o.scrollTop() : 0, h = a ? o.scrollLeft() : 0, l = n.offset(), u = {
            top: l.top - r,
            left: l.left - h,
            height: n.innerHeight(),
            width: n.innerWidth()
        }, d = s.offset(), c = e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({
            top: d.top - r,
            left: d.left - h,
            height: s.innerHeight(),
            width: s.innerWidth(),
            position: a ? "fixed" : "absolute"
        }).animate(u, t.duration, t.easing, function ()
        {
            c.remove(), i()
        })
    }
});
/*! device.js 0.2.7 */

(function ()
{
    var a, b, c, d, e, f, g, h, i, j;
    b = window.device, a = {}, window.device = a, d = window.document.documentElement, j = window.navigator.userAgent.toLowerCase(), a.ios = function ()
    {
        return a.iphone() || a.ipod() || a.ipad()
    }, a.iphone = function ()
    {
        return !a.windows() && e("iphone")
    }, a.ipod = function ()
    {
        return e("ipod")
    }, a.ipad = function ()
    {
        return e("ipad")
    }, a.android = function ()
    {
        return !a.windows() && e("android")
    }, a.androidPhone = function ()
    {
        return a.android() && e("mobile")
    }, a.androidTablet = function ()
    {
        return a.android() && !e("mobile")
    }, a.blackberry = function ()
    {
        return e("blackberry") || e("bb10") || e("rim")
    }, a.blackberryPhone = function ()
    {
        return a.blackberry() && !e("tablet")
    }, a.blackberryTablet = function ()
    {
        return a.blackberry() && e("tablet")
    }, a.windows = function ()
    {
        return e("windows")
    }, a.windowsPhone = function ()
    {
        return a.windows() && e("phone")
    }, a.windowsTablet = function ()
    {
        return a.windows() && e("touch") && !a.windowsPhone()
    }, a.fxos = function ()
    {
        return (e("(mobile;") || e("(tablet;")) && e("; rv:")
    }, a.fxosPhone = function ()
    {
        return a.fxos() && e("mobile")
    }, a.fxosTablet = function ()
    {
        return a.fxos() && e("tablet")
    }, a.meego = function ()
    {
        return e("meego")
    }, a.cordova = function ()
    {
        return window.cordova && "file:" === location.protocol
    }, a.nodeWebkit = function ()
    {
        return "object" == typeof window.process
    }, a.mobile = function ()
    {
        return a.androidPhone() || a.iphone() || a.ipod() || a.windowsPhone() || a.blackberryPhone() || a.fxosPhone() || a.meego()
    }, a.tablet = function ()
    {
        return a.ipad() || a.androidTablet() || a.blackberryTablet() || a.windowsTablet() || a.fxosTablet()
    }, a.desktop = function ()
    {
        return !a.tablet() && !a.mobile()
    }, a.television = function ()
    {
        var a;
        for (television = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"], a = 0; a < television.length;)
        {
            if (e(television[a]))return !0;
            a++
        }
        return !1
    }, a.portrait = function ()
    {
        return window.innerHeight / window.innerWidth > 1
    }, a.landscape = function ()
    {
        return window.innerHeight / window.innerWidth < 1
    }, a.noConflict = function ()
    {
        return window.device = b, this
    }, e = function (a)
    {
        return -1 !== j.indexOf(a)
    }, g = function (a)
    {
        var b;
        return b = new RegExp(a, "i"), d.className.match(b)
    }, c = function (a)
    {
        var b = null;
        g(a) || (b = d.className.replace(/^\s+|\s+$/g, ""), d.className = b + " " + a)
    }, i = function (a)
    {
        g(a) && (d.className = d.className.replace(" " + a, ""))
    }, a.ios() ? a.ipad() ? c("ios ipad tablet") : a.iphone() ? c("ios iphone mobile") : a.ipod() && c("ios ipod mobile") : a.android() ? c(a.androidTablet() ? "android tablet" : "android mobile") : a.blackberry() ? c(a.blackberryTablet() ? "blackberry tablet" : "blackberry mobile") : a.windows() ? c(a.windowsTablet() ? "windows tablet" : a.windowsPhone() ? "windows mobile" : "desktop") : a.fxos() ? c(a.fxosTablet() ? "fxos tablet" : "fxos mobile") : a.meego() ? c("meego mobile") : a.nodeWebkit() ? c("node-webkit") : a.television() ? c("television") : a.desktop() && c("desktop"), a.cordova() && c("cordova"), f = function ()
    {
        a.landscape() ? (i("portrait"), c("landscape")) : (i("landscape"), c("portrait"))
    }, h = Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(h, f, !1) : window.attachEvent ? window.attachEvent(h, f) : window[h] = f, f(), "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function ()
    {
        return a
    }) : "undefined" != typeof module && module.exports ? module.exports = a : window.device = a
}).call(this);
/*! Hammer.JS - v2.0.6 - 2016-01-06
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the  license */

!function (a, b, c, d)
{
    "use strict";
    function e(a, b, c)
    {
        return setTimeout(j(a, c), b)
    }

    function f(a, b, c)
    {
        return Array.isArray(a) ? (g(a, c[b], c), !0) : !1
    }

    function g(a, b, c)
    {
        var e;
        if (a)if (a.forEach)a.forEach(b, c); else if (a.length !== d)for (e = 0; e < a.length;)b.call(c, a[e], e, a), e++; else for (e in a)a.hasOwnProperty(e) && b.call(c, a[e], e, a)
    }

    function h(b, c, d)
    {
        var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
        return function ()
        {
            var c = new Error("get-stack-trace"), d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", f = a.console && (a.console.warn || a.console.log);
            return f && f.call(a.console, e, d), b.apply(this, arguments)
        }
    }

    function i(a, b, c)
    {
        var d, e = b.prototype;
        d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && ha(d, c)
    }

    function j(a, b)
    {
        return function ()
        {
            return a.apply(b, arguments)
        }
    }

    function k(a, b)
    {
        return typeof a == ka ? a.apply(b ? b[0] || d : d, b) : a
    }

    function l(a, b)
    {
        return a === d ? b : a
    }

    function m(a, b, c)
    {
        g(q(b), function (b)
        {
            a.addEventListener(b, c, !1)
        })
    }

    function n(a, b, c)
    {
        g(q(b), function (b)
        {
            a.removeEventListener(b, c, !1)
        })
    }

    function o(a, b)
    {
        for (; a;)
        {
            if (a == b)return !0;
            a = a.parentNode
        }
        return !1
    }

    function p(a, b)
    {
        return a.indexOf(b) > -1
    }

    function q(a)
    {
        return a.trim().split(/\s+/g)
    }

    function r(a, b, c)
    {
        if (a.indexOf && !c)return a.indexOf(b);
        for (var d = 0; d < a.length;)
        {
            if (c && a[d][c] == b || !c && a[d] === b)return d;
            d++
        }
        return -1
    }

    function s(a)
    {
        return Array.prototype.slice.call(a, 0)
    }

    function t(a, b, c)
    {
        for (var d = [], e = [], f = 0; f < a.length;)
        {
            var g = b ? a[f][b] : a[f];
            r(e, g) < 0 && d.push(a[f]), e[f] = g, f++
        }
        return c && (d = b ? d.sort(function (a, c)
        {
            return a[b] > c[b]
        }) : d.sort()), d
    }

    function u(a, b)
    {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ia.length;)
        {
            if (c = ia[g], e = c ? c + f : b, e in a)return e;
            g++
        }
        return d
    }

    function v()
    {
        return qa++
    }

    function w(b)
    {
        var c = b.ownerDocument || b;
        return c.defaultView || c.parentWindow || a
    }

    function x(a, b)
    {
        var c = this;
        this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b)
        {
            k(a.options.enable, [a]) && c.handler(b)
        }, this.init()
    }

    function y(a)
    {
        var b, c = a.options.inputClass;
        return new (b = c ? c : ta ? M : ua ? P : sa ? R : L)(a, z)
    }

    function z(a, b, c)
    {
        var d = c.pointers.length, e = c.changedPointers.length, f = b & Aa && d - e === 0, g = b & (Ca | Da) && d - e === 0;
        c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
    }

    function A(a, b)
    {
        var c = a.session, d = b.pointers, e = d.length;
        c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = E(d);
        b.timeStamp = na(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);
        var j = F(b.deltaTime, b.deltaX, b.deltaY);
        b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = ma(j.x) > ma(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);
        var k = a.element;
        o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k
    }

    function B(a, b)
    {
        var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {};
        (b.eventType === Aa || f.eventType === Ca) && (e = a.prevDelta = {
            x: f.deltaX || 0,
            y: f.deltaY || 0
        }, d = a.offsetDelta = {x: c.x, y: c.y}), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
    }

    function C(a, b)
    {
        var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp;
        if (b.eventType != Da && (i > za || h.velocity === d))
        {
            var j = b.deltaX - h.deltaX, k = b.deltaY - h.deltaY, l = F(i, j, k);
            e = l.x, f = l.y, c = ma(l.x) > ma(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b
        } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
        b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
    }

    function D(a)
    {
        for (var b = [], c = 0; c < a.pointers.length;)b[c] = {
            clientX: la(a.pointers[c].clientX),
            clientY: la(a.pointers[c].clientY)
        }, c++;
        return {timeStamp: na(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY}
    }

    function E(a)
    {
        var b = a.length;
        if (1 === b)return {x: la(a[0].clientX), y: la(a[0].clientY)};
        for (var c = 0, d = 0, e = 0; b > e;)c += a[e].clientX, d += a[e].clientY, e++;
        return {x: la(c / b), y: la(d / b)}
    }

    function F(a, b, c)
    {
        return {x: b / a || 0, y: c / a || 0}
    }

    function G(a, b)
    {
        return a === b ? Ea : ma(a) >= ma(b) ? 0 > a ? Fa : Ga : 0 > b ? Ha : Ia
    }

    function H(a, b, c)
    {
        c || (c = Ma);
        var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e)
    }

    function I(a, b, c)
    {
        c || (c = Ma);
        var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI
    }

    function J(a, b)
    {
        return I(b[1], b[0], Na) + I(a[1], a[0], Na)
    }

    function K(a, b)
    {
        return H(b[0], b[1], Na) / H(a[0], a[1], Na)
    }

    function L()
    {
        this.evEl = Pa, this.evWin = Qa, this.allow = !0, this.pressed = !1, x.apply(this, arguments)
    }

    function M()
    {
        this.evEl = Ta, this.evWin = Ua, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }

    function N()
    {
        this.evTarget = Wa, this.evWin = Xa, this.started = !1, x.apply(this, arguments)
    }

    function O(a, b)
    {
        var c = s(a.touches), d = s(a.changedTouches);
        return b & (Ca | Da) && (c = t(c.concat(d), "identifier", !0)), [c, d]
    }

    function P()
    {
        this.evTarget = Za, this.targetIds = {}, x.apply(this, arguments)
    }

    function Q(a, b)
    {
        var c = s(a.touches), d = this.targetIds;
        if (b & (Aa | Ba) && 1 === c.length)return d[c[0].identifier] = !0, [c, c];
        var e, f, g = s(a.changedTouches), h = [], i = this.target;
        if (f = c.filter(function (a)
            {
                return o(a.target, i)
            }), b === Aa)for (e = 0; e < f.length;)d[f[e].identifier] = !0, e++;
        for (e = 0; e < g.length;)d[g[e].identifier] && h.push(g[e]), b & (Ca | Da) && delete d[g[e].identifier], e++;
        return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0
    }

    function R()
    {
        x.apply(this, arguments);
        var a = j(this.handler, this);
        this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a)
    }

    function S(a, b)
    {
        this.manager = a, this.set(b)
    }

    function T(a)
    {
        if (p(a, db))return db;
        var b = p(a, eb), c = p(a, fb);
        return b && c ? db : b || c ? b ? eb : fb : p(a, cb) ? cb : bb
    }

    function U(a)
    {
        this.options = ha({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = gb, this.simultaneous = {}, this.requireFail = []
    }

    function V(a)
    {
        return a & lb ? "cancel" : a & jb ? "end" : a & ib ? "move" : a & hb ? "start" : ""
    }

    function W(a)
    {
        return a == Ia ? "down" : a == Ha ? "up" : a == Fa ? "left" : a == Ga ? "right" : ""
    }

    function X(a, b)
    {
        var c = b.manager;
        return c ? c.get(a) : a
    }

    function Y()
    {
        U.apply(this, arguments)
    }

    function Z()
    {
        Y.apply(this, arguments), this.pX = null, this.pY = null
    }

    function $()
    {
        Y.apply(this, arguments)
    }

    function _()
    {
        U.apply(this, arguments), this._timer = null, this._input = null
    }

    function aa()
    {
        Y.apply(this, arguments)
    }

    function ba()
    {
        Y.apply(this, arguments)
    }

    function ca()
    {
        U.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }

    function da(a, b)
    {
        return b = b || {}, b.recognizers = l(b.recognizers, da.defaults.preset), new ea(a, b)
    }

    function ea(a, b)
    {
        this.options = ha({}, da.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = y(this), this.touchAction = new S(this, this.options.touchAction), fa(this, !0), g(this.options.recognizers, function (a)
        {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
        }, this)
    }

    function fa(a, b)
    {
        var c = a.element;
        c.style && g(a.options.cssProps, function (a, d)
        {
            c.style[u(c.style, d)] = b ? a : ""
        })
    }

    function ga(a, c)
    {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
    }

    var ha, ia = ["", "webkit", "Moz", "MS", "ms", "o"], ja = b.createElement("div"), ka = "function", la = Math.round, ma = Math.abs, na = Date.now;
    ha = "function" != typeof Object.assign ? function (a)
    {
        if (a === d || null === a)throw new TypeError("Cannot convert undefined or null to object");
        for (var b = Object(a), c = 1; c < arguments.length; c++)
        {
            var e = arguments[c];
            if (e !== d && null !== e)for (var f in e)e.hasOwnProperty(f) && (b[f] = e[f])
        }
        return b
    } : Object.assign;
    var oa = h(function (a, b, c)
    {
        for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
        return a
    }, "extend", "Use `assign`."), pa = h(function (a, b)
    {
        return oa(a, b, !0)
    }, "merge", "Use `assign`."), qa = 1, ra = /mobile|tablet|ip(ad|hone|od)|android/i, sa = "ontouchstart"in a, ta = u(a, "PointerEvent") !== d, ua = sa && ra.test(navigator.userAgent), va = "touch", wa = "pen", xa = "mouse", ya = "kinect", za = 25, Aa = 1, Ba = 2, Ca = 4, Da = 8, Ea = 1, Fa = 2, Ga = 4, Ha = 8, Ia = 16, Ja = Fa | Ga, Ka = Ha | Ia, La = Ja | Ka, Ma = ["x", "y"], Na = ["clientX", "clientY"];
    x.prototype = {
        handler: function ()
        {
        }, init: function ()
        {
            this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler)
        }, destroy: function ()
        {
            this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler)
        }
    };
    var Oa = {mousedown: Aa, mousemove: Ba, mouseup: Ca}, Pa = "mousedown", Qa = "mousemove mouseup";
    i(L, x, {
        handler: function (a)
        {
            var b = Oa[a.type];
            b & Aa && 0 === a.button && (this.pressed = !0), b & Ba && 1 !== a.which && (b = Ca), this.pressed && this.allow && (b & Ca && (this.pressed = !1), this.callback(this.manager, b, {
                pointers: [a],
                changedPointers: [a],
                pointerType: xa,
                srcEvent: a
            }))
        }
    });
    var Ra = {pointerdown: Aa, pointermove: Ba, pointerup: Ca, pointercancel: Da, pointerout: Da}, Sa = {
        2: va,
        3: wa,
        4: xa,
        5: ya
    }, Ta = "pointerdown", Ua = "pointermove pointerup pointercancel";
    a.MSPointerEvent && !a.PointerEvent && (Ta = "MSPointerDown", Ua = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, {
        handler: function (a)
        {
            var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Ra[d], f = Sa[a.pointerType] || a.pointerType, g = f == va, h = r(b, a.pointerId, "pointerId");
            e & Aa && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ca | Da) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
                pointers: b,
                changedPointers: [a],
                pointerType: f,
                srcEvent: a
            }), c && b.splice(h, 1))
        }
    });
    var Va = {
        touchstart: Aa,
        touchmove: Ba,
        touchend: Ca,
        touchcancel: Da
    }, Wa = "touchstart", Xa = "touchstart touchmove touchend touchcancel";
    i(N, x, {
        handler: function (a)
        {
            var b = Va[a.type];
            if (b === Aa && (this.started = !0), this.started)
            {
                var c = O.call(this, a, b);
                b & (Ca | Da) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: va,
                    srcEvent: a
                })
            }
        }
    });
    var Ya = {
        touchstart: Aa,
        touchmove: Ba,
        touchend: Ca,
        touchcancel: Da
    }, Za = "touchstart touchmove touchend touchcancel";
    i(P, x, {
        handler: function (a)
        {
            var b = Ya[a.type], c = Q.call(this, a, b);
            c && this.callback(this.manager, b, {pointers: c[0], changedPointers: c[1], pointerType: va, srcEvent: a})
        }
    }), i(R, x, {
        handler: function (a, b, c)
        {
            var d = c.pointerType == va, e = c.pointerType == xa;
            if (d)this.mouse.allow = !1; else if (e && !this.mouse.allow)return;
            b & (Ca | Da) && (this.mouse.allow = !0), this.callback(a, b, c)
        }, destroy: function ()
        {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var $a = u(ja.style, "touchAction"), _a = $a !== d, ab = "compute", bb = "auto", cb = "manipulation", db = "none", eb = "pan-x", fb = "pan-y";
    S.prototype = {
        set: function (a)
        {
            a == ab && (a = this.compute()), _a && this.manager.element.style && (this.manager.element.style[$a] = a), this.actions = a.toLowerCase().trim()
        }, update: function ()
        {
            this.set(this.manager.options.touchAction)
        }, compute: function ()
        {
            var a = [];
            return g(this.manager.recognizers, function (b)
            {
                k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
            }), T(a.join(" "))
        }, preventDefaults: function (a)
        {
            if (!_a)
            {
                var b = a.srcEvent, c = a.offsetDirection;
                if (this.manager.session.prevented)return void b.preventDefault();
                var d = this.actions, e = p(d, db), f = p(d, fb), g = p(d, eb);
                if (e)
                {
                    var h = 1 === a.pointers.length, i = a.distance < 2, j = a.deltaTime < 250;
                    if (h && i && j)return
                }
                if (!g || !f)return e || f && c & Ja || g && c & Ka ? this.preventSrc(b) : void 0
            }
        }, preventSrc: function (a)
        {
            this.manager.session.prevented = !0, a.preventDefault()
        }
    };
    var gb = 1, hb = 2, ib = 4, jb = 8, kb = jb, lb = 16, mb = 32;
    U.prototype = {
        defaults: {}, set: function (a)
        {
            return ha(this.options, a), this.manager && this.manager.touchAction.update(), this
        }, recognizeWith: function (a)
        {
            if (f(a, "recognizeWith", this))return this;
            var b = this.simultaneous;
            return a = X(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
        }, dropRecognizeWith: function (a)
        {
            return f(a, "dropRecognizeWith", this) ? this : (a = X(a, this), delete this.simultaneous[a.id], this)
        }, requireFailure: function (a)
        {
            if (f(a, "requireFailure", this))return this;
            var b = this.requireFail;
            return a = X(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this
        }, dropRequireFailure: function (a)
        {
            if (f(a, "dropRequireFailure", this))return this;
            a = X(a, this);
            var b = r(this.requireFail, a);
            return b > -1 && this.requireFail.splice(b, 1), this
        }, hasRequireFailures: function ()
        {
            return this.requireFail.length > 0
        }, canRecognizeWith: function (a)
        {
            return !!this.simultaneous[a.id]
        }, emit: function (a)
        {
            function b(b)
            {
                c.manager.emit(b, a)
            }

            var c = this, d = this.state;
            jb > d && b(c.options.event + V(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= jb && b(c.options.event + V(d))
        }, tryEmit: function (a)
        {
            return this.canEmit() ? this.emit(a) : void(this.state = mb)
        }, canEmit: function ()
        {
            for (var a = 0; a < this.requireFail.length;)
            {
                if (!(this.requireFail[a].state & (mb | gb)))return !1;
                a++
            }
            return !0
        }, recognize: function (a)
        {
            var b = ha({}, a);
            return k(this.options.enable, [this, b]) ? (this.state & (kb | lb | mb) && (this.state = gb), this.state = this.process(b), void(this.state & (hb | ib | jb | lb) && this.tryEmit(b))) : (this.reset(), void(this.state = mb))
        }, process: function (a)
        {
        }, getTouchAction: function ()
        {
        }, reset: function ()
        {
        }
    }, i(Y, U, {
        defaults: {pointers: 1}, attrTest: function (a)
        {
            var b = this.options.pointers;
            return 0 === b || a.pointers.length === b
        }, process: function (a)
        {
            var b = this.state, c = a.eventType, d = b & (hb | ib), e = this.attrTest(a);
            return d && (c & Da || !e) ? b | lb : d || e ? c & Ca ? b | jb : b & hb ? b | ib : hb : mb
        }
    }), i(Z, Y, {
        defaults: {event: "pan", threshold: 10, pointers: 1, direction: La}, getTouchAction: function ()
        {
            var a = this.options.direction, b = [];
            return a & Ja && b.push(fb), a & Ka && b.push(eb), b
        }, directionTest: function (a)
        {
            var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY;
            return e & b.direction || (b.direction & Ja ? (e = 0 === f ? Ea : 0 > f ? Fa : Ga, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ea : 0 > g ? Ha : Ia, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
        }, attrTest: function (a)
        {
            return Y.prototype.attrTest.call(this, a) && (this.state & hb || !(this.state & hb) && this.directionTest(a))
        }, emit: function (a)
        {
            this.pX = a.deltaX, this.pY = a.deltaY;
            var b = W(a.direction);
            b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a)
        }
    }), i($, Y, {
        defaults: {event: "pinch", threshold: 0, pointers: 2}, getTouchAction: function ()
        {
            return [db]
        }, attrTest: function (a)
        {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & hb)
        }, emit: function (a)
        {
            if (1 !== a.scale)
            {
                var b = a.scale < 1 ? "in" : "out";
                a.additionalEvent = this.options.event + b
            }
            this._super.emit.call(this, a)
        }
    }), i(_, U, {
        defaults: {event: "press", pointers: 1, time: 251, threshold: 9}, getTouchAction: function ()
        {
            return [bb]
        }, process: function (a)
        {
            var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time;
            if (this._input = a, !d || !c || a.eventType & (Ca | Da) && !f)this.reset(); else if (a.eventType & Aa)this.reset(), this._timer = e(function ()
            {
                this.state = kb, this.tryEmit()
            }, b.time, this); else if (a.eventType & Ca)return kb;
            return mb
        }, reset: function ()
        {
            clearTimeout(this._timer)
        }, emit: function (a)
        {
            this.state === kb && (a && a.eventType & Ca ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = na(), this.manager.emit(this.options.event, this._input)))
        }
    }), i(aa, Y, {
        defaults: {event: "rotate", threshold: 0, pointers: 2}, getTouchAction: function ()
        {
            return [db]
        }, attrTest: function (a)
        {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & hb)
        }
    }), i(ba, Y, {
        defaults: {event: "swipe", threshold: 10, velocity: .3, direction: Ja | Ka, pointers: 1},
        getTouchAction: function ()
        {
            return Z.prototype.getTouchAction.call(this)
        },
        attrTest: function (a)
        {
            var b, c = this.options.direction;
            return c & (Ja | Ka) ? b = a.overallVelocity : c & Ja ? b = a.overallVelocityX : c & Ka && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && ma(b) > this.options.velocity && a.eventType & Ca
        },
        emit: function (a)
        {
            var b = W(a.offsetDirection);
            b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
        }
    }), i(ca, U, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        }, getTouchAction: function ()
        {
            return [cb]
        }, process: function (a)
        {
            var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time;
            if (this.reset(), a.eventType & Aa && 0 === this.count)return this.failTimeout();
            if (d && f && c)
            {
                if (a.eventType != Ca)return this.failTimeout();
                var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                var i = this.count % b.taps;
                if (0 === i)return this.hasRequireFailures() ? (this._timer = e(function ()
                {
                    this.state = kb, this.tryEmit()
                }, b.interval, this), hb) : kb
            }
            return mb
        }, failTimeout: function ()
        {
            return this._timer = e(function ()
            {
                this.state = mb
            }, this.options.interval, this), mb
        }, reset: function ()
        {
            clearTimeout(this._timer)
        }, emit: function ()
        {
            this.state == kb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), da.VERSION = "2.0.6", da.defaults = {
        domEvents: !1,
        touchAction: ab,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [[aa, {enable: !1}], [$, {enable: !1}, ["rotate"]], [ba, {direction: Ja}], [Z, {direction: Ja}, ["swipe"]], [ca], [ca, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [_]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var nb = 1, ob = 2;
    ea.prototype = {
        set: function (a)
        {
            return ha(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
        }, stop: function (a)
        {
            this.session.stopped = a ? ob : nb
        }, recognize: function (a)
        {
            var b = this.session;
            if (!b.stopped)
            {
                this.touchAction.preventDefaults(a);
                var c, d = this.recognizers, e = b.curRecognizer;
                (!e || e && e.state & kb) && (e = b.curRecognizer = null);
                for (var f = 0; f < d.length;)c = d[f], b.stopped === ob || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (hb | ib | jb) && (e = b.curRecognizer = c), f++
            }
        }, get: function (a)
        {
            if (a instanceof U)return a;
            for (var b = this.recognizers, c = 0; c < b.length; c++)if (b[c].options.event == a)return b[c];
            return null
        }, add: function (a)
        {
            if (f(a, "add", this))return this;
            var b = this.get(a.options.event);
            return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
        }, remove: function (a)
        {
            if (f(a, "remove", this))return this;
            if (a = this.get(a))
            {
                var b = this.recognizers, c = r(b, a);
                -1 !== c && (b.splice(c, 1), this.touchAction.update())
            }
            return this
        }, on: function (a, b)
        {
            var c = this.handlers;
            return g(q(a), function (a)
            {
                c[a] = c[a] || [], c[a].push(b)
            }), this
        }, off: function (a, b)
        {
            var c = this.handlers;
            return g(q(a), function (a)
            {
                b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a]
            }), this
        }, emit: function (a, b)
        {
            this.options.domEvents && ga(a, b);
            var c = this.handlers[a] && this.handlers[a].slice();
            if (c && c.length)
            {
                b.type = a, b.preventDefault = function ()
                {
                    b.srcEvent.preventDefault()
                };
                for (var d = 0; d < c.length;)c[d](b), d++
            }
        }, destroy: function ()
        {
            this.element && fa(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, ha(da, {
        INPUT_START: Aa,
        INPUT_MOVE: Ba,
        INPUT_END: Ca,
        INPUT_CANCEL: Da,
        STATE_POSSIBLE: gb,
        STATE_BEGAN: hb,
        STATE_CHANGED: ib,
        STATE_ENDED: jb,
        STATE_RECOGNIZED: kb,
        STATE_CANCELLED: lb,
        STATE_FAILED: mb,
        DIRECTION_NONE: Ea,
        DIRECTION_LEFT: Fa,
        DIRECTION_RIGHT: Ga,
        DIRECTION_UP: Ha,
        DIRECTION_DOWN: Ia,
        DIRECTION_HORIZONTAL: Ja,
        DIRECTION_VERTICAL: Ka,
        DIRECTION_ALL: La,
        Manager: ea,
        Input: x,
        TouchAction: S,
        TouchInput: P,
        MouseInput: L,
        PointerEventInput: M,
        TouchMouseInput: R,
        SingleTouchInput: N,
        Recognizer: U,
        AttrRecognizer: Y,
        Tap: ca,
        Pan: Z,
        Swipe: ba,
        Pinch: $,
        Rotate: aa,
        Press: _,
        on: m,
        off: n,
        each: g,
        merge: pa,
        extend: oa,
        assign: ha,
        inherit: i,
        bindFn: j,
        prefixed: u
    });
    var pb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
    pb.Hammer = da, "function" == typeof define && define.amd ? define(function ()
    {
        return da
    }) : "undefined" != typeof module && module.exports ? module.exports = da : a[c] = da
}(window, document, "Hammer");
//# sourceMappingURL=hammer.min.map
;
/*!
 hey, [be]Lazy.js - v1.5.2 - 2015.12.01
 A lazy loading and multi-serving image script
 (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
 */

(function (k, f)
{
    "function" === typeof define && define.amd ? define(f) : "object" === typeof exports ? module.exports = f() : k.Blazy = f()
})(this, function ()
{
    function k(b)
    {
        var c = b._util;
        c.elements = v(b.options.selector);
        c.count = c.elements.length;
        c.destroyed && (c.destroyed = !1, b.options.container && h(b.options.container, function (a)
        {
            l(a, "scroll", c.validateT)
        }), l(window, "resize", c.saveViewportOffsetT), l(window, "resize", c.validateT), l(window, "scroll", c.validateT));
        f(b)
    }

    function f(b)
    {
        for (var c = b._util, a = 0; a < c.count; a++)
        {
            var d = c.elements[a], g = d.getBoundingClientRect();
            if (g.right >= e.left && g.bottom >= e.top && g.left <= e.right && g.top <= e.bottom || n(d, b.options.successClass))b.load(d), c.elements.splice(a, 1), c.count--, a--
        }
        0 === c.count && b.destroy()
    }

    function q(b, c, a)
    {
        if (!n(b, a.successClass) && (c || a.loadInvisible || 0 < b.offsetWidth && 0 < b.offsetHeight))if (c = b.getAttribute(p) || b.getAttribute(a.src))
        {
            c = c.split(a.separator);
            var d = c[r && 1 < c.length ? 1 : 0], g = "img" === b.nodeName.toLowerCase();
            h(a.breakpoints, function (a)
            {
                b.removeAttribute(a.src)
            });
            b.removeAttribute(a.src);
            g || void 0 === b.src ? (c = new Image, c.onerror = function ()
            {
                a.error && a.error(b, "invalid");
                b.className = b.className + " " + a.errorClass
            }, c.onload = function ()
            {
                g ? b.src = d : b.style.backgroundImage = 'url("' + d + '")';
                b.className = b.className + " " + a.successClass;
                a.success && a.success(b)
            }, c.src = d) : (b.src = d, b.className = b.className + " " + a.successClass)
        } else a.error && a.error(b, "missing"), n(b, a.errorClass) || (b.className = b.className + " " + a.errorClass)
    }

    function n(b, c)
    {
        return -1 !== (" " + b.className + " ").indexOf(" " + c + " ")
    }

    function v(b)
    {
        var c = [];
        b = document.querySelectorAll(b);
        for (var a = b.length; a--; c.unshift(b[a]));
        return c
    }

    function t(b)
    {
        e.bottom = (window.innerHeight || document.documentElement.clientHeight) + b;
        e.right = (window.innerWidth || document.documentElement.clientWidth) + b
    }

    function l(b, c, a)
    {
        b.attachEvent ? b.attachEvent && b.attachEvent("on" + c, a) : b.addEventListener(c, a, !1)
    }

    function m(b, c, a)
    {
        b.detachEvent ? b.detachEvent && b.detachEvent("on" + c, a) : b.removeEventListener(c, a, !1)
    }

    function h(b, c)
    {
        if (b && c)for (var a = b.length, d = 0; d < a && !1 !== c(b[d], d); d++);
    }

    function u(b, c, a)
    {
        var d = 0;
        return function ()
        {
            var g = +new Date;
            g - d < c || (d = g, b.apply(a, arguments))
        }
    }

    var p, e, r;
    return function (b)
    {
        if (!document.querySelectorAll)
        {
            var c = document.createStyleSheet();
            document.querySelectorAll = function (a, b, d, e, f)
            {
                f = document.all;
                b = [];
                a = a.replace(/\[for\b/gi, "[htmlFor").split(",");
                for (d = a.length; d--;)
                {
                    c.addRule(a[d], "k:v");
                    for (e = f.length; e--;)f[e].currentStyle.k && b.push(f[e]);
                    c.removeRule(0)
                }
                return b
            }
        }
        var a = this, d = a._util = {};
        d.elements = [];
        d.destroyed = !0;
        a.options = b || {};
        a.options.error = a.options.error || !1;
        a.options.offset = a.options.offset || 100;
        a.options.success = a.options.success || !1;
        a.options.selector = a.options.selector || ".b-lazy";
        a.options.separator = a.options.separator || "|";
        a.options.container = a.options.container ? document.querySelectorAll(a.options.container) : !1;
        a.options.errorClass = a.options.errorClass || "b-error";
        a.options.breakpoints = a.options.breakpoints || !1;
        a.options.loadInvisible = a.options.loadInvisible || !1;
        a.options.successClass = a.options.successClass || "b-loaded";
        a.options.validateDelay = a.options.validateDelay || 25;
        a.options.saveViewportOffsetDelay = a.options.saveViewportOffsetDelay || 50;
        a.options.src = p = a.options.src || "data-src";
        r = 1 < window.devicePixelRatio;
        e = {};
        e.top = 0 - a.options.offset;
        e.left = 0 - a.options.offset;
        a.revalidate = function ()
        {
            k(this)
        };
        a.load = function (a, b)
        {
            var c = this.options;
            void 0 === a.length ? q(a, b, c) : h(a, function (a)
            {
                q(a, b, c)
            })
        };
        a.destroy = function ()
        {
            var a = this._util;
            this.options.container && h(this.options.container, function (b)
            {
                m(b, "scroll", a.validateT)
            });
            m(window, "scroll", a.validateT);
            m(window, "resize", a.validateT);
            m(window, "resize", a.saveViewportOffsetT);
            a.count = 0;
            a.elements.length = 0;
            a.destroyed = !0
        };
        d.validateT = u(function ()
        {
            f(a)
        }, a.options.validateDelay, a);
        d.saveViewportOffsetT = u(function ()
        {
            t(a.options.offset)
        }, a.options.saveViewportOffsetDelay, a);
        t(a.options.offset);
        h(a.options.breakpoints, function (a)
        {
            if (a.width >= window.screen.width)return p = a.src, !1
        });
        k(a)
    }
});
(function ()
{
    var b = true, f = false;

    function g(a)
    {
        var c = a || {};
        this.d = this.c = f;
        if (a.visible == undefined)a.visible = b;
        if (a.shadow == undefined)a.shadow = "7px -3px 5px rgba(88,88,88,0.7)";
        if (a.anchor == undefined)a.anchor = i.BOTTOM;
        this.setValues(c)
    }

    g.prototype = new google.maps.OverlayView;
    window.RichMarker = g;
    g.prototype.getVisible = function ()
    {
        return this.get("visible")
    };
    g.prototype.getVisible = g.prototype.getVisible;
    g.prototype.setVisible = function (a)
    {
        this.set("visible", a)
    };
    g.prototype.setVisible = g.prototype.setVisible;
    g.prototype.s = function ()
    {
        if (this.c)
        {
            this.a.style.display = this.getVisible() ? "" : "none";
            this.draw()
        }
    };
    g.prototype.visible_changed = g.prototype.s;
    g.prototype.setFlat = function (a)
    {
        this.set("flat", !!a)
    };
    g.prototype.setFlat = g.prototype.setFlat;
    g.prototype.getFlat = function ()
    {
        return this.get("flat")
    };
    g.prototype.getFlat = g.prototype.getFlat;
    g.prototype.p = function ()
    {
        return this.get("width")
    };
    g.prototype.getWidth = g.prototype.p;
    g.prototype.o = function ()
    {
        return this.get("height")
    };
    g.prototype.getHeight = g.prototype.o;
    g.prototype.setShadow = function (a)
    {
        this.set("shadow", a);
        this.g()
    };
    g.prototype.setShadow = g.prototype.setShadow;
    g.prototype.getShadow = function ()
    {
        return this.get("shadow")
    };
    g.prototype.getShadow = g.prototype.getShadow;
    g.prototype.g = function ()
    {
        if (this.c)this.a.style.boxShadow = this.a.style.webkitBoxShadow = this.a.style.MozBoxShadow = this.getFlat() ? "" : this.getShadow()
    };
    g.prototype.flat_changed = g.prototype.g;
    g.prototype.setZIndex = function (a)
    {
        this.set("zIndex", a)
    };
    g.prototype.setZIndex = g.prototype.setZIndex;
    g.prototype.getZIndex = function ()
    {
        return this.get("zIndex")
    };
    g.prototype.getZIndex = g.prototype.getZIndex;
    g.prototype.t = function ()
    {
        if (this.getZIndex() && this.c)this.a.style.zIndex = this.getZIndex()
    };
    g.prototype.zIndex_changed = g.prototype.t;
    g.prototype.getDraggable = function ()
    {
        return this.get("draggable")
    };
    g.prototype.getDraggable = g.prototype.getDraggable;
    g.prototype.setDraggable = function (a)
    {
        this.set("draggable", !!a)
    };
    g.prototype.setDraggable = g.prototype.setDraggable;
    g.prototype.k = function ()
    {
        if (this.c)this.getDraggable() ? j(this, this.a) : k(this)
    };
    g.prototype.draggable_changed = g.prototype.k;
    g.prototype.getPosition = function ()
    {
        return this.get("position")
    };
    g.prototype.getPosition = g.prototype.getPosition;
    g.prototype.setPosition = function (a)
    {
        this.set("position", a)
    };
    g.prototype.setPosition = g.prototype.setPosition;
    g.prototype.q = function ()
    {
        this.draw()
    };
    g.prototype.position_changed = g.prototype.q;
    g.prototype.l = function ()
    {
        return this.get("anchor")
    };
    g.prototype.getAnchor = g.prototype.l;
    g.prototype.r = function (a)
    {
        this.set("anchor", a)
    };
    g.prototype.setAnchor = g.prototype.r;
    g.prototype.n = function ()
    {
        this.draw()
    };
    g.prototype.anchor_changed = g.prototype.n;
    function l(a, c)
    {
        var d = document.createElement("DIV");
        d.innerHTML = c;
        if (d.childNodes.length == 1)return d.removeChild(d.firstChild); else
        {
            for (var e = document.createDocumentFragment(); d.firstChild;)e.appendChild(d.firstChild);
            return e
        }
    }

    function m(a, c)
    {
        if (c)for (var d; d = c.firstChild;)c.removeChild(d)
    }

    g.prototype.setContent = function (a)
    {
        this.set("content", a)
    };
    g.prototype.setContent = g.prototype.setContent;
    g.prototype.getContent = function ()
    {
        return this.get("content")
    };
    g.prototype.getContent = g.prototype.getContent;
    g.prototype.j = function ()
    {
        if (this.b)
        {
            m(this, this.b);
            var a = this.getContent();
            if (a)
            {
                if (typeof a == "string")
                {
                    a = a.replace(/^\s*([\S\s]*)\b\s*$/, "$1");
                    a = l(this, a)
                }
                this.b.appendChild(a);
                var c = this;
                a = this.b.getElementsByTagName("IMG");
                for (var d = 0, e; e = a[d]; d++)
                {
                    google.maps.event.addDomListener(e, "mousedown", function (h)
                    {
                        if (c.getDraggable())
                        {
                            h.preventDefault && h.preventDefault();
                            h.returnValue = f
                        }
                    });
                    google.maps.event.addDomListener(e, "load", function ()
                    {
                        c.draw()
                    })
                }
                google.maps.event.trigger(this, "domready")
            }
            this.c &&
            this.draw()
        }
    };
    g.prototype.content_changed = g.prototype.j;
    function n(a, c)
    {
        if (a.c)
        {
            var d = "";
            if (navigator.userAgent.indexOf("Gecko/") !== -1)
            {
                if (c == "dragging")d = "-moz-grabbing";
                if (c == "dragready")d = "-moz-grab"
            } else if (c == "dragging" || c == "dragready")d = "move";
            if (c == "draggable")d = "pointer";
            if (a.a.style.cursor != d)a.a.style.cursor = d
        }
    }

    function o(a, c)
    {
        if (a.getDraggable())if (!a.d)
        {
            a.d = b;
            var d = a.getMap();
            a.m = d.get("draggable");
            d.set("draggable", f);
            a.h = c.clientX;
            a.i = c.clientY;
            n(a, "dragready");
            a.a.style.MozUserSelect = "none";
            a.a.style.KhtmlUserSelect = "none";
            a.a.style.WebkitUserSelect = "none";
            a.a.unselectable = "on";
            a.a.onselectstart = function ()
            {
                return f
            };
            p(a);
            google.maps.event.trigger(a, "dragstart")
        }
    }

    function q(a)
    {
        if (a.getDraggable())if (a.d)
        {
            a.d = f;
            a.getMap().set("draggable", a.m);
            a.h = a.i = a.m = null;
            a.a.style.MozUserSelect = "";
            a.a.style.KhtmlUserSelect = "";
            a.a.style.WebkitUserSelect = "";
            a.a.unselectable = "off";
            a.a.onselectstart = function ()
            {
            };
            r(a);
            n(a, "draggable");
            google.maps.event.trigger(a, "dragend");
            a.draw()
        }
    }

    function s(a, c)
    {
        if (!a.getDraggable() || !a.d)q(a); else
        {
            var d = a.h - c.clientX, e = a.i - c.clientY;
            a.h = c.clientX;
            a.i = c.clientY;
            d = parseInt(a.a.style.left, 10) - d;
            e = parseInt(a.a.style.top, 10) - e;
            a.a.style.left = d + "px";
            a.a.style.top = e + "px";
            var h = t(a);
            a.setPosition(a.getProjection().fromDivPixelToLatLng(new google.maps.Point(d - h.width, e - h.height)));
            n(a, "dragging");
            google.maps.event.trigger(a, "drag")
        }
    }

    function k(a)
    {
        if (a.f)
        {
            google.maps.event.removeListener(a.f);
            delete a.f
        }
        n(a, "")
    }

    function j(a, c)
    {
        if (c)
        {
            a.f = google.maps.event.addDomListener(c, "mousedown", function (d)
            {
                o(a, d)
            });
            n(a, "draggable")
        }
    }

    function p(a)
    {
        if (a.a.setCapture)
        {
            a.a.setCapture(b);
            a.e = [google.maps.event.addDomListener(a.a, "mousemove", function (c)
            {
                s(a, c)
            }, b), google.maps.event.addDomListener(a.a, "mouseup", function ()
            {
                q(a);
                a.a.releaseCapture()
            }, b)]
        } else a.e = [google.maps.event.addDomListener(window, "mousemove", function (c)
        {
            s(a, c)
        }, b), google.maps.event.addDomListener(window, "mouseup", function ()
        {
            q(a)
        }, b)]
    }

    function r(a)
    {
        if (a.e)
        {
            for (var c = 0, d; d = a.e[c]; c++)google.maps.event.removeListener(d);
            a.e.length = 0
        }
    }

    function t(a)
    {
        var c = a.l();
        if (typeof c == "object")return c;
        var d = new google.maps.Size(0, 0);
        if (!a.b)return d;
        var e = a.b.offsetWidth;
        a = a.b.offsetHeight;
        switch (c)
        {
            case i.TOP:
                d.width = -e / 2;
                break;
            case i.TOP_RIGHT:
                d.width = -e;
                break;
            case i.LEFT:
                d.height = -a / 2;
                break;
            case i.MIDDLE:
                d.width = -e / 2;
                d.height = -a / 2;
                break;
            case i.RIGHT:
                d.width = -e;
                d.height = -a / 2;
                break;
            case i.BOTTOM_LEFT:
                d.height = -a;
                break;
            case i.BOTTOM:
                d.width = -e / 2;
                d.height = -a;
                break;
            case i.BOTTOM_RIGHT:
                d.width = -e;
                d.height = -a
        }
        return d
    }

    g.prototype.onAdd = function ()
    {
        if (!this.a)
        {
            this.a = document.createElement("DIV");
            this.a.style.position = "absolute"
        }
        if (this.getZIndex())this.a.style.zIndex = this.getZIndex();
        this.a.style.display = this.getVisible() ? "" : "none";
        if (!this.b)
        {
            this.b = document.createElement("DIV");
            this.a.appendChild(this.b);
            var a = this;
            google.maps.event.addDomListener(this.b, "click", function ()
            {
                google.maps.event.trigger(a, "click")
            });
            google.maps.event.addDomListener(this.b, "mouseover", function ()
            {
                google.maps.event.trigger(a, "mouseover")
            });
            google.maps.event.addDomListener(this.b, "mouseout", function ()
            {
                google.maps.event.trigger(a, "mouseout")
            })
        }
        this.c = b;
        this.j();
        this.g();
        this.k();
        var c = this.getPanes();
        c && c.overlayImage.appendChild(this.a);
        google.maps.event.trigger(this, "ready")
    };
    g.prototype.onAdd = g.prototype.onAdd;
    g.prototype.draw = function ()
    {
        if (!(!this.c || this.d))
        {
            var a = this.getProjection();
            if (a)
            {
                var c = this.get("position");
                a = a.fromLatLngToDivPixel(c);
                c = t(this);
                this.a.style.top = a.y + c.height + "px";
                this.a.style.left = a.x + c.width + "px";
                a = this.b.offsetHeight;
                c = this.b.offsetWidth;
                c != this.get("width") && this.set("width", c);
                a != this.get("height") && this.set("height", a)
            }
        }
    };
    g.prototype.draw = g.prototype.draw;
    g.prototype.onRemove = function ()
    {
        this.a && this.a.parentNode && this.a.parentNode.removeChild(this.a);
        k(this)
    };
    g.prototype.onRemove = g.prototype.onRemove;
    var i = {
        TOP_LEFT: 1,
        TOP: 2,
        TOP_RIGHT: 3,
        LEFT: 4,
        MIDDLE: 5,
        RIGHT: 6,
        BOTTOM_LEFT: 7,
        BOTTOM: 8,
        BOTTOM_RIGHT: 9
    };
    window.RichMarkerPosition = i;
})();
var events = {
    events: {},
    on: function (eventName, fn)
    {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function (eventName, fn)
    {
        var i;
        if (this.events[eventName])
        {
            for (i = 0; i < this.events[eventName].length; i++)
            {
                if (this.events[eventName][i] === fn)
                {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
            ;
        }
    },
    emit: function (eventName, data)
    {
        if (this.events[eventName])
        {
            this.events[eventName].forEach(function (fn)
            {
                fn(data);
            });
        }
    }
};
var breakpoints = {
    init: function ()
    {
        this.Window = $(window);
        this.breakpoint = 0;

        this.checkSize();
        this.events();
    },
    events: function ()
    {
        var self = this;
        this.Window.on('resize orientationchange', function ()
        {
            self.checkSize();
        });
    },
    checkSize: function ()
    {
        var windowWidth = this.Window.width(), newBreakPoint;

        newBreakPoint = 1200;
        if (windowWidth <= 1024)
        {
            newBreakPoint = 1024;
        }
        if (windowWidth <= 768)
        {
            newBreakPoint = 768;
        }
        if (windowWidth <= 640)
        {
            newBreakPoint = 640;
        }

        if (newBreakPoint !== this.breakpoint)
        {
            this.breakpoint = newBreakPoint;
            events.emit('changeBreakpoint', this.breakpoint);
        }
    }
};
breakpoints.init();
var CreateCarouselMobile = function (container, elements, afterContainer, breakpoint)
{

    console.log(container, elements, afterContainer, breakpoint)
    var self = this;

    this.container = $(container);
    this.elements = this.container.find(elements);
    this.breakpoint = breakpoint;
    this.afterWrap = this.container.find(afterContainer);

    this.carousel = $(document.createElement("div"));

    this.insertDelete(breakpoints.breakpoint);

    events.on('changeBreakpoint', function (data)
    {
        self.insertDelete(data);
    });

    return this;
};
CreateCarouselMobile.prototype.createItemCarousel = function (item)
{
    var newItem = $(document.createElement("div"));
    newItem
        .addClass('grid__item grid__item--choose')
        .html(item.html());
    return newItem;
};
CreateCarouselMobile.prototype.createCarousel = function ()
{
    var newItemCarousel, self = this;
    this.carousel.addClass('carousel--cloned');
    this.elements.each(function ()
    {
        newItemCarousel = self.createItemCarousel($(this));
        $(self.carousel).append(newItemCarousel);
    });

    self.insertElem(self.carousel);
};
CreateCarouselMobile.prototype.insertElem = function (carousel)
{
    var self = this;

    this.afterWrap.after(carousel);

    this.carousel.on("refreshed.owl.carousel translated.owl.carousel", function ()
    {
        globalVar.lazy.revalidate();
    })

    this.carousel.owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        loop: false,
        lazyLoad: true,
        responsive: {
            0: {positions: true},
            768: {
                positions: false,
                onResize: function (event)
                {
                    console.log(event)
                }
            }
        }
    });

    this.carousel.addClass("close");
    this.carousel.addClass("loaded");


};
CreateCarouselMobile.prototype.insertDelete = function (data)
{
    if (data < this.breakpoint)
    {

        if (this.carousel.hasClass("loaded"))
        {
            console.log("here")
        } else
        {
            this.createCarousel();
        }
        //
        this.container.find(".ar-row").hide();
    } else
    {
        this.container.find(".ar-row").show();
    }
};


var ActivateCarousel = function (carousel)
{
    this.carousel = $(carousel);
    this.events();
};
ActivateCarousel.prototype.events = function ()
{
    var self = this;

    this.initCarousel(breakpoints.breakpoint);

    events.on('changeBreakpoint', function (data)
    {
        self.initCarousel(data);
    });
};
ActivateCarousel.prototype.initCarousel = function (data)
{
    var self = this, createdCarousel;
    var timeout;
    if (data <= 768 && !this.carousel.hasClass("owl-loaded"))
    {

        self.carousel.owlCarousel({
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1,
                    positions: true
                },
                640: {
                    items: 2
                }
            }
        });
    } else if (data > 768 && this.carousel.hasClass("owl-loaded"))
    {

        clearTimeout(timeout);

        timeout = setTimeout(function ()
        {

            self.carousel.trigger("destroy.owl.carousel");
            $(".owl-stage-outer").children("div").unwrap();
            self.carousel.removeClass("owl-carousel owl-loaded");

        }, 250);

    }
};
$(".wall-panel").each(function ()
{
    var carousel = new ActivateCarousel(this);
});
// immagini responsive al cambio di breackpoint
var ResponsiveImages = function (imageClass)
{
    this.images = $(imageClass);
    this.events();
};
ResponsiveImages.prototype.events = function ()
{
    var self = this;
    this.changeimage(breakpoints.breakpoint);
    events.on('changeBreakpoint', function (data)
    {
        self.changeimage(data);
    });
};
ResponsiveImages.prototype.changeimage = function (data)
{
    var self = this;
    $(this.images).each(function (i, el)
    {
        if (data >= 1200)
        {
            bkg = $(el).data('src');
        }
        ;
        if (data === 1024)
        {
            bkg = $(el).data('src-medium');
        }
        ;
        if (data < 1024)
        {
            bkg = $(el).data('src-small');
        }
        ;
        // se è un immagine
        if (el.localName === "img")
        {
            $(el).attr("src", bkg);
        } else if (el.localName === "video")
        {
            // se è un background
            $(el).attr("poster", bkg);
        } else
        {
            $(el).css({
                "background-image": "url(" + bkg + ")"
            });
        }
        if (i + 1 === self.images.length)
        {
            events.emit('ImagesLoaded', self.images);
        }
    });


};
var responsive = new ResponsiveImages(".js-responsive-image");

var InputAnimation = function (el)
{
    this.el = $(el);
    this.input = this.el.find("input");
    this.label = this.el.find("label");
    this.select = this.el.find("select"); // nel caso servisse per le select

    this.defaulStatus();
    this.observe();
};
InputAnimation.prototype.observe = function ()
{
    var self = this;
    this.label.on("click", function ()
    {
        self.input.focus()
    });
    this.input.on("focus", $.proxy(this.inputFocus, this));
    this.input.on("blur", $.proxy(this.inputBlur, this));
};
InputAnimation.prototype.inputFocus = function (event)
{
    event.stopPropagation();
    this.el.find("label");
    this.label.addClass('input--filled');
};
InputAnimation.prototype.inputBlur = function (event)
{
    event.stopPropagation();
    this.el.find("label");
    if (this.input.val() === '')
    {
        this.label.removeClass('input--filled')
    }
};
InputAnimation.prototype.defaulStatus = function ()
{
    if (this.input.val() !== '')
    {
        this.label.addClass('input--filled');
    }
};
$(".input--animated").each(function ()
{
    var inputAnimated = new InputAnimation(this);
});


// var ImageFullPage = function(){

// };
// ImageFullPage.prototype.prova = function(){

// };

// function lsTest(){
//     var test = 'test';
//     try {
//         localStorage.setItem(test, test);
//         localStorage.removeItem(test);
//         return true;
//     } catch(e) {
//         return false;
//     }
// }

// if(lsTest() === true){

// }else{

// }

var AlfaLoading = function (container)
{
    this.loading = $("<div />", {"class": "AlfaLoading"});

    this.appendLoading(container);
}
AlfaLoading.prototype.appendLoading = function (container)
{
    this.loading.appendTo(container)
};
AlfaLoading.prototype.activateLoading = function ()
{
    this.loading.show();
};
AlfaLoading.prototype.deActivateLoading = function ()
{
    this.loading.hide();
};


if (window.localStorage.fullName !== undefined)
{
    //action

}

// if(window.localStorage){
// 	console.log("here")
// 	var footerOpenClose = new FooterOpenClose();
// }

// var FooterOpenClose = function(){

// };
// FooterOpenClose.prototype.getItem


;
var ResizeForBackground = function (wrap, perc)
{
    this.perc = perc;
    this.elements(wrap);
    this.resize();

    var self = this;
    $(window).on('resize', function ()
    {
        self.resize();
    })
    return this;
};
ResizeForBackground.prototype.elements = function (wrap)
{
    this.wrap = wrap;
    this.ancor = wrap.parents('.slider__item');
};
ResizeForBackground.prototype.resize = function ()
{
    var ancorW, ancorh, percAncor, wrapW, wrapH, newW, newH, marginT, marginL;

    ancorW = this.ancor.width();
    ancorH = this.ancor.height();
    percAncor = ancorH / ancorW;
    wrapW = this.wrap.width();
    wrapH = this.wrap.height();
    marginL = 0;
    marginT = 0;

    if (percAncor > this.perc)
    {
        newH = ancorH;
        newW = Math.floor(newH * 16 / 9);
        marginL = -(newW - ancorW) / 2;
    } else
    {
        newW = ancorW;
        newH = Math.floor(newW * 9 / 16);
        marginT = -(newH - ancorH) / 2;
    }

    this.wrap.css({
        'height': newH,
        'width': newW,
        'margin-top': marginT,
        'margin-left': marginL
    });
};
(function ($)
{
    var GoToTarget = function (el)
    {
        this.el = el;
        this.target = el.data('target');
        this.targetEl = $('[data-target-ancor=' + this.target + ']');
        this.pageHeaderHeight = $('.navigation').height();
        this.events();
        return this;
    };
    GoToTarget.prototype.events = function ()
    {
        var self = this;
        this.el.on('click', function (event)
        {
            event.stopPropagation();
            self.goTo(self.targetEl);
        });
    };
    GoToTarget.prototype.goTo = function (el)
    {
        var offT;
        offT = el.offset().top - this.pageHeaderHeight;
        var body = $("html, body");
        body.stop().animate({scrollTop: offT}, '500');
    };
    $.fn.extend({
        scrollToSee: function ()
        {
            var link;
            return this.each(function ()
            {
                link = new GoToTarget($(this));
            });
        }
    });
})(jQuery);
var Parallax = function ()
{
    this.element_container = $(".parallaxed");
    this.observe();
};
Parallax.prototype.observe = function ()
{
    $(window).on("resize", $.proxy(this.popolateObjectController, this));
    $(window).on("scroll", $.proxy(this.verticalParallax, this));
    this.element_container.on("mouseenter", $.proxy(this.enterParallaxMouse, this));
    this.element_container.on("mouseleave", $.proxy(this.exitParallaxMouse, this));
    this.element_container.on("mousemove", $.proxy(this.moveParallaxMouse, this));

    // window.addEventListener("deviceorientation", $.proxy(this.moveParallaxMouse, this), true);
};
Parallax.prototype.popolateObjectController = function ()
{
    var parallaxElements = {};
};
Parallax.prototype.verticalParallax = function ()
{
    this.element_container.each(function (i, v)
    {
        backLayer = $(v).find(".parallaxed__content");
        if ((i % 2) == 0)
        {
            TweenLite.to(backLayer, .25, {
                css: {top: '-' + ( ( window.scrollY - $(".parallaxed").offset().top) / 5) + 'px'},
                overwrite: true
            });
        } else
        {
            TweenLite.to(backLayer, .25, {
                css: {top: '-' + ( ( window.scrollY - $(".parallaxed").offset().top) / 15) + 'px'},
                overwrite: true
            });
        }
    });
}
Parallax.prototype.enterParallaxMouse = function (event)
{
    $(event.currentTarget).parent().addClass('js-parallax-active');
};
Parallax.prototype.exitParallaxMouse = function (event)
{
    $(event.currentTarget).parent().removeClass('js-parallax-active');
};
Parallax.prototype.moveParallaxMouse = function (event)
{

    this.parallaxBox = $(event.currentTarget);

    var layers = $(event.currentTarget).find(".layer");
    var centerElem = [
        this.parallaxBox.parent().width() / 2,
        this.parallaxBox.parent().height() / 2
    ];

    if (event.type == "mousemove")
    {
        var offsetH = 3;
        var incrementX = ( event.clientX - centerElem[0] ) / offsetH;
        var incrementY = ( event.clientY - centerElem[1] ) / offsetH;

        for (var i = 1; i < layers.length + 1; i++)
        {
            if ((i % 2) == 1)
            {
                TweenLite.to(layers.eq(i - 1), .5, {x: incrementX * (i / 10)});
                TweenLite.to(layers.eq(i - 1), .5, {y: incrementY * (i / 15)});
            } else
            {
                incrementX = incrementX * -1;
                TweenLite.to(layers.eq(i - 1), .5, {x: (incrementX * (i / 14))});
                TweenLite.to(layers.eq(i - 1), .5, {y: incrementY * (i / 26)});
            }
        }
    }
    ;
};
var Scrolltotop = function ()
{
    this.btn = $(document.createElement("div"));
    this.btn.addClass("scrollToTop");

    this.btn.appendTo("body");
    this.observe();
};
Scrolltotop.prototype.observe = function ()
{
    $(window).on("scroll", $.proxy(this.showScrollTop, this));
    this.btn.on("click", $.proxy(this.scrollTop, this));
};
Scrolltotop.prototype.showScrollTop = function (event)
{
    if (device.mobile() && device.portrait())
    {
        if (window.scrollY > screen.height)
        {
            this.btn.addClass("onShow");
        } else
        {
            this.btn.removeClass("onShow");
        }
    }
};
Scrolltotop.prototype.scrollTop = function ()
{
    $("body, html").animate({scrollTop: 0}, 500);
};
var scroll = new Scrolltotop();
function Navigation()
{
    this.elements();
    this.media = this.mediqueries();
    this.backButton = this.createBack();
    this.observe();
};
Navigation.prototype.elements = function ()
{
    this.navigationBlock = $(".menu--main"); // blocco di navigazione
    this.mainButton = $(".navigation__item"); // voci di primo livello (Vehicles, etc..)
    this.anchor = $(".submenu--father > li > a"); // secondo livello
    this.anchorLi = $(".submenu--father > li");
    this.toggleBtn = $(".menu__toggle"); // icona burger
    this.subMenuChild = $('.submenu--child'); // terzo livello
    this.subMenuChildLi = $('.submenu--child > li');
    this.subMenuChildBtn = $('.submenu--child > li > a');
    this.subMenuChildBtnNormal = $('.wrapper__col a');
    this.childInners = $(".child__inner"); // dettaglio auto
};
Navigation.prototype.observe = function ()
{
    var self = this;

    // this.mainButton.on("mouseenter mouseleave", $.proxy(this.toggleAnimation, this) );

    this.toggleBtn.on("click", $.proxy(this.dropdown, this));

    this.anchor.on("click", $.proxy(this.mobileNavigation, this));
    this.subMenuChildBtnNormal.on("click", $.proxy(this.mobileNavigation, this));
    this.subMenuChildBtn.on('click', $.proxy(this.subMenuChildClick, this));

    this.mainButton.on("click", $.proxy(this.toggle, this));
    this.anchorLi.on("mouseenter click", $.proxy(this.activeAncor, this));
    this.subMenuChildLi.on("mouseenter click", $.proxy(this.activeAncor, this));

    $(window).on("resize", $.proxy(this.mediqueries, this));
};
Navigation.prototype.activeAncor = function (event)
{
    event.stopPropagation();
    if (this.media.desktop)
    {
        var self = this;
        var newtarget;
        var target = $(event.currentTarget);

        if (!target.hasClass('standalone'))
        {
            clearTimeout(this.timer);
            if (event.type == "mouseenter" || event.type == "click")
            {
                this.timer = setTimeout(function ()
                {
                    self.openAncor(target);
                }, 150);
            } else
            {
                clearTimeout(this.timer);
                this.openAncor(target);
            }
        }

    }
};
Navigation.prototype.openAncor = function (target)
{

    var myLi = target.parent('li'),
        childUl = target.find('> ul');
    // attivo classi su 2 livello
    target.siblings().removeClass("active");
    target.addClass('active');

    // attivo la classe delle prime voci del relativo 3 livello o dettaglio auto
    if (childUl.hasClass('submenu--child'))
    {

        console.log("here")

        childUl.children('li').removeClass('active');
        var targetChild = childUl.children('li').eq(0);
        childUl.addClass('js-open');
        targetChild.addClass('active');
        targetChild.find('ul').addClass('js-open');
    } else
    {
        childUl.addClass('js-open');
    }
};
// Navigation.prototype.hideChildInner= function() {
// 	this.childInners.removeClass('js-open');
// };
// Navigation.prototype.hideSubMenuChild= function() {
// 	this.subMenuChild.removeClass('js-open');
// };
Navigation.prototype.desktopReset = function ()
{
    // $("body").removeClass("menu--main--open");
    this.navigationBlock.attr("style", null);
    this.navigationBlock.find('*').removeClass('active');
    this.navigationBlock.find('*').removeClass('js-open');
};
Navigation.prototype.createBack = function ()
{
    // metodo per creare bottone back su mobile
    return $("<li />", {
        "class": "btn-back",
        "click": this.returnBack,
        "text": $(".navigation").data("language-back")
    });
};
Navigation.prototype.returnBack = function (event)
{
    $(".navigation__item").removeClass("js-submenuopen");
    setTimeout(function ()
    {
        $(event.currentTarget).remove();
        $(".child__inner, .submenu--child, .list--link").removeClass("js-open");
    }, 250);
};
Navigation.prototype.subMenuChildClick = function (event)
{
    event.stopPropagation();
    if (this.media.mobile || this.media.tablet)
    {

        var target = $(event.currentTarget),
            targetLi = $(event.currentTarget).parent('li');
        // targetChild = target.next('ul');
        targetLiChild = targetLi.children('ul');
        targetLiSiblingChild = targetLi.siblings('li').children('ul');
        ;

        console.log("here active");

        if (targetLi.hasClass("active") || targetLi.hasClass('standalone'))
        {
            targetLi.removeClass('active');
            targetLiChild.removeClass('js-open');
        } else
        {
            targetLi.addClass('active');
            targetLiChild.addClass('js-open');
        }
        targetLi.siblings("li").removeClass("active");
        targetLi.siblings('li').children('ul').removeClass("js-open");
    }
};
Navigation.prototype.statusNavigation = function ()
{
    this.statusNav = {};
    this.statusNav.position = "";
    this.statusNav.current = "";
    this.statusNav.previous = "";
    this.statusNav.next = "";
    this.statusNav.menu = "";

    return this.statusNav;
};
Navigation.prototype.tabletPortraitReset = function (event)
{
    this.anchorLi.removeClass('active');
    this.tabletPortraitResetSubmenu();
};
Navigation.prototype.tabletPortraitResetSubmenu = function (event)
{
    this.subMenuChild.removeClass('js-open');
    this.subMenuChildLi.removeClass('active');
    this.childInners.removeClass('js-open');
};
Navigation.prototype.mobileNavigation = function (event)
{

    // reset
    var $target = $(event.target),
        $currentTarget = $(event.currentTarget),

        $destinationTarget = $currentTarget.next("ul"),
    // $destinationTargetClass = $destinationTarget.attr("class"),

        $destinationFather = $destinationTarget.parents(".navigation__item.active")
        ;

    function CalcTheTop(elem)
    {
        var parent, offset, top;
        parent = $(elem).parent();
        if (parent.length)
        {
            offset = $(elem).parent().offset().top;
            top = (window.scrollY - offset) + 81;
            return top;
        }
    };
    function retriveClass(classes)
    {
        var classBack = "", start, end;
        if (classes != undefined)
        {
            start = classes.indexOf("sm");
            end = classes.indexOf(" ", start)
            classBack = classes.slice(start, end);
        }
        return classBack;
    }

    if (device.mobile())
    {
        $destinationTarget.addClass("js-open");
        var dimension = CalcTheTop($destinationTarget);

        $destinationTarget.css({"top": dimension + "px", "left": "100%"})
        $destinationTarget.find("li").eq(0).before(this.createBack());


        var classes = $currentTarget.children(".tl-arg").attr("class");
        $(".btn-back").addClass(retriveClass(classes));

        $(".navigation__item").addClass('js-submenuopen');

        $destinationTarget.find("a").eq(0).trigger("click");

    }

    if (device.tablet() && device.portrait())
    {
        this.tabletPortraitResetSubmenu();


        $targetLi = $target.parent("li");
        $targetChild = $targetLi.children('ul');

        $targetLiSibling = $targetLi.siblings('li');
        $targetLiSiblingChild = $targetLiSibling.children('ul');

        $targetLiSiblingChild.removeClass('js-open');
        $targetLiSibling.removeClass('active');

        if ($targetLi.hasClass('active') || $targetLi.hasClass("standalone"))
        {
            $targetLi.removeClass('active');
            $targetChild.removeClass('js-open');
        } else
        {
            $targetLi.addClass('active');
            $targetChild.addClass("js-open");
        }


        //this.navigationBlock.css({"height" : window.innerHeight - $(".navigation").height() , "overflow-y" : "auto"});		
    }
};
Navigation.prototype.dropdown = function (event)
{
    event.stopPropagation();

    var
        $target = $(event.currentTarget),
        targetdata = $target.data("target")
        ;

    if ($("body").hasClass(targetdata + '--open'))
    {
        $("body").removeClass(targetdata + '--open');
    } else
    {
        $("body").addClass(targetdata + '--open');
    }

    if ($target.hasClass('js-open'))
    {
        $target.removeClass('js-open');
    } else
    {
        $target.addClass('js-open');
    }

    if (targetdata == "menu--main")
    {

        this.navigationBlock.toggleClass('js-open');

        //$(".navigation--secondary .menu__toggle , .navigation--secondary .icon-list").removeClass("js-open");

        if (this.media.mobile)
        {
            $(".navigation__item").removeClass('js-submenuopen');
            $(".navigation__item").removeClass('active');
            $(".navigation__dropdown").removeClass('js-open');
            $(".child__inner").removeClass('js-open');
            $(".btn-back").remove();
        }
    } else
    {
        if (this.media.mobile)
        {
            // $("body").removeClass("menu--main--open icon-list--open")
            $(".menu__toggle").removeClass('js-open');
            $(".menu--main").removeClass('js-open');
        }
        $(event.currentTarget).parent("div").find("." + targetdata).toggleClass('js-open');
    }
};
Navigation.prototype.SetHeightDropdown = function (dropDownContainer)
{
    var dropdownH = dropDownContainer.height();
    dropDownContainer.attr("style", null);
    if (dropdownH <= 740)
    {
        dropdownH = 740;
    } else
    {
        dropdownH = dropDownContainer.height();
    }
    dropDownContainer.css({
        "height": dropdownH,
        "overflow-y": "auto"
    });

};
Navigation.prototype.mediqueries = function (event)
{

    $(".navigation--secondary .menu__toggle , .navigation--secondary .icon-list").removeClass("js-open");

    function stateIsChange(oldvalue)
    {
        if (typeof oldvalue == Object)
        {
            var newvalue = "";

            if (JSON.stringify(newvalue) != JSON.stringify(oldvalue))
            {
                $(window).on("mediaIsChange", {"media": oldvalue});
                newvalue = oldvalue
            }
        }
    }

    if (window.innerWidth <= 768 && window.innerWidth >= 640)
    {
        this.isMobile = false;
        this.isTablet = true;
        this.isDesktop = false;
    } else if (window.innerWidth < 640)
    {
        this.isMobile = true;
        this.isTablet = false;
        this.isDesktop = false;
    } else
    {
        this.isMobile = false;
        this.isTablet = false;
        this.isDesktop = true;
    }

    return {
        "mobile": this.isMobile,
        "tablet": this.isTablet,
        "desktop": this.isDesktop
    }

};
Navigation.prototype.toggle = function (event)
{
    this.imageLoader();
    event.preventDefault();
    event.stopPropagation();

    var
        $clicktarget = $(event.target);
    $target = $(event.currentTarget),
        $child = $target.find(".navigation__dropdown"),
        self = this,
        liToActivate = $target.find('.submenu--father').find('>li').eq(0)
    ;

    if (device.desktop() || (device.tablet() && device.landscape()))
    {
        this.openAncor(liToActivate);
    }

    $("body").addClass('menu--main--open')

    if ($clicktarget.parent().is($target))
    {

        //ricontrollare
        // reset
        if ($target.hasClass("active"))
        {
            $target.removeClass('active');
            $child.removeClass("js-open");

            this.mainButton.removeClass('active');

            $(".navigation__dropdown").removeClass('js-open');

            // se sono su dsktop o tablet quando chiudo un elemento tolgo la velina
            if (device.desktop() || (device.tablet() && device.landscape()))
            {
                $("body").removeClass('menu--main--open')
            }

        } else
        {
            this.mainButton.removeClass('active');

            $(".navigation__dropdown").removeClass('js-open');
            $target.addClass('active');
            $child.addClass("js-open");
        }

        if (device.tablet() && device.portrait())
        {
            this.SetHeightDropdown($child);
            this.tabletPortraitReset();
        }

        if (this.media.mobile)
        {
            this.navigationBlock.css({
                "height": window.innerHeight - $(".navigation").height(),
                "overflow-y": "auto"
            });
        }
    }

    //se non è mobile ed esco dal focus allora chiudo

    $child.on("mouseleave", function ()
    {
        if (device.desktop())
        {
            self.closeChild($target);
        }
    });

};
Navigation.prototype.closeChild = function (target)
{
    var self = this;
    target.one("mouseenter", function ()
    {
        clearTimeout(self.timer);
    });
    console.log("enter");
    this.timer = setTimeout(function ()
    {
        self.desktopReset();
        $("body").removeClass("menu--main--open")
    }, 150);
};
Navigation.prototype.toggleAnimation = function (event)
{
    var $target = $(event.currentTarget);

    if (this.isMobile)
    {
        $(".navigation__item").removeClass('animate');
    } else
    {
        if ($target.hasClass('animate'))
        {
            $target.removeClass('animate')
        } else
        {
            $target.addClass('animate')
        }
    }
};
Navigation.prototype.imageLoader = function ()
{
    $(".box-image__background").each(function ()
    {
        var bkg, self = $(this);
        if (breakpoints.breakpoint >= 1200)
        {
            bkg = self.data('src');
        }
        ;
        if (breakpoints.breakpoint === 1024)
        {
            bkg = self.data('src-medium');
        }
        ;
        if (breakpoints.breakpoint < 1024)
        {
            bkg = self.data('src-small');
        }
        ;
        self.css('background-image', 'url(' + bkg + ')');

        console.log("here")
    });

};


// var NavigationDesktop = function(context){

// };
// NavigationDesktop.prototype.elements = function(){
// 	this.openDropdown = $(".navigation__item");
// 	this.firstLiverAnchor = 
// };

// var NavigationHandset = function(context){
// 	console.log("tablet-mobile");

// 	this.createBack();
// };
// NavigationHandset.prototype.createBack = function(){
// 	// metodo per creare bottone back su mobile
// 	return $("<li />", {
// 		"class" : "btn-back",
// 		"click" : this.returnBack,
// 		"text"  : "« " + $(".navigation").data("language-back")
// 	});
// };


// var MainNavigation = function(){
// 	this.navigation = $(".menu--main");
// 	this.events();
// };

// MainNavigation.prototype.events = function(){
// 	var self = this;

// 	this.inizializeNavigation(breakpoints.breakpoint);

// 	events.on('changeBreakpoint', function(data){
// 		self.inizializeNavigation(data);
// 	});
// };

// MainNavigation.prototype.inizializeNavigation = function(data){
// 	if( data <= 768 ){
// 		var navigation = new NavigationHandset(this.navigation);
// 	}else{
// 		var navigation = new NavigationDesktop(this.navigation);
// 	}

// }

// if( $(".menu--main").length != 0 ){ var navigation = new MainNavigation(); }
;
var VirtualLayer = function (item)
{
    this.elements(item);
    this.defineModel();
    return this;
};
VirtualLayer.prototype.elements = function (item)
{
    this.item = item;
    this.price = item.find('[data-json-price]');
};
VirtualLayer.prototype.defineModel = function ()
{
    var modelCode = this.item.data('json-model');
    this.call(modelCode);
};
VirtualLayer.prototype.call = function (data)
{
    var self = this,
        parameters = {
            'brand': globalVar.brand,
            'market': globalVar.market,
            'language': globalVar.language,
            'model': data
        };

    $.ajax(globalVar.VLbaseUrl + "/vehicles/version/info/jsonp", {
        dataType: "jsonp",
        data: parameters,
        success: function (data)
        {
            self.setModelInfo(data);
        }
    });

};
VirtualLayer.prototype.setModelInfo = function (data)
{
    var price, co2, consuption;
    price = data['Equipments'][0].startingPrice;
    if (!this.price.hasClass('nochange'))
    {
        this.price.html(price);
    }
};


var virtualLayerIstance;
$('.inner-box[data-json-model]').each(function ()
{
    virtualLayerIstance = new VirtualLayer($(this));
});
var CarouselAccordion = function (accordionHandler)
{
    this.accordionHandler = $(accordionHandler);
    this.carousel = $(accordionHandler).next();
    this.observe();
};
CarouselAccordion.prototype.observe = function ()
{
    this.accordionHandler.on("click", $.proxy(this.setTarget, this));
};
CarouselAccordion.prototype.setTarget = function (event)
{
    var $target = $(event.currentTarget);
    this.openClose($target);
}
CarouselAccordion.prototype.openClose = function (target)
{
    var self = this;

    // var lazy = new Blazy({
    // 	offset: 100,
    // 	selector : "."+self.selector,
    // 	src : "data-src"
    // });

    if (!target.hasClass('js-open'))
    {
        $("html, body").animate({
            scrollTop: (target.offset().top - target.height()) + "px"
        }, 500);
    }

    $(".section-box__title--mobile").not(target)
        .removeClass("js-open")
        .next().addClass("close");

    target.addClass('js-open');
    target.next()
        .removeClass("close")
        .removeClass("owl-loaded")
    ;

    var timeout;

    timeout = setTimeout(function ()
    {
        self.refreshCarousel(target.next());
    }, 10);
};
CarouselAccordion.prototype.refreshCarousel = function (carousel)
{
    $(window).trigger("resize");
    carousel.addClass("owl-loaded").trigger("refresh.owl.carousel");
};


function AlfaAccordion(context)
{
    this.accordionBox = $(context);
    this.accordionContent = $(context).children(".accordion__box");
    this.heandler = $(context).find(".accordion__title");
    this.accordionParent = this.accordionBox.parent();
    this.target = "";
    this.observe();
};
AlfaAccordion.prototype.observe = function ()
{
    this.heandler.on("click", $.proxy(this.defineAction, this));
};
AlfaAccordion.prototype.defineAction = function ()
{
    var self = this;
    if (this.accordionParent.hasClass("accordion-group"))
    {
        this.openToggleInGroup();
    } else
    {
        this.openToggle();
    }
    ;
};
AlfaAccordion.prototype.openToggle = function ()
{
    var self = this;

    if (this.accordionBox.find(".carousel--cloned.close").length != 0)
    {
        $(".section-box__title--mobile").eq(0).triggerHandler("click");
    }

    if (!this.accordionBox.hasClass('js-open'))
    {
        $("html, body").animate({
            scrollTop: ((self.accordionBox.offset().top - self.accordionBox.height()) - $(".navigation").height() ) + "px"
        }, 500);
    }
    this.accordionBox.toggleClass("js-open");
};
AlfaAccordion.prototype.openToggleInGroup = function ()
{
    var clickedBox, otherBox, self = this, clickedBoxH;

    clickedBox = this.accordionBox;
    otherBox = this.accordionParent.find(".accordion").not(this.accordionBox);
    clickedBoxH = clickedBox.find(".accordion__box").css("height", "auto").height();

    if (clickedBox.hasClass("js-open"))
    {
        clickedBox.find(".accordion__box").css("height", 0);
        clickedBox.removeClass("js-open");
    } else
    {
        clickedBox.find(".accordion__box").css("height", clickedBoxH);
        otherBox.find(".accordion__box").css("height", 0);
        clickedBox.addClass("js-open");
        otherBox.removeClass("js-open");

        $("html, body").animate({
            scrollTop: (self.accordionBox.offset().top - self.accordionBox.height()) + "px"
        }, 500);

    }
};
var AccordionWall = function (context)
{
    this.context = $(context);
    this.breakpoint = this.context.data("breakpoint");

    if (this.breakpoint == "mobile")
    {
        this.breakpoint = 640
    }
    if (this.breakpoint == "tablet")
    {
        this.breakpoint = 768
    }
    if (this.breakpoint == "desktop")
    {
        this.breakpoint = 1024
    }

    this.title = this.context.find(".accordion_title");
    this.events();
};
AccordionWall.prototype.events = function ()
{
    var self = this;

    this.activeAccordion(breakpoints.breakpoint);
    events.on('changeBreakpoint', function (data)
    {
        self.activeAccordion(data);
    });
};
AccordionWall.prototype.openCloseAccordion = function ()
{
    if (this.context.hasClass("js-open"))
    {
        this.context.removeClass("js-open")
    } else
    {
        $(".accordion-wall").removeClass('js-open');
        this.context.addClass("js-open");

        $("html, body").animate({
            scrollTop: this.context.offset().top - this.title.height() - 50
        });
    }
};
AccordionWall.prototype.observe = function ()
{
    this.title.on("click", $.proxy(this.openCloseAccordion, this));
};
AccordionWall.prototype.resetAccordion = function ()
{
    this.context.removeClass("js-open");
};
AccordionWall.prototype.activeAccordion = function (data)
{
    if (data <= this.breakpoint)
    {
        this.observe();
    } else
    {
        this.resetAccordion();
        this.title.off("click", $.proxy(this.openCloseAccordion, this))
    }
};
var AccordionGroup = function (context)
{
    this.container = $(context);
    this.accordionBtns = $(context).children(".accordion__title");
    this.targetContainer = $(context).children(".accordion__box");

    this.timeout = "";
    this.events();
    this.observe();
};
AccordionGroup.prototype.events = function ()
{
    var self = this;
    this.resetAccordion(breakpoints.breakpoint);

    events.on('changeBreakpoint', function (data)
    {
        self.resetAccordion(data);
    });
};
AccordionGroup.prototype.observe = function ()
{
    this.accordionBtns.on("click tap", $.proxy(this.toggle, this));
    $(window).on("resize", $.proxy(this.toggleEvent, this));
};
AccordionGroup.prototype.resetAccordion = function (data)
{
    if (data <= 768)
    {
        this.accordionBtns.removeClass('js-open');
        this.container.removeClass('js-open');
        this.targetContainer.stop().slideUp().attr("style", null).removeClass('js-open');
    }
};
AccordionGroup.prototype.toggle = function (event)
{
    var
        self = this,
        $button
        ;

    $button = $(event.currentTarget);
    this.target = $button.next(".accordion__box");

    if ($button.hasClass('active') && this.container.hasClass("js-open"))
    {
        if (breakpoints.breakpoint <= 768)
        {
            this.resetAccordion(breakpoints.breakpoint);
        } else
        {
            this.targetContainer.stop().slideUp().attr("style", null).removeClass('js-open');
        }

        $button.removeClass('active');
        this.container.removeClass("js-open");

    } else
    {

        $button.addClass('active');
        this.accordionBtns.not($button).removeClass('active');

        if (breakpoints.breakpoint <= 768)
        {

            this.container.addClass("js-open");

            if (this.target.hasClass('js-open'))
            {
                this.target.attr("height", null);
                this.target.slideUp();
                this.target.removeClass('js-open');

            } else
            {
                this.target.css("height", "100%");
                this.target.addClass('js-open');
                this.target.slideDown();

            }

            this.targetContainer.not(this.target).slideUp();


        } else
        {

            if (this.container.hasClass("js-open"))
            {

                this.targetContainer.not(this.target)
                    .fadeOut()
                    .removeClass('js-open')
                    .attr("style", null);

                this.target
                    .css("height", "auto")
                    .addClass('js-open')
                    .fadeIn();

            } else
            {

                this.container.addClass("js-open");

                this.target
                    .css("height", "auto")
                    .slideDown()
                    .addClass('js-open');
            }
        }
    }
};
AccordionGroup.prototype.toggleEvent = function (event)
{
    var self = this;
    if (event.type == "resize")
    {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function ()
        {
            self.container.attr("style", null);
            // self.container.animate({
            // 	"height" : ( self.target.height() + this.accordionBtn.height() )
            // });
        }, 300);
    }
};


var FormBtn = function (context)
{
    this.context = $(context);
    this.btn = this.context.find(".btn--link");
    this.container = this.context.find(".accordion-form");
    this.observe();
};
FormBtn.prototype.observe = function ()
{
    this.btn.on("click", $.proxy(this.toggle, this));
};
FormBtn.prototype.toggle = function (event)
{
    var target = $(event.currentTarget);
    if (target.data("action") == "open")
    {
        target.parent(".form-row__inner").next(".accordion-form").slideToggle();
        // if( target.parent(".form-row__inner").next(".accordion-form").hasClass("js-close") ){
        // 	//target.parent(".form-row__inner").next(".accordion-form").removeClass("js-close");

        // }else{
        // 	//target.parent(".form-row__inner").next(".accordion-form").addClass("js-close");	
        // 	target.parent(".form-row__inner").next(".accordion-form").slideUp();
        // }
    }
};

if ($(".accordion-form").length)
{
    $(".form-row__inner").each(function ()
    {
        var formBtn = new FormBtn(this);
    });
}

if ($(".accordion").length)
{
    $(".accordion").each(function ()
    {
        var accordion = new AlfaAccordion(this);
    });
}
;

if ($(".accordion-wall").length)
{
    $(".accordion-wall").each(function ()
    {
        var accordion = new AccordionWall(this);
    });
}
;

if ($(".section-box__title--mobile").length)
{
    $(".section-box__title--mobile").each(function ()
    {
        var carouselAccordion = new CarouselAccordion(this);
    });
}
;

(function ($)
{
    Modernizr.addTest('pointerevents', function ()
    {
        return 'pointerEvents' in document.documentElement.style;
    });
    var HpSliderCursor = function ()
    {
        this.elements();
        this.observe();
        return this;
    };
    HpSliderCursor.prototype.elements = function ()
    {
        this.cursor = $(".pointer--btn");
        this.wrap = $(".slider-wrap--top");
        this.context = $(".slider-inner");
        this.notOnHover = {
            hideCursor: "a.cta, div.owl-dots, div.owl-dot, div.owl-video-play-icon, .alfa-video, .scroll-to-see"
        };
    };
    HpSliderCursor.prototype.observe = function ()
    {

        var self = this;
        this.context.on("mousemove", $.proxy(this.cursorPosition, this));
        this.wrap.on("mouseleave", $.proxy(this.cursorHide, this));
        this.wrap.on("mouseenter", $.proxy(this.cursorShow, this));

        $(this.notOnHover["hideCursor"]).on('mouseenter', function ()
        {
            self.wrap.removeClass("show");
        });
        $(this.notOnHover["hideCursor"]).on('mouseleave', function ()
        {
            self.wrap.addClass("show");
        });
    };
    HpSliderCursor.prototype.cursorDirection = function (event)
    {
        if (event.clientX > window.innerWidth / 2)
        {
            this.wrap
                .addClass('arrow-right')
                .removeClass('arrow-left');
        } else
        {
            this.wrap
                .removeClass('arrow-right')
                .addClass('arrow-left');
        }
    };
    HpSliderCursor.prototype.cursorPosition = function (event)
    {
        this.cursorDirection(event);

        var positionSlider = [];
        positionSlider.push(event.pageX);
        positionSlider.push(event.pageY);

        $(".pointer--btn")
            .css({
                "left": positionSlider[0],
                "top": positionSlider[1]
            });
    };
    HpSliderCursor.prototype.cursorHide = function (event)
    {
        this.wrap.removeClass('show');
    };
    HpSliderCursor.prototype.cursorShow = function (event)
    {
        this.wrap.addClass('show');
    };

    // control the player
    function PlayerControls(player_btn)
    {
        this.video = $(player_btn).prev(".carousel-video");
        this.playstate = 0;
        return this;
    };
    PlayerControls.prototype.initVideo = function (video)
    {

    };
    PlayerControls.prototype.playAndStop = function (event, data)
    {
        event.stopPropagation();
        this.carousel = $(event.currentTarget).parents(".owl-carousel");

        var video = $(event.currentTarget).prev(".carousel-video");
        var primitiveVideo = video.get(0);

        if (data !== undefined)
        {
            if (data.fromCarousel)
            {
                primitiveVideo.load();
                $(primitiveVideo).prop("muted", true);
            } else
            {
                $(primitiveVideo).prop("muted", false);
            }
        } else
        {
            $(primitiveVideo).prop("muted", false);
        }
        if (this.playstate == 1)
        {
            this.carousel.removeClass("video-is-playing");
            primitiveVideo.pause();
            this.playstate = 0;
        } else
        {
            primitiveVideo.play();
            this.carousel.addClass("video-is-playing");
            this.playstate = 1;
        }

    };
    var SliderHpTop = function ()
    {
        this.elements();
        this.imageLoader(); // imposto i background immagine prima del caricament differito di owl
        this.setItemsHeight(); // imposto l'altezza degli item per rendere il carousel fullscreen
        this.resizeVideoWrap(); // imposto i contenitori dei video per avere video background fullscreen
        this.createVideo(); // creo i video dividendoli per type video controllati da owl (youtube vimeo) e mp4 

        if (this.items.length > 1)
        {
            this.makeCarousel(); // inizializzo il carousel
            setTimeout(function ()
            {
                var cursor = new HpSliderCursor();
            }, 2000);
        } else
        {
            this.showBg();
        }

        this.events(); // mi metto in ascolto degli eventi
        return this;
    };
    SliderHpTop.prototype.elements = function ()
    {
        this.wrap = $(".slider-wrap--top");
        this.carousel = this.wrap.find('> .slider-inner');
        this.carouselActive = "";
        this.items = this.carousel.find('.slider__item');
        this.videos = this.items.find('.carousel-video');
        this.seemore = this.wrap.find('.scroll-to-see');
        this.cta = this.items.find(".cta");
        this.videoWrap = this.items.find('.carousel-video-wrap');
    };
    SliderHpTop.prototype.events = function ()
    {
        var self = this;
        $(window).on('resize orientationchange', function ()
        {
            self.setItemsHeight();
        });
        this.carousel.on("play.owl.video", function (event)
        {
        });
        this.carousel.on("stop.owl.video", function (event)
        {
        });
        this.carousel.on("translated.owl.carousel", function (event)
        {

            if ($(event.currentTarget).hasClass("video-is-playing"))
            {
                $("video").each(function (i, el)
                {
                    el.pause();
                    $(event.currentTarget).removeClass("video-is-playing");
                })
            } else
            {
                $(event.currentTarget).find(".owl-item.active").find(".alfa-video").trigger("click", [{fromCarousel: true}]);
            }

            // attivare le animazioni per i singoli elementi in pagina
            var eventsElements = $(event.currentTarget).find(".owl-item.active").find("[data-fx]");
        });
    };
    SliderHpTop.prototype.resizeVideoWrap = function ()
    {
        var videoWrap;
        this.videoWrap.each(function ()
        {
            videoWrap = new ResizeForBackground($(this), 9 / 16);
        });
    };
    SliderHpTop.prototype.setItemsHeight = function ()
    {
        var wH, seeH, pT;
        this.items = this.carousel.find('.slider__item');
        seeH = this.seemore.outerHeight();
        wH = $(window).height();
        if (wH > 1600)
        {
            wH = 1600;
        }
        pT = Math.floor($('.l-page').css('padding-top').replace('px', ''));
        this.items.height(wH - seeH - pT);
    };
    SliderHpTop.prototype.createVideo = function ()
    {

        var playerType;
        this.videos.each(function ()
        {
            if ($(this).find("source").attr("type") != "video/mp4")
            {
                $("<a />", {
                    "class": "owl-video",
                    'href': $(this).find("source").attr("src")
                }).appendTo($(this).parent());
                $(this).hide();
            } else
            {
                playerType = $(this).data("video-type");

                $(this).css({
                    "width": "100%",
                    "height": "auto"
                });

                var videoPlayer = new PlayerControls(this);

                $("<a />", {
                    "class": "alfa-video" + " type-" + playerType,
                    click: videoPlayer.playAndStop
                }).appendTo($(this).parent());
            }
        });
    };
    SliderHpTop.prototype.imageLoader = function ()
    {

        $(".slider__item .slider_image").each(function ()
        {
            var bkg, self = $(this);

            if (breakpoints.breakpoint >= 1200)
            {
                bkg = self.data('src');
            }
            ;
            if (breakpoints.breakpoint === 1024)
            {
                bkg = self.data('src-medium');
            }
            ;
            if (breakpoints.breakpoint < 1024)
            {
                bkg = self.data('src-small');
            }
            ;
            //self.css('background-image', 'url(' + bkg + ')');

            self.attr("data-src", bkg);
        });
    };
    SliderHpTop.prototype.makeCarousel = function ()
    {
        var self = this;


        // {:"data-autoplay"=>"true", :"data-autoplay-time"=>"true"}

        if (this.carousel.data("autoplay") != null)
        {
            var timing = this.carousel.data("autoplay");

            this.carouselActive = this.carousel.owlCarousel({
                video: true,
                items: 1,
                lazyLoad: true,
                nav: true,
                autoplay: true,
                autoplayTimeout: timing,
                responsiveClass: true,
                loop: true,
                responsive: {
                    0: {
                        positions: true
                    },
                    640: {
                        positions: false
                    }
                }
                // ,autoHeight: true
            });
        } else
        {
            this.carouselActive = this.carousel.owlCarousel({
                video: true,
                items: 1,
                lazyLoad: true,
                nav: true,
                responsiveClass: true,
                loop: true,
                responsive: {
                    0: {
                        positions: true
                    },
                    640: {
                        positions: false
                    }
                }
                // ,autoHeight: true
            });

        }
        this.carouselNextPrev();

    };
    SliderHpTop.prototype.showBg = function ()
    {
        var bgSrc, divBg = this.items.find('.slider_image');
        if (divBg.length >= 1)
        {
            bgSrc = divBg.data('src');
            if (breakpoints.breakpoint === 768)
            {
                bgSrc = divBg.data('src-medium');
            }
            if (breakpoints.breakpoint === 640)
            {
                bgSrc = divBg.data('src-small');
            }
            divBg.css({
                'background-image': 'url(' + bgSrc + ')'
            });
        }
    };
    SliderHpTop.prototype.carouselNextPrev = function ()
    {
        var self = this;

        this.wrap.on('click', function (event)
        {
            if (self.wrap.hasClass('show') && !device.tablet())
            {

                if ($(this).hasClass('arrow-right'))
                {
                    self.carousel.trigger('next.owl.carousel');
                }
                if ($(this).hasClass('arrow-left'))
                {
                    self.carousel.trigger('prev.owl.carousel');
                }

            }
            // qui aggancio il return false
        });
    };


    if ($(".slider-wrap--top").length)
    {
        var carouselTop = new SliderHpTop();
    }

// })(jQuery);
// (function($){

})(jQuery);
//grid__image

// lazy-resp
var imageLazyUpload = function (elem)
{
    this.elements = $(elem);
    this.imageSrc = this.elements.find("img");
    this.selector = $(elem).attr("class");
    this.events();
    this.lazy = "";
};
imageLazyUpload.prototype.events = function ()
{
    var self = this;
    this.addImage(breakpoints.breakpoint);
    events.on('changeBreakpoint', function ()
    {
        self.addImage();
    });
};
imageLazyUpload.prototype.lazyload = function ()
{
    var self = this;
    // creo l'istanza Blazy come attributo dell'oggetto globale così da poter richiamare il suo metodo revalidate() con globalVar.lazy.revalidate() ovunque serva
    globalVar.lazy = new Blazy({
        offset: 100,
        selector: "." + self.selector,
        src: "data-src"
    });
};
imageLazyUpload.prototype.addImage = function ()
{
    var self = this, bkg;

    if (this.imageSrc.hasClass("lazy-resp"))
    {

        this.elements.each(function ()
        {
            if (breakpoints.breakpoint >= 1200)
            {
                bkg = self.imageSrc.data('src');
            }
            ;
            if (breakpoints.breakpoint === 1024)
            {
                bkg = self.imageSrc.data('src-medium');
            }
            ;
            if (breakpoints.breakpoint < 1024)
            {
                bkg = self.imageSrc.data('src-small');
            }
            ;
            self.elements.attr("data-src", bkg);
        });

    } else
    {
        this.elements.each(function ()
        {
            bkg = self.imageSrc.attr("src");
            self.elements.attr("data-src", bkg);
        });
    }
    this.lazyload();
};


$(".grid__image").each(function ()
{
    console.log($(this));
    if (!$(this).hasClass('grid__item-choose') && !device.mobile())
    {
        var gm = new imageLazyUpload(this);
    }
});

// var prova = new Blazy({
// 		offset: 100,
// 		selector : ".js-responsive-image",
// 		src : "data-src"
// 	});


var carousel = null;

$(window, "document").on("load resize", function ()
{
    if (window.innerWidth >= 768)
    {
        globalVar.lazy.revalidate(); // chiedo a Blazy di ricalcolare ciò che si deve vedere
        carousel = $(".section-boxes").owlCarousel({
            items: 1,
            autoHeight: true,
            dots: false

        });
        carousel.on("translated.owl.carousel", function (event)
        {
            globalVar.lazy.revalidate(); // chiedo a Blazy di ricalcolare ciò che si deve vedere
        });
    } else
    {
        if (carousel != null)
        {
            carousel.trigger("destroy.owl.carousel");
        }
    }
});

$(".tabs .tab-header button").on("click", function (e)
{
    e.preventDefault();

    var $el = $(e.currentTarget).addClass("tab-header__item--active");
    $(".tabs .tab-header button").not($el).removeClass("tab-header__item--active");
    var pos = $el.index();

    if (carousel != null)
    {
        carousel.trigger("to.owl.carousel", [pos, 250, true]);
    }
});


// da inizializzare 
var SocialTab = function (context)
{
    this.tabButton = $(context).find(".tab-header button");
    this.accordionButtons = $(context).find();
    this.carousel = $(context).find(".section-boxes");
};
SocialTab.prototype.observe = function ()
{
    this.tabButton.on("click tap");
    this.accordionButton.on("click tap");
    $(window).on("load");
    $(window).on("resize");
};
SocialTab.prototype.simulateAccordion = function (e)
{
    var $accordionButton, $accordionTarget;

    $accordionButton = $(e.currentTarget);
    $accordionTarget = $accordionButton.next();

    $accordionButton.toggleClass("js-open");
    $accordionTarget.toggleClass("js-open");
};
SocialTab.prototype.startCarousel = function ()
{
    this.activeCarousel = this.carousel.owlCarousel({
        items: 1,
        dotsContainer: ".tab-header"
    });
};
SocialTab.prototype.changeTab = function (e)
{
    e.preventDefault();
    var
        $el,
        pos
        ;
    $el = $(e.currentTarget);

    $el.addClass("tab-header__item--active");
    pos = $el.index();

    // rimuovo lo stato attivo dai pulsanti delle tab non cliccate
    this.accordionButtons.not($el).removeClass("tab-header__item--active");

    // mi sposto nella posizione scelta dalla tab passando per tutte le tab
    this.carousel.trigger("to.owl.carousel", [pos]);
};
SocialTab.prototype.reset = function (elemType, resetState)
{
    // elemType è il tipo di elemento da resettare

    // resetto il carousel se attivo
    if (elemType === "carousel")
    {
        this.activeCarousel.trigger("destroy.owl.carousel");
    }
    // setto allo stato iniziale i pulsanti dell'accordion
    if (elemType === "buttons")
    {
        this.accordionButtons.each(function (v, i)
        {
            $(i).removeClass(resetState);
            $(i).next().removeClass(resetState);
        });
    }
};

var Tabs = function (container)
{
    this.container = $(container);
    this.button = this.container.find(".tab-header__item");
    this.content = this.container.find(".tab-contents");
    this.observe();
};
Tabs.prototype.observe = function ()
{
    $(this.button).on("click", $.proxy(this.findContent, this));
};
Tabs.prototype.findContent = function (event)
{
    var target = $(event.currentTarget);
    target.addClass('tab-header__item--active')
    this.button.not(target).removeClass("tab-header__item--active");

    var panel = this.content.find("[data-tab='" + target.data("tab") + "']");
    panel.removeClass('js-open');
    if (target.data("tab") == "all")
        this.content.find(".tab-content").removeClass('js-open');
    else
        this.content.find(".tab-content").not(panel).addClass('js-open');
}

var tabs = new Tabs(".ar-tabs");

var countTabs = new Tabs(".tabs--count");

countTabs.setAlternative = function ()
{
    var index = 0;
    this.content.children().not(".js-open").each(function (index)
    {
        $(this).removeClass("tab-content--left tab-content--right")
        if (index % 2)
            $(this).addClass("tab-content--right");
        else
            $(this).addClass("tab-content--left");
    });
    $(this.button).on("click", $.proxy(this.setAlternative, this));
}

countTabs.countElment = function (elemType)
{
    if (elemType == "all")
        return this.content.children().length;
    else
    {
        var totalElement = this.content.children().filter(function ()
        {
            return $(this).data("tab") == elemType
        });
        return totalElement.length;
    }
};
countTabs.printCountElement = function ()
{
    var self = this,
        dataTab = "";

    self.button.each(function ()
    {
        var dataTab = $(this).data("tab");
        $(this).find("span").text("(" + self.countElment(dataTab) + ")");
        //console.log(dataTab, self.countElment(dataTab));
    })
}

countTabs.setAlternative();
countTabs.printCountElement();

//in this case carousel-wrap , dragthisshit

function DraggedCarousel(carousel)
{
    this.carousel = $(carousel);
    this.activateCarousel();
};
DraggedCarousel.prototype.imageLoader = function ()
{

    $(".carousel__image .owl-lazy").each(function ()
    {
        var bkg, self = $(this);

        if (breakpoints.breakpoint >= 1200)
        {
            bkg = self.data('src');
        }
        ;
        if (breakpoints.breakpoint === 1024)
        {
            bkg = self.data('src-medium');
        }
        ;
        if (breakpoints.breakpoint < 1024)
        {
            bkg = self.data('src-small');
        }
        ;
        //self.css('background-image', 'url(' + bkg + ')');

        self.attr("data-src", bkg);
    });
};
DraggedCarousel.prototype.activateCarousel = function ()
{
    var self = this;

    var simulateLazyLoad = function (actives)
    {
        var src, item;
        actives.each(function ()
        {
            item = $(this).find('.owl-lazy');
            if (item.hasClass('loaded'))
            {
                return;
            }
            src = item.data('src');
            item
                .attr('src', src)
                .css('opacity', '1').
                addClass('loaded');
        });
    };

    this.carousel.on("initialized.owl.carousel translated.owl.carousel", function (event)
    {
        var actives = self.carousel.find('.owl-item.active');
        simulateLazyLoad(actives);
    });

    this.carousel.owlCarousel({
        margin: 20,
        responsive: {
            0: {
                items: 1,
                dots: false,
                nav: true,
                lazyLoad: true,
                positions: true
            },
            760: {
                items: 2,
                dots: true,
                slideBy: 2,
                lazyLoad: true,
                positions: false
            },
            1024: {
                dots: true,
                items: 3,
                slideBy: 3
            },
            1025: {
                dots: false,
                nav: true,
                sliderbar: true
            }
        }
    });
};


var carouselDragged = new DraggedCarousel(".carousel-wrap__inner");
var AncorMenu = function (context)
{
    this.elements(context);
    // this.events();
    // this.options = {};
    var self = this;

    // calcola le dimensioni quando l'evento caricato è triggato
    this.offsetstiky = this.menu.offset().top;
    this.sticknavigation();
    this.popolateAncorObject();
    this.observe();

    this.getThePath();
    this.addScrollBtn();
    this.observeMobile();
    this.activateMenuScroll();
    // da applicare anche al resize
};
AncorMenu.prototype.triggerPosition = function (target)
{
    this.listItems.find("[data-target='" + target + "']").trigger("click");
};
AncorMenu.prototype.elements = function (context)
{
    this.nav = $(context); // container navigazione
    // this.line = this.nav.find(".activeborder");
    this.menu = this.nav.find(".ancor-menu"); // menu con le ancore di navigazione
    this.listItems = this.menu.find("li"); // parent delle ancore di navigazione a cui viene settato l'active
    this.markpoint = this.listItems.find("a"); // ancore di navigazione 
};
AncorMenu.prototype.observe = function ()
{
    //this.markpoint.on("mouseenter", $.proxy(this.findPosition, this)); // animazione
    //this.context.on("mouseleave", $.proxy(this.resetPosition, this)); // click	
    this.markpoint.on("click", $.proxy(this.retriveTarget, this)); // click
    $(window).on("scroll", $.proxy(this.sticknavigation, this));
    $(window).on("scroll", $.proxy(this.findTarget, this));

    this.timer = '';
    $(window).on("resize scroll", $.proxy(this._toggle, this));
};
AncorMenu.prototype.setThePath = function (target)
{
    window.location.href = "#" + target;
};
AncorMenu.prototype.getThePath = function ()
{
    var pathPos = window.location.href.indexOf("#"), pathTarget;
    if (pathPos != -1)
    {
        pathTarget = window.location.href.slice(pathPos + 1, window.location.href.length);
        this.triggerPosition(pathTarget);
    }

};
AncorMenu.prototype.observeMobile = function (data)
{
    if (device.mobile() || (device.tablet() && device.portrait()))
    {
        this.swiper = new Hammer(this.menu.get(0));
        this.swiper.on("swipe", function (event)
        {
            if (event.direction == 2)
            {
                $(".scrollLeftBtn").trigger("click");
            } else if (event.direction == 4)
            {
                $(".scrollRightBtn").trigger("click");
            }
        });
    }
};
AncorMenu.prototype._toggle = function (event)
{
    var self = this;
    if (event.type == "resize")
    {
        clearTimeout(this.timer)
        this.timer = setTimeout(function ()
        {
            self.offsetstiky = self.menu.offset().top;
            self.popolateAncorObject();
            self.activateMenuScroll();
        }, 300);
    } else if (event.type == "scroll")
    {
        clearTimeout(this.timer)
        this.timer = setTimeout(function ()
        {
            self.popolateAncorObject();
        }, 250);
    }
};
AncorMenu.prototype.activateMenuScroll = function (data)
{
    if (window.innerWidth <= 960)
    {
        var menuW = this.calcWidthDimension();
        if (menuW > this.menu.outerWidth(true))
        {
            this.menu
                .addClass("ancor-menu--portrait")
                .css({
                    "width": menuW,
                    "position": "relative"
                });
        }
    } else
    {
        $(".scrollRightBtn").addClass("js-disabled");
        $(".scrollLeftBtn").addClass("js-disabled");
        this.menu
            .removeClass("ancor-menu--portrait")
            .attr("style", null);
    }
};
AncorMenu.prototype.retriveTarget = function (event)
{
    event.preventDefault();
    var targetPos, $elem, $target;

    $elem = $(event.currentTarget).parent("li");
    this.markpoint.parent("li").not($elem).removeClass('active');
    $elem.addClass('active');

    $target = $("[data-ancor-target='" + $(event.currentTarget).data("target") + "']");

    if (this.nav.hasClass('js-fixed'))
    {
        targetPos = $target.offset().top;
    } else
    {
        targetPos = $target.offset().top - ( this.nav.height() + $(".navigation").height() );
    }

    this.scrollToPosition(targetPos);

    this.setThePath($(event.currentTarget).data("target"));
};


AncorMenu.prototype.scrollToPosition = function (targetPos)
{
    var self = this;
    $("body , html").animate({
        scrollTop: targetPos - ( self.nav.height() + $(".navigation").height() )
    }, 500);
};
AncorMenu.prototype.calcWidthDimension = function ()
{
    var totalWidth = 0;

    this.listItems.each(function ()
    {
        totalWidth += $(this).outerWidth(true) + 20;
    });

    return totalWidth;
};
AncorMenu.prototype.addScrollBtn = function ()
{
    var self = this;

    // pulsante di destra
    this.listItems.eq(0).addClass("current");

    this.prevBtn = $("<div />", {
        "class": "scrollRightBtn",
        click: function ()
        {
            self.findIndexElement(1)
        }
    }).appendTo(this.menu.parent());

    // pulsante di sinistra
    this.nextBtn = $("<div />", {
        "class": "scrollLeftBtn",
        click: function ()
        {
            self.findIndexElement(-1)
        }
    }).appendTo(this.menu.parent());

    $(".scrollLeftBtn").addClass("js-disabled");
    $(".scrollRightBtn").removeClass("js-disabled");
};
AncorMenu.prototype.popolateAncorObject = function ()
{

    var self = this;
    this.ancorObj = []; // array che contiene tutti i target delle ancor
    // this.listItems
    $("[data-ancor-target]").each(function ()
    {
        self.ancorObj.push({
            ancorName: $(this).data("ancor-target"),
            offTop: $(this).offset().top,
            offEnd: $(this).offset().top + $(this).height()
        });
    });
    console.log(this.ancorObj);
};
AncorMenu.prototype.findTarget = function ()
{
    var
        self = this,
        menuLi, menuLiParent, menuLiSiblingParent
        ;

    $.each(this.ancorObj, function (i, v)
    {

        if (window.scrollY >= v.offTop && window.scrollY <= v.offEnd)
        {

            menuLi = self.menu.find("li a[data-target=" + v.ancorName + "]");
            menuLiParent = menuLi.parent("li");
            menuLiSiblingParent = self.menu.find("li a").not(menuLi).parent("li");

            menuLiParent.addClass('active');
            menuLiSiblingParent.removeClass('active');

            var index = menuLiParent.index();
            var startindex = self.menu.find(".current").index();
            self.findIndexElement(index - startindex);
        }
    });
};
AncorMenu.prototype.findIndexElement = function (index)
{
    var startindex, oldOffset, newOffset, increment, nextElement, oldIncrement;

    startindex = this.menu.find(".current").index();
    nextElement = this.menu.find("li").eq(startindex + index);

    // console.log(this.listItems.length, (startindex + index) );
    if (this.listItems.length - 1 == (startindex + index))
    { // se
        $(".scrollRightBtn").addClass("js-disabled");
    } else if ((startindex + index) == 0)
    {
        $(".scrollLeftBtn").addClass("js-disabled");
    } else
    {
        $(".scrollRightBtn").removeClass("js-disabled");
        $(".scrollLeftBtn").removeClass("js-disabled");

        this.listItems.removeClass("current");
        nextElement.addClass('current');

        increment = Math.floor(this.menu.find("li.current").get(0).offsetLeft);
        this.scrollLeft(increment);
    }
};
AncorMenu.prototype.scrollLeft = function (increment)
{
    this.menu.stop().animate({
        left: "-" + increment + "px"
    });
};
AncorMenu.prototype.sticknavigation = function ()
{
    if ((window.scrollY + 80) >= this.offsetstiky)
    {
        $("body").css({"padding-top": this.nav.height()});
        $(".ancorbox").addClass('js-fixed');
        $(".navigation--min").addClass('js-fixed')
    } else
    {
        $(".ancorbox").removeClass('js-fixed');
        $(".navigation--min").removeClass('js-fixed')
        $("body").attr("style", null);
    }
};


$(".ancorbox").each(function ()
{
    var ancormenu = new AncorMenu(this);
});

var SlideMenu = function (menu, stiky, breakpoint)
{
    this.menu = $(menu); // container navigazione
    this.listItems = this.menu.children(); // parent delle ancore di navigazione a cui viene settato l'active
    // this.events();

    this.options = {
        isStiky: stiky,
        StartMediaQueries: breakpoint
    };
    this.observe();


    // calcola le dimensioni quando l'evento caricato è triggato
    // this.offsetstiky = this.menu.offset().top;
    // this.sticknavigation();
    // this.popolateAncorObject();
    // this.observe();

    // this.getThePath();
    // this.addScrollBtn();
    // this.observeMobile();
    this.activateMenuScroll(breakpoints.breakpoint);
    // da applicare anche al resize
    return this;
};
SlideMenu.prototype.observe = function ()
{
    this.timer = '';
    $(window).on("resize scroll", $.proxy(this._toggle, this));
};
SlideMenu.prototype.calcWidthDimension = function ()
{
    var totalWidth = 0;

    this.listItems.each(function ()
    {
        totalWidth += $(this).outerWidth(true) + 20;
    });

    return totalWidth;
};
SlideMenu.prototype.createMenu = function ()
{
    if (this.menu.find(".menu__wrap").length == 0)
    {
        this.menu.wrapInner("<div class='menu__wrap'></div>");
        this.menuWrap = this.menu.find(".menu__wrap");
        this.addControls();
    }
};
SlideMenu.prototype.addControls = function ()
{
    var self = this;


    // pulsante di destra
    this.listItems.eq(0).addClass("current");

    this.prevBtn = $("<div />", {
        "class": "scrollRightBtn",
        click: function ()
        {
            self.findIndexElement(1)
        }
    }).appendTo(self.menu);

    // pulsante di sinistra
    this.nextBtn = $("<div />", {
        "class": "scrollLeftBtn",
        click: function ()
        {
            self.findIndexElement(-1)
        }
    }).appendTo(self.menu);

    $(".scrollLeftBtn").addClass("js-disabled");
    $(".scrollRightBtn").removeClass("js-disabled");
};

SlideMenu.prototype.observeMobile = function (data)
{
    if (device.mobile() || (device.tablet() && device.portrait()))
    {
        this.swiper = new Hammer(this.menu.get(0));
        this.swiper.on("swipe", function (event)
        {
            if (event.direction == 2)
            {
                $(".scrollLeftBtn").trigger("click");
            } else if (event.direction == 4)
            {
                $(".scrollRightBtn").trigger("click");
            }
        });
    }
};
SlideMenu.prototype._toggle = function (event)
{
    var self = this;
    if (event.type == "resize")
    {
        clearTimeout(this.timer)
        this.timer = setTimeout(function ()
        {
            // self.offsetstiky = self.menu.offset().top;
            // self.popolateAncorObject();

            self.activateMenuScroll(breakpoints.breakpoint);

        }, 300);
    } else if (event.type == "scroll")
    {
        clearTimeout(this.timer)
        this.timer = setTimeout(function ()
        {
            // self.popolateAncorObject();
        }, 250);
    }
};
SlideMenu.prototype.activateMenuScroll = function (data)
{

    if (data <= this.options.StartMediaQueries)
    {
        this.observeMobile();
        this.createMenu();

        var menuW = this.calcWidthDimension();
        if (menuW > this.menu.outerWidth(true))
        {
            this.menuWrap
                .css({
                    "width": menuW,
                    "position": "relative"
                });
        }
    } else
    {
        $(".scrollRightBtn").addClass("js-disabled");
        $(".scrollLeftBtn").addClass("js-disabled");
        if (this.menu.find(".menu__wrap").length != 0)
        {
            this.menuWrap.attr("style", null);
        }

    }
};
SlideMenu.prototype.findIndexElement = function (index)
{
    var startindex, oldOffset, newOffset, increment, nextElement, oldIncrement;

    startindex = this.menuWrap.find(".current").index();
    nextElement = this.menuWrap.children().eq(startindex + index);

    // console.log(this.listItems.length, (startindex + index) );
    if (this.listItems.length == (startindex + index))
    { // se
        $(".scrollRightBtn").addClass("js-disabled");
    } else if ((startindex) == 0 && index == -1)
    {
        $(".scrollLeftBtn").addClass("js-disabled");
    } else
    {
        $(".scrollRightBtn").removeClass("js-disabled");
        $(".scrollLeftBtn").removeClass("js-disabled");

        this.listItems.removeClass("current");
        nextElement.addClass('current');


        increment = Math.floor(this.menuWrap.find(".current").get(0).offsetLeft);
        this.scrollLeft(increment);
    }
};
SlideMenu.prototype.scrollLeft = function (increment)
{
    this.menuWrap.stop().animate({
        left: "-" + increment + "px"
    });
};


$(".tab-header.tab-header--slidable").each(function ()
{
    var slideMenu = new SlideMenu(this, true, 640);
});

var newsPagination = function (context, breakpoint)
{

    var self = this;

    this.container = $(context);
    this.items = $(context).find(".grid__item");

    this.itemshow = $(context).data("item-to-show");
    this.breakpoint = breakpoint;
    this.newsContainer = $(document.createElement("div"));

    this.buttonMore = $("<div />", {
        class: "btn btn-white"
    });


    this.showHide(breakpoints.breakpoint);

    events.on('changeBreakpoint', function (data)
    {
        self.showHide(data);
    });

    this.observe();

    return this;
};
newsPagination.prototype.observe = function ()
{
    this.buttonMore.on("click", $.proxy(this.revealMore, this))
};
newsPagination.prototype.revealMore = function (event)
{
    var button = $(event.currentTarget);
    var elementShowed = parseInt(button.find(".current").text());

    this.newsContainer.find(".grid__item.js-hide").index();

    var i = 0;

    for (i; i < this.items.length; i++)
    {
        if (i <= (this.itemshow - 1))
        {
            this.newsContainer.find(".grid__item.js-hide").eq(i).removeClass("js-hide");
        }
    }

    var Amount;
    if (elementShowed + this.itemshow >= this.items.length)
    {
        Amount = this.items.length;
        button.hide();
    } else
    {
        Amount = elementShowed + this.itemshow;
    }
    button.find(".current").text(Amount);

};
newsPagination.prototype.createItem = function (item, index)
{
    var newItem = $(document.createElement("div"));
    if (index > (this.itemshow - 1))
    {
        newItem.addClass('grid__item js-hide')
    } else
    {
        newItem.addClass('grid__item')
    }
    newItem
        .html(item.html());
    return newItem;
};
newsPagination.prototype.createNews = function ()
{
    var newItem, self = this;
    this.newsContainer.addClass('news--cloned');
    this.items.each(function (i, el)
    {
        newItem = self.createItem($(el), i);
        $(self.newsContainer).append(newItem);
    });

    self.insertElem(self.newsContainer);
};
newsPagination.prototype.insertElem = function (carousel)
{
    var self = this;
    var currentInview;
    if (this.itemshow >= this.items.length)
    {
        currentInview = this.items.length;
    } else
    {
        currentInview = this.itemshow;
    }

    this.buttonMore.html("<p>" + labels.showMore + " (<span class='current'>" + currentInview + "</span>" + "/" + this.items.length + ")</p>")

    this.container.after(this.buttonMore);
    this.container.after(carousel);
};
newsPagination.prototype.showHide = function (data)
{
    if (data < this.breakpoint)
    {

        this.createNews();
        //
        this.container.hide();
        this.newsContainer.show();
        this.buttonMore.show();
    } else
    {
        this.container.show();
        this.newsContainer.hide();
        this.buttonMore.hide();

    }
};
$(".news--block").each(function ()
{
    var pagiantion = new newsPagination(this, 1023)
});

var navigation = new Navigation();

var asideNavigation = function ()
{
    this.context = $(".aside");
    this.btn = $(".aside__stripe");
    var self = this;

    function rollhover()
    {
        self.btn.on("mouseenter", function ()
        {
            $(this).addClass("js-hover");
            $(this).find(".aside__label").addClass("js-open");
        });
        self.btn.on("mouseleave", function ()
        {
            $(this).removeClass("js-hover");
            $(this).find(".aside__label").removeClass("js-open");
        });
        self.btn.on("click", function ()
        {
            $(this).toggleClass("js-hover");
            $(this).find(".aside__label").toggleClass("js-open");
        });
    }

    rollhover();
};

if ($(".aside").length)
{
    asideNavigation();
}

$('.scroll-to-see').scrollToSee();

var chooseCarousel = new CreateCarouselMobile(".grid--choose", ".grid__item--choose", ".tl-arg", 768);
var newsCarousel = new CreateCarouselMobile("[data-target='alfaromeoworld']", ".grid__item--tab", ".section-box__title--mobile", 768);
var eventsCarousel = new CreateCarouselMobile("[data-target='newsevents']", ".grid__item", ".section-box__title--mobile", 768);
var social = new CreateCarouselMobile("[data-target='social']", ".grid__item", ".section-box__title--mobile", 768);


if ($(".accordion_group").length)
{
    $(".accordion_group").each(function ()
    {
        var accordion = new AccordionGroup(this);
    });
}


// Parallax
if ($(".parallaxed").length)
{
    var parallassi = new Parallax();
}
;


if ($(".offers-slider").length && $(".offers-slider .slider__item").length > 1)
{
    $(".offers-slider").owlCarousel({
        items: 1,
        itemElement: "section",
        responsive: {
            0: {
                positions: true,
                nav: true
                //items: 1
            },
            680: {
                positions: false,
                nav: true,
                dots: true
                //items: 2,
                //page: 2
            }
        }
    });
}
;

if ($(".news-slider").length && $(".news-slider .slider__item").length > 1)
{
    $(".news-slider").owlCarousel({
        items: 1,
        itemElement: "section",
        responsive: {
            0: {
                positions: true,
                nav: true
                //items: 1
            },
            680: {
                positions: false,
                nav: false,
                dots: true
                //items: 2,
                //page: 2
            }
        }
    });
}

if ($(".form-section .map-container").length)
{
    var initLng = 7.698944,
        initLat = 45.076115,
        initZoom = 14,
        defaultStyle = [{
            "featureType": "all",
            "stylers": [{
                "saturation": -80
            }]
        }];

    var map = new google.maps.Map($(".form-section .map-container").get(0), {
        center: new google.maps.LatLng(initLat, initLng),
        zoom: initZoom,
        panControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        overviewMapControl: false,
        rotateControl: false,
        scaleControl: true,
        streetViewControl: false,
        scrollwheel: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
        },
        styles: defaultStyle
    });

    // Inserisco dei dealer finti come esempio
    var dealers = [{
        XCOORD: 7.692764,
        YCOORD: 45.079933
    }, {
        XCOORD: 7.674795,
        YCOORD: 45.077191
    }, {
        XCOORD: 7.706442,
        YCOORD: 45.074046
    }, {
        XCOORD: 7.715211,
        YCOORD: 45.076902
    }];
    var marker;
    dealers.forEach(function (currentDealer, index)
    {
        marker = new RichMarker({
            position: (new google.maps.LatLng(currentDealer.YCOORD, currentDealer.XCOORD)),
            map: map,
            draggable: false,
            shadow: false,
            content: "<div class='marker " + (index == 2 ? "selected" : "") + "'><span>" + (index + 1) + "</span></div>"
        });
    });
}
;

































