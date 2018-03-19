!function (a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");return b(a);
    } : b(a);
}("undefined" != typeof window ? window : this, function (a, b) {
    var c = [],
        d = a.document,
        e = c.slice,
        f = c.concat,
        g = c.push,
        h = c.indexOf,
        i = {},
        j = i.toString,
        k = i.hasOwnProperty,
        l = {},
        m = "",
        n = function (a, b) {
        return new n.fn.init(a, b);
    },
        o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        p = /^-ms-/,
        q = /-([\da-z])/gi,
        r = function (a, b) {
        return b.toUpperCase();
    };n.fn = n.prototype = { jquery: m, constructor: n, selector: "", length: 0, toArray: function () {
            return e.call(this);
        }, get: function (a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this);
        }, pushStack: function (a) {
            var b = n.merge(this.constructor(), a);return b.prevObject = this, b.context = this.context, b;
        }, each: function (a) {
            return n.each(this, a);
        }, map: function (a) {
            return this.pushStack(n.map(this, function (b, c) {
                return a.call(b, c, b);
            }));
        }, slice: function () {
            return this.pushStack(e.apply(this, arguments));
        }, first: function () {
            return this.eq(0);
        }, last: function () {
            return this.eq(-1);
        }, eq: function (a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
        }, end: function () {
            return this.prevObject || this.constructor();
        }, push: g, sort: c.sort, splice: c.splice }, n.extend = n.fn.extend = function () {
        var a,
            b,
            c,
            d,
            e,
            f,
            g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], c = e[d], g !== c && (j && c && (n.isPlainObject(c) || (b = n.isArray(c))) ? (b ? (b = !1, f = a && n.isArray(a) ? a : []) : f = a && n.isPlainObject(a) ? a : {}, g[d] = n.extend(j, f, c)) : void 0 !== c && (g[d] = c));return g;
    }, n.extend({ expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
            throw new Error(a);
        }, noop: function () {}, isFunction: function (a) {
            return "function" === n.type(a);
        }, isArray: Array.isArray || function (a) {
            return "array" === n.type(a);
        }, isWindow: function (a) {
            return null != a && a == a.window;
        }, isNumeric: function (a) {
            var b = a && a.toString();return !n.isArray(a) && b - parseFloat(b) + 1 >= 0;
        }, isEmptyObject: function (a) {
            var b;for (b in a) return !1;return !0;
        }, isPlainObject: function (a) {
            var b;if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;try {
                if (a.constructor && !k.call(a, "constructor") && !k.call(a.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (c) {
                return !1;
            }if (!l.ownFirst) for (b in a) return k.call(a, b);for (b in a);return void 0 === b || k.call(a, b);
        }, type: function (a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? i[j.call(a)] || "object" : typeof a;
        }, globalEval: function (b) {
            b && n.trim(b) && (a.execScript || function (b) {
                a.eval.call(a, b);
            })(b);
        }, camelCase: function (a) {
            return a.replace(p, "ms-").replace(q, r);
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        }, each: function (a, b) {
            var c,
                d = 0;if (s(a)) {
                for (c = a.length; c > d; d++) if (b.call(a[d], d, a[d]) === !1) break;
            } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;return a;
        }, trim: function (a) {
            return null == a ? "" : (a + "").replace(o, "");
        }, makeArray: function (a, b) {
            var c = b || [];return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : g.call(c, a)), c;
        }, inArray: function (a, b, c) {
            var d;if (b) {
                if (h) return h.call(b, a, c);for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c;
            }return -1;
        }, merge: function (a, b) {
            var c = +b.length,
                d = 0,
                e = a.length;while (c > d) a[e++] = b[d++];if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];return a.length = e, a;
        }, grep: function (a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);return e;
        }, map: function (a, b, c) {
            var d,
                e,
                g = 0,
                h = [];if (s(a)) for (d = a.length; d > g; g++) e = b(a[g], g, c), null != e && h.push(e);else for (g in a) e = b(a[g], g, c), null != e && h.push(e);return f.apply([], h);
        }, guid: 1, proxy: function (a, b) {
            var c, d, f;return "string" == typeof b && (f = a[b], b = a, a = f), n.isFunction(a) ? (c = e.call(arguments, 2), d = function () {
                return a.apply(b || this, c.concat(e.call(arguments)));
            }, d.guid = a.guid = a.guid || n.guid++, d) : void 0;
        }, now: function () {
            return +new Date();
        }, support: l }), "function" == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]), n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
        i["[object " + b + "]"] = b.toLowerCase();
    });function s(a) {
        var b = !!a && "length" in a && a.length,
            c = n.type(a);return "function" === c || n.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
    }var t = function (a) {
        var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u = "sizzle" + 1 * new Date(),
            v = a.document,
            w = 0,
            x = 0,
            y = ga(),
            z = ga(),
            A = ga(),
            B = function (a, b) {
            return a === b && (l = !0), 0;
        },
            C = 1 << 31,
            D = {}.hasOwnProperty,
            E = [],
            F = E.pop,
            G = E.push,
            H = E.push,
            I = E.slice,
            J = function (a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;return -1;
        },
            K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            L = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            N = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + L + "*\\]",
            O = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)",
            P = new RegExp(L + "+", "g"),
            Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
            R = new RegExp("^" + L + "*," + L + "*"),
            S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
            T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
            U = new RegExp(O),
            V = new RegExp("^" + M + "$"),
            W = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), TAG: new RegExp("^(" + M + "|[*])"), ATTR: new RegExp("^" + N), PSEUDO: new RegExp("^" + O), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"), bool: new RegExp("^(?:" + K + ")$", "i"), needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i") },
            X = /^(?:input|select|textarea|button)$/i,
            Y = /^h\d$/i,
            Z = /^[^{]+\{\s*\[native \w/,
            $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            _ = /[+~]/,
            aa = /'|\\/g,
            ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
            ca = function (a, b, c) {
            var d = "0x" + b - 65536;return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        },
            da = function () {
            m();
        };try {
            H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;
        } catch (ea) {
            H = { apply: E.length ? function (a, b) {
                    G.apply(a, I.call(b));
                } : function (a, b) {
                    var c = a.length,
                        d = 0;while (a[c++] = b[d++]);a.length = c - 1;
                } };
        }function fa(a, b, d, e) {
            var f,
                h,
                j,
                k,
                l,
                o,
                r,
                s,
                w = b && b.ownerDocument,
                x = b ? b.nodeType : 9;if (d = d || [], "string" != typeof a || !a || 1 !== x && 9 !== x && 11 !== x) return d;if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
                if (11 !== x && (o = $.exec(a))) if (f = o[1]) {
                    if (9 === x) {
                        if (!(j = b.getElementById(f))) return d;if (j.id === f) return d.push(j), d;
                    } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d;
                } else {
                    if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName) return H.apply(d, b.getElementsByClassName(f)), d;
                }if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                    if (1 !== x) w = b, s = a;else if ("object" !== b.nodeName.toLowerCase()) {
                        (k = b.getAttribute("id")) ? k = k.replace(aa, "\\$&") : b.setAttribute("id", k = u), r = g(a), h = r.length, l = V.test(k) ? "#" + k : "[id='" + k + "']";while (h--) r[h] = l + " " + qa(r[h]);s = r.join(","), w = _.test(a) && oa(b.parentNode) || b;
                    }if (s) try {
                        return H.apply(d, w.querySelectorAll(s)), d;
                    } catch (y) {} finally {
                        k === u && b.removeAttribute("id");
                    }
                }
            }return i(a.replace(Q, "$1"), b, d, e);
        }function ga() {
            var a = [];function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
            }return b;
        }function ha(a) {
            return a[u] = !0, a;
        }function ia(a) {
            var b = n.createElement("div");try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null;
            }
        }function ja(a, b) {
            var c = a.split("|"),
                e = c.length;while (e--) d.attrHandle[c[e]] = b;
        }function ka(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);if (d) return d;if (c) while (c = c.nextSibling) if (c === b) return -1;return a ? 1 : -1;
        }function la(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
            };
        }function ma(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
            };
        }function na(a) {
            return ha(function (b) {
                return b = +b, ha(function (c, d) {
                    var e,
                        f = a([], c.length, b),
                        g = f.length;while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                });
            });
        }function oa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a;
        }c = fa.support = {}, f = fa.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;return b ? "HTML" !== b.nodeName : !1;
        }, m = fa.setDocument = function (a) {
            var b,
                e,
                g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ia(function (a) {
                return a.className = "i", !a.getAttribute("className");
            }), c.getElementsByTagName = ia(function (a) {
                return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length;
            }), c.getElementsByClassName = Z.test(n.getElementsByClassName), c.getById = ia(function (a) {
                return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length;
            }), c.getById ? (d.find.ID = function (a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);return c ? [c] : [];
                }
            }, d.filter.ID = function (a) {
                var b = a.replace(ba, ca);return function (a) {
                    return a.getAttribute("id") === b;
                };
            }) : (delete d.find.ID, d.filter.ID = function (a) {
                var b = a.replace(ba, ca);return function (a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
                };
            }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
            } : function (a, b) {
                var c,
                    d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);return d;
                }return f;
            }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                return "undefined" != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0;
            }, r = [], q = [], (c.qsa = Z.test(n.querySelectorAll)) && (ia(function (a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
            }), ia(function (a) {
                var b = n.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
            })), (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function (a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", O);
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Z.test(o.compareDocumentPosition), t = b || Z.test(o.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function (a, b) {
                if (b) while (b = b.parentNode) if (b === a) return !0;return !1;
            }, B = b ? function (a, b) {
                if (a === b) return l = !0, 0;var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);
            } : function (a, b) {
                if (a === b) return l = !0, 0;var c,
                    d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    g = [a],
                    h = [b];if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;if (e === f) return ka(a, b);c = a;while (c = c.parentNode) g.unshift(c);c = b;while (c = c.parentNode) h.unshift(c);while (g[d] === h[d]) d++;return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0;
            }, n) : n;
        }, fa.matches = function (a, b) {
            return fa(a, null, null, b);
        }, fa.matchesSelector = function (a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(T, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
                var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
            } catch (e) {}return fa(b, n, null, [a]).length > 0;
        }, fa.contains = function (a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b);
        }, fa.attr = function (a, b) {
            (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
                f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
        }, fa.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        }, fa.uniqueSort = function (a) {
            var b,
                d = [],
                e = 0,
                f = 0;if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));while (e--) a.splice(d[e], 1);
            }return k = null, a;
        }, e = fa.getText = function (a) {
            var b,
                c = "",
                d = 0,
                f = a.nodeType;if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
                } else if (3 === f || 4 === f) return a.nodeValue;
            } else while (b = a[d++]) c += e(b);return c;
        }, d = fa.selectors = { cacheLength: 50, createPseudo: ha, match: W, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (a) {
                    return a[1] = a[1].replace(ba, ca), a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                }, CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fa.error(a[0]), a;
                }, PSEUDO: function (a) {
                    var b,
                        c = !a[6] && a[2];return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
                } }, filter: { TAG: function (a) {
                    var b = a.replace(ba, ca).toLowerCase();return "*" === a ? function () {
                        return !0;
                    } : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
                }, CLASS: function (a) {
                    var b = y[a + " "];return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
                    });
                }, ATTR: function (a, b, c) {
                    return function (d) {
                        var e = fa.attr(d, a);return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0;
                    };
                }, CHILD: function (a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode;
                    } : function (b, c, i) {
                        var j,
                            k,
                            l,
                            m,
                            n,
                            o,
                            p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h,
                            t = !1;if (q) {
                            if (f) {
                                while (p) {
                                    m = b;while (m = m[p]) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;o = p = "only" === a && !o && "nextSibling";
                                }return !0;
                            }if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if (1 === m.nodeType && ++t && m === b) {
                                    k[a] = [w, n, t];break;
                                }
                            } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;return t -= e, t === d || t % d === 0 && t / d >= 0;
                        }
                    };
                }, PSEUDO: function (a, b) {
                    var c,
                        e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function (a, c) {
                        var d,
                            f = e(a, b),
                            g = f.length;while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g]);
                    }) : function (a) {
                        return e(a, 0, c);
                    }) : e;
                } }, pseudos: { not: ha(function (a) {
                    var b = [],
                        c = [],
                        d = h(a.replace(Q, "$1"));return d[u] ? ha(function (a, b, c, e) {
                        var f,
                            g = d(a, null, e, []),
                            h = a.length;while (h--) (f = g[h]) && (a[h] = !(b[h] = f));
                    }) : function (a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
                    };
                }), has: ha(function (a) {
                    return function (b) {
                        return fa(a, b).length > 0;
                    };
                }), contains: ha(function (a) {
                    return a = a.replace(ba, ca), function (b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
                    };
                }), lang: ha(function (a) {
                    return V.test(a || "") || fa.error("unsupported lang: " + a), a = a.replace(ba, ca).toLowerCase(), function (b) {
                        var c;do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);return !1;
                    };
                }), target: function (b) {
                    var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
                }, root: function (a) {
                    return a === o;
                }, focus: function (a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                }, enabled: function (a) {
                    return a.disabled === !1;
                }, disabled: function (a) {
                    return a.disabled === !0;
                }, checked: function (a) {
                    var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
                }, selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                }, empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;return !0;
                }, parent: function (a) {
                    return !d.pseudos.empty(a);
                }, header: function (a) {
                    return Y.test(a.nodeName);
                }, input: function (a) {
                    return X.test(a.nodeName);
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
                }, text: function (a) {
                    var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                }, first: na(function () {
                    return [0];
                }), last: na(function (a, b) {
                    return [b - 1];
                }), eq: na(function (a, b, c) {
                    return [0 > c ? c + b : c];
                }), even: na(function (a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);return a;
                }), odd: na(function (a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);return a;
                }), lt: na(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);return a;
                }), gt: na(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);return a;
                }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) d.pseudos[b] = la(b);for (b in { submit: !0, reset: !0 }) d.pseudos[b] = ma(b);function pa() {}pa.prototype = d.filters = d.pseudos, d.setFilters = new pa(), g = fa.tokenize = function (a, b) {
            var c,
                e,
                f,
                g,
                h,
                i,
                j,
                k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
                c && !(e = R.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = S.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(Q, " ") }), h = h.slice(c.length));for (g in d.filter) !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));if (!c) break;
            }return b ? h.length : h ? fa.error(a) : z(a, i).slice(0);
        };function qa(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;return d;
        }function ra(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;return b.first ? function (b, c, f) {
                while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f);
            } : function (b, c, g) {
                var h,
                    i,
                    j,
                    k = [w, f];if (g) {
                    while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                } else while (b = b[d]) if (1 === b.nodeType || e) {
                    if (j = b[u] || (b[u] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === w && h[1] === f) return k[2] = h[2];if (i[d] = k, k[2] = a(b, c, g)) return !0;
                }
            };
        }function sa(a) {
            return a.length > 1 ? function (b, c, d) {
                var e = a.length;while (e--) if (!a[e](b, c, d)) return !1;return !0;
            } : a[0];
        }function ta(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);return c;
        }function ua(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));return g;
        }function va(a, b, c, d, e, f) {
            return d && !d[u] && (d = va(d)), e && !e[u] && (e = va(e, f)), ha(function (f, g, h, i) {
                var j,
                    k,
                    l,
                    m = [],
                    n = [],
                    o = g.length,
                    p = f || ta(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : ua(p, m, a, h, i),
                    r = c ? e || (f ? a : o || d) ? [] : g : q;if (c && c(q, r, h, i), d) {
                    j = ua(r, n), d(j, [], h, i), k = j.length;while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
                }if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;while (k--) (l = r[k]) && j.push(q[k] = l);e(null, r = [], j, i);
                        }k = r.length;while (k--) (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
                    }
                } else r = ua(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);
            });
        }function wa(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ra(function (a) {
                return a === b;
            }, h, !0), l = ra(function (a) {
                return J(b, a) > -1;
            }, h, !0), m = [function (a, c, d) {
                var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return b = null, e;
            }]; f > i; i++) if (c = d.relative[a[i].type]) m = [ra(sa(m), c)];else {
                if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                    for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(Q, "$1"), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a));
                }m.push(c);
            }return sa(m);
        }function xa(a, b) {
            var c = b.length > 0,
                e = a.length > 0,
                f = function (f, g, h, i, k) {
                var l,
                    o,
                    q,
                    r = 0,
                    s = "0",
                    t = f && [],
                    u = [],
                    v = j,
                    x = f || e && d.find.TAG("*", k),
                    y = w += null == v ? 1 : Math.random() || .1,
                    z = x.length;for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
                    if (e && l) {
                        o = 0, g || l.ownerDocument === n || (m(l), h = !p);while (q = a[o++]) if (q(l, g || n, h)) {
                            i.push(l);break;
                        }k && (w = y);
                    }c && ((l = !q && l) && r--, f && t.push(l));
                }if (r += s, c && s !== r) {
                    o = 0;while (q = b[o++]) q(t, u, g, h);if (f) {
                        if (r > 0) while (s--) t[s] || u[s] || (u[s] = F.call(i));u = ua(u);
                    }H.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i);
                }return k && (w = y, j = v), t;
            };return c ? ha(f) : f;
        }return h = fa.compile = function (a, b) {
            var c,
                d = [],
                e = [],
                f = A[a + " "];if (!f) {
                b || (b = g(a)), c = b.length;while (c--) f = wa(b[c]), f[u] ? d.push(f) : e.push(f);f = A(a, xa(e, d)), f.selector = a;
            }return f;
        }, i = fa.select = function (a, b, e, f) {
            var i,
                j,
                k,
                l,
                m,
                n = "function" == typeof a && a,
                o = !f && g(a = n.selector || a);if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0], !b) return e;n && (b = b.parentNode), a = a.slice(j.shift().value.length);
                }i = W.needsContext.test(a) ? 0 : j.length;while (i--) {
                    if (k = j[i], d.relative[l = k.type]) break;if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && qa(j), !a) return H.apply(e, f), e;break;
                    }
                }
            }return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b), e;
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ia(function (a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"));
        }), ia(function (a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
        }) || ja("type|href|height|width", function (a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
        }), c.attributes && ia(function (a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
        }) || ja("value", function (a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
        }), ia(function (a) {
            return null == a.getAttribute("disabled");
        }) || ja(K, function (a, b, c) {
            var d;return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }), fa;
    }(a);n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.uniqueSort = n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;var u = function (a, b, c) {
        var d = [],
            e = void 0 !== c;while ((a = a[b]) && 9 !== a.nodeType) if (1 === a.nodeType) {
            if (e && n(a).is(c)) break;d.push(a);
        }return d;
    },
        v = function (a, b) {
        for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);return c;
    },
        w = n.expr.match.needsContext,
        x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        y = /^.[^:#\[\.,]*$/;function z(a, b, c) {
        if (n.isFunction(b)) return n.grep(a, function (a, d) {
            return !!b.call(a, d, a) !== c;
        });if (b.nodeType) return n.grep(a, function (a) {
            return a === b !== c;
        });if ("string" == typeof b) {
            if (y.test(b)) return n.filter(b, a, c);b = n.filter(b, a);
        }return n.grep(a, function (a) {
            return n.inArray(a, b) > -1 !== c;
        });
    }n.filter = function (a, b, c) {
        var d = b[0];return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
            return 1 === a.nodeType;
        }));
    }, n.fn.extend({ find: function (a) {
            var b,
                c = [],
                d = this,
                e = d.length;if ("string" != typeof a) return this.pushStack(n(a).filter(function () {
                for (b = 0; e > b; b++) if (n.contains(d[b], this)) return !0;
            }));for (b = 0; e > b; b++) n.find(a, d[b], c);return c = this.pushStack(e > 1 ? n.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c;
        }, filter: function (a) {
            return this.pushStack(z(this, a || [], !1));
        }, not: function (a) {
            return this.pushStack(z(this, a || [], !0));
        }, is: function (a) {
            return !!z(this, "string" == typeof a && w.test(a) ? n(a) : a || [], !1).length;
        } });var A,
        B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        C = n.fn.init = function (a, b, c) {
        var e, f;if (!a) return this;if (c = c || A, "string" == typeof a) {
            if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : B.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);if (e[1]) {
                if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), x.test(e[1]) && n.isPlainObject(b)) for (e in b) n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);return this;
            }if (f = d.getElementById(e[2]), f && f.parentNode) {
                if (f.id !== e[2]) return A.find(a);this.length = 1, this[0] = f;
            }return this.context = d, this.selector = a, this;
        }return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this));
    };C.prototype = n.fn, A = n(d);var D = /^(?:parents|prev(?:Until|All))/,
        E = { children: !0, contents: !0, next: !0, prev: !0 };n.fn.extend({ has: function (a) {
            var b,
                c = n(a, this),
                d = c.length;return this.filter(function () {
                for (b = 0; d > b; b++) if (n.contains(this, c[b])) return !0;
            });
        }, closest: function (a, b) {
            for (var c, d = 0, e = this.length, f = [], g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                f.push(c);break;
            }return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f);
        }, index: function (a) {
            return a ? "string" == typeof a ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        }, add: function (a, b) {
            return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))));
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        } });function F(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);return a;
    }n.each({ parent: function (a) {
            var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;
        }, parents: function (a) {
            return u(a, "parentNode");
        }, parentsUntil: function (a, b, c) {
            return u(a, "parentNode", c);
        }, next: function (a) {
            return F(a, "nextSibling");
        }, prev: function (a) {
            return F(a, "previousSibling");
        }, nextAll: function (a) {
            return u(a, "nextSibling");
        }, prevAll: function (a) {
            return u(a, "previousSibling");
        }, nextUntil: function (a, b, c) {
            return u(a, "nextSibling", c);
        }, prevUntil: function (a, b, c) {
            return u(a, "previousSibling", c);
        }, siblings: function (a) {
            return v((a.parentNode || {}).firstChild, a);
        }, children: function (a) {
            return v(a.firstChild);
        }, contents: function (a) {
            return n.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes);
        } }, function (a, b) {
        n.fn[a] = function (c, d) {
            var e = n.map(this, b, c);return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (E[a] || (e = n.uniqueSort(e)), D.test(a) && (e = e.reverse())), this.pushStack(e);
        };
    });var G = /\S+/g;function H(a) {
        var b = {};return n.each(a.match(G) || [], function (a, c) {
            b[c] = !0;
        }), b;
    }n.Callbacks = function (a) {
        a = "string" == typeof a ? H(a) : n.extend({}, a);var b,
            c,
            d,
            e,
            f = [],
            g = [],
            h = -1,
            i = function () {
            for (e = a.once, d = b = !0; g.length; h = -1) {
                c = g.shift();while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1);
            }a.memory || (c = !1), b = !1, e && (f = c ? [] : "");
        },
            j = { add: function () {
                return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
                    n.each(b, function (b, c) {
                        n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== n.type(c) && d(c);
                    });
                }(arguments), c && !b && i()), this;
            }, remove: function () {
                return n.each(arguments, function (a, b) {
                    var c;while ((c = n.inArray(b, f, c)) > -1) f.splice(c, 1), h >= c && h--;
                }), this;
            }, has: function (a) {
                return a ? n.inArray(a, f) > -1 : f.length > 0;
            }, empty: function () {
                return f && (f = []), this;
            }, disable: function () {
                return e = g = [], f = c = "", this;
            }, disabled: function () {
                return !f;
            }, lock: function () {
                return e = !0, c || j.disable(), this;
            }, locked: function () {
                return !!e;
            }, fireWith: function (a, c) {
                return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this;
            }, fire: function () {
                return j.fireWith(this, arguments), this;
            }, fired: function () {
                return !!d;
            } };return j;
    }, n.extend({ Deferred: function (a) {
            var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
                c = "pending",
                d = { state: function () {
                    return c;
                }, always: function () {
                    return e.done(arguments).fail(arguments), this;
                }, then: function () {
                    var a = arguments;return n.Deferred(function (c) {
                        n.each(b, function (b, f) {
                            var g = n.isFunction(a[b]) && a[b];e[f[1]](function () {
                                var a = g && g.apply(this, arguments);a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments);
                            });
                        }), a = null;
                    }).promise();
                }, promise: function (a) {
                    return null != a ? n.extend(a, d) : d;
                } },
                e = {};return d.pipe = d.then, n.each(b, function (a, f) {
                var g = f[2],
                    h = f[3];d[f[1]] = g.add, h && g.add(function () {
                    c = h;
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this;
                }, e[f[0] + "With"] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        }, when: function (a) {
            var b = 0,
                c = e.call(arguments),
                d = c.length,
                f = 1 !== d || a && n.isFunction(a.promise) ? d : 0,
                g = 1 === f ? a : n.Deferred(),
                h = function (a, b, c) {
                return function (d) {
                    b[a] = this, c[a] = arguments.length > 1 ? e.call(arguments) : d, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
                };
            },
                i,
                j,
                k;if (d > 1) for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;return f || g.resolveWith(k, c), g.promise();
        } });var I;n.fn.ready = function (a) {
        return n.ready.promise().done(a), this;
    }, n.extend({ isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? n.readyWait++ : n.ready(!0);
        }, ready: function (a) {
            (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [n]), n.fn.triggerHandler && (n(d).triggerHandler("ready"), n(d).off("ready"))));
        } });function J() {
        d.addEventListener ? (d.removeEventListener("DOMContentLoaded", K), a.removeEventListener("load", K)) : (d.detachEvent("onreadystatechange", K), a.detachEvent("onload", K));
    }function K() {
        (d.addEventListener || "load" === a.event.type || "complete" === d.readyState) && (J(), n.ready());
    }n.ready.promise = function (b) {
        if (!I) if (I = n.Deferred(), "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll) a.setTimeout(n.ready);else if (d.addEventListener) d.addEventListener("DOMContentLoaded", K), a.addEventListener("load", K);else {
            d.attachEvent("onreadystatechange", K), a.attachEvent("onload", K);var c = !1;try {
                c = null == a.frameElement && d.documentElement;
            } catch (e) {}c && c.doScroll && !function f() {
                if (!n.isReady) {
                    try {
                        c.doScroll("left");
                    } catch (b) {
                        return a.setTimeout(f, 50);
                    }J(), n.ready();
                }
            }();
        }return I.promise(b);
    }, n.ready.promise();var L;for (L in n(l)) break;l.ownFirst = "0" === L, l.inlineBlockNeedsLayout = !1, n(function () {
        var a, b, c, e;c = d.getElementsByTagName("body")[0], c && c.style && (b = d.createElement("div"), e = d.createElement("div"), e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(e).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(e));
    }), function () {
        var a = d.createElement("div");l.deleteExpando = !0;try {
            delete a.test;
        } catch (b) {
            l.deleteExpando = !1;
        }a = null;
    }();var M = function (a) {
        var b = n.noData[(a.nodeName + " ").toLowerCase()],
            c = +a.nodeType || 1;return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b;
    },
        N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        O = /([A-Z])/g;function P(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(O, "-$1").toLowerCase();if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c;
                } catch (e) {}n.data(a, b, c);
            } else c = void 0;
        }return c;
    }function Q(a) {
        var b;for (b in a) if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b) return !1;return !0;
    }function R(a, b, d, e) {
        if (M(a)) {
            var f,
                g,
                h = n.expando,
                i = a.nodeType,
                j = i ? n.cache : a,
                k = i ? a[h] : a[h] && h;if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || n.guid++ : h), j[k] || (j[k] = i ? {} : { toJSON: n.noop }), "object" != typeof b && "function" != typeof b || (e ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[n.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[n.camelCase(b)])) : f = g, f;
        }
    }function S(a, b, c) {
        if (M(a)) {
            var d,
                e,
                f = a.nodeType,
                g = f ? n.cache : a,
                h = f ? a[n.expando] : n.expando;if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    n.isArray(b) ? b = b.concat(n.map(b, n.camelCase)) : b in d ? b = [b] : (b = n.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;while (e--) delete d[b[e]];if (c ? !Q(d) : !n.isEmptyObject(d)) return;
                }(c || (delete g[h].data, Q(g[h]))) && (f ? n.cleanData([a], !0) : l.deleteExpando || g != g.window ? delete g[h] : g[h] = void 0);
            }
        }
    }n.extend({ cache: {}, noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function (a) {
            return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando], !!a && !Q(a);
        }, data: function (a, b, c) {
            return R(a, b, c);
        }, removeData: function (a, b) {
            return S(a, b);
        }, _data: function (a, b, c) {
            return R(a, b, c, !0);
        }, _removeData: function (a, b) {
            return S(a, b, !0);
        } }), n.fn.extend({ data: function (a, b) {
            var c,
                d,
                e,
                f = this[0],
                g = f && f.attributes;if (void 0 === a) {
                if (this.length && (e = n.data(f), 1 === f.nodeType && !n._data(f, "parsedAttrs"))) {
                    c = g.length;while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));n._data(f, "parsedAttrs", !0);
                }return e;
            }return "object" == typeof a ? this.each(function () {
                n.data(this, a);
            }) : arguments.length > 1 ? this.each(function () {
                n.data(this, a, b);
            }) : f ? P(f, a, n.data(f, a)) : void 0;
        }, removeData: function (a) {
            return this.each(function () {
                n.removeData(this, a);
            });
        } }), n.extend({ queue: function (a, b, c) {
            var d;return a ? (b = (b || "fx") + "queue", d = n._data(a, b), c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0;
        }, dequeue: function (a, b) {
            b = b || "fx";var c = n.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = n._queueHooks(a, b),
                g = function () {
                n.dequeue(a, b);
            };"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        }, _queueHooks: function (a, b) {
            var c = b + "queueHooks";return n._data(a, c) || n._data(a, c, { empty: n.Callbacks("once memory").add(function () {
                    n._removeData(a, b + "queue"), n._removeData(a, c);
                }) });
        } }), n.fn.extend({ queue: function (a, b) {
            var c = 2;return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                var c = n.queue(this, a, b);n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
            });
        }, dequeue: function (a) {
            return this.each(function () {
                n.dequeue(this, a);
            });
        }, clearQueue: function (a) {
            return this.queue(a || "fx", []);
        }, promise: function (a, b) {
            var c,
                d = 1,
                e = n.Deferred(),
                f = this,
                g = this.length,
                h = function () {
                --d || e.resolveWith(f, [f]);
            };"string" != typeof a && (b = a, a = void 0), a = a || "fx";while (g--) c = n._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));return h(), e.promise(b);
        } }), function () {
        var a;l.shrinkWrapBlocks = function () {
            if (null != a) return a;a = !1;var b, c, e;return c = d.getElementsByTagName("body")[0], c && c.style ? (b = d.createElement("div"), e = d.createElement("div"), e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(e).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(d.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(e), a) : void 0;
        };
    }();var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        U = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"),
        V = ["Top", "Right", "Bottom", "Left"],
        W = function (a, b) {
        return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a);
    };function X(a, b, c, d) {
        var e,
            f = 1,
            g = 20,
            h = d ? function () {
            return d.cur();
        } : function () {
            return n.css(a, b, "");
        },
            i = h(),
            j = c && c[3] || (n.cssNumber[b] ? "" : "px"),
            k = (n.cssNumber[b] || "px" !== j && +i) && U.exec(n.css(a, b));if (k && k[3] !== j) {
            j = j || k[3], c = c || [], k = +i || 1;do f = f || ".5", k /= f, n.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g);
        }return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e;
    }var Y = function (a, b, c, d, e, f, g) {
        var h = 0,
            i = a.length,
            j = null == c;if ("object" === n.type(c)) {
            e = !0;for (h in c) Y(a, b, h, c[h], !0, f, g);
        } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
            return j.call(n(a), c);
        })), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    },
        Z = /^(?:checkbox|radio)$/i,
        $ = /<([\w:-]+)/,
        _ = /^$|\/(?:java|ecma)script/i,
        aa = /^\s+/,
        ba = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";function ca(a) {
        var b = ba.split("|"),
            c = a.createDocumentFragment();if (c.createElement) while (b.length) c.createElement(b.pop());return c;
    }!function () {
        var a = d.createElement("div"),
            b = d.createDocumentFragment(),
            c = d.createElement("input");a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", l.leadingWhitespace = 3 === a.firstChild.nodeType, l.tbody = !a.getElementsByTagName("tbody").length, l.htmlSerialize = !!a.getElementsByTagName("link").length, l.html5Clone = "<:nav></:nav>" !== d.createElement("nav").cloneNode(!0).outerHTML, c.type = "checkbox", c.checked = !0, b.appendChild(c), l.appendChecked = c.checked, a.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue, b.appendChild(a), c = d.createElement("input"), c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), a.appendChild(c), l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !!a.addEventListener, a[n.expando] = 1, l.attributes = !a.getAttribute(n.expando);
    }();var da = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] };da.optgroup = da.option, da.tbody = da.tfoot = da.colgroup = da.caption = da.thead, da.th = da.td;function ea(a, b) {
        var c,
            d,
            e = 0,
            f = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : void 0;if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], f) : f;
    }function fa(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) n._data(c, "globalEval", !b || n._data(b[d], "globalEval"));
    }var ga = /<|&#?\w+;/,
        ha = /<tbody/i;function ia(a) {
        Z.test(a.type) && (a.defaultChecked = a.checked);
    }function ja(a, b, c, d, e) {
        for (var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0; o > r; r++) if (g = a[r], g || 0 === g) if ("object" === n.type(g)) n.merge(q, g.nodeType ? [g] : g);else if (ga.test(g)) {
            i = i || p.appendChild(b.createElement("div")), j = ($.exec(g) || ["", ""])[1].toLowerCase(), m = da[j] || da._default, i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2], f = m[0];while (f--) i = i.lastChild;if (!l.leadingWhitespace && aa.test(g) && q.push(b.createTextNode(aa.exec(g)[0])), !l.tbody) {
                g = "table" !== j || ha.test(g) ? "<table>" !== m[1] || ha.test(g) ? 0 : i : i.firstChild, f = g && g.childNodes.length;while (f--) n.nodeName(k = g.childNodes[f], "tbody") && !k.childNodes.length && g.removeChild(k);
            }n.merge(q, i.childNodes), i.textContent = "";while (i.firstChild) i.removeChild(i.firstChild);i = p.lastChild;
        } else q.push(b.createTextNode(g));i && p.removeChild(i), l.appendChecked || n.grep(ea(q, "input"), ia), r = 0;while (g = q[r++]) if (d && n.inArray(g, d) > -1) e && e.push(g);else if (h = n.contains(g.ownerDocument, g), i = ea(p.appendChild(g), "script"), h && fa(i), c) {
            f = 0;while (g = i[f++]) _.test(g.type || "") && c.push(g);
        }return i = null, p;
    }!function () {
        var b,
            c,
            e = d.createElement("div");for (b in { submit: !0, change: !0, focusin: !0 }) c = "on" + b, (l[b] = c in a) || (e.setAttribute(c, "t"), l[b] = e.attributes[c].expando === !1);e = null;
    }();var ka = /^(?:input|select|textarea)$/i,
        la = /^key/,
        ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        na = /^(?:focusinfocus|focusoutblur)$/,
        oa = /^([^.]*)(?:\.(.+)|)/;function pa() {
        return !0;
    }function qa() {
        return !1;
    }function ra() {
        try {
            return d.activeElement;
        } catch (a) {}
    }function sa(a, b, c, d, e, f) {
        var g, h;if ("object" == typeof b) {
            "string" != typeof c && (d = d || c, c = void 0);for (h in b) sa(a, h, c, d, b[h], f);return a;
        }if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = qa;else if (!e) return a;return 1 === f && (g = e, e = function (a) {
            return n().off(a), g.apply(this, arguments);
        }, e.guid = g.guid || (g.guid = n.guid++)), a.each(function () {
            n.event.add(this, b, e, d, c);
        });
    }n.event = { global: {}, add: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                o,
                p,
                q,
                r = n._data(a);if (r) {
                c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = n.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
                    return "undefined" == typeof n || a && n.event.triggered === a.type ? void 0 : n.event.dispatch.apply(k.elem, arguments);
                }, k.elem = a), b = (b || "").match(G) || [""], h = b.length;while (h--) f = oa.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = n.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = n.event.special[o] || {}, l = n.extend({ type: o, origType: q, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && n.expr.match.needsContext.test(e), namespace: p.join(".") }, i), (m = g[o]) || (m = g[o] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), n.event.global[o] = !0);a = null;
            }
        }, remove: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                o,
                p,
                q,
                r = n.hasData(a) && n._data(a);if (r && (k = r.events)) {
                b = (b || "").match(G) || [""], j = b.length;while (j--) if (h = oa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                    l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length;while (f--) g = m[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete k[o]);
                } else for (o in k) n.event.remove(a, o + b[j], c, d, !0);n.isEmptyObject(k) && (delete r.handle, n._removeData(a, "events"));
            }
        }, trigger: function (b, c, e, f) {
            var g,
                h,
                i,
                j,
                l,
                m,
                o,
                p = [e || d],
                q = k.call(b, "type") ? b.type : b,
                r = k.call(b, "namespace") ? b.namespace.split(".") : [];if (i = m = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !na.test(q + n.event.triggered) && (q.indexOf(".") > -1 && (r = q.split("."), q = r.shift(), r.sort()), h = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = r.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : n.makeArray(c, [b]), l = n.event.special[q] || {}, f || !l.trigger || l.trigger.apply(e, c) !== !1)) {
                if (!f && !l.noBubble && !n.isWindow(e)) {
                    for (j = l.delegateType || q, na.test(j + q) || (i = i.parentNode); i; i = i.parentNode) p.push(i), m = i;m === (e.ownerDocument || d) && p.push(m.defaultView || m.parentWindow || a);
                }o = 0;while ((i = p[o++]) && !b.isPropagationStopped()) b.type = o > 1 ? j : l.bindType || q, g = (n._data(i, "events") || {})[b.type] && n._data(i, "handle"), g && g.apply(i, c), g = h && i[h], g && g.apply && M(i) && (b.result = g.apply(i, c), b.result === !1 && b.preventDefault());if (b.type = q, !f && !b.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), c) === !1) && M(e) && h && e[q] && !n.isWindow(e)) {
                    m = e[h], m && (e[h] = null), n.event.triggered = q;try {
                        e[q]();
                    } catch (s) {}n.event.triggered = void 0, m && (e[h] = m);
                }return b.result;
            }
        }, dispatch: function (a) {
            a = n.event.fix(a);var b,
                c,
                d,
                f,
                g,
                h = [],
                i = e.call(arguments),
                j = (n._data(this, "events") || {})[a.type] || [],
                k = n.event.special[a.type] || {};if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, c = 0;while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) a.rnamespace && !a.rnamespace.test(g.namespace) || (a.handleObj = g, a.data = g.data, d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                }return k.postDispatch && k.postDispatch.call(this, a), a.result;
            }
        }, handlers: function (a, b) {
            var c,
                d,
                e,
                f,
                g = [],
                h = b.delegateCount,
                i = a.target;if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1)) for (; i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [i]).length), d[e] && d.push(f);d.length && g.push({ elem: i, handlers: d });
            }return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
        }, fix: function (a) {
            if (a[n.expando]) return a;var b,
                c,
                e,
                f = a.type,
                g = a,
                h = this.fixHooks[f];h || (this.fixHooks[f] = h = ma.test(f) ? this.mouseHooks : la.test(f) ? this.keyHooks : {}), e = h.props ? this.props.concat(h.props) : this.props, a = new n.Event(g), b = e.length;while (b--) c = e[b], a[c] = g[c];return a.target || (a.target = g.srcElement || d), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, h.filter ? h.filter(a, g) : a;
        }, props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
            } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, b) {
                var c,
                    e,
                    f,
                    g = b.button,
                    h = b.fromElement;return null == a.pageX && null != b.clientX && (e = a.target.ownerDocument || d, f = e.documentElement, c = e.body, a.pageX = b.clientX + (f && f.scrollLeft || c && c.scrollLeft || 0) - (f && f.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (f && f.scrollTop || c && c.scrollTop || 0) - (f && f.clientTop || c && c.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? b.toElement : h), a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a;
            } }, special: { load: { noBubble: !0 }, focus: { trigger: function () {
                    if (this !== ra() && this.focus) try {
                        return this.focus(), !1;
                    } catch (a) {}
                }, delegateType: "focusin" }, blur: { trigger: function () {
                    return this === ra() && this.blur ? (this.blur(), !1) : void 0;
                }, delegateType: "focusout" }, click: { trigger: function () {
                    return n.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0;
                }, _default: function (a) {
                    return n.nodeName(a.target, "a");
                } }, beforeunload: { postDispatch: function (a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                } } }, simulate: function (a, b, c) {
            var d = n.extend(new n.Event(), c, { type: a, isSimulated: !0 });n.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault();
        } }, n.removeEvent = d.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c);
    } : function (a, b, c) {
        var d = "on" + b;a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null), a.detachEvent(d, c));
    }, n.Event = function (a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? pa : qa) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b);
    }, n.Event.prototype = { constructor: n.Event, isDefaultPrevented: qa, isPropagationStopped: qa, isImmediatePropagationStopped: qa, preventDefault: function () {
            var a = this.originalEvent;this.isDefaultPrevented = pa, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
        }, stopPropagation: function () {
            var a = this.originalEvent;this.isPropagationStopped = pa, a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
        }, stopImmediatePropagation: function () {
            var a = this.originalEvent;this.isImmediatePropagationStopped = pa, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();
        } }, n.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
        n.event.special[a] = { delegateType: b, bindType: b, handle: function (a) {
                var c,
                    d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;return e && (e === d || n.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
            } };
    }), l.submit || (n.event.special.submit = { setup: function () {
            return n.nodeName(this, "form") ? !1 : void n.event.add(this, "click._submit keypress._submit", function (a) {
                var b = a.target,
                    c = n.nodeName(b, "input") || n.nodeName(b, "button") ? n.prop(b, "form") : void 0;c && !n._data(c, "submit") && (n.event.add(c, "submit._submit", function (a) {
                    a._submitBubble = !0;
                }), n._data(c, "submit", !0));
            });
        }, postDispatch: function (a) {
            a._submitBubble && (delete a._submitBubble, this.parentNode && !a.isTrigger && n.event.simulate("submit", this.parentNode, a));
        }, teardown: function () {
            return n.nodeName(this, "form") ? !1 : void n.event.remove(this, "._submit");
        } }), l.change || (n.event.special.change = { setup: function () {
            return ka.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (n.event.add(this, "propertychange._change", function (a) {
                "checked" === a.originalEvent.propertyName && (this._justChanged = !0);
            }), n.event.add(this, "click._change", function (a) {
                this._justChanged && !a.isTrigger && (this._justChanged = !1), n.event.simulate("change", this, a);
            })), !1) : void n.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;ka.test(b.nodeName) && !n._data(b, "change") && (n.event.add(b, "change._change", function (a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || n.event.simulate("change", this.parentNode, a);
                }), n._data(b, "change", !0));
            });
        }, handle: function (a) {
            var b = a.target;return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0;
        }, teardown: function () {
            return n.event.remove(this, "._change"), !ka.test(this.nodeName);
        } }), l.focusin || n.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
        var c = function (a) {
            n.event.simulate(b, a.target, n.event.fix(a));
        };n.event.special[b] = { setup: function () {
                var d = this.ownerDocument || this,
                    e = n._data(d, b);e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1);
            }, teardown: function () {
                var d = this.ownerDocument || this,
                    e = n._data(d, b) - 1;e ? n._data(d, b, e) : (d.removeEventListener(a, c, !0), n._removeData(d, b));
            } };
    }), n.fn.extend({ on: function (a, b, c, d) {
            return sa(this, a, b, c, d);
        }, one: function (a, b, c, d) {
            return sa(this, a, b, c, d, 1);
        }, off: function (a, b, c) {
            var d, e;if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);return this;
            }return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = qa), this.each(function () {
                n.event.remove(this, a, c, b);
            });
        }, trigger: function (a, b) {
            return this.each(function () {
                n.event.trigger(a, b, this);
            });
        }, triggerHandler: function (a, b) {
            var c = this[0];return c ? n.event.trigger(a, b, c, !0) : void 0;
        } });var ta = / jQuery\d+="(?:null|\d+)"/g,
        ua = new RegExp("<(?:" + ba + ")[\\s/>]", "i"),
        va = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        wa = /<script|<style|<link/i,
        xa = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ya = /^true\/(.*)/,
        za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Aa = ca(d),
        Ba = Aa.appendChild(d.createElement("div"));function Ca(a, b) {
        return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }function Da(a) {
        return a.type = (null !== n.find.attr(a, "type")) + "/" + a.type, a;
    }function Ea(a) {
        var b = ya.exec(a.type);return b ? a.type = b[1] : a.removeAttribute("type"), a;
    }function Fa(a, b) {
        if (1 === b.nodeType && n.hasData(a)) {
            var c,
                d,
                e,
                f = n._data(a),
                g = n._data(b, f),
                h = f.events;if (h) {
                delete g.handle, g.events = {};for (c in h) for (d = 0, e = h[c].length; e > d; d++) n.event.add(b, c, h[c][d]);
            }g.data && (g.data = n.extend({}, g.data));
        }
    }function Ga(a, b) {
        var c, d, e;if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !l.noCloneEvent && b[n.expando]) {
                e = n._data(b);for (d in e.events) n.removeEvent(b, d, e.handle);b.removeAttribute(n.expando);
            }"script" === c && b.text !== a.text ? (Da(b).text = a.text, Ea(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), l.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Z.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue);
        }
    }function Ha(a, b, c, d) {
        b = f.apply([], b);var e,
            g,
            h,
            i,
            j,
            k,
            m = 0,
            o = a.length,
            p = o - 1,
            q = b[0],
            r = n.isFunction(q);if (r || o > 1 && "string" == typeof q && !l.checkClone && xa.test(q)) return a.each(function (e) {
            var f = a.eq(e);r && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d);
        });if (o && (k = ja(b, a[0].ownerDocument, !1, a, d), e = k.firstChild, 1 === k.childNodes.length && (k = e), e || d)) {
            for (i = n.map(ea(k, "script"), Da), h = i.length; o > m; m++) g = k, m !== p && (g = n.clone(g, !0, !0), h && n.merge(i, ea(g, "script"))), c.call(a[m], g, m);if (h) for (j = i[i.length - 1].ownerDocument, n.map(i, Ea), m = 0; h > m; m++) g = i[m], _.test(g.type || "") && !n._data(g, "globalEval") && n.contains(j, g) && (g.src ? n._evalUrl && n._evalUrl(g.src) : n.globalEval((g.text || g.textContent || g.innerHTML || "").replace(za, "")));k = e = null;
        }return a;
    }function Ia(a, b, c) {
        for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || n.cleanData(ea(d)), d.parentNode && (c && n.contains(d.ownerDocument, d) && fa(ea(d, "script")), d.parentNode.removeChild(d));return a;
    }n.extend({ htmlPrefilter: function (a) {
            return a.replace(va, "<$1></$2>");
        }, clone: function (a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i = n.contains(a.ownerDocument, a);if (l.html5Clone || n.isXMLDoc(a) || !ua.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Ba.innerHTML = a.outerHTML, Ba.removeChild(f = Ba.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (d = ea(f), h = ea(a), g = 0; null != (e = h[g]); ++g) d[g] && Ga(e, d[g]);if (b) if (c) for (h = h || ea(a), d = d || ea(f), g = 0; null != (e = h[g]); g++) Fa(e, d[g]);else Fa(a, f);return d = ea(f, "script"), d.length > 0 && fa(d, !i && ea(a, "script")), d = h = e = null, f;
        }, cleanData: function (a, b) {
            for (var d, e, f, g, h = 0, i = n.expando, j = n.cache, k = l.attributes, m = n.event.special; null != (d = a[h]); h++) if ((b || M(d)) && (f = d[i], g = f && j[f])) {
                if (g.events) for (e in g.events) m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);j[f] && (delete j[f], k || "undefined" == typeof d.removeAttribute ? d[i] = void 0 : d.removeAttribute(i), c.push(f));
            }
        } }), n.fn.extend({ domManip: Ha, detach: function (a) {
            return Ia(this, a, !0);
        }, remove: function (a) {
            return Ia(this, a);
        }, text: function (a) {
            return Y(this, function (a) {
                return void 0 === a ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || d).createTextNode(a));
            }, null, a, arguments.length);
        }, append: function () {
            return Ha(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ca(this, a);b.appendChild(a);
                }
            });
        }, prepend: function () {
            return Ha(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ca(this, a);b.insertBefore(a, b.firstChild);
                }
            });
        }, before: function () {
            return Ha(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this);
            });
        }, after: function () {
            return Ha(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
            });
        }, empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && n.cleanData(ea(a, !1));while (a.firstChild) a.removeChild(a.firstChild);a.options && n.nodeName(a, "select") && (a.options.length = 0);
            }return this;
        }, clone: function (a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                return n.clone(this, a, b);
            });
        }, html: function (a) {
            return Y(this, function (a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(ta, "") : void 0;if ("string" == typeof a && !wa.test(a) && (l.htmlSerialize || !ua.test(a)) && (l.leadingWhitespace || !aa.test(a)) && !da[($.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = n.htmlPrefilter(a);try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(ea(b, !1)), b.innerHTML = a);b = 0;
                    } catch (e) {}
                }b && this.empty().append(a);
            }, null, a, arguments.length);
        }, replaceWith: function () {
            var a = [];return Ha(this, arguments, function (b) {
                var c = this.parentNode;n.inArray(this, a) < 0 && (n.cleanData(ea(this)), c && c.replaceChild(b, this));
            }, a);
        } }), n.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
        n.fn[a] = function (a) {
            for (var c, d = 0, e = [], f = n(a), h = f.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), n(f[d])[b](c), g.apply(e, c.get());return this.pushStack(e);
        };
    });var Ja,
        Ka = { HTML: "block", BODY: "block" };function La(a, b) {
        var c = n(b.createElement(a)).appendTo(b.body),
            d = n.css(c[0], "display");return c.detach(), d;
    }function Ma(a) {
        var b = d,
            c = Ka[a];return c || (c = La(a, b), "none" !== c && c || (Ja = (Ja || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Ja[0].contentWindow || Ja[0].contentDocument).document, b.write(), b.close(), c = La(a, b), Ja.detach()), Ka[a] = c), c;
    }var Na = /^margin/,
        Oa = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"),
        Pa = function (a, b, c, d) {
        var e,
            f,
            g = {};for (f in b) g[f] = a.style[f], a.style[f] = b[f];e = c.apply(a, d || []);for (f in b) a.style[f] = g[f];return e;
    },
        Qa = d.documentElement;!function () {
        var b,
            c,
            e,
            f,
            g,
            h,
            i = d.createElement("div"),
            j = d.createElement("div");if (j.style) {
            j.style.cssText = "float:left;opacity:.5", l.opacity = "0.5" === j.style.opacity, l.cssFloat = !!j.style.cssFloat, j.style.backgroundClip = "content-box", j.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === j.style.backgroundClip, i = d.createElement("div"), i.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", j.innerHTML = "", i.appendChild(j), l.boxSizing = "" === j.style.boxSizing || "" === j.style.MozBoxSizing || "" === j.style.WebkitBoxSizing, n.extend(l, { reliableHiddenOffsets: function () {
                    return null == b && k(), f;
                }, boxSizingReliable: function () {
                    return null == b && k(), e;
                }, pixelMarginRight: function () {
                    return null == b && k(), c;
                }, pixelPosition: function () {
                    return null == b && k(), b;
                }, reliableMarginRight: function () {
                    return null == b && k(), g;
                }, reliableMarginLeft: function () {
                    return null == b && k(), h;
                } });function k() {
                var k,
                    l,
                    m = d.documentElement;m.appendChild(i), j.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", b = e = h = !1, c = g = !0, a.getComputedStyle && (l = a.getComputedStyle(j), b = "1%" !== (l || {}).top, h = "2px" === (l || {}).marginLeft, e = "4px" === (l || { width: "4px" }).width, j.style.marginRight = "50%", c = "4px" === (l || { marginRight: "4px" }).marginRight, k = j.appendChild(d.createElement("div")), k.style.cssText = j.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", k.style.marginRight = k.style.width = "0", j.style.width = "1px", g = !parseFloat((a.getComputedStyle(k) || {}).marginRight), j.removeChild(k)), j.style.display = "none", f = 0 === j.getClientRects().length, f && (j.style.display = "", j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", j.childNodes[0].style.borderCollapse = "separate", k = j.getElementsByTagName("td"), k[0].style.cssText = "margin:0;border:0;padding:0;display:none", f = 0 === k[0].offsetHeight, f && (k[0].style.display = "", k[1].style.display = "none", f = 0 === k[0].offsetHeight)), m.removeChild(i);
            }
        }
    }();var Ra,
        Sa,
        Ta = /^(top|right|bottom|left)$/;a.getComputedStyle ? (Ra = function (b) {
        var c = b.ownerDocument.defaultView;return c && c.opener || (c = a), c.getComputedStyle(b);
    }, Sa = function (a, b, c) {
        var d,
            e,
            f,
            g,
            h = a.style;return c = c || Ra(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), c && !l.pixelMarginRight() && Oa.test(g) && Na.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 === g ? g : g + "";
    }) : Qa.currentStyle && (Ra = function (a) {
        return a.currentStyle;
    }, Sa = function (a, b, c) {
        var d,
            e,
            f,
            g,
            h = a.style;return c = c || Ra(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Oa.test(g) && !Ta.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto";
    });function Ua(a, b) {
        return { get: function () {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments);
            } };
    }var Va = /alpha\([^)]*\)/i,
        Wa = /opacity\s*=\s*([^)]*)/i,
        Xa = /^(none|table(?!-c[ea]).+)/,
        Ya = new RegExp("^(" + T + ")(.*)$", "i"),
        Za = { position: "absolute", visibility: "hidden", display: "block" },
        $a = { letterSpacing: "0", fontWeight: "400" },
        _a = ["Webkit", "O", "Moz", "ms"],
        ab = d.createElement("div").style;function bb(a) {
        if (a in ab) return a;var b = a.charAt(0).toUpperCase() + a.slice(1),
            c = _a.length;while (c--) if (a = _a[c] + b, a in ab) return a;
    }function cb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = n._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && W(d) && (f[g] = n._data(d, "olddisplay", Ma(d.nodeName)))) : (e = W(d), (c && "none" !== c || !e) && n._data(d, "olddisplay", e ? c : n.css(d, "display"))));for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));return a;
    }function db(a, b, c) {
        var d = Ya.exec(b);return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }function eb(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + V[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + V[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + V[f] + "Width", !0, e))) : (g += n.css(a, "padding" + V[f], !0, e), "padding" !== c && (g += n.css(a, "border" + V[f] + "Width", !0, e)));return g;
    }function fb(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = Ra(a),
            g = l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, f);if (0 >= e || null == e) {
            if (e = Sa(a, b, f), (0 > e || null == e) && (e = a.style[b]), Oa.test(e)) return e;d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
        }return e + eb(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }n.extend({ cssHooks: { opacity: { get: function (a, b) {
                    if (b) {
                        var c = Sa(a, "opacity");return "" === c ? "1" : c;
                    }
                } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": l.cssFloat ? "cssFloat" : "styleFloat" }, style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e,
                    f,
                    g,
                    h = n.camelCase(b),
                    i = a.style;if (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];if (f = typeof c, "string" === f && (e = U.exec(c)) && e[1] && (c = X(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (n.cssNumber[h] ? "" : "px")), l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = c;
                } catch (j) {}
            }
        }, css: function (a, b, c, d) {
            var e,
                f,
                g,
                h = n.camelCase(b);return b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Sa(a, b, d)), "normal" === f && b in $a && (f = $a[b]), "" === c || c ? (e = parseFloat(f), c === !0 || isFinite(e) ? e || 0 : f) : f;
        } }), n.each(["height", "width"], function (a, b) {
        n.cssHooks[b] = { get: function (a, c, d) {
                return c ? Xa.test(n.css(a, "display")) && 0 === a.offsetWidth ? Pa(a, Za, function () {
                    return fb(a, b, d);
                }) : fb(a, b, d) : void 0;
            }, set: function (a, c, d) {
                var e = d && Ra(a);return db(a, c, d ? eb(a, b, d, l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, e), e) : 0);
            } };
    }), l.opacity || (n.cssHooks.opacity = { get: function (a, b) {
            return Wa.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
        }, set: function (a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = n.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                f = d && d.filter || c.filter || "";c.zoom = 1, (b >= 1 || "" === b) && "" === n.trim(f.replace(Va, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Va.test(f) ? f.replace(Va, e) : f + " " + e);
        } }), n.cssHooks.marginRight = Ua(l.reliableMarginRight, function (a, b) {
        return b ? Pa(a, { display: "inline-block" }, Sa, [a, "marginRight"]) : void 0;
    }), n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function (a, b) {
        return b ? (parseFloat(Sa(a, "marginLeft")) || (n.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - Pa(a, {
            marginLeft: 0 }, function () {
            return a.getBoundingClientRect().left;
        }) : 0)) + "px" : void 0;
    }), n.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
        n.cssHooks[a + b] = { expand: function (c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + V[d] + b] = f[d] || f[d - 2] || f[0];return e;
            } }, Na.test(a) || (n.cssHooks[a + b].set = db);
    }), n.fn.extend({ css: function (a, b) {
            return Y(this, function (a, b, c) {
                var d,
                    e,
                    f = {},
                    g = 0;if (n.isArray(b)) {
                    for (d = Ra(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);return f;
                }return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
            }, a, b, arguments.length > 1);
        }, show: function () {
            return cb(this, !0);
        }, hide: function () {
            return cb(this);
        }, toggle: function (a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                W(this) ? n(this).show() : n(this).hide();
            });
        } });function gb(a, b, c, d, e) {
        return new gb.prototype.init(a, b, c, d, e);
    }n.Tween = gb, gb.prototype = { constructor: gb, init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || n.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px");
        }, cur: function () {
            var a = gb.propHooks[this.prop];return a && a.get ? a.get(this) : gb.propHooks._default.get(this);
        }, run: function (a) {
            var b,
                c = gb.propHooks[this.prop];return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : gb.propHooks._default.set(this), this;
        } }, gb.prototype.init.prototype = gb.prototype, gb.propHooks = { _default: { get: function (a) {
                var b;return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0);
            }, set: function (a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit);
            } } }, gb.propHooks.scrollTop = gb.propHooks.scrollLeft = { set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        } }, n.easing = { linear: function (a) {
            return a;
        }, swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        }, _default: "swing" }, n.fx = gb.prototype.init, n.fx.step = {};var hb,
        ib,
        jb = /^(?:toggle|show|hide)$/,
        kb = /queueHooks$/;function lb() {
        return a.setTimeout(function () {
            hb = void 0;
        }), hb = n.now();
    }function mb(a, b) {
        var c,
            d = { height: a },
            e = 0;for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = V[e], d["margin" + c] = d["padding" + c] = a;return b && (d.opacity = d.width = a), d;
    }function nb(a, b, c) {
        for (var d, e = (qb.tweeners[b] || []).concat(qb.tweeners["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d;
    }function ob(a, b, c) {
        var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            m = this,
            o = {},
            p = a.style,
            q = a.nodeType && W(a),
            r = n._data(a, "fxshow");c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
            h.unqueued || i();
        }), h.unqueued++, m.always(function () {
            m.always(function () {
                h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
            });
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = n.css(a, "display"), k = "none" === j ? n._data(a, "olddisplay") || Ma(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (l.inlineBlockNeedsLayout && "inline" !== Ma(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", l.shrinkWrapBlocks() || m.always(function () {
            p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2];
        }));for (d in b) if (e = b[d], jb.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                if ("show" !== e || !r || void 0 === r[d]) continue;q = !0;
            }o[d] = r && r[d] || n.style(a, d);
        } else j = void 0;if (n.isEmptyObject(o)) "inline" === ("none" === j ? Ma(a.nodeName) : j) && (p.display = j);else {
            r ? "hidden" in r && (q = r.hidden) : r = n._data(a, "fxshow", {}), f && (r.hidden = !q), q ? n(a).show() : m.done(function () {
                n(a).hide();
            }), m.done(function () {
                var b;n._removeData(a, "fxshow");for (b in o) n.style(a, b, o[b]);
            });for (d in o) g = nb(q ? r[d] : 0, d, m), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0));
        }
    }function pb(a, b) {
        var c, d, e, f, g;for (c in a) if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];for (c in f) c in a || (a[c] = f[c], b[c] = e);
        } else b[d] = e;
    }function qb(a, b, c) {
        var d,
            e,
            f = 0,
            g = qb.prefilters.length,
            h = n.Deferred().always(function () {
            delete i.elem;
        }),
            i = function () {
            if (e) return !1;for (var b = hb || lb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
        },
            j = h.promise({ elem: a, props: n.extend({}, b), opts: n.extend(!0, { specialEasing: {}, easing: n.easing._default }, c), originalProperties: b, originalOptions: c, startTime: hb || lb(), duration: c.duration, tweens: [], createTween: function (b, c) {
                var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return j.tweens.push(d), d;
            }, stop: function (b) {
                var c = 0,
                    d = b ? j.tweens.length : 0;if (e) return this;for (e = !0; d > c; c++) j.tweens[c].run(1);return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this;
            } }),
            k = j.props;for (pb(k, j.opts.specialEasing); g > f; f++) if (d = qb.prefilters[f].call(j, a, k, j.opts)) return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)), d;return n.map(k, nb, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }n.Animation = n.extend(qb, { tweeners: { "*": [function (a, b) {
                var c = this.createTween(a, b);return X(c.elem, a, U.exec(b), c), c;
            }] }, tweener: function (a, b) {
            n.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(G);for (var c, d = 0, e = a.length; e > d; d++) c = a[d], qb.tweeners[c] = qb.tweeners[c] || [], qb.tweeners[c].unshift(b);
        }, prefilters: [ob], prefilter: function (a, b) {
            b ? qb.prefilters.unshift(a) : qb.prefilters.push(a);
        } }), n.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? n.extend({}, a) : { complete: c || !c && b || n.isFunction(a) && a, duration: a, easing: c && b || b && !n.isFunction(b) && b };return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
        }, d;
    }, n.fn.extend({ fadeTo: function (a, b, c, d) {
            return this.filter(W).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
        }, animate: function (a, b, c, d) {
            var e = n.isEmptyObject(a),
                f = n.speed(b, c, d),
                g = function () {
                var b = qb(this, n.extend({}, a), f);(e || n._data(this, "finish")) && b.stop(!0);
            };return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        }, stop: function (a, b, c) {
            var d = function (a) {
                var b = a.stop;delete a.stop, b(c);
            };return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                var b = !0,
                    e = null != a && a + "queueHooks",
                    f = n.timers,
                    g = n._data(this);if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) g[e] && g[e].stop && kb.test(e) && d(g[e]);for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));!b && c || n.dequeue(this, a);
            });
        }, finish: function (a) {
            return a !== !1 && (a = a || "fx"), this.each(function () {
                var b,
                    c = n._data(this),
                    d = c[a + "queue"],
                    e = c[a + "queueHooks"],
                    f = n.timers,
                    g = d ? d.length : 0;for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);delete c.finish;
            });
        } }), n.each(["toggle", "show", "hide"], function (a, b) {
        var c = n.fn[b];n.fn[b] = function (a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(mb(b, !0), a, d, e);
        };
    }), n.each({ slideDown: mb("show"), slideUp: mb("hide"), slideToggle: mb("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
        n.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), n.timers = [], n.fx.tick = function () {
        var a,
            b = n.timers,
            c = 0;for (hb = n.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);b.length || n.fx.stop(), hb = void 0;
    }, n.fx.timer = function (a) {
        n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
    }, n.fx.interval = 13, n.fx.start = function () {
        ib || (ib = a.setInterval(n.fx.tick, n.fx.interval));
    }, n.fx.stop = function () {
        a.clearInterval(ib), ib = null;
    }, n.fx.speeds = { slow: 600, fast: 200, _default: 400 }, n.fn.delay = function (b, c) {
        return b = n.fx ? n.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
            var e = a.setTimeout(c, b);d.stop = function () {
                a.clearTimeout(e);
            };
        });
    }, function () {
        var a,
            b = d.createElement("input"),
            c = d.createElement("div"),
            e = d.createElement("select"),
            f = e.appendChild(d.createElement("option"));c = d.createElement("div"), c.setAttribute("className", "t"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = c.getElementsByTagName("a")[0], b.setAttribute("type", "checkbox"), c.appendChild(b), a = c.getElementsByTagName("a")[0], a.style.cssText = "top:1px", l.getSetAttribute = "t" !== c.className, l.style = /top/.test(a.getAttribute("style")), l.hrefNormalized = "/a" === a.getAttribute("href"), l.checkOn = !!b.value, l.optSelected = f.selected, l.enctype = !!d.createElement("form").enctype, e.disabled = !0, l.optDisabled = !f.disabled, b = d.createElement("input"), b.setAttribute("value", ""), l.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), l.radioValue = "t" === b.value;
    }();var rb = /\r/g,
        sb = /[\x20\t\r\n\f]+/g;n.fn.extend({ val: function (a) {
            var b,
                c,
                d,
                e = this[0];{
                if (arguments.length) return d = n.isFunction(a), this.each(function (c) {
                    var e;1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function (a) {
                        return null == a ? "" : a + "";
                    })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
                });if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c);
            }
        } }), n.extend({ valHooks: { option: { get: function (a) {
                    var b = n.find.attr(a, "value");return null != b ? b : n.trim(n.text(a)).replace(sb, " ");
                } }, select: { get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, "optgroup"))) {
                        if (b = n(c).val(), f) return b;g.push(b);
                    }return g;
                }, set: function (a, b) {
                    var c,
                        d,
                        e = a.options,
                        f = n.makeArray(b),
                        g = e.length;while (g--) if (d = e[g], n.inArray(n.valHooks.option.get(d), f) > -1) try {
                        d.selected = c = !0;
                    } catch (h) {
                        d.scrollHeight;
                    } else d.selected = !1;return c || (a.selectedIndex = -1), e;
                } } } }), n.each(["radio", "checkbox"], function () {
        n.valHooks[this] = { set: function (a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0;
            } }, l.checkOn || (n.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value;
        });
    });var tb,
        ub,
        vb = n.expr.attrHandle,
        wb = /^(?:checked|selected)$/i,
        xb = l.getSetAttribute,
        yb = l.input;n.fn.extend({ attr: function (a, b) {
            return Y(this, n.attr, a, b, arguments.length > 1);
        }, removeAttr: function (a) {
            return this.each(function () {
                n.removeAttr(this, a);
            });
        } }), n.extend({ attr: function (a, b, c) {
            var d,
                e,
                f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ub : tb)), void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b), null == d ? void 0 : d));
        }, attrHooks: { type: { set: function (a, b) {
                    if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
                        var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                } } }, removeAttr: function (a, b) {
            var c,
                d,
                e = 0,
                f = b && b.match(G);if (f && 1 === a.nodeType) while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) ? yb && xb || !wb.test(c) ? a[d] = !1 : a[n.camelCase("default-" + c)] = a[d] = !1 : n.attr(a, c, ""), a.removeAttribute(xb ? c : d);
        } }), ub = { set: function (a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : yb && xb || !wb.test(c) ? a.setAttribute(!xb && n.propFix[c] || c, c) : a[n.camelCase("default-" + c)] = a[c] = !0, c;
        } }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = vb[b] || n.find.attr;yb && xb || !wb.test(b) ? vb[b] = function (a, b, d) {
            var e, f;return d || (f = vb[b], vb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, vb[b] = f), e;
        } : vb[b] = function (a, b, c) {
            return c ? void 0 : a[n.camelCase("default-" + b)] ? b.toLowerCase() : null;
        };
    }), yb && xb || (n.attrHooks.value = { set: function (a, b, c) {
            return n.nodeName(a, "input") ? void (a.defaultValue = b) : tb && tb.set(a, b, c);
        } }), xb || (tb = { set: function (a, b, c) {
            var d = a.getAttributeNode(c);return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0;
        } }, vb.id = vb.name = vb.coords = function (a, b, c) {
        var d;return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null;
    }, n.valHooks.button = { get: function (a, b) {
            var c = a.getAttributeNode(b);return c && c.specified ? c.value : void 0;
        }, set: tb.set }, n.attrHooks.contenteditable = { set: function (a, b, c) {
            tb.set(a, "" === b ? !1 : b, c);
        } }, n.each(["width", "height"], function (a, b) {
        n.attrHooks[b] = { set: function (a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
            } };
    })), l.style || (n.attrHooks.style = { get: function (a) {
            return a.style.cssText || void 0;
        }, set: function (a, b) {
            return a.style.cssText = b + "";
        } });var zb = /^(?:input|select|textarea|button|object)$/i,
        Ab = /^(?:a|area)$/i;n.fn.extend({ prop: function (a, b) {
            return Y(this, n.prop, a, b, arguments.length > 1);
        }, removeProp: function (a) {
            return a = n.propFix[a] || a, this.each(function () {
                try {
                    this[a] = void 0, delete this[a];
                } catch (b) {}
            });
        } }), n.extend({ prop: function (a, b, c) {
            var d,
                e,
                f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
        }, propHooks: { tabIndex: { get: function (a) {
                    var b = n.find.attr(a, "tabindex");return b ? parseInt(b, 10) : zb.test(a.nodeName) || Ab.test(a.nodeName) && a.href ? 0 : -1;
                } } }, propFix: { "for": "htmlFor", "class": "className" } }), l.hrefNormalized || n.each(["href", "src"], function (a, b) {
        n.propHooks[b] = { get: function (a) {
                return a.getAttribute(b, 4);
            } };
    }), l.optSelected || (n.propHooks.selected = { get: function (a) {
            var b = a.parentNode;return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }, set: function (a) {
            var b = a.parentNode;b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
        } }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        n.propFix[this.toLowerCase()] = this;
    }), l.enctype || (n.propFix.enctype = "encoding");var Bb = /[\t\r\n\f]/g;function Cb(a) {
        return n.attr(a, "class") || "";
    }n.fn.extend({ addClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h,
                i = 0;if (n.isFunction(a)) return this.each(function (b) {
                n(this).addClass(a.call(this, b, Cb(this)));
            });if ("string" == typeof a && a) {
                b = a.match(G) || [];while (c = this[i++]) if (e = Cb(c), d = 1 === c.nodeType && (" " + e + " ").replace(Bb, " ")) {
                    g = 0;while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " ");h = n.trim(d), e !== h && n.attr(c, "class", h);
                }
            }return this;
        }, removeClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h,
                i = 0;if (n.isFunction(a)) return this.each(function (b) {
                n(this).removeClass(a.call(this, b, Cb(this)));
            });if (!arguments.length) return this.attr("class", "");if ("string" == typeof a && a) {
                b = a.match(G) || [];while (c = this[i++]) if (e = Cb(c), d = 1 === c.nodeType && (" " + e + " ").replace(Bb, " ")) {
                    g = 0;while (f = b[g++]) while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " ");h = n.trim(d), e !== h && n.attr(c, "class", h);
                }
            }return this;
        }, toggleClass: function (a, b) {
            var c = typeof a;return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function (c) {
                n(this).toggleClass(a.call(this, c, Cb(this), b), b);
            }) : this.each(function () {
                var b, d, e, f;if ("string" === c) {
                    d = 0, e = n(this), f = a.match(G) || [];while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                } else void 0 !== a && "boolean" !== c || (b = Cb(this), b && n._data(this, "__className__", b), n.attr(this, "class", b || a === !1 ? "" : n._data(this, "__className__") || ""));
            });
        }, hasClass: function (a) {
            var b,
                c,
                d = 0;b = " " + a + " ";while (c = this[d++]) if (1 === c.nodeType && (" " + Cb(c) + " ").replace(Bb, " ").indexOf(b) > -1) return !0;return !1;
        } }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        n.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), n.fn.extend({ hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        } });var Db = a.location,
        Eb = n.now(),
        Fb = /\?/,
        Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON = function (b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");var c,
            d = null,
            e = n.trim(b + "");return e && !n.trim(e.replace(Gb, function (a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "");
        })) ? Function("return " + e)() : n.error("Invalid JSON: " + b);
    }, n.parseXML = function (b) {
        var c, d;if (!b || "string" != typeof b) return null;try {
            a.DOMParser ? (d = new a.DOMParser(), c = d.parseFromString(b, "text/xml")) : (c = new a.ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b));
        } catch (e) {
            c = void 0;
        }return c && c.documentElement && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), c;
    };var Hb = /#.*$/,
        Ib = /([?&])_=[^&]*/,
        Jb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Kb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Lb = /^(?:GET|HEAD)$/,
        Mb = /^\/\//,
        Nb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Ob = {},
        Pb = {},
        Qb = "*/".concat("*"),
        Rb = Db.href,
        Sb = Nb.exec(Rb.toLowerCase()) || [];function Tb(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");var d,
                e = 0,
                f = b.toLowerCase().match(G) || [];if (n.isFunction(c)) while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }function Ub(a, b, c, d) {
        var e = {},
            f = a === Pb;function g(h) {
            var i;return e[h] = !0, n.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
            }), i;
        }return g(b.dataTypes[0]) || !e["*"] && g("*");
    }function Vb(a, b) {
        var c,
            d,
            e = n.ajaxSettings.flatOptions || {};for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);return c && n.extend(!0, a, c), a;
    }function Wb(a, b, c) {
        var d,
            e,
            f,
            g,
            h = a.contents,
            i = a.dataTypes;while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));if (e) for (g in h) if (h[g] && h[g].test(e)) {
            i.unshift(g);break;
        }if (i[0] in c) f = i[0];else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;break;
                }d || (d = g);
            }f = f || d;
        }return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }function Xb(a, b, c, d) {
        var e,
            f,
            g,
            h,
            i,
            j = {},
            k = a.dataTypes.slice();if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];f = k.shift();while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break;
            }if (g !== !0) if (g && a["throws"]) b = g(b);else try {
                b = g(b);
            } catch (l) {
                return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
            }
        }return { state: "success", data: b };
    }n.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Rb, type: "GET", isLocal: Kb.test(Sb[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Qb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": n.parseJSON, "text xml": n.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (a, b) {
            return b ? Vb(Vb(a, n.ajaxSettings), b) : Vb(n.ajaxSettings, a);
        }, ajaxPrefilter: Tb(Ob), ajaxTransport: Tb(Pb), ajax: function (b, c) {
            "object" == typeof b && (c = b, b = void 0), c = c || {};var d,
                e,
                f,
                g,
                h,
                i,
                j,
                k,
                l = n.ajaxSetup({}, c),
                m = l.context || l,
                o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event,
                p = n.Deferred(),
                q = n.Callbacks("once memory"),
                r = l.statusCode || {},
                s = {},
                t = {},
                u = 0,
                v = "canceled",
                w = { readyState: 0, getResponseHeader: function (a) {
                    var b;if (2 === u) {
                        if (!k) {
                            k = {};while (b = Jb.exec(g)) k[b[1].toLowerCase()] = b[2];
                        }b = k[a.toLowerCase()];
                    }return null == b ? null : b;
                }, getAllResponseHeaders: function () {
                    return 2 === u ? g : null;
                }, setRequestHeader: function (a, b) {
                    var c = a.toLowerCase();return u || (a = t[c] = t[c] || a, s[a] = b), this;
                }, overrideMimeType: function (a) {
                    return u || (l.mimeType = a), this;
                }, statusCode: function (a) {
                    var b;if (a) if (2 > u) for (b in a) r[b] = [r[b], a[b]];else w.always(a[w.status]);return this;
                }, abort: function (a) {
                    var b = a || v;return j && j.abort(b), y(0, b), this;
                } };if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, l.url = ((b || l.url || Rb) + "").replace(Hb, "").replace(Mb, Sb[1] + "//"), l.type = c.method || c.type || l.method || l.type, l.dataTypes = n.trim(l.dataType || "*").toLowerCase().match(G) || [""], null == l.crossDomain && (d = Nb.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Sb[1] && d[2] === Sb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Sb[3] || ("http:" === Sb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = n.param(l.data, l.traditional)), Ub(Ob, l, c, w), 2 === u) return w;i = n.event && l.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Lb.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fb.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Ib.test(f) ? f.replace(Ib, "$1_=" + Eb++) : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)), l.ifModified && (n.lastModified[f] && w.setRequestHeader("If-Modified-Since", n.lastModified[f]), n.etag[f] && w.setRequestHeader("If-None-Match", n.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Qb + "; q=0.01" : "") : l.accepts["*"]);for (e in l.headers) w.setRequestHeader(e, l.headers[e]);if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u)) return w.abort();v = "abort";for (e in { success: 1, error: 1, complete: 1 }) w[e](l[e]);if (j = Ub(Pb, l, c, w)) {
                if (w.readyState = 1, i && o.trigger("ajaxSend", [w, l]), 2 === u) return w;l.async && l.timeout > 0 && (h = a.setTimeout(function () {
                    w.abort("timeout");
                }, l.timeout));try {
                    u = 1, j.send(s, y);
                } catch (x) {
                    if (!(2 > u)) throw x;y(-1, x);
                }
            } else y(-1, "No Transport");function y(b, c, d, e) {
                var k,
                    s,
                    t,
                    v,
                    x,
                    y = c;2 !== u && (u = 2, h && a.clearTimeout(h), j = void 0, g = e || "", w.readyState = b > 0 ? 4 : 0, k = b >= 200 && 300 > b || 304 === b, d && (v = Wb(l, w, d)), v = Xb(l, v, w, k), k ? (l.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (n.lastModified[f] = x), x = w.getResponseHeader("etag"), x && (n.etag[f] = x)), 204 === b || "HEAD" === l.type ? y = "nocontent" : 304 === b ? y = "notmodified" : (y = v.state, s = v.data, t = v.error, k = !t)) : (t = y, !b && y || (y = "error", 0 > b && (b = 0))), w.status = b, w.statusText = (c || y) + "", k ? p.resolveWith(m, [s, y, w]) : p.rejectWith(m, [w, y, t]), w.statusCode(r), r = void 0, i && o.trigger(k ? "ajaxSuccess" : "ajaxError", [w, l, k ? s : t]), q.fireWith(m, [w, y]), i && (o.trigger("ajaxComplete", [w, l]), --n.active || n.event.trigger("ajaxStop")));
            }return w;
        }, getJSON: function (a, b, c) {
            return n.get(a, b, c, "json");
        }, getScript: function (a, b) {
            return n.get(a, void 0, b, "script");
        } }), n.each(["get", "post"], function (a, b) {
        n[b] = function (a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax(n.extend({ url: a, type: b, dataType: e, data: c, success: d }, n.isPlainObject(a) && a));
        };
    }), n._evalUrl = function (a) {
        return n.ajax({ url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 });
    }, n.fn.extend({ wrapAll: function (a) {
            if (n.isFunction(a)) return this.each(function (b) {
                n(this).wrapAll(a.call(this, b));
            });if (this[0]) {
                var b = n(a, this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;return a;
                }).append(this);
            }return this;
        }, wrapInner: function (a) {
            return n.isFunction(a) ? this.each(function (b) {
                n(this).wrapInner(a.call(this, b));
            }) : this.each(function () {
                var b = n(this),
                    c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
            });
        }, wrap: function (a) {
            var b = n.isFunction(a);return this.each(function (c) {
                n(this).wrapAll(b ? a.call(this, c) : a);
            });
        }, unwrap: function () {
            return this.parent().each(function () {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
            }).end();
        } });function Yb(a) {
        return a.style && a.style.display || n.css(a, "display");
    }function Zb(a) {
        if (!n.contains(a.ownerDocument || d, a)) return !0;while (a && 1 === a.nodeType) {
            if ("none" === Yb(a) || "hidden" === a.type) return !0;a = a.parentNode;
        }return !1;
    }n.expr.filters.hidden = function (a) {
        return l.reliableHiddenOffsets() ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length : Zb(a);
    }, n.expr.filters.visible = function (a) {
        return !n.expr.filters.hidden(a);
    };var $b = /%20/g,
        _b = /\[\]$/,
        ac = /\r?\n/g,
        bc = /^(?:submit|button|image|reset|file)$/i,
        cc = /^(?:input|select|textarea|keygen)/i;function dc(a, b, c, d) {
        var e;if (n.isArray(b)) n.each(b, function (b, e) {
            c || _b.test(a) ? d(a, e) : dc(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d);
        });else if (c || "object" !== n.type(b)) d(a, b);else for (e in b) dc(a + "[" + e + "]", b[e], c, d);
    }n.param = function (a, b) {
        var c,
            d = [],
            e = function (a, b) {
            b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function () {
            e(this.name, this.value);
        });else for (c in a) dc(c, a[c], b, e);return d.join("&").replace($b, "+");
    }, n.fn.extend({ serialize: function () {
            return n.param(this.serializeArray());
        }, serializeArray: function () {
            return this.map(function () {
                var a = n.prop(this, "elements");return a ? n.makeArray(a) : this;
            }).filter(function () {
                var a = this.type;return this.name && !n(this).is(":disabled") && cc.test(this.nodeName) && !bc.test(a) && (this.checked || !Z.test(a));
            }).map(function (a, b) {
                var c = n(this).val();return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
                    return { name: b.name, value: a.replace(ac, "\r\n") };
                }) : { name: b.name, value: c.replace(ac, "\r\n") };
            }).get();
        } }), n.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
        return this.isLocal ? ic() : d.documentMode > 8 ? hc() : /^(get|post|head|put|delete|options)$/i.test(this.type) && hc() || ic();
    } : hc;var ec = 0,
        fc = {},
        gc = n.ajaxSettings.xhr();a.attachEvent && a.attachEvent("onunload", function () {
        for (var a in fc) fc[a](void 0, !0);
    }), l.cors = !!gc && "withCredentials" in gc, gc = l.ajax = !!gc, gc && n.ajaxTransport(function (b) {
        if (!b.crossDomain || l.cors) {
            var c;return { send: function (d, e) {
                    var f,
                        g = b.xhr(),
                        h = ++ec;if (g.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (f in b.xhrFields) g[f] = b.xhrFields[f];b.mimeType && g.overrideMimeType && g.overrideMimeType(b.mimeType), b.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");for (f in d) void 0 !== d[f] && g.setRequestHeader(f, d[f] + "");g.send(b.hasContent && b.data || null), c = function (a, d) {
                        var f, i, j;if (c && (d || 4 === g.readyState)) if (delete fc[h], c = void 0, g.onreadystatechange = n.noop, d) 4 !== g.readyState && g.abort();else {
                            j = {}, f = g.status, "string" == typeof g.responseText && (j.text = g.responseText);try {
                                i = g.statusText;
                            } catch (k) {
                                i = "";
                            }f || !b.isLocal || b.crossDomain ? 1223 === f && (f = 204) : f = j.text ? 200 : 404;
                        }j && e(f, i, j, g.getAllResponseHeaders());
                    }, b.async ? 4 === g.readyState ? a.setTimeout(c) : g.onreadystatechange = fc[h] = c : c();
                }, abort: function () {
                    c && c(void 0, !0);
                } };
        }
    });function hc() {
        try {
            return new a.XMLHttpRequest();
        } catch (b) {}
    }function ic() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }n.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function (a) {
                return n.globalEval(a), a;
            } } }), n.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), n.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b,
                c = d.head || n("head")[0] || d.documentElement;return { send: function (e, f) {
                    b = d.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || f(200, "success"));
                    }, c.insertBefore(b, c.firstChild);
                }, abort: function () {
                    b && b.onload(void 0, !0);
                } };
        }
    });var jc = [],
        kc = /(=)\?(?=&|$)|\?\?/;n.ajaxSetup({ jsonp: "callback", jsonpCallback: function () {
            var a = jc.pop() || n.expando + "_" + Eb++;return this[a] = !0, a;
        } }), n.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e,
            f,
            g,
            h = b.jsonp !== !1 && (kc.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && kc.test(b.data) && "data");return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(kc, "$1" + e) : b.jsonp !== !1 && (b.url += (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
            return g || n.error(e + " was not called"), g[0];
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
            g = arguments;
        }, d.always(function () {
            void 0 === f ? n(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, jc.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;
        }), "script") : void 0;
    }), n.parseHTML = function (a, b, c) {
        if (!a || "string" != typeof a) return null;"boolean" == typeof b && (c = b, b = !1), b = b || d;var e = x.exec(a),
            f = !c && [];return e ? [b.createElement(e[1])] : (e = ja([a], b, f), f && f.length && n(f).remove(), n.merge([], e.childNodes));
    };var lc = n.fn.load;n.fn.load = function (a, b, c) {
        if ("string" != typeof a && lc) return lc.apply(this, arguments);var d,
            e,
            f,
            g = this,
            h = a.indexOf(" ");return h > -1 && (d = n.trim(a.slice(h, a.length)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({ url: a, type: e || "GET", dataType: "html", data: b }).done(function (a) {
            f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
        }).always(c && function (a, b) {
            g.each(function () {
                c.apply(this, f || [a.responseText, b, a]);
            });
        }), this;
    }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        n.fn[b] = function (a) {
            return this.on(b, a);
        };
    }), n.expr.filters.animated = function (a) {
        return n.grep(n.timers, function (b) {
            return a === b.elem;
        }).length;
    };function mc(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
    }n.offset = { setOffset: function (a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j,
                k = n.css(a, "position"),
                l = n(a),
                m = {};"static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && n.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
        } }, n.fn.extend({ offset: function (a) {
            if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                n.offset.setOffset(this, a, b);
            });var b,
                c,
                d = { top: 0, left: 0 },
                e = this[0],
                f = e && e.ownerDocument;if (f) return b = f.documentElement, n.contains(b, e) ? ("undefined" != typeof e.getBoundingClientRect && (d = e.getBoundingClientRect()), c = mc(f), { top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0) }) : d;
        }, position: function () {
            if (this[0]) {
                var a,
                    b,
                    c = { top: 0, left: 0 },
                    d = this[0];return "fixed" === n.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (c = a.offset()), c.top += n.css(a[0], "borderTopWidth", !0), c.left += n.css(a[0], "borderLeftWidth", !0)), { top: b.top - c.top - n.css(d, "marginTop", !0), left: b.left - c.left - n.css(d, "marginLeft", !0) };
            }
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent;while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) a = a.offsetParent;return a || Qa;
            });
        } }), n.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
        var c = /Y/.test(b);n.fn[a] = function (d) {
            return Y(this, function (a, d, e) {
                var f = mc(a);return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e);
            }, a, d, arguments.length, null);
        };
    }), n.each(["top", "left"], function (a, b) {
        n.cssHooks[b] = Ua(l.pixelPosition, function (a, c) {
            return c ? (c = Sa(a, b), Oa.test(c) ? n(a).position()[b] + "px" : c) : void 0;
        });
    }), n.each({ Height: "height", Width: "width" }, function (a, b) {
        n.each({
            padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
            n.fn[d] = function (d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");return Y(this, function (b, c, d) {
                    var e;return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);
                }, b, f ? d : void 0, f, null);
            };
        });
    }), n.fn.extend({ bind: function (a, b, c) {
            return this.on(a, null, b, c);
        }, unbind: function (a, b) {
            return this.off(a, null, b);
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d);
        }, undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
        } }), n.fn.size = function () {
        return this.length;
    }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return n;
    });var nc = a.jQuery,
        oc = a.$;return n.noConflict = function (b) {
        return a.$ === n && (a.$ = oc), b && a.jQuery === n && (a.jQuery = nc), n;
    }, b || (a.jQuery = a.$ = n), n;
});
/**
*  Ajax Autocomplete for jQuery, version 1.4.7
*  (c) 2017 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
*/
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports && "function" == typeof require ? require("jquery") : jQuery);
}(function (a) {
    "use strict";
    function b(c, d) {
        var e = this;e.element = c, e.el = a(c), e.suggestions = [], e.badQueries = [], e.selectedIndex = -1, e.currentValue = e.element.value, e.timeoutId = null, e.cachedResponse = {}, e.onChangeTimeout = null, e.onChange = null, e.isLocal = !1, e.suggestionsContainer = null, e.noSuggestionsContainer = null, e.options = a.extend({}, b.defaults, d), e.classes = { selected: "autocomplete-selected", suggestion: "autocomplete-suggestion" }, e.hint = null, e.hintValue = "", e.selection = null, e.initialize(), e.setOptions(d);
    }function c(a, b, c) {
        return a.value.toLowerCase().indexOf(c) !== -1;
    }function d(b) {
        return "string" == typeof b ? a.parseJSON(b) : b;
    }function e(a, b) {
        if (!b) return a.value;var c = "(" + g.escapeRegExChars(b) + ")";return a.value.replace(new RegExp(c, "gi"), "<strong>$1</strong>").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&lt;(\/?strong)&gt;/g, "<$1>");
    }function f(a, b) {
        return '<div class="autocomplete-group">' + b + "</div>";
    }var g = function () {
        return { escapeRegExChars: function (a) {
                return a.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
            }, createNode: function (a) {
                var b = document.createElement("div");return b.className = a, b.style.position = "absolute", b.style.display = "none", b;
            } };
    }(),
        h = { ESC: 27, TAB: 9, RETURN: 13, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 },
        i = a.noop;b.utils = g, a.Autocomplete = b, b.defaults = { ajaxSettings: {}, autoSelectFirst: !1, appendTo: "body", serviceUrl: null, lookup: null, onSelect: null, width: "auto", minChars: 1, maxHeight: 300, deferRequestBy: 0, params: {}, formatResult: e, formatGroup: f, delimiter: null, zIndex: 9999, type: "GET", noCache: !1, onSearchStart: i, onSearchComplete: i, onSearchError: i, preserveInput: !1, containerClass: "autocomplete-suggestions", tabDisabled: !1, dataType: "text", currentRequest: null, triggerSelectOnValidInput: !0, preventBadQueries: !0, lookupFilter: c, paramName: "query", transformResult: d, showNoSuggestionNotice: !1, noSuggestionNotice: "No results", orientation: "bottom", forceFixPosition: !1 }, b.prototype = { initialize: function () {
            var c,
                d = this,
                e = "." + d.classes.suggestion,
                f = d.classes.selected,
                g = d.options;d.element.setAttribute("autocomplete", "off"), d.noSuggestionsContainer = a('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0), d.suggestionsContainer = b.utils.createNode(g.containerClass), c = a(d.suggestionsContainer), c.appendTo(g.appendTo || "body"), "auto" !== g.width && c.css("width", g.width), c.on("mouseover.autocomplete", e, function () {
                d.activate(a(this).data("index"));
            }), c.on("mouseout.autocomplete", function () {
                d.selectedIndex = -1, c.children("." + f).removeClass(f);
            }), c.on("click.autocomplete", e, function () {
                d.select(a(this).data("index"));
            }), c.on("click.autocomplete", function () {
                clearTimeout(d.blurTimeoutId);
            }), d.fixPositionCapture = function () {
                d.visible && d.fixPosition();
            }, a(window).on("resize.autocomplete", d.fixPositionCapture), d.el.on("keydown.autocomplete", function (a) {
                d.onKeyPress(a);
            }), d.el.on("keyup.autocomplete", function (a) {
                d.onKeyUp(a);
            }), d.el.on("blur.autocomplete", function () {
                d.onBlur();
            }), d.el.on("focus.autocomplete", function () {
                d.onFocus();
            }), d.el.on("change.autocomplete", function (a) {
                d.onKeyUp(a);
            }), d.el.on("input.autocomplete", function (a) {
                d.onKeyUp(a);
            });
        }, onFocus: function () {
            var a = this;a.fixPosition(), a.el.val().length >= a.options.minChars && a.onValueChange();
        }, onBlur: function () {
            var a = this;a.blurTimeoutId = setTimeout(function () {
                a.hide();
            }, 200);
        }, abortAjax: function () {
            var a = this;a.currentRequest && (a.currentRequest.abort(), a.currentRequest = null);
        }, setOptions: function (b) {
            var c = this,
                d = a.extend({}, c.options, b);c.isLocal = Array.isArray(d.lookup), c.isLocal && (d.lookup = c.verifySuggestionsFormat(d.lookup)), d.orientation = c.validateOrientation(d.orientation, "bottom"), a(c.suggestionsContainer).css({ "max-height": d.maxHeight + "px", width: d.width + "px", "z-index": d.zIndex }), this.options = d;
        }, clearCache: function () {
            this.cachedResponse = {}, this.badQueries = [];
        }, clear: function () {
            this.clearCache(), this.currentValue = "", this.suggestions = [];
        }, disable: function () {
            var a = this;a.disabled = !0, clearTimeout(a.onChangeTimeout), a.abortAjax();
        }, enable: function () {
            this.disabled = !1;
        }, fixPosition: function () {
            var b = this,
                c = a(b.suggestionsContainer),
                d = c.parent().get(0);if (d === document.body || b.options.forceFixPosition) {
                var e = b.options.orientation,
                    f = c.outerHeight(),
                    g = b.el.outerHeight(),
                    h = b.el.offset(),
                    i = { top: h.top, left: h.left };if ("auto" === e) {
                    var j = a(window).height(),
                        k = a(window).scrollTop(),
                        l = -k + h.top - f,
                        m = k + j - (h.top + g + f);e = Math.max(l, m) === l ? "top" : "bottom";
                }if ("top" === e ? i.top += -f : i.top += g, d !== document.body) {
                    var n,
                        o = c.css("opacity");b.visible || c.css("opacity", 0).show(), n = c.offsetParent().offset(), i.top -= n.top, i.top += d.scrollTop, i.left -= n.left, b.visible || c.css("opacity", o).hide();
                }"auto" === b.options.width && (i.width = b.el.outerWidth() + "px"), c.css(i);
            }
        }, isCursorAtEnd: function () {
            var a,
                b = this,
                c = b.el.val().length,
                d = b.element.selectionStart;return "number" == typeof d ? d === c : !document.selection || (a = document.selection.createRange(), a.moveStart("character", -c), c === a.text.length);
        }, onKeyPress: function (a) {
            var b = this;if (!b.disabled && !b.visible && a.which === h.DOWN && b.currentValue) return void b.suggest();if (!b.disabled && b.visible) {
                switch (a.which) {case h.ESC:
                        b.el.val(b.currentValue), b.hide();break;case h.RIGHT:
                        if (b.hint && b.options.onHint && b.isCursorAtEnd()) {
                            b.selectHint();break;
                        }return;case h.TAB:
                        if (b.hint && b.options.onHint) return void b.selectHint();if (b.selectedIndex === -1) return void b.hide();if (b.select(b.selectedIndex), b.options.tabDisabled === !1) return;break;case h.RETURN:
                        if (b.selectedIndex === -1) return void b.hide();b.select(b.selectedIndex);break;case h.UP:
                        b.moveUp();break;case h.DOWN:
                        b.moveDown();break;default:
                        return;}a.stopImmediatePropagation(), a.preventDefault();
            }
        }, onKeyUp: function (a) {
            var b = this;if (!b.disabled) {
                switch (a.which) {case h.UP:case h.DOWN:
                        return;}clearTimeout(b.onChangeTimeout), b.currentValue !== b.el.val() && (b.findBestHint(), b.options.deferRequestBy > 0 ? b.onChangeTimeout = setTimeout(function () {
                    b.onValueChange();
                }, b.options.deferRequestBy) : b.onValueChange());
            }
        }, onValueChange: function () {
            if (this.ignoreValueChange) return void (this.ignoreValueChange = !1);var b = this,
                c = b.options,
                d = b.el.val(),
                e = b.getQuery(d);return b.selection && b.currentValue !== e && (b.selection = null, (c.onInvalidateSelection || a.noop).call(b.element)), clearTimeout(b.onChangeTimeout), b.currentValue = d, b.selectedIndex = -1, c.triggerSelectOnValidInput && b.isExactMatch(e) ? void b.select(0) : void (e.length < c.minChars ? b.hide() : b.getSuggestions(e));
        }, isExactMatch: function (a) {
            var b = this.suggestions;return 1 === b.length && b[0].value.toLowerCase() === a.toLowerCase();
        }, getQuery: function (b) {
            var c,
                d = this.options.delimiter;return d ? (c = b.split(d), a.trim(c[c.length - 1])) : b;
        }, getSuggestionsLocal: function (b) {
            var c,
                d = this,
                e = d.options,
                f = b.toLowerCase(),
                g = e.lookupFilter,
                h = parseInt(e.lookupLimit, 10);return c = { suggestions: a.grep(e.lookup, function (a) {
                    return g(a, b, f);
                }) }, h && c.suggestions.length > h && (c.suggestions = c.suggestions.slice(0, h)), c;
        }, getSuggestions: function (b) {
            var c,
                d,
                e,
                f,
                g = this,
                h = g.options,
                i = h.serviceUrl;if (h.params[h.paramName] = b, h.onSearchStart.call(g.element, h.params) !== !1) {
                if (d = h.ignoreParams ? null : h.params, a.isFunction(h.lookup)) return void h.lookup(b, function (a) {
                    g.suggestions = a.suggestions, g.suggest(), h.onSearchComplete.call(g.element, b, a.suggestions);
                });g.isLocal ? c = g.getSuggestionsLocal(b) : (a.isFunction(i) && (i = i.call(g.element, b)), e = i + "?" + a.param(d || {}), c = g.cachedResponse[e]), c && Array.isArray(c.suggestions) ? (g.suggestions = c.suggestions, g.suggest(), h.onSearchComplete.call(g.element, b, c.suggestions)) : g.isBadQuery(b) ? h.onSearchComplete.call(g.element, b, []) : (g.abortAjax(), f = { url: i, data: d, type: h.type, dataType: h.dataType }, a.extend(f, h.ajaxSettings), g.currentRequest = a.ajax(f).done(function (a) {
                    var c;g.currentRequest = null, c = h.transformResult(a, b), g.processResponse(c, b, e), h.onSearchComplete.call(g.element, b, c.suggestions);
                }).fail(function (a, c, d) {
                    h.onSearchError.call(g.element, b, a, c, d);
                }));
            }
        }, isBadQuery: function (a) {
            if (!this.options.preventBadQueries) return !1;for (var b = this.badQueries, c = b.length; c--;) if (0 === a.indexOf(b[c])) return !0;return !1;
        }, hide: function () {
            var b = this,
                c = a(b.suggestionsContainer);a.isFunction(b.options.onHide) && b.visible && b.options.onHide.call(b.element, c), b.visible = !1, b.selectedIndex = -1, clearTimeout(b.onChangeTimeout), a(b.suggestionsContainer).hide(), b.signalHint(null);
        }, suggest: function () {
            if (!this.suggestions.length) return void (this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide());var b,
                c = this,
                d = c.options,
                e = d.groupBy,
                f = d.formatResult,
                g = c.getQuery(c.currentValue),
                h = c.classes.suggestion,
                i = c.classes.selected,
                j = a(c.suggestionsContainer),
                k = a(c.noSuggestionsContainer),
                l = d.beforeRender,
                m = "",
                n = function (a, c) {
                var f = a.data[e];return b === f ? "" : (b = f, d.formatGroup(a, b));
            };return d.triggerSelectOnValidInput && c.isExactMatch(g) ? void c.select(0) : (a.each(c.suggestions, function (a, b) {
                e && (m += n(b, g, a)), m += '<div class="' + h + '" data-index="' + a + '">' + f(b, g, a) + "</div>";
            }), this.adjustContainerWidth(), k.detach(), j.html(m), a.isFunction(l) && l.call(c.element, j, c.suggestions), c.fixPosition(), j.show(), d.autoSelectFirst && (c.selectedIndex = 0, j.scrollTop(0), j.children("." + h).first().addClass(i)), c.visible = !0, void c.findBestHint());
        }, noSuggestions: function () {
            var b = this,
                c = b.options.beforeRender,
                d = a(b.suggestionsContainer),
                e = a(b.noSuggestionsContainer);this.adjustContainerWidth(), e.detach(), d.empty(), d.append(e), a.isFunction(c) && c.call(b.element, d, b.suggestions), b.fixPosition(), d.show(), b.visible = !0;
        }, adjustContainerWidth: function () {
            var b,
                c = this,
                d = c.options,
                e = a(c.suggestionsContainer);"auto" === d.width ? (b = c.el.outerWidth(), e.css("width", b > 0 ? b : 300)) : "flex" === d.width && e.css("width", "");
        }, findBestHint: function () {
            var b = this,
                c = b.el.val().toLowerCase(),
                d = null;c && (a.each(b.suggestions, function (a, b) {
                var e = 0 === b.value.toLowerCase().indexOf(c);return e && (d = b), !e;
            }), b.signalHint(d));
        }, signalHint: function (b) {
            var c = "",
                d = this;b && (c = d.currentValue + b.value.substr(d.currentValue.length)), d.hintValue !== c && (d.hintValue = c, d.hint = b, (this.options.onHint || a.noop)(c));
        }, verifySuggestionsFormat: function (b) {
            return b.length && "string" == typeof b[0] ? a.map(b, function (a) {
                return { value: a, data: null };
            }) : b;
        }, validateOrientation: function (b, c) {
            return b = a.trim(b || "").toLowerCase(), a.inArray(b, ["auto", "bottom", "top"]) === -1 && (b = c), b;
        }, processResponse: function (a, b, c) {
            var d = this,
                e = d.options;a.suggestions = d.verifySuggestionsFormat(a.suggestions), e.noCache || (d.cachedResponse[c] = a, e.preventBadQueries && !a.suggestions.length && d.badQueries.push(b)), b === d.getQuery(d.currentValue) && (d.suggestions = a.suggestions, d.suggest());
        }, activate: function (b) {
            var c,
                d = this,
                e = d.classes.selected,
                f = a(d.suggestionsContainer),
                g = f.find("." + d.classes.suggestion);return f.find("." + e).removeClass(e), d.selectedIndex = b, d.selectedIndex !== -1 && g.length > d.selectedIndex ? (c = g.get(d.selectedIndex), a(c).addClass(e), c) : null;
        }, selectHint: function () {
            var b = this,
                c = a.inArray(b.hint, b.suggestions);b.select(c);
        }, select: function (a) {
            var b = this;b.hide(), b.onSelect(a);
        }, moveUp: function () {
            var b = this;if (b.selectedIndex !== -1) return 0 === b.selectedIndex ? (a(b.suggestionsContainer).children("." + b.classes.suggestion).first().removeClass(b.classes.selected), b.selectedIndex = -1, b.ignoreValueChange = !1, b.el.val(b.currentValue), void b.findBestHint()) : void b.adjustScroll(b.selectedIndex - 1);
        }, moveDown: function () {
            var a = this;a.selectedIndex !== a.suggestions.length - 1 && a.adjustScroll(a.selectedIndex + 1);
        }, adjustScroll: function (b) {
            var c = this,
                d = c.activate(b);if (d) {
                var e,
                    f,
                    g,
                    h = a(d).outerHeight();e = d.offsetTop, f = a(c.suggestionsContainer).scrollTop(), g = f + c.options.maxHeight - h, e < f ? a(c.suggestionsContainer).scrollTop(e) : e > g && a(c.suggestionsContainer).scrollTop(e - c.options.maxHeight + h), c.options.preserveInput || (c.ignoreValueChange = !0, c.el.val(c.getValue(c.suggestions[b].value))), c.signalHint(null);
            }
        }, onSelect: function (b) {
            var c = this,
                d = c.options.onSelect,
                e = c.suggestions[b];c.currentValue = c.getValue(e.value), c.currentValue === c.el.val() || c.options.preserveInput || c.el.val(c.currentValue), c.signalHint(null), c.suggestions = [], c.selection = e, a.isFunction(d) && d.call(c.element, e);
        }, getValue: function (a) {
            var b,
                c,
                d = this,
                e = d.options.delimiter;return e ? (b = d.currentValue, c = b.split(e), 1 === c.length ? a : b.substr(0, b.length - c[c.length - 1].length) + a) : a;
        }, dispose: function () {
            var b = this;b.el.off(".autocomplete").removeData("autocomplete"), a(window).off("resize.autocomplete", b.fixPositionCapture), a(b.suggestionsContainer).remove();
        } }, a.fn.devbridgeAutocomplete = function (c, d) {
        var e = "autocomplete";return arguments.length ? this.each(function () {
            var f = a(this),
                g = f.data(e);"string" == typeof c ? g && "function" == typeof g[c] && g[c](d) : (g && g.dispose && g.dispose(), g = new b(this, c), f.data(e, g));
        }) : this.first().data(e);
    }, a.fn.autocomplete || (a.fn.autocomplete = a.fn.devbridgeAutocomplete);
});
/*
 * Swiper 2.7.6
 * Mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2010-2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: February 11, 2015
*/
var Swiper = function (a, b) {
    "use strict";
    function c(a, b) {
        return document.querySelectorAll ? (b || document).querySelectorAll(a) : jQuery(a, b);
    }function d(a) {
        return "[object Array]" === Object.prototype.toString.apply(a) ? !0 : !1;
    }function e() {
        var a = G - J;return b.freeMode && (a = G - J), b.slidesPerView > D.slides.length && !b.centeredSlides && (a = 0), 0 > a && (a = 0), a;
    }function f() {
        function a(a) {
            var c,
                d,
                e = function () {
                "undefined" != typeof D && null !== D && (void 0 !== D.imagesLoaded && D.imagesLoaded++, D.imagesLoaded === D.imagesToLoad.length && (D.reInit(), b.onImagesReady && D.fireCallback(b.onImagesReady, D)));
            };a.complete ? e() : (d = a.currentSrc || a.getAttribute("src"), d ? (c = new Image(), c.onload = e, c.onerror = e, c.src = d) : e());
        }var d = D.h.addEventListener,
            e = "wrapper" === b.eventTarget ? D.wrapper : D.container;if (D.browser.ie10 || D.browser.ie11 ? (d(e, D.touchEvents.touchStart, p), d(document, D.touchEvents.touchMove, q), d(document, D.touchEvents.touchEnd, r)) : (D.support.touch && (d(e, "touchstart", p), d(e, "touchmove", q), d(e, "touchend", r)), b.simulateTouch && (d(e, "mousedown", p), d(document, "mousemove", q), d(document, "mouseup", r))), b.autoResize && d(window, "resize", D.resizeFix), g(), D._wheelEvent = !1, b.mousewheelControl) {
            if (void 0 !== document.onmousewheel && (D._wheelEvent = "mousewheel"), !D._wheelEvent) try {
                new WheelEvent("wheel"), D._wheelEvent = "wheel";
            } catch (f) {}D._wheelEvent || (D._wheelEvent = "DOMMouseScroll"), D._wheelEvent && d(D.container, D._wheelEvent, j);
        }if (b.keyboardControl && d(document, "keydown", i), b.updateOnImagesReady) {
            D.imagesToLoad = c("img", D.container);for (var h = 0; h < D.imagesToLoad.length; h++) a(D.imagesToLoad[h]);
        }
    }function g() {
        var a,
            d = D.h.addEventListener;if (b.preventLinks) {
            var e = c("a", D.container);for (a = 0; a < e.length; a++) d(e[a], "click", n);
        }if (b.releaseFormElements) {
            var f = c("input, textarea, select", D.container);for (a = 0; a < f.length; a++) d(f[a], D.touchEvents.touchStart, o, !0), D.support.touch && b.simulateTouch && d(f[a], "mousedown", o, !0);
        }if (b.onSlideClick) for (a = 0; a < D.slides.length; a++) d(D.slides[a], "click", k);if (b.onSlideTouch) for (a = 0; a < D.slides.length; a++) d(D.slides[a], D.touchEvents.touchStart, l);
    }function h() {
        var a,
            d = D.h.removeEventListener;if (b.onSlideClick) for (a = 0; a < D.slides.length; a++) d(D.slides[a], "click", k);if (b.onSlideTouch) for (a = 0; a < D.slides.length; a++) d(D.slides[a], D.touchEvents.touchStart, l);if (b.releaseFormElements) {
            var e = c("input, textarea, select", D.container);for (a = 0; a < e.length; a++) d(e[a], D.touchEvents.touchStart, o, !0), D.support.touch && b.simulateTouch && d(e[a], "mousedown", o, !0);
        }if (b.preventLinks) {
            var f = c("a", D.container);for (a = 0; a < f.length; a++) d(f[a], "click", n);
        }
    }function i(a) {
        var b = a.keyCode || a.charCode;if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey)) {
            if (37 === b || 39 === b || 38 === b || 40 === b) {
                for (var c = !1, d = D.h.getOffset(D.container), e = D.h.windowScroll().left, f = D.h.windowScroll().top, g = D.h.windowWidth(), h = D.h.windowHeight(), i = [[d.left, d.top], [d.left + D.width, d.top], [d.left, d.top + D.height], [d.left + D.width, d.top + D.height]], j = 0; j < i.length; j++) {
                    var k = i[j];k[0] >= e && k[0] <= e + g && k[1] >= f && k[1] <= f + h && (c = !0);
                }if (!c) return;
            }N ? ((37 === b || 39 === b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 39 === b && D.swipeNext(), 37 === b && D.swipePrev()) : ((38 === b || 40 === b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 40 === b && D.swipeNext(), 38 === b && D.swipePrev());
        }
    }function j(a) {
        var c = D._wheelEvent,
            d = 0;if (a.detail) d = -a.detail;else if ("mousewheel" === c) {
            if (b.mousewheelControlForceToAxis) {
                if (N) {
                    if (!(Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY))) return;d = a.wheelDeltaX;
                } else {
                    if (!(Math.abs(a.wheelDeltaY) > Math.abs(a.wheelDeltaX))) return;d = a.wheelDeltaY;
                }
            } else d = a.wheelDelta;
        } else if ("DOMMouseScroll" === c) d = -a.detail;else if ("wheel" === c) if (b.mousewheelControlForceToAxis) {
            if (N) {
                if (!(Math.abs(a.deltaX) > Math.abs(a.deltaY))) return;d = -a.deltaX;
            } else {
                if (!(Math.abs(a.deltaY) > Math.abs(a.deltaX))) return;d = -a.deltaY;
            }
        } else d = Math.abs(a.deltaX) > Math.abs(a.deltaY) ? -a.deltaX : -a.deltaY;if (b.freeMode) {
            var f = D.getWrapperTranslate() + d;if (f > 0 && (f = 0), f < -e() && (f = -e()), D.setWrapperTransition(0), D.setWrapperTranslate(f), D.updateActiveSlide(f), 0 === f || f === -e()) return;
        } else new Date().getTime() - V > 60 && (0 > d ? D.swipeNext() : D.swipePrev()), V = new Date().getTime();return b.autoplay && D.stopAutoplay(!0), a.preventDefault ? a.preventDefault() : a.returnValue = !1, !1;
    }function k(a) {
        D.allowSlideClick && (m(a), D.fireCallback(b.onSlideClick, D, a));
    }function l(a) {
        m(a), D.fireCallback(b.onSlideTouch, D, a);
    }function m(a) {
        if (a.currentTarget) D.clickedSlide = a.currentTarget;else {
            var c = a.srcElement;do {
                if (c.className.indexOf(b.slideClass) > -1) break;c = c.parentNode;
            } while (c);D.clickedSlide = c;
        }D.clickedSlideIndex = D.slides.indexOf(D.clickedSlide), D.clickedSlideLoopIndex = D.clickedSlideIndex - (D.loopedSlides || 0);
    }function n(a) {
        return D.allowLinks ? void 0 : (a.preventDefault ? a.preventDefault() : a.returnValue = !1, b.preventLinksPropagation && "stopPropagation" in a && a.stopPropagation(), !1);
    }function o(a) {
        return a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !1;
    }function p(a) {
        if (b.preventLinks && (D.allowLinks = !0), D.isTouched || b.onlyExternal) return !1;var c = a.target || a.srcElement;document.activeElement && document.activeElement !== document.body && document.activeElement !== c && document.activeElement.blur();var d = "input select textarea".split(" ");if (b.noSwiping && c && t(c)) return !1;if (_ = !1, D.isTouched = !0, $ = "touchstart" === a.type, !$ && "which" in a && 3 === a.which) return D.isTouched = !1, !1;if (!$ || 1 === a.targetTouches.length) {
            D.callPlugins("onTouchStartBegin"), !$ && !D.isAndroid && d.indexOf(c.tagName.toLowerCase()) < 0 && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);var e = $ ? a.targetTouches[0].pageX : a.pageX || a.clientX,
                f = $ ? a.targetTouches[0].pageY : a.pageY || a.clientY;D.touches.startX = D.touches.currentX = e, D.touches.startY = D.touches.currentY = f, D.touches.start = D.touches.current = N ? e : f, D.setWrapperTransition(0), D.positions.start = D.positions.current = D.getWrapperTranslate(), D.setWrapperTranslate(D.positions.start), D.times.start = new Date().getTime(), I = void 0, b.moveStartThreshold > 0 && (X = !1), b.onTouchStart && D.fireCallback(b.onTouchStart, D, a), D.callPlugins("onTouchStartEnd");
        }
    }function q(a) {
        if (D.isTouched && !b.onlyExternal && (!$ || "mousemove" !== a.type)) {
            var c = $ ? a.targetTouches[0].pageX : a.pageX || a.clientX,
                d = $ ? a.targetTouches[0].pageY : a.pageY || a.clientY;if ("undefined" == typeof I && N && (I = !!(I || Math.abs(d - D.touches.startY) > Math.abs(c - D.touches.startX))), "undefined" != typeof I || N || (I = !!(I || Math.abs(d - D.touches.startY) < Math.abs(c - D.touches.startX))), I) return void (D.isTouched = !1);if (N) {
                if (!b.swipeToNext && c < D.touches.startX || !b.swipeToPrev && c > D.touches.startX) return;
            } else if (!b.swipeToNext && d < D.touches.startY || !b.swipeToPrev && d > D.touches.startY) return;if (a.assignedToSwiper) return void (D.isTouched = !1);if (a.assignedToSwiper = !0, b.preventLinks && (D.allowLinks = !1), b.onSlideClick && (D.allowSlideClick = !1), b.autoplay && D.stopAutoplay(!0), !$ || 1 === a.touches.length) {
                if (D.isMoved || (D.callPlugins("onTouchMoveStart"), b.loop && (D.fixLoop(), D.positions.start = D.getWrapperTranslate()), b.onTouchMoveStart && D.fireCallback(b.onTouchMoveStart, D)), D.isMoved = !0, a.preventDefault ? a.preventDefault() : a.returnValue = !1, D.touches.current = N ? c : d, D.positions.current = (D.touches.current - D.touches.start) * b.touchRatio + D.positions.start, D.positions.current > 0 && b.onResistanceBefore && D.fireCallback(b.onResistanceBefore, D, D.positions.current), D.positions.current < -e() && b.onResistanceAfter && D.fireCallback(b.onResistanceAfter, D, Math.abs(D.positions.current + e())), b.resistance && "100%" !== b.resistance) {
                    var f;if (D.positions.current > 0 && (f = 1 - D.positions.current / J / 2, D.positions.current = .5 > f ? J / 2 : D.positions.current * f), D.positions.current < -e()) {
                        var g = (D.touches.current - D.touches.start) * b.touchRatio + (e() + D.positions.start);f = (J + g) / J;var h = D.positions.current - g * (1 - f) / 2,
                            i = -e() - J / 2;D.positions.current = i > h || 0 >= f ? i : h;
                    }
                }if (b.resistance && "100%" === b.resistance && (D.positions.current > 0 && (!b.freeMode || b.freeModeFluid) && (D.positions.current = 0), D.positions.current < -e() && (!b.freeMode || b.freeModeFluid) && (D.positions.current = -e())), !b.followFinger) return;if (b.moveStartThreshold) {
                    if (Math.abs(D.touches.current - D.touches.start) > b.moveStartThreshold || X) {
                        if (!X) return X = !0, void (D.touches.start = D.touches.current);D.setWrapperTranslate(D.positions.current);
                    } else D.positions.current = D.positions.start;
                } else D.setWrapperTranslate(D.positions.current);return (b.freeMode || b.watchActiveIndex) && D.updateActiveSlide(D.positions.current), b.grabCursor && (D.container.style.cursor = "move", D.container.style.cursor = "grabbing", D.container.style.cursor = "-moz-grabbin", D.container.style.cursor = "-webkit-grabbing"), Y || (Y = D.touches.current), Z || (Z = new Date().getTime()), D.velocity = (D.touches.current - Y) / (new Date().getTime() - Z) / 2, Math.abs(D.touches.current - Y) < 2 && (D.velocity = 0), Y = D.touches.current, Z = new Date().getTime(), D.callPlugins("onTouchMoveEnd"), b.onTouchMove && D.fireCallback(b.onTouchMove, D, a), !1;
            }
        }
    }function r(a) {
        if (I && D.swipeReset(), !b.onlyExternal && D.isTouched) {
            D.isTouched = !1, b.grabCursor && (D.container.style.cursor = "move", D.container.style.cursor = "grab", D.container.style.cursor = "-moz-grab", D.container.style.cursor = "-webkit-grab"), D.positions.current || 0 === D.positions.current || (D.positions.current = D.positions.start), b.followFinger && D.setWrapperTranslate(D.positions.current), D.times.end = new Date().getTime(), D.touches.diff = D.touches.current - D.touches.start, D.touches.abs = Math.abs(D.touches.diff), D.positions.diff = D.positions.current - D.positions.start, D.positions.abs = Math.abs(D.positions.diff);var c = D.positions.diff,
                d = D.positions.abs,
                f = D.times.end - D.times.start;5 > d && 300 > f && D.allowLinks === !1 && (b.freeMode || 0 === d || D.swipeReset(), b.preventLinks && (D.allowLinks = !0), b.onSlideClick && (D.allowSlideClick = !0)), setTimeout(function () {
                "undefined" != typeof D && null !== D && (b.preventLinks && (D.allowLinks = !0), b.onSlideClick && (D.allowSlideClick = !0));
            }, 100);var g = e();if (!D.isMoved && b.freeMode) return D.isMoved = !1, b.onTouchEnd && D.fireCallback(b.onTouchEnd, D, a), void D.callPlugins("onTouchEnd");if (!D.isMoved || D.positions.current > 0 || D.positions.current < -g) return D.swipeReset(), b.onTouchEnd && D.fireCallback(b.onTouchEnd, D, a), void D.callPlugins("onTouchEnd");if (D.isMoved = !1, b.freeMode) {
                if (b.freeModeFluid) {
                    var h,
                        i = 1e3 * b.momentumRatio,
                        j = D.velocity * i,
                        k = D.positions.current + j,
                        l = !1,
                        m = 20 * Math.abs(D.velocity) * b.momentumBounceRatio;-g > k && (b.momentumBounce && D.support.transitions ? (-m > k + g && (k = -g - m), h = -g, l = !0, _ = !0) : k = -g), k > 0 && (b.momentumBounce && D.support.transitions ? (k > m && (k = m), h = 0, l = !0, _ = !0) : k = 0), 0 !== D.velocity && (i = Math.abs((k - D.positions.current) / D.velocity)), D.setWrapperTranslate(k), D.setWrapperTransition(i), b.momentumBounce && l && D.wrapperTransitionEnd(function () {
                        _ && (b.onMomentumBounce && D.fireCallback(b.onMomentumBounce, D), D.callPlugins("onMomentumBounce"), D.setWrapperTranslate(h), D.setWrapperTransition(300));
                    }), D.updateActiveSlide(k);
                }return (!b.freeModeFluid || f >= 300) && D.updateActiveSlide(D.positions.current), b.onTouchEnd && D.fireCallback(b.onTouchEnd, D, a), void D.callPlugins("onTouchEnd");
            }H = 0 > c ? "toNext" : "toPrev", "toNext" === H && 300 >= f && (30 > d || !b.shortSwipes ? D.swipeReset() : D.swipeNext(!0, !0)), "toPrev" === H && 300 >= f && (30 > d || !b.shortSwipes ? D.swipeReset() : D.swipePrev(!0, !0));var n = 0;if ("auto" === b.slidesPerView) {
                for (var o, p = Math.abs(D.getWrapperTranslate()), q = 0, r = 0; r < D.slides.length; r++) if (o = N ? D.slides[r].getWidth(!0, b.roundLengths) : D.slides[r].getHeight(!0, b.roundLengths), q += o, q > p) {
                    n = o;break;
                }n > J && (n = J);
            } else n = F * b.slidesPerView;"toNext" === H && f > 300 && (d >= n * b.longSwipesRatio ? D.swipeNext(!0, !0) : D.swipeReset()), "toPrev" === H && f > 300 && (d >= n * b.longSwipesRatio ? D.swipePrev(!0, !0) : D.swipeReset()), b.onTouchEnd && D.fireCallback(b.onTouchEnd, D, a), D.callPlugins("onTouchEnd");
        }
    }function s(a, b) {
        return a && a.getAttribute("class") && a.getAttribute("class").indexOf(b) > -1;
    }function t(a) {
        var c = !1;do s(a, b.noSwipingClass) && (c = !0), a = a.parentElement; while (!c && a.parentElement && !s(a, b.wrapperClass));return !c && s(a, b.wrapperClass) && s(a, b.noSwipingClass) && (c = !0), c;
    }function u(a, b) {
        var c,
            d = document.createElement("div");return d.innerHTML = b, c = d.firstChild, c.className += " " + a, c.outerHTML;
    }function v(a, c, d) {
        function e() {
            var f = +new Date(),
                l = f - g;h += i * l / (1e3 / 60), k = "toNext" === j ? h > a : a > h, k ? (D.setWrapperTranslate(Math.ceil(h)), D._DOMAnimating = !0, window.setTimeout(function () {
                e();
            }, 1e3 / 60)) : (b.onSlideChangeEnd && ("to" === c ? d.runCallbacks === !0 && D.fireCallback(b.onSlideChangeEnd, D, j) : D.fireCallback(b.onSlideChangeEnd, D, j)), D.setWrapperTranslate(a), D._DOMAnimating = !1);
        }var f = "to" === c && d.speed >= 0 ? d.speed : b.speed,
            g = +new Date();if (D.support.transitions || !b.DOMAnimation) D.setWrapperTranslate(a), D.setWrapperTransition(f);else {
            var h = D.getWrapperTranslate(),
                i = Math.ceil((a - h) / f * (1e3 / 60)),
                j = h > a ? "toNext" : "toPrev",
                k = "toNext" === j ? h > a : a > h;if (D._DOMAnimating) return;e();
        }D.updateActiveSlide(a), b.onSlideNext && "next" === c && d.runCallbacks === !0 && D.fireCallback(b.onSlideNext, D, a), b.onSlidePrev && "prev" === c && d.runCallbacks === !0 && D.fireCallback(b.onSlidePrev, D, a), b.onSlideReset && "reset" === c && d.runCallbacks === !0 && D.fireCallback(b.onSlideReset, D, a), "next" !== c && "prev" !== c && "to" !== c || d.runCallbacks !== !0 || w(c);
    }function w(a) {
        if (D.callPlugins("onSlideChangeStart"), b.onSlideChangeStart) if (b.queueStartCallbacks && D.support.transitions) {
            if (D._queueStartCallbacks) return;D._queueStartCallbacks = !0, D.fireCallback(b.onSlideChangeStart, D, a), D.wrapperTransitionEnd(function () {
                D._queueStartCallbacks = !1;
            });
        } else D.fireCallback(b.onSlideChangeStart, D, a);if (b.onSlideChangeEnd) if (D.support.transitions) {
            if (b.queueEndCallbacks) {
                if (D._queueEndCallbacks) return;D._queueEndCallbacks = !0, D.wrapperTransitionEnd(function (c) {
                    D.fireCallback(b.onSlideChangeEnd, c, a);
                });
            } else D.wrapperTransitionEnd(function (c) {
                D.fireCallback(b.onSlideChangeEnd, c, a);
            });
        } else b.DOMAnimation || setTimeout(function () {
            D.fireCallback(b.onSlideChangeEnd, D, a);
        }, 10);
    }function x() {
        var a = D.paginationButtons;if (a) for (var b = 0; b < a.length; b++) D.h.removeEventListener(a[b], "click", z);
    }function y() {
        var a = D.paginationButtons;if (a) for (var b = 0; b < a.length; b++) D.h.addEventListener(a[b], "click", z);
    }function z(a) {
        for (var c, d = a.target || a.srcElement, e = D.paginationButtons, f = 0; f < e.length; f++) d === e[f] && (c = f);b.autoplay && D.stopAutoplay(!0), D.swipeTo(c);
    }function A() {
        ab = setTimeout(function () {
            b.loop ? (D.fixLoop(), D.swipeNext(!0, !0)) : D.swipeNext(!0, !0) || (b.autoplayStopOnLast ? (clearTimeout(ab), ab = void 0) : D.swipeTo(0)), D.wrapperTransitionEnd(function () {
                "undefined" != typeof ab && A();
            });
        }, b.autoplay);
    }function B() {
        D.calcSlides(), b.loader.slides.length > 0 && 0 === D.slides.length && D.loadSlides(), b.loop && D.createLoop(), D.init(), f(), b.pagination && D.createPagination(!0), b.loop || b.initialSlide > 0 ? D.swipeTo(b.initialSlide, 0, !1) : D.updateActiveSlide(0), b.autoplay && D.startAutoplay(), D.centerIndex = D.activeIndex, b.onSwiperCreated && D.fireCallback(b.onSwiperCreated, D), D.callPlugins("onSwiperCreated");
    }if (!document.body.outerHTML && document.body.__defineGetter__ && HTMLElement) {
        var C = HTMLElement.prototype;C.__defineGetter__ && C.__defineGetter__("outerHTML", function () {
            return new XMLSerializer().serializeToString(this);
        });
    }if (window.getComputedStyle || (window.getComputedStyle = function (a) {
        return this.el = a, this.getPropertyValue = function (b) {
            var c = /(\-([a-z]){1})/g;return "float" === b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function () {
                return arguments[2].toUpperCase();
            })), a.currentStyle[b] ? a.currentStyle[b] : null;
        }, this;
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
        for (var c = b || 0, d = this.length; d > c; c++) if (this[c] === a) return c;return -1;
    }), (document.querySelectorAll || window.jQuery) && "undefined" != typeof a && (a.nodeType || 0 !== c(a).length)) {
        var D = this;D.touches = { start: 0, startX: 0, startY: 0, current: 0, currentX: 0, currentY: 0, diff: 0, abs: 0 }, D.positions = { start: 0, abs: 0, diff: 0, current: 0 }, D.times = { start: 0, end: 0 }, D.id = new Date().getTime(), D.container = a.nodeType ? a : c(a)[0], D.isTouched = !1, D.isMoved = !1, D.activeIndex = 0, D.centerIndex = 0, D.activeLoaderIndex = 0, D.activeLoopIndex = 0, D.previousIndex = null, D.velocity = 0, D.snapGrid = [], D.slidesGrid = [], D.imagesToLoad = [], D.imagesLoaded = 0, D.wrapperLeft = 0, D.wrapperRight = 0, D.wrapperTop = 0, D.wrapperBottom = 0, D.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") >= 0;var E,
            F,
            G,
            H,
            I,
            J,
            K = { eventTarget: "wrapper", mode: "horizontal", touchRatio: 1, speed: 300, freeMode: !1, freeModeFluid: !1, momentumRatio: 1, momentumBounce: !0, momentumBounceRatio: 1, slidesPerView: 1, slidesPerGroup: 1, slidesPerViewFit: !0, simulateTouch: !0, followFinger: !0, shortSwipes: !0, longSwipesRatio: .5, moveStartThreshold: !1, onlyExternal: !1, createPagination: !0, pagination: !1, paginationElement: "span", paginationClickable: !1, paginationAsRange: !0, resistance: !0, scrollContainer: !1, preventLinks: !0, preventLinksPropagation: !1, noSwiping: !1, noSwipingClass: "swiper-no-swiping", initialSlide: 0, keyboardControl: !1, mousewheelControl: !1, mousewheelControlForceToAxis: !1, useCSS3Transforms: !0, autoplay: !1, autoplayDisableOnInteraction: !0, autoplayStopOnLast: !1, loop: !1, loopAdditionalSlides: 0, roundLengths: !1, calculateHeight: !1, cssWidthAndHeight: !1, updateOnImagesReady: !0, releaseFormElements: !0, watchActiveIndex: !1, visibilityFullFit: !1, offsetPxBefore: 0, offsetPxAfter: 0, offsetSlidesBefore: 0, offsetSlidesAfter: 0, centeredSlides: !1, queueStartCallbacks: !1, queueEndCallbacks: !1, autoResize: !0, resizeReInit: !1, DOMAnimation: !0, loader: { slides: [], slidesHTMLType: "inner", surroundGroups: 1, logic: "reload", loadAllSlides: !1 }, swipeToPrev: !0, swipeToNext: !0, slideElement: "div", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", wrapperClass: "swiper-wrapper", paginationElementClass: "swiper-pagination-switch", paginationActiveClass: "swiper-active-switch", paginationVisibleClass: "swiper-visible-switch" };b = b || {};for (var L in K) if (L in b && "object" == typeof b[L]) for (var M in K[L]) M in b[L] || (b[L][M] = K[L][M]);else L in b || (b[L] = K[L]);D.params = b, b.scrollContainer && (b.freeMode = !0, b.freeModeFluid = !0), b.loop && (b.resistance = "100%");var N = "horizontal" === b.mode,
            O = ["mousedown", "mousemove", "mouseup"];D.browser.ie10 && (O = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), D.browser.ie11 && (O = ["pointerdown", "pointermove", "pointerup"]), D.touchEvents = { touchStart: D.support.touch || !b.simulateTouch ? "touchstart" : O[0], touchMove: D.support.touch || !b.simulateTouch ? "touchmove" : O[1], touchEnd: D.support.touch || !b.simulateTouch ? "touchend" : O[2] };for (var P = D.container.childNodes.length - 1; P >= 0; P--) if (D.container.childNodes[P].className) for (var Q = D.container.childNodes[P].className.split(/\s+/), R = 0; R < Q.length; R++) Q[R] === b.wrapperClass && (E = D.container.childNodes[P]);D.wrapper = E, D._extendSwiperSlide = function (a) {
            return a.append = function () {
                return b.loop ? a.insertAfter(D.slides.length - D.loopedSlides) : (D.wrapper.appendChild(a), D.reInit()), a;
            }, a.prepend = function () {
                return b.loop ? (D.wrapper.insertBefore(a, D.slides[D.loopedSlides]), D.removeLoopedSlides(), D.calcSlides(), D.createLoop()) : D.wrapper.insertBefore(a, D.wrapper.firstChild), D.reInit(), a;
            }, a.insertAfter = function (c) {
                if ("undefined" == typeof c) return !1;var d;return b.loop ? (d = D.slides[c + 1 + D.loopedSlides], d ? D.wrapper.insertBefore(a, d) : D.wrapper.appendChild(a), D.removeLoopedSlides(), D.calcSlides(), D.createLoop()) : (d = D.slides[c + 1], D.wrapper.insertBefore(a, d)), D.reInit(), a;
            }, a.clone = function () {
                return D._extendSwiperSlide(a.cloneNode(!0));
            }, a.remove = function () {
                D.wrapper.removeChild(a), D.reInit();
            }, a.html = function (b) {
                return "undefined" == typeof b ? a.innerHTML : (a.innerHTML = b, a);
            }, a.index = function () {
                for (var b, c = D.slides.length - 1; c >= 0; c--) a === D.slides[c] && (b = c);return b;
            }, a.isActive = function () {
                return a.index() === D.activeIndex ? !0 : !1;
            }, a.swiperSlideDataStorage || (a.swiperSlideDataStorage = {}), a.getData = function (b) {
                return a.swiperSlideDataStorage[b];
            }, a.setData = function (b, c) {
                return a.swiperSlideDataStorage[b] = c, a;
            }, a.data = function (b, c) {
                return "undefined" == typeof c ? a.getAttribute("data-" + b) : (a.setAttribute("data-" + b, c), a);
            }, a.getWidth = function (b, c) {
                return D.h.getWidth(a, b, c);
            }, a.getHeight = function (b, c) {
                return D.h.getHeight(a, b, c);
            }, a.getOffset = function () {
                return D.h.getOffset(a);
            }, a;
        }, D.calcSlides = function (a) {
            var c = D.slides ? D.slides.length : !1;D.slides = [], D.displaySlides = [];for (var d = 0; d < D.wrapper.childNodes.length; d++) if (D.wrapper.childNodes[d].className) for (var e = D.wrapper.childNodes[d].className, f = e.split(/\s+/), i = 0; i < f.length; i++) f[i] === b.slideClass && D.slides.push(D.wrapper.childNodes[d]);for (d = D.slides.length - 1; d >= 0; d--) D._extendSwiperSlide(D.slides[d]);c !== !1 && (c !== D.slides.length || a) && (h(), g(), D.updateActiveSlide(), D.params.pagination && D.createPagination(), D.callPlugins("numberOfSlidesChanged"));
        }, D.createSlide = function (a, c, d) {
            c = c || D.params.slideClass, d = d || b.slideElement;var e = document.createElement(d);return e.innerHTML = a || "", e.className = c, D._extendSwiperSlide(e);
        }, D.appendSlide = function (a, b, c) {
            return a ? a.nodeType ? D._extendSwiperSlide(a).append() : D.createSlide(a, b, c).append() : void 0;
        }, D.prependSlide = function (a, b, c) {
            return a ? a.nodeType ? D._extendSwiperSlide(a).prepend() : D.createSlide(a, b, c).prepend() : void 0;
        }, D.insertSlideAfter = function (a, b, c, d) {
            return "undefined" == typeof a ? !1 : b.nodeType ? D._extendSwiperSlide(b).insertAfter(a) : D.createSlide(b, c, d).insertAfter(a);
        }, D.removeSlide = function (a) {
            if (D.slides[a]) {
                if (b.loop) {
                    if (!D.slides[a + D.loopedSlides]) return !1;D.slides[a + D.loopedSlides].remove(), D.removeLoopedSlides(), D.calcSlides(), D.createLoop();
                } else D.slides[a].remove();return !0;
            }return !1;
        }, D.removeLastSlide = function () {
            return D.slides.length > 0 ? (b.loop ? (D.slides[D.slides.length - 1 - D.loopedSlides].remove(), D.removeLoopedSlides(), D.calcSlides(), D.createLoop()) : D.slides[D.slides.length - 1].remove(), !0) : !1;
        }, D.removeAllSlides = function () {
            for (var a = D.slides.length, b = D.slides.length - 1; b >= 0; b--) D.slides[b].remove(), b === a - 1 && D.setWrapperTranslate(0);
        }, D.getSlide = function (a) {
            return D.slides[a];
        }, D.getLastSlide = function () {
            return D.slides[D.slides.length - 1];
        }, D.getFirstSlide = function () {
            return D.slides[0];
        }, D.activeSlide = function () {
            return D.slides[D.activeIndex];
        }, D.fireCallback = function () {
            var a = arguments[0];if ("[object Array]" === Object.prototype.toString.call(a)) for (var c = 0; c < a.length; c++) "function" == typeof a[c] && a[c](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);else "[object String]" === Object.prototype.toString.call(a) ? b["on" + a] && D.fireCallback(b["on" + a], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) : a(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }, D.addCallback = function (a, b) {
            var c,
                e = this;return e.params["on" + a] ? d(this.params["on" + a]) ? this.params["on" + a].push(b) : "function" == typeof this.params["on" + a] ? (c = this.params["on" + a], this.params["on" + a] = [], this.params["on" + a].push(c), this.params["on" + a].push(b)) : void 0 : (this.params["on" + a] = [], this.params["on" + a].push(b));
        }, D.removeCallbacks = function (a) {
            D.params["on" + a] && (D.params["on" + a] = null);
        };var S = [];for (var T in D.plugins) if (b[T]) {
            var U = D.plugins[T](D, b[T]);U && S.push(U);
        }D.callPlugins = function (a, b) {
            b || (b = {});for (var c = 0; c < S.length; c++) a in S[c] && S[c][a](b);
        }, !D.browser.ie10 && !D.browser.ie11 || b.onlyExternal || D.wrapper.classList.add("swiper-wp8-" + (N ? "horizontal" : "vertical")), b.freeMode && (D.container.className += " swiper-free-mode"), D.initialized = !1, D.init = function (a, c) {
            var d = D.h.getWidth(D.container, !1, b.roundLengths),
                e = D.h.getHeight(D.container, !1, b.roundLengths);if (d !== D.width || e !== D.height || a) {
                D.width = d, D.height = e;var f, g, h, i, j, k, l;J = N ? d : e;var m = D.wrapper;if (a && D.calcSlides(c), "auto" === b.slidesPerView) {
                    var n = 0,
                        o = 0;b.slidesOffset > 0 && (m.style.paddingLeft = "", m.style.paddingRight = "", m.style.paddingTop = "", m.style.paddingBottom = ""), m.style.width = "", m.style.height = "", b.offsetPxBefore > 0 && (N ? D.wrapperLeft = b.offsetPxBefore : D.wrapperTop = b.offsetPxBefore), b.offsetPxAfter > 0 && (N ? D.wrapperRight = b.offsetPxAfter : D.wrapperBottom = b.offsetPxAfter), b.centeredSlides && (N ? (D.wrapperLeft = (J - this.slides[0].getWidth(!0, b.roundLengths)) / 2, D.wrapperRight = (J - D.slides[D.slides.length - 1].getWidth(!0, b.roundLengths)) / 2) : (D.wrapperTop = (J - D.slides[0].getHeight(!0, b.roundLengths)) / 2, D.wrapperBottom = (J - D.slides[D.slides.length - 1].getHeight(!0, b.roundLengths)) / 2)), N ? (D.wrapperLeft >= 0 && (m.style.paddingLeft = D.wrapperLeft + "px"), D.wrapperRight >= 0 && (m.style.paddingRight = D.wrapperRight + "px")) : (D.wrapperTop >= 0 && (m.style.paddingTop = D.wrapperTop + "px"), D.wrapperBottom >= 0 && (m.style.paddingBottom = D.wrapperBottom + "px")), k = 0;var p = 0;for (D.snapGrid = [], D.slidesGrid = [], h = 0, l = 0; l < D.slides.length; l++) {
                        f = D.slides[l].getWidth(!0, b.roundLengths), g = D.slides[l].getHeight(!0, b.roundLengths), b.calculateHeight && (h = Math.max(h, g));var q = N ? f : g;if (b.centeredSlides) {
                            var r = l === D.slides.length - 1 ? 0 : D.slides[l + 1].getWidth(!0, b.roundLengths),
                                s = l === D.slides.length - 1 ? 0 : D.slides[l + 1].getHeight(!0, b.roundLengths),
                                t = N ? r : s;if (q > J) {
                                if (b.slidesPerViewFit) D.snapGrid.push(k + D.wrapperLeft), D.snapGrid.push(k + q - J + D.wrapperLeft);else for (var u = 0; u <= Math.floor(q / (J + D.wrapperLeft)); u++) D.snapGrid.push(0 === u ? k + D.wrapperLeft : k + D.wrapperLeft + J * u);D.slidesGrid.push(k + D.wrapperLeft);
                            } else D.snapGrid.push(p), D.slidesGrid.push(p);p += q / 2 + t / 2;
                        } else {
                            if (q > J) {
                                if (b.slidesPerViewFit) D.snapGrid.push(k), D.snapGrid.push(k + q - J);else if (0 !== J) for (var v = 0; v <= Math.floor(q / J); v++) D.snapGrid.push(k + J * v);else D.snapGrid.push(k);
                            } else D.snapGrid.push(k);D.slidesGrid.push(k);
                        }k += q, n += f, o += g;
                    }b.calculateHeight && (D.height = h), N ? (G = n + D.wrapperRight + D.wrapperLeft, b.cssWidthAndHeight && "height" !== b.cssWidthAndHeight || (m.style.width = n + "px"), b.cssWidthAndHeight && "width" !== b.cssWidthAndHeight || (m.style.height = D.height + "px")) : (b.cssWidthAndHeight && "height" !== b.cssWidthAndHeight || (m.style.width = D.width + "px"), b.cssWidthAndHeight && "width" !== b.cssWidthAndHeight || (m.style.height = o + "px"), G = o + D.wrapperTop + D.wrapperBottom);
                } else if (b.scrollContainer) m.style.width = "", m.style.height = "", i = D.slides[0].getWidth(!0, b.roundLengths), j = D.slides[0].getHeight(!0, b.roundLengths), G = N ? i : j, m.style.width = i + "px", m.style.height = j + "px", F = N ? i : j;else {
                    if (b.calculateHeight) {
                        for (h = 0, j = 0, N || (D.container.style.height = ""), m.style.height = "", l = 0; l < D.slides.length; l++) D.slides[l].style.height = "", h = Math.max(D.slides[l].getHeight(!0), h), N || (j += D.slides[l].getHeight(!0));g = h, D.height = g, N ? j = g : (J = g, D.container.style.height = J + "px");
                    } else g = N ? D.height : D.height / b.slidesPerView, b.roundLengths && (g = Math.ceil(g)), j = N ? D.height : D.slides.length * g;for (f = N ? D.width / b.slidesPerView : D.width, b.roundLengths && (f = Math.ceil(f)), i = N ? D.slides.length * f : D.width, F = N ? f : g, b.offsetSlidesBefore > 0 && (N ? D.wrapperLeft = F * b.offsetSlidesBefore : D.wrapperTop = F * b.offsetSlidesBefore), b.offsetSlidesAfter > 0 && (N ? D.wrapperRight = F * b.offsetSlidesAfter : D.wrapperBottom = F * b.offsetSlidesAfter), b.offsetPxBefore > 0 && (N ? D.wrapperLeft = b.offsetPxBefore : D.wrapperTop = b.offsetPxBefore), b.offsetPxAfter > 0 && (N ? D.wrapperRight = b.offsetPxAfter : D.wrapperBottom = b.offsetPxAfter), b.centeredSlides && (N ? (D.wrapperLeft = (J - F) / 2, D.wrapperRight = (J - F) / 2) : (D.wrapperTop = (J - F) / 2, D.wrapperBottom = (J - F) / 2)), N ? (D.wrapperLeft > 0 && (m.style.paddingLeft = D.wrapperLeft + "px"), D.wrapperRight > 0 && (m.style.paddingRight = D.wrapperRight + "px")) : (D.wrapperTop > 0 && (m.style.paddingTop = D.wrapperTop + "px"), D.wrapperBottom > 0 && (m.style.paddingBottom = D.wrapperBottom + "px")), G = N ? i + D.wrapperRight + D.wrapperLeft : j + D.wrapperTop + D.wrapperBottom, parseFloat(i) > 0 && (!b.cssWidthAndHeight || "height" === b.cssWidthAndHeight) && (m.style.width = i + "px"), parseFloat(j) > 0 && (!b.cssWidthAndHeight || "width" === b.cssWidthAndHeight) && (m.style.height = j + "px"), k = 0, D.snapGrid = [], D.slidesGrid = [], l = 0; l < D.slides.length; l++) D.snapGrid.push(k), D.slidesGrid.push(k), k += F, parseFloat(f) > 0 && (!b.cssWidthAndHeight || "height" === b.cssWidthAndHeight) && (D.slides[l].style.width = f + "px"), parseFloat(g) > 0 && (!b.cssWidthAndHeight || "width" === b.cssWidthAndHeight) && (D.slides[l].style.height = g + "px");
                }D.initialized ? (D.callPlugins("onInit"), b.onInit && D.fireCallback(b.onInit, D)) : (D.callPlugins("onFirstInit"), b.onFirstInit && D.fireCallback(b.onFirstInit, D)), D.initialized = !0;
            }
        }, D.reInit = function (a) {
            D.init(!0, a);
        }, D.resizeFix = function (a) {
            D.callPlugins("beforeResizeFix"), D.init(b.resizeReInit || a), b.freeMode ? D.getWrapperTranslate() < -e() && (D.setWrapperTransition(0), D.setWrapperTranslate(-e())) : (D.swipeTo(b.loop ? D.activeLoopIndex : D.activeIndex, 0, !1), b.autoplay && (D.support.transitions && "undefined" != typeof ab ? "undefined" != typeof ab && (clearTimeout(ab), ab = void 0, D.startAutoplay()) : "undefined" != typeof bb && (clearInterval(bb), bb = void 0, D.startAutoplay()))), D.callPlugins("afterResizeFix");
        }, D.destroy = function (a) {
            var c = D.h.removeEventListener,
                d = "wrapper" === b.eventTarget ? D.wrapper : D.container;if (D.browser.ie10 || D.browser.ie11 ? (c(d, D.touchEvents.touchStart, p), c(document, D.touchEvents.touchMove, q), c(document, D.touchEvents.touchEnd, r)) : (D.support.touch && (c(d, "touchstart", p), c(d, "touchmove", q), c(d, "touchend", r)), b.simulateTouch && (c(d, "mousedown", p), c(document, "mousemove", q), c(document, "mouseup", r))), b.autoResize && c(window, "resize", D.resizeFix), h(), b.paginationClickable && x(), b.mousewheelControl && D._wheelEvent && c(D.container, D._wheelEvent, j), b.keyboardControl && c(document, "keydown", i), b.autoplay && D.stopAutoplay(), a) {
                D.wrapper.removeAttribute("style");for (var e = 0; e < D.slides.length; e++) D.slides[e].removeAttribute("style");
            }D.callPlugins("onDestroy"), window.jQuery && window.jQuery(D.container).data("swiper") && window.jQuery(D.container).removeData("swiper"), window.Zepto && window.Zepto(D.container).data("swiper") && window.Zepto(D.container).removeData("swiper"), D = null;
        }, D.disableKeyboardControl = function () {
            b.keyboardControl = !1, D.h.removeEventListener(document, "keydown", i);
        }, D.enableKeyboardControl = function () {
            b.keyboardControl = !0, D.h.addEventListener(document, "keydown", i);
        };var V = new Date().getTime();if (D.disableMousewheelControl = function () {
            return D._wheelEvent ? (b.mousewheelControl = !1, D.h.removeEventListener(D.container, D._wheelEvent, j), !0) : !1;
        }, D.enableMousewheelControl = function () {
            return D._wheelEvent ? (b.mousewheelControl = !0, D.h.addEventListener(D.container, D._wheelEvent, j), !0) : !1;
        }, b.grabCursor) {
            var W = D.container.style;W.cursor = "move", W.cursor = "grab", W.cursor = "-moz-grab", W.cursor = "-webkit-grab";
        }D.allowSlideClick = !0, D.allowLinks = !0;var X,
            Y,
            Z,
            $ = !1,
            _ = !0;D.swipeNext = function (a, c) {
            "undefined" == typeof a && (a = !0), !c && b.loop && D.fixLoop(), !c && b.autoplay && D.stopAutoplay(!0), D.callPlugins("onSwipeNext");var d = D.getWrapperTranslate().toFixed(2),
                f = d;if ("auto" === b.slidesPerView) {
                for (var g = 0; g < D.snapGrid.length; g++) if (-d >= D.snapGrid[g].toFixed(2) && -d < D.snapGrid[g + 1].toFixed(2)) {
                    f = -D.snapGrid[g + 1];break;
                }
            } else {
                var h = F * b.slidesPerGroup;f = -(Math.floor(Math.abs(d) / Math.floor(h)) * h + h);
            }return f < -e() && (f = -e()), f === d ? !1 : (v(f, "next", { runCallbacks: a }), !0);
        }, D.swipePrev = function (a, c) {
            "undefined" == typeof a && (a = !0), !c && b.loop && D.fixLoop(), !c && b.autoplay && D.stopAutoplay(!0), D.callPlugins("onSwipePrev");var d,
                e = Math.ceil(D.getWrapperTranslate());if ("auto" === b.slidesPerView) {
                d = 0;for (var f = 1; f < D.snapGrid.length; f++) {
                    if (-e === D.snapGrid[f]) {
                        d = -D.snapGrid[f - 1];break;
                    }if (-e > D.snapGrid[f] && -e < D.snapGrid[f + 1]) {
                        d = -D.snapGrid[f];break;
                    }
                }
            } else {
                var g = F * b.slidesPerGroup;d = -(Math.ceil(-e / g) - 1) * g;
            }return d > 0 && (d = 0), d === e ? !1 : (v(d, "prev", { runCallbacks: a }), !0);
        }, D.swipeReset = function (a) {
            "undefined" == typeof a && (a = !0), D.callPlugins("onSwipeReset");{
                var c,
                    d = D.getWrapperTranslate(),
                    f = F * b.slidesPerGroup;-e();
            }if ("auto" === b.slidesPerView) {
                c = 0;for (var g = 0; g < D.snapGrid.length; g++) {
                    if (-d === D.snapGrid[g]) return;if (-d >= D.snapGrid[g] && -d < D.snapGrid[g + 1]) {
                        c = D.positions.diff > 0 ? -D.snapGrid[g + 1] : -D.snapGrid[g];break;
                    }
                }-d >= D.snapGrid[D.snapGrid.length - 1] && (c = -D.snapGrid[D.snapGrid.length - 1]), d <= -e() && (c = -e());
            } else c = 0 > d ? Math.round(d / f) * f : 0, d <= -e() && (c = -e());return b.scrollContainer && (c = 0 > d ? d : 0), c < -e() && (c = -e()), b.scrollContainer && J > F && (c = 0), c === d ? !1 : (v(c, "reset", { runCallbacks: a }), !0);
        }, D.swipeTo = function (a, c, d) {
            a = parseInt(a, 10), D.callPlugins("onSwipeTo", { index: a, speed: c }), b.loop && (a += D.loopedSlides);var f = D.getWrapperTranslate();if (!(!isFinite(a) || a > D.slides.length - 1 || 0 > a)) {
                var g;return g = "auto" === b.slidesPerView ? -D.slidesGrid[a] : -a * F, g < -e() && (g = -e()), g === f ? !1 : ("undefined" == typeof d && (d = !0), v(g, "to", { index: a, speed: c, runCallbacks: d }), !0);
            }
        }, D._queueStartCallbacks = !1, D._queueEndCallbacks = !1, D.updateActiveSlide = function (a) {
            if (D.initialized && 0 !== D.slides.length) {
                D.previousIndex = D.activeIndex, "undefined" == typeof a && (a = D.getWrapperTranslate()), a > 0 && (a = 0);var c;if ("auto" === b.slidesPerView) {
                    if (D.activeIndex = D.slidesGrid.indexOf(-a), D.activeIndex < 0) {
                        for (c = 0; c < D.slidesGrid.length - 1 && !(-a > D.slidesGrid[c] && -a < D.slidesGrid[c + 1]); c++);var d = Math.abs(D.slidesGrid[c] + a),
                            e = Math.abs(D.slidesGrid[c + 1] + a);
                        D.activeIndex = e >= d ? c : c + 1;
                    }
                } else D.activeIndex = Math[b.visibilityFullFit ? "ceil" : "round"](-a / F);if (D.activeIndex === D.slides.length && (D.activeIndex = D.slides.length - 1), D.activeIndex < 0 && (D.activeIndex = 0), D.slides[D.activeIndex]) {
                    if (D.calcVisibleSlides(a), D.support.classList) {
                        var f;for (c = 0; c < D.slides.length; c++) f = D.slides[c], f.classList.remove(b.slideActiveClass), D.visibleSlides.indexOf(f) >= 0 ? f.classList.add(b.slideVisibleClass) : f.classList.remove(b.slideVisibleClass);D.slides[D.activeIndex].classList.add(b.slideActiveClass);
                    } else {
                        var g = new RegExp("\\s*" + b.slideActiveClass),
                            h = new RegExp("\\s*" + b.slideVisibleClass);for (c = 0; c < D.slides.length; c++) D.slides[c].className = D.slides[c].className.replace(g, "").replace(h, ""), D.visibleSlides.indexOf(D.slides[c]) >= 0 && (D.slides[c].className += " " + b.slideVisibleClass);D.slides[D.activeIndex].className += " " + b.slideActiveClass;
                    }if (b.loop) {
                        var i = D.loopedSlides;D.activeLoopIndex = D.activeIndex - i, D.activeLoopIndex >= D.slides.length - 2 * i && (D.activeLoopIndex = D.slides.length - 2 * i - D.activeLoopIndex), D.activeLoopIndex < 0 && (D.activeLoopIndex = D.slides.length - 2 * i + D.activeLoopIndex), D.activeLoopIndex < 0 && (D.activeLoopIndex = 0);
                    } else D.activeLoopIndex = D.activeIndex;b.pagination && D.updatePagination(a);
                }
            }
        }, D.createPagination = function (a) {
            if (b.paginationClickable && D.paginationButtons && x(), D.paginationContainer = b.pagination.nodeType ? b.pagination : c(b.pagination)[0], b.createPagination) {
                var d = "",
                    e = D.slides.length,
                    f = e;b.loop && (f -= 2 * D.loopedSlides);for (var g = 0; f > g; g++) d += "<" + b.paginationElement + ' class="' + b.paginationElementClass + '"></' + b.paginationElement + ">";D.paginationContainer.innerHTML = d;
            }D.paginationButtons = c("." + b.paginationElementClass, D.paginationContainer), a || D.updatePagination(), D.callPlugins("onCreatePagination"), b.paginationClickable && y();
        }, D.updatePagination = function (a) {
            if (b.pagination && !(D.slides.length < 1)) {
                var d = c("." + b.paginationActiveClass, D.paginationContainer);if (d) {
                    var e = D.paginationButtons;if (0 !== e.length) {
                        for (var f = 0; f < e.length; f++) e[f].className = b.paginationElementClass;var g = b.loop ? D.loopedSlides : 0;if (b.paginationAsRange) {
                            D.visibleSlides || D.calcVisibleSlides(a);var h,
                                i = [];for (h = 0; h < D.visibleSlides.length; h++) {
                                var j = D.slides.indexOf(D.visibleSlides[h]) - g;b.loop && 0 > j && (j = D.slides.length - 2 * D.loopedSlides + j), b.loop && j >= D.slides.length - 2 * D.loopedSlides && (j = D.slides.length - 2 * D.loopedSlides - j, j = Math.abs(j)), i.push(j);
                            }for (h = 0; h < i.length; h++) e[i[h]] && (e[i[h]].className += " " + b.paginationVisibleClass);b.loop ? void 0 !== e[D.activeLoopIndex] && (e[D.activeLoopIndex].className += " " + b.paginationActiveClass) : e[D.activeIndex] && (e[D.activeIndex].className += " " + b.paginationActiveClass);
                        } else b.loop ? e[D.activeLoopIndex] && (e[D.activeLoopIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass) : e[D.activeIndex] && (e[D.activeIndex].className += " " + b.paginationActiveClass + " " + b.paginationVisibleClass);
                    }
                }
            }
        }, D.calcVisibleSlides = function (a) {
            var c = [],
                d = 0,
                e = 0,
                f = 0;N && D.wrapperLeft > 0 && (a += D.wrapperLeft), !N && D.wrapperTop > 0 && (a += D.wrapperTop);for (var g = 0; g < D.slides.length; g++) {
                d += e, e = "auto" === b.slidesPerView ? N ? D.h.getWidth(D.slides[g], !0, b.roundLengths) : D.h.getHeight(D.slides[g], !0, b.roundLengths) : F, f = d + e;var h = !1;b.visibilityFullFit ? (d >= -a && -a + J >= f && (h = !0), -a >= d && f >= -a + J && (h = !0)) : (f > -a && -a + J >= f && (h = !0), d >= -a && -a + J > d && (h = !0), -a > d && f > -a + J && (h = !0)), h && c.push(D.slides[g]);
            }0 === c.length && (c = [D.slides[D.activeIndex]]), D.visibleSlides = c;
        };var ab, bb;D.startAutoplay = function () {
            if (D.support.transitions) {
                if ("undefined" != typeof ab) return !1;if (!b.autoplay) return;D.callPlugins("onAutoplayStart"), b.onAutoplayStart && D.fireCallback(b.onAutoplayStart, D), A();
            } else {
                if ("undefined" != typeof bb) return !1;if (!b.autoplay) return;D.callPlugins("onAutoplayStart"), b.onAutoplayStart && D.fireCallback(b.onAutoplayStart, D), bb = setInterval(function () {
                    b.loop ? (D.fixLoop(), D.swipeNext(!0, !0)) : D.swipeNext(!0, !0) || (b.autoplayStopOnLast ? (clearInterval(bb), bb = void 0) : D.swipeTo(0));
                }, b.autoplay);
            }
        }, D.stopAutoplay = function (a) {
            if (D.support.transitions) {
                if (!ab) return;ab && clearTimeout(ab), ab = void 0, a && !b.autoplayDisableOnInteraction && D.wrapperTransitionEnd(function () {
                    A();
                }), D.callPlugins("onAutoplayStop"), b.onAutoplayStop && D.fireCallback(b.onAutoplayStop, D);
            } else bb && clearInterval(bb), bb = void 0, D.callPlugins("onAutoplayStop"), b.onAutoplayStop && D.fireCallback(b.onAutoplayStop, D);
        }, D.loopCreated = !1, D.removeLoopedSlides = function () {
            if (D.loopCreated) for (var a = 0; a < D.slides.length; a++) D.slides[a].getData("looped") === !0 && D.wrapper.removeChild(D.slides[a]);
        }, D.createLoop = function () {
            if (0 !== D.slides.length) {
                D.loopedSlides = "auto" === b.slidesPerView ? b.loopedSlides || 1 : Math.floor(b.slidesPerView) + b.loopAdditionalSlides, D.loopedSlides > D.slides.length && (D.loopedSlides = D.slides.length);var a,
                    c = "",
                    d = "",
                    e = "",
                    f = D.slides.length,
                    g = Math.floor(D.loopedSlides / f),
                    h = D.loopedSlides % f;for (a = 0; g * f > a; a++) {
                    var i = a;if (a >= f) {
                        var j = Math.floor(a / f);i = a - f * j;
                    }e += D.slides[i].outerHTML;
                }for (a = 0; h > a; a++) d += u(b.slideDuplicateClass, D.slides[a].outerHTML);for (a = f - h; f > a; a++) c += u(b.slideDuplicateClass, D.slides[a].outerHTML);var k = c + e + E.innerHTML + e + d;for (E.innerHTML = k, D.loopCreated = !0, D.calcSlides(), a = 0; a < D.slides.length; a++) (a < D.loopedSlides || a >= D.slides.length - D.loopedSlides) && D.slides[a].setData("looped", !0);D.callPlugins("onCreateLoop");
            }
        }, D.fixLoop = function () {
            var a;D.activeIndex < D.loopedSlides ? (a = D.slides.length - 3 * D.loopedSlides + D.activeIndex, D.swipeTo(a, 0, !1)) : ("auto" === b.slidesPerView && D.activeIndex >= 2 * D.loopedSlides || D.activeIndex > D.slides.length - 2 * b.slidesPerView) && (a = -D.slides.length + D.activeIndex + D.loopedSlides, D.swipeTo(a, 0, !1));
        }, D.loadSlides = function () {
            var a = "";D.activeLoaderIndex = 0;for (var c = b.loader.slides, d = b.loader.loadAllSlides ? c.length : b.slidesPerView * (1 + b.loader.surroundGroups), e = 0; d > e; e++) a += "outer" === b.loader.slidesHTMLType ? c[e] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + e + '">' + c[e] + "</" + b.slideElement + ">";D.wrapper.innerHTML = a, D.calcSlides(!0), b.loader.loadAllSlides || D.wrapperTransitionEnd(D.reloadSlides, !0);
        }, D.reloadSlides = function () {
            var a = b.loader.slides,
                c = parseInt(D.activeSlide().data("swiperindex"), 10);if (!(0 > c || c > a.length - 1)) {
                D.activeLoaderIndex = c;var d = Math.max(0, c - b.slidesPerView * b.loader.surroundGroups),
                    e = Math.min(c + b.slidesPerView * (1 + b.loader.surroundGroups) - 1, a.length - 1);if (c > 0) {
                    var f = -F * (c - d);D.setWrapperTranslate(f), D.setWrapperTransition(0);
                }var g;if ("reload" === b.loader.logic) {
                    D.wrapper.innerHTML = "";var h = "";for (g = d; e >= g; g++) h += "outer" === b.loader.slidesHTMLType ? a[g] : "<" + b.slideElement + ' class="' + b.slideClass + '" data-swiperindex="' + g + '">' + a[g] + "</" + b.slideElement + ">";D.wrapper.innerHTML = h;
                } else {
                    var i = 1e3,
                        j = 0;for (g = 0; g < D.slides.length; g++) {
                        var k = D.slides[g].data("swiperindex");d > k || k > e ? D.wrapper.removeChild(D.slides[g]) : (i = Math.min(k, i), j = Math.max(k, j));
                    }for (g = d; e >= g; g++) {
                        var l;i > g && (l = document.createElement(b.slideElement), l.className = b.slideClass, l.setAttribute("data-swiperindex", g), l.innerHTML = a[g], D.wrapper.insertBefore(l, D.wrapper.firstChild)), g > j && (l = document.createElement(b.slideElement), l.className = b.slideClass, l.setAttribute("data-swiperindex", g), l.innerHTML = a[g], D.wrapper.appendChild(l));
                    }
                }D.reInit(!0);
            }
        }, B();
    }
};Swiper.prototype = { plugins: {}, wrapperTransitionEnd: function (a, b) {
        "use strict";
        function c(h) {
            if (h.target === f && (a(e), e.params.queueEndCallbacks && (e._queueEndCallbacks = !1), !b)) for (d = 0; d < g.length; d++) e.h.removeEventListener(f, g[d], c);
        }var d,
            e = this,
            f = e.wrapper,
            g = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];if (a) for (d = 0; d < g.length; d++) e.h.addEventListener(f, g[d], c);
    }, getWrapperTranslate: function (a) {
        "use strict";
        var b,
            c,
            d,
            e,
            f = this.wrapper;return "undefined" == typeof a && (a = "horizontal" === this.params.mode ? "x" : "y"), this.support.transforms && this.params.useCSS3Transforms ? (d = window.getComputedStyle(f, null), window.WebKitCSSMatrix ? e = new WebKitCSSMatrix("none" === d.webkitTransform ? "" : d.webkitTransform) : (e = d.MozTransform || d.OTransform || d.MsTransform || d.msTransform || d.transform || d.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), b = e.toString().split(",")), "x" === a && (c = window.WebKitCSSMatrix ? e.m41 : parseFloat(16 === b.length ? b[12] : b[4])), "y" === a && (c = window.WebKitCSSMatrix ? e.m42 : parseFloat(16 === b.length ? b[13] : b[5]))) : ("x" === a && (c = parseFloat(f.style.left, 10) || 0), "y" === a && (c = parseFloat(f.style.top, 10) || 0)), c || 0;
    }, setWrapperTranslate: function (a, b, c) {
        "use strict";
        var d,
            e = this.wrapper.style,
            f = { x: 0, y: 0, z: 0 };3 === arguments.length ? (f.x = a, f.y = b, f.z = c) : ("undefined" == typeof b && (b = "horizontal" === this.params.mode ? "x" : "y"), f[b] = a), this.support.transforms && this.params.useCSS3Transforms ? (d = this.support.transforms3d ? "translate3d(" + f.x + "px, " + f.y + "px, " + f.z + "px)" : "translate(" + f.x + "px, " + f.y + "px)", e.webkitTransform = e.MsTransform = e.msTransform = e.MozTransform = e.OTransform = e.transform = d) : (e.left = f.x + "px", e.top = f.y + "px"), this.callPlugins("onSetWrapperTransform", f), this.params.onSetWrapperTransform && this.fireCallback(this.params.onSetWrapperTransform, this, f);
    }, setWrapperTransition: function (a) {
        "use strict";
        var b = this.wrapper.style;b.webkitTransitionDuration = b.MsTransitionDuration = b.msTransitionDuration = b.MozTransitionDuration = b.OTransitionDuration = b.transitionDuration = a / 1e3 + "s", this.callPlugins("onSetWrapperTransition", { duration: a }), this.params.onSetWrapperTransition && this.fireCallback(this.params.onSetWrapperTransition, this, a);
    }, h: { getWidth: function (a, b, c) {
            "use strict";
            var d = window.getComputedStyle(a, null).getPropertyValue("width"),
                e = parseFloat(d);return (isNaN(e) || d.indexOf("%") > 0 || 0 > e) && (e = a.offsetWidth - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-right"))), b && (e += parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-right"))), c ? Math.ceil(e) : e;
        }, getHeight: function (a, b, c) {
            "use strict";
            if (b) return a.offsetHeight;var d = window.getComputedStyle(a, null).getPropertyValue("height"),
                e = parseFloat(d);return (isNaN(e) || d.indexOf("%") > 0 || 0 > e) && (e = a.offsetHeight - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-bottom"))), b && (e += parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(a, null).getPropertyValue("padding-bottom"))), c ? Math.ceil(e) : e;
        }, getOffset: function (a) {
            "use strict";
            var b = a.getBoundingClientRect(),
                c = document.body,
                d = a.clientTop || c.clientTop || 0,
                e = a.clientLeft || c.clientLeft || 0,
                f = window.pageYOffset || a.scrollTop,
                g = window.pageXOffset || a.scrollLeft;return document.documentElement && !window.pageYOffset && (f = document.documentElement.scrollTop, g = document.documentElement.scrollLeft), { top: b.top + f - d, left: b.left + g - e };
        }, windowWidth: function () {
            "use strict";
            return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : void 0;
        }, windowHeight: function () {
            "use strict";
            return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : void 0;
        }, windowScroll: function () {
            "use strict";
            return "undefined" != typeof pageYOffset ? { left: window.pageXOffset, top: window.pageYOffset } : document.documentElement ? { left: document.documentElement.scrollLeft, top: document.documentElement.scrollTop } : void 0;
        }, addEventListener: function (a, b, c, d) {
            "use strict";
            "undefined" == typeof d && (d = !1), a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c);
        }, removeEventListener: function (a, b, c, d) {
            "use strict";
            "undefined" == typeof d && (d = !1), a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c);
        } }, setTransform: function (a, b) {
        "use strict";
        var c = a.style;c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = b;
    }, setTranslate: function (a, b) {
        "use strict";
        var c = a.style,
            d = { x: b.x || 0, y: b.y || 0, z: b.z || 0 },
            e = this.support.transforms3d ? "translate3d(" + d.x + "px," + d.y + "px," + d.z + "px)" : "translate(" + d.x + "px," + d.y + "px)";c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = e, this.support.transforms || (c.left = d.x + "px", c.top = d.y + "px");
    }, setTransition: function (a, b) {
        "use strict";
        var c = a.style;c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = b + "ms";
    }, support: { touch: window.Modernizr && Modernizr.touch === !0 || function () {
            "use strict";
            return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
        }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
            "use strict";
            var a = document.createElement("div").style;return "webkitPerspective" in a || "MozPerspective" in a || "OPerspective" in a || "MsPerspective" in a || "perspective" in a;
        }(), transforms: window.Modernizr && Modernizr.csstransforms === !0 || function () {
            "use strict";
            var a = document.createElement("div").style;return "transform" in a || "WebkitTransform" in a || "MozTransform" in a || "msTransform" in a || "MsTransform" in a || "OTransform" in a;
        }(), transitions: window.Modernizr && Modernizr.csstransitions === !0 || function () {
            "use strict";
            var a = document.createElement("div").style;return "transition" in a || "WebkitTransition" in a || "MozTransition" in a || "msTransition" in a || "MsTransition" in a || "OTransition" in a;
        }(), classList: function () {
            "use strict";
            var a = document.createElement("div");return "classList" in a;
        }() }, browser: { ie8: function () {
            "use strict";
            var a = -1;if ("Microsoft Internet Explorer" === navigator.appName) {
                var b = navigator.userAgent,
                    c = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);null !== c.exec(b) && (a = parseFloat(RegExp.$1));
            }return -1 !== a && 9 > a;
        }(), ie10: window.navigator.msPointerEnabled, ie11: window.navigator.pointerEnabled } }, (window.jQuery || window.Zepto) && !function (a) {
    "use strict";
    a.fn.swiper = function (b) {
        var c;return this.each(function (d) {
            var e = a(this),
                f = new Swiper(e[0], b);d || (c = f), e.data("swiper", f);
        }), c;
    };
}(window.jQuery || window.Zepto), "undefined" != typeof module ? module.exports = Swiper : "function" == typeof define && define.amd && define([], function () {
    "use strict";
    return Swiper;
});
(function ($, win, doc) {
    'use strict';

    var esoyu_sideBar = function (opts) {
        this._init(opts);
    };

    $.extend(esoyu_sideBar.prototype, {
        _init: function (opts) {
            this.opts = {
                watchScroll: false
            };

            $.extend(this.opts, opts, true);

            this.elementTopArray = [];

            this.createBarItems();
            this.opts.goTopIcon && this.createGoTopIcon();

            if (this.opts.watchScroll) {
                this.watchScroll();
            }
        },
        createBarItems: function () {
            var self = this;
            for (var key in this.opts) {
                if (/item\d*/.test(key)) {
                    var item = this.opts[key];
                    var $iconSpan,
                        $textSpan,
                        $aLink,
                        $cellWrapper = $('<div class="cell-wrapper">'),
                        $sidebar_cell = $('<div class="sidebar_cell">');

                    $iconSpan = this.createIcons(item, $iconSpan);
                    $textSpan = this.createTexts(item, $textSpan);
                    $aLink = this.createALink(item, $aLink);

                    $cellWrapper.append($aLink.append($iconSpan, $textSpan)).appendTo($sidebar_cell);

                    $sidebar_cell.click(function (e) {
                        var _href = $(this).find('a').attr('href');

                        switch (_href[0]) {
                            case '#':
                            case '.':
                                self.moveToElement($(_href));
                                break;
                            default:
                                break;
                        }
                        return false;
                    });

                    $('#go-top').append($sidebar_cell);

                    if (this.opts.watchScroll) {
                        var selector = item.selector;
                        var elementTop = $(selector).position().top;
                        elementTop && this.elementTopArray.push(elementTop);
                    }
                }
            }
        },
        createIcons: function (obj, iconSpan) {
            var opts = this.opts;
            obj.iconClass && (iconSpan = $('<span class="cell-item cell-icon">').addClass(obj.iconClass));

            var _iconStyle = {};
            opts.commonIconStyle && $.extend(_iconStyle, opts.commonIconStyle);
            obj.iconStyle && $.extend(_iconStyle, obj.iconStyle);
            iconSpan.css(_iconStyle);

            return iconSpan;
        },
        createTexts: function (obj, textSpan) {
            var opts = this.opts;
            obj.cellText && (textSpan = $('<span class="cell-item cell-text">').html(obj.cellText));

            var _textStyle = {};
            opts.commonTextStyle && $.extend(_textStyle, opts.commonTextStyle);
            obj.textStyle && $.extend(_textStyle, obj.textStyle);
            textSpan.css(_textStyle);

            return textSpan;
        },
        createALink: function (obj, aLink) {
            var _href = obj.selector || obj.href || 'javascript:;';
            aLink = $('<a href="' + _href + '" target="_self">');

            return aLink;
        },
        createGoTopIcon: function () {
            var opts = this.opts,
                goTopObj = opts.goTopIcon,
                _speed = opts.scrollSpeed || 300;
            var _goTopIconShow = opts.goTopIconShow || 400;

            var $sideBarCell = $('<div class="sidebar_cell">'),
                $cellWrapper = $('<div class="cell-wrapper">'),
                $icon = $('<i class="cell-item back-to-top">'),
                $text = $('<span class="cell-item cell-text">').html(goTopObj.cellText),
                $aLink = $('<a href="javascript:;">');

            var _iconStyle = {},
                _textStyle = {};
            opts.commonIconStyle && $.extend(_iconStyle, opts.commonIconStyle);
            goTopObj.iconClass && $icon.addClass(goTopObj.iconClass);
            goTopObj.iconStyle && $.extend(_iconStyle, goTopObj.iconStyle);
            opts.commonTextStyle && $.extend(_textStyle, opts.commonTextStyle);
            goTopObj.textStyle && $.extend(_textStyle, goTopObj.textStyle);

            $icon.css(_iconStyle);
            $text.css(_textStyle);

            $cellWrapper.append($aLink.append($icon, $text)).appendTo($sideBarCell);

            $sideBarCell.on('click', function (e) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, _speed);
                return false;
            });

            $(window).on('load scroll', function () {
                var winTop = $(window).scrollTop();
                winTop < 400 ? $sideBarCell.fadeOut() : $sideBarCell.fadeIn();
            });

            $('#go-top').append($sideBarCell);

            return this;
        },
        watchScroll: function () {
            var currentIndex = 0,
                topArray = this.elementTopArray;
            $(window).on('load scroll', function () {
                var winTop = $(window).scrollTop();
                for (var i = 0; i < topArray.length; i++) {
                    var height_1 = topArray[i],
                        height_2 = topArray[i + 1];
                    if (height_1 > winTop) {
                        break;
                    }
                    if (!height_2 || height_1 <= winTop && height_2 > winTop) {
                        currentIndex = i;
                        break;
                    }
                }
                var $sidebarCell = $('#go-top').find('.sidebar_cell');
                $sidebarCell.eq(currentIndex).addClass('active').siblings().removeClass('active');
            });
        },
        moveToElement: function (ele) {
            var elapse = this.opts.scrollSpeed || 200;

            var _top = $(ele).offset().top;

            $('html, body').animate({ scrollTop: _top }, elapse);
        }
    }, true);

    win.esoyu_sideBar = esoyu_sideBar;
})(jQuery, window, document);
$(function () {

    searchAssociation('#autocomplete-p');
    searchAssociation('#autocomplete-a');
    searchAssociation('#autocomplete-m');
    function searchAssociation(el) {
        $(el).autocomplete({
            paramName: 'k',
            transformResult: function (response) {
                return {
                    suggestions: $.map(JSON.parse(response), function (dataItem) {
                        return { value: dataItem.value.replace(new RegExp("<em>", "gm"), '').replace(new RegExp("</em>", "gm"), ''), data: dataItem.data };
                    })
                };
            },
            params: { 'm': $(el).attr('data-type') },
            type: 'POST',
            serviceUrl: $(el).attr('data-url'),

            onSelect: function (val) {
                window.open(val.data);
            }
        });
    };

    var $search = $('#icon-search'),
        $searchBox = $('.search-box'),
        $goTop = $('#go-top-roct, #back-to-top');
    $goTopMac = $('#go-top');
    // 顶部导航栏搜索按钮点击效果
    $search.click(function (e) {
        e.stopPropagation();
        $(this).parent().toggleClass('triggered');
        $searchBox.find('.ipt').eq(0).focus();
    });
    $searchBox.click(function (e) {
        e.stopPropagation();
    });
    $(document).on('scroll click', function () {
        $search.parent().removeClass('triggered');
        if ($(this).scrollTop() > 400) {
            $goTop.add($goTopMac).fadeIn();
        } else {
            $goTop.add($goTopMac).fadeOut();
        }
    });
    $goTop.on('click', function (e) {
        e.stopPropagation();
        $('html,body').animate({ scrollTop: 0 }, 700);
        return false;
    }).hover(function () {
        __commonToggleActive($(this).find('img').eq(1));
    }, function () {
        __commonToggleActive($(this).find('img').eq(0));
    });
    //百度主动推送
    (function () {
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
});
// mac登陆框功能
$(function () {
    var $logBox = $('#logBox'),
        $loginMask = $('#login-mask'),
        $inputRadio = $('#inputRadio');
    var rememberMe = false;
    var loginHtml = '<div class="center-box" id="centerBox"><div class="login-wra" id="login-wra"><div class="login-reg" id="login-reg"><span class="login active">登录</span><span class="reg">注册</span></div><form id="login-form" class="login-form"><fieldset><input type="text" id="username" placeholder="账号/手机号"><p class="error-text">用户名不合法，请重新输入</p></fieldset><fieldset><input type="text" placeholder="验证码" class="code-ipt" maxlength="4" data-session-name="captcha-string" id="login_code_ipt"><img src="" alt="" class="code-img" id="login_img_code"><p class="error-text">验证码格式不正确</p></fieldset><fieldset><input type="password" id="password" placeholder="密码"><p class="error-text">密码不合法，请重新输入</p></fieldset><div class="rem-for"><input type="radio" id="inputRadio"><span>30天自动登录</span><span class="fr forgit-pw" id="forgit-pw">忘记密码？</span></div><button class="login-btn">登录</button><p class="error-text">对不起，用户名或密码错误。请重试。</p></form><div class="tp-login" id="tp-login"><p><span class="txt">一键登录</span></p><span class="qq-icon icon-qq-log"></span><span class="wechat-icon icon-wechat-log"></span></div><div class="tp-reg" id="tp-reg"><p><span class="txt">一键注册</span></p><div class="qq-reg"><span class="qq-icon icon-qq-log"></span><p>QQ注册</p></div><div class="wechat-reg"><span class="wechat-icon icon-wechat-log"></span><p>微信注册</p></div><div class="tel-reg"><span class="mobile-icon icon-mobile" id="tel-reg"></span><p>手机注册</p></div><p class="tip-tel">手机首次注册送积分！</p></div><div class="reg-form" id="reg-bolie"><fieldset><input type="text" placeholder="手机号" id="reg_tel_num" maxlength="11"></fieldset><fieldset><input type="text" placeholder="验证码" class="code-ipt" maxlength="4" data-session-name="captcha-string"><img src="" alt="" class="code-img" id="reg_img_code"></fieldset><fieldset><input type="text" placeholder="短信验证码" maxlength="6" id="reg_note"><button class="send-code" id="send_reg_code">发送验证码</button></fieldset><fieldset><input type="password" placeholder="密码" maxlength="20" minlength="6" id="reg_pw"></fieldset><fieldset><input type="password" placeholder="重复密码" maxlength="20" minlength="6" id="reg_spw"></fieldset><p class="reg_tip"></p><button class="reg-tel-in">注册</button></div></div><div class="bcakPassWord" id="backPW"><p class="back-title">找回密码</p><div class="backPW-step-f"><fieldset><p class="">手机号</p><input type="text" id="pw_tel" maxlength="11"></fieldset><fieldset><p>验证码</p><input type="text" class="code-ipt" maxlength="4" data-session-name="captcha-string"><img src="" class="code-img" id="forgit_pw_img_code" alt=""></fieldset><fieldset><p>短信验证码</p><input type="text" maxlength="6" class="note"><button class="send-code" id="send_code_pw">发送验证码</button></fieldset><p class="back-pw-tip"></p><button class="step-btn" id="step-next">下一步</button></div><div class="backPW-step-t"><fieldset><p>输入密码</p><input type="password" id="f_pw"></fieldset><fieldset><p>确认密码</p><input type="password" id="s_pw"></fieldset><p class="sure-pw-tip"></p><button class="step-btn" id="surePW">确认更改</button></div></div><div class="success-tip" id="succ-tips"><div class="t-round"><i class="icon-marked"></i></div><p class="text-tip">密码修改成功！</p><p class="back-login" id="back-login"><i class="icon-download2"></i>返回登录界面</p></div><div class="close-btn icon-closeBtn" id="closeBtn"></div></div>';
    $loginMask.empty();
    $loginMask.append(loginHtml);
    if ($logBox.length > 0) {
        $logBox.click(function (e) {
            var $target = $(e.target);
            switch ($target.attr('id')) {
                case 'login-btn':
                    toggleLoginReg('login');
                    break;
                case 'reg-btn':
                    toggleLoginReg('reg');
                    break;
                default:
                    break;
            }
        });

        $loginMask.click(function (e) {
            $(this).hide();
        });

        $('#centerBox').click(function (e) {
            e.stopPropagation();
        });

        $('#login-reg').click(function (e) {
            var $target = $(e.target);
            if ($target.is('.login')) {
                toggleLoginReg('login');
            } else if ($target.is('.reg')) {
                toggleLoginReg('reg');
            }
        });

        $('#closeBtn').click(function () {
            $loginMask.hide();
        });

        $inputRadio.click(function () {
            rememberMe = !rememberMe;
            $(this).prop('checked', rememberMe);
        });

        $('.login-btn', '#login-form').click(function (e) {
            e.preventDefault();
            var $inputs = $(this).parents('#login-form').find('input'),
                username = $inputs.eq(0).val(),
                password = $inputs.eq(2).val(),
                remembered = $inputs.eq(3).prop('checked') ? 1 : 0,
                $errorTexts = $(this).parents('#login-form').find('.error-text');

            if (username.length < 2 || username.length > 16) {
                $errorTexts.eq(0).show();
                return;
            } else {
                $errorTexts.eq(0).hide();
            }
            if (password.length < 6 || password.length > 16) {
                $errorTexts.eq(2).show();
                return;
            } else {
                $errorTexts.eq(2).hide();
            }
            var sessionName = $('#login_code_ipt').attr('data-session-name');
            var data = new Object();
            data[sessionName] = $('#login_code_ipt').val();
            data.username = username;
            data.password = password;
            data.remember = remembered;
            if ($('#login_code_ipt').val() == '' || $('#login_code_ipt').val().length != 4) {
                $errorTexts.eq(1).show();
                return;
            }
            $.ajax({
                url: '/login_go',
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (msg) {
                    if (msg['member_info']) {
                        var infoObj = msg['member_info'];

                        // userLogIn(infoObj);
                        window.location.reload();
                    } else {
                        $errorTexts.eq(3).show().text(msg.msg);
                    }
                }
            });
        });
        $('#login_img_code').click(function () {
            getCodeImg($(this));
        });
        $('#tp-login').add('#tp-reg').click(function (e) {
            var $target = $(e.target);

            if ($target.is('.qq-icon')) {
                thirdPartyLogin('/qqcode');
            } else if ($target.is('.wechat-icon')) {
                thirdPartyLogin('/wxcode');
            }
        });
        var $forgit_pw = $('#forgit-pw'),
            $step_next = $('#step-next'),
            $surePW = $('#surePW'),
            $back_login = $('#back-login'),
            $telReg = $('#tel-reg'),
            $send_code_pw = $('#send_code_pw'),
            $forgit_pw_img_code = $('#forgit_pw_img_code'),
            $tips = $('.back-pw-tip'),
            iscodeIsSending = false,
            time_phone,
            curPhoneNum;
        // 忘记密码
        $forgit_pw.click(function () {
            toggleLoginReg('forgitPwF');
            getCodeImg($forgit_pw_img_code);
        });
        $forgit_pw_img_code.click(function () {
            getCodeImg($(this));
        });
        $send_code_pw.click(function () {
            var img_code = $('.backPW-step-f .code-ipt').val();
            curPhoneNum = $('#pw_tel').val();
            if (iscodeIsSending) return;

            var sessionName = $('.backPW-step-f .code-ipt').attr('data-session-name');
            if (!tel_format(curPhoneNum) || curPhoneNum == '') {
                $tips.text('手机号格式错误').show().removeClass('green');
                return;
            }
            if (img_code == '' || img_code.length != 4) {
                $tips.text('图形验证码格式错误').show().removeClass('green');
                return;
            }
            var data = new Object();
            data[sessionName] = img_code;
            data.phone = curPhoneNum;
            $.ajax({
                url: '/password_retrieval',
                data: data,
                type: 'POST',
                success: function (res) {
                    if (res.code == 200) {
                        $tips.text(res.msg).show().addClass('green');
                        iscodeIsSending = true;
                        time_phone = res.time_phone;
                        timerInter($send_code_pw);
                        getCodeImg($forgit_pw_img_code);
                    } else {
                        getCodeImg($forgit_pw_img_code);
                        $tips.text(res.msg).show().removeClass('green');
                    }
                }
            });
        });

        $step_next.click(function () {
            var note_val = $('.backPW-step-f .note').val(),
                re = /^[0-9]+.?[0-9]*$/;
            if (note_val == '') {
                $tips.text('请获取验证码').show().removeClass('green');
                return;
            }
            if (!re.test(note_val) || note_val.length != 6) {
                $tips.text('请输入正确的验证码格式').show().removeClass('green');
                return;
            }
            $.ajax({
                url: '/password_code',
                type: 'POST',
                data: {
                    verification_code: note_val,
                    time_phone: time_phone
                },
                success: function (res) {
                    if (res.code == 200) {
                        $('#pw_tel').val('');
                        $('.backPW-step-f .code-ipt').val('');
                        $('.backPW-step-f .note').val('');
                        toggleLoginReg('forgitPwS');
                    } else {
                        $tips.text(res.msg).show().removeClass('green');
                    }
                }
            });
        });

        // 确认更改
        $surePW.click(function () {
            var $tip = $('.backPW-step-t .sure-pw-tip'),
                pwVal = $('#f_pw').val(),
                spwVal = $('#s_pw').val();
            if (pwVal == '') {
                $tip.text('密码不能为空').show().removeClass('green');
                return;
            }
            if (pwVal.length < 6 || pwVal.length > 20) {
                $tip.text('密码长度为6-20个').show().removeClass('green');
                return;
            }
            if (pwVal !== spwVal) {
                $tip.text('两次输入密码不一致，请重新输入').show().removeClass('green');
                return;
            }
            $.ajax({
                url: '/edit_password',
                type: 'POST',
                data: {
                    phone: curPhoneNum,
                    password: spwVal
                },
                success: function (res) {
                    if (res.code == 200) {
                        toggleLoginReg('sucTip');
                    } else {
                        $tip.text(res.msg).show().removeClass('green');
                    }
                }
            });
        });
        // 返回登录
        $back_login.click(function () {
            toggleLoginReg('login');
        });
        // 手机注册
        var $reg_bolie = $('#reg-bolie'),
            $reg_img_code = $('#reg_img_code'),
            $reg_tel_num = $('#reg_tel_num'),
            $reg_img_code_ipt = $reg_bolie.find('.code-ipt'),
            $send_reg_code = $('#send_reg_code'),
            $reg_note = $('#reg_note'),
            $reg_pw = $('#reg_pw'),
            $reg_spw = $('#reg_spw');
        $reg_tel_in = $('.reg-tel-in');

        $telReg.click(function () {
            toggleLoginReg('telReg');
            getCodeImg($reg_img_code);
        });
        $reg_img_code.click(function () {
            getCodeImg($(this));
        });

        // 注册发送验证码
        $send_reg_code.click(function () {
            var img_code = $reg_img_code_ipt.val();
            curPhoneNum = $reg_tel_num.val(), $tips = $('.reg_tip');
            if (iscodeIsSending) return;

            var sessionName = $reg_img_code_ipt.attr('data-session-name');
            if (!tel_format(curPhoneNum) || curPhoneNum == '') {
                $tips.text('手机号格式错误').show();
                return;
            }
            if (img_code == '' || img_code.length != 4) {
                $tips.text('图形验证码格式错误').show();
                return;
            }

            var data = new Object();
            data[sessionName] = img_code;
            data.phone = curPhoneNum;
            $.ajax({
                url: '/phone_register',
                data: data,
                type: 'POST',
                success: function (res) {
                    if (res.code == 200) {
                        $tips.text(res.msg).show().addClass('green');
                        iscodeIsSending = true;
                        time_phone = res.time_phone;
                        timerInter($send_reg_code);
                        getCodeImg($reg_img_code);
                    } else {
                        getCodeImg($reg_img_code);
                        $tips.text(res.msg).show().removeClass('green');
                    }
                }
            });
        });
        // 注册
        $reg_tel_in.click(function () {
            var reg_pw = $reg_pw.val(),
                reg_spw = $reg_spw.val(),
                reg_note_val = $reg_note.val(),
                $tips = $('.reg_tip'),
                re = /^[0-9]+.?[0-9]*$/;
            if (reg_note_val == '') {
                $tips.text('请获取验证码').show().removeClass('green');
                return;
            }
            if (!re.test(reg_note_val) || reg_note_val.length != 6) {
                $tips.text('请输入正确的验证码格式').show().removeClass('green');
                return;
            }
            if (reg_pw == '') {
                $tips.text('密码不能为空').show().removeClass('green');
                return;
            }
            if (reg_pw.length < 6 || reg_pw.length > 20) {
                $tips.text('密码长度为6-20个').show().removeClass('green');
                return;
            }
            if (reg_pw !== reg_spw) {
                $tips.text('两次输入密码不一致，请重新输入').show().removeClass('green');
                return;
            }
            $.ajax({
                url: '/register',
                type: 'POST',
                data: {
                    verification_code: reg_note_val,
                    time_phone: time_phone,
                    phone: curPhoneNum,
                    password: reg_spw
                },
                success: function (res) {
                    if (res.code == 200) {
                        $tips.text(res.msg).show().addClass('green');
                        window.location.reload();
                    } else {
                        $tips.text(res.msg).show().removeClass('green');
                        return;
                    }
                }
            });
        });

        // 按钮倒计时
        function timerInter(el) {
            var timer,
                num = 60;
            timer = setInterval(function () {
                el.text('重新发送(' + num-- + ')').addClass('forbid');
                if (!iscodeIsSending) {
                    clearInterval(timer);
                    el.text('发送验证码').removeClass('forbid');
                }
                if (num < 0) {
                    clearInterval(timer);
                    el.text('重新发送').removeClass('forbid');
                    iscodeIsSending = false;
                }
            }, 1000);
        };

        $(window).on('load', function () {

            // 提示绑定手机弹框
            var _bindTelTipHtml = '<div class="p-mask"><div class="prompt-box-tel" id="prompt_box"><span class="cancel-tip" id="prompt_cancel">X</span><p class="desc">账号绑定手机号码让账号更安全</p><p class="award">首次绑定手机号码可获得30积分<span class="p-tip">积分可用于下载软件</span></p><a href="/mac/pm/#/uc-tel">立即绑定</a></div></div>';
            var isTipsDown = 0;
            if (window.sessionStorage.hasTip) {
                isTipsDown = window.sessionStorage.hasTip;
            };

            var $_download_btn = $('#down-name'),
                isVipCon = false,
                isLoginCon = false,
                vipLoginCon = false;
            $.ajax({
                url: '/user_management_top',
                type: 'POST',
                success: function (data) {
                    if (data.code == 200) {
                        typeof data.data == 'object' && userLogIn(data.data);
                        window.userLoggedIn = true;
                        window.publicIsSign = data.data.is_sign;
                        $('#no-login').hide();
                        $('#logged-in').show();
                        $('#userCenterBar').show();
                        $('#double11').css('bottom', '510px');
                        if (data.data.vip === 1) {
                            $('#sidebar_QQ').addClass('qq-orange');
                        }
                        if (data.data.is_mobile_checked == 0 && isTipsDown == 0) {
                            $('body').append(_bindTelTipHtml);
                            $('.p-mask').show();
                            $('#prompt_cancel').on('click', function () {
                                $('.p-mask').hide();
                            });
                            window.sessionStorage.hasTip = 1;
                        }
                        if (data.data.msg_count > 0) {
                            var infos = '<a href="/mac/pm/#/uc-msgs" class="new-info-num" target="_self">' + data.data.msg_count + '</a>';
                            $('#logged-in').append(infos);
                            var music = document.getElementById("myaudio");
                            if (isTipsDown == 0) {
                                music.play();
                                window.sessionStorage.hasTip = 1;
                            }
                        }
                    } else {
                        $('#userCenterBar').hide();
                        $('#double11').css('bottom', '440px');
                        isLoginCon = false;
                        $('.mac-repeat').hide();
                    }
                    if (data == '') {
                        isLoginCon = false;
                        $('.mac-repeat').hide();
                    } else {
                        isLoginCon = true;
                        if (data.data.vip) {
                            isVip = true;
                        } else {
                            isVip = false;
                        }
                    }
                    vipLogin = isLoginCon ? isVip ? true : false : false;
                    if (vipLogin) {
                        $_download_btn.text('会员下载');
                    } else {
                        $_download_btn.text('立即下载');
                    }
                },
                error: function (data) {}
            });
        });
        $('#sign-price').on('click', function () {
            if (!window.userLoggedIn) {
                $('#login-btn').click();
                return;
            }
            if (window.publicIsSign == 0) {
                $('#mask-sign').find('.sign-suc').css('paddingLeft', '164px');
                $('#mask-sign').find('.sign-suc').html('签到成功<em>（获得一次免费抽奖机会）</em>');
            }
            $('#mask-sign').fadeIn();
        });

        var loggedOut = false;

        $('#logged-in').click(function (e) {
            var $target = $(e.target).closest('#logOutBtn');
            if ($target.is('#logOutBtn')) {
                if (loggedOut) return;
                loggedOut = true;
                $.ajax({
                    url: '/login_out',
                    type: 'GET',
                    success: function (msg) {
                        if (msg['code'] == 200) {
                            $('#logged-in').hide();
                            $('#no-login').show();
                            window.location.reload();
                            window.sessionStorage.hasTip = 0;
                        } else {
                            loggedOut = false;
                            alert('登出失败，请重试');
                        }
                    },
                    error: function () {
                        loggedOut = false;
                        alert('登出失败，请重试');
                    }
                });
            }
            if ($(e.target).closest('a').is('#sign-nav')) {

                if (publicIsSign == 0) {
                    $('#mask-sign').find('.sign-suc').css('paddingLeft', '164px');
                    $('#mask-sign').find('.sign-suc').html('签到成功<em>（获得一次免费抽奖机会）</em>');
                }
                $('#mask-sign').fadeIn();
            }
        });

        // 抽奖
        var lottery = {
            index: 0, //当前转动到哪个位置，起点位置
            count: 0, //总共有多少个位置
            timer: 0, //setTimeout的ID，用clearTimeout清除
            speed: 20, //初始转动速度
            times: 0, //转动次数
            cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: -1, //中奖位置
            newIndex: 0,
            init: function (id) {
                if ($("#" + id).find(".lottery-unit").length > 0) {
                    var $lottery = $("#" + id),
                        $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    $lottery.find(".lottery-unit-" + this.index).addClass("active");
                };
            },
            roll: function () {
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-" + index).removeClass("active");
                index += 1;
                if (index > count - 1) {
                    index = 0;
                };
                $(lottery).find(".lottery-unit-" + index).addClass("active");
                this.index = index;
                return false;
            },
            stop: function (index) {
                this.prize = index;
                return false;
            }
        };

        function roll(index_id) {
            if (typeof index_id == 'number') {
                lottery.newIndex = index_id;
            }
            lottery.times += 1;
            lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
            if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
                clearTimeout(lottery.timer);

                var text = $('.lottery-unit-' + lottery.prize).find('p').text();
                if (text.indexOf('积分') > 0) {
                    __commonToggleActive($('#prize-box').find('.point-p'));
                    $('#prize-box').find('.point-p').text(text);
                }
                if (text.indexOf('优惠券') > 0) {
                    __commonToggleActive($('#prize-box').find('.coupon-p'));
                    $('#prize-box').find('.coupon-p').text(text);
                }
                if (text == '谢谢参与') {
                    __commonToggleActive($('#prize-box').find('.thanks'));
                }
                $('#prize-box').fadeIn();
                lottery.prize = -1;
                lottery.times = 0;
                clicking = false;
            } else {
                if (lottery.times < lottery.cycle) {
                    lottery.speed -= 10;
                } else if (lottery.times == lottery.cycle) {
                    var index;
                    if (lottery.newIndex == 0) {
                        index = 7;
                    } else {
                        lottery.obj.find('.lottery-unit').each(function (item, obj) {
                            if (lottery.newIndex == $(obj).attr('data-id')) {
                                index = $(obj).attr('data-index');
                            }
                        });
                    }
                    lottery.prize = index;
                } else {
                    if (lottery.times > lottery.cycle + 10 && (lottery.prize == 0 && lottery.index == 7 || lottery.prize == lottery.index + 1)) {
                        lottery.speed += 110;
                    } else {
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed < 40) {
                    lottery.speed = 40;
                };
                lottery.timer = setTimeout(roll, lottery.speed); //循环调用
            }
            return false;
        }
    }

    /**
     * 登陆后显示已登陆状态
     * @param dataObj 数据对象
     */
    var clicking = false;
    var tempStr = '<img src="{{ src }}" class="avatar-img-hook"><span class="vip-tag{{ vipStatus }}">VIP</span><span class="points">{{ points }}积分</span><i class="hover-arrow"></i><div class="hover-show"><p class="nickname common_ovh">{{ nickname }}</p><div class="pm-center"><a href="/mac/pm/#/uc-overall" class="pm-item"><i class="icon icon-user"></i><em>用户后台</em></a><a href="/mac/pm/#/cm-likes" class="pm-item"><i class="icon icon-likes"></i><em>我的收藏</em></a><a href="/Mac/vip" class="pm-item"><i class="icon icon-VIP"></i><em>成为VIP</em></a><a href="/mac/pm/#/cm-footprint" class="pm-item"><i class="icon icon-edit"></i><em>我的足迹</em></a><a href="javascript:;" class="pm-item" id="sign-nav"><i class="icon icon-qiandao"></i><em>签到抽奖</em></a><a href="javascript:;" class="pm-item" id="logOutBtn"><i class="icon icon-logout"></i><em>退出</em></a></div></div>';
    // 抽奖html
    var sign_prize_html = '<div class="luck-draw" id="lottery"><span class="close">X</span><p class="sign-suc">今日已签到</p><p class="sign-tips"><i class="icon-star"></i><span>每日签到可获得一次免费抽奖机会</span>            <i class="icon-star"></i></p><p class="tip">再次抽奖所需10点积分</p><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="lottery-unit lottery-unit-0" data-id="{{ prize_info[0].id }}" data-index="0"><div class="item"><img src="{{ prize_info[0].src }}" alt=""><p class="title">{{ prize_info[0].title }}</p></div></td><td class="lottery-unit lottery-unit-1" data-id="{{ prize_info[1].id }}" data-index="1"><div class="item"><img src="{{ prize_info[1].src }}" alt=""><p class="title">{{ prize_info[1].title }}</p></div></td><td class="lottery-unit lottery-unit-2" data-id="{{ prize_info[2].id }}" data-index="2"><div class="item"><img src="{{ prize_info[2].src }}" alt=""><p class="title">{{ prize_info[2].title }}</p></div></td></tr><tr><td class="lottery-unit lottery-unit-7"><div class="item"><p class="tanks">谢谢参与</p></div></td><td class="lottery-btn"><div class="go">立即抽奖<span>GO</span><em>* 10积分/次</em></div>    </td><td class="lottery-unit lottery-unit-3" data-id="{{ prize_info[6].id }}" data-index="3"><div class="item"><img src="{{ prize_info[6].src }}" alt=""><p class="title">{{ prize_info[6].title }}</p></div></td></tr><tr><td class="lottery-unit lottery-unit-6" data-id="{{ prize_info[3].id }}" data-index="6"><div class="item"><img src="{{ prize_info[3].src }}" alt=""><p class="title">{{ prize_info[3].title }}</p></div></td><td class="lottery-unit lottery-unit-5" data-id="{{ prize_info[4].id }}" data-index="5"><div class="item"><img src="{{ prize_info[4].src }}" alt=""><p class="title">{{ prize_info[4].title }}</p></div></td><td class="lottery-unit lottery-unit-4" data-id="{{ prize_info[5].id }}" data-index="4"><div class="item"><img src="{{ prize_info[5].src }}" alt=""><p class="title">{{ prize_info[5].title }}</p></div></td></tr></tbody></table><div id="prize-box" class="prize-box"><div class="close-prize">X</div><div class="prize-wra"><div class="prize coupon-p active">10元优惠券</div><div class="prize point-p">10点积分</div><div class="prize thanks">哎呀没中，换个姿势再来一次！</div><div class="prize empty"></div></div>         <a href="javascript:;" class="cont-btn">继续抽奖</a><a href="/mac/pm/#/vip-spent" class="link-list">查看抽奖记录</a></div></div>';
    function userLogIn(dataObj) {
        if ($logBox.length > 0) {
            var imgSrc = dataObj['headimg'] || '/assets/images/avatarImg-1.jpg',
                points = dataObj['point'] || 0,
                message = dataObj['msg_count'] || dataObj['message'] || 0,
                vipStatus = dataObj.vip == 1 ? ' vip' : '',
                nickname = dataObj.nickname,
                __tempStr;
            var prize_info_data = dataObj.prize_info,
                _pointImg = '/assets/images/luck-point.png',
                _couponImg = '/assets/images/luck-coupon.png',
                _prizeHtml;

            points > 0 ? __tempStr = tempStr.replace('{{ src }}', imgSrc).replace('{{ nickname }}', nickname).replace('{{ points }}', points).replace('{{ message }}', message).replace('{{ vipStatus }}', vipStatus) : __tempStr = tempStr.replace('{{ src }}', imgSrc).replace('{{ nickname }}', nickname).replace('{{ vipStatus }}', vipStatus).replace('<span class="points">{{ points }}积分</span>', '');
            _prizeHtml = sign_prize_html.replace('{{ prize_info[0].id }}', prize_info_data[0].id).replace('{{ prize_info[0].src }}', prize_info_data[0].type == 1 ? _pointImg : _couponImg).replace('{{ prize_info[0].title }}', prize_info_data[0].title).replace('{{ prize_info[1].id }}', prize_info_data[1].id).replace('{{ prize_info[1].src }}', prize_info_data[1].type == 1 ? _pointImg : _couponImg).replace('{{ prize_info[1].title }}', prize_info_data[1].title).replace('{{ prize_info[2].id }}', prize_info_data[2].id).replace('{{ prize_info[2].src }}', prize_info_data[2].type == 1 ? _pointImg : _couponImg).replace('{{ prize_info[2].title }}', prize_info_data[2].title).replace('{{ prize_info[3].id }}', prize_info_data[3].id).replace('{{ prize_info[3].src }}', prize_info_data[3].type == 1 ? _pointImg : _couponImg).replace('{{ prize_info[3].title }}', prize_info_data[3].title).replace('{{ prize_info[4].id }}', prize_info_data[4].id).replace('{{ prize_info[4].src }}', prize_info_data[4].type == 1 ? _pointImg : _couponImg).replace('{{ prize_info[4].title }}', prize_info_data[4].title).replace('{{ prize_info[5].id }}', prize_info_data[5].id).replace('{{ prize_info[5].src }}', prize_info_data[5].type == 1 ? _pointImg : _couponImg).replace('{{ prize_info[5].title }}', prize_info_data[5].title).replace('{{ prize_info[6].id }}', prize_info_data[6].id).replace('{{ prize_info[6].src }}', prize_info_data[6].type == 1 ? _pointImg : _couponImg).replace('{{ prize_info[6].title }}', prize_info_data[6].title);

            $('#mask-sign').append(_prizeHtml);
            $('#mask-sign').find('.lottery-unit-0').addClass('active');

            lottery.init('lottery');
            $("#lottery .lottery-btn").on('click', function () {
                if (clicking) {
                    //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                    return false;
                } else {
                    $.ajax({
                        url: '/sign_prize',
                        type: 'POST',
                        success: function (res) {
                            if (res.code == 200) {
                                lottery.speed = 100;
                                roll(res.id); //转圈过程不响应click事件，会将click置为false
                                clicking = true;
                                $('#sign-btn').text('已签到');
                                return false;
                            } else {
                                $('#prize-box').find('.empty').text(res.msg);
                                __commonToggleActive($('#prize-box').find('.empty'));
                                $('#prize-box').fadeIn();
                            }
                        }
                    });
                }
            });
            $('#lottery .close').on('click', function () {
                $('#mask-sign').fadeOut(400);
            });
            $('.close-prize').on('click', function () {
                $('#prize-box').fadeOut();
            });
            $('.cont-btn').on('click', function () {
                $("#lottery .lottery-btn").click();
                $('#prize-box').fadeOut();
            });
            $('#logged-in').empty().append(__tempStr);
        }
    }

    var newWindow;
    function thirdPartyLogin(url) {
        if (newWindow) {
            newWindow.close();
        }
        var iWidth = 750,
            iHeight = 500,
            winWidth = $(window).width(),
            winHeight = $(window).height(),
            iTop = (winHeight - iHeight) / 2,
            iLeft = (winWidth - iWidth) / 2;
        newWindow = window.open(url, '第三方安全登录', 'width=' + iWidth + ', height=' + iHeight + ', top=' + iTop + ', left=' + iLeft);
        setInterval(function () {
            var _cookie = document.cookie.match(/(qq_refersh_time=1)|(wx_refersh_time=1)/gi);
            if (_cookie) {
                newWindow.close();
                $('#login-mask').hide();
                deleteCookie('qq_refersh_time');
                deleteCookie('wx_refersh_time');
                window.location.reload();
            }
        }, 2000);
    }

    function deleteCookie(cName) {
        document.cookie = cName + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/';
        document.cookie = cName + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/mac';
    }

    function toggleLoginReg(str) {
        $loginMask.show();
        var $loginWra = $('#login-wra'),
            $loginForm = $('#login-form'),
            $tpLogin = $('#tp-login'),
            $tpReg = $('#tp-reg'),
            $loginReg = $('#login-reg'),
            $loginBtn = $('#login-reg .login'),
            $regBtn = $('#login-reg .reg');

        var $backPW = $('#backPW'),
            $backStepF = $backPW.find('.backPW-step-f'),
            $backStepS = $backPW.find('.backPW-step-t'),
            $successTipW = $('#succ-tips');
        var $regMobile = $('#reg-bolie');
        switch (str) {
            case 'login':
                $loginWra.show();
                $backPW.removeClass('active');
                $successTipW.removeClass('active');
                $regMobile.removeClass('active');
                __commonToggleActive($loginBtn);
                $loginForm.show();
                $tpLogin.show();
                $tpReg.hide();
                getCodeImg($('#login_img_code'));
                break;
            case 'reg':
                $loginWra.show();
                $backPW.removeClass('active');
                $successTipW.removeClass('active');
                $regMobile.removeClass('active');
                __commonToggleActive($regBtn);
                $loginForm.hide();
                $tpLogin.hide();
                $tpReg.show();
                break;
            case 'forgitPwF':
                __commonToggleActive($backPW);
                $loginWra.hide();
                $backStepF.show();
                $backStepS.hide();
                break;
            case 'forgitPwS':
                __commonToggleActive($backPW);
                $loginWra.hide();
                $backStepF.hide();
                $backStepS.show();
                break;
            case 'sucTip':
                __commonToggleActive($successTipW);
                $backPW.removeClass('active');
                break;
            case 'telReg':
                __commonToggleActive([$regMobile, $regBtn]);
                $loginForm.hide();
                $tpLogin.hide();
                $tpReg.hide();
                $backPW.removeClass('active');
                break;
            default:
                throw new Error('toggleMaskShow函数只接受两种字符串为参数，“login”或“reg”');
                break;
        }
    }
    $(window).on('load', function () {
        $('#history').find('.history-wrapper ul').empty();
        findHistroy();
    });
    $('#history').find('.clear-histroy').on('click', function () {
        window.localStorage.removeItem("history_");
        $(this).removeClass('active');
        $('#history').find('.history-wrapper ul').empty();
        $('#history').find('ul').append('<li>暂无记录，赶快去浏览吧！</li>');
    });

    if (navigator.userAgent.indexOf("MSIE 8.0") > 0 && !window.innerWidth) {
        $('.common_andr-header .sub-nav .hot-item li:last-child').css('marginRight', '0');

        var $starItems = $('.common_star-item');
        $starItems.each(function (i, ele) {
            var $this = $(this);
            $this.css({
                fontSize: '18px'
            });
            var num = $this[0].className.match(/star([0-5])/)[1],
                html = '';
            for (var j = 1; j <= num; j++) {
                var span = '<i class="icon-star" style="color:' + '#FFA938"' + '></i>';
                html += span;
            }

            for (var j = 5; j > num; j--) {
                var span = '<i class="icon-star" style="color:' + '#ddd"' + '></i>';
                html += span;
            }

            $this.append(html).removeClass('common_star-item');
        });
    }
});
/**
 * 全局切换或滑动标签的函数。一般使用active作为当前激活标签的类名，如果已使用其它类名，请将类名作为二参传入
 * @param element 要切换的目标标签
 * @param active  可选参数；激活（当前）标签的样式类名，默认为‘active’，如果另有定义，则需传入自定义的类名
 */
function __commonToggleActive(element, active) {
    var active = active || 'active';
    if (typeof element === 'object') {
        $(element).each(function (index, ele) {
            $(ele).addClass(active).siblings().removeClass(active);
        });
    } else {
        $(element).addClass(active).siblings().removeClass(active);
    }
};

/**
 * 公用滑动门功能的实现
 * @param el  滑动门对象
 * @param distance  滑动的距离
 */
function __commonMoveSlider(el, distance) {
    if (document.createElement('div').style.perspective !== 'undefined') {
        //处理浏览器兼容性，不支持translate3d则使用left定位
        $(el).css({
            transform: 'translate3d(' + distance + 'px, 0, 0)'
        });
    } else {
        $(el).css({
            left: distance + 'px'
        });
    }
}

function __commonHtmlParse(str) {
    if (typeof str != 'string') {
        return str;
    }

    var reg = /[<>]/gi;
    return str.replace(reg, function (match) {
        switch (match) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            default:
                break;
        }
    });
}

function __commonStat(data) {
    if (data == '') {
        return;
    };
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + data;
    var s = document.getElementsByTagName("script")[1];
    s.parentNode.insertBefore(hm, s);
};

var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?a5037ca326328325ebb5d262d614b259";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

var alertTimeoutId;
function alert(str) {
    if ($('#alertMask').length > 0) {
        $('#alertMask').find('p').text(str);
        $('#alertMask').show();
        if (alertTimeoutId) clearTimeout(alertTimeoutId);
        alertTimeoutId = setTimeout(function () {
            $('#alertMask').hide();
        }, 2000);
    } else {
        var $alertMask = $('<div id="alertMask">');
        $alertMask.css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,.4)',
            textAlign: 'center',
            zIndex: '99999'
        });
        $alertMask.click(function (e) {
            if (e.target === e.currentTarget) $(this).hide();
        });

        var $alertBox = $('<div id="alertBox">');
        $alertBox.css({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#fff',
            width: '440px',
            height: '136px',
            margin: 'auto',
            borderRadius: '10px'
        });

        var $h = $('<h4>提示框</h4>');
        $h.css({
            fontSize: '16px',
            lineHeight: '50px',
            paddingLeft: '20px',
            textAlign: 'left'
        });

        var $p = $('<p>').text(str);
        $p.css({
            textAlign: 'left',
            fontSize: '14px',
            paddingLeft: '20px'
        });

        var $button = $('<span>确定</span>');
        $button.css({
            display: 'inline-block',
            width: '80px',
            height: '30px',
            lineHeight: '30px',
            fontSize: '14px',
            border: '1px solid #0972c1',
            borderRadius: '5px',
            textAlign: 'center',
            marginTop: '20px',
            cursor: 'pointer'
        });
        $button.on('click', function () {
            $('#alertMask').hide();
        });

        $alertBox.append($h, $p, $button).appendTo($alertMask);
        $('body').append($alertMask);
        if (alertTimeoutId) clearTimeout(alertTimeoutId);
        alertTimeoutId = setTimeout(function () {
            $('#alertMask').hide();
        }, 2000);
    }
}

// 历史记录
function addHistory() {
    var array = new Array();
    var res = window.localStorage.getItem('history_');
    var hisJson = { "href": location.href, "title": $(document).attr("title") };
    if (res) {
        var index = -1;
        array = jQuery.parseJSON(res);
        $.each(array, function (k, v) {
            if (v.title == $(document).attr("title")) {
                index = jQuery.inArray(v, array);
            }
        });
        if (index > -1) {
            array.splice(index, 1); // 删除与当前重复的记录
        }
    }
    array.push(hisJson);
    if (array.length > 6) {
        array.splice(0, array.length - 6);
    }
    var d = JSON.stringify(array);
    window.localStorage.setItem("history_", d);
}
/**
 * 获取storage中的值
 * @param {Object} name
 */

function findHistroy() {
    var res = window.localStorage.getItem('history_');
    if (res) {
        $('#history').find('.clear-histroy').addClass('active');
        var hisJson = JSON.parse(res).reverse();
        $.each(hisJson, function (k, v) {
            var html = '<li class="his-item"><a href="' + v.href + '">' + v.title + '</a></li>';
            $('#history').find('.history-wrapper ul').append(html);
        });
    } else {
        $('#history').find('.clear-histroy').removeClass('active');
        $('#history').find('ul').append('<li>暂无记录，赶快去浏览吧！</li>');
    }
}

// 获取图形验证码
function getCodeImg(el) {
    $.ajax({
        url: '/tools/comment_code_img',
        type: 'GET',
        success: function (res) {
            el.attr('src', res.code_img_source);
        },
        error: function (error) {
            return error;
        }
    });
}
// 手机格式验证
function tel_format(tel) {
    var ret = /^1[34578]\d{9}$/;
    if (ret.test(tel)) {
        return true;
    } else {
        return false;
    }
}
jQuery(function () {
    setInterval(function () {
        jQuery('.js-animated-circles').toggleClass('animated');
    }, 2000);jQuery('#lc-girl-block-en_2').on({ 'mouseover': function () {
            jQuery(this).find('.js-livechat-hint').removeClass('hide_hint').addClass('show_hint');
        }, 'mouseleave': function () {
            jQuery(this).find('.js-livechat-hint').removeClass('show_hint').addClass('hide_hint');
        } });
});