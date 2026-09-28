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
                return React.createElement("svg", _extends({
                    viewBox: "0 0 32 32",
                    width: size,
                    height: size,
                    style: {
                        display: "block",
                        flex: "none",
                        ...style
                    },
                    "aria-hidden": "true"
                }, props), React.createElement("line", {
                    x1: "2",
                    y1: "16",
                    x2: "30",
                    y2: "16",
                    stroke: copy["s8a04dbccff0b"],
                    strokeWidth: "1"
                }), React.createElement("line", {
                    x1: "16",
                    y1: "2",
                    x2: "16",
                    y2: "30",
                    stroke: copy["s8a04dbccff0b"],
                    strokeWidth: "1"
                }), React.createElement("circle", {
                    cx: "16",
                    cy: "16",
                    r: "10",
                    fill: "none",
                    stroke: copy["s8a04dbccff0b"],
                    strokeWidth: "1"
                }), React.createElement("circle", {
                    cx: "16",
                    cy: "16",
                    r: "4",
                    fill: "var(--accent, #1e90ff)"
                }));
            }
            function Wordmark({ size = "1.25rem", tone = "auto", mark = "left", href, style, ...props }) {
                const Tag = href ? "a" : "span";
                const color = tone === "inverse" ? "var(--color-white)" : tone === "ink" ? "var(--text-primary)" : "inherit";
                return React.createElement(Tag, _extends({
                    href: href,
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: `calc(${size} * 0.35)`,
                        fontFamily: "var(--font-sans)",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: size,
                        letterSpacing: "-0.01em",
                        lineHeight: 1,
                        color,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        ...style
                    }
                }, props), mark !== "none" && React.createElement(Mark, {
                    size: `calc(${size} * 1.4)`
                }), React.createElement("span", null, copy["seec7b403b4a9"]));
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
                return React.createElement("div", _extends({
                    style: {
                        display: "grid",
                        ...style
                    }
                }, props), items.map((it, i) => {
                    const on = open === i;
                    return React.createElement("div", {
                        key: i,
                        style: {
                            borderBottom: "var(--divider-width) solid var(--scheme-border, var(--border))"
                        }
                    }, React.createElement("button", {
                        onClick: () => setOpen(on ? null : i),
                        "aria-expanded": on,
                        style: {
                            appearance: "none",
                            background: "none",
                            border: "none",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "var(--space-4)",
                            padding: "var(--space-5) 0",
                            textAlign: "left",
                            font: "inherit",
                            fontSize: "var(--text-h6)",
                            fontWeight: "var(--font-weight-medium)",
                            color: "inherit",
                            lineHeight: "var(--leading-heading)"
                        }
                    }, it.question, React.createElement("span", {
                        className: "dl-icon",
                        "aria-hidden": "true",
                        style: {
                            transform: on ? "rotate(180deg)" : "none",
                            transition: copy["s6910fe1b338b"],
                            flex: "0 0 auto"
                        }
                    }, "keyboard_arrow_down")), React.createElement("div", {
                        style: {
                            maxHeight: on ? "40rem" : 0,
                            overflow: "hidden",
                            transition: copy["s1a3272b49277"]
                        }
                    }, React.createElement("div", {
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
                    background: "transparent",
                    color: "inherit",
                    borderColor: copy["s8a04dbccff0b"]
                },
                inverse: {
                    background: "var(--alpha-white-10)",
                    color: "var(--color-white)",
                    borderColor: "var(--border-inverse)"
                }
            };
            function Badge({ tone = "neutral", icon, square = false, children, style, ...props }) {
                return React.createElement("span", _extends({
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-1)",
                        padding: "0.125rem 0.625rem",
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-semibold)",
                        lineHeight: "var(--leading-snug)",
                        borderRadius: square ? "var(--radius-drawing)" : "var(--radius-badge)",
                        border: "var(--border-width) solid",
                        whiteSpace: "nowrap",
                        ...tones[tone],
                        ...style
                    }
                }, props), icon && React.createElement("span", {
                    className: "dl-icon",
                    style: {
                        fontSize: "1.1em"
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
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-3)",
                borderRadius: "var(--radius-button)",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-sans)",
                fontSize: "inherit",
                lineHeight: "var(--leading-body)",
                textDecoration: "none",
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
                    background: "transparent",
                    borderColor: "var(--border)",
                    color: "inherit",
                    fontWeight: "var(--font-weight-medium)",
                    backdropFilter: "blur(var(--blur-chrome))"
                },
                inverse: {
                    background: "var(--color-white)",
                    borderColor: "var(--color-white)",
                    color: "var(--color-neutral-darkest)",
                    fontWeight: "var(--font-weight-medium)"
                },
                "secondary-inverse": {
                    background: "transparent",
                    borderColor: "var(--border-inverse)",
                    color: "var(--color-white)",
                    fontWeight: "var(--font-weight-medium)",
                    backdropFilter: "blur(var(--blur-chrome))"
                },
                link: {
                    background: "none",
                    borderColor: "transparent",
                    color: "inherit",
                    gap: "var(--space-2)",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px"
                },
                ghost: {
                    background: "none",
                    borderColor: "transparent",
                    color: "inherit"
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
                    paddingBlock: "0.375rem",
                    paddingInline: "0.75rem"
                },
                sm: {
                    paddingBlock: "0.25rem",
                    paddingInline: "0.625rem",
                    fontSize: "var(--text-small)"
                },
                link: {
                    padding: 0
                },
                icon: {
                    width: "2.5rem",
                    height: "2.5rem",
                    padding: 0
                }
            };
            function Button({ variant = "primary", size = "default", iconLeft, iconRight, href, disabled, children, style, ...props }) {
                const [hover, setHover] = React.useState(false);
                const Tag = href ? "a" : "button";
                const s = {
                    ...base,
                    ...variants[variant],
                    ...sizes[size],
                    ...(hover && !disabled ? hovers[variant] : null),
                    ...(disabled ? {
                        opacity: 0.5,
                        pointerEvents: "none"
                    } : null),
                    ...style
                };
                return React.createElement(Tag, _extends({
                    href: href,
                    disabled: !href ? disabled : undefined,
                    style: s,
                    onMouseEnter: () => setHover(true),
                    onMouseLeave: () => setHover(false)
                }, props), iconLeft && React.createElement("span", {
                    className: "dl-icon",
                    style: {
                        fontSize: "1.25em"
                    }
                }, iconLeft), children, iconRight && React.createElement("span", {
                    className: "dl-icon",
                    style: {
                        fontSize: "1.25em"
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
            function Card({ tone = "surface", square = false, padding = "var(--space-8)", interactive = false, featured = false, children, style, ...props }) {
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
                        background: "transparent",
                        borderColor: "var(--scheme-border, var(--border))",
                        color: "inherit"
                    },
                    ink: {
                        background: "var(--surface-ink)",
                        borderColor: "var(--border-inverse)",
                        color: "var(--text-inverse)"
                    }
                };
                return React.createElement("div", _extends({
                    style: {
                        border: "var(--border-width) solid",
                        borderRadius: square ? "var(--radius-drawing)" : "var(--radius-card)",
                        padding,
                        boxShadow: interactive && hover ? "var(--elevation-raised)" : "var(--elevation-flat)",
                        transition: "var(--transition-control)",
                        ...tones[tone],
                        ...(featured ? {
                            borderColor: "var(--accent)",
                            position: "relative"
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
                return React.createElement("label", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "1.125rem 1fr",
                        gap: "var(--space-3)",
                        alignItems: "start",
                        cursor: disabled ? "default" : "pointer",
                        opacity: disabled ? 0.5 : 1,
                        ...style
                    }
                }, React.createElement("span", {
                    style: {
                        width: "1.125rem",
                        height: "1.125rem",
                        marginTop: "0.2rem",
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "var(--radius-checkbox)",
                        border: "var(--border-width) solid " + (on ? "var(--accent)" : "var(--border-strong)"),
                        background: on ? "var(--accent)" : "var(--surface)",
                        transition: "var(--transition-control)"
                    }
                }, React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        fontSize: "0.9rem",
                        color: "var(--color-white)",
                        fontVariationSettings: '"wght" 500'
                    }
                }, indeterminate ? "remove" : checked ? "check" : "")), React.createElement("input", _extends({
                    type: "checkbox",
                    checked: !!checked,
                    disabled: disabled,
                    onChange: onChange,
                    style: {
                        position: "absolute",
                        opacity: 0,
                        width: 0,
                        height: 0
                    }
                }, props)), React.createElement("span", null, label && React.createElement("span", {
                    style: {
                        display: "block",
                        fontSize: "var(--text-medium)"
                    }
                }, label), description && React.createElement("span", {
                    style: {
                        display: "block",
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
            function Dialog({ open = false, title, description, onClose, footer, width = "32rem", children }) {
                if (!open)
                    return null;
                return React.createElement("div", {
                    role: "presentation",
                    onClick: onClose,
                    style: {
                        position: "fixed",
                        inset: 0,
                        zIndex: 999,
                        display: "grid",
                        placeItems: "center",
                        background: "var(--alpha-ink-50)",
                        padding: "var(--space-6)"
                    }
                }, React.createElement("div", {
                    role: "dialog",
                    "aria-modal": "true",
                    onClick: e => e.stopPropagation(),
                    style: {
                        width: "100%",
                        maxWidth: width,
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-card)",
                        boxShadow: "var(--elevation-dialog)",
                        padding: "var(--space-8)",
                        display: "grid",
                        gap: "var(--space-5)",
                        color: "var(--text-primary)"
                    }
                }, React.createElement("div", {
                    style: {
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        gap: "var(--space-4)"
                    }
                }, React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-2)"
                    }
                }, title && React.createElement("h4", {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, title), description && React.createElement("p", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, description)), React.createElement("button", {
                    onClick: onClose,
                    "aria-label": copy["s7d9eb7acb13e"],
                    style: {
                        appearance: "none",
                        background: "none",
                        border: "none",
                        padding: "var(--space-1)",
                        color: "var(--text-secondary)",
                        lineHeight: 0
                    }
                }, React.createElement("span", {
                    className: "dl-icon"
                }, "close"))), children, footer && React.createElement("div", {
                    style: {
                        display: "flex",
                        gap: "var(--space-3)",
                        justifyContent: "flex-end"
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
                return React.createElement("input", _extends({
                    style: {
                        width: "100%",
                        boxSizing: "border-box",
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
                return React.createElement("label", _extends({
                    htmlFor: htmlFor,
                    style: {
                        display: "flex",
                        alignItems: "baseline",
                        gap: "var(--space-2)",
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--text-primary)",
                        ...style
                    }
                }, props), React.createElement("span", null, children, required && React.createElement("span", {
                    style: {
                        color: "var(--prov-verify-ink)"
                    }
                }, " *")), hint && React.createElement("span", {
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
                return React.createElement("div", _extends({
                    role: "radiogroup",
                    style: {
                        display: "grid",
                        gap: "var(--space-3)",
                        ...style
                    }
                }, props), options.map(o => {
                    const v = typeof o === "string" ? o : o.value;
                    const l = typeof o === "string" ? o : o.label;
                    const d = typeof o === "string" ? null : o.description;
                    const on = value === v;
                    return React.createElement("label", {
                        key: v,
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1.125rem 1fr",
                            gap: "var(--space-3)",
                            alignItems: "start",
                            cursor: "pointer"
                        }
                    }, React.createElement("span", {
                        style: {
                            width: "1.125rem",
                            height: "1.125rem",
                            marginTop: "0.2rem",
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            border: "var(--border-width) solid " + (on ? "var(--accent)" : "var(--border-strong)"),
                            background: "var(--surface)",
                            transition: "var(--transition-control)"
                        }
                    }, on && React.createElement("span", {
                        style: {
                            width: "0.5rem",
                            height: "0.5rem",
                            borderRadius: "50%",
                            background: "var(--accent)"
                        }
                    })), React.createElement("input", {
                        type: "radio",
                        name: name,
                        value: v,
                        checked: on,
                        onChange: () => onChange && onChange(v),
                        style: {
                            position: "absolute",
                            opacity: 0,
                            width: 0,
                            height: 0
                        }
                    }), React.createElement("span", null, React.createElement("span", {
                        style: {
                            display: "block",
                            fontSize: "var(--text-medium)"
                        }
                    }, l), d && React.createElement("span", {
                        style: {
                            display: "block",
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
                return React.createElement("div", {
                    style: {
                        position: "relative",
                        display: "inline-grid",
                        width: "100%"
                    }
                }, React.createElement("select", _extends({
                    style: {
                        width: "100%",
                        boxSizing: "border-box",
                        appearance: "none",
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
                    const v = typeof o === "string" ? o : o.value;
                    const l = typeof o === "string" ? o : o.label;
                    return React.createElement("option", {
                        key: v,
                        value: v
                    }, l);
                })), React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        position: "absolute",
                        right: "var(--space-3)",
                        top: "50%",
                        transform: copy["s7db032237817"],
                        color: "var(--text-secondary)",
                        pointerEvents: "none"
                    }
                }, "keyboard_arrow_down"));
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
            function Tabs({ tabs = [], value, onChange, variant = "underline", style, ...props }) {
                const [internal, setInternal] = React.useState(tabs[0] && (tabs[0].value || tabs[0]));
                const active = value !== undefined ? value : internal;
                const set = v => {
                    setInternal(v);
                    onChange && onChange(v);
                };
                const items = tabs.map(t => typeof t === "string" ? {
                    value: t,
                    label: t
                } : t);
                const current = items.find(t => t.value === active) || items[0];
                const pill = variant === "pill";
                return React.createElement("div", _extends({
                    style: style
                }, props), React.createElement("div", {
                    role: "tablist",
                    style: {
                        display: "flex",
                        gap: pill ? "var(--space-1)" : "var(--space-6)",
                        borderBottom: pill ? "none" : "var(--divider-width) solid var(--scheme-border, var(--border))",
                        background: pill ? "var(--surface-sunken)" : "none",
                        borderRadius: pill ? "var(--radius-button)" : 0,
                        padding: pill ? "var(--space-1)" : 0,
                        width: pill ? "fit-content" : "auto"
                    }
                }, items.map(t => {
                    const on = t.value === active;
                    return React.createElement("button", {
                        key: t.value,
                        role: "tab",
                        "aria-selected": on,
                        onClick: () => set(t.value),
                        style: {
                            appearance: "none",
                            background: pill && on ? "var(--surface)" : "none",
                            border: pill && on ? "var(--border-width) solid var(--border)" : "var(--border-width) solid transparent",
                            borderRadius: pill ? "var(--radius-button)" : 0,
                            borderBottom: pill ? undefined : "var(--border-width-strong) solid " + (on ? "var(--accent)" : "transparent"),
                            marginBottom: pill ? 0 : "-1px",
                            padding: pill ? copy["s821ab636ac83"] : "var(--space-3) 0",
                            font: "inherit",
                            fontSize: "var(--text-medium)",
                            fontWeight: on ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
                            color: on ? pill ? "var(--text-primary)" : "var(--accent-ink)" : "var(--scheme-text-secondary, var(--text-secondary))",
                            transition: "var(--transition-control)"
                        }
                    }, t.label);
                })), current && current.content && React.createElement("div", {
                    role: "tabpanel",
                    style: {
                        paddingTop: "var(--space-6)",
                        animation: "none",
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
                return React.createElement("textarea", _extends({
                    rows: rows,
                    style: {
                        width: "100%",
                        boxSizing: "border-box",
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-medium)",
                        lineHeight: "var(--leading-body)",
                        color: "var(--text-primary)",
                        background: "var(--surface)",
                        border: "var(--border-width) solid " + (invalid ? "var(--prov-verify-fill)" : "var(--border-strong)"),
                        borderRadius: "var(--radius-form)",
                        padding: copy["sca359440b18a"],
                        resize: "vertical",
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
                return React.createElement("figure", _extends({
                    style: {
                        margin: 0,
                        background: "var(--drawing-paper)",
                        border: "var(--stroke-thin) solid var(--border-strong)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: "hidden",
                        display: "grid",
                        gridTemplateRows: copy["s2e35bcb46136"],
                        alignContent: "space-between",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        position: "relative",
                        width: "100%",
                        aspectRatio: ratio,
                        containerType: "inline-size",
                        backgroundImage: [grid ? "var(--pattern-grid)" : null, hatched ? "var(--pattern-hatch)" : null].filter(Boolean).join(","),
                        backgroundColor: "var(--drawing-paper)"
                    }
                }, children, revision && React.createElement("span", {
                    style: {
                        position: "absolute",
                        top: "var(--space-2)",
                        right: "var(--space-2)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        padding: "0.0625rem 0.375rem",
                        border: "var(--stroke-thin) solid var(--drawing-ink)",
                        borderRadius: "50%",
                        color: "var(--drawing-ink)",
                        background: "var(--drawing-paper)"
                    }
                }, revision)), React.createElement("figcaption", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: "var(--space-3)",
                        padding: "var(--space-2) var(--space-3)",
                        borderTop: "var(--stroke-thin) solid var(--border-strong)",
                        background: "var(--surface-sunken)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)",
                        fontVariantNumeric: "var(--numeric-tabular)"
                    }
                }, React.createElement("span", {
                    style: {
                        color: "var(--text-primary)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase"
                    }
                }, label), React.createElement("span", {
                    style: {
                        display: "flex",
                        gap: "var(--space-3)",
                        flexWrap: "wrap"
                    }
                }, sheet && React.createElement("span", null, sheet), scale && React.createElement("span", null, "1:", scale), hash && React.createElement("span", null, hash))));
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
                const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
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
                return React.createElement("div", _extends({
                    "aria-hidden": "true",
                    onMouseEnter: () => setPaused(true),
                    onMouseLeave: () => setPaused(false),
                    style: {
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                        zIndex: 0,
                        background: "var(--surface-ink)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        display: "flex",
                        height: "100%",
                        width: "100%",
                        transform: `translateX(-${i * 100}%)`,
                        transition: anim ? copy["s20dec7226def"] : "none",
                        willChange: "transform"
                    }
                }, list.map((src, k) => React.createElement("img", {
                    key: k,
                    src: src,
                    alt: alt,
                    draggable: "false",
                    style: {
                        flex: "0 0 100%",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        userSelect: "none"
                    }
                }))), React.createElement("div", {
                    style: {
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: `linear-gradient(180deg, rgba(10,12,16,${Math.min(1, scrim + 0.15)}) 0%, rgba(10,12,16,${scrim}) 45%, rgba(10,12,16,${Math.min(1, scrim + 0.2)}) 100%)`
                    }
                }), n > 1 && React.createElement("div", {
                    style: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: "var(--space-4)",
                        display: "flex",
                        justifyContent: "center",
                        gap: "var(--space-2)"
                    }
                }, images.map((_, k) => React.createElement("span", {
                    key: k,
                    style: {
                        width: k === i % n ? "1.5rem" : "0.375rem",
                        height: "0.375rem",
                        borderRadius: "999px",
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
                return React.createElement("div", _extends({
                    style: {
                        display: "grid",
                        gap: "var(--space-4)",
                        width: "100%",
                        ...style
                    }
                }, props), React.createElement("form", {
                    onSubmit: e => {
                        e.preventDefault();
                        onSubmit && onSubmit(value);
                    },
                    style: {
                        display: "grid",
                        gap: "var(--space-4)",
                        padding: "var(--space-4)",
                        background: "var(--surface)",
                        border: "var(--border-width-strong) solid var(--border-strong)",
                        borderRadius: "var(--radius-card)",
                        boxShadow: "var(--elevation-raised)"
                    }
                }, React.createElement("textarea", {
                    rows: 2,
                    value: value,
                    onChange: e => setValue(e.target.value),
                    placeholder: placeholder,
                    "aria-label": copy["s57260354e46c"],
                    style: {
                        width: "100%",
                        boxSizing: "border-box",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        background: "transparent",
                        font: "inherit",
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-body-idea)",
                        lineHeight: "var(--leading-body)",
                        color: "var(--text-primary)",
                        padding: "var(--space-2)"
                    }
                }), React.createElement("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "var(--space-3)"
                    }
                }, React.createElement("button", {
                    type: "button",
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        appearance: "none",
                        font: "inherit",
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s821ab636ac83"],
                        minHeight: "var(--hit-min)",
                        background: "transparent",
                        color: "var(--text-primary)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)"
                    }
                }, React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        fontSize: "1.125rem"
                    }
                }, "add_photo_alternate"), copy["s6db5f378885d"]), React.createElement("button", {
                    type: "button",
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        appearance: "none",
                        font: "inherit",
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s821ab636ac83"],
                        minHeight: "var(--hit-min)",
                        background: "var(--surface-sunken)",
                        color: "var(--text-primary)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)"
                    }
                }, React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        fontSize: "1.125rem"
                    }
                }, "location_on"), location), React.createElement("button", {
                    type: "submit",
                    style: {
                        marginLeft: "auto",
                        appearance: "none",
                        font: "inherit",
                        fontSize: "var(--text-medium)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s06b7d83051cd"],
                        minHeight: "var(--hit-min)",
                        background: "var(--accent)",
                        color: "var(--color-white)",
                        border: "var(--border-width) solid var(--accent)",
                        borderRadius: "var(--radius-button)"
                    }
                }, submitLabel))), examples.length > 0 && React.createElement("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "var(--space-2)"
                    }
                }, React.createElement("span", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-muted)"
                    }
                }, copy["sa2c270123bd0"]), examples.map(ex => React.createElement("button", {
                    key: ex,
                    onClick: () => setValue(ex),
                    style: {
                        appearance: "none",
                        font: "inherit",
                        fontSize: "var(--text-small)",
                        padding: "0.1875rem 0.75rem",
                        background: "transparent",
                        color: "var(--link)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-tag)",
                        textAlign: "left"
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
                return React.createElement("div", _extends({
                    style: {
                        position: "relative",
                        zIndex: 1,
                        display: "grid",
                        gap: "var(--space-12)",
                        justifyItems: "center",
                        textAlign: "center",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-5)",
                        maxWidth: "var(--container-lg)"
                    }
                }, React.createElement("h1", null, headline), subhead && React.createElement("p", {
                    style: {
                        fontSize: "var(--text-large)",
                        color: "var(--scheme-text-secondary, var(--text-secondary))"
                    }
                }, subhead)), React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-4)",
                        width: "100%",
                        maxWidth: "var(--container-xl)",
                        textAlign: "left",
                        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,17rem),1fr))"
                    }
                }, doors.map(d => React.createElement(Door, _extends({
                    key: d.title
                }, d)))));
            }
            function Door({ eyebrow, title, description, cta, href = "#", meta }) {
                const [hover, setHover] = React.useState(false);
                return React.createElement("a", {
                    href: href,
                    onMouseEnter: () => setHover(true),
                    onMouseLeave: () => setHover(false),
                    style: {
                        display: "grid",
                        alignContent: "start",
                        gap: "var(--space-4)",
                        padding: "var(--space-6)",
                        background: "var(--surface)",
                        border: "var(--border-width) solid " + (hover ? "var(--border-strong)" : "var(--border)"),
                        borderRadius: "var(--radius-card)",
                        textDecoration: "none",
                        color: "var(--text-primary)",
                        boxShadow: hover ? "var(--elevation-raised)" : "var(--elevation-flat)",
                        transition: "var(--transition-control)"
                    }
                }, eyebrow && React.createElement("span", {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, eyebrow), React.createElement("h3", {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, title), React.createElement("p", {
                    style: {
                        fontSize: "var(--text-medium)",
                        color: "var(--text-secondary)"
                    }
                }, description), meta && React.createElement("p", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-muted)"
                    }
                }, meta), React.createElement("span", {
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                GBP: "£",
                USD: "$",
                NGN: "₦"
            };
            function PricingTable({ tiers = [], currencies = [copy["s402419e92096"], copy["sa26cdf3a6e70"], copy["sa74aa40897d1"]], currency, onCurrencyChange, style, ...props }) {
                const [internal, setInternal] = React.useState(currency || currencies[0]);
                const cur = currency || internal;
                const set = c => {
                    setInternal(c);
                    onCurrencyChange && onCurrencyChange(c);
                };
                const groups = [...new Set(tiers.map(t => t.group || copy["s19c73a5cdf34"]))];
                return React.createElement("div", _extends({
                    style: {
                        display: "grid",
                        gap: "var(--space-6)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        display: "flex",
                        justifyContent: "flex-end"
                    }
                }, React.createElement("div", {
                    role: "group",
                    "aria-label": copy["s3ac1a9ec4fa7"],
                    style: {
                        display: "flex",
                        gap: "var(--space-1)",
                        padding: "var(--space-1)",
                        background: "var(--surface-sunken)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)"
                    }
                }, currencies.map(c => {
                    const on = c === cur;
                    return React.createElement("button", {
                        key: c,
                        onClick: () => set(c),
                        "aria-pressed": on,
                        style: {
                            appearance: "none",
                            font: "inherit",
                            fontSize: "var(--text-small)",
                            fontWeight: "var(--font-weight-semibold)",
                            padding: copy["s87f82e0d251e"],
                            borderRadius: "var(--radius-button)",
                            border: "var(--border-width) solid " + (on ? "var(--border)" : "transparent"),
                            background: on ? "var(--surface)" : "transparent",
                            color: on ? "var(--text-primary)" : "var(--text-secondary)",
                            transition: "var(--transition-control)"
                        }
                    }, symbols[c], " ", c);
                }))), groups.map(g => React.createElement("div", {
                    key: g,
                    style: {
                        display: "grid",
                        gap: "var(--space-4)"
                    }
                }, React.createElement("p", {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, g), React.createElement("div", {
                    style: {
                        display: "flex",
                        gap: "var(--space-4)",
                        overflowX: "auto",
                        paddingBottom: "var(--space-2)"
                    }
                }, tiers.filter(t => (t.group || copy["s19c73a5cdf34"]) === g).map(t => React.createElement("div", {
                    key: t.name,
                    style: {
                        flex: "1 0 15rem",
                        minWidth: "15rem",
                        display: "grid",
                        alignContent: "start",
                        gap: "var(--space-4)",
                        padding: "var(--space-6)",
                        background: "var(--surface)",
                        border: "var(--border-width) solid " + (t.featured ? "var(--accent)" : "var(--border)"),
                        borderRadius: "var(--radius-card)",
                        fontVariantNumeric: "var(--numeric-tabular)"
                    }
                }, React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-1)"
                    }
                }, React.createElement("h4", {
                    style: {
                        fontSize: "var(--text-h6)"
                    }
                }, t.name), t.audience && React.createElement("p", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, t.audience)), React.createElement("p", {
                    style: {
                        fontSize: "var(--text-h4)",
                        fontWeight: "var(--font-weight-medium)",
                        lineHeight: "var(--leading-tight)"
                    }
                }, t.price && t.price[cur] ? t.price[cur] : t.priceNote || "—", t.per && React.createElement("span", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)",
                        fontWeight: "var(--font-weight-regular)"
                    }
                }, " ", t.per)), React.createElement("ul", {
                    style: {
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "grid",
                        gap: "var(--space-2)",
                        fontSize: "var(--text-small)"
                    }
                }, (t.includes || []).map((f, i) => React.createElement("li", {
                    key: i,
                    style: {
                        display: "grid",
                        gridTemplateColumns: "1rem 1fr",
                        gap: "var(--space-2)",
                        alignItems: "baseline"
                    }
                }, React.createElement("span", {
                    "aria-hidden": "true",
                    style: {
                        color: "var(--prov-user-ink)"
                    }
                }, "\u2713"), f)))))))));
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
                jurisdiction: "public",
                office: "domain",
                manufacturer: "factory"
            };
            function ProfileCard({ name, kind = "jurisdiction", tier = copy["sc97454a01ccf"], signer, credential, price, adoption, documents = [], style, ...props }) {
                const [hover, setHover] = React.useState(false);
                const t = tiers[tier] || tiers.Generic;
                return React.createElement("div", _extends({
                    onMouseEnter: () => setHover(true),
                    onMouseLeave: () => setHover(false),
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-card)",
                        padding: "var(--space-6)",
                        display: "grid",
                        gap: "var(--space-4)",
                        alignContent: "start",
                        boxShadow: hover ? "var(--elevation-raised)" : "var(--elevation-flat)",
                        transition: "var(--transition-control)",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        gap: "var(--space-4)"
                    }
                }, React.createElement("span", {
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        color: "var(--text-secondary)"
                    }
                }, React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        fontSize: "1rem"
                    }
                }, kinds[kind] || "public"), kind), React.createElement("span", {
                    style: {
                        padding: "0.125rem 0.5rem",
                        background: t.bg,
                        color: t.ink,
                        border: "var(--stroke-thin) solid " + t.border,
                        borderRadius: "var(--radius-drawing)",
                        fontSize: "var(--text-tiny)",
                        fontWeight: "var(--font-weight-bold)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap"
                    }
                }, tier, " \xB7 ", t.note)), React.createElement("h4", {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, name), documents.length > 0 && React.createElement("ul", {
                    style: {
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "var(--space-2)"
                    }
                }, documents.map((d, i) => React.createElement("li", {
                    key: i,
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        padding: "0.0625rem 0.375rem",
                        background: "var(--surface-sunken)",
                        border: "var(--stroke-fine) solid var(--border)",
                        borderRadius: "var(--radius-drawing)",
                        color: "var(--text-secondary)"
                    }
                }, d))), signer && React.createElement("p", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, copy["sfdfd43ff6994"], React.createElement("span", {
                    style: {
                        color: "var(--text-primary)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, signer), credential ? " · " + credential : ""), React.createElement("div", {
                    style: {
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: "var(--space-4)",
                        paddingTop: "var(--space-4)",
                        borderTop: "var(--divider-width) solid var(--divider)"
                    }
                }, React.createElement("span", {
                    style: {
                        fontSize: "var(--text-h6)",
                        fontWeight: "var(--font-weight-medium)"
                    }
                }, price), adoption != null && React.createElement("span", {
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
                    icon: "verified_user"
                },
                "Verified + Insured": {
                    bg: "var(--prov-user-quiet)",
                    ink: "var(--prov-user-ink)",
                    border: "var(--prov-user-fill)",
                    icon: "shield"
                }
            };
            function SignerCard({ name, credential, registry, jurisdictions = [], disciplines = [], level = copy["s4f7838402f37"], reviewEvidence, style, ...props }) {
                const l = levels[level] || levels.Verified;
                return React.createElement("div", _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-card)",
                        padding: "var(--space-6)",
                        display: "grid",
                        gap: "var(--space-4)",
                        alignContent: "start",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        gap: "var(--space-4)"
                    }
                }, React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-1)"
                    }
                }, React.createElement("h4", {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, name), React.createElement("p", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, credential)), React.createElement("span", {
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-1)",
                        padding: "0.1875rem 0.5rem",
                        background: l.bg,
                        color: l.ink,
                        border: "var(--stroke-thin) solid " + l.border,
                        borderRadius: "var(--radius-drawing)",
                        fontSize: "var(--text-tiny)",
                        fontWeight: "var(--font-weight-bold)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap"
                    }
                }, React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        fontSize: "0.875rem"
                    }
                }, l.icon), level)), registry && React.createElement("p", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)"
                    }
                }, "registry: ", registry), React.createElement("dl", {
                    style: {
                        margin: 0,
                        display: "grid",
                        gap: "var(--space-3)"
                    }
                }, [[copy["s1db075e5f263"], jurisdictions], [copy["s10851b812123"], disciplines]].map(([k, v]) => React.createElement("div", {
                    key: k,
                    style: {
                        display: "grid",
                        gap: "var(--space-2)"
                    }
                }, React.createElement("dt", {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)"
                    }
                }, k), React.createElement("dd", {
                    style: {
                        margin: 0,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "var(--space-2)"
                    }
                }, v.map(x => React.createElement("span", {
                    key: x,
                    style: {
                        fontSize: "var(--text-small)",
                        padding: "0.0625rem 0.5rem",
                        background: "var(--surface-sunken)",
                        border: "var(--stroke-fine) solid var(--border)",
                        borderRadius: "var(--radius-badge)"
                    }
                }, x)))))), reviewEvidence && React.createElement("p", {
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
                return React.createElement("footer", _extends({
                    className: "scheme-ink",
                    style: {
                        paddingInline: "var(--page-gutter)",
                        paddingBlock: "var(--space-16)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    className: "dl-container",
                    style: {
                        display: "grid",
                        gap: "var(--space-12)"
                    }
                }, React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-10)",
                        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,13rem),1fr))"
                    }
                }, React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-4)",
                        alignContent: "start"
                    }
                }, React.createElement(__ds_scope.Wordmark, {
                    size: "1.375rem",
                    tone: "inverse"
                }), React.createElement("p", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-inverse-secondary)",
                        maxWidth: "20rem"
                    }
                }, copy["sc1714d240dda"])), sitemap.map(col => React.createElement("nav", {
                    key: col.title,
                    style: {
                        display: "grid",
                        gap: "var(--space-3)",
                        alignContent: "start"
                    }
                }, React.createElement("p", {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        color: "var(--text-inverse-secondary)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, col.title), col.links.map(l => React.createElement("a", {
                    key: l,
                    href: "#",
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--color-white)",
                        textDecoration: "none"
                    }
                }, l))))), React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-4)",
                        paddingTop: "var(--space-6)",
                        borderTop: "var(--divider-width) solid var(--border-inverse)",
                        fontSize: "var(--text-small)",
                        color: "var(--text-inverse-secondary)",
                        maxWidth: "var(--container-xl)"
                    }
                }, React.createElement("p", null, copy["sdf4319daa441"]), React.createElement("p", null, copy["s4802ead5860b"]), React.createElement("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "var(--space-6)",
                        paddingTop: "var(--space-2)"
                    }
                }, React.createElement("span", null, copy["s6e76565fa496"]), [copy["sba445cff3898"], copy["s1f54c7c2ecaa"], copy["se69e06144877"], copy["s011912d0322f"]].map(l => React.createElement("a", {
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
                return React.createElement("header", _extends({
                    style: {
                        position: "relative",
                        zIndex: 99,
                        background: "var(--surface-tint)",
                        borderBottom: "var(--border-width) solid var(--border)",
                        paddingInline: "var(--page-gutter)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    className: "dl-container",
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-6)",
                        minHeight: "4.5rem",
                        justifyContent: "space-between"
                    }
                }, React.createElement(__ds_scope.Wordmark, {
                    href: "#",
                    size: "1.375rem",
                    tone: "ink",
                    onClick: e => go(e, copy["s3a78695388b3"])
                }), React.createElement("nav", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-1)",
                        flex: 1
                    }
                }, nav.map(n => n.items ? React.createElement("div", {
                    key: n.label,
                    onMouseEnter: () => setOpen(n.label),
                    onMouseLeave: () => setOpen(null),
                    style: {
                        position: "relative"
                    }
                }, React.createElement("button", {
                    "aria-expanded": open === n.label,
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        appearance: "none",
                        background: "none",
                        border: "none",
                        font: "inherit",
                        fontSize: "var(--text-medium)",
                        color: "var(--text-primary)",
                        padding: "var(--space-3) var(--space-4)"
                    }
                }, n.label, React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        fontSize: "1.125rem",
                        transform: open === n.label ? "rotate(180deg)" : "none",
                        transition: copy["s6910fe1b338b"]
                    }
                }, "keyboard_arrow_down")), open === n.label && React.createElement("div", {
                    style: {
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        minWidth: "20rem",
                        display: "grid",
                        gap: "var(--space-1)",
                        padding: "var(--space-3)",
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-form)",
                        boxShadow: "var(--elevation-overlay)"
                    }
                }, n.items.map(it => React.createElement("a", {
                    key: it.label,
                    href: it.href,
                    onClick: e => go(e, it.label),
                    style: {
                        display: "grid",
                        gap: "0.125rem",
                        padding: "var(--space-2) var(--space-3)",
                        borderRadius: "var(--radius-checkbox)",
                        textDecoration: "none",
                        color: "var(--text-primary)",
                        background: active === it.label ? "var(--surface-sunken)" : "transparent"
                    }
                }, React.createElement("span", {
                    style: {
                        fontSize: "var(--text-medium)",
                        fontWeight: "var(--font-weight-medium)"
                    }
                }, it.label), it.note && React.createElement("span", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, it.note))))) : React.createElement("a", {
                    key: n.label,
                    href: n.href,
                    onClick: e => go(e, n.label),
                    style: {
                        padding: "var(--space-3) var(--space-4)",
                        fontSize: "var(--text-medium)",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        fontWeight: active === n.label ? "var(--font-weight-semibold)" : "var(--font-weight-regular)"
                    }
                }, n.label))), React.createElement("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-4)"
                    }
                }, React.createElement("a", {
                    href: "#",
                    style: {
                        fontSize: "var(--text-medium)",
                        color: "var(--text-primary)",
                        textDecoration: "none"
                    }
                }, copy["sbfd402b2f6f3"]), React.createElement("a", {
                    href: "#",
                    onClick: e => go(e, copy["sa68388d7143f"]),
                    style: {
                        padding: copy["s821ab636ac83"],
                        background: "var(--accent)",
                        color: "var(--color-white)",
                        border: "var(--border-width) solid var(--accent)",
                        borderRadius: "var(--radius-button)",
                        fontWeight: "var(--font-weight-medium)",
                        textDecoration: "none",
                        whiteSpace: "nowrap"
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
                return React.createElement("div", _extends({
                    style: {
                        background: "var(--flag-quiet)",
                        border: "var(--border-width) solid var(--color-amber-lighter)",
                        borderTop: "var(--stroke-heavy) solid var(--flag)",
                        borderRadius: "var(--radius-drawing)",
                        padding: "var(--space-5)",
                        display: "grid",
                        gap: "var(--space-4)",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-1)"
                    }
                }, React.createElement("h5", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: "var(--text-h6)",
                        color: "var(--text-primary)"
                    }
                }, React.createElement("span", {
                    "aria-hidden": "true",
                    style: {
                        color: "var(--flag-ink)"
                    }
                }, "\u26A0"), " ", title), note && React.createElement("p", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, note)), React.createElement("ul", {
                    style: {
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "grid",
                        gap: "var(--space-2)"
                    }
                }, assumptions.map((a, i) => React.createElement("li", {
                    key: i,
                    style: {
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: "var(--space-4)",
                        padding: "var(--space-3) 0",
                        borderTop: i === 0 ? "none" : "var(--divider-width) solid var(--color-amber-lighter)"
                    }
                }, React.createElement("span", {
                    style: {
                        fontSize: "var(--text-medium)"
                    }
                }, a.text, a.term && React.createElement("span", {
                    style: {
                        color: "var(--text-muted)",
                        fontSize: "var(--text-small)"
                    },
                    title: a.term
                }, " (", a.term, ")")), React.createElement("button", {
                    onClick: () => onEdit && onEdit(a, i),
                    style: {
                        appearance: "none",
                        background: "none",
                        border: "none",
                        padding: 0,
                        font: "inherit",
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--link)",
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                        flex: "0 0 auto"
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
                return React.createElement("div", _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderLeft: "var(--stroke-heavy) solid var(--accent)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: "hidden",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "var(--space-4)",
                        padding: "var(--space-3) var(--space-4)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        background: "var(--surface-sunken)"
                    }
                }, React.createElement("span", {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--text-secondary)"
                    }
                }, title), React.createElement("span", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)"
                    }
                }, changes.length, " ", changes.length === 1 ? "change" : "changes")), React.createElement("ul", {
                    style: {
                        listStyle: "none",
                        margin: 0,
                        padding: 0
                    }
                }, changes.map((c, i) => React.createElement("li", {
                    key: i,
                    style: {
                        display: "grid",
                        gridTemplateColumns: copy["s666c36b856e9"],
                        gap: "var(--space-4)",
                        alignItems: "baseline",
                        padding: "var(--space-3) var(--space-4)",
                        borderBottom: "var(--divider-width) solid var(--divider)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)"
                    }
                }, React.createElement("span", {
                    style: {
                        color: "var(--text-primary)"
                    }
                }, c.target), c.from !== undefined || c.to !== undefined ? React.createElement("span", {
                    style: {
                        whiteSpace: "nowrap"
                    }
                }, React.createElement("span", {
                    style: {
                        color: "var(--text-muted)",
                        textDecoration: "line-through"
                    }
                }, c.from), React.createElement("span", {
                    style: {
                        color: "var(--text-muted)"
                    }
                }, " \u2192 "), React.createElement("span", {
                    style: {
                        color: "var(--accent-ink)",
                        fontWeight: "var(--font-weight-semibold)"
                    }
                }, c.to), c.unit && React.createElement("span", {
                    style: {
                        color: "var(--text-secondary)"
                    }
                }, " ", c.unit)) : React.createElement("span", {
                    style: {
                        color: "var(--text-secondary)"
                    }
                }, c.note)))), React.createElement("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "var(--space-4)",
                        padding: "var(--space-3) var(--space-4)"
                    }
                }, React.createElement("span", {
                    style: {
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)"
                    }
                }, summary), React.createElement("button", {
                    onClick: onUndo,
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-1)",
                        appearance: "none",
                        font: "inherit",
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["se84600f448b8"],
                        background: "transparent",
                        color: "var(--text-primary)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)",
                        whiteSpace: "nowrap"
                    }
                }, React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        fontSize: "1rem"
                    }
                }, "undo"), undoLabel)));
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
                return React.createElement("div", _extends({
                    style: {
                        position: "relative",
                        overflow: "hidden",
                        ...style
                    }
                }, props), children, React.createElement("div", {
                    "aria-hidden": "true",
                    style: {
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        placeItems: "center",
                        pointerEvents: "none",
                        userSelect: "none"
                    }
                }, React.createElement("div", {
                    style: {
                        transform: "rotate(var(--concept-watermark-angle))",
                        display: "grid",
                        gap: "0.75em",
                        width: "180%"
                    }
                }, Array.from({
                    length: repeat
                }).map((_, i) => React.createElement("div", {
                    key: i,
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontWeight: "var(--font-weight-bold)",
                        fontSize: "clamp(0.75rem,2.4cqw,1.5rem)",
                        letterSpacing: "var(--tracking-label)",
                        color: "var(--concept-watermark-color)",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        lineHeight: 1
                    }
                }, text)))), React.createElement("span", {
                    style: {
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        padding: "0.25rem 0.625rem",
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
                    icon: "person",
                    fill: "var(--prov-user-fill)",
                    quiet: "var(--prov-user-quiet)",
                    ink: "var(--prov-user-ink)"
                },
                project: {
                    label: copy["s8335874efbf3"],
                    icon: "folder",
                    fill: "var(--prov-project-fill)",
                    quiet: "var(--prov-project-quiet)",
                    ink: "var(--prov-project-ink)"
                },
                reference: {
                    label: copy["sd7fef7edcc4a"],
                    icon: "layers",
                    fill: "var(--prov-reference-fill)",
                    quiet: "var(--prov-reference-quiet)",
                    ink: "var(--prov-reference-ink)"
                },
                inferred: {
                    label: copy["sdfc05249aa63"],
                    icon: "auto_awesome",
                    fill: "var(--prov-inferred-fill)",
                    quiet: "var(--prov-inferred-quiet)",
                    ink: "var(--prov-inferred-ink)"
                },
                verify: {
                    label: copy["s3ac584783596"],
                    icon: "warning",
                    fill: "var(--prov-verify-fill)",
                    quiet: "var(--prov-verify-quiet)",
                    ink: "var(--prov-verify-ink)"
                },
                autofix: {
                    label: copy["sd2cf3dbc2fc9"],
                    icon: "build",
                    fill: "var(--prov-autofix-fill)",
                    quiet: "var(--prov-autofix-quiet)",
                    ink: "var(--prov-autofix-ink)"
                }
            };
            function ProvenanceChip({ source = "user", label, confidence, rules = [], expanded = false, expandable = false, style, ...props }) {
                const [open, setOpen] = React.useState(expanded);
                const s = provenanceSources[source] || provenanceSources.user;
                const show = expandable ? open : expanded;
                const Tag = expandable ? "button" : "span";
                return React.createElement("span", _extends({
                    style: {
                        display: "inline-grid",
                        gap: "var(--space-2)",
                        verticalAlign: "top",
                        ...style
                    }
                }, props), React.createElement(Tag, {
                    onClick: expandable ? () => setOpen(!open) : undefined,
                    "aria-expanded": expandable ? open : undefined,
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        padding: "0.0625rem 0.5rem 0.0625rem 0.375rem",
                        font: "inherit",
                        fontSize: "var(--text-tiny)",
                        fontWeight: "var(--font-weight-semibold)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        background: s.quiet,
                        color: s.ink,
                        border: "var(--stroke-thin) solid " + s.fill,
                        borderRadius: "var(--radius-drawing)",
                        whiteSpace: "nowrap",
                        width: "fit-content"
                    }
                }, React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        fontSize: "0.875rem"
                    }
                }, s.icon), label || s.label), show && React.createElement("span", {
                    style: {
                        display: "grid",
                        gap: "var(--space-1)",
                        padding: "var(--space-3)",
                        background: "var(--surface)",
                        border: "var(--stroke-thin) solid var(--border)",
                        borderLeft: "var(--stroke-heavy) solid " + s.fill,
                        borderRadius: "var(--radius-drawing)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)",
                        textAlign: "left"
                    }
                }, React.createElement("span", null, "source: ", s.label.toLowerCase()), confidence != null && React.createElement("span", null, "confidence: ", confidence), rules.length > 0 && React.createElement("span", null, "rules: ", rules.join(", "))));
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
                const items = missing.map(m => typeof m === "string" ? {
                    label: m
                } : m);
                const outstanding = items.filter((m, i) => !(filled[i] && filled[i].trim())).length;
                const blocked = outstanding > 0;
                return React.createElement("div", _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: "hidden",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "var(--space-4)",
                        padding: "var(--space-4) var(--space-5)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        background: "var(--surface-sunken)"
                    }
                }, React.createElement("h5", {
                    style: {
                        fontSize: "var(--text-h6)"
                    }
                }, title), React.createElement("span", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)"
                    }
                }, rows.length, " elements")), React.createElement("div", {
                    style: {
                        overflowX: "auto"
                    }
                }, React.createElement("table", {
                    style: {
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "var(--text-small)"
                    }
                }, React.createElement("thead", null, React.createElement("tr", null, [copy["s62a6da8735c1"], copy["s8e37953d23da"], copy["s0e570ca6fabe"]].map(h => React.createElement("th", {
                    key: h,
                    style: {
                        textAlign: "left",
                        padding: "var(--space-2) var(--space-5)",
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        fontWeight: "var(--font-weight-semibold)",
                        borderBottom: "var(--divider-width) solid var(--border)"
                    }
                }, h)))), React.createElement("tbody", null, rows.map((r, i) => {
                    const s = __ds_scope.provenanceSources[r.source] || __ds_scope.provenanceSources.user;
                    return React.createElement("tr", {
                        key: i,
                        style: {
                            borderBottom: "var(--divider-width) solid var(--divider)"
                        }
                    }, React.createElement("td", {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            whiteSpace: "nowrap"
                        }
                    }, r.object), React.createElement("td", {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-tiny)",
                            minWidth: "9rem"
                        }
                    }, r.value), React.createElement("td", {
                        style: {
                            padding: "var(--space-3) var(--space-5)"
                        }
                    }, React.createElement("span", {
                        style: {
                            display: "inline-flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: "var(--space-2)"
                        }
                    }, React.createElement(__ds_scope.ProvenanceChip, {
                        source: r.source,
                        label: r.sourceLabel
                    }), r.confidence != null && React.createElement("span", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-tiny)",
                            color: "var(--text-secondary)"
                        }
                    }, r.confidence), r.verify && React.createElement(__ds_scope.ProvenanceChip, {
                        source: "verify",
                        label: copy["seea2745e2867"]
                    }))));
                })))), items.length > 0 && React.createElement("div", {
                    style: {
                        padding: "var(--space-4) var(--space-5)",
                        background: "var(--flag-quiet)",
                        borderTop: "var(--divider-width) solid var(--color-amber-lighter)"
                    }
                }, React.createElement("p", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--flag-ink)",
                        marginBottom: "var(--space-3)"
                    }
                }, React.createElement("span", {
                    "aria-hidden": "true"
                }, "\u26A0"), copy["s241a729ae0c0"]), missingInputs ? React.createElement("div", {
                    style: {
                        display: "grid",
                        gap: "var(--space-2)"
                    }
                }, items.map((m, i) => React.createElement("label", {
                    key: i,
                    style: {
                        display: "grid",
                        gridTemplateColumns: "minmax(8rem,1fr) 2fr",
                        gap: "var(--space-3)",
                        alignItems: "center",
                        fontSize: "var(--text-small)"
                    }
                }, React.createElement("span", null, m.label), React.createElement("input", {
                    value: filled[i] || "",
                    placeholder: m.placeholder || "—",
                    onChange: e => setFilled({
                        ...filled,
                        [i]: e.target.value
                    }),
                    style: {
                        width: "100%",
                        boxSizing: "border-box",
                        font: "inherit",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        padding: copy["se720827e5978"],
                        background: "var(--surface)",
                        color: "var(--text-primary)",
                        border: "var(--stroke-thin) solid var(--flag)",
                        borderRadius: "var(--radius-drawing)"
                    }
                })))) : React.createElement("ul", {
                    style: {
                        margin: 0,
                        paddingLeft: "var(--space-5)",
                        fontSize: "var(--text-small)",
                        color: "var(--text-primary)"
                    }
                }, items.map((m, i) => React.createElement("li", {
                    key: i,
                    style: {
                        marginBottom: "var(--space-1)"
                    }
                }, typeof m === "string" ? m : m.label)))), (onConfirm || onEdit) && React.createElement("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "var(--space-3)",
                        padding: "var(--space-4) var(--space-5)",
                        borderTop: "var(--divider-width) solid var(--border)"
                    }
                }, onConfirm && React.createElement("button", {
                    onClick: blocked ? undefined : onConfirm,
                    disabled: blocked,
                    "aria-disabled": blocked,
                    style: {
                        appearance: "none",
                        font: "inherit",
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s821ab636ac83"],
                        background: "var(--accent)",
                        color: "var(--color-white)",
                        border: "var(--border-width) solid var(--accent)",
                        borderRadius: "var(--radius-button)",
                        opacity: blocked ? 0.5 : 1,
                        cursor: blocked ? "not-allowed" : "pointer"
                    }
                }, confirmLabel), onEdit && React.createElement("button", {
                    onClick: onEdit,
                    style: {
                        appearance: "none",
                        font: "inherit",
                        fontSize: "var(--text-small)",
                        fontWeight: "var(--font-weight-medium)",
                        padding: copy["s821ab636ac83"],
                        background: "transparent",
                        color: "var(--text-primary)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-button)"
                    }
                }, copy["s464c4ffd019e"]), onConfirm && blocked && confirmCaption && React.createElement("span", {
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
                return React.createElement("div", _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: "hidden",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        padding: "var(--space-4) var(--space-5)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        background: "var(--surface-sunken)"
                    }
                }, React.createElement("h5", {
                    style: {
                        fontSize: "var(--text-h6)"
                    }
                }, title)), React.createElement("ul", {
                    style: {
                        listStyle: "none",
                        margin: 0,
                        padding: 0
                    }
                }, items.map((it, i) => {
                    const s = states[it.state] || states.none;
                    return React.createElement("li", {
                        key: i,
                        style: {
                            display: "grid",
                            gridTemplateColumns: copy["sb6aecc029983"],
                            gap: "var(--space-4)",
                            alignItems: "baseline",
                            padding: "var(--space-4) var(--space-5)",
                            borderBottom: "var(--divider-width) solid var(--divider)"
                        }
                    }, React.createElement("span", {
                        "aria-hidden": "true",
                        style: {
                            color: s.color,
                            fontWeight: "var(--font-weight-semibold)"
                        }
                    }, s.glyph), React.createElement("span", null, React.createElement("span", {
                        style: {
                            display: "block",
                            fontSize: "var(--text-medium)"
                        }
                    }, it.item), it.detail && React.createElement("span", {
                        style: {
                            display: "block",
                            fontSize: "var(--text-small)",
                            color: "var(--text-secondary)"
                        }
                    }, it.detail)), React.createElement("span", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-tiny)",
                            letterSpacing: "var(--tracking-label)",
                            textTransform: "uppercase",
                            color: s.color,
                            whiteSpace: "nowrap"
                        }
                    }, s.label));
                })), note && React.createElement("p", {
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
                    bg: "transparent"
                }
            };
            function StandardsReport({ profile = copy["s0ec469a0db44"], version, rows = [], notPerformed = [], style, ...props }) {
                return React.createElement("div", _extends({
                    style: {
                        background: "var(--surface)",
                        border: "var(--border-width) solid var(--border)",
                        borderRadius: "var(--radius-drawing)",
                        overflow: "hidden",
                        fontVariantNumeric: "var(--numeric-tabular)",
                        ...style
                    }
                }, props), React.createElement("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: "var(--space-3)",
                        padding: "var(--space-4) var(--space-5)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        background: "var(--surface-sunken)"
                    }
                }, React.createElement("h5", {
                    style: {
                        fontSize: "var(--text-h6)"
                    }
                }, copy["scd7960c32738"]), React.createElement("span", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--text-secondary)"
                    }
                }, profile, version ? " · " + version : "")), React.createElement("div", {
                    style: {
                        overflowX: "auto"
                    }
                }, React.createElement("table", {
                    style: {
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "var(--text-small)",
                        minWidth: "32rem"
                    }
                }, React.createElement("thead", null, React.createElement("tr", null, ["", copy["s9d60841e0a78"], copy["sdfaaa170c07d"], copy["sd6bd8c0aeee8"]].map((h, i) => React.createElement("th", {
                    key: i,
                    style: {
                        textAlign: "left",
                        padding: "var(--space-2) var(--space-5)",
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        fontWeight: "var(--font-weight-semibold)",
                        borderBottom: "var(--divider-width) solid var(--border)",
                        width: i === 0 ? "3rem" : undefined
                    }
                }, h)))), React.createElement("tbody", null, rows.map((r, i) => {
                    const s = states[r.state] || states.none;
                    return React.createElement("tr", {
                        key: i,
                        style: {
                            borderBottom: "var(--divider-width) solid var(--divider)",
                            background: s.bg
                        }
                    }, React.createElement("td", {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            color: s.color,
                            fontWeight: "var(--font-weight-semibold)"
                        }
                    }, React.createElement("span", {
                        "aria-hidden": "true"
                    }, s.glyph), React.createElement("span", {
                        style: {
                            position: "absolute",
                            width: 1,
                            height: 1,
                            overflow: "hidden",
                            clip: "rect(0 0 0 0)"
                        }
                    }, s.label)), React.createElement("td", {
                        style: {
                            padding: "var(--space-3) var(--space-5)"
                        }
                    }, r.check, r.detail && React.createElement("span", {
                        style: {
                            display: "block",
                            color: "var(--text-secondary)",
                            fontSize: "var(--text-tiny)"
                        }
                    }, r.detail)), React.createElement("td", {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-tiny)",
                            whiteSpace: "nowrap"
                        }
                    }, r.ruleId), React.createElement("td", {
                        style: {
                            padding: "var(--space-3) var(--space-5)",
                            color: "var(--text-secondary)",
                            fontSize: "var(--text-tiny)"
                        }
                    }, r.document));
                })))), React.createElement("div", {
                    style: {
                        padding: "var(--space-4) var(--space-5)",
                        background: "var(--surface-sunken)",
                        borderTop: "var(--border-width) solid var(--border-strong)"
                    }
                }, React.createElement("p", {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--text-primary)",
                        marginBottom: "var(--space-2)"
                    }
                }, copy["s014146d8dfdd"]), React.createElement("ul", {
                    style: {
                        margin: 0,
                        paddingLeft: "var(--space-5)",
                        fontSize: "var(--text-small)",
                        color: "var(--text-secondary)",
                        display: "grid",
                        gap: "var(--space-1)"
                    }
                }, notPerformed.map((n, i) => React.createElement("li", {
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
                return React.createElement("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "11rem 1fr",
                        gap: "var(--space-4)",
                        padding: "0.3125rem 0"
                    }
                }, React.createElement("span", {
                    style: {
                        color: "var(--alpha-white-60)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--tracking-label)",
                        fontSize: "var(--text-tiny)"
                    }
                }, label), React.createElement("span", {
                    style: {
                        color: tone || "var(--color-white)"
                    }
                }, children));
            }
            function VerificationStamp({ profiles = [], checksPerformed = 0, checksFlagged = 0, checksNotPerformed = [], unverifiedElements = 0, signer = null, drawingHash, revision, timestamp, style, ...props }) {
                const signed = !!signer;
                return React.createElement("div", _extends({
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
                }, props), React.createElement("div", {
                    style: {
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "var(--space-3)",
                        paddingBottom: "var(--space-3)",
                        borderBottom: "var(--divider-width) solid var(--border-inverse)"
                    }
                }, React.createElement("span", {
                    style: {
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        fontWeight: "var(--font-weight-bold)"
                    }
                }, copy["s7c728caa899b"]), React.createElement("span", {
                    style: {
                        padding: "0.125rem 0.5rem",
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        fontWeight: "var(--font-weight-bold)",
                        background: signed ? "var(--prov-user-fill)" : "var(--prov-verify-fill)",
                        color: signed ? "var(--color-white)" : "var(--color-neutral-darkest)"
                    }
                }, signed ? copy["s701723fe5f16"] : copy["s0839843fa6f8"])), React.createElement("div", {
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
                }, drawingHash, revision ? "  rev " + revision : ""), React.createElement(Row, {
                    label: copy["s115a2cc92c10"]
                }, timestamp)), checksNotPerformed.length > 0 && React.createElement("div", {
                    style: {
                        paddingTop: "var(--space-3)",
                        borderTop: "var(--divider-width) solid var(--border-inverse)"
                    }
                }, React.createElement("p", {
                    style: {
                        fontSize: "var(--text-tiny)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        color: "var(--color-amber-light)",
                        marginBottom: "var(--space-2)"
                    }
                }, copy["sc91a198ac3c5"]), React.createElement("ul", {
                    style: {
                        margin: 0,
                        paddingLeft: "var(--space-5)",
                        fontSize: "var(--text-tiny)",
                        color: "var(--alpha-white-60)",
                        display: "grid",
                        gap: "var(--space-1)"
                    }
                }, checksNotPerformed.map((c, i) => React.createElement("li", {
                    key: i
                }, c)))), React.createElement("p", {
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
                return React.createElement("div", _extends({
                    style: {
                        border: "var(--border-width) solid var(--border-strong)",
                        borderRadius: "var(--radius-drawing)",
                        background: "var(--surface)",
                        padding: "var(--space-6)",
                        display: "grid",
                        gap: "var(--space-5)",
                        ...style
                    }
                }, props), React.createElement("h4", {
                    style: {
                        fontSize: "var(--text-h5)"
                    }
                }, title), React.createElement("ul", {
                    style: {
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "grid",
                        gap: "var(--space-1)"
                    }
                }, items.map((it, i) => React.createElement("li", {
                    key: i,
                    style: {
                        display: "grid",
                        gridTemplateColumns: "1.25rem 1fr",
                        gap: "var(--space-3)",
                        alignItems: "baseline",
                        padding: "var(--space-3) 0",
                        borderTop: i === 0 ? "none" : "var(--divider-width) solid var(--divider)"
                    }
                }, React.createElement("span", {
                    className: "dl-icon",
                    "aria-hidden": "true",
                    style: {
                        color: "var(--prov-verify-ink)",
                        fontSize: "1.125rem"
                    }
                }, "close"), React.createElement("span", {
                    style: {
                        fontSize: "var(--text-medium)"
                    }
                }, it)))), footnote && React.createElement("p", {
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
function Section({ scheme = "canvas", children, style, ...props }) {
    return (<section className={copy["s9ba7b827d3b1"] + scheme} style={style} {...props}>
      <div className="dl-container">{children}</div>
    </section>);
}
function SectionHead({ eyebrow, title, lead, align = "left", max = "var(--container-lg)" }) {
    return (<div style={{
            display: "grid", gap: "var(--space-4)", marginBottom: "var(--space-12)",
            maxWidth: max, marginInline: align === "center" ? "auto" : undefined,
            textAlign: align,
        }}>
      {eyebrow && <p style={{
                fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase", fontWeight: "var(--font-weight-semibold)",
                color: "var(--scheme-text-secondary, var(--text-secondary))",
            }}>{eyebrow}</p>}
      {title && <h2>{title}</h2>}
      {lead && <p style={{ fontSize: "var(--text-large)", color: "var(--scheme-text-secondary, var(--text-secondary))" }}>{lead}</p>}
    </div>);
}
function Grid({ min = "17rem", gap = "var(--space-6)", children, style }) {
    return <div style={{ display: "grid", gap, gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${min}),1fr))`, ...style }}>{children}</div>;
}
function Split({ children, ratio = "1fr 1fr", gap = "var(--space-12)", style }) {
    return <div style={{ display: "grid", gridTemplateColumns: ratio, gap, alignItems: "center", ...style }}>{children}</div>;
}
function PlanStub({ rooms = 3 }) {
    return (<div style={{ position: "absolute", inset: "12%", border: "var(--stroke-heavy) solid var(--drawing-ink)", display: "grid", gridTemplateColumns: `2fr ${"1fr ".repeat(rooms - 1)}` }}>
      {Array.from({ length: rooms }).map((_, i) => (<div key={i} style={{ borderRight: i < rooms - 1 ? "var(--stroke-medium) solid var(--drawing-ink)" : "none" }}/>))}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: "-9%", borderTop: "var(--stroke-thin) solid var(--drawing-ink-faint)" }}/>
    </div>);
}
function Dimension({ label, style }) {
    return (<div style={{ position: "absolute", display: "flex", alignItems: "center", gap: "var(--space-2)", ...style }}>
      <span style={{ flex: 1, borderTop: "var(--stroke-thin) solid var(--drawing-ink)", position: "relative" }}/>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", background: "var(--drawing-paper)", padding: "0 4px", color: "var(--drawing-ink)" }}>{label}</span>
      <span style={{ flex: 1, borderTop: "var(--stroke-thin) solid var(--drawing-ink)" }}/>
    </div>);
}
function CodeBlock({ lines = [], style }) {
    return (<pre style={{
            margin: 0, padding: "var(--space-5)", background: "var(--surface-ink)",
            color: "var(--color-white)", borderRadius: "var(--radius-drawing)",
            fontFamily: "var(--font-mono)", fontSize: "var(--text-small)",
            lineHeight: "var(--leading-mono)", overflowX: "auto", ...style,
        }}>
      {lines.map((l, i) => (<div key={i} style={{ color: l.tone || "var(--color-white)" }}>{l.text !== undefined ? l.text : l}</div>))}
    </pre>);
}
function FactRow({ items = [], scheme }) {
    return (<div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-8)" }}>
      {items.map((it) => (<div key={it.label} style={{ display: "grid", gap: "var(--space-1)" }}>
          <span style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--scheme-text-secondary, var(--text-secondary))" }}>{it.label}</span>
          <span style={{ fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-medium)" }}>{it.value}</span>
        </div>))}
    </div>);
}
function CTA({ title, lead, primary = copy["sf9bd4c6db19e"], secondary = copy["sd2cfcdb081c7"] }) {
    return (<Section scheme="ink">
      <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "var(--container-lg)" }}>
        <h2>{title}</h2>
        {lead && <p style={{ fontSize: "var(--text-large)", color: "var(--text-inverse-secondary)" }}>{lead}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)" }}>
          <DL.Button variant="inverse">{primary}</DL.Button>
          <DL.Button variant="secondary-inverse">{secondary}</DL.Button>
        </div>
      </div>
    </Section>);
}
function Home({ go }) {
    const { TwoDoorHero, HeroSlideshow, VerificationStamp, PricingTable, DrawingFrame, ProvenanceChip, Badge, Button } = DL;
    const heroImages = ["01-extension", "02-duplex", "03-restaurant", "04-masterplan", "05-junction", "06-electrical", "07-interior", "08-rooftop", "09-plumbing", "10-garden"].map((f) => (resources && resources["hero_" + f.slice(0, 2)]) || `../../assets/hero/sm/${f}.jpg`);
    return (<main>
      <Section scheme="ink" style={{ position: "relative", overflow: "hidden", minHeight: "min(88vh, 56rem)", display: "grid", alignItems: "center" }}>
        {HeroSlideshow && <HeroSlideshow images={heroImages} interval={5000} scrim={0.55}/>}
        <TwoDoorHero style={{ "--scheme-text-secondary": "var(--text-inverse)" }} headline={copy["sc1714d240dda"]} subhead={copy["s5a220c575eb9"]} doors={[
            { eyebrow: copy["sa68388d7143f"], title: copy["sf9bd4c6db19e"], description: copy["s4b9b0feb5218"], cta: copy["sf9bd4c6db19e"], meta: copy["s0dece23ebd0a"] },
            { eyebrow: copy["s101a1c97b01b"], title: copy["sd2cfcdb081c7"], description: copy["s62bf89b92e2b"], cta: copy["sf4f5cdceaa23"], meta: copy["sc3b6997676b3"] },
        ]}/>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s76930df5254a"]} title={copy["s10776a7390ef"]} lead={copy["s98e22c8771d2"]}/>
        <Split ratio="1.1fr 0.9fr">
          <DrawingFrame label={copy["s3c4353f8cc89"]} sheet={copy["s37570cb902f7"]} scale="50" revision={copy["s6b23c0d5f35d"]} hash="sha256:9f2c…41ab" ratio="16 / 9" grid={false}>
            <img src={(resources && resources.sentencePlan) || "../../assets/hero/sm/sentence-plan.jpg"} alt={copy["s07b0228e35eb"]} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}/>
          </DrawingFrame>
          <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "center" }}>
            <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{copy["sf9c612f196cd"]}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <ProvenanceChip source="user" label={copy["s3dcb825aaaee"]}/>
              <ProvenanceChip source="inferred" label={copy["s0184e81340e8"]}/>
              <ProvenanceChip source="project" label={copy["s582ab56f44a7"]}/>
              <ProvenanceChip source="verify" label={copy["s611c4eda16fe"]}/>
            </div>
            <FactRow items={[{ label: copy["sc161fe731eb7"], value: "18.4 m²" }, { label: copy["s523487a5de21"], value: "42%" }, { label: copy["s582ab56f44a7"], value: "3 000 mm" }]}/>
          </div>
        </Split>
      </Section>

      <Section scheme="tint-strong">
        <SectionHead eyebrow={copy["s9c870aa6e5e9"]} title={copy["s9beda57394ae"]}/>
        <Grid min="16rem">
          {[
            { n: "01", t: copy["sb202bcb90ca5"], d: copy["safefa074fc2c"], chip: "inferred" },
            { n: "02", t: copy["sebf12ef47cf5"], d: copy["s2bc54e135a1c"], chip: "project" },
            { n: "03", t: copy["s0c9618e9849a"], d: copy["s681a96a083d1"], chip: "user" },
        ].map((s) => (<DL.Card key={s.n} tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{s.n}</span>
              <h3 style={{ fontSize: "var(--text-h5)" }}>{s.t}</h3>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{s.d}</p>
              <ProvenanceChip source={s.chip}/>
            </DL.Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s2adc964c0847"]} title={copy["scc61c87e5760"]}/>
        <Grid min="17rem">
          {[
            { t: copy["sd287f75d4bef"], d: copy["sef48525f8773"], meta: copy["sd06f92b17873"] },
            { t: copy["s766a7059b48c"], d: copy["sd752e515bee5"], meta: copy["s4362af3b7dac"] },
            { t: copy["sd08935968e77"], d: copy["scb8e0bfc2e9e"], meta: copy["s66bfd233bd4c"] },
        ].map((e) => (<DL.Card key={e.t} tone="surface" padding="var(--space-6)" interactive style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <h3 style={{ fontSize: "var(--text-h6)" }}>{e.t}</h3>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{e.d}</p>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{e.meta}</span>
            </DL.Card>))}
        </Grid>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["s66c8a4a52fe3"]} title={copy["s153769d57fdd"]} lead={copy["sea0d3819f213"]}/>
        <Split ratio="0.9fr 1.1fr">
          <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
            {[
            [copy["s8f84c99a27c1"], copy["s7895b3d7634b"]],
            [copy["s0a9b580f4e2e"], copy["sb61240821b28"]],
            [copy["s278989becda3"], copy["sc2a177110c89"]],
        ].map(([t, d]) => (<div key={t} style={{ display: "grid", gap: "var(--space-1)" }}>
                <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
              </div>))}
          </div>
          <VerificationStamp profiles={[copy["s22cd53a68b2e"], copy["sc6884dcfd545"]]} checksPerformed={41} checksFlagged={3} checksNotPerformed={[copy["sf3c19e5be975"], copy["sa90027b005dc"], copy["sd492110a9ecf"]]} unverifiedElements={2} signer={null} drawingHash="sha256:9f2c…41ab" revision={copy["s6b23c0d5f35d"]} timestamp={copy["s83ee2882eb7c"]}/>
        </Split>
      </Section>

      <Section scheme="tint">
        <SectionHead eyebrow={copy["s523487a5de21"]} title={copy["s3c21c657a86b"]}/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,22rem),1fr))", gap: "var(--space-10)", alignItems: "stretch" }}>
          <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
            <p style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>{copy["s10851b812123"]}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <Badge tone="accent">{copy["scd74053c5481"]}</Badge>
              {[copy["s25b5c8ed560b"], copy["s8d37bae00c3d"], copy["sa2eefbcb6bbe"], copy["safd0e7d014ac"], copy["sf9af38e65648"], copy["s59c388e8daaf"], copy["s0033ce548c44"], copy["se658d3ae034a"], copy["s211bb3de5686"], copy["s5896b1032538"], copy["sed02a72d7c36"]].map((d) => (<Badge key={d} tone="outline" style={{ color: "var(--text-secondary)", fontWeight: "var(--font-weight-regular)" }}>{d}<span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)", marginLeft: "var(--space-1)" }}>{copy["s3de1580490d2"]}</span></Badge>))}
            </div>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["sffa330f616ee"]}</p>
          </div>
          <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
            <p style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>{copy["s1db075e5f263"]}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <Badge tone="accent">{copy["s8d23a6e37e0a"]}</Badge>
              <Badge tone="accent">{copy["s49dca65f362f"]}</Badge>
              <Badge tone="accent">{copy["s04952a0f984d"]}</Badge>
              <Badge tone="outline">{copy["sa8a4f43ad7e1"]}</Badge>
              <Badge tone="outline" style={{ color: "var(--text-secondary)", fontWeight: "var(--font-weight-regular)" }}>{copy["sce8f437f9be4"]}</Badge>
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
    { name: copy["sf411a1fb6275"], group: copy["s1876bbc8e3e5"], audience: copy["s6ed17a83f133"], price: { GBP: "£0", USD: "$0", NGN: "₦0" }, includes: [copy["s732b1cc5b9b7"], copy["s4158e2c99d27"], copy["s14435b310370"]] },
    { name: copy["sb202bcb90ca5"], group: copy["s1876bbc8e3e5"], audience: copy["s57d32d9156c2"], price: { GBP: "£11", USD: "$14", NGN: "₦9,500" }, per: "/mo", includes: [copy["s467675d7702d"], copy["sef88b71628ea"], copy["sa7a165e1d89a"], copy["sb89a706e380f"]] },
    { name: copy["s010dd7b94f5f"], group: copy["s791757205d8b"], audience: copy["s2c763a487707"], price: { GBP: "£39", USD: "$49", NGN: "₦32,000" }, per: "/mo", includes: [copy["s101a1c97b01b"], copy["sd86eb5196176"], copy["scd7960c32738"], copy["s6df1a427fa36"]] },
    { name: copy["s19c73a5cdf34"], group: copy["s791757205d8b"], audience: copy["s6b9b8ecc3fe3"], price: { GBP: "£139", USD: "$179", NGN: "₦119,000" }, per: "/user/mo", featured: true, includes: [copy["sb62f3c6b3c9c"], copy["sab4368f2814c"], copy["s8b1c63e4f6c2"], copy["s268fd7afc6f3"]] },
    { name: copy["sd3857b12b4ce"], group: copy["s791757205d8b"], audience: copy["s44aa0d76a63c"], price: { GBP: "£849", USD: "$1,099", NGN: "₦729,000" }, per: "/mo", includes: [copy["s2dc0bccbec54"], copy["s5ff47bd0eb03"], copy["s96f2175aa673"], copy["s2035251e5065"]] },
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
    const label = { fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-secondary)" };
    const [teach, setTeach] = React.useState(true);
    const [opt, setOpt] = React.useState(0);
    const massing = [
        { name: copy["sac077b75c1aa"], cov: "38%", gfa: "420 m²", img: "site-courtyard", chip: [237, 85], rects: [[190, 110, 200, 46], [190, 156, 54, 66], [336, 156, 54, 66]] },
        { name: copy["s0c911ecf1d66"], cov: "34%", gfa: "460 m²", img: "site-linear", chip: [216, 88], rects: [[190, 118, 210, 58]] },
        { name: copy["s8122cdaeeaa3"], cov: "42%", gfa: "510 m²", img: "site-two-blocks", chip: [246, 92], rects: [[186, 108, 96, 110], [300, 108, 96, 110]] },
    ];
    const plot = [[173, 74], [465, 74], [465, 235], [173, 235]];
    const setback = [[197, 98], [441, 98], [441, 211], [197, 211]];
    const chipStyle = { position: "absolute", transform: "translate(-50%,-50%)", fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: 1.2, letterSpacing: "var(--tracking-label)", color: "var(--text-primary)", background: "rgba(255,255,255,0.9)", borderRadius: "4px", padding: "2px 6px", whiteSpace: "nowrap", pointerEvents: "none" };
    const photo = massing[opt].img && ((resources || {})[massing[opt].img.replace(/-(.)/g, (m, c) => c.toUpperCase())] || `../../assets/hero/sm/${massing[opt].img}.jpg`);
    const ml = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 0.6, fill: "#f1efe8" };
    const miniPoints = [
        { t: "good", point: copy["s0f8406ff2424"] },
        { t: "weak", point: copy["sad9e8091e9e6"] },
        { t: "missing", point: copy["sdb26387470e2"] },
    ];
    return (<main style={{ fontSize: "var(--text-body-idea)" }}>
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-8)", maxWidth: "var(--container-xl)", marginInline: "auto", textAlign: "center", justifyItems: "center" }}>
          <h1>{copy["s9fca9b27f1c9"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s95dc0ff98885"]}</p>
          <PromptBox placeholder={copy["sf5034a0c64a3"]} location={copy["sb29460df18de"]} examples={[copy["s38fda45195b4"], copy["s5d299cd4ae99"], copy["se1975d4d6999"]]}/>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s5a7866e76f74"]} title={copy["sacc301f60afa"]} lead={copy["s0d9e739ed974"]}/>
        <Grid min="15rem" gap="var(--space-5)">
          {[
            { t: copy["s44660369ca19"], area: "18.4 m²", cov: "42%", img: (resources && resources.optionAPlan) || "../../assets/hero/sm/option-a-plan.jpg" },
            { t: copy["s1ee658cb528f"], area: "22.1 m²", cov: "48%", img: (resources && resources.optionBPlan) || "../../assets/hero/sm/option-b-plan.jpg" },
            { t: copy["s87fcd793256d"], area: "16.0 m²", cov: "39%", img: (resources && resources.optionCPlan) || "../../assets/hero/sm/option-c-plan.jpg" },
        ].map((o, i) => (<div key={o.t} style={{ display: "grid", gap: "var(--space-3)" }}>
              <DrawingFrame label={copy["s1033cf49bf3f"] + copy["sb5d4045c3f46"][i]} sheet={copy["s2727ecda3e73"] + (i + 1)} scale="100" ratio="16 / 9" grid={false}>
                <img src={o.img} alt={o.t + copy["sa0eabad3266f"]} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}/>
              </DrawingFrame>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{o.t}</h4>
              <FactRow items={[{ label: copy["sc161fe731eb7"], value: o.area }, { label: copy["se516876b7586"], value: o.cov }]}/>
            </div>))}
        </Grid>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["s777ebdf3dd6f"]} title={copy["se22a67170c34"]} lead={copy["s000cef079180"]}/>
        <div style={{ display: "grid", gap: "var(--space-3)", maxWidth: "var(--container-xl)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
            {massing.map((m, i) => (<button key={m.name} type="button" aria-pressed={opt === i} onClick={() => setOpt(i)} style={{ appearance: "none", font: "inherit", fontSize: "var(--text-small)", fontWeight: "var(--font-weight-medium)", padding: copy["s821ab636ac83"], borderRadius: "var(--radius-button)", border: "var(--border-width) solid " + (opt === i ? "var(--accent)" : "var(--border-strong)"), background: opt === i ? "var(--accent)" : "var(--surface)", color: opt === i ? "var(--color-white)" : "var(--text-primary)", cursor: "pointer", transition: copy["s83ce79523ab8"] }}>{m.name}</button>))}
            <span style={{ ...mono, alignSelf: "center", marginLeft: "auto" }}>{copy["sb7da3a99659b"]}{massing[opt].cov}{copy["s6c18b0d7f09f"]}{massing[opt].gfa}</span>
          </div>
          <div style={{ position: "relative", border: "var(--border-width) solid var(--border-strong)", borderRadius: "var(--radius-drawing)", overflow: "hidden", background: "#8f8d82" }}>
            <svg viewBox="0 0 640 320" role="img" aria-label={copy["s808986f6babd"]} style={{ display: "block", width: "100%", height: "auto" }}>
              <rect width="640" height="320" fill="#8a8a7c"></rect>
              {photo ? <image href={photo} x="0" y="0" width="640" height="320" preserveAspectRatio={copy["s4b05673f8991"]}></image> : (<React.Fragment>
              <rect x="0" y="0" width="268" height="146" fill="rgba(13,5,5,0.06)"></rect><rect x="352" y="96" width="288" height="132" fill="rgba(255,255,255,0.05)"></rect><rect x="120" y="196" width="214" height="124" fill="rgba(13,5,5,0.04)"></rect>
              <rect x="96" y="0" width="46" height="320" fill="#b6b4ab"></rect>
              <line x1="119" y1="0" x2="119" y2="320" stroke="#e9e7de" strokeWidth="2" strokeDasharray="11 9"></line>
              <rect x="0" y="274" width="640" height="30" fill="#b6b4ab"></rect>
              <text style={ml} transform="rotate(-90 110 216)" x="110" y="216" textAnchor="middle">{copy["s177d0295db89"]}</text>
              <rect x="146" y="252" width="494" height="11" fill="#7f95a2"></rect>
              <text style={{ ...ml, fill: "#f1efe8" }} x="300" y="249">{copy["sdcab9df4f86a"]}</text>
              <g fill="rgba(13,5,5,0.22)" stroke="rgba(255,255,255,0.45)" strokeWidth="1">
                <rect x="178" y="16" width="94" height="50"></rect><rect x="300" y="10" width="76" height="56"></rect><rect x="406" y="18" width="96" height="44"></rect><rect x="498" y="118" width="104" height="86"></rect><rect x="186" y="292" width="92" height="28"></rect>
              </g>
              <text style={ml} x="550" y="166" textAnchor="middle">{copy["s6d21e45368dc"]}</text>
              </React.Fragment>)}
              <polygon points={plot.map((p) => p.join(",")).join(" ")} fill="rgba(30,144,255,0.12)" stroke="var(--accent)" strokeWidth="2"></polygon>
              <polygon points={setback.map((p) => p.join(",")).join(" ")} fill="none" stroke="#f1efe8" strokeWidth="1" strokeDasharray="4 3"></polygon>
              {!photo && (<g fill="rgba(250,249,249,0.92)" stroke="var(--drawing-ink)" strokeWidth="1">
                {massing[opt].rects.map(([x, y, w, h], i) => <rect key={opt + "-" + i} x={x} y={y} width={w} height={h}></rect>)}
              </g>)}
              {plot.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="5.5" fill="var(--color-white)" stroke="var(--accent)" strokeWidth="2"></circle>)}
              <line x1="20" y1="306" x2="100" y2="306" stroke="#f1efe8" strokeWidth="1.5"></line><line x1="20" y1="302" x2="20" y2="310" stroke="#f1efe8" strokeWidth="1.5"></line><line x1="100" y1="302" x2="100" y2="310" stroke="#f1efe8" strokeWidth="1.5"></line>
              <text style={ml} x="20" y="298">{copy["s8fa112ad61e7"]}</text>
              <line x1="616" y1="36" x2="616" y2="14" stroke="#f1efe8" strokeWidth="1.5"></line><text style={ml} x="616" y="48" textAnchor="middle">{copy["s8ce86a6ae65d"]}</text>
            </svg>
            <span style={{ ...chipStyle, left: ((plot[0][0] + plot[1][0]) / 2 / 640 * 100) + "%", top: (plot[0][1] / 320 * 100) + "%" }}>{copy["se500f5093b81"]}</span>
            <span style={{ ...chipStyle, left: ((setback[3][0] + setback[2][0]) / 2 / 640 * 100) + "%", top: (setback[2][1] / 320 * 100) + "%" }}>{copy["sc56fcc93881a"]}</span>
            <span style={{ ...chipStyle, left: (massing[opt].chip[0] / 640 * 100) + "%", top: (massing[opt].chip[1] / 320 * 100) + "%" }}>{copy["sbe70652d1c41"] + [copy["s559aead08264"], copy["sdf7e70e50215"], copy["s6b23c0d5f35d"]][opt]}</span>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-3)", flexWrap: "wrap", padding: copy["se720827e5978"], background: "var(--surface-ink)", color: "var(--color-neutral-lighter)", fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)" }}>
              <span>{photo ? copy["sde4f1df34cdd"] : copy["sf1bc76d17947"]}</span>
              <span>{copy["se15c2f7a7a39"]}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2) var(--space-5)", padding: "var(--space-3) var(--space-4)", border: "var(--border-width) solid var(--border)", borderRadius: "var(--radius-drawing)", background: "var(--surface)", fontSize: "var(--text-small)" }}>
            {[["project", copy["s6ef1ab841591"], "2024-03 · 0.5 m/px"], ["inferred", copy["sfcf4b1a7548c"], copy["s9eb157ddd4c0"]], ["inferred", copy["s5dd6e0396c9d"], copy["s8a69e48e8d55"]]].map(([s, k, v]) => (<span key={k} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}>
                <span aria-hidden="true" style={{ width: "0.625rem", height: "0.625rem", borderRadius: "var(--radius-drawing)", background: "var(--prov-" + s + "-fill)" }}/>
                {s === "inferred" && <span aria-hidden="true" style={{ color: "var(--flag-ink)" }}>{copy["s0bae1fe0557d"]}</span>}
                <span style={{ color: "var(--text-secondary)" }}>{k}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)" }}>{v}</span>
              </span>))}
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-secondary)", margin: 0 }}>{copy["sd315eb830314"]}</p>
          <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)", textWrap: "pretty" }}>{copy["s8b8d43e90f85"]}</p>
        </div>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["sbe8c36575bcd"]} title={copy["s2dde3efe39d5"]} lead={copy["sacc95d8fbbcb"]}/>
        <Split ratio="1fr 1fr">
          <AssumptionsPanel note={copy["s4ce059725088"]} assumptions={[
            { text: copy["s011963b956a3"] },
            { text: copy["s3e146a8249ba"], term: "setback" },
            { text: copy["s3834384ceac8"], term: "coverage" },
            { text: copy["s7c49a54d0b34"] },
            { text: copy["sdc5dc6e87994"] },
        ]} onEdit={() => { }}/>
          <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sdbbb19d0eb0b"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s52ded88493a3"]}</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-3)" }}>
              {[copy["s66ac1c67cc10"], copy["sfce680cf487c"], copy["sec40d881c83b"]].map((f) => (<li key={f} style={{ display: "grid", gridTemplateColumns: "1.25rem 1fr", gap: "var(--space-3)", alignItems: "baseline" }}>
                  <span aria-hidden="true" style={{ color: "var(--flag-ink)" }}>{copy["s0bae1fe0557d"]}</span>
                  <span style={{ fontSize: "var(--text-medium)" }}>{f}</span>
                </li>))}
            </ul>
            <div><Button variant="secondary" iconRight="chevron_right">{copy["sb89a706e380f"]}</Button></div>
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s59be71333c96"]} title={copy["sb2ffec86e000"]} lead={copy["s501975d5c6e7"]}/>
        <div style={{ border: "var(--border-width) solid var(--border-strong)", borderRadius: "var(--radius-card)", background: "var(--surface)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", padding: "var(--space-3) var(--space-5)", borderBottom: "var(--border-width) solid var(--border)", background: "var(--surface-tint)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", minWidth: 0 }}>
              <span style={{ ...label, fontWeight: "var(--font-weight-semibold)" }}>{copy["sb202bcb90ca5"]}</span>
              <span style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{copy["saeada3a6feb0"]}</span>
            </div>
            <button type="button" role="switch" aria-checked={teach} onClick={() => setTeach(!teach)} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)", appearance: "none", background: "none", border: "none", font: "inherit", fontSize: "var(--text-small)", color: "var(--text-primary)", padding: "var(--space-1) 0", cursor: "pointer" }}>
              <span style={{ fontWeight: "var(--font-weight-medium)" }}>{copy["s0cae4b269be9"]}</span>
              <span aria-hidden="true" style={{ position: "relative", width: "2.5rem", height: "1.5rem", borderRadius: "var(--radius-button)", background: teach ? "var(--accent)" : "var(--alpha-ink-15)", transition: copy["s5a25c02ee8e5"] }}>
                <span style={{ position: "absolute", top: "0.1875rem", left: teach ? "1.1875rem" : "0.1875rem", width: "1.125rem", height: "1.125rem", borderRadius: "50%", background: "var(--color-white)", transition: copy["s63190443f2f2"] }}/>
              </span>
              <span style={mono}>{teach ? copy["s130011756125"] : copy["sca7981b46ecf"]}</span>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,30rem),1fr))", gap: "var(--space-6)", padding: "var(--space-5)", alignItems: "start" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "var(--space-4)", opacity: teach ? 0.5 : 1, transition: copy["s15da52cebab8"] }}>
              {[copy["s559aead08264"], copy["sdf7e70e50215"], copy["s6b23c0d5f35d"]].map((o, i) => {
            const R = resources || {};
            const pick = (k, f) => R[teach ? k + copy["sa95671b6583a"] : k] || `../../assets/hero/sm/${f}${teach ? "-revised" : ""}.jpg`;
            const img = [pick(copy["s322b2a663c9f"], "students-a"), pick(copy["sf5dc93aa9a4a"], "students-b"), pick(copy["sc4dede1bedfb"], "students-c")][i];
            return (<div key={o} style={{ display: "grid", gap: "var(--space-2)" }}>
                  {img ? (<DrawingFrame label={copy["s1033cf49bf3f"] + o} sheet={copy["s2727ecda3e73"] + (i + 1)} ratio="16 / 9" grid={false} style={{ gridTemplateRows: copy["s2e35bcb46136"], alignContent: "space-between" }}>
                      <ConceptWatermark repeat={0} style={{ position: "absolute", inset: 0 }}>
                        <img src={img} alt={copy["s1033cf49bf3f"] + o + " plan"} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}/>
                      </ConceptWatermark>
                    </DrawingFrame>) : (<DrawingFrame label={copy["s1033cf49bf3f"] + o} sheet={copy["s2727ecda3e73"] + (i + 1)} ratio="16 / 9" style={{ gridTemplateRows: copy["s2e35bcb46136"], alignContent: "space-between" }}>
                      <ConceptWatermark repeat={2} style={{ position: "absolute", inset: 0 }}>
                        <PlanStub rooms={2 + i}/>
                      </ConceptWatermark>
                    </DrawingFrame>)}
                  <span style={mono}>{teach ? copy["sd3c44771b42a"] : copy["s5ef7b2539bce"] + o}</span>
                </div>);
        })}
            </div>
            <div style={{ display: "grid", gap: "var(--space-3)", border: "var(--border-width) solid var(--border)", borderRadius: teach ? "var(--radius-drawing)" : "var(--radius-card)", padding: "var(--space-4) var(--space-5)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)" }}>
                <span style={{ fontWeight: "var(--font-weight-medium)" }}>{teach ? copy["s0197946cc322"] : copy["sd2a17d6bb2a4"]}</span>
                <span style={mono}>{teach ? copy["s1afd81eec52b"] : "5 assumptions"}</span>
              </div>
              {teach ? miniPoints.map((p) => {
            const k = tone[p.t];
            return (<div key={p.point} style={{ display: "grid", gridTemplateColumns: copy["sbc67cf116d2a"], gap: "0 var(--space-3)", paddingBlock: "var(--space-2)", borderTop: "var(--divider-width) solid var(--divider)" }}>
                    <span aria-hidden="true" style={{ background: k.fill }}/>
                    <span aria-hidden="true" style={{ color: k.ink }}>{k.glyph}</span>
                    <div style={{ display: "grid", gap: "0.125rem" }}>
                      <span style={{ ...label, color: k.ink, fontWeight: "var(--font-weight-semibold)" }}>{k.word}</span>
                      <span style={{ fontSize: "var(--text-small)" }}>{p.point}</span>
                    </div>
                  </div>);
        }) : [copy["s89a502ab63b5"], copy["s3e146a8249ba"], copy["s3834384ceac8"], copy["s50d883659bce"], copy["sb0133da9f6b2"]].map((a) => (<div key={a} style={{ display: "grid", gridTemplateColumns: copy["sf7ee306ae371"], gap: "var(--space-3)", paddingBlock: "var(--space-2)", borderTop: "var(--divider-width) solid var(--divider)", fontSize: "var(--text-small)" }}>
                  <span aria-hidden="true" style={{ width: "0.625rem", height: "0.625rem", marginTop: "0.3rem", borderRadius: "var(--radius-drawing)", background: "var(--prov-inferred-fill)" }}/>
                  <span>{a}</span>
                </div>))}
              <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", paddingTop: "var(--space-2)" }}>
                {teach ? <React.Fragment><Button size="sm">{copy["sf1323f09f63c"]}</Button><Button size="sm" variant="ghost">{copy["s0a5d86a8572b"]}</Button></React.Fragment> : <Button size="sm" variant="secondary">{copy["sbf78c2ce1a1f"]}</Button>}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section scheme="tint-strong">
        <SectionHead eyebrow={copy["s576efdea9da6"]} title={copy["s6d6791f4442d"]}/>
        <Grid min="16rem">
          {[
            { t: copy["sf558cead8bc1"], d: copy["s6748f7910b6c"] },
            { t: copy["s3bf29f006afc"], d: copy["sc0675d9c18a0"] },
            { t: copy["saf9b410c37bf"], d: copy["sbcc0e6a54013"] },
        ].map((h) => (<Card key={h.t} tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{h.t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{h.d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <Split ratio="1fr 1fr">
          <WhatWeDontDo items={[
            copy["sd55a70477996"],
            copy["s122840f1df62"],
            copy["sa1bfc7c6b86e"],
            copy["sa96ab5d8f7cf"],
        ]} footnote={copy["s98025a1a5b10"]}/>
          <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sc49346c55c9c"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["sae95f2e93764"]}</p>
            <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <Button>{copy["sa7a165e1d89a"]}</Button>
              <Button variant="secondary">{copy["sb89a706e380f"]}</Button>
            </div>
          </div>
        </Split>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["sdfe95783edfe"]} title={copy["s758e78e0e84a"]} align="center" max="var(--container-md)"/>
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
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s45608ef40f51"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["sd5b03352c29c"]}</p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <Button>{copy["sf4f5cdceaa23"]}</Button>
            <Button variant="secondary">{copy["sf149d8534427"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s5bdf392a9072"]} title={copy["s051b16f32f5d"]} lead={copy["sd2d267564573"]}/>
        <Split ratio="1.05fr 0.95fr">
          <InterpretationCard rows={[
            { object: copy["sae48c77a481c"], value: "survey-2411.dxf", source: "user" },
            { object: copy["sc8a2a0d650e5"], value: "photo-04.jpg", source: "user" },
            { object: copy["s9f3ec63f735a"], value: "2 700 mm", source: "inferred" },
            { object: copy["s1336a7241842"], value: copy["s8cec2734ddd4"], source: "reference" },
            { object: copy["s582ab56f44a7"], value: "3 000 mm", source: "project" },
            { object: copy["sb7ff4f320642"], value: "2 100 mm", source: "autofix" },
        ]} missing={[copy["sb9f6ab8c0cf3"], copy["s4b2fe1dbadb0"], copy["sffa385d75909"]]} onConfirm={() => { }} onEdit={() => { }}/>
          <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sae0e9c33985d"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s5d027954b4d3"]}</p>
            <p style={{ color: "var(--text-secondary)" }}>{copy["sc790fbcd3f91"]}</p>
          </div>
        </Split>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["sab4368f2814c"]} title={copy["sf3c632f97dd8"]} lead={copy["sba7be8ce6961"]}/>
        <Split ratio="1fr 1fr">
          <DrawingFrame label={copy["s7ae0b6d2b129"]} sheet={copy["s8c5bb74602e0"]} scale="5" revision={copy["sdf7e70e50215"]} hash="sha256:9f2c…41ab" ratio="16 / 9" grid={false}>
            <img src={(resources && resources.parapetDetail) || "../../assets/hero/sm/parapet-detail.jpg"} alt={copy["s4838c24d06bf"]} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}/>
          </DrawingFrame>
          <div style={{ display: "grid", gap: "var(--space-3)", alignContent: "center" }}>
            {[
            ["reference", copy["s6fe9fe19eb03"], copy["s27875afa1950"]],
            ["user", copy["s31959278c738"], copy["s786f24c9eb73"]],
            ["inferred", copy["seda17c3d211f"], copy["s16c024029c1f"]],
            ["verify", copy["s3502bd23760b"], copy["s413a56649049"]],
            ["autofix", copy["s8226ef2384c6"], copy["sb5494cb2993b"]],
            ["project", copy["s8907eed992af"], copy["s729d70a92d0b"]],
        ].map(([src, t, d]) => (<div key={t} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-4)", alignItems: "baseline", paddingBottom: "var(--space-3)", borderBottom: "var(--divider-width) solid var(--divider)" }}>
                <ProvenanceChip source={src} label={t}/>
                <span style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</span>
              </div>))}
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sde07d0720955"]} title={copy["s05f714efda42"]} lead={copy["sfbd6f8168f1d"]}/>
        <Split ratio="1fr 1fr" style={{ alignItems: "start" }}>
          <StandardsReport profile={copy["s0ec469a0db44"]} version="v2024.3" rows={[
            { state: "pass", check: copy["s40e86b514530"], detail: "38° measured", ruleId: copy["s27fb183848c4"], document: copy["s092d26c05b36"] },
            { state: "pass", check: copy["sb1995777b7e9"], ruleId: copy["s3f5251edb882"], document: copy["s97a74d3ec3ff"] },
            { state: "pass", check: copy["sed4075709b60"], ruleId: copy["s8c57897d2621"], document: copy["s82f4238422b8"] },
            { state: "flag", check: copy["sf5e7d0adf376"], detail: copy["s5043b1d83200"], ruleId: copy["sbd5f405a357b"], document: copy["s4c19c8795d2d"] },
            { state: "flag", check: copy["sb7ff4f320642"], detail: copy["s5580f88a35b5"], ruleId: copy["s15dc6dfb7324"], document: copy["s28a1818c1999"] },
            { state: "none", check: copy["sf3c19e5be975"], ruleId: "—", document: copy["sc4a9385d71ae"] },
        ]} notPerformed={[
            copy["s963a9cf1196f"],
            copy["s8894214fe775"],
            copy["seaf31a88b9ac"],
            copy["sd492110a9ecf"],
        ]}/>
          <VerificationStamp profiles={[copy["s22cd53a68b2e"], copy["sc6884dcfd545"]]} checksPerformed={41} checksFlagged={3} checksNotPerformed={[copy["sf3c19e5be975"], copy["s9bc014aa2a5c"], copy["sa90027b005dc"], copy["sd492110a9ecf"]]} unverifiedElements={2} signer={copy["s31bb52e45612"]} drawingHash="sha256:9f2c…41ab" revision={copy["s6b23c0d5f35d"]} timestamp={copy["s83ee2882eb7c"]}/>
        </Split>
      </Section>

      <Section scheme="tint-strong">
        <SectionHead eyebrow={copy["sb7f11ae54a13"]} title={copy["s79c48e92fa2a"]}/>
        <Grid min="15rem" gap="var(--space-5)">
          {[
            [copy["s9f01769a4278"], [copy["s0b434e8a82d0"], copy["s1d393b0081b6"], copy["s3edb66ea075e"]]],
            [copy["sb62f3c6b3c9c"], [copy["s88de6fe8baa5"], copy["s3faf7d7f7466"], copy["s4650e2718c99"]]],
            [copy["s33e98de6c428"], [copy["s5a1c0e713dc4"], copy["sf238e4c63d57"], copy["s300ad5e5d32e"]]],
            [copy["s10851b812123"], [copy["s14c880b71a28"], copy["s7277afba5718"], copy["s8f4bae2c4b3c"]]],
        ].map(([t, items]) => (<Card key={t} tone="surface" padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-2)" }}>
                {items.map((i) => <li key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-secondary)" }}>{i}</li>)}
              </ul>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sdfe95783edfe"]} title={copy["sc46028723fd0"]} max="var(--container-md)"/>
        <PricingTable tiers={PRICING_TIERS.slice(2, 5)}/>
      </Section>

      <Section scheme="canvas">
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
    const HASH = "sha256:9f2c…41ab";
    return (<main>
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s213b9596d2d6"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s9b7644103149"]}</p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <Button>{copy["sd851b2b0b7f8"]}</Button>
            <Button variant="secondary">{copy["sf9bd4c6db19e"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s06bdb296e99a"]} title={copy["s22c8f23fdb91"]} lead={copy["s945a4470c155"]}/>
        <Split ratio="1fr 1fr" gap="var(--space-6)">
          <DrawingFrame label={copy["sdcd9862f28e4"]} sheet={copy["s37570cb902f7"]} scale="50" revision={copy["s6b23c0d5f35d"]} hash={HASH} ratio="16 / 9" grid={false}>
            <img src={(resources && resources.rearElevation) || "../../assets/hero/sm/rear-elevation.jpg"} alt={copy["sf20e9fd72de1"]} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}/>
          </DrawingFrame>
          <DrawingFrame label={copy["s6d89eb7d0938"]} sheet={copy["sf37d0aa4c3fd"]} revision={copy["s6b23c0d5f35d"]} hash={HASH} ratio="16 / 9" grid={false}>
            <img src={(resources && resources.rearRender) || "../../assets/hero/sm/rear-render.jpg"} alt={copy["s5a17b3793817"]} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}/>
          </DrawingFrame>
        </Split>
        <p style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-secondary)" }}>{copy["s5080a0ed8904"]}</p>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sbc52af22d164"]} title={copy["s0fdfade9dc09"]} lead={copy["sbd65b2f81fb1"]}/>
        <Split ratio="1.2fr 0.8fr" style={{ alignItems: "start" }}>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <ConceptWatermark repeat={3} style={{ border: "var(--border-width) solid var(--border-strong)", borderRadius: "var(--radius-drawing)", background: "var(--surface-sunken)" }}>
              <div style={{ position: "relative", aspectRatio: "16 / 9", display: "grid", placeItems: "center", background: "var(--surface-sunken)", overflow: "hidden" }}>
                <video ref={clipRef} src={(resources && resources.cameraMove) || "../../assets/hero/sm/camera-move.mp4"} playsInline loop muted onTimeUpdate={(e) => setClip((c) => ({ ...c, t: e.target.currentTime, d: e.target.duration || c.d }))} onPlay={() => setClip((c) => ({ ...c, playing: true }))} onPause={() => setClip((c) => ({ ...c, playing: false }))} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                <button type="button" aria-label={clip.playing ? copy["s24244a98c715"] : copy["scd79b232b408"]} onClick={() => { const v = clipRef.current; if (!v)
        return; v.paused ? v.play() : v.pause(); }} style={{ position: "relative", zIndex: 1, width: "var(--hit-min)", height: "var(--hit-min)", borderRadius: "50%", border: "var(--border-width) solid var(--border-strong)", background: "var(--surface)", display: "grid", placeItems: "center", cursor: "pointer", padding: 0, opacity: clip.playing ? 0 : 1, transition: copy["s15da52cebab8"] }}>
                  <span className="dl-icon" aria-hidden="true" style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}>{clip.playing ? "pause" : "play_arrow"}</span>
                </button>
                <span style={{ position: "absolute", top: "var(--space-3)", left: "var(--space-3)", ...mono, color: "var(--text-primary)", background: "rgba(255,255,255,0.9)", borderRadius: "4px", padding: "2px 6px" }}>{fmt(clip.t)}{copy["s005e1574a2b5"]}{fmt(clip.d)}</span>
                <span style={{ position: "absolute", right: "var(--space-3)", bottom: "var(--space-3)", ...mono, color: "var(--text-primary)", background: "rgba(255,255,255,0.9)", borderRadius: "4px", padding: "2px 6px" }}>{copy["s09f8a335f50e"]}</span>
              </div>
            </ConceptWatermark>
            <div style={{ display: "grid", gridTemplateColumns: copy["s937ff37cb38c"], gap: "var(--space-3)", alignItems: "baseline", padding: "var(--space-3) var(--space-4)", border: "var(--border-width) solid var(--border)", borderRadius: "var(--radius-drawing)", background: "var(--surface)", fontSize: "var(--text-small)" }}>
              <span aria-hidden="true" style={{ color: "var(--flag-ink)" }}>{copy["s0bae1fe0557d"]}</span>
              <span><b style={{ fontWeight: "var(--font-weight-semibold)" }}>{copy["s2bbd445e420d"]}</b> <span style={{ color: "var(--text-secondary)" }}>{copy["s24f857bed8d8"]}</span></span>
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "start" }}>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: copy["s3588d05f671b"], gap: "var(--space-3) var(--space-5)", fontSize: "var(--text-small)" }}>
              {[
            [copy["sdcd9862f28e4"], copy["s085cb826dc22"]],
            [copy["sa91069147f9b"], "sha256:4f2a1d80…c91e"],
            [copy["s2e516d68f42f"], copy["s13dead62117e"]],
            [copy["s6ecc3df6bffd"], copy["s981ca68436e7"]],
            [copy["s2fb4019a35e4"], copy["s9ae68f8365e5"]],
            [copy["s204a5eb2cd28"], "12 credits"],
        ].map(([k, v]) => (<React.Fragment key={k}>
                  <dt style={{ color: "var(--text-secondary)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)" }}>{k}</dt>
                  <dd style={{ margin: 0, fontFamily: "var(--font-mono)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)", overflowWrap: "anywhere" }}>{v}</dd>
                </React.Fragment>))}
            </dl>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", textWrap: "pretty" }}>{copy["sd34d6bc95ffc"]}</p>
            <div><Button variant="secondary" iconRight="chevron_right">{copy["s5389a0c7a57e"]}</Button></div>
          </div>
        </Split>
        <p style={{ marginTop: "var(--space-8)", ...mono, color: "var(--text-secondary)" }}>{copy["s8e9322d24eb4"]}</p>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["s099dee5908d6"]} title={copy["s86b794d67ad4"]}/>
        <Grid min="16rem">
          {[
            [copy["s5495ae491cd2"], copy["s7d6d721157dd"]],
            [copy["s6787e010275f"], copy["see224b2a6e44"]],
            [copy["sb9737861afc9"], copy["s49c5d97340c6"]],
        ].map(([t, d]) => (<Card key={t} tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sed3677805a52"]} title={copy["s9c524d81092f"]} lead={copy["sf0c66b4da507"]}/>
        <Grid min="12rem" gap="var(--space-4)">
          {[copy["s89b50690b84d"], copy["sbe0e7c9c886b"], copy["sd29389049445"], copy["s8310c6a72da7"]].map((m, i) => {
            const R = resources || {};
            const img = [1, 2, 3, 4].map((v) => R["variant" + v] || `../../assets/hero/sm/variant-${v}.jpg`)[i];
            return (<DrawingFrame key={m} label={m} grid={false} ratio="1 / 1" style={{ gridTemplateRows: copy["s2e35bcb46136"], alignContent: "space-between", background: "var(--surface-sunken)" }}>
              {img ? <img src={img} alt={m + copy["s8be70a632ea2"]} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 60%" }}/>
                    : <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--text-muted)", fontSize: "var(--text-tiny)" }}>{copy["s4c3201c9b884"]}{i + 1}</div>}
            </DrawingFrame>);
        })}
        </Grid>
        <p style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-secondary)" }}>{copy["s6eb52cc9809f"]}{HASH}{copy["s873f7104ec21"]}</p>
      </Section>

      <Section scheme="tint-strong">
        <SectionHead eyebrow={copy["s1c4b8ff60530"]} title={copy["s5edcec788cde"]} max="var(--container-md)"/>
        <Card tone="surface" square padding="var(--space-5)" style={{ maxWidth: "var(--container-lg)", fontFamily: "var(--font-mono)", fontSize: "var(--text-small)", display: "grid", gap: "var(--space-2)" }}>
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
            { name: "100 credits", group: copy["sa75e56e517cd"], audience: copy["s60a03ad98402"], price: { GBP: "£15", USD: "$19", NGN: "₦12,500" } },
            { name: "500 credits", group: copy["sa75e56e517cd"], audience: "≈ 100 renders", price: { GBP: "£69", USD: "$89", NGN: "₦58,000" } },
            { name: "2 000 credits", group: copy["sa75e56e517cd"], audience: copy["s347ddcb06d78"], price: { GBP: "£249", USD: "$319", NGN: "₦209,000" } },
        ]}/>
      </Section>

      <CTA title={copy["s64ebb143c419"]} lead={copy["sc108ce07669e"]} primary={copy["sd851b2b0b7f8"]} secondary={copy["sf9bd4c6db19e"]}/>
    </main>);
}
function Marketplace() {
    const { ProfileCard, Card, Badge, Button, Tabs, Input, Select } = DL;
    const [kind, setKind] = React.useState("all");
    const profiles = [
        { name: copy["s6812809fc6c1"], kind: "jurisdiction", tier: copy["sc97454a01ccf"], signer: copy["scabee8450e4b"], credential: copy["sc76d57be8ea2"], price: "₦48,000", adoption: 214, documents: [copy["s5a088eb9da86"], copy["s5f5d69fcb1a8"]] },
        { name: copy["s13b1a22d1866"], kind: "jurisdiction", tier: copy["sc97454a01ccf"], signer: copy["s4d262854755d"], credential: copy["s009ad3c65ca5"], price: "£240", adoption: 1842, documents: [copy["s6b6cbc5e6544"], copy["s0b31cb1d8cb4"], copy["s39f07bbda274"], copy["scb81a6ccc724"]] },
        { name: copy["sa81a95b98ce6"], kind: "jurisdiction", tier: copy["saa91161f1c7b"], signer: copy["sfa8a56bbe5db"], price: "$180", adoption: 96, documents: [copy["sf2a2d3548b11"], copy["s1c04b3ded1c3"]] },
        { name: copy["s135561a16ff6"], kind: "office", tier: copy["sc97454a01ccf"], signer: copy["s4922a1fbe28b"], credential: copy["sb0099db5a2bc"], price: copy["sc63eb6720c6e"], adoption: 26, documents: [copy["s1a00adca926f"], copy["s4cb21657fa86"]] },
        { name: copy["s42d703942852"], kind: "manufacturer", tier: copy["saa91161f1c7b"], signer: copy["sfa8a56bbe5db"], price: copy["sf411a1fb6275"], adoption: 57, documents: [copy["s3557ee2586e0"]] },
        { name: copy["sfb1255968b05"], kind: "jurisdiction", tier: copy["s0228c6d48ecf"], price: copy["sf411a1fb6275"], adoption: 4210, documents: [copy["s6d05d901b234"]] },
    ];
    const shown = kind === "all" ? profiles : profiles.filter((p) => p.kind === kind);
    return (<main>
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s2045b566b9cc"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["sa9db3f90b54f"]}</p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <Button>{copy["sd1829c7b765d"]}</Button>
            <Button variant="secondary">{copy["s4a0d8207f0d5"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-8)" }}>
          <Tabs variant="pill" value={kind} onChange={setKind} tabs={[
            { value: "all", label: copy["sa52ace420f21"] },
            { value: "jurisdiction", label: copy["s1db075e5f263"] },
            { value: "office", label: copy["s11e36f72a8b0"] },
            { value: "manufacturer", label: copy["s70f1745116da"] },
        ]}/>
          <div style={{ width: "min(100%,18rem)" }}><Input placeholder={copy["sf37deb7771e6"]} aria-label={copy["sf37deb7771e6"]}/></div>
        </div>
        <Grid min="18rem">{shown.map((p) => <ProfileCard key={p.name} {...p}/>)}</Grid>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["s298344ad2bfb"]} title={copy["sf29e9f5939f3"]}/>
        <Grid min="16rem">
          {[
            [copy["sc97454a01ccf"], copy["s4f7838402f37"], copy["s419a0df0d519"]],
            [copy["saa91161f1c7b"], copy["s1cfcce6fec81"], copy["s876c8358da05"]],
            [copy["s0228c6d48ecf"], copy["sbb52fa6f198d"], copy["s4a24c8386326"]],
        ].map(([t, sub, d]) => (<Card key={t} tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <Badge square tone={t === copy["sc97454a01ccf"] ? "accent" : t === copy["saa91161f1c7b"] ? "flag" : "neutral"}>{t}{copy["s588da4105320"]}{sub}</Badge>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s3a7d66dda35e"]} title={copy["s2f9d0c28db96"]}/>
        <Grid min="14rem" gap="var(--space-5)">
          {[
            ["01", copy["sdfc36fdc9e8e"], copy["s05150785022c"]],
            ["02", copy["s397d1e1b3983"], copy["s22eac516ed7e"]],
            ["03", copy["s51b05c8caf7f"], copy["s3e58002df97f"]],
            ["04", copy["s859390eb495b"], copy["s9c9b616941ae"]],
        ].map(([n, t, d]) => (<Card key={n} tone="surface" padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-2)", alignContent: "start" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{n}</span>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section scheme="tint-strong">
        <SectionHead eyebrow={copy["s7fc74da739fb"]} title={copy["s3dfcfa7ef536"]} lead={copy["s95b0a048b978"]}/>
        <Card tone="surface" square padding="var(--space-5)" style={{ maxWidth: "var(--container-lg)", display: "grid", gap: "var(--space-3)" }}>
          {[[copy["s985959785319"], copy["s17205ec0c98c"]], [copy["s0c77fe09ab33"], copy["sb8f470a79d0b"]], [copy["s9e380d9991e6"], copy["s28a1818c1999"]], [copy["s1af384c577f2"], copy["s9177e317f3d8"]]].map(([t, d], i) => (<div key={t} style={{ display: "grid", gridTemplateColumns: copy["sec5968beac1e"], gap: "var(--space-4)", alignItems: "baseline", paddingLeft: `calc(var(--space-6) * ${i})` }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{i + 1}</span>
              <span style={{ fontSize: "var(--text-medium)", fontWeight: "var(--font-weight-medium)" }}>{t}</span>
              <span style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</span>
            </div>))}
          <p style={{ marginTop: "var(--space-3)", paddingTop: "var(--space-3)", borderTop: "var(--divider-width) solid var(--divider)", fontSize: "var(--text-small)", color: "var(--flag-ink)", display: "flex", gap: "var(--space-2)" }}>
            <span aria-hidden="true">{copy["s0bae1fe0557d"]}</span>{copy["s0e541d6316a0"]}</p>
        </Card>
      </Section>

      <CTA title={copy["s4f74935b625a"]} lead={copy["s10d6ad3d0bb3"]} primary={copy["s4a0d8207f0d5"]} secondary={copy["sd1829c7b765d"]}/>
    </main>);
}
function FindASigner() {
    const { SignerCard, WhatWeDontDo, Checkbox, Card, Badge, Button, Accordion } = DL;
    const gate = [
        { label: copy["sb3c03e7468bd"], done: true, note: "5 of 5 confirmed" },
        { label: copy["sdb9f500ce55d"], done: true, note: copy["s6f0a4caffb6b"] },
        { label: copy["sda2d3cc02202"], done: false, note: copy["s6fe2401feea3"] },
        { label: copy["sd127008c1a43"], done: false, note: copy["se4f80bad55b1"] },
    ];
    const ready = gate.every((g) => g.done);
    return (<main>
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s7e1e46f29d62"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s1c9b2886d63f"]}</p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <Button>{copy["sac4608db685e"]}</Button>
            <Button variant="secondary">{copy["s78184fa6a86e"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s9c870aa6e5e9"]} title={copy["s40e0bca100aa"]}/>
        <Grid min="16rem">
          {[
            ["01", copy["s6cee48ca9083"], copy["sf9a9ca04f354"]],
            ["02", copy["s30525c5c37bc"], copy["s0cc90ff01eb4"]],
            ["03", copy["sddfb85a1d50d"], copy["s244bc1ae8849"]],
        ].map(([n, t, d]) => (<Card key={n} tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-2)", alignContent: "start" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{n}</span>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["s30d5b2be3e5b"]} title={copy["s82c15fca58f2"]}/>
        <Grid min="20rem">
          <SignerCard name={copy["se32c1859cdac"]} credential={copy["s48a476a2afb6"]} registry={copy["s009ad3c65ca5"]} jurisdictions={[copy["sa268f58248ae"]]} disciplines={[copy["scd74053c5481"], copy["s25b5c8ed560b"]]} level={copy["s4b39d54547b4"]} reviewEvidence={copy["sbefbe178ab3f"]}/>
          <SignerCard name={copy["s557f845b9020"]} credential={copy["s4c112a3d88c7"]} registry={copy["sc76d57be8ea2"]} jurisdictions={[copy["sff8969dfbed7"], copy["s3db0493a2626"]]} disciplines={[copy["scd74053c5481"]]} level={copy["s4b39d54547b4"]} reviewEvidence={copy["s466c41a39200"]}/>
          <SignerCard name={copy["se4464519cfbd"]} credential={copy["s43d719be14ef"]} registry={copy["s0d198560c2c3"]} jurisdictions={[copy["scad0535decc3"]]} disciplines={[copy["safd0e7d014ac"], copy["sf9af38e65648"]]} level={copy["s4f7838402f37"]} reviewEvidence={copy["sd916713463b2"]}/>
        </Grid>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-6)", marginTop: "var(--space-8)" }}>
          {[[copy["s4f7838402f37"], copy["s6e7bb2f0a84d"]],
            [copy["s4b39d54547b4"], copy["sc7d27fb18155"]]].map(([t, d]) => (<div key={t} style={{ flex: "1 1 18rem", display: "grid", gap: "var(--space-2)" }}>
              <Badge square tone={t === copy["s4f7838402f37"] ? "accent" : "neutral"}>{t}</Badge>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
            </div>))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s8d98a6ce48d5"]} title={copy["s5c53ac3fa45f"]} lead={copy["scedd8d178e62"]}/>
        <Split ratio="1fr 1fr">
          <Card tone="surface" square padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-4)" }}>
            {gate.map((g) => (<div key={g.label} style={{ display: "grid", gap: "var(--space-1)" }}>
                <Checkbox checked={g.done} label={g.label} description={g.note}/>
              </div>))}
            <div style={{ paddingTop: "var(--space-4)", borderTop: "var(--divider-width) solid var(--divider)" }}>
              <Button disabled={!ready} iconLeft="draw">{ready ? copy["sa98f14e6b77f"] : copy["sf034ce1a69ef"]}</Button>
              <p style={{ marginTop: "var(--space-3)", fontSize: "var(--text-small)", color: "var(--flag-ink)", display: "flex", gap: "var(--space-2)" }}>
                <span aria-hidden="true">{copy["s0bae1fe0557d"]}</span>{copy["s8c072b46f62e"]}</p>
            </div>
          </Card>
          <Card tone="surface" square padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--text-small)" }}>
            <span style={{ letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)", fontSize: "var(--text-tiny)" }}>{copy["s268fd7afc6f3"]}</span>
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

      <Section scheme="tint-strong">
        <Split ratio="1fr 1fr">
          <WhatWeDontDo title={copy["sd3d6d17504c3"]} items={[
            copy["s2de40d9a6e0c"],
            copy["scbe19193760e"],
            copy["sbd9289faf72f"],
        ]} footnote={copy["s26b662bccc1c"]}/>
          <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["s78184fa6a86e"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s7b2ab4bea9aa"]}</p>
            <div><Button variant="secondary" iconRight="chevron_right">{copy["s26a4dba068d8"]}</Button></div>
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
      <Section scheme="tint">
        <Split ratio="1fr 1fr">
          <div style={{ display: "grid", gap: "var(--space-6)" }}>
            <h1>{copy["sb4822f5cff06"]}</h1>
            <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)" }}>{copy["s618db15d60d2"]}</p>
            <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
              <Button>{copy["s97ca08c36526"]}</Button>
              <Button variant="secondary" iconRight="chevron_right">{copy["s559b1cc46027"]}</Button>
            </div>
          </div>
          <CodeBlock lines={[
            { text: copy["s725329225807"], tone: "var(--color-white)" },
            { text: copy["s922283b2a114"], tone: P.dim },
            { text: "" },
            { text: "{" },
            { text: copy["sf86b0bc398de"], tone: P.user },
            { text: '  "profile": "uk-adk@2024.3",', tone: P.project },
            { text: '  "inputs": ["survey-2411.dxf", "photo-04.jpg"],', tone: P.user },
            { text: '  "mode": "draft"' },
            { text: "}" },
            { text: "" },
            { text: "→ 202  job_id: cmp_8f31a2   ~14s", tone: P.autofix },
        ]}/>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sfce7fec2a58c"]} title={copy["s342c1635c08f"]}/>
        <Grid min="13rem" gap="var(--space-4)">
          {[
            ["compile", copy["s5334e00f5076"]],
            ["check", copy["sa4c7cacf335f"]],
            ["render", copy["s21dc7c365919"]],
            ["export", copy["s5cb58f3d5d97"]],
            ["precheck", copy["s390f7ce4be11"]],
        ].map(([e, d]) => (<Card key={e} tone="surface" square padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-2)", alignContent: "start" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-small)", color: "var(--accent-ink)" }}>{copy["s6104c7180a94"]}{e}</span>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["se57dccf4788f"]} title={copy["s60dd2af8d5c6"]} lead={copy["s3fa90f8b2949"]}/>
        <CodeBlock style={{ maxWidth: "var(--container-xl)" }} lines={[
            { text: copy["s5a5508339ea9"], tone: "var(--color-white)" },
            { text: '  id: "wall.rear.001"' },
            { text: '  kind: "wall"' },
            { text: "  geometry: { length_mm: 6400, height_mm: 2700 }" },
            { text: "  provenance: {" },
            { text: '    length_mm:  { source: "user",      ref: "survey-2411.dxf" }', tone: P.user },
            { text: '    height_mm:  { source: "inferred",  confidence: 0.74 }', tone: P.inferred },
            { text: '    build_up:   { source: "reference", ref: "office/detail-04" }', tone: P.reference },
            { text: '    setback_mm: { source: "project",   ref: "constraints/rear" }', tone: P.project },
            { text: copy["sa8bb816b92a1"], tone: P.autofix },
            { text: '    party_wall: { source: "verify",    blocked: true }', tone: P.verify },
            { text: "  }" },
            { text: "  rule_state: [" },
            { text: copy["s22aaa71ce304"] },
            { text: copy["s780fa4966eb9"], tone: P.inferred },
            { text: "  ]" },
            { text: "}" },
        ]}/>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", marginTop: "var(--space-5)" }}>
          {[["user", copy["sb4a10447154a"]], ["project", copy["s8335874efbf3"]], ["reference", copy["sd7fef7edcc4a"]], ["inferred", copy["sdfc05249aa63"]], ["verify", copy["s3ac584783596"]], ["autofix", copy["sd2cf3dbc2fc9"]]].map(([k, l]) => (<span key={k} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>
              <span aria-hidden="true" style={{ width: "0.75rem", height: "0.75rem", background: `var(--prov-${k}-fill)`, border: "var(--stroke-fine) solid var(--alpha-ink-30)" }}/>{l}
            </span>))}
        </div>
      </Section>

      <Section>
        <Split ratio="1fr 1fr">
          <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sd938c8168e3a"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["se6e2c9acdf94"]}</p>
            <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
              <Badge square>{copy["scd158ab6274b"]}</Badge>
              <Badge square>{copy["seb6d8a2bb611"]}</Badge>
              <Badge square>{copy["s3ed7cf4d9d1a"]}</Badge>
              <Badge square>{copy["sdd3c35bc2f21"]}</Badge>
            </div>
          </div>
          <CodeBlock lines={[
            { text: "# claude_desktop_config.json", tone: P.dim },
            { text: '"drawlogic": {' },
            { text: '  "command": "npx",' },
            { text: '  "args": ["-y", "@drawlogic/mcp"],' },
            { text: copy["s89e25007a585"] },
            { text: "}" },
        ]}/>
        </Split>
      </Section>

      <Section scheme="tint-strong">
        <SectionHead eyebrow={copy["s9f0c90e4a0b7"]} title={copy["sd6188cc1473f"]}/>
        <Grid min="15rem" gap="var(--space-4)">
          {[
            [copy["s8eb3ea9bbde6"], copy["sd2eb1d618d2b"]],
            [copy["s8baf2458a6c7"], copy["s3dc2b916b726"]],
            [copy["s6ed021f7e822"], copy["s8f2129d33bc4"]],
            [copy["scec3a9b89b2e"], copy["s647b5eca0006"]],
        ].map(([t, d]) => (<Card key={t} tone="surface" padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-2)", alignContent: "start" }}>
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
    const [half, setHalf] = React.useState("regulators");
    return (<main>
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <h1>{copy["s36d062ad430e"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s1898afe3561b"]}</p>
          <DL.Tabs variant="pill" value={half} onChange={setHalf} tabs={[
            { value: "regulators", label: copy["s377a2762e494"] },
            { value: "manufacturers", label: copy["s1de66d0a4f44"] },
        ]}/>
        </div>
      </Section>

      {half === "regulators" ? (<React.Fragment>
          <Section>
            <SectionHead eyebrow={copy["s50239a6d15d3"]} title={copy["s4a6abf37a725"]} lead={copy["sadaa04b7bed9"]}/>
            <Split ratio="1fr 1fr">
              <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
                {[
                [copy["s4b129b099d45"], copy["s61b642d57ee3"]],
                [copy["sa8a517e55515"], copy["s5394659c921d"]],
                [copy["s7a34a0339c3e"], copy["s6eb7df09edfa"]],
            ].map(([t, d]) => (<div key={t} style={{ display: "grid", gap: "var(--space-1)" }}>
                    <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                    <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
                  </div>))}
              </div>
              <CodeBlock lines={[
                { text: copy["s7ebc60ed2284"] },
                { text: "{" },
                { text: '  "submission": "sub_2026_04812.pdf",' },
                { text: '  "profile": "ng-lagos-epps@2026.1"' },
                { text: "}" },
                { text: "" },
                { text: "→ 200", tone: "var(--color-teal-light)" },
                { text: "  checks_performed: 33" },
                { text: "  flags: 2", tone: "var(--color-amber-light)" },
                { text: "  not_performed: 4" },
                { text: copy["s1e13f4051d4d"], tone: "var(--alpha-white-60)" },
            ]}/>
            </Split>
          </Section>

          <Section scheme="canvas">
            <SectionHead eyebrow={copy["s9f872ed43d00"]} title={copy["saafcfae475a0"]}/>
            <Grid min="15rem" gap="var(--space-4)">
              {[
                [copy["s7c27e10ae5f6"], copy["sfcd67834e6e9"]],
                [copy["s5e6901631b0f"], copy["s5c647f973209"]],
                [copy["saca694252cbf"], copy["sae8e186bfcb3"]],
                [copy["s7a77d977a4a4"], copy["sb4369a51732d"]],
            ].map(([t, d]) => (<Card key={t} tone="surface" padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-2)", alignContent: "start" }}>
                  <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                  <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
                </Card>))}
            </Grid>
            <div style={{ marginTop: "var(--space-8)" }}><Button>{copy["s1d1d94fb5397"]}</Button></div>
          </Section>
        </React.Fragment>) : (<React.Fragment>
          <Section>
            <SectionHead eyebrow={copy["s49dcf49ff9c6"]} title={copy["s47f3a963103d"]} lead={copy["s2558d0f776b3"]}/>
            <Split ratio="1fr 1fr">
              <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
                {[
                [copy["s3f8ce54490d2"], copy["s664d66dd3f28"]],
                [copy["sf0216f59f8d4"], copy["sf461eb2ee442"]],
                [copy["s76d33a2637bb"], copy["sa7881230651b"]],
            ].map(([t, d]) => (<div key={t} style={{ display: "grid", gap: "var(--space-1)" }}>
                    <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                    <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
                  </div>))}
              </div>
              <Card tone="surface" square padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-3)", fontFamily: "var(--font-mono)", fontSize: "var(--text-small)" }}>
                <span style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>{copy["sfc7f1aa2054c"]}</span>
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

      <Section scheme="tint-strong">
        <SectionHead eyebrow={copy["s4525e76dcdd5"]} title={copy["s0ff2c5e68a1b"]}/>
        <Grid min="15rem" gap="var(--space-4)">
          {[
            [copy["s58977d8eff45"], copy["se6c1a6df6938"]],
            [copy["s30ad2fe99ebb"], copy["s2fea66bd632c"]],
            [copy["sc1ada08ce138"], copy["sac10d47629e8"]],
            [copy["s9422e40e14f9"], copy["sb04f6e3b5cb3"]],
        ].map(([t, d]) => (<Card key={t} tone="surface" padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-2)", alignContent: "start" }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s2b5c3d26721a"]} title={copy["saff948922db0"]} max="var(--container-md)"/>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: "var(--space-5)", maxWidth: "var(--container-md)" }}>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Label htmlFor="org">{copy["s350be3643ce7"]}</Label>
            <Input id="org" placeholder={copy["sbced82524241"]}/>
          </div>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Label htmlFor="aud">{copy["s3e9f70ec0d1c"]}</Label>
            <Select id="aud" options={[copy["sdcf3eae94122"], copy["s1af384c577f2"], copy["s56f21664f4c7"], copy["sf97e9da0e3b8"]]}/>
          </div>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Label htmlFor="msg" hint={copy["s16420ec9e204"]}>{copy["sa84cd0263122"]}</Label>
            <Textarea id="msg" rows={4}/>
          </div>
          <div><Button type="submit">{copy["sf6f4688ff23d"]}</Button></div>
        </form>
      </Section>
    </main>);
}
function Lagos() {
    const { EPPPSChecklist, WhatWeDontDo, PromptBox, DrawingFrame, Card, Badge, Button, Accordion, PricingTable, VerificationStamp } = DL;
    return (<main>
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <Badge square tone="accent">{copy["s56cec9425719"]}</Badge>
          <h1>{copy["s326aef5d0cfc"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["s250e91bf2cc6"]}</p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <Button>{copy["s8f8db571bdf7"]}</Button>
            <Button variant="secondary">{copy["sfe8895b9e9be"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sb988b0e32895"]} title={copy["sc5b974336753"]} lead={copy["sd03bddf093b1"]}/>
        <Split ratio="1.1fr 0.9fr" style={{ alignItems: "start" }}>
          <EPPPSChecklist items={[
            { item: copy["se3c7043aebbb"], detail: copy["s0fd172de98df"], state: "ready" },
            { item: copy["s2a59563ef116"], detail: copy["sa3bcb24b44f7"], state: "flag" },
            { item: copy["sbee63d4813f0"], detail: copy["s89dc57554991"], state: "ready" },
            { item: copy["sf0e67e5fa2fd"], detail: copy["s28802e58fcee"], state: "flag" },
            { item: copy["s2ad61e6279e1"], state: "others" },
            { item: copy["s9c34987a6b4a"], state: "others" },
            { item: copy["s573d03178626"], state: "others" },
        ]} note={copy["s4a27acc38bbe"]}/>
          <div style={{ display: "grid", gap: "var(--space-6)" }}>
            <div style={{ display: "grid", gap: "var(--space-3)" }}>
              <h3 style={{ fontSize: "var(--text-h5)" }}>{copy["s6f79cf5c144a"]}</h3>
              <p style={{ color: "var(--text-secondary)" }}>{copy["s94fc79f82b87"]}</p>
              <PromptBox placeholder={copy["s342022829270"]} location={copy["s9366be237b83"]} submitLabel={copy["s17271316139f"]}/>
            </div>
          </div>
        </Split>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["s5a046774d80d"]} title={copy["s3783fdb64111"]}/>
        <Grid min="16rem">
          {[
            [copy["s3b1c34b07316"], copy["sb89394fac694"]],
            [copy["sa56c6611190f"], copy["s2c145037fe51"]],
            [copy["seee610a29b81"], copy["sf241069949a5"]],
        ].map(([t, d]) => (<Card key={t} tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s4253ab5a548b"]} title={copy["sbbe1ac77a994"]} lead={copy["s574fd6c35406"]}/>
        <Split ratio="1fr 1fr" gap="var(--space-6)">
          <Card tone="surface" square padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-4)", borderTop: "var(--stroke-heavy) solid var(--prov-user-fill)" }}>
            <Badge square tone="neutral">{copy["sbf15569cf497"]}</Badge>
            <h4 style={{ fontSize: "var(--text-h6)" }}>{copy["sf705a6b4960a"]}</h4>
            <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{copy["sa9439f3c82a0"]}</p>
            <div style={{
            border: "var(--stroke-medium) solid var(--drawing-ink)", borderRadius: "var(--radius-drawing)",
            padding: "var(--space-4)", display: "grid", gap: "var(--space-1)",
            fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-secondary)",
        }}>
              <span style={{ letterSpacing: "var(--tracking-label)", color: "var(--text-primary)" }}>{copy["s0d96d2677d70"]}</span>
              <span>{copy["s45cbe17a0751"]}</span>
              <span>{copy["s4aa58eff2d13"]}</span>
            </div>
          </Card>
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            <Badge square tone="accent">{copy["s7336b22b9746"]}</Badge>
            <VerificationStamp profiles={[copy["s126442005b63"], copy["s0e761268dfb3"]]} checksPerformed={33} checksFlagged={2} checksNotPerformed={[copy["sf3c19e5be975"], copy["sac1e08dbd3cc"]]} unverifiedElements={1} signer={copy["s476b4ceff082"]} drawingHash="sha256:41e8…b902" revision={copy["s559aead08264"]} timestamp={copy["sacab7ed6e3cc"]}/>
          </div>
        </Split>
      </Section>

      <Section scheme="tint-strong">
        <Split ratio="1fr 1fr">
          <WhatWeDontDo items={[
            copy["s9c6dc9250871"],
            copy["s0cd0a094b238"],
            copy["sd2f24acdcb7b"],
            copy["sded593b1cdd8"],
        ]}/>
          <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["s8582873ce22a"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s39ca5edbd2ea"]}</p>
            <div><Button variant="secondary" iconRight="chevron_right">{copy["sfe8895b9e9be"]}</Button></div>
          </div>
        </Split>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["sdfe95783edfe"]} title={copy["sb6486be653aa"]} max="var(--container-md)"/>
        <PricingTable currencies={[copy["sa74aa40897d1"], copy["sa26cdf3a6e70"]]} tiers={[
            { name: copy["sb202bcb90ca5"], group: copy["s1876bbc8e3e5"], audience: copy["sa7f0b1451307"], price: { NGN: "₦9,500", USD: "$14" }, per: "/mo", includes: [copy["s467675d7702d"], copy["sed87f672e68f"], copy["s73c80d72963e"]] },
            { name: copy["s010dd7b94f5f"], group: copy["s791757205d8b"], audience: copy["s2c763a487707"], price: { NGN: "₦32,000", USD: "$49" }, per: "/mo", includes: [copy["s101a1c97b01b"], copy["s47a95fec9e18"], copy["s9886a98e733c"]] },
            { name: copy["s19c73a5cdf34"], group: copy["s791757205d8b"], audience: copy["s6b9b8ecc3fe3"], price: { NGN: "₦119,000", USD: "$179" }, per: "/user/mo", featured: true, includes: [copy["sb62f3c6b3c9c"], copy["sab4368f2814c"], copy["s8b1c63e4f6c2"]] },
        ]}/>
      </Section>

      <Section scheme="canvas">
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
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-5)", maxWidth: "var(--container-lg)" }}>
          <h1>{copy["s79bb97cd72c0"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)" }}>{copy["s4aa6e57dcb2e"]}</p>
        </div>
      </Section>

      <Section>
        <PricingTable tiers={PRICING_TIERS}/>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["s78f595b3ca9f"]} title={copy["sbaa80f810c0e"]}/>
        <Grid min="18rem">
          <Card tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
            <Badge square tone="accent">{copy["s04952a0f984d"]}</Badge>
            <h3 style={{ fontSize: "var(--text-h5)" }}>{copy["s665722844f2b"]}</h3>
            <div style={{ display: "grid", gap: "var(--space-2)", fontVariantNumeric: "tabular-nums" }}>
              {[[copy["sb202bcb90ca5"], "₦9,500 /mo"], [copy["s010dd7b94f5f"], "₦32,000 /mo"], [copy["s19c73a5cdf34"], "₦119,000 /user/mo"]].map(([t, p]) => (<div key={t} style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-4)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)" }}>
                  <span>{t}</span><span style={{ fontWeight: "var(--font-weight-medium)" }}>{p}</span>
                </div>))}
            </div>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["s97a349464cb3"]}</p>
          </Card>
          <Card tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
            <Badge square>{copy["s2a19bb78de3e"]}</Badge>
            <h3 style={{ fontSize: "var(--text-h5)" }}>{copy["s8ec8021d8648"]}</h3>
            <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{copy["sb8f2984969c7"]}</p>
            <div><Button variant="secondary">{copy["s9a4d4cf95bc9"]}</Button></div>
          </Card>
          <Card tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
            <Badge square>{copy["sa75e56e517cd"]}</Badge>
            <h3 style={{ fontSize: "var(--text-h5)" }}>{copy["sd8b1358b8eab"]}</h3>
            <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
              <div style={{ width: "6rem" }}><Input type="number" defaultValue="1" aria-label={copy["s87430fb35e82"]}/></div>
              <Button>{copy["s79f52e0ce619"]}</Button>
            </div>
            <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["s104fe8d63e20"]}</p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["se2dc37c225ef"]} title={copy["sd69a37385809"]}/>
        <div style={{ overflowX: "auto", border: "var(--border-width) solid var(--border)", borderRadius: "var(--radius-drawing)", background: "var(--surface)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "44rem", fontVariantNumeric: "tabular-nums" }}>
            <thead>
              <tr>
                {["", copy["sf411a1fb6275"], copy["sb202bcb90ca5"], copy["s010dd7b94f5f"], copy["s19c73a5cdf34"], copy["sd3857b12b4ce"], copy["s3fbe5ed156f1"]].map((h) => (<th key={h} style={{ textAlign: h ? "center" : "left", padding: "var(--space-3) var(--space-4)", fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)", borderBottom: "var(--divider-width) solid var(--border)", whiteSpace: "nowrap" }}>{h}</th>))}
              </tr>
            </thead>
            <tbody>
              {[
            [copy["sb684defe8695"], ["3", copy["s11dde17d6c3e"], copy["s11dde17d6c3e"], copy["s11dde17d6c3e"], copy["s11dde17d6c3e"], copy["s11dde17d6c3e"]]],
            [copy["s662d84fb2517"], [copy["s0228c6d48ecf"], copy["s0228c6d48ecf"], copy["sc699995ef371"], copy["s005f4000be07"], copy["s005f4000be07"], copy["sa36afd6899c7"]]],
            [copy["sc5f4eaf46f8d"], ["0", "40", "60", "250", "1 000", copy["s7c6e338c8986"]]],
            [copy["s2f4dcf59ff0c"], [copy["s796120837694"], copy["s36e8e07f8948"], copy["sd9c06e944235"], copy["sa8a095507b65"], copy["sa8a095507b65"], copy["sa8a095507b65"]]],
            [copy["sda7ccc2a564c"], ["—", "—", copy["s59f03d642b41"], copy["sdb5ba334b575"], copy["sdb5ba334b575"], copy["sdb5ba334b575"]]],
            [copy["sc1ada08ce138"], ["—", "—", "30 days", copy["s008dacb6d1e8"], copy["s008dacb6d1e8"], copy["s720f5fd14b1c"]]],
        ].map(([row, vals]) => (<tr key={row} style={{ borderBottom: "var(--divider-width) solid var(--divider)" }}>
                  <td style={{ padding: "var(--space-3) var(--space-4)", fontSize: "var(--text-small)", fontWeight: "var(--font-weight-semibold)", whiteSpace: "nowrap" }}>{row}</td>
                  {vals.map((v, i) => (<td key={i} style={{ padding: "var(--space-3) var(--space-4)", fontSize: "var(--text-small)", textAlign: "center", color: v === "—" ? "var(--text-muted)" : "var(--text-primary)" }}>{v}</td>))}
                </tr>))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section scheme="tint-strong">
        <SectionHead eyebrow={copy["s052d7880dd4a"]} title={copy["s23a274a624a8"]}/>
        <Grid min="18rem">
          <Card tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
            <h4 style={{ fontSize: "var(--text-h6)" }}>{copy["s28432ceece43"]}</h4>
            <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{copy["s255890d71792"]}</p>
          </Card>
          <Card tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
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
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-5)", maxWidth: "var(--container-lg)" }}>
          <h1>{copy["s57f5715f9384"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)" }}>{copy["s0ed808fa1e7d"]}</p>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["se6b85bfbf550"]} title={copy["s381b0cbb2186"]} max="var(--container-lg)"/>
        <div style={{ display: "grid", gap: "var(--space-5)", maxWidth: "var(--container-lg)", fontSize: "var(--text-large)" }}>
          <p style={{ color: "var(--text-secondary)" }}>{copy["sc983ad095761"]}</p>
          <p style={{ color: "var(--text-secondary)" }}>{copy["sf6e9917593c0"]}</p>
        </div>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["s0be561015c99"]} title={copy["sac8696092c05"]}/>
        <Grid min="16rem">
          {[
            [copy["seac20c4006bb"], copy["sfd6ed797e4fc"]],
            [copy["sb7a9cbb14150"], copy["sc2c67f96d7fe"]],
            [copy["se0180c34383f"], copy["s5e4623fe40fb"]],
            [copy["s28a1c0f0f4c2"], copy["sd1a315b68967"]],
        ].map(([t, d]) => (<Card key={t} tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)" }}>{d}</p>
            </Card>))}
        </Grid>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s6934d52acdee"]} title={copy["s83a65532d8ff"]}/>
        <Grid min="15rem" gap="var(--space-4)">
          {[
            [copy["s8d23a6e37e0a"], copy["sddcae8727d58"], copy["secc0e7dc084f"]],
            [copy["s49dca65f362f"], copy["s3a27842aeb58"], copy["s815eca977c7d"]],
            [copy["s04952a0f984d"], copy["sdc4314ab8ec1"], copy["sb384863fa1f6"]],
        ].map(([t, d, city]) => (<Card key={t} tone="surface" padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-2)", alignContent: "start" }}>
              <Badge square tone="accent">{t}</Badge>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{d}</p>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" }}>{city.toLowerCase()}{copy["s2215d78b2b14"]}</span>
            </Card>))}
        </Grid>
      </Section>

      <Section scheme="tint-strong">
        <SectionHead eyebrow={copy["sf149d8534427"]} title={copy["sa89935bd784a"]} max="var(--container-md)"/>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: "var(--space-5)", maxWidth: "var(--container-md)" }}>
          <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <Label htmlFor="n" required>{copy["sdcd1d5223f73"]}</Label>
              <Input id="n"/>
            </div>
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <Label htmlFor="e" required>{copy["s969ccbd3cf63"]}</Label>
              <Input id="e" type="email"/>
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Label htmlFor="a" required>{copy["s2526f5ebea26"]}</Label>
            <Select id="a" options={[copy["sfb37e831cc92"], copy["s0d5958b8f00b"], copy["sdcf3eae94122"], copy["s1af384c577f2"], copy["s9ed1273e9b5a"]]}/>
          </div>
          <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <Label htmlFor="d">{copy["s3bde12e87641"]}</Label>
              <Input id="d" type="date"/>
            </div>
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <Label htmlFor="t">{copy["s13ae4c193d33"]}</Label>
              <Select id="t" options={[copy["sa06ca5a635cc"], copy["s368f5799a624"], copy["s0ad386975f7c"], copy["s693a6974a1fb"]]}/>
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Label htmlFor="c" hint={copy["s052bee439abd"]}>{copy["sb76a8358489f"]}</Label>
            <Textarea id="c" rows={3}/>
          </div>
          <Checkbox label={copy["s0482320e7be5"]} description={copy["s8bc4fd14bea6"]}/>
          <div><Button type="submit">{copy["sf149d8534427"]}</Button></div>
        </form>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s2b5c3d26721a"]} title={copy["s0830692816cd"]} max="var(--container-md)"/>
        <Grid min="14rem" gap="var(--space-4)">
          {[[copy["sc910d474dcd7"], "hello@drawlogic.com"], [copy["sc8d715a6f56b"], "practices@drawlogic.com"], [copy["s7d9e01f879f1"], "authorities@drawlogic.com"], [copy["s9ed1273e9b5a"], "press@drawlogic.com"]].map(([t, e]) => (<div key={t} style={{ display: "grid", gap: "var(--space-1)" }}>
              <span style={{ fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>{t}</span>
              <a href={"mailto:" + e} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-small)" }}>{e}</a>
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
        { t: "good", point: copy["sbedd028278d5"], reason: copy["s341221946efd"], source: copy["s078a65eba806"] },
        { t: "good", point: copy["s75b773f42e59"], reason: copy["s70ae3222241a"], source: copy["s5887b6674930"] },
        { t: "weak", point: copy["s8fb65f26f303"], reason: copy["sf63629698f55"], source: copy["s578a24429724"] },
        { t: "weak", point: copy["s7337097b7320"], reason: copy["s73c6383628e4"], source: copy["s918cecab4b48"] },
        { t: "missing", point: copy["s50fb99ef0856"], reason: copy["s63905e21b1df"], source: copy["sf995c70c140e"], tutor: true },
    ];
    const mono = { fontFamily: "var(--font-mono)", fontSize: "var(--text-tiny)", color: "var(--text-muted)" };
    const label = { fontSize: "var(--text-tiny)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-secondary)" };
    return (<main>
      <Section scheme="tint">
        <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "var(--container-xl)" }}>
          <p style={{ ...label, fontWeight: "var(--font-weight-semibold)" }}>{copy["s074cac53c30f"]}</p>
          <h1>{copy["sc95df64b9dfc"]}</h1>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)" }}>{copy["sb3b819ba4622"]}</p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
            <Button>{copy["s70f1c94f8268"]}</Button>
            <Button variant="secondary">{copy["scb1e5b58c4a0"]}</Button>
          </div>
        </div>
      </Section>

      <Section>
        <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", maxWidth: "var(--container-lg)", textWrap: "pretty" }}>{copy["sb81e895167ce"]}<a href="#Idea%20mode" onClick={(e) => { e.preventDefault(); go && go(copy["sa68388d7143f"]); }} style={{ color: "var(--accent)", fontWeight: "var(--font-weight-medium)" }}>{copy["s533e5c11a55d"]}</a>
        </p>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s0cde07320205"]} title={copy["s62950394a793"]} lead={copy["s433cc8b416af"]}/>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr))", gap: "var(--space-6) 0" }} className="dl-stepper">
          {steps.map(([name, desc], i) => (<li key={name} style={{ display: "grid", gap: "var(--space-3)", paddingRight: "var(--space-5)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <span aria-hidden="true" style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", border: "var(--stroke-medium) solid var(--drawing-ink)", background: i === 4 ? "var(--accent)" : "var(--canvas)", flexShrink: 0 }}/>
                <span aria-hidden="true" className={i === steps.length - 1 ? "dl-stepper-last" : (i === 2 ? "dl-stepper-mid" : undefined)} style={{ flex: 1, borderTop: "var(--stroke-thin) solid var(--drawing-ink)" }}/>
              </div>
              <span style={mono}>{String(i + 1).padStart(2, "0")}</span>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{name}</h4>
              <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", textWrap: "pretty" }}>{desc}</p>
            </li>))}
        </ol>
      </Section>

      <Section scheme="canvas">
        <SectionHead eyebrow={copy["s1f5ba634dea7"]} title={copy["s5411fbd8c651"]} lead={copy["s74a231f853b4"]}/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,15rem),1fr))", gap: "var(--space-6)", alignItems: "start" }}>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <span style={label}>{copy["sa5320cde31e8"]}</span>
            <DrawingFrame label={copy["s9126aeab52e9"]} sheet={copy["s408856ec1674"]} grid={false} ratio="16 / 9" style={{ gridTemplateRows: copy["s2e35bcb46136"], alignContent: "space-between" }}>
              <img src={(resources && resources.studentSketch) || "../../assets/hero/sm/student-sketch.jpg"} alt={copy["se1aaa2767704"]} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}/>
            </DrawingFrame>
          </div>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <span style={label}>{copy["s179867ba3ddb"]}</span>
            {[
            [copy["s8a1b1d9abca4"], copy["s79d777394f5b"], copy["s46d73851875b"]],
            [copy["s5d79b0bdfb78"], copy["s38a77466e414"], copy["s3571a15d1d42"]],
            [copy["s98e3384115f7"], copy["sfa016cc690b2"], copy["scac487a4dff5"]],
        ].map(([t, d, s], i) => (<Card key={t} tone="surface" padding="var(--space-5)" style={{ display: "grid", gap: "var(--space-2)", alignContent: "start" }}>
                <span style={mono}>{copy["s84b6401e19e5"]}{i + 1}</span>
                <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
                <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", textWrap: "pretty" }}>{d}</p>
                <span style={{ ...mono, color: "var(--text-secondary)" }}>{copy["sb226e862d61f"]}{s}</span>
              </Card>))}
          </div>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <span style={label}>{copy["sd0365327f51c"]}</span>
            <Card tone="surface" square padding="0" style={{ display: "grid" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)", padding: "var(--space-4) var(--space-5)", borderBottom: "var(--border-width) solid var(--border)" }}>
                <span style={{ fontWeight: "var(--font-weight-medium)" }}>{copy["sa64d7ee86ac7"]}</span>
                <span style={mono}>{copy["s5c08f80814bb"]}</span>
              </div>
              {points.map((p) => {
            const k = tone[p.t];
            return (<div key={p.point} style={{ display: "grid", gridTemplateColumns: copy["sbc67cf116d2a"], gap: "0 var(--space-3)", padding: "var(--space-4) var(--space-5) var(--space-4) 0", borderBottom: "var(--divider-width) solid var(--divider)" }}>
                    <span aria-hidden="true" style={{ background: k.fill }}/>
                    <span aria-hidden="true" style={{ color: k.ink, lineHeight: "var(--leading-body)" }}>{k.glyph}</span>
                    <div style={{ display: "grid", gap: "var(--space-1)" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", alignItems: "baseline" }}>
                        <span style={{ ...label, color: k.ink, fontWeight: "var(--font-weight-semibold)" }}>{k.word}</span>
                        <span style={{ fontWeight: "var(--font-weight-medium)" }}>{p.point}</span>
                      </div>
                      <p style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)", textWrap: "pretty" }}>{p.reason}</p>
                      <span style={mono}>{copy["sb226e862d61f"]}{p.source}</span>
                      {p.tutor && <div style={{ marginTop: "var(--space-2)" }}><Badge tone="outline" icon="person" square>{copy["s2264d74d5f07"]}</Badge></div>}
                    </div>
                  </div>);
        })}
              <div style={{ padding: "var(--space-4) var(--space-5)", display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                <Button size="sm">{copy["s15ba01cd6947"]}</Button>
                <Button size="sm" variant="ghost">{copy["s0a5d86a8572b"]}</Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section scheme="tint-strong">
        <div style={{ display: "grid", gap: "var(--space-4)", maxWidth: "var(--container-lg)" }}>
          <h2>{copy["s5d5ccf9d4ea9"]}</h2>
          <p style={{ fontSize: "var(--text-large)", color: "var(--text-secondary)", textWrap: "pretty" }}>{copy["sb37d150b9682"]}</p>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={copy["s178188ff55be"]} title={copy["sc3ce281eca8a"]} lead={copy["s05bb5b3395e0"]}/>
        <Split ratio="1fr 1fr" style={{ alignItems: "start" }}>
          <div style={{ position: "relative", overflow: "hidden", containerType: "inline-size", background: "var(--surface)", border: "var(--border-width) solid var(--border-strong)", borderRadius: "var(--radius-drawing)" }}>
            <div style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "var(--border-width) solid var(--border-strong)", display: "flex", justifyContent: "space-between", gap: "var(--space-3)", flexWrap: "wrap", alignItems: "baseline" }}>
              <span style={{ ...label, fontWeight: "var(--font-weight-semibold)", color: "var(--text-primary)" }}>{copy["s89961f73048c"]}</span>
              <span style={mono}>{copy["s205ae7b9f3c6"]}</span>
            </div>
            <div style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-5)" }}>
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                <div style={{ display: "flex", height: "0.75rem", borderRadius: "var(--radius-drawing)", overflow: "hidden" }}>
                  <span style={{ width: "62%", background: "var(--prov-user-fill)" }}/>
                  <span style={{ flex: 1, background: "var(--prov-inferred-fill)" }}/>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-4)", fontSize: "var(--text-small)" }}>
                  <span><b style={{ color: "var(--prov-user-ink)", fontWeight: "var(--font-weight-semibold)" }}>{copy["sa07d2aca6629"]}</b>{copy["sf2fba7825049"]}</span>
                  <span><b style={{ color: "var(--prov-inferred-ink)", fontWeight: "var(--font-weight-semibold)" }}>{copy["s18a90d31ffc3"]}</b>{copy["s0c10c40a5138"]}</span>
                </div>
              </div>
              <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", rowGap: "var(--space-3)", columnGap: "var(--space-6)", fontSize: "var(--text-small)" }}>
                {[
            [copy["sf81ab1cf2c81"], "5 raised · 4 addressed"],
            [copy["sa293fe163e7b"], "2"],
            [copy["s0a5d86a8572b"], copy["sdccafe55abe3"]],
            [copy["s00bc97d9ca85"], copy["s833f0d47fd93"]],
        ].map(([k, v]) => (<React.Fragment key={k}>
                    <dt style={{ color: "var(--text-secondary)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)" }}>{k}</dt>
                    <dd style={{ margin: 0, fontFamily: "var(--font-mono)", paddingBottom: "var(--space-2)", borderBottom: "var(--divider-width) solid var(--divider)", textAlign: "right" }}>{v}</dd>
                  </React.Fragment>))}
              </dl>
              <div style={{ display: "grid", gap: "var(--space-1)" }}>
                <span style={label}>{copy["s014146d8dfdd"]}</span>
                <span style={{ fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>{copy["sfc5b6518f8a4"]}</span>
              </div>
            </div>
            <div style={{ padding: "var(--space-3) var(--space-5)", borderTop: "var(--border-width) solid var(--border-strong)", display: "flex", justifyContent: "space-between", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <span style={{ ...mono, fontWeight: "var(--font-weight-bold)", color: "var(--text-primary)", letterSpacing: "var(--tracking-label)" }}>{copy["sd04da9cf0691"]}</span>
              <span style={mono}>{copy["s298a4c0dacc0"]}</span>
            </div>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none", userSelect: "none" }}>
              <span style={{ transform: "rotate(var(--concept-watermark-angle))", fontFamily: "var(--font-mono)", fontWeight: "var(--font-weight-bold)", fontSize: "clamp(0.875rem,4cqw,1.25rem)", letterSpacing: "var(--tracking-label)", color: "var(--concept-watermark-color)", whiteSpace: "nowrap", lineHeight: 1 }}>{copy["sd04da9cf0691"]}</span>
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "center" }}>
            <h3 style={{ fontSize: "var(--text-h4)" }}>{copy["sdf6c51e25a5b"]}</h3>
            <p style={{ color: "var(--text-secondary)" }}>{copy["sdcc6db793d3e"]}</p>
            <p style={{ color: "var(--text-secondary)" }}>{copy["s8469c0b97c3e"]}</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-small)", color: "var(--text-secondary)" }}>
              {[["user", copy["s68b1b222fecc"]], ["inferred", copy["sb05ffcf487e7"]]].map(([s, t]) => (<li key={s} style={{ display: "grid", gridTemplateColumns: "0.75rem 1fr", gap: "var(--space-3)", alignItems: "center" }}>
                  <span aria-hidden="true" style={{ width: "0.75rem", height: "0.75rem", borderRadius: "var(--radius-drawing)", background: "var(--prov-" + s + "-fill)" }}/>
                  <span>{t}</span>
                </li>))}
            </ul>
          </div>
        </Split>
      </Section>

      <Section scheme="tint-strong" id="institutions">
        <SectionHead eyebrow={copy["scb1e5b58c4a0"]} title={copy["s6375caf268ab"]} lead={copy["s991453ab3856"]}/>
        <Grid min="16rem">
          {[
            [copy["s8e1f0e3fe663"], copy["s13c4035cbc84"]],
            [copy["sf6105d1b6207"], copy["sf3d2b7e3dcd3"]],
            [copy["sd1840e445e90"], copy["s18bd25c8ecf0"]],
        ].map(([t, d]) => (<Card key={t} tone="surface" padding="var(--space-6)" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <h4 style={{ fontSize: "var(--text-h6)" }}>{t}</h4>
              <p style={{ fontSize: "var(--text-medium)", color: "var(--text-secondary)", textWrap: "pretty" }}>{d}</p>
            </Card>))}
        </Grid>
        <div style={{ marginTop: "var(--space-8)" }}><Button iconRight="chevron_right">{copy["s1d1d94fb5397"]}</Button></div>
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

export { DL, Home, IdeaMode, ForProfessionals, RenderStudio, Marketplace, FindASigner, Developers, Students, Regulators, Lagos, Pricing, About };
