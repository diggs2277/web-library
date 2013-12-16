/*
 * jQuery BBQ: Back Button & Query Library - v1.3pre - 8/26/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */(function($, r) {
    function G(I) {
        return typeof I === "string";
    }
    function D(J) {
        var I = n.call(arguments, 1);
        return function() {
            return J.apply(this, I.concat(n.call(arguments)));
        };
    }
    function o(I) {
        return I.replace(H, "$2");
    }
    function q(I) {
        return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1");
    }
    function f(K, P, I, L, J) {
        var R, O, N, Q, M;
        if (L !== h) {
            N = I.match(K ? H : /^([^#?]*)\??([^#]*)(#?.*)/);
            M = N[3] || "";
            if (J === 2 && G(L)) {
                O = L.replace(K ? u : p, "");
            } else {
                Q = m(N[2]);
                L = G(L) ? m[K ? F : B](L) : L;
                O = J === 2 ? L : J === 1 ? $.extend({}, L, Q) : $.extend({}, Q, L);
                O = j(O);
                if (K) {
                    O = O.replace(g, t);
                }
            }
            R = N[1] + (K ? C : O || !N[1] ? "?" : "") + O + M;
        } else {
            R = P(I !== h ? I : location.href);
        }
        return R;
    }
    function A(K, I, J) {
        if (I === h || typeof I === "boolean") {
            J = I;
            I = a[K ? F : B]();
        } else {
            I = G(I) ? I.replace(K ? u : p, "") : I;
        }
        return m(I, J);
    }
    function v(L, J, K, I) {
        if (!G(K) && typeof K !== "object") {
            I = K;
            K = J;
            J = h;
        }
        return this.each(function() {
            var O = $(this), M = J || k()[(this.nodeName || "").toLowerCase()] || "", N = M && O.attr(M) || "";
            O.attr(M, a[L](N, K, I));
        });
    }
    var h, n = Array.prototype.slice, t = decodeURIComponent, a = $.param, j, c, m, y, b = $.bbq = $.bbq || {}, s, x, k, e = $.event.special, d = "hashchange", B = "querystring", F = "fragment", z = "elemUrlAttr", l = "href", w = "src", p = /^.*\?|#.*$/g, u, H, g, i, C, E = {};
    a[B] = D(f, 0, q);
    a[F] = c = D(f, 1, o);
    a.sorted = j = function(J, K) {
        var I = [], L = {};
        $.each(a(J, K).split("&"), function(P, M) {
            var O = M.replace(/(?:%5B|=).*$/, ""), N = L[O];
            if (!N) {
                N = L[O] = [];
                I.push(O);
            }
            N.push(M);
        });
        return $.map(I.sort(), function(M) {
            return L[M];
        }).join("&");
    };
    c.noEscape = function(J) {
        J = J || "";
        var I = $.map(J.split(""), encodeURIComponent);
        g = new RegExp(I.join("|"), "g");
    };
    c.noEscape(",/");
    c.ajaxCrawlable = function(I) {
        if (I !== h) {
            if (I) {
                u = /^.*(?:#!|#)/;
                H = /^([^#]*)(?:#!|#)?(.*)$/;
                C = "#!";
            } else {
                u = /^.*#/;
                H = /^([^#]*)#?(.*)$/;
                C = "#";
            }
            i = !!I;
        }
        return i;
    };
    c.ajaxCrawlable(0);
    $.deparam = m = function(L, I) {
        var K = {}, J = {
            "true": !0,
            "false": !1,
            "null": null
        };
        $.each(L.replace(/\+/g, " ").split("&"), function(O, T) {
            var N = T.split("="), S = t(N[0]), M, R = K, P = 0, U = S.split("]["), Q = U.length - 1;
            if (/\[/.test(U[0]) && /\]$/.test(U[Q])) {
                U[Q] = U[Q].replace(/\]$/, "");
                U = U.shift().split("[").concat(U);
                Q = U.length - 1;
            } else {
                Q = 0;
            }
            if (N.length === 2) {
                M = t(N[1]);
                if (I) {
                    M = M && !isNaN(M) ? +M : M === "undefined" ? h : J[M] !== h ? J[M] : M;
                }
                if (Q) {
                    for (; P <= Q; P++) {
                        S = U[P] === "" ? R.length : U[P];
                        R = R[S] = P < Q ? R[S] || (U[P + 1] && isNaN(U[P + 1]) ? {} : []) : M;
                    }
                } else {
                    if ($.isArray(K[S])) {
                        K[S].push(M);
                    } else {
                        if (K[S] !== h) {
                            K[S] = [ K[S], M ];
                        } else {
                            K[S] = M;
                        }
                    }
                }
            } else {
                if (S) {
                    K[S] = I ? h : "";
                }
            }
        });
        return K;
    };
    m[B] = D(A, 0);
    m[F] = y = D(A, 1);
    $[z] || ($[z] = function(I) {
        return $.extend(E, I);
    })({
        a: l,
        base: l,
        iframe: w,
        img: w,
        input: w,
        form: "action",
        link: l,
        script: w
    });
    k = $[z];
    $.fn[B] = D(v, B);
    $.fn[F] = D(v, F);
    b.pushState = s = function(L, I) {
        if (G(L) && /^#/.test(L) && I === h) {
            I = 2;
        }
        var K = L !== h, J = c(location.href, K ? L : {}, K ? I : 2);
        location.href = J;
    };
    b.getState = x = function(I, J) {
        return I === h || typeof I === "boolean" ? y(I) : y(J)[I];
    };
    b.removeState = function(I) {
        var J = {};
        if (I !== h) {
            J = x();
            $.each($.isArray(I) ? I : arguments, function(L, K) {
                delete J[K];
            });
        }
        s(J, 2);
    };
    e[d] = $.extend(e[d], {
        add: function(I) {
            function J(M) {
                var L = M[F] = c();
                M.getState = function(N, O) {
                    return N === h || typeof N === "boolean" ? m(L, N) : m(L, O)[N];
                };
                K.apply(this, arguments);
            }
            var K;
            if ($.isFunction(I)) {
                K = I;
                return J;
            } else {
                K = I.handler;
                I.handler = J;
            }
        }
    });
})(jQuery, this);

(function($) {
    var o = $({});
    $.subscribe = function() {
        o.on.apply(o, arguments);
    };
    $.unsubscribe = function() {
        o.off.apply(o, arguments);
    };
    $.publish = function() {
        o.trigger.apply(o, arguments);
    };
})(jQuery);

var SparkMD5 = function() {
    function h(f, d, b, a, c, e) {
        d = k(k(d, f), k(a, e));
        return k(d << c | d >>> 32 - c, b);
    }
    function g(f, d, b, a, c, e, g) {
        return h(d & b | ~d & a, f, d, c, e, g);
    }
    function i(f, d, b, a, c, e, g) {
        return h(d & a | b & ~a, f, d, c, e, g);
    }
    function j(f, d, b, a, c, e, g) {
        return h(b ^ (d | ~a), f, d, c, e, g);
    }
    function l(f, d) {
        var b = f[0], a = f[1], c = f[2], e = f[3], b = g(b, a, c, e, d[0], 7, -680876936), e = g(e, b, a, c, d[1], 12, -389564586), c = g(c, e, b, a, d[2], 17, 606105819), a = g(a, c, e, b, d[3], 22, -1044525330), b = g(b, a, c, e, d[4], 7, -176418897), e = g(e, b, a, c, d[5], 12, 1200080426), c = g(c, e, b, a, d[6], 17, -1473231341), a = g(a, c, e, b, d[7], 22, -45705983), b = g(b, a, c, e, d[8], 7, 1770035416), e = g(e, b, a, c, d[9], 12, -1958414417), c = g(c, e, b, a, d[10], 17, -42063), a = g(a, c, e, b, d[11], 22, -1990404162), b = g(b, a, c, e, d[12], 7, 1804603682), e = g(e, b, a, c, d[13], 12, -40341101), c = g(c, e, b, a, d[14], 17, -1502002290), a = g(a, c, e, b, d[15], 22, 1236535329), b = i(b, a, c, e, d[1], 5, -165796510), e = i(e, b, a, c, d[6], 9, -1069501632), c = i(c, e, b, a, d[11], 14, 643717713), a = i(a, c, e, b, d[0], 20, -373897302), b = i(b, a, c, e, d[5], 5, -701558691), e = i(e, b, a, c, d[10], 9, 38016083), c = i(c, e, b, a, d[15], 14, -660478335), a = i(a, c, e, b, d[4], 20, -405537848), b = i(b, a, c, e, d[9], 5, 568446438), e = i(e, b, a, c, d[14], 9, -1019803690), c = i(c, e, b, a, d[3], 14, -187363961), a = i(a, c, e, b, d[8], 20, 1163531501), b = i(b, a, c, e, d[13], 5, -1444681467), e = i(e, b, a, c, d[2], 9, -51403784), c = i(c, e, b, a, d[7], 14, 1735328473), a = i(a, c, e, b, d[12], 20, -1926607734), b = h(a ^ c ^ e, b, a, d[5], 4, -378558), e = h(b ^ a ^ c, e, b, d[8], 11, -2022574463), c = h(e ^ b ^ a, c, e, d[11], 16, 1839030562), a = h(c ^ e ^ b, a, c, d[14], 23, -35309556), b = h(a ^ c ^ e, b, a, d[1], 4, -1530992060), e = h(b ^ a ^ c, e, b, d[4], 11, 1272893353), c = h(e ^ b ^ a, c, e, d[7], 16, -155497632), a = h(c ^ e ^ b, a, c, d[10], 23, -1094730640), b = h(a ^ c ^ e, b, a, d[13], 4, 681279174), e = h(b ^ a ^ c, e, b, d[0], 11, -358537222), c = h(e ^ b ^ a, c, e, d[3], 16, -722521979), a = h(c ^ e ^ b, a, c, d[6], 23, 76029189), b = h(a ^ c ^ e, b, a, d[9], 4, -640364487), e = h(b ^ a ^ c, e, b, d[12], 11, -421815835), c = h(e ^ b ^ a, c, e, d[15], 16, 530742520), a = h(c ^ e ^ b, a, c, d[2], 23, -995338651), b = j(b, a, c, e, d[0], 6, -198630844), e = j(e, b, a, c, d[7], 10, 1126891415), c = j(c, e, b, a, d[14], 15, -1416354905), a = j(a, c, e, b, d[5], 21, -57434055), b = j(b, a, c, e, d[12], 6, 1700485571), e = j(e, b, a, c, d[3], 10, -1894986606), c = j(c, e, b, a, d[10], 15, -1051523), a = j(a, c, e, b, d[1], 21, -2054922799), b = j(b, a, c, e, d[8], 6, 1873313359), e = j(e, b, a, c, d[15], 10, -30611744), c = j(c, e, b, a, d[6], 15, -1560198380), a = j(a, c, e, b, d[13], 21, 1309151649), b = j(b, a, c, e, d[4], 6, -145523070), e = j(e, b, a, c, d[11], 10, -1120210379), c = j(c, e, b, a, d[2], 15, 718787259), a = j(a, c, e, b, d[9], 21, -343485551);
        f[0] = k(b, f[0]);
        f[1] = k(a, f[1]);
        f[2] = k(c, f[2]);
        f[3] = k(e, f[3]);
    }
    function n(f) {
        var d = [], b;
        for (b = 0; 64 > b; b += 4) d[b >> 2] = f.charCodeAt(b) + (f.charCodeAt(b + 1) << 8) + (f.charCodeAt(b + 2) << 16) + (f.charCodeAt(b + 3) << 24);
        return d;
    }
    function o(f) {
        var d = f.length, b = [ 1732584193, -271733879, -1732584194, 271733878 ], a, c, e;
        for (a = 64; a <= d; a += 64) l(b, n(f.substring(a - 64, a)));
        f = f.substring(a - 64);
        c = f.length;
        e = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        for (a = 0; a < c; a += 1) e[a >> 2] |= f.charCodeAt(a) << (a % 4 << 3);
        e[a >> 2] |= 128 << (a % 4 << 3);
        if (55 < a) {
            l(b, e);
            for (a = 0; 16 > a; a += 1) e[a] = 0;
        }
        e[14] = 8 * d;
        l(b, e);
        return b;
    }
    function m(f) {
        var d;
        for (d = 0; d < f.length; d += 1) {
            for (var b = f, a = d, c = f[d], e = "", g = void 0, g = 0; 4 > g; g += 1) e += q[c >> 8 * g + 4 & 15] + q[c >> 8 * g & 15];
            b[a] = e;
        }
        return f.join("");
    }
    var k = function(f, d) {
        return f + d & 4294967295;
    }, q = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f".split(",");
    "5d41402abc4b2a76b9719d911017c592" !== m(o("hello")) && (k = function(f, d) {
        var b = (f & 65535) + (d & 65535);
        return (f >> 16) + (d >> 16) + (b >> 16) << 16 | b & 65535;
    });
    var p = function() {
        this.append = function(f) {
            /[\u0080-\uFFFF]/.test(f) && (f = unescape(encodeURIComponent(f)));
            this.appendBinary(f);
            return this;
        };
        this.appendBinary = function(f) {
            var d = 64 - this._buff.length, b = this._buff + f.substr(0, d), a;
            this._length += f.length;
            if (64 <= b.length) {
                l(this._state, n(b));
                for (a = f.length - 64; d <= a; ) b = f.substr(d, 64), l(this._state, n(b)), d += 64;
                this._buff = f.substr(d, 64);
            } else this._buff = b;
            return this;
        };
        this.end = function(f) {
            var d = this._buff, b = d.length, a = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], c;
            for (c = 0; c < b; c += 1) a[c >> 2] |= d.charCodeAt(c) << (c % 4 << 3);
            a[c >> 2] |= 128 << (c % 4 << 3);
            if (55 < c) {
                l(this._state, a);
                for (c = 0; 16 > c; c += 1) a[c] = 0;
            }
            a[14] = 8 * this._length;
            l(this._state, a);
            f = f ? this._state : m(this._state);
            this.reset();
            return f;
        };
        this.reset = function() {
            this._buff = "";
            this._length = 0;
            this._state = [ 1732584193, -271733879, -1732584194, 271733878 ];
            return this;
        };
        this.destroy = function() {
            delete this._state;
            delete this._buff;
            delete this._length;
        };
        this.reset();
    };
    p.hash = function(f, d) {
        /[\u0080-\uFFFF]/.test(f) && (f = unescape(encodeURIComponent(f)));
        var b = o(f);
        return d ? b : m(b);
    };
    p.hashBinary = function(f, d) {
        var b = o(f);
        return d ? b : m(b);
    };
    return p;
}();

"use strict";

var idbModules = {};

(function(e) {
    function t(e, t, n, o) {
        n.target = t, "function" == typeof t[e] && t[e].apply(t, [ n ]), "function" == typeof o && o();
    }
    function n(t, n, o) {
        var i = new DOMException.constructor(0, n);
        throw i.name = t, i.message = n, e.DEBUG && (console.log(t, n, o, i), console.trace && console.trace()), i;
    }
    var o = function() {
        this.length = 0, this._items = [], Object.defineProperty && Object.defineProperty(this, "_items", {
            enumerable: !1
        });
    };
    if (o.prototype = {
        contains: function(e) {
            return -1 !== this._items.indexOf(e);
        },
        item: function(e) {
            return this._items[e];
        },
        indexOf: function(e) {
            return this._items.indexOf(e);
        },
        push: function(e) {
            this._items.push(e), this.length += 1;
            for (var t = 0; this._items.length > t; t++) this[t] = this._items[t];
        },
        splice: function() {
            this._items.splice.apply(this._items, arguments), this.length = this._items.length;
            for (var e in this) e === parseInt(e, 10) + "" && delete this[e];
            for (e = 0; this._items.length > e; e++) this[e] = this._items[e];
        }
    }, Object.defineProperty) for (var i in {
        indexOf: !1,
        push: !1,
        splice: !1
    }) Object.defineProperty(o.prototype, i, {
        enumerable: !1
    });
    e.util = {
        throwDOMException: n,
        callback: t,
        quote: function(e) {
            return "'" + e + "'";
        },
        StringList: o
    };
})(idbModules), function(idbModules) {
    var Sca = function() {
        return {
            decycle: function(object, callback) {
                function checkForCompletion() {
                    0 === queuedObjects.length && returnCallback(derezObj);
                }
                function readBlobAsDataURL(e, t) {
                    var n = new FileReader;
                    n.onloadend = function(e) {
                        var n = e.target.result, o = "blob";
                        updateEncodedBlob(n, t, o);
                    }, n.readAsDataURL(e);
                }
                function updateEncodedBlob(dataURL, path, blobtype) {
                    var encoded = queuedObjects.indexOf(path);
                    path = path.replace("$", "derezObj"), eval(path + '.$enc="' + dataURL + '"'), eval(path + '.$type="' + blobtype + '"'), queuedObjects.splice(encoded, 1), checkForCompletion();
                }
                function derez(e, t) {
                    var n, o, i;
                    if (!("object" != typeof e || null === e || e instanceof Boolean || e instanceof Date || e instanceof Number || e instanceof RegExp || e instanceof Blob || e instanceof String)) {
                        for (n = 0; objects.length > n; n += 1) if (objects[n] === e) return {
                            $ref: paths[n]
                        };
                        if (objects.push(e), paths.push(t), "[object Array]" === Object.prototype.toString.apply(e)) for (i = [], n = 0; e.length > n; n += 1) i[n] = derez(e[n], t + "[" + n + "]"); else {
                            i = {};
                            for (o in e) Object.prototype.hasOwnProperty.call(e, o) && (i[o] = derez(e[o], t + "[" + JSON.stringify(o) + "]"));
                        }
                        return i;
                    }
                    return e instanceof Blob ? (queuedObjects.push(t), readBlobAsDataURL(e, t)) : e instanceof Boolean ? e = {
                        $type: "bool",
                        $enc: "" + e
                    } : e instanceof Date ? e = {
                        $type: "date",
                        $enc: e.getTime()
                    } : e instanceof Number ? e = {
                        $type: "num",
                        $enc: "" + e
                    } : e instanceof RegExp && (e = {
                        $type: "regex",
                        $enc: "" + e
                    }), e;
                }
                var objects = [], paths = [], queuedObjects = [], returnCallback = callback, derezObj = derez(object, "$");
                checkForCompletion();
            },
            retrocycle: function retrocycle($) {
                function dataURLToBlob(e) {
                    var t, n, o, i = ";base64,";
                    if (-1 === e.indexOf(i)) return n = e.split(","), t = n[0].split(":")[1], o = n[1], new Blob([ o ], {
                        type: t
                    });
                    n = e.split(i), t = n[0].split(":")[1], o = window.atob(n[1]);
                    for (var r = o.length, a = new Uint8Array(r), s = 0; r > s; ++s) a[s] = o.charCodeAt(s);
                    return new Blob([ a.buffer ], {
                        type: t
                    });
                }
                function rez(value) {
                    var i, item, name, path;
                    if (value && "object" == typeof value) if ("[object Array]" === Object.prototype.toString.apply(value)) for (i = 0; value.length > i; i += 1) item = value[i], item && "object" == typeof item && (path = item.$ref, value[i] = "string" == typeof path && px.test(path) ? eval(path) : rez(item)); else if (void 0 !== value.$type) switch (value.$type) {
                      case "blob":
                      case "file":
                        value = dataURLToBlob(value.$enc);
                        break;
                      case "bool":
                        value = Boolean("true" === value.$enc);
                        break;
                      case "date":
                        value = new Date(value.$enc);
                        break;
                      case "num":
                        value = Number(value.$enc);
                        break;
                      case "regex":
                        value = eval(value.$enc);
                    } else for (name in value) "object" == typeof value[name] && (item = value[name], item && (path = item.$ref, value[name] = "string" == typeof path && px.test(path) ? eval(path) : rez(item)));
                    return value;
                }
                var px = /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;
                return rez($), $;
            },
            encode: function(e, t) {
                function n(e) {
                    t(JSON.stringify(e));
                }
                this.decycle(e, n);
            },
            decode: function(e) {
                return this.retrocycle(JSON.parse(e));
            }
        };
    }();
    idbModules.Sca = Sca;
}(idbModules), function(e) {
    var t = [ "", "number", "string", "boolean", "object", "undefined" ], n = function() {
        return {
            encode: function(e) {
                return t.indexOf(typeof e) + "-" + JSON.stringify(e);
            },
            decode: function(e) {
                return e === void 0 ? void 0 : JSON.parse(e.substring(2));
            }
        };
    }, o = {
        number: n("number"),
        "boolean": n(),
        object: n(),
        string: {
            encode: function(e) {
                return t.indexOf("string") + "-" + e;
            },
            decode: function(e) {
                return "" + e.substring(2);
            }
        },
        "undefined": {
            encode: function() {
                return t.indexOf("undefined") + "-undefined";
            },
            decode: function() {
                return void 0;
            }
        }
    }, i = function() {
        return {
            encode: function(e) {
                return o[typeof e].encode(e);
            },
            decode: function(e) {
                return o[t[e.substring(0, 1)]].decode(e);
            }
        };
    }();
    e.Key = i;
}(idbModules), function(e) {
    var t = function(e, t) {
        return {
            type: e,
            debug: t,
            bubbles: !1,
            cancelable: !1,
            eventPhase: 0,
            timeStamp: new Date
        };
    };
    e.Event = t;
}(idbModules), function(e) {
    var t = function() {
        this.onsuccess = this.onerror = this.result = this.error = this.source = this.transaction = null, this.readyState = "pending";
    }, n = function() {
        this.onblocked = this.onupgradeneeded = null;
    };
    n.prototype = t, e.IDBRequest = t, e.IDBOpenRequest = n;
}(idbModules), function(e, t) {
    var n = function(e, t, n, o) {
        this.lower = e, this.upper = t, this.lowerOpen = n, this.upperOpen = o;
    };
    n.only = function(e) {
        return new n(e, e, !0, !0);
    }, n.lowerBound = function(e, o) {
        return new n(e, t, o, t);
    }, n.upperBound = function(e) {
        return new n(t, e, t, open);
    }, n.bound = function(e, t, o, i) {
        return new n(e, t, o, i);
    }, e.IDBKeyRange = n;
}(idbModules), function(e, t) {
    function n(n, o, i, r, a, s) {
        this.__range = n, this.source = this.__idbObjectStore = i, this.__req = r, this.key = t, this.direction = o, this.__keyColumnName = a, this.__valueColumnName = s, this.source.transaction.__active || e.util.throwDOMException("TransactionInactiveError - The transaction this IDBObjectStore belongs to is not active."), this.__offset = -1, this.__lastKeyContinued = t, this["continue"]();
    }
    n.prototype.__find = function(n, o, i, r) {
        var a = this, s = [ "SELECT * FROM ", e.util.quote(a.__idbObjectStore.name) ], u = [];
        s.push("WHERE ", a.__keyColumnName, " NOT NULL"), a.__range && (a.__range.lower || a.__range.upper) && (s.push("AND"), a.__range.lower && (s.push(a.__keyColumnName + (a.__range.lowerOpen ? " >" : " >= ") + " ?"), u.push(e.Key.encode(a.__range.lower))), a.__range.lower && a.__range.upper && s.push("AND"), a.__range.upper && (s.push(a.__keyColumnName + (a.__range.upperOpen ? " < " : " <= ") + " ?"), u.push(e.Key.encode(a.__range.upper)))), n !== t && (a.__lastKeyContinued = n, a.__offset = 0), a.__lastKeyContinued !== t && (s.push("AND " + a.__keyColumnName + " >= ?"), u.push(e.Key.encode(a.__lastKeyContinued))), s.push("ORDER BY ", a.__keyColumnName), s.push("LIMIT 1 OFFSET " + a.__offset), e.DEBUG && console.log(s.join(" "), u), o.executeSql(s.join(" "), u, function(n, o) {
            if (1 === o.rows.length) {
                var r = e.Key.decode(o.rows.item(0)[a.__keyColumnName]), s = "value" === a.__valueColumnName ? e.Sca.decode(o.rows.item(0)[a.__valueColumnName]) : e.Key.decode(o.rows.item(0)[a.__valueColumnName]);
                i(r, s);
            } else e.DEBUG && console.log("Reached end of cursors"), i(t, t);
        }, function(t, n) {
            e.DEBUG && console.log("Could not execute Cursor.continue"), r(n);
        });
    }, n.prototype["continue"] = function(e) {
        var n = this;
        this.__idbObjectStore.transaction.__addToTransactionQueue(function(o, i, r, a) {
            n.__offset++, n.__find(e, o, function(e, o) {
                n.key = e, n.value = o, r(n.key !== t ? n : t, n.__req);
            }, function(e) {
                a(e);
            });
        });
    }, n.prototype.advance = function(n) {
        0 >= n && e.util.throwDOMException("Type Error - Count is invalid - 0 or negative", n);
        var o = this;
        this.__idbObjectStore.transaction.__addToTransactionQueue(function(e, i, r, a) {
            o.__offset += n, o.__find(t, e, function(e, n) {
                o.key = e, o.value = n, r(o.key !== t ? o : t, o.__req);
            }, function(e) {
                a(e);
            });
        });
    }, n.prototype.update = function(n) {
        var o = this, i = this.__idbObjectStore.transaction.__createRequest(function() {});
        return e.Sca.encode(n, function(n) {
            this.__idbObjectStore.__pushToQueue(i, function(i, r, a, s) {
                o.__find(t, i, function(t) {
                    var r = "UPDATE " + e.util.quote(o.__idbObjectStore.name) + " SET value = ? WHERE key = ?";
                    e.DEBUG && console.log(r, n, t), i.executeSql(r, [ e.Sca.encode(n), e.Key.encode(t) ], function(e, n) {
                        1 === n.rowsAffected ? a(t) : s("No rowns with key found" + t);
                    }, function(e, t) {
                        s(t);
                    });
                }, function(e) {
                    s(e);
                });
            });
        }), i;
    }, n.prototype["delete"] = function() {
        var n = this;
        return this.__idbObjectStore.transaction.__addToTransactionQueue(function(o, i, r, a) {
            n.__find(t, o, function(i) {
                var s = "DELETE FROM  " + e.util.quote(n.__idbObjectStore.name) + " WHERE key = ?";
                e.DEBUG && console.log(s, i), o.executeSql(s, [ e.Key.encode(i) ], function(e, n) {
                    1 === n.rowsAffected ? r(t) : a("No rowns with key found" + i);
                }, function(e, t) {
                    a(t);
                });
            }, function(e) {
                a(e);
            });
        });
    }, e.IDBCursor = n;
}(idbModules), function(idbModules, undefined) {
    function IDBIndex(e, t) {
        this.indexName = this.name = e, this.__idbObjectStore = this.objectStore = this.source = t;
        var n = t.__storeProps && t.__storeProps.indexList;
        n && (n = JSON.parse(n)), this.keyPath = n && n[e] && n[e].keyPath || e, [ "multiEntry", "unique" ].forEach(function(t) {
            this[t] = !!(n && n[e] && n[e].optionalParams && n[e].optionalParams[t]);
        }, this);
    }
    IDBIndex.prototype.__createIndex = function(indexName, keyPath, optionalParameters) {
        var me = this, transaction = me.__idbObjectStore.transaction;
        transaction.__addToTransactionQueue(function(tx, args, success, failure) {
            me.__idbObjectStore.__getStoreProps(tx, function() {
                function error() {
                    idbModules.util.throwDOMException(0, "Could not create new index", arguments);
                }
                2 !== transaction.mode && idbModules.util.throwDOMException(0, "Invalid State error, not a version transaction", me.transaction);
                var idxList = JSON.parse(me.__idbObjectStore.__storeProps.indexList);
                idxList[indexName] !== undefined && idbModules.util.throwDOMException(0, "Index already exists on store", idxList);
                var columnName = indexName;
                idxList[indexName] = {
                    columnName: columnName,
                    keyPath: keyPath,
                    optionalParams: optionalParameters
                }, me.__idbObjectStore.__storeProps.indexList = JSON.stringify(idxList);
                var sql = [ "ALTER TABLE", idbModules.util.quote(me.__idbObjectStore.name), "ADD", columnName, "BLOB" ].join(" ");
                idbModules.DEBUG && console.log(sql), tx.executeSql(sql, [], function(tx, data) {
                    tx.executeSql("SELECT * FROM " + idbModules.util.quote(me.__idbObjectStore.name), [], function(tx, data) {
                        (function initIndexForRow(i) {
                            if (data.rows.length > i) try {
                                var value = idbModules.Sca.decode(data.rows.item(i).value), indexKey = eval("value['" + keyPath + "']");
                                tx.executeSql("UPDATE " + idbModules.util.quote(me.__idbObjectStore.name) + " set " + columnName + " = ? where key = ?", [ idbModules.Key.encode(indexKey), data.rows.item(i).key ], function() {
                                    initIndexForRow(i + 1);
                                }, error);
                            } catch (e) {
                                initIndexForRow(i + 1);
                            } else idbModules.DEBUG && console.log("Updating the indexes in table", me.__idbObjectStore.__storeProps), tx.executeSql("UPDATE __sys__ set indexList = ? where name = ?", [ me.__idbObjectStore.__storeProps.indexList, me.__idbObjectStore.name ], function() {
                                me.__idbObjectStore.__setReadyState("createIndex", !0), success(me);
                            }, error);
                        })(0);
                    }, error);
                }, error);
            }, "createObjectStore");
        });
    }, IDBIndex.prototype.openCursor = function(e, t) {
        var n = new idbModules.IDBRequest;
        return new idbModules.IDBCursor(e, t, this.source, n, this.indexName, "value"), n;
    }, IDBIndex.prototype.openKeyCursor = function(e, t) {
        var n = new idbModules.IDBRequest;
        return new idbModules.IDBCursor(e, t, this.source, n, this.indexName, "key"), n;
    }, IDBIndex.prototype.__fetchIndexData = function(e, t) {
        var n = this;
        return n.__idbObjectStore.transaction.__addToTransactionQueue(function(o, i, r, a) {
            var s = [ "SELECT * FROM ", idbModules.util.quote(n.__idbObjectStore.name), " WHERE", n.indexName, "NOT NULL" ], u = [];
            e !== undefined && (s.push("AND", n.indexName, " = ?"), u.push(idbModules.Key.encode(e))), idbModules.DEBUG && console.log("Trying to fetch data for Index", s.join(" "), u), o.executeSql(s.join(" "), u, function(e, n) {
                var o;
                o = "count" == typeof t ? n.rows.length : 0 === n.rows.length ? undefined : "key" === t ? idbModules.Key.decode(n.rows.item(0).key) : idbModules.Sca.decode(n.rows.item(0).value), r(o);
            }, a);
        });
    }, IDBIndex.prototype.get = function(e) {
        return this.__fetchIndexData(e, "value");
    }, IDBIndex.prototype.getKey = function(e) {
        return this.__fetchIndexData(e, "key");
    }, IDBIndex.prototype.count = function(e) {
        return this.__fetchIndexData(e, "count");
    }, idbModules.IDBIndex = IDBIndex;
}(idbModules), function(idbModules) {
    var IDBObjectStore = function(e, t, n) {
        this.name = e, this.transaction = t, this.__ready = {}, this.__setReadyState("createObjectStore", n === void 0 ? !0 : n), this.indexNames = new idbModules.util.StringList;
    };
    IDBObjectStore.prototype.__setReadyState = function(e, t) {
        this.__ready[e] = t;
    }, IDBObjectStore.prototype.__waitForReady = function(e, t) {
        var n = !0;
        if (t !== void 0) n = this.__ready[t] === void 0 ? !0 : this.__ready[t]; else for (var o in this.__ready) this.__ready[o] || (n = !1);
        if (n) e(); else {
            idbModules.DEBUG && console.log("Waiting for to be ready", t);
            var i = this;
            window.setTimeout(function() {
                i.__waitForReady(e, t);
            }, 100);
        }
    }, IDBObjectStore.prototype.__getStoreProps = function(e, t, n) {
        var o = this;
        this.__waitForReady(function() {
            o.__storeProps ? (idbModules.DEBUG && console.log("Store properties - cached", o.__storeProps), t(o.__storeProps)) : e.executeSql("SELECT * FROM __sys__ where name = ?", [ o.name ], function(e, n) {
                1 !== n.rows.length ? t() : (o.__storeProps = {
                    name: n.rows.item(0).name,
                    indexList: n.rows.item(0).indexList,
                    autoInc: n.rows.item(0).autoInc,
                    keyPath: n.rows.item(0).keyPath
                }, idbModules.DEBUG && console.log("Store properties", o.__storeProps), t(o.__storeProps));
            }, function() {
                t();
            });
        }, n);
    }, IDBObjectStore.prototype.__deriveKey = function(tx, value, key, callback) {
        function getNextAutoIncKey() {
            tx.executeSql("SELECT * FROM sqlite_sequence where name like ?", [ me.name ], function(e, t) {
                1 !== t.rows.length ? callback(0) : callback(t.rows.item(0).seq);
            }, function(e, t) {
                idbModules.util.throwDOMException(0, "Data Error - Could not get the auto increment value for key", t);
            });
        }
        var me = this;
        me.__getStoreProps(tx, function(props) {
            if (props || idbModules.util.throwDOMException(0, "Data Error - Could not locate defination for this table", props), props.keyPath) if (key !== void 0 && idbModules.util.throwDOMException(0, "Data Error - The object store uses in-line keys and the key parameter was provided", props), value) try {
                var primaryKey = eval("value['" + props.keyPath + "']");
                primaryKey ? callback(primaryKey) : "true" === props.autoInc ? getNextAutoIncKey() : idbModules.util.throwDOMException(0, "Data Error - Could not eval key from keyPath");
            } catch (e) {
                idbModules.util.throwDOMException(0, "Data Error - Could not eval key from keyPath", e);
            } else idbModules.util.throwDOMException(0, "Data Error - KeyPath was specified, but value was not"); else key !== void 0 ? callback(key) : "false" === props.autoInc ? idbModules.util.throwDOMException(0, "Data Error - The object store uses out-of-line keys and has no key generator and the key parameter was not provided. ", props) : getNextAutoIncKey();
        });
    }, IDBObjectStore.prototype.__insertData = function(tx, value, primaryKey, success, error) {
        var paramMap = {};
        primaryKey !== void 0 && (paramMap.key = idbModules.Key.encode(primaryKey));
        var indexes = JSON.parse(this.__storeProps.indexList);
        for (var key in indexes) try {
            paramMap[indexes[key].columnName] = idbModules.Key.encode(eval("value['" + indexes[key].keyPath + "']"));
        } catch (e) {
            error(e);
        }
        var sqlStart = [ "INSERT INTO ", idbModules.util.quote(this.name), "(" ], sqlEnd = [ " VALUES (" ], sqlValues = [];
        for (key in paramMap) sqlStart.push(key + ","), sqlEnd.push("?,"), sqlValues.push(paramMap[key]);
        sqlStart.push("value )"), sqlEnd.push("?)"), sqlValues.push(value);
        var sql = sqlStart.join(" ") + sqlEnd.join(" ");
        idbModules.DEBUG && console.log("SQL for adding", sql, sqlValues), tx.executeSql(sql, sqlValues, function() {
            success(primaryKey);
        }, function(e, t) {
            error(t);
        });
    }, IDBObjectStore.prototype.add = function(e, t) {
        var n = this, o = n.transaction.__createRequest(function() {});
        return idbModules.Sca.encode(e, function(i) {
            n.transaction.__pushToQueue(o, function(o, r, a, s) {
                n.__deriveKey(o, e, t, function(e) {
                    n.__insertData(o, i, e, a, s);
                });
            });
        }), o;
    }, IDBObjectStore.prototype.put = function(e, t) {
        var n = this, o = n.transaction.__createRequest(function() {});
        return idbModules.Sca.encode(e, function(i) {
            n.transaction.__pushToQueue(o, function(o, r, a, s) {
                n.__deriveKey(o, e, t, function(e) {
                    var t = "DELETE FROM " + idbModules.util.quote(n.name) + " where key = ?";
                    o.executeSql(t, [ idbModules.Key.encode(e) ], function(t, o) {
                        idbModules.DEBUG && console.log("Did the row with the", e, "exist? ", o.rowsAffected), n.__insertData(t, i, e, a, s);
                    }, function(e, t) {
                        s(t);
                    });
                });
            });
        }), o;
    }, IDBObjectStore.prototype.get = function(e) {
        var t = this;
        return t.transaction.__addToTransactionQueue(function(n, o, i, r) {
            t.__waitForReady(function() {
                var o = idbModules.Key.encode(e);
                idbModules.DEBUG && console.log("Fetching", t.name, o), n.executeSql("SELECT * FROM " + idbModules.util.quote(t.name) + " where key = ?", [ o ], function(e, t) {
                    idbModules.DEBUG && console.log("Fetched data", t);
                    try {
                        if (0 === t.rows.length) return i();
                        i(idbModules.Sca.decode(t.rows.item(0).value));
                    } catch (n) {
                        idbModules.DEBUG && console.log(n), i(void 0);
                    }
                }, function(e, t) {
                    r(t);
                });
            });
        });
    }, IDBObjectStore.prototype["delete"] = function(e) {
        var t = this;
        return t.transaction.__addToTransactionQueue(function(n, o, i, r) {
            t.__waitForReady(function() {
                var o = idbModules.Key.encode(e);
                idbModules.DEBUG && console.log("Fetching", t.name, o), n.executeSql("DELETE FROM " + idbModules.util.quote(t.name) + " where key = ?", [ o ], function(e, t) {
                    idbModules.DEBUG && console.log("Deleted from database", t.rowsAffected), i();
                }, function(e, t) {
                    r(t);
                });
            });
        });
    }, IDBObjectStore.prototype.clear = function() {
        var e = this;
        return e.transaction.__addToTransactionQueue(function(t, n, o, i) {
            e.__waitForReady(function() {
                t.executeSql("DELETE FROM " + idbModules.util.quote(e.name), [], function(e, t) {
                    idbModules.DEBUG && console.log("Cleared all records from database", t.rowsAffected), o();
                }, function(e, t) {
                    i(t);
                });
            });
        });
    }, IDBObjectStore.prototype.count = function(e) {
        var t = this;
        return t.transaction.__addToTransactionQueue(function(n, o, i, r) {
            t.__waitForReady(function() {
                var o = "SELECT * FROM " + idbModules.util.quote(t.name) + (e !== void 0 ? " WHERE key = ?" : ""), a = [];
                e !== void 0 && a.push(idbModules.Key.encode(e)), n.executeSql(o, a, function(e, t) {
                    i(t.rows.length);
                }, function(e, t) {
                    r(t);
                });
            });
        });
    }, IDBObjectStore.prototype.openCursor = function(e, t) {
        var n = new idbModules.IDBRequest;
        return new idbModules.IDBCursor(e, t, this, n, "key", "value"), n;
    }, IDBObjectStore.prototype.index = function(e) {
        var t = new idbModules.IDBIndex(e, this);
        return t;
    }, IDBObjectStore.prototype.createIndex = function(e, t, n) {
        var o = this;
        n = n || {}, o.__setReadyState("createIndex", !1);
        var i = new idbModules.IDBIndex(e, o);
        return o.__waitForReady(function() {
            i.__createIndex(e, t, n);
        }, "createObjectStore"), o.indexNames.push(e), i;
    }, IDBObjectStore.prototype.deleteIndex = function(e) {
        var t = new idbModules.IDBIndex(e, this, !1);
        return t.__deleteIndex(e), t;
    }, idbModules.IDBObjectStore = IDBObjectStore;
}(idbModules), function(e) {
    var t = 0, n = 1, o = 2, i = function(o, i, r) {
        if ("number" == typeof i) this.mode = i, 2 !== i && e.DEBUG && console.log("Mode should be a string, but was specified as ", i); else if ("string" == typeof i) switch (i) {
          case "readwrite":
            this.mode = n;
            break;
          case "readonly":
            this.mode = t;
            break;
          default:
            this.mode = t;
        }
        this.storeNames = "string" == typeof o ? [ o ] : o;
        for (var a = 0; this.storeNames.length > a; a++) r.objectStoreNames.contains(this.storeNames[a]) || e.util.throwDOMException(0, "The operation failed because the requested database object could not be found. For example, an object store did not exist but was being opened.", this.storeNames[a]);
        this.__active = !0, this.__running = !1, this.__requests = [], this.__aborted = !1, this.db = r, this.error = null, this.onabort = this.onerror = this.oncomplete = null;
    };
    i.prototype.__executeRequests = function() {
        if (this.__running && this.mode !== o) return e.DEBUG && console.log("Looks like the request set is already running", this.mode), void 0;
        this.__running = !0;
        var t = this;
        window.setTimeout(function() {
            2 === t.mode || t.__active || e.util.throwDOMException(0, "A request was placed against a transaction which is currently not active, or which is finished", t.__active), t.db.__db.transaction(function(n) {
                function o(t, n) {
                    n && (a.req = n), a.req.readyState = "done", a.req.result = t, delete a.req.error;
                    var o = e.Event("success");
                    e.util.callback("onsuccess", a.req, o), s++, r();
                }
                function i() {
                    a.req.readyState = "done", a.req.error = "DOMError";
                    var t = e.Event("error", arguments);
                    e.util.callback("onerror", a.req, t), s++, r();
                }
                function r() {
                    return s >= t.__requests.length ? (t.__active = !1, t.__requests = [], void 0) : (a = t.__requests[s], a.op(n, a.args, o, i), void 0);
                }
                t.__tx = n;
                var a = null, s = 0;
                try {
                    r();
                } catch (u) {
                    e.DEBUG && console.log("An exception occured in transaction", arguments), "function" == typeof t.onerror && t.onerror();
                }
            }, function() {
                e.DEBUG && console.log("An error in transaction", arguments), "function" == typeof t.onerror && t.onerror();
            }, function() {
                e.DEBUG && console.log("Transaction completed", arguments), "function" == typeof t.oncomplete && t.oncomplete();
            });
        }, 1);
    }, i.prototype.__addToTransactionQueue = function(t, n) {
        this.__active || this.mode === o || e.util.throwDOMException(0, "A request was placed against a transaction which is currently not active, or which is finished.", this.__mode);
        var i = this.__createRequest();
        return this.__pushToQueue(i, t, n), i;
    }, i.prototype.__createRequest = function() {
        var t = new e.IDBRequest;
        return t.source = this.db, t;
    }, i.prototype.__pushToQueue = function(e, t, n) {
        this.__requests.push({
            op: t,
            args: n,
            req: e
        }), this.__executeRequests();
    }, i.prototype.objectStore = function(t) {
        return new e.IDBObjectStore(t, this);
    }, i.prototype.abort = function() {
        !this.__active && e.util.throwDOMException(0, "A request was placed against a transaction which is currently not active, or which is finished", this.__active);
    }, i.prototype.READ_ONLY = 0, i.prototype.READ_WRITE = 1, i.prototype.VERSION_CHANGE = 2, e.IDBTransaction = i;
}(idbModules), function(e) {
    var t = function(t, n, o, i) {
        this.__db = t, this.version = o, this.__storeProperties = i, this.objectStoreNames = new e.util.StringList;
        for (var r = 0; i.rows.length > r; r++) this.objectStoreNames.push(i.rows.item(r).name);
        this.name = n, this.onabort = this.onerror = this.onversionchange = null;
    };
    t.prototype.createObjectStore = function(t, n) {
        var o = this;
        n = n || {}, n.keyPath = n.keyPath || null;
        var i = new e.IDBObjectStore(t, o.__versionTransaction, !1), r = o.__versionTransaction;
        return r.__addToTransactionQueue(function(r, a, s) {
            function u() {
                e.util.throwDOMException(0, "Could not create new object store", arguments);
            }
            o.__versionTransaction || e.util.throwDOMException(0, "Invalid State error", o.transaction);
            var c = [ "CREATE TABLE", e.util.quote(t), "(key BLOB", n.autoIncrement ? ", inc INTEGER PRIMARY KEY AUTOINCREMENT" : "PRIMARY KEY", ", value BLOB)" ].join(" ");
            e.DEBUG && console.log(c), r.executeSql(c, [], function(e) {
                e.executeSql("INSERT INTO __sys__ VALUES (?,?,?,?)", [ t, n.keyPath, n.autoIncrement ? !0 : !1, "{}" ], function() {
                    i.__setReadyState("createObjectStore", !0), s(i);
                }, u);
            }, u);
        }), o.objectStoreNames.push(t), i;
    }, t.prototype.deleteObjectStore = function(t) {
        var n = function() {
            e.util.throwDOMException(0, "Could not delete ObjectStore", arguments);
        }, o = this;
        !o.objectStoreNames.contains(t) && n("Object Store does not exist"), o.objectStoreNames.splice(o.objectStoreNames.indexOf(t), 1);
        var i = o.__versionTransaction;
        i.__addToTransactionQueue(function() {
            o.__versionTransaction || e.util.throwDOMException(0, "Invalid State error", o.transaction), o.__db.transaction(function(o) {
                o.executeSql("SELECT * FROM __sys__ where name = ?", [ t ], function(o, i) {
                    i.rows.length > 0 && o.executeSql("DROP TABLE " + e.util.quote(t), [], function() {
                        o.executeSql("DELETE FROM __sys__ WHERE name = ?", [ t ], function() {}, n);
                    }, n);
                });
            });
        });
    }, t.prototype.close = function() {}, t.prototype.transaction = function(t, n) {
        var o = new e.IDBTransaction(t, n || 1, this);
        return o;
    }, e.IDBDatabase = t;
}(idbModules), function(e) {
    var t = 4194304;
    if (window.openDatabase) {
        var n = window.openDatabase("__sysdb__", 1, "System Database", t);
        n.transaction(function(t) {
            t.executeSql("SELECT * FROM dbVersions", [], function() {}, function() {
                n.transaction(function(t) {
                    t.executeSql("CREATE TABLE IF NOT EXISTS dbVersions (name VARCHAR(255), version INT);", [], function() {}, function() {
                        e.util.throwDOMException("Could not create table __sysdb__ to save DB versions");
                    });
                });
            });
        }, function() {
            e.DEBUG && console.log("Error in sysdb transaction - when selecting from dbVersions", arguments);
        });
        var o = {
            open: function(o, i) {
                function r() {
                    if (!u) {
                        var t = e.Event("error", arguments);
                        s.readyState = "done", s.error = "DOMError", e.util.callback("onerror", s, t), u = !0;
                    }
                }
                function a(a) {
                    var u = window.openDatabase(o, 1, o, t);
                    s.readyState = "done", i === void 0 && (i = a || 1), (0 >= i || a > i) && e.util.throwDOMException(0, "An attempt was made to open a database using a lower version than the existing version.", i), u.transaction(function(t) {
                        t.executeSql("CREATE TABLE IF NOT EXISTS __sys__ (name VARCHAR(255), keyPath VARCHAR(255), autoInc BOOLEAN, indexList BLOB)", [], function() {
                            t.executeSql("SELECT * FROM __sys__", [], function(t, c) {
                                var d = e.Event("success");
                                s.source = s.result = new e.IDBDatabase(u, o, i, c), i > a ? n.transaction(function(t) {
                                    t.executeSql("UPDATE dbVersions set version = ? where name = ?", [ i, o ], function() {
                                        var t = e.Event("upgradeneeded");
                                        t.oldVersion = a, t.newVersion = i, s.transaction = s.result.__versionTransaction = new e.IDBTransaction([], 2, s.source), e.util.callback("onupgradeneeded", s, t, function() {
                                            var t = e.Event("success");
                                            e.util.callback("onsuccess", s, t);
                                        });
                                    }, r);
                                }, r) : e.util.callback("onsuccess", s, d);
                            }, r);
                        }, r);
                    }, r);
                }
                var s = new e.IDBOpenRequest, u = !1;
                return n.transaction(function(e) {
                    e.executeSql("SELECT * FROM dbVersions where name = ?", [ o ], function(e, t) {
                        0 === t.rows.length ? e.executeSql("INSERT INTO dbVersions VALUES (?,?)", [ o, i || 1 ], function() {
                            a(0);
                        }, r) : a(t.rows.item(0).version);
                    }, r);
                }, r), s;
            },
            deleteDatabase: function(o) {
                function i(t) {
                    if (!s) {
                        a.readyState = "done", a.error = "DOMError";
                        var n = e.Event("error");
                        n.message = t, n.debug = arguments, e.util.callback("onerror", a, n), s = !0;
                    }
                }
                function r() {
                    n.transaction(function(t) {
                        t.executeSql("DELETE FROM dbVersions where name = ? ", [ o ], function() {
                            a.result = void 0;
                            var t = e.Event("success");
                            t.newVersion = null, t.oldVersion = u, e.util.callback("onsuccess", a, t);
                        }, i);
                    }, i);
                }
                var a = new e.IDBOpenRequest, s = !1, u = null;
                return n.transaction(function(n) {
                    n.executeSql("SELECT * FROM dbVersions where name = ?", [ o ], function(n, s) {
                        if (0 === s.rows.length) {
                            a.result = void 0;
                            var c = e.Event("success");
                            return c.newVersion = null, c.oldVersion = u, e.util.callback("onsuccess", a, c), void 0;
                        }
                        u = s.rows.item(0).version;
                        var d = window.openDatabase(o, 1, o, t);
                        d.transaction(function(t) {
                            t.executeSql("SELECT * FROM __sys__", [], function(t, n) {
                                var o = n.rows;
                                (function a(n) {
                                    n >= o.length ? t.executeSql("DROP TABLE __sys__", [], function() {
                                        r();
                                    }, i) : t.executeSql("DROP TABLE " + e.util.quote(o.item(n).name), [], function() {
                                        a(n + 1);
                                    }, function() {
                                        a(n + 1);
                                    });
                                })(0);
                            }, function() {
                                r();
                            });
                        }, i);
                    });
                }, i), a;
            },
            cmp: function(t, n) {
                return e.Key.encode(t) > e.Key.encode(n) ? 1 : t === n ? 0 : -1;
            }
        };
        e.shimIndexedDB = o;
    }
}(idbModules), function(e, t) {
    e.openDatabase !== void 0 && (e.shimIndexedDB = t.shimIndexedDB, e.shimIndexedDB && (e.shimIndexedDB.__useShim = function() {
        e.indexedDB = t.shimIndexedDB, e.IDBDatabase = t.IDBDatabase, e.IDBTransaction = t.IDBTransaction, e.IDBCursor = t.IDBCursor, e.IDBKeyRange = t.IDBKeyRange;
    }, e.shimIndexedDB.__debug = function(e) {
        t.DEBUG = e;
    })), e.indexedDB = e.indexedDB || e.webkitIndexedDB || e.mozIndexedDB || e.oIndexedDB || e.msIndexedDB, e.indexedDB === void 0 && e.openDatabase !== void 0 ? e.shimIndexedDB.__useShim() : (e.IDBDatabase = e.IDBDatabase || e.webkitIDBDatabase, e.IDBTransaction = e.IDBTransaction || e.webkitIDBTransaction, e.IDBCursor = e.IDBCursor || e.webkitIDBCursor, e.IDBKeyRange = e.IDBKeyRange || e.webkitIDBKeyRange, e.IDBTransaction || (e.IDBTransaction = {}), e.IDBTransaction.READ_ONLY = e.IDBTransaction.READ_ONLY || "readonly", e.IDBTransaction.READ_WRITE = e.IDBTransaction.READ_WRITE || "readwrite");
}(window, idbModules);

var J = jQuery.noConflict();

var Zotero = {
    ajax: {},
    callbacks: {},
    ui: {
        callbacks: {},
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
    },
    url: {},
    utils: {},
    offline: {},
    temp: {},
    localizations: {},
    config: {
        librarySettings: {},
        baseApiUrl: "https://api.zotero.org",
        baseWebsiteUrl: "https://zotero.org",
        baseFeedUrl: "https://api.zotero.org",
        baseZoteroWebsiteUrl: "https://www.zotero.org",
        baseDownloadUrl: "https://www.zotero.org",
        directDownloads: true,
        proxyPath: "/proxyrequest",
        ignoreLoggedInStatus: false,
        storePrefsRemote: true,
        preferUrlItem: true,
        sessionAuth: false,
        proxy: true,
        apiKey: "",
        ajax: 1,
        apiVersion: 2,
        eventful: false,
        jqueryui: true,
        locale: "en-US",
        cacheStoreType: "localStorage",
        preloadCachedLibrary: true,
        mobile: 0,
        sortOrdering: {
            dateAdded: "desc",
            dateModified: "desc",
            date: "desc",
            year: "desc",
            accessDate: "desc",
            title: "asc",
            creator: "asc"
        },
        defaultSortColumn: "title",
        defaultSortOrder: "asc",
        largeFields: {
            title: 1,
            abstractNote: 1,
            extra: 1
        },
        richTextFields: {
            note: 1
        },
        maxFieldSummaryLength: {
            title: 60
        },
        exportFormats: [ "bibtex", "bookmarks", "mods", "refer", "rdf_bibliontology", "rdf_dc", "rdf_zotero", "ris", "wikipedia" ],
        exportFormatsMap: {
            bibtex: "BibTeX",
            bookmarks: "Bookmarks",
            mods: "MODS",
            refer: "Refer/BibIX",
            rdf_bibliontology: "Bibliontology RDF",
            rdf_dc: "Unqualified Dublin Core RDF",
            rdf_zotero: "Zotero RDF",
            ris: "RIS",
            wikipedia: "Wikipedia Citation Templates"
        },
        defaultApiArgs: {
            order: "title",
            sort: "asc",
            limit: 50,
            start: 0,
            content: "json",
            format: "atom"
        }
    },
    debug: function(debugstring, level) {
        if (typeof console == "undefined") {
            return;
        }
        if (typeof level !== "number") {
            level = 1;
        }
        if (Zotero.preferences === undefined) {
            console.log(debugstring);
            return;
        }
        if (Zotero.preferences.getPref("debug_log") && level <= Zotero.preferences.getPref("debug_level")) {
            console.log(debugstring);
        }
    },
    warn: function(warnstring) {
        if (typeof console == "undefined" || typeof console.warn == "undefined") {
            this.debug(warnstring);
        } else {
            console.warn(warnstring);
        }
    },
    error: function(errorstring) {
        if (typeof console == "undefined" || typeof console.error == "undefined") {
            this.debug(errorstring);
        } else {
            console.error(errorstring);
        }
    },
    feeds: {},
    cacheFeeds: {},
    state: {},
    libraries: {},
    validator: {
        patterns: {
            itemKey: /^.+$/,
            collectionKey: /^([A-Z0-9]{8,})|trash$/,
            libraryID: /^[0-9]+$/,
            libraryType: /^(user|group|)$/,
            target: /^(items?|collections?|tags|children|deleted|userGroups|key)$/,
            targetModifier: /^(top|file|file\/view)$/,
            sort: /^(asc|desc)$/,
            start: /^[0-9]*$/,
            limit: /^[0-9]*$/,
            order: /^\S*$/,
            content: /^((html|json|bib|none|bibtex|bookmarks|coins|csljson|mods|refer|rdf_bibliontology|rdf_dc|ris|tei|wikipedia),?)+$/,
            q: /^.*$/,
            fq: /^\S*$/,
            itemType: /^\S*$/,
            locale: /^\S*$/,
            tag: /^.*$/,
            tagType: /^(0|1)$/,
            key: /^\S*/,
            format: /^(atom|bib|keys|versions|bibtex|bookmarks|mods|refer|rdf_bibliontology|rdf_dc|rdf_zotero|ris|wikipedia)$/,
            style: /^\S*$/,
            linkwrap: /^(0|1)*$/
        },
        validate: function(arg, type) {
            Z.debug("Zotero.validate", 4);
            if (arg === "") {
                return null;
            } else if (arg === null) {
                return true;
            }
            Z.debug(arg + " " + type, 4);
            var patterns = this.patterns;
            if (patterns.hasOwnProperty(type)) {
                return patterns[type].test(arg);
            } else {
                return null;
            }
        }
    },
    _logEnabled: 0,
    enableLogging: function() {
        Zotero._logEnabled++;
        if (Zotero._logEnabled > 0) {}
    },
    disableLogging: function() {
        Zotero._logEnabled--;
        if (Zotero._logEnabled <= 0) {
            Zotero._logEnabled = 0;
        }
    },
    init: function() {
        var store;
        if (Zotero.config.cacheStoreType == "localStorage" && typeof localStorage != "undefined") {
            store = localStorage;
        } else if (Zotero.config.cacheStoreType == "sessionStorage" && typeof sessionStorage != "undefined") {
            store = sessionStorage;
        } else {
            store = {};
        }
        Zotero.store = store;
        Zotero.cache = new Zotero.Cache(store);
        Zotero.preferences = new Zotero.Preferences(Zotero.store, "global");
        var locale = "en-US";
        if (Zotero.config.locale) {
            locale = Zotero.config.locale;
        }
        locale = "en-US";
        J.ajaxSettings.traditional = true;
    }
};

Zotero.Cache = function(store) {
    this.store = store;
    var registry = this.store["_registry"];
    if (typeof registry == "null" || typeof registry == "undefined") {
        registry = {};
        this.store["_registry"] = JSON.stringify(registry);
    }
};

Zotero.Cache.prototype.objectCacheString = function(params) {
    var paramVarsArray = [];
    J.each(params, function(index, value) {
        if (!value) {
            return;
        } else if (value instanceof Array) {
            J.each(value, function(i, v) {
                paramVarsArray.push(index + "/" + encodeURIComponent(v));
            });
        } else {
            paramVarsArray.push(index + "/" + encodeURIComponent(value));
        }
    });
    paramVarsArray.sort();
    Z.debug(paramVarsArray, 4);
    var objectCacheString = paramVarsArray.join("/");
    return objectCacheString;
};

Zotero.Cache.prototype.save = function(params, object, cachetags) {
    if (!J.isArray(cachetags)) {
        cachetags = [];
    }
    var registry = JSON.parse(this.store["_registry"]);
    if (!registry) {
        registry = {};
    }
    var objectCacheString = this.objectCacheString(params);
    this.store[objectCacheString] = JSON.stringify(object);
    var registryEntry = {
        id: objectCacheString,
        saved: Date.now(),
        cachetags: cachetags
    };
    registry[objectCacheString] = registryEntry;
    this.store["_registry"] = JSON.stringify(registry);
};

Zotero.Cache.prototype.load = function(params) {
    Z.debug("Zotero.Cache.load", 3);
    var objectCacheString = this.objectCacheString(params);
    Z.debug(objectCacheString, 4);
    try {
        var s = this.store[objectCacheString];
        if (!s) {
            Z.debug("No value found in cache store - " + objectCacheString, 3);
            return null;
        } else {
            return JSON.parse(s);
        }
    } catch (e) {
        Z.debug("Error parsing retrieved cache data", 1);
        Z.debug(objectCacheString, 2);
        Z.debug(this.store[objectCacheString], 2);
        return null;
    }
};

Zotero.Cache.prototype.expireCacheTag = function(tag) {
    Z.debug("Zotero.Cache.expireCacheTag", 3);
    var registry = JSON.parse(this.store["_registry"]);
    var store = this.store;
    J.each(registry, function(index, value) {
        if (J.inArray(tag, value.cachetags) != -1) {
            Z.debug("tag " + tag + " found for item " + value["id"] + " : expiring", 4);
            delete store[value["id"]];
            delete registry[value["id"]];
        }
    });
};

Zotero.Cache.prototype.clear = function() {
    if (typeof this.store.clear == "function") {
        this.store.clear();
    } else {
        this.store = {};
    }
};

Zotero.apiRequest = function(url, method, body, headers) {
    Z.debug("Zotero.apiRequest ==== " + url, 4);
    if (typeof method == "undefined") {
        method = "GET";
    }
    if (typeof headers == "undefined") {
        headers = {};
    }
    if (Zotero.config.apiVersion) {
        headers["Zotero-API-Version"] = Zotero.config.apiVersion;
    }
    var settings = {
        type: method,
        headers: headers,
        cache: false,
        error: Zotero.ajax.errorCallback
    };
    if (typeof body != "undefined") {
        settings["data"] = body;
    }
    var jqxhr = J.ajax(Zotero.ajax.proxyWrapper(url, method), settings);
    return jqxhr;
};

Zotero.error = function(e) {
    Z.debug("====================Zotero Error", 1);
    Z.debug(e, 1);
};

Zotero.ajaxRequest = function(url, type, options) {
    Z.debug("Zotero.ajaxRequest ==== " + url, 2);
    var defaultOptions = {
        type: "GET",
        headers: {},
        cache: false,
        error: Zotero.ajax.errorCallback
    };
    var reqOptions = J.extend({}, defaultOptions, options);
    if (type) {
        reqOptions.type = type;
    }
    if (Zotero.config.apiVersion) {
        reqOptions.headers["Zotero-API-Version"] = Zotero.config.apiVersion;
    }
    var urlstring;
    if (typeof url === "object") {
        urlstring = Zotero.ajax.apiRequestUrl(url) + Zotero.ajax.apiQueryString(url);
    } else if (typeof url === "string") {
        urlstring = url;
    }
    Z.debug("library.ajaxRequest urlstring " + urlstring);
    var reqUrl = Zotero.ajax.proxyWrapper(urlstring, type);
    return J.ajax(reqUrl, reqOptions);
};

Zotero.trigger = function(eventType, data) {
    var zoteroEventTarget = Zotero.eventfulTarget;
    if (!zoteroEventTarget) {
        zoteroEventTarget = J("#eventful");
    }
    if (!data) {
        data = {};
    }
    if (!data.triggeringElement) {
        data.triggeringElement = J("#eventful");
    }
    var e = J.Event(eventType, data);
    zoteroEventTarget.trigger(e);
};

var Z = Zotero;

Zotero.ajax.error = function(event, request, settings, exception) {
    Z.debug("Exception: " + exception);
};

Zotero.ajax.errorCallback = function(jqxhr, textStatus, errorThrown) {
    Z.debug("ajax error callback", 2);
    Z.debug("textStatus: " + textStatus, 2);
    Z.debug("errorThrown: ", 2);
    Z.debug(errorThrown, 2);
    Z.debug(jqxhr, 2);
};

Zotero.ajax.activeRequests = [];

Zotero.ajax.apiRequestUrl = function(params) {
    Z.debug("Zotero.ajax.apiRequestUrl", 4);
    Z.debug(params, 4);
    J.each(params, function(key, val) {
        if (typeof val == "string") {
            val = val.split("#", 1);
            params[key] = val[0];
        }
        if (Zotero.validator.validate(val, key) === false) {
            Zotero.warn("API argument failed validation: " + key + " cannot be " + val);
            Zotero.warn(params);
            delete params[key];
        }
    });
    if (!params.target) throw "No target defined for api request";
    if (!(params.libraryType == "user" || params.libraryType == "group" || params.libraryType === "")) {
        throw "Unexpected libraryType for api request " + JSON.stringify(params);
    }
    if (params.libraryType && !params.libraryID) {
        throw "No libraryID defined for api request";
    }
    var base = Zotero.config.baseApiUrl;
    var url;
    if (params.libraryType !== "") {
        url = base + "/" + params.libraryType + "s/" + params.libraryID;
        if (params.collectionKey) {
            if (params.collectionKey == "trash") {
                url += "/items/trash";
                return url;
            } else if (params.collectionKey.indexOf(",") !== -1) {} else {
                url += "/collections/" + params.collectionKey;
            }
        }
    } else {
        url = base;
    }
    switch (params.target) {
      case "items":
        url += "/items";
        break;
      case "item":
        if (params.itemKey) {
            url += "/items/" + params.itemKey;
        } else {
            url += "/items";
        }
        break;
      case "collections":
        url += "/collections";
        break;
      case "collection":
        break;
      case "tags":
        url += "/tags";
        break;
      case "children":
        url += "/items/" + params.itemKey + "/children";
        break;
      case "key":
        url = base + "/users/" + params.libraryID + "/keys/" + params.apiKey;
        break;
      case "deleted":
        url += "/deleted";
        break;
      case "userGroups":
        url = base + "/users/" + params.libraryID + "/groups";
        break;
      case "settings":
        url += "/settings/" + (params.settingsKey || "");
        break;
      default:
        return false;
    }
    switch (params.targetModifier) {
      case "top":
        url += "/top";
        break;
      case "file":
        url += "/file";
        break;
      case "viewsnapshot":
        url += "/file/view";
        break;
    }
    return url;
};

Zotero.ajax.apiQueryString = function(passedParams, useConfigKey) {
    Z.debug("Zotero.ajax.apiQueryString", 4);
    Z.debug(passedParams, 4);
    if (useConfigKey === null || typeof useConfigKey === "undefined") {
        useConfigKey = true;
    }
    J.each(passedParams, function(key, val) {
        if (typeof val == "string") {
            val = val.split("#", 1);
            passedParams[key] = val[0];
        }
    });
    if (passedParams.hasOwnProperty("order") && passedParams["order"] == "creatorSummary") {
        passedParams["order"] = "creator";
    }
    if (passedParams.hasOwnProperty("order") && passedParams["order"] == "year") {
        passedParams["order"] = "date";
    }
    if (useConfigKey && Zotero.config.sessionAuth) {
        var sessionKey = Zotero.utils.readCookie("zotero_www_session_v2");
        passedParams["session"] = sessionKey;
    } else if (useConfigKey && Zotero.config.apiKey) {
        passedParams["key"] = Zotero.config.apiKey;
    }
    if (passedParams.hasOwnProperty("sort") && passedParams["sort"] == "undefined") {
        passedParams["sort"] = "asc";
    }
    Z.debug(passedParams, 4);
    var queryString = "?";
    var queryParamsArray = [];
    var queryParamOptions = [ "start", "limit", "order", "sort", "content", "format", "q", "fq", "itemType", "itemKey", "collectionKey", "searchKey", "locale", "tag", "tagType", "key", "style", "linkMode", "linkwrap", "session", "newer" ];
    queryParamOptions.sort();
    var queryParams = {};
    J.each(queryParamOptions, function(i, val) {
        if (passedParams.hasOwnProperty(val) && passedParams[val] !== "") {
            queryParams[val] = passedParams[val];
        }
    });
    if (passedParams.hasOwnProperty("target") && passedParams["target"] !== "items") {
        if (queryParams.hasOwnProperty("itemKey") && queryParams["itemKey"].indexOf(",") == -1) {
            delete queryParams["itemKey"];
        }
    }
    if (passedParams.hasOwnProperty("target") && passedParams["target"] !== "collections") {
        if (queryParams.hasOwnProperty("collectionKey") && queryParams["collectionKey"].indexOf(",") === -1) {
            delete queryParams["collectionKey"];
        }
    }
    J.each(queryParams, function(index, value) {
        if (value instanceof Array) {
            J.each(value, function(i, v) {
                if (index == "tag" && v[0] == "-") {
                    v = "\\" + v;
                }
                queryParamsArray.push(encodeURIComponent(index) + "=" + encodeURIComponent(v));
            });
        } else {
            if (index == "tag" && value[0] == "-") {
                value = "\\" + value;
            }
            queryParamsArray.push(encodeURIComponent(index) + "=" + encodeURIComponent(value));
        }
    });
    queryString += queryParamsArray.join("&");
    return queryString;
};

Zotero.ajax.apiRequestString = function(config) {
    return Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
};

Zotero.ajax.proxyWrapper = function(requestUrl, method) {
    if (Zotero.config.proxy) {
        if (!method) {
            method = "GET";
        }
        return Zotero.config.proxyPath + "?requestMethod=" + method + "&requestUrl=" + encodeURIComponent(requestUrl);
    } else {
        return requestUrl;
    }
};

Zotero.ajax.parseQueryString = function(query) {};

Zotero.ajax.webUrl = function(args) {};

Zotero.Feed = function(data, response) {
    Z.debug("Zotero.Feed", 3);
    this.title = "";
    this.id = "";
    this.totalResults = 0;
    this.apiVersion = null;
    this.links = {};
    this.lastPageStart = null;
    this.lastPage = null;
    this.currentPage = null;
    this.updated = null;
    if (typeof data !== "undefined") {
        this.parseXmlFeed(data);
    }
    if (response) {
        this.lastModifiedVersion = response.getResponseHeader("Last-Modified-Version");
        this.apiVersion = response.getResponseHeader("Zotero-API-Version");
        this.backoff = response.getResponseHeader("Backoff");
        this.retryAfter = response.getResponseHeader("Retry-After");
        this.contentType = response.getResponseHeader("Content-Type");
    }
};

Zotero.Feed.prototype.parseXmlFeed = function(data) {
    var fel = J(data).find("feed");
    this.zoteroLastModifiedVersion = null;
    this.title = fel.children("title").first().text();
    this.id = fel.children("id").first().text();
    this.totalResults = fel.find("zapi\\:totalResults").first().text();
    if (this.totalResults === "") {
        this.totalResults = fel.find("totalResults").first().text();
    }
    var links = {};
    var lasthref = "";
    fel.children("link").each(function() {
        var rel = J(this).attr("rel");
        links[rel] = {
            rel: J(this).attr("rel"),
            type: J(this).attr("type"),
            href: J(this).attr("href")
        };
        if (J(this).attr("rel") == "last") {
            lasthref = J(this).attr("href");
        }
    });
    var selfhref = links["self"].href;
    this.lastPageStart = J.deparam.querystring(lasthref).start || 0;
    var limit = J.deparam.querystring(lasthref).limit || 50;
    var start = J.deparam.querystring(selfhref).start || 0;
    this.lastPage = parseInt(this.lastPageStart, 10) / limit + 1;
    this.currentPage = parseInt(start, 10) / limit + 1;
    this.links = links;
    this.updated = new Date;
    this.updated.setTime(Date.parse(fel.children("updated").first().text()));
    this.entries = fel.find("entry");
    return this;
};

Zotero.Library = function(type, libraryID, libraryUrlIdentifier, apiKey) {
    Z.debug("Zotero.Library constructor", 3);
    var library = this;
    Z.debug(libraryUrlIdentifier, 4);
    library.instance = "Zotero.Library";
    library.libraryVersion = 0;
    library.syncState = {
        earliestVersion: null,
        latestVersion: null
    };
    library._apiKey = apiKey || false;
    library.libraryBaseWebsiteUrl = Zotero.config.baseWebsiteUrl + "/";
    if (library.libraryType == "group") {
        library.libraryBaseWebsiteUrl += "groups/";
    }
    this.libraryBaseWebsiteUrl += libraryUrlIdentifier + "/items";
    library.items = new Zotero.Items;
    library.items.owningLibrary = library;
    library.itemKeys = [];
    library.collections = new Zotero.Collections;
    library.collections.libraryUrlIdentifier = library.libraryUrlIdentifier;
    library.collections.owningLibrary = library;
    library.tags = new Zotero.Tags;
    library.searches = new Zotero.Searches;
    library.searches.owningLibrary = library;
    library.groups = new Zotero.Groups;
    library.groups.owningLibrary = library;
    library.deleted = new Zotero.Deleted;
    library.deleted.owningLibrary = library;
    if (!type) {
        return;
    }
    library.type = type;
    library.libraryType = type;
    library.libraryID = libraryID;
    library.libraryString = Zotero.utils.libraryString(library.libraryType, library.libraryID);
    library.libraryUrlIdentifier = libraryUrlIdentifier;
    library.preferences = new Zotero.Preferences(Zotero.store, library.libraryString);
    library.usernames = {};
    if (Zotero.config.useIndexedDB === true) {
        var idbLibrary = new Zotero.Idb.Library(library.libraryString);
        idbLibrary.owningLibrary = this;
        library.idbLibrary = idbLibrary;
        var idbInitD = idbLibrary.init();
        idbInitD.done(J.proxy(function() {
            if (Zotero.config.preloadCachedLibrary === true) {
                var cacheLoadD = library.loadIndexedDBCache();
                cacheLoadD.done(J.proxy(function() {
                    Z.debug("Library.items.itemsVersion: " + library.items.itemsVersion, 3);
                    Z.debug("Library.collections.collectionsVersion: " + library.collections.collectionsVersion, 3);
                    Z.debug("Library.tags.tagsVersion: " + library.tags.tagsVersion, 3);
                    Z.debug("Triggering cachedDataLoaded");
                    Zotero.ui.eventful.trigger("cachedDataLoaded");
                    Zotero.preferences.setPref("log_level", 3);
                }, this));
            } else {
                Zotero.ui.eventful.trigger("cachedDataLoaded");
            }
        }, this));
    }
    if (Zotero.config.preloadCachedLibrary === true) {
        Zotero.preferences.setPref("log_level", 5);
        if (Zotero.config.useIndexedDB === true) {} else {}
        Zotero.preferences.setPref("log_level", 3);
    }
    library.dirty = false;
    try {
        library.filestorage = new Zotero.Filestorage;
    } catch (e) {
        Z.debug(e);
        Z.debug("Error creating filestorage");
        library.filestorage = false;
    }
    library.tagsChanged = function() {};
    library.collectionsChanged = function() {};
    library.itemsChanged = function() {};
};

Zotero.Library.prototype.sortableColumns = [ "title", "creator", "itemType", "date", "year", "publisher", "publicationTitle", "journalAbbreviation", "language", "accessDate", "libraryCatalog", "callNumber", "rights", "dateAdded", "dateModified", "addedBy" ];

Zotero.Library.prototype.displayableColumns = [ "title", "creator", "itemType", "date", "year", "publisher", "publicationTitle", "journalAbbreviation", "language", "accessDate", "libraryCatalog", "callNumber", "rights", "dateAdded", "dateModified", "numChildren", "addedBy" ];

Zotero.Library.prototype.groupOnlyColumns = [ "addedBy" ];

Zotero.Library.prototype.sortByTitleCompare = function(a, b) {
    if (a.title.toLocaleLowerCase() == b.title.toLocaleLowerCase()) {
        return 0;
    }
    if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
        return -1;
    }
    return 1;
};

Zotero.Library.prototype.sortLower = function(a, b) {
    if (a.toLocaleLowerCase() == b.toLocaleLowerCase()) {
        return 0;
    }
    if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) {
        return -1;
    }
    return 1;
};

Zotero.Library.prototype.ajaxRequest = function(url, type, options) {
    var defaultOptions = {
        type: "GET",
        headers: {},
        cache: false,
        error: Zotero.ajax.errorCallback
    };
    var reqOptions = J.extend({}, defaultOptions, options);
    if (type) {
        reqOptions.type = type;
    }
    if (Zotero.config.apiVersion) {
        reqOptions.headers["Zotero-API-Version"] = Zotero.config.apiVersion;
    }
    var urlstring;
    if (typeof url === "object") {
        urlstring = Zotero.ajax.apiRequestString(url);
    } else if (typeof url === "string") {
        urlstring = url;
    }
    Z.debug("library.ajaxRequest urlstring " + urlstring);
    var reqUrl = Zotero.ajax.proxyWrapper(urlstring, type);
    return J.ajax(reqUrl, reqOptions);
};

Zotero.Library.prototype.websiteUrl = function(urlvars) {
    Z.debug("Zotero.library.websiteUrl", 3);
    Z.debug(urlvars, 4);
    var urlVarsArray = [];
    J.each(urlvars, function(index, value) {
        if (value === "") return;
        urlVarsArray.push(index + "/" + value);
    });
    urlVarsArray.sort();
    Z.debug(urlVarsArray, 4);
    var pathVarsString = urlVarsArray.join("/");
    return this.libraryBaseWebsiteUrl + "/" + pathVarsString;
};

Zotero.Library.prototype.synchronize = function() {};

Zotero.Library.prototype.loadUpdatedItems = function() {
    var library = this;
    var d = new J.Deferred;
    var itemVersionsDeferred = library.updatedVersions("items", library.items.itemsVersion);
    itemVersionsDeferred.done(J.proxy(function(data, textStatus, versionsjqxhr) {
        Z.debug("itemVersionsDeferred resolved", 3);
        var updatedVersion = versionsjqxhr.getResponseHeader("Last-Modified-Version");
        Z.debug("items Last-Modified-Version: " + updatedVersion, 3);
        Zotero.utils.updateSyncState(library.items, updatedVersion);
        var itemVersions = data;
        library.itemVersions = itemVersions;
        var itemKeys = [];
        J.each(itemVersions, function(key, val) {
            itemKeys.push(key);
        });
        var loadAllItemsDeferred = library.loadItemsFromKeysParallel(itemKeys);
        loadAllItemsDeferred.done(J.proxy(function() {
            Z.debug("loadAllItemsDeferred resolved", 3);
            Zotero.utils.updateSyncedVersion(library.items, "itemsVersion");
            var displayParams = Zotero.nav.getUrlVars();
            Z.debug(displayParams);
            library.buildItemDisplayView(displayParams);
            if (Zotero.config.useIndexedDB) {
                var saveItemsD = library.idbLibrary.updateItems();
            }
            d.resolve();
        }, this));
    }, this));
};

Zotero.Library.prototype.loadUpdatedCollections = function() {
    Z.debug("Zotero.Library.loadUpdatedCollections", 1);
    var library = this;
    var d = new J.Deferred;
    var collectionVersionsDeferred = library.updatedVersions("collections", library.collections.collectionsVersion);
    collectionVersionsDeferred.done(J.proxy(function(data, textStatus, keysjqxhr) {
        Z.debug("collectionVersionsDeferred finished", 1);
        var updatedVersion = keysjqxhr.getResponseHeader("Last-Modified-Version");
        Z.debug("2 Collections Last-Modified-Version: " + updatedVersion, 1);
        Zotero.utils.updateSyncState(library.collections.syncState, updatedVersion);
        var collectionVersions = data;
        library.collectionVersions = collectionVersions;
        var collectionKeys = [];
        J.each(collectionVersions, function(key, val) {
            collectionKeys.push(key);
        });
        if (collectionKeys.length === 0) {
            Z.debug("No collectionKeys need updating. resolving");
            d.resolve();
        } else {
            var loadAllCollectionsDeferred = library.loadCollectionsFromKeysParallel(collectionKeys);
            loadAllCollectionsDeferred.done(J.proxy(function(data, textStatus, lacd) {
                Z.debug("All updated collections loaded", 3);
                Zotero.utils.updateSyncedVersion(library.collections, "collectionsVersion");
                var displayParams = Zotero.nav.getUrlVars();
                Z.debug("loadUpdatedCollections complete - saving collections to cache before resolving", 1);
                Z.debug("collectionsVersion: " + library.collections.collectionsVersion, 1);
                if (Zotero.config.useIndexedDB) {
                    var saveCollectionsD = library.idbLibrary.updateCollections();
                }
                d.resolve();
            }, this));
        }
    }, this));
    collectionVersionsDeferred.fail(J.proxy(function() {
        Z.debug("collectionVersions failed. rejecting deferred.", 1);
        d.reject();
    }, this));
    return d;
};

Zotero.Library.prototype.loadUpdatedTags = function() {
    Z.debug("Zotero.Library.loadUpdatedTags", 1);
    var library = this;
    Z.debug("tagsVersion: " + library.tags.tagsVersion, 3);
    loadAllTagsJqxhr = library.loadAllTags({
        newer: library.tags.tagsVersion
    }, false);
    var callback = J.proxy(function() {
        if (library.deleted.deletedData.tags && library.deleted.deletedData.tags.length > 0) {
            library.tags.removeTags(library.deleted.deletedData.tags);
        }
        if (Zotero.config.useIndexedDB) {
            Z.debug("saving updated tags to IDB");
            var saveTagsD = library.idbLibrary.updateTags();
        }
    }, this);
    var deletedJqxhr = library.getDeleted(library.libraryVersion);
    return J.when(loadAllTagsJqxhr, deletedJqxhr).then(callback);
};

Zotero.Library.prototype.getDeleted = function(version) {
    var library = this;
    var callback = J.proxy(function(data, status, jqxhr) {
        library.deleted.deletedData = data;
        var responseModifiedVersion = jqxhr.getResponseHeader("Last-Modified-Version");
        Z.debug("Deleted Last-Modified-Version:" + responseModifiedVersion, 3);
        library.deleted.deletedVersion = responseModifiedVersion;
        library.deleted.newerVersion = version;
    }, this);
    var urlconf = {
        target: "deleted",
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        newer: version
    };
    jqxhr = library.ajaxRequest(urlconf, "GET", {
        success: callback
    });
    return jqxhr;
};

Zotero.Library.prototype.processDeletions = function(deletions) {
    var library = this;
    J.each(deletions.collections, function(ind, val) {
        var localCollection = library.collections.getCollection(val);
        if (localCollection !== false) {
            if (localCollection.synced === true) {
                library.collections.deleteCollection(val);
            } else {}
        }
    });
    J.each(deletions.items, function(ind, val) {
        var localItem = library.items.getItem(val);
        if (localItem !== false) {
            if (localItem.synced === true) {
                library.items.deleteItem(val);
            }
        }
    });
};

Zotero.Library.prototype.loadFullBib = function(itemKeys, style) {
    var library = this;
    var itemKeyString = itemKeys.join(",");
    var deferred = new J.Deferred;
    var urlconfig = {
        target: "items",
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        itemKey: itemKeyString,
        format: "bib",
        linkwrap: "1"
    };
    if (itemKeys.length == 1) {
        urlconfig.target = "item";
    }
    if (style) {
        urlconfig["style"] = style;
    }
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
        var bib = data;
        deferred.resolve(data);
    }, this);
    var jqxhr = library.ajaxRequest(requestUrl);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    }).fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    deferred.done(function(item) {
        J.publish("loadItemBibDone", [ item ]);
    });
    return deferred;
};

Zotero.Library.prototype.loadItemBib = function(itemKey, style) {
    Z.debug("Zotero.Library.loadItemBib", 3);
    var library = this;
    var deferred = new J.Deferred;
    var urlconfig = {
        target: "item",
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        itemKey: itemKey,
        content: "bib"
    };
    if (style) {
        urlconfig["style"] = style;
    }
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
        var resultOb = J(data);
        var entry = J(data).find("entry").eq(0);
        var item = new Zotero.Item;
        item.parseXmlItem(entry);
        var bibContent = item.bibContent;
        deferred.resolve(bibContent);
    }, this);
    var jqxhr = library.ajaxRequest(requestUrl);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    }).fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    deferred.done(function(item) {
        J.publish("loadItemBibDone", [ item ]);
    });
    return deferred;
};

Zotero.Library.prototype.loadSettings = function() {
    Z.debug("Zotero.Library.loadSettings", 3);
    var library = this;
    var deferred = new J.Deferred;
    var urlconfig = {
        target: "settings",
        libraryType: library.libraryType,
        libraryID: library.libraryID
    };
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
        var resultObject;
        if (typeof data == "string") {
            resultObject = JSON.parse(data);
        } else {
            resultObject = data;
        }
        library.preferences.setPrefs(resultObject);
        deferred.resolve(library.preferences);
    }, this);
    var jqxhr = library.ajaxRequest(requestUrl);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    }).fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    deferred.done(function(item) {
        Zotero.ui.eventful.trigger("settingsLoaded");
    });
    return deferred;
};

Zotero.Library.prototype.fetchUserNames = function(userIDs) {
    Z.debug("Zotero.Library.fetchUserNames", 3);
    var library = this;
    var reqUrl = Zotero.config.baseZoteroWebsiteUrl + "/api/useraliases?userID=" + userIDs.join(",");
    var jqxhr = J.getJSON(reqUrl, J.proxy(function(data, textStatus, jqXHR) {
        Z.debug("fetchNames returned");
        Z.debug(JSON.stringify(data));
        Z.debug("userNames:");
        Z.debug(this.usernames);
        J.each(data, function(userID, aliases) {
            Z.debug("userID: " + userID + " alias:");
            Z.debug(aliases);
            library.usernames[userID] = aliases;
        });
    }, this));
    return jqxhr;
};

Zotero.Library.prototype.pullUpdated = function() {
    Z.debug("Zotero.Library.pullUpdated", 3);
    var library = this;
    Z.debug("libraryVersion:" + library.libraryVersion, 4);
    Z.debug("collectionsVersion:" + library.collections.collectionsVersion, 4);
    Z.debug("itemsVersion:" + library.items.itemsVersion, 4);
    var updatedCollectionVersionsD = library.updatedVersions("collections", library.collections.collectionsVersion);
    var updatedItemsVersionsD = library.updatedVersions("items", library.items.itemsVersion);
    updatedCollectionVersionsD.done(J.proxy(function(data, textStatus, XMLHttpRequest) {
        var collectionVersions;
        if (typeof data == "string") {
            collectionVersions = JSON.parse(data);
        } else {
            collectionVersions = data;
        }
        var collectionKeys = Object.keys(collectionVersions);
        Z.debug("updatedCollectionKeys:", 4);
        Z.debug(collectionKeys, 4);
        var updatedCollectionsD = library.loadCollectionsFromKeysParallel(collectionKeys);
    }, this));
    updatedItemVersionsD.done(J.proxy(function(data, textStatus, XMLHttpRequest) {
        var itemVersions;
        if (typeof data == "string") {
            itemVersions = JSON.parse(data);
        } else {
            itemVersions = data;
        }
        var itemKeys = Object.keys(itemVersions);
        Z.debug("updatedItemKeys:", 4);
        Z.debug(itemKeys, 4);
        var updatedItemsD = library.loadItemsFromKeysParallel(itemKeys);
    }, this));
};

Zotero.Library.prototype.updatedVersions = function(target, version) {
    var library = this;
    if (typeof target === "undefined") {
        target = "items";
    }
    if (typeof version === "undefined" || version === null) {
        version = library.libraryVersion;
    }
    var urlconf = {
        target: target,
        format: "versions",
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        newer: version
    };
    jqxhr = library.ajaxRequest(urlconf);
    return jqxhr;
};

Zotero.Library.prototype.fetchItemKeysModified = function() {
    return this.fetchItemKeys({
        order: "dateModified"
    });
};

Zotero.Library.prototype.loadItemsFromKeysParallel = function(keys) {
    Zotero.debug("Zotero.Library.loadItemsFromKeysParallel", 3);
    var library = this;
    var d = library.loadFromKeysParallel(keys, "items");
    d.done(function() {
        J.publish("loadItemsFromKeysParallelDone");
    });
    return d;
};

Zotero.Library.prototype.loadCollectionsFromKeysParallel = function(keys) {
    Zotero.debug("Zotero.Library.loadCollectionsFromKeysParallel", 1);
    var library = this;
    var d = library.loadFromKeysParallel(keys, "collections");
    return d;
};

Zotero.Library.prototype.loadSeachesFromKeysParallel = function(keys) {
    Zotero.debug("Zotero.Library.loadSearchesFromKeysParallel", 3);
    var library = this;
    var d = library.loadFromKeysParallel(keys, "searches");
    return d;
};

Zotero.Library.prototype.loadFromKeysParallel = function(keys, objectType) {
    Zotero.debug("Zotero.Library.loadFromKeysParallel", 1);
    if (!objectType) objectType = "items";
    var library = this;
    var keyslices = [];
    while (keys.length > 0) {
        keyslices.push(keys.splice(0, 50));
    }
    var deferred = new J.Deferred;
    var xhrs = [];
    J.each(keyslices, function(ind, keyslice) {
        var keystring = keyslice.join(",");
        var xhr;
        switch (objectType) {
          case "items":
            xhr = library.loadItemsSimple({
                target: "items",
                targetModifier: null,
                itemKey: keystring,
                limit: 50
            });
            break;
          case "collections":
            xhr = library.loadCollectionsSimple({
                target: "collections",
                targetModifier: null,
                collectionKey: keystring,
                limit: 50
            });
            break;
          case "searches":
            xhr = library.loadSearchesSimple({
                target: "searches",
                searchKey: keystring,
                limit: 50
            });
            break;
        }
        xhrs.push(xhr);
    });
    J.when.apply(this, xhrs).then(J.proxy(function() {
        Z.debug("All parallel requests returned - resolving deferred", 1);
        deferred.resolve(true);
    }, this));
    return deferred;
};

Zotero.Library.prototype.loadCollectionMembership = function(collections) {
    Z.debug("Zotero.Library.loadCollectionMembership", 3);
    var library = this;
    var deferred = new J.Deferred;
    var neededCollections = [];
    for (var i = 0; i < collections.length; i++) {
        if (collections.collectionObjects[i].itemKeys === false) {
            neededCollections.push(collections.collectionObjects[i]);
        }
    }
    var loadNextCollectionMembers = function() {
        var col = neededCollections.shift();
        if (typeof col == "undefined") {
            deferred.resolve();
            return;
        } else {
            var d = col.getMemberItemKeys();
            d.done(J.proxy(function() {
                loadNextCollectionMembers();
            }, this));
        }
    };
    loadNextCollectionMembers();
    return deferred;
};

Zotero.Library.prototype.buildItemDisplayView = function(params) {
    Z.debug("Zotero.Library.buildItemDisplayView", 3);
    Z.debug(params);
    var library = this;
    var itemKeys;
    if (params.collectionKey) {
        var collection = library.collections.getCollection(params.collectionKey);
        if (collection === false) {
            Z.error("specified collectionKey - " + params.collectionKey + " - not found in current library.");
            return false;
        }
        if (collection.itemKeys === false) {
            var d = collection.getMemberItemKeys();
            d.done(J.proxy(library.buildItemDisplayView, this));
            return false;
        } else {
            itemKeys = collection.itemKeys;
        }
    } else {
        itemKeys = library.itemKeys;
    }
    library.items.displayItemsArray = [];
    var item;
    J.each(itemKeys, function(ind, val) {
        item = library.items.getItem(val);
        if (item && !item.parentItemKey) {
            library.items.displayItemsArray.push(item);
        }
    });
    Z.debug("Starting with " + library.items.displayItemsArray.length + " items displayed");
    var selectedTags = params.tag || [];
    if (typeof selectedTags == "string") selectedTags = [ selectedTags ];
    var tagFilteredArray = J.grep(library.items.displayItemsArray, J.proxy(function(item, index) {
        var itemTags = item.apiObj.tags;
        var found = false;
        for (var i = 0; i < selectedTags.length; i++) {
            found = false;
            for (var j = 0; j < itemTags.length; j++) {
                if (itemTags[j].tag == selectedTags[i]) {
                    found = true;
                }
            }
            if (found === false) return false;
        }
        return true;
    }, this));
    library.items.displayItemsArray = tagFilteredArray;
    Z.debug("Filtered by tags");
    Z.debug("Down to " + library.items.displayItemsArray.length + " items displayed");
    Z.debug("Sorting by title");
    var orderCol = params["order"] || "title";
    var sort = params["sort"] || "asc";
    library.items.displayItemsArray.sort(J.proxy(function(a, b) {
        var aval = a.get(orderCol);
        var bval = b.get(orderCol);
        if (typeof aval == "string") {
            return aval.localeCompare(bval);
        } else {
            return aval - bval;
        }
    }, this));
    if (sort == "desc") {
        library.items.displayItemsArray.reverse();
    }
    Z.debug("triggering publishing displayedItemsUpdated", 3);
    Zotero.trigger("displayedItemsUpdated", {
        library: library
    });
};

Zotero.Entry = function() {
    this.instance = "Zotero.Entry";
    this.version = 0;
};

Zotero.Entry.prototype.dumpEntry = function() {
    var entry = this;
    var dump = {};
    var dataProperties = [ "version", "title", "author", "id", "published", "dateAdded", "updated", "dateModified", "links" ];
    for (var i = 0; i < dataProperties.length; i++) {
        dump[dataProperties[i]] = entry[dataProperties[i]];
    }
    return dump;
};

Zotero.Entry.prototype.loadDumpEntry = function(dump) {
    var dataProperties = [ "version", "title", "author", "id", "published", "dateAdded", "updated", "dateModified", "links" ];
    for (var i = 0; i < dataProperties.length; i++) {
        this[dataProperties[i]] = dump[dataProperties[i]];
    }
    return this;
};

Zotero.Entry.prototype.dump = Zotero.Entry.prototype.dumpEntry;

Zotero.Entry.prototype.parseXmlEntry = function(eel) {
    Z.debug("Zotero.Entry.parseXmlEntry", 4);
    var entry = this;
    entry.version = eel.children("zapi\\:version").text();
    entry.title = eel.children("title").text();
    entry.author = {};
    entry.author["name"] = eel.children("author").children("name").text();
    entry.author["uri"] = eel.children("author").children("uri").text();
    entry.id = eel.children("id").first().text();
    entry.published = eel.children("published").text();
    entry.dateAdded = entry.published;
    entry.updated = eel.children("updated").text();
    entry.dateModified = entry.updated;
    var links = {};
    eel.children("link").each(function() {
        var rel = J(this).attr("rel");
        links[rel] = {
            rel: J(this).attr("rel"),
            type: J(this).attr("type"),
            href: J(this).attr("href"),
            length: J(this).attr("length")
        };
    });
    entry.links = links;
};

Zotero.Entry.prototype.associateWithLibrary = function(library) {
    var entry = this;
    entry.libraryUrlIdentifier = library.libraryUrlIdentifier;
    entry.libraryType = library.libraryType;
    entry.libraryID = library.libraryID;
    entry.owningLibrary = library;
    return entry;
};

Zotero.Collections = function(feed) {
    var collections = this;
    this.instance = "Zotero.Collections";
    this.collectionsVersion = 0;
    this.syncState = {
        earliestVersion: null,
        latestVersion: null
    };
    this.collectionsArray = [];
    this.dirty = false;
    this.loaded = false;
    this.collectionObjects = {};
    if (typeof feed == "undefined") {
        return;
    } else {
        this.addCollectionsFromFeed(feed);
    }
};

Zotero.Collections.prototype.dump = function() {
    var dump = {};
    dump.instance = "Zotero.Collections";
    dump.collectionsVersion = this.collectionsVersion;
    dump.collectionsArray = [];
    for (var i = 0; i < this.collectionsArray.length; i++) {
        dump.collectionsArray.push(this.collectionsArray[i].dump());
    }
    dump.dirty = this.dirty;
    dump.loaded = this.loaded;
    return dump;
};

Zotero.Collections.prototype.loadDump = function(dump) {
    var collections = this;
    this.collectionsVersion = dump.collectionsVersion;
    this.dirty = dump.dirty;
    this.loaded = dump.loaded;
    for (var i = 0; i < dump.collectionsArray.length; i++) {
        var collection = new Zotero.Collection;
        collection.loadDump(dump.collectionsArray[i]);
        collections.addCollection(collection);
    }
    collections.collectionsArray.sort(collections.sortByTitleCompare);
    J.each(collections.collectionsArray, function(index, obj) {
        if (obj.instance === "Zotero.Collection") {
            if (obj.nestCollection(collections.collectionObjects)) {
                Z.debug(obj.collectionKey + ":" + obj.title + " nested in parent.", 4);
            }
        }
    });
    this.assignDepths(0, this.collectionsArray);
    return this;
};

Zotero.Collections.prototype.addCollection = function(collection) {
    Zotero.debug("Zotero.Collections.addCollection", 4);
    Zotero.debug(collection.collectionKey, 4);
    this.collectionsArray.push(collection);
    this.collectionObjects[collection.collectionKey] = collection;
    if (this.owningLibrary) {
        collection.associateWithLibrary(this.owningLibrary);
    }
    return this;
};

Zotero.Collections.prototype.addCollectionsFromFeed = function(feed) {
    var collections = this;
    var collectionsAdded = [];
    feed.entries.each(function(index, entry) {
        var collection = new Zotero.Collection(J(entry));
        collections.addCollection(collection);
        collectionsAdded.push(collection);
    });
    return collectionsAdded;
};

Zotero.Collections.prototype.sortByTitleCompare = function(a, b) {
    if (a.get("title").toLowerCase() == b.get("title").toLowerCase()) {
        return 0;
    }
    if (a.get("title").toLowerCase() < b.get("title").toLowerCase()) {
        return -1;
    }
    return 1;
};

Zotero.Collections.prototype.assignDepths = function(depth, cArray) {
    Z.debug("Zotero.Collections.assignDepths", 3);
    var collections = this;
    var insertchildren = function(depth, children) {
        J.each(children, function(index, col) {
            col.nestingDepth = depth;
            if (col.hasChildren) {
                insertchildren(depth + 1, col.children);
            }
        });
    };
    J.each(collections.collectionsArray, function(index, collection) {
        if (collection.topLevel) {
            collection.nestingDepth = 1;
            if (collection.hasChildren) {
                insertchildren(2, collection.children);
            }
        }
    });
};

Zotero.Collections.prototype.nestedOrderingArray = function() {
    Z.debug("Zotero.Collections.nestedOrderingArray", 3);
    var collections = this;
    var nested = [];
    var insertchildren = function(a, children) {
        J.each(children, function(index, col) {
            a.push(col);
            if (col.hasChildren) {
                insertchildren(a, col.children);
            }
        });
    };
    J.each(collections.collectionsArray, function(index, collection) {
        if (collection.topLevel) {
            nested.push(collection);
            if (collection.hasChildren) {
                insertchildren(nested, collection.children);
            }
        }
    });
    Z.debug("Done with nestedOrderingArray", 3);
    return nested;
};

Zotero.Collections.prototype.loadDataObjects = function(collectionsArray) {
    Z.debug("Zotero.Collections.loadDataObjects", 3);
    var library = this.owningLibrary;
    var collections = this;
    J.each(collectionsArray, function(index, dataObject) {
        var collectionKey = dataObject["collectionKey"];
        var collection = new Zotero.Collection;
        collection.loadObject(dataObject);
        collection.libraryUrlIdentifier = collections.libraryUrlIdentifier;
        collection.libraryType = library.type;
        collection.libraryID = library.libraryID;
        collection.owningLibrary = library;
        collections.collectionObjects[collection.collectionKey] = collection;
        collections.collectionsArray.push(collection);
    });
    collections.collectionsArray.sort(collections.sortByTitleCompare);
    J.each(collections.collectionsArray, function(index, obj) {
        if (obj.instance === "Zotero.Collection") {
            if (obj.nestCollection(collections.collectionObjects)) {
                Z.debug(obj.collectionKey + ":" + obj.title + " nested in parent.", 4);
            }
        }
    });
    collections.assignDepths(0, collections.collectionsArray);
    return collections;
};

Zotero.Collections.prototype.getCollection = function(key) {
    if (this.collectionObjects.hasOwnProperty(key)) {
        return this.collectionObjects[key];
    } else {
        return false;
    }
};

Zotero.Collections.prototype.remoteDeleteCollection = function(key) {
    var collections = this;
    if (collections.collectionObjects.hasOwnProperty(key) && collections.collectionObjects[key].synced === true) {
        delete collections.collectionObjects[key];
        return true;
    }
    return false;
};

Zotero.Items = function(feed) {
    this.instance = "Zotero.Items";
    this.itemsVersion = 0;
    this.syncState = {
        earliestVersion: null,
        latestVersion: null
    };
    this.displayItemsArray = [];
    this.displayItemsUrl = "";
    this.itemObjects = {};
    this.unsyncedItemKeys = [];
    this.newUnsyncedItems = [];
    if (typeof feed != "undefined") {
        this.addItemsFromFeed(feed);
    }
};

Zotero.Items.prototype.dump = function() {
    Z.debug("Zotero.Items.dump", 3);
    var items = this;
    var dump = {};
    dump.instance = "Zotero.Items.dump";
    dump.itemsVersion = this.itemsVersion;
    dump.itemsArray = [];
    J.each(items.itemObjects, function(key, val) {
        Z.debug("dumping item " + key + " : " + val.itemKey, 3);
        dump.itemsArray.push(val.dump());
    });
    return dump;
};

Zotero.Items.prototype.loadDump = function(dump) {
    Z.debug("-------------------------------Zotero.Items.loadDump", 3);
    this.itemsVersion = dump.itemsVersion;
    var items = this;
    var itemKeys = [];
    for (var i = 0; i < dump.itemsArray.length; i++) {
        var item = new Zotero.Item;
        item.loadDump(dump.itemsArray[i]);
        items.addItem(item);
        itemKeys.push(item.itemKey);
    }
    if (items.owningLibrary) {
        items.owningLibrary.itemKeys = itemKeys;
    }
    Z.debug("Adding childItemKeys to items loaded from dump");
    var parentItem;
    J.each(items.itemObjects, function(ind, item) {
        if (item.parentKey) {
            parentItem = items.getItem(item.parentKey);
            if (parentItem !== false) {
                parentItem.childItemKeys.push(item.itemKey);
            }
        }
    });
    return this;
};

Zotero.Items.prototype.getItem = function(key) {
    if (this.itemObjects.hasOwnProperty(key)) {
        return this.itemObjects[key];
    }
    return false;
};

Zotero.Items.prototype.getItems = function(keys) {
    var items = this;
    var gotItems = [];
    for (var i = 0; i < keys.length; i++) {
        gotItems.push(items.getItem(keys[i]));
    }
    return gotItems;
};

Zotero.Items.prototype.loadDataObjects = function(itemsArray) {
    var loadedItems = [];
    var libraryItems = this;
    J.each(itemsArray, function(index, dataObject) {
        var itemKey = dataObject["itemKey"];
        var item = new Zotero.Item;
        item.loadObject(dataObject);
        libraryItems.itemObjects[itemKey] = item;
        loadedItems.push(item);
    });
    return loadedItems;
};

Zotero.Items.prototype.addItem = function(item) {
    this.itemObjects[item.itemKey] = item;
    if (this.owningLibrary) {
        item.associateWithLibrary(this.owningLibrary);
    }
    return this;
};

Zotero.Items.prototype.addItemsFromFeed = function(feed) {
    var items = this;
    var itemsAdded = [];
    feed.entries.each(function(index, entry) {
        var item = new Zotero.Item(J(entry));
        items.addItem(item);
        itemsAdded.push(item);
    });
    return itemsAdded;
};

Zotero.Items.prototype.keysNotInItems = function(keys) {
    var notPresent = [];
    J.each(keys, function(ind, val) {
        if (!this.itemObjects.hasOwnProperty(val)) {
            notPresent.push(val);
        }
    });
    return notPresent;
};

Zotero.Items.prototype.remoteDeleteItem = function(key) {
    var items = this;
    if (items.itemObjects.hasOwnProperty(key) && items.itemObjects[key].synced === true) {
        delete items.itemObjects[key];
        return true;
    }
    return false;
};

Zotero.Items.prototype.deleteItem = function(itemKey) {
    Z.debug("Zotero.Items.deleteItem", 3);
    var items = this;
    var item;
    if (!itemKey) return false;
    if (typeof itemKey == "string") {
        item = items.getItem(itemKey);
    } else if (typeof itemKey == "object" && itemKey.instance == "Zotero.Item") {
        item = itemKey;
    }
    var config = {
        target: "item",
        libraryType: items.owningLibrary.libraryType,
        libraryID: items.owningLibrary.libraryID,
        itemKey: item.itemKey
    };
    var requestUrl = Zotero.ajax.apiRequestString(config);
    var jqxhr = Zotero.ajaxRequest(requestUrl, "DELETE", {
        processData: false,
        headers: {
            "If-Unmodified-Since-Version": item.itemVersion
        }
    });
    Zotero.ajax.activeRequests.push(jqxhr);
    return jqxhr;
};

Zotero.Items.prototype.deleteItems = function(deleteItems) {
    var items = this;
    var deleteKeys = [];
    var i;
    for (i = 0; i < deleteItems.length; i++) {
        if (typeof deleteItems[i] == "string") {
            deleteKeys.push(deleteItems[i]);
        } else {
            deleteKeys.push(deleteItems[i].itemKey);
        }
    }
    var deleteKeysString = deleteKeys.join(",");
    var config = {
        target: "items",
        libraryType: items.owningLibrary.libraryType,
        libraryID: items.owningLibrary.libraryID,
        itemKey: deleteKeysString
    };
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var headers = {
        "Content-Type": "application/json"
    };
    if (items.itemsVersion !== 0) {
        headers["If-Unmodified-Since-Version"] = items.itemsVersion;
    }
    jqxhr = Zotero.ajaxRequest(requestUrl, "DELETE", {
        processData: false,
        headers: headers
    });
    return jqxhr;
};

Zotero.Items.prototype.trashItems = function(itemsArray) {
    var items = this;
    var i;
    for (i = 0; i < itemsArray.length; i++) {
        var item = itemsArray[i];
        item.set("deleted", 1);
    }
    return items.writeItems(itemsArray);
};

Zotero.Items.prototype.untrashItems = function(itemsArray) {
    var items = this;
    var i;
    for (i = 0; i < itemsArray.length; i++) {
        var item = itemsArray[i];
        item.set("deleted", 0);
    }
    return items.writeItems(itemsArray);
};

Zotero.Items.prototype.findItems = function(config) {
    var items = this;
    var matchingItems = [];
    J.each(items.itemObjects, function(i, item) {
        if (config.collectionKey && J.inArray(config.collectionKey, item.apiObj.collections === -1)) {
            return;
        }
        matchingItems.push(items.itemObjects[i]);
    });
    return matchingItems;
};

Zotero.Items.prototype.writeItems = function(itemsArray) {
    var items = this;
    var library = items.owningLibrary;
    var writeItemsDeferred = new J.Deferred;
    var returnItems = [];
    var writeItems = [];
    var item;
    for (var i = 0; i < itemsArray.length; i++) {
        item = itemsArray[i];
        var itemKey = item.get("itemKey");
        if (itemKey === "" || itemKey === null) {
            var newItemKey = Zotero.utils.getKey();
            item.set("itemKey", newItemKey);
            item.set("itemVersion", 0);
        }
        writeItems.push(item);
        if (item.hasOwnProperty("notes") && item.notes.length > 0) {
            for (var j = 0; j < item.notes.length; j++) {
                item.notes[j].set("parentItem", item.get("itemKey"));
            }
            writeItems = writeItems.concat(item.notes);
        }
        if (item.hasOwnProperty("attachments") && item.attachments.length > 0) {
            for (var k = 0; k < item.attachments.length; k++) {
                item.attachments[k].set("parentItem", item.get("itemKey"));
            }
            writeItems = writePassItems.concat(item.attachments);
        }
    }
    var config = {
        target: "items",
        libraryType: items.owningLibrary.libraryType,
        libraryID: items.owningLibrary.libraryID,
        content: "json"
    };
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var writeArray = [];
    for (i = 0; i < writeItems.length; i++) {
        writeArray.push(writeItems[i].writeApiObj());
    }
    requestData = JSON.stringify({
        items: writeArray
    });
    var writeItemsSuccessCallback = J.proxy(function(data, textStatus, jqXhr) {
        Z.debug("writeItem successCallback", 3);
        Z.debug("successCode: " + jqXhr.status, 4);
        Zotero.utils.updateObjectsFromWriteResponse(writeItems, jqXhr);
        returnItems = returnItems.concat(writeItems);
        writeItemsDeferred.resolve(returnItems);
        Zotero.trigger("itemsChanged", {
            library: library
        });
    }, this);
    Z.debug("items.itemsVersion: " + items.itemsVersion, 3);
    Z.debug("items.libraryVersion: " + items.libraryVersion, 3);
    jqxhr = Zotero.ajaxRequest(requestUrl, "POST", {
        data: requestData,
        processData: false,
        headers: {
            "If-Unmodified-Since-Version": items.itemsVersion,
            "Content-Type": "application/json"
        },
        success: writeItemsSuccessCallback
    });
    return writeItemsDeferred;
};

Zotero.Items.prototype.writeNewUnsyncedItems = function() {
    var items = this;
    var library = items.owningLibrary;
    var urlConfig = {
        target: "items",
        libraryType: library.libraryType,
        libraryID: library.libraryID
    };
    var writeUrl = Zotero.ajax.apiRequestUrl(urlConfig) + Zotero.ajax.apiQueryString(urlConfig);
    var writeData = {};
    writeData.items = [];
    for (var i = 0; i < items.newUnsyncedItems.length; i++) {
        writeData.items.push(items.newUnsyncedItems[i].apiObj);
    }
    var jqxhr = Zotero.ajaxRequest(writeUrl, "POST", {
        data: writeData
    });
    var processResponses = J.proxy(function(data, statusCode, jqxhr) {
        if (jqxhr.status !== 200) {} else {
            var updatedVersion = jqxhr.getResponseHeader("Last-Modified-Version");
            if (typeof data !== "object") {}
            var failedIndices = {};
            if (data.hasOwnProperty("success")) {
                J.each(data.success, function(key, val) {
                    var index = parseInt(key, 10);
                    var objectKey = val;
                    var item = items.newUnsyncedItems[index];
                    item.updateItemKey(objectKey);
                    item.itemVersion = updatedVersion;
                    item.synced = true;
                    items.addItem(item);
                });
            }
            if (data.hasOwnProperty("unchanged")) {
                J.each(data.unchanged, function(key, val) {});
            }
            if (data.hasOwnProperty("failed")) {
                J.each(data.failed, function(key, val) {
                    failedIndices[key] = true;
                    Z.debug("ItemWrite failed: " + val.key + " : http " + val.code + " : " + val.message);
                });
            }
            var newnewUnsyncedItems = [];
            J.each(items.newUnsyncedItems, function(i, v) {
                if (failedIndices.hasOwnProperty(i)) {
                    newnewUnsyncedItems.push(v);
                }
            });
            items.newUnsyncedItems = newnewUnsyncedItems;
        }
    }, this);
    jqxhr.done(processResponses);
    return jqxhr;
};

Zotero.Tags = function(feed) {
    this.instance = "Zotero.Tags";
    this.tagsVersion = 0;
    this.syncState = {
        earliestVersion: null,
        latestVersion: null
    };
    this.displayTagsArray = [];
    this.displayTagsUrl = "";
    this.tagObjects = {};
    this.tagsArray = [];
    this.loaded = false;
    if (typeof feed != "undefined") {
        this.addTagsFromFeed(feed);
    }
};

Zotero.Tags.prototype.dump = function() {
    var dump = {};
    dump.tagsVersion = this.tagsVersion;
    dump.tagsArray = [];
    for (var i = 0; i < this.tagsArray.length; i++) {
        dump.tagsArray.push(this.tagsArray[i].dump());
    }
    dump.displayTagsUrl = this.displayTagsUrl;
    return dump;
};

Zotero.Tags.prototype.loadDump = function(dump) {
    this.tagsVersion = dump.tagsVersion;
    this.displayTagsUrl = dump.displayTagsUrl;
    for (var i = 0; i < dump.tagsArray.length; i++) {
        var tag = new Zotero.Tag;
        tag.loadDump(dump.tagsArray[i]);
        this.addTag(tag);
    }
    this.updateSecondaryData();
    return this;
};

Zotero.Tags.prototype.addTag = function(tag) {
    this.tagObjects[tag.title] = tag;
    this.tagsArray.push(tag);
    if (this.owningLibrary) {
        tag.associateWithLibrary(this.owningLibrary);
    }
};

Zotero.Tags.prototype.removeTag = function(tagname) {
    var tags = this;
    delete tags.tagObjects[tagname];
    tags.updateSecondaryData();
};

Zotero.Tags.prototype.removeTags = function(tagnames) {
    var tags = this;
    J.each(tagnames, function(i, tagname) {
        delete tags.tagObjects[tagname];
    });
    tags.updateSecondaryData();
};

Zotero.Tags.prototype.plainTagsList = function(tagsArray) {
    Z.debug("Zotero.Tags.plainTagsList", 3);
    var plainList = [];
    J.each(tagsArray, function(index, element) {
        plainList.push(element.title);
    });
    return plainList;
};

Zotero.Tags.prototype.clear = function() {
    Z.debug("Zotero.Tags.clear", 3);
    this.tagsVersion = 0;
    this.syncState.earliestVersion = null;
    this.syncState.latestVersion = null;
    this.displayTagsArray = [];
    this.displayTagsUrl = "";
    this.tagObjects = {};
    this.tagsArray = [];
};

Zotero.Tags.prototype.updateSecondaryData = function() {
    Z.debug("Zotero.Tags.updateSecondaryData", 3);
    var tags = this;
    tags.tagsArray = [];
    J.each(tags.tagObjects, function(key, val) {
        tags.tagsArray.push(val);
    });
    tags.tagsArray.sort(Zotero.Library.prototype.sortByTitleCompare);
    var plainList = tags.plainTagsList(tags.tagsArray);
    plainList.sort(Zotero.Library.prototype.sortLower);
    tags.plainList = plainList;
};

Zotero.Tags.prototype.addTagsFromFeed = function(feed) {
    Z.debug("Zotero.Tags.addTagsFromFeed", 3);
    var tags = this;
    var tagsAdded = [];
    feed.entries.each(function(index, entry) {
        var tag = new Zotero.Tag(J(entry));
        tags.addTag(tag);
        tagsAdded.push(tag);
    });
    return tagsAdded;
};

Zotero.Groups = function(feed) {
    this.instance = "Zotero.Groups";
    this.groupsArray = [];
};

Zotero.Groups.prototype.sortByTitleCompare = function(a, b) {
    Z.debug("compare by key: " + a + " < " + b + " ?", 4);
    if (a.title.toLowerCase() == b.title.toLowerCase()) {
        return 0;
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
    }
    return 1;
};

Zotero.Groups.prototype.fetchGroup = function(groupID, apikey) {};

Zotero.Groups.prototype.addGroupsFromFeed = function(groupsFeed) {
    var groups = this;
    var groupsAdded = [];
    groupsFeed.entries.each(function(index, entry) {
        var group = new Zotero.Group(J(entry));
        groups.groupsArray.push(group);
        groupsAdded.push(group);
    });
    return groupsAdded;
};

Zotero.Groups.prototype.fetchUserGroups = function(userID, apikey) {
    var groups = this;
    var deferred = new J.Deferred;
    var aparams = {
        target: "userGroups",
        libraryType: "user",
        libraryID: userID,
        content: "json",
        order: "title"
    };
    if (apikey) {
        aparams["key"] = apikey;
    } else {
        aparams["key"] = groups.owningLibrary._apiKey;
    }
    var requestUrl = Zotero.ajax.apiRequestUrl(aparams) + Zotero.ajax.apiQueryString(aparams);
    var callback = J.proxy(function(data, textStatus, xhr) {
        Z.debug("fetchUserGroups proxied callback", 3);
        var groupsfeed = new Zotero.Feed(data, xhr);
        fetchedGroups = groups.addGroupsFromFeed(groupsfeed);
        deferred.resolve(fetchedGroups);
    }, this);
    jqxhr = Zotero.ajaxRequest(requestUrl, "GET");
    jqxhr.done(callback);
    return deferred;
};

Zotero.Searches = function() {
    this.instance = "Zotero.Searches";
    this.searchObjects = {};
    this.syncState = {
        earliestVersion: null,
        latestVersion: null
    };
};

Zotero.Deleted = function(data) {
    this.instance = "Zotero.Deleted";
    if (typeof data === "string") {
        this.deletedData = JSON.parse(data);
    } else {
        this.deletedData = data;
    }
    this.deletedVersion = 0;
    this.newerVersion = 0;
};

Zotero.Collection = function(entryEl) {
    this.instance = "Zotero.Collection";
    this.libraryUrlIdentifier = "";
    this.itemKeys = false;
    this.collectionVersion = 0;
    this.synced = false;
    this.pristine = null;
    this.apiObj = {};
    this.children = [];
    if (typeof entryEl != "undefined") {
        this.parseXmlCollection(entryEl);
    }
};

Zotero.Collection.prototype = new Zotero.Entry;

Zotero.Collection.prototype.instance = "Zotero.Collection";

Zotero.Collection.prototype.updateObjectKey = function(objectKey) {
    return this.updateCollectionKey(objectKey);
};

Zotero.Collection.prototype.updateCollectionKey = function(collectionKey) {
    var collection = this;
    collection.collectionKey = collectionKey;
    collection.apiObj.collectionKey = collectionKey;
    return collection;
};

Zotero.Collection.prototype.dump = function() {
    Zotero.debug("Zotero.Collection.dump", 4);
    var collection = this;
    var dump = collection.dumpEntry();
    var dumpProperties = [ "apiObj", "pristine", "collectionKey", "collectionVersion", "synced", "numItems", "numCollections", "topLevel", "websiteCollectionLink", "hasChildren", "itemKeys" ];
    for (var i = 0; i < dumpProperties.length; i++) {
        dump[dumpProperties[i]] = collection[dumpProperties[i]];
    }
    return dump;
};

Zotero.Collection.prototype.loadDump = function(dump) {
    Zotero.debug("Zotero.Collection.loaddump", 4);
    var collection = this;
    collection.loadDumpEntry(dump);
    var dumpProperties = [ "apiObj", "pristine", "collectionKey", "collectionVersion", "synced", "numItems", "numCollections", "topLevel", "websiteCollectionLink", "hasChildren", "itemKeys" ];
    for (var i = 0; i < dumpProperties.length; i++) {
        collection[dumpProperties[i]] = dump[dumpProperties[i]];
    }
    collection.initSecondaryData();
    return collection;
};

Zotero.Collection.prototype.parseXmlCollection = function(cel) {
    this.parseXmlEntry(cel);
    this["name"] = cel.find("title").text();
    this.collectionKey = cel.find("zapi\\:key, key").text();
    this.numItems = parseInt(cel.find("zapi\\:numItems, numItems").text(), 10);
    this.numCollections = parseInt(cel.find("zapi\\:numCollections, numCollections").text(), 10);
    this.dateAdded = this.published;
    this.dateModified = this.updated;
    var linksArray = [];
    cel.find("link").each(function(index, element) {
        var link = J(element);
        linksArray.push({
            rel: link.attr("rel"),
            type: link.attr("type"),
            href: link.attr("href")
        });
    });
    this.parent = false;
    this.topLevel = true;
    var collection = this;
    var contentEl = cel.find("content").first();
    if (contentEl) {
        this.pristine = JSON.parse(cel.find("content").first().text());
        this.apiObj = JSON.parse(cel.find("content").first().text());
        this.synced = true;
    }
    this.initSecondaryData();
};

Zotero.Collection.prototype.initSecondaryData = function() {
    var collection = this;
    collection["name"] = collection.apiObj["name"];
    collection["parentCollection"] = collection.apiObj["parentCollection"];
    if (collection["parentCollection"]) {
        collection.topLevel = false;
    }
    collection.collectionKey = collection.apiObj.collectionKey;
    collection.collectionVersion = collection.apiObj.collectionVersion;
    collection.relations = collection.apiObj.relations;
    collection.websiteCollectionLink = Zotero.config.baseWebsiteUrl + "/" + collection.libraryUrlIdentifier + "/items/collection/" + collection.collectionKey;
    collection.hasChildren = collection.numCollections ? true : false;
};

Zotero.Collection.prototype.nestCollection = function(collectionList) {
    Z.debug("Zotero.Collection.nestCollection", 4);
    if (this.parentCollection !== false) {
        var parentKey = this.parentCollection;
        if (typeof collectionList[parentKey] !== "undefined") {
            var parentOb = collectionList[parentKey];
            parentOb.children.push(this);
            parentOb.hasChildren = true;
            this.topLevel = false;
            return true;
        }
    }
    return false;
};

Zotero.Collection.prototype.addItems = function(itemKeys) {
    Z.debug("Zotero.Collection.addItems", 3);
    Z.debug(itemKeys, 3);
    var config = {
        target: "items",
        libraryType: this.libraryType,
        libraryID: this.libraryID,
        collectionKey: this.collectionKey,
        content: "json"
    };
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var requestData = itemKeys.join(" ");
    var jqxhr = Zotero.ajaxRequest(requestUrl, "POST", {
        data: requestData,
        processData: false
    });
    Zotero.ajax.activeRequests.push(jqxhr);
    return jqxhr;
};

Zotero.Collection.prototype.getMemberItemKeys = function() {
    Z.debug("Zotero.Collection.getMemberItemKeys", 3);
    Z.debug(this.itemKeys, 3);
    var config = {
        target: "items",
        libraryType: this.libraryType,
        libraryID: this.libraryID,
        collectionKey: this.collectionKey,
        format: "keys"
    };
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var deferred = new J.Deferred;
    var jqxhr = Zotero.ajaxRequest(requestUrl, "GET", {
        processData: false
    });
    jqxhr.done(J.proxy(function(data, textStatus, XMLHttpRequest) {
        Z.debug("getMemberItemKeys proxied callback", 3);
        var c = this;
        var result = data;
        var keys = J.trim(result).split(/[\s]+/);
        c.itemKeys = keys;
        deferred.resolve(keys);
    }, this));
    Zotero.ajax.activeRequests.push(jqxhr);
    return deferred;
};

Zotero.Collection.prototype.removeItem = function(itemKey) {
    var config = {
        target: "item",
        libraryType: this.libraryType,
        libraryID: this.libraryID,
        collectionKey: this.collectionKey,
        itemKey: itemKey
    };
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var jqxhr = Zotero.ajaxRequest(requestUrl, "DELETE", {
        processData: false,
        cache: false
    });
    Zotero.ajax.activeRequests.push(jqxhr);
    return jqxhr;
};

Zotero.Collection.prototype.update = function(name, parentKey) {
    var collection = this;
    if (!parentKey) parentKey = false;
    var config = {
        target: "collection",
        libraryType: collection.libraryType,
        libraryID: collection.libraryID,
        collectionKey: collection.collectionKey
    };
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var writeObject = collection.writeApiObj();
    var requestData = JSON.stringify(writeObject);
    var jqxhr = Zotero.ajaxRequest(requestUrl, "PUT", {
        data: requestData,
        processData: false,
        headers: {
            "If-Unmodified-Since-Version": collection.collectionVersion
        },
        cache: false
    });
    Zotero.ajax.activeRequests.push(jqxhr);
    return jqxhr;
};

Zotero.Collection.prototype.writeApiObj = function() {
    var collection = this;
    var apiObj = collection.apiObj;
    apiObj = J.extend(apiObj, {
        name: collection.name,
        collectionKey: collection.collectionKey,
        collectionVersion: collection.collectionVersion,
        parentCollection: collection.parentCollection,
        relations: collection.relations
    });
    return apiObj;
};

Zotero.Collection.prototype.remove = function() {
    Z.debug("Zotero.Collection.delete", 3);
    var collection = this;
    var config = {
        target: "collection",
        libraryType: collection.libraryType,
        libraryID: collection.libraryID,
        collectionKey: collection.collectionKey
    };
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var jqxhr = Zotero.ajaxRequest(requestUrl, "DELETE", {
        processData: false,
        headers: {
            "If-Unmodified-Since-Version": collection.collectionVersion
        },
        cache: false
    });
    Zotero.ajax.activeRequests.push(jqxhr);
    return jqxhr;
};

Zotero.Collection.prototype.get = function(key) {
    var collection = this;
    switch (key) {
      case "title":
      case "name":
        return collection.title;
      case "collectionKey":
      case "key":
        return collection.collectionKey;
      case "collectionVersion":
      case "version":
        return collection.collectionVersion;
      case "parentCollection":
      case "parentCollectionKey":
        return collection.parentCollectionKey;
    }
    if (key in collection.apiObj) {
        return collection.apiObj[key];
    } else if (collection.hasOwnProperty(key)) {
        return collection[key];
    }
    return null;
};

Zotero.Collection.prototype.set = function(key, val) {
    var collection = self;
    switch (key) {
      case "title":
      case "name":
        collection.name = val;
        collection.apiObject["name"] = val;
        break;
      case "collectionKey":
      case "key":
        collection.collectionKey = val;
        collection.apiObject["collectionKey"] = val;
        break;
      case "parentCollection":
      case "parentCollectionKey":
        collection.parentCollectionKey = val;
        collection.apiObject["parentCollection"] = val;
        break;
      case "collectionVersion":
      case "version":
        collection.collectionVersion = val;
        collection.apiObject["collectionVersion"] = val;
        break;
    }
    if (array_key_exists(key, collection.apiObject)) {
        collection.apiObject[key] = val;
    }
    if (collection.hasOwnProperty(key)) {
        collection.key = val;
    }
};

Zotero.Item = function(entryEl) {
    this.instance = "Zotero.Item";
    this.itemVersion = 0;
    this.itemKey = "";
    this.synced = false;
    this.apiObj = {};
    this.pristine = null;
    this.dataFields = {};
    this.childItemKeys = [];
    this.writeErrors = [];
    this.itemContentTypes = [];
    this.itemContentBlocks = {};
    this.notes = [];
    this.tagstrings = [];
    if (typeof entryEl != "undefined") {
        this.parseXmlItem(entryEl);
    }
};

Zotero.Item.prototype = new Zotero.Entry;

Zotero.Item.prototype.dump = function() {
    var item = this;
    var dump = item.dumpEntry();
    var dumpProperties = [ "apiObj", "pristine", "itemKey", "itemVersion", "synced", "creatorSummary", "year", "parentItemKey", "numChildren" ];
    for (var i = 0; i < dumpProperties.length; i++) {
        dump[dumpProperties[i]] = item[dumpProperties[i]];
    }
    dump["tagstrings"] = item.tagstrings;
    return dump;
};

Zotero.Item.prototype.loadDump = function(dump) {
    var item = this;
    item.loadDumpEntry(dump);
    var dumpProperties = [ "apiObj", "pristine", "itemKey", "itemVersion", "synced", "creatorSummary", "year", "parentItemKey", "numChildren" ];
    for (var i = 0; i < dumpProperties.length; i++) {
        item[dumpProperties[i]] = dump[dumpProperties[i]];
    }
    item.numTags = item.apiObj.tags.length;
    item.initSecondaryData();
    return item;
};

Zotero.Item.prototype.parseXmlItem = function(iel) {
    var item = this;
    item.parseXmlEntry(iel);
    item.itemKey = iel.find("zapi\\:key, key").text();
    item.itemType = iel.find("zapi\\:itemType, itemType").text();
    item.creatorSummary = iel.find("zapi\\:creatorSummary, creatorSummary").text();
    item.year = iel.find("zapi\\:year, year").text();
    item.numChildren = parseInt(iel.find("zapi\\:numChildren, numChildren").text(), 10);
    item.numTags = parseInt(iel.find("zapi\\:numTags, numChildren").text(), 10);
    if (isNaN(item.numChildren)) {
        item.numChildren = 0;
    }
    item.parentItemKey = false;
    var contentEl = iel.children("content");
    var subcontents = iel.find("zapi\\:subcontent, subcontent");
    if (subcontents.size() > 0) {
        for (var i = 0; i < subcontents.size(); i++) {
            var sc = J(subcontents.get(i));
            item.parseContentBlock(sc);
        }
    } else {
        item.parseContentBlock(contentEl);
    }
};

Zotero.Item.prototype.parseContentBlock = function(contentEl) {
    var item = this;
    var zapiType = contentEl.attr("zapi:type");
    var contentText = contentEl.text();
    item.itemContentTypes.push(zapiType);
    item.itemContentBlocks[zapiType] = contentText;
    switch (zapiType) {
      case "json":
        item.parseJsonItemContent(contentEl);
        break;
      case "bib":
        item.bibContent = contentText;
        item.parsedBibContent = true;
        break;
      case "html":
        item.parseXmlItemContent(contentEl);
        break;
    }
};

Zotero.Item.prototype.parseXmlItemContent = function(cel) {
    var item = this;
    var dataFields = {};
    cel.find("div > table").children("tr").each(function() {
        dataFields[J(this).attr("class")] = J(this).children("td").text();
    });
    item.dataFields = dataFields;
};

Zotero.Item.prototype.parseJsonItemContent = function(cel) {
    var item = this;
    if (typeof cel === "string") {
        item.apiObj = JSON.parse(cel);
        item.pristine = JSON.parse(cel);
    } else {
        item.apiObj = JSON.parse(cel.text());
        item.pristine = JSON.parse(cel.text());
    }
    item.initSecondaryData();
};

Zotero.Item.prototype.initSecondaryData = function() {
    var item = this;
    item.itemVersion = item.apiObj.itemVersion;
    item.parentItemKey = item.apiObj.parentItem;
    if (item.apiObj.itemType == "attachment") {
        item.mimeType = item.apiObj.contentType;
        item.translatedMimeType = Zotero.utils.translateMimeType(item.mimeType);
    }
    if ("linkMode" in item.apiObj) {
        item.linkMode = item.apiObj.linkMode;
    }
    item.creators = item.apiObj.creators;
    item.attachmentDownloadUrl = Zotero.url.attachmentDownloadUrl(item);
    item.synced = true;
    var tagstrings = [];
    for (i = 0; i < item.apiObj.tags.length; i++) {
        tagstrings.push(item.apiObj.tags[i].tag);
    }
    item.tagstrings = tagstrings;
};

Zotero.Item.prototype.initEmpty = function(itemType, linkMode) {
    var item = this;
    var deferred = new J.Deferred;
    var d = item.getItemTemplate(itemType, linkMode);
    var callback = J.proxy(function(template) {
        item.initEmptyFromTemplate(template);
        deferred.resolve(item);
    }, this);
    d.done(callback);
    return deferred;
};

Zotero.Item.prototype.initEmptyNote = function() {
    var item = this;
    item.itemVersion = 0;
    var noteTemplate = {
        itemType: "note",
        note: "",
        tags: [],
        collections: [],
        relations: {}
    };
    item.initEmptyFromTemplate(noteTemplate);
    return item;
};

Zotero.Item.prototype.initEmptyFromTemplate = function(template) {
    var item = this;
    item.itemVersion = 0;
    item.itemType = template.itemType;
    item.itemKey = "";
    item.pristine = J.extend({}, template);
    item.apiObj = template;
    return item;
};

Zotero.Item.prototype.updateObjectKey = function(objectKey) {
    return this.updateItemKey(objectKey);
};

Zotero.Item.prototype.updateItemKey = function(itemKey) {
    var item = this;
    item.itemKey = itemKey;
    item.apiObj.itemKey = itemKey;
    item.pristine.itemKey = itemKey;
    return item;
};

Zotero.Item.prototype.writeItem = function() {
    var item = this;
    if (!item.owningLibrary) {
        throw "Item must be associated with a library";
    }
    return item.owningLibrary.items.writeItems([ item ]);
};

Zotero.Item.prototype.writeApiObj = function() {
    var item = this;
    if (item.apiObj.creators) {
        var newCreatorsArray = item.apiObj.creators.filter(function(c) {
            if (c.name || c.firstName || c.lastName) {
                return true;
            }
            return false;
        });
        item.apiObj.creators = newCreatorsArray;
    }
    var writeApiObj = J.extend({}, item.pristine, item.apiObj);
    return writeApiObj;
};

Zotero.Item.prototype.createChildNotes = function(notes) {
    var item = this;
    var childItems = [];
    var childItemDeferreds = [];
    var initDone = J.proxy(function(templateItem) {
        childItems.push(templateItem);
    }, this);
    J.each(notes, function(ind, note) {
        var childItem = new Zotero.Item;
        var d = childItem.initEmpty("note");
        d.done(J.proxy(function(noteItem) {
            noteItem.set("note", note.note);
            noteItem.set("parentItem", item.itemKey);
            childItems.push(noteItem);
        }), this);
        childItemDeferreds.push(d);
    });
    J.when.apply(this, childItemDeferreds).then(J.proxy(function() {
        item.owningLibrary.writeItems(childItems);
    }), this);
};

Zotero.Item.prototype.writePatch = function() {};

Zotero.Item.prototype.getChildren = function(library) {
    var item = this;
    Z.debug("Zotero.Item.getChildren", 3);
    var deferred = J.Deferred();
    if (!item.numChildren) {
        deferred.resolve([]);
        return deferred;
    }
    var config = {
        target: "children",
        libraryType: item.libraryType,
        libraryID: item.libraryID,
        itemKey: item.itemKey,
        content: "json"
    };
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var callback = J.proxy(function(data, textStatus, jqxhr) {
        Z.debug("getChildren proxied callback", 4);
        var itemfeed = new Zotero.Feed(data, jqxhr);
        var items = library.items;
        var childItems = items.addItemsFromFeed(itemfeed);
        for (var i = childItems.length - 1; i >= 0; i--) {
            childItems[i].associateWithLibrary(library);
        }
        deferred.resolve(childItems);
    }, this);
    var jqxhr = Zotero.ajaxRequest(requestUrl);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    });
    Zotero.ajax.activeRequests.push(jqxhr);
    return deferred;
};

Zotero.Item.prototype.getItemTypes = function(locale) {
    Z.debug("Zotero.Item.prototype.getItemTypes", 3);
    if (!locale) {
        locale = "en-US";
    }
    locale = "en-US";
    var itemTypes = Zotero.cache.load({
        locale: locale,
        target: "itemTypes"
    });
    if (itemTypes) {
        Z.debug("have itemTypes in localStorage", 3);
        Zotero.Item.prototype.itemTypes = itemTypes;
        return;
    }
    var query = Zotero.ajax.apiQueryString({
        locale: locale
    });
    var url = Zotero.config.baseApiUrl + "/itemTypes" + query;
    J.getJSON(Zotero.ajax.proxyWrapper(url, "GET"), {}, function(data, textStatus, XMLHttpRequest) {
        Z.debug("got itemTypes response", 3);
        Z.debug(data, 4);
        Zotero.Item.prototype.itemTypes = data;
        Zotero.cache.save({
            locale: locale,
            target: "itemTypes"
        }, Zotero.Item.prototype.itemTypes);
    });
};

Zotero.Item.prototype.getItemFields = function(locale) {
    Z.debug("Zotero.Item.prototype.getItemFields", 3);
    if (!locale) {
        locale = "en-US";
    }
    locale = "en-US";
    var itemFields = Zotero.cache.load({
        locale: locale,
        target: "itemFields"
    });
    if (itemFields) {
        Z.debug("have itemFields in localStorage", 3);
        Zotero.Item.prototype.itemFields = itemFields;
        J.each(Zotero.Item.prototype.itemFields, function(ind, val) {
            Zotero.localizations.fieldMap[val.field] = val.localized;
        });
        return;
    }
    var query = Zotero.ajax.apiQueryString({
        locale: locale
    });
    var requestUrl = Zotero.config.baseApiUrl + "/itemFields" + query;
    J.getJSON(Zotero.ajax.proxyWrapper(requestUrl), {}, function(data, textStatus, XMLHttpRequest) {
        Z.debug("got itemTypes response", 4);
        Zotero.Item.prototype.itemFields = data;
        Zotero.cache.save({
            locale: locale,
            target: "itemFields"
        }, data);
        J.each(Zotero.Item.prototype.itemFields, function(ind, val) {
            Zotero.localizations.fieldMap[val.field] = val.localized;
        });
    });
};

Zotero.Item.prototype.getItemTemplate = function(itemType, linkMode) {
    Z.debug("Zotero.Item.prototype.getItemTemplate", 3);
    var deferred = new J.Deferred;
    if (typeof itemType == "undefined") itemType = "document";
    if (itemType == "attachment" && typeof linkMode == "undefined") {
        throw "attachment template requested with no linkMode";
    }
    if (typeof linkMode == "undefined") {
        linkMode = "";
    }
    var query = Zotero.ajax.apiQueryString({
        itemType: itemType,
        linkMode: linkMode
    });
    var requestUrl = Zotero.config.baseApiUrl + "/items/new" + query;
    var cacheConfig = {
        itemType: itemType,
        target: "itemTemplate"
    };
    var itemTemplate = Zotero.cache.load(cacheConfig);
    if (itemTemplate) {
        Z.debug("have itemTemplate in localStorage", 3);
        var template = itemTemplate;
        deferred.resolve(template);
        return deferred;
    }
    var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
        Z.debug("got itemTemplate response", 3);
        Z.debug(data, 4);
        Zotero.cache.save(cacheConfig, data);
        deferred.resolve(data);
    }, this);
    J.getJSON(Zotero.ajax.proxyWrapper(requestUrl), {}, callback);
    return deferred;
};

Zotero.Item.prototype.getUploadAuthorization = function(fileinfo) {
    Z.debug("Zotero.Item.getUploadAuthorization", 3);
    var item = this;
    var config = {
        target: "item",
        targetModifier: "file",
        libraryType: item.libraryType,
        libraryID: item.libraryID,
        itemKey: item.itemKey
    };
    var fileconfig = J.extend({}, config);
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var headers = {};
    var oldmd5 = item.get("md5");
    if (oldmd5) {
        headers["If-Match"] = oldmd5;
    } else {
        headers["If-None-Match"] = "*";
    }
    var jqxhr = Zotero.ajaxRequest(requestUrl, "POST", {
        processData: true,
        data: fileinfo,
        headers: headers
    });
    Z.debug("returning jqxhr from getUploadAuthorization", 4);
    return jqxhr;
};

Zotero.Item.prototype.registerUpload = function(uploadKey) {
    Z.debug("Zotero.Item.registerUpload", 3);
    var item = this;
    var config = {
        target: "item",
        targetModifier: "file",
        libraryType: item.libraryType,
        libraryID: item.libraryID,
        itemKey: item.itemKey
    };
    var requestUrl = Zotero.ajax.apiRequestUrl(config) + Zotero.ajax.apiQueryString(config);
    var headers = {};
    var oldmd5 = item.get("md5");
    if (oldmd5) {
        headers["If-Match"] = oldmd5;
    } else {
        headers["If-None-Match"] = "*";
    }
    var jqxhr = Zotero.ajaxRequest(requestUrl, "POST", {
        processData: true,
        data: {
            upload: uploadKey
        },
        headers: headers
    });
    return jqxhr;
};

Zotero.Item.prototype.fullUpload = function(file) {};

Zotero.Item.prototype.creatorTypes = {};

Zotero.Item.prototype.getCreatorTypes = function(itemType) {
    Z.debug("Zotero.Item.prototype.getCreatorTypes: " + itemType, 3);
    if (!itemType) {
        itemType = "document";
    }
    var deferred = new J.Deferred;
    var creatorTypes = Zotero.cache.load({
        target: "creatorTypes"
    });
    if (creatorTypes) {
        Z.debug("have creatorTypes in localStorage", 3);
        Zotero.Item.prototype.creatorTypes = creatorTypes;
    }
    if (Zotero.Item.prototype.creatorTypes[itemType]) {
        Z.debug("creatorTypes of requested itemType available in localStorage", 3);
        Z.debug(Zotero.Item.prototype.creatorTypes, 4);
        deferred.resolve(Zotero.Item.prototype.creatorTypes[itemType]);
    } else {
        Z.debug("sending request for creatorTypes", 3);
        var query = Zotero.ajax.apiQueryString({
            itemType: itemType
        });
        var requestUrl = Zotero.config.baseApiUrl + "/itemTypeCreatorTypes" + query;
        var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
            Z.debug("got creatorTypes response", 4);
            Zotero.Item.prototype.creatorTypes[itemType] = data;
            Zotero.cache.save({
                target: "creatorTypes"
            }, Zotero.Item.prototype.creatorTypes);
            deferred.resolve(Zotero.Item.prototype.creatorTypes[itemType]);
        }, this);
        J.getJSON(Zotero.ajax.proxyWrapper(requestUrl), {}, callback);
    }
    return deferred;
};

Zotero.Item.prototype.getCreatorFields = function(locale) {
    Z.debug("Zotero.Item.prototype.getCreatorFields", 3);
    var creatorFields = Zotero.cache.load({
        target: "creatorFields"
    });
    if (creatorFields) {
        Z.debug("have creatorFields in localStorage", 3);
        Zotero.Item.prototype.creatorFields = creatorFields;
        return;
    }
    var requestUrl = Zotero.config.baseApiUrl + "/creatorFields";
    J.getJSON(Zotero.ajax.proxyWrapper(requestUrl), {}, function(data, textStatus, XMLHttpRequest) {
        Z.debug("got itemTypes response", 4);
        Zotero.Item.prototype.creatorFields = data;
        Zotero.cache.save({
            target: "creatorFields"
        }, data);
    });
};

Zotero.Item.prototype.addItemTypes = function(itemTypes, locale) {};

Zotero.Item.prototype.addItemFields = function(itemType, itemFields) {};

Zotero.Item.prototype.addCreatorTypes = function(itemType, creatorTypes) {};

Zotero.Item.prototype.addCreatorFields = function(itemType, creatorFields) {};

Zotero.Item.prototype.addItemTemplates = function(templates) {};

Zotero.Item.prototype.itemTypeImageClass = function() {
    var item = this;
    if (item.itemType == "attachment") {
        switch (item.linkMode) {
          case "imported_file":
            if (item.translatedMimeType == "pdf") {
                return item.itemTypeImageSrc["attachmentPdf"];
            }
            return item.itemTypeImageSrc["attachmentFile"];
          case "imported_url":
            if (item.translatedMimeType == "pdf") {
                return item.itemTypeImageSrc["attachmentPdf"];
            }
            return item.itemTypeImageSrc["attachmentSnapshot"];
          case "linked_file":
            return item.itemTypeImageSrc["attachmentLink"];
          case "linked_url":
            return item.itemTypeImageSrc["attachmentWeblink"];
          default:
            return item.itemTypeImageSrc["attachment"];
        }
    } else {
        return item.itemType;
    }
};

Zotero.Item.prototype.get = function(key) {
    var item = this;
    switch (key) {
      case "title":
        return item.title;
      case "creatorSummary":
        return item.creatorSummary;
      case "year":
        return item.year;
    }
    if (key in item.apiObj) {
        return item.apiObj[key];
    } else if (key in item.dataFields) {
        return item.dataFields[key];
    } else if (item.hasOwnProperty(key)) {
        return item[key];
    }
    return null;
};

Zotero.Item.prototype.set = function(key, val) {
    var item = this;
    if (key in item.apiObj) {
        item.apiObj[key] = val;
    }
    switch (key) {
      case "itemKey":
        item.itemKey = val;
        item.apiObj.itemKey = val;
        break;
      case "itemVersion":
        item.itemVersion = val;
        item.apiObj.itemVersion = val;
        break;
      case "title":
        item.title = val;
        break;
      case "itemType":
        item.itemType = val;
        break;
      case "linkMode":
        break;
      case "deleted":
        item.apiObj.deleted = val;
        break;
      case "parentItem":
      case "parentItemKey":
        if (val === "") {
            val = false;
        }
        item.parentItemKey = val;
        item.apiObj.parentItem = val;
        break;
    }
    return item;
};

Zotero.Item.prototype.setParent = function(parentItemKey) {
    var item = this;
    if (typeof parentItemKey != "string" && parentItemKey.hasOwnProperty("instance") && parentItemKey.instance == "Zotero.Item") {
        parentItemKey = parentItemKey.itemKey;
    }
    item.set("parentItem", parentItemKey);
    return item;
};

Zotero.Item.prototype.addToCollection = function(collectionKey) {
    var item = this;
    if (typeof collectionKey != "string") {
        if (collectionKey.hasOwnProperty("collectionKey")) {
            collectionKey = collectionKey.collectionKey;
        }
    }
    if (J.inArray(collectionKey, item.apiObj.collections) === -1) {
        item.apiObj.collections.push(collectionKey);
    }
    return;
};

Zotero.Item.prototype.removeFromCollection = function(collectionKey) {
    var item = this;
    if (typeof collectionKey != "string") {
        if (collectionKey.hasOwnProperty("collectionKey")) {
            collectionKey = collectionKey.collectionKey;
        }
    }
    var index = J.inArray(collectionKey, item.apiObj.collections);
    if (index != -1) {
        item.apiObj.collections.splice(index, 1);
    }
    return;
};

Zotero.Item.prototype.uploadChildAttachment = function(childItem, fileInfo, fileblob, progressCallback) {
    var item = this;
    var uploadChildAttachmentD = new J.Deferred;
    if (!item.owningLibrary) {
        throw "Item must be associated with a library";
    }
    childItem.set("parentItem", item.itemKey);
    childItem.associateWithLibrary(item.owningLibrary);
    var childWriteD = childItem.writeItem();
    childWriteD.done(J.proxy(function(data, textStatus, jqxhr) {
        item.numChildren++;
        var childUploadD = childItem.uploadFile(fileInfo, fileblob, progressCallback);
        childUploadD.done(J.proxy(function(success) {
            uploadChildAttachmentD.resolve(success);
        }, this)).fail(J.proxy(function(failure) {
            uploadChildAttachmentD.reject(failure);
        }, this));
    })).fail(function(jqxhr, textStatus, errorThrown) {
        uploadChildAttachmentD.reject({
            message: "Failure during attachmentItem write.",
            code: jqxhr.status,
            serverMessage: jqxhr.responseText
        });
    });
    return uploadChildAttachmentD;
};

Zotero.Item.prototype.uploadFile = function(fileInfo, fileblob, progressCallback) {
    var item = this;
    var uploadFileD = new J.Deferred;
    var uploadAuthFileData = {
        md5: fileInfo.md5,
        filename: item.get("title"),
        filesize: fileInfo.filesize,
        mtime: fileInfo.mtime,
        contentType: fileInfo.contentType,
        params: 1
    };
    if (fileInfo.contentType === "") {
        uploadAuthFileData.contentType = "application/octet-stream";
    }
    var uploadAuth = item.getUploadAuthorization(uploadAuthFileData);
    uploadAuth.done(J.proxy(function(data, textStatus, jqxhr) {
        Z.debug("uploadAuth callback", 3);
        var upAuthOb;
        Z.debug(data, 4);
        if (typeof data == "string") {
            upAuthOb = JSON.parse(data);
        } else {
            upAuthOb = data;
        }
        if (upAuthOb.exists == 1) {
            uploadFileD.resolve({
                message: "File Exists"
            });
        } else {
            var fullUpload = Zotero.file.uploadFile(upAuthOb, fileblob);
            fullUpload.onreadystatechange = J.proxy(function(e) {
                Z.debug("fullupload readyState: " + fullUpload.readyState, 3);
                Z.debug("fullupload status: " + fullUpload.status, 3);
                if (fullUpload.readyState == 4) {
                    if (fullUpload.status == 201 || Zotero.config.CORSallowed === false) {
                        var regUpload = item.registerUpload(upAuthOb.uploadKey);
                        regUpload.done(function() {
                            uploadFileD.resolve({
                                message: "Upload Successful"
                            });
                        }).fail(function(jqxhr, textStatus, e) {
                            var failure = {
                                message: "Failed registering upload."
                            };
                            if (jqxhr.status == 412) {
                                failure.code = 412;
                                failure.serverMessage = jqxhr.responseText;
                            }
                            uploadFileD.reject(failure);
                        });
                    } else {
                        uploadFileD.reject({
                            message: "Failure uploading file.",
                            code: jqxhr.status,
                            serverMessage: jqxhr.responseText
                        });
                    }
                }
            }, this);
            fullUpload.upload.onprogress = function(e) {
                if (typeof progressCallback == "function") {
                    progressCallback(e);
                }
            };
        }
    }, this)).fail(function(jqxhr, textStatus, errorThrown) {
        uploadFileD.reject({
            message: "Failure during upload authorization.",
            code: jqxhr.status,
            serverMessage: jqxhr.responseText
        });
    });
    return uploadFileD;
};

Zotero.Item.prototype.cslItem = function() {
    var zoteroItem = this;
    var itemType = zoteroItem.get("itemType");
    var cslType = zoteroItem.cslTypeMap.hasOwnProperty(itemType) ? zoteroItem.cslTypeMap[itemType] : false;
    if (!cslType) cslType = "article";
    var ignoreURL = (zoteroItem.get("accessDate") || zoteroItem.get("url")) && itemType in {
        journalArticle: 1,
        newspaperArticle: 1,
        magazineArticle: 1
    } && zoteroItem.get("pages") && zoteroItem.citePaperJournalArticleURL;
    cslItem = {
        type: cslType
    };
    if (zoteroItem.owningLibrary) {
        cslItem["id"] = zoteroItem.owningLibrary.libraryID + "/" + zoteroItem.get("itemKey");
    } else {
        cslItem["id"] = Zotero.utils.getKey();
    }
    J.each(zoteroItem.cslFieldMap, function(variable, fields) {
        if (variable == "URL" && ignoreURL) return;
        J.each(fields, function(ind, field) {
            var value = zoteroItem.get(field);
            if (value) {
                cslItem[variable] = value;
            }
        });
    });
    var creators = zoteroItem.get("creators");
    J.each(creators, function(ind, creator) {
        var creatorType = creator["creatorType"];
        if (!creatorType) return;
        var nameObj;
        if (creator.hasOwnProperty("name")) {
            nameObj = {
                literal: creator["name"]
            };
        } else {
            nameObj = {
                family: creator["lastName"],
                given: creator["firstName"]
            };
        }
        if (cslItem.hasOwnProperty(creatorType)) {
            cslItem[creatorType].push(nameObj);
        } else {
            cslItem[creatorType] = [ nameObj ];
        }
    });
    J.each(zoteroItem.cslDateMap, function(key, val) {
        var date = zoteroItem.get(val);
        if (date) {
            cslItem[key] = {
                raw: date
            };
        }
    });
    return cslItem;
};

Zotero.Item.prototype.fieldMap = {
    itemType: "Type",
    title: "Title",
    dateAdded: "Date Added",
    dateModified: "Date Modified",
    source: "Source",
    notes: "Notes",
    tags: "Tags",
    attachments: "Attachments",
    related: "Related",
    url: "URL",
    rights: "Rights",
    series: "Series",
    volume: "Volume",
    issue: "Issue",
    edition: "Edition",
    place: "Place",
    publisher: "Publisher",
    pages: "Pages",
    ISBN: "ISBN",
    publicationTitle: "Publication",
    ISSN: "ISSN",
    date: "Date",
    year: "Year",
    section: "Section",
    callNumber: "Call Number",
    archive: "Archive",
    archiveLocation: "Loc. in Archive",
    libraryCatalog: "Library Catalog",
    distributor: "Distributor",
    extra: "Extra",
    journalAbbreviation: "Journal Abbr",
    DOI: "DOI",
    accessDate: "Accessed",
    seriesTitle: "Series Title",
    seriesText: "Series Text",
    seriesNumber: "Series Number",
    institution: "Institution",
    reportType: "Report Type",
    code: "Code",
    session: "Session",
    legislativeBody: "Legislative Body",
    history: "History",
    reporter: "Reporter",
    court: "Court",
    numberOfVolumes: "# of Volumes",
    committee: "Committee",
    assignee: "Assignee",
    patentNumber: "Patent Number",
    priorityNumbers: "Priority Numbers",
    issueDate: "Issue Date",
    references: "References",
    legalStatus: "Legal Status",
    codeNumber: "Code Number",
    artworkMedium: "Medium",
    number: "Number",
    artworkSize: "Artwork Size",
    repository: "Repository",
    videoRecordingType: "Recording Type",
    interviewMedium: "Medium",
    letterType: "Type",
    manuscriptType: "Type",
    mapType: "Type",
    scale: "Scale",
    thesisType: "Type",
    websiteType: "Website Type",
    audioRecordingType: "Recording Type",
    label: "Label",
    presentationType: "Type",
    meetingName: "Meeting Name",
    studio: "Studio",
    runningTime: "Running Time",
    network: "Network",
    postType: "Post Type",
    audioFileType: "File Type",
    version: "Version",
    system: "System",
    company: "Company",
    conferenceName: "Conference Name",
    encyclopediaTitle: "Encyclopedia Title",
    dictionaryTitle: "Dictionary Title",
    language: "Language",
    programmingLanguage: "Language",
    university: "University",
    abstractNote: "Abstract",
    websiteTitle: "Website Title",
    reportNumber: "Report Number",
    billNumber: "Bill Number",
    codeVolume: "Code Volume",
    codePages: "Code Pages",
    dateDecided: "Date Decided",
    reporterVolume: "Reporter Volume",
    firstPage: "First Page",
    documentNumber: "Document Number",
    dateEnacted: "Date Enacted",
    publicLawNumber: "Public Law Number",
    country: "Country",
    applicationNumber: "Application Number",
    forumTitle: "Forum/Listserv Title",
    episodeNumber: "Episode Number",
    blogTitle: "Blog Title",
    caseName: "Case Name",
    nameOfAct: "Name of Act",
    subject: "Subject",
    proceedingsTitle: "Proceedings Title",
    bookTitle: "Book Title",
    shortTitle: "Short Title",
    docketNumber: "Docket Number",
    numPages: "# of Pages",
    note: "Note",
    numChildren: "# of Children",
    addedBy: "Added By",
    creator: "Creator"
};

Zotero.localizations.fieldMap = Zotero.Item.prototype.fieldMap;

Zotero.Item.prototype.typeMap = {
    note: "Note",
    attachment: "Attachment",
    book: "Book",
    bookSection: "Book Section",
    journalArticle: "Journal Article",
    magazineArticle: "Magazine Article",
    newspaperArticle: "Newspaper Article",
    thesis: "Thesis",
    letter: "Letter",
    manuscript: "Manuscript",
    interview: "Interview",
    film: "Film",
    artwork: "Artwork",
    webpage: "Web Page",
    report: "Report",
    bill: "Bill",
    "case": "Case",
    hearing: "Hearing",
    patent: "Patent",
    statute: "Statute",
    email: "E-mail",
    map: "Map",
    blogPost: "Blog Post",
    instantMessage: "Instant Message",
    forumPost: "Forum Post",
    audioRecording: "Audio Recording",
    presentation: "Presentation",
    videoRecording: "Video Recording",
    tvBroadcast: "TV Broadcast",
    radioBroadcast: "Radio Broadcast",
    podcast: "Podcast",
    computerProgram: "Computer Program",
    conferencePaper: "Conference Paper",
    document: "Document",
    encyclopediaArticle: "Encyclopedia Article",
    dictionaryEntry: "Dictionary Entry"
};

Zotero.localizations.typeMap = Zotero.Item.prototype.typeMap;

Zotero.Item.prototype.creatorMap = {
    author: "Author",
    contributor: "Contributor",
    editor: "Editor",
    translator: "Translator",
    seriesEditor: "Series Editor",
    interviewee: "Interview With",
    interviewer: "Interviewer",
    director: "Director",
    scriptwriter: "Scriptwriter",
    producer: "Producer",
    castMember: "Cast Member",
    sponsor: "Sponsor",
    counsel: "Counsel",
    inventor: "Inventor",
    attorneyAgent: "Attorney/Agent",
    recipient: "Recipient",
    performer: "Performer",
    composer: "Composer",
    wordsBy: "Words By",
    cartographer: "Cartographer",
    programmer: "Programmer",
    reviewedAuthor: "Reviewed Author",
    artist: "Artist",
    commenter: "Commenter",
    presenter: "Presenter",
    guest: "Guest",
    podcaster: "Podcaster"
};

Zotero.Item.prototype.hideFields = [ "mimeType", "linkMode", "charset", "md5", "mtime", "itemVersion", "itemKey", "collections", "relations", "parentItem", "contentType", "filename", "tags" ];

Zotero.localizations.creatorMap = Zotero.Item.prototype.creatorMap;

Zotero.Item.prototype.itemTypeImageSrc = {
    note: "note",
    attachment: "attachment-pdf",
    attachmentPdf: "attachment-pdf",
    attachmentWeblink: "attachment-web-link",
    attachmentSnapshot: "attachment-snapshot",
    attachmentFile: "attachment-file",
    attachmentLink: "attachment-link",
    book: "book",
    bookSection: "book_open",
    journalArticle: "page_white_text",
    magazineArticle: "layout",
    newspaperArticle: "newspaper",
    thesis: "report",
    letter: "email_open",
    manuscript: "script",
    interview: "comments",
    film: "film",
    artwork: "picture",
    webpage: "page",
    report: "report",
    bill: "page_white",
    "case": "page_white",
    hearing: "page_white",
    patent: "page_white",
    statute: "page_white",
    email: "email",
    map: "map",
    blogPost: "layout",
    instantMessage: "page_white",
    forumPost: "page",
    audioRecording: "ipod",
    presentation: "page_white",
    videoRecording: "film",
    tvBroadcast: "television",
    radioBroadcast: "transmit",
    podcast: "ipod_cast",
    computerProgram: "page_white_code",
    conferencePaper: "treeitem-conferencePaper",
    document: "page_white",
    encyclopediaArticle: "page_white",
    dictionaryEntry: "page_white"
};

Zotero.Item.prototype.cslNameMap = {
    author: "author",
    editor: "editor",
    bookAuthor: "container-author",
    composer: "composer",
    interviewer: "interviewer",
    recipient: "recipient",
    seriesEditor: "collection-editor",
    translator: "translator"
};

Zotero.Item.prototype.cslFieldMap = {
    title: [ "title" ],
    "container-title": [ "publicationTitle", "reporter", "code" ],
    "collection-title": [ "seriesTitle", "series" ],
    "collection-number": [ "seriesNumber" ],
    publisher: [ "publisher", "distributor" ],
    "publisher-place": [ "place" ],
    authority: [ "court" ],
    page: [ "pages" ],
    volume: [ "volume" ],
    issue: [ "issue" ],
    "number-of-volumes": [ "numberOfVolumes" ],
    "number-of-pages": [ "numPages" ],
    edition: [ "edition" ],
    version: [ "version" ],
    section: [ "section" ],
    genre: [ "type", "artworkSize" ],
    medium: [ "medium", "system" ],
    archive: [ "archive" ],
    archive_location: [ "archiveLocation" ],
    event: [ "meetingName", "conferenceName" ],
    "event-place": [ "place" ],
    "abstract": [ "abstractNote" ],
    URL: [ "url" ],
    DOI: [ "DOI" ],
    ISBN: [ "ISBN" ],
    "call-number": [ "callNumber" ],
    note: [ "extra" ],
    number: [ "number" ],
    references: [ "history" ],
    shortTitle: [ "shortTitle" ],
    journalAbbreviation: [ "journalAbbreviation" ],
    language: [ "language" ]
};

Zotero.Item.prototype.cslDateMap = {
    issued: "date",
    accessed: "accessDate"
};

Zotero.Item.prototype.cslTypeMap = {
    book: "book",
    bookSection: "chapter",
    journalArticle: "article-journal",
    magazineArticle: "article-magazine",
    newspaperArticle: "article-newspaper",
    thesis: "thesis",
    encyclopediaArticle: "entry-encyclopedia",
    dictionaryEntry: "entry-dictionary",
    conferencePaper: "paper-conference",
    letter: "personal_communication",
    manuscript: "manuscript",
    interview: "interview",
    film: "motion_picture",
    artwork: "graphic",
    webpage: "webpage",
    report: "report",
    bill: "bill",
    "case": "legal_case",
    hearing: "bill",
    patent: "patent",
    statute: "bill",
    email: "personal_communication",
    map: "map",
    blogPost: "webpage",
    instantMessage: "personal_communication",
    forumPost: "webpage",
    audioRecording: "song",
    presentation: "speech",
    videoRecording: "motion_picture",
    tvBroadcast: "broadcast",
    radioBroadcast: "broadcast",
    podcast: "song",
    computerProgram: "book"
};

Zotero.Item.prototype.citePaperJournalArticleURL = false;

Zotero.Tag = function(entry) {
    this.instance = "Zotero.Tag";
    if (typeof entry != "undefined") {
        this.parseXmlTag(entry);
    }
};

Zotero.Tag.prototype = new Zotero.Entry;

Zotero.Tag.prototype.dump = function() {
    var tag = this;
    var dump = tag.dumpEntry();
    var dumpProperties = [ "numItems", "urlencodedtag", "tagVersion", "tagType", "tag" ];
    for (var i = 0; i < dumpProperties.length; i++) {
        dump[dumpProperties[i]] = tag[dumpProperties[i]];
    }
    return dump;
};

Zotero.Tag.prototype.loadDump = function(dump) {
    var tag = this;
    tag.loadDumpEntry(dump);
    var dumpProperties = [ "numItems", "urlencodedtag", "tagVersion", "tagType", "tag" ];
    for (var i = 0; i < dumpProperties.length; i++) {
        tag[dumpProperties[i]] = dump[dumpProperties[i]];
    }
    tag.initSecondaryData();
    return tag;
};

Zotero.Tag.prototype.initSecondaryData = function() {};

Zotero.Tag.prototype.loadObject = function(ob) {
    var tag = this;
    tag.title = ob.title;
    tag.author = ob.author;
    tag.tagID = ob.tagID;
    tag.published = ob.published;
    tag.updated = ob.updated;
    tag.links = ob.links;
    tag.numItems = ob.numItems;
    tag.items = ob.items;
    tag.tagType = ob.tagType;
    tag.modified = ob.modified;
    tag.added = ob.added;
    tag.key = ob.key;
    tag.tag = ob.tag;
};

Zotero.Tag.prototype.parseXmlTag = function(tel) {
    var tag = this;
    tag.parseXmlEntry(tel);
    tag.numItems = tel.find("zapi\\:numItems, numItems").text();
    tag.urlencodedtag = encodeURIComponent(this.title);
    var contentEl = tel.find("content").first();
    tag.parseContentBlock(contentEl);
};

Zotero.Tag.prototype.parseContentBlock = function(contentEl) {
    var tag = this;
    var contentType = contentEl.attr("type");
    var contentText = contentEl.text();
    switch (contentType) {
      case "application/json":
        tag.parseJsonContent(contentEl);
        break;
    }
};

Zotero.Tag.prototype.parseJsonContent = function(cel) {
    var tag = this;
    if (typeof cel === "string") {
        tag.apiObj = JSON.parse(cel);
        tag.pristine = JSON.parse(cel);
    } else {
        tag.apiObj = JSON.parse(cel.text());
        tag.pristine = JSON.parse(cel.text());
    }
    tag.tagType = tag.apiObj["type"];
    tag.initSecondaryData();
};

Zotero.Tag.prototype.getLinkParams = function() {
    var selectedTags = Zotero.ajax.getUrlVar("tag");
    if (!J.isArray(selectedTags)) {
        selectedTags = [ selectedTags ];
    }
    var deparamed = Zotero.ajax.getUrlVars();
    var tagSelected = false;
    var selectedIndex = J.inArray(this.title, selectedTags);
    if (selectedIndex != -1) {
        tagSelected = true;
    }
    if (deparamed.hasOwnProperty("tag")) {
        if (J.isArray(deparamed.tag)) {
            if (!tagSelected) deparamed.tag.push(this.title); else {
                deparamed.tag.splice(selectedIndex, 1);
            }
        } else {
            if (!tagSelected) deparamed.tag = [ deparamed.tag, this.title ]; else deparamed.tag = [];
        }
    } else {
        deparamed.tag = this.title;
    }
    this.linktagsparams = deparamed;
    return deparamed;
};

Zotero.Search = function() {
    this.instance = "Zotero.Search";
    this.searchObject = {};
};

Zotero.Group = function(entryEl) {
    var group = this;
    group.instance = "Zotero.Group";
    if (typeof entryEl != "undefined") {
        this.parseXmlGroup(entryEl);
    }
};

Zotero.Group.prototype = new Zotero.Entry;

Zotero.Group.prototype.loadObject = function(ob) {
    var group = this;
    group.title = ob.title;
    group.author = ob.author;
    group.tagID = ob.tagID;
    group.published = ob.published;
    group.updated = ob.updated;
    group.links = ob.links;
    group.numItems = ob.numItems;
    group.items = ob.items;
    group.tagType = ob.tagType;
    group.modified = ob.modified;
    group.added = ob.added;
    group.key = ob.key;
};

Zotero.Group.prototype.parseXmlGroup = function(gel) {
    var group = this;
    group.parseXmlEntry(gel);
    group.numItems = gel.find("zapi\\:numItems, numItems").text();
    var contentEl = gel.children("content");
    var subcontents = gel.find("zapi\\:subcontent, subcontent");
    if (subcontents.size() > 0) {
        for (var i = 0; i < subcontents.size(); i++) {
            var sc = J(subcontents.get(i));
            group.parseContentBlock(sc);
        }
    } else {
        group.parseContentBlock(contentEl);
    }
    group.groupID = gel.find("zapi\\:groupID, groupID").text();
    group.numItems = gel.find("zapi\\:numItems, numItems").text();
};

Zotero.Group.prototype.parseContentBlock = function(contentEl) {
    var group = this;
    var contentType = contentEl.attr("type");
    var contentText = contentEl.text();
    switch (contentType) {
      case "json":
      case "application/json":
        group.parseJsonGroupContent(contentEl);
        break;
    }
};

Zotero.Group.prototype.parseJsonGroupContent = function(cel) {
    var group = this;
    group.apiObj = JSON.parse(cel.text());
    group.pristine = JSON.parse(cel.text());
    console.log(cel.text());
    group.etag = cel.attr("etag");
};

Zotero.Group.prototype.get = function(key) {
    var group = this;
    switch (key) {
      case "title":
        return group.title;
    }
    if (key in group.apiObj) {
        return group.apiObj[key];
    } else if (group.hasOwnProperty(key)) {
        return group[key];
    }
    return null;
};

Zotero.Group.prototype.typeMap = {
    Private: "Private",
    PublicOpen: "Public, Open Membership",
    PublicClosed: "Public, Closed Membership"
};

Zotero.Group.prototype.accessMap = {
    all: {
        members: "Anyone can view, only members can edit",
        admins: "Anyone can view, only admins can edit"
    },
    members: {
        members: "Only members can view and edit",
        admins: "Only members can view, only admins can edit"
    },
    admins: {
        members: "Only admins can view, only members can edit",
        admins: "Only admins can view and edit"
    }
};

Zotero.User = function() {
    this.instance = "Zotero.User";
};

Zotero.User.prototype = new Zotero.Entry;

Zotero.User.prototype.loadObject = function(ob) {
    this.title = ob.title;
    this.author = ob.author;
    this.tagID = ob.tagID;
    this.published = ob.published;
    this.updated = ob.updated;
    this.links = ob.links;
    this.numItems = ob.numItems;
    this.items = ob.items;
    this.tagType = ob.tagType;
    this.modified = ob.modified;
    this.added = ob.added;
    this.key = ob.key;
};

Zotero.User.prototype.parseXmlUser = function(tel) {
    this.parseXmlEntry(tel);
    var tagEl = tel.find("content>tag");
    if (tagEl.length !== 0) {
        this.tagKey = tagEl.attr("key");
        this.libraryID = tagEl.attr("libraryID");
        this.tagName = tagEl.attr("name");
        this.dateAdded = tagEl.attr("dateAdded");
        this.dateModified = tagEl.attr("dateModified");
    }
};

Zotero.utils = {
    randomString: function(len, chars) {
        if (!chars) {
            chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        }
        if (!len) {
            len = 8;
        }
        var randomstring = "";
        for (var i = 0; i < len; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    },
    getKey: function() {
        var baseString = "23456789ABCDEFGHIJKMNPQRSTUVWXZ";
        return Zotero.utils.randomString(8, baseString);
    },
    updateObjectsFromWriteResponse: function(itemsArray, responsexhr) {
        Z.debug("Zotero.utils.updateObjectsFromWriteResponse", 3);
        Z.debug("statusCode: " + responsexhr.status);
        Z.debug(responsexhr.responseText, 3);
        var data = JSON.parse(responsexhr.responseText);
        if (responsexhr.status == 200) {
            var newLastModifiedVersion = responsexhr.getResponseHeader("Last-Modified-Version");
            Z.debug("newLastModifiedVersion: " + newLastModifiedVersion, 3);
            if ("success" in data) {
                J.each(data.success, function(ind, key) {
                    var i = parseInt(ind, 10);
                    var item = itemsArray[i];
                    if (item.hasOwnProperty("itemKey")) {
                        if (item.itemKey !== "" && item.itemKey !== key) {
                            throw "itemKey mismatch in multi-write response";
                        }
                        if (item.itemKey === "") {
                            if (item.hasOwnProperty("instance") && item.instance == "Zotero.Item") {
                                item.updateItemKey(key);
                            }
                        }
                    } else {
                        item.itemKey = key;
                    }
                    item.set("itemVersion", newLastModifiedVersion);
                    item.synced = true;
                    item.writeFailure = false;
                });
            }
            if ("failed" in data) {
                J.each(data.failed, function(ind, failure) {
                    var i = parseInt(ind, 10);
                    var item = itemsArray[i];
                    item.writeFailure = failure;
                });
            }
        } else if (responsexhr.status == 204) {
            itemsArray[0].synced = true;
        }
    },
    slugify: function(name) {
        var slug = J.trim(name);
        slug = slug.toLowerCase();
        slug = slug.replace(/[^a-z0-9 ._-]/g, "");
        slug = slug.replace(" ", "_", "g");
        return slug;
    },
    prependAutocomplete: function(pre, source) {
        Z.debug("Zotero.utils.prependAutocomplete", 3);
        Z.debug("prepend match: " + pre);
        var satisfy;
        if (!source) {
            Z.debug("source is not defined");
        }
        if (pre === "") {
            satisfy = source.slice(0);
            return satisfy;
        }
        var plen = pre.length;
        var plower = pre.toLowerCase();
        satisfy = J.map(source, function(n) {
            if (n.substr(0, plen).toLowerCase() == plower) {
                return n;
            } else {
                return null;
            }
        });
        return satisfy;
    },
    matchAnyAutocomplete: function(pre, source) {
        Z.debug("Zotero.utils.matchAnyAutocomplete", 3);
        Z.debug("matchAny match: " + pre);
        var satisfy;
        if (!source) {
            Z.debug("source is not defined");
        }
        if (pre === "") {
            satisfy = source.slice(0);
            return satisfy;
        }
        var plen = pre.length;
        var plower = pre.toLowerCase();
        satisfy = J.map(source, function(n) {
            if (n.toLowerCase().indexOf(plower) != -1) {
                return n;
            } else {
                return null;
            }
        });
        return satisfy;
    },
    libraryString: function(type, libraryID) {
        var lstring = "";
        if (type == "user") lstring = "u"; else if (type == "group") lstring = "g";
        lstring += libraryID;
        return lstring;
    },
    stale: function(retrievedDate, lifetime) {
        var now = Date.now();
        var elapsed = now.getTime() - retrievedDate.getTime();
        if (elapsed / 6e4 > lifetime) {
            return true;
        }
        return false;
    },
    entityify: function(str) {
        var character = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;"
        };
        return str.replace(/[<>&"]/g, function(c) {
            return character[c];
        });
    },
    parseApiDate: function(datestr, date) {
        var re = /([0-9]+)-([0-9]+)-([0-9]+)T([0-9]+):([0-9]+):([0-9]+)Z/;
        var matches = re.exec(datestr);
        if (matches === null) {
            Z.debug("error parsing api date: " + datestr, 1);
            return null;
        } else {
            date = new Date(Date.UTC(matches[1], matches[2] - 1, matches[3], matches[4], matches[5], matches[6]));
            return date;
        }
        return date;
    },
    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    compareObs: function(ob1, ob2, checkVars) {
        var loopOn = checkVars;
        var useIndex = false;
        var differences = [];
        if (checkVars === undefined) {
            loopOn = ob1;
            useIndex = true;
        }
        J.each(loopOn, function(index, Val) {
            var compindex = Val;
            if (useIndex) compindex = index;
            if (typeof ob1[index] == "object") {
                if (Zotero.utils.compareObs(ob1[compindex], ob2[compindex]).length) {
                    differences.push(compindex);
                }
            } else {
                if (ob1[compindex] != ob2[compindex]) {
                    differences.push(compindex);
                }
            }
        });
        return differences;
    },
    updateSyncState: function(container, version) {
        Z.debug("updateSyncState: " + version, 3);
        if (!container.hasOwnProperty("syncState")) return;
        if (container.syncState.earliestVersion === null) {
            container.syncState.earliestVersion = version;
        }
        if (container.syncState.latestVersion === null) {
            container.syncState.latestVersion = version;
        }
        if (version < container.syncState.earliestVersion) {
            container.syncState.earliestVersion = version;
        }
        if (version > container.syncState.latestVersion) {
            container.syncState.latestVersion = version;
        }
    },
    updateSyncedVersion: function(container, versionField) {
        if (container.syncState.earliestVersion !== null && container.syncState.earliestVersion == container.syncState.latestVersion) {
            container[versionField] = container.syncState.latestVersion;
            container.synced = true;
        } else if (container.syncState.earliestVersion !== null) {
            container[versionField] = container.syncState.earliestVersion;
        }
    },
    translateMimeType: function(mimeType) {
        switch (mimeType) {
          case "text/html":
            return "html";
          case "application/pdf":
          case "application/x-pdf":
          case "application/acrobat":
          case "applications/vnd.pdf":
          case "text/pdf":
          case "text/x-pdf":
            return "pdf";
          case "image/jpg":
          case "image/jpeg":
            return "jpg";
          case "image/gif":
            return "gif";
          case "application/msword":
          case "application/doc":
          case "application/vnd.msword":
          case "application/vnd.ms-word":
          case "application/winword":
          case "application/word":
          case "application/x-msw6":
          case "application/x-msword":
            return "doc";
          case "application/vnd.oasis.opendocument.text":
          case "application/x-vnd.oasis.opendocument.text":
            return "odt";
          case "video/flv":
          case "video/x-flv":
            return "flv";
          case "image/tif":
          case "image/tiff":
          case "image/tif":
          case "image/x-tif":
          case "image/tiff":
          case "image/x-tiff":
          case "application/tif":
          case "application/x-tif":
          case "application/tiff":
          case "application/x-tiff":
            return "tiff";
          case "application/zip":
          case "application/x-zip":
          case "application/x-zip-compressed":
          case "application/x-compress":
          case "application/x-compressed":
          case "multipart/x-zip":
            return "zip";
          case "video/quicktime":
          case "video/x-quicktime":
            return "mov";
          case "video/avi":
          case "video/msvideo":
          case "video/x-msvideo":
            return "avi";
          case "audio/wav":
          case "audio/x-wav":
          case "audio/wave":
            return "wav";
          case "audio/aiff":
          case "audio/x-aiff":
          case "sound/aiff":
            return "aiff";
          case "text/plain":
            return "plain text";
          case "application/rtf":
            return "rtf";
          default:
            return mimeType;
        }
    },
    getKeyPermissions: function(userID, key) {
        if (!userID) {
            return false;
        }
        if (!key) {
            return false;
        }
        var urlconfig = {
            target: "key",
            libraryType: "user",
            libraryID: userID,
            apiKey: key
        };
        var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
        var deferred = new J.Deferred;
        var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
            var keyNode = J(data).find("key");
            var keyObject = Zotero.utils.parseKey(keyNode);
            deferred.resolve(keyObject);
        }, this);
        var jqxhr = Zotero.ajaxRequest(requestUrl);
        jqxhr.done(callback);
        jqxhr.fail(function() {
            deferred.reject.apply(null, arguments);
        }).fail(Zotero.error);
        Zotero.ajax.activeRequests.push(jqxhr);
        return deferred;
    },
    parseKey: function(keyNode) {
        var key = [];
        var keyPerms = {
            library: "0",
            notes: "0",
            write: "0",
            groups: {}
        };
        var accessEls = keyNode.find("access");
        accessEls.each(function() {
            var access = J(this);
            if (access.attr("library")) {
                keyPerms["library"] = access.attr("library");
            }
            if (access.attr("notes")) {
                keyPerms["notes"] = access.attr("notes");
            }
            if (access.attr("group")) {
                var groupPermission = access.attr("write") == "1" ? "write" : "read";
                keyPerms["groups"][access.attr("group")] = groupPermission;
            } else if (access.attr("write")) {
                keyPerms["write"] = access.attr("write");
            }
        });
        return keyPerms;
    }
};

Zotero.url.itemHref = function(item) {
    var href = "";
    var library = item.owningLibrary;
    href += library.libraryBaseWebsiteUrl + "/itemKey/" + item.itemKey;
    return href;
};

Zotero.url.attachmentDownloadLink = function(item) {
    var retString = "";
    if (item.links["enclosure"]) {
        var tail = item.links["enclosure"]["href"].substr(-4, 4);
        if (tail == "view") {
            retString += '<a href="' + Zotero.config.baseZoteroWebsiteUrl + Zotero.config.nonparsedBaseUrl + "/" + item.itemKey + "/file/view" + '">' + "View Snapshot</a>";
        } else {
            var enctype = Zotero.utils.translateMimeType(item.links["enclosure"].type);
            var enc = item.links["enclosure"];
            var filesize = parseInt(enc["length"], 10);
            var filesizeString = "" + filesize + " B";
            if (filesize > 1073741824) {
                filesizeString = "" + (filesize / 1073741824).toFixed(1) + " GB";
            } else if (filesize > 1048576) {
                filesizeString = "" + (filesize / 1048576).toFixed(1) + " MB";
            } else if (filesize > 1024) {
                filesizeString = "" + (filesize / 1024).toFixed(1) + " KB";
            }
            Z.debug(enctype);
            retString += '<a href="' + Zotero.config.baseZoteroWebsiteUrl + Zotero.config.nonparsedBaseUrl + "/" + item.itemKey + "/file" + '">';
            if (enctype == "undefined" || enctype === "" || typeof enctype == "undefined") {
                retString += filesizeString + "</a>";
            } else {
                retString += enctype + ", " + filesizeString + "</a>";
            }
            return retString;
        }
    }
    return retString;
};

Zotero.url.attachmentDownloadUrl = function(item) {
    var retString = "";
    if (item.links["enclosure"]) {
        if (Zotero.config.directDownloads) {
            retString = Zotero.config.baseZoteroWebsiteUrl + Zotero.config.nonparsedBaseUrl + "/" + item.itemKey + "/file";
            var tail = item.links["enclosure"]["href"].substr(-4, 4);
            if (tail == "view") {
                retString += "/view";
            }
        } else {
            retString = Zotero.config.baseDownloadUrl + "?itemkey=" + item.itemKey;
        }
    } else if (item.linkMode == 2 || item.linkMode == 3) {
        if (item.apiObj["url"]) {
            retString = item.apiObj["url"];
        }
    }
    return retString;
};

Zotero.url.attachmentFileDetails = function(item) {
    if (!item.links["enclosure"]) return "";
    var enctype = Zotero.utils.translateMimeType(item.links["enclosure"].type);
    var enc = item.links["enclosure"];
    var filesizeString = "";
    if (enc["length"]) {
        var filesize = parseInt(enc["length"], 10);
        filesizeString = "" + filesize + " B";
        if (filesize > 1073741824) {
            filesizeString = "" + (filesize / 1073741824).toFixed(1) + " GB";
        } else if (filesize > 1048576) {
            filesizeString = "" + (filesize / 1048576).toFixed(1) + " MB";
        } else if (filesize > 1024) {
            filesizeString = "" + (filesize / 1024).toFixed(1) + " KB";
        }
        return "(" + enctype + ", " + filesizeString + ")";
    } else {
        return "(" + enctype + ")";
    }
};

Zotero.url.exportUrls = function(config) {
    Z.debug("Zotero.url.exportUrls");
    var exportUrls = {};
    var exportConfig = {};
    J.each(Zotero.config.exportFormats, function(index, format) {
        exportConfig = J.extend(config, {
            format: format
        });
        exportUrls[format] = Zotero.ajax.apiRequestUrl(exportConfig) + Zotero.ajax.apiQueryString({
            format: format,
            limit: "25"
        });
    });
    Z.debug(exportUrls);
    return exportUrls;
};

Zotero.url.snapshotViewLink = function(item) {
    return Zotero.ajax.apiRequestUrl({
        target: "item",
        targetModifier: "viewsnapshot",
        libraryType: item.owningLibrary.libraryType,
        libraryID: item.owningLibrary.libraryID,
        itemKey: item.itemKey
    });
};

Zotero.file = {};

Zotero.file.getFileInfo = function(file, callback) {
    if (typeof FileReader != "function") {
        throw "FileReader not supported";
    }
    var fileInfo = {};
    var reader = new FileReader;
    reader.onload = function(e) {
        Z.debug("Zotero.file.getFileInfo onloadFunc");
        var result = e.target.result;
        Zotero.debug(result);
        var spark = new SparkMD5;
        spark.appendBinary(result);
        fileInfo.md5 = spark.end();
        Z.debug("md5:" + fileInfo.md5, 4);
        fileInfo.filename = file.name;
        fileInfo.filesize = file.size;
        fileInfo.mtime = Date.now();
        fileInfo.contentType = file.type;
        fileInfo.reader = reader;
        callback(fileInfo);
    };
    reader.readAsBinaryString(file);
};

Zotero.file.uploadFile = function(uploadInfo, file) {
    Z.debug("Zotero.file.uploadFile", 3);
    Z.debug(uploadInfo, 4);
    var formData = new FormData;
    J.each(uploadInfo.params, function(index, val) {
        formData.append(index, val);
    });
    formData.append("file", file);
    var xhr = new XMLHttpRequest;
    xhr.open("POST", uploadInfo.url, true);
    xhr.send(formData);
    return xhr;
};

Zotero.Filestorage = function() {
    Z.debug("Zotero.Filestorage", 3);
    var zfilestorage = this;
    this.filer = new Filer;
    this.fileEntries = {};
    Z.debug("Filer created", 3);
    this.filer.init({
        persistent: true,
        size: 1024 * 1024 * 128
    }, J.proxy(function(fs) {
        Z.debug("Filesystem created");
        zfilestorage.fs = fs;
        zfilestorage.listOfflineFiles();
    }, this));
    Z.debug("returning Zotero.Filestorage");
};

Zotero.Filestorage.prototype.getSavedFile = function(itemKey) {
    Zotero.debug("Zotero.Filestorage.getSavedFile", 3);
    var fstorage = this;
    var filer = fstorage.filer;
    var deferred = new J.Deferred;
    filer.open(fstorage.fileEntries[itemKey], J.proxy(function(file) {
        Z.debut("filer.open callback");
        deferred.resolve(file);
    }, this), this.handleError);
    return deferred;
};

Zotero.Filestorage.prototype.getSavedFileObjectUrl = function(itemKey) {
    Z.debug("Zotero.Filestorage.getSavedFileObjectUrl", 3);
    var fstorage = this;
    var filer = this.filer;
    var objectUrlDeferred = new J.Deferred;
    filer.open(fstorage.fileEntries[itemKey], J.proxy(function(file) {
        Z.debug("filer.open callback");
        objectUrlDeferred.resolve(Util.fileToObjectURL(file));
    }, this), this.handleError);
    return objectUrlDeferred;
};

Zotero.Filestorage.prototype.listOfflineFiles = function() {
    Z.debug("Zotero.Filestorage.listOfflineFiles");
    var fstorage = this;
    var filer = fstorage.filer;
    var fileListDeferred = new J.Deferred;
    filer.ls("/", J.proxy(function(entries) {
        Z.debug(entries);
        Zotero.offlineFilesEntries = entries;
        var itemKeys = [];
        J.each(entries, function(ind, entry) {
            fstorage.fileEntries[entry.name] = entry;
            itemKeys.push(entry.name);
        });
        fileListDeferred.resolve(itemKeys);
    }, this));
    return fileListDeferred;
};

Zotero.Filestorage.prototype.handleError = function(e) {
    Zotero.debug("----------------Filestorage Error encountered", 2);
    Zotero.debug(e, 2);
};

Zotero.Idb = {};

Zotero.Idb.Library = function(libraryString) {
    Z.debug("Zotero.Idb.Library", 3);
    Z.debug("Initializing Zotero IDB", 3);
    this.libraryString = libraryString;
    this.owningLibrary = null;
};

Zotero.Idb.Library.prototype.init = function() {
    var idbLibrary = this;
    var IDBinitD = new J.Deferred;
    var indexedDB = window.indexedDB;
    this.indexedDB = indexedDB;
    Z.debug("requesting indexedDb from browser", 3);
    var db;
    var request = indexedDB.open("Zotero_" + idbLibrary.libraryString, 2);
    request.onerror = J.proxy(function(e) {
        Zotero.debug("ERROR OPENING INDEXED DB", 1);
        IDBinitD.reject();
    }, this);
    var upgradeCallback = J.proxy(function(event) {
        Z.debug("Zotero.Idb onupgradeneeded or onsuccess", 3);
        var db = event.target.result;
        this.db = db;
        Z.debug("Existing object store names:", 3);
        Z.debug(JSON.stringify(db.objectStoreNames), 3);
        Z.debug("Deleting old object stores", 3);
        if (db.objectStoreNames["items"]) {
            db.deleteObjectStore("items");
        }
        if (db.objectStoreNames["tags"]) {
            db.deleteObjectStore("tags");
        }
        if (db.objectStoreNames["collections"]) {
            db.deleteObjectStore("collections");
        }
        Z.debug("Existing object store names:", 3);
        Z.debug(JSON.stringify(db.objectStoreNames), 3);
        var itemStore = db.createObjectStore("items", {
            keyPath: "itemKey"
        });
        var collectionStore = db.createObjectStore("collections", {
            keyPath: "collectionKey"
        });
        var tagStore = db.createObjectStore("tags", {
            keyPath: "title"
        });
        Z.debug("itemStore index names:", 3);
        Z.debug(JSON.stringify(itemStore.indexNames), 3);
        Z.debug("collectionStore index names:", 3);
        Z.debug(JSON.stringify(collectionStore.indexNames), 3);
        Z.debug("tagStore index names:", 3);
        Z.debug(JSON.stringify(tagStore.indexNames), 3);
        J.each(Zotero.Item.prototype.fieldMap, function(key, val) {
            Z.debug("Creating index on " + key, 3);
            itemStore.createIndex(key, "apiObj." + key, {
                unique: false
            });
        });
        itemStore.createIndex("collectionKeys", "apiObj.collections", {
            unique: false,
            multiEntry: true
        });
        itemStore.createIndex("itemTagStrings", "tagstrings", {
            unique: false,
            multiEntry: true
        });
        itemStore.createIndex("parentItemKey", "parentItemKey", {
            unique: false
        });
        itemStore.createIndex("libraryKey", "libraryKey", {
            unique: false
        });
        collectionStore.createIndex("name", "name", {
            unique: false
        });
        collectionStore.createIndex("title", "title", {
            unique: false
        });
        collectionStore.createIndex("collectionKey", "collectionKey", {
            unique: false
        });
        collectionStore.createIndex("parentCollectionKey", "parentCollectionKey", {
            unique: false
        });
        collectionStore.createIndex("libraryKey", "libraryKey", {
            unique: false
        });
        tagStore.createIndex("name", "name", {
            unique: false
        });
        tagStore.createIndex("title", "title", {
            unique: false
        });
        tagStore.createIndex("libraryKey", "libraryKey", {
            unique: false
        });
    }, this);
    request.onupgradeneeded = upgradeCallback;
    request.onsuccess = J.proxy(function() {
        Z.debug("IDB success", 3);
        this.db = request.result;
        IDBinitD.resolve(this);
    }, this);
    return IDBinitD;
};

Zotero.Idb.Library.prototype.deleteDB = function() {
    var idbLibrary = this;
    idbLibrary.db.close();
    var deleteRequest = idbLibrary.indexedDB.deleteDatabase("Zotero_" + idbLibrary.libraryString);
    deleteRequest.onerror = function() {
        Z.debug("Error deleting indexedDB");
    };
    deleteRequest.onsuccess = function() {
        Z.debug("Successfully deleted indexedDB");
    };
    return deleteRequest;
};

Zotero.Idb.Library.prototype.getObjectStore = function(store_name, mode) {
    var idbLibrary = this;
    var tx = idbLibrary.db.transaction(store_name, mode);
    return tx.objectStore(store_name);
};

Zotero.Idb.Library.prototype.clearObjectStore = function(store_name) {
    var idbLibrary = this;
    var store = getObjectStore(store_name, "readwrite");
    var req = store.clear();
    req.onsuccess = function(evt) {
        Z.debug("Store cleared");
    };
    req.onerror = function(evt) {
        Z.debug("clearObjectStore:", evt.target.errorCode);
    };
    return req;
};

Zotero.Idb.Library.prototype.addItems = function(items) {
    var idbLibrary = this;
    var transaction = idbLibrary.db.transaction([ "items" ], "readwrite");
    transaction.oncomplete = function(event) {
        Zotero.debug("Add Items transaction completed.", 3);
    };
    transaction.onerror = function(event) {
        Zotero.debug("Add Items transaction failed.", 1);
    };
    var itemStore = transaction.objectStore("items");
    var reqSuccess = function(event) {
        Zotero.debug("Added Item " + event.target.result, 4);
    };
    for (var i in items) {
        var request = itemStore.add(items[i].dump());
        request.onsuccess = reqSuccess;
    }
};

Zotero.Idb.Library.prototype.updateItems = function(items) {
    Z.debug("Zotero.Idb.Library.updateItems");
    var idbLibrary = this;
    var deferred = new J.Deferred;
    if (!items) {
        items = idbLibrary.owningLibrary.items.itemsArray;
    }
    var transaction = idbLibrary.db.transaction([ "items" ], "readwrite");
    transaction.oncomplete = function(event) {
        Zotero.debug("Update Items transaction completed.", 3);
    };
    transaction.onerror = function(event) {
        Zotero.debug("Update Items transaction failed.", 1);
    };
    var itemStore = transaction.objectStore("items");
    var reqSuccess = function(event) {
        Zotero.debug("Added/Updated Item " + event.target.result, 4);
    };
    for (var i in items) {
        var request = itemStore.put(items[i].dump());
        request.onsuccess = reqSuccess;
        deferred.resolve(true);
    }
    return deferred;
};

Zotero.Idb.Library.prototype.removeItems = function(items) {
    var idbLibrary = this;
    var deferred = new J.Deferred;
    var transaction = idbLibrary.db.transaction([ "items" ], "readwrite");
    transaction.oncomplete = function(event) {
        Zotero.debug("Remove Items transaction completed.", 3);
    };
    transaction.onerror = function(event) {
        Zotero.debug("Remove Items transaction failed.", 1);
    };
    var itemStore = transaction.objectStore("items");
    var reqSuccess = function(event) {
        Zotero.debug("Removed Item " + event.target.result, 4);
    };
    for (var i in items) {
        var request = itemStore.delete(items[i].itemKey);
        request.onsuccess = reqSuccess;
        deferred.resolve(true);
    }
    return deferred;
};

Zotero.Idb.Library.prototype.getItem = function(itemKey) {
    var idbLibrary = this;
    var deferred = new J.Deferred;
    var success = J.proxy(function(event) {
        deferred.resolve(event.target.result);
    }, this);
    idbLibrary.db.transaction("items").objectStore([ "items" ], "readonly").get(itemKey).onsuccess = success;
    return deferred;
};

Zotero.Idb.Library.prototype.getAllItems = function() {
    var idbLibrary = this;
    var deferred = new J.Deferred;
    var items = [];
    var objectStore = idbLibrary.db.transaction([ "items" ], "readonly").objectStore("items");
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            items.push(cursor.value);
            cursor.continue();
        } else {
            deferred.resolve(items);
        }
    };
    return deferred;
};

Zotero.Idb.Library.prototype.getOrderedItemKeys = function(field, order) {
    var idbLibrary = this;
    Z.debug("Zotero.Idb.getOrderedItemKeys", 3);
    var deferred = new J.Deferred;
    var itemKeys = [];
    var objectStore = idbLibrary.db.transaction([ "items" ], "readonly").objectStore("items");
    var index = objectStore.index(field);
    if (!index) {
        throw "Index for requested field '" + field + "'' not found";
    }
    var cursorDirection = "next";
    if (order == "desc") {
        cursorDirection = "prev";
    }
    var cursorRequest = index.openKeyCursor(null, cursorDirection);
    cursorRequest.onsuccess = J.proxy(function(event) {
        var itemKeys = [];
        var cursor = event.target.result;
        if (cursor) {
            Z.debug(cursor.key);
            Z.debug(cursor.primaryKey);
            itemKeys.push(cursor.primaryKey);
            cursor.continue();
        } else {
            Z.debug("No more cursor: done. Resolving deferred.", 3);
            deferred.resolve(itemKeys);
        }
    }, this);
    cursorRequest.onfailure = J.proxy(function(event) {
        deferred.reject();
    }, this);
    return deferred;
};

Zotero.Idb.Library.prototype.filterItems = function(field, value) {
    var idbLibrary = this;
    Z.debug("Zotero.Idb.filterItems", 3);
    var deferred = new J.Deferred;
    var itemKeys = [];
    var objectStore = idbLibrary.db.transaction([ "items" ], "readonly").objectStore("items");
    var index = objectStore.index(field);
    if (!index) {
        throw "Index for requested field '" + field + "'' not found";
    }
    var cursorDirection = "next";
    var range = IDBKeyRange.only(value);
    var cursorRequest = index.openKeyCursor(range, cursorDirection);
    cursorRequest.onsuccess = J.proxy(function(event) {
        var cursor = event.target.result;
        if (cursor) {
            Z.debug(cursor.key);
            Z.debug(cursor.primaryKey);
            itemKeys.push(cursor.primaryKey);
            cursor.continue();
        } else {
            Z.debug("No more cursor: done. Resolving deferred.", 3);
            deferred.resolve(itemKeys);
        }
    }, this);
    cursorRequest.onfailure = J.proxy(function(event) {
        deferred.reject();
    }, this);
    return deferred;
};

Zotero.Idb.Library.prototype.addCollections = function(collections) {
    var idbLibrary = this;
    var deferred = new J.Deferred;
    var transaction = idbLibrary.db.transaction([ "collections" ], "readwrite");
    transaction.oncomplete = function(event) {
        Zotero.debug("Add Collections transaction completed.", 3);
        deferred.resolve();
    };
    transaction.onerror = function(event) {
        Zotero.debug("Add Collections transaction failed.", 1);
        deferred.reject();
    };
    var collectionStore = transaction.objectStore("collections");
    var reqSuccess = function(event) {
        Zotero.debug("Added Collection " + event.target.result, 4);
    };
    for (var i in collections) {
        var request = collectionStore.add(collections[i].dump());
        request.onsuccess = reqSuccess;
    }
    return deferred;
};

Zotero.Idb.Library.prototype.updateCollections = function(collections) {
    Z.debug("Zotero.Idb.Library.updateCollections");
    var idbLibrary = this;
    var deferred = new J.Deferred;
    if (!collections) {
        collections = idbLibrary.owningLibrary.collections.collectionsArray;
    }
    var transaction = idbLibrary.db.transaction([ "collections" ], "readwrite");
    transaction.oncomplete = function(event) {
        Zotero.debug("Update Collections transaction completed.", 3);
        deferred.resolve();
    };
    transaction.onerror = function(event) {
        Zotero.debug("Update Collections transaction failed.", 1);
        deferred.reject();
    };
    var collectionStore = transaction.objectStore("collections");
    var reqSuccess = function(event) {
        Zotero.debug("Updated Collection " + event.target.result, 4);
    };
    for (var i in collections) {
        var request = collectionStore.put(collections[i].dump());
        request.onsuccess = reqSuccess;
    }
    return deferred;
};

Zotero.Idb.Library.prototype.removeCollections = function(collections) {
    var idbLibrary = this;
    var deferred = new J.Deferred;
    var transaction = idbLibrary.db.transaction([ "collections" ], "readwrite");
    transaction.oncomplete = function(event) {
        Zotero.debug("Remove Collections transaction completed.", 3);
        deferred.resolve();
    };
    transaction.onerror = function(event) {
        Zotero.debug("Add Collections transaction failed.", 1);
        deferred.reject();
    };
    var collectionStore = transaction.objectStore("collections");
    var reqSuccess = function(event) {
        Zotero.debug("Removed Collection " + event.target.result, 4);
    };
    for (var i in collections) {
        var request = collectionStore.delete(collections[i].collectionKey);
        request.onsuccess = reqSuccess;
    }
    return deferred;
};

Zotero.Idb.Library.prototype.getAllCollections = function() {
    var idbLibrary = this;
    var deferred = new J.Deferred;
    var collections = [];
    var objectStore = idbLibrary.db.transaction("collections").objectStore("collections");
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            collections.push(cursor.value);
            cursor.continue();
        } else {
            deferred.resolve(collections);
        }
    };
    return deferred;
};

Zotero.Idb.Library.prototype.addTags = function(tags) {
    var idbLibrary = this;
    var deferred = new J.Deferred;
    var transaction = idbLibrary.db.transaction([ "tags" ], "readwrite");
    transaction.oncomplete = function(event) {
        Zotero.debug("Add Tags transaction completed.", 3);
        deferred.resolve();
    };
    transaction.onerror = function(event) {
        Zotero.debug("Add Tags transaction failed.", 1);
        deferred.reject();
    };
    var tagStore = transaction.objectStore("tags");
    var reqSuccess = function(event) {
        Zotero.debug("Added Tag " + event.target.result, 4);
    };
    for (var i in tags) {
        var request = tagStore.add(tags[i].dump());
        request.onsuccess = reqSuccess;
    }
    return deferred;
};

Zotero.Idb.Library.prototype.updateTags = function(tags) {
    Z.debug("Zotero.Idb.Library.updateTags");
    var idbLibrary = this;
    var deferred = new J.Deferred;
    if (!tags) {
        tags = idbLibrary.owningLibrary.tags.tagsArray;
    }
    var transaction = idbLibrary.db.transaction([ "tags" ], "readwrite");
    transaction.oncomplete = function(event) {
        Zotero.debug("Update Tags transaction completed.", 3);
        deferred.resolve();
    };
    transaction.onerror = function(event) {
        Zotero.debug("Update Tags transaction failed.", 1);
        deferred.reject();
    };
    var tagStore = transaction.objectStore("tags");
    var reqSuccess = function(event) {
        Zotero.debug("Updated Tag " + event.target.result, 4);
    };
    for (var i in tags) {
        var request = tagStore.put(tags[i].dump());
        request.onsuccess = reqSuccess;
    }
    return deferred;
};

Zotero.Idb.Library.prototype.getAllTags = function() {
    var idbLibrary = this;
    var deferred = new J.Deferred;
    var tags = [];
    var objectStore = idbLibrary.db.transaction([ "tags" ], "readonly").objectStore("tags");
    var index = objectStore.index("title");
    index.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            tags.push(cursor.value);
            cursor.continue();
        } else {
            deferred.resolve(tags);
        }
    };
    return deferred;
};

Zotero.Idb.Library.prototype.intersect = function(ar1, ar2) {
    var idbLibrary = this;
    var result = [];
    for (var i = 0; i < ar1.length; i++) {
        if (ar2.indexOf(ar1[i]) !== -1) {
            result.push(ar1[i]);
        }
    }
    return result;
};

Zotero.Idb.Library.prototype.intersectAll = function(arrs) {
    var idbLibrary = this;
    var result = arrs[0];
    for (var i = 0; i < arrs.length - 1; i++) {
        result = idbLibrary.intersect(result, arrs[i + 1]);
    }
    return result;
};

Zotero.Library.prototype.loadCollections = function(config) {
    Z.debug("Zotero.Library.loadCollections", 3);
    var library = this;
    library.collections.loading = true;
    var deferred = new J.Deferred;
    if (!config) {
        config = {};
    }
    var urlconfig = J.extend(true, {
        target: "collections",
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        content: "json",
        limit: "100"
    }, config);
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var callback = J.proxy(function(data, textStatus, coljqxhr) {
        Z.debug("loadCollections proxied callback", 3);
        var modifiedVersion = coljqxhr.getResponseHeader("Last-Modified-Version");
        Z.debug("1 Collections Last-Modified-Version: " + modifiedVersion, 3);
        Zotero.utils.updateSyncState(library.collections, modifiedVersion);
        var feed = new Zotero.Feed(data, coljqxhr);
        feed.requestConfig = urlconfig;
        var collections = library.collections;
        var collectionsAdded = collections.addCollectionsFromFeed(feed);
        for (var i = 0; i < collectionsAdded.length; i++) {
            collectionsAdded[i].associateWithLibrary(library);
        }
        Z.debug("done parsing collections feed.", 3);
        if (feed.links.hasOwnProperty("next")) {
            Z.debug("has next link.", 3);
            var nextLink = feed.links.next;
            var nextLinkConfig = J.deparam(J.param.querystring(nextLink.href));
            var newConfig = J.extend({}, config);
            newConfig.start = nextLinkConfig.start;
            newConfig.limit = nextLinkConfig.limit;
            var nextDeferred = this.loadCollections(newConfig);
            nextDeferred.done(J.proxy(function(collections) {
                deferred.resolve(collections);
            }, this));
        } else {
            Z.debug("no next in collections link", 3);
            collections.collectionsArray.sort(collections.sortByTitleCompare);
            J.each(collections.collectionsArray, function(index, obj) {
                if (obj.instance === "Zotero.Collection") {
                    if (obj.nestCollection(collections.collectionObjects)) {}
                }
            });
            collections.assignDepths(0, collections.collectionsArray);
            Z.debug("resolving loadCollections deferred", 3);
            Zotero.utils.updateSyncedVersion(library.collections, "collectionsVersion");
            Z.debug("New collectionsVersion: " + collections.syncState.earliestVersion, 3);
            collections.dirty = false;
            collections.loaded = true;
            Z.debug("collections all loaded - saving to cache before resolving deferred", 3);
            Z.debug("collectionsVersion: " + library.collections.collectionsVersion, 3);
            Zotero.trigger("collectionsChanged", {
                library: library
            });
            deferred.resolve(collections);
        }
    }, this);
    if (this.collections.loaded && !this.collections.dirty) {
        Z.debug("already have correct collections loaded", 3);
        deferred.resolve();
        return deferred;
    }
    if (this.collections.loaded && this.collections.dirty) {
        this.collections.collectionsArray = [];
        this.collections.loaded = false;
    }
    var jqxhr = this.fetchCollections(urlconfig);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    }).fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    deferred.done(function(collections) {
        J.publish("loadCollectionsDone", [ collections ]);
    });
    return deferred;
};

Zotero.Library.prototype.fetchCollections = function(config) {
    Z.debug("Zotero.Library.fetchCollections", 3);
    var library = this;
    if (!config) {
        config = {};
    }
    var urlconfig = J.extend(true, {
        target: "collections",
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        content: "json",
        limit: "100"
    }, config);
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var d = Zotero.ajaxRequest(requestUrl, "GET");
    return d;
};

Zotero.Library.prototype.loadCollectionsSimple = function(config) {
    Z.debug("Zotero.Library.loadCollections", 1);
    Z.debug(config);
    var library = this;
    if (!config) {
        config = {};
    }
    var deferred = new J.Deferred;
    var defaultConfig = {
        target: "collections",
        content: "json",
        libraryType: library.libraryType,
        libraryID: library.libraryID
    };
    var urlconfig = J.extend({}, defaultConfig, config);
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var callback = J.proxy(function(data, textStatus, xhr) {
        Z.debug("loadCollectionsSimple proxied callback", 1);
        var collectionsfeed = new Zotero.Feed(data, xhr);
        collectionsfeed.requestConfig = urlconfig;
        var collectionsAdded = library.collections.addCollectionsFromFeed(collectionsfeed);
        for (var i = 0; i < collectionsAdded.length; i++) {
            collectionsAdded[i].associateWithLibrary(library);
        }
        deferred.resolve(collectionsAdded);
    }, this);
    var jqxhr = library.ajaxRequest(requestUrl);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    }).fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    return deferred;
};

Zotero.Library.prototype.addCollection = function(name, parentCollection) {
    var library = this;
    var config = {
        target: "collections",
        libraryType: library.libraryType,
        libraryID: library.libraryID
    };
    var requestUrl = Zotero.ajax.apiRequestString(config);
    var collection = new Zotero.Collection;
    collection.associateWithLibrary(library);
    collection.name = name;
    collection.parentCollection = parentCollection;
    var requestData = JSON.stringify(collection.writeObject());
    var jqxhr = library.ajaxRequest(requestUrl, "POST", {
        data: requestData,
        processData: false
    });
    jqxhr.done(J.proxy(function() {
        this.collections.dirty = true;
        Zotero.trigger("collectionsDirty", {
            library: library
        });
    }, this));
    jqxhr.fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    return jqxhr;
};

Zotero.Library.prototype.fetchItemKeys = function(config) {
    Z.debug("Zotero.Library.fetchItemKeys", 3);
    var library = this;
    if (typeof config == "undefined") {
        config = {};
    }
    var urlconfig = J.extend(true, {
        target: "items",
        libraryType: this.libraryType,
        libraryID: this.libraryID,
        format: "keys"
    }, config);
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var jqxhr = library.ajaxRequest(requestUrl);
    return jqxhr;
};

Zotero.Library.prototype.loadItemKeys = function(config) {
    Z.debug("Zotero.Library.loadItemKeys", 3);
    var library = this;
    var jqxhr = this.fetchItemKeys(config);
    var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
        Z.debug("loadItemKeys proxied callback", 3);
        var library = this;
        var result = data;
        var keys = result.split(/[\s]+/);
        library.itemKeys = keys;
    }, this);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    });
    Zotero.ajax.activeRequests.push(jqxhr);
    return jqxhr;
};

Zotero.Library.prototype.loadItems = function(config) {
    Z.debug("Zotero.Library.loadItems", 3);
    Z.debug(config);
    var library = this;
    if (!config) {
        config = {};
    }
    var deferred = new J.Deferred;
    var defaultConfig = {
        target: "items",
        targetModifier: "top",
        itemPage: 1,
        limit: 25,
        content: "json",
        order: Zotero.config.defaultSortColumn,
        sort: Zotero.config.defaultSortOrder
    };
    var newConfig = J.extend({}, defaultConfig, config);
    newConfig.start = parseInt(newConfig.limit, 10) * (parseInt(newConfig.itemPage, 10) - 1);
    var urlconfig = J.extend({
        target: "items",
        libraryType: library.libraryType,
        libraryID: library.libraryID
    }, newConfig);
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var callback = J.proxy(function(data, textStatus, xhr) {
        Z.debug("loadItems proxied callback", 3);
        var jFeedOb = J(data);
        var itemfeed = new Zotero.Feed(data, xhr);
        itemfeed.requestConfig = newConfig;
        var items = library.items;
        var loadedItemsArray = items.addItemsFromFeed(itemfeed);
        for (var i = 0; i < loadedItemsArray.length; i++) {
            loadedItemsArray[i].associateWithLibrary(library);
        }
        library.items.displayItemsArray = loadedItemsArray;
        library.items.displayItemsUrl = requestUrl;
        library.items.displayItemsFeed = itemfeed;
        library.dirty = false;
        Zotero.trigger("loadItemsDone", {
            library: library
        });
        Zotero.trigger("itemsChanged", {
            library: library
        });
        deferred.resolve({
            itemsArray: loadedItemsArray,
            feed: itemfeed,
            library: library
        });
    }, this);
    Z.debug("displayItemsUrl:" + this.items.displayItemsUrl, 4);
    Z.debug("requestUrl:" + requestUrl, 4);
    if (this.items.displayItemsUrl == requestUrl && !this.dirty) {
        deferred.resolve({
            itemsArray: this.items.displayItemsArray,
            feed: this.items.displayItemsFeed,
            library: library
        });
        return deferred;
    } else {
        var jqxhr = library.ajaxRequest(requestUrl);
        jqxhr.done(callback);
        jqxhr.fail(function() {
            deferred.reject.apply(null, arguments);
        }).fail(Zotero.error);
        Zotero.ajax.activeRequests.push(jqxhr);
    }
    deferred.done(function(itemsArray, feed, library) {
        Z.debug("loadItemsDone about to publish");
        J.publish("loadItemsDone", [ itemsArray, feed, library ]);
    });
    return deferred;
};

Zotero.Library.prototype.loadItemsSimple = function(config) {
    Z.debug("Zotero.Library.loadItems", 3);
    Z.debug(config);
    var library = this;
    if (!config) {
        config = {};
    }
    var deferred = new J.Deferred;
    var defaultConfig = {
        target: "items",
        content: "json"
    };
    var newConfig = J.extend({}, defaultConfig, config);
    var urlconfig = J.extend({
        target: "items",
        libraryType: library.libraryType,
        libraryID: library.libraryID
    }, newConfig);
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    Z.debug("loadItems requestUrl:");
    Z.debug(requestUrl);
    var callback = J.proxy(function(data, textStatus, xhr) {
        Z.debug("loadItems proxied callback", 3);
        var library = this;
        var jFeedOb = J(data);
        var itemfeed = new Zotero.Feed(data, xhr);
        itemfeed.requestConfig = newConfig;
        var items = library.items;
        var loadedItemsArray = items.addItemsFromFeed(itemfeed);
        for (var i = 0; i < loadedItemsArray.length; i++) {
            loadedItemsArray[i].associateWithLibrary(library);
        }
        library.items.displayItemsArray = loadedItemsArray;
        library.items.displayItemsUrl = requestUrl;
        library.items.displayItemsFeed = itemfeed;
        library.dirty = false;
        Zotero.trigger("itemsChanged", {
            library: library
        });
        deferred.resolve({
            itemsArray: loadedItemsArray,
            feed: itemfeed,
            library: library
        });
    }, this);
    var jqxhr = library.ajaxRequest(requestUrl);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    }).fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    deferred.done(function(itemsArray, feed, library) {
        Z.debug("loadItemsDone about to publish");
        J.publish("loadItemsDone", [ itemsArray, feed, library ]);
    });
    return deferred;
};

Zotero.Library.prototype.loadItem = function(itemKey) {
    Z.debug("Zotero.Library.loadItem", 3);
    var library = this;
    if (!config) {
        var config = {
            content: "json"
        };
    }
    var deferred = new J.Deferred;
    var urlconfig = {
        target: "item",
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        itemKey: itemKey,
        content: "json"
    };
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
        var resultOb = J(data);
        var entry = J(data).find("entry").eq(0);
        var item = new Zotero.Item;
        item.libraryType = library.libraryType;
        item.libraryID = library.libraryID;
        item.parseXmlItem(entry);
        item.owningLibrary = library;
        library.items.itemObjects[item.itemKey] = item;
        Zotero.trigger("itemsChanged", {
            library: library
        });
        deferred.resolve(item);
    }, this);
    var jqxhr = library.ajaxRequest(requestUrl);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    }).fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    deferred.done(function(item) {
        J.publish("loadItemDone", [ item ]);
    });
    return deferred;
};

Zotero.Library.prototype.trashItem = function(itemKey) {
    var library = this;
    return library.items.trashItems([ library.items.getItem(itemKey) ]);
};

Zotero.Library.prototype.untrashItem = function(itemKey) {
    Z.debug("Zotero.Library.untrashItem", 3);
    if (!itemKey) return false;
    var item = this.items.getItem(itemKey);
    item.apiObj.deleted = 0;
    return item.writeItem();
};

Zotero.Library.prototype.deleteItem = function(itemKey) {
    Z.debug("Zotero.Library.deleteItem", 3);
    var library = this;
    return library.items.deleteItem(itemKey);
};

Zotero.Library.prototype.deleteItems = function(itemKeys) {
    Z.debug("Zotero.Library.deleteItems", 3);
    var library = this;
    return library.items.deleteItems(itemKeys);
};

Zotero.Library.prototype.addNote = function(itemKey, note) {
    Z.debug("Zotero.Library.prototype.addNote", 3);
    var library = this;
    var config = {
        target: "children",
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        itemKey: itemKey
    };
    var requestUrl = Zotero.ajax.apiRequestString(config);
    var item = this.items.getItem(itemKey);
    var jqxhr = library.ajaxRequest(requestUrl, "POST", {
        processData: false
    });
    Zotero.ajax.activeRequests.push(jqxhr);
    return jqxhr;
};

Zotero.Library.prototype.fetchGlobalItems = function(config) {
    Z.debug("Zotero.Library.fetchGlobalItems", 3);
    Z.debug(config);
    var library = this;
    if (!config) {
        config = {};
    }
    var deferred = new J.Deferred;
    var defaultConfig = {
        target: "items",
        itemPage: 1,
        limit: 25,
        content: "json"
    };
    var newConfig = J.extend({}, defaultConfig, config);
    newConfig.start = parseInt(newConfig.limit, 10) * (parseInt(newConfig.itemPage, 10) - 1);
    var urlconfig = J.extend({
        target: "items",
        libraryType: ""
    }, newConfig);
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    Z.debug("fetchGlobalItems requestUrl:");
    Z.debug(requestUrl);
    var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
        Z.debug("loadItems proxied callback", 3);
        Zotero.temp.globalItemsResponse = data;
        deferred.resolve(data);
    }, this);
    var jqxhr = library.ajaxRequest(requestUrl, "GET", {
        dataType: "json"
    });
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    }).fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    deferred.done(function(globalItems) {
        Z.debug("fetchGlobalItemsDone about to publish");
        J.publish("fetchGlobalItemsDone", globalItems);
    });
    return deferred;
};

Zotero.Library.prototype.fetchGlobalItem = function(globalKey) {
    Z.debug("Zotero.Library.fetchGlobalItem", 3);
    Z.debug(globalKey);
    var library = this;
    var deferred = new J.Deferred;
    var defaultConfig = {
        target: "item"
    };
    var newConfig = J.extend({}, defaultConfig);
    var urlconfig = J.extend({
        target: "item",
        libraryType: "",
        itemKey: globalKey
    }, newConfig);
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    Z.debug("fetchGlobalItem requestUrl:");
    Z.debug(requestUrl);
    var callback = J.proxy(function(data, textStatus, XMLHttpRequest) {
        Z.debug("loadItems proxied callback", 3);
        Zotero.temp.fetchGlobalItemResponse = data;
        deferred.resolve(data);
    }, this);
    var jqxhr = library.ajaxRequest(requestUrl, "GET", {
        dataType: "json"
    });
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    }).fail(Zotero.error);
    Zotero.ajax.activeRequests.push(jqxhr);
    deferred.done(function(globalItem) {
        Z.debug("fetchGlobalItemDone about to publish");
        J.publish("fetchGlobalItemDone", globalItem);
    });
    return deferred;
};

Zotero.Library.prototype.fetchTags = function(config) {
    Z.debug("Zotero.Library.fetchTags", 3);
    var library = this;
    var defaultConfig = {
        target: "tags",
        order: "title",
        sort: "asc",
        limit: 100,
        content: "json"
    };
    var newConfig = J.extend({}, defaultConfig, config);
    var urlconfig = J.extend({
        target: "tags",
        libraryType: this.libraryType,
        libraryID: this.libraryID
    }, newConfig);
    var jqxhr = Zotero.ajaxRequest(urlconfig);
    return jqxhr;
};

Zotero.Library.prototype.loadTags = function(config) {
    Z.debug("Zotero.Library.loadTags", 3);
    var library = this;
    var deferred = new J.Deferred;
    if (typeof config == "undefined") {
        config = {};
    }
    if (config.showAllTags && config.collectionKey) {
        delete config.collectionKey;
    }
    var callback = J.proxy(function(data, textStatus, jqxhr) {
        Z.debug("loadTags proxied callback", 3);
        var modifiedVersion = jqxhr.getResponseHeader("Last-Modified-Version");
        Z.debug("fetchTags Last-Modified-Version: " + modifiedVersion, 3);
        Zotero.utils.updateSyncState(library.tags, modifiedVersion);
        var tagsfeed = new Zotero.Feed(data, jqxhr);
        tagsfeed.requestConfig = config;
        var tags = library.tags;
        var addedTags = tags.addTagsFromFeed(tagsfeed);
        if (tagsfeed.links.hasOwnProperty("next")) {
            library.tags.hasNextLink = true;
            library.tags.nextLink = tagsfeed.links["next"];
        } else {
            library.tags.hasNextLink = false;
            library.tags.nextLink = null;
        }
        Z.debug("resolving loadTags deferred", 3);
        Zotero.trigger("tagsChanged", {
            library: library
        });
        deferred.resolve(library.tags);
    }, this);
    library.tags.displayTagsArray = [];
    var jqxhr = this.fetchTags(config);
    jqxhr.done(callback);
    jqxhr.fail(function() {
        deferred.reject.apply(null, arguments);
    });
    Zotero.ajax.activeRequests.push(jqxhr);
    return deferred;
};

Zotero.Library.prototype.loadAllTags = function(config, checkCached) {
    Z.debug("Zotero.Library.loadAllTags", 3);
    Z.debug(config);
    var library = this;
    if (typeof checkCached == "undefined") {
        checkCached = true;
    }
    if (typeof config == "undefined") {
        config = {};
    }
    var deferred = new J.Deferred;
    deferred.done(J.proxy(function() {
        Zotero.debug("loadAllTags deferred resolved - saving to cache.", 3);
    }, this));
    var defaultConfig = {
        target: "tags",
        content: "json",
        order: "title",
        sort: "asc",
        limit: 100
    };
    var newConfig = J.extend({}, defaultConfig, config);
    var urlconfig = J.extend({
        target: "tags",
        libraryType: library.libraryType,
        libraryID: library.libraryID
    }, newConfig);
    var requestUrl = Zotero.ajax.apiRequestString(urlconfig);
    var tags = library.tags;
    var loadedConfig = J.extend({
        target: "tags",
        libraryType: library.libraryType,
        libraryID: library.libraryID
    }, defaultConfig, tags.loadedConfig);
    var loadedConfigRequestUrl = tags.loadedRequestUrl;
    Z.debug("requestUrl: " + requestUrl, 4);
    Z.debug("loadedConfigRequestUrl: " + loadedConfigRequestUrl, 4);
    if (tags.loaded && checkCached) {
        Z.debug("tags already loaded - publishing and resolving deferred", 3);
        deferred.resolve(tags);
        return deferred;
    } else {
        Z.debug("tags not loaded", 3);
        Z.debug("in loadAllTags: tags:", 3);
        Z.debug(tags, 4);
    }
    var continueLoadingCallback = J.proxy(function(tags) {
        Z.debug("loadAllTags continueLoadingCallback", 3);
        var plainList = Zotero.Tags.prototype.plainTagsList(tags.tagsArray);
        plainList.sort(Zotero.Library.prototype.sortLower);
        tags.plainList = plainList;
        Z.debug("done parsing one tags feed - checking for more.", 3);
        J.publish("tags_page_loaded", [ tags ]);
        if (tags.hasNextLink) {
            Z.debug("still has next link.", 3);
            tags.tagsArray.sort(library.sortByTitleCompare);
            plainList = Zotero.Tags.prototype.plainTagsList(tags.tagsArray);
            plainList.sort(Zotero.Library.prototype.sortLower);
            tags.plainList = plainList;
            var nextLink = tags.nextLink;
            var nextLinkConfig = J.deparam(J.param.querystring(nextLink.href));
            var newConfig = J.extend({}, config);
            newConfig.start = nextLinkConfig.start;
            newConfig.limit = nextLinkConfig.limit;
            var nextDeferred = library.loadTags(newConfig);
            Zotero.ajax.activeRequests.push(nextDeferred);
            nextDeferred.done(continueLoadingCallback);
        } else {
            Z.debug("no next in tags link", 3);
            Zotero.utils.updateSyncedVersion(tags, "tagsVersion");
            tags.tagsArray.sort(library.sortByTitleCompare);
            plainList = Zotero.Tags.prototype.plainTagsList(tags.tagsArray);
            plainList.sort(Zotero.Library.prototype.sortLower);
            tags.plainList = plainList;
            Z.debug("resolving loadTags deferred", 3);
            library.tagsLoaded = true;
            library.tags.loaded = true;
            tags.loadedConfig = config;
            tags.loadedRequestUrl = requestUrl;
            for (var i = 0; i < library.tags.tagsArray.length; i++) {
                tags.tagsArray[i].tagVersion = tags.tagsVersion;
            }
            Zotero.trigger("tagsChanged", {
                library: library
            });
            deferred.resolve(tags);
        }
    }, this);
    var lDeferred = library.loadTags(urlconfig);
    Zotero.ajax.activeRequests.push(lDeferred);
    lDeferred.done(continueLoadingCallback);
    return deferred;
};

Zotero.Library.prototype.loadItemTemplates = function() {};

Zotero.Library.prototype.loadCreatorTypes = function() {};

Zotero.Library.prototype.saveFileOffline = function(item) {
    try {
        Z.debug("Zotero.Library.saveFileOffline", 3);
        var library = this;
        var deferred = new J.Deferred;
        if (library.filestorage === false) {
            return false;
        }
        var enclosureUrl;
        var mimetype;
        if (item.links && item.links["enclosure"]) {
            enclosureUrl = item.links.enclosure.href;
            mimetype = item.links.enclosure.type;
        } else {
            return false;
        }
        var reqUrl = enclosureUrl + Zotero.ajax.apiQueryString({});
        Z.debug("reqUrl:" + reqUrl, 3);
        var xhr = new XMLHttpRequest;
        xhr.open("GET", Zotero.ajax.proxyWrapper(reqUrl, "GET"), true);
        xhr.responseType = "blob";
        xhr.onload = function(e) {
            try {
                if (this.status == 200) {
                    Z.debug("Success downloading");
                    var blob = this.response;
                    library.filestorage.filer.write("/" + item.itemKey, {
                        data: blob,
                        type: mimetype
                    }, J.proxy(function(fileEntry, fileWriter) {
                        try {
                            Z.debug("Success writing file");
                            Z.debug("Saved file for item " + item.itemKey + " for offline use");
                            Z.debug("Saving file object somewhere in Zotero namespace:");
                            library.filestorage.filer.open(fileEntry, J.proxy(function(file) {
                                try {
                                    Z.debug("reading back filesystem stored file into object url");
                                    deferred.resolve(true);
                                } catch (e) {
                                    Z.debug("Caught in filer.open");
                                    Z.debug(e);
                                }
                            }, this));
                        } catch (e) {
                            Z.debug("Caught in filer.write");
                            Z.debug(e);
                        }
                    }, this));
                }
            } catch (e) {
                Z.debug("Caught inside binary xhr onload");
                Z.debug(e);
            }
        };
        xhr.send();
        return deferred;
    } catch (e) {
        Z.debug("Caught in Z.Library.saveFileOffline");
        Z.debug(e);
    }
};

Zotero.Library.prototype.saveFileSetOffline = function(itemKeys) {
    Z.debug("Zotero.Library.saveFileSetOffline", 3);
    var library = this;
    var ds = [];
    var deferred = new J.Deferred;
    var item;
    var childItemKeys = [];
    var checkedKeys = {};
    J.each(itemKeys, function(ind, itemKey) {
        if (checkedKeys.hasOwnProperty(itemKey)) {
            return;
        } else {
            checkedKeys[itemKey] = 1;
        }
        item = library.items.getItem(itemKey);
        if (item && item.links && item.links["enclosure"]) {
            ds.push(library.saveFileOffline(item));
        }
        if (item.numChildren) {
            J.each(item.childItemKeys, function(ind, val) {
                childItemKeys.push(val);
            });
        }
    });
    J.each(childItemKeys, function(ind, itemKey) {
        if (checkedKeys.hasOwnProperty(itemKey)) {
            return;
        } else {
            checkedKeys[itemKey] = 1;
        }
        item = library.items.getItem(itemKey);
        if (item && item.links && item.links["enclosure"]) {
            ds.push(library.saveFileOffline(item));
        }
    });
    J.when.apply(null, ds).then(J.proxy(function() {
        var d = library.filestorage.listOfflineFiles();
        d.done(J.proxy(function(localItemKeys) {
            deferred.resolve();
        }, this));
    }));
    return deferred;
};

Zotero.Library.prototype.saveCollectionFilesOffline = function(collectionKey) {
    Zotero.debug("Zotero.Library.saveCollectionFilesOffline " + collectionKey, 3);
    var library = this;
    var collection = library.collections.getCollection(collectionKey);
    var itemKeys = collection.itemKeys;
    var d = Zotero.Library.prototype.saveFileSetOffline(itemKeys);
    return d;
};

Zotero.Library.prototype.loadIndexedDBCache = function() {
    Zotero.debug("Zotero.Library.loadIndexedDBCache", 3);
    var library = this;
    var cacheLoadD = new J.Deferred;
    var itemsD = library.idbLibrary.getAllItems();
    var collectionsD = library.idbLibrary.getAllCollections();
    var tagsD = library.idbLibrary.getAllTags();
    itemsD.done(J.proxy(function(itemsArray) {
        Z.debug("loadIndexedDBCache itemsD done", 3);
        var latestVersion = 0;
        var dump = {};
        dump.instance = "Zotero.Items.dump";
        dump.itemsVersion = 0;
        dump.itemsArray = itemsArray;
        for (var i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].itemVersion > latestVersion) {
                latestVersion = itemsArray[i].itemVersion;
            }
        }
        dump.itemsVersion = latestVersion;
        library.items.loadDump(dump);
        library.items.loaded = true;
    }, this));
    collectionsD.done(J.proxy(function(collectionsArray) {
        Z.debug("loadIndexedDBCache collectionsD done", 3);
        var latestVersion = 0;
        var dump = {};
        dump.instance = "Zotero.Collections.dump";
        dump.collectionsVersion = 0;
        dump.collectionsArray = collectionsArray;
        for (var i = 0; i < collectionsArray.length; i++) {
            if (collectionsArray[i].collectionVersion > latestVersion) {
                latestVersion = collectionsArray[i].collectionVersion;
            }
        }
        dump.collectionsVersion = latestVersion;
        library.collections.loadDump(dump);
        library.collections.loaded = true;
    }, this));
    tagsD.done(J.proxy(function(tagsArray) {
        var latestVersion = 0;
        var dump = {};
        dump.instance = "Zotero.Collections.dump";
        dump.tagsVersion = 0;
        dump.tagsArray = tagsArray;
        for (var i = 0; i < tagsArray.length; i++) {
            if (tagsArray[i].tagVersion > latestVersion) {
                latestVersion = tagsArray[i].tagVersion;
            }
        }
        dump.tagsVersion = latestVersion;
        library.tags.loadDump(dump);
        library.tags.loaded = true;
    }, this));
    J.when.apply(this, [ itemsD, collectionsD, tagsD ]).then(J.proxy(function() {
        cacheLoadD.resolve(library);
    }, this));
    return cacheLoadD;
};

Zotero.Library.prototype.saveIndexedDB = function() {
    var library = this;
    var idbSaveD = new J.Deferred;
    var saveItemsD = library.idbLibrary.updateItems(library.items.itemsArray);
    var saveCollectionsD = library.idbLibrary.updateCollections(library.collections.collectionsArray);
    var saveTagsD = library.idbLibrary.updateTags(library.tags.tagsArray);
    J.when.apply(this, [ saveItemsD, saveCollectionsD, saveTagsD ]).then(J.proxy(function() {
        Z.debug("saveIndexedDB complete", 1);
        idbSaveD.resolve(library);
    }, this));
    return idbSaveD;
};

Zotero.Library.prototype.loadCachedItems = function() {
    Zotero.debug("Zotero.Library.loadCachedItems", 3);
    var library = this;
    var cacheConfig = {
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        target: "allitems"
    };
    var itemsDump = Zotero.cache.load(cacheConfig);
    if (itemsDump !== null) {
        Zotero.debug("Items dump present in cache - loading items", 3);
        library.items.loadDump(itemsDump);
        library.items.loaded = true;
        return true;
    } else {
        return false;
    }
};

Zotero.Library.prototype.saveCachedItems = function() {
    var library = this;
    var cacheConfig = {
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        target: "allitems"
    };
    Zotero.cache.save(cacheConfig, library.items.dump());
    return;
};

Zotero.Library.prototype.loadCachedCollections = function() {
    Z.debug("Zotero.Library.loadCachedCollections", 3);
    var library = this;
    var cacheConfig = {
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        target: "allcollections"
    };
    var collectionsDump = Zotero.cache.load(cacheConfig);
    if (collectionsDump !== null) {
        Z.debug("Collections dump present in cache - loading collections", 4);
        library.collections.loadDump(collectionsDump);
        library.collections.loaded = true;
        return true;
    } else {
        return false;
    }
};

Zotero.Library.prototype.saveCachedCollections = function() {
    var library = this;
    var cacheConfig = {
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        target: "allcollections"
    };
    Zotero.cache.save(cacheConfig, library.collections.dump());
    return;
};

Zotero.Library.prototype.loadCachedTags = function() {
    var library = this;
    var cacheConfig = {
        libraryType: this.libraryType,
        libraryID: this.libraryID,
        target: "alltags"
    };
    var tagsDump = Zotero.cache.load(cacheConfig);
    if (tagsDump !== null) {
        Z.debug("Tags dump present in cache - loading", 3);
        library.tags.loadDump(tagsDump);
        library.tags.loaded = true;
        Zotero.trigger("tagsChanged", {
            library: library
        });
        return true;
    } else {
        return false;
    }
};

Zotero.Library.prototype.saveCachedTags = function() {
    var library = this;
    var cacheConfig = {
        libraryType: library.libraryType,
        libraryID: library.libraryID,
        target: "alltags"
    };
    Zotero.cache.save(cacheConfig, library.tags.dump());
    return;
};

Zotero.Preferences = function(store, idString) {
    this.store = store;
    this.idString = idString;
    this.preferencesObject = {};
    this.defaults = {
        debug_level: 3,
        debug_log: true,
        debug_mock: false,
        listDisplayedFields: [ "title", "creator", "dateModified" ],
        itemsPerPage: 25,
        order: "title",
        title: "asc"
    };
    this.load();
};

Zotero.Preferences.prototype.setPref = function(key, value) {
    var preferences = this;
    preferences.preferencesObject[key] = value;
    preferences.persist();
};

Zotero.Preferences.prototype.setPrefs = function(newPrefs) {
    var preferences = this;
    if (typeof newPrefs != "object") {
        throw "Preferences must be an object";
    }
    preferences.preferencesObject = newPrefs;
    preferences.persist();
};

Zotero.Preferences.prototype.getPref = function(key) {
    var preferences = this;
    if (preferences.preferencesObject[key]) {
        return preferences.preferencesObject[key];
    } else if (preferences.defaults[key]) {
        return preferences.defaults[key];
    } else {
        return null;
    }
};

Zotero.Preferences.prototype.getPrefs = function() {
    var preferences = this;
    return preferences.preferencesObject;
};

Zotero.Preferences.prototype.persist = function() {
    var preferences = this;
    var storageString = "preferences_" + preferences.idString;
    preferences.store[storageString] = JSON.stringify(preferences.preferencesObject);
};

Zotero.Preferences.prototype.load = function() {
    var preferences = this;
    var storageString = "preferences_" + preferences.idString;
    var storageObjectString = preferences.store[storageString];
    if (!storageObjectString) {
        preferences.preferencesObject = {};
    } else {
        preferences.preferencesObject = JSON.parse(storageObjectString);
    }
};

var J = jQuery.noConflict();

jQuery(document).ready(function() {
    Z.debug("*&^*&^*&^*&^*&^*&^*&^*&^*&^ DOM READY *&^*&^*&^*&^*&^*&^*&^*&^*&^", 3);
    Zotero.init();
});

Zotero.defaultPrefs = {
    debug_level: 3,
    debug_log: true,
    debug_mock: false,
    javascript_enabled: false
};

Zotero.init = function() {
    Z.debug("Zotero init", 3);
    if (Zotero.pages) {
        Zotero.pages.base.init();
    }
    if (undefined !== window.zoterojsClass && undefined !== Zotero.pages) {
        try {
            Zotero.pages[zoterojsClass].init();
        } catch (err) {
            Z.debug("Error running page specific init for " + zoterojsClass, 1);
        }
    }
    Zotero.loadConfig(zoteroData);
    if (typeof zoteroData == "undefined") {
        zoteroData = {};
    }
    if (window.nonZendPage === true) {
        return;
    }
    Zotero.nav.parseUrlVars();
    Zotero.config.startPageTitle = document.title;
    var store;
    if (typeof sessionStorage == "undefined") {
        store = {};
    } else {
        store = sessionStorage;
    }
    Zotero.cache = new Zotero.Cache(store);
    Zotero.store = store;
    Zotero.preferences = new Zotero.Preferences(Zotero.store, "global");
    Zotero.preferences.defaults = J.extend({}, Zotero.preferences.defaults, Zotero.config.defaultPrefs);
    var locale = "en-US";
    if (zoteroData.locale) {
        locale = zoteroData.locale;
    }
    var libraryPage = J("body").hasClass("library");
    if (libraryPage) {
        Zotero.config.librarySettings.libraryUserSlug = zoteroData.libraryUserSlug;
        Zotero.config.librarySettings.libraryUserID = zoteroData.libraryUserID;
        Zotero.config.librarySettings.allowEdit = zoteroData.allowEdit;
        if (Zotero.config.pageClass == "user_library" || Zotero.config.pageClass == "group_library" || Zotero.config.pageClass == "my_library") {
            Zotero.Item.prototype.getItemTypes(locale);
            Zotero.Item.prototype.getItemFields(locale);
            Zotero.Item.prototype.getCreatorFields(locale);
            Zotero.Item.prototype.getCreatorTypes();
        }
    }
    Zotero.ui.init.all();
    J.ajaxSettings.traditional = true;
    if (Zotero.nav.getUrlVar("proxy") == "false") {
        Zotero.config.proxy = false;
    }
    if (Zotero.preferences.getPref("server_javascript_enabled") === false) {
        Zotero.preferences.setPref("server_javascript_enabled") = true;
        document.cookie = "zoterojsenabled=1; expires=; path=/";
    }
    window.onpopstate = function() {
        Z.debug("popstate");
        J(window).trigger("statechange");
    };
    J(window).on("statechange", Zotero.nav.stateChangeCallback);
    Zotero.nav.urlChangeCallback();
};

Zotero.loadConfig = function(config) {
    if (config.mobile) {
        Zotero.config.mobile = true;
        Zotero.state.mobilePageFirstLoad = true;
    }
    if (typeof zoterojsClass !== "undefined") {
        Zotero.config.pageClass = zoterojsClass;
    } else {
        Zotero.config.pageClass = "default";
    }
    if (config.itemsPathString) {
        Zotero.config.librarySettings.itemsPathString = config.itemsPathString;
        Zotero.config.nonparsedBaseUrl = config.itemsPathString;
    } else if (config.nonparsedBaseUrl) {
        Zotero.config.nonparsedBaseUrl = config.nonparsedBaseUrl;
    } else {
        Zotero.config.librarySettings.itemsPathString = Zotero.config.baseWebsiteUrl;
        Zotero.config.nonparsedBaseUrl = Zotero.config.baseWebsiteUrl;
    }
    if (config.locale) {
        Zotero.config.locale = config.locale;
    }
    if (typeof Globalize !== "undefined") {
        Globalize.culture(Zotero.config.locale);
    }
    if (config.apiKey) {
        Zotero.config.apiKey = config.apiKey;
    }
    if (config.loggedInUserID) {
        Zotero.config.loggedInUserID = config.loggedInUserID;
        Zotero.config.loggedIn = true;
    } else {
        Zotero.config.loggedIn = false;
    }
};

Zotero.nav = {};

Zotero.nav._ignoreStateChange = 0;

Zotero.nav.urlvars = {
    q: {},
    f: {},
    pathVars: {},
    startUrl: ""
};

Zotero.nav.replacePush = false;

Zotero.nav.startUrl = "";

Zotero.nav.currentHref = "";

Zotero.nav.prevHref = "";

Zotero.nav.curState = {};

Zotero.nav.prevState = {};

Zotero.nav.pushTag = function(newtag) {
    Z.debug("Zotero.nav.pushTag", 3);
    if (Zotero.nav.urlvars.pathVars["tag"]) {
        if (Zotero.nav.urlvars.pathVars["tag"] instanceof Array) {
            Zotero.nav.urlvars.pathVars["tag"].push(newtag);
        } else {
            var currentTag = Zotero.nav.urlvars.pathVars["tag"];
            Zotero.nav.urlvars.pathVars["tag"] = [ currentTag, newtag ];
        }
    } else {
        Zotero.nav.urlvars.pathVars["tag"] = [ newtag ];
    }
    return;
};

Zotero.nav.popTag = function(oldtag) {
    Z.debug("Zotero.nav.popTag", 3);
    if (!Zotero.nav.urlvars.pathVars["tag"]) {
        return;
    } else if (Zotero.nav.urlvars.pathVars["tag"] instanceof Array) {
        var newTagArray = Zotero.nav.urlvars.pathVars["tag"].filter(function(element, index, array) {
            return element != oldtag;
        });
        Zotero.nav.urlvars.pathVars["tag"] = newTagArray;
        return;
    } else if (Zotero.nav.urlvars.pathVars["tag"] == oldtag) {
        Zotero.nav.urlvars.pathVars["tag"] = [];
        return;
    }
};

Zotero.nav.toggleTag = function(tagtitle) {
    Z.debug("Zotero.nav.toggleTag", 3);
    if (!Zotero.nav.urlvars.pathVars["tag"]) {
        Z.debug("Zotero.nav.urlvars.pathVars['tag'] evaluates false");
        Z.debug(Zotero.nav.urlvars.pathVars);
        Zotero.nav.urlvars.pathVars["tag"] = [ tagtitle ];
        return;
    } else if (J.isArray(Zotero.nav.urlvars.pathVars["tag"])) {
        Z.debug("pathVars tag is array");
        if (J.inArray(tagtitle, Zotero.nav.urlvars.pathVars["tag"]) != -1) {
            Z.debug("tag already present, removing", 3);
            var newTagArray = Zotero.nav.urlvars.pathVars["tag"].filter(function(element, index, array) {
                return element != tagtitle;
            });
            Zotero.nav.urlvars.pathVars["tag"] = newTagArray;
            return;
        } else {
            Z.debug("pushing tag", 3);
            Zotero.nav.urlvars.pathVars["tag"].push(tagtitle);
            return;
        }
    } else if (Zotero.nav.urlvars.pathVars["tag"] == tagtitle) {
        Zotero.nav.urlvars.pathVars["tag"] = [];
        return;
    } else if (typeof Zotero.nav.urlvars.pathVars["tag"] == "string") {
        var oldValue = Zotero.nav.urlvars.pathVars["tag"];
        Zotero.nav.urlvars.pathVars["tag"] = [ oldValue, tagtitle ];
        return;
    }
    Z.debug("reached end of toggleTag with no satisfaction");
};

Zotero.nav.unsetUrlVar = function(unset) {
    Z.debug("Zotero.nav.unsetUrlVar", 3);
    var pathVars = Zotero.nav.urlvars.pathVars;
    if (pathVars[unset]) {
        delete pathVars[unset];
    }
};

Zotero.nav.clearUrlVars = function(except) {
    Z.debug("Zotero.nav.clearUrlVars", 3);
    Z.debug(except);
    if (!except) {
        except = [];
    }
    var pathVars = Zotero.nav.urlvars.pathVars;
    J.each(pathVars, function(key, value) {
        if (J.inArray(key, except) == -1) {
            Z.debug(key + " not in except array - deleting from pathVars");
            delete pathVars[key];
        }
    });
};

Zotero.nav.parseUrlVars = function() {
    Z.debug("Zotero.nav.parseUrlVars", 3);
    Zotero.nav.urlvars = {
        q: J.deparam(J.param.querystring()),
        f: Zotero.nav.parseFragmentVars(),
        pathVars: Zotero.nav.parsePathVars()
    };
};

Zotero.nav.parsePathVars = function(pathname) {
    Z.debug("Zotero.nav.parsePathVars", 3);
    var history = window.history;
    if (!pathname) {
        var state = history.state;
        pathname = window.location.pathname;
    }
    var basePath = Zotero.config.nonparsedBaseUrl;
    var split_replaced = [];
    var re = new RegExp(".*" + basePath + "/?");
    var replaced = pathname.replace(re, "");
    Z.debug(replaced, 4);
    split_replaced = replaced.split("/");
    Z.debug(split_replaced, 4);
    var pathVars = {};
    for (var i = 0; i < split_replaced.length - 1; i = i + 2) {
        var pathVar = pathVars[split_replaced[i]];
        Z.debug("pathVar: " + pathVar, 4);
        if (pathVar) {
            Z.debug("pathVar already has value", 4);
            if (pathVar instanceof Array) {
                pathVar.push(decodeURIComponent(split_replaced[i + 1]));
            } else {
                var ar = [ pathVar ];
                ar.push(decodeURIComponent(split_replaced[i + 1]));
                pathVar = ar;
            }
        } else {
            Z.debug("pathVar does not have value", 4);
            pathVar = decodeURIComponent(split_replaced[i + 1]);
        }
        pathVars[split_replaced[i]] = pathVar;
    }
    if (pathVars["itemkey"]) {
        var itemKey = pathVars["itemkey"];
        pathVars["itemKey"] = itemKey;
        delete pathVars["itemkey"];
    }
    Z.debug(pathVars, 4);
    return pathVars;
};

Zotero.nav.parseFragmentVars = function() {
    var fragmentVars = {};
    var fragment = J.param.fragment();
    var split_fragment = fragment.split("/");
    for (var i = 0; i < split_fragment.length - 1; i = i + 2) {
        fragmentVars[split_fragment[i]] = split_fragment[i + 1];
    }
    return fragmentVars;
};

Zotero.nav.buildUrl = function(urlvars, fragment) {
    if (typeof fragment === "undefined") {
        fragment = false;
    }
    var basePath = Zotero.config.nonparsedBaseUrl + "/";
    var urlVarsArray = [];
    J.each(urlvars, function(index, value) {
        if (!value) {
            return;
        } else if (value instanceof Array) {
            J.each(value, function(i, v) {
                urlVarsArray.push(index + "/" + encodeURIComponent(v));
            });
        } else {
            urlVarsArray.push(index + "/" + encodeURIComponent(value));
        }
    });
    urlVarsArray.sort();
    var pathVarsString = urlVarsArray.join("/");
    var url = basePath + pathVarsString;
    return url;
};

Zotero.nav.mutateUrl = function(addvars, removevars) {
    if (!addvars) {
        addvars = {};
    }
    if (!removevars) {
        removevars = [];
    }
    var urlvars = J.extend({}, Zotero.nav.urlvars.pathVars);
    J.each(addvars, function(key, val) {
        urlvars[key] = val;
    });
    J.each(removevars, function(index, val) {
        delete urlvars[val];
    });
    var url = Zotero.nav.buildUrl(urlvars, false);
    return url;
};

Zotero.nav.pushState = function(force, state) {
    Z.debug("Zotero.nav.pushState", 3);
    var history = window.history;
    Zotero.ui.saveFormData();
    Zotero.nav.prevHref = window.location.href;
    var s = {};
    if (state) {
        s = state;
    }
    urlvars = Zotero.nav.urlvars.pathVars;
    var url = Zotero.nav.buildUrl(urlvars, false);
    Z.debug("about to push url: " + url, 3);
    if (Zotero.nav.replacePush === true) {
        Z.debug("Zotero.nav.pushState - replacePush", 3);
        Zotero.nav.replacePush = false;
        Zotero.nav.ignoreStateChange();
        history.replaceState(s, document.title, url);
    } else {
        Z.debug("Zotero.nav.pushState - pushState", 3);
        history.pushState(s, document.title, url);
        J(window).trigger("popstate");
    }
    if (force) {
        Zotero.nav.urlChangeCallback({
            type: "popstate",
            originalEvent: {
                state: urlvars
            }
        });
    }
    Zotero.debug("leaving pushstate", 3);
};

Zotero.nav.replaceState = function(force, state) {
    Z.debug("Zotero.nav.replaceState", 3);
    var history = window.history;
    Zotero.ui.saveFormData();
    if (typeof force == "undefined") {
        force = false;
    }
    var s = null;
    if (state) {
        s = state;
    }
    urlvars = Zotero.nav.urlvars.pathVars;
    var url = Zotero.nav.buildUrl(urlvars, false);
    Zotero.state.ignoreStatechange = true;
    Zotero.nav.ignoreStateChange();
    history.replaceState(s, null, url);
    Zotero.nav.currentHref = window.location.href;
};

Zotero.nav.updateStateTitle = function(title) {
    Zotero.debug("Zotero.nav.updateStateTitle", 3);
    document.title = title;
};

Zotero.nav.getUrlVar = function(key) {
    if (Zotero.nav.urlvars.pathVars.hasOwnProperty(key) && Zotero.nav.urlvars.pathVars[key] !== "") {
        return Zotero.nav.urlvars.pathVars[key];
    } else if (Zotero.nav.urlvars.f.hasOwnProperty(key)) {
        return Zotero.nav.urlvars.f[key];
    } else if (Zotero.nav.urlvars.q.hasOwnProperty(key)) {
        return Zotero.nav.urlvars.q[key];
    }
    return undefined;
};

Zotero.nav.setUrlVar = function(key, val) {
    Zotero.nav.urlvars.pathVars[key] = val;
};

Zotero.nav.getUrlVars = function() {
    var params = J.deparam(J.param.querystring());
    return J.extend(true, {}, Zotero.nav.urlvars.pathVars, params, J.deparam(J.param.fragment()));
};

Zotero.nav.setFragmentVar = function(key, val) {
    Zotero.nav.urlvars.f[key] = val;
};

Zotero.nav.setQueryVar = function(key, val) {
    if (val === "") {
        delete Zotero.nav.urlvars.q[key];
    } else {
        Zotero.nav.urlvars.q[key] = val;
    }
};

Zotero.nav.addQueryVar = function(key, val) {
    if (Zotero.nav.urlvars.q.hasOwnProperty(key)) {
        if (J.isArray(Zotero.nav.urlvars.q[key])) {
            Zotero.nav.urlvars.q[key].push(val);
        } else {
            var newArray = [ Zotero.nav.urlvars.q[key], val ];
            Zotero.nav.urlvars.q[key] = newArray;
        }
    } else {
        Zotero.nav.urlvars.q[key] = val;
    }
    return Zotero.nav.urlvars.q[key];
};

Zotero.nav.updateFragment = function(updatedVars) {
    Z.debug("updateFragment", 3);
    J.bbq.pushState(updatedVars, 0);
};

Zotero.nav.urlChangeCallback = function(event) {
    Z.debug("////////////////////urlChangeCallback//////////////////", 3);
    var history = window.history;
    Zotero.nav.prevHref = Zotero.nav.currentHref;
    Z.debug("new href, updating href and processing urlchange", 3);
    Zotero.nav.currentHref = window.location.href;
    Zotero.nav.parseUrlVars();
    J(".ajaxload").each(function(index, el) {
        Z.debug("ajaxload element found", 3);
        Z.debug(J(el).attr("data-function"), 3);
        var prefunctionName = J(el).data("prefunction");
        if (prefunctionName) {
            Zotero.callbacks[prefunctionName](el);
        }
        if (J(el).data("loading")) {
            J(el).data("queuedWaiting", true);
        } else {
            Zotero.nav.callbackAssignedFunction(el);
        }
    });
    Z.debug("Checking changed variables", 3);
    var changedVars = Zotero.nav.diffState(Zotero.nav.prevHref, Zotero.nav.curHref);
    Z.debug(changedVars);
    var widgetEvents = {};
    J.each(changedVars, function(ind, val) {
        var eventString = val + "Changed";
        Z.debug(eventString);
        if (Zotero.eventful.eventMap.hasOwnProperty(eventString)) {
            J.each(Zotero.eventful.eventMap[eventString], function(ind, val) {
                if (!widgetEvents.hasOwnProperty(val)) {
                    widgetEvents[val] = 1;
                }
            });
        }
        Zotero.ui.eventful.trigger(eventString);
    });
    J.each(widgetEvents, function(ind, val) {
        Zotero.ui.eventful.trigger(ind);
    });
    Z.debug("<<<<<<<<<<<<<<<<<<<<<<<<urlChangeCallback Done>>>>>>>>>>>>>>>>>>>>>", 3);
};

Zotero.nav.urlAlwaysCallback = function(el) {
    Z.debug("_____________urlAlwaysCallback________________", 3);
    Zotero.nav.parseUrlVars();
    J(".ajaxload.always").each(function(index, el) {
        try {
            Z.debug("ajaxload element found", 3);
            Z.debug(J(el).attr("data-function"), 3);
            var prefunctionName = J(el).data("prefunction");
            if (prefunctionName) {
                Zotero.callbacks[prefunctionName](el);
            }
            if (J(el).data("loading")) {
                J(el).data("queuedWaiting", true);
            } else {
                Zotero.nav.callbackAssignedFunction(el);
            }
        } catch (e) {
            Z.debug("Couldn't call ajaxload specified function", 1);
            Z.debug(e, 1);
        }
    });
};

Zotero.nav.callbackAssignedFunction = function(el) {
    var functionName = J(el).data("function");
    if (functionName) {
        Zotero.callbacks[functionName](el);
    }
};

Zotero.nav.flagLoading = function(el) {
    J(el).data("loading", true);
};

Zotero.nav.doneLoading = function(el) {
    Z.debug("Zotero.nav.doneLoading", 3);
    J(el).data("loading", false);
    if (J(el).data("queuedWaiting")) {
        J(el).data("queuedWaiting", false);
        Zotero.nav.callbackAssignedFunction(el);
    }
};

Zotero.nav._ignoreTimer = null;

Zotero.nav.ignoreStateChange = function() {
    Z.debug("Zotero.nav.ignoreStateChange", 3);
    if (Zotero.nav._ignoreTimer) {
        window.clearTimeout(Zotero.nav._ignoreTimer);
    }
    Zotero.nav._ignoreStateChange++;
    Zotero.nav._ignoreTimer = window.setTimeout(function() {
        Z.debug("clear ignoreState semaphore", 3);
        Zotero.nav._ignoreStateChange = 0;
    }, 500);
    return;
};

Zotero.nav.diffState = function(prevHref, curHref) {
    Z.debug("Zotero.nav.diffState", 3);
    var prevVars = J.extend({}, Zotero.nav.parsePathVars(prevHref));
    var curVars = J.extend({}, Zotero.nav.parsePathVars(curHref));
    var monitoredVars = [ "start", "limit", "order", "sort", "content", "format", "q", "fq", "itemType", "itemKey", "collectionKey", "searchKey", "locale", "tag", "tagType", "key", "style", "session", "newer", "itemPage", "mode" ];
    var changedVars = [];
    J.each(monitoredVars, function(ind, val) {
        if (prevVars.hasOwnProperty(val) || curVars.hasOwnProperty(val)) {
            if (prevVars[val] != curVars[val]) {
                changedVars.push(val);
            }
        }
    });
    return changedVars;
};

Zotero.nav.stateChangeCallback = function(event) {
    Z.debug("stateChangeCallback");
    if (Zotero.nav._ignoreStateChange > 0) {
        Zotero.nav._ignoreStateChange--;
        Zotero.nav.urlAlwaysCallback();
        Z.debug("Statechange ignored " + Zotero.nav._ignoreStateChange, 3);
    } else {
        Zotero.nav.urlChangeCallback(event);
    }
};

J(document).ajaxError(Zotero.nav.error);

Zotero.callbacks = {};

Zotero.callbacks.chooseItemPane = function(el) {
    Z.debug("Zotero.callbacks.chooseItemPane", 3);
    var showPane = "list";
    var itemList = J("#library-items-div");
    var itemDetail = J("#item-details-div");
    var itemKey = Zotero.nav.getUrlVar("itemKey");
    Z.debug("showPane itemKey : " + itemKey, 3);
    if (itemKey) {
        showPane = "detail";
    } else if (Zotero.nav.getUrlVar("action") == "newItem") {
        showPane = "detail";
    }
    if (showPane == "detail") {
        Z.debug("item pane displaying detail", 3);
        itemList.hide();
        itemDetail.show();
    } else if (showPane == "list") {
        Z.debug("item pane displaying list", 3);
        itemDetail.hide();
        itemList.show();
    }
    if (Zotero.config.mobile) {
        if (showPane == "detail") {
            J("#items-pane-edit-panel-div").hide();
            J("#filter-guide-div").hide();
        } else if (showPane == "list") {
            J("#items-pane-edit-panel-div").show();
            J("#filter-guide-div").show();
        }
    }
};

Zotero.callbacks.rejectIfPending = function(el) {
    var pendingDeferred = J(el).data("pendingDeferred");
    if (pendingDeferred && pendingDeferred.hasOwnProperty("reject")) {
        pendingDeferred.reject();
        J(el).removeData("pendingDeferred");
    }
};

Zotero.callbacks.showSpinnerSection = function(el) {
    Z.debug("Zotero.callbacks.showSpinnerSection", 3);
    Zotero.ui.showSpinner(J(el).children(".loading"));
};

Zotero.callbacks.appendPreloader = function(el) {
    Z.debug("Zotero.callbacks.appendPreloader", 3);
    Zotero.ui.appendSpinner(el);
};

Zotero.callbacks.loadUserGroups = function(el) {
    Z.debug("Zotero.callbacks.loadUserGroups", 3);
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(el);
    var loadConfig = jel.data("loadconfig");
    var userid = loadConfig.libraryID;
    var groups = library.groups.fetchUserGroups(userid, library._apiKey);
    groups.done(J.proxy(function(fetchedGroups) {
        Zotero.ui.displayGroupNuggets(el, fetchedGroups);
    }), this);
};

Zotero.callbacks.runsearch = function(el) {
    Z.debug("Zotero.callbacks.runsearch", 3);
    var params = Zotero.pages.search_index.parseSearchUrl();
    if (!params.type) {
        params.type = "support";
    }
    var sectionID = params.type;
    if (sectionID != "people" && sectionID != "group") {
        sectionID = "support";
    }
    Z.debug("search type: " + params.type, 4);
    J(".search-section").not("[id=" + sectionID + "]").hide();
    J(".search-section[id=" + sectionID + "]").show().find("input[name=q]").val(params.query);
    J("#search-nav li").removeClass("selected");
    J("#search-nav li." + params.type).addClass("selected");
    zoterojsSearchContext = params.type;
    if (params.query) {
        Zotero.pages.search_index.runSearch(params);
    }
};

Zotero.callbacks.loadFilterGuide = function(el) {
    Z.debug("Zotero.callbacks.loadFilterGuide", 3);
    var tag = Zotero.nav.getUrlVar("tag");
    if (typeof tag == "string") {
        tag = [ tag ];
    }
    var collectionKey = Zotero.nav.getUrlVar("collectionKey");
    var q = Zotero.nav.getUrlVar("q");
    var filters = {
        tag: tag,
        collectionKey: collectionKey,
        q: q
    };
    Zotero.ui.filterGuide(el, filters);
};

Zotero.callbacks.actionPanel = function(el) {
    Z.debug("Zotero.callbacks.actionPanel", 3);
    var mode = Zotero.nav.getUrlVar("mode");
    var elid = J(el).attr("id");
    if (elid == "collections-pane-edit-panel-div") {
        if (mode == "edit") {
            Zotero.ui.collectionsActionPane(J("#collections-pane-edit-panel-div"), true);
        } else {
            Zotero.ui.collectionsActionPane(J("#collections-pane-edit-panel-div"), false);
        }
    } else if (elid == "items-pane-edit-panel-div") {
        if (mode == "edit") {
            Zotero.ui.itemsActionPane(J("#items-pane-edit-panel-div"));
        } else {
            Zotero.ui.itemsSearchActionPane(J("#items-pane-edit-panel-div"));
        }
        Zotero.ui.updateDisabledControlButtons();
    }
};

Zotero.widgets = {};

Zotero.ui.eventful = {};

Zotero.ui.eventful.trigger = function(eventtype, data) {
    Zotero.debug("Triggering eventful " + eventtype, 3);
    if (!data) {
        data = {};
    }
    data.zeventful = true;
    if (data.triggeringElement === null || data.triggeringElement === undefined) {
        data.triggeringElement = J("#eventful");
    }
    var e = J.Event(eventtype, data);
    J("#eventful").trigger(e);
};

Zotero.ui.eventful.listen = function(events, handler, data) {
    J("#eventful").on(events, null, data, handler);
};

Zotero.eventful = {};

Zotero.eventful.init = {};

Zotero.eventful.events = [ "collectionsDirty", "tagsChanged", "displayedItemsChanged", "displayedItemChanged", "selectedItemsChanged", "showCitations", "showSettings", "exportItems" ];

Zotero.eventful.eventMap = {
    orderChanged: [ "displayedItemsChanged" ],
    sortChanged: [ "displayedItemsChanged" ],
    collectionKeyChanged: [ "displayedItemsChanged", "selectedCollectionChanged" ],
    qChanged: [ "displayedItemsChanged" ],
    tagChanged: [ "displayedItemsChanged", "selectedTagsChanged" ],
    itemPageChanged: [ "displayedItemsChanged" ],
    itemKeyChanged: [ "displayedItemChanged" ]
};

Zotero.eventful.initWidgets = function() {
    Zotero.nav.parsePathVars();
    J(".eventfulwidget").each(function(ind, el) {
        var fnName = J(el).data("function");
        if (Zotero.eventful.init.hasOwnProperty(fnName)) {
            Z.debug("CALLING EVENTFUL INIT: " + fnName);
            Zotero.eventful.init[fnName](el);
        }
        var widgetName = J(el).data("widget");
        if (widgetName && Zotero.ui.widgets[widgetName]) {
            if (Zotero.ui.widgets[widgetName]["init"]) {
                Zotero.ui.widgets[widgetName].init(el);
            }
        }
    });
    Zotero.eventful.initTriggers();
    Zotero.ui.eventful.trigger("displayedItemsChanged");
    Zotero.ui.eventful.trigger("displayedItemChanged");
};

Zotero.eventful.initTriggers = function(el) {
    Zotero.debug("Zotero.eventful.initTriggers", 3);
    if (!el) {
        el = J("html");
    }
    var triggerOnEvent = function(event) {
        Z.debug("triggerOnEvent", 3);
        event.preventDefault();
        eventName = J(event.delegateTarget).data("triggers");
        Z.debug("eventName: " + eventName);
        Zotero.ui.eventful.trigger(eventName, {
            triggeringElement: event.currentTarget
        });
    };
    J(el).find(".eventfultrigger").each(function(ind, el) {
        if (J(el).data("triggerbound")) {
            return;
        }
        var ev = J(el).data("event");
        var libString = J(el).data("library") || "";
        Z.debug("binding eventfultrigger", 4);
        if (ev) {
            Z.debug("binding " + ev + " trigger with " + libString + " on " + el.tagName, 4);
            J(el).on(ev, triggerOnEvent);
        } else {
            J(el).on("click", triggerOnEvent);
        }
        J(el).data("triggerbound", true);
    });
};

Zotero.ui.dialog = function(el, options) {
    Z.debug("Zotero.ui.dialog", 3);
    J(el).modal(options);
    Z.debug("exiting Zotero.ui.dialog", 3);
};

Zotero.ui.closeDialog = function(el) {
    J(el).dialog("close");
};

Zotero.ui.formatItemField = function(field, item, trim) {
    if (typeof trim == "undefined") {
        trim = false;
    }
    var trimLength = 0;
    var formattedString = "";
    var date;
    if (Zotero.config.maxFieldSummaryLength[field]) {
        trimLength = Zotero.config.maxFieldSummaryLength[field];
    }
    switch (field) {
      case "itemType":
        formattedString = Zotero.localizations.typeMap[item["itemType"]];
        break;
      case "dateModified":
        if (!item["dateModified"]) {
            formattedString = "";
        }
        date = Zotero.utils.parseApiDate(item["dateModified"]);
        if (date) {
            formattedString = Globalize.format(date, "d") + " " + Globalize.format(date, "t");
        } else {
            formattedString = item["dateModified"];
        }
        formattedString = date.toLocaleString();
        break;
      case "dateAdded":
        if (!item["dateAdded"]) {
            formattedString = "";
        }
        date = Zotero.utils.parseApiDate(item["dateAdded"]);
        if (date) {
            formattedString = Globalize.format(date, "d") + " " + Globalize.format(date, "t");
        } else {
            formattedString = item["dateAdded"];
        }
        break;
      case "title":
        formattedString = item.title;
        break;
      case "creator":
        formattedString = item.creatorSummary;
        break;
      case "addedBy":
        formattedString = item.author.name;
        break;
      default:
        if (typeof item[field] !== "undefined") {
            formattedString = item[field];
        } else if (item.apiObj) {
            if (item.apiObj[field]) {
                formattedString = item.apiObj[field];
            }
        }
    }
    if (trim && trimLength > 0 && formattedString.length > trimLength) {
        return formattedString.slice(0, trimLength) + "…";
    } else {
        return formattedString;
    }
};

Zotero.ui.trimString = function(s, maxlen) {
    var trimLength = 35;
    var formattedString = s;
    if (maxlen) {
        trimLength = maxlen;
    }
    if (trimLength > 0 && formattedString.length > trimLength) {
        return formattedString.slice(0, trimLength) + "…";
    } else {
        return formattedString;
    }
};

Zotero.ui.formatItemDateField = function(field, item) {
    var date;
    switch (field) {
      case "dateModified":
        if (!item["dateModified"]) {
            return "";
        }
        date = Zotero.utils.parseApiDate(item["dateModified"]);
        if (date) {
            return "<span class='localized-date-span'>" + Globalize.format(date, "d") + "</span> <span class='localized-date-span'>" + Globalize.format(date, "t") + "</span>";
        } else {
            return item["dateModified"];
        }
        return date.toLocaleString();
      case "dateAdded":
        if (!item["dateAdded"]) {
            return "";
        }
        date = Zotero.utils.parseApiDate(item["dateAdded"]);
        if (date) {
            return "<span class='localized-date-span'>" + Globalize.format(date, "d") + "</span> <span class='localized-date-span'>" + Globalize.format(date, "t") + "</span>";
        } else {
            return item["dateAdded"];
        }
        break;
    }
    return "";
};

Zotero.ui.formatItemContentRow = function(contentRow) {
    if (contentRow.field == "date") {
        if (!contentRow.fieldValue) {
            return "";
        }
        var date = Zotero.utils.parseApiDate(contentRow.value);
        if (!date) {
            return contentRow.fieldValue;
        } else {
            return date.toLocaleString();
        }
    } else {
        return contentRow.fieldValue;
    }
};

Zotero.ui.groupUrl = function(group, route) {
    var groupBase;
    if (group.groupType == "Private") {
        groupBase = "/groups/" + group.groupID;
    } else {
        groupBase = "/groups/" + Zotero.utils.slugify(group.groupName);
    }
    var groupIDBase = "/groups/" + group.groupID;
    Zotero.debug("groupBase: " + groupBase);
    switch (route) {
      case "groupView":
        return groupBase;
      case "groupLibrary":
        return groupBase + "/items";
      case "groupSettings":
        return groupIDBase + "/settings";
      case "groupMembers":
        return groupIDBase + "/members";
      case "groupLibrarySettings":
        return groupIDBase + "/settings/library";
      case "groupMembersSettings":
        return groupIDBase + "/settings/members";
    }
};

Zotero.ui.init = {};

Zotero.ui.widgets = {};

Zotero.ui.jqui = {};

Zotero.ui.init.all = function() {
    J("#content").on("click", "a.ajax-link", function() {
        Z.debug("ajax-link clicked with href " + J(this).attr("href"), 3);
        Z.debug("pathname " + this.pathname, 4);
        var pathvars = Zotero.nav.parsePathVars(this.pathname);
        Zotero.nav.urlvars.pathVars = pathvars;
        Zotero.nav.pushState();
        return false;
    });
    if (Zotero.config.mobile) {
        Zotero.ui.init.mobile();
    }
    Z.debug("ui init based on page", 3);
    switch (Zotero.config.pageClass) {
      case "my_library":
      case "user_library":
      case "group_library":
        Zotero.ui.init.library();
        Zotero.ui.bindItemLinks();
        Zotero.ui.bindCollectionLinks();
        Zotero.ui.bindTagLinks();
        break;
      case "default":
    }
};

Zotero.ui.init.library = function() {
    Z.debug("Zotero.ui.init.library", 3);
    Zotero.ui.init.fullLibrary();
    var hasRTENoLinks = J("textarea.rte").filter(".nolinks").length;
    var hasRTEReadOnly = J("textarea.rte").filter(".readonly").length;
    var hasRTEDefault = J("textarea.rte").not(".nolinks").not(".readonly").length;
    if (hasRTENoLinks) {
        Zotero.ui.init.rte("nolinks");
    }
    if (hasRTEReadOnly) {
        Zotero.ui.init.rte("readonly");
    }
    if (hasRTEDefault) {
        Zotero.ui.init.rte("default");
    }
};

Zotero.ui.init.fullLibrary = function() {
    Z.debug("Zotero.ui.initFullLibrary", 3);
    if (J("#library").hasClass("ajaxload")) {
        Zotero.ui.init.offlineLibrary();
        return;
    }
    Zotero.ui.init.libraryTemplates();
    Zotero.eventful.initWidgets();
};

Zotero.ui.init.paginationButtons = function(pagination) {
    if (Zotero.config.jqueryui === false) {
        return;
    }
};

Zotero.ui.init.creatorFieldButtons = function() {};

Zotero.ui.init.editButton = function() {};

Zotero.ui.init.rte = function(type, autofocus, elements) {
    if (Zotero.config.rte == "ckeditor") {
        Zotero.ui.init.ckeditor(type, autofocus, elements);
        return;
    } else {
        Zotero.ui.init.tinyMce(type, autofocus, elements);
    }
};

Zotero.ui.init.ckeditor = function(type, autofocus, elements) {
    if (!type) {
        type = "default";
    }
    var ckconfig = {};
    ckconfig.toolbarGroups = [ {
        name: "clipboard",
        groups: [ "clipboard", "undo" ]
    }, {
        name: "links"
    }, {
        name: "insert"
    }, {
        name: "forms"
    }, {
        name: "tools"
    }, {
        name: "document",
        groups: [ "mode", "document", "doctools" ]
    }, {
        name: "others"
    }, "/", {
        name: "basicstyles",
        groups: [ "basicstyles", "cleanup" ]
    }, {
        name: "paragraph",
        groups: [ "list", "indent", "blocks", "align" ]
    }, {
        name: "styles"
    }, {
        name: "colors"
    }, {
        name: "about"
    } ];
    var nolinksckconfig = {};
    nolinksckconfig.toolbarGroups = [ {
        name: "clipboard",
        groups: [ "clipboard", "undo" ]
    }, {
        name: "editing",
        groups: [ "find", "selection" ]
    }, {
        name: "insert"
    }, {
        name: "forms"
    }, {
        name: "tools"
    }, {
        name: "document",
        groups: [ "mode", "document", "doctools" ]
    }, {
        name: "others"
    }, "/", {
        name: "basicstyles",
        groups: [ "basicstyles", "cleanup" ]
    }, {
        name: "paragraph",
        groups: [ "list", "indent", "blocks", "align" ]
    }, {
        name: "styles"
    }, {
        name: "colors"
    }, {
        name: "about"
    } ];
    var readonlyckconfig = {};
    readonlyckconfig.toolbarGroups = [];
    readonlyckconfig.readOnly = true;
    var config;
    if (type == "nolinks") {
        config = J.extend(true, {}, nolinksckconfig);
    } else if (type == "readonly") {
        config = J.extend(true, {}, readonlyckconfig);
    } else {
        config = J.extend(true, {}, ckconfig);
    }
    if (autofocus) {
        config.startupFocus = true;
    }
    J("textarea.rte").each(function(ind, el) {
        var edName = J(el).attr("name");
        if (!CKEDITOR.instances[edName]) {
            var editor = CKEDITOR.replace(el, config);
        }
    });
};

Zotero.ui.init.tinyMce = function(type, autofocus, elements) {
    if (!type) {
        type = "default";
    }
    var mode = "specific_textareas";
    if (elements) {
        mode = "exact";
    } else {
        elements = "";
    }
    var tmceConfig = {
        mode: mode,
        elements: elements,
        theme: "advanced",
        theme_advanced_toolbar_location: "top",
        theme_advanced_buttons1: "bold,italic,underline,strikethrough,separator,sub,sup,separator,forecolorpicker,backcolorpicker,separator,blockquote,separator,link,unlink",
        theme_advanced_buttons2: "formatselect,separator,justifyleft,justifycenter,justifyright,separator,bullist,numlist,outdent,indent,separator,removeformat,code,",
        theme_advanced_buttons3: "",
        theme_advanced_toolbar_align: "left",
        theme_advanced_statusbar_location: "bottom",
        theme_advanced_resizing: true,
        relative_urls: false,
        editor_selector: "default"
    };
    if (autofocus) {
        tmceConfig.init_instance_callback = function(inst) {
            Z.debug("inited " + inst.editorId);
            inst.focus();
        };
    }
    if (type != "nolinks") {
        tmceConfig.theme_advanced_buttons1 += ",link";
    }
    if (type == "nolinks") {
        tmceConfig.editor_selector = "nolinks";
    }
    if (type == "readonly") {
        tmceConfig.readonly = 1;
        tmceConfig.editor_selector = "readonly";
    }
    tinymce.init(tmceConfig);
    return tmceConfig;
};

Zotero.ui.init.libraryTemplates = function() {
    J.views.helpers({
        Zotero: Zotero,
        J: J,
        Modernizr: Modernizr,
        zoteroFieldMap: Zotero.localizations.fieldMap,
        formatItemField: Zotero.ui.formatItemField,
        formatItemDateField: Zotero.ui.formatItemDateField,
        trimString: Zotero.ui.trimString,
        multiplyChar: function(char, num) {
            return Array(num).join(char);
        },
        displayInDetails: function(field, item) {
            if (J.inArray(field, item.hideFields) == -1 && item.fieldMap.hasOwnProperty(field) && J.inArray(field, [ "itemType", "title", "creators", "notes" ]) == -1) {
                return true;
            }
            return false;
        },
        getFields: function(object) {
            var key, value, fieldsArray = [];
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    value = object[key];
                    fieldsArray.push({
                        key: key,
                        value: value
                    });
                }
            }
            return fieldsArray;
        }
    });
};

Zotero.ui.updateItemFromForm = function(item, formEl) {
    Z.debug("Zotero.ui.updateItemFromForm", 3);
    var base = J(formEl);
    base.closest(".ajaxload").data("ignoreformstorage", true);
    var library = Zotero.ui.getAssociatedLibrary(formEl);
    var itemKey = "";
    if (item.itemKey) itemKey = item.itemKey; else {
        if (library) {
            item.associateWithLibrary(library);
        }
        var collectionKey = Zotero.nav.getUrlVar("collectionKey");
        if (collectionKey) {
            item.addToCollection(collectionKey);
        }
    }
    J.each(item.apiObj, function(field, value) {
        var selector, inputValue, noteElID;
        if (field == "note") {
            selector = "textarea[data-itemKey='" + itemKey + "'].rte";
            Z.debug(selector, 4);
            noteElID = J(selector).attr("id");
            Z.debug(noteElID, 4);
            inputValue = Zotero.ui.getRte(noteElID);
        } else {
            selector = "[data-itemKey='" + itemKey + "'][name='" + field + "']";
            inputValue = base.find(selector).val();
        }
        if (typeof inputValue !== "undefined") {
            Z.debug("updating item " + field + ": " + inputValue);
            item.set(field, inputValue);
        }
    });
    var creators = [];
    base.find("tr.creator").each(function(index, el) {
        var name, creator, firstName, lastName;
        var trindex = parseInt(J(el).attr("id").substr(8), 10);
        var creatorType = J(el).find("select[id$='creatorType']").val();
        if (J(el).hasClass("singleCreator")) {
            name = J(el).find("input[id$='_name']");
            if (!name.val()) {
                return true;
            }
            creator = {
                creatorType: creatorType,
                name: name.val()
            };
        } else if (J(el).hasClass("doubleCreator")) {
            firstName = J(el).find("input[id$='_firstName']").val();
            lastName = J(el).find("input[id$='_lastName']").val();
            if (firstName === "" && lastName === "") {
                return true;
            }
            creator = {
                creatorType: creatorType,
                firstName: firstName,
                lastName: lastName
            };
        }
        creators.push(creator);
    });
    var tags = [];
    base.find("input[id^='tag_']").each(function(index, el) {
        if (J(el).val() !== "") {
            tags.push({
                tag: J(el).val()
            });
        }
    });
    var notes = [];
    base.find("textarea[name^='note_']").each(function(index, el) {
        var noteid = J(el).attr("id");
        var noteContent = Zotero.ui.getRte(noteid);
        var noteItem = new Zotero.Item;
        noteItem.associateWithLibrary(library);
        noteItem.initEmptyNote();
        noteItem.set("note", noteContent);
        noteItem.setParent(item.itemKey);
        notes.push(noteItem);
    });
    item.notes = notes;
    item.apiObj.creators = creators;
    item.apiObj.tags = tags;
};

Zotero.ui.updateItemFromForm = function(item, formEl) {
    Z.debug("Zotero.ui.updateItemFromForm", 3);
    var base = J(formEl);
    base.closest(".ajaxload, .eventfulwidget").data("ignoreformstorage", true);
    var library = Zotero.ui.getAssociatedLibrary(base);
    var itemKey = "";
    if (item.itemKey) itemKey = item.itemKey; else {
        if (library) {
            item.associateWithLibrary(library);
        }
        var collectionKey = Zotero.nav.getUrlVar("collectionKey");
        if (collectionKey) {
            item.addToCollection(collectionKey);
        }
    }
    J.each(item.apiObj, function(field, value) {
        var selector, inputValue, noteElID;
        if (field == "note") {
            selector = "textarea[data-itemKey='" + itemKey + "'].rte";
            Z.debug(selector, 4);
            noteElID = base.find(selector).attr("id");
            Z.debug(noteElID, 4);
            inputValue = Zotero.ui.getRte(noteElID);
        } else {
            selector = "[data-itemKey='" + itemKey + "'][name='" + field + "']";
            inputValue = base.find(selector).val();
        }
        if (typeof inputValue !== "undefined") {
            Z.debug("updating item " + field + ": " + inputValue);
            item.set(field, inputValue);
        }
    });
    var creators = [];
    base.find("tr.creator").each(function(index, el) {
        var creator = Zotero.ui.creatorFromElement(el);
        if (creator !== null) {
            creators.push(creator);
        }
    });
    var tags = [];
    base.find("input[id^='tag_']").each(function(index, el) {
        if (J(el).val() !== "") {
            tags.push({
                tag: J(el).val()
            });
        }
    });
    var notes = [];
    base.find("textarea.note-text").each(function(index, el) {
        var noteid = J(el).attr("id");
        var noteContent = Zotero.ui.getRte(noteid);
        var noteItem = new Zotero.Item;
        if (library) {
            noteItem.associateWithLibrary(library);
        }
        noteItem.initEmptyNote();
        noteItem.set("note", noteContent);
        noteItem.setParent(item.itemKey);
        notes.push(noteItem);
    });
    item.notes = notes;
    item.apiObj.creators = creators;
    item.apiObj.tags = tags;
};

Zotero.ui.creatorFromElement = function(el) {
    var name, creator, firstName, lastName;
    var jel = J(el);
    var trindex = parseInt(jel.data("creatorindex"), 10);
    var creatorType = jel.find("select.creator-type-select").val();
    if (jel.hasClass("singleCreator")) {
        name = jel.find("input.creator-name");
        if (!name.val()) {
            return null;
        }
        creator = {
            creatorType: creatorType,
            name: name.val()
        };
    } else if (jel.hasClass("doubleCreator")) {
        firstName = jel.find("input.creator-first-name").val();
        lastName = J(el).find("input.creator-last-name").val();
        if (firstName === "" && lastName === "") {
            return null;
        }
        creator = {
            creatorType: creatorType,
            firstName: firstName,
            lastName: lastName
        };
    }
    return creator;
};

Zotero.ui.saveItem = function(item) {
    Z.debug("pre writeItem debug", 4);
    Z.debug(item, 4);
    var library = item.owningLibrary;
    var jqxhr = item.writeItem();
    jqxhr.done(J.proxy(function(writtenItems) {
        Z.debug("item write finished", 3);
        if (item.writeFailure) {}
        delete Zotero.nav.urlvars.pathVars["action"];
        Zotero.nav.urlvars.pathVars["itemKey"] = item.itemKey;
        Zotero.nav.clearUrlVars([ "itemKey", "collectionKey" ]);
        Zotero.nav.pushState(true);
    }, this));
    Z.debug("adding new tags to library tags", 3);
    var libTags = library.tags;
    var tags = item.apiObj.tags;
    J.each(tags, function(index, tagOb) {
        var tagString = tagOb.tag;
        if (!libTags.tagObjects.hasOwnProperty(tagString)) {
            var tag = new Zotero.Tag;
            tag.title = tagString;
            tag.numItems = 1;
            tag.urlencodedtag = encodeURIComponent(tag.title);
            libTags.tagObjects[tagString] = tag;
            libTags.updateSecondaryData();
        }
    });
};

Zotero.ui.saveFormData = function() {
    Z.debug("saveFormData", 3);
    J(".ajaxload").each(function() {
        var formInputs = J(this).find("input");
        J(this).data("tempformstorage", formInputs);
    });
};

Zotero.ui.loadFormData = function(el) {
    Z.debug("loadFormData", 3);
    var formData = J(el).data("tempformstorage");
    if (J(el).data("ignoreformstorage")) {
        Z.debug("ignoring stored form data", 3);
        J(el).removeData("tempFormStorage");
        J(el).removeData("ignoreFormStorage");
        return;
    }
    Z.debug("formData: ", 4);
    Z.debug(formData, 4);
    if (formData) {
        formData.each(function(index) {
            var idstring = "#" + J(this).attr("id");
            Z.debug("idstring:" + idstring, 4);
            if (J(idstring).length) {
                Z.debug("setting value of " + idstring, 4);
                J(idstring).val(J(this).val());
            }
        });
    }
};

Zotero.ui.itemTypeClass = function(item) {
    var itemTypeClass = item.itemType;
    if (item.itemType == "attachment") {
        if (item.mimeType == "application/pdf") {
            itemTypeClass += "-pdf";
        } else {
            switch (item.linkMode) {
              case 0:
                itemTypeClass += "-file";
                break;
              case 1:
                itemTypeClass += "-file";
                break;
              case 2:
                itemTypeClass += "-snapshot";
                break;
              case 3:
                itemTypeClass += "-web-link";
                break;
            }
        }
    }
    return "img-" + itemTypeClass;
};

Zotero.ui.createPagination = function(feed, pageVar, config) {
    var page = parseInt(Zotero.nav.getUrlVar(pageVar), 10) || 1;
    var start = parseInt(config.start, 10) || 0;
    var limit = parseInt(config.limit, 10) || 25;
    var totalResults = parseInt(feed.totalResults, 10);
    var lastDisplayed = start + limit;
    var prevPageNum = page - 1;
    var nextPageNum = page + 1;
    var lastPageNum = feed.lastPage;
    var pagination = {
        page: page
    };
    pagination.showFirstLink = start > 0;
    pagination.showPrevLink = start > 0;
    pagination.showNextLink = totalResults > lastDisplayed;
    pagination.showLastLink = totalResults > lastDisplayed;
    var mutateOb = {};
    pagination.firstLink = Zotero.nav.mutateUrl(mutateOb, [ pageVar ]);
    mutateOb[pageVar] = page - 1;
    pagination.prevLink = Zotero.nav.mutateUrl(mutateOb, []);
    mutateOb[pageVar] = page + 1;
    pagination.nextLink = Zotero.nav.mutateUrl(mutateOb, []);
    mutateOb[pageVar] = feed.lastPage;
    pagination.lastLink = Zotero.nav.mutateUrl(mutateOb, []);
    pagination.start = start;
    pagination.lastDisplayed = Math.min(lastDisplayed, totalResults);
    pagination.total = totalResults;
    Z.debug("last displayed:" + lastDisplayed + " totalResults:" + feed.totalResults, 4);
    return pagination;
};

Zotero.ui.getAssociatedLibrary = function(el) {
    Z.debug("Zotero.ui.getAssociatedLibrary", 3);
    var jel;
    if (typeof el == "undefined") {
        jel = J("#library-items-div");
    } else {
        jel = J(el);
        if (jel.length === 0 || jel.is("#eventful")) {
            jel = J("#library-items-div");
            if (jel.length === 0) {
                Z.debug("No element passed and no default found for getAssociatedLibrary.");
                throw "No element passed and no default found for getAssociatedLibrary.";
            }
        }
    }
    var library = jel.data("zoterolibrary");
    if (!library) {
        var libString = J(el).data("library");
        if (libString && Zotero.libraries.hasOwnProperty(libString)) {
            library = Zotero.libraries[libString];
        } else if (typeof jel.attr("data-loadconfig") != "undefined") {
            var loadConfig = jel.data("loadconfig");
            var libraryID = loadConfig.libraryID;
            var libraryType = loadConfig.libraryType;
            var libraryUrlIdentifier = loadConfig.libraryUrlIdentifier;
            if (!libraryID || !libraryType) {
                Z.debug("Bad library data attempting to get associated library: libraryID " + libraryID + " libraryType " + libraryType, 1);
                throw "Err";
            }
            if (Zotero.libraries[Zotero.utils.libraryString(libraryType, libraryID)]) {
                library = Zotero.libraries[Zotero.utils.libraryString(libraryType, libraryID, libraryUrlIdentifier)];
            } else {
                library = new Zotero.Library(libraryType, libraryID, libraryUrlIdentifier);
                Zotero.libraries[Zotero.utils.libraryString(libraryType, libraryID)] = library;
            }
        } else if (libString) {
            var libData = Zotero.ui.parseLibString(libString);
            library = new Zotero.Library(libData.libraryType, libData.libraryID, "");
        }
        jel.data("zoterolibrary", library);
    }
    return library;
};

Zotero.ui.getEventLibrary = function(e) {
    var tel = J(e.triggeringElement);
    if (e.library) {
        return e.library;
    }
    if (e.data.library) {
        return e.data.library;
    }
    Z.debug(e);
    var libString = tel.data("library");
    if (!libString) {
        throw "no library on event or libString on triggeringElement";
    }
    if (Zotero.libraries.hasOwnProperty(libString)) {
        return Zotero.libraries[libString];
    }
    var libConfig = Zotero.ui.parseLibString(libString);
    library = new Zotero.Library(libConfig.libraryType, libConfig.libraryID, "");
    Zotero.libraries[Zotero.utils.libraryString(libraryType, libraryID)] = library;
};

Zotero.ui.parseLibString = function(s) {
    var libraryType, libraryID;
    if (s[0] == "u") {
        libraryType = "user";
    } else {
        libraryType = "group";
    }
    libraryID = s.slice(1);
    return {
        libraryType: libraryType,
        libraryID: libraryID
    };
};

Zotero.ui.getPrioritizedVariable = function(key, defaultVal) {
    var val = Zotero.nav.getUrlVar(key) || Zotero.preferences.getPref(key) || Zotero.config.defaultApiArgs || defaultVal;
    return val;
};

Zotero.ui.scrollToTop = function() {
    window.scrollBy(0, -5e3);
};

Zotero.ui.parentWidgetEl = function(el) {
    var matching;
    if (el.hasOwnProperty("data") && el.data.hasOwnProperty("widgetEl")) {
        Z.debug("event had widgetEl associated with it");
        return J(el.data.widgetEl);
    } else if (el.hasOwnProperty("currentTarget")) {
        Z.debug("event currentTarget set");
        matching = J(el.currentTarget).closest(".eventfulwidget, .ajaxload");
        if (matching.length > 0) {
            return matching.first();
        } else {
            Z.debug("no matching closest to currentTarget");
            Z.debug(el.currentTarget);
            Z.debug(el.currentTarget);
        }
    }
    matching = J(el).closest(".eventfulwidget, .ajaxload");
    if (matching.length > 0) {
        Z.debug("returning first closest widget");
        return matching.first();
    }
    return null;
};

Zotero.ui.getSelectedItemKeys = function(form) {
    Z.debug("Zotero.ui.getSelectedItemKeys", 3);
    var itemKeys = [];
    var curItemKey = Zotero.nav.getUrlVar("itemKey");
    if (curItemKey && Zotero.config.preferUrlItem !== false) {
        itemKeys.push(curItemKey);
    } else {
        if (J(form).length) {
            J(form).find("input.itemKey-checkbox:checked").each(function(index, val) {
                itemKeys.push(J(val).data("itemkey"));
            });
        } else {
            J("input.itemKey-checkbox:checked").each(function(index, val) {
                itemKeys.push(J(val).data("itemkey"));
            });
        }
    }
    return itemKeys;
};

Zotero.ui.getAllFormItemKeys = function(form) {
    Z.debug("Zotero.ui.getSelectedItemKeys", 3);
    var itemKeys = [];
    var curItemKey = Zotero.nav.getUrlVar("itemKey");
    if (curItemKey) {
        itemKeys.push(curItemKey);
    } else {
        J(form).find("input.itemKey-checkbox").each(function(index, val) {
            itemKeys.push(J(val).data("itemkey"));
        });
    }
    return itemKeys;
};

Zotero.ui.getRte = function(el) {
    Z.debug("getRte", 3);
    Z.debug(el);
    switch (Zotero.config.rte) {
      case "ckeditor":
        return CKEDITOR.instances[el].getData();
      default:
        return tinyMCE.get(el).getContent();
    }
};

Zotero.ui.updateRte = function(el) {
    switch (Zotero.config.rte) {
      case "ckeditor":
        var elid = "#" + el;
        data = CKEDITOR.instances[el].getData();
        J(elid).val(data);
        break;
      default:
        tinyMCE.updateContent(el);
    }
};

Zotero.ui.deactivateRte = function(el) {
    switch (Zotero.config.rte) {
      case "ckeditor":
        var elid = "#" + el;
        data = CKEDITOR.instances[el].destroy();
        break;
      default:
        tinymce.execCommand("mceRemoveControl", true, el);
    }
};

Zotero.ui.jsNotificationMessage = function(message, type, timeout) {
    Z.debug("notificationMessage: " + type + " : " + message, 3);
    if (Zotero.config.suppressErrorNotifications) return;
    if (!timeout) {
        timeout = 5;
    }
    var alertType = "alert-info";
    if (type) {
        switch (type) {
          case "error":
            alertType = "alert-danger";
            break;
          case "success":
            alertType = "alert-success";
            break;
          case "info":
            alertType = "alert-info";
            break;
          case "warning":
            alertType = "alert-warning";
            break;
        }
    }
    J("#js-message").append("<div class='alert " + alertType + "'>" + message + "</div>").children("div").delay(parseInt(timeout, 10) * 1e3).slideUp().delay(300).queue(function() {
        J(this).remove();
    });
};

Zotero.ui.ajaxErrorMessage = function(jqxhr) {
    Z.debug("Zotero.ui.ajaxErrorMessage", 3);
    if (typeof jqxhr == "undefined") {
        Z.debug("ajaxErrorMessage called with undefined argument");
        return "";
    }
    Z.debug(jqxhr, 3);
    switch (jqxhr.status) {
      case 403:
        if (Zotero.config.loggedIn || Zotero.config.ignoreLoggedInStatus) {
            return "You do not have permission to view this library.";
        } else {
            Zotero.config.suppressErrorNotifications = true;
            window.location = "/user/login";
            return "";
        }
        break;
      case 404:
        Zotero.ui.jsNotificationMessage("A requested resource could not be found.", "error");
        break;
      case 400:
        Zotero.ui.jsNotificationMessage("Bad Request", "error");
        break;
      case 405:
        Zotero.ui.jsNotificationMessage("Method not allowed", "error");
        break;
      case 412:
        Zotero.ui.jsNotificationMessage("Precondition failed", "error");
        break;
      case 500:
        Zotero.ui.jsNotificationMessage("Something went wrong but we're not sure what.", "error");
        break;
      case 501:
        Zotero.ui.jsNotificationMessage("We can't do that yet.", "error");
        break;
      case 503:
        Zotero.ui.jsNotificationMessage("We've gone away for a little while. Please try again in a few minutes.", "error");
        break;
      default:
        Z.debug("jqxhr status did not match any expected case");
        Z.debug(jqxhr.status);
    }
    return "";
};

Zotero.ui.showSpinner = function(el, type) {
    var spinnerUrl = Zotero.config.baseWebsiteUrl + "/static/images/theme/broken-circle-spinner.gif";
    if (!type) {
        J(el).html("<img class='spinner' src='" + spinnerUrl + "'/>");
    } else if (type == "horizontal") {
        J(el).html("<img class='spinner' src='" + spinnerUrl + "'/>");
    }
};

Zotero.ui.appendSpinner = function(el) {
    var spinnerUrl = Zotero.config.baseWebsiteUrl + "/static/images/theme/broken-circle-spinner.gif";
    J(el).append("<img class='spinner' src='" + spinnerUrl + "'/>");
};

Zotero.ui.updateDisabledControlButtons = function() {
    Z.debug("Zotero.ui.updateDisabledControlButtons", 3);
    J(".move-to-trash-link").prop("title", "Move to Trash");
    J("#create-item-link").button("option", "disabled", false);
    if (J(".itemlist-editmode-checkbox:checked").length === 0 && !Zotero.nav.getUrlVar("itemKey")) {
        J(".add-to-collection-link").button("option", "disabled", true).removeClass("ui-state-hover");
        J(".remove-from-collection-link").button("option", "disabled", true).removeClass("ui-state-hover");
        J(".move-to-trash-link").button("option", "disabled", true).removeClass("ui-state-hover");
        J(".remove-from-trash-link").button("option", "disabled", true).removeClass("ui-state-hover");
        J("#cite-link").button("option", "disabled", true);
        J("#export-link").button("option", "disabled", true);
    } else {
        J(".add-to-collection-link").button("option", "disabled", false).removeClass("ui-state-hover");
        J(".remove-from-collection-link").button("option", "disabled", false).removeClass("ui-state-hover");
        J(".move-to-trash-link").button("option", "disabled", false).removeClass("ui-state-hover");
        if (Zotero.nav.getUrlVar("collectionKey") == "trash") {
            J(".remove-from-trash-link").button("option", "disabled", false).removeClass("ui-state-hover");
        }
        J("#cite-link").button("option", "disabled", false);
        J("#export-link").button("option", "disabled", false);
    }
    if (!Zotero.nav.getUrlVar("collectionKey")) {
        J(".remove-from-collection-link").button("option", "disabled", true).removeClass("ui-state-hover");
    } else if (Zotero.nav.getUrlVar("collectionKey") == "trash") {
        J("#create-item-link").button("option", "disabled", true).removeClass("ui-state-hover");
        J(".add-to-collection-link").button("option", "disabled", true).removeClass("ui-state-hover");
        J(".remove-from-collection-link").button("option", "disabled", true).removeClass("ui-state-hover");
        J(".move-to-trash-link").prop("title", "Permanently Delete");
    }
    Zotero.ui.init.editButton();
};

Zotero.ui.createOnActivePage = function(el) {};

Zotero.ui.zoteroItemUpdated = function() {
    try {
        var ev = document.createEvent("HTMLEvents");
        ev.initEvent("ZoteroItemUpdated", true, true);
        document.dispatchEvent(ev);
    } catch (e) {
        Zotero.debug("Error triggering ZoteroItemUpdated event");
    }
};

Zotero.ui.dialog = function(el, options) {
    Z.debug("Zotero.ui.dialog", 3);
    options.show = true;
    options.backdrop = false;
    J(el).modal(options);
    J(el).modal("show");
    Z.debug("exiting Zotero.ui.dialog", 3);
};

Zotero.ui.closeDialog = function(el) {
    J(el).modal("hide");
};

Zotero.ui.widgets.addToCollectionDialog = {};

Zotero.ui.widgets.addToCollectionDialog.init = function(el) {
    Z.debug("addtocollectionsdialog widget init", 3);
    Zotero.ui.eventful.listen("addToCollection", Zotero.ui.widgets.addToCollectionDialog.show, {
        widgetEl: el
    });
};

Zotero.ui.widgets.addToCollectionDialog.show = function(e) {
    Z.debug("addToCollectionDialog.show", 3);
    var triggeringEl = J(e.triggeringElement);
    var library = Zotero.ui.getAssociatedLibrary(triggeringEl);
    var ncollections = library.collections.nestedOrderingArray();
    var widgetEl = J(e.data["widgetEl"]).empty();
    widgetEl.html(J("#addtocollectiondialogTemplate").render({
        ncollections: ncollections
    }));
    var dialogEl = widgetEl.find(".add-to-collection-dialog");
    var addToFunction = J.proxy(function() {
        Z.debug("add-to-collection-select changed", 3);
        var targetCollection = dialogEl.find(".collectionKey-select").val();
        Z.debug("move to: " + targetCollection, 4);
        Zotero.ui.addToCollection(targetCollection, library);
        Zotero.ui.closeDialog(dialogEl);
        return false;
    }, this);
    dialogEl.find(".addButton").on("click", addToFunction);
    Zotero.ui.dialog(dialogEl, {});
    return false;
};

Zotero.ui.addToCollection = function(collectionKey, library) {
    Z.debug("add-to-collection clicked", 3);
    var itemKeys = Zotero.ui.getSelectedItemKeys(J("#edit-mode-items-form"));
    if (!collectionKey) {
        Zotero.ui.jsNotificationMessage("No collection selected", "error");
        return false;
    }
    if (itemKeys.length === 0) {
        Zotero.ui.jsNotificationMessage("No items selected", "notice");
        return false;
    }
    Z.debug(itemKeys, 4);
    Z.debug(collectionKey, 4);
    var response = library.collections.getCollection(collectionKey).addItems(itemKeys);
    library.dirty = true;
    J.when(response).then(function() {
        Zotero.ui.jsNotificationMessage("Items added to collection", "success");
    });
    return false;
};

Zotero.ui.widgets.breadcrumbs = {};

Zotero.ui.widgets.breadcrumbs.init = function(el) {
    Zotero.ui.eventful.listen("displayedItemsChanged displayedItemChanged selectedCollectionChanged", Zotero.ui.libraryBreadcrumbs);
};

Zotero.ui.libraryBreadcrumbs = function(library, config) {
    Z.debug("Zotero.ui.libraryBreadcrumbs", 3);
    try {
        var breadcrumbs = [];
        if (!library) {
            library = Zotero.ui.getAssociatedLibrary(J("#feed-link-div"));
        }
        if (!config) {
            config = Zotero.nav.getUrlVars();
        }
        Z.debug(config, 2);
        if (Zotero.config.breadcrumbsBase) {
            J.each(Zotero.config.breadcrumbsBase, function(ind, crumb) {
                breadcrumbs.push(crumb);
            });
        } else if (library.libraryType == "user") {
            breadcrumbs = [ {
                label: "Home",
                path: "/"
            }, {
                label: "People",
                path: "/people"
            }, {
                label: library.libraryLabel || library.libraryUrlIdentifier,
                path: "/" + library.libraryUrlIdentifier
            }, {
                label: "Library",
                path: "/" + library.libraryUrlIdentifier + "/items"
            } ];
        } else {
            breadcrumbs = [ {
                label: "Home",
                path: "/"
            }, {
                label: "Groups",
                path: "/groups"
            }, {
                label: library.libraryLabel || library.libraryUrlIdentifier,
                path: "/groups/" + library.libraryUrlIdentifier
            }, {
                label: "Library",
                path: "/groups/" + library.libraryUrlIdentifier + "/items"
            } ];
        }
        if (config.collectionKey) {
            Z.debug("have collectionKey", 4);
            curCollection = library.collections.getCollection(config.collectionKey);
            if (curCollection) {
                breadcrumbs.push({
                    label: curCollection.get("name"),
                    path: Zotero.nav.buildUrl({
                        collectionKey: config.collectionKey
                    })
                });
            }
        }
        if (config.itemKey) {
            Z.debug("have itemKey", 4);
            breadcrumbs.push({
                label: library.items.getItem(config.itemKey).title,
                path: Zotero.nav.buildUrl({
                    collectionKey: config.collectionKey,
                    itemKey: config.itemKey
                })
            });
        }
        Z.debug(breadcrumbs, 4);
        widgetEl = J("#breadcrumbs").empty();
        widgetEl.html(J("#breadcrumbsTemplate").render({
            breadcrumbs: breadcrumbs
        }));
        var newtitle = J("#breadcrumbstitleTemplate", {
            breadcrumbs: breadcrumbs
        }).text();
        if (newtitle) {
            Zotero.nav.updateStateTitle(newtitle);
        }
        Z.debug("done with breadcrumbs", 4);
    } catch (e) {
        Zotero.debug("Error loading breadcrumbs", 2);
        Zotero.debug(e);
    }
};

Zotero.ui.widgets.chooseLibraryDialog = {};

Zotero.ui.widgets.chooseLibraryDialog.init = function(el) {
    Z.debug("chooselibrarydialog widget init", 3);
    Zotero.ui.eventful.listen("chooseLibrary", Zotero.ui.widgets.chooseLibraryDialog.show, {
        widgetEl: el
    });
};

Zotero.ui.widgets.chooseLibraryDialog.show = function(e) {
    Z.debug("chooseLibraryDialog.show", 3);
    var triggeringEl = J(e.triggeringElement);
    var library = Zotero.ui.getAssociatedLibrary(triggeringEl);
    var ncollections = library.collections.nestedOrderingArray();
    var widgetEl = J(e.data["widgetEl"]).empty();
    widgetEl(J("#addtocollectiondialogTemplate").render({
        ncollections: ncollections
    }));
    var dialogEl = widgetEl.find(".add-to-collection-dialog");
    var addToFunction = J.proxy(function() {
        Z.debug("add-to-collection-select changed", 3);
        var targetCollection = dialogEl.find(".target-collection").val();
        Z.debug("move to: " + targetCollection, 4);
        Zotero.ui.addToCollection(targetCollection, library);
        Zotero.ui.closeDialog(dialogEl);
        return false;
    }, this);
    dialogEl.find(".addButton").on("click", addToFunction);
    Zotero.ui.dialog(dialogEl, {});
    return false;
};

Zotero.ui.widgets.chooseLibraryDialog.getAccessibleLibraries = function() {};

Zotero.ui.widgets.citeItemDialog = {};

Zotero.ui.widgets.citeItemDialog.init = function(el) {
    Z.debug("citeItemDialog widget init", 3);
    Zotero.ui.widgets.citeItemDialog.getAvailableStyles();
    Zotero.ui.eventful.listen("citeItems", Zotero.ui.widgets.citeItemDialog.show, {
        widgetEl: el
    });
};

Zotero.ui.widgets.citeItemDialog.show = function(e) {
    Z.debug("citeItemDialog.show", 3);
    var triggeringEl = J(e.triggeringElement);
    var hasIndependentItems = false;
    var cslItems = [];
    var library;
    if (e.hasOwnProperty("zoteroItems")) {
        hasIndependentItems = true;
        J.each(e.zoteroItems, function(ind, item) {
            var cslItem = item.cslItem();
            cslItems.push(cslItem);
        });
    } else {
        library = Zotero.ui.getAssociatedLibrary(triggeringEl);
    }
    var widgetEl = J(e.data["widgetEl"]).empty();
    widgetEl.html(J("#citeitemdialogTemplate").render({
        freeStyleInput: true
    }));
    var dialogEl = widgetEl.find(".cite-item-dialog");
    var citeFunction = function(e) {
        Z.debug("citeFunction", 3);
        var triggeringElement = J(e.currentTarget);
        var style = "";
        if (triggeringElement.is(".cite-item-select, input.free-text-style-input")) {
            style = triggeringElement.val();
        } else {
            style = dialogEl.find(".cite-item-select").val();
            var freeStyle = dialogEl.find("input.free-text-style-input").val();
            if (J.inArray(freeStyle, Zotero.styleList) !== -1) {
                style = freeStyle;
            }
        }
        if (!hasIndependentItems) {
            var itemKeys = Zotero.ui.getSelectedItemKeys(J("#edit-mode-items-form"));
            if (itemKeys.length === 0) {
                itemKeys = Zotero.ui.getAllFormItemKeys(J("#edit-mode-items-form"));
            }
            Z.debug(itemKeys, 4);
            var d = library.loadFullBib(itemKeys, style);
            d.done(J.proxy(function(bibContent) {
                dialogEl.find(".cite-box-div").html(bibContent);
            }, this));
        } else {
            var directPromise = Zotero.ui.widgets.citeItemDialog.directCite(cslItems, style);
            directPromise.done(J.proxy(function(bibContent) {
                dialogEl.find(".cite-box-div").html(bibContent);
            }, this));
            directPromise.done(function(data, textStatus, jqxhr) {
                var bib = JSON.parse(data);
                var bibString = Zotero.ui.widgets.citeItemDialog.buildBibString(bib);
                dialogEl.find(".cite-box-div").html(bibString);
            });
        }
    };
    dialogEl.find(".cite-item-select").on("change", citeFunction);
    dialogEl.find("input.free-text-style-input").on("change", citeFunction);
    Zotero.ui.widgets.citeItemDialog.getAvailableStyles();
    dialogEl.find("input.free-text-style-input").typeahead({
        local: Zotero.styleList,
        limit: 10
    });
    Zotero.ui.dialog(dialogEl, {});
    return false;
};

Zotero.ui.widgets.citeItemDialog.getAvailableStyles = function() {
    if (!Zotero.styleList) {
        Zotero.styleList = [];
        J.getJSON(Zotero.config.styleListUrl, function(data, textStatus, jqxhr) {
            Zotero.styleList = data;
        });
    }
};

Zotero.ui.widgets.citeItemDialog.directCite = function(cslItems, style) {
    var data = {};
    data.items = cslItems;
    var url = Zotero.config.citationEndpoint + "?linkwrap=1&style=" + style;
    return J.post(url, JSON.stringify(data));
};

Zotero.ui.widgets.citeItemDialog.buildBibString = function(bib) {
    var bibMeta = bib.bibliography[0];
    var bibEntries = bib.bibliography[1];
    var bibString = bibMeta.bibstart;
    for (var i = 0; i < bibEntries.length; i++) {
        bibString += bibEntries[i];
    }
    bibString += bibMeta.bibend;
    return bibString;
};

Zotero.ui.widgets.collections = {};

Zotero.ui.widgets.collections.init = function(el) {
    Z.debug("collections widget init", 3);
    Zotero.ui.eventful.listen("collectionsDirty", Zotero.ui.widgets.collections.syncCollectionsCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("syncCollections", Zotero.ui.widgets.collections.syncCollectionsCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("syncLibrary", Zotero.ui.widgets.collections.syncCollectionsCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("libraryCollectionsUpdated", Zotero.ui.widgets.collections.rerenderCollections, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("selectedCollectionChanged", Zotero.ui.widgets.collections.updateSelectedCollection, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("cachedDataLoaded", Zotero.ui.widgets.collections.syncCollectionsCallback, {
        widgetEl: el
    });
};

Zotero.ui.widgets.collections.updateCollectionButtons = function(el) {
    Zotero.ui.updateCollectionButtons(el);
};

Zotero.ui.widgets.collections.rerenderCollections = function(event) {
    Zotero.debug("Zotero eventful rerenderCollections");
    var widgetEl = event.data.widgetEl;
    var el = widgetEl;
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(el);
    Z.debug(library);
    library.collections.collectionsArray.sort(library.collections.sortByTitleCompare);
    var collectionListEl = jel.find("#collection-list-container");
    collectionListEl.empty();
    Z.debug("Collections count: " + library.collections.collectionsArray.length);
    Zotero.ui.renderCollectionList(collectionListEl, library.collections);
    Zotero.ui.eventful.trigger("selectedCollectionChanged");
};

Zotero.ui.widgets.collections.updateSelectedCollection = function(event) {
    Zotero.debug("Zotero eventful updateSelectedCollection");
    var widgetEl = event.data.widgetEl;
    var el = widgetEl;
    var jel = J(el);
    var collectionListEl = jel.find(".collection-list-container");
    Zotero.ui.highlightCurrentCollection(widgetEl);
    Zotero.ui.nestHideCollectionTree(collectionListEl);
    Zotero.ui.updateCollectionButtons(widgetEl);
    return;
};

Zotero.ui.widgets.collections.syncCollectionsCallback = function(event) {
    Zotero.debug("Zotero eventful syncCollectionsCallback");
    var widgetEl = event.data.widgetEl;
    var el = widgetEl;
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(el);
    if (library.collections.loaded && !library.collections.synced) {
        Z.debug("collections loaded but not synced - loading updated", 1);
        var syncD = library.loadUpdatedCollections();
        syncD.done(J.proxy(function() {
            Zotero.nav.doneLoading(el);
            Zotero.ui.eventful.trigger("libraryCollectionsUpdated");
        }, this));
        syncD.fail(J.proxy(function() {
            Zotero.ui.eventful.trigger("libraryCollectionsUpdated");
        }));
        return;
    } else if (library.collections.loaded) {
        Zotero.ui.eventful.trigger("libraryCollectionsUpdated");
        return;
    }
    var d = library.loadCollections();
    d.done(J.proxy(function() {
        Zotero.nav.doneLoading(el);
        jel.data("loaded", true);
        Zotero.ui.eventful.trigger("libraryCollectionsUpdated");
        Zotero.nav.doneLoading(el);
    }, this));
    d.fail(J.proxy(function(jqxhr, textStatus, errorThrown) {
        Z.debug("FAILED SYNC COLLECTIONS REQUEST");
        var elementMessage = Zotero.ui.ajaxErrorMessage(jqxhr);
        jel.html("<p>" + elementMessage + "</p>");
    }));
    return;
};

Zotero.ui.updateCollectionButtons = function(el) {
    if (Zotero.config.jqueryui === false) {
        if (!el) {
            el = J("body");
        }
        jel = J(el);
        if (Zotero.nav.getUrlVar("collectionKey")) {
            jel.find(".update-collection-button").removeClass("disabled");
            jel.find(".delete-collection-button").removeClass("disabled");
        } else {
            jel.find(".update-collection-button").addClass("disabled");
            jel.find(".delete-collection-button").addClass("disabled");
        }
    } else {
        var editCollectionsButtonsList = J(".edit-collections-buttons-list");
        editCollectionsButtonsList.buttonset().show();
        J("#edit-collections-buttons-div").buttonset();
        J(".create-collection-link").button("option", "icons", {
            primary: "sprite-toolbar-collection-add"
        }).button("option", "text", false);
        J(".update-collection-link").button("option", "icons", {
            primary: "sprite-toolbar-collection-edit"
        }).button("option", "text", false);
        J(".delete-collection-link").button("option", "icons", {
            primary: "sprite-folder_delete"
        }).button("option", "text", false);
        if (Zotero.nav.getUrlVar("collectionKey")) {
            J(".update-collection-link").button("enable");
            J(".delete-collection-link").button("enable");
        } else {
            J(".update-collection-link").button().button("disable");
            J(".delete-collection-link").button().button("disable");
        }
    }
};

Zotero.ui.renderCollectionList = function(el, collections) {
    Z.debug("Zotero.ui.renderCollectionList", 1);
    Z.debug("library Identifier " + collections.libraryUrlIdentifier, 1);
    var jel = J(el);
    var currentCollectionKey = Zotero.nav.getUrlVar("collectionKey") || "";
    var trash = collections.owningLibrary.libraryType == "user" ? true : false;
    jel.append(J("#collectionlistTemplate").render({
        collections: collections.collectionsArray,
        libUrlIdentifier: collections.libraryUrlIdentifier,
        currentCollectionKey: currentCollectionKey,
        trash: trash
    }));
    Zotero.ui.createOnActivePage(el);
};

Zotero.ui.bindCollectionLinks = function() {
    Z.debug("Zotero.ui.bindCollectionLinks", 3);
    J("#collection-list-div").on("click", "div.folder-toggle", function(e) {
        e.preventDefault();
        J(this).siblings(".collection-select-link").click();
        return false;
    });
    J("#collection-list-div").on("click", ".collection-select-link", function(e) {
        Z.debug("collection-select-link clicked", 4);
        e.preventDefault();
        var collection, library;
        var collectionKey = J(this).attr("data-collectionkey");
        if (J(this).hasClass("current-collection")) {
            var expanded = J(".current-collection").data("expanded");
            if (expanded === true) {
                Zotero.ui.nestHideCollectionTree(J("#collection-list-container"), false);
            } else {
                Zotero.ui.nestHideCollectionTree(J("#collection-list-container"), true);
            }
            Zotero.nav.clearUrlVars([ "collectionKey", "mode" ]);
            if (Zotero.config.mobile && Zotero.nav.getUrlVar("mode") != "edit") {
                collection = Zotero.ui.getAssociatedLibrary(J(this));
                if (!collection.hasChildren) {
                    Z.debug("Changing page to items list because collection has no children", 4);
                }
            } else {
                Zotero.nav.pushState();
            }
            return false;
        }
        Z.debug("click " + collectionKey, 4);
        Zotero.nav.clearUrlVars([ "mode" ]);
        Zotero.nav.urlvars.pathVars["collectionKey"] = collectionKey;
        Z.debug("change mobile page if we didn't just expand a collection", 4);
        Z.debug(J(this), 4);
        if (Zotero.config.mobile) {
            Z.debug("is mobile", 4);
            library = Zotero.ui.getAssociatedLibrary(J(this).closest(".ajaxload"));
            collection = library.collections.getCollection(collectionKey);
            if (!collection.hasChildren && Zotero.nav.getUrlVar("mode") != "edit") {
                Z.debug("Changing page to items list because collection has no children", 4);
                Zotero.ui.mobile.changePage("#library-items-page", {
                    changeHash: false
                });
            } else {
                Zotero.nav.pushState();
            }
        } else {
            Zotero.nav.pushState();
        }
        return false;
    });
    J("#collection-list-div").on("click", "a.my-library", function(e) {
        e.preventDefault();
        Zotero.nav.clearUrlVars([ "mode" ]);
        if (Zotero.config.mobile) {
            Zotero.ui.mobile.changePage("#library-items-page", {
                changeHash: false
            });
        }
        Zotero.nav.pushState();
        return false;
    });
};

Zotero.ui.nestHideCollectionTree = function(el, expandSelected) {
    Z.debug("nestHideCollectionTree");
    if (typeof expandSelected == "undefined") {
        expandSelected = true;
    }
    var jel = J(el);
    jel.find("#collection-list ul").hide().siblings(".folder-toggle").children(".placeholder").addClass("glyphicon").addClass("glyphicon-chevron-right");
    jel.find(".current-collection").parents("ul").show();
    jel.find("#collection-list li.current-collection").children("ul").show();
    jel.find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    jel.find("li.current-collection").parentsUntil("#collection-list").children("div.folder-toggle").find(".glyphicon-chevron-right").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    if (expandSelected === false) {
        jel.find("#collection-list li.current-collection").children("ul").hide();
        jel.find("#collection-list li.current-collection").find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
        jel.find(".current-collection").data("expanded", false);
    } else {
        jel.find("li.current-collection").children("div.folder-toggle").find(".glyphicon-chevron-right").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
        jel.find(".current-collection").data("expanded", true);
    }
    Zotero.ui.createOnActivePage(el);
};

Zotero.ui.highlightCurrentCollection = function(el) {
    Z.debug("Zotero.ui.highlightCurrentCollection", 3);
    if (!el) {
        el = J("body");
    }
    var jel = J(el);
    var collectionKey = Zotero.nav.getUrlVar("collectionKey");
    jel.find("a.current-collection").closest("li").removeClass("current-collection");
    jel.find("a.current-collection").removeClass("current-collection");
    if (collectionKey) {
        jel.find("a[data-collectionKey='" + collectionKey + "']").addClass("current-collection");
        jel.find("a[data-collectionKey='" + collectionKey + "']").closest("li").addClass("current-collection");
    } else {
        jel.find("a.my-library").addClass("current-collection");
        jel.find("a.my-library").closest("li").addClass("current-collection");
    }
};

Zotero.ui.widgets.controlPanel = {};

Zotero.ui.widgets.controlPanel.init = function(el) {
    Z.debug("Zotero.eventful.init.controlPanel", 3);
    Zotero.ui.showControlPanel(el);
    Zotero.ui.eventful.listen("controlPanelContextChange selectedItemsChanged", Zotero.ui.updateDisabledControlButtons);
    Zotero.ui.eventful.listen("selectedCollectionChanged", Zotero.ui.updateCollectionButtons);
    Zotero.ui.eventful.listen("removeFromCollection", Zotero.ui.callbacks.removeFromCollection);
    Zotero.ui.eventful.listen("moveToTrash", Zotero.ui.callbacks.moveToTrash);
    Zotero.ui.eventful.listen("removeFromTrash", Zotero.ui.callbacks.removeFromTrash);
    Zotero.ui.eventful.listen("toggleEdit", Zotero.ui.callbacks.toggleEdit);
    Zotero.ui.eventful.listen("clearLibraryQuery", Zotero.ui.clearLibraryQuery);
    var container = J(el);
    if (Zotero.nav.getUrlVar("q")) {
        container.find("#header-search-query").val(Zotero.nav.getUrlVar("q"));
    }
    var context = "support";
    if (undefined !== window.zoterojsSearchContext) {
        context = zoterojsSearchContext;
    }
    container.on("click", ".library-search-type-link", function(e) {
        e.preventDefault();
        var typeLinks = J(".library-search-type-link").removeClass("selected");
        var selected = J(e.target);
        var selectedType = selected.data("searchtype");
        var searchInput = J("#header-search-query").data("searchtype", selectedType);
        selected.addClass("selected");
        if (selectedType == "simple") {
            searchInput.attr("placeholder", "Search Title, Creator, Year");
        } else if (selectedType == "everything") {
            searchInput.attr("placeholder", "Search Full Text");
        }
    });
    container.on("submit", "#library-search", function(e) {
        e.preventDefault();
        Zotero.nav.clearUrlVars([ "collectionKey", "tag", "q", "qmode" ]);
        var query = J("#header-search-query").val();
        var searchType = J("#header-search-query").data("searchtype");
        if (query !== "" || Zotero.nav.getUrlVar("q")) {
            Zotero.nav.urlvars.pathVars["q"] = query;
            if (searchType != "simple") {
                Zotero.nav.urlvars.pathVars["qmode"] = searchType;
            }
            Zotero.nav.pushState();
        }
        return false;
    });
    container.on("click", ".clear-field-button", function(e) {
        J("#header-search-query").val("").focus();
    });
};

Zotero.ui.widgets.controlPanel.updateDisabledControlButtons = function() {
    Zotero.ui.updateDisabledControlButtons();
};

Zotero.ui.clearLibraryQuery = function() {
    Zotero.nav.unsetUrlVar("q");
    Zotero.nav.unsetUrlVar("qmode");
    Zotero.nav.pushState();
    return;
};

Zotero.ui.updateDisabledControlButtons = function() {
    Z.debug("Zotero.ui.updateDisabledControlButtons", 3);
    J(".move-to-trash-button").prop("title", "Move to Trash");
    J(".create-item-button").removeClass("disabled");
    if (J(".itemlist-editmode-checkbox:checked").length === 0 && !Zotero.nav.getUrlVar("itemKey")) {
        J(".add-to-collection-button").addClass("disabled");
        J(".remove-from-collection-button").addClass("disabled");
        J(".move-to-trash-button").addClass("disabled");
        J(".remove-from-trash-button").addClass("disable");
        J(".cite-button").addClass("disabled");
        J(".export-button").addClass("disabled");
    } else {
        J(".add-to-collection-button").removeClass("disabled");
        J(".remove-from-collection-button").removeClass("disabled");
        J(".move-to-trash-button").removeClass("disabled");
        if (Zotero.nav.getUrlVar("collectionKey") == "trash") {
            J(".remove-from-trash-button").removeClass("disabled");
        }
        J(".cite-button").removeClass("disabled");
        J(".export-button").removeClass("disabled");
    }
    if (!Zotero.nav.getUrlVar("collectionKey")) {
        J(".remove-from-collection-button").addClass("disabled");
    } else if (Zotero.nav.getUrlVar("collectionKey") == "trash") {
        J(".create-item-button").addClass("disabled");
        J(".add-to-collection-button").addClass("disabled");
        J(".remove-from-collection-button").addClass("disabled");
        J(".move-to-trash-button").prop("title", "Permanently Delete");
    }
    Zotero.ui.init.editButton();
};

Zotero.ui.widgets.controlPanel.createItemDropdown = function(el) {
    Z.debug("Zotero.eventful.init.createItemDropdown", 3);
    var itemTypes = [];
    J.each(Zotero.Item.prototype.typeMap, function(key, val) {
        itemTypes.push(key);
    });
    itemTypes.sort();
    menuEl = J(el).find(".createitemmenu.dropdown-menu");
    menuEl.empty();
    menuEl.replaceWith(J(el).find("#newitemdropdownTemplate").render({
        itemTypes: itemTypes
    }));
};

Zotero.ui.callbacks.toggleEdit = function(e) {
    Z.debug("edit checkbox toggled", 3);
    var curMode = Zotero.nav.getUrlVar("mode");
    if (curMode != "edit") {
        Zotero.nav.urlvars.pathVars["mode"] = "edit";
    } else {
        delete Zotero.nav.urlvars.pathVars["mode"];
    }
    Zotero.nav.pushState();
    return false;
};

Zotero.ui.callbacks.createItem = function(e) {
    Z.debug("create-item-Link clicked", 3);
    var collectionKey = Zotero.nav.getUrlVar("collectionKey");
    if (collectionKey) {
        Zotero.nav.urlvars.pathVars = {
            action: "newItem",
            mode: "edit",
            collectionKey: collectionKey
        };
    } else {
        Zotero.nav.urlvars.pathVars = {
            action: "newItem",
            mode: "edit"
        };
    }
    Zotero.nav.pushState();
    return false;
};

Zotero.ui.callbacks.moveToTrash = function(e) {
    e.preventDefault();
    Z.debug("move-to-trash clicked", 3);
    var itemKeys = Zotero.ui.getSelectedItemKeys(J("#edit-mode-items-form"));
    Z.debug(itemKeys, 3);
    var library = Zotero.ui.getAssociatedLibrary(J(this).closest("div.ajaxload"));
    var response;
    var trashingItems = library.items.getItems(itemKeys);
    var deletingItems = [];
    Zotero.ui.showSpinner(J("#library-items-div"));
    if (Zotero.nav.getUrlVar("collectionKey") == "trash") {
        var i;
        for (i = 0; i < trashingItems.length; i++) {
            var item = trashingItems[i];
            if (item.get("deleted")) {
                deletingItems.push(item);
            }
        }
        response = library.items.deleteItems(deletingItems);
    } else {
        response = library.items.trashItems(trashingItems);
    }
    library.dirty = true;
    response.always(function() {
        Zotero.nav.clearUrlVars([ "collectionKey", "tag", "q" ]);
        Zotero.nav.pushState(true);
    });
    return false;
};

Zotero.ui.callbacks.removeFromTrash = function(e) {
    Z.debug("remove-from-trash clicked", 3);
    var itemKeys = Zotero.ui.getSelectedItemKeys(J("#edit-mode-items-form"));
    Z.debug(itemKeys, 4);
    var library = Zotero.ui.getAssociatedLibrary(J(this).closest("div.ajaxload"));
    var untrashingItems = library.items.getItems(itemKeys);
    Zotero.ui.showSpinner(J("#library-items-div"));
    var response = library.items.untrashItems(untrashingItems);
    library.dirty = true;
    response.always(function() {
        Zotero.nav.clearUrlVars([ "collectionKey", "tag", "q" ]);
        Zotero.nav.pushState(true);
    });
    return false;
};

Zotero.ui.callbacks.removeFromCollection = function(e) {
    Z.debug("remove-from-collection clicked", 3);
    var itemKeys = Zotero.ui.getSelectedItemKeys(J("#edit-mode-items-form"));
    var library = Zotero.ui.getAssociatedLibrary(J(this).closest("div.ajaxload"));
    var collectionKey = Zotero.nav.getUrlVar("collectionKey");
    var modifiedItems = [];
    var responses = [];
    J.each(itemKeys, function(index, itemKey) {
        var item = library.items.getItem(itemKey);
        item.removeFromCollection(collectionKey);
        modifiedItems.push(item);
    });
    var itemWriteDeferred = library.items.writeItems(modifiedItems);
    library.dirty = true;
    itemWriteDeferred.done(function() {
        Z.debug("removal responses finished. forcing reload", 3);
        Zotero.nav.clearUrlVars([ "collectionKey", "tag" ]);
        Zotero.nav.pushState(true);
        Zotero.ui.eventful.trigger("displayedItemsChanged");
    });
    return false;
};

Zotero.ui.showControlPanel = function(el) {
    Z.debug("Zotero.ui.showControlPanel", 3);
    var jel = J(el);
    var mode = Zotero.nav.getUrlVar("mode") || "view";
    if (Zotero.config.librarySettings.allowEdit === 0) {
        J(".permission-edit").hide();
        J("#control-panel").hide();
    }
};

Zotero.ui.widgets.createCollectionDialog = {};

Zotero.ui.widgets.createCollectionDialog.init = function(el) {
    Z.debug("createcollectionsdialog widget init", 3);
    Zotero.ui.eventful.listen("createCollection", Zotero.ui.widgets.createCollectionDialog.show, {
        widgetEl: el
    });
};

Zotero.ui.widgets.createCollectionDialog.show = function(e) {
    Z.debug("createCollectionDialog.show", 3);
    var triggeringEl = J(e.triggeringElement);
    var library = Zotero.ui.getAssociatedLibrary(triggeringEl);
    var ncollections = library.collections.nestedOrderingArray();
    var widgetEl = J(e.data["widgetEl"]).empty();
    widgetEl.html(J("#createcollectiondialogTemplate").render({
        ncollections: ncollections
    }));
    var dialogEl = widgetEl.find(".create-collection-dialog");
    var currentCollectionKey = Zotero.nav.getUrlVar("collectionKey");
    dialogEl.find(".new-collection-parent").val(currentCollectionKey);
    var createFunction = J.proxy(function() {
        var newCollection = new Zotero.Collection;
        newCollection.parentCollectionKey = dialogEl.find(".new-collection-parent").val();
        newCollection.name = dialogEl.find("input.new-collection-title-input").val() || "Untitled";
        var d = library.addCollection(newCollection);
        d.done(J.proxy(function() {
            library.collections.dirty = true;
            Zotero.nav.pushState(true);
        }, this));
        Zotero.ui.closeDialog(widgetEl.find(".create-collection-dialog"));
    }, this);
    dialogEl.find(".createButton").on("click", createFunction);
    Zotero.ui.dialog(widgetEl.find(".create-collection-dialog"), {});
    return false;
};

Zotero.ui.widgets.deleteCollectionDialog = {};

Zotero.ui.widgets.deleteCollectionDialog.init = function(el) {
    Z.debug("deletecollectionsdialog widget init", 3);
    Zotero.ui.eventful.listen("deleteCollection", Zotero.ui.widgets.deleteCollectionDialog.show, {
        widgetEl: el
    });
};

Zotero.ui.widgets.deleteCollectionDialog.show = function(e) {
    Z.debug("deleteCollectionDialog.show", 3);
    var triggeringEl = J(e.triggeringElement);
    var library = Zotero.ui.getAssociatedLibrary(triggeringEl);
    var currentCollectionKey = Zotero.nav.getUrlVar("collectionKey");
    var currentCollection = library.collections.getCollection(currentCollectionKey);
    var widgetEl = J(e.data["widgetEl"]).empty();
    widgetEl.html(J("#deletecollectiondialogTemplate").render({
        collection: currentCollection
    }));
    var dialogEl = widgetEl.find(".delete-collection-dialog");
    var deleteFunction = J.proxy(function() {
        Z.debug("Zotero.ui.deleteSelectedCollection", 3);
        var collection = currentCollection;
        if (!collection) {
            Zotero.ui.jsNotificationMessage("Selected collection not found", "error");
            return false;
        }
        var d = collection.remove();
        d.done(J.proxy(function() {
            delete Zotero.nav.urlvars.pathVars["collectionKey"];
            library.collections.dirty = true;
            Zotero.nav.pushState();
            Zotero.ui.jsNotificationMessage(collection.title + " removed", "confirm");
        }, this));
        Zotero.ui.closeDialog(dialogEl);
        return false;
    }, this);
    dialogEl.find(".deleteButton").on("click", deleteFunction);
    Zotero.ui.dialog(dialogEl, {});
    return false;
};

Zotero.ui.widgets.exportItemsDialog = {};

Zotero.ui.widgets.exportItemsDialog.init = function(el) {
    Z.debug("exportItemDialog widget init", 3);
    Zotero.ui.eventful.listen("exportItemsDialog", Zotero.ui.widgets.exportItemsDialog.show, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("displayedItemsChanged", Zotero.ui.widgets.exportItemsDialog.updateExportLinks, {
        widgetEl: el
    });
};

Zotero.ui.widgets.exportItemsDialog.show = function(e) {
    Z.debug("exportitemdialog.show", 3);
    var triggeringEl = J(e.triggeringElement);
    var library = Zotero.ui.getAssociatedLibrary(triggeringEl);
    var widgetEl = J(e.data["widgetEl"]).empty();
    widgetEl.html(J("#exportitemsdialogTemplate").render({}));
    var dialogEl = widgetEl.find(".export-items-dialog");
    dialogEl.find(".modal-body").empty().append(J(".export-list").contents().clone());
    Zotero.ui.dialog(dialogEl, {});
    return false;
};

Zotero.ui.widgets.exportItemsDialog.updateExportLinks = function(e) {
    Z.debug("exportItemsDialog.updateExportLinks", 3);
    var triggeringEl = J(e.triggeringElement);
    var library = Zotero.ui.getAssociatedLibrary(triggeringEl);
    var widgetEl = J(e.data["widgetEl"]);
    var urlconfig = Zotero.ui.getItemsConfig(library);
    var exportUrls = Zotero.url.exportUrls(urlconfig);
    J(".export-list").empty().append(J("#exportformatsTemplate").render({
        exportUrls: exportUrls,
        exportFormatsMap: Zotero.config.exportFormatsMap
    }));
    J(".export-list").data("urlconfig", urlconfig);
    J(".export-list").hide();
};

Zotero.ui.widgets.feedlink = {};

Zotero.ui.widgets.feedlink.init = function(el) {
    Zotero.ui.eventful.listen("displayedItemsChanged", Zotero.ui.widgets.feedlink.recalcFeedlink, {
        widgetEl: el
    });
};

Zotero.ui.widgets.feedlink.recalcFeedlink = function(e) {
    Z.debug("Zotero eventful loadFeedLinkCallback", 3);
    var widgetEl = e.data.widgetEl;
    var el = widgetEl;
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(el);
    var urlconfig = Zotero.ui.getItemsConfig(library);
    var requestUrl = Zotero.ajax.apiRequestUrl(urlconfig) + Zotero.ajax.apiQueryString(urlconfig, false);
    var feedUrl = requestUrl.replace(Zotero.config.baseApiUrl, Zotero.config.baseFeedUrl);
    var newkeyurl = Zotero.url.requestReadApiKeyUrl(library.libraryType, library.libraryID, feedUrl);
    jel.data("urlconfig", urlconfig);
    if (library.libraryType == "user" && zoteroData.libraryPublish === 0 || library.libraryType == "group" && zoteroData.groupType == "Private") {
        J(".feed-link").attr("href", newkeyurl);
    } else {
        J(".feed-link").attr("href", feedUrl);
    }
    J("#library link[rel='alternate']").attr("href", feedUrl);
};

Zotero.ui.widgets.groups = {};

Zotero.ui.userGroupsDisplay = function(groups) {
    var html = "";
    J.each(groups.groupsArray, function(index, group) {
        html += Zotero.ui.groupNugget(group);
    });
    return html;
};

Zotero.ui.displayGroupNuggets = function(el, groups) {
    var jel = J(el);
    jel.empty();
    J.each(groups, function(ind, group) {
        Z.debug("Displaying group nugget");
        Z.debug(group);
        var userID = zoteroData.loggedInUserID;
        var groupManageable = false;
        var memberCount = 1;
        if (group.apiObj.members) {
            memberCount += group.apiObj.members.length;
        }
        if (group.apiObj.admins) {
            memberCount += group.apiObj.admins.length;
        }
        if (userID && (userID == group.apiObj.owner || J.inArray(userID, group.apiObj.admins) != -1)) {
            groupManageable = true;
        }
        jel.append(J("#groupnuggetTemplate").render({
            group: group.apiObj,
            groupViewUrl: Zotero.url.groupViewUrl(group),
            groupLibraryUrl: Zotero.url.groupLibraryUrl(group),
            groupSettingsUrl: Zotero.url.groupSettingsUrl(group),
            groupLibrarySettings: Zotero.url.groupLibrarySettingsUrl(group),
            memberCount: memberCount,
            groupManageable: groupManageable
        }));
    });
};

Zotero.ui.widgets.item = {};

Zotero.ui.widgets.item.init = function(el) {
    Zotero.ui.eventful.listen("displayedItemChanged modeChanged", Zotero.ui.widgets.item.loadItemCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("saveItem", Zotero.ui.widgets.item.saveItemCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("cancelItemEdit", Zotero.ui.widgets.item.cancelItemEdit, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("itemTypeChanged", Zotero.ui.widgets.item.itemTypeChanged, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("uploadSuccessful showChildren", Zotero.ui.widgets.item.showChildren, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("addTag", Zotero.ui.widgets.item.addTag, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("removeTag", Zotero.ui.widgets.item.removeTag, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("addCreator", Zotero.ui.widgets.item.addCreator, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("removeCreator", Zotero.ui.widgets.item.removeCreator, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("switchTwoFieldCreator", Zotero.ui.widgets.item.switchTwoFieldCreators, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("switchSingleFieldCreator", Zotero.ui.widgets.item.switchSingleFieldCreator, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("addNote", Zotero.ui.widgets.item.addNote, {
        widgetEl: el
    });
    var container = J(el);
    container.on("keydown", ".itemDetailForm input", Zotero.ui.widgets.item.itemFormKeydown);
};

Zotero.ui.widgets.item.loadItemCallback = function(event) {
    Z.debug("Zotero eventful loadItemCallback", 3);
    var widgetEl = event.data.widgetEl;
    var el = widgetEl;
    Z.debug("Zotero.callbacks.loadItem", 3);
    Zotero.callbacks.rejectIfPending(el);
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(el);
    var d;
    jel.empty();
    Zotero.ui.showSpinner(el);
    if (Zotero.nav.getUrlVar("action") == "newItem") {
        var itemType = Zotero.nav.getUrlVar("itemType");
        if (!itemType) {
            jel.empty();
            jel.html(J("#itemtypeselectTemplate").render({
                itemTypes: Zotero.localizations.typeMap.sort()
            }));
            return;
        } else {
            var newItem = new Zotero.Item;
            newItem.libraryType = library.libraryType;
            newItem.libraryID = library.libraryID;
            d = newItem.initEmpty(itemType);
            jel.data("pendingDeferred", d);
            d.done(J.proxy(function(item) {
                Zotero.ui.unassociatedItemForm(jel, item);
            }, this));
            d.fail(function(jqxhr, textStatus, errorThrown) {
                Zotero.ui.jsNotificationMessage("Error loading item template", "error");
            });
            return;
        }
    }
    var itemKey = Zotero.nav.getUrlVar("itemKey");
    Z.debug(Zotero.nav.getUrlVars());
    if (!itemKey) {
        Z.debug("No itemKey - " + itemKey, 3);
        J(el).empty();
        return false;
    }
    var item = library.items.getItem(itemKey);
    if (item) {
        Z.debug("have item locally, loading details into ui", 3);
        if (Zotero.nav.getUrlVar("mode") == "edit") {
            Zotero.ui.editItemForm(jel, item);
        } else {
            Zotero.ui.loadItemDetail(item, jel);
            Zotero.ui.eventful.trigger("showChildren");
        }
    } else {
        Z.debug("must fetch item from server", 3);
        d = library.loadItem(itemKey);
        jel.data("pendingDeferred", d);
        var config = {
            target: "item",
            libraryType: library.type,
            libraryID: library.libraryID,
            itemKey: itemKey,
            content: "json"
        };
        d.done(J.proxy(function(item) {
            Z.debug("Library.loadItem done", 3);
            jel.empty();
            if (Zotero.nav.getUrlVar("mode") == "edit") {
                Zotero.ui.editItemForm(jel, item);
            } else {
                Zotero.ui.loadItemDetail(item, jel);
                Zotero.ui.eventful.trigger("showChildren");
            }
            jel.data("currentconfig", config);
            Zotero.eventful.initTriggers(J(widgetEl));
        }, this));
    }
    Zotero.eventful.initTriggers(J(widgetEl));
};

Zotero.ui.widgets.item.showChildren = function(e) {
    Z.debug("Zotero.ui.widgets.item.showChildren", 3);
    var widgetEl = J(e.data.widgetEl);
    var itemKey = widgetEl.data("itemkey");
    var library = Zotero.ui.getAssociatedLibrary(widgetEl);
    var item = library.items.getItem(itemKey);
    var attachmentsDiv = J(widgetEl).find(".item-attachments-div");
    Zotero.ui.showSpinner(attachmentsDiv);
    var childItemsPromise = item.getChildren(library);
    childItemsPromise.done(function(childItems) {
        J(".item-attachments-div").html(J("#childitemsTemplate").render({
            childItems: childItems
        }));
    });
};

Zotero.ui.widgets.item.addCreator = function(e) {
    var button = e.triggeringElement;
    Z.debug("Zotero.ui.addCreator", 3);
    var itemKey = J(button).data("itemkey");
    var itemType = J(button).closest("form").find("select.itemType").val();
    var lastcreatorid = J("input[id^='creator_']:last").attr("id");
    var creatornum = 0;
    if (lastcreatorid) {
        creatornum = parseInt(lastcreatorid.substr(8), 10);
    }
    var newindex = creatornum + 1;
    var jel = J("input[id^='creator_']:last").closest("tr");
    jel.after(J("#authorelementsdoubleTemplate").render({
        index: newindex,
        creator: {
            firstName: "",
            lastName: ""
        },
        creatorTypes: Zotero.Item.prototype.creatorTypes[itemType]
    }));
    Zotero.ui.init.creatorFieldButtons();
    Zotero.ui.createOnActivePage(jel);
};

Zotero.ui.widgets.item.removeCreator = function(e) {
    var button = e.currentTarget;
    var widgetEl = Zotero.ui.parentWidgetEl(button);
    Z.debug("Zotero.ui.removeCreator", 3);
    if (widgetEl.find("tr.creator").length === 1) {
        Zotero.ui.addCreator(e);
    }
    J(button).closest("tr").remove();
    Zotero.ui.createOnActivePage(button);
};

Zotero.ui.widgets.item.addNote = function(e) {
    Z.debug("Zotero.ui.addNote", 3);
    var button = J(e.currentTarget);
    var container = button.closest("form");
    var notenum = 0;
    var lastNoteIndex = container.find("textarea.note-text:last").data("noteindex");
    if (lastNoteIndex) {
        notenum = parseInt(lastNoteIndex, 10);
    }
    var newindex = notenum + 1;
    var newNoteID = "note_" + newindex;
    var jel;
    if (Zotero.config.mobile) {
        jel = container.find("td.notes").append('<textarea cols="40" rows="24" name="' + newNoteID + '" id="' + newNoteID + '" class="rte default note-text" data-noteindex="' + newNoteID + '"></textarea>');
    } else {
        jel = container.find("td.notes button.add-note-button").before('<textarea cols="40" rows="24" name="' + newNoteID + '" id="' + newNoteID + '" class="rte default note-text" data-noteindex="' + newNoteID + '"></textarea>');
    }
    Zotero.ui.init.rte("default", true, newNoteID);
    Zotero.ui.createOnActivePage(button);
};

Zotero.ui.loadNewItemTemplate = function(item) {
    Z.debug("Zotero.ui.loadNewItemTemplate", 3);
    Z.debug(item, 3);
    var d = Zotero.Item.prototype.getCreatorTypes(item.itemType);
    d.done(function(itemCreatorTypes) {
        var jel = J("#item-details-div").empty();
        if (item.itemType == "note") {
            var parentKey = Zotero.nav.getUrlVar("parentKey");
            if (parentKey) {
                item.parentKey = parentKey;
            }
            jel.append(J("#editnoteformTemplate").render({
                item: item,
                itemKey: item.itemKey
            }));
            Zotero.ui.init.rte("default");
        } else {
            jel.append(J("#itemformTemplate").render({
                item: item,
                libraryUserID: zoteroData.libraryUserID,
                itemKey: item.itemKey,
                creatorTypes: itemCreatorTypes,
                saveable: true,
                citable: false
            }));
            if (item.apiObj.tags.length === 0) {
                Zotero.ui.widgets.item.addTag(jel, false);
            }
            Zotero.ui.init.creatorFieldButtons();
            Zotero.ui.init.editButton();
        }
        jel.data("newitem", item);
        Zotero.ui.loadFormData(jel);
        Zotero.ui.createOnActivePage(jel);
    });
};

Zotero.ui.widgets.item.addTag = function(e, focus) {
    Z.debug("Zotero.ui.widgets.item.addTag", 3);
    if (typeof focus == "undefined") {
        focus = true;
    }
    var widgetEl = Zotero.ui.parentWidgetEl(e);
    var tagnum = 0;
    var lastTagID = widgetEl.find("input[id^='tag_']:last").attr("id");
    if (lastTagID) {
        tagnum = parseInt(lastTagID.substr(4), 10);
    }
    var newindex = tagnum + 1;
    var jel = widgetEl.find("td.tags");
    jel.append(J("#itemtagTemplate").render({
        index: newindex
    }));
    var library = Zotero.ui.getAssociatedLibrary(widgetEl);
    if (library) {
        var typeaheadSource = library.tags.plainList;
        if (!typeaheadSource) {
            typeaheadSource = [];
        }
        widgetEl.find("input.taginput").not(".tt-query").typeahead({
            name: "tags",
            local: typeaheadSource
        });
    }
    if (focus) {
        J("input.taginput").last().focus();
    }
};

Zotero.ui.widgets.item.removeTag = function(e) {
    Z.debug("Zotero.ui.removeTag", 3);
    var el = e.currentTarget;
    var widgetEl = Zotero.ui.parentWidgetEl(el);
    if (widgetEl.find("div.edit-tag-div").length === 1) {
        Zotero.ui.widgets.item.addTag(e);
    }
    J(el).closest(".edit-tag-div").remove();
};

Zotero.ui.editItemForm = function(el, item) {
    Z.debug("Zotero.ui.editItemForm", 3);
    Z.debug(item, 4);
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(el);
    if (item.itemType == "note") {
        Z.debug("editItemForm - note", 3);
        jel.empty();
        jel.append(J("#editnoteformTemplate").render({
            item: item,
            itemKey: item.itemKey
        }));
        Zotero.ui.init.rte("default");
        Zotero.ui.init.editButton();
    } else if (item.itemType == "attachment") {
        Z.debug("item is attachment", 4);
        jel.empty();
        var mode = Zotero.nav.getUrlVar("mode");
        jel.append(J("#attachmentformTemplate").render({
            item: item,
            itemKey: item.itemKey,
            creatorTypes: [],
            mode: mode
        }));
        if (item.apiObj.tags.length === 0) {
            Zotero.ui.widgets.item.addTag(el, false);
        }
        if (Zotero.config.mobile) {
            Zotero.ui.init.editButton();
            J(el).trigger("create");
        } else {
            Zotero.ui.init.creatorFieldButtons();
            Zotero.ui.init.editButton();
        }
        Zotero.ui.init.rte();
    } else {
        var p = item.getCreatorTypes(item.apiObj.itemType);
        p.done(J.proxy(function() {
            Z.debug("getCreatorTypes callback", 3);
            jel.empty();
            var mode = Zotero.nav.getUrlVar("mode");
            if (item.creators.length === 0) {
                item.creators.push({
                    creatorType: item.creatorTypes[item.itemType][0],
                    first: "",
                    last: ""
                });
                item.apiObj.creators = item.creators;
            }
            Z.debug("Rendering item form");
            Z.debug(Zotero.Item.prototype.creatorTypes[item.apiObj.itemType]);
            jel.append(J("#itemformTemplate").render({
                item: item,
                library: library,
                itemKey: item.itemKey,
                creatorTypes: Zotero.Item.prototype.creatorTypes[item.apiObj.itemType],
                saveable: true,
                citable: false
            }));
            if (item.apiObj.tags.length === 0) {
                Zotero.ui.widgets.item.addTag(el, false);
            }
            if (Zotero.config.mobile) {
                Zotero.ui.init.editButton();
                J(el).trigger("create");
            } else {
                Zotero.ui.init.creatorFieldButtons();
                Zotero.ui.init.editButton();
            }
            Zotero.eventful.initTriggers(jel);
        }, this));
    }
    var typeaheadSource = library.tags.plainList;
    if (!typeaheadSource) {
        typeaheadSource = [];
    }
    jel.find("input.taginput").typeahead("destroy").typeahead({
        name: "tags",
        local: typeaheadSource
    });
};

Zotero.ui.loadItemDetail = function(item, el) {
    Z.debug("Zotero.ui.loadItemDetail", 3);
    var jel = J(el);
    jel.empty();
    var parentUrl = false;
    var library = item.owningLibrary;
    if (item.parentItemKey) {
        parentUrl = library.websiteUrl({
            itemKey: item.parentItemKey
        });
    }
    if (item.itemType == "note") {
        Z.debug("note item", 3);
        jel.append(J("#itemnotedetailsTemplate").render({
            item: item,
            parentUrl: parentUrl,
            libraryString: library.libraryString
        }));
    } else {
        Z.debug("non-note item", 3);
        jel.append(J("#itemdetailsTemplate").render({
            item: item,
            parentUrl: parentUrl,
            libraryString: library.libraryString
        })).trigger("create");
    }
    Zotero.ui.init.rte("readonly");
    Zotero.ui.init.editButton();
    try {
        var ev = document.createEvent("HTMLEvents");
        ev.initEvent("ZoteroItemUpdated", true, true);
        document.dispatchEvent(ev);
    } catch (e) {
        Zotero.debug("Error triggering ZoteroItemUpdated event");
    }
    jel.data("itemkey", item.itemKey);
};

Zotero.ui.widgets.item.saveItemCallback = function(e) {
    Z.debug("widgets.item.saveItemCallback", 3);
    e.preventDefault();
    var triggeringElement = J(e.triggeringElement);
    var widgetEl = e.data.widgetEl;
    var el = widgetEl;
    Zotero.ui.scrollToTop();
    var library = Zotero.ui.getEventLibrary(e);
    var itemKey = triggeringElement.data("itemkey");
    Z.debug("itemKey: " + itemKey, 3);
    var item;
    if (itemKey) {
        item = library.items.getItem(itemKey);
        Z.debug("itemKey " + itemKey + " : ", 3);
    } else {
        item = J("#item-details-div").data("newitem");
        Z.debug("newItem : itemTemplate selected from form", 3);
        Z.debug(item, 3);
    }
    Zotero.ui.updateItemFromForm(item, triggeringElement.closest("form"));
    Zotero.ui.saveItem(item, triggeringElement.closest("form"));
    library.dirty = true;
    return false;
};

Zotero.ui.widgets.item.switchTwoFieldCreators = function(e) {
    Z.debug("switch two field creator clicked");
    var jel = J(e.triggeringElement);
    var containingTable = jel.closest("table");
    var last, first;
    var name = jel.closest("tr.creator").find("input[id$='_name']").val();
    var split = name.split(" ");
    if (split.length > 1) {
        last = split.splice(-1, 1)[0];
        first = split.join(" ");
    } else {
        last = name;
        first = "";
    }
    var itemType = jel.closest("form").find("select.itemType").val();
    var index = parseInt(jel.closest("tr.creator").attr("id").substr(8), 10);
    var trIdString = "#creator_" + index;
    var creatorType = jel.closest("tr.creator").find("select#creator_" + index + "_creatorType").val();
    jel.closest("tr").replaceWith(J("#authorelementsdoubleTemplate").render({
        index: "" + index,
        creator: {
            firstName: first,
            lastName: last,
            creatorType: creatorType
        },
        creatorTypes: Zotero.Item.prototype.creatorTypes[itemType]
    }));
    Zotero.ui.init.creatorFieldButtons();
    Zotero.eventful.initTriggers(containingTable.find(trIdString));
};

Zotero.ui.widgets.item.switchSingleFieldCreator = function(e) {
    Z.debug("switch single field clicked");
    var jel = J(e.triggeringElement);
    var containingTable = jel.closest("table");
    var name;
    var firstName = jel.closest("div.creator-input-div").find("input[id$='_firstName']").val();
    var lastName = jel.closest("div.creator-input-div").find("input[id$='_lastName']").val();
    name = firstName + " " + lastName;
    var itemType = jel.closest("form").find("select.itemType").val();
    var index = parseInt(jel.closest("tr.creator").attr("id").substr(8), 10);
    var trIdString = "#creator_" + index;
    var creatorType = jel.closest("tr.creator").find("select#creator_" + index + "_creatorType").val();
    jel.closest("tr").replaceWith(J("#authorelementssingleTemplate").render({
        index: "" + index,
        creator: {
            name: name
        },
        creatorTypes: Zotero.Item.prototype.creatorTypes[itemType]
    }));
    Zotero.ui.init.creatorFieldButtons();
    Zotero.eventful.initTriggers(containingTable.find(trIdString));
};

Zotero.ui.widgets.item.cancelItemEdit = function(e) {
    Zotero.nav.clearUrlVars([ "itemKey", "collectionKey", "tag", "q" ]);
    Zotero.nav.pushState();
};

Zotero.ui.widgets.item.selectItemType = function(e) {
    Z.debug("itemTypeSelectButton clicked", 3);
    var jel;
    if (e.zeventful) {
        jel = J(e.triggeringElement);
    } else {
        jel = J(this);
    }
    var itemType = J("#itemType").val();
    Zotero.nav.urlvars.pathVars["itemType"] = itemType;
    Zotero.nav.pushState();
    return false;
};

Zotero.ui.widgets.item.itemFormKeydown = function(e) {
    if (e.keyCode === Zotero.ui.keyCode.ENTER) {
        e.preventDefault();
        var triggeringEl = J(this);
        if (triggeringEl.hasClass("taginput")) {
            if (triggeringEl.hasClass("tt-query")) {
                var val = triggeringEl.val();
                triggeringEl.typeahead("setQuery", val);
                triggeringEl.trigger("blur");
            }
            Zotero.ui.eventful.trigger("addTag");
            return;
        }
        var nextEligibleSiblings = J(this).nextAll("input, button, textarea, select");
        if (nextEligibleSiblings.length) {
            nextEligibleSiblings.first().focus();
        } else {
            J(this).closest("tr").nextAll().find("input, button, textarea, select").first().focus();
        }
    }
};

Zotero.ui.widgets.items = {};

Zotero.ui.widgets.items.init = function(el) {
    Zotero.ui.eventful.listen("displayedItemsChanged", Zotero.ui.widgets.items.loadItemsCallback, {
        widgetEl: el
    });
    var container = J(el);
    container.on("click", ".field-table-header", Zotero.ui.callbacks.resortItems);
    container.on("change", ".itemlist-editmode-checkbox.all-checkbox", function(e) {
        J(".itemlist-editmode-checkbox").prop("checked", J(".itemlist-editmode-checkbox.all-checkbox").prop("checked"));
        Zotero.ui.updateDisabledControlButtons();
        Zotero.ui.eventful.trigger("selectedItemsChanged");
    });
    container.on("change", "input.itemKey-checkbox", function(e) {
        Zotero.ui.updateDisabledControlButtons();
        Zotero.ui.eventful.trigger("selectedItemsChanged");
    });
};

Zotero.ui.widgets.items.loadItemsCallback = function(event) {
    Z.debug("Zotero eventful loadItemsCallback", 3);
    var widgetEl = event.data.widgetEl;
    var el = widgetEl;
    Zotero.callbacks.rejectIfPending(el);
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(el);
    var newConfig = Zotero.ui.getItemsConfig(library);
    Z.debug(newConfig);
    Zotero.ui.showSpinner(el, "horizontal");
    var d = library.loadItems(newConfig);
    d.done(J.proxy(function(loadedItems) {
        J(el).empty();
        Zotero.ui.displayItemsFull(el, newConfig, loadedItems);
    }, this));
    d.fail(J.proxy(function(jqxhr, textStatus, errorThrown) {
        var elementMessage = Zotero.ui.ajaxErrorMessage(jqxhr);
        jel.html("<p>" + elementMessage + "</p>");
    }));
    jel.data("pendingDeferred", d);
};

Zotero.ui.getItemsConfig = function(library) {
    var effectiveUrlVars = [ "itemPage", "tag", "collectionKey", "order", "sort", "q" ];
    var urlConfigVals = {};
    J.each(effectiveUrlVars, function(index, value) {
        var t = Zotero.nav.getUrlVar(value);
        if (t) {
            urlConfigVals[value] = t;
        }
    });
    var defaultConfig = {
        libraryID: library.libraryID,
        libraryType: library.libraryType,
        target: "items",
        targetModifier: "top",
        itemPage: 1,
        limit: library.preferences.getPref("itemsPerPage"),
        content: "json"
    };
    var userPreferencesApiArgs = {
        order: Zotero.preferences.getPref("order"),
        sort: Zotero.preferences.getPref("sort"),
        limit: library.preferences.getPref("itemsPerPage")
    };
    var newConfig = J.extend({}, defaultConfig, userPreferencesApiArgs, urlConfigVals);
    newConfig["collectionKey"] = urlConfigVals["collectionKey"];
    newConfig.start = parseInt(newConfig.limit, 10) * (parseInt(newConfig.itemPage, 10) - 1);
    if (newConfig.order == "addedBy" && library.libraryType == "user") {
        newConfig.order = "title";
    }
    if (!newConfig.sort) {
        newConfig.sort = Zotero.config.sortOrdering[newConfig.order];
    }
    if (newConfig.tag || newConfig.q) {
        delete newConfig.targetModifier;
    }
    return newConfig;
};

Zotero.ui.displayItemsWidget = function(el, config, loadedItems) {
    Z.debug("Zotero.ui.displayItemsWidget", 3);
    Z.debug(config, 4);
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(jel);
    var itemPage = parseInt(Zotero.nav.getUrlVar("itemPage"), 10) || 1;
    var feed = loadedItems.feed;
    var start = parseInt(config.start, 10) || 0;
    var limit = parseInt(config.limit, 10) || library.preferences.getPref("itemsPerPage");
    var order = config.order || Zotero.preferences.getPref("order");
    var sort = config.sort || Zotero.config.sortOrdering[order] || "asc";
    var editmode = false;
    var displayFields = library.preferences.getPref("listDisplayedFields");
    var itemsTableData = {
        displayFields: displayFields,
        items: loadedItems.itemsArray,
        order: order,
        sort: sort,
        library: loadedItems.library
    };
    Zotero.ui.insertItemsTable(el, itemsTableData);
};

Zotero.ui.displayItemsFull = function(el, config, loadedItems) {
    Z.debug("Zotero.ui.displayItemsFull", 3);
    Z.debug(config, 4);
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(jel);
    var feed = loadedItems.feed;
    var filledConfig = J.extend({}, Zotero.config.defaultApiArgs, config);
    var displayFields = library.preferences.getPref("listDisplayedFields");
    if (loadedItems.library.libraryType != "group") {
        displayFields = J.grep(displayFields, function(el, ind) {
            return J.inArray(el, Zotero.Library.prototype.groupOnlyColumns) == -1;
        });
    }
    var editmode = Zotero.config.librarySettings.allowEdit ? true : false;
    var itemsTableData = {
        displayFields: displayFields,
        items: loadedItems.itemsArray,
        editmode: editmode,
        order: filledConfig["order"],
        sort: filledConfig["sort"],
        library: loadedItems.library
    };
    Z.debug(jel, 4);
    Zotero.ui.insertItemsTable(jel, itemsTableData);
    if (Zotero.config.mobile) {
        Zotero.ui.createOnActivePage(el);
        return;
    }
    var pagination = Zotero.ui.createPagination(loadedItems.feed, "itemPage", filledConfig);
    var paginationData = {
        feed: feed,
        pagination: pagination
    };
    var itemPage = pagination.page;
    Zotero.ui.insertItemsPagination(el, paginationData);
    Z.debug(jel, 4);
    var lel = J(el);
    J("#start-item-link").click(function(e) {
        e.preventDefault();
        Zotero.nav.urlvars.pathVars["itemPage"] = "";
        Zotero.nav.pushState();
    });
    J("#prev-item-link").click(function(e) {
        e.preventDefault();
        var newItemPage = itemPage - 1;
        Zotero.nav.urlvars.pathVars["itemPage"] = newItemPage;
        Zotero.nav.pushState();
    });
    J("#next-item-link").click(function(e) {
        e.preventDefault();
        var newItemPage = itemPage + 1;
        Zotero.nav.urlvars.pathVars["itemPage"] = newItemPage;
        Zotero.nav.pushState();
    });
    J("#last-item-link").click(function(e) {
        e.preventDefault();
        Z.debug("last-item-link clickbind", 4);
        var lasthref = "";
        J.each(feed.links, function(ind, link) {
            if (link.rel === "last") {
                lasthref = link.href;
                return false;
            }
        });
        Z.debug(lasthref, 4);
        var laststart = J.deparam.querystring(lasthref).start;
        Z.debug("laststart:" + laststart, 4);
        var lastItemPage = parseInt(laststart, 10) / limit + 1;
        Zotero.nav.urlvars.pathVars["itemPage"] = lastItemPage;
        Zotero.nav.pushState();
    });
    Zotero.ui.updateDisabledControlButtons();
    Zotero.ui.createOnActivePage(el);
};

Zotero.ui.insertItemsTable = function(el, data) {
    Z.debug("Zotero.ui.insertItemsTable", 3);
    Z.debug(data, 4);
    var a = J(el).append(J("#itemstableTemplate").render(data));
    if (Zotero.config.mobile && J(el).closest(".ui-page").length) {
        if (!J(el).find("#field-list").hasClass("ui-listview")) {
            J(el).find("#field-list").listview();
        } else {
            J(el).find("#field-list").trigger("refresh");
        }
    }
};

Zotero.ui.insertItemsPagination = function(el, data) {
    J(el).append(J("#itempaginationTemplate").render(data));
    Zotero.ui.init.paginationButtons(data.pagination);
};

Zotero.ui.bindItemLinks = function() {
    Z.debug("Zotero.ui.bindItemLinks", 3);
    J("div#items-pane").on("click", "a.item-select-link", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Z.debug("item-select-link clicked", 3);
        var itemKey = J(this).attr("data-itemKey");
        Z.debug("click " + itemKey, 4);
        Zotero.nav.urlvars.pathVars.itemKey = itemKey;
        Zotero.nav.pushState();
    });
    J("div#items-pane").on("click", "td[data-itemkey]:not(.edit-checkbox-td)", function(e) {
        e.preventDefault();
        Z.debug("item-select-td clicked", 3);
        var itemKey = J(this).attr("data-itemKey");
        Z.debug("click " + itemKey, 4);
        Zotero.nav.urlvars.pathVars.itemKey = itemKey;
        Zotero.nav.pushState();
    });
};

Zotero.ui.callbacks.resortItems = function(e) {
    Z.debug(".field-table-header clicked", 3);
    var library = Zotero.ui.getEventLibrary(e);
    var currentSortField = Zotero.ui.getPrioritizedVariable("order", "title");
    var currentSortOrder = Zotero.ui.getPrioritizedVariable("sort", "asc");
    var newSortField = J(e.currentTarget).data("columnfield");
    Z.debug("New order field:" + newSortField);
    Z.debug(e.currentTarget);
    var newSortOrder = Zotero.config.sortOrdering[newSortField];
    if (J.inArray(newSortField, Zotero.Library.prototype.sortableColumns) == -1) {
        return false;
    }
    if (currentSortField == newSortField && currentSortOrder == newSortOrder) {
        if (newSortOrder == "asc") {
            newSortOrder = "desc";
        } else {
            newSortOrder = "asc";
        }
    }
    if (!newSortField) {
        Zotero.ui.jsNotificationMessage("no order field mapped to column");
        return false;
    }
    Zotero.nav.urlvars.pathVars["order"] = newSortField;
    Zotero.nav.urlvars.pathVars["sort"] = newSortOrder;
    Zotero.nav.pushState();
    library.preferences.setPref("sortField", newSortField);
    library.preferences.setPref("sortOrder", newSortOrder);
    library.preferences.setPref("sort", newSortField);
    library.preferences.setPref("order", newSortOrder);
};

Zotero.ui.widgets.itemContainer = {};

Zotero.ui.widgets.itemContainer.init = function(el) {
    var container = J(el);
    Zotero.ui.eventful.listen("changeItemSorting", Zotero.ui.resortItems);
    Zotero.ui.eventful.listen("citeItems", Zotero.ui.callbacks.citeItems);
    Zotero.ui.eventful.listen("exportItems", Zotero.ui.callbacks.exportItems);
    container.on("click", "#item-details-div .itemTypeSelectButton", function() {
        Z.debug("itemTypeSelectButton clicked", 3);
        var itemType = J("#itemType").val();
        Zotero.nav.urlvars.pathVars["itemType"] = itemType;
        Zotero.nav.pushState();
        return false;
    });
    container.on("change", "#item-details-div .itemDetailForm #itemTypeSelect", function() {
        Z.debug("itemTypeSelect changed", 3);
        var itemType = J(this).val();
        Zotero.nav.urlvars.pathVars["itemType"] = itemType;
        Zotero.nav.pushState();
    });
};

Zotero.ui.cancelItemEdit = function(e) {
    Zotero.nav.clearUrlVars([ "itemKey", "collectionKey", "tag", "q" ]);
    Zotero.nav.pushState();
};

Zotero.ui.widgets.librarysettingsdialog = {};

Zotero.ui.widgets.librarysettingsdialog.init = function(el) {
    Z.debug("librarysettingsdialog widget init", 3);
    Zotero.ui.eventful.listen("librarySettings", Zotero.ui.widgets.librarysettingsdialog.show, {
        widgetEl: el
    });
};

Zotero.ui.widgets.librarysettingsdialog.show = function(e) {
    Z.debug("librarysettingsdialog.show", 3);
    var triggeringEl = J(e.triggeringElement);
    var widgetEl = J(e.data["widgetEl"]).empty();
    widgetEl.html(J("#librarysettingsdialogTemplate").render({
        columnFields: Zotero.Library.prototype.displayableColumns
    }, {
        fieldMap: Zotero.localizations.fieldMap,
        topString: "Top String"
    }));
    var dialogEl = widgetEl.find(".library-settings-dialog");
    dialogEl.find(".display-column-field-title").prop("checked", true).prop("disabled", true);
    var library = Zotero.ui.getEventLibrary(e);
    var listDisplayedFields = library.preferences.getPref("listDisplayedFields");
    var itemsPerPage = library.preferences.getPref("itemsPerPage");
    J.each(listDisplayedFields, function(index, value) {
        var classstring = ".display-column-field-" + value;
        dialogEl.find(classstring).prop("checked", true);
    });
    J("#items-per-page").val(itemsPerPage);
    var submitFunction = J.proxy(function() {
        var showFields = [];
        dialogEl.find(".library-settings-form").find("input:checked").each(function() {
            showFields.push(J(this).val());
        });
        var itemsPerPage = parseInt(dialogEl.find("#items-per-page").val(), 10);
        library.preferences.setPref("listDisplayedFields", showFields);
        library.preferences.setPref("itemsPerPage", itemsPerPage);
        library.preferences.persist();
        Zotero.preferences.setPref("listDisplayedFields", showFields);
        Zotero.preferences.setPref("itemsPerPage", itemsPerPage);
        Zotero.preferences.persist();
        Zotero.ui.eventful.trigger("displayedItemsChanged");
        Zotero.ui.closeDialog(dialogEl);
    }, this);
    dialogEl.find(".saveButton").on("click", submitFunction);
    Zotero.ui.dialog(dialogEl, {});
};

Zotero.ui.widgets.newItem = {};

Zotero.ui.widgets.newItem.init = function(el) {
    Z.debug("newItem eventfulwidget init", 3);
    var widgetEl = J(el);
    Zotero.ui.eventful.listen("newItem", Zotero.ui.widgets.newItem.freshitemcallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("itemTypeChanged", Zotero.ui.widgets.newItem.changeItemType, {
        widgetEl: el
    });
    widgetEl.on("change", "select.itemType", function(e) {
        Zotero.ui.eventful.trigger("itemTypeChanged", {
            triggeringElement: el
        });
    });
};

Zotero.ui.widgets.newItem.freshitemcallback = function(e) {
    Z.debug("Zotero eventful new item", 3);
    var widgetEl = e.data.widgetEl;
    var el = widgetEl;
    var triggeringEl = J(e.triggeringElement);
    var itemType = triggeringEl.data("itemtype");
    var newItem = new Zotero.Item;
    var d = newItem.initEmpty(itemType);
    d.done(J.proxy(function(item) {
        Zotero.ui.unassociatedItemForm(widgetEl, item);
    }, this));
    d.fail(function(jqxhr, textStatus, errorThrown) {
        Zotero.ui.jsNotificationMessage("Error loading item template", "error");
    });
    return;
};

Zotero.ui.unassociatedItemForm = function(el, item) {
    Z.debug("Zotero.ui.unassociatedItem", 3);
    Z.debug(item, 3);
    var container = J(el);
    var itemTypes = [];
    J.each(Zotero.Item.prototype.typeMap, function(key, val) {
        itemTypes.push(key);
    });
    itemTypes.sort();
    Z.debug(itemTypes);
    var d = Zotero.Item.prototype.getCreatorTypes(item.itemType);
    d.done(J.proxy(function(itemCreatorTypes) {
        container.empty();
        if (item.itemType == "note") {
            var parentKey = Zotero.nav.getUrlVar("parentKey");
            if (parentKey) {
                item.parentKey = parentKey;
            }
            container.append(J("#editnoteformTemplate").render({
                item: item,
                itemKey: item.itemKey
            }));
            Zotero.ui.init.rte("default");
        } else {
            container.append(J("#itemformTemplate").render({
                item: item,
                itemKey: item.itemKey,
                creatorTypes: itemCreatorTypes,
                itemTypes: itemTypes,
                citable: true,
                saveable: false
            }));
            if (item.apiObj.tags.length === 0) {
                Zotero.ui.widgets.item.addTag(container, false);
            }
            Zotero.ui.init.creatorFieldButtons();
            Zotero.ui.init.editButton();
        }
        container.find(".directciteitembutton").bind("click", J.proxy(function(e) {
            Zotero.ui.updateItemFromForm(item, container.find("form"));
            Zotero.ui.eventful.trigger("citeItems", {
                zoteroItems: [ item ]
            });
        }, this));
        container.on("click", "button.switch-two-field-creator-link", Zotero.ui.callbacks.switchTwoFieldCreators);
        container.on("click", "button.switch-single-field-creator-link", Zotero.ui.callbacks.switchSingleFieldCreator);
        container.on("click", "button.remove-creator-link", Zotero.ui.removeCreator);
        container.on("click", "button.add-creator-link", Zotero.ui.addCreator);
        Z.debug("Setting newitem data on container");
        Z.debug(item);
        Z.debug(container);
        container.data("item", item);
        Zotero.ui.loadFormData(container);
        Zotero.ui.createOnActivePage(container);
    }, this));
};

Zotero.ui.widgets.newItem.changeItemType = function(e) {
    var widgetEl = Zotero.ui.parentWidgetEl(e);
    Z.debug(widgetEl.length);
    var itemType = widgetEl.find("select.itemType").val();
    Z.debug("newItemType:" + itemType);
    var oldItem = widgetEl.data("item");
    Zotero.ui.updateItemFromForm(oldItem, widgetEl.find("form"));
    var newItem = new Zotero.Item;
    var d = newItem.initEmpty(itemType);
    d.done(J.proxy(function(item) {
        Zotero.ui.translateItemType(oldItem, item);
        Zotero.ui.unassociatedItemForm(widgetEl, item);
    }, this));
    d.fail(function(jqxhr, textStatus, errorThrown) {
        Zotero.ui.jsNotificationMessage("Error loading item template", "error");
    });
    return;
};

Zotero.ui.translateItemType = function(firstItem, newItem) {
    Z.debug("Zotero.ui.translateItemType");
    J.each(Zotero.Item.prototype.fieldMap, function(field, val) {
        if (field != "itemType" && firstItem.apiObj.hasOwnProperty(field) && newItem.apiObj.hasOwnProperty(field)) {
            Z.debug("transferring value for " + field + ": " + firstItem.get(field));
            newItem.set(field, firstItem.get(field));
        }
    });
};

Zotero.ui.widgets.syncedItems = {};

Zotero.ui.widgets.syncedItems.init = function(el) {
    Z.debug("syncedItems widget init", 3);
    Zotero.ui.eventful.listen("localItemsChanged", Zotero.ui.widgets.syncedItems.syncItemsCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("remoteItemsRequested", Zotero.ui.widgets.syncedItems.syncItemsCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("syncLibrary", Zotero.ui.widgets.syncedItems.syncItemsCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("displayedItemsChanged", Zotero.ui.widgets.syncedItems.updateDisplayedItems, {
        widgetEl: el
    });
    Zotero.ui.eventful.trigger("remoteItemsRequested");
    var container = J(el);
    container.on("click", ".field-table-header", Zotero.ui.callbacks.resortItemsLocal);
};

Zotero.ui.widgets.syncedItems.syncItemsCallback = function(event) {
    Zotero.debug("Zotero eventful syncItemsCallback");
    var widgetEl = event.data.widgetEl;
    var el = widgetEl;
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(el);
    if (library.items.loaded && !library.items.synced) {
        Z.debug("items loaded but not synced - loading updated", 3);
        var syncD = library.loadUpdatedItems();
        syncD.done(J.proxy(function() {
            Zotero.nav.doneLoading(el);
            Zotero.ui.eventful.trigger("libraryItemsUpdated");
        }, this));
        return;
    } else if (library.items.loaded) {
        return;
    }
    Z.debug("Syncing items for first time, this may take a while.");
    var d = library.loadUpdatedItems();
    d.done(J.proxy(function() {
        Zotero.nav.doneLoading(el);
        jel.data("loaded", true);
        Zotero.ui.eventful.trigger("libraryItemsUpdated");
        Zotero.nav.doneLoading(el);
    }, this));
    d.fail(J.proxy(function(jqxhr, textStatus, errorThrown) {
        var elementMessage = Zotero.ui.ajaxErrorMessage(jqxhr);
        jel.html("<p>" + elementMessage + "</p>");
    }));
    return;
};

Zotero.ui.widgets.syncedItems.updateDisplayedItems = function(event) {
    Zotero.ui.displayItemsFull(el, newConfig, loadedItems);
};

Zotero.ui.widgets.tags = {};

Zotero.ui.widgets.tags.init = function(el) {
    Zotero.ui.eventful.listen("tagsDirty", Zotero.ui.widgets.tags.syncTagsCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("cachedDataLoaded", Zotero.ui.widgets.tags.syncTagsCallback, {
        widgetEl: el
    });
    Zotero.ui.eventful.listen("libraryTagsUpdated selectedTagsChanged", Zotero.ui.widgets.tags.rerenderTags, {
        widgetEl: el
    });
    var container = J(el);
    container.on("click", "#show-all-tags", Zotero.ui.showAllTags);
    container.on("click", "#show-more-tags-link", Zotero.ui.showMoreTags);
    container.on("click", "#show-fewer-tags-link", Zotero.ui.showFewerTags);
    container.on("keyup", "#tag-filter-input", Zotero.ui.callbacks.filterTags);
    container.on("click", "#show-all-tags", function(e) {
        var show = J(this).prop("checked") ? true : false;
        Z.debug("showAllTags is " + show, 4);
        Zotero.utils.setUserPref("library_showAllTags", show);
        Zotero.callbacks.loadTags(J("#tags-list-div"));
    });
    container.on("click", "#show-more-tags-link", function(e) {
        e.preventDefault();
        var jel = J(this).closest("#tags-list-div");
        jel.data("showmore", true);
        Zotero.callbacks.loadTags(jel);
    });
    container.on("click", "#show-less-tags-link", function(e) {
        e.preventDefault();
        var jel = J(this).closest("#tags-list-div");
        jel.data("showmore", false);
        Zotero.callbacks.loadTags(jel);
    });
    container.on("keyup", "#tag-filter-input", function(e) {
        Z.debug(J("#tag-filter-input").val(), 3);
        Z.debug("value:" + J("#tag-filter-input").val(), 4);
        var library = Zotero.ui.getAssociatedLibrary(J("#tag-filter-input").closest(".ajaxload"));
        var libraryTagsPlainList = library.tags.plainList;
        var matchingTagStrings = Zotero.utils.matchAnyAutocomplete(J("#tag-filter-input").val(), libraryTagsPlainList);
        Zotero.ui.displayTagsFiltered(J("#tags-list-div"), library.tags, matchingTagStrings, []);
        Z.debug(matchingTagStrings, 4);
    });
};

Zotero.ui.widgets.tags.syncTagsCallback = function(event) {
    Z.debug("Zotero eventful syncTagsCallback", 1);
    var widgetEl = event.data.widgetEl;
    var el = widgetEl;
    var checkCached = event.data.checkCached;
    if (checkCached !== false) {
        checkCached = true;
    }
    Zotero.nav.flagLoading(el);
    var jel = J(el);
    var library = Zotero.ui.getAssociatedLibrary(el);
    if (checkCached === false) {
        library.tags.clear();
    }
    if (library.tags.loaded && !library.tags.synced) {
        Z.debug("tags loaded but not synced - loading updated", 3);
        var syncD = library.loadUpdatedTags();
        syncD.done(J.proxy(function() {
            Zotero.nav.doneLoading(el);
            Zotero.ui.eventful.trigger("libraryTagsUpdated");
        }, this));
        syncD.fail(J.proxy(function() {
            Zotero.ui.eventful.trigger("libraryTagsUpdated");
            Zotero.nav.doneLoading(el);
        }, this));
        return;
    } else if (library.tags.loaded) {
        Zotero.ui.eventful.trigger("libraryTagsUpdated");
        Zotero.nav.doneLoading(el);
        return;
    }
    Zotero.ui.showSpinner(J(el).find("div.loading"));
    var d = library.loadAllTags({}, checkCached);
    d.done(J.proxy(function(tags) {
        Z.debug("finished loadAllTags", 3);
        library.tags.tagsVersion = library.tags.syncState.earliestVersion;
        if (library.tags.syncState.earliestVersion == library.tags.syncState.latestVersion) {
            library.tags.synced = true;
        } else {}
        J(el).find("div.loading").empty();
        Z.debug(tags, 5);
        library.tags.loaded = true;
        J(el).children(".loading").empty();
        Zotero.nav.doneLoading(el);
        Zotero.ui.eventful.trigger("libraryTagsUpdated");
    }, this));
    d.fail(J.proxy(function(jqxhr, textStatus, errorThrown) {
        var elementMessage = Zotero.ui.ajaxErrorMessage(jqxhr);
        jel.html("<p>" + elementMessage + "</p>");
    }));
    return;
};

Zotero.ui.widgets.tags.rerenderTags = function(event) {
    Zotero.debug("Zotero eventful rerenderTags");
    var widgetEl = event.data.widgetEl;
    var el = widgetEl;
    var jel = J(el);
    var selectedTags = Zotero.nav.getUrlVar("tag");
    if (!J.isArray(selectedTags)) {
        if (selectedTags) {
            selectedTags = [ selectedTags ];
        } else {
            selectedTags = [];
        }
    }
    jel.children(".loading").empty();
    var library = Zotero.ui.getAssociatedLibrary(el);
    var plainList = library.tags.plainTagsList(library.tags.tagsArray);
    Zotero.ui.displayTagsFiltered(el, library.tags, plainList, selectedTags);
};

Zotero.ui.displayTagsFiltered = function(el, libtags, matchedTagStrings, selectedTagStrings) {
    Zotero.debug("Zotero.ui.displayTagsFiltered");
    Z.debug(selectedTagStrings, 4);
    var curPreString = J("#tag-filter-input").val();
    var jel = J(el);
    var showMore = jel.data("showmore");
    if (!showMore) {
        showMore = false;
    }
    var filteredTags = [];
    var selectedTags = [];
    J.each(matchedTagStrings, function(index, matchedString) {
        if (libtags.tagObjects[matchedString] && J.inArray(matchedString, selectedTagStrings) == -1) {
            filteredTags.push(libtags.tagObjects[matchedString]);
        }
    });
    J.each(selectedTagStrings, function(index, selectedString) {
        if (libtags.tagObjects[selectedString]) {
            selectedTags.push(libtags.tagObjects[selectedString]);
        }
    });
    var passTags;
    if (!showMore) {
        passTags = filteredTags.slice(0, 25);
        J("#show-more-tags-link").show();
        J("#show-fewer-tags-link").hide();
    } else {
        passTags = filteredTags;
        J("#show-more-tags-link").hide();
        J("#show-fewer-tags-link").show();
    }
    var tagListEl = J("#tags-list").empty();
    J("#selected-tags-list").replaceWith(J("#tagunorderedlistTemplate").render({
        tags: selectedTags,
        id: "selected-tags-list"
    }));
    J("#tags-list").replaceWith(J("#tagunorderedlistTemplate").render({
        tags: passTags,
        id: "tags-list"
    }));
};

Zotero.ui.showAllTags = function(e) {
    var show = J(this).prop("checked") ? true : false;
    Z.debug("showAllTags is " + show, 4);
    Zotero.utils.setUserPref("library_showAllTags", show);
    Zotero.callbacks.loadTags(J("#tags-list-div"));
};

Zotero.ui.showMoreTags = function(e) {
    e.preventDefault();
    var jel = J(this).closest("#tags-list-div");
    jel.data("showmore", true);
    Zotero.callbacks.loadTags(jel);
};

Zotero.ui.showFewerTags = function(e) {
    e.preventDefault();
    var jel = J(this).closest("#tags-list-div");
    jel.data("showmore", false);
    Zotero.callbacks.loadTags(jel);
};

Zotero.ui.bindTagLinks = function() {
    Z.debug("Zotero.ui.bindTagLinks", 3);
    J("#tags-list-div, #items-pane").on("click", "a.tag-link", function(e) {
        e.preventDefault();
        J("#tag-filter-input").val("");
        Z.debug("tag-link clicked", 4);
        var tagtitle = J(this).attr("data-tagtitle");
        Zotero.nav.toggleTag(tagtitle);
        Z.debug("click " + tagtitle, 4);
        Zotero.nav.clearUrlVars([ "tag", "collectionKey" ]);
        Zotero.nav.pushState();
    });
};

Zotero.ui.callbacks.filterTags = function(e) {
    Z.debug("Zotero.ui.callbacks.filterTags");
    var library = Zotero.ui.getAssociatedLibrary(J("#tag-filter-input").closest(".ajaxload"));
    var libraryTagsPlainList = library.tags.plainList;
    var matchingTagStrings = Zotero.utils.matchAnyAutocomplete(J("#tag-filter-input").val(), libraryTagsPlainList);
    Zotero.ui.displayTagsFiltered(J("#tags-list-div"), library.tags, matchingTagStrings, []);
    Z.debug(matchingTagStrings, 4);
};

Zotero.ui.widgets.updateCollectionDialog = {};

Zotero.ui.widgets.updateCollectionDialog.init = function(el) {
    Z.debug("updatecollectionsdialog widget init", 3);
    Zotero.ui.eventful.listen("updateCollection", Zotero.ui.widgets.updateCollectionDialog.show, {
        widgetEl: el
    });
};

Zotero.ui.widgets.updateCollectionDialog.show = function(e) {
    Z.debug("updateCollectionDialog.show", 1);
    var triggeringEl = J(e.triggeringElement);
    var library = Zotero.ui.getAssociatedLibrary(triggeringEl);
    var ncollections = library.collections.nestedOrderingArray();
    var widgetEl = J(e.data["widgetEl"]).empty();
    widgetEl.html(J("#updatecollectiondialogTemplate").render({
        ncollections: ncollections
    }));
    var dialogEl = widgetEl.find(".update-collection-dialog");
    var currentCollectionKey = Zotero.nav.getUrlVar("collectionKey");
    var currentCollection = library.collections.getCollection(currentCollectionKey);
    var currentParentCollectionKey = currentCollection.parentCollectionKey;
    dialogEl.find(".update-collection-parent-select").val(currentParentCollectionKey);
    dialogEl.find(".updated-collection-title-input").val(currentCollection.get("title"));
    var saveFunction = J.proxy(function() {
        var newCollectionTitle = dialogEl.find("input.updated-collection-title-input").val() || "Untitled";
        var newParentCollectionKey = dialogEl.find(".update-collection-parent-select").val();
        var collection = currentCollection;
        if (!collection) {
            Zotero.ui.jsNotificationMessage("Selected collection not found", "error");
            return false;
        }
        var d = collection.update(newCollectionTitle, newParentCollectionKey);
        d.done(J.proxy(function() {
            Zotero.ui.jsNotificationMessage("Collection Saved", "confirm");
            library.collections.dirty = true;
            Zotero.nav.pushState(true);
            Zotero.ui.closeDialog(dialogEl);
        }, this));
        Zotero.ui.closeDialog(dialogEl);
    }, this);
    dialogEl.find(".updateButton").on("click", saveFunction);
    Zotero.ui.dialog(dialogEl, {});
    dialogEl.find(".updated-collection-title-input").select();
    return false;
};

Zotero.ui.widgets.uploadDialog = {};

Zotero.ui.widgets.uploadDialog.init = function(el) {
    Z.debug("uploaddialog widget init", 3);
    var library = Zotero.ui.getAssociatedLibrary(el);
    Zotero.ui.eventful.listen("uploadAttachment", Zotero.ui.widgets.uploadDialog.show, {
        widgetEl: el,
        library: library
    });
};

Zotero.ui.widgets.uploadDialog.show = function(e) {
    Z.debug("uploadDialog.show", 3);
    var triggeringEl = J(e.triggeringElement);
    var library = Zotero.ui.getEventLibrary(e);
    var widgetEl = J(e.data["widgetEl"]).empty();
    widgetEl.html(J("#attachmentuploadTemplate").render({}));
    var dialogEl = widgetEl.find(".upload-attachment-dialog");
    var uploadFunction = J.proxy(function() {
        Z.debug("uploadFunction", 3);
        var fileInfo = dialogEl.find("#attachmentuploadfileinfo").data("fileInfo");
        var file = dialogEl.find("#attachmentuploadfileinfo").data("file");
        var specifiedTitle = dialogEl.find("#upload-file-title-input").val();
        var progressCallback = function(e) {
            Z.debug("fullUpload.upload.onprogress");
            var percentLoaded = Math.round(e.loaded / e.total * 100);
            Z.debug("Upload progress event:" + e.loaded + " / " + e.total + " : " + percentLoaded + "%");
            J("#uploadprogressmeter").val(percentLoaded);
        };
        var uploadSuccess = function() {
            Z.debug("uploadSuccess", 3);
            Zotero.ui.closeDialog(J("#upload-attachment-dialog"));
            Zotero.ui.eventful.trigger("uploadSuccessful");
            Zotero.nav.pushState(true);
        };
        var uploadFailure = function(failure) {
            Z.debug("Upload failed", 3);
            Z.debug(failure, 3);
            Zotero.ui.jsNotificationMessage("There was a problem uploading your file.", "error");
            switch (failure.code) {
              case 400:
                Zotero.ui.jsNotificationMessage("Bad Input. 400", "error");
                break;
              case 403:
                Zotero.ui.jsNotificationMessage("You do not have permission to edit files", "error");
                break;
              case 409:
                Zotero.ui.jsNotificationMessage("The library is currently locked. Please try again in a few minutes.", "error");
                break;
              case 412:
                Zotero.ui.jsNotificationMessage("File conflict. Remote file has changed", "error");
                break;
              case 413:
                Zotero.ui.jsNotificationMessage("Requested upload would exceed storage quota.", "error");
                break;
              case 428:
                Zotero.ui.jsNotificationMessage("Precondition required error", "error");
                break;
              case 429:
                Zotero.ui.jsNotificationMessage("Too many uploads pending. Please try again in a few minutes", "error");
                break;
              default:
                Zotero.ui.jsNotificationMessage("Unknown error uploading file. " + failure.code, "error");
            }
            Zotero.ui.closeDialog(J("#upload-attachment-dialog"));
        };
        Zotero.ui.showSpinner(J("#fileuploadspinner"));
        var itemKey = Zotero.nav.getUrlVar("itemKey");
        var item = library.items.getItem(itemKey);
        if (!item.get("parentItem")) {
            Z.debug("no parentItem", 3);
            var childItem = new Zotero.Item;
            childItem.associateWithLibrary(library);
            var templateItemDeferred = childItem.initEmpty("attachment", "imported_file");
            templateItemDeferred.done(J.proxy(function(childItem) {
                Z.debug("templateItemDeferred callback");
                childItem.set("title", specifiedTitle);
                var uploadChildD = item.uploadChildAttachment(childItem, fileInfo, file, progressCallback);
                uploadChildD.done(uploadSuccess).fail(uploadFailure);
            }, this));
        } else if (item.get("itemType") == "attachment" && item.get("linkMode") == "imported_file") {
            Z.debug("imported_file attachment", 3);
            var uploadD = item.uploadFile(fileInfo, file, progressCallback);
            uploadD.done(uploadSuccess).fail(uploadFailure);
        }
    }, this);
    dialogEl.find(".uploadButton").on("click", uploadFunction);
    Zotero.ui.dialog(dialogEl, {});
    var handleFiles = function(files) {
        Z.debug("attachmentUpload handleFiles", 3);
        if (typeof files == "undefined" || files.length === 0) {
            return false;
        }
        var file = files[0];
        J("#attachmentuploadfileinfo").data("file", file);
        var fileinfo = Zotero.file.getFileInfo(file, function(fileInfo) {
            J("#attachmentuploadfileinfo").data("fileInfo", fileInfo);
            J("#upload-file-title-input").val(fileInfo.filename);
            J("#attachmentuploadfileinfo .uploadfilesize").html(fileInfo.filesize);
            J("#attachmentuploadfileinfo .uploadfiletype").html(fileInfo.contentType);
            J("#droppedfilename").html(fileInfo.filename);
        });
        return;
    };
    dialogEl.find("#fileuploaddroptarget").on("dragenter dragover", function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    dialogEl.find("#fileuploaddroptarget").on("drop", function(je) {
        Z.debug("fileuploaddroptarget drop callback", 3);
        je.stopPropagation();
        je.preventDefault();
        J("#fileuploadinput").val("");
        var e = je.originalEvent;
        var dt = e.dataTransfer;
        var files = dt.files;
        handleFiles(files);
    });
    dialogEl.find("#fileuploadinput").on("change", function(je) {
        Z.debug("fileuploaddroptarget callback 1");
        je.stopPropagation();
        je.preventDefault();
        var files = J(this).get(0).files;
        handleFiles(files);
    });
    return false;
};

Zotero.url.itemHref = function(item) {
    var href = "";
    var library = item.owningLibrary;
    href += library.libraryBaseWebsiteUrl + "/itemKey/" + item.itemKey;
    return href;
};

Zotero.url.attachmentDownloadLink = function(item) {
    var linkString = "";
    var enctype, enc, filesize, filesizeString;
    var downloadHref = "";
    if (item.links["enclosure"]) {
        if (Zotero.config.directDownloads) {
            downloadHref = Zotero.url.apiDownloadUrl(item);
        } else {
            downloadHref = Zotero.url.wwwDownloadUrl(item);
        }
        var tail = item.links["enclosure"]["href"].substr(-4, 4);
        if (tail == "view") {
            linkString += '<a href="' + downloadHref + '">' + "View Snapshot</a>";
        } else {
            enctype = Zotero.utils.translateMimeType(item.links["enclosure"].type);
            enc = item.links["enclosure"];
            filesize = parseInt(enc["length"], 10);
            filesizeString = "" + filesize + " B";
            if (filesize > 1073741824) {
                filesizeString = "" + (filesize / 1073741824).toFixed(1) + " GB";
            } else if (filesize > 1048576) {
                filesizeString = "" + (filesize / 1048576).toFixed(1) + " MB";
            } else if (filesize > 1024) {
                filesizeString = "" + (filesize / 1024).toFixed(1) + " KB";
            }
            Z.debug(enctype);
            linkString += '<a href="' + downloadHref + '">';
            if (enctype == "undefined" || enctype === "" || typeof enctype == "undefined") {
                linkString += filesizeString + "</a>";
            } else {
                linkString += enctype + ", " + filesizeString + "</a>";
            }
            return linkString;
        }
    }
    return linkString;
};

Zotero.url.attachmentDownloadUrl = function(item) {
    var retString = "";
    if (item.links["enclosure"]) {
        if (Zotero.config.directDownloads) {
            return Zotero.url.apiDownloadUrl(item);
        } else {
            return Zotero.url.wwwDownloadUrl(item);
        }
    } else if (item.linkMode == 2 || item.linkMode == 3) {
        if (item.apiObj["url"]) {
            retString = item.apiObj["url"];
        }
    }
    return retString;
};

Zotero.url.wwwDownloadUrl = function(item) {
    var urlString = "";
    if (item.links["enclosure"]) {
        if (Zotero.config.proxyDownloads) {
            return Zotero.config.baseDownloadUrl + "?itemkey=" + item.itemKey;
        }
        if (Zotero.config.directDownloads) {
            return Zotero.url.apiDownloadUrl(item);
        }
        urlString = Zotero.config.baseWebsiteUrl + Zotero.config.nonparsedBaseUrl + "/" + item.itemKey + "/file";
        var tail = item.links["enclosure"]["href"].substr(-4, 4);
        if (tail == "view") {
            urlString += "/view";
        }
    } else if (item.linkMode == 2 || item.linkMode == 3) {
        if (item.apiObj["url"]) {
            urlString = item.apiObj["url"];
        }
    }
    return urlString;
};

Zotero.url.apiDownloadUrl = function(item) {
    var retString = "";
    if (item.links["enclosure"]) {
        retString = item.links["enclosure"]["href"];
    } else if (item.linkMode == 2 || item.linkMode == 3) {
        if (item.apiObj["url"]) {
            retString = item.apiObj["url"];
        }
    }
    return retString;
};

Zotero.url.attachmentFileDetails = function(item) {
    if (!item.links["enclosure"]) return "";
    var enctype = Zotero.utils.translateMimeType(item.links["enclosure"].type);
    var enc = item.links["enclosure"];
    var filesizeString = "";
    if (enc["length"]) {
        var filesize = parseInt(enc["length"], 10);
        filesizeString = "" + filesize + " B";
        if (filesize > 1073741824) {
            filesizeString = "" + (filesize / 1073741824).toFixed(1) + " GB";
        } else if (filesize > 1048576) {
            filesizeString = "" + (filesize / 1048576).toFixed(1) + " MB";
        } else if (filesize > 1024) {
            filesizeString = "" + (filesize / 1024).toFixed(1) + " KB";
        }
        if (enctype == "undefined" || enctype === "" || typeof enctype == "undefined") {
            return "(" + filesizeString + ")";
        } else {
            return "(" + enctype + ", " + filesizeString + ")";
        }
    } else {
        return "(" + enctype + ")";
    }
};

Zotero.url.exportUrls = function(config) {
    Z.debug("Zotero.url.exportUrls", 3);
    var exportUrls = {};
    var exportConfig = {};
    J.each(Zotero.config.exportFormats, function(index, format) {
        exportConfig = J.extend(config, {
            format: format
        });
        exportUrls[format] = Zotero.ajax.apiRequestUrl(exportConfig) + Zotero.ajax.apiQueryString({
            format: format,
            limit: "25"
        });
    });
    Z.debug(exportUrls);
    return exportUrls;
};

Zotero.url.snapshotViewLink = function(item) {
    return Zotero.ajax.apiRequestUrl({
        target: "item",
        targetModifier: "viewsnapshot",
        libraryType: item.owningLibrary.libraryType,
        libraryID: item.owningLibrary.libraryID,
        itemKey: item.itemKey
    });
};

Zotero.url.requestReadApiKeyUrl = function(libraryType, libraryID, redirect) {
    var apiKeyBase = Zotero.config.baseWebsiteUrl + "/settings/keys/new";
    apiKeyBase.replace("http", "https");
    var qparams = {
        name: "Private Feed"
    };
    if (libraryType == "group") {
        qparams["library_access"] = 0;
        qparams["group_" + libraryID] = "read";
        qparams["redirect"] = redirect;
    } else if (libraryType == "user") {
        qparams["library_access"] = 1;
        qparams["notes_access"] = 1;
        qparams["redirect"] = redirect;
    }
    queryParamsArray = [];
    J.each(qparams, function(index, value) {
        queryParamsArray.push(encodeURIComponent(index) + "=" + encodeURIComponent(value));
    });
    queryString = "?" + queryParamsArray.join("&");
    return apiKeyBase + queryString;
};

Zotero.url.groupViewUrl = function(group) {
    if (group.get("type") == "Private") {
        return Zotero.config.baseWebsiteUrl + "/groups/" + group.get("groupID");
    } else {
        return Zotero.config.baseWebsiteUrl + "/groups/" + Zotero.utils.slugify(group.get("name"));
    }
};

Zotero.url.groupLibraryUrl = function(group) {
    if (group.get("type") == "Private") {
        return Zotero.config.baseWebsiteUrl + "/groups/" + group.get("groupID") + "/items";
    } else {
        return Zotero.config.baseWebsiteUrl + "/groups/" + Zotero.utils.slugify(group.get("name")) + "/items";
    }
};

Zotero.url.groupSettingsUrl = function(group) {
    return Zotero.config.baseWebsiteUrl + "/groups/" + group.get("groupID") + "/settings";
};

Zotero.url.groupMemberSettingsUrl = function(group) {
    return Zotero.config.baseWebsiteUrl + "/groups/" + group.get("groupID") + "/settings/members";
};

Zotero.url.groupLibrarySettingsUrl = function(group) {
    return Zotero.config.baseWebsiteUrl + "/groups/" + group.get("groupID") + "/settings/library";
};

Zotero.callbacks.loadFullLibrary = function(el) {
    Zotero.debug("Zotero.callbacks.loadFullLibrary", 3);
    var library = Zotero.ui.getAssociatedLibrary(el);
    var displayParams = {};
    var selectedTags = Zotero.nav.getUrlVar("tag");
    if (!J.isArray(selectedTags)) {
        if (selectedTags) {
            selectedTags = [ selectedTags ];
        } else {
            selectedTags = [];
        }
    }
    if (J("#library").hasClass("loaded")) {
        Zotero.callbacks.chooseItemPane(J("#items-pane"));
        Zotero.ui.highlightCurrentCollection();
        Zotero.ui.nestHideCollectionTree(J("#collection-list-container"));
        var plainList = library.tags.plainTagsList(library.tags.tagsArray);
        Zotero.ui.displayTagsFiltered(J("#tags-list-div"), library.tags, plainList, selectedTags);
        Zotero.ui.displayItemOrTemplate(library);
        Z.debug("Building new items list to display", 3);
        displayParams = J.extend({}, Zotero.config.defaultApiArgs, Zotero.nav.getUrlVars());
        Z.debug(displayParams);
        library.buildItemDisplayView(displayParams);
    } else {
        Zotero.offline.initializeOffline();
    }
};

Zotero.ui.init.offlineLibrary = function() {
    Z.debug("Zotero.ui.init.offlineLibrary", 3);
    Zotero.ui.init.tags();
    Zotero.ui.init.collections();
    Zotero.ui.init.items();
    J.subscribe("loadItemsFromKeysParallelDone", function() {
        J.publish("displayedItemsUpdated");
    });
    J.subscribe("displayedItemsUpdated", function() {
        Z.debug("displayedItemsUpdated triggered", 3);
        var library = Zotero.ui.getAssociatedLibrary(J("#library"));
        Zotero.ui.displayItemsFullLocal(J("#library-items-div"), {}, library);
    });
    J.subscribe("collectionsUpdated", function() {
        Z.debug("collectionsUpdated triggered", 3);
        var library = Zotero.ui.getAssociatedLibrary(J("#library"));
        Zotero.ui.renderCollectionList(J("#collection-list-container"), library.collections.collectionsArray);
    });
    J.subscribe("tagsUpdated", function() {
        Z.debug("tagsUpdated triggered", 3);
        var library = Zotero.ui.getAssociatedLibrary(J("#library"));
        var plainList = library.tags.plainTagsList(library.tags.tagsArray);
        var matchedList = Zotero.utils.prependAutocomplete("", plainList);
        Zotero.ui.displayTagsFiltered(J("#tags-list-container"), library.tags, matchedList, selectedTags);
    });
    J("#makeAvailableOfflineLink").bind("click", J.proxy(function(e) {
        e.preventDefault();
        var library = Zotero.ui.getAssociatedLibrary(J("#library"));
        var collectionKey = Zotero.nav.getUrlVar("collectionKey");
        var itemKeys;
        if (collectionKey) {
            library.saveCollectionFilesOffline(collectionKey);
        } else {
            library.saveFileSetOffline(library.itemKeys);
        }
    }, this));
};

Zotero.ui.displayItemsFullLocal = function(el, config, library) {
    Z.debug("Zotero.ui.displayItemsFullLocal", 3);
    Z.debug(config, 4);
    var jel = J(el);
    var filledConfig = J.extend({}, Zotero.config.defaultApiArgs, config);
    var titleParts = [ "", "", "" ];
    var displayFields = library.preferences.getPref("listDisplayedFields");
    if (library.libraryType != "group") {
        displayFields = J.grep(displayFields, function(el, ind) {
            return J.inArray(el, Zotero.Library.prototype.groupOnlyColumns) == -1;
        });
    }
    var editmode = Zotero.config.librarySettings.allowEdit ? true : false;
    var itemsTableData = {
        titleParts: titleParts,
        displayFields: displayFields,
        items: library.items.displayItemsArray,
        editmode: editmode,
        order: filledConfig["order"],
        sort: filledConfig["sort"],
        library: library
    };
    jel.empty();
    Zotero.ui.insertItemsTable(jel, itemsTableData);
    if (Zotero.config.mobile) {
        Zotero.ui.createOnActivePage(el);
        return;
    }
    Zotero.ui.updateDisabledControlButtons();
    Zotero.ui.libraryBreadcrumbs();
    Zotero.ui.createOnActivePage(el);
};

Zotero.ui.showChildrenLocal = function(el, itemKey) {
    Z.debug("Zotero.ui.showChildrenLocal", 3);
    var library = Zotero.ui.getAssociatedLibrary(J(el).closest("div.ajaxload"));
    var item = library.items.getItem(itemKey);
    var attachmentsDiv = J(el).find(".item-attachments-div");
    Zotero.ui.showSpinner(attachmentsDiv);
    var childItemKeys = item.childItemKeys;
    var childItems = library.items.getItems(childItemKeys);
    J(".item-attachments-div").html(J("#childitemsTemplate").render({
        childItems: childItems
    }));
    Zotero.ui.createOnActivePage(el);
};

Zotero.ui.localDownloadLink = function(item, el) {
    Z.debug("Zotero.ui.localDownloadLink");
    if (item.links && item.links.enclosure) {
        Z.debug("should have local file");
        var d = item.owningLibrary.filestorage.getSavedFileObjectUrl(item.itemKey);
        d.done(function(url) {
            Z.debug("got item's object url - adding to table");
            J("table.item-info-table tbody").append("<tr><th>Local Copy</th><td><a href='" + url + "'>Open</a></td></tr>");
        });
    } else {
        Z.debug("Missing link?");
    }
};

Zotero.ui.displayItemOrTemplate = function(library) {
    if (Zotero.nav.getUrlVar("action") == "newItem") {
        var itemType = Zotero.nav.getUrlVar("itemType");
        if (!itemType) {
            J("#item-details-div").empty();
            J("#item-details-div").html(J("#itemtypeselectTemplate").render({
                itemTypes: Zotero.localizations.typeMap
            }));
            return;
        } else {
            var newItem = new Zotero.Item;
            newItem.libraryType = library.libraryType;
            newItem.libraryID = library.libraryID;
            d = newItem.initEmpty(itemType);
            J("#item-details-div").data("pendingDeferred", d);
            d.done(Zotero.ui.loadNewItemTemplate);
            d.fail(function(jqxhr, textStatus, errorThrown) {
                Zotero.ui.jsNotificationMessage("Error loading item template", "error");
            });
        }
    } else {
        var itemKey = Zotero.nav.getUrlVar("itemKey");
        if (itemKey) {
            var item = library.items.getItem(itemKey);
            if (item) {
                Z.debug("have item locally, loading details into ui", 3);
                if (Zotero.nav.getUrlVar("mode") == "edit") {
                    Zotero.ui.editItemForm(J("#item-details-div"), item);
                } else {
                    Zotero.ui.loadItemDetail(item, J("#item-details-div"));
                    Zotero.ui.showChildrenLocal(J("#item-details-div"), itemKey);
                    Zotero.ui.localDownloadLink(item, J("#item-details-div"));
                }
            }
        }
    }
};

Zotero.offline.initializeOffline = function() {
    Z.debug("Zotero.offline.initializeOffline", 3);
    var libraryDataDeferred = new J.Deferred;
    var cacheConfig = {
        target: "userlibrarydata"
    };
    var userLibraryData = Zotero.cache.load(cacheConfig);
    if (userLibraryData) {
        Z.debug("had cached library data - resolving immediately");
        J("#library").data("loadconfig", userLibraryData.loadconfig);
        libraryDataDeferred.resolve(userLibraryData);
    } else {
        Z.debug("don't have cached library config data - fetching from server");
        J.getJSON("/user/userlibrarydata", J.proxy(function(data, textStatus, jqxhr) {
            Z.debug("got back library config data from server");
            if (data.loggedin === false) {
                window.location = "/user/login";
                return false;
            } else {
                J("#library").data("loadconfig", data.loadconfig);
                userLibraryData = data;
                libraryDataDeferred.resolve(userLibraryData);
            }
        }, this));
    }
    libraryDataDeferred.done(function(userLibraryData) {
        Zotero.debug("Got library data");
        Zotero.debug(userLibraryData);
        Zotero.loadConfig(userLibraryData);
        var library = Zotero.ui.getAssociatedLibrary(J("#library"));
        Zotero.offline.loadAllItems(library);
        Zotero.offline.loadAllCollections(library);
        Zotero.offline.loadAllTags(library);
        Zotero.offline.loadMetaInfo(library);
    });
};

Zotero.offline.loadMetaInfo = function(library) {
    Z.debug("Zotero.offline.loadMetaInfo", 3);
    if (Zotero.Item.prototype.itemTypes) {
        Z.debug("have itemTypes, fetching item templates", 3);
        var itemTypes = Zotero.Item.prototype.itemTypes;
        var type;
        J.each(itemTypes, function(ind, val) {
            type = val.itemType;
            if (type != "attachment") {
                Zotero.Item.prototype.getItemTemplate(type);
            }
            Zotero.Item.prototype.getCreatorTypes(type);
        });
        Zotero.Item.prototype.getItemTemplate("attachment", "imported_file");
        Zotero.Item.prototype.getItemTemplate("attachment", "imported_url");
        Zotero.Item.prototype.getItemTemplate("attachment", "linked_file");
        Zotero.Item.prototype.getItemTemplate("attachment", "linked_url");
    } else {
        Z.debug("Dont yet have itemTypes, can't fetch item templates", 3);
    }
};