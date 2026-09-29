"use client";
import * as React from "react";
import copy from "../../content/prototype.json";
import resources from "../../content/resources.json";

const DL = {};
(() => {
    const __ds_ns = DL;
    const __ds_scope = {};
    (__ds_ns.__errors = __ds_ns.__errors || []);
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function Mark({ size = 32, style, ...props }) {
                return React.createElement(copy["sacdb1373d176"], _extends({
                    viewBox: "0 0 32 32",
                    width: size,
                    height: size,
                    style: {
                        display: copy["s496aca80e4d8"],
                        flex: copy["s140bedbf9c3f"],
                        ...style
                    },
                    "aria-hidden": copy["sb5bea41b6c62"]
                }, props), React.createElement(copy["s38a9c1e72158"], {
                    x1: "2",
                    y1: "16",
                    x2: "30",
                    y2: "16",
                    stroke: copy["s8a04dbccff0b"],
                    strokeWidth: "1"
                }), React.createElement(copy["s38a9c1e72158"], {
                    x1: "16",
                    y1: "2",
                    x2: "16",
                    y2: "30",
                    stroke: copy["s8a04dbccff0b"],
                    strokeWidth: "1"
                }), React.createElement(copy["s8a39178d327e"], {
                    cx: "16",
                    cy: "16",
                    r: "10",
                    fill: copy["s140bedbf9c3f"],
                    stroke: copy["s8a04dbccff0b"],
                    strokeWidth: "1"
                }), React.createElement(copy["s8a39178d327e"], {
                    cx: "16",
                    cy: "16",
                    r: "4",
                    fill: "var(--accent, #1e90ff)"
                }));
            }
            function Wordmark({ size = copy["sc10b7e1d119f"], tone = copy["s929260ad9b9e"], mark = copy["s360f84035942"], href, style, ...props }) {
                const Tag = href ? copy["sca978112ca1b"] : copy["s37a0025aa1f2"];
                const color = tone === copy["s7705accd2694"] ? "var(--color-white)" : tone === copy["sb728b7e775f7"] ? "var(--text-primary)" : copy["s035300f3afee"];
                return React.createElement(Tag, _extends({
                    href: href,
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        gap: copy["saf3bf7731ee3"] + size + copy["s09f1a1a4bd86"],
                        fontFamily: "var(--font-sans)",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: size,
                        letterSpacing: copy["s58f8f9e3c0b6"],
                        lineHeight: 1,
                        color,
                        textDecoration: copy["s140bedbf9c3f"],
                        whiteSpace: copy["s010d16d2e921"],
                        ...style
                    }
                }, props), mark !== copy["s140bedbf9c3f"] && React.createElement(Mark, {
                    size: copy["saf3bf7731ee3"] + size + copy["s18debc53c4c6"]
                }), React.createElement(copy["s37a0025aa1f2"], null, copy["seec7b403b4a9"]));
            }
            Object.assign(__ds_scope, { Mark, Wordmark });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s4647973b512c"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function Accordion({ items = [], defaultOpen = null, style, ...props }) {
                const [open, setOpen] = React.useState(defaultOpen);
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        display: copy["s0f2a693e93e2"],
                        ...style
                    }
                }, props), items.map((it, i) => {
                    const on = open === i;
                    return React.createElement(copy["scd35a2426062"], {
                        key: i,
                        style: {
                            borderBottom: "var(--divider-width) solid var(--scheme-border, var(--border))"
                        }
                    }, React.createElement(copy["sc3e2d78f3ff3"], {
                        onClick: () => setOpen(on ? null : i),
                        "aria-expanded": on,
                        style: {
                            appearance: copy["s140bedbf9c3f"],
                            background: copy["s140bedbf9c3f"],
                            border: copy["s140bedbf9c3f"],
                            width: "100%",
                            display: copy["s222f930b8752"],
                            alignItems: copy["sf179a509d32b"],
                            justifyContent: copy["s8c72b36502d3"],
                            gap: "var(--space-4)",
                            padding: "var(--space-5) 0",
                            textAlign: copy["s360f84035942"],
                            font: copy["s035300f3afee"],
                            fontSize: "var(--text-h6)",
                            fontWeight: "var(--font-weight-medium)",
                            color: copy["s035300f3afee"],
                            lineHeight: "var(--leading-heading)"
                        }
                    }, it.question, React.createElement(copy["s37a0025aa1f2"], {
                        className: copy["s94d05ba1838b"],
                        "aria-hidden": copy["sb5bea41b6c62"],
                        style: {
                            transform: on ? copy["s3ce71f719585"] : copy["s140bedbf9c3f"],
                            transition: copy["s6910fe1b338b"],
                            flex: copy["s53bd110fbe70"]
                        }
                    }, copy["sf09f7f182d49"])), React.createElement(copy["scd35a2426062"], {
                        style: {
                            maxHeight: on ? copy["sb4490db62d25"] : 0,
                            overflow: copy["se564b4081d7a"],
                            transition: copy["s1a3272b49277"]
                        }
                    }, React.createElement(copy["scd35a2426062"], {
                        style: {
                            paddingBottom: "var(--space-5)",
                            color: "var(--scheme-text-secondary, var(--text-secondary))",
                            maxWidth: "var(--container-lg)"
                        }
                    }, it.answer)));
                }));
            }
            Object.assign(__ds_scope, { Accordion });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s033dc7e4e375"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const tones = {
                neutral: {
                    background: "var(--surface-sunken)",
                    color: "var(--text-primary)",
                    borderColor: "var(--border)"
                },
                accent: {
                    background: "var(--accent-quiet)",
                    color: "var(--accent-ink)",
                    borderColor: "var(--color-blue-lighter)"
                },
                flag: {
                    background: "var(--flag-quiet)",
                    color: "var(--flag-ink)",
                    borderColor: "var(--color-amber-lighter)"
                },
                outline: {
                    background: copy["s10e9f5602d24"],
                    color: copy["s035300f3afee"],
                    borderColor: copy["s8a04dbccff0b"]
                },
                inverse: {
                    background: "var(--alpha-white-10)",
                    color: "var(--color-white)",
                    borderColor: "var(--border-inverse)"
                }
            };
            function Badge({ tone = copy["s7e2372f4115c"], icon, square = false, children, style, ...props }) {
                return React.createElement(copy["s37a0025aa1f2"], _extends({
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-1)",
                        padding: copy["sa606a886c2a4"],
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-semibold)",
                        lineHeight: "var(--leading-snug)",
                        borderRadius: square ? "var(--radius-drawing)" : "var(--radius-badge)",
                        border: "var(--border-width) solid",
                        whiteSpace: copy["s010d16d2e921"],
                        ...tones[tone],
                        ...style
                    }
                }, props), icon && React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    style: {
                        fontSize: copy["sfe3d65e52630"]
                    }
                }, icon), children);
            }
            Object.assign(__ds_scope, { Badge });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["se7d326e14060"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const base = {
                display: copy["s123306850fe1"],
                alignItems: copy["sf179a509d32b"],
                justifyContent: copy["sf179a509d32b"],
                gap: "var(--space-3)",
                borderRadius: "var(--radius-button)",
                whiteSpace: copy["s010d16d2e921"],
                fontFamily: "var(--font-sans)",
                fontSize: copy["s035300f3afee"],
                lineHeight: "var(--leading-body)",
                textDecoration: copy["s140bedbf9c3f"],
                transition: "var(--transition-control)",
                border: "var(--border-width) solid transparent"
            };
            const variants = {
                primary: {
                    background: "var(--accent)",
                    borderColor: "var(--accent)",
                    color: "var(--color-white)",
                    fontWeight: "var(--font-weight-medium)"
                },
                secondary: {
                    background: copy["s10e9f5602d24"],
                    borderColor: "var(--border)",
                    color: copy["s035300f3afee"],
                    fontWeight: "var(--font-weight-medium)",
                    backdropFilter: copy["se2fe5c322366"]
                },
                inverse: {
                    background: "var(--color-white)",
                    borderColor: "var(--color-white)",
                    color: "var(--color-neutral-darkest)",
                    fontWeight: "var(--font-weight-medium)"
                },
                "secondary-inverse": {
                    background: copy["s10e9f5602d24"],
                    borderColor: "var(--border-inverse)",
                    color: "var(--color-white)",
                    fontWeight: "var(--font-weight-medium)",
                    backdropFilter: copy["se2fe5c322366"]
                },
                link: {
                    background: copy["s140bedbf9c3f"],
                    borderColor: copy["s10e9f5602d24"],
                    color: copy["s035300f3afee"],
                    gap: "var(--space-2)",
                    textDecoration: copy["s944969efb294"],
                    textUnderlineOffset: copy["s747614001f01"]
                },
                ghost: {
                    background: copy["s140bedbf9c3f"],
                    borderColor: copy["s10e9f5602d24"],
                    color: copy["s035300f3afee"]
                }
            };
            const hovers = {
                primary: {
                    background: "var(--accent-hover)",
                    borderColor: "var(--accent-hover)"
                },
                secondary: {
                    background: "var(--alpha-ink-5)"
                },
                inverse: {
                    background: "var(--color-neutral-lighter)",
                    borderColor: "var(--color-neutral-lighter)"
                },
                "secondary-inverse": {
                    background: "var(--alpha-white-10)"
                },
                link: {
                    color: "var(--link-hover)"
                },
                ghost: {
                    background: "var(--alpha-ink-5)"
                }
            };
            const sizes = {
                default: {
                    paddingBlock: copy["s28a5f8bf50fb"],
                    paddingInline: copy["sa9f23226d971"]
                },
                sm: {
                    paddingBlock: copy["se53fcdb082ed"],
                    paddingInline: copy["s7b8ee66537de"],
                    fontSize: "var(--text-small)"
                },
                link: {
                    padding: 0
                },
                icon: {
                    width: copy["sfb391dd7c415"],
                    height: copy["sfb391dd7c415"],
                    padding: 0
                }
            };
            function Button({ variant = copy["s986a1b7135f4"], size = copy["s37a8eec1ce19"], iconLeft, iconRight, href, disabled, children, style, ...props }) {
                const [hover, setHover] = React.useState(false);
                const Tag = href ? copy["sca978112ca1b"] : copy["sc3e2d78f3ff3"];
                const s = {
                    ...base,
                    ...variants[variant],
                    ...sizes[size],
                    ...(hover && !disabled ? hovers[variant] : null),
                    ...(disabled ? {
                        opacity: 0.5,
                        pointerEvents: copy["s140bedbf9c3f"]
                    } : null),
                    ...style
                };
                return React.createElement(Tag, _extends({
                    href: href,
                    disabled: !href ? disabled : undefined,
                    style: s,
                    onMouseEnter: () => setHover(true),
                    onMouseLeave: () => setHover(false)
                }, props), iconLeft && React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    style: {
                        fontSize: copy["s5583ee65289d"]
                    }
                }, iconLeft), children, iconRight && React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    style: {
                        fontSize: copy["s5583ee65289d"]
                    }
                }, iconRight));
            }
            Object.assign(__ds_scope, { Button });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sa4bac4d479f1"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function Card({ tone = copy["s763cdc62a869"], square = false, padding = "var(--space-8)", interactive = false, featured = false, children, style, ...props }) {
                const [hover, setHover] = React.useState(false);
                const tones = {
                    surface: {
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text-primary)"
                    },
                    canvas: {
                        background: "var(--canvas)",
                        borderColor: "var(--border)",
                        color: "var(--text-primary)"
                    },
                    sunken: {
                        background: "var(--surface-sunken)",
                        borderColor: "var(--border)",
                        color: "var(--text-primary)"
                    },
                    transparent: {
                        background: copy["s10e9f5602d24"],
                        borderColor: "var(--scheme-border, var(--border))",
                        color: copy["s035300f3afee"]
                    },
                    ink: {
                        background: "var(--surface-ink)",
                        borderColor: "var(--border-inverse)",
                        color: "var(--text-inverse)"
                    }
                };
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        border: "var(--border-width) solid",
                        borderRadius: square ? "var(--radius-drawing)" : "var(--radius-card)",
                        padding,
                        boxShadow: interactive && hover ? "var(--elevation-raised)" : "var(--elevation-flat)",
                        transition: "var(--transition-control)",
                        ...tones[tone],
                        ...(featured ? {
                            borderColor: "var(--accent)",
                            position: copy["sd2d9e1f13413"]
                        } : null),
                        ...style
                    },
                    onMouseEnter: () => setHover(true),
                    onMouseLeave: () => setHover(false)
                }, props), children);
            }
            Object.assign(__ds_scope, { Card });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s5e9fd9c24e98"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function Checkbox({ checked, indeterminate = false, disabled, label, description, onChange, style, ...props }) {
                const on = checked || indeterminate;
                return React.createElement(copy["s1aca80e8b55c"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gridTemplateColumns: copy["s5cd1f84e2c68"],
                        gap: "var(--space-3)",
                        alignItems: copy["scced28c6dc3f"],
                        cursor: disabled ? copy["s37a8eec1ce19"] : copy["s1cdf95bd12e9"],
                        opacity: disabled ? 0.5 : 1,
                        ...style
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        width: copy["s8c756dc2fd39"],
                        height: copy["s8c756dc2fd39"],
                        marginTop: copy["s2017d61e8036"],
                        display: copy["s0f2a693e93e2"],
                        placeItems: copy["sf179a509d32b"],
                        borderRadius: "var(--radius-checkbox)",
                        border: "var(--border-width) solid " + (on ? "var(--accent)" : "var(--border-strong)"),
                        background: on ? "var(--accent)" : "var(--surface)",
                        transition: "var(--transition-control)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        fontSize: copy["s2e3bfe4f5d8d"],
                        color: "var(--color-white)",
                        fontVariationSettings: copy["scbd6504816a3"]
                    }
                }, indeterminate ? copy["s7e5608ab6100"] : checked ? copy["s20f65c28671b"] : "")), React.createElement(copy["sc96c6d5be8d0"], _extends({
                    type: copy["s6fe9eb8f468b"],
                    checked: !!checked,
                    disabled: disabled,
                    onChange: onChange,
                    style: {
                        position: copy["s747355bdc2a2"],
                        opacity: 0,
                        width: 0,
                        height: 0
                    }
                }, props)), React.createElement(copy["s37a0025aa1f2"], null, label && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        display: copy["s496aca80e4d8"],
                        fontSize: "var(--text-medium)"
                    }
                }, label), description && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        display: copy["s496aca80e4d8"],
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, description)));
            }
            Object.assign(__ds_scope, { Checkbox });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sd005f11844c3"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function Dialog({ open = false, title, description, onClose, footer, width = copy["s34ca67809000"], children }) {
                if (!open)
                    return null;
                return React.createElement(copy["scd35a2426062"], {
                    role: copy["sbfac314fefdc"],
                    onClick: onClose,
                    style: {
                        position: copy["s992a93455c71"],
                        inset: 0,
                        zIndex: 999,
                        display: copy["s0f2a693e93e2"],
                        placeItems: copy["sf179a509d32b"],
                        background: "var(--alpha-ink-50)",
                        padding: "var(--space-6)"
                    }
                }, React.createElement(copy["scd35a2426062"], {
                    role: copy["s694018943365"],
                    "aria-modal": copy["sb5bea41b6c62"],
                    onClick: e => e.stopPropagation(),
                    style: {
                        width: "100%",
                        maxWidth: width,
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-card)",
                        boxShadow: "var(--elevation-dialog)",
                        padding: "var(--space-8)",
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-5)",
                        color: "var(--text-primary)"
                    }
                }, React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["scced28c6dc3f"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-4)"
                    }
                }, React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-2)"
                    }
                }, title && React.createElement(copy["se9590c04cea5"], {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, title), description && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, description)), React.createElement(copy["sc3e2d78f3ff3"], {
                    onClick: onClose,
                    "aria-label": copy["s7d9eb7acb13e"],
                    style: {
                        appearance: copy["s140bedbf9c3f"],
                        background: copy["s140bedbf9c3f"],
                        border: copy["s140bedbf9c3f"],
                        padding: "var(--space-1)",
                        color: "var(--text-secondary)",
                        lineHeight: 0
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"]
                }, copy["s310ff200149b"]))), children, footer && React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        gap: "var(--space-3)",
                        justifyContent: copy["s20e03abaa7cf"]
                    }
                }, footer)));
            }
            Object.assign(__ds_scope, { Dialog });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s80ef70053c88"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function Input({ mono = false, invalid = false, style, ...props }) {
                return React.createElement(copy["sc96c6d5be8d0"], _extends({
                    style: {
                        width: "100%",
                        boxSizing: copy["sb8090b77be3e"],
                        fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
                        fontSize: "var(--text-medium)",
                        lineHeight: "var(--leading-body)",
                        color: "var(--text-primary)",
                        background: invalid ? "var(--prov-verify-quiet)" : "var(--surface)",
                        border: "var(--border-width) solid " + (invalid ? "var(--prov-verify-fill)" : "var(--border-strong)"),
                        borderRadius: mono ? "var(--radius-drawing)" : "var(--radius-form)",
                        padding: copy["sca359440b18a"],
                        transition: "var(--transition-control)",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props));
            }
            Object.assign(__ds_scope, { Input });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s82f38aa6c7ca"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function Label({ htmlFor, hint, required, children, style, ...props }) {
                return React.createElement(copy["s1aca80e8b55c"], _extends({
                    htmlFor: htmlFor,
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["s8ba8496a2525"],
                        gap: "var(--space-2)",
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--text-primary)",
                        ...style
                    }
                }, props), React.createElement(copy["s37a0025aa1f2"], null, children, required && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--prov-verify-ink)"
                    }
                }, copy["s64e752669b24"])), hint && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--text-muted)"
                    }
                }, hint));
            }
            Object.assign(__ds_scope, { Label });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sfd024836d4b1"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function RadioGroup({ name, options = [], value, onChange, style, ...props }) {
                return React.createElement(copy["scd35a2426062"], _extends({
                    role: copy["s62955ff792fd"],
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-3)",
                        ...style
                    }
                }, props), options.map(o => {
                    const v = typeof o === copy["s473287f8298d"] ? o : o.value;
                    const l = typeof o === copy["s473287f8298d"] ? o : o.label;
                    const d = typeof o === copy["s473287f8298d"] ? null : o.description;
                    const on = value === v;
                    return React.createElement(copy["s1aca80e8b55c"], {
                        key: v,
                        style: {
                            display: copy["s0f2a693e93e2"],
                            gridTemplateColumns: copy["s5cd1f84e2c68"],
                            gap: "var(--space-3)",
                            alignItems: copy["scced28c6dc3f"],
                            cursor: copy["s1cdf95bd12e9"]
                        }
                    }, React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            width: copy["s8c756dc2fd39"],
                            height: copy["s8c756dc2fd39"],
                            marginTop: copy["s2017d61e8036"],
                            borderRadius: "50%",
                            display: copy["s0f2a693e93e2"],
                            placeItems: copy["sf179a509d32b"],
                            border: "var(--border-width) solid " + (on ? "var(--accent)" : "var(--border-strong)"),
                            background: "var(--surface)",
                            transition: "var(--transition-control)"
                        }
                    }, on && React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            width: copy["s558b9f364b59"],
                            height: copy["s558b9f364b59"],
                            borderRadius: "50%",
                            background: "var(--accent)"
                        }
                    })), React.createElement(copy["sc96c6d5be8d0"], {
                        type: copy["saa3a05d9d57c"],
                        name: name,
                        value: v,
                        checked: on,
                        onChange: () => onChange && onChange(v),
                        style: {
                            position: copy["s747355bdc2a2"],
                            opacity: 0,
                            width: 0,
                            height: 0
                        }
                    }), React.createElement(copy["s37a0025aa1f2"], null, React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            display: copy["s496aca80e4d8"],
                            fontSize: "var(--text-medium)"
                        }
                    }, l), d && React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            display: copy["s496aca80e4d8"],
                            fontSize: "var(--text-small)",
                            color: "var(--text-secondary)"
                        }
                    }, d)));
                }));
            }
            Object.assign(__ds_scope, { RadioGroup });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sa9369a0145ac"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function Select({ options = [], style, ...props }) {
                return React.createElement(copy["scd35a2426062"], {
                    style: {
                        position: copy["sd2d9e1f13413"],
                        display: copy["s9c99a6b0e83a"],
                        width: "100%"
                    }
                }, React.createElement(copy["sb1a36d25d963"], _extends({
                    style: {
                        width: "100%",
                        boxSizing: copy["sb8090b77be3e"],
                        appearance: copy["s140bedbf9c3f"],
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-medium)",
                        lineHeight: "var(--leading-body)",
                        color: "var(--text-primary)",
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border-strong)",
                        borderRadius: "var(--radius-form)",
                        padding: copy["sd4c1d523835a"],
                        transition: "var(--transition-control)",
                        ...style
                    }
                }, props), options.map(o => {
                    const v = typeof o === copy["s473287f8298d"] ? o : o.value;
                    const l = typeof o === copy["s473287f8298d"] ? o : o.label;
                    return React.createElement(copy["sa11a75e0feee"], {
                        key: v,
                        value: v
                    }, l);
                })), React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        position: copy["s747355bdc2a2"],
                        right: "var(--space-3)",
                        top: "50%",
                        transform: copy["s7db032237817"],
                        color: "var(--text-secondary)",
                        pointerEvents: copy["s140bedbf9c3f"]
                    }
                }, copy["sf09f7f182d49"]));
            }
            Object.assign(__ds_scope, { Select });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s481fb51aa4c8"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function Tabs({ tabs = [], value, onChange, variant = copy["s944969efb294"], style, ...props }) {
                const [internal, setInternal] = React.useState(tabs[0] && (tabs[0].value || tabs[0]));
                const active = value !== undefined ? value : internal;
                const set = v => {
                    setInternal(v);
                    onChange && onChange(v);
                };
                const items = tabs.map(t => typeof t === copy["s473287f8298d"] ? {
                    value: t,
                    label: t
                } : t);
                const current = items.find(t => t.value === active) || items[0];
                const pill = variant === copy["se3127a4ce13e"];
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: style
                }, props), React.createElement(copy["scd35a2426062"], {
                    role: copy["scd3a6cfa3373"],
                    style: {
                        display: copy["s222f930b8752"],
                        gap: pill ? "var(--space-1)" : "var(--space-6)",
                        borderBottom: pill ? copy["s140bedbf9c3f"] : "var(--divider-width) solid var(--scheme-border, var(--border))",
                        background: pill ? "var(--surface-sunken)" : copy["s140bedbf9c3f"],
                        borderRadius: pill ? "var(--radius-button)" : 0,
                        padding: pill ? "var(--space-1)" : 0,
                        width: pill ? copy["sbe9efe9d17d0"] : copy["s929260ad9b9e"]
                    }
                }, items.map(t => {
                    const on = t.value === active;
                    return React.createElement(copy["sc3e2d78f3ff3"], {
                        key: t.value,
                        role: copy["s7508386a2056"],
                        "aria-selected": on,
                        onClick: () => set(t.value),
                        style: {
                            appearance: copy["s140bedbf9c3f"],
                            background: pill && on ? "var(--surface)" : copy["s140bedbf9c3f"],
                            border: pill && on ? "var(--border-width) solid var(--border)" : "var(--border-width) solid transparent",
                            borderRadius: pill ? "var(--radius-button)" : 0,
                            borderBottom: pill ? undefined : "var(--border-width-strong) solid " + (on ? "var(--accent)" : copy["s10e9f5602d24"]),
                            marginBottom: pill ? 0 : copy["se297ac1d9bf0"],
                            padding: pill ? copy["s821ab636ac83"] : "var(--space-3) 0",
                            font: copy["s035300f3afee"],
                            fontSize: "var(--text-medium)",
                            fontWeight: on ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
                            color: on ? pill ? "var(--text-primary)" : "var(--accent-ink)" : "var(--scheme-text-secondary, var(--text-secondary))",
                            transition: "var(--transition-control)"
                        }
                    }, t.label);
                })), current && current.content && React.createElement(copy["scd35a2426062"], {
                    role: copy["sdc6cd41a7aaf"],
                    style: {
                        paddingTop: "var(--space-6)",
                        animation: copy["s140bedbf9c3f"],
                        opacity: 1,
                        transition: "var(--transition-reveal)"
                    }
                }, current.content));
            }
            Object.assign(__ds_scope, { Tabs });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s52ac91b59023"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function Textarea({ rows = 4, invalid = false, style, ...props }) {
                return React.createElement(copy["see67f93d65ce"], _extends({
                    rows: rows,
                    style: {
                        width: "100%",
                        boxSizing: copy["sb8090b77be3e"],
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-medium)",
                        lineHeight: "var(--leading-body)",
                        color: "var(--text-primary)",
                        background: "var(--surface)",
                        border: "var(--border-width) solid " + (invalid ? "var(--prov-verify-fill)" : "var(--border-strong)"),
                        borderRadius: "var(--radius-form)",
                        padding: copy["sca359440b18a"],
                        resize: copy["s34da56029403"],
                        transition: "var(--transition-control)",
                        ...style
                    }
                }, props));
            }
            Object.assign(__ds_scope, { Textarea });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sa35c18bb6bb6"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function DrawingFrame({ label, sheet, scale, revision, hash, hatched = false, grid = true, ratio = "4 / 3", children, style, ...props }) {
                return React.createElement(copy["s889393fb69a5"], _extends({
                    style: {
                        margin: 0,
                        background: "var(--drawing-paper)",
                        border: "var(--stroke-thin) solid var(--border-strong)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: copy["se564b4081d7a"],
                        display: copy["s0f2a693e93e2"],
                        gridTemplateRows: copy["s2e35bcb46136"],
                        alignContent: copy["s8c72b36502d3"],
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        position: copy["sd2d9e1f13413"],
                        width: "100%",
                        aspectRatio: ratio,
                        containerType: copy["sae1042f731a8"],
                        backgroundImage: [grid ? "var(--pattern-grid)" : null, hatched ? "var(--pattern-hatch)" : null].filter(Boolean).join(","),
                        backgroundColor: "var(--drawing-paper)"
                    }
                }, children, revision && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        position: copy["s747355bdc2a2"],
                        top: "var(--space-2)",
                        right: "var(--space-2)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        padding: copy["s0cbf4a3b2cf4"],
                        border: "var(--stroke-thin) solid var(--drawing-ink)",
                        borderRadius: "50%",
                        color: "var(--drawing-ink)",
                        background: "var(--drawing-paper)"
                    }
                }, revision)), React.createElement(copy["se846cf9fd87c"], {
                    style: {
                        display: copy["s222f930b8752"],
                        flexWrap: copy["sf0a289923ed6"],
                        alignItems: copy["s8ba8496a2525"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-3)",
                        padding: "var(--space-2) var(--space-3)",
                        borderTop: "var(--stroke-thin) solid var(--border-strong)",
                        background: "var(--surface-sunken)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)",
                        fontVariantNumeric: "var(--numeric-tabular)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--text-primary)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"]
                    }
                }, label), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        display: copy["s222f930b8752"],
                        gap: "var(--space-3)",
                        flexWrap: copy["sf0a289923ed6"]
                    }
                }, sheet && React.createElement(copy["s37a0025aa1f2"], null, sheet), scale && React.createElement(copy["s37a0025aa1f2"], null, copy["s0758ffe9350a"], scale), hash && React.createElement(copy["s37a0025aa1f2"], null, hash))));
            }
            Object.assign(__ds_scope, { DrawingFrame });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sd02e19c30d25"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function HeroSlideshow({ images = [], interval = 5000, scrim = 0.55, alt = "", style, ...props }) {
                const n = images.length;
                const [i, setI] = React.useState(0);
                const [anim, setAnim] = React.useState(true);
                const [paused, setPaused] = React.useState(false);
                const reduced = typeof matchMedia === copy["s78f9ac018e55"] && matchMedia(copy["sfce63bfb9eba"]).matches;
                React.useEffect(() => {
                    if (n < 2 || paused || reduced)
                        return;
                    const t = setInterval(() => setI(x => x + 1), interval);
                    return () => clearInterval(t);
                }, [n, paused, reduced, interval]);
                React.useEffect(() => {
                    if (i !== n)
                        return;
                    const t = setTimeout(() => {
                        setAnim(false);
                        setI(0);
                    }, 900);
                    return () => clearTimeout(t);
                }, [i, n]);
                React.useEffect(() => {
                    if (!anim) {
                        const r = requestAnimationFrame(() => setAnim(true));
                        return () => cancelAnimationFrame(r);
                    }
                }, [anim]);
                if (!n)
                    return null;
                const list = n > 1 ? [...images, images[0]] : images;
                return React.createElement(copy["scd35a2426062"], _extends({
                    "aria-hidden": copy["sb5bea41b6c62"],
                    onMouseEnter: () => setPaused(true),
                    onMouseLeave: () => setPaused(false),
                    style: {
                        position: copy["s747355bdc2a2"],
                        inset: 0,
                        overflow: copy["se564b4081d7a"],
                        zIndex: 0,
                        background: "var(--surface-ink)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        height: "100%",
                        width: "100%",
                        transform: copy["sda90d1d15f5b"] + i * 100 + copy["s61c5caba2f04"],
                        transition: anim ? copy["s20dec7226def"] : copy["s140bedbf9c3f"],
                        willChange: copy["saa214ea38326"]
                    }
                }, list.map((src, k) => React.createElement(copy["sb29814cf5792"], {
                    key: k,
                    src: src,
                    alt: alt,
                    draggable: copy["sfcbcf165908d"],
                    style: {
                        flex: "0 0 100%",
                        width: "100%",
                        height: "100%",
                        objectFit: copy["s3fa405a8301a"],
                        display: copy["s496aca80e4d8"],
                        userSelect: copy["s140bedbf9c3f"]
                    }
                }))), React.createElement(copy["scd35a2426062"], {
                    style: {
                        position: copy["s747355bdc2a2"],
                        inset: 0,
                        pointerEvents: copy["s140bedbf9c3f"],
                        background: copy["s8feb6672dccb"] + Math.min(1, scrim + 0.15) + copy["seb3490459874"] + scrim + copy["sb97662ae9af5"] + Math.min(1, scrim + 0.2) + copy["scf91cd0afa6f"]
                    }
                }), n > 1 && React.createElement(copy["scd35a2426062"], {
                    style: {
                        position: copy["s747355bdc2a2"],
                        left: 0,
                        right: 0,
                        bottom: "var(--space-4)",
                        display: copy["s222f930b8752"],
                        justifyContent: copy["sf179a509d32b"],
                        gap: "var(--space-2)"
                    }
                }, images.map((_, k) => React.createElement(copy["s37a0025aa1f2"], {
                    key: k,
                    style: {
                        width: k === i % n ? copy["sb81aec4635ad"] : copy["s28a5f8bf50fb"],
                        height: copy["s28a5f8bf50fb"],
                        borderRadius: copy["s088f2449c36f"],
                        background: k === i % n ? "var(--color-white)" : "var(--alpha-white-60, rgba(255,255,255,.6))",
                        transition: copy["sb79ea298d5ed"]
                    }
                }))));
            }
            Object.assign(__ds_scope, { HeroSlideshow });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s417372f91048"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function PromptBox({ placeholder = copy["sf5034a0c64a3"], location = copy["sb29460df18de"], examples = [], onSubmit, submitLabel = copy["sf9bd4c6db19e"], style, ...props }) {
                const [value, setValue] = React.useState("");
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-4)",
                        width: "100%",
                        ...style
                    }
                }, props), React.createElement(copy["s07397d633f25"], {
                    onSubmit: e => {
                        e.preventDefault();
                        onSubmit && onSubmit(value);
                    },
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-4)",
                        padding: "var(--space-4)",
                        background: "var(--surface)",
                        border: "var(--border-width-strong) solid var(--border-strong)",
                        borderRadius: "var(--radius-card)",
                        boxShadow: "var(--elevation-raised)"
                    }
                }, React.createElement(copy["see67f93d65ce"], {
                    rows: 2,
                    value: value,
                    onChange: e => setValue(e.target.value),
                    placeholder: placeholder,
                    "aria-label": copy["s57260354e46c"],
                    style: {
                        width: "100%",
                        boxSizing: copy["sb8090b77be3e"],
                        border: copy["s140bedbf9c3f"],
                        outline: copy["s140bedbf9c3f"],
                        resize: copy["s140bedbf9c3f"],
                        background: copy["s10e9f5602d24"],
                        font: copy["s035300f3afee"],
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-body-idea)",
                        lineHeight: "var(--leading-body)",
                        color: "var(--text-primary)",
                        padding: "var(--space-2)"
                    }
                }), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        flexWrap: copy["sf0a289923ed6"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-3)"
                    }
                }, React.createElement(copy["sc3e2d78f3ff3"], {
                    type: copy["sc3e2d78f3ff3"],
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-2)",
                        appearance: copy["s140bedbf9c3f"],
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s821ab636ac83"],
                        minHeight: "var(--hit-min)",
                        background: copy["s10e9f5602d24"],
                        color: "var(--text-primary)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        fontSize: copy["s8c756dc2fd39"]
                    }
                }, copy["s60d732b6bb55"]), copy["s6db5f378885d"]), React.createElement(copy["sc3e2d78f3ff3"], {
                    type: copy["sc3e2d78f3ff3"],
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-2)",
                        appearance: copy["s140bedbf9c3f"],
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s821ab636ac83"],
                        minHeight: "var(--hit-min)",
                        background: "var(--surface-sunken)",
                        color: "var(--text-primary)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        fontSize: copy["s8c756dc2fd39"]
                    }
                }, copy["sdf6e2408bd55"]), location), React.createElement(copy["sc3e2d78f3ff3"], {
                    type: copy["s75490bd7b93e"],
                    style: {
                        marginLeft: copy["s929260ad9b9e"],
                        appearance: copy["s140bedbf9c3f"],
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-medium)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s06b7d83051cd"],
                        minHeight: "var(--hit-min)",
                        background: "var(--accent)",
                        color: "var(--color-white)",
                        border: "var(--border-width) solid var(--accent)",
                        borderRadius: "var(--radius-button)"
                    }
                }, submitLabel))), examples.length > 0 && React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        flexWrap: copy["sf0a289923ed6"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-2)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-muted)"
                    }
                }, copy["sa2c270123bd0"]), examples.map(ex => React.createElement(copy["sc3e2d78f3ff3"], {
                    key: ex,
                    onClick: () => setValue(ex),
                    style: {
                        appearance: copy["s140bedbf9c3f"],
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-small)",
                        padding: copy["s76558884ce6b"],
                        background: copy["s10e9f5602d24"],
                        color: "var(--link)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-tag)",
                        textAlign: copy["s360f84035942"]
                    }
                }, ex))));
            }
            Object.assign(__ds_scope, { PromptBox });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sd3ac9d0b39c2"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function TwoDoorHero({ headline = copy["sc1714d240dda"], subhead, doors = [], style, ...props }) {
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        position: copy["sd2d9e1f13413"],
                        zIndex: 1,
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-12)",
                        justifyItems: copy["sf179a509d32b"],
                        textAlign: copy["sf179a509d32b"],
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-5)",
                        maxWidth: "var(--container-lg)"
                    }
                }, React.createElement(copy["s33112ee14ee4"], null, headline), subhead && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-large)",
                        color: "var(--scheme-text-secondary, var(--text-secondary))"
                    }
                }, subhead)), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-4)",
                        width: "100%",
                        maxWidth: "var(--container-xl)",
                        textAlign: copy["s360f84035942"],
                        gridTemplateColumns: copy["s7eb18ef87a3b"]
                    }
                }, doors.map(d => React.createElement(Door, _extends({
                    key: d.title
                }, d)))));
            }
            function Door({ eyebrow, title, description, cta, href = "#", meta }) {
                const [hover, setHover] = React.useState(false);
                return React.createElement(copy["sca978112ca1b"], {
                    href: href,
                    onMouseEnter: () => setHover(true),
                    onMouseLeave: () => setHover(false),
                    style: {
                        display: copy["s0f2a693e93e2"],
                        alignContent: copy["scced28c6dc3f"],
                        gap: "var(--space-4)",
                        padding: "var(--space-6)",
                        background: "var(--surface)",
                        border: "var(--border-width) solid " + (hover ? "var(--border-strong)" : "var(--border)"),
                        borderRadius: "var(--radius-card)",
                        textDecoration: copy["s140bedbf9c3f"],
                        color: "var(--text-primary)",
                        boxShadow: hover ? "var(--elevation-raised)" : "var(--elevation-flat)",
                        transition: "var(--transition-control)"
                    }
                }, eyebrow && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        color: "var(--text-muted)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, eyebrow), React.createElement(copy["s97fb5f8538b8"], {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, title), React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-medium)",
                        color: "var(--text-secondary)"
                    }
                }, description), meta && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-muted)"
                    }
                }, meta), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        justifyContent: copy["sf179a509d32b"],
                        gap: "var(--space-2)",
                        marginTop: "var(--space-2)",
                        padding: copy["s821ab636ac83"],
                        background: "var(--accent)",
                        color: "var(--color-white)",
                        border: "var(--border-width) solid " + (hover ? "var(--accent-hover)" : "var(--accent)"),
                        backgroundColor: hover ? "var(--accent-hover)" : "var(--accent)",
                        borderRadius: "var(--radius-button)",
                        fontWeight: "var(--font-weight-medium)",
                        transition: "var(--transition-control)"
                    }
                }, cta));
            }
            Object.assign(__ds_scope, { TwoDoorHero });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sddf115f58722"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const symbols = {
                GBP: copy["sb4fe151e4134"],
                USD: copy["s09fc96082d34"],
                NGN: copy["s8c0e184ef8d5"]
            };
            function PricingTable({ tiers = [], currencies = [copy["s402419e92096"], copy["sa26cdf3a6e70"], copy["sa74aa40897d1"]], currency, onCurrencyChange, style, ...props }) {
                const [internal, setInternal] = React.useState(currency || currencies[0]);
                const cur = currency || internal;
                const set = c => {
                    setInternal(c);
                    onCurrencyChange && onCurrencyChange(c);
                };
                const groups = [...new Set(tiers.map(t => t.group || copy["s19c73a5cdf34"]))];
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-6)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        justifyContent: copy["s20e03abaa7cf"]
                    }
                }, React.createElement(copy["scd35a2426062"], {
                    role: copy["sad936fcbed63"],
                    "aria-label": copy["s3ac1a9ec4fa7"],
                    style: {
                        display: copy["s222f930b8752"],
                        gap: "var(--space-1)",
                        padding: "var(--space-1)",
                        background: "var(--surface-sunken)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)"
                    }
                }, currencies.map(c => {
                    const on = c === cur;
                    return React.createElement(copy["sc3e2d78f3ff3"], {
                        key: c,
                        onClick: () => set(c),
                        "aria-pressed": on,
                        style: {
                            appearance: copy["s140bedbf9c3f"],
                            font: copy["s035300f3afee"],
                            fontSize: "var(--text-small)",
                            fontWeight: "var(--font-weight-semibold)",
                            padding: copy["s87f82e0d251e"],
                            borderRadius: "var(--radius-button)",
                            border: "var(--border-width) solid " + (on ? "var(--border)" : copy["s10e9f5602d24"]),
                            background: on ? "var(--surface)" : copy["s10e9f5602d24"],
                            color: on ? "var(--text-primary)" : "var(--text-secondary)",
                            transition: "var(--transition-control)"
                        }
                    }, symbols[c], copy["s36a9e7f1c95b"], c);
                }))), groups.map(g => React.createElement(copy["scd35a2426062"], {
                    key: g,
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-4)"
                    }
                }, React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        color: "var(--text-muted)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, g), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        gap: "var(--space-4)",
                        overflowX: copy["s929260ad9b9e"],
                        paddingBottom: "var(--space-2)"
                    }
                }, tiers.filter(t => (t.group || copy["s19c73a5cdf34"]) === g).map(t => React.createElement(copy["scd35a2426062"], {
                    key: t.name,
                    style: {
                        flex: copy["see7f3bed848e"],
                        minWidth: copy["sec6f0ef65f7b"],
                        display: copy["s0f2a693e93e2"],
                        alignContent: copy["scced28c6dc3f"],
                        gap: "var(--space-4)",
                        padding: "var(--space-6)",
                        background: "var(--surface)",
                        border: "var(--border-width) solid " + (t.featured ? "var(--accent)" : "var(--border)"),
                        borderRadius: "var(--radius-card)",
                        fontVariantNumeric: "var(--numeric-tabular)"
                    }
                }, React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-1)"
                    }
                }, React.createElement(copy["se9590c04cea5"], {
                    style: {
                        fontSize: "var(--text-h6)"
                    }
                }, t.name), t.audience && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, typeof t.audience === copy["s2958d416d08a"] ? t.audience[cur] : t.audience)), React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-h4)",
                        fontWeight: "var(--font-weight-medium)",
                        lineHeight: "var(--leading-tight)"
                    }
                }, t.price && t.price[cur] ? t.price[cur] : t.priceNote || "—", t.per && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)",
                        fontWeight: "var(--font-weight-regular)"
                    }
                }, copy["s36a9e7f1c95b"], t.per)), React.createElement(copy["s51db25342581"], {
                    style: {
                        listStyle: copy["s140bedbf9c3f"],
                        margin: 0,
                        padding: 0,
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-2)",
                        fontSize: "var(--text-small)"
                    }
                }, (t.includes || []).map((f, i) => React.createElement(copy["s00a9e4255a5b"], {
                    key: i,
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gridTemplateColumns: copy["s7b6addd79c8d"],
                        gap: "var(--space-2)",
                        alignItems: copy["s8ba8496a2525"]
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        color: "var(--prov-user-ink)"
                    }
                }, copy["s1dabba21cdad"]), f)))))))));
            }
            Object.assign(__ds_scope, { PricingTable });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sb270a47b0ac9"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const tiers = {
                "Tier 1": {
                    bg: "var(--prov-user-quiet)",
                    ink: "var(--prov-user-ink)",
                    border: "var(--prov-user-fill)",
                    note: copy["s4f7838402f37"]
                },
                "Tier 2": {
                    bg: "var(--flag-quiet)",
                    ink: "var(--flag-ink)",
                    border: "var(--flag)",
                    note: copy["s1cfcce6fec81"]
                },
                Generic: {
                    bg: "var(--surface-sunken)",
                    ink: "var(--text-secondary)",
                    border: "var(--border-strong)",
                    note: copy["s0228c6d48ecf"]
                }
            };
            const kinds = {
                jurisdiction: copy["sefa1f375d761"],
                office: copy["sf2ff83860a4d"],
                manufacturer: copy["s06c8aaa93d80"]
            };
            function ProfileCard({ name, kind = copy["sbcd3a888401f"], tier = copy["sc97454a01ccf"], signer, credential, price, adoption, documents = [], style, ...props }) {
                const [hover, setHover] = React.useState(false);
                const t = tiers[tier] || tiers.Generic;
                return React.createElement(copy["scd35a2426062"], _extends({
                    onMouseEnter: () => setHover(true),
                    onMouseLeave: () => setHover(false),
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-card)",
                        padding: "var(--space-6)",
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-4)",
                        alignContent: copy["scced28c6dc3f"],
                        boxShadow: hover ? "var(--elevation-raised)" : "var(--elevation-flat)",
                        transition: "var(--transition-control)",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["scced28c6dc3f"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-4)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-2)",
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        color: "var(--text-secondary)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        fontSize: copy["sb8be0c77cfdc"]
                    }
                }, kinds[kind] || copy["sefa1f375d761"]), kind), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        padding: copy["s6812252b75a8"],
                        background: t.bg,
                        color: t.ink,
                        border: "var(--stroke-thin) solid " + t.border,
                        borderRadius: "var(--radius-drawing)",
                        fontSize: "var(--text-tiny)",
                        fontWeight: "var(--font-weight-bold)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        whiteSpace: copy["s010d16d2e921"]
                    }
                }, tier, copy["s588da4105320"], t.note)), React.createElement(copy["se9590c04cea5"], {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, name), documents.length > 0 && React.createElement(copy["s51db25342581"], {
                    style: {
                        listStyle: copy["s140bedbf9c3f"],
                        margin: 0,
                        padding: 0,
                        display: copy["s222f930b8752"],
                        flexWrap: copy["sf0a289923ed6"],
                        gap: "var(--space-2)"
                    }
                }, documents.map((d, i) => React.createElement(copy["s00a9e4255a5b"], {
                    key: i,
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        padding: copy["s0cbf4a3b2cf4"],
                        background: "var(--surface-sunken)",
                        border: "var(--stroke-fine) solid var(--border)",
                        borderRadius: "var(--radius-drawing)",
                        color: "var(--text-secondary)"
                    }
                }, d))), signer && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, copy["sfdfd43ff6994"], React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--text-primary)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, signer), credential ? " · " + credential : ""), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["s8ba8496a2525"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-4)",
                        paddingTop: "var(--space-4)",
                        borderTop: "var(--divider-width) solid var(--divider)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-h6)",
                        fontWeight: "var(--font-weight-medium)"
                    }
                }, price), adoption != null && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, adoption, copy["saabe679f45da"])));
            }
            Object.assign(__ds_scope, { ProfileCard });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s46840ed9807b"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const levels = {
                Verified: {
                    bg: "var(--prov-project-quiet)",
                    ink: "var(--prov-project-ink)",
                    border: "var(--prov-project-fill)",
                    icon: copy["s7aa2bc16c625"]
                },
                "Verified + Insured": {
                    bg: "var(--prov-user-quiet)",
                    ink: "var(--prov-user-ink)",
                    border: "var(--prov-user-fill)",
                    icon: copy["s072a626ed2d6"]
                }
            };
            function SignerCard({ name, credential, registry, jurisdictions = [], disciplines = [], level = copy["s4f7838402f37"], reviewEvidence, style, ...props }) {
                const l = levels[level] || levels.Verified;
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-card)",
                        padding: "var(--space-6)",
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-4)",
                        alignContent: copy["scced28c6dc3f"],
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["scced28c6dc3f"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-4)"
                    }
                }, React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-1)"
                    }
                }, React.createElement(copy["se9590c04cea5"], {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, name), React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, credential)), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-1)",
                        padding: copy["s0d3af2b3f890"],
                        background: l.bg,
                        color: l.ink,
                        border: "var(--stroke-thin) solid " + l.border,
                        borderRadius: "var(--radius-drawing)",
                        fontSize: "var(--text-tiny)",
                        fontWeight: "var(--font-weight-bold)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        whiteSpace: copy["s010d16d2e921"]
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        fontSize: copy["s8825a1468597"]
                    }
                }, l.icon), level)), registry && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)"
                    }
                }, copy["s091a248099c5"], registry), React.createElement(copy["s2ca69efd4ea5"], {
                    style: {
                        margin: 0,
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-3)"
                    }
                }, [[copy["s1db075e5f263"], jurisdictions], [copy["s10851b812123"], disciplines]].map(([k, v]) => React.createElement(copy["scd35a2426062"], {
                    key: k,
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-2)"
                    }
                }, React.createElement(copy["sfefbdb67a3b2"], {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        color: "var(--text-muted)"
                    }
                }, k), React.createElement(copy["s9b7ecc6eeb83"], {
                    style: {
                        margin: 0,
                        display: copy["s222f930b8752"],
                        flexWrap: copy["sf0a289923ed6"],
                        gap: "var(--space-2)"
                    }
                }, v.map(x => React.createElement(copy["s37a0025aa1f2"], {
                    key: x,
                    style: {
                        fontSize: "var(--text-small)",
                        padding: copy["sf9d23c0c021c"],
                        background: "var(--surface-sunken)",
                        border: "var(--stroke-fine) solid var(--border)",
                        borderRadius: "var(--radius-badge)"
                    }
                }, x)))))), reviewEvidence && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        paddingTop: "var(--space-4)",
                        borderTop: "var(--divider-width) solid var(--divider)",
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, reviewEvidence));
            }
            Object.assign(__ds_scope, { SignerCard });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s4d8e20e3e265"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const footerSitemap = [{
                    title: copy["sfb9ef894175c"],
                    links: [copy["sa68388d7143f"], copy["sd2cfcdb081c7"], copy["sa66e22b066ab"], copy["s28432ceece43"], copy["sb89a706e380f"], copy["sfc799da2088d"], copy["sd2eab94fde66"]]
                }, {
                    title: copy["s97f5c16fcbfb"],
                    links: [copy["sd0f7065c471d"], copy["sb384863fa1f6"], copy["s8d23a6e37e0a"], copy["s49dca65f362f"], copy["s04952a0f984d"]]
                }, {
                    title: copy["sde4743c87973"],
                    links: [copy["s4efca0d10c5f"], copy["s2b5c3d26721a"], copy["sdfe95783edfe"], copy["s78184fa6a86e"], copy["s4a0d8207f0d5"]]
                }];
            function Footer({ sitemap = footerSitemap, style, ...props }) {
                return React.createElement(copy["s0301844ccd8e"], _extends({
                    className: copy["s4bac5ca3c2b4"],
                    style: {
                        paddingInline: "var(--page-gutter)",
                        paddingBlock: "var(--space-16)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    className: copy["s61e4a2377416"],
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-12)"
                    }
                }, React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-10)",
                        gridTemplateColumns: copy["sc9c1af15661f"]
                    }
                }, React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-4)",
                        alignContent: copy["scced28c6dc3f"]
                    }
                }, React.createElement(__ds_scope.Wordmark, {
                    size: copy["s35da2da1b5fb"],
                    tone: copy["s7705accd2694"]
                }), React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-inverse-secondary)",
                        maxWidth: copy["s33fb3b63d2d0"]
                    }
                }, copy["sc1714d240dda"])), sitemap.map(col => React.createElement(copy["sabca4de9dd94"], {
                    key: col.title,
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-3)",
                        alignContent: copy["scced28c6dc3f"]
                    }
                }, React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        color: "var(--text-inverse-secondary)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, col.title), col.links.map(l => React.createElement(copy["sca978112ca1b"], {
                    key: l,
                    href: "#",
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--color-white)",
                        textDecoration: copy["s140bedbf9c3f"]
                    }
                }, l))))), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-4)",
                        paddingTop: "var(--space-6)",
                        borderTop: "var(--divider-width) solid var(--border-inverse)",
                        fontSize: "var(--text-small)",
                        color: "var(--text-inverse-secondary)",
                        maxWidth: "var(--container-xl)"
                    }
                }, React.createElement(copy["s148de9c5a7a4"], null, copy["sdf4319daa441"]), React.createElement(copy["s148de9c5a7a4"], null, copy["s4802ead5860b"]), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        flexWrap: copy["sf0a289923ed6"],
                        gap: "var(--space-6)",
                        paddingTop: "var(--space-2)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], null, copy["s6e76565fa496"]), [copy["sba445cff3898"], copy["s1f54c7c2ecaa"], copy["se69e06144877"], copy["s011912d0322f"]].map(l => React.createElement(copy["sca978112ca1b"], {
                    key: l,
                    href: "#",
                    style: {
                        color: "var(--text-inverse-secondary)"
                    }
                }, l))))));
            }
            Object.assign(__ds_scope, { footerSitemap, Footer });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sa54072c45020"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const defaultNav = [{
                    label: copy["sfb9ef894175c"],
                    items: [{
                            label: copy["sa68388d7143f"],
                            href: "#",
                            note: copy["s1876bbc8e3e5"]
                        }, {
                            label: copy["sd2cfcdb081c7"],
                            href: "#",
                            note: copy["se00d67ce6f06"]
                        }, {
                            label: copy["sa66e22b066ab"],
                            href: "#",
                            note: copy["s7c3f37b7d4dc"]
                        }, {
                            label: copy["s28432ceece43"],
                            href: "#",
                            note: copy["sc0a53c2eac31"]
                        }, {
                            label: copy["sb89a706e380f"],
                            href: "#",
                            note: copy["s446a0843156a"]
                        }, {
                            label: copy["sfc799da2088d"],
                            href: "#",
                            note: copy["se0baeb526d93"]
                        }, {
                            label: copy["sd2eab94fde66"],
                            href: "#",
                            note: copy["s074cac53c30f"]
                        }]
                }, {
                    label: copy["s97f5c16fcbfb"],
                    items: [{
                            label: copy["sd0f7065c471d"],
                            href: "#",
                            note: copy["sfb5e67044874"]
                        }, {
                            label: copy["sb384863fa1f6"],
                            href: "#",
                            note: copy["s0da41503d545"]
                        }]
                }, {
                    label: copy["sdfe95783edfe"],
                    href: "#"
                }, {
                    label: copy["s4efca0d10c5f"],
                    href: "#"
                }];
            function Navbar({ nav = defaultNav, active, onNavigate, style, ...props }) {
                const [open, setOpen] = React.useState(null);
                const go = (e, label) => {
                    if (onNavigate) {
                        e.preventDefault();
                        onNavigate(label);
                    }
                    setOpen(null);
                };
                return React.createElement(copy["s1e0584a25d9f"], _extends({
                    style: {
                        position: copy["sd2d9e1f13413"],
                        zIndex: 99,
                        background: "var(--surface-tint)",
                        borderBottom: "var(--border-width) solid var(--border)",
                        paddingInline: "var(--page-gutter)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    className: copy["s61e4a2377416"],
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-6)",
                        minHeight: copy["s41dca9e28d00"],
                        justifyContent: copy["s8c72b36502d3"]
                    }
                }, React.createElement(__ds_scope.Wordmark, {
                    href: "#",
                    size: copy["s35da2da1b5fb"],
                    tone: copy["sb728b7e775f7"],
                    onClick: e => go(e, copy["s3a78695388b3"])
                }), React.createElement(copy["sabca4de9dd94"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-1)",
                        flex: 1
                    }
                }, nav.map(n => n.items ? React.createElement(copy["scd35a2426062"], {
                    key: n.label,
                    onMouseEnter: () => setOpen(n.label),
                    onMouseLeave: () => setOpen(null),
                    style: {
                        position: copy["sd2d9e1f13413"]
                    }
                }, React.createElement(copy["sc3e2d78f3ff3"], {
                    "aria-expanded": open === n.label,
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-2)",
                        appearance: copy["s140bedbf9c3f"],
                        background: copy["s140bedbf9c3f"],
                        border: copy["s140bedbf9c3f"],
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-medium)",
                        color: "var(--text-primary)",
                        padding: "var(--space-3) var(--space-4)"
                    }
                }, n.label, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        fontSize: copy["s8c756dc2fd39"],
                        transform: open === n.label ? copy["s3ce71f719585"] : copy["s140bedbf9c3f"],
                        transition: copy["s6910fe1b338b"]
                    }
                }, copy["sf09f7f182d49"])), open === n.label && React.createElement(copy["scd35a2426062"], {
                    style: {
                        position: copy["s747355bdc2a2"],
                        top: "100%",
                        left: 0,
                        minWidth: copy["s33fb3b63d2d0"],
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-1)",
                        padding: "var(--space-3)",
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-form)",
                        boxShadow: "var(--elevation-overlay)"
                    }
                }, n.items.map(it => React.createElement(copy["sca978112ca1b"], {
                    key: it.label,
                    href: it.href,
                    onClick: e => go(e, it.label),
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: copy["s687e00933e60"],
                        padding: "var(--space-2) var(--space-3)",
                        borderRadius: "var(--radius-checkbox)",
                        textDecoration: copy["s140bedbf9c3f"],
                        color: "var(--text-primary)",
                        background: active === it.label ? "var(--surface-sunken)" : copy["s10e9f5602d24"]
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-medium)",
                        fontWeight: "var(--font-weight-medium)"
                    }
                }, it.label), it.note && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, it.note))))) : React.createElement(copy["sca978112ca1b"], {
                    key: n.label,
                    href: n.href,
                    onClick: e => go(e, n.label),
                    style: {
                        padding: "var(--space-3) var(--space-4)",
                        fontSize: "var(--text-medium)",
                        color: "var(--text-primary)",
                        textDecoration: copy["s140bedbf9c3f"],
                        fontWeight: active === n.label ? "var(--font-weight-semibold)" : "var(--font-weight-regular)"
                    }
                }, n.label))), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-4)"
                    }
                }, React.createElement(copy["sca978112ca1b"], {
                    href: "#",
                    style: {
                        fontSize: "var(--text-medium)",
                        color: "var(--text-primary)",
                        textDecoration: copy["s140bedbf9c3f"]
                    }
                }, copy["sbfd402b2f6f3"]), React.createElement(copy["sca978112ca1b"], {
                    href: "#",
                    onClick: e => go(e, copy["sa68388d7143f"]),
                    style: {
                        padding: copy["s821ab636ac83"],
                        background: "var(--accent)",
                        color: "var(--color-white)",
                        border: "var(--border-width) solid var(--accent)",
                        borderRadius: "var(--radius-button)",
                        fontWeight: "var(--font-weight-medium)",
                        textDecoration: copy["s140bedbf9c3f"],
                        whiteSpace: copy["s010d16d2e921"]
                    }
                }, copy["sf9bd4c6db19e"]))));
            }
            Object.assign(__ds_scope, { defaultNav, Navbar });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sa8ddc42b2e6e"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function AssumptionsPanel({ title = copy["sf8b51b14afec"], note, assumptions = [], onEdit, style, ...props }) {
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        background: "var(--flag-quiet)",
                        border: "var(--border-width) solid var(--color-amber-lighter)",
                        borderTop: "var(--stroke-heavy) solid var(--flag)",
                        borderRadius: "var(--radius-drawing)",
                        padding: "var(--space-5)",
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-4)",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-1)"
                    }
                }, React.createElement(copy["sacea77fd89c7"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-2)",
                        fontSize: "var(--text-h6)",
                        color: "var(--text-primary)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        color: "var(--flag-ink)"
                    }
                }, copy["s0bae1fe0557d"]), copy["s36a9e7f1c95b"], title), note && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, note)), React.createElement(copy["s51db25342581"], {
                    style: {
                        listStyle: copy["s140bedbf9c3f"],
                        margin: 0,
                        padding: 0,
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-2)"
                    }
                }, assumptions.map((a, i) => React.createElement(copy["s00a9e4255a5b"], {
                    key: i,
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["s8ba8496a2525"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-4)",
                        padding: "var(--space-3) 0",
                        borderTop: i === 0 ? copy["s140bedbf9c3f"] : "var(--divider-width) solid var(--color-amber-lighter)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-medium)"
                    }
                }, a.text, a.term && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--text-muted)",
                        fontSize: "var(--text-small)"
                    },
                    title: a.term
                }, copy["s4f5a2ada1166"], a.term, copy["sba5ec51d07a4"])), React.createElement(copy["sc3e2d78f3ff3"], {
                    onClick: () => onEdit && onEdit(a, i),
                    style: {
                        appearance: copy["s140bedbf9c3f"],
                        background: copy["s140bedbf9c3f"],
                        border: copy["s140bedbf9c3f"],
                        padding: 0,
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--link)",
                        textDecoration: copy["s944969efb294"],
                        textUnderlineOffset: copy["s747614001f01"],
                        flex: copy["s53bd110fbe70"]
                    }
                }, copy["s464c4ffd019e"])))));
            }
            Object.assign(__ds_scope, { AssumptionsPanel });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["se3c6e9d2b387"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function ChangeList({ title = copy["sbbd4b6a86bc6"], changes = [], summary, onUndo, undoLabel = copy["sa8283ade3185"], style, ...props }) {
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderLeft: "var(--stroke-heavy) solid var(--accent)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: copy["se564b4081d7a"],
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["sf179a509d32b"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-4)",
                        padding: "var(--space-3) var(--space-4)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        background: "var(--surface-sunken)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--text-secondary)"
                    }
                }, title), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)"
                    }
                }, changes.length, copy["s36a9e7f1c95b"], changes.length === 1 ? copy["s12ea12eace7d"] : copy["sd0b4ba2311b3"])), React.createElement(copy["s51db25342581"], {
                    style: {
                        listStyle: copy["s140bedbf9c3f"],
                        margin: 0,
                        padding: 0
                    }
                }, changes.map((c, i) => React.createElement(copy["s00a9e4255a5b"], {
                    key: i,
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gridTemplateColumns: copy["s666c36b856e9"],
                        gap: "var(--space-4)",
                        alignItems: copy["s8ba8496a2525"],
                        padding: "var(--space-3) var(--space-4)",
                        borderBottom: "var(--divider-width) solid var(--divider)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--text-primary)"
                    }
                }, c.target), c.from !== undefined || c.to !== undefined ? React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        whiteSpace: copy["s010d16d2e921"]
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--text-muted)",
                        textDecoration: copy["s1a967b068cfe"]
                    }
                }, c.from), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--text-muted)"
                    }
                }, copy["s592f6fd0750e"]), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--accent-ink)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, c.to), c.unit && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--text-secondary)"
                    }
                }, copy["s36a9e7f1c95b"], c.unit)) : React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--text-secondary)"
                    }
                }, c.note)))), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["sf179a509d32b"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-4)",
                        padding: "var(--space-3) var(--space-4)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, summary), React.createElement(copy["sc3e2d78f3ff3"], {
                    onClick: onUndo,
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-1)",
                        appearance: copy["s140bedbf9c3f"],
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["se84600f448b8"],
                        background: copy["s10e9f5602d24"],
                        color: "var(--text-primary)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)",
                        whiteSpace: copy["s010d16d2e921"]
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        fontSize: copy["sb8be0c77cfdc"]
                    }
                }, copy["sf015346ae356"]), undoLabel)));
            }
            Object.assign(__ds_scope, { ChangeList });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sd52074edf83c"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function ConceptWatermark({ text = copy["s4b153e140b3e"], repeat = 3, children, style, ...props }) {
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        position: copy["sd2d9e1f13413"],
                        overflow: copy["se564b4081d7a"],
                        ...style
                    }
                }, props), children, React.createElement(copy["scd35a2426062"], {
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        position: copy["s747355bdc2a2"],
                        inset: 0,
                        display: copy["s0f2a693e93e2"],
                        placeItems: copy["sf179a509d32b"],
                        pointerEvents: copy["s140bedbf9c3f"],
                        userSelect: copy["s140bedbf9c3f"]
                    }
                }, React.createElement(copy["scd35a2426062"], {
                    style: {
                        transform: copy["s7dbcf6eca28e"],
                        display: copy["s0f2a693e93e2"],
                        gap: copy["s7940eca5644a"],
                        width: "180%"
                    }
                }, Array.from({
                    length: repeat
                }).map((_, i) => React.createElement(copy["scd35a2426062"], {
                    key: i,
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontWeight: "var(--font-weight-bold)",
                        fontSize: copy["s09d2a0eeabc4"],
                        letterSpacing: "var(--tracking-label)",
                        color: "var(--concept-watermark-color)",
                        whiteSpace: copy["s010d16d2e921"],
                        textAlign: copy["sf179a509d32b"],
                        lineHeight: 1
                    }
                }, text)))), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        position: copy["s747355bdc2a2"],
                        left: 0,
                        bottom: 0,
                        padding: copy["s792b5e6bd309"],
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        fontWeight: "var(--font-weight-bold)",
                        letterSpacing: "var(--tracking-label)",
                        background: "var(--flag)",
                        color: "var(--color-neutral-darkest)",
                        borderTopRightRadius: "var(--radius-drawing)"
                    }
                }, copy["s720950d406e5"]));
            }
            Object.assign(__ds_scope, { ConceptWatermark });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s4c549c1debc0"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const provenanceSources = {
                user: {
                    label: copy["sb4a10447154a"],
                    icon: copy["s38a81e87e796"],
                    fill: "var(--prov-user-fill)",
                    quiet: "var(--prov-user-quiet)",
                    ink: "var(--prov-user-ink)"
                },
                project: {
                    label: copy["s8335874efbf3"],
                    icon: copy["s034a00624882"],
                    fill: "var(--prov-project-fill)",
                    quiet: "var(--prov-project-quiet)",
                    ink: "var(--prov-project-ink)"
                },
                reference: {
                    label: copy["sd7fef7edcc4a"],
                    icon: copy["se3b816898ca5"],
                    fill: "var(--prov-reference-fill)",
                    quiet: "var(--prov-reference-quiet)",
                    ink: "var(--prov-reference-ink)"
                },
                inferred: {
                    label: copy["sdfc05249aa63"],
                    icon: copy["s3b421481f530"],
                    fill: "var(--prov-inferred-fill)",
                    quiet: "var(--prov-inferred-quiet)",
                    ink: "var(--prov-inferred-ink)"
                },
                verify: {
                    label: copy["s3ac584783596"],
                    icon: copy["s4bd9354bb652"],
                    fill: "var(--prov-verify-fill)",
                    quiet: "var(--prov-verify-quiet)",
                    ink: "var(--prov-verify-ink)"
                },
                autofix: {
                    label: copy["sd2cf3dbc2fc9"],
                    icon: copy["s44575cf5b285"],
                    fill: "var(--prov-autofix-fill)",
                    quiet: "var(--prov-autofix-quiet)",
                    ink: "var(--prov-autofix-ink)"
                }
            };
            function ProvenanceChip({ source = copy["s04f8996da763"], label, confidence, rules = [], expanded = false, expandable = false, style, ...props }) {
                const [open, setOpen] = React.useState(expanded);
                const s = provenanceSources[source] || provenanceSources.user;
                const show = expandable ? open : expanded;
                const Tag = expandable ? copy["sc3e2d78f3ff3"] : copy["s37a0025aa1f2"];
                return React.createElement(copy["s37a0025aa1f2"], _extends({
                    style: {
                        display: copy["s9c99a6b0e83a"],
                        gap: "var(--space-2)",
                        verticalAlign: copy["s28720365c5e7"],
                        ...style
                    }
                }, props), React.createElement(Tag, {
                    onClick: expandable ? () => setOpen(!open) : undefined,
                    "aria-expanded": expandable ? open : undefined,
                    style: {
                        display: copy["s123306850fe1"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-2)",
                        padding: copy["sa80f07dcc6bd"],
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-tiny)",
                        fontWeight: "var(--font-weight-semibold)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        background: s.quiet,
                        color: s.ink,
                        border: "var(--stroke-thin) solid " + s.fill,
                        borderRadius: "var(--radius-drawing)",
                        whiteSpace: copy["s010d16d2e921"],
                        width: copy["sbe9efe9d17d0"]
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        fontSize: copy["s8825a1468597"]
                    }
                }, s.icon), label || s.label), show && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-1)",
                        padding: "var(--space-3)",
                        background: "var(--surface)",
                        border: "var(--stroke-thin) solid var(--border)",
                        borderLeft: "var(--stroke-heavy) solid " + s.fill,
                        borderRadius: "var(--radius-drawing)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)",
                        textAlign: copy["s360f84035942"]
                    }
                }, React.createElement(copy["s37a0025aa1f2"], null, copy["sb08261da324a"], s.label.toLowerCase()), confidence != null && React.createElement(copy["s37a0025aa1f2"], null, copy["s5c211b569b38"], confidence), rules.length > 0 && React.createElement(copy["s37a0025aa1f2"], null, copy["s93a842761587"], rules.join(", "))));
            }
            Object.assign(__ds_scope, { provenanceSources, ProvenanceChip });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s948724f77f55"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function InterpretationCard({ title = copy["sd594234ee8c5"], rows = [], missing = [], missingInputs = false, onConfirm, onEdit, confirmLabel = copy["seebdd24a77d9"], confirmCaption = copy["scd9525d4462b"], style, ...props }) {
                const [filled, setFilled] = React.useState({});
                const items = missing.map(m => typeof m === copy["s473287f8298d"] ? {
                    label: m
                } : m);
                const outstanding = items.filter((m, i) => !(filled[i] && filled[i].trim())).length;
                const blocked = outstanding > 0;
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: copy["se564b4081d7a"],
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["sf179a509d32b"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-4)",
                        padding: "var(--space-4) var(--space-5)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        background: "var(--surface-sunken)"
                    }
                }, React.createElement(copy["sacea77fd89c7"], {
                    style: {
                        fontSize: "var(--text-h6)"
                    }
                }, title), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)"
                    }
                }, rows.length, copy["s2b77fe3289d4"])), React.createElement(copy["scd35a2426062"], {
                    style: {
                        overflowX: copy["s929260ad9b9e"]
                    }
                }, React.createElement(copy["s0d4fc4a78d37"], {
                    style: {
                        width: "100%",
                        borderCollapse: copy["s93bc5d02dc2a"],
                        fontSize: "var(--text-small)"
                    }
                }, React.createElement(copy["sd193afcb8729"], null, React.createElement(copy["s7817bb812e82"], null, [copy["s62a6da8735c1"], copy["s8e37953d23da"], copy["s0e570ca6fabe"]].map(h => React.createElement(copy["s6bde0b830d8b"], {
                    key: h,
                    style: {
                        textAlign: copy["s360f84035942"],
                        padding: "var(--space-2) var(--space-5)",
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        color: "var(--text-muted)",
                        fontWeight: "var(--font-weight-semibold)",
                        borderBottom: "var(--divider-width) solid var(--border)"
                    }
                }, h)))), React.createElement(copy["s493bab12bd43"], null, rows.map((r, i) => {
                    const s = __ds_scope.provenanceSources[r.source] || __ds_scope.provenanceSources.user;
                    return React.createElement(copy["s7817bb812e82"], {
                        key: i,
                        style: {
                            borderBottom: "var(--divider-width) solid var(--divider)"
                        }
                    }, React.createElement(copy["s30fc9e3356c2"], {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            whiteSpace: copy["s010d16d2e921"]
                        }
                    }, r.object), React.createElement(copy["s30fc9e3356c2"], {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-tiny)",
                            minWidth: copy["sb70c01882236"]
                        }
                    }, r.value), React.createElement(copy["s30fc9e3356c2"], {
                        style: {
                            padding: "var(--space-3) var(--space-5)"
                        }
                    }, React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            display: copy["s123306850fe1"],
                            flexWrap: copy["sf0a289923ed6"],
                            alignItems: copy["sf179a509d32b"],
                            gap: "var(--space-2)"
                        }
                    }, React.createElement(__ds_scope.ProvenanceChip, {
                        source: r.source,
                        label: r.sourceLabel
                    }), r.confidence != null && React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-tiny)",
                            color: "var(--text-secondary)"
                        }
                    }, r.confidence), r.verify && React.createElement(__ds_scope.ProvenanceChip, {
                        source: copy["sa12dd3a7fd32"],
                        label: copy["seea2745e2867"]
                    }))));
                })))), items.length > 0 && React.createElement(copy["scd35a2426062"], {
                    style: {
                        padding: "var(--space-4) var(--space-5)",
                        background: "var(--flag-quiet)",
                        borderTop: "var(--divider-width) solid var(--color-amber-lighter)"
                    }
                }, React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        display: copy["s222f930b8752"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-2)",
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--flag-ink)",
                        marginBottom: "var(--space-3)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    "aria-hidden": copy["sb5bea41b6c62"]
                }, copy["s0bae1fe0557d"]), copy["s241a729ae0c0"]), missingInputs ? React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-2)"
                    }
                }, items.map((m, i) => React.createElement(copy["s1aca80e8b55c"], {
                    key: i,
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gridTemplateColumns: copy["s0373e0c9ff6b"],
                        gap: "var(--space-3)",
                        alignItems: copy["sf179a509d32b"],
                        fontSize: "var(--text-small)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], null, m.label), React.createElement(copy["sc96c6d5be8d0"], {
                    value: filled[i] || "",
                    placeholder: m.placeholder || "—",
                    onChange: e => setFilled({
                        ...filled,
                        [i]: e.target.value
                    }),
                    style: {
                        width: "100%",
                        boxSizing: copy["sb8090b77be3e"],
                        font: copy["s035300f3afee"],
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        padding: copy["se720827e5978"],
                        background: "var(--surface)",
                        color: "var(--text-primary)",
                        border: "var(--stroke-thin) solid var(--flag)",
                        borderRadius: "var(--radius-drawing)"
                    }
                })))) : React.createElement(copy["s51db25342581"], {
                    style: {
                        margin: 0,
                        paddingLeft: "var(--space-5)",
                        fontSize: "var(--text-small)",
                        color: "var(--text-primary)"
                    }
                }, items.map((m, i) => React.createElement(copy["s00a9e4255a5b"], {
                    key: i,
                    style: {
                        marginBottom: "var(--space-1)"
                    }
                }, typeof m === copy["s473287f8298d"] ? m : m.label)))), (onConfirm || onEdit) && React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        flexWrap: copy["sf0a289923ed6"],
                        alignItems: copy["sf179a509d32b"],
                        gap: "var(--space-3)",
                        padding: "var(--space-4) var(--space-5)",
                        borderTop: "var(--divider-width) solid var(--border)"
                    }
                }, onConfirm && React.createElement(copy["sc3e2d78f3ff3"], {
                    onClick: blocked ? undefined : onConfirm,
                    disabled: blocked,
                    "aria-disabled": blocked,
                    style: {
                        appearance: copy["s140bedbf9c3f"],
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s821ab636ac83"],
                        background: "var(--accent)",
                        color: "var(--color-white)",
                        border: "var(--border-width) solid var(--accent)",
                        borderRadius: "var(--radius-button)",
                        opacity: blocked ? 0.5 : 1,
                        cursor: blocked ? copy["sf59dedf54338"] : copy["s1cdf95bd12e9"]
                    }
                }, confirmLabel), onEdit && React.createElement(copy["sc3e2d78f3ff3"], {
                    onClick: onEdit,
                    style: {
                        appearance: copy["s140bedbf9c3f"],
                        font: copy["s035300f3afee"],
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s821ab636ac83"],
                        background: copy["s10e9f5602d24"],
                        color: "var(--text-primary)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)"
                    }
                }, copy["s464c4ffd019e"]), onConfirm && blocked && confirmCaption && React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, confirmCaption)));
            }
            Object.assign(__ds_scope, { InterpretationCard });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sea5544aaa828"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const states = {
                ready: {
                    glyph: "✓",
                    label: copy["s5fa7aac5375c"],
                    color: "var(--prov-user-ink)"
                },
                flag: {
                    glyph: "⚠",
                    label: copy["sc1ebc7817870"],
                    color: "var(--flag-ink)"
                },
                none: {
                    glyph: "—",
                    label: copy["sd16948e73a68"],
                    color: "var(--text-muted)"
                },
                others: {
                    glyph: "○",
                    label: copy["s5db7b5cda3ce"],
                    color: "var(--text-secondary)"
                }
            };
            function EPPPSChecklist({ title = copy["s9c7528dc1c25"], items = [], note, style, ...props }) {
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: copy["se564b4081d7a"],
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        padding: "var(--space-4) var(--space-5)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        background: "var(--surface-sunken)"
                    }
                }, React.createElement(copy["sacea77fd89c7"], {
                    style: {
                        fontSize: "var(--text-h6)"
                    }
                }, title)), React.createElement(copy["s51db25342581"], {
                    style: {
                        listStyle: copy["s140bedbf9c3f"],
                        margin: 0,
                        padding: 0
                    }
                }, items.map((it, i) => {
                    const s = states[it.state] || states.none;
                    return React.createElement(copy["s00a9e4255a5b"], {
                        key: i,
                        style: {
                            display: copy["s0f2a693e93e2"],
                            gridTemplateColumns: copy["sb6aecc029983"],
                            gap: "var(--space-4)",
                            alignItems: copy["s8ba8496a2525"],
                            padding: "var(--space-4) var(--space-5)",
                            borderBottom: "var(--divider-width) solid var(--divider)"
                        }
                    }, React.createElement(copy["s37a0025aa1f2"], {
                        "aria-hidden": copy["sb5bea41b6c62"],
                        style: {
                            color: s.color,
                            fontWeight: "var(--font-weight-semibold)"
                        }
                    }, s.glyph), React.createElement(copy["s37a0025aa1f2"], null, React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            display: copy["s496aca80e4d8"],
                            fontSize: "var(--text-medium)"
                        }
                    }, it.item), it.detail && React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            display: copy["s496aca80e4d8"],
                            fontSize: "var(--text-small)",
                            color: "var(--text-secondary)"
                        }
                    }, it.detail)), React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-tiny)",
                            letterSpacing: "var(--tracking-label)",
                            textTransform: copy["sd2cf63c704ae"],
                            color: s.color,
                            whiteSpace: copy["s010d16d2e921"]
                        }
                    }, s.label));
                })), note && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        padding: "var(--space-4) var(--space-5)",
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, note));
            }
            Object.assign(__ds_scope, { EPPPSChecklist });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s2b2da58dabe8"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const states = {
                pass: {
                    glyph: "✓",
                    label: copy["sebdf8cc00bc4"],
                    color: "var(--prov-user-ink)",
                    bg: "var(--prov-user-quiet)"
                },
                flag: {
                    glyph: "⚠",
                    label: copy["s552127973f84"],
                    color: "var(--flag-ink)",
                    bg: "var(--flag-quiet)"
                },
                none: {
                    glyph: "—",
                    label: copy["sd16948e73a68"],
                    color: "var(--text-muted)",
                    bg: copy["s10e9f5602d24"]
                }
            };
            function StandardsReport({ profile = copy["s0ec469a0db44"], version, rows = [], notPerformed = [], style, ...props }) {
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: copy["se564b4081d7a"],
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        flexWrap: copy["sf0a289923ed6"],
                        alignItems: copy["s8ba8496a2525"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-3)",
                        padding: "var(--space-4) var(--space-5)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        background: "var(--surface-sunken)"
                    }
                }, React.createElement(copy["sacea77fd89c7"], {
                    style: {
                        fontSize: "var(--text-h6)"
                    }
                }, copy["scd7960c32738"]), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)"
                    }
                }, profile, version ? " · " + version : "")), React.createElement(copy["scd35a2426062"], {
                    style: {
                        overflowX: copy["s929260ad9b9e"]
                    }
                }, React.createElement(copy["s0d4fc4a78d37"], {
                    style: {
                        width: "100%",
                        borderCollapse: copy["s93bc5d02dc2a"],
                        fontSize: "var(--text-small)",
                        minWidth: copy["s34ca67809000"]
                    }
                }, React.createElement(copy["sd193afcb8729"], null, React.createElement(copy["s7817bb812e82"], null, ["", copy["s9d60841e0a78"], copy["sdfaaa170c07d"], copy["sd6bd8c0aeee8"]].map((h, i) => React.createElement(copy["s6bde0b830d8b"], {
                    key: i,
                    style: {
                        textAlign: copy["s360f84035942"],
                        padding: "var(--space-2) var(--space-5)",
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        color: "var(--text-muted)",
                        fontWeight: "var(--font-weight-semibold)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        width: i === 0 ? copy["s550d1671b7f9"] : undefined
                    }
                }, h)))), React.createElement(copy["s493bab12bd43"], null, rows.map((r, i) => {
                    const s = states[r.state] || states.none;
                    return React.createElement(copy["s7817bb812e82"], {
                        key: i,
                        style: {
                            borderBottom: "var(--divider-width) solid var(--divider)",
                            background: s.bg
                        }
                    }, React.createElement(copy["s30fc9e3356c2"], {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            color: s.color,
                            fontWeight: "var(--font-weight-semibold)"
                        }
                    }, React.createElement(copy["s37a0025aa1f2"], {
                        "aria-hidden": copy["sb5bea41b6c62"]
                    }, s.glyph), React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            position: copy["s747355bdc2a2"],
                            width: 1,
                            height: 1,
                            overflow: copy["se564b4081d7a"],
                            clip: copy["sd5e0f86925f7"]
                        }
                    }, s.label)), React.createElement(copy["s30fc9e3356c2"], {
                        style: {
                            padding: "var(--space-3) var(--space-5)"
                        }
                    }, r.check, r.detail && React.createElement(copy["s37a0025aa1f2"], {
                        style: {
                            display: copy["s496aca80e4d8"],
                            color: "var(--text-secondary)",
                            fontSize: "var(--text-tiny)"
                        }
                    }, r.detail)), React.createElement(copy["s30fc9e3356c2"], {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-tiny)",
                            whiteSpace: copy["s010d16d2e921"]
                        }
                    }, r.ruleId), React.createElement(copy["s30fc9e3356c2"], {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            color: "var(--text-secondary)",
                            fontSize: "var(--text-tiny)"
                        }
                    }, r.document));
                })))), React.createElement(copy["scd35a2426062"], {
                    style: {
                        padding: "var(--space-4) var(--space-5)",
                        background: "var(--surface-sunken)",
                        borderTop: "var(--border-width) solid var(--border-strong)"
                    }
                }, React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--text-primary)",
                        marginBottom: "var(--space-2)"
                    }
                }, copy["s014146d8dfdd"]), React.createElement(copy["s51db25342581"], {
                    style: {
                        margin: 0,
                        paddingLeft: "var(--space-5)",
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)",
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-1)"
                    }
                }, notPerformed.map((n, i) => React.createElement(copy["s00a9e4255a5b"], {
                    key: i
                }, n)))));
            }
            Object.assign(__ds_scope, { StandardsReport });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s670909567329"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            const DISCLAIMER = copy["sd2f599b64f61"];
            function Row({ label, children, tone }) {
                return React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gridTemplateColumns: copy["s604a25856548"],
                        gap: "var(--space-4)",
                        padding: copy["s4ce28299c0f4"]
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: "var(--alpha-white-60)",
                        textTransform: copy["sd2cf63c704ae"],
                        letterSpacing: "var(--tracking-label)",
                        fontSize: "var(--text-tiny)"
                    }
                }, label), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        color: tone || "var(--color-white)"
                    }
                }, children));
            }
            function VerificationStamp({ profiles = [], checksPerformed = 0, checksFlagged = 0, checksNotPerformed = [], unverifiedElements = 0, signer = null, drawingHash, revision, timestamp, style, ...props }) {
                const signed = !!signer;
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        background: "var(--surface-ink)",
                        color: "var(--color-white)",
                        border: "var(--border-width) solid var(--border-inverse)",
                        borderTop: "var(--stroke-heavy) solid " + (signed ? "var(--prov-user-fill)" : "var(--prov-verify-fill)"),
                        borderRadius: "var(--radius-drawing)",
                        padding: "var(--space-5)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-small)",
                        lineHeight: "var(--leading-mono)",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement(copy["scd35a2426062"], {
                    style: {
                        display: copy["s222f930b8752"],
                        flexWrap: copy["sf0a289923ed6"],
                        alignItems: copy["sf179a509d32b"],
                        justifyContent: copy["s8c72b36502d3"],
                        gap: "var(--space-3)",
                        paddingBottom: "var(--space-3)",
                        borderBottom: "var(--divider-width) solid var(--border-inverse)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        fontWeight: "var(--font-weight-bold)"
                    }
                }, copy["s7c728caa899b"]), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        padding: copy["s6812252b75a8"],
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        fontWeight: "var(--font-weight-bold)",
                        background: signed ? "var(--prov-user-fill)" : "var(--prov-verify-fill)",
                        color: signed ? "var(--color-white)" : "var(--color-neutral-darkest)"
                    }
                }, signed ? copy["s701723fe5f16"] : copy["s0839843fa6f8"])), React.createElement(copy["scd35a2426062"], {
                    style: {
                        padding: "var(--space-3) 0"
                    }
                }, React.createElement(Row, {
                    label: copy["s535e52e4a261"]
                }, profiles.length ? profiles.join("  ·  ") : "—"), React.createElement(Row, {
                    label: copy["s6915f6e1aae7"]
                }, checksPerformed), React.createElement(Row, {
                    label: copy["sdac4cad50a87"],
                    tone: checksFlagged ? "var(--color-amber-light)" : undefined
                }, checksFlagged ? "⚠ " + checksFlagged : "0"), React.createElement(Row, {
                    label: copy["s014146d8dfdd"]
                }, checksNotPerformed.length), React.createElement(Row, {
                    label: copy["sba8eccff9072"],
                    tone: unverifiedElements ? "var(--color-amber-light)" : undefined
                }, unverifiedElements), React.createElement(Row, {
                    label: copy["s0297e535f44d"],
                    tone: signed ? undefined : "var(--color-red-light)"
                }, signed ? signer : copy["sbf2d56d8dcb3"]), React.createElement(Row, {
                    label: copy["s053a68f6fd15"]
                }, drawingHash, revision ? copy["sd813117c3c7a"] + revision : ""), React.createElement(Row, {
                    label: copy["s115a2cc92c10"]
                }, timestamp)), checksNotPerformed.length > 0 && React.createElement(copy["scd35a2426062"], {
                    style: {
                        paddingTop: "var(--space-3)",
                        borderTop: "var(--divider-width) solid var(--border-inverse)"
                    }
                }, React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: copy["sd2cf63c704ae"],
                        color: "var(--color-amber-light)",
                        marginBottom: "var(--space-2)"
                    }
                }, copy["sc91a198ac3c5"]), React.createElement(copy["s51db25342581"], {
                    style: {
                        margin: 0,
                        paddingLeft: "var(--space-5)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--alpha-white-60)",
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-1)"
                    }
                }, checksNotPerformed.map((c, i) => React.createElement(copy["s00a9e4255a5b"], {
                    key: i
                }, c)))), React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        marginTop: "var(--space-4)",
                        paddingTop: "var(--space-3)",
                        borderTop: "var(--divider-width) solid var(--border-inverse)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--alpha-white-60)"
                    }
                }, DISCLAIMER));
            }
            Object.assign(__ds_scope, { VerificationStamp });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["sf9cf9fb87465"], error: String((e && e.message) || e) });
    }
    try {
        (() => {
            function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) {
                var t = arguments[e];
                for (var r in t)
                    ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            } return n; }, _extends.apply(null, arguments); }
            function WhatWeDontDo({ title = copy["s0a6f586dd9c9"], items = [], footnote, style, ...props }) {
                return React.createElement(copy["scd35a2426062"], _extends({
                    style: {
                        border: "var(--border-width) solid var(--border-strong)",
                        borderRadius: "var(--radius-drawing)",
                        background: "var(--surface)",
                        padding: "var(--space-6)",
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-5)",
                        ...style
                    }
                }, props), React.createElement(copy["se9590c04cea5"], {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, title), React.createElement(copy["s51db25342581"], {
                    style: {
                        listStyle: copy["s140bedbf9c3f"],
                        margin: 0,
                        padding: 0,
                        display: copy["s0f2a693e93e2"],
                        gap: "var(--space-1)"
                    }
                }, items.map((it, i) => React.createElement(copy["s00a9e4255a5b"], {
                    key: i,
                    style: {
                        display: copy["s0f2a693e93e2"],
                        gridTemplateColumns: copy["sc8fe0e07f484"],
                        gap: "var(--space-3)",
                        alignItems: copy["s8ba8496a2525"],
                        padding: "var(--space-3) 0",
                        borderTop: i === 0 ? copy["s140bedbf9c3f"] : "var(--divider-width) solid var(--divider)"
                    }
                }, React.createElement(copy["s37a0025aa1f2"], {
                    className: copy["s94d05ba1838b"],
                    "aria-hidden": copy["sb5bea41b6c62"],
                    style: {
                        color: "var(--prov-verify-ink)",
                        fontSize: copy["s8c756dc2fd39"]
                    }
                }, copy["s310ff200149b"]), React.createElement(copy["s37a0025aa1f2"], {
                    style: {
                        fontSize: "var(--text-medium)"
                    }
                }, it)))), footnote && React.createElement(copy["s148de9c5a7a4"], {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, footnote));
            }
            Object.assign(__ds_scope, { WhatWeDontDo });
        })();
    }
    catch (e) {
        __ds_ns.__errors.push({ path: copy["s961505e7abda"], error: String((e && e.message) || e) });
    }
    __ds_ns.Mark = __ds_scope.Mark;
    __ds_ns.Wordmark = __ds_scope.Wordmark;
    __ds_ns.Accordion = __ds_scope.Accordion;
    __ds_ns.Badge = __ds_scope.Badge;
    __ds_ns.Button = __ds_scope.Button;
    __ds_ns.Card = __ds_scope.Card;
    __ds_ns.Checkbox = __ds_scope.Checkbox;
    __ds_ns.Dialog = __ds_scope.Dialog;
    __ds_ns.Input = __ds_scope.Input;
    __ds_ns.Label = __ds_scope.Label;
    __ds_ns.RadioGroup = __ds_scope.RadioGroup;
    __ds_ns.Select = __ds_scope.Select;
    __ds_ns.Tabs = __ds_scope.Tabs;
    __ds_ns.Textarea = __ds_scope.Textarea;
    __ds_ns.DrawingFrame = __ds_scope.DrawingFrame;
    __ds_ns.HeroSlideshow = __ds_scope.HeroSlideshow;
    __ds_ns.PromptBox = __ds_scope.PromptBox;
    __ds_ns.TwoDoorHero = __ds_scope.TwoDoorHero;
    __ds_ns.PricingTable = __ds_scope.PricingTable;
    __ds_ns.ProfileCard = __ds_scope.ProfileCard;
    __ds_ns.SignerCard = __ds_scope.SignerCard;
    __ds_ns.Footer = __ds_scope.Footer;
    __ds_ns.Navbar = __ds_scope.Navbar;
    __ds_ns.AssumptionsPanel = __ds_scope.AssumptionsPanel;
    __ds_ns.ChangeList = __ds_scope.ChangeList;
    __ds_ns.ConceptWatermark = __ds_scope.ConceptWatermark;
    __ds_ns.InterpretationCard = __ds_scope.InterpretationCard;
    __ds_ns.ProvenanceChip = __ds_scope.ProvenanceChip;
    __ds_ns.EPPPSChecklist = __ds_scope.EPPPSChecklist;
    __ds_ns.StandardsReport = __ds_scope.StandardsReport;
    __ds_ns.VerificationStamp = __ds_scope.VerificationStamp;
    __ds_ns.WhatWeDontDo = __ds_scope.WhatWeDontDo;
})();
function Section({ scheme = copy["sa457e8f04aa7"], children, style, ...props }) {
    return (<section className={copy["s9ba7b827d3b1"] + scheme} style={style} {...props}>
      <div className={copy["s61e4a2377416"]}>{children}</div>
    </section>);
}
function SectionHead({ eyebrow, title, lead, align = copy["s360f84035942"], max = "var(--container-lg)" }) {
    return (<div style={{
            display: copy["s0f2a693e93e2"], gap: "var(--space-4)", marginBottom: "var(--space-12)",
            maxWidth: max, marginInline: align === copy["sf179a509d32b"] ? copy["s929260ad9b9e"] : undefined,
            textAlign: align,
        }}>
      {eyebrow && <p style={{
                fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)",
                textTransform: copy["sd2cf63c704ae"], fontWeight: "var(--font-weight-semibold)",
                color: "var(--scheme-text-secondary, var(--text-secondary))",
            }}>{eyebrow}</p>}
      {title && <h2>{title}</h2>}
      {lead && <p style={{ fontSize: "var(--text-large)", color: "var(--scheme-text-secondary, var(--text-secondary))" }}>{lead}</p>}
    </div>);
}
function Grid({ min = copy["s4d450b48b82e"], gap = "var(--space-6)", children, style }) {
    return <div style={{ display: copy["s0f2a693e93e2"], gap, gridTemplateColumns: copy["s5eea8d5ce2be"] + min + copy["s416ad87b8c8a"], ...style }}>{children}</div>;
}
function Split({ children, ratio = copy["s4a95b5c1ae73"], gap = "var(--space-12)", style }) {
    return <div style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: ratio, gap, alignItems: copy["sf179a509d32b"], ...style }}>{children}</div>;
}
function PlanStub({ rooms = 3 }) {
    return (<div style={{ position: copy["s747355bdc2a2"], inset: "12%", border: "var(--stroke-heavy) solid var(--drawing-ink)", display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["s19e2272bfcbc"] + copy["sa9bcae4309da"].repeat(rooms - 1) + copy["se3b0c44298fc"] }}>
      {Array.from({ length: rooms }).map((_, i) => (<div key={i} style={{ borderRight: i < rooms - 1 ? "var(--stroke-medium) solid var(--drawing-ink)" : copy["s140bedbf9c3f"] }}/>))}
      <div style={{ position: copy["s747355bdc2a2"], left: 0, right: 0, bottom: "-9%", borderTop: "var(--stroke-thin) solid var(--drawing-ink-faint)" }}/>
    </div>);
}
function Dimension({ label, style }) {
    return (<div style={{ position: copy["s747355bdc2a2"], display: copy["s222f930b8752"], alignItems: copy["sf179a509d32b"], gap: "var(--space-2)", ...style }}>
      <span style={{ flex: 1, borderTop: "var(--stroke-thin) solid var(--drawing-ink)", position: copy["sd2d9e1f13413"] }}/>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", background: "var(--drawing-paper)", padding: copy["s3498826e9add"], color: "var(--drawing-ink)" }}>{label}</span>
      <span style={{ flex: 1, borderTop: "var(--stroke-thin) solid var(--drawing-ink)" }}/>
    </div>);
}
function CodeBlock({ lines = [], style }) {
    return (<pre style={{
            margin: 0, padding: "var(--space-5)", background: "var(--surface-ink)",
            color: "var(--color-white)", borderRadius: "var(--radius-drawing)",
            fontFamily: "var(--font-mono)", fontSize: "var(--text-small)",
            lineHeight: "var(--leading-mono)", overflowX: copy["s929260ad9b9e"], ...style,
        }}>
      {lines.map((l, i) => (<div key={i} style={{ color: l.tone || "var(--color-white)" }}>{l.text !== undefined ? l.text : l}</div>))}
    </pre>);
}
function FactRow({ items = [], scheme }) {
    return (<div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-8)" }}>
      {items.map((it) => (<div key={it.label} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-1)" }}>
          <span style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--scheme-text-secondary, var(--text-secondary))" }}>{it.label}</span>
          <span style={{ fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-medium)" }}>{it.value}</span>
        </div>))}
    </div>);
}
function CTA({ title, lead, primary = copy["sf9bd4c6db19e"], secondary = copy["sd2cfcdb081c7"] }) {
    return (<Section scheme={copy["sb728b7e775f7"]}>
      <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)", maxWidth: "var(--container-lg)" }}>
        <h2>{title}</h2>
        {lead && <p style={{ fontSize: "var(--text-large)", color: "var(--text-inverse-secondary)" }}>{lead}</p>}
        <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-4)" }}>
          <DL.Button variant={copy["s7705accd2694"]}>{primary}</DL.Button>
          <DL.Button variant={copy["s0fb4109659f7"]}>{secondary}</DL.Button>
        </div>
      </div>
    </Section>);
}
function Home({ go }) {
    const { TwoDoorHero, HeroSlideshow, VerificationStamp, PricingTable, DrawingFrame, ProvenanceChip, Badge, Button } = DL;
    const heroImages = [copy["s86cba9c386b7"], copy["s1e53b0d181e0"], copy["sa1fa3b7187d6"], copy["scceea748c331"], copy["sd0928493ae57"], copy["s7e7fd4122692"], copy["s4eca5c840fe1"], copy["s0ffca1846b34"], copy["s5187896584c3"], copy["s697901165cd2"]].map((f) => (resources && resources[copy["s1cefbd78fe77"] + f.slice(0, 2)]) || copy["s7145ad9a4576"] + f + copy["sd912c70acf20"]);
    return (<main>
      <Section scheme={copy["sb728b7e775f7"]} style={{ position: copy["sd2d9e1f13413"], overflow: copy["se564b4081d7a"], minHeight: copy["sd7b62038481a"], display: copy["s0f2a693e93e2"], alignItems: copy["sf179a509d32b"] }}>
        {HeroSlideshow && <HeroSlideshow images={heroImages} interval={5000} scrim={0.55}/>}
        <TwoDoorHero style={{ "--scheme-text-secondary": "var(--text-inverse)" }} headline={copy["sc1714d240dda"]} subhead={copy["s5a220c575eb9"]} doors={[
            { eyebrow: copy["sa68388d7143f"], title: copy["sf9bd4c6db19e"], description: copy["s4b9b0feb5218"], cta: copy["sf9bd4c6db19e"], meta: copy["s0dece23ebd0a"] },
            { eyebrow: copy["s101a1c97b01b"], title: copy["sd2cfcdb081c7"], description: copy["s62bf89b92e2b"], cta: copy["sf4f5cdceaa23"], meta: copy["sc3b6997676b3"] },
        ]}/>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s76930df5254a"]} title={copy["s10776a7390ef"]} lead={copy["s98e22c8771d2"]}/>
        <Split ratio={copy["sfc1da61f6790"]}>
          <DrawingFrame label={copy["s3c4353f8cc89"]} sheet={copy["s37570cb902f7"]} scale="50" revision={copy["s6b23c0d5f35d"]} hash={copy["sf2d1d626f90b"]} ratio="16 / 9" grid={false}>
            <img src={(resources && resources.sentencePlan) || "../../assets/hero/sm/sentence-plan.jpg"} alt={copy["s07b0228e35eb"]} style={{ display: copy["s496aca80e4d8"], width: "100%", height: "100%", objectFit: copy["s3fa405a8301a"] }}/>
          </DrawingFrame>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", alignContent: copy["sf179a509d32b"] }}>
            <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{copy["sf9c612f196cd"]}</p>
            <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-2)" }}>
              <ProvenanceChip source={copy["s04f8996da763"]} label={copy["s3dcb825aaaee"]}/>
              <ProvenanceChip source={copy["s204ed55e1af9"]} label={copy["s0184e81340e8"]}/>
              <ProvenanceChip source={copy["s244210e48437"]} label={copy["s582ab56f44a7"]}/>
              <ProvenanceChip source={copy["sa12dd3a7fd32"]} label={copy["s611c4eda16fe"]}/>
            </div>
            <FactRow items={[{ label: copy["sc161fe731eb7"], value: copy["s7f7ef9a90451"] }, { label: copy["s523487a5de21"], value: "42%" }, { label: copy["s582ab56f44a7"], value: copy["s21ec55719bac"] }]}/>
          </div>
        </Split>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <SectionHead eyebrow={copy["s9c870aa6e5e9"]} title={copy["s9beda57394ae"]}/>
        <Grid min={copy["s868f8b15fc2d"]}>
          {[
            { n: "01", t: copy["sb202bcb90ca5"], d: copy["safefa074fc2c"], chip: copy["s204ed55e1af9"] },
            { n: "02", t: copy["sebf12ef47cf5"], d: copy["s2bc54e135a1c"], chip: copy["s244210e48437"] },
            { n: "03", t: copy["s0c9618e9849a"], d: copy["s681a96a083d1"], chip: copy["s04f8996da763"] },
        ].map((s) => (<DL.Card key={s.n} tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{s.n}</span>
              <h3 style={{ fontSize: "var(--text-h5)" }}>{s.t}</h3>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{s.d}</p>
              <ProvenanceChip source={s.chip}/>
            </DL.Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s2adc964c0847"]} title={copy["scc61c87e5760"]}/>
        <Grid min={copy["s4d450b48b82e"]}>
          {[
            { t: copy["sd287f75d4bef"], d: copy["sef48525f8773"], meta: copy["sd06f92b17873"] },
            { t: copy["s766a7059b48c"], d: copy["sd752e515bee5"], meta: copy["s4362af3b7dac"] },
            { t: copy["sd08935968e77"], d: copy["scb8e0bfc2e9e"], meta: copy["s66bfd233bd4c"] },
        ].map((e) => (<DL.Card key={e.t} tone={copy["s763cdc62a869"]} padding="var(--space-6)" interactive style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
              <h3 style={{ fontSize: "var(--text-h6)" }}>{e.t}</h3>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{e.d}</p>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{e.meta}</span>
            </DL.Card>))}
        </Grid>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s66c8a4a52fe3"]} title={copy["s153769d57fdd"]} lead={copy["sea0d3819f213"]}/>
        <Split ratio={copy["s97eb522ee6c7"]}>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
            {[
            [copy["s8f84c99a27c1"], copy["s7895b3d7634b"]],
            [copy["s0a9b580f4e2e"], copy["sb61240821b28"]],
            [copy["s278989becda3"], copy["sc2a177110c89"]],
        ].map(([t, d]) => (<div key={t} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-1)" }}>
                <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
              </div>))}
          </div>
          <VerificationStamp profiles={[copy["s22cd53a68b2e"], copy["sc6884dcfd545"]]} checksPerformed={41} checksFlagged={3} checksNotPerformed={[copy["sf3c19e5be975"], copy["sa90027b005dc"], copy["sd492110a9ecf"]]} unverifiedElements={2} signer={null} drawingHash={copy["sf2d1d626f90b"]} revision={copy["s6b23c0d5f35d"]} timestamp={copy["s83ee2882eb7c"]}/>
        </Split>
      </Section>

      <Section scheme={copy["se9ee482d048d"]}>
        <SectionHead eyebrow={copy["s523487a5de21"]} title={copy["s3c21c657a86b"]}/>
        <div style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["sf19e50051f77"], gap: "var(--space-10)", alignItems: copy["s1219929bd7c1"] }}>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", alignContent: copy["scced28c6dc3f"] }}>
            <p style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--text-muted)", fontWeight: 600 }}>{copy["s10851b812123"]}</p>
            <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-2)" }}>
              <Badge tone={copy["sa3a7f053ae2e"]}>{copy["scd74053c5481"]}</Badge>
              {[copy["s25b5c8ed560b"], copy["s8d37bae00c3d"], copy["sa2eefbcb6bbe"], copy["safd0e7d014ac"], copy["sf9af38e65648"], copy["s59c388e8daaf"], copy["s0033ce548c44"], copy["se658d3ae034a"], copy["s211bb3de5686"], copy["s5896b1032538"], copy["sed02a72d7c36"]].map((d) => (<Badge key={d} tone={copy["s318678825324"]} style={{ color: "var(--text-secondary)", fontWeight: "var(--font-weight-regular)" }}>{d}<span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--text-muted)", marginLeft: "var(--space-1)" }}>{copy["s3de1580490d2"]}</span></Badge>))}
            </div>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["sffa330f616ee"]}</p>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", alignContent: copy["scced28c6dc3f"] }}>
            <p style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--text-muted)", fontWeight: 600 }}>{copy["s1db075e5f263"]}</p>
            <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-2)" }}>
              <Badge tone={copy["sa3a7f053ae2e"]}>{copy["s8d23a6e37e0a"]}</Badge>
              <Badge tone={copy["sa3a7f053ae2e"]}>{copy["s49dca65f362f"]}</Badge>
              <Badge tone={copy["sa3a7f053ae2e"]}>{copy["s04952a0f984d"]}</Badge>
              <Badge tone={copy["s318678825324"]}>{copy["sa8a4f43ad7e1"]}</Badge>
              <Badge tone={copy["s318678825324"]} style={{ color: "var(--text-secondary)", fontWeight: "var(--font-weight-regular)" }}>{copy["sce8f437f9be4"]}</Badge>
            </div>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["s6cf204e953ce"]}</p>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["se8c50a83a2d4"]}</p>
            <p style={{ fontSize: "var(--text-small)" }}><a href="#" onClick={(e) => { e.preventDefault(); go(copy["s28432ceece43"]); }}>{copy["sc7ad9e18f795"]}</a></p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sdfe95783edfe"]} title={copy["sdafdfcb52414"]} lead={<span>{copy["s0a93ce300299"]}<a href="#" onClick={(e) => { e.preventDefault(); go(copy["sdfe95783edfe"]); }}>{copy["s5a642be37ab1"]}</a>{copy["scdb4ee2aea69"]}</span>}/>
        <PricingTable tiers={PRICING_TIERS.slice(0, 4)}/>
      </Section>

      <CTA title={copy["s3f2f25c954ea"]} lead={copy["s34e0366546d2"]}/>
    </main>);
}
const PRICING_TIERS = [
    { name: copy["sf411a1fb6275"], group: copy["s1876bbc8e3e5"], audience: copy["s6ed17a83f133"], price: { GBP: copy["s5737615ede7c"], USD: copy["sce66470e18f3"], NGN: copy["s5e2d4f2c2b7c"] }, includes: [copy["s732b1cc5b9b7"], copy["s4158e2c99d27"], copy["s14435b310370"]] },
    { name: copy["sb202bcb90ca5"], group: copy["s1876bbc8e3e5"], audience: copy["s57d32d9156c2"], price: { GBP: copy["s1836beef5951"], USD: copy["sba144262a228"], NGN: copy["sede4306a675a"] }, per: copy["sdcc954337afd"], includes: [copy["s467675d7702d"], copy["sef88b71628ea"], copy["sa7a165e1d89a"], copy["sb89a706e380f"]] },
    { name: copy["s010dd7b94f5f"], group: copy["s791757205d8b"], audience: copy["s2c763a487707"], price: { GBP: copy["sd6ed1aa546c1"], USD: copy["s4d314ed09d84"], NGN: copy["sdbc033d239eb"] }, per: copy["sdcc954337afd"], includes: [copy["s101a1c97b01b"], copy["sd86eb5196176"], copy["scd7960c32738"], copy["s6df1a427fa36"]] },
    { name: copy["s19c73a5cdf34"], group: copy["s791757205d8b"], audience: copy["s6b9b8ecc3fe3"], price: { GBP: copy["s7d09d7a230a3"], USD: copy["s2aa253147048"], NGN: copy["s189adb588bab"] }, per: copy["s777763e0d9ec"], featured: true, includes: [copy["sb62f3c6b3c9c"], copy["sab4368f2814c"], copy["s8b1c63e4f6c2"], copy["s268fd7afc6f3"]] },
    { name: copy["sd3857b12b4ce"], group: copy["s791757205d8b"], audience: { GBP: copy["sba2cf3c6336c"], USD: copy["s44aa0d76a63c"], NGN: copy["s4146fc976ad8"] }, price: { GBP: copy["sf1fa585a2505"], USD: copy["s7a7808552fe5"], NGN: copy["sfc085b3d1725"] }, per: copy["sdcc954337afd"], includes: [copy["s2dc0bccbec54"], copy["s5ff47bd0eb03"], copy["s96f2175aa673"], copy["s2035251e5065"]] },
    { name: copy["sa5239a7b5156"], group: copy["s791757205d8b"], audience: copy["s8fcb5c62cd61"], priceNote: copy["s494ca78f7374"], includes: [copy["s50239a6d15d3"], copy["sc9993f55c97b"], copy["se534a21c314f"], copy["s19adec1e94aa"]] },
];
function IdeaMode() {
    const { PromptBox, AssumptionsPanel, ConceptWatermark, DrawingFrame, WhatWeDontDo, Card, Badge, Button, Accordion, PricingTable } = DL;
    const tone = {
        good: { glyph: "✓", word: copy["s46124e023603"], fill: "var(--prov-user-fill)", ink: "var(--prov-user-ink)", quiet: "var(--prov-user-quiet)" },
        weak: { glyph: "⚠", word: copy["s8d6cea2517ff"], fill: "var(--prov-inferred-fill)", ink: "var(--prov-inferred-ink)", quiet: "var(--prov-inferred-quiet)" },
        missing: { glyph: "⚠", word: copy["s6be36ca49ee8"], fill: "var(--prov-verify-fill)", ink: "var(--prov-verify-ink)", quiet: "var(--prov-verify-quiet)" },
    };
    const mono = { fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" };
    const label = { fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--text-secondary)" };
    const [teach, setTeach] = React.useState(true);
    const [opt, setOpt] = React.useState(0);
    const massing = [
        { name: copy["sac077b75c1aa"], cov: "38%", gfa: copy["s4c0b8d8262d0"], img: copy["s208557f2c03c"], chip: [237, 85], rects: [[190, 110, 200, 46], [190, 156, 54, 66], [336, 156, 54, 66]] },
        { name: copy["s0c911ecf1d66"], cov: "34%", gfa: copy["sd799ebfb453d"], img: copy["s241c94302f67"], chip: [216, 88], rects: [[190, 118, 210, 58]] },
        { name: copy["s8122cdaeeaa3"], cov: "42%", gfa: copy["s7c0a68ac9751"], img: copy["s0d807e30884a"], chip: [246, 92], rects: [[186, 108, 96, 110], [300, 108, 96, 110]] },
    ];
    const plot = [[173, 74], [465, 74], [465, 235], [173, 235]];
    const setback = [[197, 98], [441, 98], [441, 211], [197, 211]];
    const chipStyle = { position: copy["s747355bdc2a2"], transform: copy["s4077e47b9d0b"], fontFamily: "var(--font-mono)", fontSize: copy["s6d3b65a0dcde"], lineHeight: 1.2, letterSpacing: "var(--tracking-label)", color: "var(--text-primary)", background: copy["sea1e459fee10"], borderRadius: copy["s356601538da0"], padding: copy["s8bc217908cbb"], whiteSpace: copy["s010d16d2e921"], pointerEvents: copy["s140bedbf9c3f"] };
    const photo = massing[opt].img && ((resources || {})[massing[opt].img.replace(/-(.)/g, (m, c) => c.toUpperCase())] || copy["s7145ad9a4576"] + massing[opt].img + copy["sd912c70acf20"]);
    const ml = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 0.6, fill: "#f1efe8" };
    const miniPoints = [
        { t: copy["s770e607624d6"], point: copy["s0f8406ff2424"] },
        { t: copy["s481ba4019c9d"], point: copy["sad9e8091e9e6"] },
        { t: copy["sffa63583dfa6"], point: copy["sdb26387470e2"] },
    ];
    return (<main style={{ fontSize: "var(--text-body-idea)" }}>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-8)", maxWidth: "var(--container-xl)", marginInline: copy["s929260ad9b9e"], textAlign: copy["sf179a509d32b"], justifyItems: copy["sf179a509d32b"] }}>
          <h1>{copy["s9fca9b27f1c9"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s95dc0ff98885"]}</p>
          <PromptBox placeholder={copy["sf5034a0c64a3"]} location={copy["sb29460df18de"]} examples={[copy["s38fda45195b4"], copy["s5d299cd4ae99"], copy["se1975d4d6999"]]}/>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s5a7866e76f74"]} title={copy["sacc301f60afa"]} lead={copy["s0d9e739ed974"]}/>
        <Grid min={copy["sec6f0ef65f7b"]} gap="var(--space-5)">
          {[
            { t: copy["s44660369ca19"], area: copy["s7f7ef9a90451"], cov: "42%", img: (resources && resources.optionAPlan) || "../../assets/hero/sm/option-a-plan.jpg" },
            { t: copy["s1ee658cb528f"], area: copy["s1479cf7fa80f"], cov: "48%", img: (resources && resources.optionBPlan) || "../../assets/hero/sm/option-b-plan.jpg" },
            { t: copy["s87fcd793256d"], area: copy["s2a760802a350"], cov: "39%", img: (resources && resources.optionCPlan) || "../../assets/hero/sm/option-c-plan.jpg" },
        ].map((o, i) => (<div key={o.t} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)" }}>
              <DrawingFrame label={copy["s1033cf49bf3f"] + copy["sb5d4045c3f46"][i]} sheet={copy["s2727ecda3e73"] + (i + 1)} scale="100" ratio="16 / 9" grid={false}>
                <img src={o.img} alt={o.t + copy["sa0eabad3266f"]} style={{ display: copy["s496aca80e4d8"], width: "100%", height: "100%", objectFit: copy["s3fa405a8301a"] }}/>
              </DrawingFrame>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{o.t}</h4>
              <FactRow items={[{ label: copy["sc161fe731eb7"], value: o.area }, { label: copy["se516876b7586"], value: o.cov }]}/>
            </div>))}
        </Grid>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s777ebdf3dd6f"]} title={copy["se22a67170c34"]} lead={copy["s000cef079180"]}/>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", maxWidth: "var(--container-xl)" }}>
          <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-2)" }}>
            {massing.map((m, i) => (<button key={m.name} type={copy["sc3e2d78f3ff3"]} aria-pressed={opt === i} onClick={() => setOpt(i)} style={{ appearance: copy["s140bedbf9c3f"], font: copy["s035300f3afee"], fontSize: "var(--text-small)", fontWeight: "var(--font-weight-medium)", padding: copy["s821ab636ac83"], borderRadius: "var(--radius-button)", border: "var(--border-width) solid " + (opt === i ? "var(--accent)" : "var(--border-strong)"), background: opt === i ? "var(--accent)" : "var(--surface)", color: opt === i ? "var(--color-white)" : "var(--text-primary)", cursor: copy["s1cdf95bd12e9"], transition: copy["s83ce79523ab8"] }}>{m.name}</button>))}
            <span style={{ ...mono, alignSelf: copy["sf179a509d32b"], marginLeft: copy["s929260ad9b9e"] }}>{copy["sb7da3a99659b"]}{massing[opt].cov}{copy["s6c18b0d7f09f"]}{massing[opt].gfa}</span>
          </div>
          <div style={{ position: copy["sd2d9e1f13413"], border: "var(--border-width) solid var(--border-strong)", borderRadius: "var(--radius-drawing)", overflow: copy["se564b4081d7a"], background: "#8f8d82" }}>
            <svg viewBox="0 0 640 320" role={copy["sb29814cf5792"]} aria-label={copy["s808986f6babd"]} style={{ display: copy["s496aca80e4d8"], width: "100%", height: copy["s929260ad9b9e"] }}>
              <rect width="640" height="320" fill="#8a8a7c"></rect>
              {photo ? <image href={photo} x="0" y="0" width="640" height="320" preserveAspectRatio={copy["s4b05673f8991"]}></image> : (<React.Fragment>
              <rect x="0" y="0" width="268" height="146" fill={copy["s642cc77b9004"]}></rect><rect x="352" y="96" width="288" height="132" fill={copy["s0c501f182ba9"]}></rect><rect x="120" y="196" width="214" height="124" fill={copy["s66e31252c957"]}></rect>
              <rect x="96" y="0" width="46" height="320" fill="#b6b4ab"></rect>
              <line x1="119" y1="0" x2="119" y2="320" stroke="#e9e7de" strokeWidth="2" strokeDasharray="11 9"></line>
              <rect x="0" y="274" width="640" height="30" fill="#b6b4ab"></rect>
              <text style={ml} transform={copy["sfe4b7e3334a4"]} x="110" y="216" textAnchor={copy["sa4888af4e46c"]}>{copy["s177d0295db89"]}</text>
              <rect x="146" y="252" width="494" height="11" fill="#7f95a2"></rect>
              <text style={{ ...ml, fill: "#f1efe8" }} x="300" y="249">{copy["sdcab9df4f86a"]}</text>
              <g fill={copy["s7b8c68b5aeae"]} stroke={copy["s9cc55b664ed9"]} strokeWidth="1">
                <rect x="178" y="16" width="94" height="50"></rect><rect x="300" y="10" width="76" height="56"></rect><rect x="406" y="18" width="96" height="44"></rect><rect x="498" y="118" width="104" height="86"></rect><rect x="186" y="292" width="92" height="28"></rect>
              </g>
              <text style={ml} x="550" y="166" textAnchor={copy["sa4888af4e46c"]}>{copy["s6d21e45368dc"]}</text>
              </React.Fragment>)}
              <polygon points={plot.map((p) => p.join(",")).join(" ")} fill={copy["s56e00a01f4a2"]} stroke="var(--accent)" strokeWidth="2"></polygon>
              <polygon points={setback.map((p) => p.join(",")).join(" ")} fill={copy["s140bedbf9c3f"]} stroke="#f1efe8" strokeWidth="1" strokeDasharray="4 3"></polygon>
              {!photo && (<g fill={copy["sc137f3559695"]} stroke="var(--drawing-ink)" strokeWidth="1">
                {massing[opt].rects.map(([x, y, w, h], i) => <rect key={opt + "-" + i} x={x} y={y} width={w} height={h}></rect>)}
              </g>)}
              {plot.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="5.5" fill="var(--color-white)" stroke="var(--accent)" strokeWidth="2"></circle>)}
              <line x1="20" y1="306" x2="100" y2="306" stroke="#f1efe8" strokeWidth="1.5"></line><line x1="20" y1="302" x2="20" y2="310" stroke="#f1efe8" strokeWidth="1.5"></line><line x1="100" y1="302" x2="100" y2="310" stroke="#f1efe8" strokeWidth="1.5"></line>
              <text style={ml} x="20" y="298">{copy["s8fa112ad61e7"]}</text>
              <line x1="616" y1="36" x2="616" y2="14" stroke="#f1efe8" strokeWidth="1.5"></line><text style={ml} x="616" y="48" textAnchor={copy["sa4888af4e46c"]}>{copy["s8ce86a6ae65d"]}</text>
            </svg>
            <span style={{ ...chipStyle, left: ((plot[0][0] + plot[1][0]) / 2 / 640 * 100) + "%", top: (plot[0][1] / 320 * 100) + "%" }}>{copy["se500f5093b81"]}</span>
            <span style={{ ...chipStyle, left: ((setback[3][0] + setback[2][0]) / 2 / 640 * 100) + "%", top: (setback[2][1] / 320 * 100) + "%" }}>{copy["sc56fcc93881a"]}</span>
            <span style={{ ...chipStyle, left: (massing[opt].chip[0] / 640 * 100) + "%", top: (massing[opt].chip[1] / 320 * 100) + "%" }}>{copy["sbe70652d1c41"] + [copy["s559aead08264"], copy["sdf7e70e50215"], copy["s6b23c0d5f35d"]][opt]}</span>
            <div style={{ display: copy["s222f930b8752"], justifyContent: copy["s8c72b36502d3"], gap: "var(--space-3)", flexWrap: copy["sf0a289923ed6"], padding: copy["se720827e5978"], background: "var(--surface-ink)", color: "var(--color-neutral-lighter)", fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)" }}>
              <span>{photo ? copy["sde4f1df34cdd"] : copy["sf1bc76d17947"]}</span>
              <span>{copy["se15c2f7a7a39"]}</span>
            </div>
          </div>
          <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-2) var(--space-5)", padding: "var(--space-3) var(--space-4)", border: "var(--border-width) solid var(--border)", borderRadius: "var(--radius-drawing)", background: "var(--surface)", fontSize: "var(--text-small)" }}>
            {[[copy["s244210e48437"], copy["s6ef1ab841591"], copy["sfa35946ca2dd"]], [copy["s204ed55e1af9"], copy["sfcf4b1a7548c"], copy["s9eb157ddd4c0"]], [copy["s204ed55e1af9"], copy["s5dd6e0396c9d"], copy["s8a69e48e8d55"]]].map(([s, k, v]) => (<span key={k} style={{ display: copy["s123306850fe1"], alignItems: copy["sf179a509d32b"], gap: "var(--space-2)" }}>
                <span aria-hidden={copy["sb5bea41b6c62"]} style={{ width: copy["s7b8ee66537de"], height: copy["s7b8ee66537de"], borderRadius: "var(--radius-drawing)", background: "var(--prov-" + s + copy["sedd7870360fd"] }}/>
                {s === copy["s204ed55e1af9"] && <span aria-hidden={copy["sb5bea41b6c62"]} style={{ color: "var(--flag-ink)" }}>{copy["s0bae1fe0557d"]}</span>}
                <span style={{ color: "var(--text-secondary)" }}>{k}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)" }}>{v}</span>
              </span>))}
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: copy["s7769e817028f"], color: "var(--text-secondary)", margin: 0 }}>{copy["sd315eb830314"]}</p>
          <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)", textWrap: copy["s77049f6f8893"] }}>{copy["s8b8d43e90f85"]}</p>
        </div>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["sbe8c36575bcd"]} title={copy["s2dde3efe39d5"]} lead={copy["sacc95d8fbbcb"]}/>
        <Split ratio={copy["s4a95b5c1ae73"]}>
          <AssumptionsPanel note={copy["s4ce059725088"]} assumptions={[
            { text: copy["s011963b956a3"] },
            { text: copy["s3e146a8249ba"], term: copy["sbcc6937a5e11"] },
            { text: copy["s3834384ceac8"], term: copy["sc3a3091b9d32"] },
            { text: copy["s7c49a54d0b34"] },
            { text: copy["sdc5dc6e87994"] },
        ]} onEdit={() => { }}/>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sdbbb19d0eb0b"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s52ded88493a3"]}</p>
            <ul style={{ listStyle: copy["s140bedbf9c3f"], margin: 0, padding: 0, display: copy["s0f2a693e93e2"], gap: "var(--space-3)" }}>
              {[copy["s66ac1c67cc10"], copy["sfce680cf487c"], copy["sec40d881c83b"]].map((f) => (<li key={f} style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["sc8fe0e07f484"], gap: "var(--space-3)", alignItems: copy["s8ba8496a2525"] }}>
                  <span aria-hidden={copy["sb5bea41b6c62"]} style={{ color: "var(--flag-ink)" }}>{copy["s0bae1fe0557d"]}</span>
                  <span style={{ fontSize: "var(--text-medium)" }}>{f}</span>
                </li>))}
            </ul>
            <div><Button variant={copy["sc0f69e19ba25"]} iconRight={copy["s8454f8696a70"]}>{copy["sb89a706e380f"]}</Button></div>
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s59be71333c96"]} title={copy["sb2ffec86e000"]} lead={copy["s501975d5c6e7"]}/>
        <div style={{ border: "var(--border-width) solid var(--border-strong)", borderRadius: "var(--radius-card)", background: "var(--surface)", overflow: copy["se564b4081d7a"] }}>
          <div style={{ display: copy["s222f930b8752"], alignItems: copy["sf179a509d32b"], justifyContent: copy["s8c72b36502d3"], gap: "var(--space-4)", flexWrap: copy["sf0a289923ed6"], padding: "var(--space-3) var(--space-5)", borderBottom: "var(--border-width) solid var(--border)", background: "var(--surface-tint)" }}>
            <div style={{ display: copy["s222f930b8752"], alignItems: copy["sf179a509d32b"], gap: "var(--space-3)", minWidth: 0 }}>
              <span style={{ ...label, fontWeight: "var(--font-weight-semibold)" }}>{copy["sb202bcb90ca5"]}</span>
              <span style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", whiteSpace: copy["s010d16d2e921"], overflow: copy["se564b4081d7a"], textOverflow: copy["sb014a0215b71"] }}>{copy["saeada3a6feb0"]}</span>
            </div>
            <button type={copy["sc3e2d78f3ff3"]} role={copy["s78b49fb2cc2d"]} aria-checked={teach} onClick={() => setTeach(!teach)} style={{ display: copy["s123306850fe1"], alignItems: copy["sf179a509d32b"], gap: "var(--space-3)", appearance: copy["s140bedbf9c3f"], background: copy["s140bedbf9c3f"], border: copy["s140bedbf9c3f"], font: copy["s035300f3afee"], fontSize: "var(--text-small)", color: "var(--text-primary)", padding: "var(--space-1) 0", cursor: copy["s1cdf95bd12e9"] }}>
              <span style={{ fontWeight: "var(--font-weight-medium)" }}>{copy["s0cae4b269be9"]}</span>
              <span aria-hidden={copy["sb5bea41b6c62"]} style={{ position: copy["sd2d9e1f13413"], width: copy["sfb391dd7c415"], height: copy["sb81aec4635ad"], borderRadius: "var(--radius-button)", background: teach ? "var(--accent)" : "var(--alpha-ink-15)", transition: copy["s5a25c02ee8e5"] }}>
                <span style={{ position: copy["s747355bdc2a2"], top: copy["s7c1ff616cc65"], left: teach ? copy["scbe1546c8881"] : copy["s7c1ff616cc65"], width: copy["s8c756dc2fd39"], height: copy["s8c756dc2fd39"], borderRadius: "50%", background: "var(--color-white)", transition: copy["s63190443f2f2"] }}/>
              </span>
              <span style={mono}>{teach ? copy["s130011756125"] : copy["sca7981b46ecf"]}</span>
            </button>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["s607109775bb8"], gap: "var(--space-6)", padding: "var(--space-5)", alignItems: copy["scced28c6dc3f"] }}>
            <div style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["s2012ff3e031a"], gap: "var(--space-4)", opacity: teach ? 0.9 : 1, transition: copy["s15da52cebab8"] }}>
              {[copy["s559aead08264"], copy["sdf7e70e50215"], copy["s6b23c0d5f35d"]].map((o, i) => {
            const R = resources || {};
            const pick = (k, f) => R[teach ? k + copy["sa95671b6583a"] : k] || copy["s7145ad9a4576"] + f + copy["se3b0c44298fc"] + (teach ? copy["s1fd0d72b5446"] : "") + copy["sd912c70acf20"];
            const img = [pick(copy["s322b2a663c9f"], copy["sb22629d95fb5"]), pick(copy["sf5dc93aa9a4a"], copy["s0c1336a0a30d"]), pick(copy["sc4dede1bedfb"], copy["s90907f0ac0a1"])][i];
            return (<div key={o} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
                  {img ? (<DrawingFrame label={copy["s1033cf49bf3f"] + o} sheet={copy["s2727ecda3e73"] + (i + 1)} ratio="16 / 9" grid={false} style={{ gridTemplateRows: copy["s2e35bcb46136"], alignContent: copy["s8c72b36502d3"] }}>
                      <ConceptWatermark repeat={0} style={{ position: copy["s747355bdc2a2"], inset: 0 }}>
                        <img src={img} alt={copy["s1033cf49bf3f"] + o + copy["s56aeaecb1f86"]} style={{ display: copy["s496aca80e4d8"], width: "100%", height: "100%", objectFit: copy["s3fa405a8301a"] }}/>
                      </ConceptWatermark>
                    </DrawingFrame>) : (<DrawingFrame label={copy["s1033cf49bf3f"] + o} sheet={copy["s2727ecda3e73"] + (i + 1)} ratio="16 / 9" style={{ gridTemplateRows: copy["s2e35bcb46136"], alignContent: copy["s8c72b36502d3"] }}>
                      <ConceptWatermark repeat={2} style={{ position: copy["s747355bdc2a2"], inset: 0 }}>
                        <PlanStub rooms={2 + i}/>
                      </ConceptWatermark>
                    </DrawingFrame>)}
                  <span style={mono}>{teach ? copy["sd3c44771b42a"] : copy["s5ef7b2539bce"] + o}</span>
                </div>);
        })}
            </div>
            <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", border: "var(--border-width) solid var(--border)", borderRadius: teach ? "var(--radius-drawing)" : "var(--radius-card)", padding: "var(--space-4) var(--space-5)" }}>
              <div style={{ display: copy["s222f930b8752"], justifyContent: copy["s8c72b36502d3"], alignItems: copy["s8ba8496a2525"], gap: "var(--space-3)" }}>
                <span style={{ fontWeight: "var(--font-weight-medium)" }}>{teach ? copy["s0197946cc322"] : copy["sd2a17d6bb2a4"]}</span>
                <span style={mono}>{teach ? copy["s1afd81eec52b"] : copy["s0f51fba1b4fe"]}</span>
              </div>
              {teach ? miniPoints.map((p) => {
            const k = tone[p.t];
            return (<div key={p.point} style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["sbc67cf116d2a"], gap: copy["sfd9706450d0a"], paddingBlock: "var(--space-2)", borderTop: "var(--divider-width) solid var(--divider)" }}>
                    <span aria-hidden={copy["sb5bea41b6c62"]} style={{ background: k.fill }}/>
                    <span aria-hidden={copy["sb5bea41b6c62"]} style={{ color: k.ink }}>{k.glyph}</span>
                    <div style={{ display: copy["s0f2a693e93e2"], gap: copy["s687e00933e60"] }}>
                      <span style={{ ...label, color: k.ink, fontWeight: "var(--font-weight-semibold)" }}>{k.word}</span>
                      <span style={{ fontSize: "var(--text-small)" }}>{p.point}</span>
                    </div>
                  </div>);
        }) : [copy["s89a502ab63b5"], copy["s3e146a8249ba"], copy["s3834384ceac8"], copy["s50d883659bce"], copy["sb0133da9f6b2"]].map((a) => (<div key={a} style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["sf7ee306ae371"], gap: "var(--space-3)", paddingBlock: "var(--space-2)", borderTop: "var(--divider-width) solid var(--divider)", fontSize: "var(--text-small)" }}>
                  <span aria-hidden={copy["sb5bea41b6c62"]} style={{ width: copy["s7b8ee66537de"], height: copy["s7b8ee66537de"], marginTop: copy["s64dc26540203"], borderRadius: "var(--radius-drawing)", background: "var(--prov-inferred-fill)" }}/>
                  <span>{a}</span>
                </div>))}
              <div style={{ display: copy["s222f930b8752"], gap: "var(--space-3)", flexWrap: copy["sf0a289923ed6"], paddingTop: "var(--space-2)" }}>
                {teach ? <React.Fragment><Button size={copy["s5af308bec132"]}>{copy["sf1323f09f63c"]}</Button><Button size={copy["s5af308bec132"]} variant={copy["sead6ef03d61e"]}>{copy["s0a5d86a8572b"]}</Button></React.Fragment> : <Button size={copy["s5af308bec132"]} variant={copy["sc0f69e19ba25"]}>{copy["sbf78c2ce1a1f"]}</Button>}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <SectionHead eyebrow={copy["s576efdea9da6"]} title={copy["s6d6791f4442d"]}/>
        <Grid min={copy["s868f8b15fc2d"]}>
          {[
            { t: copy["sf558cead8bc1"], d: copy["s6748f7910b6c"] },
            { t: copy["s3bf29f006afc"], d: copy["sc0675d9c18a0"] },
            { t: copy["saf9b410c37bf"], d: copy["sbcc0e6a54013"] },
        ].map((h) => (<Card key={h.t} tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{h.t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{h.d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <Split ratio={copy["s4a95b5c1ae73"]}>
          <WhatWeDontDo items={[
            copy["sd55a70477996"],
            copy["s122840f1df62"],
            copy["sa1bfc7c6b86e"],
            copy["sa96ab5d8f7cf"],
        ]} footnote={copy["s98025a1a5b10"]}/>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sc49346c55c9c"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["sae95f2e93764"]}</p>
            <div style={{ display: copy["s222f930b8752"], gap: "var(--space-3)", flexWrap: copy["sf0a289923ed6"] }}>
              <Button>{copy["sa7a165e1d89a"]}</Button>
              <Button variant={copy["sc0f69e19ba25"]}>{copy["sb89a706e380f"]}</Button>
            </div>
          </div>
        </Split>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["sdfe95783edfe"]} title={copy["s758e78e0e84a"]} align={copy["sf179a509d32b"]} max="var(--container-md)"/>
        <PricingTable tiers={PRICING_TIERS.slice(0, 2)}/>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s9a72221a2747"]} title={copy["s54e684a9f0e3"]} max="var(--container-md)"/>
        <Accordion defaultOpen={0} items={[
            { question: copy["sf36740428386"], answer: copy["s8ebaaba6a8f8"] },
            { question: copy["s5b4131c5fcd7"], answer: copy["s84b4538a1dbe"] },
            { question: copy["sccf7d2e59fce"], answer: copy["s2fb1f6d5feb9"] },
            { question: copy["s08ec8fc5ef13"], answer: copy["sdd947716d80c"] },
        ]}/>
      </Section>

      <CTA title={copy["s158446384fc7"]} lead={copy["sed2b2ff65f47"]} primary={copy["sf9bd4c6db19e"]} secondary={copy["s759473a75a4f"]}/>
    </main>);
}
function ForProfessionals() {
    const { InterpretationCard, StandardsReport, VerificationStamp, ProvenanceChip, DrawingFrame, Card, Badge, Button, Accordion, PricingTable } = DL;
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s45608ef40f51"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["sd5b03352c29c"]}</p>
          <div style={{ display: copy["s222f930b8752"], gap: "var(--space-4)", flexWrap: copy["sf0a289923ed6"] }}>
            <Button>{copy["sf4f5cdceaa23"]}</Button>
            <Button variant={copy["sc0f69e19ba25"]}>{copy["sf149d8534427"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s5bdf392a9072"]} title={copy["s051b16f32f5d"]} lead={copy["sd2d267564573"]}/>
        <Split ratio={copy["sc4963c2af797"]}>
          <InterpretationCard rows={[
            { object: copy["sae48c77a481c"], value: copy["s709b2ad9ba88"], source: copy["s04f8996da763"] },
            { object: copy["sc8a2a0d650e5"], value: copy["sbb3137166d9c"], source: copy["s04f8996da763"] },
            { object: copy["s9f3ec63f735a"], value: copy["s72addd173c21"], source: copy["s204ed55e1af9"] },
            { object: copy["s1336a7241842"], value: copy["s8cec2734ddd4"], source: copy["s52367a6622b1"] },
            { object: copy["s582ab56f44a7"], value: copy["s21ec55719bac"], source: copy["s244210e48437"] },
            { object: copy["sb7ff4f320642"], value: copy["s9b8e3ad3b70b"], source: copy["s8f06d6b0c72d"] },
        ]} missing={[copy["sb9f6ab8c0cf3"], copy["s4b2fe1dbadb0"], copy["sffa385d75909"]]} onConfirm={() => { }} onEdit={() => { }}/>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sae0e9c33985d"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s5d027954b4d3"]}</p>
            <p style={{ color: "var(--text-secondary)" }}>{copy["sc790fbcd3f91"]}</p>
          </div>
        </Split>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["sab4368f2814c"]} title={copy["sf3c632f97dd8"]} lead={copy["sba7be8ce6961"]}/>
        <Split ratio={copy["s4a95b5c1ae73"]}>
          <DrawingFrame label={copy["s7ae0b6d2b129"]} sheet={copy["s8c5bb74602e0"]} scale="5" revision={copy["sdf7e70e50215"]} hash={copy["sf2d1d626f90b"]} ratio="16 / 9" grid={false}>
            <img src={(resources && resources.parapetDetail) || "../../assets/hero/sm/parapet-detail.jpg"} alt={copy["s4838c24d06bf"]} style={{ display: copy["s496aca80e4d8"], width: "100%", height: "100%", objectFit: copy["s3fa405a8301a"] }}/>
          </DrawingFrame>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["sf179a509d32b"] }}>
            {[
            [copy["s52367a6622b1"], copy["s6fe9fe19eb03"], copy["s27875afa1950"]],
            [copy["s04f8996da763"], copy["s31959278c738"], copy["s786f24c9eb73"]],
            [copy["s204ed55e1af9"], copy["seda17c3d211f"], copy["s16c024029c1f"]],
            [copy["sa12dd3a7fd32"], copy["s3502bd23760b"], copy["s413a56649049"]],
            [copy["s8f06d6b0c72d"], copy["s8226ef2384c6"], copy["sb5494cb2993b"]],
            [copy["s244210e48437"], copy["s8907eed992af"], copy["s729d70a92d0b"]],
        ].map(([src, t, d]) => (<div key={t} style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["s592332fa0d4c"], gap: "var(--space-4)", alignItems: copy["s8ba8496a2525"], paddingBottom: "var(--space-3)", borderBottom: "var(--divider-width) solid var(--divider)" }}>
                <ProvenanceChip source={src} label={t}/>
                <span style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</span>
              </div>))}
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sde07d0720955"]} title={copy["s05f714efda42"]} lead={copy["sfbd6f8168f1d"]}/>
        <Split ratio={copy["s4a95b5c1ae73"]} style={{ alignItems: copy["scced28c6dc3f"] }}>
          <StandardsReport profile={copy["s0ec469a0db44"]} version={copy["sec0b123ce6db"]} rows={[
            { state: copy["sd74ff0ee8da3"], check: copy["s40e86b514530"], detail: copy["s6a2628589581"], ruleId: copy["s27fb183848c4"], document: copy["s092d26c05b36"] },
            { state: copy["sd74ff0ee8da3"], check: copy["sb1995777b7e9"], ruleId: copy["s3f5251edb882"], document: copy["s97a74d3ec3ff"] },
            { state: copy["sd74ff0ee8da3"], check: copy["sed4075709b60"], ruleId: copy["s8c57897d2621"], document: copy["s82f4238422b8"] },
            { state: copy["s807d0fbcae7c"], check: copy["sf5e7d0adf376"], detail: copy["s5043b1d83200"], ruleId: copy["sbd5f405a357b"], document: copy["s4c19c8795d2d"] },
            { state: copy["s807d0fbcae7c"], check: copy["sb7ff4f320642"], detail: copy["s5580f88a35b5"], ruleId: copy["s15dc6dfb7324"], document: copy["s28a1818c1999"] },
            { state: copy["s140bedbf9c3f"], check: copy["sf3c19e5be975"], ruleId: "—", document: copy["sc4a9385d71ae"] },
        ]} notPerformed={[
            copy["s963a9cf1196f"],
            copy["s8894214fe775"],
            copy["seaf31a88b9ac"],
            copy["sd492110a9ecf"],
        ]}/>
          <VerificationStamp profiles={[copy["s22cd53a68b2e"], copy["sc6884dcfd545"]]} checksPerformed={41} checksFlagged={3} checksNotPerformed={[copy["sf3c19e5be975"], copy["s9bc014aa2a5c"], copy["sa90027b005dc"], copy["sd492110a9ecf"]]} unverifiedElements={2} signer={copy["s31bb52e45612"]} drawingHash={copy["sf2d1d626f90b"]} revision={copy["s6b23c0d5f35d"]} timestamp={copy["s83ee2882eb7c"]}/>
        </Split>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <SectionHead eyebrow={copy["sb7f11ae54a13"]} title={copy["s79c48e92fa2a"]}/>
        <Grid min={copy["sec6f0ef65f7b"]} gap="var(--space-5)">
          {[
            [copy["s9f01769a4278"], [copy["s0b434e8a82d0"], copy["s1d393b0081b6"], copy["s3edb66ea075e"]]],
            [copy["sb62f3c6b3c9c"], [copy["s88de6fe8baa5"], copy["s3faf7d7f7466"], copy["s4650e2718c99"]]],
            [copy["s33e98de6c428"], [copy["s5a1c0e713dc4"], copy["sf238e4c63d57"], copy["s300ad5e5d32e"]]],
            [copy["s10851b812123"], [copy["s14c880b71a28"], copy["s7277afba5718"], copy["s8f4bae2c4b3c"]]],
        ].map(([t, items]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <ul style={{ listStyle: copy["s140bedbf9c3f"], margin: 0, padding: 0, display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
                {items.map((i) => <li key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-secondary)" }}>{i}</li>)}
              </ul>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sdfe95783edfe"]} title={copy["sc46028723fd0"]} max="var(--container-md)"/>
        <PricingTable tiers={PRICING_TIERS.slice(2, 5)}/>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["sc91217be093a"]} title={copy["sde4ddb8f715b"]} max="var(--container-md)"/>
        <Accordion defaultOpen={0} items={[
            { question: copy["s61e0438d1d73"], answer: copy["sdab9d94cdfe8"] },
            { question: copy["s0e0c9eb4bc9f"], answer: copy["sf7d70f6ac52d"] },
            { question: copy["sc6ad7bc10f2d"], answer: copy["s12c6a74e24ca"] },
            { question: copy["s583645fe5388"], answer: copy["s7997c62136a0"] },
        ]}/>
      </Section>

      <CTA title={copy["s988147000d15"]} lead={copy["s7b7405e916e4"]} primary={copy["sf4f5cdceaa23"]} secondary={copy["sf149d8534427"]}/>
    </main>);
}
function RenderStudio() {
    const { DrawingFrame, Card, Badge, Button, Tabs, PricingTable, ConceptWatermark } = DL;
    const mono = { fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" };
    const clipRef = React.useRef(null);
    const [clip, setClip] = React.useState({ playing: false, t: 0, d: 10 });
    const fmt = (s) => "0" + Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
    const HASH = copy["sf2d1d626f90b"];
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s213b9596d2d6"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s9b7644103149"]}</p>
          <div style={{ display: copy["s222f930b8752"], gap: "var(--space-4)", flexWrap: copy["sf0a289923ed6"] }}>
            <Button>{copy["sd851b2b0b7f8"]}</Button>
            <Button variant={copy["sc0f69e19ba25"]}>{copy["sf9bd4c6db19e"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s06bdb296e99a"]} title={copy["s22c8f23fdb91"]} lead={copy["s945a4470c155"]}/>
        <Split ratio={copy["s4a95b5c1ae73"]} gap="var(--space-6)">
          <DrawingFrame label={copy["sdcd9862f28e4"]} sheet={copy["s37570cb902f7"]} scale="50" revision={copy["s6b23c0d5f35d"]} hash={HASH} ratio="16 / 9" grid={false}>
            <img src={(resources && resources.rearElevation) || "../../assets/hero/sm/rear-elevation.jpg"} alt={copy["sf20e9fd72de1"]} style={{ display: copy["s496aca80e4d8"], width: "100%", height: "100%", objectFit: copy["s3fa405a8301a"] }}/>
          </DrawingFrame>
          <DrawingFrame label={copy["s6d89eb7d0938"]} sheet={copy["sf37d0aa4c3fd"]} revision={copy["s6b23c0d5f35d"]} hash={HASH} ratio="16 / 9" grid={false}>
            <img src={(resources && resources.rearRender) || "../../assets/hero/sm/rear-render.jpg"} alt={copy["s5a17b3793817"]} style={{ display: copy["s496aca80e4d8"], width: "100%", height: "100%", objectFit: copy["s3fa405a8301a"] }}/>
          </DrawingFrame>
        </Split>
        <p style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-secondary)" }}>{copy["s5080a0ed8904"]}</p>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sbc52af22d164"]} title={copy["s0fdfade9dc09"]} lead={copy["sbd65b2f81fb1"]}/>
        <Split ratio={copy["s68cb5ce1f75c"]} style={{ alignItems: copy["scced28c6dc3f"] }}>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)" }}>
            <div style={{ border: "var(--border-width) solid var(--border-strong)", borderRadius: "var(--radius-drawing)", background: "var(--surface-sunken)" }}>
              <div style={{ position: copy["sd2d9e1f13413"], aspectRatio: "16 / 9", display: copy["s0f2a693e93e2"], placeItems: copy["sf179a509d32b"], background: "var(--surface-sunken)", overflow: copy["se564b4081d7a"] }}>
                <video ref={clipRef} src={(resources && resources.cameraMove) || "../../assets/hero/sm/camera-move.mp4"} playsInline loop muted onTimeUpdate={(e) => setClip((c) => ({ ...c, t: e.target.currentTime, d: e.target.duration || c.d }))} onPlay={() => setClip((c) => ({ ...c, playing: true }))} onPause={() => setClip((c) => ({ ...c, playing: false }))} style={{ position: copy["s747355bdc2a2"], inset: 0, width: "100%", height: "100%", objectFit: copy["s3fa405a8301a"], display: copy["s496aca80e4d8"] }}/>
                <button type={copy["sc3e2d78f3ff3"]} aria-label={clip.playing ? copy["s24244a98c715"] : copy["scd79b232b408"]} onClick={() => { const v = clipRef.current; if (!v)
        return; v.paused ? v.play() : v.pause(); }} style={{ position: copy["sd2d9e1f13413"], zIndex: 1, width: "var(--hit-min)", height: "var(--hit-min)", borderRadius: "50%", border: "var(--border-width) solid var(--border-strong)", background: "var(--surface)", display: copy["s0f2a693e93e2"], placeItems: copy["sf179a509d32b"], cursor: copy["s1cdf95bd12e9"], padding: 0, opacity: clip.playing ? 0 : 1, transition: copy["s15da52cebab8"] }}>
                  <span className={copy["s94d05ba1838b"]} aria-hidden={copy["sb5bea41b6c62"]} style={{ fontSize: copy["sb81aec4635ad"], color: "var(--text-primary)" }}>{clip.playing ? copy["s6210c0bf0539"] : copy["s06e77f455f3f"]}</span>
                </button>
                <span style={{ position: copy["s747355bdc2a2"], top: "var(--space-3)", left: "var(--space-3)", ...mono, color: "var(--text-primary)", background: copy["sea1e459fee10"], borderRadius: copy["s356601538da0"], padding: copy["s8bc217908cbb"] }}>{fmt(clip.t)}{copy["s005e1574a2b5"]}{fmt(clip.d)}</span>
                <span style={{ position: copy["s747355bdc2a2"], right: "var(--space-3)", bottom: "var(--space-3)", ...mono, color: "var(--text-primary)", background: copy["sea1e459fee10"], borderRadius: copy["s356601538da0"], padding: copy["s8bc217908cbb"] }}>{copy["s09f8a335f50e"]}</span>
              </div>
            </div>
            <div style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["s937ff37cb38c"], gap: "var(--space-3)", alignItems: copy["s8ba8496a2525"], padding: "var(--space-3) var(--space-4)", border: "var(--border-width) solid var(--border)", borderRadius: "var(--radius-drawing)", background: "var(--surface)", fontSize: "var(--text-small)" }}>
              <span aria-hidden={copy["sb5bea41b6c62"]} style={{ color: "var(--flag-ink)" }}>{copy["s0bae1fe0557d"]}</span>
              <span><b style={{ fontWeight: "var(--font-weight-semibold)" }}>{copy["s2bbd445e420d"]}</b> <span>{copy["s2d7edd9a4423"]}</span> <span style={{ color: "var(--text-secondary)" }}>{copy["s24f857bed8d8"]}</span></span>
            </div>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["scced28c6dc3f"] }}>
            <dl style={{ margin: 0, display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["s3588d05f671b"], gap: "var(--space-3) var(--space-5)", fontSize: "var(--text-small)" }}>
              {[
            [copy["sdcd9862f28e4"], copy["s085cb826dc22"]],
            [copy["sa91069147f9b"], copy["see9653a59ef4"]],
            [copy["s2e516d68f42f"], copy["s13dead62117e"]],
            [copy["s6ecc3df6bffd"], copy["s981ca68436e7"]],
            [copy["s2fb4019a35e4"], copy["s9ae68f8365e5"]],
            [copy["s204a5eb2cd28"], copy["sc1c876d398ed"]],
        ].map(([k, v]) => (<React.Fragment key={k}>
                  <dt style={{ color: "var(--text-secondary)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)" }}>{k}</dt>
                  <dd style={{ margin: 0, fontFamily: "var(--font-mono)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)", overflowWrap: copy["sdc0fff9075b9"] }}>{v}</dd>
                </React.Fragment>))}
            </dl>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", textWrap: copy["s77049f6f8893"] }}>{copy["sd34d6bc95ffc"]}</p>
            <div><Button variant={copy["sc0f69e19ba25"]} iconRight={copy["s8454f8696a70"]}>{copy["s5389a0c7a57e"]}</Button></div>
          </div>
        </Split>
        <p style={{ marginTop: "var(--space-8)", ...mono, color: "var(--text-secondary)" }}>{copy["s8e9322d24eb4"]}</p>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s099dee5908d6"]} title={copy["s86b794d67ad4"]}/>
        <Grid min={copy["s868f8b15fc2d"]}>
          {[
            [copy["s5495ae491cd2"], copy["s7d6d721157dd"]],
            [copy["s6787e010275f"], copy["see224b2a6e44"]],
            [copy["sb9737861afc9"], copy["s49c5d97340c6"]],
        ].map(([t, d]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sed3677805a52"]} title={copy["s9c524d81092f"]} lead={copy["sf0c66b4da507"]}/>
        <Grid min={copy["s2f2f4a6cfd9f"]} gap="var(--space-4)">
          {[copy["s89b50690b84d"], copy["sbe0e7c9c886b"], copy["sd29389049445"], copy["s8310c6a72da7"]].map((m, i) => {
            const R = resources || {};
            const img = [1, 2, 3, 4].map((v) => R[copy["scb7bf562420b"] + v] || copy["sa23f394c05ba"] + v + copy["sd912c70acf20"])[i];
            return (<DrawingFrame key={m} label={m} grid={false} ratio="1 / 1" style={{ gridTemplateRows: copy["s2e35bcb46136"], alignContent: copy["s8c72b36502d3"], background: "var(--surface-sunken)" }}>
              {img ? <img src={img} alt={m + copy["s8be70a632ea2"]} style={{ display: copy["s496aca80e4d8"], width: "100%", height: "100%", objectFit: copy["s3fa405a8301a"], objectPosition: "50% 60%" }}/>
                    : <div style={{ position: copy["s747355bdc2a2"], inset: 0, display: copy["s0f2a693e93e2"], placeItems: copy["sf179a509d32b"], color: "var(--text-muted)", fontSize: "var(--text-tiny)" }}>{copy["s4c3201c9b884"]}{i + 1}</div>}
            </DrawingFrame>);
        })}
        </Grid>
        <p style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-secondary)" }}>{copy["s6eb52cc9809f"]}{HASH}{copy["s873f7104ec21"]}</p>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <SectionHead eyebrow={copy["s1c4b8ff60530"]} title={copy["s5edcec788cde"]} max="var(--container-md)"/>
        <Card tone={copy["s763cdc62a869"]} square padding="var(--space-5)" style={{ maxWidth: "var(--container-lg)", fontFamily: "var(--font-mono)", fontSize: "var(--text-small)", display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
          <span>{copy["s3ae18d7be287"]}{HASH}</span>
          <span>{copy["s3fb084c92b0b"]}</span>
          <span>{copy["s89baf5430a17"]}</span>
          <span>{copy["s9672aa691a2f"]}</span>
          <span>{copy["sf2c0de542936"]}</span>
        </Card>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s2a6b24ad2872"]} title={copy["s004d9eecb174"]} max="var(--container-md)"/>
        <PricingTable currencies={[copy["s402419e92096"], copy["sa26cdf3a6e70"], copy["sa74aa40897d1"]]} tiers={[
            { name: copy["sde229c48e7d3"], group: copy["sa75e56e517cd"], audience: copy["s60a03ad98402"], price: { GBP: copy["sb732bc23f061"], USD: copy["s5ea1dbe9caca"], NGN: copy["s62534a9ed154"] } },
            { name: copy["sc28b265796ed"], group: copy["sa75e56e517cd"], audience: copy["s83c0069f46a5"], price: { GBP: copy["s4fdbfb1a1d7a"], USD: copy["sbcb852ad6b86"], NGN: copy["sed0ab047ec7d"] } },
            { name: copy["s47e288e63dbf"], group: copy["sa75e56e517cd"], audience: copy["s347ddcb06d78"], price: { GBP: copy["s02cb2a15e9b1"], USD: copy["sb5fee2a141be"], NGN: copy["sed15e4959464"] } },
        ]}/>
      </Section>

      <CTA title={copy["s64ebb143c419"]} lead={copy["sc108ce07669e"]} primary={copy["sd851b2b0b7f8"]} secondary={copy["sf9bd4c6db19e"]}/>
    </main>);
}
function Marketplace() {
    const { ProfileCard, Card, Badge, Button, Tabs, Input, Select } = DL;
    const [kind, setKind] = React.useState(copy["s5ef5ef0364b6"]);
    const profiles = [
        { name: copy["s6812809fc6c1"], kind: copy["sbcd3a888401f"], tier: copy["sc97454a01ccf"], signer: copy["scabee8450e4b"], credential: copy["sc76d57be8ea2"], price: copy["se26a38a785bd"], adoption: 214, documents: [copy["s5a088eb9da86"], copy["s5f5d69fcb1a8"]] },
        { name: copy["s13b1a22d1866"], kind: copy["sbcd3a888401f"], tier: copy["sc97454a01ccf"], signer: copy["s4d262854755d"], credential: copy["s009ad3c65ca5"], price: copy["s2b4c57f38d05"], adoption: 1842, documents: [copy["s6b6cbc5e6544"], copy["s0b31cb1d8cb4"], copy["s39f07bbda274"], copy["scb81a6ccc724"]] },
        { name: copy["sa81a95b98ce6"], kind: copy["sbcd3a888401f"], tier: copy["saa91161f1c7b"], signer: copy["sfa8a56bbe5db"], price: copy["s8ca9d742288f"], adoption: 96, documents: [copy["sf2a2d3548b11"], copy["s1c04b3ded1c3"]] },
        { name: copy["s135561a16ff6"], kind: copy["s5cc3f82838ba"], tier: copy["sc97454a01ccf"], signer: copy["s4922a1fbe28b"], credential: copy["sb0099db5a2bc"], price: copy["sc63eb6720c6e"], adoption: 26, documents: [copy["s1a00adca926f"], copy["s4cb21657fa86"]] },
        { name: copy["s42d703942852"], kind: copy["s10002859ace9"], tier: copy["saa91161f1c7b"], signer: copy["sfa8a56bbe5db"], price: copy["sf411a1fb6275"], adoption: 57, documents: [copy["s3557ee2586e0"]] },
        { name: copy["sfb1255968b05"], kind: copy["sbcd3a888401f"], tier: copy["s0228c6d48ecf"], price: copy["sf411a1fb6275"], adoption: 4210, documents: [copy["s6d05d901b234"]] },
    ];
    const shown = kind === copy["s5ef5ef0364b6"] ? profiles : profiles.filter((p) => p.kind === kind);
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s2045b566b9cc"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["sa9db3f90b54f"]}</p>
          <div style={{ display: copy["s222f930b8752"], gap: "var(--space-4)", flexWrap: copy["sf0a289923ed6"] }}>
            <Button>{copy["sd1829c7b765d"]}</Button>
            <Button variant={copy["sc0f69e19ba25"]}>{copy["s4a0d8207f0d5"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-4)", alignItems: copy["sf179a509d32b"], justifyContent: copy["s8c72b36502d3"], marginBottom: "var(--space-8)" }}>
          <Tabs variant={copy["se3127a4ce13e"]} value={kind} onChange={setKind} tabs={[
            { value: copy["s5ef5ef0364b6"], label: copy["sa52ace420f21"] },
            { value: copy["sbcd3a888401f"], label: copy["s1db075e5f263"] },
            { value: copy["s5cc3f82838ba"], label: copy["s11e36f72a8b0"] },
            { value: copy["s10002859ace9"], label: copy["s70f1745116da"] },
        ]}/>
          <div style={{ width: copy["s02a620d860c0"] }}><Input placeholder={copy["sf37deb7771e6"]} aria-label={copy["sf37deb7771e6"]}/></div>
        </div>
        <Grid min={copy["s67965826db0c"]}>{shown.map((p) => <ProfileCard key={p.name} {...p}/>)}</Grid>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s298344ad2bfb"]} title={copy["sf29e9f5939f3"]}/>
        <Grid min={copy["s868f8b15fc2d"]}>
          {[
            [copy["sc97454a01ccf"], copy["s4f7838402f37"], copy["s419a0df0d519"]],
            [copy["saa91161f1c7b"], copy["s1cfcce6fec81"], copy["s876c8358da05"]],
            [copy["s0228c6d48ecf"], copy["sbb52fa6f198d"], copy["s4a24c8386326"]],
        ].map(([t, sub, d]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
              <Badge square tone={t === copy["sc97454a01ccf"] ? copy["sa3a7f053ae2e"] : t === copy["saa91161f1c7b"] ? copy["s807d0fbcae7c"] : copy["s7e2372f4115c"]}>{t}{copy["s588da4105320"]}{sub}</Badge>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s3a7d66dda35e"]} title={copy["s2f9d0c28db96"]}/>
        <Grid min={copy["s0eb654d1fe7d"]} gap="var(--space-5)">
          {[
            ["01", copy["sdfc36fdc9e8e"], copy["s05150785022c"]],
            ["02", copy["s397d1e1b3983"], copy["s22eac516ed7e"]],
            ["03", copy["s51b05c8caf7f"], copy["s3e58002df97f"]],
            ["04", copy["s859390eb495b"], copy["s9c9b616941ae"]],
        ].map(([n, t, d]) => (<Card key={n} tone={copy["s763cdc62a869"]} padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)", alignContent: copy["scced28c6dc3f"] }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{n}</span>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <SectionHead eyebrow={copy["s7fc74da739fb"]} title={copy["s3dfcfa7ef536"]} lead={copy["s95b0a048b978"]}/>
        <Card tone={copy["s763cdc62a869"]} square padding="var(--space-5)" style={{ maxWidth: "var(--container-lg)", display: copy["s0f2a693e93e2"], gap: "var(--space-3)" }}>
          {[[copy["s985959785319"], copy["s17205ec0c98c"]], [copy["s0c77fe09ab33"], copy["sb8f470a79d0b"]], [copy["s9e380d9991e6"], copy["s28a1818c1999"]], [copy["s1af384c577f2"], copy["s9177e317f3d8"]]].map(([t, d], i) => (<div key={t} style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["sec5968beac1e"], gap: "var(--space-4)", alignItems: copy["s8ba8496a2525"], paddingLeft: copy["sf29521a3cd93"] + i + copy["sba5ec51d07a4"] }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{i + 1}</span>
              <span style={{ fontSize: "var(--text-medium)", fontWeight: "var(--font-weight-medium)" }}>{t}</span>
              <span style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</span>
            </div>))}
          <p style={{ marginTop: "var(--space-3)", paddingTop: "var(--space-3)", borderTop: "var(--divider-width) solid var(--divider)", fontSize: "var(--text-small)", color: "var(--flag-ink)", display: copy["s222f930b8752"], gap: "var(--space-2)" }}>
            <span aria-hidden={copy["sb5bea41b6c62"]}>{copy["s0bae1fe0557d"]}</span>{copy["s0e541d6316a0"]}</p>
        </Card>
      </Section>

      <CTA title={copy["s4f74935b625a"]} lead={copy["s10d6ad3d0bb3"]} primary={copy["s4a0d8207f0d5"]} secondary={copy["sd1829c7b765d"]}/>
    </main>);
}
function FindASigner() {
    const { SignerCard, WhatWeDontDo, Checkbox, Card, Badge, Button, Accordion } = DL;
    const gate = [
        { label: copy["sb3c03e7468bd"], done: true, note: copy["sfc5501f6c3f7"] },
        { label: copy["sdb9f500ce55d"], done: true, note: copy["s6f0a4caffb6b"] },
        { label: copy["sda2d3cc02202"], done: false, note: copy["s6fe2401feea3"] },
        { label: copy["sd127008c1a43"], done: false, note: copy["se4f80bad55b1"] },
    ];
    const ready = gate.every((g) => g.done);
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s7e1e46f29d62"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s1c9b2886d63f"]}</p>
          <div style={{ display: copy["s222f930b8752"], gap: "var(--space-4)", flexWrap: copy["sf0a289923ed6"] }}>
            <Button>{copy["sac4608db685e"]}</Button>
            <Button variant={copy["sc0f69e19ba25"]}>{copy["s78184fa6a86e"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s9c870aa6e5e9"]} title={copy["s40e0bca100aa"]}/>
        <Grid min={copy["s868f8b15fc2d"]}>
          {[
            ["01", copy["s6cee48ca9083"], copy["sf9a9ca04f354"]],
            ["02", copy["s30525c5c37bc"], copy["s0cc90ff01eb4"]],
            ["03", copy["sddfb85a1d50d"], copy["s244bc1ae8849"]],
        ].map(([n, t, d]) => (<Card key={n} tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)", alignContent: copy["scced28c6dc3f"] }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{n}</span>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s30d5b2be3e5b"]} title={copy["s82c15fca58f2"]}/>
        <Grid min={copy["s33fb3b63d2d0"]}>
          <SignerCard name={copy["se32c1859cdac"]} credential={copy["s48a476a2afb6"]} registry={copy["s009ad3c65ca5"]} jurisdictions={[copy["sa268f58248ae"]]} disciplines={[copy["scd74053c5481"], copy["s25b5c8ed560b"]]} level={copy["s4b39d54547b4"]} reviewEvidence={copy["sbefbe178ab3f"]}/>
          <SignerCard name={copy["s557f845b9020"]} credential={copy["s4c112a3d88c7"]} registry={copy["sc76d57be8ea2"]} jurisdictions={[copy["sff8969dfbed7"], copy["s3db0493a2626"]]} disciplines={[copy["scd74053c5481"]]} level={copy["s4b39d54547b4"]} reviewEvidence={copy["s466c41a39200"]}/>
          <SignerCard name={copy["se4464519cfbd"]} credential={copy["s43d719be14ef"]} registry={copy["s0d198560c2c3"]} jurisdictions={[copy["scad0535decc3"]]} disciplines={[copy["safd0e7d014ac"], copy["sf9af38e65648"]]} level={copy["s4f7838402f37"]} reviewEvidence={copy["sd916713463b2"]}/>
        </Grid>
        <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-6)", marginTop: "var(--space-8)" }}>
          {[[copy["s4f7838402f37"], copy["s6e7bb2f0a84d"]],
            [copy["s4b39d54547b4"], copy["sc7d27fb18155"]]].map(([t, d]) => (<div key={t} style={{ flex: copy["s1147eb4eb4e3"], display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
              <Badge square tone={t === copy["s4f7838402f37"] ? copy["sa3a7f053ae2e"] : copy["s7e2372f4115c"]}>{t}</Badge>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
            </div>))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s8d98a6ce48d5"]} title={copy["s5c53ac3fa45f"]} lead={copy["scedd8d178e62"]}/>
        <Split ratio={copy["s4a95b5c1ae73"]}>
          <Card tone={copy["s763cdc62a869"]} square padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)" }}>
            {gate.map((g) => (<div key={g.label} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-1)" }}>
                <Checkbox checked={g.done} label={g.label} description={g.note}/>
              </div>))}
            <div style={{ paddingTop: "var(--space-4)", borderTop: "var(--divider-width) solid var(--divider)" }}>
              <Button disabled={!ready} iconLeft={copy["s50f7becde477"]}>{ready ? copy["sa98f14e6b77f"] : copy["sf034ce1a69ef"]}</Button>
              <p style={{ marginTop: "var(--space-3)", fontSize: "var(--text-small)", color: "var(--flag-ink)", display: copy["s222f930b8752"], gap: "var(--space-2)" }}>
                <span aria-hidden={copy["sb5bea41b6c62"]}>{copy["s0bae1fe0557d"]}</span>{copy["s8c072b46f62e"]}</p>
            </div>
          </Card>
          <Card tone={copy["s763cdc62a869"]} square padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--text-small)" }}>
            <span style={{ letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--text-muted)", fontSize: "var(--text-tiny)" }}>{copy["s268fd7afc6f3"]}</span>
            {[
            copy["s8b2c32a96d94"],
            copy["s08a2dda07cb6"],
            copy["sc377ec227588"],
            copy["s459f3319dfe0"],
            copy["sac8daef2ae82"],
            copy["s8e0b9e6be614"],
            copy["sbd7b489f6938"],
        ].map((l) => <span key={l} style={{ color: "var(--text-secondary)" }}>{l}</span>)}
            <span style={{ paddingTop: "var(--space-2)", borderTop: "var(--divider-width) solid var(--divider)", color: "var(--text-primary)" }}>{copy["s7b2fd902a8e7"]}</span>
          </Card>
        </Split>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <Split ratio={copy["s4a95b5c1ae73"]}>
          <WhatWeDontDo title={copy["sd3d6d17504c3"]} items={[
            copy["s2de40d9a6e0c"],
            copy["scbe19193760e"],
            copy["sbd9289faf72f"],
        ]} footnote={copy["s26b662bccc1c"]}/>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["s78184fa6a86e"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s7b2ab4bea9aa"]}</p>
            <div><Button variant={copy["sc0f69e19ba25"]} iconRight={copy["s8454f8696a70"]}>{copy["s26a4dba068d8"]}</Button></div>
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s9a72221a2747"]} title={copy["s5b0c56b0e308"]} max="var(--container-md)"/>
        <Accordion defaultOpen={0} items={[
            { question: copy["s5d9532c79bfe"], answer: copy["s15d1918fa93f"] },
            { question: copy["s3435da279226"], answer: copy["s81b23e310eee"] },
            { question: copy["s65465018dafa"], answer: copy["s5d2336838a17"] },
        ]}/>
      </Section>

      <CTA title={copy["s0aea7b418e2c"]} lead={copy["s026cf7a7eef7"]} primary={copy["sac4608db685e"]} secondary={copy["s78184fa6a86e"]}/>
    </main>);
}
function Developers() {
    const { Card, Badge, Button, Tabs } = DL;
    const P = {
        user: "var(--color-green-light)", project: "var(--color-blue-light)",
        reference: "var(--color-violet-light)", inferred: "var(--color-amber-light)",
        verify: "var(--color-red-light)", autofix: "var(--color-teal-light)",
        dim: "var(--alpha-white-60)",
    };
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <Split ratio={copy["s4a95b5c1ae73"]}>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)" }}>
            <h1>{copy["sb4822f5cff06"]}</h1>
            <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)" }}>{copy["s618db15d60d2"]}</p>
            <div style={{ display: copy["s222f930b8752"], gap: "var(--space-4)", flexWrap: copy["sf0a289923ed6"] }}>
              <Button>{copy["s97ca08c36526"]}</Button>
              <Button variant={copy["sc0f69e19ba25"]} iconRight={copy["s8454f8696a70"]}>{copy["s559b1cc46027"]}</Button>
            </div>
          </div>
          <CodeBlock lines={[
            { text: copy["s725329225807"], tone: "var(--color-white)" },
            { text: copy["s922283b2a114"], tone: P.dim },
            { text: "" },
            { text: "{" },
            { text: copy["sf86b0bc398de"], tone: P.user },
            { text: copy["s031ca9e14981"], tone: P.project },
            { text: copy["sc068c3001ac4"], tone: P.user },
            { text: copy["s9e99ce85892d"] },
            { text: "}" },
            { text: "" },
            { text: copy["s5dc6cfa8c6f5"], tone: P.autofix },
        ]}/>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sfce7fec2a58c"]} title={copy["s342c1635c08f"]}/>
        <Grid min={copy["se38b03b01af6"]} gap="var(--space-4)">
          {[
            [copy["seba8dcd606bd"], copy["s5334e00f5076"]],
            [copy["s20f65c28671b"], copy["sa4c7cacf335f"]],
            [copy["s887270d0cbc5"], copy["s21dc7c365919"]],
            [copy["sd46aee08cc49"], copy["s5cb58f3d5d97"]],
            [copy["s95f10fb11e75"], copy["s390f7ce4be11"]],
        ].map(([e, d]) => (<Card key={e} tone={copy["s763cdc62a869"]} square padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)", alignContent: copy["scced28c6dc3f"] }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-small)", color: "var(--accent-ink)" }}>{copy["s6104c7180a94"]}{e}</span>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["se57dccf4788f"]} title={copy["s60dd2af8d5c6"]} lead={copy["s3fa90f8b2949"]}/>
        <CodeBlock style={{ maxWidth: "var(--container-xl)" }} lines={[
            { text: copy["s5a5508339ea9"], tone: "var(--color-white)" },
            { text: copy["s3a0f00c59afd"] },
            { text: copy["sa6d442af4af5"] },
            { text: copy["s8c030d50b6f7"] },
            { text: copy["s2435fb4a3325"] },
            { text: copy["sef69f470f133"], tone: P.user },
            { text: copy["s256d4eba234e"], tone: P.inferred },
            { text: copy["sfb5fe474c70a"], tone: P.reference },
            { text: copy["s18007232b588"], tone: P.project },
            { text: copy["sa8bb816b92a1"], tone: P.autofix },
            { text: copy["s97c76c815c1e"], tone: P.verify },
            { text: "  }" },
            { text: copy["saf7feb288d01"] },
            { text: copy["s22aaa71ce304"] },
            { text: copy["s780fa4966eb9"], tone: P.inferred },
            { text: "  ]" },
            { text: "}" },
        ]}/>
        <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-4)", marginTop: "var(--space-5)" }}>
          {[[copy["s04f8996da763"], copy["sb4a10447154a"]], [copy["s244210e48437"], copy["s8335874efbf3"]], [copy["s52367a6622b1"], copy["sd7fef7edcc4a"]], [copy["s204ed55e1af9"], copy["sdfc05249aa63"]], [copy["sa12dd3a7fd32"], copy["s3ac584783596"]], [copy["s8f06d6b0c72d"], copy["sd2cf3dbc2fc9"]]].map(([k, l]) => (<span key={k} style={{ display: copy["s123306850fe1"], alignItems: copy["sf179a509d32b"], gap: "var(--space-2)", fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>
              <span aria-hidden={copy["sb5bea41b6c62"]} style={{ width: copy["sa9f23226d971"], height: copy["sa9f23226d971"], background: copy["s64b72e43649c"] + k + copy["sedd7870360fd"], border: "var(--stroke-fine) solid var(--alpha-ink-30)" }}/>{l}
            </span>))}
        </div>
      </Section>

      <Section>
        <Split ratio={copy["s4a95b5c1ae73"]}>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sd938c8168e3a"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["se6e2c9acdf94"]}</p>
            <div style={{ display: copy["s222f930b8752"], gap: "var(--space-2)", flexWrap: copy["sf0a289923ed6"] }}>
              <Badge square>{copy["scd158ab6274b"]}</Badge>
              <Badge square>{copy["seb6d8a2bb611"]}</Badge>
              <Badge square>{copy["s3ed7cf4d9d1a"]}</Badge>
              <Badge square>{copy["sdd3c35bc2f21"]}</Badge>
            </div>
          </div>
          <CodeBlock lines={[
            { text: copy["s689b5eba47e3"], tone: P.dim },
            { text: copy["s73cd9797ba16"] },
            { text: copy["s44632c2d7ec6"] },
            { text: copy["sb91ba180af40"] },
            { text: copy["s89e25007a585"] },
            { text: "}" },
        ]}/>
        </Split>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <SectionHead eyebrow={copy["s9f0c90e4a0b7"]} title={copy["sd6188cc1473f"]}/>
        <Grid min={copy["sec6f0ef65f7b"]} gap="var(--space-4)">
          {[
            [copy["s8eb3ea9bbde6"], copy["sd2eb1d618d2b"]],
            [copy["s8baf2458a6c7"], copy["s3dc2b916b726"]],
            [copy["s6ed021f7e822"], copy["s8f2129d33bc4"]],
            [copy["scec3a9b89b2e"], copy["s647b5eca0006"]],
        ].map(([t, d]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)", alignContent: copy["scced28c6dc3f"] }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <CTA title={copy["scd75abb5069d"]} lead={copy["s559834309814"]} primary={copy["s97ca08c36526"]} secondary={copy["s559b1cc46027"]}/>
    </main>);
}
function Regulators() {
    const { Card, Badge, Button, Input, Textarea, Select, Label } = DL;
    const [half, setHalf] = React.useState(copy["s4ad92a456892"]);
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s36d062ad430e"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s1898afe3561b"]}</p>
          <DL.Tabs variant={copy["se3127a4ce13e"]} value={half} onChange={setHalf} tabs={[
            { value: copy["s4ad92a456892"], label: copy["s377a2762e494"] },
            { value: copy["s4d2c7ce97165"], label: copy["s1de66d0a4f44"] },
        ]}/>
        </div>
      </Section>

      {half === copy["s4ad92a456892"] ? (<React.Fragment>
          <Section>
            <SectionHead eyebrow={copy["s50239a6d15d3"]} title={copy["s4a6abf37a725"]} lead={copy["sadaa04b7bed9"]}/>
            <Split ratio={copy["s4a95b5c1ae73"]}>
              <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
                {[
                [copy["s4b129b099d45"], copy["s61b642d57ee3"]],
                [copy["sa8a517e55515"], copy["s5394659c921d"]],
                [copy["s7a34a0339c3e"], copy["s6eb7df09edfa"]],
            ].map(([t, d]) => (<div key={t} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-1)" }}>
                    <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                    <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
                  </div>))}
              </div>
              <CodeBlock lines={[
                { text: copy["s7ebc60ed2284"] },
                { text: "{" },
                { text: copy["s6772bde234d2"] },
                { text: copy["s650c0c0ec48a"] },
                { text: "}" },
                { text: "" },
                { text: "→ 200", tone: "var(--color-teal-light)" },
                { text: copy["se0cace93af72"] },
                { text: copy["s07b23ef5dc8e"], tone: "var(--color-amber-light)" },
                { text: copy["s0b78f0e4eda4"] },
                { text: copy["s1e13f4051d4d"], tone: "var(--alpha-white-60)" },
            ]}/>
            </Split>
          </Section>

          <Section scheme={copy["sa457e8f04aa7"]}>
            <SectionHead eyebrow={copy["s9f872ed43d00"]} title={copy["saafcfae475a0"]}/>
            <Grid min={copy["sec6f0ef65f7b"]} gap="var(--space-4)">
              {[
                [copy["s7c27e10ae5f6"], copy["sfcd67834e6e9"]],
                [copy["s5e6901631b0f"], copy["s5c647f973209"]],
                [copy["saca694252cbf"], copy["sae8e186bfcb3"]],
                [copy["s7a77d977a4a4"], copy["sb4369a51732d"]],
            ].map(([t, d]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)", alignContent: copy["scced28c6dc3f"] }}>
                  <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                  <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
                </Card>))}
            </Grid>
            <div style={{ marginTop: "var(--space-8)" }}><Button>{copy["s1d1d94fb5397"]}</Button></div>
          </Section>
        </React.Fragment>) : (<React.Fragment>
          <Section>
            <SectionHead eyebrow={copy["s49dcf49ff9c6"]} title={copy["s47f3a963103d"]} lead={copy["s2558d0f776b3"]}/>
            <Split ratio={copy["s4a95b5c1ae73"]}>
              <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
                {[
                [copy["s3f8ce54490d2"], copy["s664d66dd3f28"]],
                [copy["sf0216f59f8d4"], copy["sf461eb2ee442"]],
                [copy["s76d33a2637bb"], copy["sa7881230651b"]],
            ].map(([t, d]) => (<div key={t} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-1)" }}>
                    <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                    <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
                  </div>))}
              </div>
              <Card tone={copy["s763cdc62a869"]} square padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--text-small)" }}>
                <span style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--text-muted)" }}>{copy["sfc7f1aa2054c"]}</span>
                <span>{copy["se0f75e3c0eda"]}</span>
                <span>{copy["se9848e176bdc"]}</span>
                <span>{copy["sfa67daca36be"]}</span>
                <span>{copy["s7dccc1a2ac03"]}</span>
                <span>{copy["s16ebd4466300"]}</span>
                <span style={{ paddingTop: "var(--space-2)", borderTop: "var(--divider-width) solid var(--divider)", color: "var(--text-secondary)" }}>{copy["sf97eabf3cb72"]}</span>
              </Card>
            </Split>
            <div style={{ marginTop: "var(--space-8)" }}><Button>{copy["s4cda8c08683b"]}</Button></div>
          </Section>
        </React.Fragment>)}

      <Section scheme={copy["saf58e0f88165"]}>
        <SectionHead eyebrow={copy["s4525e76dcdd5"]} title={copy["s0ff2c5e68a1b"]}/>
        <Grid min={copy["sec6f0ef65f7b"]} gap="var(--space-4)">
          {[
            [copy["s58977d8eff45"], copy["se6c1a6df6938"]],
            [copy["s30ad2fe99ebb"], copy["s2fea66bd632c"]],
            [copy["sc1ada08ce138"], copy["sac10d47629e8"]],
            [copy["s9422e40e14f9"], copy["sb04f6e3b5cb3"]],
        ].map(([t, d]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)", alignContent: copy["scced28c6dc3f"] }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s2b5c3d26721a"]} title={copy["saff948922db0"]} max="var(--container-md)"/>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", maxWidth: "var(--container-md)" }}>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
            <Label htmlFor={copy["se87cb45c05ad"]}>{copy["s350be3643ce7"]}</Label>
            <Input id={copy["se87cb45c05ad"]} placeholder={copy["sbced82524241"]}/>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
            <Label htmlFor={copy["s4275d71e90f7"]}>{copy["s3e9f70ec0d1c"]}</Label>
            <Select id={copy["s4275d71e90f7"]} options={[copy["sdcf3eae94122"], copy["s1af384c577f2"], copy["s56f21664f4c7"], copy["sf97e9da0e3b8"]]}/>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
            <Label htmlFor={copy["se46b320165ee"]} hint={copy["s16420ec9e204"]}>{copy["sa84cd0263122"]}</Label>
            <Textarea id={copy["se46b320165ee"]} rows={4}/>
          </div>
          <div><Button type={copy["s75490bd7b93e"]}>{copy["sf6f4688ff23d"]}</Button></div>
        </form>
      </Section>
    </main>);
}
function Lagos() {
    const { EPPPSChecklist, WhatWeDontDo, PromptBox, DrawingFrame, Card, Badge, Button, Accordion, PricingTable, VerificationStamp } = DL;
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <Badge square tone={copy["sa3a7f053ae2e"]}>{copy["s56cec9425719"]}</Badge>
          <h1>{copy["s326aef5d0cfc"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s250e91bf2cc6"]}</p>
          <div style={{ display: copy["s222f930b8752"], gap: "var(--space-4)", flexWrap: copy["sf0a289923ed6"] }}>
            <Button>{copy["s8f8db571bdf7"]}</Button>
            <Button variant={copy["sc0f69e19ba25"]}>{copy["sfe8895b9e9be"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sb988b0e32895"]} title={copy["sc5b974336753"]} lead={copy["sd03bddf093b1"]}/>
        <Split ratio={copy["sfc1da61f6790"]} style={{ alignItems: copy["scced28c6dc3f"] }}>
          <EPPPSChecklist items={[
            { item: copy["se3c7043aebbb"], detail: copy["s0fd172de98df"], state: copy["sb24d6d33736e"] },
            { item: copy["s2a59563ef116"], detail: copy["sa3bcb24b44f7"], state: copy["s807d0fbcae7c"] },
            { item: copy["sbee63d4813f0"], detail: copy["s89dc57554991"], state: copy["sb24d6d33736e"] },
            { item: copy["sf0e67e5fa2fd"], detail: copy["s28802e58fcee"], state: copy["s807d0fbcae7c"] },
            { item: copy["s2ad61e6279e1"], state: copy["s01db91d06032"] },
            { item: copy["s9c34987a6b4a"], state: copy["s01db91d06032"] },
            { item: copy["s573d03178626"], state: copy["s01db91d06032"] },
        ]} note={copy["s4a27acc38bbe"]}/>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)" }}>
            <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)" }}>
              <h3 style={{ fontSize: "var(--text-h5)" }}>{copy["s6f79cf5c144a"]}</h3>
              <p style={{ color: "var(--text-secondary)" }}>{copy["s94fc79f82b87"]}</p>
              <PromptBox placeholder={copy["s342022829270"]} location={copy["s9366be237b83"]} submitLabel={copy["s17271316139f"]}/>
            </div>
          </div>
        </Split>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s5a046774d80d"]} title={copy["s3783fdb64111"]}/>
        <Grid min={copy["s868f8b15fc2d"]}>
          {[
            [copy["s3b1c34b07316"], copy["sb89394fac694"]],
            [copy["sa56c6611190f"], copy["s2c145037fe51"]],
            [copy["seee610a29b81"], copy["sf241069949a5"]],
        ].map(([t, d]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s4253ab5a548b"]} title={copy["sbbe1ac77a994"]} lead={copy["s574fd6c35406"]}/>
        <Split ratio={copy["s4a95b5c1ae73"]} gap="var(--space-6)">
          <Card tone={copy["s763cdc62a869"]} square padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", borderTop: "var(--stroke-heavy) solid var(--prov-user-fill)" }}>
            <Badge square tone={copy["s7e2372f4115c"]}>{copy["sbf15569cf497"]}</Badge>
            <h4 style={{ fontSize: "var(--text-h6)" }}>{copy["sf705a6b4960a"]}</h4>
            <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{copy["sa9439f3c82a0"]}</p>
            <div style={{
            border: "var(--stroke-medium) solid var(--drawing-ink)", borderRadius: "var(--radius-drawing)",
            padding: "var(--space-4)", display: copy["s0f2a693e93e2"], gap: "var(--space-1)",
            fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-secondary)",
        }}>
              <span style={{ letterSpacing: "var(--tracking-label)", color: "var(--text-primary)" }}>{copy["s0d96d2677d70"]}</span>
              <span>{copy["s45cbe17a0751"]}</span>
              <span>{copy["s4aa58eff2d13"]}</span>
            </div>
          </Card>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)" }}>
            <Badge square tone={copy["sa3a7f053ae2e"]}>{copy["s7336b22b9746"]}</Badge>
            <VerificationStamp profiles={[copy["s126442005b63"], copy["s0e761268dfb3"]]} checksPerformed={33} checksFlagged={2} checksNotPerformed={[copy["sf3c19e5be975"], copy["sac1e08dbd3cc"]]} unverifiedElements={1} signer={copy["s476b4ceff082"]} drawingHash={copy["s31df367e1fd1"]} revision={copy["s559aead08264"]} timestamp={copy["sacab7ed6e3cc"]}/>
          </div>
        </Split>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <Split ratio={copy["s4a95b5c1ae73"]}>
          <WhatWeDontDo items={[
            copy["s9c6dc9250871"],
            copy["s0cd0a094b238"],
            copy["sd2f24acdcb7b"],
            copy["sded593b1cdd8"],
        ]}/>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["s8582873ce22a"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s39ca5edbd2ea"]}</p>
            <div><Button variant={copy["sc0f69e19ba25"]} iconRight={copy["s8454f8696a70"]}>{copy["sfe8895b9e9be"]}</Button></div>
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sdfe95783edfe"]} title={copy["sb6486be653aa"]} max="var(--container-md)"/>
        <PricingTable currencies={[copy["sa74aa40897d1"], copy["sa26cdf3a6e70"]]} tiers={[
            { name: copy["sb202bcb90ca5"], group: copy["s1876bbc8e3e5"], audience: copy["sa7f0b1451307"], price: { NGN: copy["sede4306a675a"], USD: copy["sba144262a228"] }, per: copy["sdcc954337afd"], includes: [copy["s467675d7702d"], copy["sed87f672e68f"], copy["s73c80d72963e"]] },
            { name: copy["s010dd7b94f5f"], group: copy["s791757205d8b"], audience: copy["s2c763a487707"], price: { NGN: copy["sdbc033d239eb"], USD: copy["s4d314ed09d84"] }, per: copy["sdcc954337afd"], includes: [copy["s101a1c97b01b"], copy["s47a95fec9e18"], copy["s9886a98e733c"]] },
            { name: copy["s19c73a5cdf34"], group: copy["s791757205d8b"], audience: copy["s6b9b8ecc3fe3"], price: { NGN: copy["s189adb588bab"], USD: copy["s2aa253147048"] }, per: copy["s777763e0d9ec"], featured: true, includes: [copy["sb62f3c6b3c9c"], copy["sab4368f2814c"], copy["s8b1c63e4f6c2"]] },
        ]}/>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s9a72221a2747"]} title={copy["s7c0260285b26"]} max="var(--container-md)"/>
        <Accordion defaultOpen={0} items={[
            { question: copy["s9eeaf3e2a20e"], answer: copy["s325b19c529bd"] },
            { question: copy["s0c57975b9abf"], answer: copy["s52405231606f"] },
            { question: copy["s7892c54ada92"], answer: copy["s62e23469577f"] },
            { question: copy["s64a6c02413ac"], answer: copy["s6fbb70cd25a1"] },
        ]}/>
      </Section>

      <CTA title={copy["s1b99a2faf0f2"]} lead={copy["s09ee782b02f6"]} primary={copy["s8f8db571bdf7"]} secondary={copy["sfe8895b9e9be"]}/>
    </main>);
}
function Pricing() {
    const { PricingTable, Card, Badge, Button, Accordion, Input } = DL;
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", maxWidth: "var(--container-lg)" }}>
          <h1>{copy["s79bb97cd72c0"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)" }}>{copy["s4aa6e57dcb2e"]}</p>
        </div>
      </Section>

      <Section>
        <PricingTable tiers={PRICING_TIERS}/>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s78f595b3ca9f"]} title={copy["sbaa80f810c0e"]}/>
        <Grid min={copy["s67965826db0c"]}>
          <Card tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", alignContent: copy["scced28c6dc3f"] }}>
            <Badge square tone={copy["sa3a7f053ae2e"]}>{copy["s04952a0f984d"]}</Badge>
            <h3 style={{ fontSize: "var(--text-h5)" }}>{copy["s665722844f2b"]}</h3>
            <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)", fontVariantNumeric: copy["sba2d0eea2e16"] }}>
              {[[copy["sb202bcb90ca5"], copy["s2df0b93655a3"]], [copy["s010dd7b94f5f"], copy["sa7427924596d"]], [copy["s19c73a5cdf34"], copy["s73a104f6599e"]]].map(([t, p]) => (<div key={t} style={{ display: copy["s222f930b8752"], justifyContent: copy["s8c72b36502d3"], gap: "var(--space-4)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)" }}>
                  <span>{t}</span><span style={{ fontWeight: "var(--font-weight-medium)" }}>{p}</span>
                </div>))}
            </div>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["s97a349464cb3"]}</p>
          </Card>
          <Card tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", alignContent: copy["scced28c6dc3f"] }}>
            <Badge square>{copy["s2a19bb78de3e"]}</Badge>
            <h3 style={{ fontSize: "var(--text-h5)" }}>{copy["s8ec8021d8648"]}</h3>
            <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{copy["sb8f2984969c7"]}</p>
            <div><Button variant={copy["sc0f69e19ba25"]}>{copy["s9a4d4cf95bc9"]}</Button></div>
          </Card>
          <Card tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", alignContent: copy["scced28c6dc3f"] }}>
            <Badge square>{copy["sa75e56e517cd"]}</Badge>
            <h3 style={{ fontSize: "var(--text-h5)" }}>{copy["sd8b1358b8eab"]}</h3>
            <div style={{ display: copy["s222f930b8752"], gap: "var(--space-3)", alignItems: copy["sf179a509d32b"] }}>
              <div style={{ width: copy["s894c01c105b5"] }}><Input type={copy["s12886f9d0005"]} defaultValue="1" aria-label={copy["s87430fb35e82"]}/></div>
              <Button>{copy["s79f52e0ce619"]}</Button>
            </div>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["s104fe8d63e20"]}</p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["se2dc37c225ef"]} title={copy["sd69a37385809"]}/>
        <div style={{ overflowX: copy["s929260ad9b9e"], border: "var(--border-width) solid var(--border)", borderRadius: "var(--radius-drawing)", background: "var(--surface)" }}>
          <table style={{ width: "100%", borderCollapse: copy["s93bc5d02dc2a"], minWidth: copy["s6ddb6ba5b9ff"], fontVariantNumeric: copy["sba2d0eea2e16"] }}>
            <thead>
              <tr>
                {["", copy["sf411a1fb6275"], copy["sb202bcb90ca5"], copy["s010dd7b94f5f"], copy["s19c73a5cdf34"], copy["sd3857b12b4ce"], copy["s3fbe5ed156f1"]].map((h) => (<th key={h} style={{ textAlign: h ? copy["sf179a509d32b"] : copy["s360f84035942"], padding: "var(--space-3) var(--space-4)", fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--text-muted)", borderBottom: "var(--divider-width) solid var(--border)", whiteSpace: copy["s010d16d2e921"] }}>{h}</th>))}
              </tr>
            </thead>
            <tbody>
              {[
            [copy["sb684defe8695"], ["3", copy["s11dde17d6c3e"], copy["s11dde17d6c3e"], copy["s11dde17d6c3e"], copy["s11dde17d6c3e"], copy["s11dde17d6c3e"]]],
            [copy["s662d84fb2517"], [copy["s0228c6d48ecf"], copy["s0228c6d48ecf"], copy["sc699995ef371"], copy["s005f4000be07"], copy["s005f4000be07"], copy["sa36afd6899c7"]]],
            [copy["sc5f4eaf46f8d"], ["0", "40", "60", "250", "1 000", copy["s7c6e338c8986"]]],
            [copy["s2f4dcf59ff0c"], [copy["s796120837694"], copy["s36e8e07f8948"], copy["sd9c06e944235"], copy["sa8a095507b65"], copy["sa8a095507b65"], copy["sa8a095507b65"]]],
            [copy["sda7ccc2a564c"], ["—", "—", copy["s59f03d642b41"], copy["sdb5ba334b575"], copy["sdb5ba334b575"], copy["sdb5ba334b575"]]],
            [copy["sc1ada08ce138"], ["—", "—", copy["sffd7280513ce"], copy["s008dacb6d1e8"], copy["s008dacb6d1e8"], copy["s720f5fd14b1c"]]],
        ].map(([row, vals]) => (<tr key={row} style={{ borderBottom: "var(--divider-width) solid var(--divider)" }}>
                  <td style={{ padding: "var(--space-3) var(--space-4)", fontSize: "var(--text-small)", fontWeight: "var(--font-weight-semibold)", whiteSpace: copy["s010d16d2e921"] }}>{row}</td>
                  {vals.map((v, i) => (<td key={i} style={{ padding: "var(--space-3) var(--space-4)", fontSize: "var(--text-small)", textAlign: copy["sf179a509d32b"], color: v === "—" ? "var(--text-muted)" : "var(--text-primary)" }}>{v}</td>))}
                </tr>))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <SectionHead eyebrow={copy["s052d7880dd4a"]} title={copy["s23a274a624a8"]}/>
        <Grid min={copy["s67965826db0c"]}>
          <Card tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
            <h4 style={{ fontSize: "var(--text-h6)" }}>{copy["s28432ceece43"]}</h4>
            <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{copy["s255890d71792"]}</p>
          </Card>
          <Card tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
            <h4 style={{ fontSize: "var(--text-h6)" }}>{copy["sca6a4edffc8c"]}</h4>
            <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{copy["s5afec7e80d68"]}</p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s3ac8bbca9a74"]} title={copy["s3021b5f43178"]} max="var(--container-md)"/>
        <Accordion defaultOpen={0} items={[
            { question: copy["sc2f6052b3abd"], answer: copy["sd7e57cfa62fc"] },
            { question: copy["s36ab600d2cc3"], answer: copy["sdc63a83000bb"] },
            { question: copy["s23d720c7cab0"], answer: copy["seaae597f528c"] },
            { question: copy["s5f3624f918f4"], answer: copy["s10656718d6c7"] },
        ]}/>
      </Section>

      <CTA title={copy["s6f7697dae1bc"]} lead={copy["se5853539930f"]} primary={copy["s22a1d78d60d5"]} secondary={copy["scfd0b0225710"]}/>
    </main>);
}
function About() {
    const { Card, Badge, Button, Input, Textarea, Select, Label, Checkbox } = DL;
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", maxWidth: "var(--container-lg)" }}>
          <h1>{copy["s57f5715f9384"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)" }}>{copy["s0ed808fa1e7d"]}</p>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["se6b85bfbf550"]} title={copy["s381b0cbb2186"]} max="var(--container-lg)"/>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", maxWidth: "var(--container-lg)", fontSize: "var(--text-large)" }}>
          <p style={{ color: "var(--text-secondary)" }}>{copy["sc983ad095761"]}</p>
          <p style={{ color: "var(--text-secondary)" }}>{copy["sf6e9917593c0"]}</p>
        </div>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s0be561015c99"]} title={copy["sac8696092c05"]}/>
        <Grid min={copy["s868f8b15fc2d"]}>
          {[
            [copy["seac20c4006bb"], copy["sfd6ed797e4fc"]],
            [copy["sb7a9cbb14150"], copy["sc2c67f96d7fe"]],
            [copy["se0180c34383f"], copy["s5e4623fe40fb"]],
            [copy["s28a1c0f0f4c2"], copy["sd1a315b68967"]],
        ].map(([t, d]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s6934d52acdee"]} title={copy["s83a65532d8ff"]}/>
        <Grid min={copy["sec6f0ef65f7b"]} gap="var(--space-4)">
          {[
            [copy["s8d23a6e37e0a"], copy["sddcae8727d58"], copy["secc0e7dc084f"]],
            [copy["s49dca65f362f"], copy["s3a27842aeb58"], copy["s815eca977c7d"]],
            [copy["s04952a0f984d"], copy["sdc4314ab8ec1"], copy["sb384863fa1f6"]],
        ].map(([t, d, city]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)", alignContent: copy["scced28c6dc3f"] }}>
              <Badge square tone={copy["sa3a7f053ae2e"]}>{t}</Badge>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{city.toLowerCase()}{copy["s2215d78b2b14"]}</span>
            </Card>))}
        </Grid>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <SectionHead eyebrow={copy["sf149d8534427"]} title={copy["sa89935bd784a"]} max="var(--container-md)"/>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", maxWidth: "var(--container-md)" }}>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", gridTemplateColumns: copy["s4a95b5c1ae73"] }}>
            <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
              <Label htmlFor={copy["s1b16b1df538b"]} required>{copy["sdcd1d5223f73"]}</Label>
              <Input id={copy["s1b16b1df538b"]}/>
            </div>
            <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
              <Label htmlFor={copy["s3f79bb7b435b"]} required>{copy["s969ccbd3cf63"]}</Label>
              <Input id={copy["s3f79bb7b435b"]} type={copy["s82244417f956"]}/>
            </div>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
            <Label htmlFor={copy["sca978112ca1b"]} required>{copy["s2526f5ebea26"]}</Label>
            <Select id={copy["sca978112ca1b"]} options={[copy["sfb37e831cc92"], copy["s0d5958b8f00b"], copy["sdcf3eae94122"], copy["s1af384c577f2"], copy["s9ed1273e9b5a"]]}/>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", gridTemplateColumns: copy["s4a95b5c1ae73"] }}>
            <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
              <Label htmlFor={copy["s18ac3e7343f0"]}>{copy["s3bde12e87641"]}</Label>
              <Input id={copy["s18ac3e7343f0"]} type={copy["s0e87632cd46b"]}/>
            </div>
            <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
              <Label htmlFor={copy["se3b98a4da31a"]}>{copy["s13ae4c193d33"]}</Label>
              <Select id={copy["se3b98a4da31a"]} options={[copy["sa06ca5a635cc"], copy["s368f5799a624"], copy["s0ad386975f7c"], copy["s693a6974a1fb"]]}/>
            </div>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
            <Label htmlFor={copy["s2e7d2c03a950"]} hint={copy["s052bee439abd"]}>{copy["sb76a8358489f"]}</Label>
            <Textarea id={copy["s2e7d2c03a950"]} rows={3}/>
          </div>
          <Checkbox label={copy["s0482320e7be5"]} description={copy["s8bc4fd14bea6"]}/>
          <div><Button type={copy["s75490bd7b93e"]}>{copy["sf149d8534427"]}</Button></div>
        </form>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s2b5c3d26721a"]} title={copy["s0830692816cd"]} max="var(--container-md)"/>
        <Grid min={copy["s0eb654d1fe7d"]} gap="var(--space-4)">
          {[[copy["sc910d474dcd7"], copy["s4ec2d8167483"]], [copy["sc8d715a6f56b"], copy["s1918af2d7c5a"]], [copy["s7d9e01f879f1"], copy["se04bc8fd1fac"]], [copy["s9ed1273e9b5a"], copy["sd1da2c2f16af"]]].map(([t, e]) => (<div key={t} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-1)" }}>
              <span style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--text-muted)", fontWeight: 600 }}>{t}</span>
              <a href={copy["sde1eaa596f93"] + e} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-small)" }}>{e}</a>
            </div>))}
        </Grid>
      </Section>
    </main>);
}
function Students({ go }) {
    const { DrawingFrame, Card, Badge, Button, Accordion, ConceptWatermark } = DL;
    const steps = [
        [copy["s00f7e8c272e7"], copy["s34ee353d525a"]],
        [copy["sde74ac7290dc"], copy["saa28cdcf9c86"]],
        [copy["s0197946cc322"], copy["s5d1d7a7ffa50"]],
        [copy["sf1323f09f63c"], copy["s63fc9f95eeba"]],
        [copy["s49e49bb4401e"], copy["s89caacb4f3bb"]],
        [copy["se888155d8c7d"], copy["s049ce8efa7ef"]],
    ];
    const tone = {
        good: { glyph: "✓", word: copy["s46124e023603"], fill: "var(--prov-user-fill)", ink: "var(--prov-user-ink)", quiet: "var(--prov-user-quiet)" },
        weak: { glyph: "⚠", word: copy["s8d6cea2517ff"], fill: "var(--prov-inferred-fill)", ink: "var(--prov-inferred-ink)", quiet: "var(--prov-inferred-quiet)" },
        missing: { glyph: "⚠", word: copy["s6be36ca49ee8"], fill: "var(--prov-verify-fill)", ink: "var(--prov-verify-ink)", quiet: "var(--prov-verify-quiet)" },
    };
    const points = [
        { t: copy["s770e607624d6"], point: copy["sbedd028278d5"], reason: copy["s341221946efd"], source: copy["s078a65eba806"] },
        { t: copy["s770e607624d6"], point: copy["s75b773f42e59"], reason: copy["s70ae3222241a"], source: copy["s5887b6674930"] },
        { t: copy["s481ba4019c9d"], point: copy["s8fb65f26f303"], reason: copy["sf63629698f55"], source: copy["s578a24429724"] },
        { t: copy["s481ba4019c9d"], point: copy["s7337097b7320"], reason: copy["s73c6383628e4"], source: copy["s918cecab4b48"] },
        { t: copy["sffa63583dfa6"], point: copy["s50fb99ef0856"], reason: copy["s63905e21b1df"], source: copy["sf995c70c140e"], tutor: true },
    ];
    const mono = { fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" };
    const label = { fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: copy["sd2cf63c704ae"], color: "var(--text-secondary)" };
    return (<main>
      <Section scheme={copy["se9ee482d048d"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <p style={{ ...label, fontWeight: "var(--font-weight-semibold)" }}>{copy["s074cac53c30f"]}</p>
          <h1>{copy["sc95df64b9dfc"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["sb3b819ba4622"]}</p>
          <div style={{ display: copy["s222f930b8752"], gap: "var(--space-4)", flexWrap: copy["sf0a289923ed6"] }}>
            <Button>{copy["s70f1c94f8268"]}</Button>
            <Button variant={copy["sc0f69e19ba25"]}>{copy["scb1e5b58c4a0"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)", textWrap: copy["s77049f6f8893"] }}>{copy["sb81e895167ce"]}<a href="#Idea%20mode" onClick={(e) => { e.preventDefault(); go && go(copy["sa68388d7143f"]); }} style={{ color: "var(--accent)", fontWeight: "var(--font-weight-medium)" }}>{copy["s533e5c11a55d"]}</a>
        </p>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s0cde07320205"]} title={copy["s62950394a793"]} lead={copy["s433cc8b416af"]}/>
        <ol style={{ listStyle: copy["s140bedbf9c3f"], margin: 0, padding: 0, display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["sd479cd4c9384"], gap: "var(--space-6) 0" }} className={copy["sabc7a8df3347"]}>
          {steps.map(([name, desc], i) => (<li key={name} style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", paddingRight: "var(--space-5)" }}>
              <div style={{ display: copy["s222f930b8752"], alignItems: copy["sf179a509d32b"], gap: "var(--space-2)" }}>
                <span aria-hidden={copy["sb5bea41b6c62"]} style={{ width: copy["sa9f23226d971"], height: copy["sa9f23226d971"], borderRadius: "50%", border: "var(--stroke-medium) solid var(--drawing-ink)", background: i === 4 ? "var(--accent)" : "var(--canvas)", flexShrink: 0 }}/>
                <span aria-hidden={copy["sb5bea41b6c62"]} className={i === steps.length - 1 ? copy["s7ef337c27305"] : (i === 2 ? copy["s3d20133dc05a"] : undefined)} style={{ flex: 1, borderTop: "var(--stroke-thin) solid var(--drawing-ink)" }}/>
              </div>
              <span style={mono}>{String(i + 1).padStart(2, "0")}</span>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{name}</h4>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", textWrap: copy["s77049f6f8893"] }}>{desc}</p>
            </li>))}
        </ol>
      </Section>

      <Section scheme={copy["sa457e8f04aa7"]}>
        <SectionHead eyebrow={copy["s1f5ba634dea7"]} title={copy["s5411fbd8c651"]} lead={copy["s74a231f853b4"]}/>
        <div style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["s81540bb60fc0"], gap: "var(--space-6)", alignItems: copy["scced28c6dc3f"] }}>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)" }}>
            <span style={label}>{copy["sa5320cde31e8"]}</span>
            <DrawingFrame label={copy["s9126aeab52e9"]} sheet={copy["s408856ec1674"]} grid={false} ratio="16 / 9" style={{ gridTemplateRows: copy["s2e35bcb46136"], alignContent: copy["s8c72b36502d3"] }}>
              <img src={(resources && resources.studentSketch) || "../../assets/hero/sm/student-sketch.jpg"} alt={copy["se1aaa2767704"]} style={{ display: copy["s496aca80e4d8"], width: "100%", height: "100%", objectFit: copy["s3fa405a8301a"] }}/>
            </DrawingFrame>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)" }}>
            <span style={label}>{copy["s179867ba3ddb"]}</span>
            {[
            [copy["s8a1b1d9abca4"], copy["s79d777394f5b"], copy["s46d73851875b"]],
            [copy["s5d79b0bdfb78"], copy["s38a77466e414"], copy["s3571a15d1d42"]],
            [copy["s98e3384115f7"], copy["sfa016cc690b2"], copy["scac487a4dff5"]],
        ].map(([t, d, s], i) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-5)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)", alignContent: copy["scced28c6dc3f"] }}>
                <span style={mono}>{copy["s84b6401e19e5"]}{i + 1}</span>
                <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", textWrap: copy["s77049f6f8893"] }}>{d}</p>
                <span style={{ ...mono, color: "var(--text-secondary)" }}>{copy["sb226e862d61f"]}{s}</span>
              </Card>))}
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)" }}>
            <span style={label}>{copy["sd0365327f51c"]}</span>
            <Card tone={copy["s763cdc62a869"]} square padding="0" style={{ display: copy["s0f2a693e93e2"] }}>
              <div style={{ display: copy["s222f930b8752"], justifyContent: copy["s8c72b36502d3"], alignItems: copy["s8ba8496a2525"], gap: "var(--space-3)", padding: "var(--space-4) var(--space-5)", borderBottom: "var(--border-width) solid var(--border)" }}>
                <span style={{ fontWeight: "var(--font-weight-medium)" }}>{copy["sa64d7ee86ac7"]}</span>
                <span style={mono}>{copy["s5c08f80814bb"]}</span>
              </div>
              {points.map((p) => {
            const k = tone[p.t];
            return (<div key={p.point} style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["sbc67cf116d2a"], gap: copy["sfd9706450d0a"], padding: "var(--space-4) var(--space-5) var(--space-4) 0", borderBottom: "var(--divider-width) solid var(--divider)" }}>
                    <span aria-hidden={copy["sb5bea41b6c62"]} style={{ background: k.fill }}/>
                    <span aria-hidden={copy["sb5bea41b6c62"]} style={{ color: k.ink, lineHeight: "var(--leading-body)" }}>{k.glyph}</span>
                    <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-1)" }}>
                      <div style={{ display: copy["s222f930b8752"], flexWrap: copy["sf0a289923ed6"], gap: "var(--space-2)", alignItems: copy["s8ba8496a2525"] }}>
                        <span style={{ ...label, color: k.ink, fontWeight: "var(--font-weight-semibold)" }}>{k.word}</span>
                        <span style={{ fontWeight: "var(--font-weight-medium)" }}>{p.point}</span>
                      </div>
                      <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", textWrap: copy["s77049f6f8893"] }}>{p.reason}</p>
                      <span style={mono}>{copy["sb226e862d61f"]}{p.source}</span>
                      {p.tutor && <div style={{ marginTop: "var(--space-2)" }}><Badge tone={copy["s318678825324"]} icon={copy["s38a81e87e796"]} square>{copy["s2264d74d5f07"]}</Badge></div>}
                    </div>
                  </div>);
        })}
              <div style={{ padding: "var(--space-4) var(--space-5)", display: copy["s222f930b8752"], gap: "var(--space-3)", flexWrap: copy["sf0a289923ed6"] }}>
                <Button size={copy["s5af308bec132"]}>{copy["s15ba01cd6947"]}</Button>
                <Button size={copy["s5af308bec132"]} variant={copy["sead6ef03d61e"]}>{copy["s0a5d86a8572b"]}</Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section scheme={copy["saf58e0f88165"]}>
        <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-4)", maxWidth: "var(--container-lg)" }}>
          <h2>{copy["s5d5ccf9d4ea9"]}</h2>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", textWrap: copy["s77049f6f8893"] }}>{copy["sb37d150b9682"]}</p>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s178188ff55be"]} title={copy["sc3ce281eca8a"]} lead={copy["s05bb5b3395e0"]}/>
        <Split ratio={copy["s4a95b5c1ae73"]} style={{ alignItems: copy["scced28c6dc3f"] }}>
          <div style={{ position: copy["sd2d9e1f13413"], overflow: copy["se564b4081d7a"], containerType: copy["sae1042f731a8"], background: "var(--surface)", border: "var(--border-width) solid var(--border-strong)", borderRadius: "var(--radius-drawing)" }}>
            <div style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "var(--border-width) solid var(--border-strong)", display: copy["s222f930b8752"], justifyContent: copy["s8c72b36502d3"], gap: "var(--space-3)", flexWrap: copy["sf0a289923ed6"], alignItems: copy["s8ba8496a2525"] }}>
              <span style={{ ...label, fontWeight: "var(--font-weight-semibold)", color: "var(--text-primary)" }}>{copy["s89961f73048c"]}</span>
              <span style={mono}>{copy["s205ae7b9f3c6"]}</span>
            </div>
            <div style={{ padding: "var(--space-5)", display: copy["s0f2a693e93e2"], gap: "var(--space-5)" }}>
              <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-2)" }}>
                <div style={{ display: copy["s222f930b8752"], height: copy["sa9f23226d971"], borderRadius: "var(--radius-drawing)", overflow: copy["se564b4081d7a"] }}>
                  <span style={{ width: "62%", background: "var(--prov-user-fill)" }}/>
                  <span style={{ flex: 1, background: "var(--prov-inferred-fill)" }}/>
                </div>
                <div style={{ display: copy["s222f930b8752"], justifyContent: copy["s8c72b36502d3"], gap: "var(--space-4)", fontSize: "var(--text-small)" }}>
                  <span><b style={{ color: "var(--prov-user-ink)", fontWeight: "var(--font-weight-semibold)" }}>{copy["sa07d2aca6629"]}</b>{copy["sf2fba7825049"]}</span>
                  <span><b style={{ color: "var(--prov-inferred-ink)", fontWeight: "var(--font-weight-semibold)" }}>{copy["s18a90d31ffc3"]}</b>{copy["s0c10c40a5138"]}</span>
                </div>
              </div>
              <dl style={{ margin: 0, display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["s6c3e2723a1c7"], rowGap: "var(--space-3)", columnGap: "var(--space-6)", fontSize: "var(--text-small)" }}>
                {[
            [copy["sf81ab1cf2c81"], copy["s0670dd37efce"]],
            [copy["sa293fe163e7b"], "2"],
            [copy["s0a5d86a8572b"], copy["sdccafe55abe3"]],
            [copy["s00bc97d9ca85"], copy["s833f0d47fd93"]],
        ].map(([k, v]) => (<React.Fragment key={k}>
                    <dt style={{ color: "var(--text-secondary)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)" }}>{k}</dt>
                    <dd style={{ margin: 0, fontFamily: "var(--font-mono)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)", textAlign: copy["s27042f4e6eca"] }}>{v}</dd>
                  </React.Fragment>))}
              </dl>
              <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-1)" }}>
                <span style={label}>{copy["s014146d8dfdd"]}</span>
                <span style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["sfc5b6518f8a4"]}</span>
              </div>
            </div>
            <div style={{ padding: "var(--space-3) var(--space-5)", borderTop: "var(--border-width) solid var(--border-strong)", display: copy["s222f930b8752"], justifyContent: copy["s8c72b36502d3"], gap: "var(--space-3)", flexWrap: copy["sf0a289923ed6"] }}>
              <span style={{ ...mono, fontWeight: "var(--font-weight-bold)", color: "var(--text-primary)", letterSpacing: "var(--tracking-label)" }}>{copy["sd04da9cf0691"]}</span>
              <span style={mono}>{copy["s298a4c0dacc0"]}</span>
            </div>
            <div aria-hidden={copy["sb5bea41b6c62"]} style={{ position: copy["s747355bdc2a2"], inset: 0, display: copy["s0f2a693e93e2"], placeItems: copy["sf179a509d32b"], pointerEvents: copy["s140bedbf9c3f"], userSelect: copy["s140bedbf9c3f"] }}>
              <span style={{ transform: copy["s7dbcf6eca28e"], fontFamily: "var(--font-mono)", fontWeight: "var(--font-weight-bold)", fontSize: copy["sf2e7caf7cc98"], letterSpacing: "var(--tracking-label)", color: "var(--concept-watermark-color)", whiteSpace: copy["s010d16d2e921"], lineHeight: 1 }}>{copy["sd04da9cf0691"]}</span>
            </div>
          </div>
          <div style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-5)", alignContent: copy["sf179a509d32b"] }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sdf6c51e25a5b"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["sdcc6db793d3e"]}</p>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s8469c0b97c3e"]}</p>
            <ul style={{ listStyle: copy["s140bedbf9c3f"], margin: 0, padding: 0, display: copy["s0f2a693e93e2"], gap: "var(--space-2)", fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>
              {[[copy["s04f8996da763"], copy["s68b1b222fecc"]], [copy["s204ed55e1af9"], copy["sb05ffcf487e7"]]].map(([s, t]) => (<li key={s} style={{ display: copy["s0f2a693e93e2"], gridTemplateColumns: copy["s43aead464bd9"], gap: "var(--space-3)", alignItems: copy["sf179a509d32b"] }}>
                  <span aria-hidden={copy["sb5bea41b6c62"]} style={{ width: copy["sa9f23226d971"], height: copy["sa9f23226d971"], borderRadius: "var(--radius-drawing)", background: "var(--prov-" + s + copy["sedd7870360fd"] }}/>
                  <span>{t}</span>
                </li>))}
            </ul>
          </div>
        </Split>
      </Section>

      <Section scheme={copy["saf58e0f88165"]} id={copy["s5c3ba9393fc0"]}>
        <SectionHead eyebrow={copy["scb1e5b58c4a0"]} title={copy["s6375caf268ab"]} lead={copy["s991453ab3856"]}/>
        <Grid min={copy["s868f8b15fc2d"]}>
          {[
            [copy["s8e1f0e3fe663"], copy["s13c4035cbc84"]],
            [copy["sf6105d1b6207"], copy["sf3d2b7e3dcd3"]],
            [copy["sd1840e445e90"], copy["s18bd25c8ecf0"]],
        ].map(([t, d]) => (<Card key={t} tone={copy["s763cdc62a869"]} padding="var(--space-6)" style={{ display: copy["s0f2a693e93e2"], gap: "var(--space-3)", alignContent: copy["scced28c6dc3f"] }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)", textWrap: copy["s77049f6f8893"] }}>{d}</p>
            </Card>))}
        </Grid>
        <div style={{ marginTop: "var(--space-8)" }}><Button iconRight={copy["s8454f8696a70"]}>{copy["s1d1d94fb5397"]}</Button></div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s9a72221a2747"]} title={copy["s54e684a9f0e3"]} max="var(--container-md)"/>
        <Accordion defaultOpen={0} items={[
            { question: copy["sdce09f3b2073"], answer: copy["s60c9142d4b76"] },
            { question: copy["s820990715ea0"], answer: copy["s240202cdf6b2"] },
            { question: copy["se3887bb501aa"], answer: copy["s2e8cb8b7f4a8"] },
            { question: copy["s0750b8aef6c0"], answer: copy["s2fb1f6d5feb9"] },
        ]}/>
      </Section>

      <CTA title={copy["sc9dcb202911d"]} lead={copy["sab106704cc13"]} primary={copy["s70f1c94f8268"]} secondary={copy["scb1e5b58c4a0"]}/>
    </main>);
}
const OriginalDrawingFrame = DL.DrawingFrame;
const OriginalHeroSlideshow = DL.HeroSlideshow;
function includesIllustration(children) {
    return React.Children.toArray(children).some(child => React.isValidElement(child) &&
        (child.type === copy["sb29814cf5792"] || child.type === copy["s0cab1c961740"] || includesIllustration(child.props.children)));
}
DL.DrawingFrame = function IllustratedDrawingFrame(props) {
    return <OriginalDrawingFrame {...props}>{props.children}{includesIllustration(props.children) &&
            <span className={copy["sc13c9caec464"]}>{copy["s290a7f7af557"]}</span>}</OriginalDrawingFrame>;
};
DL.HeroSlideshow = function IllustratedHeroSlideshow(props) {
    return <><OriginalHeroSlideshow {...props}/><span className={copy["sf7afb36327f3"]}>{copy["s290a7f7af557"]}</span></>;
};

export { DL, Home, IdeaMode, ForProfessionals, RenderStudio, Marketplace, FindASigner, Developers, Students, Regulators, Lagos, Pricing, About };
