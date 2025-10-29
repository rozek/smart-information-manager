/*******************************************************************************
*                                                                              *
*                       Smart Information Manager (SIM)                        *
*                                                                              *
*******************************************************************************/
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const SIM_Version = '0.1';
import { 
//  throwError,      // will be redefined locally because of TypeScript compiler
quoted, escaped, ValuesAreEqual, ValueIsBoolean, ValueIsNumber, ValueIsFiniteNumber, ValueIsNumberInRange, ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal, ValueIsString, ValueIsStringMatching, ValueIsText, ValueIsTextline, ValueIsObject, ValueIsPlainObject, ValueIsList, ValueIsListSatisfying, ValueIsOneOf, ValueIsFunction, ValueIsColor, ValueIsURL, ValidatorForClassifier, acceptNil, rejectNil, expectBoolean, expectPlainObject, expectInstanceOf, allowOneOf, } from 'javascript-interface-library';
const ValueIsPhoneNumber = ValueIsTextline; // *C* should be implemented
import * as sim from 'sim-components';
export * from 'sim-components'; // its sufficient to import from here
import { SIM_empty, SIM_noSelection, SIM_multipleValues, ValueIsSpecial, SIM_ImageScalings, SIM_ImageAlignments, SIM_ReferrerPolicies, SIM_FAIconNames, ValueIsIdentifier, ValueIsName, ValueIsPath, ValueIsLocation, ValueIsDimension, ValueIsTime, ValueIsDateTime, ValueIsDate, ValueIsWeek, ValueIsMonth, expectIdentifier, expectName, expectPath, allowLocation, allowDimension, installStylesheetFor, uninstallStylesheetFor, parsedPropSet, optionalValue, mandatoryValue, optionalBoolean, optionalOrdinal, optionalText, optionalTextline, optionalFunction, optionalPath, useConfiguration, useDragging, useClickDragging, _normalizedName, _normalizedPath, OperationWasConfirmed, consumeEvent, executeCallback, executedCallback, deepCopyOf, } from 'sim-components';
import { render, html } from 'htm/preact';
import { createContext, toChildArray, cloneElement } from 'preact';
import { createPortal } from 'preact/compat';
import { useId, useRef, useState, useEffect, useCallback, useMemo, useContext } from 'preact/hooks';
export { render, html, createContext, toChildArray, cloneElement, createPortal, useId, useRef, useState, useEffect, useCallback, useMemo, useContext, };
import { customAlphabet } from 'nanoid';
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
import { nolookalikesSafe } from 'nanoid-dictionary';
import Conversion from 'svelte-coordinate-conversion';
const { fromLocalTo, fromViewportTo, fromDocumentTo } = Conversion;
export { fromLocalTo, fromViewportTo, fromDocumentTo };
/**** for MarkdownView ****/
import { Marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import { default as _css } from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', _css);
import { default as _javascript } from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', _javascript);
import { default as _java } from 'highlight.js/lib/languages/java';
hljs.registerLanguage('java', _java);
import { default as _json } from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', _json);
import { default as _typescript } from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', _typescript);
import { default as _xml } from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('html', _xml);
hljs.registerLanguage('xml', _xml);
export { Marked };
/**** AssetsBase, IconFolder ****/
const AssetsBase = '/'; // 'https://rozek.github.io/smart-information-manager/'
const IconFolder = AssetsBase + 'icons/';
//------------------------------------------------------------------------------
//--                             internal Symbols                             --
//------------------------------------------------------------------------------
const $View = Symbol('View');
const $Container = Symbol('Container');
const $Base = Symbol('Base'); // opening visual of overlay/dialog
const $Delegate = Symbol('Delegate'); // for deleg. sticker rendering
const $ContentSticker = Symbol('ContentSticker'); // dto.
const $normalizedName = Symbol('normalizedName');
const $activeScript = Symbol('activeScript');
const $StateBase = Symbol('StateBase');
const $OverlayList = Symbol('OverlayList');
const $DialogList = Symbol('DialogList');
const $DesignerDialogs = Symbol('DesignerDialogs');
const $Renderer = Symbol('Renderer');
const $pendingScriptError = Symbol('ScriptError');
const $volatile = Symbol('volatile');
const $ErrorReport = Symbol('ErrorReport');
const $rerender = Symbol('rerender');
const $Console = Symbol('Console');
const $Console_CharCount = Symbol('Console_CharCount');
const $Console_LineCount = Symbol('Console_LineCount');
/**** geometry-related types ****/
export const SIM_horizontalAnchorses = ['left-width', 'left-right', 'width-right'];
export const SIM_verticalAnchorses = ['top-height', 'top-bottom', 'height-bottom'];
/**** configuration-related types ****/
export const SIM_FontWeights = [
    'thin', 'extra-light', 'light', 'normal', 'medium', 'semi-bold',
    'bold', 'extra-bold', 'heavy'
];
export const SIM_FontWeightValues = {
    'thin': 100, 'extra-light': 200, 'light': 300, 'normal': 400, 'medium': 500,
    'semi-bold': 600, 'bold': 700, 'extra-bold': 800, 'heavy': 900
};
export const SIM_FontStyles = ['normal', 'italic'];
export const SIM_TextDecorationLines = ['none', 'underline', 'overline', 'line-through'];
export const SIM_TextDecorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy'];
export const SIM_TextAlignments = ['left', 'center', 'right', 'justify'];
export const SIM_BackgroundModes = ['normal', 'contain', 'cover', 'fill', 'tile'];
export const SIM_BorderStyles = [
    'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge',
    'inset', 'outset'
];
export const SIM_Cursors = [
    'auto', 'none', 'default', 'alias', 'all-scroll', 'cell', 'context-menu',
    'col-resize', 'copy', 'crosshair', 'e-resize', 'ew-resize', 'grab', 'grabbing',
    'help', 'move', 'n-resize', 'ne-resize', 'nesw-resize', 'ns-resize', 'nw-resize',
    'nwse-resize', 'no-drop', 'not-allowed', 'pointer', 'progress', 'row-resize',
    's-resize', 'se-resize', 'sw-resize', 'text', 'vertical-text', 'w-resize', 'wait',
    'zoom-in', 'zoom-out'
];
export const SIM_Overflows = ['visible', 'hidden', 'scroll', 'auto'];
/**** throwError - simplifies construction of named errors ****/
export function throwError(Message) {
    debugger;
    let Match = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(Message);
    if (Match == null) {
        throw new Error(Message);
    }
    else {
        let namedError = new Error(Match[2]);
        namedError.name = Match[1];
        throw namedError;
    }
}
/**** throwReadOnlyError ****/
// @ts-ignore TS2534 why is TS complaining here?
export function throwReadOnlyError(Name) {
    throwError('ReadOnlyProperty: property ' + quoted(Name) + ' must not be set');
}
//------------------------------------------------------------------------------
//--                 Classification and Validation Functions                  --
//------------------------------------------------------------------------------
/**** ValueIsRoute ****/
export function ValueIsRoute(Value) {
    return ValueIsListSatisfying(Value, ValueIsOrdinal);
}
/**** allow/expect[ed]Route ****/
export const allowRoute = ValidatorForClassifier(ValueIsRoute, acceptNil, 'SIM route'), allowedRoute = allowRoute;
export const expectRoute = ValidatorForClassifier(ValueIsRoute, rejectNil, 'SIM route'), expectedRoute = expectRoute;
/**** ValueIsLocator ****/
export function ValueIsLocator(Value) {
    return (
    /* ValueIsName(Value) ||*/ ValueIsPath(Value) ||
        ValueIsOrdinal(Value) || ValueIsRoute(Value));
}
/**** allow/expect[ed]Locator ****/
export const allowLocator = ValidatorForClassifier(ValueIsLocator, acceptNil, 'SIM (board or sticker) locator'), allowedLocator = allowLocator;
export const expectLocator = ValidatorForClassifier(ValueIsLocator, rejectNil, 'SIM (board or sticker) locator'), expectedLocator = expectLocator;
/**** ValueIsBoardStickerPath (two paths, separated by a colon) ****/
const SIM_BoardStickerPathPattern = /^([-._\p{L}](?:[-._ \p{L}]*[-._\p{L}])?(?:\/[-._\p{L}](?:[-._ \p{L}]*[-._\p{L}])?)*)?:([-._\p{L}](?:[-._ \p{L}]*[-._\p{L}])?(?:\/[-._\p{L}](?:[-._ \p{L}]*[-._\p{L}])?)*)$/u;
export function ValueIsBoardStickerPath(Value) {
    return ValueIsStringMatching(Value, SIM_BoardStickerPathPattern);
}
/**** allow/expect[ed]BoardStickerPath ****/
export const allowBoardStickerPath = ValidatorForClassifier(ValueIsBoardStickerPath, acceptNil, 'SIM board and sticker path'), allowedBoardStickerPath = allowBoardStickerPath;
export const expectBoardStickerPath = ValidatorForClassifier(ValueIsBoardStickerPath, rejectNil, 'SIM board and sticker path'), expectedBoardStickerPath = expectBoardStickerPath;
/**** ValueIsBoardStickerLocator ****/
export function ValueIsBoardStickerLocator(Value) {
    return ValueIsListSatisfying(Value, ValueIsLocator, 2, 2);
}
/**** allow/expect[ed]BoardStickerLocator ****/
export const allowBoardStickerLocator = ValidatorForClassifier(ValueIsBoardStickerLocator, acceptNil, 'SIM board and sticker locator'), allowedBoardStickerLocator = allowBoardStickerLocator;
export const expectBoardStickerLocator = ValidatorForClassifier(ValueIsBoardStickerLocator, rejectNil, 'SIM board and sticker locator'), expectedBoardStickerLocator = expectBoardStickerLocator;
/**** ValueIsObjectPath (identifiers, separated by a point) ****/
export const SIM_ObjectPath = /^[a-z$_][a-z$_0-9]*([.][a-z$_][a-z$_0-9]*)*$/i;
export function ValueIsObjectPath(Value) {
    return ValueIsStringMatching(Value, SIM_ObjectPath);
}
/**** allow/expect[ed]ObjectPath ****/
export const allowObjectPath = ValidatorForClassifier(ValueIsObjectPath, acceptNil, 'SIM object path'), allowedObjectPath = allowObjectPath;
export const expectObjectPath = ValidatorForClassifier(ValueIsObjectPath, rejectNil, 'SIM object path'), expectedObjectPath = expectObjectPath;
/**** ValueIsErrorReport ****/
export function ValueIsErrorReport(Value) {
    return ValueIsPlainObject(Value) && (ValueIsOneOf(Value.Severity, SIM_ErrorSeverities) &&
        ValueIsTextline(Value.Title) && ValueIsText(Value.Message) &&
        ((Value.Sufferer == null) || ValueIsPlainObject(Value.Sufferer)) &&
        ((Value.Cause == null) || (Value.Cause instanceof Error)) &&
        ((Value.LineNumber == null) || ValueIsOrdinal(Value.LineNumber)));
}
/**** allow/expect[ed]ErrorReport ****/
export const allowErrorReport = ValidatorForClassifier(ValueIsErrorReport, acceptNil, 'SIM error report'), allowedErrorReport = allowErrorReport;
export const expectErrorReport = ValidatorForClassifier(ValueIsErrorReport, rejectNil, 'SIM error report'), expectedErrorReport = expectErrorReport;
/**** ValueIsAnchors ****/
export function ValueIsAnchors(Value) {
    return (ValueIsList(Value) && (Value.length === 2) &&
        ValueIsOneOf(Value[0], SIM_horizontalAnchorses) &&
        ValueIsOneOf(Value[1], SIM_verticalAnchorses));
}
/**** allow/expect[ed]Anchors ****/
export const allowAnchors = ValidatorForClassifier(ValueIsAnchors, acceptNil, 'SIM anchors list'), allowedAnchors = allowAnchors;
export const expectAnchors = ValidatorForClassifier(ValueIsAnchors, rejectNil, 'SIM anchors list'), expectedAnchors = expectAnchors;
/**** ValueIsOffsets ****/
export function ValueIsOffsets(Value) {
    return (ValueIsListSatisfying(Value, ValueIsFiniteNumber) && (Value.length === 4));
}
/**** allow/expect[ed]Offsets ****/
export const allowOffsets = ValidatorForClassifier(ValueIsOffsets, acceptNil, 'SIM offsets list'), allowedOffsets = allowOffsets;
export const expectOffsets = ValidatorForClassifier(ValueIsOffsets, rejectNil, 'SIM offsets list'), expectedOffsets = expectOffsets;
/**** ValueIsTextDecoration ****/
export function ValueIsTextDecoration(Value) {
    return (Value === 'none') || (ValueIsObject(Value) &&
        ValueIsBoolean(Value.isActive) &&
        ValueIsOneOf(Value.Line, SIM_TextDecorationLines) &&
        ((Value.Color == null) || ValueIsColor(Value.Color)) &&
        ((Value.Style == null) || ValueIsOneOf(Value.Style, SIM_TextDecorationStyles)) &&
        ((Value.Thickness == null) || ValueIsDimension(Value.Thickness)));
}
/**** allow/expect[ed]TextDecoration ****/
export const allowTextDecoration = ValidatorForClassifier(ValueIsTextDecoration, acceptNil, 'a text decoration'), allowedTextDecoration = allowTextDecoration;
export const expectTextDecoration = ValidatorForClassifier(ValueIsTextDecoration, rejectNil, 'a text decoration'), expectedTextDecoration = expectTextDecoration;
/**** ValueIsTextShadow ****/
export function ValueIsTextShadow(Value) {
    return (Value === 'none') || (ValueIsObject(Value) &&
        ValueIsBoolean(Value.isActive) &&
        ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset) &&
        ValueIsDimension(Value.BlurRadius) && ValueIsColor(Value.Color));
}
/**** allow/expect[ed]TextShadow ****/
export const allowTextShadow = ValidatorForClassifier(ValueIsTextShadow, acceptNil, 'sticker text shadow specification'), allowedTextShadow = allowTextShadow;
export const expectTextShadow = ValidatorForClassifier(ValueIsTextShadow, rejectNil, 'a text shadow specification'), expectedTextShadow = expectTextShadow;
/**** ValueIsBackgroundTexture ****/
export function ValueIsBackgroundTexture(Value) {
    return (Value === 'none') || (ValueIsObject(Value) &&
        ValueIsBoolean(Value.isActive) &&
        ValueIsURL(Value.ImageURL) &&
        ValueIsOneOf(Value.Mode, SIM_BackgroundModes) &&
        ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset));
}
/**** allow/expect[ed]BackgroundTexture ****/
export const allowBackgroundTexture = ValidatorForClassifier(ValueIsBackgroundTexture, acceptNil, 'sticker background texture'), allowedBackgroundTexture = allowBackgroundTexture;
export const expectBackgroundTexture = ValidatorForClassifier(ValueIsBackgroundTexture, rejectNil, 'sticker background texture'), expectedBackgroundTexture = expectBackgroundTexture;
/**** ValueIsBorderStyle ****/
export function ValueIsBorderStyle(Value) {
    return ValueIsOneOf(Value, SIM_BorderStyles);
}
/**** allow/expect[ed]BorderStyle ****/
export const allowBorderStyle = ValidatorForClassifier(ValueIsBorderStyle, acceptNil, 'sticker border style'), allowedBorderStyle = allowBorderStyle;
export const expectBorderStyle = ValidatorForClassifier(ValueIsBorderStyle, rejectNil, 'sticker border style'), expectedBorderStyle = expectBorderStyle;
/**** ValueIsBoxShadow ****/
export function ValueIsBoxShadow(Value) {
    return (Value === 'none') || (ValueIsObject(Value) &&
        ValueIsBoolean(Value.isActive) &&
        ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset) &&
        ValueIsDimension(Value.BlurRadius) && ValueIsDimension(Value.SpreadRadius) &&
        ValueIsColor(Value.Color));
}
/**** allow/expect[ed]BoxShadow ****/
export const allowBoxShadow = ValidatorForClassifier(ValueIsBoxShadow, acceptNil, 'sticker box shadow specification'), allowedBoxShadow = allowBoxShadow;
export const expectBoxShadow = ValidatorForClassifier(ValueIsBoxShadow, rejectNil, 'sticker box shadow specification'), expectedBoxShadow = expectBoxShadow;
/**** ValueIsOverflowList ****/
export function ValueIsOverflowList(Value) {
    return ValueIsListSatisfying(Value, (Value) => ValueIsOneOf(Value, SIM_Overflows), 2, 2);
}
/**** allow/expect[ed]OverflowList ****/
export const allowOverflowList = ValidatorForClassifier(ValueIsOverflowList, acceptNil, 'SIM overflow list'), allowedOverflowList = allowOverflowList;
export const expectOverflowList = ValidatorForClassifier(ValueIsOverflowList, rejectNil, 'SIM overflow list'), expectedOverflowList = expectOverflowList;
/**** ValueIsCompound ****/
function ValueIsCompound(Value) {
    return ValueIsPlainObject(Value) && ((Value.Variant === 'sim/special/compound') ||
        (Value.Variant === 'sim/special/content') || (Value.Variant === 'sim/special/template') ||
        (Value.Variant === 'sim/special/overlay') || (Value.Variant === 'sim/special/dialog') ||
        (Value.Variant === 'sim/special/applet') || (Value.Variant === 'sim/special/page') ||
        (Value.Variant === 'sim/special/single-page-applet'));
}
/**** ValueIsSerializableValue ****/
export function ValueIsSerializableValue(Value) {
    switch (true) {
        case (Value == null): // deliberately also allows undefined
        case ValueIsBoolean(Value):
        case ValueIsNumber(Value):
        case ValueIsString(Value):
        case ValueIsListSatisfying(Value, ValueIsSerializableValue):
            return true;
        case ValueIsPlainObject(Value): // *C* check for recursion
            for (let Property in Value) {
                if (Value.hasOwnProperty(Property) &&
                    !ValueIsSerializableValue(Value[Property])) {
                    return false;
                }
            }
            return true;
    }
    return false;
}
/**** allow/expect[ed]SerializableValue ****/
export const allowSerializableValue = ValidatorForClassifier(ValueIsSerializableValue, acceptNil, 'serializable value'), allowedSerializableValue = allowSerializableValue;
export const expectSerializableValue = ValidatorForClassifier(ValueIsSerializableValue, rejectNil, 'serializable value'), expectedSerializableValue = expectSerializableValue;
/**** ValueIsSerializableObject ****/
export function ValueIsSerializableObject(Value) {
    if (ValueIsPlainObject(Value)) {
        for (let Property in Value) {
            if (Value.hasOwnProperty(Property) &&
                !ValueIsSerializableValue(Value[Property])) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
/**** allow/expect[ed]SerializableObject ****/
export const allowSerializableObject = ValidatorForClassifier(ValueIsSerializableObject, acceptNil, 'serializable object'), allowedSerializableObject = allowSerializableObject;
export const expectSerializableObject = ValidatorForClassifier(ValueIsSerializableObject, rejectNil, 'serializable object'), expectedSerializableObject = expectSerializableObject;
/**** ValueIsLineList ****/
export function ValueIsLineList(Value, Pattern) {
    const Validator = (Pattern == null
        ? ValueIsTextline
        : (Value) => ValueIsStringMatching(Value, Pattern));
    return ValueIsListSatisfying(Value, Validator);
}
/**** allow/expect[ed]LineList ****/
export function allowLineList(Description, Argument, Pattern) {
    return (Argument == null
        ? Argument
        : expectedLineList(Description, Argument, Pattern));
}
export const allowedLineList = allowLineList;
export function expectLineList(Description, Argument, Pattern) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    else {
        const Validator = (Pattern == null
            ? ValueIsTextline
            : (Value) => ValueIsStringMatching(Value, Pattern));
        if (ValueIsListSatisfying(Argument, Validator)) {
            return Argument;
        }
        else {
            throwError(`InvalidArgument: the given value is no ${escaped(Description)}`);
        }
    }
}
export const expectedLineList = expectLineList;
/**** ValueIsNumberList ****/
export function ValueIsNumberList(Value, minValue, maxValue, withMin, withMax) {
    const Validator = ((minValue == null) && (maxValue == null)
        ? ValueIsNumber
        : (Value) => ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax));
    return ValueIsListSatisfying(Value, Validator);
}
/**** allow/expect[ed]NumberList ****/
export function allowNumberList(Description, Argument, minValue, maxValue, withMin, withMax) {
    return (Argument == null
        ? Argument
        : expectedNumberList(Description, Argument, minValue, maxValue, withMin, withMax));
}
export const allowedNumberList = allowNumberList;
export function expectNumberList(Description, Argument, minValue, maxValue, withMin, withMax) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    else {
        const Validator = ((minValue == null) && (maxValue == null)
            ? ValueIsNumber
            : (Value) => ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax));
        if (ValueIsListSatisfying(Argument, Validator)) {
            return Argument;
        }
        else {
            throwError(`InvalidArgument: the given value is no ${escaped(Description)}`);
        }
    }
}
export const expectedNumberList = expectNumberList;
/**** ValueIsIntegerList ****/
export function ValueIsIntegerList(Value, minValue, maxValue) {
    const Validator = ((minValue == null) && (maxValue == null)
        ? ValueIsInteger
        : (Value) => ValueIsIntegerInRange(Value, minValue, maxValue));
    return ValueIsListSatisfying(Value, Validator);
}
/**** allow/expect[ed]IntegerList ****/
export function allowIntegerList(Description, Argument, minValue, maxValue) {
    return (Argument == null
        ? Argument
        : expectedIntegerList(Description, Argument, minValue, maxValue));
}
export const allowedIntegerList = allowIntegerList;
export function expectIntegerList(Description, Argument, minValue, maxValue) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    else {
        const Validator = ((minValue == null) && (maxValue == null)
            ? ValueIsInteger
            : (Value) => ValueIsIntegerInRange(Value, minValue, maxValue));
        if (ValueIsListSatisfying(Argument, Validator)) {
            return Argument;
        }
        else {
            throwError(`InvalidArgument: the given value is no ${escaped(Description)}`);
        }
    }
}
export const expectedIntegerList = expectIntegerList;
//------------------------------------------------------------------------------
//--                    Configuration Validation Functions                    --
//------------------------------------------------------------------------------
/**** acceptSetting ****/
function acceptSetting(Key, Configuration, Validator, Description) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    //  expectFunction  ('validator function',Validator)
    //  expectTextline         ('expectation',Description)
    if ((Key in Configuration) && (Configuration[Key] !== undefined)) {
        if (Validator(Configuration[Key]) != true)
            throwError('InvalidArgument: property ' + quoted(Key) + ' is no valid ' + Description);
    }
}
/**** rejectSetting ****/
function rejectSetting(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    if ((Key in Configuration) && (Configuration[Key] != null))
        throwError('InvalidArgument: property ' + quoted(Key) + ' must not be configured');
}
/**** acceptBoolean ****/
function acceptBoolean(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsBoolean, 'boolean value');
}
/**** acceptOrdinal ****/
function acceptOrdinal(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsOrdinal, 'ordinal number');
}
/**** acceptText ****/
function acceptText(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsText, 'text');
}
/**** acceptTextline ****/
function acceptTextline(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsTextline, 'line of text');
}
/**** acceptOneOf ****/
function acceptOneOf(Key, Configuration, ValueList, Description) {
    //  expectIdentifier      ('property name',Key)
    //  expectPlainObject ('configuration set',Configuration)
    //  expectList('list of acceptable values',ValueList)
    //  expectTextline          ('expectation',Description)
    acceptSetting(Key, Configuration, (Value) => ValueIsOneOf(Value, ValueList), Description);
}
/**** acceptPlainObject ****/
function acceptPlainObject(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsPlainObject, 'JavaScript object');
}
/**** acceptFunction ****/
function acceptFunction(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsFunction, 'JavaScript function');
}
/**** acceptLocation ****/
function acceptLocation(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsLocation, 'coordinate value');
}
/**** acceptDimension ****/
function acceptDimension(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsDimension, 'simension value');
}
/**** acceptAnchors ****/
function acceptAnchors(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsAnchors, 'SIM anchor list');
}
/**** acceptOffsets ****/
function acceptOffsets(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsOffsets, 'SIM offset list');
}
/**** acceptName ****/
function acceptName(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsName, 'SIM name');
}
/**** acceptPath ****/
function acceptPath(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsPath, 'SIM path');
}
/**** acceptLocator ****/
function acceptLocator(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsLocator, 'SIM name, path, index or route');
}
/**** acceptColor ****/
function acceptColor(Key, Configuration) {
    //  expectIdentifier     ('property name',Key)
    //  expectPlainObject('configuration set',Configuration)
    acceptSetting(Key, Configuration, ValueIsColor, 'color');
}
/**** acceptableValue ****/
export function acceptableValue(Value, Validator, Default = undefined) {
    return ((Value == null) || (Validator(Value) !== true) ? Default : Value);
}
//------------------------------------------------------------------------------
//--                        unique/internalId Support                         --
//------------------------------------------------------------------------------
/**** newId - uses nanoid with custom dictionary ****/
export const newId = customAlphabet(nolookalikesSafe, 21);
/**** newInternalId ****/
let IdCounter = 0;
function newInternalId(Type) {
    IdCounter += 1;
    return `sim-${Type}-${IdCounter}`;
}
//------------------------------------------------------------------------------
//--                           Stylesheet Handling                            --
//------------------------------------------------------------------------------
let StyleElement = document.getElementById('SIM-Stylesheet');
if (StyleElement == null) {
    StyleElement = document.createElement('style');
    StyleElement.id = 'SIM-Stylesheet';
    StyleElement.textContent = `
/*******************************************************************************
*                                                                              *
*                       Smart Information Manager (SIM)                        *
*                                                                              *
*******************************************************************************/

  :not(:defined) { visibility:hidden }

/**** some basic settings ****/

  .sim-project    { box-sizing:content-box }
  .sim-project  * { box-sizing:border-box }
  .sim-designer * { box-sizing:border-box }

  .sim-project, .sim-board, .sim-virtual-board {
    display:block; position:absolute;
    left:0px; top:0px; width:100%; height:100%;
  }

  .sim-sticker, .sim-delegated-sticker {
    display:block; position:absolute;
  }

  .sim-virtual-board > .sim-delegated-sticker {
    left:0px; top:0px; width:100%; height:100%;
  }

  .sim-sticker > * { /* sticker defines size, content occupies it */
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px; width:100%; height:100%;
  }

/**** OverlayView ****/

  .sim-overlay-view {
    box-sizing:border-box;
    display:block; position:fixed;
    background:white; color:black;
    box-shadow:0px 0px 5px 0px black;
    z-index:1000000;
  }
  .sim-overlay-view.in-dialog {
    z-index:3000000;
  }
  .sim-overlay-view.in-dialog.in-designer {
    z-index:6000000;
  }

/**** Underlay ****/

  .sim-underlay {
    display:block; position:fixed;
    left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    z-index:1000000;
    pointer-events:auto;
  }
  .sim-underlay.in-dialog.modal {
    background-image:repeating-linear-gradient(-45deg,
      rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
      rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
    ); background-size:11.31px 11.31px;
    opacity:0.1;
  }
  .sim-underlay.in-dialog {
    z-index:3000000;
  }
  .sim-underlay.in-dialog.in-designer {
    z-index:5000000;
  }

/**** DialogView ****/

  .sim-dialog-view {
    box-sizing:border-box;
    display:flex; flex-flow:column nowrap; align-items:stretch;
    position:fixed; overflow:hidden;
    border:solid 1px #000000; border-radius:4px;
    background:white; color:black;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.5);
    z-index:2000000;
    pointer-events:auto;
  }
  .sim-dialog-view.in-designer {
    z-index:5000000;
  }
  .sim-dialog-view * {
    box-sizing:border-box;
  }

/**** DialogView Controls ****/

  .sim-dialog-view > .titlebar {
    display:flex; flex-flow:row nowrap; align-items:center; flex:0 0 auto;
    position:relative; left:0px; top:0px; right:0px; height:30px; overflow:hidden;
    background:#EEEEEE; border:none; border-bottom:solid 1px gray;
    border-radius:3px 3px 0px 0px;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .sim-dialog-view > .titlebar > .title {
    display:inline-block; position:relative; flex:1 0 auto;
    margin-left:6px; margin-top:3px; margin-right:10px; width:auto; height:24px;
    border:none;
    font-weight:bold; color:black; line-height:24px;
    user-select:none;
  }

  .sim-dialog-view.draggable > .titlebar > .title {
    cursor:grab;
  }

  .sim-dialog-view > .titlebar > .close-button {
    display:inline-block; position:relative;
    margin-top:3px; margin-right:4px; width:24px; height:24px;
    border:none;
    background:url(/icons/xmark.png);
    background-repeat:no-repeat;
    background-size:contain; background-position:center;
    cursor:pointer;
    user-select:none; pointer-events:auto;
  }

  .sim-dialog-view > .content-pane {
    display:inline-block; position:relative; flex:1 1 auto;
    left:0px; top:0px; width:auto; height:auto; overflow:auto;
    border:none; border-radius:0px 0px 3px 3px;
  }

  .sim-dialog-view.resizable > .content-pane {
    border-radius:0px;
  }

  .sim-dialog-view > .resizer {
    display:flex; flex-flow:row nowrap; align-items:center; flex:0 0 auto;
    position:relative; left:0px; top:0px; width:auto; height:9px;
    border:none; border-top:solid 1px gray; border-radius:0px 0px 3px 3px;
  }

  .sim-dialog-view > .resizer > .left-resizer {
    display:inline-block; position:relative;
    left:0px; bottom:0px; width:30px; height:9px;
    border:none; border-right:solid 1px gray;
    border-radius:0px 0px 0px 3px;
    cursor:nesw-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .sim-dialog-view > .resizer > .middle-resizer {
    display:inline-block; flex:1 0 auto;
     position:relative; left:0px; top:0px; width:auto; height:9px;
    border:none; border-radius:0px;
    cursor:ns-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .sim-dialog-view > .resizer > .right-resizer {
    display:inline-block; position:relative;
    left:0px; top:0px; width:30px; height:9px;
    border:none; border-left:solid 1px gray; border-radius:0px 0px 3px 0px;
    cursor:nwse-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** ModalLayer ****/

  .sim-modal-layer {
    display:block; position:fixed;
    left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    background-image:repeating-linear-gradient(-45deg,
      rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
      rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
    ); background-size:11.31px 11.31px;
    opacity:0.2;
    z-index:1999999;
    pointer-events:auto;
  }
  .sim-modal-layer.in-designer {
    z-index:3999999;
  }

/**** DesignerButton ****/

  .sim-designer-button {
    display:block; position:fixed;
    width:32px; height:32px;
    background:white;
    border:solid 2px black; border-radius:50%;
    outline:solid 1px white;
    font-size:20px ! important; line-height:26px ! important; text-align:center;
    pointer-events:auto;

    user-select:none;
    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .sim-designer-button > * {
    pointer-events:none;
  }

/**** DesignerLayer ****/

  .sim-designer-layer {
    box-sizing:border-box;
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    padding:0px;
    background:none;

    color:black;
    font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-size:14px; font-weight:400; line-height:1.4; color:black;
    text-align:left; text-shadow:none;

    z-index:5000000;
    pointer-events:none;
  }

  .sim-designer-layer * { box-sizing:border-box }

/**** some special settings ****/

  span.sim-designer.board-label.active-board {
    font-weight:bold; font-style:italic; text-decoration:underline;
  }

/**** changes for the Console dialog ****/

  .sim-dialog-view.in-designer[name="Console"] > .content-pane {
    overflow:visible; /* makes the ClearButton visible */
  }/**** Layouter Layer ****/

  .sim-designer-layouterlayer {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    z-index:4000000;
    pointer-events:auto; cursor:crosshair;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .sim-designer-cover {
    display:block; position:absolute;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** Selection Markers ****/

  .sim-designer-cover {
    cursor:pointer;
  }

  .sim-designer-cover[selected] {
    outline:dotted 2px orangered;
    cursor:grab;
  }

  .sim-designer-cover.dragging[selected] {
    cursor:grabbing;
  }

  .sim-designer-shape-handle {
    display:block; position:absolute;
    width:8px; height:8px;
    background:orangered; border:solid 1px darkgray;
    z-index:5000001; /* above .sim-designer-cover */
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** Selection Lasso ****/

  .sim-designer-lasso {
    display:block; position:absolute;
    background:rgba(255,69,0, 0.1); /* border:dashed 2px orangered; */
    pointer-events:none;
  }

/**** Dragging Guides ****/

  .sim-designer-horizontal-guide.edge {
    display:block; position:absolute;
    left:0px; right:0px; height:1px;
    border-top:dashed 1px orangered;
    pointer-events:none;
  }
  .sim-designer-vertical-guide.edge {
    display:block; position:absolute;
    top:0px; bottom:0px; width:1px;
    border-left:dashed 1px orangered;
    pointer-events:none;
  }

  .sim-designer-horizontal-guide.center {
    display:block; position:absolute;
    left:0px; right:0px; height:1px;
    border-top:dotted 1px orangered;
    pointer-events:none;
  }
  .sim-designer-vertical-guide.center {
    display:block; position:absolute;
    top:0px; bottom:0px; width:1px;
    border-left:dotted 1px orangered;
    pointer-events:none;
  }

/**** some common settings ****/

  datalist { display:none ! important }

  .expanding { flex:1 0 auto }

  .disabled, [disabled] { opacity:0.4 }
  .readonly             { background:none }
  .pointer-unaware      { pointer-events:none }


    `.trim();
    document.head.prepend(StyleElement); // this stylesheet should be the 1st one
}
//------------------------------------------------------------------------------
//--                      configurable Property Support                       --
//------------------------------------------------------------------------------
export const SIM_PropertyEditorTypes = [
    'checkbox', 'choice',
    'textline-input', 'password-input', 'number-input', 'integer-input', 'search-input',
    'phone-number-input', 'email-address-input', 'url-input',
    'time-input', 'date-time-input', 'date-input', 'week-input', 'month-input',
    'color-input', 'drop-down', 'slider',
    'text-input', 'html-input', 'css-input', 'javascript-input', 'json-input',
    'linelist-input', 'numberlist-input'
];
/**** the following names must not be used for custom properties ****/
const forbiddenPropertyNames = Object.create(null);
`
    Name Variant fixed automatic permanent hidden disabled
    x y Width Height Anchors Offsets minWidth minHeight maxWidth maxHeight
    SnapToGrid GridWidth GridHeight
    FontFamily FontSize FontWeight FontStyle
    TextDecoration TextShadow TextAlignment LineHeight
    ForegroundColor hasBackground BackgroundColor BackgroundTexture
    BorderWidths BorderStyles BorderColors BorderRadii
    BoxShadow
    Opacity Cursor Overflows
    autoConfigureInput autoPreserveProject
    pendingScript Script activeScript
    activeBoard StateBase
    BoardList StickerList
  `.trim().replace(/\s+/g, ' ').split(' ').forEach((PropertyName) => forbiddenPropertyNames[PropertyName] = true);
/**** ValueIsPropertyDescriptor ****/
function ValueIsPropertyDescriptor(Value) {
    if (!ValueIsPlainObject(Value) ||
        !ValueIsIdentifier(Value.Name) ||
        (Value.Name in forbiddenPropertyNames) ||
        (Value.Label != null) && !ValueIsTextline(Value.Label) ||
        (Value.EditorType == null) ||
        !ValueIsOneOf(Value.EditorType, SIM_PropertyEditorTypes) ||
        (Value.readonly != null) && !ValueIsBoolean(Value.readonly)) {
        return false;
    }
    /**** validate editor-specific settings ****/
    const { EditorType, Placeholder, FalseValue, TrueValue, minLength, maxLength, multiple, Pattern, minValue, maxValue, Stepping, Resizability, LineWrapping, SpellChecking, ValueList, Hashmarks, Suggestions } = Value;
    switch (EditorType) {
        case 'checkbox':
            break;
        case 'choice': // drop-down for boolean properties
            if (!ValueIsTextline(FalseValue) || !ValueIsTextline(TrueValue)) {
                return false;
            }
            break;
        case 'textline-input':
        case 'password-input':
        case 'email-address-input':
        case 'phone-number-input':
        case 'url-input':
        case 'search-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minLength != null) && !ValueIsOrdinal(minLength) ||
                (maxLength != null) && !ValueIsOrdinal(maxLength) ||
                (multiple != null) && !ValueIsBoolean(multiple) && (EditorType === 'email-address-input') ||
                (SpellChecking != null) && !ValueIsBoolean(SpellChecking) && (EditorType === 'textline-input') ||
                (Pattern != null) && !ValueIsTextline(Pattern) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsTextline)) {
                return false;
            }
            break;
        case 'number-input':
        case 'integer-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minValue != null) && !ValueIsFiniteNumber(minValue) ||
                (maxValue != null) && !ValueIsFiniteNumber(maxValue) ||
                (Stepping != null) && !ValueIsNumberInRange(Stepping, 0, Infinity, false) && (Stepping !== 'any') ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsFiniteNumber)) {
                return false;
            }
            break;
        case 'time-input':
            if ((minValue != null) && !ValueIsTime(minValue) ||
                (maxValue != null) && !ValueIsTime(maxValue) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsTime)) {
                return false;
            }
            break;
        case 'date-time-input':
            if ((minValue != null) && !ValueIsDateTime(minValue) ||
                (maxValue != null) && !ValueIsDateTime(maxValue) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsDateTime)) {
                return false;
            }
            break;
        case 'date-input':
            if ((minValue != null) && !ValueIsDate(minValue) ||
                (maxValue != null) && !ValueIsDate(maxValue) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsDate)) {
                return false;
            }
            break;
        case 'week-input':
            if ((minValue != null) && !ValueIsWeek(minValue) ||
                (maxValue != null) && !ValueIsWeek(maxValue) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsWeek)) {
                return false;
            }
            break;
        case 'month-input':
            if ((minValue != null) && !ValueIsMonth(minValue) ||
                (maxValue != null) && !ValueIsMonth(maxValue) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsMonth)) {
                return false;
            }
            break;
        case 'color-input':
            break;
        case 'drop-down':
            if (!ValueIsListSatisfying(ValueList, ValueIsTextline)) {
                return false;
            }
            break;
        case 'slider':
            if ((minValue != null) && !ValueIsFiniteNumber(minValue) ||
                (maxValue != null) && !ValueIsFiniteNumber(maxValue) ||
                (Stepping != null) && !ValueIsNumberInRange(Stepping, 0, Infinity, false) && (Stepping !== 'any') ||
                (Hashmarks != null) && !ValueIsListSatisfying(Hashmarks, ValueIsTextline) // *C* could be better
            ) {
                return false;
            }
            break;
        case 'text-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minLength != null) && !ValueIsOrdinal(minLength) ||
                (maxLength != null) && !ValueIsOrdinal(maxLength) ||
                (SpellChecking != null) && !ValueIsBoolean(SpellChecking) ||
                (Resizability != null) && !ValueIsOneOf(Resizability, ['none', 'horizontal', 'vertical', 'both']) ||
                (LineWrapping != null) && !ValueIsBoolean(LineWrapping)) {
                return false;
            }
            break;
        case 'html-input':
        case 'css-input':
        case 'javascript-input':
        case 'json-input':
        case 'linelist-input':
        case 'numberlist-input':
        case 'integerlist-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minLength != null) && !ValueIsOrdinal(minLength) ||
                (maxLength != null) && !ValueIsOrdinal(maxLength) ||
                (Resizability != null) && !ValueIsOneOf(Resizability, ['none', 'horizontal', 'vertical', 'both']) ||
                (LineWrapping != null) && !ValueIsBoolean(LineWrapping)) {
                return false;
            }
            break;
    }
    return true;
}
/**** validatePropertyDescriptors ****/
function validatePropertyDescriptors(Value, ErrorReporter) {
    if (!ValueIsList(Value)) {
        if (ErrorReporter != null) {
            ErrorReporter('PropertyDescriptors');
        }
        else {
            throwError('InvalidArgument: the given list of property descriptors is no ' +
                'valid list');
        }
    }
    ;
    Value.forEach((Value, i) => {
        if (!ValueIsPropertyDescriptor(Value)) {
            if (ErrorReporter != null) {
                ErrorReporter('PropertyDescriptor #' + (i + 1));
            }
            else {
                throwError('InvalidArgument: PropertyDescriptor #' + (i + 1) + ' is invalid');
            }
        }
    });
}
/**** normalizedPropertyDescriptor ****/
function normalizedPropertyDescriptor(Value) {
    if (!ValueIsPropertyDescriptor(Value))
        throwError(`InvalidArgument: invalid descriptor for property ${Value.Name == null ? '' : quoted('' + Value.Name)}`);
    let { Name, Label, EditorType, readonly, Default, Placeholder, FalseValue, TrueValue, minLength, maxLength, multiple, Pattern, minValue, maxValue, withMin, withMax, Stepping, Resizability, LineWrapping, SpellChecking, ValueList, Hashmarks, Suggestions } = Value;
    if (Label == null) {
        Label = Name;
    }
    let Descriptor = { Name, Label, EditorType };
    if (readonly != null) {
        Descriptor.readonly = readonly;
    }
    if (Default != null) {
        Descriptor.Default = Default;
    }
    switch (Value.EditorType) {
        case 'checkbox':
            break;
        case 'choice': // drop-down for boolean properties
            Descriptor.FalseValue = FalseValue;
            Descriptor.TrueValue = TrueValue;
            break;
        case 'textline-input':
        case 'password-input':
        case 'email-address-input':
        case 'phone-number-input':
        case 'url-input':
        case 'search-input':
            if (Placeholder != null) {
                Descriptor.Placeholder = Placeholder;
            }
            if (minLength != null) {
                Descriptor.minLength = minLength;
            }
            if (maxLength != null) {
                Descriptor.maxLength = maxLength;
            }
            if (multiple != null) {
                Descriptor.multiple = multiple;
            }
            if (SpellChecking != null) {
                Descriptor.SpellChecking = SpellChecking;
            }
            if (Pattern != null) {
                Descriptor.Pattern = Pattern;
            }
            if (Suggestions != null) {
                Descriptor.Suggestions = Suggestions.slice();
            }
            break;
        case 'number-input':
        case 'integer-input':
            if (Placeholder != null) {
                Descriptor.Placeholder = Placeholder;
            }
            if (minValue != null) {
                Descriptor.minValue = minValue;
            }
            if (maxValue != null) {
                Descriptor.maxValue = maxValue;
            }
            if (Stepping != null) {
                Descriptor.Stepping = Stepping;
            }
            if (Suggestions != null) {
                Descriptor.Suggestions = Suggestions.slice();
            }
            break;
        case 'time-input':
        case 'date-time-input':
        case 'date-input':
        case 'month-input':
        case 'week-input':
            if (minValue != null) {
                Descriptor.minValue = minValue;
            }
            if (maxValue != null) {
                Descriptor.maxValue = maxValue;
            }
            if (Suggestions != null) {
                Descriptor.Suggestions = Suggestions.slice();
            }
            break;
        case 'color-input':
            break;
        case 'drop-down':
            Descriptor.ValueList = ValueList;
            break;
        case 'slider':
            if (minValue != null) {
                Descriptor.minValue = minValue;
            }
            if (maxValue != null) {
                Descriptor.maxValue = maxValue;
            }
            if (Stepping != null) {
                Descriptor.Stepping = Stepping;
            }
            if (Hashmarks != null) {
                Descriptor.Hashmarks = Hashmarks.slice();
            }
            break;
        case 'text-input':
            if (Placeholder != null) {
                Descriptor.Placeholder = Placeholder;
            }
            if (minLength != null) {
                Descriptor.minLength = minLength;
            }
            if (maxLength != null) {
                Descriptor.maxLength = maxLength;
            }
            if (SpellChecking != null) {
                Descriptor.SpellChecking = SpellChecking;
            }
            if (Resizability != null) {
                Descriptor.Resizability = Resizability;
            }
            if (LineWrapping != null) {
                Descriptor.LineWrapping = LineWrapping;
            }
            break;
        case 'html-input':
        case 'css-input':
        case 'javascript-input':
        case 'json-input':
        case 'linelist-input':
        case 'numberlist-input':
        case 'integerlist-input':
            if (Placeholder != null) {
                Descriptor.Placeholder = Placeholder;
            }
            if (minLength != null) {
                Descriptor.minLength = minLength;
            }
            if (maxLength != null) {
                Descriptor.maxLength = maxLength;
            }
            if (Resizability != null) {
                Descriptor.Resizability = Resizability;
            }
            if (LineWrapping != null) {
                Descriptor.LineWrapping = LineWrapping;
            }
            break;
    }
    return Descriptor;
}
//------------------------------------------------------------------------------
//--                            Variant Management                            --
//------------------------------------------------------------------------------
const emptyVariant = {
    Name: undefined, Synopsis: undefined,
    Stylesheet: '',
    initialConfiguration: {},
    pendingScript: '', Script: '',
    PropertyDescriptors: [],
};
const VariantRegistry = Object.create(null);
/**** validateVariant ****/
function validateVariant(Value) {
    switch (true) {
        case !ValueIsPlainObject(Value):
            throwError('the given sticker variant descriptor is no plain JavaScript object');
        case !ValueIsPath(Value.Name):
            throwConfigurationError('Name');
        case (Value.Synopsis != null) && !ValueIsText(Value.Synopsis):
            throwConfigurationError('Synopsis');
        case (Value.initialConfiguration != null) && !ValueIsPlainObject(Value.initialConfiguration):
            throwConfigurationError('initialConfiguration');
        case (Value.Script != null) && !ValueIsText(Value.Script):
            throwConfigurationError('Script');
        case (Value.pendingScript != null) && !ValueIsText(Value.pendingScript):
            throwConfigurationError('pendingScript');
        case (Value.Stylesheet != null) && !ValueIsText(Value.Stylesheet):
            throwConfigurationError('Stylesheet');
        case (Value.PropertyDescriptors != null):
            validatePropertyDescriptors(Value.PropertyDescriptors, throwConfigurationError);
    }
    function throwConfigurationError(PropName) {
        throwError('InvalidArgument: invalid "' + PropName + '" in sticker variant' +
            (ValueIsName(Value.Name) ? ' ' + quoted(Value.Name) : '') + ' given');
    }
}
/**** internalizedVariant (given sticker variant was validated before) ****/
function internalizedVariant(Variant) {
    // @ts-ignore TS2322 Internalization is indeed incomplete, but that's ok
    const Internalization = Object.assign({}, Variant);
    Internalization.PropertyDescriptors = deepCopyOf(Variant.PropertyDescriptors);
    updateInternalsOfVariant(Internalization, Internalization);
    return Internalization;
}
/**** updateInternalsOfVariant ****/
function updateInternalsOfVariant(Variant, Configuration) {
    var _a, _b, _c;
    if (Configuration.Name != null) {
        Variant[$normalizedName] = _normalizedPath(Configuration.Name);
    }
    if ('Stylesheet' in Configuration) {
        if (((_a = Configuration.Stylesheet) !== null && _a !== void 0 ? _a : '').trim() === '') {
            delete Variant.Stylesheet;
        }
    }
    if ('pendingScript' in Configuration) {
        delete Variant[$pendingScriptError];
        if (((_b = Configuration.pendingScript) !== null && _b !== void 0 ? _b : '').trim() === '') {
            delete Variant.pendingScript;
        }
        else {
            try {
                const compiledScript = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                    'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                    'contextualAPI,preserveProject', Configuration.pendingScript);
            }
            catch (Signal) {
                Variant[$pendingScriptError] = {
                    Message: Signal.message, LineNumber: Signal.lineNumber
                };
            }
        }
    }
    if ('Script' in Configuration) {
        if (((_c = Configuration.Script) !== null && _c !== void 0 ? _c : '').trim() === '') {
            delete Variant.Script;
        }
        else {
            try {
                Variant[$activeScript] = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                    'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                    'contextualAPI,preserveProject', Configuration.Script);
            }
            catch (Signal) {
                Variant[$activeScript] = () => { };
                Variant[$ErrorReport] = {
                    Severity: 'fatal',
                    Title: 'Sticker Variant Script Compilation Failure',
                    Message: 'Compilation failed with ' + Signal,
                    Sufferer: Variant, Cause: Signal, LineNumber: Signal.lineNumber
                };
            }
        }
    }
}
/**** externalizedVariant - with serializable values only ****/
function externalizedVariant(Variant) {
    const Externalization = Object.assign({}, Variant); // w/o symbol-indexed Properties
    Externalization.PropertyDescriptors = deepCopyOf(Variant.PropertyDescriptors);
    return Externalization;
}
/**** registerVariant ****/
export function registerVariant(Variant, overwrite = false) {
    validateVariant(Variant);
    expectBoolean('mode flag', overwrite);
    let normalizedPath = _normalizedPath(Variant.Name);
    if (normalizedPath.startsWith('sim/'))
        throwError('InvalidArgument: sticker variants in group "sim" are intrinsic and can not ' +
            'be registered or changed');
    if (normalizedPath in VariantRegistry)
        throwError('MultipleDefinitions:sticker variant "' + Variant.Name + '" has already been registered');
    const NameList = normalizedPath.split('/');
    for (let i = 0, l = NameList.length - 1; i < l; i++) {
        const PathToTest = NameList.slice(0, i + 1).join('/');
        if (PathToTest in VariantRegistry)
            throwError('MultipleDefinitions:sticker group "' + PathToTest + '" has already been ' +
                'registered as a sticker variant');
    }
    __registerVariant(Variant);
    rerenderAllActiveProjects();
}
/**** reregisterVariant ****/
export function reregisterVariant(Variant) {
    registerVariant(Variant, true);
}
/**** _registerVariant - for intrinsic sticker variants ****/
function _registerVariant(Name, Renderer, Stylesheet, PropertyDescriptors = [], initialConfiguration = {}) {
    const Variant = {
        Name, Stylesheet, PropertyDescriptors, initialConfiguration
    };
    __registerVariant(Variant, Renderer);
}
/**** __registerVariant ****/
function __registerVariant(Variant, Renderer) {
    const Internalization = internalizedVariant(Variant);
    if (Renderer != null) {
        Internalization.Script = Renderer.toString();
        Internalization[$activeScript] = Renderer;
    }
    const normalizedName = Internalization[$normalizedName];
    if (Internalization.Stylesheet == null) {
        uninstallStylesheetFor(normalizedName, Internalization.Stylesheet);
    }
    else {
        installStylesheetFor(normalizedName, Internalization.Stylesheet, true);
    }
    VariantRegistry[normalizedName] = Internalization;
}
/**** unregisterVariant ****/
export function unregisterVariant(Name) {
    expectPath('sticker variant name', Name);
    let normalizedPath = _normalizedPath(Name);
    if (normalizedPath.startsWith('sim/'))
        throwError('InvalidArgument: sticker variants in group "sim" are intrinsic and can not ' +
            'be deregistered');
    if (normalizedPath in VariantRegistry) {
        uninstallStylesheetFor(Name);
        delete VariantRegistry[normalizedPath];
        rerenderAllActiveProjects();
    }
}
/**** VariantIsIntrinsic ****/
function VariantIsIntrinsic(Variant) {
    return _normalizedPath(Variant).startsWith('sim/');
}
/**** VariantIsBroken ****/
function VariantIsBroken(Variant) {
    var _a;
    return (((_a = VariantRegistry[_normalizedPath(Variant)]) === null || _a === void 0 ? void 0 : _a[$ErrorReport]) != null);
}
/**** VariantIsUnused ****/
function VariantIsUnused(Variant, Project) {
    const normalizedName = _normalizedPath(Variant);
    let VariantIsUsed = false;
    Project.BoardList.forEach((Board) => searchVariantInBoard(Board));
    return !VariantIsUsed;
    function searchVariantInBoard(Board) {
        if (VariantIsUsed) {
            return;
        }
        ;
        Board.StickerList.forEach((Sticker) => searchVariantInSticker(Sticker));
        if (VariantIsUsed) {
            return;
        }
        if (Board.BoardList != null) {
            ;
            Board.BoardList.forEach((Board) => searchVariantInBoard(Board));
        }
    }
    function searchVariantInSticker(Sticker) {
        if (VariantIsUsed) {
            return;
        }
        if (Sticker.StickerList != null) {
            ;
            Sticker.StickerList.forEach((Sticker) => VariantIsUsed || (VariantIsUsed = Sticker.Variant === normalizedName));
        }
    }
}
/**** configurablePropertyOfVariant ****/
function configurablePropertyOfVariant(Name, Property) {
    expectPath('sticker variant name', Name);
    expectIdentifier('property identifier', Property);
    let normalizedPath = _normalizedPath(Name);
    if (!(normalizedPath in VariantRegistry))
        throwError('InvalidArgument: sticker variant ' + quoted(Name) + ' is unknown');
    const configurableProperties = VariantRegistry[normalizedPath].PropertyDescriptors;
    if (configurableProperties != null) {
        for (let i = 0, l = configurableProperties.length; i < l; i++) {
            const configurableProperty = configurableProperties[i];
            if (configurableProperty.Name === Property) {
                return Object.assign({}, configurableProperty);
            }
        }
    }
    throwError('InvalidArgument: now configurable sticker property named ' +
        quoted(Property) + ' found');
}
/**** ConfigurationOfVariant ****/
function ConfigurationOfVariant(Name) {
    expectPath('sticker variant name', Name);
    let normalizedPath = _normalizedPath(Name);
    if (!(normalizedPath in VariantRegistry))
        throwError('InvalidArgument: sticker variant ' + quoted(Name) + ' is unknown');
    return externalizedVariant(VariantRegistry[normalizedPath]);
}
/**** _configureVariant ****/
function _configureVariant(Variant, Configuration) {
    var _a;
    try {
        rejectSetting('Name', Configuration);
        acceptText('Synopsis', Configuration);
        acceptText('Stylesheet', Configuration);
        acceptText('pendingScript', Configuration);
        rejectSetting('Script', Configuration);
        if (Configuration.PropertyDescriptors != null) {
            validatePropertyDescriptors(Configuration.PropertyDescriptors);
        }
        Object.assign(Variant, Configuration);
        updateInternalsOfVariant(Variant, Configuration);
        if ('Stylesheet' in Configuration) {
            if (((_a = Configuration.Stylesheet) !== null && _a !== void 0 ? _a : '').trim() === '') {
                delete Variant.Stylesheet;
                uninstallStylesheetFor(Variant[$normalizedName]);
            }
            else {
                Variant.Stylesheet = Configuration.Stylesheet;
                installStylesheetFor(Variant[$normalizedName], Configuration.Stylesheet, true);
            }
        }
    }
    catch (Signal) {
        throwError('ConfigurationError: problem configuring sticker variant ' +
            quoted(Variant.Name) + ': ' + Signal.message);
    }
}
/**** GroupOfVariant ****/
function GroupOfVariant(Variant) {
    return Variant.Name.replace(/\/[^\/]+$/, '');
}
/**** NameOfVariant ****/
function NameOfVariant(Variant) {
    return Variant.Name.replace(/^.*\//, '');
}
/**** renameVariantTo ****/
function renameVariantTo(Variant, newName) {
    expectPath('new sticker variant name', newName);
    if (newName === Variant.Name) {
        return;
    }
    /**** trivial name changes can be done quickly ****/
    const normalizedName = _normalizedPath(newName);
    if (normalizedName === Variant[$normalizedName]) {
        Variant.Name = newName;
        rerenderAllActiveProjects(); // just to update the designer view
    }
    /**** check for name collisions ****/
    if (normalizedName in VariantRegistry)
        throwError('ConfigurationError:problem configuring sticker variant ' +
            quoted(Variant.Name) + ': a sticker variant with the name ' +
            quoted(newName) + ' has already been registered');
    const NameList = normalizedName.split('/');
    for (let i = 0, l = NameList.length - 1; i < l; i++) {
        const PathToTest = NameList.slice(0, i + 1).join('/');
        if (PathToTest in VariantRegistry)
            throwError('ConfigurationError:problem configuring sticker variant ' +
                quoted(Variant.Name) + ': sticker group "' + PathToTest + '" has ' +
                'already been registered as a sticker variant');
    }
    /**** now do everything required to rename the sticker variant ****/
    const oldNormalizedName = Variant[$normalizedName];
    if (Variant.Stylesheet != null) {
        uninstallStylesheetFor(Variant.Name);
    }
    delete VariantRegistry[Variant[$normalizedName]];
    Variant.Name = newName;
    Variant[$normalizedName] = normalizedName;
    if (Variant.Stylesheet != null) {
        installStylesheetFor(Variant.Name, Variant.Stylesheet);
    }
    VariantRegistry[normalizedName] = Variant;
    activeProjects().forEach((Project) => {
        renameVariantInProject(Project, oldNormalizedName, normalizedName);
    });
    rerenderAllActiveProjects();
}
/**** renameVariantInProject ****/
function renameVariantInProject(Project, oldNormalizedName, newNormalizedName) {
    Project.BoardList.forEach((Board) => renameVariantInBoard(Board, oldNormalizedName, newNormalizedName));
}
/**** renameVariantInBoard ****/
function renameVariantInBoard(Board, oldNormalizedName, newNormalizedName) {
    Board.StickerList.forEach((Sticker) => renameVariantInSticker(Sticker, oldNormalizedName, newNormalizedName));
    if (Board.BoardList != null) {
        Board.BoardList.forEach((Board) => renameVariantInBoard(Board, oldNormalizedName, newNormalizedName));
    }
}
/**** renameVariantInSticker ****/
function renameVariantInSticker(Sticker, oldNormalizedName, newNormalizedName) {
    if (Sticker.Variant === oldNormalizedName) {
        Sticker.Variant = newNormalizedName;
    }
    if (Sticker.StickerList != null) {
        Sticker.StickerList.forEach((Sticker) => renameVariantInSticker(Sticker, oldNormalizedName, newNormalizedName));
    }
}
/**** ScriptOfVariant ****/
function ScriptOfVariant(Variant) {
    var _a, _b;
    return (_b = (_a = Variant.pendingScript) !== null && _a !== void 0 ? _a : Variant.Script) !== null && _b !== void 0 ? _b : '';
}
/**** activateScriptOfVariant ****/
function activateScriptOfVariant(Variant) {
    if (Variant.pendingScript === Variant.Script) {
        return;
    }
    if (Variant[$pendingScriptError] != null)
        throwError('InvalidOperation: cannot activate an erroneous script');
    if (Variant.pendingScript == null) {
        delete Variant.Script;
        Variant[$activeScript] = () => undefined;
    }
    else {
        try {
            const compiledScript = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                'contextualAPI,preserveProject', Variant.pendingScript);
            Variant.Script = Variant.pendingScript;
            delete Variant.pendingScript;
            Variant[$activeScript] = compiledScript;
            delete Variant[$ErrorReport];
        }
        catch (Signal) {
            Variant[$pendingScriptError] = {
                Message: Signal.message, LineNumber: Signal.lineNumber
            };
            throwError('InvalidOperation: cannot activate an erroneous script');
        }
    }
    rerenderAllActiveProjects();
}
/**** usedVariantsInProject ****/
function usedVariantsInProject(Project) {
    const VariantSet = Object.create(null);
    Project.BoardList.forEach((Board) => collectVariantsInBoard(Board));
    return Object.keys(VariantSet).map((normalizedVariant) => { var _a, _b; return (_b = (_a = VariantRegistry[normalizedVariant]) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : normalizedVariant; });
    function collectVariantsInBoard(Board) {
        ;
        Board.StickerList.forEach((Sticker) => collectVariantsInSticker(Sticker));
        if (Board.BoardList != null) {
            ;
            Board.BoardList.forEach((Board) => collectVariantsInBoard(Board));
        }
    }
    function collectVariantsInSticker(Sticker) {
        VariantSet[Sticker.Variant] = true;
        if (Sticker.StickerList != null) {
            ;
            Sticker.StickerList.forEach((Sticker) => collectVariantsInSticker(Sticker));
        }
    }
}
/**** unusedVariantsInProject ****/
function unusedVariantsInProject(Project) {
    const VariantSet = Object.create(null);
    Object.keys(VariantRegistry).forEach((Variant) => VariantSet[Variant] = true);
    Project.BoardList.forEach((Board) => uncollectVariantsInBoard(Board));
    return Object.keys(VariantSet).map((normalizedVariant) => { var _a, _b; return (_b = (_a = VariantRegistry[normalizedVariant]) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : normalizedVariant; });
    function uncollectVariantsInBoard(Board) {
        ;
        Board.StickerList.forEach((Sticker) => uncollectVariantsInSticker(Sticker));
        if (Board.BoardList != null) {
            ;
            Board.BoardList.forEach((Board) => uncollectVariantsInBoard(Board));
        }
    }
    function uncollectVariantsInSticker(Sticker) {
        delete VariantSet[Sticker.Variant];
        if (Sticker.StickerList != null) {
            ;
            Sticker.StickerList.forEach((Sticker) => uncollectVariantsInSticker(Sticker));
        }
    }
}
/**** brokenVariantsInProject ****/
function brokenVariantsInProject(Project) {
    return usedVariantsInProject(Project).filter((Variant) => { var _a; return ((_a = VariantRegistry[_normalizedPath(Variant)]) === null || _a === void 0 ? void 0 : _a[$ErrorReport]) != null; });
}
/**** groupedVariantList ****/
function groupedVariantList() {
    const GroupSet = Object.create(null);
    Object.values(VariantRegistry).forEach((Variant) => {
        const Group = Variant[$normalizedName].replace(/[\/][^\/]+$/, '');
        if (Group in GroupSet) {
            GroupSet[Group].push(Variant);
        }
        else {
            GroupSet[Group] = [Variant];
        }
    });
    return GroupSet;
}
/**** nestedVariantList ****/
function nestedVariantList() {
    const groupedVariants = groupedVariantList();
    function addGroup(GroupName) {
        const VariantList = groupedVariants[GroupName].map((Variant) => Variant.Name).sort();
        const VariantGroup = {
            Label: GroupName,
            Contents: VariantList.map((fullName) => {
                return {
                    Label: fullName.replace(/^.*\//, ''),
                    Group: GroupName,
                    Variant: VariantRegistry[_normalizedPath(fullName)],
                };
            })
        };
        nestedList.push(VariantGroup);
    }
    const nestedList = [];
    addGroup('sim/special');
    addGroup('sim/basic');
    addGroup('sim/native');
    addGroup('sim/common');
    delete groupedVariants['sim/special'];
    delete groupedVariants['sim/basic'];
    delete groupedVariants['sim/native'];
    delete groupedVariants['sim/common'];
    const sortedGroupList = Array.from(Object.keys(groupedVariants)).sort();
    sortedGroupList.forEach((GroupName) => addGroup(GroupName));
    return nestedList;
}
//------------------------------------------------------------------------------
//--                           Project Registration                           --
//------------------------------------------------------------------------------
const ProjectRegistry = Object.create(null);
/**** registerProject ****/
export function registerProject(Project, Script) {
    expectPlainObject('project descriptor', Project);
    /**** validate the given project ****/
    validateProjectDescriptor(Project);
    const Name = Project.Name;
    let normalizedName = _normalizedName(Name !== null && Name !== void 0 ? Name : '');
    if (normalizedName in ProjectRegistry)
        throwError('MultipleDefinitions:a project with the name "' + Name + '" has already ' +
            'been registered');
    /**** if need be, inject given script ****/
    switch (true) {
        case (Script == null):
            break;
        case ValueIsText(Script):
            Project.Script = Script;
            break;
        case ValueIsFunction(Script):
            Project.Script = Script.toString()
                .replace(/^[^{]+\{[ \t]*\n?/, '')
                .replace(/[ \t]*[}][ \t]*$/, '');
            break;
        default: throwError('InvalidArgument:invalid project script given');
    }
    /**** now register the given (still externalized) project ****/
    ProjectRegistry[normalizedName] = Project;
}
/**** registeredProjects ****/
export function registeredProjects() {
    return Object.values(ProjectRegistry).map((Project) => Project.Name);
}
/**** activate/deactivateProject ****/
const activeProjectSet = Object.create(null);
function activateProject(Project) {
    activeProjectSet[Project.internalId] = Project;
}
function deactivateProject(Project) {
    delete activeProjectSet[Project.internalId];
}
/**** activeProjects ****/
function activeProjects() {
    return Array.from(Object.values(activeProjectSet));
}
/**** rerenderAllActiveProjects ****/
function rerenderAllActiveProjects() {
    activeProjects().forEach((Project) => Project[$rerender]());
}
//------------------------------------------------------------------------------
//--                               local Backup                               --
//------------------------------------------------------------------------------
/**** preserveProject ****/
async function preserveProject(Project) {
    try {
        await ProjectStore.setItem(Project[$normalizedName], JSON.stringify(externalizedProject(Project)));
    }
    catch (Signal) {
        console.error('could not preserve project, reason', Signal);
    }
}
/**** removeLocalBackupOfProject ****/
async function removeLocalBackupOfProject(Project) {
    try {
        await ProjectStore.removeItem(Project[$normalizedName]);
    }
    catch (Signal) {
        console.error('could not remove project, reason', Signal);
    }
}
//------------------------------------------------------------------------------
//--                              Import Support                              --
//------------------------------------------------------------------------------
/**** ValueLooksLikeVariant ****/
function ValueLooksLikeVariant(Serialization) {
    return (ValueIsPlainObject(Serialization) &&
        ValueIsPath(Serialization.Name) &&
        ((Serialization.Stylesheet == null) || ValueIsText(Serialization.Stylesheet)) &&
        ((Serialization.initialWidth == null) || ValueIsDimension(Serialization.initialWidth)) &&
        ((Serialization.initialHeight == null) || ValueIsDimension(Serialization.initialHeight)) &&
        ((Serialization.pendingScript == null) || ValueIsText(Serialization.pendingScript)) &&
        ((Serialization.Script == null) || ValueIsText(Serialization.Script)) &&
        ((Serialization.PropertyDescriptors == null) ||
            ValueIsList(Serialization.PropertyDescriptors) &&
                Serialization.PropertyDescriptors.every((Serialization) => ValueIsPropertyDescriptor(Serialization))) &&
        (Serialization.SnapToGrid == null) && (Serialization.GridWidth == null) && (Serialization.GridHeight == null) &&
        (Serialization.BoardList == null) &&
        (Serialization.StickerList == null));
}
/**** ValueLooksLikeProject ****/
function ValueLooksLikeProject(Serialization) {
    try {
        validateProjectDescriptor(Serialization);
    }
    catch (Signal) {
        return false;
    }
    return (Serialization.BoardList != null) && (Serialization.StickerList == null);
}
/**** ValueLooksLikeBoard ****/
function ValueLooksLikeBoard(Serialization) {
    try {
        validateBoardDescriptor(Serialization, '');
    }
    catch (Signal) {
        return false;
    }
    return (Serialization.StickerList != null);
}
/**** ValueLooksLikeBoardList ****/
function ValueLooksLikeBoardList(Serialization) {
    return (ValueIsList(Serialization) &&
        // @ts-ignore TS2532 type cast is ok
        Serialization.every((Value) => ValueLooksLikeBoard(Value)));
}
/**** ValueLooksLikeSticker ****/
function ValueLooksLikeSticker(Serialization) {
    try {
        validateStickerDescriptor(Serialization, '', '');
    }
    catch (Signal) {
        return false;
    }
    return (Serialization.BoardList == null);
}
/**** ValueLooksLikeStickerList ****/
function ValueLooksLikeStickerList(Serialization) {
    return (ValueIsList(Serialization) &&
        // @ts-ignore TS2532 type cast is ok
        Serialization.every((Value) => ValueLooksLikeSticker(Value)));
}
//------------------------------------------------------------------------------
//--                             Console Support                              --
//------------------------------------------------------------------------------
const Default_CharLimit = 1050000; // a bit more than 2^20 characters
const Default_LineLimit = 20000;
/**** Console_clear ****/
function Console_clear(Project) {
    Project[$Console] = '';
    Project[$rerender]();
}
/**** Console_print ****/
function Console_print(Project, ArgList) {
    Console_append(Project, StringFromArguments(ArgList));
    Project[$rerender]();
}
/**** Console_println ****/
function Console_println(Project, ArgList) {
    Console_append(Project, StringFromArguments(ArgList, true));
    Project[$rerender]();
}
/**** Console_append ****/
function Console_append(Project, fullText) {
    var _a, _b;
    if (fullText.length === 0) {
        return;
    }
    let LineCount = EOLCount(fullText);
    let CharCount = fullText.length;
    if ((LineCount > ((_a = Project.Console_LineLimit) !== null && _a !== void 0 ? _a : Default_LineLimit)) ||
        (CharCount > ((_b = Project.Console_CharLimit) !== null && _b !== void 0 ? _b : Default_CharLimit))) {
        Console_clear(Project);
        fullText = compacted(fullText, Project, LineCount, CharCount);
        Project[$Console_LineCount] = EOLCount(fullText) + 1; // count 1st line as well
        Project[$Console_CharCount] = fullText.length;
        Project[$Console] = fullText;
    }
    else {
        compactConsoleFor(Project, LineCount, CharCount);
        Project[$Console_LineCount] += LineCount;
        Project[$Console_CharCount] += CharCount;
        Project[$Console] += fullText;
    }
}
/**** compactConsoleFor ****/
function compactConsoleFor(Project, LineCount, CharCount) {
    var _a, _b;
    let LinesToSkip = Project[$Console_LineCount] + LineCount - ((_a = Project.Console_LineLimit) !== null && _a !== void 0 ? _a : Default_LineLimit);
    let CharsToSkip = Project[$Console_CharCount] + CharCount - ((_b = Project.Console_CharLimit) !== null && _b !== void 0 ? _b : Default_CharLimit);
    if ((LinesToSkip <= 0) && (CharsToSkip <= 0)) {
        return;
    }
    let Content = Project[$Console];
    for (let EOLCount = 0, curIndex = -1;;) {
        curIndex = Content.indexOf('\n', curIndex + 1); // might be -1!
        if (curIndex < 0) { // no more EOLs, just a loooong line
            Console_clear(Project);
            return;
        }
        EOLCount += 1;
        if ((EOLCount >= LinesToSkip) && (curIndex - EOLCount * 28 >= CharsToSkip)) {
            Project[$Console] = Content.slice(curIndex + 1);
            return;
        }
    }
}
/**** compacted ****/
function compacted(fullText, Project, LineCount, CharCount) {
    let LinesToSkip = LineCount - Project.Console_LineLimit;
    let CharsToSkip = CharCount - Project.Console_CharLimit;
    for (let EOLCount = 0, curIndex = -1;;) {
        curIndex = fullText.indexOf('\n', curIndex + 1); // must be <> -1!
        EOLCount += 1;
        if ((EOLCount >= LinesToSkip) && (curIndex >= CharsToSkip)) {
            return fullText.slice(curIndex + 1);
        }
    }
}
/**** EOLCount ****/
function EOLCount(fullText) {
    let MatchList = fullText.match(/\n/g);
    return (MatchList === null ? 0 : MatchList.length);
}
/**** StringFromArguments ****/
function StringFromArguments(Arguments, withEOL = false) {
    let Result = '';
    for (let i = 0; i < Arguments.length; i++) {
        let Argument = Arguments[i];
        switch (typeof Argument) {
            case 'undefined':
                Result += '(undefined)';
                break;
            case 'boolean':
                Result += Argument.toString();
                break;
            case 'number':
                Result += Argument.toString();
                break;
            case 'string':
                Result += Argument;
                break;
            case 'function':
                Result += '(function)';
                break;
            case 'object':
                Result += (Argument === null ? '(null)' : Argument.toString());
                break;
            default:
                Result += '(unknown)';
                break;
        }
    }
    return Result + (withEOL ? '\n' : '');
}
/**** useConsole ****/
export function useConsole() {
    const { Project } = useRenderingContext();
    function clearConsole() {
        Console_clear(Project);
    }
    function print(...ArgList) {
        Console_print(Project, ArgList);
    }
    function println(...ArgList) {
        Console_println(Project, ArgList);
    }
    return { clearConsole, print, println };
}
//------------------------------------------------------------------------------
//--                              Error Handling                              --
//------------------------------------------------------------------------------
/**** SIM_ErrorReport ****/
const SIM_ErrorSeverities = ['ignorable', 'annoying', 'severe', 'fatal'];
/**** SIM_ErrorIndicator ****/
export function SIM_ErrorIndicator(PropSet) {
    return safelyRendered(() => {
        let [ErrorToShow] = parsedPropSet(PropSet, optionalValue('error', ValueIsErrorReport));
        const onClick = () => {
            console.warn(ErrorToShow);
            window.alert(ErrorMessageFor(ErrorToShow));
        };
        return html `<div class="sim-error-indicator" onClick=${onClick}/>`;
    });
}
installStylesheetFor('sim-error-indicator', `
    .sim-error-indicator {
      display:inline-block; position:relative;
      width:24px; height:24px;
    }

    .sim-error-indicator::after {
      content:'';
      display:block; position:absolute; overflow:hidden;
      left:0px; top:0px; width:24px; height:24px;
      background:url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 17.0001H12.01M12 10.0001V14.0001M6.41209 21.0001H17.588C19.3696 21.0001 20.2604 21.0001 20.783 20.6254C21.2389 20.2985 21.5365 19.7951 21.6033 19.238C21.6798 18.5996 21.2505 17.819 20.3918 16.2579L14.8039 6.09805C13.8897 4.4359 13.4326 3.60482 12.8286 3.32987C12.3022 3.09024 11.6978 3.09024 11.1714 3.32987C10.5674 3.60482 10.1103 4.4359 9.19614 6.09805L3.6082 16.2579C2.74959 17.819 2.32028 18.5996 2.39677 19.238C2.46351 19.7951 2.76116 20.2985 3.21709 20.6254C3.7396 21.0001 4.63043 21.0001 6.41209 21.0001Z' stroke='orange' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='white'/%3E%3C/svg%3E");
      pointer-events:auto;
    }
  `);
/**** ErrorMessageFor ****/
function ErrorMessageFor(ErrorReport) {
    return `${ErrorReport.Title}\n\n${ErrorReport.Message}`;
}
//------------------------------------------------------------------------------
//--                        System & Rendering Context                        --
//------------------------------------------------------------------------------
/**** System Context - the single point of truth (for internal use only) ****/
const SIM_SystemContext = createContext({
    ProjectState: undefined, // reserved for custom business logic
    Project: undefined, // internalized project, stable reference
    activateBoard: undefined, // automatically rerenders project
    activeBoard: undefined, // actual currently active board
    DesignerState: undefined, // for designer only
});
function useSystemContext() {
    return useContext(SIM_SystemContext);
}
/**** Rendering Context - tracks rendering progress ****/
const SIM_RenderingContext = createContext({
    Project: undefined, Board: undefined, Sticker: undefined, // references(!)
    activeBoardRoute: undefined, // absolute(!) route to active board
    curBoardRoute: undefined, curStickerRoute: undefined, // absolute routes
    DialogName: undefined, OverlayName: undefined,
    inDesigner: false, // will be set to true inside designer
});
function useRenderingContext() {
    return useContext(SIM_RenderingContext);
}
/**** validateVisualPropertiesIn ****/
function validateVisualPropertiesIn(Configuration) {
    acceptTextline('FontFamily', Configuration);
    acceptDimension('FontSize', Configuration);
    acceptOneOf('FontWeight', Configuration, SIM_FontWeights, 'font weight');
    acceptOneOf('FontStyle', Configuration, SIM_FontStyles, 'font style');
    acceptSetting('TextDecoration', Configuration, ValueIsTextDecoration, 'text decoration');
    acceptSetting('TextShadow', Configuration, ValueIsTextShadow, 'text shadow');
    acceptOneOf('TextAlignment', Configuration, SIM_TextAlignments, 'text alignment');
    acceptDimension('LineHeight', Configuration);
    acceptColor('ForegroundColor', Configuration);
    acceptBoolean('hasBackground', Configuration);
    acceptColor('BackgroundColor', Configuration);
    acceptSetting('BackgroundTexture', Configuration, ValueIsBackgroundTexture, 'background texture');
    acceptSetting('Opacity', Configuration, (Value) => ValueIsNumberInRange(Value, 0, 100, true, true), 'opacity');
    acceptOneOf('Cursor', Configuration, SIM_Cursors, 'cursor');
    //  rejectSetting           ('Script',Configuration)
    acceptText('pendingScript', Configuration);
    acceptPlainObject('own', Configuration);
    rejectSetting('volatile', Configuration);
}
/**** intrinsic Property Sets ****/
const intrinsicProjectPropertySet = Object.create(null);
`
      Name Synopsis
      SnapToGrid GridWidth GridHeight
      Width Height minWidth maxWidth minHeight maxHeight

      toBeCentered toBeFramed expectedOrientation
      Console_CharLimit Console_LineLimit

      FontFamily FontSize FontWeight FontStyle
      TextDecoration TextShadow TextAlignment LineHeight
      ForegroundColor
      hasBackground BackgroundColor BackgroundTexture
      Opacity Cursor

      Script pendingScript
      HeadExtensions
      BoardList Board
    `.trim().replace(/\s+/g, ' ').split(' ').forEach((Property) => intrinsicProjectPropertySet[Property] = true);
const intrinsicBoardPropertySet = Object.create(null);
`
      Name Synopsis permanent

      FontFamily FontSize FontWeight FontStyle
      TextDecoration TextShadow TextAlignment LineHeight
      ForegroundColor
      hasBackground BackgroundColor BackgroundTexture
      Opacity Cursor Overflows

      Script pendingScript
      BoardList Board StickerList Sticker
      isActivationBase StateBase
    `.trim().replace(/\s+/g, ' ').split(' ').forEach((Property) => intrinsicBoardPropertySet[Property] = true);
const intrinsicStickerPropertySet = Object.create(null);
`
      Name Variant Synopsis fixed automatic permanent
      Anchors Offsets minWidth maxWidth minHeight maxHeight
      hidden disabled

      FontFamily FontSize FontWeight FontStyle
      TextDecoration TextShadow TextAlignment LineHeight
      ForegroundColor
      hasBackground BackgroundColor BackgroundTexture
      BorderWidths BorderStyles BorderColors BorderRadii
      BoxShadow
      Opacity Cursor Overflows

      autoConfigureInput autoPreserveProject

      Script pendingScript
      StickerList Sticker
    `.trim().replace(/\s+/g, ' ').split(' ').forEach((Property) => intrinsicBoardPropertySet[Property] = true);
/**** validateCustomPropertiesInVisual ****/
function validateCustomPropertiesInVisual(Value, intrinsicPropertySet) {
    Object.keys(Value).forEach((Property) => {
        if (!(Property in intrinsicPropertySet) && !ValueIsSerializableValue(Value[Property]))
            throwError('InvalidArgument: invalid custom property "' + Property + '"');
    });
}
/**** validateCustomPropertiesInProject/Board/Sticker ****/
function validateCustomPropertiesInProject(Value) {
    validateCustomPropertiesInVisual(Value, intrinsicProjectPropertySet);
}
function validateCustomPropertiesInBoard(Value) {
    validateCustomPropertiesInVisual(Value, intrinsicBoardPropertySet);
}
function validateCustomPropertiesInSticker(Value) {
    validateCustomPropertiesInVisual(Value, intrinsicStickerPropertySet);
}
/**** TypeOfVisual ****/
export const SIM_VisualTypes = ['project', 'board', 'sticker'];
function TypeOfVisual(Visual) {
    if (Visual.internalId == null)
        debugger;
    switch (true) {
        case Visual.internalId.startsWith('sim-project-'): return 'project';
        case Visual.internalId.startsWith('sim-board-'): return 'board';
        default: return 'sticker';
    }
}
//------------------------------------------------------------------------------
//--                              SIM_[$]Project                              --
//------------------------------------------------------------------------------
export const SIM_expectedOrientations = ['portrait', 'landscape', 'any'];
/**** validateProjectPropertiesIn ****/
function validateProjectPropertiesIn(Configuration) {
    rejectSetting('internalId', Configuration);
    //  rejectSetting             ('Name',Configuration)
    acceptText('Synopsis', Configuration);
    acceptBoolean('SnapToGrid', Configuration);
    acceptDimension('GridWidth', Configuration);
    acceptDimension('GridHeight', Configuration);
    acceptDimension('Width', Configuration);
    acceptDimension('Height', Configuration);
    acceptDimension('minWidth', Configuration);
    acceptDimension('minHeight', Configuration);
    acceptDimension('maxWidth', Configuration);
    acceptDimension('maxHeight', Configuration);
    acceptBoolean('toBeCentered', Configuration);
    acceptBoolean('toBeFramed', Configuration);
    acceptOrdinal('Console_CharLimit', Configuration);
    acceptOrdinal('Console_LineLimit', Configuration);
    acceptOneOf('expectedOrientation', Configuration, SIM_expectedOrientations, 'expected mobile device orientation');
    validateVisualPropertiesIn(Configuration);
    acceptText('HeadExtensions', Configuration);
    //  rejectSetting        ('BoardList',Configuration) // to be handled separately
    //  rejectSetting            ('Board',Configuration)                     // dto.
    rejectSetting('StickerList', Configuration);
    rejectSetting('Sticker', Configuration);
}
/**** validateProjectDescriptor ****/
function validateProjectDescriptor(Value) {
    if (!ValueIsPlainObject(Value))
        throwError('InvalidArgument: the given project descriptor is no plain JavaScript object');
    if (Value.Name == null)
        throwError('MissingArgument: the given project descriptor does not contain the project\'s name');
    if (!ValueIsName(Value.Name))
        throwError('InvalidArgument: the given project "Name" is no valid SIM name');
    const ProjectName = Value.Name;
    try {
        validateProjectPropertiesIn(Value);
        acceptText('Script', Value);
        rejectSetting('Board', Value);
        validateBoardDescriptorList(Value.BoardList);
        validateCustomPropertiesInProject(Value);
    }
    catch (Signal) {
        if ((Signal.name === 'MissingArgument') || (Signal.name === 'InvalidArgument')) {
            Signal.message += ' in project ' + quoted(ProjectName);
        }
        throw Signal;
    }
}
/**** validateConfigurationForProject ****/
function validateConfigurationForProject(Configuration, Project) {
    try {
        validateProjectPropertiesIn(Configuration);
        rejectSetting('Name', Configuration);
        rejectSetting('Script', Configuration);
        rejectSetting('BoardList', Configuration);
        acceptPlainObject('Board', Configuration);
        validateCustomPropertiesInProject(Configuration);
        if (Configuration.Board != null) {
            Object.keys(Configuration.Board).forEach((Key) => {
                if (!ValueIsName(Key))
                    throwError('InvalidArgument: invalid board name ' + quoted(Key));
                const Board = existingBoardIn(Key, Project);
                validateConfigurationForBoard(Configuration.Board[Key], Board);
            });
        }
    }
    catch (Signal) {
        if ((Signal.name === 'MissingArgument') || (Signal.name === 'InvalidArgument')) {
            Signal.message += ' in project ' + quoted(Project.Name);
        }
        throw Signal;
    }
}
/**** internalizedProject (given descriptor was validated before) ****/
function internalizedProject(Project, Name) {
    // @ts-ignore TS2322 "Internalization" is indeed incomplete, but that's ok
    const Internalization = deepCopyOf(Project);
    Object.keys(Internalization).forEach((Key) => {
        if (Internalization[Key] == null) {
            delete Internalization[Key];
        }
    });
    if (Internalization.BoardList == null) { // projects need a board list
        Internalization.BoardList = [{ [$Container]: Internalization, StickerList: [] }];
    }
    else {
        Internalization.BoardList = Internalization.BoardList.map((Board, Index) => internalizedBoard(Board, Internalization));
    }
    if (Name != null) {
        Internalization.Name = Name;
    }
    /**** add relevant internals ****/
    Internalization.internalId = newInternalId('project');
    Internalization[$DialogList] = [];
    Internalization[$DesignerDialogs] = [];
    Internalization[$Console] = '';
    Internalization[$Console_LineCount] = 0;
    Internalization[$Console_CharCount] = 0;
    updateInternalsOfProject(Internalization, Internalization);
    return Internalization;
}
/**** updateInternalsOfProject ****/
function updateInternalsOfProject(Project, Configuration) {
    var _a, _b, _c;
    if ('Name' in Configuration) {
        if (((_a = Configuration.Name) !== null && _a !== void 0 ? _a : '').trim() === '') {
            delete Project.Name;
            delete Project[$normalizedName];
        }
        else {
            Project[$normalizedName] = _normalizedName(Configuration.Name);
        }
    }
    if ('pendingScript' in Configuration) {
        delete Project[$pendingScriptError];
        if (((_b = Configuration.pendingScript) !== null && _b !== void 0 ? _b : '').trim() === '') {
            delete Project.pendingScript;
        }
        else {
            try {
                const compiledScript = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                    'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                    'contextualAPI,preserveProject', Configuration.pendingScript);
            }
            catch (Signal) {
                Project[$pendingScriptError] = {
                    Message: Signal.message, LineNumber: Signal.lineNumber
                };
            }
        }
    }
    if ('Script' in Configuration) {
        if (((_c = Configuration.Script) !== null && _c !== void 0 ? _c : '').trim() === '') {
            delete Project.Script;
        }
        else {
            try {
                Project[$activeScript] = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                    'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                    'contextualAPI,preserveProject', Configuration.Script);
            }
            catch (Signal) {
                Project[$activeScript] = () => { };
                Project[$ErrorReport] = {
                    Severity: 'fatal',
                    Title: 'Project Script Compilation Failure',
                    Message: 'Project script compilation failed with ' + Signal,
                    Sufferer: Project, Cause: Signal, LineNumber: Signal.lineNumber
                };
            }
        }
    }
}
/**** externalizedProject - with serializable values only ****/
function externalizedProject(Project) {
    const Externalization = deepCopyOf(Project); // w/o symbols
    cleanupExternalization(Externalization);
    return Externalization;
}
/**** _ConfigurationOfProject ****/
function _ConfigurationOfProject(Project, withContents = false) {
    let Configuration = deepCopyOf(Project);
    if (!withContents) {
        delete Configuration.BoardList;
    }
    return Configuration;
}
/**** _configureProject ****/
function _configureProject(Project, Configuration) {
    validateConfigurationForProject(Configuration, Project);
    const { Board: BoardConfiguration } = Configuration, ownConfiguration = __rest(Configuration, ["Board"]);
    Object.keys(ownConfiguration).forEach((Key) => {
        if (ownConfiguration[Key] === undefined) {
            delete Project[Key];
        }
    }); // "null" values are kept,"undefined" ones deleted
    Object.assign(Project, ownConfiguration);
    updateInternalsOfProject(Project, ownConfiguration);
    if (BoardConfiguration != null) {
        Object.keys(BoardConfiguration).forEach((Key) => {
            if (!ValueIsName(Key))
                throwError('InvalidArgument: invalid board name ' + quoted(Key));
            const Board = existingBoardIn(Key, Project);
            __configureBoard(Board, BoardConfiguration[Key]);
        });
    }
} // deliberately no rerendering here
/**** ScriptOfProject ****/
function ScriptOfProject(Project) {
    var _a, _b;
    return (_b = (_a = Project.pendingScript) !== null && _a !== void 0 ? _a : Project.Script) !== null && _b !== void 0 ? _b : '';
}
/**** activateScriptOfProject ****/
function activateScriptOfProject(Project) {
    if (Project.pendingScript === Project.Script) {
        return;
    }
    if (Project[$pendingScriptError] != null)
        throwError('InvalidOperation: cannot activate an erroneous script');
    if (Project.pendingScript == null) {
        delete Project.Script;
        Project[$activeScript] = () => undefined;
    }
    else {
        try {
            const compiledScript = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                'contextualAPI,preserveProject', Project.pendingScript);
            Project.Script = Project.pendingScript;
            delete Project.pendingScript;
            Project[$activeScript] = compiledScript;
            delete Project[$ErrorReport];
        }
        catch (Signal) {
            Project[$pendingScriptError] = {
                Message: Signal.message, LineNumber: Signal.lineNumber
            };
            throwError('InvalidOperation: cannot activate an erroneous script');
        }
    }
    Project[$rerender]();
}
/**** ProjectIsAttached ****/
function ProjectIsAttached(Project) {
    return (activeProjectSet[Project.internalId] != null);
}
/**** GeometryOfProject ****/
function GeometryOfProject(Project) {
    const Box = Project[$Base].getBoundingClientRect();
    return {
        x: Box.left + window.pageXOffset, Width: Box.width,
        y: Box.top + window.pageYOffset, Height: Box.height
    };
}
/**** resizeProject ****/
function resizeProject(Project, Resizer) {
    const View = Project[$Base];
    const { Width, Height, minWidth, minHeight, maxWidth, maxHeight, } = Resizer;
    if (Resizer.Width != null) {
        Project.Width = Width;
        View.style.width = Width + 'px';
    }
    if (Resizer.Height != null) {
        Project.Height = Height;
        View.style.height = Height + 'px';
    }
    if ('minWidth' in Resizer) {
        Project.minWidth = minWidth;
        View.style.minWidth = (minWidth == null ? 'none' : minWidth + 'px');
    }
    if ('minHeight' in Resizer) {
        Project.minHeight = minHeight;
        View.style.minHeight = (minHeight == null ? 'none' : minHeight + 'px');
    }
    if ('maxWidth' in Resizer) {
        Project.maxWidth = maxWidth;
        View.style.maxWidth = (maxWidth == null ? 'none' : maxWidth + 'px');
    }
    if ('maxHeight' in Resizer) {
        Project.maxHeight = maxHeight;
        View.style.maxHeight = (maxHeight == null ? 'none' : maxHeight + 'px');
    }
    preserveProject(Project);
}
/**** validateBoardPropertiesIn ****/
function validateBoardPropertiesIn(Configuration) {
    rejectSetting('internalId', Configuration);
    acceptName('Name', Configuration);
    acceptText('Synopsis', Configuration);
    acceptBoolean('permanent', Configuration);
    acceptBoolean('isActivationBase', Configuration);
    validateVisualPropertiesIn(Configuration);
    acceptSetting('Overflows', Configuration, ValueIsOverflowList, 'overflow list');
    acceptSetting('StateBase', Configuration, ValueIsObjectPath, 'state base path');
    //  rejectSetting       ('BoardList',Configuration)// will be handled separately
    //  rejectSetting           ('Board',Configuration)                      // dto.
    //  rejectSetting     ('StickerList',Configuration)                      // dto.
    //  rejectSetting         ('Sticker',Configuration)                      // dto.
}
/**** validateBoardDescriptor ****/
function validateBoardDescriptor(Value, BoardIdentification) {
    if (!ValueIsPlainObject(Value))
        throwError('InvalidArgument: the given descriptor for board "' + BoardIdentification +
            '" is no plain JavaScript object');
    try {
        validateBoardPropertiesIn(Value);
        acceptText('Script', Value);
        rejectSetting('Board', Value);
        rejectSetting('Sticker', Value);
        validateBoardDescriptorList(Value.BoardList);
        validateStickerDescriptorList(Value.StickerList, BoardIdentification);
        validateCustomPropertiesInBoard(Value);
    }
    catch (Signal) {
        if ((Signal.name === 'MissingArgument') || (Signal.name === 'InvalidArgument')) {
            Signal.message += ' in board ' + quoted(BoardIdentification);
        }
        throw Signal;
    }
}
/**** validateConfigurationForBoard ****/
function validateConfigurationForBoard(Configuration, Board) {
    try {
        validateBoardPropertiesIn(Configuration);
        rejectSetting('Script', Configuration);
        rejectSetting('BoardList', Configuration);
        acceptPlainObject('Board', Configuration);
        rejectSetting('StickerList', Configuration);
        acceptPlainObject('Sticker', Configuration);
        validateCustomPropertiesInBoard(Configuration);
        if (Configuration.Board != null) {
            Object.keys(Configuration.Board).forEach((Key) => {
                if (!ValueIsName(Key))
                    throwError('InvalidArgument: invalid board name ' + quoted(Key));
                const innerBoard = existingBoardIn(Key, Board);
                validateConfigurationForBoard(Configuration.Board[Key], innerBoard);
            });
        }
    }
    catch (Signal) {
        if ((Signal.name === 'MissingArgument') || (Signal.name === 'InvalidArgument')) {
            Signal.message += ' in ' + IdentificationOfBoard(Board);
        }
        throw Signal;
    }
}
/**** internalizedBoard (given descriptor was validated before) ****/
function internalizedBoard(Board, Container) {
    // @ts-ignore TS2322 "Internalization" is indeed incomplete, but that's ok
    const Internalization = deepCopyOf(Board);
    Object.keys(Internalization).forEach((Key) => {
        if (Internalization[Key] == null) {
            delete Internalization[Key];
        }
    });
    if (Internalization.BoardList != null) {
        Internalization.BoardList = Internalization.BoardList.map((Board, Index) => internalizedBoard(Board, Internalization));
    }
    if (Internalization.StickerList == null) { // boards need a sticker list
        Internalization.StickerList = [];
    }
    else {
        Internalization.StickerList = Internalization.StickerList.map((Sticker, Index) => internalizedSticker(Sticker, Internalization));
    }
    /**** add relevant internals ****/
    Internalization[$Container] = Container;
    Internalization.internalId = newInternalId('board');
    updateInternalsOfBoard(Internalization, Internalization);
    return Internalization;
}
/**** updateInternalsOfBoard ****/
function updateInternalsOfBoard(Board, Configuration) {
    var _a, _b, _c;
    if ('Name' in Configuration) {
        if (((_a = Configuration.Name) !== null && _a !== void 0 ? _a : '').trim() === '') {
            delete Board.Name;
            delete Board[$normalizedName];
        }
        else {
            Board[$normalizedName] = _normalizedName(Configuration.Name);
        }
    }
    if ('pendingScript' in Configuration) {
        delete Board[$pendingScriptError];
        if (((_b = Configuration.pendingScript) !== null && _b !== void 0 ? _b : '').trim() === '') {
            delete Board.pendingScript;
        }
        else {
            try {
                const compiledScript = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                    'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                    'contextualAPI,preserveProject', Configuration.pendingScript);
            }
            catch (Signal) {
                Board[$pendingScriptError] = {
                    Message: Signal.message, LineNumber: Signal.lineNumber
                };
            }
        }
    }
    if ('Script' in Configuration) {
        if (((_c = Configuration.Script) !== null && _c !== void 0 ? _c : '').trim() === '') {
            delete Board.Script;
        }
        else {
            try {
                Board[$activeScript] = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                    'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                    'contextualAPI,preserveProject', Configuration.Script);
            }
            catch (Signal) {
                Board[$activeScript] = () => { };
                Board[$ErrorReport] = {
                    Severity: 'fatal',
                    Title: 'Board Script Compilation Failure',
                    Message: 'Board script compilation failed with ' + Signal,
                    Sufferer: Board, Cause: Signal, LineNumber: Signal.lineNumber
                };
            }
        }
    }
}
/**** externalizedBoard - with serializable values only ****/
function externalizedBoard(Board) {
    const Externalization = deepCopyOf(Board); // w/o symbol-addressed Prop.s
    cleanupExternalization(Externalization);
    return Externalization;
}
/**** _ConfigurationOfBoard ****/
function _ConfigurationOfBoard(Board, withContents = false) {
    let Configuration = deepCopyOf(Board);
    if (!withContents) {
        delete Configuration.BoardList;
        delete Configuration.StickerList;
    }
    return Configuration;
}
/**** [_]_configureBoard ****/
function _configureBoard(Board, Configuration) {
    validateConfigurationForBoard(Configuration, Board);
    __configureBoard(Board, Configuration);
    const Project = ProjectOfBoard(Board);
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
}
function __configureBoard(Board, Configuration) {
    const { Board: BoardConfiguration, Sticker: StickerConfiguration } = Configuration, ownConfiguration = __rest(Configuration, ["Board", "Sticker"]);
    Object.keys(ownConfiguration).forEach((Key) => {
        if (ownConfiguration[Key] === undefined) {
            delete Board[Key];
        }
    }); // "null" values are kept,"undefined" ones deleted
    Object.assign(Board, ownConfiguration);
    updateInternalsOfBoard(Board, ownConfiguration);
    if (BoardConfiguration != null) {
        Object.keys(BoardConfiguration).forEach((Key) => {
            if (!ValueIsName(Key))
                throwError('InvalidArgument: invalid board name ' + quoted(Key));
            const innerBoard = existingBoardIn(Key, Board);
            __configureBoard(innerBoard, BoardConfiguration[Key]);
        });
    }
    if (StickerConfiguration != null) {
        Object.keys(StickerConfiguration).forEach((Key) => {
            if (!ValueIsName(Key))
                throwError('InvalidArgument: invalid sticker name ' + quoted(Key));
            const Sticker = existingStickerIn(Key, Board);
            __configureSticker(Sticker, StickerConfiguration[Key]);
        });
    }
} // deliberately no rerendering here
/**** ScriptOfBoard ****/
function ScriptOfBoard(Board) {
    var _a, _b;
    return (_b = (_a = Board.pendingScript) !== null && _a !== void 0 ? _a : Board.Script) !== null && _b !== void 0 ? _b : '';
}
/**** activateScriptOfBoard ****/
function activateScriptOfBoard(Board) {
    var _a, _b;
    if (Board.pendingScript === Board.Script) {
        return;
    }
    if (Board[$pendingScriptError] != null)
        throwError('InvalidOperation: cannot activate an erroneous script');
    if (Board.pendingScript == null) {
        delete Board.Script;
        Board[$activeScript] = () => undefined;
    }
    else {
        try {
            const compiledScript = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                'contextualAPI,preserveProject', Board.pendingScript);
            Board.Script = Board.pendingScript;
            delete Board.pendingScript;
            Board[$activeScript] = compiledScript;
            delete Board[$ErrorReport];
        }
        catch (Signal) {
            Board[$pendingScriptError] = {
                Message: Signal.message, LineNumber: Signal.lineNumber
            };
            throwError('InvalidOperation: cannot activate an erroneous script');
        }
    }
    (_b = (_a = ProjectOfBoard(Board)) === null || _a === void 0 ? void 0 : _a[$rerender]) === null || _b === void 0 ? void 0 : _b.call(_a);
}
/**** existingBoardIn ****/
function existingBoardIn(Locator, Container) {
    var _a, _b, _c, _d;
    let Board;
    if ((ValueIsList(Locator) && (Locator.length === 0)) ||
        (ValueIsString(Locator) && (Locator.trim() === ''))) {
        const BoardBase = (TypeOfVisual(Container) === 'project'
            ? Container
            : BoardBaseOfBoard(Container) // will often be project as well
        );
        return (TypeOfVisual(BoardBase) === 'project'
            ? BoardBase.BoardList[0]
            : BoardBase);
    }
    switch (true) {
        case ValueIsOrdinal(Locator):
            Board = (_a = Container.BoardList) === null || _a === void 0 ? void 0 : _a[Locator];
            if (Board == null)
                throwError('NoSuchBoard: no board at index ' + Locator);
            break;
        case ValueIsRoute(Locator):
            for (let i = 0, l = Locator.length; i < l; i++) {
                Container = ((_b = Container.BoardList) !== null && _b !== void 0 ? _b : [])[Locator[i]];
                if (Container == null)
                    throwError('NoSuchBoard: no board at route [' + Locator.join(',') + ']');
            }
            Board = Container;
            break;
        case ValueIsName(Locator):
            const normalizedName = _normalizedName(Locator);
            Board = (_c = Container.BoardList) === null || _c === void 0 ? void 0 : _c.find((Board) => Board[$normalizedName] == normalizedName);
            if (Board == null)
                throwError('NoSuchBoard: no board with name ' + quoted(Locator) + ' found');
            break;
        case ValueIsPath(Locator):
            const NameList = Locator.split(' ');
            for (let i = 0, l = NameList.length; i < l; i++) {
                const normalizedName = _normalizedName(NameList[i]);
                Container = ((_d = Container._BoardList_) !== null && _d !== void 0 ? _d : []).find((Board) => Board[$normalizedName] == normalizedName);
                if (Container == null)
                    throwError('NoSuchBoard: no board at path "' + Locator + '"');
            }
            Board = Container;
            break;
        default: throwError('InvalidArgument:invalid board locator given');
    }
    return Board;
}
/**** BoardAtRoute ****/
function BoardAtRoute(Route, Project) {
    var _a;
    let Container = Project;
    for (let i = 0, l = Route.length; i < l; i++) {
        Container = ((_a = Container.BoardList) !== null && _a !== void 0 ? _a : [])[Route[i]];
        if (Container == null)
            throwError('NoSuchBoard: no board at route [' + Route.join(',') + ']');
    }
    return Container;
}
/**** BoardsMayBeAttachedTo ****/
function BoardsMayBeAttachedTo(BoardList, Container, Index) {
    if (TypeOfVisual(Container) === 'project') {
        return true;
    }
    return !BoardList.some((Board) => BoardContainsBoard(Board, Container));
}
/**** attachBoardTo - not checking for validity! ****/
function attachBoardTo(Board, Container, Index) {
    let TargetList = Container.BoardList; // reference, not copy!
    if (TargetList == null) {
        TargetList = Container.BoardList = [];
    }
    if (Index == null) {
        Index = TargetList.length;
    }
    else {
        Index = Math.max(0, Math.min(Index, TargetList.length));
    }
    TargetList.splice(Index, 0, Board);
    Board[$Container] = Container;
} // deliberately no rerendering here
/**** attachBoardsTo - not checking for validity! ****/
function attachBoardsTo(BoardList, Container, Index) {
    let TargetList = Container.BoardList; // reference, not copy!
    if (TargetList == null) {
        TargetList = Container.BoardList = [];
    }
    if (Index == null) {
        Index = TargetList.length;
    }
    else {
        Index = Math.max(0, Math.min(Index, TargetList.length));
    }
    BoardList.forEach((Board, i) => {
        TargetList.splice(Index + i, 0, Board);
        Board[$Container] = Container;
    });
} // deliberately no rerendering here
/**** detachBoard ****/
function detachBoard(Board) {
    var _a;
    const Container = Board[$Container];
    if (Container != null) {
        const BoardIndex = ((_a = Container.BoardList) !== null && _a !== void 0 ? _a : []).indexOf(Board);
        // @ts-ignore TS18048 if condition is met, "Container.BoardList" is not undefined
        if (BoardIndex >= 0) {
            Container.BoardList.splice(BoardIndex, 1);
        }
        // @ts-ignore TS2790 yes, this makes "Board" unusable
        delete Board[$Container];
    }
} // deliberately no rerendering here
/**** detachBoards ****/
function detachBoards(BoardList) {
    BoardList.forEach((Board) => detachBoard(Board));
}
/**** deserialize[d]BoardsAt ****/
function deserializedBoardsAt(SerializationList, Container, Index) {
    let BoardList = Container.BoardList; // reference, not copy!
    if (BoardList == null) {
        BoardList = Container.BoardList = [];
    }
    if (Index == null) {
        Index = BoardList.length;
    }
    else {
        Index = Math.max(0, Math.min(Index, BoardList.length));
    }
    SerializationList.forEach((serializedBoard, i) => {
        const Board = internalizedBoard(serializedBoard, Container);
        BoardList.splice(Index + i, 0, Board);
        Board[$Container] = Container;
    });
    const Project = (TypeOfVisual(Container) === 'project'
        ? Container
        : ProjectOfBoard(Container));
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
    return BoardList.slice(Index, Index + SerializationList.length);
}
const deserializeBoardsAt = deserializedBoardsAt;
/**** BoardsMayBeMovedTo ****/
const BoardsMayBeMovedTo = BoardsMayBeAttachedTo;
/**** BoardsMayBeMovedBackTo ****/
function BoardsMayBeMovedBackTo(BoardList, ContainerList, IndexList) {
    return BoardList.every((Board, i) => {
        const Container = ContainerList[i];
        return ((TypeOfVisual(Container) === 'project') ||
            !BoardContainsBoard(Board, Container));
    });
}
/**** moveBoardsTo ****/
function moveBoardsTo(sortedBoardList, Container, Index) {
    if (!BoardsMayBeAttachedTo(sortedBoardList, Container, Index))
        throwError('InvalidArgument:the given boards may not be moved to the given container');
    detachBoards(sortedBoardList);
    attachBoardsTo(sortedBoardList, Container, Index);
    const Project = ProjectOfBoard(sortedBoardList[0]);
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
}
/**** moveBoardsBackTo ****/
function moveBoardsBackTo(sortedBoardList, ContainerList, IndexList) {
    if (!BoardsMayBeMovedBackTo(sortedBoardList, ContainerList, IndexList))
        throwError('InvalidArgument:the given boards may not be moved back to their ' +
            'original container');
    detachBoards(sortedBoardList);
    sortedBoardList.forEach((Board, i) => {
        attachBoardTo(Board, ContainerList[i], IndexList[i]);
    });
    const Project = ProjectOfBoard(sortedBoardList[0]);
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
}
/**** deleteBoards ****/
function deleteBoards(BoardList) {
    const Project = ProjectOfBoard(BoardList[0]);
    detachBoards(BoardList);
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
}
/**** PathOfBoard ****/
function PathOfBoard(Board) {
    let Container = Board[$Container];
    if (Container == null)
        throwError('NotAttached: the given board is not attached');
    let Path = (Board.Name == null
        ? (Container == null
            ? '(anonymous)'
            : '#' + Container.BoardList.indexOf(Board))
        : Board.Name);
    return (TypeOfVisual(Container) === 'project'
        ? '/' + Path
        : PathOfBoard(Container) + '/' + Path);
}
/**** RouteToBoard (always absolute) ****/
function RouteToBoard(Board) {
    let Route = [];
    let Container = Board[$Container];
    if (Container == null)
        throwError('NotAttached: the given board is not attached');
    Route.unshift(Container.BoardList.indexOf(Board));
    while (TypeOfVisual(Container) === 'board') {
        let outerContainer = Container[$Container];
        if (outerContainer == null) {
            return Route;
        }
        Route.unshift(outerContainer.BoardList.indexOf(Container));
        Container = outerContainer;
    }
    return Route;
}
/**** IndexOfBoard ****/
function IndexOfBoard(Board) {
    let Container = Board[$Container];
    return (Container == null ? -1 : Container.BoardList.indexOf(Board));
}
/**** IdentificationOfBoard ****/
function IdentificationOfBoard(Board) {
    return 'board' + (ValueIsName(Board.Name) ? ' "' + Board.Name + '"' : '');
}
/**** ContainerOfBoard ****/
function ContainerOfBoard(Board) {
    return Board[$Container];
}
/**** ProjectOfBoard ****/
function ProjectOfBoard(Board) {
    let Container = Board[$Container];
    while ((Container != null) && (TypeOfVisual(Container) !== 'project')) {
        Container = Container[$Container];
    }
    return Container;
}
/**** BoardIsAttached ****/
function BoardIsAttached(Board) {
    const Project = ProjectOfBoard(Board);
    return (Project != null) && ProjectIsAttached(Project);
}
/**** BoardBaseOfBoard ****/
function BoardBaseOfBoard(Board) {
    let Candidate = Board;
    while ((TypeOfVisual(Candidate) === 'board') && !Candidate.isActivationBase) {
        const Container = Candidate[$Container];
        if (Container != null) {
            Candidate = Container;
        }
        else {
            break;
        }
    }
    return Candidate;
}
/**** StateBaseOfBoard ****/
function StateBaseOfBoard(Board) {
    let StateBase = [];
    let Container = Board;
    while (TypeOfVisual(Container) === 'board') {
        const relativeBase = Board.StateBase;
        if (relativeBase != null) {
            StateBase = [...relativeBase.split('.'), ...StateBase];
        }
        Container = Container[$Container];
    }
    return StateBase;
}
/**** BoardContainsBoard ****/
function BoardContainsBoard(outerBoard, innerBoard) {
    if (outerBoard === innerBoard) {
        return false;
    }
    let Container = innerBoard[$Container];
    while ((Container != null) && (TypeOfVisual(Container) === 'board')) {
        if (Container === outerBoard) {
            return true;
        }
        Container = Container[$Container];
    }
    return false;
}
/**** sortedBoards ****/
function sortedBoards(BoardList) {
    const BoardRoutes = BoardList.map((Board) => RouteToBoard(Board));
    const Project = ProjectOfBoard(BoardList[0]);
    return sortedRoutes(BoardRoutes).sort().map((Route) => BoardAtRoute(Route, Project));
}
/**** GeometryOfBoard ****/
function GeometryOfBoard(Board) {
    const Project = ProjectOfBoard(Board);
    if (Project == null)
        throwError('InvalidArgument:the given board is no longer attached');
    return { x: 0, y: 0, Width: Project.Width, Height: Project.Height };
}
/**** validateStickerPropertiesIn ****/
function validateStickerPropertiesIn(Configuration) {
    rejectSetting('internalId', Configuration);
    //  rejectSetting         ('Variant',Configuration)// will be handled separately
    acceptName('Name', Configuration);
    acceptText('Synopsis', Configuration);
    acceptBoolean('fixed', Configuration);
    acceptBoolean('automatic', Configuration);
    acceptBoolean('permanent', Configuration);
    acceptBoolean('hidden', Configuration);
    acceptBoolean('disabled', Configuration);
    acceptSetting('Anchors', Configuration, ValueIsAnchors, 'anchor list');
    acceptSetting('Offsets', Configuration, ValueIsOffsets, 'offset list');
    acceptDimension('minWidth', Configuration);
    acceptDimension('minHeight', Configuration);
    acceptDimension('maxWidth', Configuration);
    acceptDimension('maxHeight', Configuration);
    validateVisualPropertiesIn(Configuration);
    acceptSetting('BorderWidths', Configuration, (Value) => ValueIsListSatisfying(Value, ValueIsDimension, 4, 4), 'list of border widths');
    acceptSetting('BorderStyles', Configuration, (Value) => ValueIsListSatisfying(Value, ValueIsBorderStyle, 4, 4), 'list of border styles');
    acceptSetting('BorderColors', Configuration, (Value) => ValueIsListSatisfying(Value, ValueIsColor, 4, 4), 'list of border colors');
    acceptSetting('BorderRadii', Configuration, (Value) => ValueIsListSatisfying(Value, ValueIsDimension, 4, 4), 'list of border radii');
    acceptSetting('BoxShadow', Configuration, ValueIsBoxShadow, 'box shadow');
    acceptSetting('Overflows', Configuration, ValueIsOverflowList, 'overflow list');
    acceptBoolean('autoConfigureInput', Configuration);
    acceptBoolean('autoPreserveProject', Configuration);
    rejectSetting('BoardList', Configuration);
    rejectSetting('Board', Configuration);
    //  rejectSetting     ('StickerList',Configuration)// will be handled separately
    //  rejectSetting         ('Sticker',Configuration)                      // dto.
}
/**** validateStickerDescriptor ****/
function validateStickerDescriptor(Value, BoardIdentification, StickerIdentification) {
    if (!ValueIsPlainObject(Value))
        throwError('InvalidArgument: the given descriptor for sticker "' + StickerIdentification +
            '" is no plain JavaScript object');
    try {
        validateStickerPropertiesIn(Value);
        acceptPath('Variant', Value);
        acceptText('Script', Value);
        rejectSetting('Sticker', Value);
        const Variant = (Value.Variant == null ? 'sim/basic/dummy' : _normalizedPath(Value.Variant));
        switch (Variant) {
            case 'sim/special/compound':
            case 'sim/special/content':
            case 'sim/special/overlay':
            case 'sim/special/dialog':
            case 'sim/special/template':
            case 'sim/special/applet':
            case 'sim/special/page':
                validateStickerDescriptorList(Value.StickerList, StickerIdentification);
                break;
            case 'sim/special/custom':
            default:
                rejectSetting('StickerList', Value);
        }
        validateCustomPropertiesInSticker(Value);
    }
    catch (Signal) {
        if ((Signal.name === 'MissingArgument') || (Signal.name === 'InvalidArgument')) {
            Signal.message += ' in sticker ' + quoted(StickerIdentification);
        }
        throw Signal;
    }
}
/**** validateConfigurationForSticker ****/
function validateConfigurationForSticker(Configuration, Sticker) {
    try {
        validateStickerPropertiesIn(Configuration);
        rejectSetting('Variant', Configuration);
        rejectSetting('Script', Configuration);
        acceptText('pendingScript', Configuration);
        rejectSetting('BoardList', Configuration);
        rejectSetting('Board', Configuration);
        rejectSetting('StickerList', Configuration);
        switch (Sticker.Variant) {
            case 'sim/special/compound':
            case 'sim/special/content':
            case 'sim/special/overlay':
            case 'sim/special/dialog':
            case 'sim/special/template':
            case 'sim/special/applet':
            case 'sim/special/page':
                acceptPlainObject('Sticker', Configuration);
                break;
            case 'sim/special/custom':
            default:
                rejectSetting('Sticker', Configuration);
        }
        if (Configuration.Sticker != null) {
            Object.keys(Configuration.Sticker).forEach((Key) => {
                if (!ValueIsName(Key))
                    throwError('InvalidArgument: invalid sticker name ' + quoted(Key));
                const innerSticker = existingStickerIn(Key, Sticker);
                validateConfigurationForSticker(Configuration.Sticker[Key], innerSticker);
            });
        }
    }
    catch (Signal) {
        if ((Signal.name === 'MissingArgument') || (Signal.name === 'InvalidArgument')) {
            Signal.message += ' in ' + IdentificationOfSticker(Sticker);
        }
        throw Signal;
    }
}
/**** internalizedSticker (given descriptor was validated before) ****/
function internalizedSticker(Sticker, Container) {
    // @ts-ignore TS2322 "Internalization" is indeed incomplete, but that's ok
    const Internalization = deepCopyOf(Sticker);
    Object.keys(Internalization).forEach((Key) => {
        if (Internalization[Key] == null) {
            delete Internalization[Key];
        }
    });
    if (Internalization.StickerList != null) {
        Internalization.StickerList = Internalization.StickerList.map((Sticker, Index) => internalizedSticker(Sticker, Internalization));
    }
    if (ValueIsCompound(Internalization) && (Internalization.StickerList == null)) {
        Internalization.StickerList = [];
    }
    /**** add relevant internals ****/
    Internalization[$Container] = Container;
    Internalization.internalId = newInternalId('sticker');
    //    Internalization[$OverlayList] = []             // no! overlays are rare...
    updateInternalsOfSticker(Internalization, Internalization);
    return Internalization;
}
/**** updateInternalsOfSticker ****/
function updateInternalsOfSticker(Sticker, Configuration) {
    var _a, _b, _c;
    Sticker.Variant = _normalizedPath(Sticker.Variant);
    if ('Name' in Configuration) {
        if (((_a = Configuration.Name) !== null && _a !== void 0 ? _a : '').trim() === '') {
            delete Sticker.Name;
            delete Sticker[$normalizedName];
        }
        else {
            Sticker[$normalizedName] = _normalizedName(Configuration.Name);
        }
    }
    if ('pendingScript' in Configuration) {
        delete Sticker[$pendingScriptError];
        if (((_b = Configuration.pendingScript) !== null && _b !== void 0 ? _b : '').trim() === '') {
            delete Sticker.pendingScript;
        }
        else {
            try {
                const compiledScript = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                    'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                    'contextualAPI,preserveProject', Configuration.pendingScript);
            }
            catch (Signal) {
                Sticker[$pendingScriptError] = {
                    Message: Signal.message, LineNumber: Signal.lineNumber
                };
            }
        }
    }
    if ('Script' in Configuration) {
        if (((_c = Configuration.Script) !== null && _c !== void 0 ? _c : '').trim() === '') {
            delete Sticker.Script;
        }
        else {
            try {
                Sticker[$activeScript] = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                    'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                    'contextualAPI,preserveProject', Configuration.Script);
            }
            catch (Signal) {
                Sticker[$activeScript] = () => { };
                Sticker[$ErrorReport] = {
                    Severity: 'fatal',
                    Title: 'Sticker Script Compilation Failure',
                    Message: 'Sticker script compilation failed with ' + Signal,
                    Sufferer: Sticker, Cause: Signal, LineNumber: Signal.lineNumber
                };
            }
        }
    }
}
/**** externalizedSticker - with serializable values only ****/
function externalizedSticker(Sticker) {
    const Externalization = deepCopyOf(Sticker); // without symbols
    cleanupExternalization(Externalization);
    return Externalization;
}
/**** _ConfigurationOfSticker ****/
function _ConfigurationOfSticker(Sticker, withContents = false) {
    let Configuration = deepCopyOf(Sticker);
    if (!withContents) {
        delete Configuration.StickerList;
    }
    return Configuration;
}
/**** [_]_configureSticker ****/
function _configureSticker(Sticker, Configuration) {
    validateConfigurationForSticker(Configuration, Sticker);
    __configureSticker(Sticker, Configuration);
    const Project = ProjectOfSticker(Sticker);
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
}
function __configureSticker(Sticker, Configuration) {
    const { Sticker: StickerConfiguration } = Configuration, ownConfiguration = __rest(Configuration, ["Sticker"]);
    Object.keys(ownConfiguration).forEach((Key) => {
        if (ownConfiguration[Key] === undefined) {
            delete Sticker[Key];
        }
    }); // "null" values are kept,"undefined" ones deleted
    Object.assign(Sticker, ownConfiguration);
    updateInternalsOfSticker(Sticker, ownConfiguration);
    if (StickerConfiguration != null) {
        Object.keys(StickerConfiguration).forEach((Key) => {
            if (!ValueIsName(Key))
                throwError('InvalidArgument: invalid sticker name ' + quoted(Key));
            const innerSticker = existingStickerIn(Key, Sticker);
            __configureSticker(innerSticker, StickerConfiguration[Key]);
        });
    }
} // deliberately no rerendering here
/**** ScriptOfSticker ****/
function ScriptOfSticker(Sticker) {
    var _a, _b;
    return (_b = (_a = Sticker.pendingScript) !== null && _a !== void 0 ? _a : Sticker.Script) !== null && _b !== void 0 ? _b : '';
}
/**** activateScriptOfSticker ****/
function activateScriptOfSticker(Sticker) {
    var _a, _b;
    if (Sticker.pendingScript === Sticker.Script) {
        return;
    }
    if (Sticker[$pendingScriptError] != null)
        throwError('InvalidOperation: cannot activate an erroneous script');
    if (Sticker.pendingScript == null) {
        delete Sticker.Script;
        Sticker[$activeScript] = () => undefined;
    }
    else {
        try {
            const compiledScript = new Function('PropSet,initially,eventually,me,my,Configuration,configure,' +
                'Board,BoardSticker,Sticker,activeBoard,activateBoard,rerender,' +
                'contextualAPI,preserveProject', Sticker.pendingScript);
            Sticker.Script = Sticker.pendingScript;
            delete Sticker.pendingScript;
            Sticker[$activeScript] = compiledScript;
            delete Sticker[$ErrorReport];
        }
        catch (Signal) {
            Sticker[$pendingScriptError] = {
                Message: Signal.message, LineNumber: Signal.lineNumber
            };
            throwError('InvalidOperation: cannot activate an erroneous script');
        }
    }
    (_b = (_a = ProjectOfSticker(Sticker)) === null || _a === void 0 ? void 0 : _a[$rerender]) === null || _b === void 0 ? void 0 : _b.call(_a);
}
/**** GeometryMatches ****/
function GeometryMatches(curGeometry, newGeometry) {
    return (((newGeometry.x == null) || (newGeometry.x === curGeometry.x)) &&
        ((newGeometry.y == null) || (newGeometry.y === curGeometry.y)) &&
        ((newGeometry.Width == null) || (newGeometry.Width === curGeometry.Width)) &&
        ((newGeometry.Height == null) || (newGeometry.Height === curGeometry.Height)));
}
/**** AnchorsMatch ****/
function AnchorsMatch(curAnchors, newAnchors) {
    return (((newAnchors[0] == null) || (newAnchors[0] === curAnchors[0])) &&
        ((newAnchors[1] == null) || (newAnchors[1] === curAnchors[1])));
}
/**** OffsetsMatch ****/
function OffsetsMatch(curOffsets, newOffsets) {
    return (((newOffsets[0] == null) || (newOffsets[0] === curOffsets[0])) &&
        ((newOffsets[1] == null) || (newOffsets[1] === curOffsets[1])) &&
        ((newOffsets[2] == null) || (newOffsets[2] === curOffsets[2])) &&
        ((newOffsets[3] == null) || (newOffsets[3] === curOffsets[3])));
}
/**** changeGeometryOfSticker ****/
function changeGeometryOfSticker(Sticker, newGeometry) {
    const curGeometry = GeometryOfSticker(Sticker); // already within constraints
    /**** consider real changes only ****/
    if (GeometryMatches(curGeometry, newGeometry)) {
        return;
    }
    /**** now update geometry ****/
    if (newGeometry.x != null) {
        curGeometry.x = newGeometry.x;
    }
    if (newGeometry.y != null) {
        curGeometry.y = newGeometry.y;
    }
    if (newGeometry.Width != null) {
        curGeometry.Width = newGeometry.Width;
    }
    if (newGeometry.Height != null) {
        curGeometry.Height = newGeometry.Height;
    }
    shapeStickerTo(Sticker, curGeometry);
}
/**** changeAnchorsOfSticker ****/
function changeAnchorsOfSticker(Sticker, newAnchors) {
    const curAnchors = Sticker.Anchors;
    const curGeometry = GeometryOfSticker(Sticker); // already within constraints
    /**** consider real changes only ****/
    if (AnchorsMatch(curAnchors, newAnchors)) {
        return;
    }
    /**** if need be, calculate container dimensions ****/
    let outerWidth = 0, outerHeight = 0;
    if ((newAnchors[0] !== curAnchors[0]) && (newAnchors[0] !== 'left-width') ||
        (newAnchors[1] !== curAnchors[1]) && (newAnchors[1] !== 'top-height')) {
        const Container = ContainerOfSticker(Sticker);
        if (Container == null)
            throwError('NotAttached: relative geometries can only be calculated for attached stickers');
        ({ Width: outerWidth, Height: outerHeight } = (TypeOfVisual(Container) === 'board'
            ? GeometryOfBoard(Container)
            : GeometryOfSticker(Container)));
    }
    /**** now update anchors ****/
    if (newAnchors[0] !== curAnchors[0]) {
        switch (newAnchors[0]) { // "null" will fall deliberately through
            case 'left-width':
                Sticker.Offsets[0] = curGeometry.x;
                Sticker.Offsets[1] = curGeometry.Width;
                break;
            case 'width-right':
                Sticker.Offsets[0] = curGeometry.Width;
                Sticker.Offsets[1] = outerWidth - curGeometry.x - curGeometry.Width;
                break;
            case 'left-right':
                Sticker.Offsets[0] = curGeometry.x;
                Sticker.Offsets[1] = outerWidth - curGeometry.x - curGeometry.Width;
        }
        if (newAnchors[0] != null) {
            Sticker.Anchors[0] = newAnchors[0];
        }
    }
    if (newAnchors[1] !== curAnchors[1]) {
        switch (newAnchors[1]) { // "null" will fall deliberately through
            case 'top-height':
                Sticker.Offsets[2] = curGeometry.y;
                Sticker.Offsets[3] = curGeometry.Height;
                break;
            case 'height-bottom':
                Sticker.Offsets[2] = curGeometry.Height;
                Sticker.Offsets[3] = outerHeight - curGeometry.y - curGeometry.Height;
                break;
            case 'top-bottom':
                Sticker.Offsets[2] = curGeometry.y;
                Sticker.Offsets[3] = outerHeight - curGeometry.y - curGeometry.Height;
        }
        if (newAnchors[1] != null) {
            Sticker.Anchors[1] = newAnchors[1];
        }
    }
    for (let i = 0; i < 4; i++) {
        Sticker.Offsets[i] = Math.round(Sticker.Offsets[i]);
    }
}
/**** changeOffsetsOfSticker ****/
function changeOffsetsOfSticker(Sticker, newOffsets) {
    const curAnchors = Sticker.Anchors;
    const curOffsets = Sticker.Offsets;
    /**** consider real changes only ****/
    if (OffsetsMatch(curOffsets, newOffsets)) {
        return;
    }
    if (((newOffsets[0] == null) || (newOffsets[0] === curOffsets[0])) &&
        ((newOffsets[1] == null) || (newOffsets[1] === curOffsets[1])) &&
        ((newOffsets[2] == null) || (newOffsets[2] === curOffsets[2])) &&
        ((newOffsets[3] == null) || (newOffsets[3] === curOffsets[3]))) {
        return;
    }
    /**** now update offsets ****/
    if ((newOffsets[0] != null) || (newOffsets[1] != null)) {
        switch (curAnchors[0]) {
            case 'left-width':
                allowLocation('x coordinate', newOffsets[0]);
                allowDimension('patch width', newOffsets[1]);
                break;
            case 'width-right':
                allowDimension('patch width', newOffsets[0]);
                allowLocation('right offset', newOffsets[1]);
                break;
            case 'left-right':
                allowLocation('x coordinate', newOffsets[0]);
                allowLocation('right offset', newOffsets[1]);
        }
        if (newOffsets[0] != null) {
            Sticker.Offsets[0] = newOffsets[0];
        }
        if (newOffsets[1] != null) {
            Sticker.Offsets[1] = newOffsets[1];
        }
    }
    if ((newOffsets[2] != null) || (newOffsets[3] != null)) {
        switch (curAnchors[1]) {
            case 'top-height':
                allowLocation('y coordinate', newOffsets[2]);
                allowDimension('patch height', newOffsets[3]);
                break;
            case 'height-bottom':
                allowDimension('patch height', newOffsets[2]);
                allowLocation('bottom offset', newOffsets[3]);
                break;
            case 'top-bottom':
                allowLocation('y coordinate', newOffsets[2]);
                allowLocation('bottom offset', newOffsets[3]);
        }
        if (newOffsets[2] != null) {
            Sticker.Offsets[2] = newOffsets[2];
        }
        if (newOffsets[3] != null) {
            Sticker.Offsets[3] = newOffsets[3];
        }
    }
    for (let i = 0; i < 4; i++) {
        Sticker.Offsets[i] = Math.round(Sticker.Offsets[i]);
    }
}
/**** existingStickerIn ****/
function existingStickerIn(StickerLocator, Container) {
    var _a, _b, _c, _d;
    let Sticker;
    switch (true) {
        case ValueIsOrdinal(StickerLocator):
            Sticker = ((_a = Container.StickerList) !== null && _a !== void 0 ? _a : [])[StickerLocator];
            if (Sticker == null)
                throwError('NoSuchSticker: no sticker at index ' + StickerLocator);
            break;
        case ValueIsRoute(StickerLocator):
            for (let i = 0, l = StickerLocator.length; i < l; i++) {
                Container = ((_b = Container.StickerList) !== null && _b !== void 0 ? _b : [])[StickerLocator[i]];
                if (Container == null)
                    throwError('NoSuchSticker: no sticker at route [' + StickerLocator.join(',') + ']');
            }
            Sticker = Container;
            break;
        case ValueIsName(StickerLocator):
            const normalizedName = _normalizedName(StickerLocator);
            Sticker = ((_c = Container.StickerList) !== null && _c !== void 0 ? _c : []).find((Sticker) => Sticker[$normalizedName] == normalizedName);
            if (Sticker == null)
                throwError('NoSuchSticker: no sticker with name ' + quoted(StickerLocator) + ' found');
            break;
        case ValueIsPath(StickerLocator):
            const NameList = StickerLocator.split(' ');
            for (let i = 0, l = NameList.length; i < l; i++) {
                const normalizedName = _normalizedName(NameList[i]);
                Container = ((_d = Container.StickerList) !== null && _d !== void 0 ? _d : []).find((Sticker) => Sticker[$normalizedName] == normalizedName);
                if (Container == null)
                    throwError('NoSuchSticker: no sticker at path "' + StickerLocator + '"');
            }
            Sticker = Container;
            break;
        default: throwError('InvalidArgument:invalid sticker locator given');
    }
    return Sticker;
}
/**** StickerAtRoute ****/
function StickerAtRoute(Route, Board) {
    var _a;
    let Container = Board;
    for (let i = 0, l = Route.length; i < l; i++) {
        Container = ((_a = Container.StickerList) !== null && _a !== void 0 ? _a : [])[Route[i]];
        if (Container == null)
            throwError('NoSuchSticker: no sticker at route [' + Route.join(',') + ']');
    }
    return Container;
}
/**** StickersMayBeAttachedTo ****/
function StickersMayBeAttachedTo(StickerList, Container, Index) {
    if (TypeOfVisual(Container) === 'board') {
        return true;
    }
    return !StickerList.some((Sticker) => StickerContainsSticker(Sticker, Container));
}
/**** attachStickerTo - not checking for validity! ****/
function attachStickerTo(Sticker, Container, Index) {
    let TargetList = Container.StickerList; // reference, not copy!
    if (TargetList == null) {
        TargetList = Container.StickerList = [];
    }
    if (Index == null) {
        Index = TargetList.length;
    }
    else {
        Index = Math.max(0, Math.min(Index, TargetList.length));
    }
    TargetList.splice(Index, 0, Sticker);
    Sticker[$Container] = Container;
} // deliberately no rerendering here
/**** attachStickersTo - not checking for validity! ****/
function attachStickersTo(StickerList, Container, Index) {
    let TargetList = Container.StickerList; // reference, not copy!
    if (TargetList == null) {
        TargetList = Container.StickerList = [];
    }
    if (Index == null) {
        Index = TargetList.length;
    }
    else {
        Index = Math.max(0, Math.min(Index, TargetList.length));
    }
    StickerList.forEach((Sticker, i) => {
        TargetList.splice(Index + i, 0, Sticker);
        Sticker[$Container] = Container;
    });
} // deliberately no rerendering here
/**** detachStickers ****/
function detachStickers(StickerList) {
    StickerList.forEach((Sticker) => detachSticker(Sticker));
}
/**** detachSticker ****/
function detachSticker(Sticker) {
    var _a;
    const Container = Sticker[$Container];
    if (Container != null) {
        const StickerIndex = ((_a = Container.StickerList) !== null && _a !== void 0 ? _a : []).indexOf(Sticker);
        // @ts-ignore TS18048 if condition is met, "Container.StickerList" is not undefined
        if (StickerIndex >= 0) {
            Container.StickerList.splice(StickerIndex, 1);
        }
        // @ts-ignore TS2790 yes, this makes "Sticker" unusable
        delete Sticker[$Container];
    }
} // deliberately no rerendering here
/**** deserialize[d]StickersAt ****/
function deserializedStickersAt(SerializationList, Container, Index) {
    let StickerList = Container.StickerList; // reference, not copy!
    if (StickerList == null) {
        StickerList = Container.StickerList = [];
    }
    if (Index == null) {
        Index = StickerList.length;
    }
    else {
        Index = Math.max(0, Math.min(Index, StickerList.length));
    }
    SerializationList.forEach((serializedSticker, i) => {
        const Sticker = internalizedSticker(serializedSticker, Container);
        StickerList.splice(Index + i, 0, Sticker);
        Sticker[$Container] = Container;
    });
    const Project = (TypeOfVisual(Container) === 'board'
        ? ProjectOfBoard(Container)
        : ProjectOfSticker(Container));
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
    return StickerList.slice(Index, Index + SerializationList.length);
}
const deserializeStickersAt = deserializedStickersAt;
/**** StickersMayBeMovedTo ****/
const StickersMayBeMovedTo = StickersMayBeAttachedTo;
/**** StickersMayBeMovedBackTo ****/
function StickersMayBeMovedBackTo(StickerList, ContainerList, IndexList) {
    return StickerList.every((Sticker, i) => {
        const Container = ContainerList[i];
        return ((TypeOfVisual(Container) === 'board') ||
            !StickerContainsSticker(Sticker, Container));
    });
}
/**** moveStickersTo ****/
function moveStickersTo(sortedStickerList, Container, Index) {
    if (!StickersMayBeAttachedTo(sortedStickerList, Container, Index))
        throwError('InvalidArgument:the given stickers may not be moved to the given container');
    detachStickers(sortedStickerList);
    attachStickersTo(sortedStickerList, Container, Index);
    const Project = ProjectOfSticker(sortedStickerList[0]);
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
}
/**** moveStickersBackTo ****/
function moveStickersBackTo(sortedStickerList, ContainerList, IndexList) {
    if (!StickersMayBeMovedBackTo(sortedStickerList, ContainerList, IndexList))
        throwError('InvalidArgument:the given stickers may not be moved back to their ' +
            'original container');
    detachStickers(sortedStickerList);
    sortedStickerList.forEach((Sticker, i) => {
        attachStickerTo(Sticker, ContainerList[i], IndexList[i]);
    });
    const Project = ProjectOfSticker(sortedStickerList[0]);
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
}
/**** shapeStickerTo ****/
function shapeStickerTo(Sticker, Geometry) {
    const Container = Sticker[$Container];
    if (Container == null)
        throwError('NotAttached: the given sticker is no longer attached');
    const ContainerGeometry = (TypeOfVisual(Container) === 'board'
        ? GeometryOfBoard(Container)
        : GeometryOfSticker(Container));
    const { Width: ContainerWidth, Height: ContainerHeight } = ContainerGeometry;
    const { x, y, Width, Height } = Geometry;
    if ((x == null) || (y == null) || (Width == null) || (Height == null))
        debugger;
    let { Anchors, Offsets } = Sticker;
    switch (Anchors[0]) {
        case 'left-width':
            Offsets[0] = x;
            Offsets[1] = Width;
            break;
        case 'width-right':
            Offsets[0] = Width;
            Offsets[1] = ContainerWidth - x - Width;
            break;
        case 'left-right':
            Offsets[0] = x;
            Offsets[1] = ContainerWidth - x - Width;
            break;
    }
    switch (Anchors[1]) {
        case 'top-height':
            Offsets[2] = y;
            Offsets[3] = Height;
            break;
        case 'height-bottom':
            Offsets[2] = Height;
            Offsets[3] = ContainerHeight - y - Height;
            break;
        case 'top-bottom':
            Offsets[2] = y;
            Offsets[3] = ContainerHeight - y - Height;
            break;
    }
    for (let i = 0; i < 4; i++) {
        Offsets[i] = Math.round(Offsets[i]);
    }
    const Project = ProjectOfSticker(Sticker);
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
}
/**** deleteStickers ****/
function deleteStickers(StickerList) {
    const Project = ProjectOfSticker(StickerList[0]);
    detachStickers(StickerList);
    if ((Project != null) && ProjectIsAttached(Project)) {
        Project[$rerender]();
    }
}
/**** PathOfSticker ****/
function PathOfSticker(Sticker) {
    let Container = Sticker[$Container];
    if (Container == null)
        throwError('NotAttached: the given sticker is not attached');
    let Path = (Sticker.Name == null
        ? (Container == null
            ? '(anonymous)'
            : '#' + Container.StickerList.indexOf(Sticker))
        : Sticker.Name);
    return (TypeOfVisual(Container) === 'board'
        ? '/' + Path
        : PathOfSticker(Container) + '/' + Path);
}
/**** RouteToSticker (always absolute) ****/
function RouteToSticker(Sticker) {
    let Route = [];
    let Container = Sticker[$Container];
    if (Container == null)
        throwError('NotAttached: the given sticker is not attached');
    Route.unshift(Container.StickerList.indexOf(Sticker));
    while (TypeOfVisual(Container) === 'sticker') {
        let outerContainer = Container[$Container];
        if (outerContainer == null) {
            return Route;
        }
        Route.unshift(outerContainer.StickerList.indexOf(Container));
        Container = outerContainer;
    }
    return Route;
}
/**** IndexOfSticker ****/
function IndexOfSticker(Sticker) {
    let Container = Sticker[$Container];
    return (Container == null ? -1 : Container.StickerList.indexOf(Sticker));
}
/**** IdentificationOfSticker ****/
function IdentificationOfSticker(Sticker) {
    return 'sticker' + (ValueIsName(Sticker.Name) ? ' "' + Sticker.Name + '"' : '');
}
/**** ContainerOfSticker ****/
function ContainerOfSticker(Sticker) {
    return Sticker[$Container];
}
/**** BoardOfSticker ****/
function BoardOfSticker(Sticker) {
    let Container = Sticker[$Container];
    while ((Container != null) && (TypeOfVisual(Container) !== 'board')) {
        Container = Container[$Container];
    }
    return Container;
}
/**** ProjectOfSticker ****/
function ProjectOfSticker(Sticker) {
    let Board = BoardOfSticker(Sticker);
    return (Board == null ? undefined : ProjectOfBoard(Board));
}
/**** StickerIsAttached ****/
function StickerIsAttached(Sticker) {
    const Project = ProjectOfSticker(Sticker);
    return (Project != null) && ProjectIsAttached(Project);
}
/**** StickerContainsSticker ****/
function StickerContainsSticker(outerSticker, innerSticker) {
    if (outerSticker === innerSticker) {
        return false;
    }
    let Container = innerSticker[$Container];
    while ((Container != null) && (TypeOfVisual(Container) === 'sticker')) {
        if (Container === outerSticker) {
            return true;
        }
        Container = Container[$Container];
    }
    return false;
}
/**** sortedStickers - all stickers must belong to the same board ****/
function sortedStickers(StickerList) {
    const StickerRoutes = StickerList.map((Sticker) => RouteToSticker(Sticker));
    const Board = BoardOfSticker(StickerList[0]);
    return sortedRoutes(StickerRoutes).sort().map((Route) => StickerAtRoute(Route, Board));
}
/**** WidthOfSticker ****/
function WidthOfSticker(Sticker) {
    let { Anchors, Offsets, minWidth, maxWidth } = Sticker;
    if (minWidth == null) {
        minWidth = 0;
    }
    if (maxWidth == null) {
        maxWidth = Infinity;
    }
    else {
        maxWidth = Math.max(minWidth, maxWidth);
    }
    let Width = 0;
    switch (Anchors[0]) {
        case 'left-width':
            Width = Offsets[1];
            break;
        case 'width-right':
            Width = Offsets[0];
            break;
        case 'left-right':
            const StickerRoute = RouteToSticker(Sticker);
            if (StickerRoute.length === 1) {
                const curProject = ProjectOfSticker(Sticker);
                Width = curProject.Width - Offsets[0] - Offsets[1];
            }
            else {
                const curBoard = BoardOfSticker(Sticker);
                const Container = existingStickerIn(StickerRoute.slice(0, StickerRoute.length - 1), curBoard);
                Width = Container.Width - Offsets[0] - Offsets[1];
            }
    }
    return Math.max(minWidth, Math.min(Width, maxWidth));
}
/**** HeightOfSticker ****/
function HeightOfSticker(Sticker) {
    let { Anchors, Offsets, minHeight, maxHeight } = Sticker;
    if (minHeight == null) {
        minHeight = 0;
    }
    if (maxHeight == null) {
        maxHeight = Infinity;
    }
    else {
        maxHeight = Math.max(minHeight, maxHeight);
    }
    let Height = 0;
    switch (Anchors[1]) {
        case 'top-height':
            Height = Offsets[3];
            break;
        case 'height-bottom':
            Height = Offsets[2];
            break;
        case 'top-bottom':
            const StickerRoute = RouteToSticker(Sticker);
            if (StickerRoute.length === 1) {
                const curProject = ProjectOfSticker(Sticker);
                Height = curProject.Height - Offsets[2] - Offsets[3];
            }
            else {
                const curBoard = BoardOfSticker(Sticker);
                const Container = existingStickerIn(StickerRoute.slice(0, StickerRoute.length - 1), curBoard);
                Height = Container.Height - Offsets[2] - Offsets[3];
            }
    }
    return Math.max(minHeight, Math.min(Height, maxHeight));
}
/**** GeometryOfSticker - in its immediate container ****/
function GeometryOfSticker(Sticker) {
    const Container = Sticker[$Container];
    if (Container == null)
        throwError('NotAttached: the given sticker is no longer attached');
    const ContainerGeometry = (TypeOfVisual(Container) === 'board'
        ? GeometryOfBoard(Container)
        : GeometryOfSticker(Container));
    const { Width: ContainerWidth, Height: ContainerHeight } = ContainerGeometry;
    let { Anchors, Offsets, minWidth, maxWidth, minHeight, maxHeight } = Sticker;
    if (minWidth == null) {
        minWidth = 0;
    }
    if (maxWidth == null) {
        maxWidth = Infinity;
    }
    else {
        maxWidth = Math.max(minWidth, maxWidth);
    }
    if (minHeight == null) {
        minHeight = 0;
    }
    if (maxHeight == null) {
        maxHeight = Infinity;
    }
    else {
        maxHeight = Math.max(minHeight, maxHeight);
    }
    let x = 0, Width = 0;
    switch (Anchors[0]) {
        case 'left-width':
            x = Offsets[0];
            Width = Offsets[1];
            break;
        case 'width-right':
            x = ContainerWidth - Offsets[0] - Offsets[1];
            Width = Offsets[0];
            break;
        case 'left-right':
            x = Offsets[0];
            Width = ContainerWidth - Offsets[0] - Offsets[1];
            break;
    }
    Width = Math.max(minWidth, Math.min(Width, maxWidth));
    let y = 0, Height = 0;
    switch (Anchors[1]) {
        case 'top-height':
            y = Offsets[2];
            Height = Offsets[3];
            break;
        case 'height-bottom':
            y = ContainerHeight - Offsets[2] - Offsets[3];
            Height = Offsets[2];
            break;
        case 'top-bottom':
            y = Offsets[2];
            Height = ContainerHeight - Offsets[2] - Offsets[3];
            break;
    }
    Height = Math.max(minHeight, Math.min(Height, maxHeight));
    return { x, y, Width, Height };
}
/**** validateOverlayDescriptor ****/
function validateOverlayDescriptor(Value) {
    if (!ValueIsPlainObject(Value))
        throwError('InvalidArgument: the given overlay descriptor is no plain JavaScript object');
    let OverlayIdentification = 'overlay descriptor';
    try {
        acceptName('Name', Value);
        if (Value.Name == null)
            throwError('MissingArgument: missing "Name"');
        OverlayIdentification = 'descriptor for overlay "' + Value.Name + '"';
        acceptBoolean('isModal', Value);
        if ((Value.Content != null) && !ValueIsFunction(Value.Content) &&
            !ValueIsBoardStickerLocator(Value.Content))
            throwError('InvalidArgument: property "Content" is neither a function nor a ' +
                'valid board-and-sticker locator');
        acceptFunction('onOpen', Value);
        acceptFunction('onClose', Value);
        acceptLocation('OffsetX', Value);
        acceptLocation('OffsetY', Value);
        acceptDimension('Width', Value);
        acceptDimension('Height', Value);
        acceptDimension('minWidth', Value);
        acceptDimension('minHeight', Value);
        acceptDimension('maxWidth', Value);
        acceptDimension('maxHeight', Value);
    }
    catch (Signal) {
        if ((Signal.name === 'MissingArgument') || (Signal.name === 'InvalidArgument')) {
            Signal.message += ' in ' + OverlayIdentification;
        }
        throw Signal;
    }
}
/**** validateDialogDescriptor ****/
function validateDialogDescriptor(Value) {
    if (!ValueIsPlainObject(Value))
        throwError('InvalidArgument: the given dialog descriptor is no plain JavaScript object');
    let DialogIdentification = 'dialog descriptor';
    try {
        acceptName('Name', Value);
        if (Value.Name == null)
            throwError('MissingArgument: missing "Name"');
        DialogIdentification = 'descriptor for dialog "' + Value.Name + '"';
        acceptText('Title', Value);
        acceptBoolean('isModal', Value);
        acceptBoolean('hasCloseButton', Value);
        acceptBoolean('isResizable', Value);
        acceptBoolean('isDraggable', Value);
        acceptBoolean('dontShrink', Value);
        if ((Value.Content != null) && !ValueIsFunction(Value.Content) &&
            !ValueIsBoardStickerLocator(Value.Content))
            throwError('InvalidArgument: property "Content" is neither a function nor a ' +
                'valid board-and-sticker locator');
        acceptFunction('onOpen', Value);
        acceptFunction('onClose', Value);
        acceptLocation('OffsetX', Value);
        acceptLocation('OffsetY', Value);
        acceptDimension('Width', Value);
        acceptDimension('Height', Value);
        acceptDimension('minWidth', Value);
        acceptDimension('minHeight', Value);
        acceptDimension('maxWidth', Value);
        acceptDimension('maxHeight', Value);
    }
    catch (Signal) {
        if ((Signal.name === 'MissingArgument') || (Signal.name === 'InvalidArgument')) {
            Signal.message += ' in ' + DialogIdentification;
        }
        throw Signal;
    }
}
/**** validateBoardDescriptorList ****/
function validateBoardDescriptorList(Value, BoardIdentification) {
    if (Value == null) {
        return;
    }
    Value.forEach((Value, i) => {
        const innerBoardIdentification = (BoardIdentification == null ? '' : BoardIdentification + '/') + (ValueIsPlainObject(Value) && ValueIsName(Value.Name)
            ? Value.Name
            : '#' + (i + 1));
        validateBoardDescriptor(Value, innerBoardIdentification);
    });
}
/**** validateStickerDescriptorList ****/
function validateStickerDescriptorList(Value, BoardIdentification, StickerIdentification) {
    if (Value == null) {
        return;
    }
    Value.forEach((Value, i) => {
        const innerStickerIdentification = (StickerIdentification == null ? '' : StickerIdentification + '/') + (ValueIsPlainObject(Value) && ValueIsName(Value.Name)
            ? Value.Name
            : '#' + (i + 1));
        validateStickerDescriptor(Value, BoardIdentification, innerStickerIdentification);
    });
}
/**** cleanupExternalization ****/
function cleanupExternalization(Externalization) {
    delete Externalization.internalId;
    if (Externalization.BoardList != null) {
        Externalization.BoardList.forEach((Board) => cleanupExternalization(Board));
    }
    if (Externalization.StickerList != null) {
        Externalization.StickerList.forEach((Sticker) => cleanupExternalization(Sticker));
    }
    Object.keys(Externalization).forEach((Key) => {
        if (!ValueIsSerializableValue(Externalization[Key])) {
            delete Externalization[Key];
        }
    });
}
//------------------------------------------------------------------------------
//--                                Rendering                                 --
//------------------------------------------------------------------------------
/**** safelyRendered ****/
function safelyRendered(Renderer, Sufferer) {
    try {
        return Renderer();
    }
    catch (Signal) {
        debugger;
        const { BoardRoute, StickerRoute } = Sufferer !== null && Sufferer !== void 0 ? Sufferer : { BoardRoute: [], StickerRoute: [] };
        let Title, Message;
        switch (true) {
            case Sufferer == null:
                Title = 'Renderer Failure';
                Message = 'Error while rendering a preact component';
                break;
            case (BoardRoute.length === 0):
                Title = 'Project Script Execution Failure';
                Message = 'Error while running project script';
                break;
            case (StickerRoute.length === 0):
                Title = 'Board Script Execution Failure';
                Message = 'Error while running script of board [' +
                    BoardRoute.join(',') + ']';
                break;
            default:
                Title = 'Sticker Script Execution Failure';
                Message = 'Error while running script of sticker [' +
                    BoardRoute.join(',') + ']:[' + StickerRoute.join(',') + ']';
        }
        console.error(Message, Signal);
        return html `<${SIM_ErrorIndicator} error=${{
            Severity: 'fatal',
            Title, Message: Message + ':\n' + Signal,
            Sufferer, Cause: Signal
        }}/>`;
    }
}
/**** notRendered ****/
function notRendered(PropSet) {
    const { Visual, otherProps } = PropSet;
    const activeScript = ((TypeOfVisual(Visual) === 'sticker') && (Visual.Variant === 'sim/special/custom')
        ? undefined
        : Visual[$activeScript]);
    if (activeScript == null) {
        return;
    }
    if (!ValueIsFunction(activeScript))
        debugger;
    try {
        executedVisualScript(activeScript, otherProps);
    }
    catch (Signal) {
        debugger;
        console.error(Signal);
    }
}
/**** rendered ****/
function rendered(PropSet) {
    var _a, _b;
    const { Visual, otherProps } = PropSet;
    const activeScript = ((TypeOfVisual(Visual) === 'sticker') && (Visual.Variant !== 'sim/special/custom')
        ? (_b = VariantRegistry[_normalizedName((_a = Visual.Variant) !== null && _a !== void 0 ? _a : 'sim/basic/dummy')]) === null || _b === void 0 ? void 0 : _b[$activeScript]
        : Visual[$activeScript]);
    if (activeScript == null) {
        if (TypeOfVisual(Visual) === 'sticker') {
            const Error = {
                Severity: 'fatal',
                Title: 'Missing Sticker Variant',
                Message: 'sticker variant ' + quoted(Visual.Variant) + ' does not exist',
                Sufferer: Visual
            };
            return html `<${SIM_ErrorIndicator} error=${Error}/>`;
        }
        else {
            return '';
        }
    }
    if (!ValueIsFunction(activeScript))
        debugger;
    try {
        return executedVisualScript(activeScript, otherProps);
    }
    catch (Signal) {
        debugger;
        console.error(Signal);
    }
}
/**** executedVisualScript ****/
function executedVisualScript(activeScript, PropSet) {
    const { me, my, Configuration, configure, Board, BoardSticker, Sticker, activeBoard, activateBoard, rerender, preserveProject } = contextualAPI(); // also enforces rendering even if prop.s remain unchanged
    /**** initially,eventually ****/
    const alreadyInitialized = useRef(false);
    const activeScriptRef = useRef(activeScript);
    if (activeScriptRef.current !== activeScript) {
        activeScriptRef.current = activeScript;
        alreadyInitialized.current = false;
    } // changing "activeScript" allows to initialize a visual again
    // "useEffect" is useless here, as it runs *after* rendering only
    function initially(Callback) {
        if (!alreadyInitialized.current) {
            alreadyInitialized.current = true;
            Callback(); // may fail!
        }
    }
    function eventually(Callback) {
        useEffect(() => { return Callback; }, []);
    }
    /**** actual logic or rendering ****/
    return activeScript(PropSet, initially, eventually, me, my, Configuration, configure, Board, BoardSticker, Sticker, activeBoard, activateBoard, rerender, contextualAPI, preserveProject);
}
/**** CSSforVisual ****/
function CSSforVisual(Visual) {
    let CSSStyleList = [];
    const { FontFamily, FontSize, FontWeight, FontStyle, TextDecoration, TextShadow, TextAlignment, LineHeight, ForegroundColor, hasBackground, BackgroundColor, BackgroundTexture, Opacity, Cursor, } = Visual;
    if (FontFamily != null) {
        CSSStyleList.push(`font-family:${FontFamily}`);
    }
    if (FontSize != null) {
        CSSStyleList.push(`font-size:${FontSize}px`);
    }
    if (FontWeight != null) {
        CSSStyleList.push(`font-weight:${FontWeight}`);
    }
    if (FontStyle != null) {
        CSSStyleList.push(`font-style:${FontStyle}`);
    }
    if (TextDecoration != null) {
        if (TextDecoration.isActive) {
            CSSStyleList.push('text-decoration:' + TextDecoration.Line +
                (TextDecoration.Color == null ? '' : ' ' + TextDecoration.Color) +
                (TextDecoration.Style == null ? '' : ' ' + TextDecoration.Style) +
                (TextDecoration.Thickness == null ? '' : ' ' + TextDecoration.Thickness + 'px'));
        }
        else {
            CSSStyleList.push('text-decoration:none');
        }
    }
    if (TextShadow != null) {
        if (TextShadow.isActive) {
            CSSStyleList.push('text-shadow:' +
                TextShadow.xOffset + 'px ' + TextShadow.yOffset + 'px ' +
                TextShadow.BlurRadius + 'px ' + TextShadow.Color);
        }
        else {
            CSSStyleList.push('text-shadow:none');
        }
    }
    if (TextAlignment != null) {
        CSSStyleList.push(`text-align:${TextAlignment}`);
    }
    if (LineHeight != null) {
        CSSStyleList.push(`line-height:${LineHeight}px`);
    }
    if (ForegroundColor != null) {
        CSSStyleList.push(`color:${ForegroundColor}`);
    }
    if (hasBackground) {
        if (BackgroundColor != null) {
            CSSStyleList.push(`background-color:${BackgroundColor}`);
        }
        if (BackgroundTexture != null) {
            const { ImageURL, Mode, xOffset, yOffset } = BackgroundTexture;
            let BackgroundSize = 'auto auto';
            switch (Mode) {
                case 'normal': break;
                case 'contain':
                case 'cover':
                    BackgroundSize = BackgroundTexture.Mode;
                    break;
                case 'fill':
                    BackgroundSize = '100% 100%';
                    break;
                case 'tile':
                    BackgroundSize = 'auto auto';
                    break;
            }
            let BackgroundRepeat = (Mode === 'tile' ? 'repeat' : 'no-repeat');
            CSSStyleList.push(`background-image:url(${ImageURL})`, `background-position:${Math.round(xOffset)}px ${Math.round(yOffset)}px;` +
                `background-size:${BackgroundSize}; background-repeat:${BackgroundRepeat}`);
        }
    }
    if (Opacity != null) {
        CSSStyleList.push(`opacity:${Opacity / 100}`);
    }
    if (Cursor != null) {
        CSSStyleList.push(`cursor:${Cursor}`);
    }
    return (CSSStyleList.length === 0 ? undefined : CSSStyleList.join(';'));
}
//------------------------------------------------------------------------------
//--                             SIM_ProjectView                              --
//------------------------------------------------------------------------------
// only used by <sim-project/>
function SIM_ProjectView(PropSet) {
    return safelyRendered(() => {
        const [literalProject, withDesigner, Base] = parsedPropSet(PropSet, mandatoryValue('project', ValueIsPlainObject /*ValueIsProject*/), optionalBoolean('withdesigner'), mandatoryValue('base', (Value) => Value instanceof HTMLElement)); // "Base" is used to obtain its size
        const [Project, setProject] = useState(literalProject);
        // rerenders this view upon changing the associated project
        Project[$Base] = Base; // will help resizing Projects
        /**** prepare call for explicit rerendering (or project change) ****/
        let isRendering = true;
        useEffect(() => isRendering = false);
        const [RenderCount, setRenderCount] = useState(0);
        const rerender = Project[$rerender] = (newProject) => {
            if (newProject == null) {
                if (isRendering) {
                    return;
                } // no rerendering req.s during rendering
                console.log('rerendering requested'); // ,ActivationStack())
            }
            else { // changes the underlying project
                console.log('rerendering a new project');
                Object.assign(Base._PropSet, {
                    Name: newProject.Name, isBroken: false, Project: newProject
                });
                newProject[$Base] = Base;
                newProject[$View] = Project[$View];
                newProject[$rerender] = Project[$rerender];
                newProject[$DialogList] = [];
                newProject[$DesignerDialogs] = Project[$DesignerDialogs];
                deactivateProject(Project);
                activateProject(newProject);
                Object.assign(SystemContextRef.current, {
                    ProjectState: {},
                    Project: newProject,
                });
                setProject(newProject);
                setRenderCount(0);
                // rerendering calls Toolbox.onClose and closes the designer
                // "import" timeout handler opens it again later
            }
            //console.log('rerendering requested',ActivationStack())
            setRenderCount((RenderCount) => RenderCount + 1);
        }; // automatically rerenders the project
        /**** projects need a board list ****/
        if (Project.BoardList.length === 0) {
            Project.BoardList.push(internalizedBoard({ StickerList: [] }, Project));
        }
        /**** prepare call for board activation ****/
        let [activeBoard, setActiveBoard] = useState(Project.BoardList[0]);
        if (ProjectOfBoard(activeBoard) !== Project) {
            activeBoard = Project.BoardList[0];
        }
        const activateBoard = (Board) => {
            if (ProjectOfBoard(Board) !== Project)
                console.warn('InvalidArgument: the given board is no longer attached to this project');
            setActiveBoard(Board);
        }; // automatically rerenders the project
        const activeBoardRoute = RouteToBoard(activeBoard);
        /**** initialize system context ****/
        const SystemContextRef = useRef({
            ProjectState: {}, // reserved for custom business logic
            Project, activateBoard,
            DesignerState: Object.assign({}, initialDesignerState),
        });
        SystemContextRef.current.activeBoard = activeBoard;
        /**** handle project activation/deactivation ****/
        useEffect(() => {
            Project[$View] = ProjectRef.current;
            activateProject(Project);
            Project[$rerender](); // needed to render the DesignerButton
            return () => { delete Project[$View]; deactivateProject(Project); };
        }, []);
        /**** get project settings relevant for rendering ****/
        let { Name, Width, Height, minWidth, minHeight, maxWidth, maxHeight, } = Project;
        let { BoardList } = Project, PropSetForScript = __rest(Project
        /**** construct rendering context, initially for the project itself ****/
        , ["BoardList"]);
        /**** construct rendering context, initially for the project itself ****/
        const RenderingContext = {
            Project, Board: undefined, Sticker: undefined,
            activeBoardRoute, curBoardRoute: [], curStickerRoute: [],
            DialogName: undefined, OverlayName: undefined,
            inDesigner: false, rerender
        }; // new reference upon every render
        /**** render project ****/
        const ProjectRef = useRef(); // needed for dialog placement
        const Style = [
            CSSforVisual(Project),
            Base.style.width == null ? `width:${Width !== null && Width !== void 0 ? Width : 600}px` : 'width:100%',
            Base.style.height == null ? `height:${Height !== null && Height !== void 0 ? Height : 450}px` : 'height:100%',
            minWidth && `min-width:${minWidth}px`,
            minHeight && `min-height:${minHeight}px`,
            maxWidth && `max-width:${maxWidth}px`,
            maxHeight && `max-height:${maxHeight}px`,
        ].filter((Element) => Element != null).join(';');
        const DialogList = Project[$DialogList];
        console.log('project rendering #', RenderCount, Project.Synopsis);
        return html `
      <${SIM_SystemContext.Provider} value=${SystemContextRef.current}>
        <${SIM_RenderingContext.Provider} value=${RenderingContext}>
          <div class="sim-project" key=${Project.internalId} ref=${ProjectRef} name=${Name} style=${Style}>
            <${notRendered} Visual=${Project} otherProps=${PropSetForScript}/>
            <${SIM_BoardView} BoardRoute=${activeBoardRoute.slice(0, 1)} Project=${Project}/>
            ${withDesigner && html `<${SIM_LayouterLayer} ProjectRef=${ProjectRef}/>`}
            <${renderedDialogs} DialogList=${DialogList} ProjectRef=${ProjectRef}/>
            ${withDesigner && html `<${SIM_DesignerLayer} ProjectRef=${ProjectRef}/>`}
          </>
        </>
      </>
      `;
    }, { BoardRoute: [], StickerRoute: [] });
}
/**** renderedDialogs ****/
function renderedDialogs(PropSet) {
    return safelyRendered(() => {
        let [DialogList, ProjectRef] = parsedPropSet(PropSet, mandatoryValue('dialoglist', (Value) => ValueIsListSatisfying(Value, ValueIsPlainObject /*ValueIsDialog*/)), mandatoryValue('projectref', () => true)); // "ProjectRef" is used to place any dialogs relative to the project
        if ((DialogList == null) || (DialogList.length === 0)) {
            return;
        }
        const RenderingContext = useRenderingContext(); // also enforces rendering
        let lastDialogIndex = DialogList.length - 1;
        return html `
        ${DialogList.map((Dialog, Index) => {
            const innerRenderingContext = Object.assign(Object.assign({}, RenderingContext), { DialogName: Dialog.Name });
            if ((Index === lastDialogIndex) && Dialog.isModal) {
                return html `
              <${SIM_RenderingContext.Provider} value=${innerRenderingContext}>
                <${SIM_ModalLayer}/>
                <${SIM_DialogView} Dialog=${Dialog} ProjectRef=${ProjectRef}/>
              </>
            `;
            }
            else {
                return html `
              <${SIM_RenderingContext.Provider} value=${innerRenderingContext}>
                <${SIM_DialogView} Dialog=${Dialog} ProjectRef=${ProjectRef}/>
              </>
            `;
            }
        })}
      `;
    });
}
//------------------------------------------------------------------------------
//--                              SIM_BoardView                               --
//------------------------------------------------------------------------------
function SIM_BoardView(PropSet) {
    return safelyRendered(() => {
        var _a;
        const [curBoardRoute] = parsedPropSet(PropSet, mandatoryValue('boardroute', ValueIsRoute));
        const RenderingContext = useRenderingContext(); // also enforces rendering
        const curProject = RenderingContext.Project;
        const curBoard = existingBoardIn(curBoardRoute, curProject);
        const { Name } = curBoard;
        const { BoardList, StickerList } = curBoard, PropSetForScript = __rest(curBoard
        /**** keep track of the rendering element ****/
        , ["BoardList", "StickerList"]);
        /**** keep track of the rendering element ****/
        const BoardRef = useRef(); // needed for screen shots
        useEffect(() => {
            curBoard[$View] = BoardRef.current;
            return () => { delete curBoard[$View]; };
        }, []);
        /**** render board ****/
        const Style = [
            CSSforVisual(curBoard),
            curBoard.Overflows && `overflow:${curBoard.Overflows.join(' ')}`,
        ].filter((Element) => Element != null).join(';');
        //console.log('board rendering for',curBoard.Name)
        const activeBoardRoute = RenderingContext.activeBoardRoute;
        if (curBoardRoute.length < activeBoardRoute.length) { // virtual board only
            const nextInnerBoardRoute = activeBoardRoute.slice(0, curBoardRoute.length + 2);
            return html `
          <${SIM_RenderingContext.Provider} value=${Object.assign(Object.assign({}, RenderingContext), { curBoardRoute, Board: curBoard })}>
            <div class="sim-board" name=${Name} isVirtual=${true} ref=${BoardRef}
              key=${curBoard.internalId} style=${Style}
            >
              <${notRendered} Visual=${curBoard} otherProps=${PropSetForScript}/>
              <${SIM_BoardView} BoardRoute=${nextInnerBoardRoute}/>
            </>
          </>
        `;
        }
        else { // non-virtual board with shown stickers
            const StickerList = (_a = curBoard.StickerList) !== null && _a !== void 0 ? _a : [];
            return html `
          <${SIM_RenderingContext.Provider} value=${Object.assign(Object.assign({}, RenderingContext), { curBoardRoute, Board: curBoard })}>
            <div class="sim-board" name=${Name} isVirtual=${false} ref=${BoardRef}
              key=${curBoard.internalId} style=${Style}
            >
              <${notRendered} Visual=${curBoard} otherProps=${PropSetForScript}/>
              ${StickerList.toReversed().map((Sticker, Index) => (html `<${SIM_StickerView} BoardRoute=${curBoardRoute} StickerRoute=${[Index]} Sticker=${Sticker}/>`))}
            </>
          </>
        `;
        }
    }, { BoardRoute: PropSet.BoardRoute, StickerRoute: [] });
}
//------------------------------------------------------------------------------
//--                             SIM_StickerView                              --
//------------------------------------------------------------------------------
function SIM_StickerView(PropSet) {
    return safelyRendered(() => {
        var _a;
        let [curBoardRoute, curStickerRoute, curSticker] = parsedPropSet(PropSet, mandatoryValue('boardroute', ValueIsRoute), mandatoryValue('stickerroute', ValueIsRoute), mandatoryValue('sticker', ValueIsPlainObject /*ValueIsSticker*/));
        if (curSticker.hidden == true) {
            return;
        }
        const { // "PropSet" can be passed, the other prop.s not
        Name, Variant, Anchors, Offsets, minWidth, minHeight, maxWidth, maxHeight, Overflows, } = curSticker;
        let { StickerList } = curSticker;
        function PropSetForScript() {
            let { StickerList } = curSticker, PropSetForScript = __rest(curSticker, ["StickerList"]);
            return PropSetForScript;
        } // ...because sticker logic may modify sticker configuration
        /**** keep track of the rendering element ****/
        const StickerRef = useRef(); // needed for overlay placement
        useEffect(() => {
            curSticker[$View] = StickerRef.current;
            return () => { delete curSticker[$View]; };
        }, []);
        /**** render sticker ****/
        const RenderingContext = useRenderingContext(); // also enforces rendering
        const Style = [
            CSSforGeometry(Anchors, Offsets), CSSforVisual(curSticker),
            CSSforBordersOfSticker(curSticker),
            Overflows && `overflow:${Overflows.join(' ')}`,
            minWidth && `min-width:${minWidth}px`,
            minHeight && `min-height:${minHeight}px`,
            maxWidth && `max-width:${maxWidth}px`,
            maxHeight && `max-height:${maxHeight}px`,
        ].filter((Element) => Element != null).join(';');
        if (StickerList == null) {
            StickerList = [];
        }
        let OverlayList = (_a = curSticker[$OverlayList]) !== null && _a !== void 0 ? _a : [];
        let inUse = undefined;
        if (curSticker[$Delegate] != null) { // ignore delegated stickers while used
            //      StickerRenderer = () => undefined
            inUse = true;
            StickerList = [];
            OverlayList = [];
        }
        //console.log('sticker rendering for',curSticker.Name ?? curSticker.Variant)
        return html `
        <${SIM_RenderingContext.Provider} value=${Object.assign(Object.assign({}, RenderingContext), { curStickerRoute, Sticker: curSticker })}>
          <div class="sim-sticker" ref=${StickerRef} name=${Name} key=${curSticker.internalId} style=${Style}>
            <${notRendered} Visual=${curSticker} otherProps=${PropSetForScript()} in-use=${inUse}/>
            <${rendered}    Visual=${curSticker} otherProps=${PropSetForScript()}/>
            <${renderedStickers} StickerList=${StickerList} BoardRoute=${curBoardRoute} StickerRoute=${curStickerRoute}/>
            <${renderedOverlays} OverlayList=${OverlayList} BaseRef=${StickerRef}/>
          </>
        </>
      `; // setting "curBoardRoute" in "RenderingContext" for delegated rendering
    }, { BoardRoute: PropSet.BoardRoute, StickerRoute: PropSet.StickerRoute });
}
/**** CSSforGeometry ****/
function CSSforGeometry(Anchors, Offsets) {
    let Result = '';
    if (Offsets == null)
        debugger;
    const [Off_0, Off_1, Off_2, Off_3] = Offsets; // just a few abbreviations
    switch (Anchors[0]) {
        case 'left-width':
            Result = `left:${Off_0}px; right:auto; width:${Off_1}px; `;
            break;
        case 'width-right':
            Result = `left:auto; right:${Off_1}px; width:${Off_0}px; `;
            break;
        case 'left-right':
            Result = `left:${Off_0}px; right:${Off_1}px; width:auto; `;
            break;
    }
    switch (Anchors[1]) {
        case 'top-height':
            Result += `top:${Off_2}px; bottom:auto; height:${Off_3}px`;
            break;
        case 'height-bottom':
            Result += `top:auto; bottom:${Off_3}px; height:${Off_2}px`;
            break;
        case 'top-bottom':
            Result += `top:${Off_2}px; bottom:${Off_3}px; height:auto`;
            break;
    }
    return Result;
}
/**** CSSforBordersOfSticker ****/
function CSSforBordersOfSticker(Sticker) {
    let CSSStyleList = [];
    const { BorderWidths, BorderStyles, BorderColors, BorderRadii, BoxShadow, } = Sticker;
    if (BorderWidths != null) {
        CSSStyleList.push('border-width:' +
            BorderWidths[0] + 'px ' + BorderWidths[1] + 'px ' +
            BorderWidths[2] + 'px ' + BorderWidths[3] + 'px');
    }
    if (BorderStyles != null) {
        CSSStyleList.push('border-style:' +
            BorderStyles[0] + ' ' + BorderStyles[1] + ' ' +
            BorderStyles[2] + ' ' + BorderStyles[3]);
    }
    if (BorderColors != null) {
        CSSStyleList.push('border-color:' +
            BorderColors[0] + ' ' + BorderColors[1] + ' ' +
            BorderColors[2] + ' ' + BorderColors[3]);
    }
    if (BorderRadii != null) {
        CSSStyleList.push('border-radius:' +
            BorderRadii[0] + 'px ' + BorderRadii[1] + 'px ' +
            BorderRadii[2] + 'px ' + BorderRadii[3] + 'px');
    }
    if ((BoxShadow != null) && BoxShadow.isActive) {
        CSSStyleList.push('box-shadow:' +
            BoxShadow.xOffset + 'px ' + BoxShadow.yOffset + 'px ' +
            BoxShadow.BlurRadius + 'px ' + BoxShadow.SpreadRadius + 'px ' +
            BoxShadow.Color);
    }
    return (CSSStyleList.length === 0 ? undefined : CSSStyleList.join(';'));
}
/**** renderedStickers ****/
function renderedStickers(PropSet) {
    return safelyRendered(() => {
        let [StickerList, BoardRoute, StickerRoute] = parsedPropSet(PropSet, mandatoryValue('stickerlist', ValueIsList /* of stickers */), mandatoryValue('boardroute', ValueIsRoute), mandatoryValue('stickerroute', ValueIsRoute));
        if (StickerList.length === 0) {
            return;
        }
        const RenderingContext = useRenderingContext(); // also enforces rendering
        return html `
        ${StickerList.toReversed().map((Sticker, Index) => (html `<${SIM_StickerView} BoardRoute=${BoardRoute} StickerRoute=${[...StickerRoute, Index]} Sticker=${Sticker}/>`))}
      `;
    });
}
/**** renderedOverlays ****/
function renderedOverlays(PropSet) {
    return safelyRendered(() => {
        let [OverlayList, BaseRef] = parsedPropSet(PropSet, mandatoryValue('overlaylist', (Value) => ValueIsListSatisfying(Value, ValueIsPlainObject /*ValueIsOverlay*/)), mandatoryValue('baseref', () => true));
        if ((OverlayList == null) || (OverlayList.length === 0)) {
            return;
        }
        const RenderingContext = useRenderingContext(); // also enforces rendering
        let lastOverlayIndex = OverlayList.length - 1;
        return html `
        ${OverlayList.map((Overlay, Index) => {
            const innerRenderingContext = Object.assign(Object.assign({}, RenderingContext), { OverlayName: Overlay.Name });
            if (Index === lastOverlayIndex) {
                return html `
              <${SIM_RenderingContext.Provider} value=${innerRenderingContext}>
                <${SIM_Underlay}    Overlay=${Overlay}/>
                <${SIM_OverlayView} Overlay=${Overlay} BaseRef=${BaseRef}/>
              </>
            `;
            }
            else {
                return html `
              <${SIM_RenderingContext.Provider} value=${innerRenderingContext}>
                <${SIM_OverlayView} Overlay=${Overlay} BaseRef=${BaseRef}/>
              </>
            `;
            }
        })}
      `;
    });
}
//------------------------------------------------------------------------------
//--                         SIM_delegatedStickerView                         --
//------------------------------------------------------------------------------
function SIM_delegatedStickerView(PropSet) {
    return safelyRendered(() => {
        var _a;
        let [curBoardRoute, curStickerRoute, curSticker] = parsedPropSet(PropSet, mandatoryValue('boardroute', ValueIsRoute), mandatoryValue('stickerroute', ValueIsRoute), mandatoryValue('sticker', ValueIsPlainObject /*ValueIsSticker*/));
        if (curSticker.hidden == true) {
            return;
        }
        const { // "PropSet" can be passed, the other prop.s not
        Name, Variant, } = curSticker;
        const { StickerList } = curSticker;
        function PropSetForScript() {
            let { StickerList } = curSticker, PropSetForScript = __rest(curSticker, ["StickerList"]);
            return PropSetForScript;
        } // ...because sticker logic may modify sticker configuration
        /**** keep track of the rendering element ****/
        const StickerRef = useRef(); // needed for overlay placement
        useEffect(() => {
            curSticker[$View] = StickerRef.current;
            return () => { delete curSticker[$View]; };
        }, []);
        /**** render sticker ("curSticker" is a Content-, Overlay- or DialogSticker) ****/
        const RenderingContext = useRenderingContext(); // also enforces rendering
        const normalizedVariant = _normalizedName(Variant);
        const Style = [
            CSSforVisual(curSticker),
            normalizedVariant === 'sim/special/dialog' ? undefined : CSSforBordersOfSticker(curSticker),
        ].filter((Element) => Element != null).join(';');
        const OverlayList = (_a = curSticker[$OverlayList]) !== null && _a !== void 0 ? _a : [];
        return html `
        <${SIM_RenderingContext.Provider} value=${Object.assign(Object.assign({}, RenderingContext), { curStickerRoute, Sticker: curSticker })}>
          <${SIM_delegatedBoardView} BoardRoute=${curBoardRoute.slice(0, 1)} finalBoardRoute=${curBoardRoute}>
            <div class="sim-delegated-sticker" ref=${StickerRef} name=${Name} key=${curSticker.internalId} style=${Style}>
              <${notRendered} Visual=${curSticker} otherProps=${PropSetForScript()}/>
              <${rendered}    Visual=${curSticker} otherProps=${PropSetForScript()}/>
              <${renderedStickers} StickerList=${StickerList} BoardRoute=${curBoardRoute} StickerRoute=${curStickerRoute}/>
              <${renderedOverlays} OverlayList=${OverlayList} BaseRef=${StickerRef}/>
            </>
          </>
        </>
      `; // setting "curBoardRoute" in "RenderingContext" is for delegated rendering
    }, { BoardRoute: PropSet.BoardRoute, StickerRoute: PropSet.StickerRoute });
}
//------------------------------------------------------------------------------
//--                          SIM_delegatedBoardView                          --
//------------------------------------------------------------------------------
function SIM_delegatedBoardView(PropSet) {
    return safelyRendered(() => {
        const [curBoardRoute, finalBoardRoute, RestProps, ContentList] = parsedPropSet(PropSet, mandatoryValue('boardroute', ValueIsRoute), mandatoryValue('finalboardroute', ValueIsRoute));
        const RenderingContext = useRenderingContext(); // also enforces rendering
        const curProject = RenderingContext.Project;
        const curBoard = existingBoardIn(curBoardRoute, curProject);
        const { Name } = curBoard;
        const { BoardList, StickerList } = curBoard, PropSetForScript = __rest(curBoard
        /**** keep track of the rendering element ****/
        , ["BoardList", "StickerList"]);
        /**** keep track of the rendering element ****/
        const BoardRef = useRef(); // needed for screen shots
        useEffect(() => {
            curBoard[$View] = BoardRef.current;
            return () => { delete curBoard[$View]; };
        }, []);
        /**** render board - if need be, with sticker ****/
        const Style = [
            CSSforVisual(curBoard),
            'overflow:hidden',
        ].filter((Element) => Element != null).join(';');
        if (curBoardRoute.length < finalBoardRoute.length) { // virtual board only
            const nextInnerBoardRoute = finalBoardRoute.slice(0, curBoardRoute.length + 2);
            return html `
          <${SIM_RenderingContext.Provider} value=${Object.assign(Object.assign({}, RenderingContext), { curBoardRoute, Board: curBoard, curStickerRoute: [] })}>
            <div class="sim-virtual-board" name=${Name} isVirtual=${true}
              key=${curBoard.internalId} ref=${BoardRef} style=${Style}>
              <${notRendered} Visual=${curBoard} otherProps=${PropSetForScript}/>
              <${SIM_delegatedBoardView} BoardRoute=${nextInnerBoardRoute} finalBoardRoute=${finalBoardRoute}/>
            </>
          </>
        `;
        }
        else { // non-virtual board (because of rendered sticker)
            return html `
          <${SIM_RenderingContext.Provider} value=${Object.assign(Object.assign({}, RenderingContext), { curBoardRoute, Board: curBoard, curStickerRoute: [] })}>
            <div class="sim-virtual-board" name=${Name} isVirtual=${false}
              key=${curBoard.internalId} ref=${BoardRef} style=${Style}>
              <${notRendered} Visual=${curBoard} otherProps=${PropSetForScript}/>
              ${ContentList}
            </>
          </>
        `;
        }
    }, { BoardRoute: PropSet.BoardRoute, StickerRoute: [] });
}
//------------------------------------------------------------------------------
//--                             SIM_OverlayView                              --
//------------------------------------------------------------------------------
function SIM_OverlayView(PropSet) {
    return safelyRendered(() => {
        let [Overlay, BaseRef] = parsedPropSet(PropSet, mandatoryValue('overlay', ValueIsPlainObject /*ValueIsOverlay*/), mandatoryValue('baseref', () => true));
        const Base = BaseRef.current;
        const OverlayRef = useRef();
        const [State, setState] = useState(); // used for explicit rerendering
        const RenderingContext = useRenderingContext(); // also enforces rendering
        const inDialog = (RenderingContext.DialogName != null);
        const inDesigner = RenderingContext.inDesigner;
        const { rerender } = RenderingContext;
        if ((Overlay[$ContentSticker] == null) && (Overlay[$ContentSticker][$Delegate] == null)) {
            Overlay[$ContentSticker][$Delegate] = Overlay[$Base];
        }
        useEffect(() => {
            executeCallback(`"onOpen" callback of overlay ${Overlay.Name}`, Overlay.onOpen, Overlay.Name, Object.assign({}, Overlay));
            setTimeout(rerender, 0); // also rerenders "ContentSticker", if necessary
            // this second rendering updates size and position, if necessary
            return () => {
                var _a;
                if (((_a = Overlay[$ContentSticker]) === null || _a === void 0 ? void 0 : _a[$Delegate]) != null) {
                    delete Overlay[$ContentSticker][$Delegate]; // not a real state change
                } // ...but sufficient for the moment
                rerender(); // also rerenders "ContentSticker", if necessary
                executeCallback(`"onClose" callback of overlay ${Overlay.Name}`, Overlay.onClose, Overlay.Name, Object.assign({}, Overlay));
            };
        }, []); // to be run after mount and before unmount
        /**** compute position and size... ****/
        let { OffsetX, OffsetY, Width, Height, minWidth, minHeight, maxWidth, maxHeight, } = Overlay;
        const { left: BaseX, top: BaseY } = Base.getBoundingClientRect();
        let x = BaseX, y = BaseY;
        if (OverlayRef.current == null) { // first render is hidden
            x += OffsetX !== null && OffsetX !== void 0 ? OffsetX : 0;
            y += OffsetY !== null && OffsetY !== void 0 ? OffsetY : 0;
        }
        else { // all others are visible
            let { width, height } = OverlayRef.current.getBoundingClientRect();
            Width = Math.max(minWidth !== null && minWidth !== void 0 ? minWidth : 0, Math.min(width, window.innerWidth, maxWidth !== null && maxWidth !== void 0 ? maxWidth : Infinity));
            Height = Math.max(minHeight !== null && minHeight !== void 0 ? minHeight : 0, Math.min(height, window.innerHeight, maxHeight !== null && maxHeight !== void 0 ? maxHeight : Infinity));
            x = Math.max(0, Math.min(x + (OffsetX !== null && OffsetX !== void 0 ? OffsetX : 0), window.innerWidth - Width));
            y = Math.max(0, Math.min(y + (OffsetY !== null && OffsetY !== void 0 ? OffsetY : 0), window.innerHeight - Height));
        }
        Object.assign(Overlay, {
            OffsetX: x - BaseX, OffsetY: y - BaseY, Width, Height
        });
        /**** ...then render the overlay ****/
        const OverlayRenderer = useCallback(() => executedCallback(`"Renderer" callback of overlay ${Overlay.Name}`, Overlay[$Renderer], Overlay.Name, Object.assign({}, Overlay)), [Overlay]);
        return createPortal(html `
       <${SIM_RenderingContext.Provider} value=${Object.assign(Object.assign({}, RenderingContext), { OverlayName: Overlay.Name })}>
        <div class="sim-overlay-view ${inDialog ? 'in-dialog' : ''} ${inDesigner ? 'in-designer' : ''}" style="
          visibility:${OverlayRef == null ? 'hidden' : 'visible'};
          left:${x}px; top:${y}px;
          width: ${Width == null ? 'auto' : `${Width}px`};
          height:${Height == null ? 'auto' : `${Height}px`};
          min-width:${minWidth}px; min-height:${minHeight}px;
          max-width: ${maxWidth == null ? 'auto' : `${maxWidth}px`};
          max-height:${maxHeight == null ? 'auto' : `${maxHeight}px`};
        " key="overlay:${Overlay.Name}" ref=${OverlayRef}>
          <${OverlayRenderer}/>
        </>
       </>
      `, document.body);
    });
}
//------------------------------------------------------------------------------
//--                               SIM_Underlay                               --
//------------------------------------------------------------------------------
const SIM_Underlay_EventTypes = [
    'click', 'dblclick',
    /*'mousedown',*/ 'mouseup', 'mousemove', 'mouseover', 'mouseout',
    'mouseenter', 'mouseleave',
    /*'touchstart',*/ 'touchend', 'touchmove', 'touchcancel',
    /*'pointerdown',*/ 'pointerup', 'pointermove', 'pointerover', 'pointerout',
    'pointerenter', 'pointerleave', 'pointercancel',
    'keydown', 'keyup', 'keypress',
    'wheel', 'contextmenu', 'focus', 'blur'
];
function SIM_Underlay(PropSet) {
    return safelyRendered(() => {
        let [Overlay] = parsedPropSet(PropSet, mandatoryValue('overlay', ValueIsPlainObject /*ValueIsOverlay*/));
        const RenderingContext = useRenderingContext(); // also enforces rendering
        const inDialog = (RenderingContext.DialogName != null);
        const inDesigner = RenderingContext.inDesigner;
        const UnderlayRef = useRef();
        useEffect(() => {
            const View = UnderlayRef.current;
            SIM_Underlay_EventTypes.forEach((EventType) => {
                View.addEventListener(EventType, consumeEvent);
            });
            return () => {
                SIM_Underlay_EventTypes.forEach((EventType) => {
                    View.removeEventListener(EventType, consumeEvent);
                });
            };
        }, []); // to be run after mount and before unmount
        const { closeOverlay } = contextualAPI();
        const handleEvent = (Event) => {
            consumeEvent(Event);
            if (!Overlay.isModal) {
                closeOverlay(Overlay.Name);
            }
        };
        return createPortal(html `<div
        class="sim-underlay ${Overlay.isModal ? 'modal' : ''} ${inDialog ? 'in-dialog' : ''} ${inDesigner ? 'in-designer' : ''}"
        ref=${UnderlayRef}
        onMouseDown=${handleEvent} onPointerDown=${handleEvent}
        onTouchStart=${handleEvent}
      />`, document.body);
    });
}
//------------------------------------------------------------------------------
//--                              SIM_DialogView                              --
//------------------------------------------------------------------------------
function SIM_DialogView(PropSet) {
    return safelyRendered(() => {
        let [Dialog, ProjectRef] = parsedPropSet(PropSet, mandatoryValue('dialog', ValueIsPlainObject /*ValueIsDialog*/), mandatoryValue('projectref', () => true)); // "ProjectRef" is used to place a dialog relative to its project
        const Base = ProjectRef.current;
        const DialogRef = useRef();
        const [State, setState] = useState(); // used for explicit rerendering
        const RenderingContext = useRenderingContext(); // also enforces rendering
        const inDesigner = RenderingContext.inDesigner;
        const { closeDialog, bringDialogToFront, rerender } = contextualAPI();
        if ((Dialog[$ContentSticker] != null) && (Dialog[$ContentSticker][$Delegate] == null)) {
            Dialog[$ContentSticker][$Delegate] = Dialog.Name;
        }
        useEffect(() => {
            executeCallback(`"onOpen" callback of dialog ${Dialog.Name}`, Dialog.onOpen, Dialog.Name, Object.assign({}, Dialog));
            setTimeout(rerender, 0); // also rerenders "ContentSticker", if necessary
            // this second rendering updates size and position, if necessary
            return () => {
                var _a;
                if (((_a = Dialog[$ContentSticker]) === null || _a === void 0 ? void 0 : _a[$Delegate]) != null) {
                    delete Dialog[$ContentSticker][$Delegate]; // not a real state change
                } // ...but sufficient for the moment
                rerender(); // also rerenders "ContentSticker", if necessary
                executeCallback(`"onClose" callback of dialog ${Dialog.Name}`, Dialog.onClose, Dialog.Name, Object.assign({}, Dialog));
            };
        }, []); // to be run after mount and before unmount
        /**** compute absolute size minimums ****/
        let { Name, Title, hasCloseButton, isResizable, isDraggable, OffsetX, OffsetY, Width, Height, minWidth, minHeight, maxWidth, maxHeight, dontShrink, } = Dialog;
        const withTitlebar = (Title != null) || hasCloseButton || isDraggable;
        const resizable = (isResizable ? 'resizable' : '');
        const draggable = (isDraggable ? 'draggable' : '');
        if (minWidth == null) {
            minWidth = 0;
        }
        if (minHeight == null) {
            minHeight = 0;
        }
        const DecorationHeight = (withTitlebar ? 30 : 0) + (isResizable ? 10 : 0);
        if (withTitlebar || isResizable) {
            minHeight += DecorationHeight;
            Height += DecorationHeight;
        }
        if (hasCloseButton) {
            minWidth = Math.max(40, minWidth);
        }
        if (isResizable) {
            minWidth = Math.max(30 + 10 + 30, minWidth);
        }
        /**** compute position and size (and implement any constraints)... ****/
        const { left: BaseX, top: BaseY } = Base.getBoundingClientRect();
        let x = BaseX, y = BaseY;
        if (DialogRef.current == null) { // first render is hidden
            x += OffsetX !== null && OffsetX !== void 0 ? OffsetX : 0;
            y += OffsetY !== null && OffsetY !== void 0 ? OffsetY : 0;
        }
        else { // all others are visible
            let { width: curWidth, height: curHeight } = DialogRef.current.getBoundingClientRect();
            let { width: BaseWidth, height: BaseHeight } = Base.getBoundingClientRect();
            /**** never larger than the viewport ****/
            Width = Math.min(Width !== null && Width !== void 0 ? Width : curWidth, window.innerWidth);
            Height = Math.min(Height !== null && Height !== void 0 ? Height : curHeight, window.innerHeight);
            /**** if OffsetX/Y are missing: center dialog ****/
            if (OffsetX == null) {
                Dialog.OffsetX = OffsetX = (BaseWidth - Width) / 2;
            }
            if (OffsetY == null) {
                Dialog.OffsetY = OffsetY = (BaseHeight - Height) / 2;
            }
            /**** keep dialog within viewport ****/
            x = Math.max(0, Math.min(x + OffsetX, window.innerWidth - Width));
            y = Math.max(0, Math.min(y + OffsetY, window.innerHeight - Height));
            Dialog.OffsetX = x - BaseX;
            Dialog.OffsetY = y - BaseY;
            /**** if need be, use current size as minimum ****/
            if (dontShrink === true) {
                minWidth = Dialog.minWidth = Math.max(minWidth, Width);
                minHeight = Dialog.minHeight = Math.max(minHeight, Height) - DecorationHeight;
                delete Dialog.dontShrink;
            }
            Dialog.Width = Width;
            Dialog.Height = Height - DecorationHeight;
        }
        /**** prepare dragging ****/
        const DragInfo = useRef({ Mode: undefined, x: 0, y: 0, Width: 0, Height: 0 });
        // for dragging and resizing
        const startDialogDragging = (isDraggable
            ? useDragging({
                ViewRef: DialogRef, onlyFrom: '.title', neverFrom: '.close-button',
                onDragStart: (dx, dy, x, y, Event) => DragInfo.current = { x: Dialog.OffsetX, y: Dialog.OffsetY },
                onDragContinuation: (dx, dy, x, y, Event) => moveDialog(dx, dy),
                onDragFinish: (dx, dy, x, y, Event) => moveDialog(dx, dy),
                onDragCancellation: (dx, dy, x, y, Event) => moveDialog(dx, dy),
            })
            : undefined);
        const moveDialog = useCallback((dx, dy) => {
            Dialog.OffsetX = DragInfo.current.x + dx; // constraints will be...
            Dialog.OffsetY = DragInfo.current.y + dy; // ...integrated in main code
            bringDialogToFront(Dialog.Name);
            rerender();
        }, [Dialog, bringDialogToFront, rerender]);
        /**** prepare resizing ****/
        const startDialogResizing = (isResizable
            ? useDragging({
                ViewRef: DialogRef, onlyFrom: '.left-resizer,.middle-resizer,.right-resizer',
                onDragStart: (dx, dy, x, y, Event) => startResizing(Event),
                onDragContinuation: (dx, dy, x, y, Event) => resizeDialog(dx, dy),
                onDragFinish: (dx, dy, x, y, Event) => resizeDialog(dx, dy),
                onDragCancellation: (dx, dy, x, y, Event) => resizeDialog(dx, dy),
            })
            : undefined);
        const startResizing = useCallback((Event) => {
            let ResizeMode;
            const ClassList = Event.target.classList;
            switch (true) {
                case ClassList.contains('left-resizer'):
                    ResizeMode = 'resize-sw';
                    break;
                case ClassList.contains('middle-resizer'):
                    ResizeMode = 'resize-s';
                    break;
                case ClassList.contains('right-resizer'):
                    ResizeMode = 'resize-se';
                    break;
            }
            DragInfo.current = {
                Mode: ResizeMode,
                x: Dialog.OffsetX, Width: Dialog.Width,
                y: Dialog.OffsetY, Height: Dialog.Height,
            };
        }, [Dialog]);
        const resizeDialog = useCallback((dx, dy) => {
            const { minWidth, maxWidth, minHeight, maxHeight } = Dialog;
            let newWidth = DragInfo.current.Width;
            switch (DragInfo.current.Mode) {
                case 'resize-sw':
                    newWidth = Math.max(minWidth !== null && minWidth !== void 0 ? minWidth : 0, Math.min(newWidth - dx, maxWidth !== null && maxWidth !== void 0 ? maxWidth : Infinity));
                    dx = newWidth - DragInfo.current.Width;
                    Dialog.OffsetX = DragInfo.current.x - dx;
                    Dialog.Width = DragInfo.current.Width + dx;
                    break;
                case 'resize-se':
                    Dialog.Width = Math.max(minWidth !== null && minWidth !== void 0 ? minWidth : 0, Math.min(DragInfo.current.Width + dx, maxWidth !== null && maxWidth !== void 0 ? maxWidth : Infinity));
            }
            Dialog.Height = Math.max(minHeight !== null && minHeight !== void 0 ? minHeight : 0, Math.min(DragInfo.current.Height + dy, maxHeight !== null && maxHeight !== void 0 ? maxHeight : Infinity));
            bringDialogToFront(Dialog.Name);
            rerender();
        }, [Dialog, bringDialogToFront, rerender]);
        /**** ...then render the dialog ****/
        const DialogRenderer = useCallback(() => executedCallback(`"Renderer" callback of dialog ${Dialog.Name}`, Dialog[$Renderer], Dialog.Name, Object.assign({}, Dialog)), [Dialog]);
        return createPortal(html `
       <${SIM_RenderingContext.Provider} value=${Object.assign(Object.assign({}, RenderingContext), { DialogName: Dialog.Name })}>
        <div class="sim-dialog-view ${resizable} ${draggable} ${inDesigner ? 'in-designer' : ''}"
          key="dialog:${Name}" name=${Name} ref=${DialogRef} style="
            visibility:${DialogRef == null ? 'hidden' : 'visible'};
            left:${x}px; top:${y}px;
            width: ${Width == null ? 'auto' : `${Width}px`};
            height:${Height == null ? 'auto' : `${Height}px`};
            min-width:${minWidth}px; min-height:${minHeight}px;
            max-width: ${maxWidth == null ? 'auto' : `${maxWidth}px`};
            max-height:${maxHeight == null ? 'auto' : `${maxHeight}px`};
          " onPointerDown=${() => bringDialogToFront(Name)}
        >
          ${withTitlebar
            ? html `<div class="titlebar" onPointerDown=${startDialogDragging}>
                <div class="title">${Title !== null && Title !== void 0 ? Title : ''}</>
                ${hasCloseButton ? html `<div class="close-button" onClick=${() => closeDialog(Dialog.Name)}/>` : ''}
              </>`
            : ''}
          <div class="content-pane">
            <${DialogRenderer}/>
          </>
          ${isResizable
            ? html `<div class="resizer">
                <div class="left-resizer"   onPointerDown=${startDialogResizing}/>
                <div class="middle-resizer" onPointerDown=${startDialogResizing}/>
                <div class="right-resizer"  onPointerDown=${startDialogResizing}/>
              </>`
            : ''}
        </>
       </>
      `, document.body);
    });
}
//------------------------------------------------------------------------------
//--                              SIM_ModalLayer                              --
//------------------------------------------------------------------------------
const SIM_ModalLayer_EventTypes = [
    'click', 'dblclick',
    'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout',
    'mouseenter', 'mouseleave',
    'touchstart', 'touchend', 'touchmove', 'touchcancel',
    'pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout',
    'pointerenter', 'pointerleave', 'pointercancel',
    'keydown', 'keyup', 'keypress',
    'wheel', 'contextmenu', 'focus', 'blur'
];
function SIM_ModalLayer(PropSet) {
    return safelyRendered(() => {
        const ModalLayerRef = useRef();
        const RenderingContext = useRenderingContext(); // also enforces rendering
        const inDesigner = RenderingContext.inDesigner;
        useEffect(() => {
            const View = ModalLayerRef.current;
            SIM_ModalLayer_EventTypes.forEach((EventType) => {
                View.addEventListener(EventType, consumeEvent);
            });
            return () => {
                SIM_ModalLayer_EventTypes.forEach((EventType) => {
                    View.removeEventListener(EventType, consumeEvent);
                });
            };
        }, []); // to be run after mount and before unmount
        return createPortal(html `<div class="sim-modal-layer ${inDesigner ? 'in-designer' : ''}"
        ref=${ModalLayerRef}
      />`, document.body);
    });
}
//------------------------------------------------------------------------------
//--                              Proxy Support                               --
//------------------------------------------------------------------------------
const $isProxy = Symbol('isProxy');
/**** ProxyForProject ****/
function ProxyForProject(Project) {
    return new Proxy(Project, ProjectHandler(Project));
}
/**** ProjectHandler ****/
function ProjectHandler(Project) {
    return {
        get(Target, Property, Receiver) {
            var _a;
            switch (true) {
                case (Property === $isProxy):
                    return true;
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a project');
                case (Property === 'own'):
                    return ((Target.own == null) || (Target.own[$isProxy] == null)
                        ? Target.own = ProxyForMyOwn((_a = Target.own) !== null && _a !== void 0 ? _a : {}, Project)
                        : Target.own);
                case (Property === 'volatile'):
                    return (Target[$volatile] == null ? Target[$volatile] = {} : Target[$volatile]);
            }
            return CopyOf(Reflect.get(Target, Property, Receiver));
        },
        set(Target, Property, Value, Receiver) {
            switch (true) {
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a project');
                case (Property === 'own'):
                case (Property === 'volatile'): throwError('InvalidOperation: do not set "own" or "volatile" themselves, only their contents');
            }
            _configureProject(Target, { [Property]: Value });
            return true;
        },
        has(Target, Property) {
            if (typeof Property === 'symbol') {
                return false;
            }
            return Reflect.has(Target, Property);
        },
        deleteProperty(Target, Property) {
            switch (true) {
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a project');
                case (Property === 'own'):
                case (Property === 'volatile'): throwError('InvalidOperation: do not delete "own" or "volatile" themselves, only their contents');
            }
            return Reflect.deleteProperty(Target, Property);
        },
        ownKeys(Target) {
            return Reflect.ownKeys(Target);
        },
        getOwnPropertyDescriptor(Target, Property) {
            if (typeof Property === 'symbol') {
                return undefined;
            }
            return Reflect.getOwnPropertyDescriptor(Target, Property);
        },
        defineProperty(Target, Property, Descriptor) {
            switch (true) {
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a project');
                case (Property === 'own'):
                case (Property === 'volatile'): throwError('InvalidOperation: do not define "own" or "volatile" themselves, only their contents');
            }
            return Reflect.defineProperty(Target, Property, Descriptor);
        },
    };
}
/**** ProxyForBoard ****/
function ProxyForBoard(Board) {
    return new Proxy(Board, BoardHandler(Board));
}
/**** BoardHandler ****/
function BoardHandler(Board) {
    return {
        get(Target, Property, Receiver) {
            var _a;
            switch (true) {
                case (Property === $isProxy):
                    return true;
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a board');
                case (Property === 'own'):
                    return ((Target.own == null) || (Target.own[$isProxy] == null)
                        ? Target.own = ProxyForMyOwn((_a = Target.own) !== null && _a !== void 0 ? _a : {}, ProjectOfBoard(Board))
                        : Target.own);
                case (Property === 'volatile'):
                    return (Target[$volatile] == null ? Target[$volatile] = {} : Target[$volatile]);
            }
            return CopyOf(Reflect.get(Target, Property, Receiver));
        },
        set(Target, Property, Value, Receiver) {
            switch (true) {
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a board');
                case (Property === 'own'):
                case (Property === 'volatile'): throwError('InvalidOperation: do not set "own" or "volatile" themselves, only their contents');
            }
            _configureBoard(Target, { [Property]: Value });
            return true;
        },
        has(Target, Property) {
            if (typeof Property === 'symbol') {
                return false;
            }
            return Reflect.has(Target, Property);
        },
        deleteProperty(Target, Property) {
            switch (true) {
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a board');
                case (Property === 'own'):
                case (Property === 'volatile'): throwError('InvalidOperation: do not delete "own" or "volatile" themselves, only their contents');
            }
            return Reflect.deleteProperty(Target, Property);
        },
        ownKeys(Target) {
            return Reflect.ownKeys(Target);
        },
        getOwnPropertyDescriptor(Target, Property) {
            if (typeof Property === 'symbol') {
                return undefined;
            }
            return Reflect.getOwnPropertyDescriptor(Target, Property);
        },
        defineProperty(Target, Property, Descriptor) {
            switch (true) {
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a board');
                case (Property === 'own'):
                case (Property === 'volatile'): throwError('InvalidOperation: do not define "own" or "volatile" themselves, only their contents');
            }
            return Reflect.defineProperty(Target, Property, Descriptor);
        },
    };
}
/**** ProxyForSticker ****/
function ProxyForSticker(Sticker) {
    return new Proxy(Sticker, StickerHandler(Sticker));
}
/**** StickerHandler ****/
function StickerHandler(Sticker) {
    return {
        get(Target, Property, Receiver) {
            var _a;
            switch (true) {
                case (Property === $isProxy):
                    return true;
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a sticker');
                case (Property === 'own'):
                    return ((Target.own == null) || (Target.own[$isProxy] == null)
                        ? Target.own = ProxyForMyOwn((_a = Target.own) !== null && _a !== void 0 ? _a : {}, ProjectOfSticker(Sticker))
                        : Target.own);
                case (Property === 'volatile'):
                    return (Target[$volatile] == null ? Target[$volatile] = {} : Target[$volatile]);
            }
            return CopyOf(Reflect.get(Target, Property, Receiver));
        },
        set(Target, Property, Value, Receiver) {
            switch (true) {
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a sticker');
                case (Property === 'own'):
                case (Property === 'volatile'): throwError('InvalidOperation: do not set "own" or "volatile" themselves, only their contents');
            }
            _configureSticker(Target, { [Property]: Value });
            return true;
        },
        has(Target, Property) {
            if (typeof Property === 'symbol') {
                return false;
            }
            return Reflect.has(Target, Property);
        },
        deleteProperty(Target, Property) {
            switch (true) {
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a sticker');
                case (Property === 'own'):
                case (Property === 'volatile'): throwError('InvalidOperation: do not delete "own" or "volatile" themselves, only their contents');
            }
            return Reflect.deleteProperty(Target, Property);
        },
        ownKeys(Target) {
            return Reflect.ownKeys(Target);
        },
        getOwnPropertyDescriptor(Target, Property) {
            if (typeof Property === 'symbol') {
                return undefined;
            }
            return Reflect.getOwnPropertyDescriptor(Target, Property);
        },
        defineProperty(Target, Property, Descriptor) {
            switch (true) {
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of a sticker');
                case (Property === 'own'):
                case (Property === 'volatile'): throwError('InvalidOperation: do not define "own" or "volatile" themselves, only their contents');
            }
            return Reflect.defineProperty(Target, Property, Descriptor);
        },
    };
}
/**** ProxyForMyOwn ****/
function ProxyForMyOwn(Target, Project) {
    return new Proxy(Target, IndexableHandler(Project));
}
/**** IndexableHandler ****/
function IndexableHandler(Project) {
    return {
        get(Target, Property, Receiver) {
            switch (true) {
                case (Property === $isProxy):
                    return true;
                case (typeof Property === 'symbol'): throwError('InvalidArgument: symbols must not be used to access the properties of "my.own"');
            }
            return Reflect.get(Target, Property, Receiver);
        },
        set(Target, Property, Value, Receiver) {
            if (typeof Property === 'symbol')
                throwError('InvalidArgument: symbols must not be used to access the properties of "my.own"');
            const Success = Reflect.set(Target, Property, Value, Receiver);
            Project[$rerender]();
            return Success;
        },
        has(Target, Property) {
            if (typeof Property === 'symbol') {
                return false;
            }
            return Reflect.has(Target, Property);
        },
        deleteProperty(Target, Property) {
            if (typeof Property === 'symbol')
                throwError('InvalidArgument: symbols must not be used to access the properties of "my.own"');
            const Success = Reflect.deleteProperty(Target, Property);
            Project[$rerender]();
            return Success;
        },
        ownKeys(Target) {
            return Reflect.ownKeys(Target);
        },
        getOwnPropertyDescriptor(Target, Property) {
            if (typeof Property === 'symbol') {
                return undefined;
            }
            return Reflect.getOwnPropertyDescriptor(Target, Property);
        },
        defineProperty(Target, Property, Descriptor) {
            if (typeof Property === 'symbol')
                throwError('InvalidArgument: symbols must not be used to access the properties of "my.own"');
            const Success = Reflect.defineProperty(Target, Property, Descriptor);
            Project[$rerender]();
            return Success;
        },
    };
}
//------------------------------------------------------------------------------
//--                              contextual API                              --
//------------------------------------------------------------------------------
export function contextualAPI() {
    var _a, _b;
    const { ProjectState, activateBoard: _activateBoard } = useSystemContext();
    const { Project: curProject, Board: curBoard, Sticker: curSticker, activeBoardRoute, curBoardRoute, curStickerRoute, DialogName, OverlayName, inDesigner, } = useRenderingContext(); // also enforces rendering
    const curVisual = (_a = curSticker !== null && curSticker !== void 0 ? curSticker : curBoard) !== null && _a !== void 0 ? _a : curProject;
    /**** determine curBoardBase and curStateBase ****/
    const curBoardBase = (curBoard == null ? curProject : BoardBaseOfBoard(curBoard));
    const curStateBase = (curBoard == null ? [] : StateBaseOfBoard(curBoard));
    /**** Configuration - including any functions! ****/
    function Configuration(withContents = false) {
        expectBoolean('contents flag', withContents);
        switch (TypeOfVisual(curVisual)) {
            case 'project': return _ConfigurationOfProject(curProject, withContents);
            case 'board': return _ConfigurationOfBoard(curBoard, withContents);
            default: // just to satisfy the compiler
            case 'sticker': return _ConfigurationOfSticker(curSticker, withContents);
        }
    }
    /**** configure ****/
    function configure(Configuration) {
        expectPlainObject('configuration set', Configuration);
        if (('x' in Configuration) || ('Width' in Configuration) ||
            ('y' in Configuration) || ('Height' in Configuration) ||
            ('Anchors' in Configuration) || ('Offsets' in Configuration)) {
            if (TypeOfVisual(curVisual) === 'sticker') {
                throwError('InvalidArgument: the geometry of a sticker cannot be changed ' +
                    'through its configuration, please use "changeGeometry" for ' +
                    'that purpose');
            }
            else {
                throwError('InvalidArgument: the geometry of a project or board cannot be ' +
                    'changed from within a script, please use the SIM Designer for ' +
                    'that purpose');
            }
        }
        switch (TypeOfVisual(curVisual)) {
            case 'project':
                _configureProject(curProject, Configuration);
                break;
            case 'board':
                _configureBoard(curBoard, Configuration);
                break;
            case 'sticker':
                _configureSticker(curSticker, Configuration);
                break;
        }
    }
    /**** ConfigurationOfBoard ****/
    function ConfigurationOfBoard(BoardLocator, withContents = false) {
        expectBoolean('contents flag', withContents);
        const curBoard = existingBoardIn(BoardLocator, curBoardBase);
        return _ConfigurationOfBoard(curBoard, withContents);
    }
    /**** configureBoard ****/
    function configureBoard(BoardLocator, Configuration) {
        expectPlainObject('configuration set', Configuration);
        const curBoard = existingBoardIn(BoardLocator, curBoardBase);
        _configureBoard(curBoard, Configuration);
    }
    /**** ConfigurationOfSticker ****/
    function ConfigurationOfSticker(StickerLocator, withContents = false) {
        expectBoolean('contents flag', withContents);
        const curSticker = existingStickerIn(StickerLocator, curVisual);
        return _ConfigurationOfSticker(curSticker, withContents);
    }
    /**** configureSticker ****/
    function configureSticker(StickerLocator, Configuration) {
        expectPlainObject('configuration set', Configuration);
        const curSticker = existingStickerIn(StickerLocator, curVisual);
        _configureSticker(curSticker, Configuration);
    }
    /**** Board ****/
    function Board(BoardLocator) {
        const curBoard = existingBoardIn(BoardLocator, curBoardBase);
        return ProxyForBoard(curBoard);
    }
    /**** Sticker ****/
    function Sticker(StickerLocator) {
        const curSticker = existingStickerIn(StickerLocator, curVisual);
        return ProxyForSticker(curSticker);
    }
    /**** BoardSticker ****/
    function BoardSticker(BoardLocator, StickerLocator) {
        const curBoard = existingBoardIn(BoardLocator, curBoardBase);
        const curSticker = existingStickerIn(StickerLocator, curBoard);
        return ProxyForSticker(curSticker);
    }
    /**** externalState ****/
    const externalState = externalStateAt(curStateBase); // may be undefined!
    /**** externalStateAt ****/
    function externalStateAt(StateBase) {
        let Base = ProjectState;
        for (let i = 0, l = StateBase.length; i < l; i++) {
            let nextBase = Base[StateBase[i]];
            if (nextBase == null) {
                nextBase = Base[StateBase[i]] = {};
            }
            else {
                expectPlainObject('state base', nextBase);
            }
            Base = nextBase;
        }
        return Base;
    }
    /**** activeBoard ****/
    let activeBoard = PathOfBoard(curBoard !== null && curBoard !== void 0 ? curBoard : existingBoardIn(activeBoardRoute, curProject));
    if (TypeOfVisual(curBoardBase) === 'board') {
        activeBoard = activeBoard.slice(PathOfBoard(curBoardBase));
    }
    /**** activateBoard ****/
    function activateBoard(BoardLocator) {
        expectLocator('board name, path, index or route', BoardLocator);
        const BoardToActivate = existingBoardIn(BoardLocator, curBoardBase);
        _activateBoard(BoardToActivate);
    }
    /**** Geometry ****/
    function Geometry() {
        if (TypeOfVisual(curVisual) !== 'sticker')
            throwError('InvalidOperation: only stickers are allowed to change their geometry');
        return GeometryOfSticker(curVisual);
    }
    /**** changeGeometry ****/
    function changeGeometry(x, y, Width, Height) {
        allowLocation('new x coordinate', x);
        allowLocation('new y coordinate', y);
        allowDimension('new width', Width);
        allowDimension('new height', Height);
        if (TypeOfVisual(curVisual) !== 'sticker')
            throwError('InvalidOperation: only stickers are allowed to change their geometry');
        changeGeometryOfSticker(curVisual, { x, y, Width, Height });
    }
    /**** rerender ****/
    function rerender(Scope) {
        allowOneOf('rendering scope', Scope, SIM_VisualTypes);
        curProject[$rerender](); // *C* respect scope
    }
    /**** rerenderProject ****/
    function rerenderProject(Project) {
        curProject[$rerender](Project);
    }
    /**** _preserveProject ****/
    function _preserveProject() {
        preserveProject(curProject);
    }
    /**** openOverlay ****/
    function openOverlay(Descriptor) {
        expectPlainObject('overlay descriptor', Descriptor);
        Descriptor = Object.assign({}, Descriptor);
        Object.keys(Descriptor).forEach((Key) => {
            if (Descriptor[Key] === undefined) {
                delete Descriptor[Key];
            }
        }); // "null" values are kept,"undefined" ones deleted
        validateOverlayDescriptor(Descriptor);
        let { Name, isModal, Content, onOpen, onClose, OffsetX, OffsetY, Width, Height, minWidth, minHeight, maxWidth, maxHeight, } = Descriptor;
        const normalizedName = _normalizedName(Name);
        if (OverlayIsOpen(Name))
            throwError(// *C* should be based on oldState in changeState
            'OverlayAlreadyOpen: this sticker already has an overlay called ' +
                quoted(Name));
        if (curSticker == null)
            throwError('InvalidOperation: only stickers may open an overlay');
        /**** "Content" may be an overlay sticker or a rendering function ****/
        // @ts-ignore TS2322 "ContentSticker" will be defined later
        let Renderer, ContentSticker = undefined;
        if (ValueIsFunction(Content)) {
            Renderer = Content;
        }
        else {
            if (!ValueIsBoardStickerLocator(Content))
                throwError('InvalidArgument: the given "Content" is neither a renderer nor ' +
                    'the path to a sticker');
            const [BoardLocator, StickerLocator] = Content;
            const ContentBoard = existingBoardIn(BoardLocator, curBoardBase);
            ContentSticker = existingStickerIn(StickerLocator, ContentBoard);
            switch (true) {
                case ContentSticker.Variant !== 'sim/special/overlay':
                    throwError('InvalidArgument:the given sticker is not an "overlay sticker"');
                case ContentSticker[$Delegate] != null:
                    throwError('AlreadyInUse: the given overlay sticker is already in use');
                case ContentSticker === curSticker:
                    throwError('InvalidArgument:a sticker cannot open itself as an overlay');
                case StickerContainsSticker(curSticker, ContentSticker):
                    throwError('InvalidArgument:a sticker cannot open an inner sticker as an overlay');
                case StickerContainsSticker(ContentSticker, curSticker):
                    throwError('InvalidArgument:a sticker cannot open an outer sticker as an overlay');
            }
            const BoardRoute = RouteToBoard(ContentBoard);
            const StickerRoute = RouteToSticker(ContentSticker);
            Renderer = (PropSet) => {
                return html `<${SIM_delegatedStickerView} BoardRoute=${BoardRoute} StickerRoute=${StickerRoute} Sticker=${ContentSticker}/>`;
            };
            if (Width == null) {
                Width = WidthOfSticker(ContentSticker);
            }
            if (Height == null) {
                Height = HeightOfSticker(ContentSticker);
            }
        }
        /**** now actually "open" the overlay ****/
        if (curSticker[$OverlayList] == null) {
            curSticker[$OverlayList] = [];
        }
        if (ContentSticker != null) {
            ContentSticker[$Delegate] = curSticker;
        }
        // @ts-ignore TS2532 no, "curSticker[$OverlayList]" is not undefined
        curSticker[$OverlayList].push({
            Name, [$normalizedName]: normalizedName, isModal: isModal !== null && isModal !== void 0 ? isModal : false,
            Content, onOpen, onClose,
            OffsetX: OffsetX !== null && OffsetX !== void 0 ? OffsetX : 0, OffsetY: OffsetY !== null && OffsetY !== void 0 ? OffsetY : 0, Width, Height,
            minWidth: minWidth !== null && minWidth !== void 0 ? minWidth : 0, minHeight: minHeight !== null && minHeight !== void 0 ? minHeight : 0, maxWidth, maxHeight,
            [$Base]: curSticker, [$ContentSticker]: ContentSticker, [$Renderer]: Renderer,
        });
        rerender();
    }
    /**** openOverlayAtPointer ****/
    function openOverlayAtPointer(Descriptor, Event) {
        expectPlainObject('overlay descriptor', Descriptor);
        expectInstanceOf('pointer event', Event, PointerEvent);
        const Overlayable = Event.target.closest('.sim-sticker');
        if (Overlayable != null) {
            const Box = Overlayable.getBoundingClientRect();
            let OffsetX = Event.clientX - Box.left + Overlayable.scrollLeft;
            let OffsetY = Event.clientY - Box.top + Overlayable.scrollTop;
            Descriptor = Object.assign(Object.assign({}, Descriptor), { OffsetX, OffsetY });
        }
        openOverlay(Descriptor);
    }
    /**** closeOverlay ****/
    function closeOverlay(Name) {
        expectName('overlay name', Name);
        const normalizedName = _normalizedName(Name);
        if (curSticker == null)
            throwError('InvalidOperation: only stickers may manage overlays');
        const OverlayList = curSticker[$OverlayList];
        if ((OverlayList == null) || (OverlayList.length === 0)) {
            return;
        }
        const OverlayIndex = OverlayList.findIndex((Overlay) => (Overlay[$normalizedName] === normalizedName));
        if (OverlayIndex < 0) {
            return;
        } // i.e., nothing changed
        curSticker[$OverlayList] = OverlayList.filter((_, Index) => (Index !== OverlayIndex));
        rerender();
    }
    /**** closeAllOverlays ****/
    function closeAllOverlays() {
        if (curSticker == null)
            throwError('InvalidOperation: only stickers may manage overlays');
        const OverlayList = curSticker[$OverlayList];
        if ((OverlayList == null) || (OverlayList.length === 0)) {
            return;
        }
        delete curSticker[$OverlayList];
        rerender();
    }
    /**** openOverlays ****/
    const openOverlays = (curSticker == null
        ? []
        : ((_b = curSticker[$OverlayList]) !== null && _b !== void 0 ? _b : []).map((Overlay) => Overlay.Name));
    /**** OverlayIsOpen ****/
    function OverlayIsOpen(Name) {
        expectName('overlay name', Name);
        const normalizedName = _normalizedName(Name);
        if (curSticker == null)
            throwError('InvalidOperation: only stickers may manage overlays');
        return (openOverlays.findIndex((Name) => (_normalizedName(Name) === normalizedName)) >= 0);
    }
    const $Dialogs = (inDesigner ? $DesignerDialogs : $DialogList);
    /**** openDialog ****/
    function openDialog(Descriptor) {
        expectPlainObject('dialog descriptor', Descriptor);
        Descriptor = Object.assign({}, Descriptor);
        Object.keys(Descriptor).forEach((Key) => {
            if (Descriptor[Key] === undefined) {
                delete Descriptor[Key];
            }
        }); // "null" values are kept,"undefined" ones deleted
        validateDialogDescriptor(Descriptor);
        let { Name, Title, hasCloseButton, isModal, isResizable, isDraggable, Content, onOpen, onClose, OffsetX, OffsetY, Width, Height, minWidth, minHeight, maxWidth, maxHeight, dontShrink, } = Descriptor;
        const normalizedName = _normalizedName(Name);
        if (DialogIsOpen(Name))
            throwError(// *C* should be based on oldState in changeState
            'DialogAlreadyOpen: a dialog called ' + quoted(Name) + ' is already open');
        /**** "Content" may be a dialog sticker or a rendering function ****/
        // @ts-ignore TS2322 "ContentSticker" will be defined later
        let Renderer, ContentSticker = undefined;
        if (ValueIsFunction(Content)) {
            Renderer = Content;
        }
        else {
            if (!ValueIsBoardStickerLocator(Content))
                throwError('InvalidArgument: the given "Content" is neither a renderer nor ' +
                    'the path to a sticker');
            const [BoardLocator, StickerLocator] = Content;
            const ContentBoard = existingBoardIn(BoardLocator, curBoardBase);
            ContentSticker = existingStickerIn(StickerLocator, ContentBoard);
            switch (true) {
                case ContentSticker.Variant !== 'sim/special/dialog':
                    throwError('InvalidArgument:the given sticker is not a "dialog sticker"');
                case ContentSticker[$Delegate] != null:
                    throwError('AlreadyInUse: the given dialog sticker is already in use');
            }
            const BoardRoute = RouteToBoard(ContentBoard);
            const StickerRoute = RouteToSticker(ContentSticker);
            Renderer = (PropSet) => {
                return html `<${SIM_delegatedStickerView} BoardRoute=${BoardRoute} StickerRoute=${StickerRoute} Sticker=${ContentSticker}/>`;
            };
            if (Width == null) {
                Width = WidthOfSticker(ContentSticker);
            }
            if (Height == null) {
                Height = HeightOfSticker(ContentSticker);
            }
        }
        /**** now actually "open" the dialog ****/
        if (ContentSticker != null) {
            ContentSticker[$Delegate] = curSticker;
        }
        curProject[$Dialogs].push({
            Name, [$normalizedName]: normalizedName, Title, hasCloseButton: hasCloseButton !== null && hasCloseButton !== void 0 ? hasCloseButton : true,
            isModal: isModal !== null && isModal !== void 0 ? isModal : false, isResizable: isResizable !== null && isResizable !== void 0 ? isResizable : false,
            isDraggable: isDraggable !== null && isDraggable !== void 0 ? isDraggable : ((Title != null) || (hasCloseButton == true)),
            Content, onOpen, onClose,
            OffsetX, OffsetY, Width, Height, minWidth, minHeight, maxWidth, maxHeight,
            dontShrink: dontShrink !== null && dontShrink !== void 0 ? dontShrink : true,
            [$Base]: curVisual, [$ContentSticker]: ContentSticker, [$Renderer]: Renderer,
        });
        rerender();
    }
    /**** closeDialog ****/
    function closeDialog(Name) {
        expectName('dialog name', Name);
        const normalizedName = _normalizedName(Name);
        const DialogIndex = curProject[$Dialogs].findIndex((Dialog) => (Dialog[$normalizedName] === normalizedName));
        if (DialogIndex < 0) {
            return;
        } // i.e., nothing changed
        curProject[$Dialogs] = curProject[$Dialogs].filter((_, Index) => (Index !== DialogIndex));
        rerender();
    }
    /**** closeAllDialogs ****/
    function closeAllDialogs() {
        if (curProject[$Dialogs].length === 0) {
            return;
        }
        curProject[$Dialogs] = [];
        rerender();
    }
    /**** openDialogs ****/
    const openDialogs = curProject[$Dialogs].map((Dialog) => Dialog.Name);
    /**** DialogIsOpen ****/
    function DialogIsOpen(Name) {
        expectName('dialog name', Name);
        const normalizedName = _normalizedName(Name);
        return (curProject[$Dialogs].findIndex((Dialog) => (Dialog[$normalizedName] === normalizedName)) >= 0);
    }
    /**** DialogIsFrontmost ****/
    function DialogIsFrontmost(Name) {
        var _a;
        expectName('dialog name', Name);
        const normalizedName = _normalizedName(Name);
        const DialogList = curProject[$Dialogs];
        return (((_a = DialogList[DialogList.length - 1]) === null || _a === void 0 ? void 0 : _a[$normalizedName]) === normalizedName);
    }
    /**** bringDialogToFront ****/
    function bringDialogToFront(Name) {
        expectName('dialog name', Name);
        const normalizedName = _normalizedName(Name);
        let DialogList = curProject[$Dialogs];
        const DialogIndex = DialogList.findIndex((Dialog) => (Dialog[$normalizedName] === normalizedName));
        if ((DialogIndex < 0) || (DialogIndex === DialogIndex.length - 1)) {
            return; // i.e., nothing changed
        }
        curProject[$Dialogs] = [
            ...DialogList.filter((_, Index) => Index !== DialogIndex),
            DialogList[DialogIndex]
        ];
        //    rerender()               // do not rerender self, let actual handler do it
    }
    /**** return actual contextual API ****/
    const commonAPI = {
        Configuration, configure,
        activeBoard, activateBoard,
        rerender,
        preserveProject: _preserveProject,
        inOverlay: OverlayName != null,
        openOverlay, openOverlayAtPointer, closeOverlay, closeAllOverlays,
        openOverlays, OverlayIsOpen,
        inDialog: DialogName != null,
        openDialog, closeDialog, closeAllDialogs,
        openDialogs, DialogIsOpen,
        DialogIsFrontmost, bringDialogToFront,
    };
    let me;
    switch (TypeOfVisual(curVisual)) {
        case 'project':
            me = ProxyForProject(curProject);
            return Object.assign(Object.assign({ externalState,
                me, my: me, Board, BoardSticker,
                ConfigurationOfBoard, configureBoard }, commonAPI), (inDesigner && { rerenderProject }));
        case 'board':
            me = ProxyForBoard(curBoard);
            return Object.assign({ externalState,
                me, my: me, Board, BoardSticker, Sticker,
                ConfigurationOfBoard, configureBoard,
                ConfigurationOfSticker, configureSticker }, commonAPI);
        default: // just to satisfy the compiler
        case 'sticker':
            me = ProxyForSticker(curSticker);
            return Object.assign({ Geometry, changeGeometry,
                me, my: me, Sticker,
                ConfigurationOfSticker, configureSticker }, commonAPI);
    }
}
/**** automatic ****/
function automatic(Component) {
    return (PropSet) => {
        const { onValueInput, autoConfigureInput, autoPreserveProject } = PropSet, otherProps = __rest(PropSet, ["onValueInput", "autoConfigureInput", "autoPreserveProject"]);
        const { configure, rerender, preserveProject } = contextualAPI();
        /**** automatically configure sticker and preserve project, if wanted ****/
        const _onValueInput = useCallback((Value, Event) => {
            if (autoConfigureInput == true) {
                configure({ Value });
                rerender();
                if (autoPreserveProject == true) {
                    preserveProject();
                }
            }
            executeCallback('callback "onValueInput"', onValueInput, Value, Event);
        }, [autoConfigureInput, autoPreserveProject, onValueInput]);
        /**** actual component ****/
        return Component(Object.assign({ onValueInput: _onValueInput }, otherProps));
    };
}
//------------------------------------------------------------------------------
//--                            intrinsic Stickers                            --
//------------------------------------------------------------------------------
/**** custom (just to block a slot in the sticker variant registry) ****/
_registerVariant('SIM/special/custom', function Compound(PropSet) {
    let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
    return html `<div class="sim-component custom ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
}, undefined, [], { Offsets: [10, 100, 10, 100] });
/**** Compound ****/
_registerVariant('SIM/special/Compound', function Compound(PropSet) {
    let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
    return html `<div class="sim-component compound ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
}, undefined, [], { Offsets: [10, 100, 10, 100] });
/**** Placeholder ****/
_registerVariant('SIM/special/Placeholder', function Placeholder(PropSet) {
    let [Classes, BoardPath, StickerPath, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalPath('board'), optionalPath('sticker'));
    /**** which sticker should be rendered here? ****/
    const { curBoardBase, curBoard, curSticker } = useRenderingContext();
    const ContentBoard = existingBoardIn(BoardPath, curBoardBase);
    const ContentSticker = existingStickerIn(StickerPath, ContentBoard);
    const BoardRoute = RouteToBoard(ContentBoard);
    const StickerRoute = RouteToSticker(ContentSticker);
    switch (true) {
        case (ContentSticker.Variant !== 'sim/special/content'):
            throwError('InvalidArgument:the given sticker is not a "content sticker"');
        case (ContentSticker[$Delegate] != null) && (ContentSticker[$Delegate] !== curSticker):
            throwError('AlreadyInUse: the given overlay sticker is already in use');
        case ContentSticker === curSticker:
            throwError('InvalidArgument:a sticker cannot open itself as an overlay');
        case StickerContainsSticker(ContentSticker, curSticker):
            throwError('InvalidArgument:a placeholder cannot be part of its own content');
    }
    ContentSticker[$Delegate] = curSticker;
    useEffect(() => {
        return () => {
            if (ContentSticker[$Delegate] === curSticker) {
                delete ContentSticker[$Delegate]; // not a real state change...
            } // ...but sufficient for the moment
        };
    }, []);
    return html `<${SIM_delegatedStickerView} BoardRoute=${BoardRoute} StickerRoute=${StickerRoute} Sticker=${ContentSticker}/>`;
}, `
      .sim-placeholder > .sim-sticker {
        display:block; position:absolute;
        left:0px; top:0px; width:100%; height:100%;
      }
    `, [
    { Name: 'Board', Label: 'Content Board', EditorType: 'textline-input',
        Placeholder: '(path to board)' },
    { Name: 'Sticker', Label: 'Content Sticker', EditorType: 'textline-input',
        Placeholder: '(path to sticker)' },
], { Offsets: [10, 100, 10, 100] });
/**** ContentSticker ****/
_registerVariant('SIM/special/Content', function ContentSticker(PropSet) {
    let [Classes, inUse, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalBoolean('inuse'));
    return html `<div class="sim-component content-sticker ${Classes !== null && Classes !== void 0 ? Classes : ''} ${inUse ? 'in-use' : ''}" ...${RestProps}/>`;
}, `
    .sim-content-sticker.in-use {
      background-image:repeating-linear-gradient(-45deg,
        rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
        rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
      ); background-size:11.31px 11.31px;
    }
    `, [], { Offsets: [10, 100, 10, 100] });
/**** OverlaySticker ****/
_registerVariant('SIM/special/Overlay', function OverlaySticker(PropSet) {
    let [Classes, inUse] = parsedPropSet(PropSet, optionalTextline('class'), optionalBoolean('inuse'));
    return html `<div class="sim-component overlay-sticker ${Classes !== null && Classes !== void 0 ? Classes : ''} ${inUse ? 'in-use' : ''}"/>`;
}, `
    .sim-overlay-sticker.in-use {
      background-image:repeating-linear-gradient(-45deg,
        rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
        rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
      ); background-size:11.31px 11.31px;
    }
    `, [], { Offsets: [10, 100, 10, 100] });
/**** DialogSticker ****/
_registerVariant('SIM/special/Dialog', function DialogSticker(PropSet) {
    let [Classes, inUse] = parsedPropSet(PropSet, optionalTextline('class'), optionalBoolean('inuse'));
    return html `<div class="sim-component dialog-sticker ${Classes !== null && Classes !== void 0 ? Classes : ''} ${inUse ? 'in-use' : ''}"/>`;
}, `
    .sim-dialog-sticker.in-use {
      background-image:repeating-linear-gradient(-45deg,
        rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
        rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
      ); background-size:11.31px 11.31px;
    }
    `, [], { Offsets: [10, 240, 10, 160] });
/**** Template ****/
_registerVariant('SIM/special/Template', function Template(PropSet) {
    let [Classes] = parsedPropSet(PropSet, optionalTextline('class'));
    return html `<div class="sim-component template ${Classes !== null && Classes !== void 0 ? Classes : ''}"/>`;
}, undefined, [], { Offsets: [10, 100, 10, 100] });
/**** SPASticker ****/
_registerVariant('SIM/special/single-page-applet', function SPASticker(PropSet) {
    let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
    return html `<div class="sim-component single-page-applet ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
}, undefined, [
    { Name: 'HeadExtensions', Label: '<head> extensions', EditorType: 'text-input',
        Placeholder: '(optional <head> extensions)' },
], { Offsets: [10, 240, 10, 160] });
/**** AppletSticker ****/
_registerVariant('SIM/special/Applet', function AppletSticker(PropSet) {
    let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
    return html `<div class="sim-component applet-sticker ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
}, undefined, [], { Offsets: [10, 240, 10, 160] });
/**** PageSticker ****/
_registerVariant('SIM/special/Page', function PageSticker(PropSet) {
    let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
    return html `<div class="sim-component page-sticker ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
}, undefined, [], { Offsets: [10, 240, 10, 160] });
/**** Dummy ****/
_registerVariant('SIM/basic/Dummy', sim.Dummy, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input' },
    { Name: 'visiblePattern', Label: 'show Pattern', EditorType: 'checkbox',
        Default: false },
], { Offsets: [10, 100, 10, 100] });
/**** Outline ****/
_registerVariant('SIM/basic/Outline', sim.Outline, undefined, [], { Offsets: [10, 100, 10, 100] });
/**** horizontalSeparator ****/
_registerVariant('SIM/basic/horizontalSeparator', sim.horizontalSeparator, undefined, [], { Offsets: [10, 100, 10, 10] });
/**** verticalSeparator ****/
_registerVariant('SIM/basic/verticalSeparator', sim.verticalSeparator, undefined, [], { Offsets: [10, 10, 10, 100] });
/**** Title ****/
_registerVariant('SIM/basic/Title', sim.Title, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(shown text)' },
], { Value: 'Title', Offsets: [10, 100, 10, 30] });
/**** Subtitle ****/
_registerVariant('SIM/basic/Subtitle', sim.Subtitle, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(shown text)' },
], { Value: 'Subtitle', Offsets: [10, 100, 10, 30] });
/**** Label ****/
_registerVariant('SIM/basic/Label', sim.Label, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(shown text)' },
], { Value: 'Label', Offsets: [10, 100, 10, 30] });
/**** Description ****/
_registerVariant('SIM/basic/Description', sim.Description, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'text-input',
        Placeholder: '(shown Text)', Resizability: 'vertical', LineWrapping: true },
], { Value: 'Description', Offsets: [10, 100, 10, 80] });
/**** Fineprint ****/
_registerVariant('SIM/basic/Fineprint', sim.Fineprint, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'text-input',
        Placeholder: '(shown Text)', Resizability: 'vertical', LineWrapping: true },
], { Value: 'Fineprint', Offsets: [10, 100, 10, 80] });
/**** TextView ****/
_registerVariant('SIM/basic/TextView', sim.TextView, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'text-input',
        Resizability: 'vertical', LineWrapping: true },
], { Offsets: [10, 240, 10, 160] });
/**** HTMLView ****/
_registerVariant('SIM/basic/HTMLView', sim.HTMLView, undefined, [
    { Name: 'Value', Label: 'Value (HTML)', EditorType: 'html-input',
        Resizability: 'vertical', LineWrapping: true },
], { Offsets: [10, 240, 10, 160] });
/**** MarkdownView ****/
_registerVariant('SIM/basic/MarkdownView', sim.MarkdownView, undefined, [
    { Name: 'Value', Label: 'Value (Markdown)', EditorType: 'text-input',
        Resizability: 'vertical', LineWrapping: true },
], { Offsets: [10, 240, 10, 160] });
/**** ImageView ****/
_registerVariant('SIM/basic/ImageView', sim.ImageView, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'url-input',
        Placeholder: '(image URL)' },
    { Name: 'Scaling', Label: 'Image Scaling', EditorType: 'drop-down',
        ValueList: SIM_ImageScalings },
    { Name: 'Alignment', Label: 'Image Alignment', EditorType: 'drop-down',
        ValueList: SIM_ImageAlignments },
], { Offsets: [10, 240, 10, 160] });
/**** SVGView ****/
_registerVariant('SIM/basic/SVGView', sim.SVGView, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'url-input',
        Placeholder: '(image URL)' },
    { Name: 'Scaling', Label: 'Image Scaling', EditorType: 'drop-down',
        ValueList: SIM_ImageScalings },
    { Name: 'Alignment', Label: 'Image Alignment', EditorType: 'drop-down',
        ValueList: SIM_ImageAlignments },
], { Offsets: [10, 240, 10, 160] });
/**** WebView ****/
_registerVariant('SIM/basic/WebView', sim.WebView, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'url-input',
        Placeholder: '(URL)' },
    { Name: 'allow', Label: 'Permissions Policy', EditorType: 'textline-input',
        Placeholder: '(additional restrictions)' },
    { Name: 'allowFullscreen', Label: 'allow Fullscreen', EditorType: 'checkbox',
        Default: false },
    { Name: 'Sandbox', Label: 'Permissions Policy', EditorType: 'textline-input',
        Placeholder: '(additional permissions)' },
    { Name: 'ReferrerPolicy', Label: 'Referrer Policy', EditorType: 'drop-down',
        ValueList: SIM_ReferrerPolicies },
], { Offsets: [10, 240, 10, 160] });
/**** Icon ****/
_registerVariant('SIM/basic/Icon', sim.Icon, `
    .sim-sticker:has(.sim-component.icon) {
      display:flex ! important; flex-flow:column nowrap; align-items:center; justify-content:center;
    }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'url-input',
        Placeholder: '(icon URL)' },
    { Name: 'active', Label: 'is active', EditorType: 'checkbox',
        Default: false },
], { Offsets: [10, 30, 10, 30], Value: `${IconFolder}/circle-information.png` });
/**** FAIcon ****/
_registerVariant('SIM/basic/FAIcon', sim.FAIcon, `
    .sim-sticker:has(.sim-component.fa-icon) {
      display:flex ! important; flex-flow:column nowrap; align-items:center; justify-content:center;
    }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'drop-down',
        ValueList: SIM_FAIconNames },
    { Name: 'active', Label: 'is active', EditorType: 'checkbox',
        Default: false },
], { Offsets: [10, 30, 10, 30], Value: 'fa-info-circle' });
/**** Button ****/
_registerVariant('SIM/native/Button', sim.Button, `
    .sim-sticker:has(.sim-component.button) { padding:1px }
    .sim-sticker > .sim-component.button { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value (HTML)', EditorType: 'textline-input',
        Placeholder: '(button label)' },
], { Offsets: [10, 100, 10, 30], Value: 'Button' });
/**** Checkbox ****/
_registerVariant('SIM/native/Checkbox', automatic(sim.Checkbox), `
    .sim-component.checkbox > input {
      width:auto; height:auto;
      margin-left:1px;
    }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'checkbox',
        Default: false },
], { Offsets: [10, 30, 10, 30] });
/**** Radiobutton ****/
_registerVariant('SIM/native/Radiobutton', automatic(sim.Radiobutton), `
    .sim-component.radiobutton > input {
      width:auto; height:auto;
      margin-left:1px;
    }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'checkbox',
        Default: false },
], { Offsets: [10, 30, 10, 30] });
/**** Gauge ****/
_registerVariant('SIM/native/Gauge', sim.Gauge, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'number-input' },
    { Name: 'Min', Label: 'Minimum', EditorType: 'number-input' },
    { Name: 'Low', Label: 'lower Bound', EditorType: 'number-input' },
    { Name: 'Opt', Label: 'Optimum', EditorType: 'number-input' },
    { Name: 'High', Label: 'upper Bound', EditorType: 'number-input' },
    { Name: 'Max', Label: 'Maximum', EditorType: 'number-input' },
], { Offsets: [10, 100, 10, 30] });
/**** Progressbar ****/
_registerVariant('SIM/native/Progressbar', sim.Progressbar, undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'number-input' },
    { Name: 'Max', Label: 'Maximum', EditorType: 'number-input' },
], { Offsets: [10, 100, 10, 30] });
/**** Slider ****/
_registerVariant('SIM/native/Slider', automatic(sim.Slider), undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'number-input' },
    { Name: 'Min', Label: 'Minimum', EditorType: 'number-input' },
    { Name: 'Step', Label: 'Stepping', EditorType: 'number-input' },
    { Name: 'Max', Label: 'Maximum', EditorType: 'number-input' },
    { Name: 'Hashmarks', Label: 'Hashmarks', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 100, 10, 30] });
/**** TextlineInput ****/
_registerVariant('SIM/native/TextlineInput', automatic(sim.TextlineInput), `
    .sim-sticker:has(.sim-component.textline-input) { padding:1px }
    .sim-sticker > .sim-component.textline-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(current value)' },
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'minLength', Label: 'min. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'maxLength', Label: 'max. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input',
        Placeholder: '(input pattern)' },
    { Name: 'Spellcheck', Label: 'check spelling', EditorType: 'checkbox',
        Default: false },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 100, 10, 30] });
/**** PasswordInput ****/
_registerVariant('SIM/native/PasswordInput', automatic(sim.PasswordInput), `
    .sim-sticker:has(.sim-component.password-input) { padding:1px }
    .sim-sticker > .sim-component.password-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(current password)' },
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'minLength', Label: 'min. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'maxLength', Label: 'max. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input',
        Placeholder: '(input pattern)' },
], { Offsets: [10, 100, 10, 30] });
/**** NumberInput ****/
_registerVariant('SIM/native/NumberInput', automatic(sim.NumberInput), `
    .sim-sticker:has(.sim-component.number-input) { padding:1px }
    .sim-sticker > .sim-component.number-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'number-input' },
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'Min', Label: 'Minimum', EditorType: 'number-input' },
    { Name: 'Step', Label: 'Stepping', EditorType: 'number-input' },
    { Name: 'Max', Label: 'Maximum', EditorType: 'number-input' },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'numberlist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 100, 10, 30] });
/**** EMailAddressInput ****/
_registerVariant('SIM/native/EMailAddressInput', automatic(sim.EMailAddressInput), `
    .sim-sticker:has(.sim-component.emailaddress-input) { padding:1px }
    .sim-sticker > .sim-component.emailaddress-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(current value)' },
    { Name: 'multiple', Label: 'multiple', EditorType: 'checkbox',
        Default: false },
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'minLength', Label: 'min. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'maxLength', Label: 'max. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input',
        Placeholder: '(input pattern)' },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 100, 10, 30] });
/**** PhoneNumberInput ****/
_registerVariant('SIM/native/PhoneNumberInput', automatic(sim.PhoneNumberInput), `
    .sim-sticker:has(.sim-component.phonenumber-input) { padding:1px }
    .sim-sticker > .sim-component.phonenumber-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(current value)' },
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'minLength', Label: 'min. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'maxLength', Label: 'max. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input',
        Placeholder: '(input pattern)' },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 100, 10, 30] });
/**** URLInput ****/
_registerVariant('SIM/native/URLInput', automatic(sim.URLInput), `
    .sim-sticker:has(.sim-component.url-input) { padding:1px }
    .sim-sticker > .sim-component.url-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(current value)' },
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'minLength', Label: 'min. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'maxLength', Label: 'max. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input',
        Placeholder: '(input pattern)' },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 100, 10, 30] });
/**** TimeInput ****/
_registerVariant('SIM/native/TimeInput', automatic(sim.TimeInput), `
    .sim-sticker:has(.sim-component.time-input) { padding:1px }
    .sim-sticker > .sim-component.time-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'time-input' },
    { Name: 'withSeconds', Label: 'with Seconds', EditorType: 'checkbox',
        Default: false },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'Min', Label: 'earliest time', EditorType: 'time-input' },
    { Name: 'Max', Label: 'latest time', EditorType: 'time-input' },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 110, 10, 30] });
/**** DateTimeInput ****/
_registerVariant('SIM/native/DateTimeInput', automatic(sim.DateTimeInput), `
    .sim-sticker:has(.sim-component.datetime-input) { padding:1px }
    .sim-sticker > .sim-component.datetime-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'datetime-input' },
    { Name: 'withSeconds', Label: 'with Seconds', EditorType: 'checkbox',
        Default: false },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'Min', Label: 'earliest timestamp', EditorType: 'datetime-input' },
    { Name: 'Max', Label: 'latest timestamp', EditorType: 'datetime-input' },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 200, 10, 30] });
/**** DateInput ****/
_registerVariant('SIM/native/DateInput', automatic(sim.DateInput), `
    .sim-sticker:has(.sim-component.date-input) { padding:1px }
    .sim-sticker > .sim-component.date-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'date-input' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'Min', Label: 'earliest date', EditorType: 'date-input' },
    { Name: 'Max', Label: 'latest date', EditorType: 'date-input' },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 120, 10, 30] });
/**** WeekInput ****/
_registerVariant('SIM/native/WeekInput', automatic(sim.WeekInput), `
    .sim-sticker:has(.sim-component.week-input) { padding:1px }
    .sim-sticker > .sim-component.week-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'week-input' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'Min', Label: 'earliest week', EditorType: 'week-input' },
    { Name: 'Max', Label: 'latest week', EditorType: 'week-input' },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 150, 10, 30] });
/**** MonthInput ****/
_registerVariant('SIM/native/MonthInput', automatic(sim.MonthInput), `
    .sim-sticker:has(.sim-component.month-input) { padding:1px }
    .sim-sticker > .sim-component.month-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'month-input' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'Min', Label: 'earliest month', EditorType: 'month-input' },
    { Name: 'Max', Label: 'latest month', EditorType: 'month-input' },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 150, 10, 30] });
/**** SearchInput ****/
_registerVariant('SIM/native/SearchInput', automatic(sim.SearchInput), `
    .sim-sticker:has(.sim-component.search-input) { padding:1px }
    .sim-sticker > .sim-component.search-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(current search text)' },
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'minLength', Label: 'min. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'maxLength', Label: 'max. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input',
        Placeholder: '(input pattern)' },
    { Name: 'Spellcheck', Label: 'check spelling', EditorType: 'checkbox',
        Default: false },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 100, 10, 30] });
/**** FileInput ****/
_registerVariant('SIM/native/FileInput', automatic(sim.FileInput), `
    .sim-sticker:has(.sim-component.file-input) { padding:1px }
    .sim-sticker > .sim-component.file-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input',
        Placeholder: '(current file)' },
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'multiple', Label: 'multiple', EditorType: 'checkbox',
        Default: false },
    { Name: 'accept', Label: 'accepted Types', EditorType: 'textline-input' },
], { Offsets: [10, 100, 10, 30] });
/**** PseudoFileInput ****/
_registerVariant('SIM/native/PseudoFileInput', automatic(sim.PseudoFileInput), undefined, [
    { Name: 'Icon', Label: 'Icon', EditorType: 'url-input',
        Placeholder: '(icon URL)' },
    { Name: 'multiple', Label: 'multiple', EditorType: 'checkbox',
        Default: false },
    { Name: 'accept', Label: 'accepted Types', EditorType: 'textline-input' },
], { Offsets: [10, 30, 10, 30] });
/**** ColorInput ****/
_registerVariant('SIM/native/ColorInput', automatic(sim.ColorInput), `
    .sim-sticker:has(.sim-component.color-input) { padding:1px }
    .sim-sticker > .sim-component.color-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'color-input' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 40, 10, 30] });
/**** DropDown ****/
_registerVariant('SIM/native/DropDown', automatic(sim.DropDown), `
    .sim-sticker:has(.sim-component.dropdown) { padding:1px }
    .sim-sticker > .sim-component.dropdown { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input' },
    { Name: 'Options', Label: 'Options', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 100, 10, 30], Options: [] });
/**** PseudoDropDown ****/
_registerVariant('SIM/native/PseudoDropDown', automatic(sim.PseudoDropDown), undefined, [
    { Name: 'Value', Label: 'Value', EditorType: 'textline-input' },
    { Name: 'Icon', Label: 'Icon', EditorType: 'url-input',
        Placeholder: '(icon URL)' },
    { Name: 'multiple', Label: 'multiple', EditorType: 'checkbox',
        Default: false },
    { Name: 'Options', Label: 'Options', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
], { Offsets: [10, 30, 10, 30], Options: [] });
/**** TextInput ****/
_registerVariant('SIM/native/TextInput', automatic(sim.TextInput), `
    .sim-sticker:has(.sim-component.text-input) { padding:1px }
    .sim-sticker > .sim-component.text-input { width:100%; height:100% }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'text-input',
        Placeholder: '(current value)', Resizability: 'vertical', LineWrapping: true },
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'readonly', Label: 'readonly', EditorType: 'checkbox',
        Default: false },
    { Name: 'minLength', Label: 'min. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'maxLength', Label: 'max. Length', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Wrap', Label: 'Line Wapping', EditorType: 'checkbox',
        Default: false },
    { Name: 'Spellcheck', Label: 'check spelling', EditorType: 'checkbox',
        Default: false },
], { Offsets: [10, 100, 10, 80] });
/**** TabStrip ****/
_registerVariant('SIM/common/TabStrip', sim.TabStrip, undefined, [
    { Name: 'TabList', Label: 'TabList', EditorType: 'linelist-input',
        Resizability: 'vertical', LineWrapping: false },
    { Name: 'activeIndex', Label: 'active Tab #', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'GapIndex', Label: 'Gap Index', EditorType: 'integer-input',
        minValue: 0 },
], { Offsets: [10, 100, 10, 30] });
/**** FlatListView ****/
_registerVariant('SIM/common/FlatListView', sim.FlatListView, undefined, [
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'SelectionLimit', Label: 'Selection Limit', EditorType: 'number-input',
        minValue: 0 },
], { Offsets: [10, 240, 10, 160] });
/**** NestedListView ****/
_registerVariant('SIM/common/NestedListView', sim.NestedListView, undefined, [
    { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input',
        Placeholder: '(placeholder text)' },
    { Name: 'SelectionLimit', Label: 'Selection Limit', EditorType: 'number-input',
        minValue: 0 },
], { Offsets: [10, 240, 10, 160] });
/**** stickyNote ****/
_registerVariant('SIM/common/stickyNote', function stickyNote(PropSet) {
    let [Classes, Value, withTabs, SnapToGrid, GridWidth, GridHeight, onValueInput, autoConfigureInput, autoPreserveProject, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('value'), optionalBoolean('withtabs'), optionalBoolean('snaptogrid'), optionalOrdinal('gridwidth'), optionalOrdinal('gridheight'), optionalFunction('onvalueinput'), optionalBoolean('autoconfigureinput'), optionalBoolean('autopreserveproject'));
    const NoteRef = useRef();
    const DragInfo = useRef({ Mode: undefined, x: 0, y: 0, Width: 0, Height: 0 });
    // for dragging and resizing
    const { Configuration, configure, Geometry, changeGeometry, rerender, preserveProject } = contextualAPI();
    /**** prepare dragging ****/
    const startDragging = useDragging({
        ViewRef: NoteRef, onlyFrom: '.title',
        Container: () => NoteRef.current.parentElement.parentElement.closest('.sim-sticker,.sim-board'),
        onDragStart: (dx, dy, x, y, Event) => DragInfo.current = Geometry(),
        onDragContinuation: (dx, dy, x, y, Event) => moveNote(dx, dy),
        onDragFinish: (dx, dy, x, y, Event) => moveNote(dx, dy),
        onDragCancellation: (dx, dy, x, y, Event) => moveNote(dx, dy),
    });
    const moveNote = useCallback((dx, dy) => {
        let newX = DragInfo.current.x + dx;
        let newY = DragInfo.current.y + dy;
        if (SnapToGrid == true) {
            if (GridWidth > 0) {
                newX = GridWidth * Math.round(newX / GridWidth);
            }
            if (GridHeight > 0) {
                newY = GridHeight * Math.round(newY / GridHeight);
            }
        }
        changeGeometry(newX, newY);
        if (autoPreserveProject == true) {
            preserveProject();
        }
        rerender();
    }, [rerender, autoPreserveProject]);
    /**** prepare resizing ****/
    const startResizing = useDragging({
        ViewRef: NoteRef, onlyFrom: '.resize-handle',
        onDragStart: (dx, dy, x, y, Event) => DragInfo.current = Geometry(),
        onDragContinuation: (dx, dy, x, y, Event) => resizeNote(dx, dy),
        onDragFinish: (dx, dy, x, y, Event) => resizeNote(dx, dy),
        onDragCancellation: (dx, dy, x, y, Event) => resizeNote(dx, dy),
    });
    const resizeNote = useCallback((dx, dy) => {
        const { minWidth, maxWidth, minHeight, maxHeight } = Configuration();
        let newWidth = DragInfo.current.Width + dx;
        let newHeight = DragInfo.current.Height + dy;
        if (SnapToGrid == true) {
            if (GridWidth > 0) {
                newWidth = GridWidth * Math.round(newWidth / GridWidth);
            }
            if (GridHeight > 0) {
                newHeight = GridHeight * Math.round(newHeight / GridHeight);
            }
        }
        newWidth = Math.max(minWidth !== null && minWidth !== void 0 ? minWidth : 0, Math.min(newWidth, maxWidth !== null && maxWidth !== void 0 ? maxWidth : Infinity));
        newHeight = Math.max(minHeight !== null && minHeight !== void 0 ? minHeight : 0, Math.min(newHeight, maxHeight !== null && maxHeight !== void 0 ? maxHeight : Infinity));
        changeGeometry(null, null, newWidth, newHeight);
        if (autoPreserveProject == true) {
            preserveProject();
        }
        rerender();
    }, [rerender, autoPreserveProject]);
    /**** Tab Handling ****/
    const _onKeyDown = useCallback((Event) => {
        if (Event.key === 'Tab') {
            Event.preventDefault();
            let TextArea = Event.target;
            let SelectionStart = TextArea.selectionStart;
            let SelectionEnd = TextArea.selectionEnd;
            let Content = TextArea.value;
            TextArea.value = Content.slice(0, SelectionStart) + '\t' + Content.slice(SelectionEnd);
            TextArea.selectionStart = TextArea.selectionEnd = SelectionStart + 1;
            // configure({ Value:TextArea.value })
        }
    }, []);
    const _onInput = useCallback((Event) => {
        const enteredValue = Event.target.value;
        if (autoConfigureInput == true) {
            configure({ Value: enteredValue });
            if (autoPreserveProject == true) {
                preserveProject();
            }
        }
        executeCallback('stickyNote callback "onValueInput"', onValueInput, enteredValue, Event);
    });
    /**** actual rendering ****/
    return html `<div class="sim-component sticky-note ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        withTabs=${withTabs} ...${RestProps} ref=${NoteRef}
      >
        <div class="title" onPointerDown=${startDragging}/>
        <textarea onKeyDown=${_onKeyDown} onInput=${_onInput}>${Value}</>
        <div class="resize-handle" onPointerDown=${startResizing}/>
      </>`;
}, `
  .sim-component.sticky-note {
    min-width:40px; min-height:40px;
    border:solid 1px #888888;
    background:#FFFFE0;
    color:black;

    -moz-user-select:none; -webkit-user-select:none; user-select:none;
    touch-action:none;
  }

  .sim-component.sticky-note > .title { /* Note Titlebar */
    display:block; position:absolute;
    left:0px; top:0px; right:0px; height:10px;
    background:#EEE8AA;
    cursor:grab;
  }

  .sim-component.sticky-note:focus-within:before {
    background:#F4A460;
  }
  .sim-component.sticky-note > textarea { /* Note Content */
    display:block; position:absolute;
    left:-1px; top:10px; right:0px; bottom:0px; width:inherit; height:auto;
    min-width:10px; min-height:10px;
    resize:none; overflow:auto;
    margin-top:0px; padding:4px; border:none; background:transparent;
    font:inherit; line-height:inherit;
  }
  .sim-component.sticky-note[withTabs] > textarea {
    white-space:pre;
    tab-size:10px;
  }
  .sim-component.sticky-note > textarea:focus {
    outline:none;
  }

  .sim-component.sticky-note > .resize-handle { /* Note Resize Handle */
    display:block; position:absolute;
    right:0px; bottom:0px; width:24px; height:24px;
    background-color:transparent;
    background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAbUlEQVRIS9WTwQ0AIAgDZV0GYl2NP2KMEWmjOkAvPawU8hNGvpnVnquq8ifAW6E0gAO88/GmkAZ0wOonQhrAASslHZbeAR0QWf8bN4goOdoBHRBxftQADsgo2doBHZBRcucGSCXTBnQA0vmY1QDfJWAZ8ODrpQAAAABJRU5ErkJggg==");
    cursor:nwse-resize;
  }
    `, [
    { Name: 'Value', Label: 'Value', EditorType: 'text-input',
        Placeholder: '(current value)' },
    { Name: 'withTabs', Label: 'with Tabs', EditorType: 'checkbox',
        Default: false },
    { Name: 'SnapToGrid', Label: 'Snap-to-Grid', EditorType: 'checkbox',
        Default: false },
    { Name: 'GridWidth', Label: 'Grid Width [px]', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'GridHeight', Label: 'Grid Height [px]', EditorType: 'integer-input',
        minValue: 0 },
], {
    Offsets: [10, 120, 10, 80],
    withTabs: true,
    SnapToGrid: true, GridWidth: 10, GridHeight: 10,
    autoConfigureInput: true, autoPreserveProject: true,
});
/**** straightLineView ****/
const SIM_straightLineOrientations = ['nw-se', 'n-s', 'ne-sw', 'e-w'];
const SIM_straightLineArrowHeads = ['none', 'start-only', 'end-only', 'both'];
_registerVariant('SIM/common/straightLineView', function straightLineView(PropSet) {
    let [Classes, Thickness, Orientation, ArrowHeads, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalOrdinal('thickness'), optionalValue('orientation', (Value) => ValueIsOneOf(Value, SIM_straightLineOrientations)), optionalValue('arrowheads', (Value) => ValueIsOneOf(Value, SIM_straightLineArrowHeads)));
    if (Thickness == null) {
        Thickness = 2;
    }
    if (Orientation == null) {
        Orientation = 'nw-se';
    }
    if (ArrowHeads == null) {
        ArrowHeads = 'none';
    }
    const { Width, Height } = contextualAPI().Geometry();
    const withStartArrow = (ArrowHeads === 'start-only') || (ArrowHeads === 'both');
    const withEndArrow = (ArrowHeads === 'end-only') || (ArrowHeads === 'both');
    const StartOffset = 0; // (withStartArrow ? 0 : Thickness)
    const EndOffset = 0; // (withEndArrow   ? 0 : Thickness)
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    switch (Orientation) {
        case 'nw-se':
            x1 = StartOffset;
            y1 = StartOffset;
            x2 = Width - EndOffset;
            y2 = Height - EndOffset;
            break;
        case 'n-s':
            x1 = Width / 2;
            y1 = StartOffset;
            x2 = Width / 2;
            y2 = Height - EndOffset;
            break;
        case 'ne-sw':
            x1 = Width - StartOffset;
            y1 = StartOffset;
            x2 = EndOffset;
            y2 = Height - EndOffset;
            break;
        case 'e-w':
            x1 = StartOffset;
            y1 = Height / 2;
            x2 = Width - EndOffset;
            y2 = Height / 2;
            break;
    }
    return html `<div class="sim-component straight-line ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
        <svg width="100%" height="100%" viewBox="0 0 ${Width} ${Height}">
          <defs>
            <marker id="start-arrow" markerWidth="10" markerHeight="8"
              refX="1" refY="2" orient="auto">
              <polygon fill="currentColor" points="5 0, 0 2, 5 4"/>
            </marker>
            <marker id="end-arrow" markerWidth="10" markerHeight="8"
              refX="4" refY="2" orient="auto">
              <polygon fill="currentColor" points="0 0, 5 2, 0 4"/>
            </marker>
          </defs>
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
            stroke="currentColor" stroke-width="${Thickness}"
            marker-start=${withStartArrow ? 'url(#start-arrow)' : undefined}
            marker-end=${withEndArrow ? 'url(#end-arrow)' : undefined}
          />
        </svg>
      </>`;
}, undefined, [
    { Name: 'Thickness', Label: 'Thickness [px]', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Orientation', Label: 'Orientation', EditorType: 'drop-down',
        ValueList: SIM_straightLineOrientations },
    { Name: 'ArrowHeads', Label: 'Arrow Heads', EditorType: 'drop-down',
        ValueList: SIM_straightLineArrowHeads },
], { Offsets: [10, 40, 10, 40] });
/**** angledLineView ****/
const SIM_angledLineOrientations = ['up-left', 'up-right', 'down-left', 'down-right'];
const SIM_angledLineArrowHeads = ['none', 'start-only', 'end-only', 'both'];
_registerVariant('SIM/common/angledLineView', function angledLineView(PropSet) {
    let [Classes, Thickness, Orientation, ArrowHeads, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalOrdinal('thickness'), optionalValue('orientation', (Value) => ValueIsOneOf(Value, SIM_angledLineOrientations)), optionalValue('arrowheads', (Value) => ValueIsOneOf(Value, SIM_angledLineArrowHeads)));
    if (Thickness == null) {
        Thickness = 2;
    }
    if (Orientation == null) {
        Orientation = 'down-right';
    }
    if (ArrowHeads == null) {
        ArrowHeads = 'none';
    }
    const { Width, Height } = contextualAPI().Geometry();
    const withStartArrow = (ArrowHeads === 'start-only') || (ArrowHeads === 'both');
    const withEndArrow = (ArrowHeads === 'end-only') || (ArrowHeads === 'both');
    const StartOffset = 0; // Math.ceil((withStartArrow ? 0.5 : 2.5)*Thickness)
    const EndOffset = 0; // Math.ceil((withEndArrow   ? 0.5 : 2.5)*Thickness)
    let Points = '';
    switch (Orientation) {
        case 'up-left':
            Points = `${Width - StartOffset},${Height - StartOffset}, ${Width - StartOffset},${EndOffset} ${EndOffset},${EndOffset}`;
            break;
        case 'up-right':
            Points = `${StartOffset},${Height - StartOffset}, ${StartOffset},${EndOffset} ${Width - EndOffset},${EndOffset}`;
            break;
        case 'down-left':
            Points = `${Width - StartOffset},${StartOffset}, ${Width - StartOffset},${Height - EndOffset} ${EndOffset},${Height - EndOffset}`;
            break;
        case 'down-right':
            Points = `${StartOffset},${StartOffset}, ${StartOffset},${Height - EndOffset} ${Width - EndOffset},${Height - EndOffset}`;
    }
    return html `<div class="sim-component angled-line ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
        <svg width="100%" height="100%" viewBox="0 0 ${Width} ${Height}">
          <defs>
            <marker id="start-arrow" markerWidth="10" markerHeight="8"
              refX="1" refY="2" orient="auto">
              <polygon fill="currentColor" points="5 0, 0 2, 5 4"/>
            </marker>
            <marker id="end-arrow" markerWidth="10" markerHeight="8"
              refX="4" refY="2" orient="auto">
              <polygon fill="currentColor" points="0 0, 5 2, 0 4"/>
            </marker>
          </defs>
          <polyline stroke="currentColor" stroke-width="${Thickness !== null && Thickness !== void 0 ? Thickness : 2}" fill="none"
            marker-start=${withStartArrow ? 'url(#start-arrow)' : undefined}
            marker-end=${withEndArrow ? 'url(#end-arrow)' : undefined}
            points=${Points}
          />
        </svg>
      </>`;
}, `
      .sim-component.angled-line       { overflow:visible ! important }
      .sim-component.angled-line > svg { overflow:visible ! important }
    `, [
    { Name: 'Thickness', Label: 'Thickness [px]', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Orientation', Label: 'Orientation', EditorType: 'drop-down',
        ValueList: SIM_angledLineOrientations },
    { Name: 'ArrowHeads', Label: 'Arrow Heads', EditorType: 'drop-down',
        ValueList: SIM_angledLineArrowHeads },
], { Offsets: [10, 40, 10, 40], minWidth: 40, minHeight: 40 });
/**** curvedLineView ****/
const SIM_curvedLineOrientations = ['up-left', 'up-right', 'down-left', 'down-right'];
const SIM_curvedLineArrowHeads = ['none', 'start-only', 'end-only', 'both'];
_registerVariant('SIM/common/curvedLineView', function curvedLineView(PropSet) {
    let [Classes, Thickness, Orientation, ArrowHeads, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalOrdinal('thickness'), optionalValue('orientation', (Value) => ValueIsOneOf(Value, SIM_curvedLineOrientations)), optionalValue('arrowheads', (Value) => ValueIsOneOf(Value, SIM_curvedLineArrowHeads)));
    if (Thickness == null) {
        Thickness = 2;
    }
    if (Orientation == null) {
        Orientation = 'down-right';
    }
    if (ArrowHeads == null) {
        ArrowHeads = 'none';
    }
    const { Width, Height } = contextualAPI().Geometry();
    const withStartArrow = (ArrowHeads === 'start-only') || (ArrowHeads === 'both');
    const withEndArrow = (ArrowHeads === 'end-only') || (ArrowHeads === 'both');
    let Directives = '';
    switch (Orientation) {
        case 'up-left':
            Directives = `M ${Width},${Height}, A ${Width} ${Height} 0 0 0 0 0`;
            break;
        case 'up-right':
            Directives = `M 0,${Height}, A ${Width} ${Height} 0 0 1 ${Width} 0`;
            break;
        case 'down-left':
            Directives = `M ${Width},0, A ${Width} ${Height} 0 0 1 0 ${Height}`;
            break;
        case 'down-right':
            Directives = `M 0,0, A ${Width} ${Height} 0 0 0 ${Width} ${Height}`;
    }
    return html `<div class="sim-component curved-line ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
        <svg width="100%" height="100%" viewBox="0 0 ${Width} ${Height}">
          <defs>
            <marker id="start-arrow" markerWidth="10" markerHeight="8"
              refX="1" refY="2" orient="auto">
              <polygon fill="currentColor" points="5 0, 0 2, 5 4"/>
            </marker>
            <marker id="end-arrow" markerWidth="10" markerHeight="8"
              refX="4" refY="2" orient="auto">
              <polygon fill="currentColor" points="0 0, 5 2, 0 4"/>
            </marker>
          </defs>
          <path stroke="currentColor" stroke-width="${Thickness !== null && Thickness !== void 0 ? Thickness : 2}" fill="none"
            marker-start=${withStartArrow ? 'url(#start-arrow)' : undefined}
            marker-end=${withEndArrow ? 'url(#end-arrow)' : undefined}
            d=${Directives}
          />
        </svg>
      </>`;
}, `
      .sim-component.curved-line       { overflow:visible ! important }
      .sim-component.curved-line > svg { overflow:visible ! important }
    `, [
    { Name: 'Thickness', Label: 'Thickness [px]', EditorType: 'integer-input',
        minValue: 0 },
    { Name: 'Orientation', Label: 'Orientation', EditorType: 'drop-down',
        ValueList: SIM_curvedLineOrientations },
    { Name: 'ArrowHeads', Label: 'Arrow Heads', EditorType: 'drop-down',
        ValueList: SIM_curvedLineArrowHeads },
], { Offsets: [10, 40, 10, 40], minWidth: 40, minHeight: 40 });
/**** QRCodeView ****/
_registerVariant('SIM/common/QRCodeView', function QRCodeView(PropSet) {
    let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
    return html `<div class="sim-component qrcode-view ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
}, undefined, [], { Offsets: [10, 100, 10, 100] });
//------------------------------------------------------------------------------
//--                              Designer State                              --
//------------------------------------------------------------------------------
const initialDesignerState = {
    DesignerDisabled: false, // temporarily disables Designer rendering
    isOpen: false, // when closed, only the DesignerButton is shown
    isLayouting: false, // the layouter inhibits project operation
    DesignerButton: {
        isDragging: false,
        x: NaN, y: NaN
    },
    Toolbox: {
        Title: 'Toolbox',
        x: NaN, y: NaN, Width: 128, Height: 188,
    },
    Inspector: {
        Title: 'Inspector',
        x: NaN, y: NaN, Width: 380, Height: 550,
        minWidth: 380, minHeight: 550,
        activeTabIndex: 2,
        VariantBrowser: {
            ScrollPosition: 0,
            expandedGroupNames: [],
            newVariantName: '',
        },
        VariantConfigurator: {
            ScrollPosition: 0,
            Expansions: { Scripting: true },
        },
        ProjectConfigurator: {
            ScrollPosition: 0,
            Expansions: { Scripting: true },
        },
        BoardBrowser: {
            ScrollPosition: 0,
            expandedBoards: [],
            newBoardName: '',
        },
        BoardConfigurator: {
            ScrollPosition: 0,
            Expansions: { Scripting: true },
        },
        StickerBrowser: {
            ScrollPosition: 0,
            expandedStickers: [],
            newStickerName: '',
        },
        StickerConfigurator: {
            ScrollPosition: 0,
            Expansions: { Scripting: true, custom: true },
        },
    },
    Configurator: {
        Title: 'Settings',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    VariantEditor: {
        Title: 'Sticker Variant Editor',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    SynopsisEditor: {
        Title: 'Synopsis Editor',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        Scope: 'Project',
    },
    ValueEditor: {
        Title: 'Value Editor',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    ScriptEditor: {
        Title: 'Script Editor',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        Scope: 'Project',
    },
    AIConfigurator: {
        Title: 'AI Configuration',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    AIChat: {
        Title: 'AI Chat',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        Scope: 'Project',
    },
    AIBuddy: {
        Title: 'AI Buddy',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    SearchDialog: {
        Title: 'Search within SIM',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    Console: {
        Title: 'Console',
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    /**** Selection Support ****/
    selectedVariants: new Set(),
    selectedBoards: new Set(),
    selectedStickers: new Set(),
    /**** Shelf ****/
    shelvedStickers: [],
    /**** Operation History ****/
    OperationHistory: [],
    OperationIndex: 0, // points to next doable operation
    /**** Visit History ****/
    VisitHistory: [], // list of already visited boards
    VisitIndex: -1, // points to currently visited board
    /**** Layouter State ****/
    LayouterLayer: undefined,
    ShapeMode: undefined,
    pointedSticker: undefined,
    shapedStickers: [], // actually shaped stickers (as selection may change)
    initialGeometries: [], // initial geometries of "shapedStickers"
    LassoMode: 'enclose',
    SelectionBeforeLasso: [],
    LassoStart: { x: 0, y: 0 },
    LassoEnd: { x: 0, y: 0 },
    /**** Project Resizer ****/
    ProjectResizer: {
    //    Width, Height, minWidth,minHeight, maxWidth,maxHeight
    },
};
/**** resetDesignerState (after importing a new project) ****/
function resetDesignerState(DesignerState) {
    Object.assign(DesignerState, {
        isOpen: true,
        isLayouting: false,
        /**** Selection Support ****/
        selectedVariants: new Set(),
        selectedBoards: new Set(),
        selectedStickers: new Set(),
        /**** Shelf ****/
        shelvedStickers: [],
        /**** Operation History ****/
        OperationHistory: [],
        OperationIndex: 0, // points to next doable operation
        /**** Visit History ****/
        VisitHistory: [], // list of already visited boards
        VisitIndex: -1, // points to currently visited board
        /**** Layouter State ****/
        ShapeMode: undefined,
        pointedSticker: undefined,
        shapedStickers: [], // actually shaped stickers (as selection may change)
        initialGeometries: [], // initial geometries of "shapedStickers"
        LassoMode: 'enclose',
        SelectionBeforeLasso: [],
        LassoStart: { x: 0, y: 0 },
        LassoEnd: { x: 0, y: 0 },
        /**** Project Resizer ****/
        ProjectResizer: {},
    });
    DesignerState.SynopsisEditor.Scope = 'Project';
    DesignerState.ScriptEditor.Scope = 'Project';
    DesignerState.AIChat.Scope = 'Project';
}
//------------------------------------------------------------------------------
//--                               Designer API                               --
//------------------------------------------------------------------------------
function DesignerAPI() {
    const SystemContext = useSystemContext();
    const { ProjectState, Project: curProject, activeBoard, activateBoard, DesignerState } = SystemContext;
    const { Configuration, configure, ConfigurationOfBoard, configureBoard, ConfigurationOfSticker, configureSticker, 
    //    activateBoard,
    rerender, rerenderProject, inOverlay, openOverlay, openOverlayAtPointer, closeOverlay, closeAllOverlays, openOverlays, OverlayIsOpen, inDialog, openDialog, closeDialog, closeAllDialogs, openDialogs, DialogIsOpen, DialogIsFrontmost, bringDialogToFront, } = contextualAPI();
    /**** openDesigner ****/
    function openDesigner() {
        if (DesignerState.isOpen) {
            return;
        }
        DesignerState.isOpen = true;
        openToolbox();
        rerender();
    }
    /**** closeDesigner ****/
    function closeDesigner() {
        if (!DesignerState.isOpen) {
            return;
        }
        DesignerState.isOpen = false;
        closeToolbox();
        rerender();
    }
    /**** openToolbox ****/
    function openToolbox() {
        if (!DesignerState.isOpen) {
            return;
        }
        if (DialogIsOpen('Toolbox')) {
            return;
        }
        const { DesignerButton, Toolbox } = DesignerState;
        if (isNaN(Toolbox.x) || isNaN(Toolbox.y)) {
            Toolbox.x = DesignerButton.x;
            Toolbox.y = DesignerButton.y;
        }
        function onClose(Name, Descriptor) {
            const { OffsetX: x, OffsetY: y, Width, Height } = Descriptor;
            Object.assign(Toolbox, { x, y, Width, Height });
            closeDesigner();
        }
        let { Title, x, y, Width, Height, minWidth, minHeight } = DesignerState.Toolbox;
        openDialog({
            Name: 'Toolbox',
            Title, hasCloseButton: true, isModal: false, isResizable: false,
            Content: ToolboxRenderer,
            OffsetX: x, OffsetY: y, Width, Height, minWidth, minHeight,
            onClose
        });
    }
    /**** closeToolbox ****/
    function closeToolbox() {
        if (!DialogIsOpen('Toolbox')) {
            return;
        }
        closeDialog('Toolbox');
    }
    /**** openDesignerTool ****/
    function openDesignerTool(ToolName, initialX, initialY) {
        if (!DesignerState.isOpen) {
            return;
        }
        if (DialogIsOpen(ToolName)) {
            bringDialogToFront(ToolName);
            return;
        }
        const Toolbox = DesignerState.Toolbox;
        const DesignerTool = DesignerState[ToolName];
        if (isNaN(DesignerTool.x) || isNaN(DesignerTool.y)) {
            DesignerTool.x = initialX !== null && initialX !== void 0 ? initialX : Toolbox.x;
            DesignerTool.y = initialY !== null && initialY !== void 0 ? initialY : Toolbox.y;
        }
        function onClose(Name, Descriptor) {
            const { OffsetX: x, OffsetY: y, Width, Height } = Descriptor;
            Object.assign(DesignerTool, { x, y, Width, Height });
        }
        let { Title, x, y, Width, Height, minWidth, minHeight } = DesignerTool;
        let Renderer;
        switch (ToolName) {
            case 'Inspector':
                Renderer = InspectorRenderer;
                break;
            case 'Configurator':
                Renderer = ConfiguratorRenderer;
                break;
            case 'SynopsisEditor':
                Renderer = SynopsisEditorRenderer;
                break;
            case 'ValueEditor':
                Renderer = ValueEditorRenderer;
                break;
            case 'ScriptEditor':
                Renderer = ScriptEditorRenderer;
                break;
            case 'AIConfigurator':
                Renderer = AIConfiguratorRenderer;
                break;
            case 'AIChat':
                Renderer = AIChatRenderer;
                break;
            case 'AIBuddy':
                Renderer = AIBuddyRenderer;
                break;
            case 'SearchDialog':
                Renderer = SearchDialogRenderer;
                break;
            case 'Console':
                Renderer = ConsoleRenderer;
                break;
        }
        openDialog({
            Name: ToolName,
            Title, hasCloseButton: true, isModal: false, isResizable: true,
            // @ts-ignore TS2454 "Renderer" *will* have a value
            Content: Renderer,
            OffsetX: x, OffsetY: y, Width, Height, minWidth, minHeight,
            onClose,
        });
    }
    /**** closeDesignerTool ****/
    function closeDesignerTool(ToolName) {
        closeDialog(ToolName);
    }
    /**** toggleDesignerTool ****/
    function toggleDesignerTool(ToolName) {
        if (DialogIsOpen(ToolName)) {
            closeDesignerTool(ToolName);
        }
        else {
            openDesignerTool(ToolName);
        }
    }
    //------------------------------------------------------------------------------
    //--                            Selection Support                             --
    //------------------------------------------------------------------------------
    /*
        Object.assign(initialDesignerState, {
          selectedVariants:new Set<SIM_$Variant>(),
          selectedBoards:  new Set<SIM_$Board>(),
          selectedStickers:new Set<SIM_$Sticker>(),
        })
    */
    /**** selectVariants ****/
    function selectVariants(VariantList) {
        deselectAllBoards();
        VariantList.forEach((Variant) => DesignerState.selectedVariants.add(Variant));
        rerender();
    }
    /**** selectVariant ****/
    function selectVariant(Variant, additively = false) {
        if (!additively) {
            deselectAllVariants();
        }
        DesignerState.selectedVariants.add(Variant);
        rerender();
    }
    /**** deselectVariant ****/
    function deselectVariant(Variant) {
        if (DesignerState.selectedVariants.has(Variant)) {
            DesignerState.selectedVariants.delete(Variant);
            rerender();
        }
    }
    /**** deselectAllVariants ****/
    function deselectAllVariants() {
        DesignerState.selectedVariants.clear();
        //    rerender()                                                      // not yet
    }
    /**** VariantIsSelected ****/
    function VariantIsSelected(Variant) {
        return DesignerState.selectedVariants.has(Variant);
    }
    /**** VariantSelection ****/
    function VariantSelection() {
        return Array.from(DesignerState.selectedVariants);
    }
    /**** sortedVariantSelection ****/
    function sortedVariantSelection() {
        return DesignerState.selectedVariants.map((Variant) => Variant[$normalizedName]).sort().map((VariantName) => VariantRegistry[VariantName]);
    }
    /**** sanitizeVariantSelection ****/
    function sanitizeVariantSelection() {
        const selectedVariants = DesignerState.selectedVariants;
        selectedVariants.forEach((Variant) => {
            if (VariantRegistry[Variant[$normalizedName]] == null) {
                selectedVariants.delete(Variant);
            }
        });
    }
    /**** selectBoards ****/
    function selectBoards(BoardList) {
        deselectAllBoards();
        BoardList.forEach((Board) => DesignerState.selectedBoards.add(Board));
        rerender();
    }
    /**** selectBoard (assuming that "Board" is attached) ****/
    function selectBoard(Board, additively = false) {
        if (!additively) {
            deselectAllBoards();
        }
        DesignerState.selectedBoards.add(Board);
        rerender();
    }
    /**** deselectBoard ****/
    function deselectBoard(Board) {
        if (DesignerState.selectedBoards.has(Board)) {
            DesignerState.selectedBoards.delete(Board);
            rerender();
        }
    }
    /**** deselectAllBoards ****/
    function deselectAllBoards() {
        DesignerState.selectedBoards.clear();
        //    rerender()                                                      // not yet
    }
    /**** BoardIsSelected ****/
    function BoardIsSelected(Board) {
        return DesignerState.selectedBoards.has(Board);
    }
    /**** BoardSelection ****/
    function BoardSelection() {
        return Array.from(DesignerState.selectedBoards);
    }
    /**** sortedBoardSelection ****/
    function sortedBoardSelection() {
        const BoardRoutes = [];
        DesignerState.selectedBoards.forEach((Board) => BoardRoutes.push(RouteToBoard(Board)));
        return sortedRoutes(BoardRoutes).map((Route) => BoardAtRoute(Route, curProject));
    }
    /**** sanitizeBoardSelection - e.g., after deleting some boards ****/
    function sanitizeBoardSelection() {
        const selectedBoards = DesignerState.selectedBoards;
        selectedBoards.forEach((Board) => {
            if (ProjectOfBoard(Board) !== curProject) {
                selectedBoards.delete(Board);
            }
        });
    }
    /**** selectStickers (assuming that all stickers are on the "activeBoard") ****/
    function selectStickers(SelectionA, SelectionB = []) {
        deselectAllStickers();
        const selectedStickers = DesignerState.selectedStickers;
        SelectionA.forEach((Sticker) => selectedStickers.add(Sticker));
        SelectionB.forEach((Sticker) => selectedStickers.add(Sticker));
        rerender();
    }
    /**** selectSticker (assuming that "Sticker" is on the "activeBoard") ****/
    function selectSticker(Sticker, additively = false) {
        if (!additively) {
            deselectAllStickers();
        }
        DesignerState.selectedStickers.add(Sticker);
        rerender();
    }
    /**** deselectSticker ****/
    function deselectSticker(Sticker) {
        if (DesignerState.selectedStickers.has(Sticker)) {
            DesignerState.selectedStickers.delete(Sticker);
            rerender();
        }
    }
    /**** deselectAllStickers ****/
    function deselectAllStickers() {
        DesignerState.selectedStickers.clear();
        //    rerender()                                                      // not yet
    }
    /**** StickerIsSelected ****/
    function StickerIsSelected(Sticker) {
        return DesignerState.selectedStickers.has(Sticker);
    }
    /**** StickerSelection ****/
    function StickerSelection() {
        return Array.from(DesignerState.selectedStickers);
    }
    /**** sortedStickerSelection ****/
    function sortedStickerSelection() {
        const StickerRoutes = [];
        DesignerState.selectedStickers.forEach((Sticker) => StickerRoutes.push(RouteToSticker(Sticker)));
        return sortedRoutes(StickerRoutes).map((Route) => StickerAtRoute(Route, activeBoard));
    }
    /**** sanitizeStickerSelection - e.g., after deleting some stickers ****/
    function sanitizeStickerSelection() {
        const selectedStickers = DesignerState.selectedStickers;
        selectedStickers.forEach((Sticker) => {
            if (BoardOfSticker(Sticker) !== activeBoard) {
                selectedStickers.delete(Sticker);
            }
        });
    }
    /**** selectedBoardsMayBeMovedIn ****/
    function selectedBoardsMayBeMovedIn() {
        return selectedBoardsMayBeMovedDown();
    }
    /**** selectedBoardsMayBeMovedOut ****/
    function selectedBoardsMayBeMovedOut() {
        const selectedBoards = sortedBoardSelection();
        if (selectedBoards.length === 0) {
            return false;
        }
        const firstBoard = selectedBoards[0];
        const Container = firstBoard[$Container];
        return (TypeOfVisual(Container) !== 'project');
    }
    /**** selectedBoardsMayBeMovedUp ****/
    function selectedBoardsMayBeMovedUp() {
        const selectedBoards = sortedBoardSelection();
        if (selectedBoards.length === 0) {
            return false;
        }
        const firstBoard = selectedBoards[0];
        return (IndexOfBoard(firstBoard) > 0);
    }
    /**** selectedBoardsMayBeMovedDown ****/
    function selectedBoardsMayBeMovedDown() {
        const selectedBoards = sortedBoardSelection();
        if (selectedBoards.length === 0) {
            return false;
        }
        const lastBoard = selectedBoards[selectedBoards.length - 1];
        const Container = lastBoard[$Container];
        return (IndexOfBoard(lastBoard) < Container.BoardList.length - 1);
    }
    /**** selectedStickersMayBeMovedIn ****/
    function selectedStickersMayBeMovedIn() {
        const selectedStickers = sortedStickerSelection();
        if (selectedStickers.length === 0) {
            return false;
        }
        const lastSticker = selectedStickers[selectedStickers.length - 1];
        const Container = lastSticker[$Container];
        const nextSticker = Container.StickerList[IndexOfSticker(lastSticker) + 1];
        return (nextSticker != null) && ValueIsCompound(nextSticker);
    }
    /**** selectedStickersMayBeMovedOut ****/
    function selectedStickersMayBeMovedOut() {
        const selectedStickers = sortedStickerSelection();
        if (selectedStickers.length === 0) {
            return false;
        }
        const firstSticker = selectedStickers[0];
        const Container = firstSticker[$Container];
        return (TypeOfVisual(Container) !== 'board');
    }
    /**** selectedStickersMayBeMovedUp ****/
    function selectedStickersMayBeMovedUp() {
        const selectedStickers = sortedStickerSelection();
        if (selectedStickers.length === 0) {
            return false;
        }
        const firstSticker = selectedStickers[0];
        return (IndexOfSticker(firstSticker) > 0);
    }
    /**** selectedStickersMayBeMovedDown ****/
    function selectedStickersMayBeMovedDown() {
        const selectedStickers = sortedStickerSelection();
        if (selectedStickers.length === 0) {
            return false;
        }
        const lastSticker = selectedStickers[selectedStickers.length - 1];
        const Container = lastSticker[$Container];
        return (IndexOfSticker(lastSticker) < Container.StickerList.length - 1);
    }
    //------------------------------------------------------------------------------
    //--                                  Shelf                                   --
    //------------------------------------------------------------------------------
    /*
        Object.assign(DesignerState, {
          shelvedWidgets:[],                              // list of shelved widgets
        })
    */
    /**** shelveStickers ****/
    function shelveStickers(StickerList) {
        DesignerState.shelvedStickers = StickerList.map((Sticker) => externalizedSticker(Sticker));
        rerender();
    }
    /**** shelvedStickers ****/
    function shelvedStickers() {
        return DesignerState.shelvedStickers.slice();
    }
    //------------------------------------------------------------------------------
    //--                              Visit History                               --
    //------------------------------------------------------------------------------
    /*
        Object.assign(initialDesignerState, {
          VisitHistory:[],                         // list of already visited boards
          VisitIndex:  -1,                      // points to currently visited board
        })
    */
    /**** prev/nextBoardToVisit ****/
    function prevBoardToVisit() {
        const VisitHistory = DesignerState.VisitHistory; // reference, not copy
        for (let i = DesignerState.VisitIndex - 1; i >= 0; i--) {
            if (ProjectOfBoard(VisitHistory[i]) === curProject) {
                return i;
            }
        }
        return undefined;
    }
    function nextBoardToVisit() {
        const VisitHistory = DesignerState.VisitHistory; // reference, not copy
        for (let i = DesignerState.VisitIndex + 1; i < VisitHistory.length; i++) {
            if (ProjectOfBoard(VisitHistory[i]) === curProject) {
                return i;
            }
        }
        return undefined;
    }
    /**** mayVisitPrev/NextBoard ****/
    function mayVisitPrevBoard() { return (prevBoardToVisit() != null); }
    function mayVisitNextBoard() { return (nextBoardToVisit() != null); }
    /**** visitPrev/NextBoard ****/
    function visitPrevBoard() {
        const VisitHistory = DesignerState.VisitHistory; // reference, not copy
        const BoardToVisit = prevBoardToVisit();
        if (BoardToVisit != null) {
            //      packCompoundsInBoard(VisitHistory[DesignerState.VisitIndex])
            DesignerState.VisitIndex = BoardToVisit;
            //      unpackCompoundsInBoard(VisitHistory[DesignerState.VisitIndex])
            deselectAllStickers();
            activateBoard(DesignerState.VisitHistory[BoardToVisit]);
        }
    }
    function visitNextBoard() {
        const VisitHistory = DesignerState.VisitHistory; // reference, not copy
        const BoardToVisit = nextBoardToVisit();
        if (BoardToVisit != null) {
            //      packCompoundsInBoard(VisitHistory[DesignerState.VisitIndex])
            DesignerState.VisitIndex = BoardToVisit;
            //      unpackCompoundsInBoard(VisitHistory[DesignerState.VisitIndex])
            deselectAllStickers();
            activateBoard(DesignerState.VisitHistory[BoardToVisit]);
        }
    }
    /**** visitBoard ****/
    function visitBoard(Board) {
        const VisitHistory = DesignerState.VisitHistory; // reference, not copy
        if (VisitHistory[DesignerState.VisitIndex] === Board) {
            return;
        }
        //    packCompoundsInBoard(VisitHistory[DesignerState.VisitIndex])
        const BoardToVisit = nextBoardToVisit();
        if ((BoardToVisit != null) && (VisitHistory[BoardToVisit] === Board)) {
            DesignerState.VisitIndex = BoardToVisit;
        }
        else {
            DesignerState.VisitIndex += 1;
            VisitHistory[DesignerState.VisitIndex] = Board;
            VisitHistory.length = DesignerState.VisitIndex + 1;
        }
        //    unpackCompoundsInBoard(Board)
        deselectAllStickers();
        activateBoard(Board);
    }
    /**** sanitizeVisitedBoard ****/
    function sanitizeVisitedBoard() {
        const VisitHistory = DesignerState.VisitHistory; // reference, not copy
        if (VisitHistory[DesignerState.VisitIndex] === activeBoard) {
            return;
        }
        if (VisitHistory.length === 0) {
            VisitHistory.push(activeBoard);
            DesignerState.VisitIndex = 0;
            return;
        }
        //    packCompoundsInBoard(VisitHistory[DesignerState.VisitIndex])
        //    unpackCompoundsInBoard(activeBoard)
        let BoardToVisit = nextBoardToVisit();
        if (VisitHistory[BoardToVisit] === activeBoard) {
            DesignerState.VisitIndex = BoardToVisit;
            return;
        }
        BoardToVisit = prevBoardToVisit();
        if (VisitHistory[BoardToVisit] === activeBoard) {
            DesignerState.VisitIndex = BoardToVisit;
            return;
        }
        DesignerState.VisitIndex += 1;
        VisitHistory[DesignerState.VisitIndex] = activeBoard;
        VisitHistory.length = DesignerState.VisitIndex + 1;
    }
    //------------------------------------------------------------------------------
    //--                            Operation History                             --
    //------------------------------------------------------------------------------
    /*
        Object.assign(DesignerState, {
          OperationHistory:[],
          OperationIndex:  0,                     // points to next doable operation
        })
    */
    /**** mayUndo/Redo ****/
    function mayUndo() { return (DesignerState.OperationIndex > 0); }
    function mayRedo() {
        return (DesignerState.OperationIndex < DesignerState.OperationHistory.length);
    }
    /**** doOperation ****/
    function doOperation(Operation) {
        const { OperationHistory, OperationIndex } = DesignerState;
        if (OperationIndex < OperationHistory.length) {
            OperationHistory.length = OperationIndex;
        }
        try {
            const prevOperation = OperationHistory[OperationIndex - 1];
            if ((prevOperation != null) && Operation.canExtend(prevOperation)) {
                Operation.extend(prevOperation); // may fail
                if (prevOperation.isIrrelevant) {
                    DesignerState.OperationIndex -= 1; // only upon success
                }
                preserveProject(curProject);
                rerender();
            }
            else {
                Operation.doNow(); // may fail
                OperationHistory.push(Operation); // only upon success
                DesignerState.OperationIndex += 1;
                preserveProject(curProject);
                rerender();
            }
        }
        catch (Signal) {
            console.error('operation failed', Signal);
        }
    }
    /**** undoOperation ****/
    function undoOperation() {
        const { OperationHistory, OperationIndex } = DesignerState;
        let prevOperation = OperationHistory[OperationIndex - 1];
        if (prevOperation != null) {
            prevOperation.undo();
            DesignerState.OperationIndex -= 1; // only upon success
            preserveProject(curProject);
            rerender();
        }
    }
    /**** redoOperation ****/
    function redoOperation() {
        const { OperationHistory, OperationIndex } = DesignerState;
        let nextOperation = OperationHistory[OperationIndex];
        if (nextOperation != null) {
            nextOperation.redo();
            DesignerState.OperationIndex += 1; // only upon success
            preserveProject(curProject);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                               SIM_Operation                                //
    //----------------------------------------------------------------------------//
    class SIM_Operation {
        constructor() {
            Object.defineProperty(this, "_Type", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // *C* extremely poor!
        }
        get isIrrelevant() { return false; }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    }
    //----------------------------------------------------------------------------//
    //                    SIM_VariantDeserializationOperation                     //
    //----------------------------------------------------------------------------//
    class SIM_VariantDeserializationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Descriptor) {
            super();
            Object.defineProperty(this, "_Descriptor", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_normalizedName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_VariantDeserializationOperation'; // *C* extremely poor!
            this._Descriptor = Descriptor;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() { return false; }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            registerVariant(this._Descriptor); // also validates the name
            this._normalizedName = _normalizedPath(this._Descriptor.Name);
            selectVariant(VariantRegistry[this._normalizedName]);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            deselectVariant(VariantRegistry[this._normalizedName]);
            unregisterVariant(this._normalizedName);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                     SIM_VariantConfigurationOperation                      //
    //----------------------------------------------------------------------------//
    class SIM_VariantConfigurationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Variants, PropertyName, PropertyValue) {
            super();
            Object.defineProperty(this, "_Variants", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_PropertyName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldValues", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_VariantConfigurationOperation'; // *C* extremely poor!
            if ((PropertyName === 'Name') && (Variants.length > 1))
                throwError('ForbiddenOperation: cannot give multiple sticker variants the same name');
            this._Variants = Variants.slice();
            this._PropertyName = PropertyName;
            this._oldValues = Variants.map((Variant) => Variant[PropertyName]);
            this._newValue = PropertyValue;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return ((otherOperation._Type === 'SIM_VariantConfigurationOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_VariantConfigurationOperation) &&
                ValuesAreEqual(otherOperation._Variants, this._Variants, 'by-reference') &&
                (otherOperation._PropertyName === this._PropertyName) &&
                this._oldValues.every((oldValue) => ValuesAreEqual(oldValue, otherOperation._newValue)));
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return this._oldValues.every((oldValue) => ValuesAreEqual(oldValue, this._newValue));
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            if (this._PropertyName === 'Name') {
                renameVariantTo(this._Variants[0], this._newValue);
            }
            else {
                this._Variants.forEach((Variant) => _configureVariant(Variant, { [this._PropertyName]: this._newValue }));
            }
            selectVariants(this._Variants);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newValue = this._newValue;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            if (this._PropertyName === 'Name') {
                renameVariantTo(this._Variants[0], this._oldValues[0]);
            }
            else {
                this._Variants.forEach((Variant, i) => _configureVariant(Variant, { [this._PropertyName]: this._oldValues[i] }));
            }
            selectVariants(this._Variants);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                    SIM_VariantScriptActivationOperation                    //
    //----------------------------------------------------------------------------//
    class SIM_VariantScriptActivationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Variants) {
            super();
            Object.defineProperty(this, "_Variants", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldScripts", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newScripts", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_VariantScriptActivationOperation'; // *C* extremely poor!
            this._Variants = Variants.slice();
            this._oldScripts = Variants.map((Variant) => Variant.Script);
            this._newScripts = Variants.map((Variant) => Variant.pendingScript);
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return ValuesAreEqual(this._newScripts, this._oldScripts);
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Variants.forEach((Variant) => activateScriptOfVariant(Variant));
            selectVariants(this._Variants);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Variants.forEach((Variant, i) => {
                const pendingScript = Variant.pendingScript;
                Variant.pendingScript = this._oldScripts[i];
                try {
                    activateScriptOfVariant(Variant);
                }
                catch (Signal) { /* nop - will show an error anyway */ }
                Variant.pendingScript = pendingScript;
            });
            selectVariants(this._Variants);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                        SIM_VariantDeletionOperation                        //
    //----------------------------------------------------------------------------//
    class SIM_VariantDeletionOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Variants) {
            super();
            Object.defineProperty(this, "_Variants", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_VariantDeletionOperation'; // *C* extremely poor!
            this._Variants = Variants.slice();
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() { return false; }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Variants.forEach((Variant) => {
                unregisterVariant(Variant[$normalizedName]);
                deselectVariant(Variant);
            });
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Variants.forEach((Variant) => registerVariant(externalizedVariant(Variant)));
            this._Variants = this._Variants.map((Variant) => VariantRegistry[Variant[$normalizedName]]);
            selectVariants(this._Variants);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                     SIM_ProjectConfigurationOperation                      //
    //----------------------------------------------------------------------------//
    class SIM_ProjectConfigurationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(PropertyName, PropertyValue) {
            super();
            Object.defineProperty(this, "_PropertyName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_ProjectConfigurationOperation'; // *C* extremely poor!
            this._PropertyName = PropertyName;
            this._oldValue = curProject[PropertyName];
            this._newValue = PropertyValue;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return ((otherOperation._Type === 'SIM_ProjectConfigurationOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_ProjectConfigurationOperation) &&
                (otherOperation._PropertyName === this._PropertyName) &&
                ValuesAreEqual(otherOperation._newValue, this._oldValue));
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return (this._newValue === this._oldValue);
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            _configureProject(curProject, { [this._PropertyName]: this._newValue });
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newValue = this._newValue;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            _configureProject(curProject, { [this._PropertyName]: this._oldValue });
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                    SIM_ProjectScriptActivationOperation                    //
    //----------------------------------------------------------------------------//
    class SIM_ProjectScriptActivationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor() {
            super();
            Object.defineProperty(this, "_oldScript", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newScript", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_ProjectScriptActivationOperation'; // *C* extremely poor!
            this._oldScript = curProject.Script;
            this._newScript = curProject.pendingScript;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return (this._newScript === this._oldScript);
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            activateScriptOfProject(curProject);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            const pendingScript = curProject.pendingScript;
            curProject.pendingScript = this._oldScript;
            try {
                activateScriptOfProject(curProject);
            }
            catch (Signal) {
                curProject.pendingScript = pendingScript;
                throw Signal;
            }
            curProject.pendingScript = pendingScript;
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                     SIM_BoardDeserializationOperation                      //
    //----------------------------------------------------------------------------//
    class SIM_BoardDeserializationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Descriptors, Container, StartIndex) {
            super();
            Object.defineProperty(this, "_Descriptors", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_Container", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_StartIndex", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newBoards", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            this._Type = 'SIM_BoardDeserializationOperation'; // *C* extremely poor!
            this._Descriptors = Descriptors.slice();
            this._Container = Container;
            this._StartIndex = StartIndex;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() { return false; }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._newBoards = deserializedBoardsAt(this._Descriptors, this._Container, this._StartIndex);
            selectBoards(this._newBoards);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            deleteBoards(this._newBoards);
            selectBoards([]);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                      SIM_BoardConfigurationOperation                       //
    //----------------------------------------------------------------------------//
    class SIM_BoardConfigurationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Boards, PropertyName, PropertyValue) {
            super();
            Object.defineProperty(this, "_Boards", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_PropertyName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldValues", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_BoardConfigurationOperation'; // *C* extremely poor!
            this._Boards = Boards.slice();
            this._PropertyName = PropertyName;
            this._oldValues = Boards.map((Board) => Board[PropertyName]);
            this._newValue = PropertyValue;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return ((otherOperation._Type === 'SIM_BoardConfigurationOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_BoardConfigurationOperation) &&
                ValuesAreEqual(otherOperation._Boards, this._Boards, 'by-reference') &&
                (otherOperation._PropertyName === this._PropertyName) &&
                this._oldValues.every((oldValue) => ValuesAreEqual(oldValue, otherOperation._newValue)));
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return this._oldValues.every((oldValue) => ValuesAreEqual(oldValue, this._newValue));
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Boards.forEach((Board) => {
                _configureBoard(Board, { [this._PropertyName]: this._newValue });
            });
            selectBoards(this._Boards);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newValue = this._newValue;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Boards.forEach((Board, i) => {
                _configureBoard(Board, { [this._PropertyName]: this._oldValues[i] });
            });
            selectBoards(this._Boards);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                     SIM_BoardScriptActivationOperation                     //
    //----------------------------------------------------------------------------//
    class SIM_BoardScriptActivationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Boards) {
            super();
            Object.defineProperty(this, "_Boards", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldScripts", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newScripts", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_BoardScriptActivationOperation'; // *C* extremely poor!
            this._Boards = Boards.slice();
            this._oldScripts = Boards.map((Board) => Board.Script);
            this._newScripts = Boards.map((Board) => Board.pendingScript);
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return ValuesAreEqual(this._newScripts, this._oldScripts);
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Boards.forEach((Board) => activateScriptOfBoard(Board));
            selectBoards(this._Boards);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Boards.forEach((Board, i) => {
                const pendingScript = Board.pendingScript;
                Board.pendingScript = this._oldScripts[i];
                try {
                    activateScriptOfBoard(Board);
                }
                catch (Signal) { /* nop - will show an error anyway */ }
                Board.pendingScript = pendingScript;
            });
            selectBoards(this._Boards);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                           SIM_BoardMoveOperation                           //
    //----------------------------------------------------------------------------//
    class SIM_BoardMoveOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(sortedBoards, Container, Index) {
            super();
            Object.defineProperty(this, "_sortedBoards", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldContainers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldIndices", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newContainer", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newIndex", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_BoardMoveOperation'; // *C* extremely poor!
            this._sortedBoards = sortedBoards.slice();
            this._oldContainers = sortedBoards.map((Board) => ContainerOfBoard(Board));
            this._oldIndices = sortedBoards.map((Board) => IndexOfBoard(Board));
            this._newContainer = Container;
            this._newIndex = Index;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return ((otherOperation._Type === 'SIM_BoardMoveOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_BoardMoveOperation) &&
                ValuesAreEqual(otherOperation._sortedBoards, this._sortedBoards, 'by-reference') &&
                this._oldContainers.every((Container) => Container === otherOperation._newContainer) &&
                this._oldIndices.every((Index, i) => Index === otherOperation._newIndex + i));
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return this._oldIndices.every((Index, i) => Index === this._newIndex + i);
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            moveBoardsTo(this._sortedBoards, this._newContainer, this._newIndex);
            selectBoards(this._sortedBoards);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newContainer = this._newContainer;
            otherOperation._newIndex = this._newIndex;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            moveBoardsBackTo(this._sortedBoards, this._oldContainers, this._oldIndices);
            selectBoards(this._sortedBoards);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                         SIM_BoardDeletionOperation                         //
    //----------------------------------------------------------------------------//
    class SIM_BoardDeletionOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(sortedBoards) {
            super();
            Object.defineProperty(this, "_sortedBoards", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_Containers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_Indices", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_BoardDeletionOperation'; // *C* extremely poor!
            this._sortedBoards = sortedBoards.slice();
            this._Containers = sortedBoards.map((Board) => Board[$Container]);
            this._Indices = sortedBoards.map((Board) => IndexOfBoard(Board));
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() { return false; }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            deleteBoards(this._sortedBoards);
            selectBoards([]);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            const newBoards = [];
            this._sortedBoards.forEach((Board, i) => {
                const Descriptor = externalizedBoard(Board);
                newBoards.push(deserializedBoardsAt([Descriptor], this._Containers[i], this._Indices[i])[0]);
            });
            this._sortedBoards = newBoards;
            selectBoards(newBoards);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                    SIM_StickerDeserializationOperation                     //
    //----------------------------------------------------------------------------//
    class SIM_StickerDeserializationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Descriptors, Container, StartIndex) {
            super();
            Object.defineProperty(this, "_Descriptors", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_Container", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_StartIndex", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newStickers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            this._Type = 'SIM_StickerDeserializationOperation'; // *C* extremely poor!
            this._Descriptors = Descriptors.slice();
            this._Container = Container;
            this._StartIndex = StartIndex;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() { return false; }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._newStickers = deserializedStickersAt(this._Descriptors, this._Container, this._StartIndex);
            selectStickers(this._newStickers);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            deleteStickers(this._newStickers);
            selectStickers([]);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                     SIM_StickerConfigurationOperation                      //
    //----------------------------------------------------------------------------//
    class SIM_StickerConfigurationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Stickers, PropertyName, PropertyValue) {
            super();
            Object.defineProperty(this, "_Stickers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_PropertyName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldValues", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_StickerConfigurationOperation'; // *C* extremely poor!
            this._Stickers = Stickers.slice();
            this._PropertyName = PropertyName;
            this._oldValues = Stickers.map((Sticker) => Sticker[PropertyName]);
            this._newValue = PropertyValue;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return ((otherOperation._Type === 'SIM_StickerConfigurationOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_StickerConfigurationOperation) &&
                ValuesAreEqual(otherOperation._Stickers, this._Stickers, 'by-reference') &&
                (otherOperation._PropertyName === this._PropertyName) &&
                this._oldValues.every((oldValue) => ValuesAreEqual(oldValue, otherOperation._newValue)));
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return this._oldValues.every((oldValue) => ValuesAreEqual(oldValue, this._newValue));
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Stickers.forEach((Sticker) => {
                _configureSticker(Sticker, { [this._PropertyName]: this._newValue });
            });
            selectStickers(this._Stickers);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newValue = this._newValue;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Stickers.forEach((Sticker, i) => {
                _configureSticker(Sticker, { [this._PropertyName]: this._oldValues[i] });
            });
            selectStickers(this._Stickers);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                     SIM_StickerGeometryChangeOperation                     //
    //----------------------------------------------------------------------------//
    class SIM_StickerGeometryChangeOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Stickers, newGeometry) {
            super();
            Object.defineProperty(this, "_Stickers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldValues", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'StickerGeometryChangeOperation'; // *C* extremely poor!
            this._Stickers = Stickers.slice();
            this._oldValues = Stickers.map((Sticker) => GeometryOfSticker(Sticker));
            this._newValue = newGeometry;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            const GeometriesMatch = (otherOperation._Type === 'StickerGeometryChangeOperation') &&
                ((otherOperation._newValue.x == null) && (this._newValue.x == null) ||
                    (otherOperation._newValue.x != null) && (this._newValue.x != null)) && ((otherOperation._newValue.y == null) && (this._newValue.y == null) ||
                (otherOperation._newValue.y != null) && (this._newValue.y != null)) && ((otherOperation._newValue.Width == null) && (this._newValue.Width == null) ||
                (otherOperation._newValue.Width != null) && (this._newValue.Width != null)) && ((otherOperation._newValue.Height == null) && (this._newValue.Height == null) ||
                (otherOperation._newValue.Height != null) && (this._newValue.Height != null));
            return ((otherOperation._Type === 'StickerGeometryChangeOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_StickerGeometryChangeOperation) &&
                ValuesAreEqual(otherOperation._Stickers, this._Stickers, 'by-reference') &&
                GeometriesMatch);
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return this._Stickers.every((Sticker, i) => this._oldValues[i] === GeometryOfSticker(Sticker));
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Stickers.forEach((Sticker) => {
                changeGeometryOfSticker(Sticker, this._newValue);
            });
            selectStickers(this._Stickers);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newValue = this._newValue;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Stickers.forEach((Sticker, i) => {
                changeGeometryOfSticker(Sticker, this._oldValues[i]);
            });
            selectStickers(this._Stickers);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                      SIM_StickerAnchorChangeOperation                      //
    //----------------------------------------------------------------------------//
    class SIM_StickerAnchorChangeOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Stickers, newAnchors) {
            super();
            Object.defineProperty(this, "_Stickers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldValues", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'StickerAnchorChangeOperation'; // *C* extremely poor!
            this._Stickers = Stickers.slice();
            this._oldValues = Stickers.map((Sticker) => Sticker.Anchors.slice());
            this._newValue = newAnchors.slice();
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            const AnchorsMatch = (otherOperation._Type === 'StickerAnchorChangeOperation') &&
                ((otherOperation._newValue[0] == null) && (this._newValue[0] == null) ||
                    (otherOperation._newValue[0] != null) && (this._newValue[0] != null)) && ((otherOperation._newValue[1] == null) && (this._newValue[1] == null) ||
                (otherOperation._newValue[1] != null) && (this._newValue[1] != null));
            return ((otherOperation._Type === 'StickerAnchorChangeOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_StickerAnchorChangeOperation) &&
                ValuesAreEqual(otherOperation._Stickers, this._Stickers, 'by-reference') &&
                AnchorsMatch);
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return this._Stickers.every((Sticker, i) => ValuesAreEqual(this._oldValues[i], Sticker.Anchors));
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Stickers.forEach((Sticker) => {
                changeAnchorsOfSticker(Sticker, this._newValue);
            });
            selectStickers(this._Stickers);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newValue = this._newValue;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Stickers.forEach((Sticker, i) => {
                changeAnchorsOfSticker(Sticker, this._oldValues[i]);
            });
            selectStickers(this._Stickers);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                      SIM_StickerOffsetChangeOperation                      //
    //----------------------------------------------------------------------------//
    class SIM_StickerOffsetChangeOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Stickers, newOffsets) {
            super();
            Object.defineProperty(this, "_Stickers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldValues", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'StickerOffsetChangeOperation'; // *C* extremely poor!
            this._Stickers = Stickers.slice();
            this._oldValues = Stickers.map((Sticker) => Sticker.Offsets.slice());
            this._newValue = newOffsets.slice();
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            const OffsetsMatch = (otherOperation._Type === 'StickerOffsetChangeOperation') &&
                ((otherOperation._newValue[0] == null) && (this._newValue[0] == null) ||
                    (otherOperation._newValue[0] != null) && (this._newValue[0] != null)) && ((otherOperation._newValue[1] == null) && (this._newValue[1] == null) ||
                (otherOperation._newValue[1] != null) && (this._newValue[1] != null)) && ((otherOperation._newValue[2] == null) && (this._newValue[2] == null) ||
                (otherOperation._newValue[2] != null) && (this._newValue[2] != null)) && ((otherOperation._newValue[3] == null) && (this._newValue[3] == null) ||
                (otherOperation._newValue[3] != null) && (this._newValue[3] != null));
            return ((otherOperation._Type === 'StickerOffsetChangeOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_StickerOffsetChangeOperation) &&
                ValuesAreEqual(otherOperation._Stickers, this._Stickers, 'by-reference') &&
                OffsetsMatch);
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return this._Stickers.every((Sticker, i) => ValuesAreEqual(this._oldValues[i], Sticker.Offsets));
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Stickers.forEach((Sticker) => {
                changeOffsetsOfSticker(Sticker, this._newValue);
            });
            selectStickers(this._Stickers);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newValue = this._newValue;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Stickers.forEach((Sticker, i) => {
                changeOffsetsOfSticker(Sticker, this._oldValues[i]);
            });
            selectStickers(this._Stickers);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                    SIM_StickerScriptActivationOperation                    //
    //----------------------------------------------------------------------------//
    class SIM_StickerScriptActivationOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Stickers) {
            super();
            Object.defineProperty(this, "_Stickers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldScripts", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newScripts", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_StickerScriptActivationOperation'; // *C* extremely poor!
            this._Stickers = Stickers.slice();
            this._oldScripts = Stickers.map((Sticker) => Sticker.Script);
            this._newScripts = Stickers.map((Sticker) => Sticker.pendingScript);
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return ValuesAreEqual(this._newScripts, this._oldScripts);
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Stickers.forEach((Sticker) => activateScriptOfSticker(Sticker));
            selectStickers(this._Stickers);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Stickers.forEach((Sticker, i) => {
                const pendingScript = Sticker.pendingScript;
                Sticker.pendingScript = this._oldScripts[i];
                try {
                    activateScriptOfSticker(Sticker);
                }
                catch (Signal) { /* nop - will show an error anyway */ }
                Sticker.pendingScript = pendingScript;
            });
            selectStickers(this._Stickers);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                         SIM_StickerShapeOperation                          //
    //----------------------------------------------------------------------------//
    class SIM_StickerShapeOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(Stickers, Geometries) {
            super();
            Object.defineProperty(this, "_Stickers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldGeometries", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newGeometries", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_StickerShapeOperation'; // *C* extremely poor!
            this._Stickers = Stickers.slice();
            this._oldGeometries = Stickers.map((Sticker) => GeometryOfSticker(Sticker));
            this._newGeometries = Geometries.slice();
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return ((otherOperation._Type === 'SIM_StickerShapeOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_StickerShapeOperation) &&
                ValuesAreEqual(otherOperation._Stickers, this._Stickers, 'by-reference') &&
                this._oldGeometries.every((Geometry, i) => ValuesAreEqual(otherOperation._newGeometries[i], Geometry)));
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return this._oldGeometries.every((Geometry, i) => ValuesAreEqual(this._newGeometries[i], Geometry));
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            this._Stickers.forEach((Sticker, i) => {
                shapeStickerTo(Sticker, this._newGeometries[i]);
            });
            selectStickers(this._Stickers);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newGeometries = this._newGeometries;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            this._Stickers.forEach((Sticker, i) => {
                shapeStickerTo(Sticker, this._oldGeometries[i]);
            });
            selectStickers(this._Stickers);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                          SIM_StickerMoveOperation                          //
    //----------------------------------------------------------------------------//
    class SIM_StickerMoveOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(sortedStickers, Container, Index) {
            super();
            Object.defineProperty(this, "_sortedStickers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldContainers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_oldIndices", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newContainer", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_newIndex", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_StickerMoveOperation'; // *C* extremely poor!
            this._sortedStickers = sortedStickers.slice();
            this._oldContainers = sortedStickers.map((Sticker) => ContainerOfSticker(Sticker));
            this._oldIndices = sortedStickers.map((Sticker) => IndexOfSticker(Sticker));
            this._newContainer = Container;
            this._newIndex = Index;
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return ((otherOperation._Type === 'SIM_StickerMoveOperation') && // *C* extremely poor!
                //        (otherOperation instanceof SIM_StickerMoveOperation) &&
                ValuesAreEqual(otherOperation._sortedStickers, this._sortedStickers, 'by-reference') &&
                this._oldContainers.every((Container) => Container === otherOperation._newContainer) &&
                this._oldIndices.every((Index, i) => Index === otherOperation._newIndex + i));
        }
        /**** isIrrelevant ****/
        get isIrrelevant() {
            return this._oldIndices.every((Index, i) => Index === this._newIndex + i);
        }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            moveStickersTo(this._sortedStickers, this._newContainer, this._newIndex);
            selectStickers(this._sortedStickers);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            this.doNow();
            otherOperation._newContainer = this._newContainer;
            otherOperation._newIndex = this._newIndex;
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            moveStickersBackTo(this._sortedStickers, this._oldContainers, this._oldIndices);
            selectStickers(this._sortedStickers);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                        SIM_StickerDeletionOperation                        //
    //----------------------------------------------------------------------------//
    class SIM_StickerDeletionOperation extends SIM_Operation {
        /**** constructor ****/
        constructor(sortedStickers) {
            super();
            Object.defineProperty(this, "_sortedStickers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_Containers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_Indices", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this._Type = 'SIM_StickerDeletionOperation'; // *C* extremely poor!
            this._sortedStickers = sortedStickers.slice();
            this._Containers = sortedStickers.map((Sticker) => Sticker[$Container]);
            this._Indices = sortedStickers.map((Sticker) => IndexOfSticker(Sticker));
        }
        /**** canExtend ****/
        canExtend(otherOperation) {
            return false;
        }
        /**** isIrrelevant ****/
        get isIrrelevant() { return false; }
        set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
        /**** doNow ****/
        doNow() {
            deleteStickers(this._sortedStickers);
            selectStickers([]);
            rerender();
        }
        /**** extend ****/
        extend(otherOperation) {
            throwError('NotExtensible: this operation can not be extended');
        }
        /**** redo ****/
        redo() {
            this.doNow();
        }
        /**** undo ****/
        undo() {
            const newStickers = [];
            this._sortedStickers.forEach((Sticker, i) => {
                const Descriptor = externalizedSticker(Sticker);
                newStickers.push(deserializedStickersAt([Descriptor], this._Containers[i], this._Indices[i])[0]);
            });
            this._sortedStickers = newStickers;
            selectStickers(newStickers);
            rerender();
        }
    }
    //----------------------------------------------------------------------------//
    //                                  Commands                                  //
    //----------------------------------------------------------------------------//
    /**** doCreateNewVariant ****/
    function doCreateNewVariant(Variant) {
        doOperation(new SIM_VariantDeserializationOperation({
            Name: Variant, Stylesheet: '', pendingScript: '',
            PropertyDescriptors: []
        }));
        if (DialogIsOpen('Inspector')) {
            DesignerState.Inspector.activeTabIndex = 1;
            rerender();
        }
    }
    /**** doConfigureSelectedVariants ****/
    function doConfigureSelectedVariants(Property, Value) {
        doOperation(new SIM_VariantConfigurationOperation(VariantSelection(), Property, Value));
    }
    /**** doActivateSelectedVariantScripts ****/
    function doActivateSelectedVariantScripts() {
        doOperation(new SIM_VariantScriptActivationOperation(VariantSelection()));
    }
    /**** doDeleteSelectedVariants ****/
    function doDeleteSelectedVariants() {
        doOperation(new SIM_VariantDeletionOperation(VariantSelection()));
    }
    /**** doConfigureProject ****/
    function doConfigureProject(Property, Value) {
        doOperation(new SIM_ProjectConfigurationOperation(Property, Value));
    }
    /**** doActivateProjectScript ****/
    function doActivateProjectScript() {
        doOperation(new SIM_ProjectScriptActivationOperation());
    }
    /**** doCreateNewBoard ****/
    function doCreateNewBoard(Name) {
        const selectedBoards = sortedBoardSelection();
        if (selectedBoards.length === 0) {
            doOperation(new SIM_BoardDeserializationOperation([{ Name, StickerList: [] }], curProject, curProject.BoardList.length));
        }
        else {
            const lastBoard = selectedBoards[selectedBoards.length - 1];
            doOperation(new SIM_BoardDeserializationOperation([{ Name, StickerList: [] }], ContainerOfBoard(lastBoard), IndexOfBoard(lastBoard) + 1));
        }
        if (DialogIsOpen('Inspector')) {
            DesignerState.Inspector.activeTabIndex = 4;
            rerender();
        }
    }
    /**** doDuplicateSelectedBoards ****/
    function doDuplicateSelectedBoards() {
        const selectedBoards = sortedBoardSelection();
        const lastBoard = selectedBoards[selectedBoards.length - 1];
        doOperation(new SIM_BoardDeserializationOperation(selectedBoards.map((Board) => externalizedBoard(Board)), ContainerOfBoard(lastBoard), IndexOfBoard(lastBoard) + 1));
    }
    /**** doConfigureVisitedBoard ****/
    function doConfigureVisitedBoard(Property, Value) {
        doOperation(new SIM_BoardConfigurationOperation([activeBoard], Property, Value));
    }
    /**** doConfigureSelectedBoards ****/
    function doConfigureSelectedBoards(Property, Value) {
        doOperation(new SIM_BoardConfigurationOperation(BoardSelection(), Property, Value));
    }
    /**** doActivateVisitedBoardScript ****/
    function doActivateVisitedBoardScript() {
        doOperation(new SIM_BoardScriptActivationOperation([activeBoard]));
    }
    /**** doActivateSelectedBoardsScript ****/
    function doActivateSelectedBoardsScript() {
        doOperation(new SIM_BoardScriptActivationOperation(BoardSelection()));
    }
    /**** doMoveSelectedBoards ****/
    function doMoveSelectedBoards(Container, Index) {
        doOperation(new SIM_BoardMoveOperation(sortedBoardSelection(), Container, Index));
    }
    /**** doMoveSelectedBoardsIn ****/
    function doMoveSelectedBoardsIn() {
        var _a;
        if (selectedBoardsMayBeMovedIn()) {
            const selectedBoards = sortedBoardSelection();
            const lastBoard = selectedBoards[selectedBoards.length - 1];
            const nextBoard = ((_a = lastBoard[$Container].BoardList) !== null && _a !== void 0 ? _a : [])[IndexOfBoard(lastBoard) + 1];
            doMoveSelectedBoards(nextBoard, 0);
        }
    }
    /**** doMoveSelectedBoardsOut ****/
    function doMoveSelectedBoardsOut() {
        if (selectedBoardsMayBeMovedOut()) {
            const firstBoard = sortedBoardSelection()[0];
            const Container = firstBoard[$Container];
            doMoveSelectedBoards(Container[$Container], IndexOfBoard(Container));
        }
    }
    /**** doShiftSelectedBoardsToTop ****/
    function doShiftSelectedBoardsToTop() {
        if (selectedBoardsMayBeMovedUp()) {
            const Container = sortedBoardSelection()[0][$Container];
            doMoveSelectedBoards(Container, 0);
        }
    }
    /**** doShiftSelectedBoardsUp ****/
    function doShiftSelectedBoardsUp() {
        if (selectedBoardsMayBeMovedUp()) {
            const firstBoard = sortedBoardSelection()[0];
            doMoveSelectedBoards(firstBoard[$Container], IndexOfBoard(firstBoard) - 1);
        }
    }
    /**** doShiftSelectedBoardsDown ****/
    function doShiftSelectedBoardsDown() {
        if (selectedBoardsMayBeMovedDown()) {
            const selectedBoards = sortedBoardSelection();
            const lastBoard = selectedBoards[selectedBoards.length - 1];
            doMoveSelectedBoards(lastBoard[$Container], IndexOfBoard(lastBoard) + 1);
        }
    }
    /**** doShiftSelectedBoardsToBottom ****/
    function doShiftSelectedBoardsToBottom() {
        if (selectedBoardsMayBeMovedDown()) {
            const selectedBoards = sortedBoardSelection();
            const lastBoard = selectedBoards[selectedBoards.length - 1];
            const Container = lastBoard[$Container];
            doMoveSelectedBoards(lastBoard[$Container], Container.BoardList.length + 1);
        }
    }
    /**** doVisitSelectedBoard ****/
    function doVisitSelectedBoard() {
        visitBoard(BoardSelection()[0]);
    }
    /**** doDeleteSelectedBoards ****/
    function doDeleteSelectedBoards() {
        doOperation(new SIM_BoardDeletionOperation(sortedBoardSelection()));
    }
    /**** doCreateNewSticker ****/
    function doCreateNewSticker(VariantName, Name) {
        var _a;
        const Variant = (_a = VariantRegistry[_normalizedPath(VariantName)]) !== null && _a !== void 0 ? _a : {};
        const { initialConfiguration } = Variant;
        doOperation(new SIM_StickerDeserializationOperation([Object.assign(Object.assign({ Anchors: ['left-width', 'top-height'], Offsets: [10, 40, 10, 40] }, initialConfiguration), { Variant: VariantName, Name })], activeBoard, 0));
        if (DialogIsOpen('Inspector')) {
            DesignerState.Inspector.activeTabIndex = 6;
            rerender();
        }
    }
    /**** doDuplicateSelectedStickers ****/
    function doDuplicateSelectedStickers() {
        const selectedStickers = sortedStickerSelection();
        if (selectedStickers.length === 0) {
            return;
        }
        doOperation(new SIM_StickerDeserializationOperation(selectedStickers.map((Sticker) => externalizedSticker(Sticker)), ContainerOfSticker(selectedStickers[0]), 0));
    }
    /**** doConfigureSelectedStickers ****/
    function doConfigureSelectedStickers(Property, Value) {
        const selectedStickers = StickerSelection();
        doOperation(new SIM_StickerConfigurationOperation(selectedStickers, Property, Value));
    }
    /**** doChangeGeometryOfSelectedStickers ****/
    function doChangeGeometryOfSelectedStickers(Geometry) {
        const selectedStickers = StickerSelection();
        doOperation(new SIM_StickerGeometryChangeOperation(selectedStickers, Geometry));
    }
    /**** doChangeAnchorsOfSelectedStickers ****/
    function doChangeAnchorsOfSelectedStickers(Anchors) {
        const selectedStickers = StickerSelection();
        doOperation(new SIM_StickerAnchorChangeOperation(selectedStickers, Anchors));
    }
    /**** doChangeOffsetsOfSelectedStickers ****/
    function doChangeOffsetsOfSelectedStickers(Offsets) {
        const selectedStickers = StickerSelection();
        doOperation(new SIM_StickerOffsetChangeOperation(selectedStickers, Offsets));
    }
    /**** doActivateSelectedStickerScripts ****/
    function doActivateSelectedStickerScripts() {
        doOperation(new SIM_StickerScriptActivationOperation(StickerSelection()));
    }
    /**** doChangeGeometriesBy ****/
    function doChangeGeometriesBy(sortedStickerList, Mode, dx, dy, initialGeometries, withSnapToGrid = true) {
        let dX = 0, dY = 0, dW = 0, dH = 0;
        switch (Mode) {
            case 'nw':
                dX = dx;
                dW = -dx;
                dY = dy;
                dH = -dy;
                break;
            case 'n':
                dY = dy;
                dH = -dy;
                break;
            case 'ne':
                dW = dx;
                dY = dy;
                dH = -dy;
                break;
            case 'e':
                dW = dx;
                break;
            case 'se':
                dW = dx;
                dH = dy;
                break;
            case 's':
                dH = dy;
                break;
            case 'sw':
                dX = dx;
                dW = -dx;
                dH = dy;
                break;
            case 'w':
                dX = dx;
                dW = -dx;
                break;
            case 'c':
                dX = dx;
                dY = dy;
        }
        let { SnapToGrid, GridWidth, GridHeight } = curProject;
        if (GridWidth == null) {
            GridWidth = 10;
        }
        if (GridHeight == null) {
            GridHeight = 10;
        }
        const GeometryList = initialGeometries.map((Geometry) => {
            let Width = Geometry.Width + dW;
            if ((Width < 0) && (dX !== 0)) {
                dX += Width;
                Width = 0;
            }
            let Height = Geometry.Height + dH;
            if ((Height < 0) && (dY !== 0)) {
                dY += Height;
                Height = 0;
            }
            let xl = Geometry.x + dX, xr = xl + Width;
            let yt = Geometry.y + dY, yb = yt + Height;
            if (withSnapToGrid && SnapToGrid) {
                let xl_ = GridWidth * Math.round(xl / GridWidth);
                let xr_ = GridWidth * Math.round(xr / GridWidth);
                let yt_ = GridHeight * Math.round(yt / GridHeight);
                let yb_ = GridHeight * Math.round(yb / GridHeight);
                switch (Mode) {
                    case 'nw':
                        xl = Math.min(xl_, xr);
                        yt = Math.min(yt_, yb);
                        break;
                    case 'n':
                        yt = Math.min(yt_, yb);
                        break;
                    case 'ne':
                        xr = Math.max(xl, xr_);
                        yt = Math.min(yt_, yb);
                        break;
                    case 'e':
                        xr = Math.max(xl, xr_);
                        break;
                    case 'se':
                        xr = Math.max(xl, xr_);
                        yb = Math.max(yt, yb_);
                        break;
                    case 's':
                        yb = Math.max(yt, yb_);
                        break;
                    case 'sw':
                        xl = Math.min(xl_, xr);
                        yb = Math.max(yt, yb_);
                        break;
                    case 'w':
                        xl = Math.min(xl_, xr);
                        break;
                    case 'c':
                        xl = xl_;
                        xr = xl + Width;
                        yt = yt_;
                        yb = yt + Height;
                }
            }
            return { x: xl, y: yt, Width: xr - xl, Height: yb - yt };
        });
        doOperation(new SIM_StickerShapeOperation(sortedStickerList, GeometryList));
    }
    /**** doMoveSelectedStickers ****/
    function doMoveSelectedStickers(Container, Index) {
        const selectedStickers = sortedStickerSelection();
        doOperation(new SIM_StickerMoveOperation(selectedStickers, Container, Index));
    }
    /**** doMoveSelectedStickersIn ****/
    function doMoveSelectedStickersIn() {
        var _a;
        if (selectedStickersMayBeMovedIn()) {
            const selectedStickers = sortedStickerSelection();
            const lastSticker = selectedStickers[selectedStickers.length - 1];
            const nextSticker = ((_a = lastSticker[$Container].StickerList) !== null && _a !== void 0 ? _a : [])[IndexOfSticker(lastSticker) + 1];
            doMoveSelectedStickers(nextSticker, 0);
        }
    }
    /**** doMoveSelectedStickersOut ****/
    function doMoveSelectedStickersOut() {
        if (selectedStickersMayBeMovedOut()) {
            const firstSticker = sortedStickerSelection()[0];
            const Container = firstSticker[$Container];
            doMoveSelectedStickers(Container[$Container], IndexOfSticker(Container));
        }
    }
    /**** doShiftSelectedStickersToTop ****/
    function doShiftSelectedStickersToTop() {
        if (selectedStickersMayBeMovedUp()) {
            const Container = sortedStickerSelection()[0][$Container];
            doMoveSelectedStickers(Container, 0);
        }
    }
    /**** doShiftSelectedStickersUp ****/
    function doShiftSelectedStickersUp() {
        if (selectedStickersMayBeMovedUp()) {
            const firstSticker = sortedStickerSelection()[0];
            doMoveSelectedStickers(firstSticker[$Container], IndexOfSticker(firstSticker) - 1);
        }
    }
    /**** doShiftSelectedStickersDown ****/
    function doShiftSelectedStickersDown() {
        if (selectedStickersMayBeMovedDown()) {
            const selectedStickers = sortedStickerSelection();
            const lastSticker = selectedStickers[selectedStickers.length - 1];
            doMoveSelectedStickers(lastSticker[$Container], IndexOfSticker(lastSticker) + 1);
        }
    }
    /**** doShiftSelectedStickersToBottom ****/
    function doShiftSelectedStickersToBottom() {
        if (selectedStickersMayBeMovedDown()) {
            const selectedStickers = sortedStickerSelection();
            const lastSticker = selectedStickers[selectedStickers.length - 1];
            const Container = lastSticker[$Container];
            doMoveSelectedStickers(lastSticker[$Container], Container.StickerList.length + 1);
        }
    }
    /**** doDeleteStickers ****/
    function doDeleteStickers(Stickers) {
        if (Stickers.length === 0) {
            return;
        }
        doOperation(new SIM_StickerDeletionOperation(Stickers));
    }
    /**** doCutStickers ****/
    function doCutStickers(Stickers) {
        if (Stickers.length === 0) {
            return;
        }
        shelveStickers(Stickers);
        doDeleteStickers(Stickers);
    }
    /**** doCopyStickers ****/
    function doCopyStickers(Stickers) {
        if (Stickers.length === 0) {
            return;
        }
        shelveStickers(Stickers);
    }
    /**** doPasteShelvedStickers ****/
    function doPasteShelvedStickers() {
        const ShelfContents = shelvedStickers();
        if (ShelfContents.length === 0) {
            return;
        }
        doOperation(new SIM_StickerDeserializationOperation(ShelfContents, activeBoard, 0));
    }
    /**** doImportFromFile ****/
    function doImportFromFile(Event) {
        Event.stopPropagation();
        Event.preventDefault();
        let File = Event.target.files[0];
        if (File == null) {
            return;
        }
        let Reader = new FileReader();
        Reader.addEventListener('load', (Event) => handleFileLoaded(File, Event), false);
        Reader.readAsArrayBuffer(File);
    }
    function handleFileLoaded(File, Event) {
        Event.stopPropagation();
        Event.preventDefault();
        try {
            doImport((new TextDecoder()).decode(Event.target.result), File.type);
        }
        catch (Signal) {
            window.alert('File Read Error\n\n' + Signal);
        }
    }
    /**** doImport ****/
    function doImport(FileContent, Type) {
        var _a, _b;
        if (Type !== 'application/json') {
            window.alert('JSON or JavaScript file expected');
            return;
        }
        let Serialization;
        try {
            Serialization = JSON.parse(FileContent);
        }
        catch (Signal) {
            console.error(Signal);
            window.alert('file does not contain valid JSON');
            return;
        }
        if (ValueLooksLikeVariant(Serialization)) {
            registerVariant(Serialization); // *C* overwrite?
            return;
        }
        if (ValueLooksLikeBoard(Serialization)) {
            doOperation(new SIM_BoardDeserializationOperation([Serialization], activeBoard, ((_a = activeBoard.BoardList) !== null && _a !== void 0 ? _a : []).length)); // also selects and visits this board
            return;
        }
        if (ValueLooksLikeBoardList(Serialization)) {
            doOperation(new SIM_BoardDeserializationOperation(Serialization, activeBoard, ((_b = activeBoard.BoardList) !== null && _b !== void 0 ? _b : []).length)); // also selects these boards and visits the last one
            return;
        }
        if (ValueLooksLikeSticker(Serialization)) {
            doOperation(new SIM_StickerDeserializationOperation([Serialization], activeBoard, 0)); // also selects this sticker
            return;
        }
        if (ValueLooksLikeStickerList(Serialization)) {
            doOperation(new SIM_StickerDeserializationOperation(Serialization, activeBoard, 0)); // also selects these stickers
            return;
        }
        if (ValueLooksLikeProject(Serialization)) {
            if (OperationWasConfirmed('Project Import\n\n' +
                'You are about to replace the complete project (and only keep its name)')) {
                try {
                    const oldProject = curProject;
                    validateProjectDescriptor(Serialization);
                    const newProject = internalizedProject(Serialization);
                    newProject.Synopsis = '(imported)';
                    resetDesignerState(DesignerState); // but not completely
                    rerenderProject(newProject); // also affects the designer
                    setTimeout(() => {
                        window.alert('Project was imported\n\n' +
                            'The import will be persisted with the next change you make');
                        openDesigner();
                    }, 100);
                }
                catch (Signal) {
                    console.error(Signal);
                    window.alert('Project could not be imported\n\n' +
                        'The project import failed\n\nReason: ' + Signal);
                }
            }
            return;
        }
        window.alert('file does not contain valid SIM serializations');
    }
    /**** doExport ****/
    function doExport(Scope) {
        var _a, _b;
        let Serialization, suggestedFileName;
        switch (Scope) {
            case 'selected Variant':
                Serialization = externalizedVariant(DesignerState.selectedVariant);
                suggestedFileName = DesignerState.selectedVariant.replace(/\//g, '_') + '.json';
                break;
            case 'Project':
                Serialization = externalizedProject(curProject);
                suggestedFileName = curProject.Name + '.json';
                break;
            case 'active Board':
                Serialization = externalizedBoard(activeBoard);
                suggestedFileName = (activeBoard.Name || 'SIM-Board') + '.json';
                break;
            case 'selected Boards':
                const Boards = sortedBoardSelection();
                Serialization = Boards.map((Board) => externalizedBoard(Board));
                suggestedFileName = (((_a = Boards[0]) === null || _a === void 0 ? void 0 : _a.Name) || 'SIM-Board') + '.json';
                break;
            case 'selected Stickers':
                const Stickers = sortedStickerSelection();
                Serialization = Stickers.map((Sticker) => externalizedSticker(Sticker));
                suggestedFileName = (((_b = Stickers[0]) === null || _b === void 0 ? void 0 : _b.Name) || 'SIM-Stickers') + '.json';
                break;
            default:
                console.error('InvalidArgument: invalid download scope ' + quoted(Scope));
                return;
        }
        const SerializationString = JSON.stringify(Serialization);
        const encodedJSON = (new TextEncoder()).encode(SerializationString);
        const decodedJSON = (new TextDecoder()).decode(encodedJSON);
        if (SerializationString === decodedJSON) {
            download(encodedJSON, suggestedFileName, 'text/html;charset=utf-8');
        }
        else {
            window.alert('this export is not stable');
        }
    }
    /**** doVisitPrev/NextBoard ****/
    function doVisitPrevBoard() { visitPrevBoard(); }
    function doVisitNextBoard() { visitNextBoard(); }
    /**** doVisitBoard ****/
    function doVisitBoard(Board) {
        selectBoard(Board);
        visitBoard(Board);
    }
    /**** doVisitHomeBoard ****/
    function doVisitHomeBoard() {
        visitBoard(curProject.BoardList[0]);
    }
    /**** doCreateScreenshot ****/
    function doCreateScreenshot() {
        const selectedStickers = sortedStickerSelection();
        const VisualToRender = (selectedStickers.length === 1
            ? selectedStickers[0]
            : curProject);
        const { Width, Height } = (TypeOfVisual(VisualToRender) === 'project'
            ? GeometryOfProject(VisualToRender)
            : GeometryOfSticker(VisualToRender));
        const ViewElement = VisualToRender[$View];
        let { left: x, top: y } = ViewElement.getBoundingClientRect();
        x += window.scrollX;
        y += window.scrollY;
        const Canvas = document.createElement('canvas');
        Canvas.width = Width;
        Canvas.height = Height;
        const Context = Canvas.getContext('2d');
        DesignerState.DesignerDisabled = true;
        rerender();
        window.requestAnimationFrame(async () => {
            try {
                const Stream = await navigator.mediaDevices.getDisplayMedia({
                    // @ts-ignore TS2353 allow "preferCurrentTab"
                    video: true, preferCurrentTab: true
                });
                const Video = document.createElement('video');
                Video.srcObject = Stream;
                await Video.play();
                async function waitForVideo(Video) {
                    return new Promise((resolve) => {
                        if ((Video.videoWidth != null) && (Video.videoHeight != null)) {
                            return resolve();
                        }
                        const Timer = setInterval(() => {
                            if ((Video.videoWidth != null) && (Video.videoHeight != null)) {
                                clearInterval(Timer);
                                resolve();
                            }
                        }, 50);
                    });
                }
                await waitForVideo(Video);
                const ScaleX = Video.videoWidth / window.innerWidth;
                const ScaleY = Video.videoHeight / window.innerHeight;
                const scaledX = x * ScaleX, scaledWidth = Width * ScaleX;
                const scaledY = y * ScaleY, scaledHeight = Height * ScaleY;
                // @ts-ignore TS18047 "Context" is not null
                Context.drawImage(Video, scaledX, scaledY, scaledWidth, scaledHeight, 0, 0, Width, Height);
                Stream.getTracks().forEach((Track) => Track.stop());
                DesignerState.DesignerDisabled = false;
                rerender();
                const Name = (VisualToRender === curProject
                    ? activeBoard.Name || curProject.Name
                    : VisualToRender.Name || 'SIM-Screenshot.png');
                Canvas.toBlob((Blob) => {
                    download(Blob, Name, 'image/png'); // '.png' will be added by browser
                }, 'image/png');
            }
            catch (Signal) {
                console.error('Error while creating screenshot', Signal);
                DesignerState.DesignerDisabled = false;
                rerender();
                window.alert('Screenshot Error\n\n' + Signal);
            }
            console.log('needs rerender after');
        });
    }
    /**** doGenerateWebApp ****/
    function doGenerateWebApp(Mode) {
        const [Source, Extent, Modifiability] = Mode.split('|');
        const Serialization = WebAppSerializationFrom(Source);
        const withDesigner = (Modifiability === 'designable');
        generateWebAppFrom(Serialization, Extent, withDesigner);
    }
    /**** WebAppSerializationFrom ****/
    function WebAppSerializationFrom(Source) {
        if (Source === 'project') {
            return externalizedProject(curProject);
        }
        else {
            const selectedStickers = sortedStickerSelection();
            if (selectedStickers.length !== 1)
                throwError('InvalidSelection:exactly one sticker must be selected for Web App generation');
            const selectedSticker = selectedStickers[0];
            switch (selectedSticker.Variant) {
                case 'sim/special/applet':
                    throwError('NotYetImplemented:this feature has not yet been implemented');
                    break;
                case 'sim/special/single-page-applet':
                    const fullConfiguration = externalizedSticker(selectedSticker);
                    delete fullConfiguration.Variant;
                    delete fullConfiguration.Anchors;
                    delete fullConfiguration.Offsets;
                    const { Width, Height } = GeometryOfSticker(selectedSticker);
                    const { Name, StickerList } = fullConfiguration, AppletConfiguration = __rest(fullConfiguration, ["Name", "StickerList"]);
                    const Serialization = Object.assign(Object.assign({ Name: Name !== null && Name !== void 0 ? Name : 'SIM-Applet', Width, Height }, AppletConfiguration), { Boardlist: [{ StickerList }] });
                    return Serialization;
                default: throwError('InvalidStickerVariant:selected sticker is not suitable for Web App generation');
            }
        }
    }
    /**** doPrintProject ****/
    function doPrintProject() {
        DesignerState.DesignerDisabled = true;
        rerender();
        window.requestAnimationFrame(async () => {
            try {
                const PrinterFrame = document.createElement('iframe');
                PrinterFrame.style.position = 'absolute';
                PrinterFrame.style.top = '-1000000px';
                document.body.appendChild(PrinterFrame);
                const PrinterDoc = PrinterFrame.contentWindow.document;
                PrinterDoc.write('<html><head></head><body>');
                PrinterDoc.write(curProject.View.innerHTML);
                PrinterDoc.write('</body></html>');
                PrinterDoc.close();
                PrinterFrame.contentWindow.focus();
                PrinterFrame.contentWindow.print();
                window.addEventListener('afterprint', function () {
                    document.body.removeChild(PrinterFrame);
                    DesignerState.DesignerDisabled = false;
                    rerender();
                }, { once: true });
            }
            catch (Signal) {
                console.error('Error while printing', Signal);
                DesignerState.DesignerDisabled = false;
                rerender();
                window.alert('Print Error\n\n' + Signal);
            }
        });
    }
    /**** doRemoveLocalBackup ****/
    async function doRemoveLocalBackup() {
        if (OperationWasConfirmed('Project Backup Removal\n\n' +
            'You are about to remove the local backup of this project')) {
            await removeLocalBackupOfProject(curProject);
            setTimeout(() => {
                window.alert('Project Backup was removed\n\n' +
                    'Reload this page to make the removal permanent or apply any ' +
                    'change to create a new backup');
            }, 100);
        }
    }
    //------------------------------------------------------------------------------
    //--                                Generators                                --
    //------------------------------------------------------------------------------
    /**** generateWebAppFrom ****/
    function generateWebAppFrom(Serialization, Extent, withDesigner) {
        if (Extent === 'standalone') {
            generateStandaloneWebAppFrom(Serialization, withDesigner);
        }
        else {
            generateEmbeddableWebAppFrom(Serialization, withDesigner);
        }
    }
    /**** generateEmbeddableWebAppFrom ****/
    function generateEmbeddableWebAppFrom(Serialization, withDesigner) {
        const ProjectName = Serialization.Name;
        const ProjectSource = `
${'<'}script type="module">
  import { registerProject, html } from 'active-information-manager'
  registerProject(${JSON.stringify(Serialization)})
${'<'}/script>
    `;
        const encodedSource = (new TextEncoder()).encode(ProjectSource);
        const decodedSource = (new TextDecoder()).decode(encodedSource);
        if (ProjectSource === decodedSource) {
            download(encodedSource, ProjectName + '.html', 'text/html;charset=utf-8');
        }
        else {
            window.alert('this WebApp generation is not stable');
        }
    }
    /**** generateStandaloneWebAppFrom ****/
    function generateStandaloneWebAppFrom(Serialization, withDesigner) {
        const ProjectName = Serialization.Name;
        const { HeadExtensions, minWidth, maxWidth, minHeight, maxHeight, toBeCentered, withMobileFrame, expectedOrientation } = Serialization;
        const ProjectSource = `
  <!DOCTYPE html>
  <html lang="en" charset="utf-8" style="width:100%">
   <head>
    <meta charset="utf-8"/>

    <meta name="viewport"         content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="format-detection" content="telephone=no">

    <style>
      html { text-size-adjust:100% }

      html, body { width:100%; height:100%; width:100vw; height:100vh; margin:0px; padding:0px }
      html       { overflow:hidden scroll }

      html, body {
        background-color: white;
        background-image: url(/common/BinaryTexture_white.jpg);
        background-repeat:repeat;

        font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
        font-size:14px; font-weight:400; color:black;
        line-height:150%;
      }

    </style>
    <link rel="stylesheet" name="fontawesome" href="/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://rozek.github.io/marked-katex-extension/dist/katex.min.css">

    ${'<'}script type="importmap">
    {
      "imports": {
        "javascript-interface-library":"https://rozek.github.io/javascript-interface-library/dist/javascript-interface-library.esm.js",
        "htm/preact":                  "https://rozek.github.io/htm/preact/standalone.module.js",
        "preact":                      "https://rozek.github.io/htm/preact/standalone.module.js",
        "preact/compat":               "https://rozek.github.io/htm/preact/standalone.module.js",
        "preact/hooks":                "https://rozek.github.io/htm/preact/standalone.module.js",
        "auto-animate":                "https://rozek.github.io/smart-information-manager/js/auto-animate.esm.js",
        "nanoid":                      "https://rozek.github.io/nanoid/dist/nanoid.esm.js",
        "nanoid-dictionary":           "https://rozek.github.io/nanoid-dictionary/dist/nanoid-dictionary.esm.js",
        "svelte-coordinate-conversion":"https://rozek.github.io/svelte-coordinate-conversion/dist/svelte-coordinate-conversion.esm.js",
        "svelte-touch-to-mouse":       "https://rozek.github.io/svelte-touch-to-mouse/dist/svelte-touch-to-mouse.esm.js",

        "sim-components":           "https://rozek.github.io/sim-components/js/sim-components.esm.js",
        "smart-information-manager":"https://rozek.github.io/smart-information-manager/js/smart-information-manager.esm.js",

        "localforage":"https://rozek.github.io/smart-information-manager/js/localforage.esm.js",

        "marked":                "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js",
        "marked-katex-extension":"https://rozek.github.io/marked-katex-extension/dist/marked-katex-extension.esm.js",
        "marked-highlight":      "https://cdn.jsdelivr.net/npm/marked-highlight/+esm",
        "highlight.js/lib/core":                "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/highlight.min.js",
        "highlight.js/lib/languages/css":       "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/css.min.js",
        "highlight.js/lib/languages/javascript":"https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/javascript.min.js",
        "highlight.js/lib/languages/java":      "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/java.min.js",
        "highlight.js/lib/languages/json":      "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/json.min.js",
        "highlight.js/lib/languages/typescript":"https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/typescript.min.js",
        "highlight.js/lib/languages/xml":       "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/xml.min.js"
      }
    }
    ${'<'}/script>
    ${'<'}script src="https://rozek.github.io/smart-information-manager/js/localforage.min.js">${'<'}/script>
    ${'<'}script src="https://rozek.github.io/smart-information-manager/js/smart-information-manager.esm.js"  type="module">${'<'}/script>
    ${'<'}script src="https://rozek.github.io/download/download.min.js">${'<'}/script>

    ${HeadExtensions !== null && HeadExtensions !== void 0 ? HeadExtensions : ''}

    ${'<'}script type="module">
  import { registerProject, html } from 'smart-information-manager'
  registerProject(${JSON.stringify(Serialization)})
    ${'<'}/script>

    ${'<'}script>
    let [
      minWidth,maxWidth, minHeight,maxHeight, toBeCentered,
      withMobileFrame,expectedOrientation
    ] = [
      ${minWidth},${maxWidth}, ${minHeight},${maxHeight}, ${toBeCentered},
      ${withMobileFrame},'${expectedOrientation}'
    ]

    const ViewportWidth  = window.innerWidth
    const ViewportHeight = window.innerHeight

    let Width  = Math.max(minWidth  ?? 0, Math.min(ViewportWidth,  maxWidth  == null ? Infinity : maxWidth))
    let Height = Math.max(minHeight ?? 0, Math.min(ViewportHeight, maxHeight == null ? Infinity : maxHeight))
                          // uses any available space - does not use designer size

    if ((Width >= ViewportWidth) && (Height >= ViewportHeight)) {
      withMobileFrame = false
    }

    let OffsetX = (
      (Width < ViewportWidth) && toBeCentered
      ? Math.floor((ViewportWidth-Width)/2)
      : 0
    )
    let OffsetY = (
      (Height < ViewportHeight) && toBeCentered
      ? Math.floor((ViewportHeight-Height)/2)
      : 0
    )

    if (withMobileFrame) {
      Width  += 10;  OffsetX -= 5
      Height += 10;  OffsetY -= 5

      if (minWidth  != null) { minWidth  += 10 }
      if (minHeight != null) { minHeight += 10 }

      if (maxWidth  != null) { maxWidth  += 10 }
      if (maxHeight != null) { maxHeight += 10 }
    }

    document.write(\`
    <sim-project name="${ProjectName}" class="${withMobileFrame ? 'withMobileFrame' : ''}" style="
      display:block; position:absolute;
      left:\${OffsetX}px; top:\${OffsetY}px; width:\${Width}px; height:\${Height}px;
      \${minWidth  == null ? '' : \`min-width:\${minWidth}px; \`}
      \${maxWidth  == null ? '' : \`max-width:\${maxWidth}px; \`}
      \${minHeight == null ? '' : \`min-height:\${minHeight}px; \`}
      \${maxHeight == null ? '' : \`max-height:\${maxHeight}px; \`}
      box-shadow:0px 0px 10px 0px black;
    " with-designer=${withDesigner}></sim-project>
    \`)
    ${'<'}/script>
   </head>
   <body></body>
  </html>
      `.trim();
        const encodedSource = (new TextEncoder()).encode(ProjectSource);
        const decodedSource = (new TextDecoder()).decode(encodedSource);
        if (ProjectSource === decodedSource) {
            download(encodedSource, ProjectName + '.html', 'text/html;charset=utf-8');
        }
        else {
            window.alert('this WebApp generation is not stable');
        }
    }
    /**** return actual Designer API ****/
    return {
        ProjectState, Project: curProject, activeBoard, DesignerState,
        rerender, rerenderProject,
        openDialog, closeDialog, closeAllDialogs,
        openDialogs, DialogIsOpen,
        DialogIsFrontmost, bringDialogToFront,
        openDesigner, closeDesigner,
        openToolbox, closeToolbox,
        openDesignerTool, closeDesignerTool, toggleDesignerTool,
        selectVariants,
        selectVariant, deselectVariant, deselectAllVariants, VariantIsSelected,
        sortedVariantSelection, VariantSelection, sanitizeVariantSelection,
        selectBoards,
        selectBoard, deselectBoard, deselectAllBoards, BoardIsSelected,
        sortedBoardSelection, BoardSelection, sanitizeBoardSelection,
        selectStickers,
        selectSticker, deselectSticker, deselectAllStickers, StickerIsSelected,
        sortedStickerSelection, StickerSelection, sanitizeStickerSelection,
        shelveStickers, shelvedStickers,
        mayVisitPrevBoard, mayVisitNextBoard, visitPrevBoard, visitNextBoard,
        visitBoard, sanitizeVisitedBoard,
        mayUndo, mayRedo, doOperation, undoOperation, redoOperation,
        selectedBoardsMayBeMovedIn, selectedBoardsMayBeMovedOut,
        selectedBoardsMayBeMovedUp, selectedBoardsMayBeMovedDown,
        selectedStickersMayBeMovedIn, selectedStickersMayBeMovedOut,
        selectedStickersMayBeMovedUp, selectedStickersMayBeMovedDown,
        doCreateNewVariant, doConfigureSelectedVariants,
        doActivateSelectedVariantScripts, doDeleteSelectedVariants,
        doConfigureProject, doActivateProjectScript,
        doCreateNewBoard, doDuplicateSelectedBoards,
        doConfigureVisitedBoard, doConfigureSelectedBoards,
        doActivateVisitedBoardScript, doActivateSelectedBoardsScript,
        doMoveSelectedBoards, doVisitSelectedBoard,
        doMoveSelectedBoardsIn, doMoveSelectedBoardsOut,
        doShiftSelectedBoardsToTop, doShiftSelectedBoardsUp,
        doShiftSelectedBoardsDown, doShiftSelectedBoardsToBottom,
        doDeleteSelectedBoards,
        doCreateNewSticker, doDuplicateSelectedStickers,
        doConfigureSelectedStickers, doActivateSelectedStickerScripts,
        doChangeGeometryOfSelectedStickers, doChangeAnchorsOfSelectedStickers,
        doChangeOffsetsOfSelectedStickers,
        doChangeGeometriesBy,
        doMoveSelectedStickers,
        doMoveSelectedStickersIn, doMoveSelectedStickersOut,
        doShiftSelectedStickersToTop, doShiftSelectedStickersUp,
        doShiftSelectedStickersDown, doShiftSelectedStickersToBottom,
        doDeleteStickers,
        doCutStickers, doCopyStickers,
        doPasteShelvedStickers,
        doImport, doImportFromFile, doExport,
        doVisitPrevBoard, doVisitNextBoard, doVisitBoard, doVisitHomeBoard,
        doCreateScreenshot, doGenerateWebApp, doPrintProject,
        doRemoveLocalBackup,
    };
}
//------------------------------------------------------------------------------
//--                              DesignerLayer                               --
//------------------------------------------------------------------------------
function SIM_DesignerLayer(PropSet) {
    return safelyRendered(() => {
        let [ProjectRef] = parsedPropSet(PropSet, mandatoryValue('projectref', () => true));
        const ProjectElement = ProjectRef.current;
        const { Project, DesignerState, DesignerDisabled, sanitizeVariantSelection, sanitizeBoardSelection, sanitizeStickerSelection, sanitizeVisitedBoard } = DesignerAPI();
        if (DesignerState.DesignerDisabled) {
            return;
        } // during a screenshot
        const DesignerIsOpen = DesignerState.isOpen;
        const DesignerIsClosed = !DesignerIsOpen;
        if (DesignerIsOpen) {
            sanitizeVisitedBoard();
            sanitizeVariantSelection();
            sanitizeBoardSelection();
            sanitizeStickerSelection();
        }
        /**** keep track of the geometry of all open dialogs ****/
        const DialogList = Project[$DesignerDialogs];
        DialogList.forEach((Dialog) => {
            const { Name, OffsetX, OffsetY, Width, Height } = Dialog;
            Object.assign(DesignerState[Name], { x: OffsetX, y: OffsetY, Width, Height });
        }); // without rerendering, of course
        /**** actual rendering ****/
        const RenderingContext = useRenderingContext(); // also enforces rendering
        return html `<div class="sim-designer-layer">
        <${SIM_RenderingContext.Provider} value=${Object.assign(Object.assign({}, RenderingContext), { inDesigner: true })}>
          ${DesignerIsClosed && html `<${SIM_DesignerButton} ProjectElement=${ProjectElement}/>`}
          ${DesignerIsOpen && html `<${renderedDialogs} DialogList=${DialogList} ProjectRef=${ProjectRef}/>`}
        </>
      </>`;
    });
}
//------------------------------------------------------------------------------
//--                            SIM_DesignerButton                            --
//------------------------------------------------------------------------------
function SIM_DesignerButton(PropSet) {
    return safelyRendered(() => {
        let [ProjectElement] = parsedPropSet(PropSet, optionalValue('projectelement', () => true));
        if (ProjectElement == null) {
            return;
        } // is initially missing
        const { DesignerState, openDesigner, rerender } = DesignerAPI();
        const { DesignerButton } = DesignerState;
        let { x, y, isDragging } = DesignerButton;
        /**** repositioning on viewport ****/
        let { left, top, width, height } = ProjectElement.getBoundingClientRect();
        if (isNaN(x) || isNaN(y)) {
            if (isNaN(x)) {
                x = width - 34;
            }
            if (isNaN(y)) {
                y = 4;
            }
            Object.assign(DesignerState.DesignerButton, { isDragging, x, y });
        }
        /**** clicking and dragging ****/
        const ViewRef = useRef();
        const DragInfo = useRef({ x: 0, y: 0 }); // drag start position
        const handlePointerDown = useClickDragging({
            ViewRef,
            ClickRadius: 4, MultiClickLimit: 1,
            onClick: openDesigner,
            onDragStart: (dx, dy) => startDragging(),
            onDragContinuation: (dx, dy) => moveButtonBy(dx, dy, true),
            onDragFinish: (dx, dy) => moveButtonBy(dx, dy, false),
            onDragCancellation: (dx, dy) => moveButtonBy(dx, dy, false),
        });
        const startDragging = useCallback(() => {
            const { x, y } = DesignerState.DesignerButton;
            DragInfo.current = { x, y };
        }, [DesignerState]);
        const moveButtonBy = useCallback((dx, dy, isDragging) => {
            const x = DragInfo.current.x + dx; // constraints will be...
            const y = DragInfo.current.y + dy; // ...integrated in main code
            Object.assign(DesignerState.DesignerButton, { isDragging, x, y });
            rerender();
        }, [DesignerState, rerender]);
        /**** positioning within viewport ****/
        left = Math.max(0, Math.min(left + x, document.documentElement.clientWidth - 32));
        top = Math.max(0, Math.min(top + y, document.documentElement.clientHeight - 32));
        /**** actual rendering ****/
        const RenderingContext = useRenderingContext(); // also enforces rendering
        return html `<div class="sim-designer-button" style="
        left:${left}px; top:${top}px;
        cursor:${isDragging ? 'grabbing' : 'grab'}
      " ref=${ViewRef} onPointerDown=${handlePointerDown}
      ><img src="${IconFolder}/pen.png" style="position:relative; top:2px"/></>`;
    });
}
/**** ToolboxRenderer ****/
const ToolboxRenderer = (PropSet) => {
    const { DesignerState, rerender, sortedStickerSelection, shelvedStickers, mayVisitPrevBoard, mayVisitNextBoard, doVisitPrevBoard, doVisitNextBoard, mayUndo, mayRedo, undoOperation, redoOperation, doCreateNewSticker, doCutStickers, doCopyStickers, doPasteShelvedStickers, doDeleteStickers, doImportFromFile, doExport, doCreateScreenshot, doGenerateWebApp, doPrintProject, openDesignerTool, closeDesignerTool, DialogIsOpen, } = DesignerAPI();
    const selectedVariants = DesignerState.selectedVariants;
    const selectedBoards = DesignerState.selectedBoards;
    const selectedStickers = sortedStickerSelection();
    const selectedStickerIsApplet = ((selectedStickers.length === 1) &&
        (selectedStickers.values().next().value.Variant === 'sim/special/single-page-applet'));
    const toggleLayouting = () => {
        DesignerState.isLayouting = !DesignerState.isLayouting;
        rerender();
    };
    const toggleDialog = (Name, Event) => {
        if (DialogIsOpen(Name)) {
            closeDesignerTool(Name);
        }
        else {
            openDesignerTool(Name, Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
    };
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        LayouterToggle: { Value: `${IconFolder}/draw-square.png` },
        //    StickerChoice:    { Icon: `${IconFolder}/plus.png`, Options:[], Value:'' },
        InspectorButton: { Value: `${IconFolder}/pen-ruler.png` },
        ExecutionToggle: { Value: `${IconFolder}/snooze.png` },
        AIConfiguratorButton: { Value: `${IconFolder}/message-circle-question.png` },
        AIChatButton: { Value: `${IconFolder}/message-circle-chat.png` },
        AIBuddyButton: { Value: `${IconFolder}/graduation-hat-alt-2.png` },
        xxx: { Value: `${IconFolder}/placeholder.png` },
        CutButton: { Value: `${IconFolder}/scissors.png` },
        CopyButton: { Value: `${IconFolder}/clipboard-arrow-up.png` },
        PasteButton: { Value: `${IconFolder}/clipboard-arrow-down.png` },
        DeleteButton: { Value: `${IconFolder}/minus.png` },
        UndoButton: { Value: `${IconFolder}/rotate-ccw.png` },
        RedoButton: { Value: `${IconFolder}/rotate-cw.png` },
        UploadButton: { Icon: `${IconFolder}/arrow-up-from-bracket.png` },
        DownloadButton: { Icon: `${IconFolder}/arrow-down-to-bracket.png`, Options: [], Value: '' },
        VisitPrevButton: { Value: `${IconFolder}/chevron-left.png` },
        VisitNextButton: { Value: `${IconFolder}/chevron-right.png` },
        SearchButton: { Value: `${IconFolder}/search-alt-2.png` },
        SettingsButton: { Value: `${IconFolder}/gear.png` },
        ConsoleButton: { Value: `${IconFolder}/terminal.png` },
        ScreenshotButton: { Value: `${IconFolder}/clapperboard.png` },
        //    GeneratorButton:  { Icon: `${IconFolder}/clapperboard-play.png`, Options:[], Value:'' },
        PrintButton: { Value: `${IconFolder}/printer.png` },
    });
    configure({
        LayouterToggle: {
            active: DesignerState.isLayouting,
            onClick: toggleLayouting,
        },
        StickerChoice: {
            onInput: (Event) => {
                doCreateNewSticker(Event.target.value);
                Event.target.value = '-';
            },
        },
        InspectorButton: {
            active: DialogIsOpen('Inspector'),
            onClick: (Event) => toggleDialog('Inspector', Event),
        },
        ExecutionToggle: {
            disabled: true,
        },
        AIConfiguratorButton: {
            active: DialogIsOpen('AIConfigurator'),
            onClick: (Event) => toggleDialog('AIConfigurator', Event),
        },
        AIChatButton: {
            active: DialogIsOpen('AIChat'),
            onClick: (Event) => toggleDialog('AIChat', Event),
        },
        AIBuddyButton: {
            active: DialogIsOpen('AIBuddy'),
            onClick: (Event) => toggleDialog('AIBuddy', Event),
        },
        xxx: {},
        CutButton: {
            disabled: (selectedStickers.length === 0) || selectedStickers.some((Sticker) => Sticker.permanent == true),
            onClick: () => doCutStickers(selectedStickers),
        },
        CopyButton: {
            disabled: selectedStickers.length === 0,
            onClick: () => doCopyStickers(selectedStickers),
        },
        PasteButton: {
            disabled: shelvedStickers.length === 0,
            onClick: doPasteShelvedStickers,
        },
        DeleteButton: {
            disabled: (selectedStickers.length === 0) || selectedStickers.some((Sticker) => Sticker.permanent == true),
            onClick: () => doDeleteStickers(selectedStickers),
        },
        UndoButton: {
            disabled: !mayUndo(),
            onClick: undoOperation,
        },
        RedoButton: {
            disabled: !mayRedo(),
            onClick: redoOperation,
        },
        UploadButton: {
            onValueInput: (ValueList, Event) => {
                doImportFromFile(Event);
                Event.target.value = null;
            },
        },
        DownloadButton: {
            Options: [
                ':-please select', '----',
                (selectedVariants.size === 0 ? '-' : '') + 'selected Variants',
                'Project', 'active Board',
                (selectedBoards.size === 0 ? '-' : '') + 'selected Boards',
                (selectedStickers.length === 0 ? '-' : '') + 'selected Stickers'
            ],
            onValueInput: (Value, Event) => {
                doExport(Event.target.value);
                Event.target.value = '';
            },
        },
        VisitPrevButton: {
            disabled: !mayVisitPrevBoard(),
            onClick: doVisitPrevBoard,
        },
        VisitNextButton: {
            disabled: !mayVisitNextBoard(),
            onClick: doVisitNextBoard,
        },
        SearchButton: {
            active: DialogIsOpen('SearchDialog'),
            onClick: (Event) => toggleDialog('SearchDialog', Event),
        },
        SettingsButton: {
            active: DialogIsOpen('Configurator'),
            onClick: (Event) => toggleDialog('Configurator', Event),
        },
        ConsoleButton: {
            active: DialogIsOpen('Console'),
            onClick: (Event) => toggleDialog('Console', Event),
        },
        ScreenshotButton: {
            onClick: doCreateScreenshot,
        },
        GeneratorButton: {
            onInput: (Event) => {
                doGenerateWebApp(Event.target.value);
                Event.target.value = '';
            },
        },
        PrintButton: {
            onClick: doPrintProject
        },
    });
    /**** actual rendering ****/
    return html `
      <${sim.tabular} columns=${4} rowgap=${6} colgap=${6} style="
        position:absolute; left:6px; top:6px;
      ">
        <${sim.Icon} ...${Configuration.LayouterToggle}/>
        <label class="sim-component pseudo-dropdown">
          <div style="
            -webkit-mask-image:url(${IconFolder}/plus.png); mask-image:url(${IconFolder}/plus.png);
            background-color:black;
          "/>
          <select ...${Configuration.StickerChoice}>
            <option disabled selected value="">please select</>
            <option disabled                  >----</>
            ${nestedOptionListForVariants()}
          </select>
        </label>
        <${sim.Icon} ...${Configuration.InspectorButton}/>
        <${sim.Icon} ...${Configuration.ExecutionToggle}/>

        <${sim.Icon} ...${Configuration.AIConfiguratorButton}/>
        <${sim.Icon} ...${Configuration.AIChatButton}/>
        <${sim.Icon} ...${Configuration.AIBuddyButton}/>
        <${sim.Icon} ...${Configuration.xxx}/>

        <${sim.Icon} ...${Configuration.CutButton}/>
        <${sim.Icon} ...${Configuration.CopyButton}/>
        <${sim.Icon} ...${Configuration.PasteButton}/>
        <${sim.Icon} ...${Configuration.DeleteButton}/>

        <${sim.Icon} ...${Configuration.UndoButton}/>
        <${sim.Icon} ...${Configuration.RedoButton}/>
        <${sim.PseudoFileInput} ...${Configuration.UploadButton}/>
        <${sim.PseudoDropDown}  ...${Configuration.DownloadButton}/>

        <${sim.Icon} ...${Configuration.VisitPrevButton}/>
        <${sim.Icon} ...${Configuration.VisitNextButton}/>
        <${sim.Icon} ...${Configuration.SearchButton}/>
        <${sim.Icon} ...${Configuration.SettingsButton}/>

        <${sim.Icon} ...${Configuration.ConsoleButton}/>
        <${sim.Icon} ...${Configuration.ScreenshotButton}/>
        <label class="sim-component pseudo-dropdown">
          <div style="
            -webkit-mask-image:url(${IconFolder}/clapperboard-play.png); mask-image:url(${IconFolder}/clapperboard-play.png);
            background-color:black;
          "/>
          <select ...${Configuration.GeneratorButton}>
            <option disabled selected value="">please select</>
            <option disabled                  >----</>
            <optgroup label="from whole Project">
              <option value="project|standalone|designable">standalone, with Designer</>
              <option value="project|standalone|fixed">standalone, without Designer</>
              <option value="project|embeddable|designable">embeddable, with Designer</>
              <option value="project|embeddable|fixed">embeddable, without Designer</>
            </>
            <optgroup label="from selected Applet Sticker" disabled=${!selectedStickerIsApplet}>
              <option value="sticker|standalone|designable">standalone, with Designer</>
              <option value="sticker|standalone|fixed">standalone, without Designer</>
              <option value="sticker|embeddable|designable">embeddable, with Designer</>
              <option value="sticker|embeddable|fixed">embeddable, without Designer</>
            </>
          </select>
        </label>
        <${sim.Icon} ...${Configuration.PrintButton}/>
      </>
    `;
};
/**** InspectorRenderer ****/
const InspectorRenderer = (PropSet) => {
    const { DesignerState, rerender, } = DesignerAPI();
    const { activeTabIndex } = DesignerState.Inspector;
    /**** switchTab ****/
    function switchTab(TabIndex) {
        DesignerState.Inspector.activeTabIndex = TabIndex;
        rerender();
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        VariantBrowserButton: { Value: `${IconFolder}/shapes.png` },
        VariantConfiguratorButton: { Value: `${IconFolder}/pen-square.png` },
        ProjectConfiguratorButton: { Value: `${IconFolder}/book-open.png` },
        BoardBrowserButton: { Value: `${IconFolder}/files.png` },
        BoardConfiguratorButton: { Value: `${IconFolder}/file-pencil-alt-1.png` },
        StickerBrowserButton: { Value: `${IconFolder}/rectangles-mixed.png` },
        StickerConfiguratorButton: { Value: `${IconFolder}/money-check-pen.png` },
        ErrorView: { Placeholder: '' },
        ErrorButton: { Icon: `${IconFolder}/triangle-exclamation.png` },
    });
    configure({
        TabStrip: { activeIndex: activeTabIndex, onActivationChange: switchTab },
        Deck: { activeIndex: activeTabIndex },
        ErrorButton: { disabled: true }
    });
    /**** actual rendering ****/
    return html `
    <${sim.vertical} style="padding:4px">
      <${sim.TabStrip} ...${Configuration.TabStrip} style="padding:4px">
        <${sim.Icon} ...${Configuration.VariantBrowserButton}/>
        <${sim.Icon} ...${Configuration.VariantConfiguratorButton}/>
        <${sim.Icon} ...${Configuration.ProjectConfiguratorButton}/>
        <${sim.Icon} ...${Configuration.BoardBrowserButton}/>
        <${sim.Icon} ...${Configuration.BoardConfiguratorButton}/>
        <${sim.Icon} ...${Configuration.StickerBrowserButton}/>
        <${sim.Icon} ...${Configuration.StickerConfiguratorButton}/>
      </>
      <${sim.horizontalSeparator}/>
      <${sim.selective} ...${Configuration.Deck} style="
        width:100%; flex:1 1 auto; overflow:hidden;
      ">
        <${activeTabIndex === 0 ? VariantBrowser : sim.Dummy}/>
        <${activeTabIndex === 1 ? VariantConfigurator : sim.Dummy}/>
        <${activeTabIndex === 2 ? ProjectConfigurator : sim.Dummy}/>
        <${activeTabIndex === 3 ? BoardBrowser : sim.Dummy}/>
        <${activeTabIndex === 4 ? BoardConfigurator : sim.Dummy}/>
        <${activeTabIndex === 5 ? StickerBrowser : sim.Dummy}/>
        <${activeTabIndex === 6 ? StickerConfigurator : sim.Dummy}/>
      </>
      <${sim.horizontalSeparator} style="margin-top:4px"/>
      <${sim.horizontal} style="padding:4px 0px 4px 0px">
        <${sim.TextlineInput} readonly ...${Configuration.ErrorView} style="flex:1 1 auto"/>
        <${sim.Spacer} style="width:8px"/>
        <${sim.Icon} ...${Configuration.ErrorButton}/>
      </>
    </>
    `;
};
/**** VariantBrowser ****/
const VariantBrowser = (PropSet) => {
    var _a;
    const { DesignerState, rerender, selectVariants, doCreateNewVariant, doDeleteSelectedVariants, } = DesignerAPI();
    const VariantBrowser = DesignerState.Inspector.VariantBrowser;
    const selectedVariants = DesignerState.selectedVariants;
    const List = nestedVariantList(); // always created from scratch
    // i.e., referentially unstable!
    const selectedItems = [];
    List.forEach((ItemGroup) => {
        ItemGroup.Contents.forEach((Item) => {
            if (selectedVariants.has(Item.Variant)) {
                selectedItems.push(Item);
            }
        });
    });
    function updateVariantSelection(selectedItems) {
        selectVariants(selectedItems.map((Item) => Item.Variant));
    }
    const expandedGroups = VariantBrowser.expandedGroupNames.map((GroupName) => List.find((Group) => Group.Label === GroupName)).filter((Item) => (Item != null) // just for safety reasons
    );
    function updateExpansion(expandedItems) {
        VariantBrowser.expandedGroupNames = expandedItems.map((Item) => Item.Label);
    }
    const ScrollPosition = (_a = VariantBrowser.ScrollPosition) !== null && _a !== void 0 ? _a : 0;
    function updateScrollPosition(Event) {
        VariantBrowser.ScrollPosition = Event.target.scrollTop;
    }
    const VariantsMayBeDeleted = ((selectedVariants.size > 0) &&
        [...selectedVariants].every((Variant) => !VariantIsIntrinsic(Variant.Name)));
    const VariantMayBeCreated = (ValueIsPath(VariantBrowser.newVariantName) &&
        VariantBrowser.newVariantName.includes('/') &&
        !(_normalizedPath(VariantBrowser.newVariantName) in VariantRegistry));
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        StickerListView: { style: 'width:100%; flex:1 0 auto' },
        DeletionButton: { Value: `${IconFolder}/minus.png` },
        CreationButton: { Value: `${IconFolder}/plus.png` },
        NameInput: {
            style: 'width:100%',
            Placeholder: '(full name of new sticker variant)',
        },
    });
    configure({
        StickerListView: {
            List,
            KeyOfListItem: (Item) => (Item.Group == null ? Item.Label : Item.Group + '/' + Item.Label),
            ListItemRenderer: (Item) => Item.Label,
            ContentOfListItem: (Item) => Item.Contents,
            ContainerOfListItem: (Item) => List.find((Item) => Item.Label === Item.Group),
            ItemMayBeSelected: (Item) => Item.Group != null,
            selectedItems,
            onSelectionChange: updateVariantSelection,
            ItemMayBeExpanded: (Item) => Item.Group == null,
            expandedItems: expandedGroups,
            onExpansionChange: updateExpansion,
            scrollTop: ScrollPosition,
            onScroll: updateScrollPosition,
        },
        DeletionButton: {
            disabled: !VariantsMayBeDeleted,
            onClick: () => doDeleteSelectedVariants(),
        },
        CreationButton: {
            disabled: !VariantMayBeCreated,
            onClick: () => doCreateNewVariant(VariantBrowser.newVariantName),
        },
        NameInput: {
            invalid: !ValueIsPath(VariantBrowser.newVariantName),
            onValueInput: (Value) => {
                VariantBrowser.newVariantName = Value;
                rerender(); // i.e., update enablings
            },
        },
    });
    /**** actual rendering ****/
    return html `<${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto">
      <${sim.horizontal}>
        <${sim.Subtitle}>Sticker Variants</>
        <${sim.expandingSpacer}/>
        <${sim.Icon} ...${Configuration.DeletionButton}/>
      </>
      <${sim.NestedListView} ...${Configuration.StickerListView} style="width:100%; flex:1 1 auto"/>
      <${sim.horizontalSeparator} style="padding-top:10px"/>
      <${sim.horizontal}>
        <${sim.Label}>Full Name of new Sticker Variant (i.e., with Group)</>
        <${sim.expandingSpacer}/>
        <${sim.Icon} ...${Configuration.CreationButton}/>
      </>
      <${sim.TextlineInput} ...${Configuration.NameInput}/>
    </>`;
};
/**** VariantConfigurator ****/
const VariantConfigurator = (PropSet) => {
    var _a;
    const { DesignerState, VariantSelection, doConfigureSelectedVariants, doActivateSelectedVariantScripts, DialogIsOpen, openDesignerTool, } = DesignerAPI();
    const VariantConfigurator = DesignerState.Inspector.VariantConfigurator;
    const scrollablePane = useRef();
    const ScrollPosition = (_a = VariantConfigurator.ScrollPosition) !== null && _a !== void 0 ? _a : 0;
    function updateScrollPosition(Event) {
        VariantConfigurator.ScrollPosition = Event.target.scrollTop;
    }
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition, [ScrollPosition]);
    const selectedVariants = VariantSelection();
    const disabled = ((selectedVariants.size === 0) ||
        selectedVariants.some((Variant) => VariantIsIntrinsic(Variant.Name)));
    function commonValue(PropertyName) {
        return commonValueOf(selectedVariants.map((Variant) => Variant[PropertyName]));
    }
    const activeScript = commonValue('Script');
    const pendingScript = commonValue('pendingScript');
    const ScriptIsPending = (pendingScript != null) && !ValueIsSpecial(pendingScript);
    const ScriptMayBeDeleted = (pendingScript == null) && (activeScript != null) && !ValueIsSpecial(activeScript);
    /**** changePendingScript ****/
    function changePendingScript(Script) {
        doConfigureSelectedVariants('pendingScript', Script);
    }
    /**** applyPendingScript ****/
    function applyPendingScript() {
        doActivateSelectedVariantScripts();
    }
    /**** withdrawPendingScript ****/
    function withdrawPendingScript() {
        doConfigureSelectedVariants('pendingScript', '');
    }
    /**** Property Descriptor Handling ****/
    let editablePropertyDescriptors = undefined;
    try {
        const PropertyDescriptors = commonValue('PropertyDescriptors');
        editablePropertyDescriptors = JSON.stringify(PropertyDescriptors, null, 2);
    }
    catch (Signal) {
        // nop - for now
    }
    function changePropertyDescriptors(editablePropertyDescriptors) {
        try {
            const PropertyDescriptors = JSON.parse(editablePropertyDescriptors);
            doConfigureSelectedVariants('PropertyDescriptors', PropertyDescriptors);
        }
        catch (Signal) {
            // nop - for now
        }
    }
    /**** initial Configuration Handling ****/
    let editableInitialConfiguration = undefined;
    try {
        const initialConfiguration = commonValue('initialConfiguration');
        editableInitialConfiguration = JSON.stringify(initialConfiguration, null, 2);
    }
    catch (Signal) {
        // nop - for now
    }
    function changeInitialConfiguration(editableInitialConfiguration) {
        try {
            const initialConfiguration = JSON.parse(editableInitialConfiguration);
            // *C* validate configuration
            doConfigureSelectedVariants('initialConfiguration', initialConfiguration);
        }
        catch (Signal) {
            // nop - for now
        }
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        GroupInput: { style: 'width:100%' },
        NameInput: { style: 'width:100%' },
        SynopsisEditorButton: { Value: `${IconFolder}/square-code.png` },
        SynopsisInput: {
            Placeholder: '(brief variant description)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        StylesheetInput: {
            Placeholder: '(type-specific stylesheet)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        initialWidthInput: { style: 'width:70px', Minimum: 0 },
        initialHeightInput: { style: 'width:70px', Minimum: 0 },
        ScriptEditorButton: { Value: `${IconFolder}/square-code.png` },
        ApplyScriptButton: { Value: `${IconFolder}/check.png` },
        WithdrawScriptButton: { Value: `${IconFolder}/xmark.png` },
        DeleteScriptButton: { Value: `${IconFolder}/delete-left.png` },
        ScriptInput: {
            Placeholder: '(rendering script)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        PropertyDescriptorInput: {
            Placeholder: '(type-specific configurable properties)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        InitialConfigurationInput: {
            Placeholder: '(type-specific initial configuration)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
    });
    configure({
        GroupInput: { Value: commonValueOf(selectedVariants.map((Variant) => GroupOfVariant(Variant))) },
        NameInput: { Value: commonValueOf(selectedVariants.map((Variant) => NameOfVariant(Variant))) },
        SynopsisEditorButton: {
            active: DialogIsOpen('SynopsisEditor') && (DesignerState.SynopsisEditor.Scope === 'Variant'),
            onClick: () => openDesignerTool('SynopsisEditor')
        },
        SynopsisInput: {
            disabled,
            Value: commonValue('Synopsis'),
            onValueInput: (Value) => doConfigureSelectedVariants('Synopsis', Value),
        },
        StylesheetInput: {
            disabled,
            Value: commonValue('Stylesheet'),
            onValueInput: (Value) => doConfigureSelectedVariants('Stylesheet', Value),
        },
        initialWidthInput: {
            disabled,
            Value: commonValue('initialWidth'),
            onValueInput: (Value) => doConfigureSelectedVariants('initialWidth', Value),
        },
        initialHeightInput: {
            disabled,
            Value: commonValue('initialHeight'),
            onValueInput: (Value) => doConfigureSelectedVariants('initialHeight', Value),
        },
        ScriptEditorButton: {
            active: DialogIsOpen('ScriptEditor') && (DesignerState.ScriptEditor.Scope === 'Variant'),
            onClick: () => openDesignerTool('ScriptEditor')
        },
        ApplyScriptButton: {
            disabled: disabled || !ScriptIsPending,
            onClick: () => applyPendingScript(),
        },
        WithdrawScriptButton: {
            disabled: disabled || !ScriptIsPending,
            onClick: () => withdrawPendingScript(),
        },
        DeleteScriptButton: {
            disabled: !ScriptMayBeDeleted,
            onClick: () => applyPendingScript(),
        },
        ScriptInput: {
            disabled,
            Value: pendingScript !== null && pendingScript !== void 0 ? pendingScript : activeScript,
            onValueInput: (Value) => changePendingScript(Value),
        },
        PropertyDescriptorInput: {
            disabled,
            Value: editablePropertyDescriptors,
            onValueInput: (Value) => changePropertyDescriptors(Value),
        },
        InitialConfigurationInput: {
            disabled,
            Value: editableInitialConfiguration,
            onValueInput: (Value) => changeInitialConfiguration(Value),
        },
    });
    /**** actual rendering ****/
    return html `<${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto; overflow:hidden">
      <${sim.Subtitle}>Sticker Variant Configuration</>
    <${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto; overflow:hidden scroll"
      ref=${scrollablePane} onScroll=${updateScrollPosition}
    >
      <${sim.tabular} columns=${2} colgap=${10} rowgap=${4}
        column-classes="plain expanding"
        style="width:100%; margin-top:4px"
      >
        <${sim.Label}>Group</>
        <${sim.TextlineInput} readonly ...${Configuration.GroupInput}/>

        <${sim.Label}>Name</>
        <${sim.TextlineInput} readonly ...${Configuration.NameInput}/>
      </>

      <${sim.horizontal}>
        <${sim.Label}>Synopsis</>
        <div style="width:10px"/>
        <${sim.Icon} ...${Configuration.SynopsisEditorButton}/>
      </>
      <${sim.TextInput} ...${Configuration.SynopsisInput}/>

      <${sim.Label}>Stylesheet</>
      <${sim.TextInput} ...${Configuration.StylesheetInput}/>

      <${sim.horizontal}>
        <${sim.Label}>initial Size (w,h) [px]</>
        <${sim.expandingSpacer}/>
        <${sim.NumberInput} ...${Configuration.initialWidthInput}/>
        <${sim.Description} style="width:10px; text-align:center">x</>
        <${sim.NumberInput} ...${Configuration.initialHeightInput}/>
      </>

      <${sim.horizontal}>
        <${sim.Label}>Script</>
        <div style="width:10px"/>
        <${sim.Icon} ...${Configuration.ScriptEditorButton}/>
        <${sim.expandingSpacer}/>
        <${sim.Icon} ...${Configuration.ApplyScriptButton}/>
        <div style="width:10px"/>
        <${sim.Icon} ...${Configuration.WithdrawScriptButton}/>
        <div style="width:40px"/>
        <${sim.Icon} ...${Configuration.DeleteScriptButton}/>
      </>
      <${sim.TextInput} ...${Configuration.ScriptInput}/>

      <${sim.Label}>Property Descriptors (JSON-List)</>
      <${sim.TextInput} ...${Configuration.PropertyDescriptorInput}/>

      <${sim.Label}>Initial Configuration (JSON-Object)</>
      <${sim.TextInput} ...${Configuration.InitialConfigurationInput}/>
    </>
    </>`;
};
/**** ProjectConfigurator ****/
const ProjectConfigurator = (PropSet) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const { DesignerState, rerender, Project, DialogIsOpen, openDesignerTool, doConfigureProject, doActivateProjectScript, doRemoveLocalBackup, } = DesignerAPI();
    const ProjectConfigurator = DesignerState.Inspector.ProjectConfigurator;
    const Expansions = ProjectConfigurator.Expansions;
    const scrollablePane = useRef();
    const ScrollPosition = (_a = ProjectConfigurator.ScrollPosition) !== null && _a !== void 0 ? _a : 0;
    function updateScrollPosition(Event) {
        ProjectConfigurator.ScrollPosition = Event.target.scrollTop;
    }
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition, [ScrollPosition]);
    const ProjectGeometry = GeometryOfProject(Project);
    const ProjectConfiguration = _ConfigurationOfProject(Project);
    const { ProjectResizer } = DesignerState;
    const ResizeIsPossible = (('Width' in ProjectResizer) || ('Height' in ProjectResizer) ||
        ('minWidth' in ProjectResizer) || ('minHeight' in ProjectResizer) ||
        ('maxWidth' in ProjectResizer) || ('maxHeight' in ProjectResizer));
    const activeScript = Project.Script;
    const pendingScript = Project.pendingScript;
    const ScriptIsPending = (pendingScript != null);
    const ScriptMayBeDeleted = (pendingScript == null) && (activeScript != null);
    /**** toggleExpansionOf ****/
    function toggleExpansionOf(FoldName) {
        Expansions[FoldName] = !Expansions[FoldName];
        rerender();
    }
    /**** changePendingScript ****/
    function changePendingScript(Script) {
        doConfigureProject('pendingScript', Script);
    }
    /**** applyPendingScript ****/
    function applyPendingScript() {
        doActivateProjectScript();
    }
    /**** withdrawPendingScript ****/
    function withdrawPendingScript() {
        doConfigureProject('pendingScript', '');
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        BasicsFold: { Header: 'Basics' },
        NameInput: { style: 'width:200px' },
        SynopsisInput: {
            Placeholder: '(brief project description)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        ClassInput: {
            Placeholder: '(additional CSS classes)',
            style: 'width:200px',
        },
        StyleInput: {
            Placeholder: '(explicit CSS style settings)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        VisibilityFold: { Header: 'Visibility' },
        OpacityInput: { style: 'width:70px', Minimum: 0, Maximum: 100 },
        horizontalOverflowChoice: { Options: ['hidden'] },
        verticalOverflowChoice: { Options: ['hidden'] },
        GeometryFold: { Header: 'Geometry' },
        PositionXInput: { style: 'width:70px' },
        PositionYInput: { style: 'width:70px' },
        WidthInput: { style: 'width:70px', Minimum: 0 },
        HeightInput: { style: 'width:70px', Minimum: 0 },
        minWidthInput: { style: 'width:70px', Minimum: 0 },
        minHeightInput: { style: 'width:70px', Minimum: 0 },
        maxWidthInput: { style: 'width:70px', Minimum: 0 },
        maxHeightInput: { style: 'width:70px', Minimum: 0 },
        CenteringCheck: {},
        FramingCheck: {},
        OrientationChoice: { Options: SIM_expectedOrientations },
        ProjectResizingFold: { Header: 'Project Resizing' },
        ResizerWidthInput: { style: 'width:70px', Minimum: 0 },
        ResizerHeightInput: { style: 'width:70px', Minimum: 0 },
        minResizerWidthInput: { style: 'width:70px', Minimum: 0 },
        minResizerHeightInput: { style: 'width:70px', Minimum: 0 },
        maxResizerWidthInput: { style: 'width:70px', Minimum: 0 },
        maxResizerHeightInput: { style: 'width:70px', Minimum: 0 },
        WithdrawButton: { style: 'width:100px' },
        ResizerButton: { style: 'width:100px' },
        TypographyFold: { Header: 'Typography' },
        FontFamilyInput: { style: 'width:200px' },
        FontSizeInput: { style: 'width:70px', Minimum: 0 },
        FontWeightChoice: { Options: SIM_FontWeights },
        FontStyleChoice: { Options: SIM_FontStyles },
        ColorInput: {},
        TextShadowCheck: {},
        ShadowColorInput: {},
        ShadowXOffsetInput: { style: 'width:70px' },
        ShadowYOffsetInput: { style: 'width:70px' },
        ShadowRadiusInput: { style: 'width:70px', Minimum: 0 },
        AlignmentChoice: { Options: SIM_TextAlignments },
        LineHeightInput: { style: 'width:70px', Minimum: 0 },
        BackgroundFold: { Header: 'Background' },
        BackgroundCheck: {},
        BackgroundColorInput: {},
        BackgroundTextureCheck: {},
        BackgroundModeChoice: { Options: SIM_BackgroundModes },
        BackgroundImageInput: { style: 'width:200px' },
        BackgroundXOffsetInput: { style: 'width:70px' },
        BackgroundYOffsetInput: { style: 'width:70px' },
        LayoutSettingsFold: { Header: 'Layout Settings' },
        SnapToGridCheck: {},
        GridWidthInput: { style: 'width:70px', Minimum: 0 },
        GridHeightInput: { style: 'width:70px', Minimum: 0 },
        ScriptingFold: { Header: 'Scripting' },
        ScriptEditorButton: { Value: `${IconFolder}/square-code.png` },
        ApplyScriptButton: { Value: `${IconFolder}/check.png` },
        WithdrawScriptButton: { Value: `${IconFolder}/xmark.png` },
        DeleteScriptButton: { Value: `${IconFolder}/delete-left.png` },
        ScriptInput: {
            Placeholder: '(global business logic)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        DevelopersFold: { Header: '(for Developers)' },
        HeadExtensionsInput: {
            Placeholder: '(enter <head> extensions for generated applet)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        RemoveBackupButton: {},
    });
    configure({
        BasicsFold: {
            expanded: (Expansions.Basics == true),
            onExpansionChange: () => toggleExpansionOf('Basics')
        },
        NameInput: {
            Value: Project.Name,
        },
        SynopsisEditorButton: {
            active: DialogIsOpen('SynopsisEditor') && (DesignerState.SynopsisEditor.Scope === 'Project'),
            onClick: () => openDesignerTool('SynopsisEditor')
        },
        SynopsisInput: {
            Value: Project.Synopsis,
            onValueInput: (Value) => doConfigureProject('Synopsis', Value),
        },
        ClassInput: {
            Value: Project.Class,
            onValueInput: (Value) => doConfigureProject('Class', Value)
        },
        StyleInput: {
            Value: Project.Style,
            onValueInput: (Value) => doConfigureProject('Style', Value)
        },
        VisibilityFold: {
            expanded: (Expansions.Visibility == true),
            onExpansionChange: () => toggleExpansionOf('Visibility')
        },
        OpacityInput: {
            Value: Project.Opacity,
            onValueInput: (Value) => doConfigureProject('Opacity', Value)
        },
        horizontalOverflowChoice: { Value: 'hidden' },
        verticalOverflowChoice: { Value: 'hidden' },
        GeometryFold: {
            expanded: (Expansions.Geometry == true),
            onExpansionChange: () => toggleExpansionOf('Geometry')
        },
        PositionXInput: { Value: ProjectGeometry.x },
        PositionYInput: { Value: ProjectGeometry.y },
        WidthInput: { Value: ProjectGeometry.Width },
        HeightInput: { Value: ProjectGeometry.Height },
        minWidthInput: { Value: ProjectConfiguration.minWidth, onValueInput: (Value) => doConfigureProject('minWidth', Value) },
        minHeightInput: { Value: ProjectConfiguration.minHeight, onValueInput: (Value) => doConfigureProject('minHeight', Value) },
        maxWidthInput: { Value: ProjectConfiguration.maxWidth, onValueInput: (Value) => doConfigureProject('maxWidth', Value) },
        maxHeightInput: { Value: ProjectConfiguration.maxHeight, onValueInput: (Value) => doConfigureProject('maxHeight', Value) },
        CenteringCheck: {
            Value: (_b = ProjectConfiguration.toBeCentered) !== null && _b !== void 0 ? _b : true,
            onValueInput: (Value) => doConfigureProject('toBeCentered', Value),
        },
        FramingCheck: {
            Value: (_c = ProjectConfiguration.toBeFramed) !== null && _c !== void 0 ? _c : true,
            onValueInput: (Value) => doConfigureProject('toBeFramed', Value),
        },
        OrientationChoice: {
            Value: (_d = ProjectConfiguration.expectedOrientation) !== null && _d !== void 0 ? _d : 'any',
            onValueInput: (Value) => doConfigureProject('expectedOrientation', Value),
        },
        ProjectResizingFold: {
            expanded: (Expansions.ProjectResizing == true),
            onExpansionChange: () => toggleExpansionOf('ProjectResizing')
        },
        ResizerWidthInput: {
            Value: 'Width' in ProjectResizer ? ProjectResizer.Width : Project.Width,
            onValueInput: (Value) => { ProjectResizer.Width = Value; rerender(); }
        },
        ResizerHeightInput: {
            Value: 'Height' in ProjectResizer ? ProjectResizer.Height : Project.Height,
            onValueInput: (Value) => { ProjectResizer.Height = Value; rerender(); }
        },
        minResizerWidthInput: {
            Value: 'minWidth' in ProjectResizer ? ProjectResizer.minWidth : Project.minWidth,
            onValueInput: (Value) => {
                ProjectResizer.minWidth = Value;
                rerender();
            }
        },
        minResizerHeightInput: {
            Value: 'minHeight' in ProjectResizer ? ProjectResizer.minHeight : Project.minHeight,
            onValueInput: (Value) => {
                ProjectResizer.minHeight = Value;
                rerender();
            }
        },
        maxResizerWidthInput: {
            Value: 'maxWidth' in ProjectResizer ? ProjectResizer.maxWidth : Project.maxWidth,
            onValueInput: (Value) => {
                ProjectResizer.maxWidth = Value;
                rerender();
            }
        },
        maxResizerHeightInput: {
            Value: 'maxHeight' in ProjectResizer ? ProjectResizer.maxHeight : Project.maxHeight,
            onValueInput: (Value) => {
                ProjectResizer.maxHeight = Value;
                rerender();
            }
        },
        WithdrawButton: {
            disabled: !ResizeIsPossible,
            onClick: () => { DesignerState.ProjectResizer = {}; rerender(); },
        },
        ResizerButton: {
            disabled: !ResizeIsPossible,
            onClick: () => { resizeProject(Project, ProjectResizer); rerender(); },
        },
        TypographyFold: {
            expanded: (Expansions.Typography == true),
            onExpansionChange: () => toggleExpansionOf('Typography')
        },
        FontFamilyInput: {
            Value: Project.FontFamily,
            onValueInput: (Value) => doConfigureProject('FontFamily', Value),
        },
        FontSizeInput: {
            Value: Project.FontSize,
            onValueInput: (Value) => doConfigureProject('FontSize', Value),
        },
        FontWeightChoice: {
            Value: Project.FontWeight,
            onValueInput: (Value) => doConfigureProject('FontWeight', Value),
        },
        FontStyleChoice: {
            Value: Project.FontStyle,
            onValueInput: (Value) => doConfigureProject('FontStyle', Value),
        },
        ColorInput: {
            Value: Project.Color,
            onValueInput: (Value) => doConfigureProject('Color', Value),
        },
        AlignmentChoice: {
            Value: Project.TextAlignment,
            onValueInput: (Value) => doConfigureProject('TextAlignment', Value),
        },
        LineHeightInput: {
            Value: Project.LineHeight,
            onValueInput: (Value) => doConfigureProject('LineHeight', Value),
        },
        BackgroundFold: {
            expanded: (Expansions.Background == true),
            onExpansionChange: () => toggleExpansionOf('Background')
        },
        BackgroundCheck: {
            Value: Project.hasBackground == true,
            onValueInput: (Value) => doConfigureProject('hasBackground', Value),
        },
        BackgroundColorInput: {
            Value: Project.BackgroundColor,
            onValueInput: (Value) => doConfigureProject('BackgroundColor', Value),
        },
        BackgroundTextureCheck: {
            Value: ((_e = Project.BackgroundTexture) === null || _e === void 0 ? void 0 : _e.isActive) == true,
            onValueInput: (Value) => {
                const { isActive, ImageURL, Mode, xOffset, yOffset } = (Project.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
                doConfigureProject('BackgroundTexture', {
                    isActive: Value, ImageURL, Mode, xOffset, yOffset
                });
            },
        },
        BackgroundModeChoice: {
            Value: (_f = Project.BackgroundTexture) === null || _f === void 0 ? void 0 : _f.Mode,
            onValueInput: (Value) => {
                const { isActive, ImageURL, Mode, xOffset, yOffset } = (Project.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
                doConfigureProject('BackgroundTexture', {
                    isActive, ImageURL, Mode: Value, xOffset, yOffset
                });
            },
        },
        BackgroundImageInput: {
            Value: (_g = Project.BackgroundTexture) === null || _g === void 0 ? void 0 : _g.ImageURL,
            onValueInput: (Value) => {
                const { isActive, ImageURL, Mode, xOffset, yOffset } = (Project.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
                doConfigureProject('BackgroundTexture', {
                    isActive, ImageURL: Value, Mode, xOffset, yOffset
                });
            },
        },
        BackgroundXOffsetInput: {
            Value: (_h = Project.BackgroundTexture) === null || _h === void 0 ? void 0 : _h.xOffset,
            onValueInput: (Value) => {
                const { isActive, ImageURL, Mode, xOffset, yOffset } = (Project.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
                doConfigureProject('BackgroundTexture', {
                    isActive, ImageURL: Value, Mode, xOffset: Value, yOffset
                });
            },
        },
        BackgroundYOffsetInput: {
            Value: (_j = Project.BackgroundTexture) === null || _j === void 0 ? void 0 : _j.yOffset,
            onValueInput: (Value) => {
                const { isActive, ImageURL, Mode, xOffset, yOffset } = (Project.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
                doConfigureProject('BackgroundTexture', {
                    isActive, ImageURL: Value, Mode, xOffset, yOffset: Value
                });
            },
        },
        LayoutSettingsFold: {
            expanded: (Expansions.LayoutSettings == true),
            onExpansionChange: () => toggleExpansionOf('LayoutSettings')
        },
        SnapToGridCheck: {
            Value: (_k = ProjectConfiguration.SnapToGrid) !== null && _k !== void 0 ? _k : false,
            onValueInput: (Value) => doConfigureProject('SnapToGrid', Value),
        },
        GridWidthInput: {
            Value: (_l = ProjectConfiguration.GridWidth) !== null && _l !== void 0 ? _l : 10,
            onValueInput: (Value) => doConfigureProject('GridWidth', Value),
        },
        GridHeightInput: {
            Value: (_m = ProjectConfiguration.GridHeight) !== null && _m !== void 0 ? _m : 10,
            onValueInput: (Value) => doConfigureProject('GridHeight', Value),
        },
        ScriptingFold: {
            expanded: (Expansions.Scripting == true),
            onExpansionChange: () => toggleExpansionOf('Scripting')
        },
        ScriptEditorButton: {
            active: DialogIsOpen('ScriptEditor') && (DesignerState.ScriptEditor.Scope === 'Project'),
            onClick: () => openDesignerTool('ScriptEditor')
        },
        ApplyScriptButton: {
            disabled: !ScriptIsPending,
            onClick: () => applyPendingScript(),
        },
        WithdrawScriptButton: {
            disabled: !ScriptIsPending,
            onClick: () => withdrawPendingScript(),
        },
        DeleteScriptButton: {
            disabled: !ScriptMayBeDeleted,
            onClick: () => applyPendingScript(),
        },
        ScriptInput: {
            Value: pendingScript !== null && pendingScript !== void 0 ? pendingScript : activeScript,
            onValueInput: (Value) => changePendingScript(Value),
        },
        DevelopersFold: {
            expanded: (Expansions.Developers == true),
            onExpansionChange: () => toggleExpansionOf('Developers')
        },
        HeadExtensionsInput: {
            Value: Project.HeadExtensions,
            onValueInput: (Value) => doConfigureProject('HeadExtensions', Value),
        },
        RemoveBackupButton: {
            onClick: () => doRemoveLocalBackup(),
        },
    });
    /**** actual rendering ****/
    return html `<${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto; overflow:hidden">
      <${sim.Subtitle}>Project Configuration</>
    <${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto; overflow:hidden scroll"
      ref=${scrollablePane} onScroll=${updateScrollPosition}
    >
      <${sim.AccordionFold} ...${Configuration.BasicsFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Name</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} readonly ...${Configuration.NameInput}/>
        </>

        <${sim.horizontal}>
          <${sim.Label}>Synopsis</>
          <div style="width:10px"/>
          <${sim.Icon} ...${Configuration.SynopsisEditorButton}/>
        </>
        <${sim.TextInput} ...${Configuration.SynopsisInput}/>

        <${sim.horizontal}>
          <${sim.Label}>CSS Classes</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} ...${Configuration.ClassInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>CSS Style</>
        </>
        <${sim.TextInput} ...${Configuration.StyleInput}/>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.VisibilityFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Opacity [%]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.OpacityInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Overflows</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.horizontalOverflowChoice}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.DropDown} ...${Configuration.verticalOverflowChoice}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.GeometryFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Position (x,y) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} readonly ...${Configuration.PositionXInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} readonly ...${Configuration.PositionYInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Size (w,h) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} readonly ...${Configuration.WidthInput}/>
          <${sim.Description} style="width:10px; text-align:center">x</>
          <${sim.NumberInput} readonly ...${Configuration.HeightInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Limits</>
        </>
        <${sim.horizontal}>
          <${sim.Label}>min. Size (w,h) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} readonly ...${Configuration.minWidthInput}/>
          <${sim.Description} style="width:10px; text-align:center">x</>
          <${sim.NumberInput} readonly ...${Configuration.minHeightInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>max. Size (w,h) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} readonly ...${Configuration.maxWidthInput}/>
          <${sim.Description} style="width:10px; text-align:center">x</>
          <${sim.NumberInput} readonly ...${Configuration.maxHeightInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>center in Viewport</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.CenteringCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>draw Frame in large Viewports</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.FramingCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>expected mobile Orientation</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} readonly ...${Configuration.OrientationChoice}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.ProjectResizingFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.Label}>Warning: no undo possible</>
        <${sim.horizontal}>
          <${sim.Label}>new Size (w,h) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.ResizerWidthInput}/>
          <${sim.Description} style="width:10px; text-align:center">x</>
          <${sim.NumberInput} ...${Configuration.ResizerHeightInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Limits</>
        </>
        <${sim.horizontal}>
          <${sim.Label}>min. Size (w,h) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} readonly ...${Configuration.minResizerWidthInput}/>
          <${sim.Description} style="width:10px; text-align:center">x</>
          <${sim.NumberInput} readonly ...${Configuration.minResizerHeightInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>max. Size (w,h) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} readonly ...${Configuration.maxResizerWidthInput}/>
          <${sim.Description} style="width:10px; text-align:center">x</>
          <${sim.NumberInput} readonly ...${Configuration.maxResizerHeightInput}/>
        </>
        <${sim.horizontal} style="padding-top:4px">
          <${sim.expandingSpacer}/>
          <${sim.Button} ...${Configuration.WithdrawButton}>Withdraw</>
          <${sim.Spacer} style="width:10px"/>
          <${sim.Button} ...${Configuration.ResizerButton}>Resize</>
          <${sim.expandingSpacer}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.TypographyFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Font Family</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} ...${Configuration.FontFamilyInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Type Setting</>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Font Size [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.FontSizeInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Font Weight</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.FontWeightChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Font Style</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.FontStyleChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Foreground Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.ColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Text Shadow</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.TextShadowCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.ShadowColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Offset (dx,dy) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.ShadowXOffsetInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.ShadowYOffsetInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Blur Radius [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.ShadowRadiusInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Text Layout</>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Text Alignment</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.AlignmentChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Line Height [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.LineHeightInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.BackgroundFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Background</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.BackgroundCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.BackgroundColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Texture</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.BackgroundTextureCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Mode</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.BackgroundModeChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Image URL</>
          <${sim.expandingSpacer}/>
          <${sim.URLInput} ...${Configuration.BackgroundImageInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Offset (dx,dy) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.BackgroundXOffsetInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.BackgroundYOffsetInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.LayoutSettingsFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Snap-to-Grid</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.SnapToGridCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Grid Size (w,h) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.GridWidthInput}/>
          <${sim.Description} style="width:10px; text-align:center">x</>
          <${sim.NumberInput} ...${Configuration.GridHeightInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.ScriptingFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Script</>
          <div style="width:10px"/>
          <${sim.Icon} ...${Configuration.ScriptEditorButton}/>
          <${sim.expandingSpacer}/>
          <${sim.Icon} ...${Configuration.ApplyScriptButton}/>
          <div style="width:10px"/>
          <${sim.Icon} ...${Configuration.WithdrawScriptButton}/>
          <div style="width:40px"/>
          <${sim.Icon} ...${Configuration.DeleteScriptButton}/>
        </>
        <${sim.TextInput} ...${Configuration.ScriptInput}/>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.DevelopersFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.Label}>${'<'}head${'>'} Extensions</>
        <${sim.TextInput} ...${Configuration.HeadExtensionsInput}/>
        <${sim.Button} ...${Configuration.RemoveBackupButton} style="margin-top:10px">Remove Local Backup</>
       </>
      </>
    </>
    </>`;
};
/**** BoardBrowser ****/
const BoardBrowser = (PropSet) => {
    var _a;
    const { DesignerState, rerender, Project, activeBoard, sortedBoardSelection, selectBoards, selectedBoardsMayBeMovedOut, selectedBoardsMayBeMovedIn, selectedBoardsMayBeMovedUp, selectedBoardsMayBeMovedDown, doCreateNewBoard, doDeleteSelectedBoards, doMoveSelectedBoards, doMoveSelectedBoardsIn, doMoveSelectedBoardsOut, doShiftSelectedBoardsToTop, doShiftSelectedBoardsUp, doShiftSelectedBoardsDown, doShiftSelectedBoardsToBottom, doVisitSelectedBoard, doVisitBoard } = DesignerAPI();
    const BoardBrowser = DesignerState.Inspector.BoardBrowser;
    const selectedBoards = sortedBoardSelection();
    const List = Project.BoardList; // referentially stable
    function onListItemMove(ItemsToMove, TargetItem, Direction) {
        const Container = TargetItem[$Container];
        const Index = IndexOfBoard(TargetItem) + (Direction === 'before' ? 0 : 1);
        doMoveSelectedBoards(Container, Index);
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        BoardListView: { style: 'width:100%; flex:1 0 auto' },
        VisitBoardButton: { Value: `${IconFolder}/file-arrow-left.png` },
        MoveOutButton: { Value: `${IconFolder}/arrow-sm-left.png` },
        MoveInButton: { Value: `${IconFolder}/arrow-sm-right.png` },
        MoveToTopButton: { Value: `${IconFolder}/arrow-sm-to-top.png` },
        MoveUpButton: { Value: `${IconFolder}/arrow-sm-up.png` },
        MoveDownButton: { Value: `${IconFolder}/arrow-sm-down.png` },
        MoveToBottomButton: { Value: `${IconFolder}/arrow-sm-to-bottom.png` },
        DeletionButton: { Value: `${IconFolder}/minus.png` },
        CreationButton: { Value: `${IconFolder}/plus.png` },
        NameInput: {
            style: 'width:100%',
            Placeholder: '(optional name of new board)',
        },
    });
    configure({
        BoardListView: {
            List,
            KeyOfListItem: (Board) => Board.internalId,
            ListItemRenderer: (Board) => {
                var _a;
                const active = (Board === activeBoard ? 'active-board' : '');
                const Label = (_a = Board.Name) !== null && _a !== void 0 ? _a : '#' + IndexOfBoard(Board);
                return html `<span class="sim-designer board-label ${active}">${Label}</>`;
            },
            ContentOfListItem: (Board) => Board.BoardList,
            ContainerOfListItem: (Board) => Board[$Container],
            ItemMayBeSelected: (Board) => true,
            selectedItems: selectedBoards,
            onSelectionChange: (selectedBoards) => selectBoards(selectedBoards),
            ItemMayBeExpanded: (Board) => { var _a; return (((_a = Board.BoardList) !== null && _a !== void 0 ? _a : []).length > 0); },
            expandedItems: BoardBrowser.expandedBoards,
            onExpansionChange: (expandedBoards) => BoardBrowser.expandedBoards = expandedBoards,
            ListItemMayAccept: () => true,
            onListItemMove: onListItemMove,
            onListItemClick: (Board, Event) => { if (Event.detail === 2) {
                doVisitBoard(Board);
            } },
        },
        VisitBoardButton: {
            disabled: (selectedBoards.length !== 1),
            onClick: () => doVisitSelectedBoard(),
        },
        MoveOutButton: {
            disabled: !selectedBoardsMayBeMovedOut(),
            onClick: () => doMoveSelectedBoardsOut(),
        },
        MoveInButton: {
            disabled: !selectedBoardsMayBeMovedIn(),
            onClick: () => doMoveSelectedBoardsIn(),
        },
        MoveToTopButton: {
            disabled: !selectedBoardsMayBeMovedUp(),
            onClick: () => doShiftSelectedBoardsToTop(),
        },
        MoveUpButton: {
            disabled: !selectedBoardsMayBeMovedUp(),
            onClick: () => doShiftSelectedBoardsUp(),
        },
        MoveDownButton: {
            disabled: !selectedBoardsMayBeMovedDown(),
            onClick: () => doShiftSelectedBoardsDown(),
        },
        MoveToBottomButton: {
            disabled: !selectedBoardsMayBeMovedDown(),
            onClick: () => doShiftSelectedBoardsToBottom(),
        },
        DeletionButton: {
            disabled: (selectedBoards.length === 0) || selectedBoards.some((Board) => Board.permanent == true),
            onClick: () => doDeleteSelectedBoards(),
        },
        CreationButton: {
            disabled: (((_a = BoardBrowser.newBoardName) !== null && _a !== void 0 ? _a : '') !== '') && !ValueIsName(BoardBrowser.newBoardName),
            onClick: () => doCreateNewBoard(BoardBrowser.newBoardName),
        },
        NameInput: {
            invalid: !ValueIsName(BoardBrowser.newBoardName),
            onValueInput: (Value) => {
                BoardBrowser.newBoardName = Value;
                rerender(); // i.e., update enablings
            },
        },
    });
    /**** actual rendering ****/
    return html `<${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto">
      <${sim.horizontal}>
        <${sim.Subtitle}>Boards</>
        <${sim.expandingSpacer}/>
        <${sim.Icon} ...${Configuration.VisitBoardButton}/>
        <div style="width:20px"/>
        <${sim.Icon} ...${Configuration.MoveOutButton}/>
        <${sim.Icon} ...${Configuration.MoveInButton}/>
        <div style="width:20px"/>
        <${sim.Icon} ...${Configuration.MoveToTopButton}/>
        <${sim.Icon} ...${Configuration.MoveUpButton}/>
        <${sim.Icon} ...${Configuration.MoveDownButton}/>
        <${sim.Icon} ...${Configuration.MoveToBottomButton}/>
        <${sim.expandingSpacer}/>
        <${sim.Icon} ...${Configuration.DeletionButton}/>
      </>
      <${sim.NestedListView} ...${Configuration.BoardListView} style="width:100%; flex:1 1 auto"/>
      <${sim.horizontalSeparator} style="padding-top:10px"/>
      <${sim.horizontal}>
        <${sim.Label}>Name of new Board</>
        <${sim.expandingSpacer}/>
        <${sim.Icon} ...${Configuration.CreationButton}/>
      </>
      <${sim.TextlineInput} ...${Configuration.NameInput}/>
    </>`;
};
/**** BoardConfigurator ****/
const BoardConfigurator = (PropSet) => {
    var _a;
    const { DesignerState, rerender, activeBoard, DialogIsOpen, openDesignerTool, selectBoards, sortedBoardSelection, doConfigureSelectedBoards, doActivateSelectedBoardScripts, } = DesignerAPI();
    const BoardConfigurator = DesignerState.Inspector.BoardConfigurator;
    const Expansions = BoardConfigurator.Expansions;
    const scrollablePane = useRef();
    const ScrollPosition = (_a = BoardConfigurator.ScrollPosition) !== null && _a !== void 0 ? _a : 0;
    function updateScrollPosition(Event) {
        BoardConfigurator.ScrollPosition = Event.target.scrollTop;
    }
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition, [ScrollPosition]);
    let selectedBoards = sortedBoardSelection();
    if (selectedBoards.length === 0) { // auto-select active board, if needed
        selectBoards(selectedBoards = [activeBoard]);
    }
    function commonValue(PropertyName) {
        return commonValueOf(selectedBoards.map((Board) => Board[PropertyName]));
    }
    function commonValueItem(PropertyName, Key) {
        const commonValue = commonValueOf(selectedBoards.map((Board) => Board[PropertyName]));
        return ((commonValue == null) || ValueIsSpecial(commonValue) ? commonValue : commonValue[Key]);
    }
    const BoardGeometry = commonValueOf(selectedBoards.map((Board) => GeometryOfBoard(Board)));
    function configureBackgroundTexture(PropertyName, Value) {
        let Settings = commonValue('BackgroundTexture');
        if ((Settings == null) || ValueIsSpecial(Settings)) {
            Settings = { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 };
        }
        doConfigureSelectedBoards('BackgroundTexture', Object.assign(Object.assign({}, Settings), { [PropertyName]: Value }));
    }
    const activeScript = commonValue('Script');
    const pendingScript = commonValue('pendingScript');
    const ScriptIsPending = (pendingScript != null) && !ValueIsSpecial(pendingScript);
    const ScriptMayBeDeleted = (pendingScript == null) && (activeScript != null) && !ValueIsSpecial(activeScript);
    /**** toggleExpansionOf ****/
    function toggleExpansionOf(FoldName) {
        Expansions[FoldName] = !Expansions[FoldName];
        rerender();
    }
    /**** changePendingScript ****/
    function changePendingScript(Script) {
        doConfigureSelectedBoards('pendingScript', Script);
    }
    /**** applyPendingScript ****/
    function applyPendingScript() {
        doActivateSelectedBoardScripts();
    }
    /**** withdrawPendingScript ****/
    function withdrawPendingScript() {
        doConfigureSelectedBoards('pendingScript', '');
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        BasicsFold: { Header: 'Basics' },
        NameInput: { style: 'width:200px' },
        SynopsisInput: {
            Placeholder: '(brief board description)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        PermanenceCheck: {},
        ActivationBaseCheck: {},
        StateBaseInput: { style: 'width:200px' },
        ClassInput: {
            Placeholder: '(additional CSS classes)',
            style: 'width:200px',
        },
        StyleInput: {
            Placeholder: '(explicit CSS style settings)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        VisibilityFold: { Header: 'Visibility' },
        OpacityInput: { style: 'width:70px', Minimum: 0, Maximum: 100 },
        horizontalOverflowChoice: { Options: ['auto', 'hidden', 'scroll'] },
        verticalOverflowChoice: { Options: ['auto', 'hidden', 'scroll'] },
        GeometryFold: { Header: 'Geometry' },
        PositionXInput: { style: 'width:70px' },
        PositionYInput: { style: 'width:70px' },
        WidthInput: { style: 'width:70px', Minimum: 0 },
        HeightInput: { style: 'width:70px', Minimum: 0 },
        TypographyFold: { Header: 'Typography' },
        FontFamilyInput: { style: 'width:200px' },
        FontSizeInput: { style: 'width:70px', Minimum: 0 },
        FontWeightChoice: { Options: SIM_FontWeights },
        FontStyleChoice: { Options: SIM_FontStyles },
        ColorInput: {},
        AlignmentChoice: { Options: SIM_TextAlignments },
        LineHeightInput: { style: 'width:70px', Minimum: 0 },
        BackgroundFold: { Header: 'Background' },
        BackgroundCheck: {},
        BackgroundColorInput: {},
        BackgroundTextureCheck: {},
        BackgroundModeChoice: { Options: SIM_BackgroundModes },
        BackgroundImageInput: { style: 'width:200px' },
        BackgroundXOffsetInput: { style: 'width:70px' },
        BackgroundYOffsetInput: { style: 'width:70px' },
        ScriptingFold: { Header: 'Scripting' },
        ScriptEditorButton: { Value: `${IconFolder}/square-code.png` },
        ApplyScriptButton: { Value: `${IconFolder}/check.png` },
        WithdrawScriptButton: { Value: `${IconFolder}/xmark.png` },
        DeleteScriptButton: { Value: `${IconFolder}/delete-left.png` },
        ScriptInput: {
            Placeholder: '(board-specific business logic)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
    });
    configure({
        BasicsFold: {
            expanded: (Expansions.Basics == true),
            onExpansionChange: () => toggleExpansionOf('Basics')
        },
        NameInput: {
            Value: commonValue('Name'),
            onValueInput: (Value) => doConfigureSelectedBoards('Name', Value)
        },
        SynopsisEditorButton: {
            active: DialogIsOpen('SynopsisEditor') && (DesignerState.SynopsisEditor.Scope === 'Board'),
            onClick: () => openDesignerTool('SynopsisEditor')
        },
        SynopsisInput: {
            Value: commonValue('Synopsis'),
            onValueInput: (Value) => doConfigureSelectedBoards('Synopsis', Value),
        },
        PermanenceCheck: {
            Value: commonValue('permanent') == true,
            onValueInput: (Value) => doConfigureSelectedBoards('permanent', Value),
        },
        ActivationBaseCheck: {
            Value: commonValue('isActivationBase') == true,
            onValueInput: (Value) => doConfigureSelectedBoards('isActivationBase', Value),
        },
        StateBaseInput: {
            Value: commonValue('StateBase'),
            onValueInput: (Value) => doConfigureSelectedBoards('StateBase', Value),
        },
        ClassInput: {
            Value: commonValue('Class'),
            onValueInput: (Value) => doConfigureSelectedBoards('Class', Value)
        },
        StyleInput: {
            Value: commonValue('Style'),
            onValueInput: (Value) => doConfigureSelectedBoards('Style', Value)
        },
        VisibilityFold: {
            expanded: (Expansions.Visibility == true),
            onExpansionChange: () => toggleExpansionOf('Visibility')
        },
        OpacityInput: {
            Value: commonValue('Opacity'),
            onValueInput: (Value) => doConfigureSelectedBoards('Opacity', Value)
        },
        horizontalOverflowChoice: {
            Value: commonValueItem('Overflows', 0),
            onValueInput: (Value) => {
                let oldValue = commonValue('Overflows');
                if ((oldValue == null) || ValueIsSpecial(oldValue)) {
                    oldValue = ['hidden', 'hidden'];
                }
                doConfigureSelectedBoards('Overflows', [Value, oldValue[1]]);
            },
        },
        verticalOverflowChoice: {
            Value: commonValueItem('Overflows', 1),
            onValueInput: (Value) => {
                let oldValue = commonValue('Overflows');
                if ((oldValue == null) || ValueIsSpecial(oldValue)) {
                    oldValue = ['hidden', 'hidden'];
                }
                doConfigureSelectedBoards('Overflows', [oldValue[0], Value]);
            },
        },
        GeometryFold: {
            expanded: (Expansions.Geometry == true),
            onExpansionChange: () => toggleExpansionOf('Geometry')
        },
        PositionXInput: { Value: BoardGeometry.x },
        PositionYInput: { Value: BoardGeometry.y },
        WidthInput: { Value: BoardGeometry.Width },
        HeightInput: { Value: BoardGeometry.Height },
        TypographyFold: {
            expanded: (Expansions.Typography == true),
            onExpansionChange: () => toggleExpansionOf('Typography')
        },
        FontFamilyInput: {
            Value: commonValue('FontFamily'),
            onValueInput: (Value) => doConfigureSelectedBoards('FontFamily', Value),
        },
        FontSizeInput: {
            Value: commonValue('FontSize'),
            onValueInput: (Value) => doConfigureSelectedBoards('FontSize', Value),
        },
        FontWeightChoice: {
            Value: commonValue('FontWeight'),
            onValueInput: (Value) => doConfigureSelectedBoards('FontWeight', Value),
        },
        FontStyleChoice: {
            Value: commonValue('FontStyle'),
            onValueInput: (Value) => doConfigureSelectedBoards('FontStyle', Value),
        },
        ColorInput: {
            Value: commonValue('Color'),
            onValueInput: (Value) => doConfigureSelectedBoards('Color', Value),
        },
        AlignmentChoice: {
            Value: commonValue('TextAlignment'),
            onValueInput: (Value) => doConfigureSelectedBoards('TextAlignment', Value),
        },
        LineHeightInput: {
            Value: commonValue('LineHeight'),
            onValueInput: (Value) => doConfigureSelectedBoards('LineHeight', Value),
        },
        BackgroundFold: {
            expanded: (Expansions.Background == true),
            onExpansionChange: () => toggleExpansionOf('Background')
        },
        BackgroundCheck: {
            Value: commonValue('hasBackground') == true,
            onValueInput: (Value) => doConfigureSelectedBoards('hasBackground', Value),
        },
        BackgroundColorInput: {
            Value: commonValue('BackgroundColor'),
            onValueInput: (Value) => doConfigureSelectedBoards('BackgroundColor', Value),
        },
        BackgroundTextureCheck: {
            Value: commonValueItem('BackgroundTexture', 'isActive') == true,
            onValueInput: (Value) => configureBackgroundTexture('isActive', Value),
        },
        BackgroundModeChoice: {
            Value: commonValueItem('BackgroundTexture', 'Mode'),
            onValueInput: (Value) => configureBackgroundTexture('Mode', Value),
        },
        BackgroundImageInput: {
            Value: commonValueItem('BackgroundTexture', 'ImageURL'),
            onValueInput: (Value) => configureBackgroundTexture('ImageURL', Value),
        },
        BackgroundXOffsetInput: {
            Value: commonValueItem('BackgroundTexture', 'xOffset'),
            onValueInput: (Value) => configureBackgroundTexture('xOffset', Value),
        },
        BackgroundYOffsetInput: {
            Value: commonValueItem('BackgroundTexture', 'yOffset'),
            onValueInput: (Value) => configureBackgroundTexture('yOffset', Value),
        },
        ScriptingFold: {
            expanded: (Expansions.Scripting == true),
            onExpansionChange: () => toggleExpansionOf('Scripting')
        },
        ScriptEditorButton: {
            active: DialogIsOpen('ScriptEditor') && (DesignerState.ScriptEditor.Scope === 'Board'),
            onClick: () => openDesignerTool('ScriptEditor')
        },
        ApplyScriptButton: {
            disabled: !ScriptIsPending,
            onClick: () => applyPendingScript(),
        },
        WithdrawScriptButton: {
            disabled: !ScriptIsPending,
            onClick: () => withdrawPendingScript(),
        },
        DeleteScriptButton: {
            disabled: !ScriptMayBeDeleted,
            onClick: () => applyPendingScript(),
        },
        ScriptInput: {
            Value: pendingScript !== null && pendingScript !== void 0 ? pendingScript : activeScript,
            onValueInput: (Value) => changePendingScript(Value),
        },
    });
    /**** actual rendering ****/
    return html `<${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto; overflow:hidden">
      <${sim.Subtitle}>Board Configuration</>
    <${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto; overflow:hidden scroll"
      ref=${scrollablePane} onScroll=${updateScrollPosition}
    >
      <${sim.AccordionFold} ...${Configuration.BasicsFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Name</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} ...${Configuration.NameInput}/>
        </>

        <${sim.horizontal}>
          <${sim.Label}>Synopsis</>
          <div style="width:10px"/>
          <${sim.Icon} ...${Configuration.SynopsisEditorButton}/>
        </>
        <${sim.TextInput} ...${Configuration.SynopsisInput}/>

        <${sim.horizontal}>
          <${sim.Label}>is permanent</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.PermanenceCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>is Activation Base</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.ActivationBaseCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>State Base</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} ...${Configuration.StateBaseInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>CSS Classes</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} ...${Configuration.ClassInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>CSS Style</>
        </>
        <${sim.TextInput} ...${Configuration.StyleInput}/>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.VisibilityFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Opacity [%]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.OpacityInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Overflows</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.horizontalOverflowChoice}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.DropDown} ...${Configuration.verticalOverflowChoice}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.GeometryFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Position (x,y) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} readonly ...${Configuration.PositionXInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} readonly ...${Configuration.PositionYInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Size (w,h) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} readonly ...${Configuration.WidthInput}/>
          <${sim.Description} style="width:10px; text-align:center">x</>
          <${sim.NumberInput} readonly ...${Configuration.HeightInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.TypographyFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Font Family</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} ...${Configuration.FontFamilyInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Type Setting</>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Font Size [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.FontSizeInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Font Weight</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.FontWeightChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Font Style</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.FontStyleChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Foreground Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.ColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Text Shadow</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.TextShadowCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.ShadowColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Offset (dx,dy) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.ShadowXOffsetInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.ShadowYOffsetInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Blur Radius [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.ShadowRadiusInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Text Layout</>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Text Alignment</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.AlignmentChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Line Height [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.LineHeightInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.BackgroundFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Background</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.BackgroundCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.BackgroundColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Texture</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.BackgroundTextureCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Mode</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.BackgroundModeChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Image URL</>
          <${sim.expandingSpacer}/>
          <${sim.URLInput} ...${Configuration.BackgroundImageInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Offset (dx,dy) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.BackgroundXOffsetInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.BackgroundYOffsetInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.ScriptingFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Script</>
          <div style="width:10px"/>
          <${sim.Icon} ...${Configuration.ScriptEditorButton}/>
          <${sim.expandingSpacer}/>
          <${sim.Icon} ...${Configuration.ApplyScriptButton}/>
          <div style="width:10px"/>
          <${sim.Icon} ...${Configuration.WithdrawScriptButton}/>
          <div style="width:40px"/>
          <${sim.Icon} ...${Configuration.DeleteScriptButton}/>
        </>
        <${sim.TextInput} ...${Configuration.ScriptInput}/>


        <${sim.horizontal} gap=${10}>
         <${sim.Button} value="pack Compounds"   onClick=${() => packCompoundsInBoard(activeBoard)}/>
         <${sim.Button} value="unpack Compounds" onClick=${() => unpackCompoundsInBoard(activeBoard)}/>
        </>
       </>
      </>
    </>
    </>`;
};
/**** StickerBrowser ****/
const StickerBrowser = (PropSet) => {
    var _a;
    const { DesignerState, rerender, activeBoard, sortedStickerSelection, selectStickers, selectedStickersMayBeMovedOut, selectedStickersMayBeMovedIn, selectedStickersMayBeMovedUp, selectedStickersMayBeMovedDown, doCreateNewSticker, doDeleteStickers, doMoveSelectedStickers, doMoveSelectedStickersIn, doMoveSelectedStickersOut, doShiftSelectedStickersToTop, doShiftSelectedStickersUp, doShiftSelectedStickersDown, doShiftSelectedStickersToBottom, } = DesignerAPI();
    const StickerBrowser = DesignerState.Inspector.StickerBrowser;
    const selectedStickers = sortedStickerSelection();
    const List = activeBoard.StickerList; // referentially stable
    function onListItemMove(ItemsToMove, TargetItem, Direction) {
        const Container = TargetItem[$Container];
        const Index = IndexOfSticker(TargetItem) + (Direction === 'before' ? 0 : 1);
        doMoveSelectedStickers(Container, Index);
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        StickerListView: { style: 'width:100%; flex:1 0 auto' },
        MoveOutButton: { Value: `${IconFolder}/arrow-sm-left.png` },
        MoveInButton: { Value: `${IconFolder}/arrow-sm-right.png` },
        MoveToTopButton: { Value: `${IconFolder}/arrow-sm-to-top.png` },
        MoveUpButton: { Value: `${IconFolder}/arrow-sm-up.png` },
        MoveDownButton: { Value: `${IconFolder}/arrow-sm-down.png` },
        MoveToBottomButton: { Value: `${IconFolder}/arrow-sm-to-bottom.png` },
        DeletionButton: { Value: `${IconFolder}/minus.png` },
        //    CreationButton:    { Icon:`${IconFolder}/plus.png` },
        NameInput: {
            style: 'width:100%',
            Placeholder: '(optional name of new sticker)',
        },
    });
    configure({
        StickerListView: {
            List,
            KeyOfListItem: (Sticker) => Sticker.internalId,
            ListItemRenderer: (Sticker) => { var _a; return (_a = Sticker.Name) !== null && _a !== void 0 ? _a : '#' + IndexOfSticker(Sticker) + ' (' + Sticker.Variant + ')'; },
            ContentOfListItem: (Sticker) => Sticker.StickerList,
            ContainerOfListItem: (Sticker) => Sticker[$Container],
            ItemMayBeSelected: (Sticker) => (TypeOfVisual(Sticker[$Container]) === 'board'),
            selectedItems: selectedStickers,
            onSelectionChange: (selectedStickers) => selectStickers(selectedStickers),
            ItemMayBeExpanded: (Sticker) => ValueIsCompound(Sticker),
            expandedItems: StickerBrowser.expandedStickers,
            onExpansionChange: (expandedStickers) => StickerBrowser.expandedStickers = expandedStickers,
            ListItemMayAccept: () => true,
            onListItemMove: onListItemMove,
        },
        MoveOutButton: {
            disabled: !selectedStickersMayBeMovedOut(),
            onClick: () => doMoveSelectedStickersOut(),
        },
        MoveInButton: {
            disabled: !selectedStickersMayBeMovedIn(),
            onClick: () => doMoveSelectedStickersIn(),
        },
        MoveToTopButton: {
            disabled: !selectedStickersMayBeMovedUp(),
            onClick: () => doShiftSelectedStickersToTop(),
        },
        MoveUpButton: {
            disabled: !selectedStickersMayBeMovedUp(),
            onClick: () => doShiftSelectedStickersUp(),
        },
        MoveDownButton: {
            disabled: !selectedStickersMayBeMovedDown(),
            onClick: () => doShiftSelectedStickersDown(),
        },
        MoveToBottomButton: {
            disabled: !selectedStickersMayBeMovedDown(),
            onClick: () => doShiftSelectedStickersToBottom(),
        },
        DeletionButton: {
            disabled: (selectedStickers.length === 0) || selectedStickers.some((Sticker) => Sticker.permanent == true),
            onClick: () => doDeleteStickers(selectedStickers),
        },
        CreationButton: {
            disabled: (((_a = StickerBrowser.newStickerName) !== null && _a !== void 0 ? _a : '') !== '') && !ValueIsName(StickerBrowser.newStickerName),
            onValueInput: (Value, Event) => {
                doCreateNewSticker(Event.target.value, StickerBrowser.newStickerName);
                Event.target.value = '-';
            },
        },
        NameInput: {
            invalid: !ValueIsName(StickerBrowser.newStickerName),
            onValueInput: (Value) => {
                StickerBrowser.newStickerName = Value;
                rerender(); // i.e., update enablings
            },
        },
    });
    /**** actual rendering ****/
    return html `<${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto">
      <${sim.horizontal}>
        <${sim.Subtitle}>Stickers</>
        <${sim.expandingSpacer}/>
        <${sim.Icon} ...${Configuration.MoveOutButton}/>
        <${sim.Icon} ...${Configuration.MoveInButton}/>
        <div style="width:20px"/>
        <${sim.Icon} ...${Configuration.MoveToTopButton}/>
        <${sim.Icon} ...${Configuration.MoveUpButton}/>
        <${sim.Icon} ...${Configuration.MoveDownButton}/>
        <${sim.Icon} ...${Configuration.MoveToBottomButton}/>
        <${sim.expandingSpacer}/>
        <${sim.Icon} ...${Configuration.DeletionButton}/>
      </>
      <${sim.NestedListView} ...${Configuration.StickerListView} style="width:100%; flex:1 1 auto"/>
      <${sim.horizontalSeparator} style="padding-top:10px"/>
      <${sim.horizontal}>
        <${sim.Label}>Name of new Sticker</>
        <${sim.expandingSpacer}/>
        <label class="sim-component pseudo-dropdown">
          <div style="
            -webkit-mask-image:url(${IconFolder}/plus.png); mask-image:url(${IconFolder}/plus.png);
            background-color:black;
          "/>
          <select ...${Configuration.CreationButton}>
            <option disabled selected value="">please select</>
            <option disabled                  >----</>
            ${nestedOptionListForVariants()}
          </select>
        </label>
      </>
      <${sim.TextlineInput} ...${Configuration.NameInput}/>
    </>`;
};
/**** StickerConfigurator ****/
const StickerConfigurator = (PropSet) => {
    var _a;
    const { DesignerState, rerender, DialogIsOpen, openDesignerTool, sortedStickerSelection, doConfigureSelectedStickers, doChangeGeometryOfSelectedStickers, doChangeAnchorsOfSelectedStickers, doChangeOffsetsOfSelectedStickers, doActivateSelectedStickerScripts, } = DesignerAPI();
    const StickerConfigurator = DesignerState.Inspector.StickerConfigurator;
    const Expansions = StickerConfigurator.Expansions;
    const scrollablePane = useRef();
    const ScrollPosition = (_a = StickerConfigurator.ScrollPosition) !== null && _a !== void 0 ? _a : 0;
    function updateScrollPosition(Event) {
        StickerConfigurator.ScrollPosition = Event.target.scrollTop;
    }
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition, [ScrollPosition]);
    const selectedStickers = sortedStickerSelection();
    const disabled = ((selectedStickers.length === 0) ||
        selectedStickers.some((Sticker) => Sticker.automatic == true));
    function commonValue(PropertyName) {
        return commonValueOf(selectedStickers.map((Sticker) => Sticker[PropertyName]));
    }
    function commonValueItem(PropertyName, Key) {
        const commonValue = commonValueOf(selectedStickers.map((Sticker) => Sticker[PropertyName]));
        return ((commonValue == null) || ValueIsSpecial(commonValue) ? commonValue : commonValue[Key]);
    }
    const StickerGeometry = commonValueOf(selectedStickers.map((Sticker) => GeometryOfSticker(Sticker)));
    function changeStickerGeometry(x, y, Width, Height) {
        doChangeGeometryOfSelectedStickers({ x, y, Width, Height });
    }
    function changeStickerAnchors(Anchors_0, Anchors_1) {
        doChangeAnchorsOfSelectedStickers([Anchors_0, Anchors_1]);
    }
    function changeStickerOffsets(Offset_0, Offset_1, Offset_2, Offset_3) {
        doChangeOffsetsOfSelectedStickers([Offset_0, Offset_1, Offset_2, Offset_3]);
    }
    function changeBorderWidth(Index, Value) {
        let Settings = commonValue('BorderWidths');
        if ((Settings == null) || ValueIsSpecial(Settings)) {
            Settings = [0, 0, 0, 0];
        }
        Settings[Index] = Value;
        doConfigureSelectedStickers('BorderWidths', Settings);
    }
    function changeBorderStyle(Index, Value) {
        let Settings = commonValue('BorderStyles');
        if ((Settings == null) || ValueIsSpecial(Settings)) {
            Settings = ['none', 'none', 'none', 'none'];
        }
        Settings[Index] = Value;
        doConfigureSelectedStickers('BorderStyles', Settings);
    }
    function changeBorderColor(Index, Value) {
        let Settings = commonValue('BorderColors');
        if ((Settings == null) || ValueIsSpecial(Settings)) {
            Settings = ['black', 'black', 'black', 'black'];
        }
        Settings[Index] = Value;
        doConfigureSelectedStickers('BorderColors', Settings);
    }
    function changeBorderRadius(Index, Value) {
        let Settings = commonValue('BorderRadii');
        if ((Settings == null) || ValueIsSpecial(Settings)) {
            Settings = [0, 0, 0, 0];
        }
        Settings[Index] = Value;
        doConfigureSelectedStickers('BorderRadii', Settings);
    }
    function configureTextShadow(PropertyName, Value) {
        let Settings = commonValue('TextShadow');
        if ((Settings == null) || ValueIsSpecial(Settings)) {
            Settings = { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' };
        }
        doConfigureSelectedStickers('TextShadow', Object.assign(Object.assign({}, Settings), { [PropertyName]: Value }));
    }
    function configureBackgroundTexture(PropertyName, Value) {
        let Settings = commonValue('BackgroundTexture');
        if ((Settings == null) || ValueIsSpecial(Settings)) {
            Settings = { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 };
        }
        doConfigureSelectedStickers('BackgroundTexture', Object.assign(Object.assign({}, Settings), { [PropertyName]: Value }));
    }
    function configureBoxShadow(PropertyName, Value) {
        let Settings = commonValue('BoxShadow');
        if ((Settings == null) || ValueIsSpecial(Settings)) {
            Settings = { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, SpreadRadius: 0, Color: 'black' };
        }
        doConfigureSelectedStickers('BoxShadow', Object.assign(Object.assign({}, Settings), { [PropertyName]: Value }));
    }
    const activeScript = commonValue('Script');
    const pendingScript = commonValue('pendingScript');
    const ScriptIsPending = (pendingScript != null) && !ValueIsSpecial(pendingScript);
    const ScriptMayBeDeleted = (pendingScript == null) && (activeScript != null) && !ValueIsSpecial(activeScript);
    /**** toggleExpansionOf ****/
    function toggleExpansionOf(FoldName) {
        Expansions[FoldName] = !Expansions[FoldName];
        rerender();
    }
    /**** changePendingScript ****/
    function changePendingScript(Script) {
        doConfigureSelectedStickers('pendingScript', Script);
    }
    /**** applyPendingScript ****/
    function applyPendingScript() {
        doActivateSelectedStickerScripts();
    }
    /**** withdrawPendingScript ****/
    function withdrawPendingScript() {
        doConfigureSelectedStickers('pendingScript', '');
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        BasicsFold: { Header: 'Basics' },
        VariantInput: { style: 'width:200px' },
        NameInput: { style: 'width:200px' },
        SynopsisInput: {
            Placeholder: '(brief sticker description)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        FixCheck: {},
        PermanenceCheck: {},
        AutomaticCheck: {},
        ClassInput: {
            Placeholder: '(additional CSS classes)',
            style: 'width:200px',
        },
        StyleInput: {
            Placeholder: '(explicit CSS style settings)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        autoConfigurationCheck: {},
        autoPreservationCheck: {},
        VisibilityFold: { Header: 'Visibility and Enabling' },
        VisibilityCheck: {},
        OpacityInput: { style: 'width:70px', Minimum: 0, Maximum: 100 },
        horizontalOverflowChoice: { Options: ['auto', 'hidden', 'scroll'] },
        verticalOverflowChoice: { Options: ['auto', 'hidden', 'scroll'] },
        EnablingCheck: {},
        GeometryFold: { Header: 'Geometry' },
        PositionXInput: { style: 'width:70px' },
        PositionYInput: { style: 'width:70px' },
        WidthInput: { style: 'width:70px', Minimum: 0 },
        HeightInput: { style: 'width:70px', Minimum: 0 },
        horizontalAnchorsChoice: { Options: SIM_horizontalAnchorses },
        Offset0Input: { style: 'width:70px' },
        Offset1Input: { style: 'width:70px' },
        verticalAnchorsChoice: { Options: SIM_verticalAnchorses },
        Offset2Input: { style: 'width:70px' },
        Offset3Input: { style: 'width:70px' },
        minWidthInput: { style: 'width:70px', Minimum: 0 },
        minHeightInput: { style: 'width:70px', Minimum: 0 },
        maxWidthInput: { style: 'width:70px', Minimum: 0 },
        maxHeightInput: { style: 'width:70px', Minimum: 0 },
        TypographyFold: { Header: 'Typography' },
        FontFamilyInput: { style: 'width:200px' },
        FontSizeInput: { style: 'width:70px', Minimum: 0 },
        FontWeightChoice: { Options: SIM_FontWeights },
        FontStyleChoice: { Options: SIM_FontStyles },
        ColorInput: {},
        TextShadowCheck: {},
        TextShadowColorInput: {},
        TextShadowXOffsetInput: { style: 'width:70px' },
        TextShadowYOffsetInput: { style: 'width:70px' },
        TextShadowRadiusInput: { style: 'width:70px', Minimum: 0 },
        AlignmentChoice: { Options: SIM_TextAlignments },
        LineHeightInput: { style: 'width:70px', Minimum: 0 },
        BackgroundFold: { Header: 'Background' },
        BackgroundCheck: {},
        BackgroundColorInput: {},
        BackgroundTextureCheck: {},
        BackgroundModeChoice: { Options: SIM_BackgroundModes },
        BackgroundImageInput: { style: 'width:200px' },
        BackgroundXOffsetInput: { style: 'width:70px' },
        BackgroundYOffsetInput: { style: 'width:70px' },
        BorderFold: { Header: 'Border' },
        topBorderStyleChoice: { Options: SIM_BorderStyles },
        topBorderWidthInput: { style: 'width:70px' },
        topBorderColorInput: {},
        rightBorderStyleChoice: { Options: SIM_BorderStyles },
        rightBorderWidthInput: { style: 'width:70px' },
        rightBorderColorInput: {},
        bottomBorderStyleChoice: { Options: SIM_BorderStyles },
        bottomBorderWidthInput: { style: 'width:70px' },
        bottomBorderColorInput: {},
        leftBorderStyleChoice: { Options: SIM_BorderStyles },
        leftBorderWidthInput: { style: 'width:70px' },
        leftBorderColorInput: {},
        tlRadiusInput: { style: 'width:70px' },
        trRadiusInput: { style: 'width:70px' },
        blRadiusInput: { style: 'width:70px' },
        brRadiusInput: { style: 'width:70px' },
        BoxShadowFold: { Header: 'BoxShadow' },
        BoxShadowCheck: {},
        BoxShadowColorInput: {},
        BoxShadowXOffsetInput: { style: 'width:70px' },
        BoxShadowYOffsetInput: { style: 'width:70px' },
        BoxShadowBlurRadiusInput: { style: 'width:70px', Minimum: 0 },
        BoxShadowSpreadRadiusInput: { style: 'width:70px', Minimum: 0 },
        CursorFold: { Header: 'Cursor' },
        CursorChoice: { Options: SIM_Cursors },
        ScriptingFold: { Header: 'Scripting' },
        ScriptEditorButton: { Value: `${IconFolder}/square-code.png` },
        ApplyScriptButton: { Value: `${IconFolder}/check.png` },
        WithdrawScriptButton: { Value: `${IconFolder}/xmark.png` },
        DeleteScriptButton: { Value: `${IconFolder}/delete-left.png` },
        ScriptInput: {
            Placeholder: '(only for "custom" stickers)',
            style: 'width:100%; height:80px; resize:vertical', wrap: false,
        },
        customFold: { Header: 'Type-specific Settings' },
    });
    configure({
        BasicsFold: {
            expanded: (Expansions.Basics == true),
            onExpansionChange: () => toggleExpansionOf('Basics')
        },
        VariantInput: {
            Value: commonValue('Variant'),
        },
        NameInput: {
            disabled,
            Value: commonValue('Name'),
            onValueInput: (Value) => doConfigureSelectedStickers('Name', nullableString(Value))
        },
        SynopsisEditorButton: {
            active: DialogIsOpen('SynopsisEditor') && (DesignerState.SynopsisEditor.Scope === 'Sticker'),
            onClick: () => openDesignerTool('SynopsisEditor')
        },
        SynopsisInput: {
            disabled,
            Value: commonValue('Synopsis'),
            onValueInput: (Value) => doConfigureSelectedStickers('Synopsis', Value),
        },
        FixCheck: {
            disabled,
            Value: commonValue('fixed') == true,
            onValueInput: (Value) => doConfigureSelectedStickers('fixed', Value),
        },
        PermanenceCheck: {
            disabled,
            Value: commonValue('permanent') == true,
            onValueInput: (Value) => doConfigureSelectedStickers('permanent', Value),
        },
        AutomaticCheck: {
            disabled,
            Value: commonValue('automatic') == true,
            onValueInput: (Value) => doConfigureSelectedStickers('automatic', Value),
        },
        ClassInput: {
            disabled,
            Value: commonValue('Class'),
            onValueInput: (Value) => doConfigureSelectedStickers('Class', nullableString(Value))
        },
        StyleInput: {
            disabled,
            Value: commonValue('Style'),
            onValueInput: (Value) => doConfigureSelectedStickers('Style', nullableString(Value))
        },
        autoConfigurationCheck: {
            disabled,
            Value: commonValue('autoConfigureInput') == true,
            onValueInput: (Value) => doConfigureSelectedStickers('autoConfigureInput', Value),
        },
        autoPreservationCheck: {
            disabled,
            Value: commonValue('autoPreserveProject') == true,
            onValueInput: (Value) => doConfigureSelectedStickers('autoPreserveProject', Value),
        },
        VisibilityFold: {
            expanded: (Expansions.Visibility == true),
            onExpansionChange: () => toggleExpansionOf('Visibility')
        },
        VisibilityCheck: {
            disabled,
            Value: commonValue('hidden') == true,
            onValueInput: (Value) => doConfigureSelectedStickers('hidden', Value),
        },
        OpacityInput: {
            disabled,
            Value: commonValue('Opacity'),
            onValueInput: (Value) => doConfigureSelectedStickers('Opacity', nullableNumber(Value))
        },
        horizontalOverflowChoice: {
            disabled,
            Value: commonValueItem('Overflows', 0),
            onValueInput: (Value) => {
                let oldValue = commonValue('Overflows');
                if ((oldValue == null) || ValueIsSpecial(oldValue)) {
                    oldValue = ['hidden', 'hidden'];
                }
                doConfigureSelectedStickers('Overflows', [Value, oldValue[1]]);
            },
        },
        verticalOverflowChoice: {
            disabled,
            Value: commonValueItem('Overflows', 1),
            onValueInput: (Value) => {
                let oldValue = commonValue('Overflows');
                if ((oldValue == null) || ValueIsSpecial(oldValue)) {
                    oldValue = ['hidden', 'hidden'];
                }
                doConfigureSelectedStickers('Overflows', [oldValue[0], Value]);
            },
        },
        EnablingCheck: {
            disabled,
            Value: commonValue('disabled') == true,
            onValueInput: (Value) => doConfigureSelectedStickers('disabled', Value),
        },
        GeometryFold: {
            expanded: (Expansions.Geometry == true),
            onExpansionChange: () => toggleExpansionOf('Geometry')
        },
        PositionXInput: {
            disabled,
            Value: StickerGeometry.x,
            onValueInput: (Value) => changeStickerGeometry(nullableNumber(Value), null, null, null)
        },
        PositionYInput: {
            disabled,
            Value: StickerGeometry.y,
            onValueInput: (Value) => changeStickerGeometry(null, nullableNumber(Value), null, null)
        },
        WidthInput: {
            disabled,
            Value: StickerGeometry.Width,
            onValueInput: (Value) => changeStickerGeometry(null, null, nullableNumber(Value), null)
        },
        HeightInput: {
            disabled,
            Value: StickerGeometry.Height,
            onValueInput: (Value) => changeStickerGeometry(null, null, null, nullableNumber(Value))
        },
        horizontalAnchorsChoice: {
            disabled,
            Value: commonValueItem('Anchors', 0),
            onValueInput: (Value) => changeStickerAnchors(Value, null),
        },
        Offset0Input: {
            disabled,
            Value: commonValueItem('Offsets', 0),
            onValueInput: (Value) => changeStickerOffsets(nullableNumber(Value), null, null, null),
        },
        Offset1Input: {
            disabled,
            Value: commonValueItem('Offsets', 1),
            onValueInput: (Value) => changeStickerOffsets(null, nullableNumber(Value), null, null),
        },
        verticalAnchorsChoice: {
            disabled,
            Value: commonValueItem('Anchors', 1),
            onValueInput: (Value) => changeStickerAnchors(null, Value),
        },
        Offset2Input: {
            disabled,
            Value: commonValueItem('Offsets', 2),
            onValueInput: (Value) => changeStickerOffsets(null, null, nullableNumber(Value), null),
        },
        Offset3Input: {
            disabled,
            Value: commonValueItem('Offsets', 3),
            onValueInput: (Value) => changeStickerOffsets(null, null, null, nullableNumber(Value)),
        },
        minWidthInput: {
            disabled,
            Value: commonValue('minWidth'),
            onValueInput: (Value) => doConfigureSelectedStickers('minWidth', nullableNumber(Value))
        },
        minHeightInput: {
            disabled,
            Value: commonValue('minHeight'),
            onValueInput: (Value) => doConfigureSelectedStickers('minHeight', nullableNumber(Value))
        },
        maxWidthInput: {
            disabled,
            Value: commonValue('maxWidth'),
            onValueInput: (Value) => doConfigureSelectedStickers('maxWidth', nullableNumber(Value))
        },
        maxHeightInput: {
            disabled,
            Value: commonValue('maxHeight'),
            onValueInput: (Value) => doConfigureSelectedStickers('maxHeight', nullableNumber(Value))
        },
        TypographyFold: {
            expanded: (Expansions.Typography == true),
            onExpansionChange: () => toggleExpansionOf('Typography')
        },
        FontFamilyInput: {
            disabled,
            Value: commonValue('FontFamily'),
            onValueInput: (Value) => doConfigureSelectedStickers('FontFamily', nullableString(Value)),
        },
        FontSizeInput: {
            disabled,
            Value: commonValue('FontSize'),
            onValueInput: (Value) => doConfigureSelectedStickers('FontSize', nullableNumber(Value)),
        },
        FontWeightChoice: {
            disabled,
            Value: commonValue('FontWeight'),
            onValueInput: (Value) => doConfigureSelectedStickers('FontWeight', Value),
        },
        FontStyleChoice: {
            disabled,
            Value: commonValue('FontStyle'),
            onValueInput: (Value) => doConfigureSelectedStickers('FontStyle', Value),
        },
        ColorInput: {
            disabled,
            Value: commonValue('Color'),
            onValueInput: (Value) => doConfigureSelectedStickers('Color', Value),
        },
        TextShadowCheck: {
            disabled,
            Value: commonValueItem('TextShadow', 'isActive'),
            onValueInput: (Value) => configureTextShadow('isActive', Value),
        },
        TextShadowColorInput: {
            disabled,
            Value: commonValueItem('TextShadow', 'Color'),
            onValueInput: (Value) => configureTextShadow('Color', Value),
        },
        TextShadowXOffsetInput: {
            disabled,
            Value: commonValueItem('TextShadow', 'xOffset'),
            onValueInput: (Value) => configureTextShadow('xOffset', nullableNumber(Value)),
        },
        TextShadowYOffsetInput: {
            disabled,
            Value: commonValueItem('TextShadow', 'yOffset'),
            onValueInput: (Value) => configureTextShadow('yOffset', nullableNumber(Value)),
        },
        TextShadowRadiusInput: {
            disabled,
            Value: commonValueItem('TextShadow', 'BlurRadius'),
            onValueInput: (Value) => configureTextShadow('BlurRadius', nullableNumber(Value)),
        },
        AlignmentChoice: {
            disabled,
            Value: commonValue('TextAlignment'),
            onValueInput: (Value) => doConfigureSelectedStickers('TextAlignment', Value),
        },
        LineHeightInput: {
            disabled,
            Value: commonValue('LineHeight'),
            onValueInput: (Value) => doConfigureSelectedStickers('LineHeight', nullableNumber(Value)),
        },
        BackgroundFold: {
            expanded: (Expansions.Background == true),
            onExpansionChange: () => toggleExpansionOf('Background')
        },
        BackgroundCheck: {
            disabled,
            Value: commonValue('hasBackground') == true,
            onValueInput: (Value) => doConfigureSelectedStickers('hasBackground', Value),
        },
        BackgroundColorInput: {
            disabled,
            Value: commonValue('BackgroundColor'),
            onValueInput: (Value) => doConfigureSelectedStickers('BackgroundColor', Value),
        },
        BackgroundTextureCheck: {
            disabled,
            Value: commonValueItem('BackgroundTexture', 'isActive') == true,
            onValueInput: (Value) => configureBackgroundTexture('isActive', Value),
        },
        BackgroundModeChoice: {
            disabled,
            Value: commonValueItem('BackgroundTexture', 'Mode'),
            onValueInput: (Value) => configureBackgroundTexture('Mode', Value),
        },
        BackgroundImageInput: {
            disabled,
            Value: commonValueItem('BackgroundTexture', 'ImageURL'),
            onValueInput: (Value) => configureBackgroundTexture('ImageURL', nullableString(Value)),
        },
        BackgroundXOffsetInput: {
            disabled,
            Value: commonValueItem('BackgroundTexture', 'xOffset'),
            onValueInput: (Value) => configureBackgroundTexture('xOffset', nullableNumber(Value)),
        },
        BackgroundYOffsetInput: {
            disabled,
            Value: commonValueItem('BackgroundTexture', 'yOffset'),
            onValueInput: (Value) => configureBackgroundTexture('yOffset', nullableNumber(Value)),
        },
        BorderFold: {
            expanded: (Expansions.Border == true),
            onExpansionChange: () => toggleExpansionOf('Border')
        },
        topBorderStyleChoice: {
            disabled,
            Value: commonValueItem('BorderStyles', 0),
            onValueInput: (Value) => changeBorderStyle(0, Value),
        },
        topBorderWidthInput: {
            disabled,
            Value: commonValueItem('BorderWidths', 0),
            onValueInput: (Value) => changeBorderWidth(0, nullableNumber(Value)),
        },
        topBorderColorInput: {
            disabled,
            Value: commonValueItem('BorderColors', 0),
            onValueInput: (Value) => changeBorderColor(0, Value),
        },
        rightBorderStyleChoice: {
            disabled,
            Value: commonValueItem('BorderStyles', 1),
            onValueInput: (Value) => changeBorderStyle(1, Value),
        },
        rightBorderWidthInput: {
            disabled,
            Value: commonValueItem('BorderWidths', 1),
            onValueInput: (Value) => changeBorderWidth(1, nullableNumber(Value)),
        },
        rightBorderColorInput: {
            disabled,
            Value: commonValueItem('BorderColors', 1),
            onValueInput: (Value) => changeBorderColor(1, Value),
        },
        bottomBorderStyleChoice: {
            disabled,
            Value: commonValueItem('BorderStyles', 2),
            onValueInput: (Value) => changeBorderStyle(2, Value),
        },
        bottomBorderWidthInput: {
            disabled,
            Value: commonValueItem('BorderWidths', 2),
            onValueInput: (Value) => changeBorderWidth(2, nullableNumber(Value)),
        },
        bottomBorderColorInput: {
            disabled,
            Value: commonValueItem('BorderColors', 2),
            onValueInput: (Value) => changeBorderColor(2, Value),
        },
        leftBorderStyleChoice: {
            disabled,
            Value: commonValueItem('BorderStyles', 3),
            onValueInput: (Value) => changeBorderStyle(3, Value),
        },
        leftBorderWidthInput: {
            disabled,
            Value: commonValueItem('BorderWidths', 3),
            onValueInput: (Value) => changeBorderWidth(3, nullableNumber(Value)),
        },
        leftBorderColorInput: {
            disabled,
            Value: commonValueItem('BorderColors', 3),
            onValueInput: (Value) => changeBorderColor(3, Value),
        },
        tlRadiusInput: {
            disabled,
            Value: commonValueItem('BorderRadii', 0),
            onValueInput: (Value) => changeBorderRadius(0, nullableNumber(Value)),
        },
        trRadiusInput: {
            disabled,
            Value: commonValueItem('BorderRadii', 1),
            onValueInput: (Value) => changeBorderRadius(1, nullableNumber(Value)),
        },
        blRadiusInput: {
            disabled,
            Value: commonValueItem('BorderRadii', 2),
            onValueInput: (Value) => changeBorderRadius(2, nullableNumber(Value)),
        },
        brRadiusInput: {
            disabled,
            Value: commonValueItem('BorderRadii', 3),
            onValueInput: (Value) => changeBorderRadius(3, nullableNumber(Value)),
        },
        BoxShadowFold: {
            expanded: (Expansions.BoxShadow == true),
            onExpansionChange: () => toggleExpansionOf('BoxShadow')
        },
        BoxShadowCheck: {
            disabled,
            Value: commonValueItem('BoxShadow', 'isActive'),
            onValueInput: (Value) => configureBoxShadow('isActive', Value),
        },
        BoxShadowColorInput: {
            disabled,
            Value: commonValueItem('BoxShadow', 'Color'),
            onValueInput: (Value) => configureBoxShadow('Color', Value),
        },
        BoxShadowXOffsetInput: {
            disabled,
            Value: commonValueItem('BoxShadow', 'xOffset'),
            onValueInput: (Value) => configureBoxShadow('xOffset', nullableNumber(Value)),
        },
        BoxShadowYOffsetInput: {
            disabled,
            Value: commonValueItem('BoxShadow', 'yOffset'),
            onValueInput: (Value) => configureBoxShadow('yOffset', nullableNumber(Value)),
        },
        BoxShadowBlurRadiusInput: {
            disabled,
            Value: commonValueItem('BoxShadow', 'BlurRadius'),
            onValueInput: (Value) => configureBoxShadow('BlurRadius', nullableNumber(Value)),
        },
        BoxShadowSpreadRadiusInput: {
            disabled,
            Value: commonValueItem('BoxShadow', 'SpreadRadius'),
            onValueInput: (Value) => configureBoxShadow('SpreadRadius', nullableNumber(Value)),
        },
        CursorFold: {
            expanded: (Expansions.Cursor == true),
            onExpansionChange: () => toggleExpansionOf('Cursor')
        },
        CursorChoice: {
            disabled,
            Value: commonValue('Cursor'),
            onValueInput: (Value) => doConfigureSelectedStickers('Cursor', Value),
        },
        ScriptingFold: {
            expanded: (Expansions.Scripting == true),
            onExpansionChange: () => toggleExpansionOf('Scripting')
        },
        ScriptEditorButton: {
            active: DialogIsOpen('ScriptEditor') && (DesignerState.ScriptEditor.Scope === 'Sticker'),
            onClick: () => openDesignerTool('ScriptEditor')
        },
        ApplyScriptButton: {
            disabled: disabled || !ScriptIsPending,
            onClick: () => applyPendingScript(),
        },
        WithdrawScriptButton: {
            disabled: disabled || !ScriptIsPending,
            onClick: () => withdrawPendingScript(),
        },
        DeleteScriptButton: {
            disabled: !ScriptMayBeDeleted,
            onClick: () => applyPendingScript(),
        },
        ScriptInput: {
            disabled,
            Value: pendingScript !== null && pendingScript !== void 0 ? pendingScript : activeScript,
            onValueInput: (Value) => changePendingScript(Value),
        },
        customFold: {
            expanded: (Expansions.custom == true),
            onExpansionChange: () => toggleExpansionOf('custom')
        },
    });
    /**** actual rendering ****/
    return html `<${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto; overflow:hidden">
      <${sim.Subtitle}>Sticker Configuration</>
    <${sim.vertical} gap=${4} style="width:100%; flex:1 1 auto; overflow:hidden scroll"
      ref=${scrollablePane} onScroll=${updateScrollPosition}
    >
      <${sim.AccordionFold} ...${Configuration.BasicsFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Variant</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} readonly ...${Configuration.VariantInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Name</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} ...${Configuration.NameInput}/>
        </>

        <${sim.horizontal}>
          <${sim.Label}>Synopsis</>
          <div style="width:10px"/>
          <${sim.Icon} ...${Configuration.SynopsisEditorButton}/>
        </>
        <${sim.TextInput} ...${Configuration.SynopsisInput}/>

        <${sim.horizontal}>
          <${sim.Label}>is fixed</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.FixCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>is permanent</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.PermanenceCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>was automatically generated</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.AutomaticCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>CSS Classes</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} ...${Configuration.ClassInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>CSS Style</>
        </>
        <${sim.TextInput} ...${Configuration.StyleInput}/>
        <${sim.horizontal}>
          <${sim.Label}>auto-configure Input</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.autoConfigurationCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>auto-preserve Project</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.autoPreservationCheck}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.VisibilityFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>is hidden</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.VisibilityCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Opacity [%]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.OpacityInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Overflows</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.horizontalOverflowChoice}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.DropDown} ...${Configuration.verticalOverflowChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>is disabled</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.EnablingCheck}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.GeometryFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Position (x,y) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.PositionXInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.PositionYInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Size (w,h) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.WidthInput}/>
          <${sim.Description} style="width:10px; text-align:center">x</>
          <${sim.NumberInput} ...${Configuration.HeightInput}/>
        </>

        <${sim.horizontal}>
          <${sim.Icon} Value=${IconFolder}/arrows-left-right.png/>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} readonly ...${Configuration.horizontalAnchorsChoice}/>
          <div style="width:10px"/>
          <${sim.NumberInput} ...${Configuration.Offset0Input}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.Offset1Input}/>
        </>

        <${sim.horizontal}>
          <${sim.Icon} Value=${IconFolder}/arrows-up-down.png/>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} readonly ...${Configuration.verticalAnchorsChoice}/>
          <div style="width:10px"/>
          <${sim.NumberInput} ...${Configuration.Offset2Input}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.Offset3Input}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.TypographyFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Font Family</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} ...${Configuration.FontFamilyInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Type Setting</>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Font Size [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.FontSizeInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Font Weight</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.FontWeightChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Font Style</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.FontStyleChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Foreground Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.ColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Text Shadow</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.TextShadowCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.TextShadowColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Offset (dx,dy) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.TextShadowXOffsetInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.TextShadowYOffsetInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Blur Radius [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.TextShadowRadiusInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Text Layout</>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Text Alignment</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.AlignmentChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Line Height [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.LineHeightInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.BackgroundFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Background</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.BackgroundCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.BackgroundColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Texture</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.BackgroundTextureCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Mode</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.BackgroundModeChoice}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Image URL</>
          <${sim.expandingSpacer}/>
          <${sim.URLInput} ...${Configuration.BackgroundImageInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">Offset (dx,dy) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.BackgroundXOffsetInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.BackgroundYOffsetInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.BorderFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.Label}>Border Lines</>

        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">top</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown}    ...${Configuration.topBorderStyleChoice}/>
          <div style="width:10px"/>
          <${sim.NumberInput} ...${Configuration.topBorderWidthInput}/>
          <div style="width:10px"/>
          <${sim.ColorInput}  ...${Configuration.topBorderColorInput}/>
        </>

        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">right</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown}    ...${Configuration.rightBorderStyleChoice}/>
          <div style="width:10px"/>
          <${sim.NumberInput} ...${Configuration.rightBorderWidthInput}/>
          <div style="width:10px"/>
          <${sim.ColorInput}  ...${Configuration.rightBorderColorInput}/>
        </>

        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">bottom</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown}    ...${Configuration.bottomBorderStyleChoice}/>
          <div style="width:10px"/>
          <${sim.NumberInput} ...${Configuration.bottomBorderWidthInput}/>
          <div style="width:10px"/>
          <${sim.ColorInput}  ...${Configuration.bottomBorderColorInput}/>
        </>

        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">left</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown}    ...${Configuration.leftBorderStyleChoice}/>
          <div style="width:10px"/>
          <${sim.NumberInput} ...${Configuration.leftBorderWidthInput}/>
          <div style="width:10px"/>
          <${sim.ColorInput}  ...${Configuration.leftBorderColorInput}/>
        </>

        <${sim.Label}>Border Radii [px]</>

        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">top-left/right</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.tlRadiusInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.trRadiusInput}/>
        </>

        <${sim.horizontal}>
          <${sim.Label} style="padding-left:10px">bottom-left/right</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.blRadiusInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.brRadiusInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.BoxShadowFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Box Shadow</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} ...${Configuration.BoxShadowCheck}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Color</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} ...${Configuration.BoxShadowColorInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Offset (dx,dy) [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.BoxShadowXOffsetInput}/>
          <${sim.Description} style="width:10px; text-align:center">,</>
          <${sim.NumberInput} ...${Configuration.BoxShadowYOffsetInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Spread Radius [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.BoxShadowBlurRadiusInput}/>
        </>
        <${sim.horizontal}>
          <${sim.Label}>Blur Radius [px]</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} ...${Configuration.BoxShadowSpreadRadiusInput}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.CursorFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Cursor Type</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} ...${Configuration.CursorChoice}/>
        </>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.ScriptingFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
        <${sim.horizontal}>
          <${sim.Label}>Script</>
          <div style="width:10px"/>
          <${sim.Icon} ...${Configuration.ScriptEditorButton}/>
          <${sim.expandingSpacer}/>
          <${sim.Icon} ...${Configuration.ApplyScriptButton}/>
          <div style="width:10px"/>
          <${sim.Icon} ...${Configuration.WithdrawScriptButton}/>
          <div style="width:40px"/>
          <${sim.Icon} ...${Configuration.DeleteScriptButton}/>
        </>
        <${sim.TextInput} ...${Configuration.ScriptInput}/>
       </>
      </>

      <${sim.AccordionFold} ...${Configuration.customFold}>
       <${sim.vertical} gap=${4} style="padding:4px">
         <${configurablePropertyRenderer} disabled=${disabled}
           commonValue=${commonValue}/>
       </>
      </>
    </>
    </>`;
};
/**** configurablePropertyRenderer ****/
const configurablePropertyRenderer = (PropSet) => {
    var _a;
    const { disabled, commonValue } = PropSet;
    const Variant = commonValue('Variant');
    if (ValueIsSpecial(Variant)) {
        return html `<div style="width:100%; height:80px">
        <${sim.centered}>
          ${Variant === SIM_noSelection ? '(no selection)' : '(multiple sticker variants)'}
        </>
      </>`;
    }
    const PropertyDescriptors = (_a = VariantRegistry[Variant].PropertyDescriptors) !== null && _a !== void 0 ? _a : [];
    if (PropertyDescriptors.length === 0) {
        return html `<div style="width:100%; height:80px">
        <${sim.centered}>'(no custom properties)'</>
      </>`;
    }
    return PropertyDescriptors.map((Descriptor) => (html `<${configurablePropertyLine} Descriptor=${Descriptor}
        disabled=${disabled} commonValue=${commonValue}
      />`));
};
/**** configurablePropertyRenderer ****/
const configurablePropertyLine = (PropSet) => {
    var _a;
    const { doConfigureSelectedStickers } = DesignerAPI();
    const { Descriptor, disabled, commonValue } = PropSet;
    const { Name, Label, readonly, Default } = Descriptor;
    const Value = (_a = commonValue(Name)) !== null && _a !== void 0 ? _a : Default;
    function changeValue(Value) {
        doConfigureSelectedStickers(Name, Value);
    }
    const { Placeholder, FalseValue, TrueValue, minLength, maxLength, multiple, Pattern, minValue, maxValue, Stepping, Resizability, LineWrapping, SpellChecking, Hashmarks, Suggestions, ValueList } = Descriptor;
    const EditorType = Descriptor.EditorType;
    switch (EditorType) {
        case 'checkbox':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.Checkbox} disabled=${disabled}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'choice':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} disabled=${disabled} Options=${[FalseValue, TrueValue]}
            Value=${Value} onValueInput=${(Value) => changeValue(Value === TrueValue)}/>
        </>`;
        case 'textline-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.TextlineInput} style="width:200px"
            disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
            Pattern=${Pattern} SpellCheck=${SpellChecking} Suggestions=${Suggestions}
            Value=${Value !== null && Value !== void 0 ? Value : ''} onValueInput=${changeValue}/>
        </>`;
        case 'password-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.PasswordInput} style="width:200px"
            disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
            Pattern=${Pattern}
            Value=${Value !== null && Value !== void 0 ? Value : ''} onValueInput=${changeValue}/>
        </>`;
        case 'number-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} style="width:70px"
            disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} min=${minValue} max=${maxValue} step=${Stepping}
            Suggestions=${Suggestions}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'integer-input': // all given values should already be integers
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.NumberInput} style="width:70px"
            disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} min=${minValue} max=${maxValue} step=${1}
            Suggestions=${Suggestions}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'search-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.SearchInput} style="width:200px"
            disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
            Pattern=${Pattern} SpellCheck=${SpellChecking} Suggestions=${Suggestions}
            Value=${Value !== null && Value !== void 0 ? Value : ''} onValueInput=${changeValue}/>
        </>`;
        case 'email-address-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.EMailAddressInput} style="width:200px"
            disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
            Pattern=${Pattern} Suggestions=${Suggestions} multiple=${multiple}
            Value=${Value !== null && Value !== void 0 ? Value : ''} onValueInput=${changeValue}/>
        </>`;
        case 'phone-number-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.PhoneNumberInput} style="width:200px"
            disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
            Pattern=${Pattern} Suggestions=${Suggestions}
            Value=${Value !== null && Value !== void 0 ? Value : ''} onValueInput=${changeValue}/>
        </>`;
        case 'url-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.URLInput} style="width:200px"
            disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
            Pattern=${Pattern} Suggestions=${Suggestions}
            Value=${Value !== null && Value !== void 0 ? Value : ''} onValueInput=${changeValue}/>
        </>`;
        case 'time-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.TimeInput} disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} min=${minValue} max=${maxValue}
            Suggestions=${Suggestions} withSeconds=${Stepping === 1}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'date-time-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.DateTimeInput} disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} min=${minValue} max=${maxValue}
            Suggestions=${Suggestions} withSeconds=${Stepping === 1}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'date-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.DateInput} disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} min=${minValue} max=${maxValue}
            Suggestions=${Suggestions}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'week-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.WeekInput} disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} min=${minValue} max=${maxValue}
            Suggestions=${Suggestions}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'month-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.MonthInput} disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} min=${minValue} max=${maxValue}
            Suggestions=${Suggestions}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'color-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.ColorInput} disabled=${disabled} readonly=${readonly}
            Suggestions=${Suggestions}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'drop-down':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.DropDown} disabled=${disabled} readonly=${readonly}
            Options=${ValueList}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'slider':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
          <${sim.expandingSpacer}/>
          <${sim.Slider} style="width:200px"
            disabled=${disabled} readonly=${readonly}
            Placeholder=${Placeholder} min=${minValue} max=${maxValue} step=${Stepping}
            Hashmarks=${Hashmarks}
            Value=${Value} onValueInput=${changeValue}/>
        </>`;
        case 'text-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
        </>
        <${sim.TextInput} style="width:100%; height:80px"
          disabled=${disabled} readonly=${readonly}
          Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
          wrap=${LineWrapping} SpellCheck=${SpellChecking} Resizability=${Resizability}
          Value=${Value} onValueInput=${changeValue}
        />`;
        case 'html-input':
        case 'css-input':
        case 'javascript-input':
        case 'json-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
        </>
        <${sim.TextInput} style="width:100%; height:80px"
          disabled=${disabled} readonly=${readonly}
          Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
          wrap=${false} SpellCheck=${false} Resizability=${Resizability}
          Value=${Value} onValueInput=${changeValue}
        />`;
        case 'linelist-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
        </>
        <${sim.TextInput} style="width:100%; height:80px"
          disabled=${disabled} readonly=${readonly}
          Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
          wrap=${false} SpellCheck=${false} Resizability=${Resizability}
          Value=${(Value !== null && Value !== void 0 ? Value : []).join('\n')}
          onValueInput=${(Value) => {
                const LineList = Value.split('\n').filter((Line) => Line.trim() !== '');
                changeValue(LineList);
            }}
        />`;
        case 'numberlist-input':
            return html `<${sim.horizontal}>
          <${sim.Label}>${Label !== null && Label !== void 0 ? Label : Name}</>
        </>
        <${sim.TextInput} style="width:100%; height:80px"
          disabled=${disabled} readonly=${readonly}
          Placeholder=${Placeholder} minLength=${minLength} maxLength=${maxLength}
          wrap=${false} SpellCheck=${false} Resizability=${Resizability}
          Value=${(Value !== null && Value !== void 0 ? Value : []).join('\n')}
          onValueInput=${(Value) => {
                const LineList = Value.split('\n').filter((Line) => Line.trim() !== '');
                const NumberList = LineList.map(parseFloat).filter((Value) => !isNaN(Value));
                changeValue(NumberList);
            }}
        />`;
    }
};
/**** ConfiguratorRenderer ****/
const ConfiguratorRenderer = (PropSet) => {
    const { DesignerState, } = DesignerAPI();
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({});
    configure({});
    /**** actual rendering ****/
    return undefined;
};
/**** SynopsisEditorRenderer ****/
const SynopsisEditorRenderer = (PropSet) => {
    const { DesignerState, rerender, Project, activeBoard, doConfigureSelectedVariants, doConfigureProject, doConfigureVisitedBoard, doConfigureSelectedBoards, doConfigureSelectedStickers, } = DesignerAPI();
    const selectedVariants = DesignerState.selectedVariants;
    const selectedBoards = DesignerState.selectedBoards;
    const selectedStickers = DesignerState.selectedStickers;
    const Scope = DesignerState.SynopsisEditor.Scope;
    const disabled = ((Scope === 'selectedVariants') && (selectedVariants.size === 0) ||
        (Scope === 'selectedBoards') && (selectedBoards.size === 0) ||
        (Scope === 'selectedStickers') && (selectedStickers.size === 0));
    let Candidates;
    switch (Scope) {
        case 'selectedVariants':
            Candidates = [...selectedVariants];
            break;
        case 'Project':
            Candidates = [Project];
            break;
        case 'activeBoard':
            Candidates = [activeBoard];
            break;
        case 'selectedBoards':
            Candidates = [...selectedBoards];
            break;
        case 'selectedStickers':
            Candidates = [...selectedStickers];
            break;
    }
    // @ts-ignore TS2454 "Candidates" _will_ be defined
    const Value = commonValueOf(Candidates.map((Candidate) => Candidate.Synopsis));
    /**** changeScope ****/
    function changeScope(Scope) {
        DesignerState.SynopsisEditor.Scope = Scope;
        rerender();
    }
    /**** changeSynopsis ****/
    function changeSynopsis(Synopsis) {
        switch (Scope) {
            case 'selectedVariants':
                doConfigureSelectedVariants('Synopsis', Synopsis);
                break;
            case 'Project':
                doConfigureProject('Synopsis', Synopsis);
                break;
            case 'activeBoard':
                doConfigureVisitedBoard('Synopsis', Synopsis);
                break;
            case 'selectedBoards':
                doConfigureSelectedBoards('Synopsis', Synopsis);
                break;
            case 'selectedStickers':
                doConfigureSelectedStickers('Synopsis', Synopsis);
                break;
        }
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        ScopeChoice: {},
        TextInput: { Placeholder: '(brief description)' },
    });
    configure({
        ScopeChoice: {
            Options: [
                'selectedVariants:' + (selectedVariants.size === 0 ? '-' : '') + 'selected Variants',
                'Project:Project',
                'activeBoard:active Board',
                'selectedBoards:' + (selectedBoards.size === 0 ? '-' : '') + 'selected Boards',
                'selectedStickers:' + (selectedStickers.size === 0 ? '-' : '') + 'selected Stickers'
            ],
            Value: Scope, onValueInput: changeScope
        },
        TextInput: { disabled, Value, onValueInput: changeSynopsis },
    });
    /**** actual rendering ****/
    return html `
    <${sim.vertical} style="padding:4px">
      <${sim.horizontal} style="padding:4px">
        <${sim.Label}>Scope:</>
        <div style="width:10px"/>
        <${sim.DropDown} ...${Configuration.ScopeChoice}/>
      </>
      <${sim.horizontalSeparator}/>
      <${sim.TextInput} ...${Configuration.TextInput} style="width:100%; flex:1 1 auto"/>
    </>
    `;
};
/**** ValueEditorRenderer ****/
const ValueEditorRenderer = (PropSet) => {
    const { DesignerState, rerender, StickerSelection, doConfigureSelectedStickers, } = DesignerAPI();
    const selectedStickers = StickerSelection();
    let StickerName = commonValueOf(selectedStickers.map((Sticker) => Sticker.Name));
    let EditorType = commonValueOf(selectedStickers.map((Sticker) => { var _a; return (_a = Sticker.configurableProperty('Value')) === null || _a === void 0 ? void 0 : _a.EditorType; }));
    let ValueType;
    switch (EditorType) {
        case 'textline-input':
        case 'password-input':
        case 'search-input':
        case 'phone-number-input':
        case 'email-address-input':
        case 'url-input':
        case 'color-input':
        case 'drop-down':
            ValueType = 'textline';
            break;
        case 'number-input':
        case 'integer-input':
        case 'slider':
            ValueType = 'number';
            break;
        case 'text-input':
        case 'html-input':
        case 'css-input':
        case 'javascript-input':
        case 'json-input':
            ValueType = 'text';
            break;
        case 'linelist-input':
            ValueType = 'linelist';
            break;
        case 'numberlist-input':
            ValueType = 'numberlist';
            break;
    }
    const disabled = (selectedStickers.length === 0) || ValueIsSpecial(EditorType);
    const invalid = useRef();
    if (invalid.current == null) {
        invalid.current = false;
    }
    let ValueToEdit = commonValueOf(selectedStickers.map((Sticker) => Sticker.Value));
    switch (true) {
        case (ValueToEdit == null):
            ValueToEdit = '';
            break;
        case (ValueType === 'number'):
            ValueToEdit = '' + ValueToEdit;
            break;
        case (ValueType === 'linelist'):
        case (ValueType === 'numberlist'):
            ValueToEdit = ValueToEdit.join('\n');
            break;
    }
    function changeValue(Value) {
        let parsedValue = Value;
        switch (ValueType) {
            case 'number':
                parsedValue = parseFloat(Value);
                break;
            case 'linelist':
                parsedValue = Value.split('\n');
                break;
            case 'numberlist':
                parsedValue = Value.split('\n').map((Line) => parseFloat(Line));
                break;
        }
        try {
            doConfigureSelectedStickers('Value', parsedValue);
            invalid.current = false;
        }
        catch (Signal) {
            invalid.current = true;
        }
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        StickerView: { Placeholder: '(selected stickers)' },
        TextInput: { Placeholder: '(new value)' },
    });
    configure({
        StickerView: { Value: StickerName },
        TextInput: { disabled, invalid: invalid.current, Value: ValueToEdit, onValueInput: changeValue },
    });
    /**** actual rendering ****/
    return html `
    <${sim.vertical} style="padding:4px">
      <${sim.horizontal} style="padding:4px">
        <${sim.Label}>Sticker(s):</>
        <div style="width:10px"/>
        <${sim.TextlineInput} readonly ...${Configuration.StickerView}/>
      </>
      <${sim.horizontalSeparator}/>
      <${sim.TextInput} ...${Configuration.TextInput} style="width:100%; flex:1 1 auto"/>
    </>
    `;
};
/**** ScriptEditorRenderer ****/
const ScriptEditorRenderer = (PropSet) => {
    var _a;
    const { DesignerState, rerender, Project, activeBoard, doConfigureSelectedVariants, doConfigureProject, doConfigureVisitedBoard, doConfigureSelectedBoards, doConfigureSelectedStickers, doActivateVariantScripts, doActivateProjectScript, doActivateVisitedBoardScript, doActivateSelectedBoardsScript, doActivateSelectedStickerScripts, } = DesignerAPI();
    const selectedVariants = DesignerState.selectedVariants;
    const selectedBoards = DesignerState.selectedBoards;
    const selectedStickers = DesignerState.selectedStickers;
    const Scope = DesignerState.ScriptEditor.Scope;
    const disabled = ( // general disabling
    (Scope === 'selectedVariants') && (selectedVariants.size === 0) ||
        (Scope === 'selectedBoards') && (selectedBoards.size === 0) ||
        (Scope === 'selectedStickers') && (selectedStickers.size === 0));
    let Candidates = [];
    switch (Scope) {
        case 'selectedVariants':
            Candidates = [...selectedVariants];
            break;
        case 'Project':
            Candidates = [Project];
            break;
        case 'activeBoard':
            Candidates = [activeBoard];
            break;
        case 'selectedBoards':
            Candidates = [...selectedBoards];
            break;
        case 'selectedStickers':
            Candidates = [...selectedStickers];
            break;
    }
    const activeScript = commonValueOf(Candidates.map((Candidate) => Candidate.Script));
    const pendingScript = commonValueOf(Candidates.map((Candidate) => Candidate.pendingScript));
    const ScriptIsPending = (pendingScript != null) && !ValueIsSpecial(pendingScript);
    const ScriptMayBeDeleted = (pendingScript == null) && (activeScript != null) && !ValueIsSpecial(activeScript);
    const ErrorReport = commonValueOf(Candidates.map((Candidate) => Candidate[$ErrorReport]));
    const pendingScriptError = commonValueOf(Candidates.map((Candidate) => Candidate[$pendingScriptError]));
    const ErrorToShow = (_a = pendingScriptError === null || pendingScriptError === void 0 ? void 0 : pendingScriptError.Message) !== null && _a !== void 0 ? _a : ErrorReport === null || ErrorReport === void 0 ? void 0 : ErrorReport.Message;
    /**** changeScope ****/
    function changeScope(Scope) {
        DesignerState.ScriptEditor.Scope = Scope;
        rerender();
    }
    /**** changePendingScript ****/
    function changePendingScript(Script) {
        switch (Scope) {
            case 'selectedVariants':
                doConfigureSelectedVariants('pendingScript', Script);
                break;
            case 'Project':
                doConfigureProject('pendingScript', Script);
                break;
            case 'activeBoard':
                doConfigureVisitedBoard('pendingScript', Script);
                break;
            case 'selectedBoards':
                doConfigureSelectedBoards('pendingScript', Script);
                break;
            case 'selectedStickers':
                doConfigureSelectedStickers('pendingScript', Script);
                break;
        }
    }
    /**** applyPendingScript ****/
    function applyPendingScript() {
        switch (Scope) {
            case 'selectedVariants':
                doActivateVariantScripts();
                break;
            case 'Project':
                doActivateProjectScript();
                break;
            case 'activeBoard':
                doActivateVisitedBoardScript();
                break;
            case 'selectedBoards':
                doActivateSelectedBoardsScript();
                break;
            case 'selectedStickers':
                doActivateSelectedStickerScripts();
                break;
        }
    }
    /**** withdrawPendingScript ****/
    function withdrawPendingScript() {
        switch (Scope) {
            case 'selectedVariants':
                doConfigureSelectedVariants('pendingScript', '');
                break;
            case 'Project':
                doConfigureProject('pendingScript', '');
                break;
            case 'activeBoard':
                doConfigureVisitedBoard('pendingScript', '');
                break;
            case 'selectedBoards':
                doConfigureSelectedBoards('pendingScript', '');
                break;
            case 'selectedStickers':
                doConfigureSelectedStickers('pendingScript', '');
                break;
        }
    }
    /**** showError ****/
    function showError() {
        if (ErrorReport != null) {
            console.warn(ErrorReport);
            window.alert(ErrorMessageFor(ErrorToShow));
        }
        else {
            console.warn(pendingScriptError);
            window.alert(`Compilation Error\n\n${pendingScriptError.Message}`);
        }
    }
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        ScopeChoice: {},
        ApplyButton: { Value: `${IconFolder}/check.png` },
        WithdrawButton: { Value: `${IconFolder}/xmark.png` },
        DeleteScriptButton: { Value: `${IconFolder}/delete-left.png` },
        TextInput: { Placeholder: '(script)' },
        ErrorView: { Placeholder: '(no error found)' },
        ErrorButton: { Value: `${IconFolder}/triangle-exclamation.png` },
    });
    configure({
        ScopeChoice: {
            Options: [
                'selectedVariants:' + (selectedVariants.size === 0 ? '-' : '') + 'selected Variants',
                'Project:Project',
                'activeBoard:active Board',
                'selectedBoards:' + (selectedBoards.size === 0 ? '-' : '') + 'selected Boards',
                'selectedStickers:' + (selectedStickers.size === 0 ? '-' : '') + 'selected Stickers'
            ],
            Value: Scope, onValueInput: changeScope
        },
        ApplyButton: { disabled: disabled || !ScriptIsPending, onClick: applyPendingScript },
        WithdrawButton: { disabled: disabled || !ScriptIsPending, onClick: withdrawPendingScript },
        DeleteScriptButton: { disabled: disabled || !ScriptMayBeDeleted, onClick: applyPendingScript },
        TextInput: { disabled, Value: pendingScript !== null && pendingScript !== void 0 ? pendingScript : activeScript, onValueInput: changePendingScript },
        ErrorView: { Value: ErrorToShow !== null && ErrorToShow !== void 0 ? ErrorToShow : '' },
        ErrorButton: { disabled: disabled || (ErrorToShow == null), onClick: showError },
    });
    /**** actual rendering ****/
    return html `
    <${sim.vertical} style="padding:4px">
      <${sim.horizontal} style="padding:4px">
        <${sim.Label}>Scope:</>
        <div style="width:10px"/>
        <${sim.DropDown} ...${Configuration.ScopeChoice}/>
        <${sim.expandingSpacer}/>
        <${sim.Icon} ...${Configuration.ApplyButton}/>
        <div style="width:10px"/>
        <${sim.Icon} ...${Configuration.WithdrawButton}/>
        <div style="width:40px"/>
        <${sim.Icon} ...${Configuration.DeleteScriptButton}/>
      </>
      <${sim.horizontalSeparator}/>
      <${sim.TextInput} ...${Configuration.TextInput} style="width:100%; flex:1 1 auto"/>
      <${sim.horizontalSeparator}/>
      <${sim.horizontal} style="padding:4px">
        <${sim.TextlineInput} readonly ...${Configuration.ErrorView} style="flex:1 1 auto"/>
        <${sim.Spacer} style="width:8px"/>
        <${sim.Icon} ...${Configuration.ErrorButton}/>
      </>
    </>
    `;
};
/**** AIConfiguratorRenderer ****/
const AIConfiguratorRenderer = (PropSet) => {
    const { DesignerState, } = DesignerAPI();
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({});
    configure({});
    /**** actual rendering ****/
    return undefined;
};
/**** AIChatRenderer ****/
const AIChatRenderer = (PropSet) => {
    const { DesignerState, } = DesignerAPI();
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({});
    configure({});
    /**** actual rendering ****/
    return undefined;
};
/**** AIBuddyRenderer ****/
const AIBuddyRenderer = (PropSet) => {
    const { DesignerState, } = DesignerAPI();
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({});
    configure({});
    /**** actual rendering ****/
    return undefined;
};
/**** SearchDialogRenderer ****/
const SearchDialogRenderer = (PropSet) => {
    const { DesignerState, } = DesignerAPI();
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({});
    configure({});
    /**** actual rendering ****/
    return undefined;
};
/**** ConsoleRenderer ****/
const ConsoleRenderer = (PropSet) => {
    const { Project } = DesignerAPI();
    /**** Configuration Handling ****/
    const [Configuration, configure] = useConfiguration({
        Console: {},
        ClearButton: {
            Value: `${IconFolder}/delete-left.png`,
            onClick: () => Console_clear(Project)
        },
    });
    configure({
        Console: { Value: Project[$Console] },
        ClearButton: { disabled: Project[$Console].length === 0 },
    });
    /**** actual rendering ****/
    return html `
    <${sim.TextInput} readonly ...${Configuration.Console} style="width:100%; height:100%"/>
    <${sim.Icon} ...${Configuration.ClearButton} style="position:absolute; right:40px; top:-26px"/>
    `;
};
//------------------------------------------------------------------------------
//--                           auxiliary Functions                            --
//------------------------------------------------------------------------------
/**** nestedOptionListForVariants ****/
function nestedOptionListForVariants() {
    const groupedVariants = groupedVariantList();
    delete groupedVariants['sim/special'];
    delete groupedVariants['sim/basic'];
    delete groupedVariants['sim/native'];
    delete groupedVariants['sim/common'];
    const sortedGroupList = Array.from(Object.keys(groupedVariants)).sort();
    sortedGroupList.forEach((GroupName) => groupedVariants[GroupName].sort((A, B) => A[$normalizedName].localeCompare(B[$normalizedName])));
    let OptionList = html `
      <option value="" disabled>(please select a Sticker Variant)</>
      <optgroup label="special Stickers">
        <option value="sim/special/custom">custom (scriptable)</>
        <option value="" disabled>----</>
        <option value="sim/special/compound">Compound</>
        <option value="" disabled>----</>
        <option value="sim/special/placeholder">Placeholder</>
        <option value="sim/special/content"    >Content (for Placeholder)</>
        <option value="" disabled>----</>
        <option value="sim/special/overlay">Overlay</>
        <option value="sim/special/dialog" >Dialog</>
        <option value="" disabled>----</>
        <option value="sim/special/template">Template</>
        <option value="" disabled>----</>
        <option value="sim/special/single-page-applet">Single-Page Applet (for WebApp export)</>
        <option value="sim/special/applet">Applet (for WebApp export)</>
        <option value="sim/special/page"  >Page (dto.)</>
      </>
      <optgroup label="basic Stickers">
        <option value="sim/basic/dummy"  >Dummy</>
        <option value="sim/basic/outline">Outline</>
        <option value="" disabled>----</>
        <option value="sim/basic/horizontalseparator">horizontal Separator</>
        <option value="sim/basic/verticalseparator"  >vertical Separator</>
        <option value="" disabled>----</>
        <option value="sim/basic/title"      >Title</>
        <option value="sim/basic/subtitle"   >Subitle</>
        <option value="sim/basic/label"      >Label</>
        <option value="sim/basic/description">Description</>
        <option value="sim/basic/fineprint"  >Fineprint</>
        <option value="" disabled>----</>
        <option value="sim/basic/textview"    >TextView</>
        <option value="sim/basic/htmlview"    >HTMLew</>
        <option value="sim/basic/markdownview">MarkdownView</>
        <option value="sim/basic/imageview"   >ImageView</>
        <option value="sim/basic/svgview"     >SVGView</>
        <option value="sim/basic/webview"     >WebView</>
        <option value="" disabled>----</>
        <option value="sim/basic/icon"  >Icon</>
        <option value="sim/basic/faicon">FAIcon (Font Awesome)</>
      </>
      <optgroup label="native HTML Input Stickers">
        <option value="sim/native/button"     >Button</>
        <option value="sim/native/checkbox"   >Checkbox</>
        <option value="sim/native/radiobutton">Radiobutton</>
        <option value="" disabled>----</>
        <option value="sim/native/gauge"      >Gauge</>
        <option value="sim/native/progressbar">Progressbar</>
        <option value="sim/native/slider"     >Slider</>
        <option value="" disabled>----</>
        <option value="sim/native/textlineinput"    >TextlineInput</>
        <option value="sim/native/passwordinput"    >PasswordInput</>
        <option value="sim/native/numberinput"      >NumberInput</>
        <option value="sim/native/emailaddressinput">EMailAddressInput</>
        <option value="sim/native/phonenumberinput" >PhoneNumberInput</>
        <option value="sim/native/urlinput"         >URLInput</>
        <option value="sim/native/timeinput"        >TimeInput</>
        <option value="sim/native/datetimeinput"    >DateTimeInput</>
        <option value="sim/native/dateinput"        >DateInput</>
        <option value="sim/native/weekinput"        >WeekInput</>
        <option value="sim/native/monthinput"       >MonthInput</>
        <option value="sim/native/searchinput"      >SearchInput</>
        <option value="sim/native/fileinput"        >FileInput</>
        <option value="sim/native/pseudofileinput"  >PseudoFileInput</>
        <option value="sim/native/colorinput"       >ColorInput</>
        <option value="sim/native/dropdown"         >DropDown</>
        <option value="sim/native/pseudodropdown"   >PseudoDropDown</>
        <option value="" disabled>----</>
        <option value="sim/native/textinput">TextInput</>
      </>
      <optgroup label="common Stickers">
        <option value="sim/common/tabstrip"      >TabStrip</>
        <option value="" disabled>----</>
        <option value="sim/common/flatlistview"  >FlatListView</>
        <option value="sim/common/nestedlistview">NestedListView</>
        <option value="" disabled>----</>
        <option value="sim/common/stickynote">sticky Note</>
        <option value="" disabled>----</>
        <option value="sim/common/straightlineview">straight Line</>
        <option value="sim/common/angledlineview"  >angled Line</>
        <option value="sim/common/curvedlineview"  >curved Line</>
        <option value="" disabled>----</>
        <option value="sim/common/qrcodeview">QR-Code View</>
      </>
      <option value="" disabled>----</>
      ${sortedGroupList.map((GroupName) => {
        const realGroupName = groupedVariants[GroupName][0].Name.replace(/[\/][^\/]+$/, '');
        return html `
          <optgroup label="${realGroupName}">
            ${groupedVariants[GroupName].map((Variant) => html `
              <option value="${Variant[$normalizedName]}">${Variant.Name.replace(/^.*\//, '')}</>
            `)}
          </>
        `;
    })}
    `;
    return OptionList;
}
//------------------------------------------------------------------------------
//--                            SIM_LayouterLayer                             --
//------------------------------------------------------------------------------
function SIM_LayouterLayer() {
    const { activeBoard, DesignerState, DesignerDisabled, rerender, selectStickers, selectSticker, deselectSticker, StickerIsSelected, sortedStickerSelection, doOperation, undoOperation, redoOperation, doDuplicateSelectedStickers, doCutStickers, doCopyStickers, doPasteShelvedStickers, doDeleteStickers, doChangeGeometriesBy, doImport, doPrintProject, } = DesignerAPI();
    if (!DesignerState.isOpen || !DesignerState.isLayouting) {
        return;
    }
    if (DesignerState.DesignerDisabled) {
        return;
    } // during a screenshot
    const StickerList = activeBoard.StickerList;
    /**** Event Handling ****/
    const ViewRef = useRef(null);
    /**** focusLayouterLayer ****/
    function focusLayouterLayer() {
        var _a;
        (_a = ViewRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }
    /**** LassoRecognizer ****/
    const LassoRecognizer = useClickDragging({
        ViewRef,
        onlyFrom: '.sim-designer-layouterlayer',
        ClickRadius: 4,
        onDragStart: (dx, dy, x, y, Event) => {
            DesignerState.SelectionBeforeLasso = sortedStickerSelection();
            //      ;({ left:x,top:y } = fromViewportTo('local',{ left:x,top:y },Event.target))
            DesignerState.LassoStart = { x, y };
            dragLassoTo(x, y, Event.shiftKey || Event.metaKey);
            rerender();
        },
        onDragContinuation: (dx, dy, StartX, StartY, Event) => {
            dragLassoTo(DesignerState.LassoStart.x + dx, DesignerState.LassoStart.y + dy, Event.shiftKey || Event.metaKey);
            rerender();
        },
        onDragFinish: (dx, dy, StartX, StartY, Event) => {
            dragLassoTo(DesignerState.LassoStart.x + dx, DesignerState.LassoStart.y + dy, Event.shiftKey || Event.metaKey);
            applyLasso();
            rerender();
        },
        onDragCancellation: () => {
            abortLasso();
            rerender();
        },
        onClick: onBoardClick
    });
    /**** handleLassoEvent ****/
    function handleLassoEvent(Event) {
        focusLayouterLayer();
        LassoRecognizer(Event);
    }
    /**** onBoardClick ****/
    function onBoardClick() {
        selectStickers([]);
    }
    /**** CoverRecognizer - sticker selecting and dragging ****/
    const CoverRecognizer = useClickDragging({
        ViewRef,
        onlyFrom: '.sim-designer-cover',
        ClickRadius: 4, MultiClickLimit: 1,
        onDragStart: (dx, dy, StartX, StartY, Event) => {
            const { pointedSticker } = DesignerState;
            if (!StickerIsSelected(pointedSticker)) {
                if (Event.shiftKey || Event.metaKey) { // additive/subtractive selection
                    selectStickers([pointedSticker], sortedStickerSelection());
                }
                else {
                    selectStickers([pointedSticker]);
                }
            }
            DesignerState.shapedStickers = sortedStickerSelection().filter((Sticker) => (Sticker.fixed != true) && (Sticker.automatic != true));
            DesignerState.initialGeometries = DesignerState.shapedStickers.map((Sticker) => GeometryOfSticker(Sticker));
            doChangeGeometriesBy(DesignerState.shapedStickers, 'c', dx, dy, DesignerState.initialGeometries);
        },
        onDragContinuation: (dx, dy) => {
            doChangeGeometriesBy(DesignerState.shapedStickers, 'c', dx, dy, DesignerState.initialGeometries);
        },
        onDragFinish: (dx, dy) => {
            doChangeGeometriesBy(DesignerState.shapedStickers, 'c', dx, dy, DesignerState.initialGeometries);
            finishDraggingAndShaping();
        },
        onDragCancellation: (dx, dy) => {
            doChangeGeometriesBy(DesignerState.shapedStickers, 'c', dx, dy, DesignerState.initialGeometries);
            abortDraggingAndShaping();
        },
        onClick: onCoverClick
    });
    /**** handleCoverEvent ****/
    function handleCoverEvent(Event, Sticker) {
        focusLayouterLayer();
        DesignerState.ShapeMode = 'c';
        DesignerState.pointedSticker = Sticker;
        CoverRecognizer(Event);
    }
    /**** onCoverClick ****/
    function onCoverClick(ClickCount, x, y, StartX, StartY, Event) {
        const Sticker = DesignerState.pointedSticker;
        if (Event.shiftKey || Event.metaKey) { // additive/subtractive selection
            if (StickerIsSelected(Sticker)) {
                deselectSticker(Sticker);
            }
            else {
                selectSticker(Sticker, true);
            }
        }
        else { // definitive selection
            selectStickers([Sticker]);
        }
    }
    /**** ShapeHandleRecognizer ****/
    const ShapeHandleRecognizer = useDragging({
        ViewRef,
        onlyFrom: '.sim-designer-shape-handle',
        onDragStart: (dx, dy) => {
            DesignerState.shapedStickers = sortedStickerSelection().filter((Sticker) => (Sticker.fixed != true) && (Sticker.automatic != true));
            DesignerState.initialGeometries = DesignerState.shapedStickers.map((Sticker) => GeometryOfSticker(Sticker));
            doChangeGeometriesBy(DesignerState.shapedStickers, DesignerState.ShapeMode, dx, dy, DesignerState.initialGeometries);
        },
        onDragContinuation: (dx, dy) => {
            doChangeGeometriesBy(DesignerState.shapedStickers, DesignerState.ShapeMode, dx, dy, DesignerState.initialGeometries);
        },
        onDragFinish: (dx, dy) => {
            doChangeGeometriesBy(DesignerState.shapedStickers, DesignerState.ShapeMode, dx, dy, DesignerState.initialGeometries);
            finishDraggingAndShaping();
        },
        onDragCancellation: (dx, dy) => {
            doChangeGeometriesBy(DesignerState.shapedStickers, DesignerState.ShapeMode, dx, dy, DesignerState.initialGeometries);
            abortDraggingAndShaping();
        }
    });
    /**** handleShapeEvent ****/
    function handleShapeEvent(Event, Sticker, Mode) {
        focusLayouterLayer();
        DesignerState.ShapeMode = Mode;
        ShapeHandleRecognizer(Event);
    }
    /**** Key Event Handling ****/
    const onKeyDown = async (Event) => {
        const selectedStickers = sortedStickerSelection();
        const nonPermanentStickers = selectedStickers.filter((Sticker) => (Sticker.permanent != true) && (Sticker.automatic != true));
        const nonFixedStickers = selectedStickers.filter((Sticker) => (Sticker.fixed != true) && (Sticker.automatic != true));
        if (Event.ctrlKey || Event.metaKey) {
            switch (Event.key) {
                case 'a':
                    consumeEvent(Event);
                    return selectStickers(Event.shiftKey ? [] : activeBoard.StickerList);
                case 'c':
                    consumeEvent(Event);
                    return doCopyStickers(selectedStickers);
                case 'd':
                    consumeEvent(Event);
                    return doDuplicateSelectedStickers();
                case 'o':
                    consumeEvent(Event);
                    if ('showOpenFilePicker' in window) {
                        // @ts-ignore TS18046 allow "window.showOpenFilePicker"
                        const FileList = await window.showOpenFilePicker();
                        if (FileList.length === 0) {
                            return;
                        }
                        try {
                            const File = await FileList[0].getFile();
                            let FileType = '';
                            switch (FileList[0].name.replace(/^.*[.]/, '')) {
                                case 'json':
                                    FileType = 'application/json';
                                    break;
                            } // "doImport" will fail on other file types
                            doImport(await File.text(), FileType);
                        }
                        catch (Signal) {
                            window.alert('Could not import file\n\nReason: ' + Signal);
                        }
                    }
                    else {
                        window.alert('Your browser does not support opening files.\n\n' +
                            'Try the "import" function from the Toolbox');
                    }
                    return;
                case 'p':
                    consumeEvent(Event);
                    return doPrintProject();
                case 'v':
                    consumeEvent(Event);
                    return doPasteShelvedStickers();
                case 'x':
                    consumeEvent(Event);
                    return doCutStickers(nonPermanentStickers);
                case 'y':
                    consumeEvent(Event);
                    return redoOperation();
                case 'z':
                    consumeEvent(Event);
                    return (Event.shiftKey ? redoOperation() : undoOperation());
            }
        }
        switch (Event.key) {
            case 'ArrowLeft':
                consumeEvent(Event);
                if (Event.altKey) { // size
                    doChangeGeometriesBy(nonFixedStickers, 'e', (Event.shiftKey ? -10 : -1), 0, nonFixedStickers.map((Sticker) => GeometryOfSticker(Sticker)), false);
                }
                else { // move
                    doChangeGeometriesBy(nonFixedStickers, 'c', (Event.shiftKey ? -10 : -1), 0, nonFixedStickers.map((Sticker) => GeometryOfSticker(Sticker)), false);
                }
                return;
            case 'ArrowUp':
                consumeEvent(Event);
                if (Event.altKey) { // size
                    doChangeGeometriesBy(nonFixedStickers, 's', 0, (Event.shiftKey ? -10 : -1), nonFixedStickers.map((Sticker) => GeometryOfSticker(Sticker)), false);
                }
                else { // move
                    doChangeGeometriesBy(nonFixedStickers, 'c', 0, (Event.shiftKey ? -10 : -1), nonFixedStickers.map((Sticker) => GeometryOfSticker(Sticker)), false);
                }
                return;
            case 'ArrowRight':
                consumeEvent(Event);
                if (Event.altKey) { // size
                    doChangeGeometriesBy(nonFixedStickers, 'e', (Event.shiftKey ? 10 : 1), 0, nonFixedStickers.map((Sticker) => GeometryOfSticker(Sticker)), false);
                }
                else { // move
                    doChangeGeometriesBy(nonFixedStickers, 'c', (Event.shiftKey ? 10 : 1), 0, nonFixedStickers.map((Sticker) => GeometryOfSticker(Sticker)), false);
                }
                return;
            case 'ArrowDown':
                consumeEvent(Event);
                if (Event.altKey) { // size
                    doChangeGeometriesBy(nonFixedStickers, 's', 0, (Event.shiftKey ? 10 : 1), nonFixedStickers.map((Sticker) => GeometryOfSticker(Sticker)), false);
                }
                else { // move
                    doChangeGeometriesBy(nonFixedStickers, 'c', 0, (Event.shiftKey ? 10 : 1), nonFixedStickers.map((Sticker) => GeometryOfSticker(Sticker)), false);
                }
                return;
            case 'Backspace':
            case 'Delete':
                consumeEvent(Event);
                return doDeleteStickers(nonPermanentStickers);
        }
    };
    /**** finishDraggingAndShaping ****/
    const finishDraggingAndShaping = () => {
        DesignerState.ShapeMode = undefined;
        DesignerState.pointedSticker = undefined;
        DesignerState.shapedStickers = [];
        DesignerState.initialGeometries = undefined;
    };
    /**** abortDraggingAndShaping ****/
    const abortDraggingAndShaping = () => {
        if (DesignerState.shapedStickers.length > 0) {
            doChangeGeometriesBy(DesignerState.shapedStickers, DesignerState.ShapeMode, 0, 0, DesignerState.initialGeometries, false);
        }
        finishDraggingAndShaping();
    };
    /**** GeometryOfLasso ****/
    function GeometryOfLasso() {
        var _a;
        const { x: x0, y: y0 } = DesignerState.LassoStart;
        const { x: x1, y: y1 } = (_a = DesignerState.LassoEnd) !== null && _a !== void 0 ? _a : DesignerState.LassoStart;
        let LassoX = (x0 <= x1 ? x0 : x1);
        let LassoWidth = (x0 <= x1 ? x1 - x0 : x0 - x1);
        let LassoY = (y0 <= y1 ? y0 : y1);
        let LassoHeight = (y0 <= y1 ? y1 - y0 : y0 - y1);
        return { x: LassoX, y: LassoY, Width: LassoWidth, Height: LassoHeight };
    }
    /**** CSSGeometryOfLasso ****/
    function CSSGeometryOfLasso() {
        const { x, y, Width, Height } = GeometryOfLasso();
        return `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px`;
    }
    /**** StickersCaughtByLasso ****/
    function StickersCaughtByLasso() {
        let { x: LassoX0, y: LassoY0, Width: LassoWidth, Height: LassoHeight } = GeometryOfLasso();
        let LassoX1 = LassoX0 + LassoWidth;
        let LassoY1 = LassoY0 + LassoHeight;
        if (DesignerState.LassoMode === 'touch') {
            return activeBoard.StickerList.filter((Sticker) => {
                if ((Sticker.visible === false) || (Sticker.fixed === false)) {
                    return false;
                }
                const { x, y, Width, Height } = GeometryOfSticker(Sticker);
                return ((LassoX0 <= x + Width) && (x <= LassoX1) &&
                    (LassoY0 <= y + Height) && (y <= LassoY1));
            });
        }
        else { // 'enclose'
            return activeBoard.StickerList.filter((Sticker) => {
                if ((Sticker.visible === false) || (Sticker.fixed === false)) {
                    return false;
                }
                const { x, y, Width, Height } = GeometryOfSticker(Sticker);
                return ((LassoX0 <= x) && (x + Width <= LassoX1) &&
                    (LassoY0 <= y) && (y + Height <= LassoY1));
            });
        }
    }
    /**** dragLassoTo ****/
    function dragLassoTo(x, y, additiveSelection) {
        DesignerState.LassoEnd = { x, y };
        selectStickers(additiveSelection ? DesignerState.SelectionBeforeLasso : [], StickersCaughtByLasso());
    }
    /**** applyLasso ****/
    function applyLasso() {
        DesignerState.LassoStart = DesignerState.LassoEnd = undefined;
        DesignerState.SelectionBeforeLasso = [];
    }
    /**** abortLasso ****/
    function abortLasso() {
        DesignerState.LassoStart = DesignerState.LassoEnd = undefined;
        selectStickers(DesignerState.SelectionBeforeLasso);
        DesignerState.SelectionBeforeLasso = [];
    }
    /**** actual rendering ****/
    const RenderingContext = useRenderingContext(); // also enforces rendering
    const selectedStickers = sortedStickerSelection();
    return html `<div class="sim-designer-layouterlayer" ref=${ViewRef} tabindex="0"
      onPointerDown=${handleLassoEvent}
      onKeyDown=${onKeyDown}
    >
      ${StickerList.toReversed().map((Sticker) => {
        if (Sticker.visible === false) {
            return;
        }
        const StickerId = Sticker.internalId;
        const selected = StickerIsSelected(Sticker);
        return html `
          <${SIM_Cover} Sticker=${Sticker} key=${StickerId + 'c'}
            selected=${selected}
            onPointerDown=${(Event) => handleCoverEvent(Event, Sticker)}
          />
        `;
    })}

      ${(selectedStickers.length > 0)
        ? selectedStickers.filter((Sticker) => Sticker.visible !== false).toReversed().map((Sticker) => {
            const StickerId = Sticker.internalId;
            const Geometry = GeometryOfSticker(Sticker);
            return html `
              <${SIM_ShapeHandle} key=${StickerId + 'nw'} Mode="nw" Geometry=${Geometry}
                onPointerDown=${(Event) => handleShapeEvent(Event, Sticker, 'nw')}/>
              <${SIM_ShapeHandle} key=${StickerId + 'n'}  Mode="n"  Geometry=${Geometry}
                onPointerDown=${(Event) => handleShapeEvent(Event, Sticker, 'n')}/>
              <${SIM_ShapeHandle} key=${StickerId + 'ne'} Mode="ne" Geometry=${Geometry}
                onPointerDown=${(Event) => handleShapeEvent(Event, Sticker, 'ne')}/>
              <${SIM_ShapeHandle} key=${StickerId + 'e'}  Mode="e"  Geometry=${Geometry}
                onPointerDown=${(Event) => handleShapeEvent(Event, Sticker, 'e')}/>
              <${SIM_ShapeHandle} key=${StickerId + 'se'} Mode="se" Geometry=${Geometry}
                onPointerDown=${(Event) => handleShapeEvent(Event, Sticker, 'se')}/>
              <${SIM_ShapeHandle} key=${StickerId + 's'}  Mode="s"  Geometry=${Geometry}
                onPointerDown=${(Event) => handleShapeEvent(Event, Sticker, 's')}/>
              <${SIM_ShapeHandle} key=${StickerId + 'sw'} Mode="sw" Geometry=${Geometry}
                onPointerDown=${(Event) => handleShapeEvent(Event, Sticker, 'sw')}/>
              <${SIM_ShapeHandle} key=${StickerId + 'w'}  Mode="w"  Geometry=${Geometry}
                onPointerDown=${(Event) => handleShapeEvent(Event, Sticker, 'w')}/>
            `;
        })
        : ''}
      ${DesignerState.LassoStart == null
        ? ''
        : html `<div class="sim-designer-lasso" style=${CSSGeometryOfLasso()}></>`}
      ${horizontalGuides()}
      ${verticalGuides()}
    </div>`;
}
/**** SIM_Cover ****/
function SIM_Cover(PropSet) {
    let { Sticker } = PropSet, otherProps = __rest(PropSet, ["Sticker"]);
    let { x, y, Width, Height } = GeometryOfSticker(Sticker);
    const { DesignerState } = DesignerAPI();
    const dragging = ((DesignerState.ShapeMode === 'c') && (DesignerState.shapedStickers.length > 0)
        ? 'dragging' : '');
    return html `<div class="sim-designer-cover ${dragging}" style="
      left:${x}px; top:${y}px; width:${Width}px; height:${Height}px;
      ${Sticker.fixed || Sticker.automatic ? 'cursor:not-allowed; pointer-events:none' : ''}
    " ...${otherProps}
    />`;
}
//------------------------------------------------------------------------------
//--                             SIM_ShapeHandle                              --
//------------------------------------------------------------------------------
function SIM_ShapeHandle(PropSet) {
    let { Mode, Geometry } = PropSet, otherProps = __rest(PropSet, ["Mode", "Geometry"]);
    let { x, y, Width, Height } = Geometry;
    const xl = x - 8, xm = Math.round(x + Width / 2) - 4, xr = x + Width;
    const yt = y - 8, ym = Math.round(y + Height / 2) - 4, yb = y + Height;
    let CSSGeometry, Cursor;
    switch (Mode) {
        case 'nw':
            CSSGeometry = `left:${xl}px; top:${yt}px;`;
            Cursor = 'nwse';
            break;
        case 'n':
            CSSGeometry = `left:${xm}px; top:${yt}px;`;
            Cursor = 'ns';
            break;
        case 'ne':
            CSSGeometry = `left:${xr}px; top:${yt}px;`;
            Cursor = 'nesw';
            break;
        case 'e':
            CSSGeometry = `left:${xr}px; top:${ym}px;`;
            Cursor = 'ew';
            break;
        case 'se':
            CSSGeometry = `left:${xr}px; top:${yb}px;`;
            Cursor = 'nwse';
            break;
        case 's':
            CSSGeometry = `left:${xm}px; top:${yb}px;`;
            Cursor = 'ns';
            break;
        case 'sw':
            CSSGeometry = `left:${xl}px; top:${yb}px;`;
            Cursor = 'nesw';
            break;
        case 'w':
            CSSGeometry = `left:${xl}px; top:${ym}px;`;
            Cursor = 'ew';
            break;
    }
    Cursor = 'cursor:' + Cursor + '-resize';
    return html `<div class="sim-designer-shape-handle" style="${CSSGeometry} ${Cursor}" ...${otherProps}/>`;
}
/**** horizontal Guides ****/
function horizontalGuides() {
    const { activeBoard, StickerSelection, StickerIsSelected } = DesignerAPI();
    const StickerList = activeBoard.StickerList;
    const selectedStickers = StickerSelection();
    const EdgeSet = {};
    const CenterSet = {};
    StickerList.filter((Sticker) => !StickerIsSelected(Sticker)).forEach((Sticker) => {
        const { y, Height } = GeometryOfSticker(Sticker);
        const yt = Math.round(y);
        const ym = Math.round(y + Height / 2);
        const yb = Math.round(y + Height);
        EdgeSet[yt] = EdgeSet[yb] = true;
        CenterSet[ym] = true;
    });
    const horizontalSet = {};
    selectedStickers.forEach((Sticker) => {
        const { y, Height } = GeometryOfSticker(Sticker);
        const yt = Math.round(y);
        const ym = Math.round(y + Height / 2);
        const yb = Math.round(y + Height);
        if (EdgeSet[yt]) {
            horizontalSet[yt] = 'edge';
        }
        if (EdgeSet[ym] && (horizontalSet[ym] !== 'Edge')) {
            horizontalSet[ym] = 'center';
        }
        if (EdgeSet[yb]) {
            horizontalSet[yb] = 'edge';
        }
        if (CenterSet[yt] && (horizontalSet[yt] !== 'Edge')) {
            horizontalSet[yt] = 'center';
        }
        if (CenterSet[ym] && (horizontalSet[ym] !== 'Edge')) {
            horizontalSet[ym] = 'center';
        }
        if (CenterSet[yb] && (horizontalSet[yb] !== 'Edge')) {
            horizontalSet[yb] = 'center';
        }
    });
    const horizontalList = [];
    for (const y in horizontalSet) {
        if (horizontalSet[y] != null) {
            horizontalList.push(y);
        }
    }
    return html `${horizontalList.map((y) => html `
      <div class="sim-designer-horizontal-guide ${horizontalSet[y]}" style="top:${y}px"/>
    `)}`;
}
/**** vertical Guides ****/
function verticalGuides() {
    const { activeBoard, StickerSelection, StickerIsSelected } = DesignerAPI();
    const StickerList = activeBoard.StickerList;
    const selectedStickers = StickerSelection();
    const EdgeSet = {};
    const CenterSet = {};
    StickerList.filter((Sticker) => !StickerIsSelected(Sticker)).forEach((Sticker) => {
        const { x, Width } = GeometryOfSticker(Sticker);
        const xl = Math.round(x);
        const xm = Math.round(x + Width / 2);
        const xr = Math.round(x + Width);
        EdgeSet[xl] = EdgeSet[xr] = true;
        CenterSet[xm] = true;
    });
    const verticalSet = {};
    selectedStickers.forEach((Sticker) => {
        const { x, Width } = GeometryOfSticker(Sticker);
        const xl = Math.round(x);
        const xm = Math.round(x + Width / 2);
        const xr = Math.round(x + Width);
        if (EdgeSet[xl]) {
            verticalSet[xl] = 'edge';
        }
        if (EdgeSet[xm] && (verticalSet[xm] !== 'Edge')) {
            verticalSet[xm] = 'center';
        }
        if (EdgeSet[xr]) {
            verticalSet[xr] = 'edge';
        }
        if (CenterSet[xl] && (verticalSet[xl] !== 'Edge')) {
            verticalSet[xl] = 'center';
        }
        if (CenterSet[xm] && (verticalSet[xm] !== 'Edge')) {
            verticalSet[xm] = 'center';
        }
        if (CenterSet[xr] && (verticalSet[xr] !== 'Edge')) {
            verticalSet[xr] = 'center';
        }
    });
    const verticalList = [];
    for (const x in verticalSet) {
        if (verticalSet[x] != null) {
            verticalList.push(x);
        }
    }
    return html `${verticalList.map((x) => html `
      <div class="sim-designer-vertical-guide ${verticalSet[x]}" style="left:${x}px"/>
    `)}`;
}
/**** commonValueOf ****/
function commonValueOf(ValueList) {
    if (ValueList.length === 0) {
        return SIM_noSelection;
    }
    const Candidate = ValueList[0];
    if (ValueList.slice(1).every((Value) => ValuesAreEqual(Value, Candidate))) {
        return Candidate;
    }
    else {
        return SIM_multipleValues;
    }
}
/**** commonValueItemOf ****/
function commonValueItemOf(ValueList, Entry) {
    const commonValue = commonValueOf(ValueList);
    switch (commonValue) {
        case null:
        case undefined: return SIM_empty;
        case SIM_noSelection:
        case SIM_multipleValues: return commonValue;
        default: return (typeof commonValue === 'object' // also works for arrays
            ? commonValue[Entry]
            : commonValue);
    }
}
/**** commonListLiteralOf ****/
function commonListLiteralOf(ValueList) {
    const commonValue = commonValueOf(ValueList);
    switch (commonValue) {
        case null:
        case undefined: return SIM_empty;
        case SIM_noSelection:
        case SIM_multipleValues: return commonValue;
        default: return commonValue.join('\n');
    }
}
/**** nullableString ****/
function nullableString(Value) {
    return (Value === '' ? undefined : Value);
}
/**** nullableNumber ****/
function nullableNumber(Value) {
    return (isNaN(Value) ? undefined : Value);
}
//------------------------------------------------------------------------------
//--                        Compound Packing/Unpacking                        --
//------------------------------------------------------------------------------
/**** packCompoundsInBoard ****/
function packCompoundsInBoard(Board) {
    let StickerList = Board.StickerList;
    if (StickerList.length === 0) {
        return;
    }
    let StartIndex = 0;
    let nextCompoundIndex = StickerList.findIndex((Candidate) => ValueIsCompound(Candidate) && (Candidate.StickerList.length === 0));
    while (nextCompoundIndex > 0) { // "> 0" is correct
        let CompoundWasPacked = false;
        const Compound = StickerList[nextCompoundIndex];
        const CompoundGeometry = GeometryOfSticker(Compound);
        for (let i = nextCompoundIndex - 1; i >= 0; i--) {
            const Sticker = StickerList[i];
            const StickerGeometry = GeometryOfSticker(Sticker);
            if (outerGeometryCoversInnerGeometry(CompoundGeometry, StickerGeometry)) {
                packStickerIntoCompound(Sticker, StickerGeometry, Compound, CompoundGeometry);
                // @ts-ignore TS2322 allow assignment, list will be filtered below
                StickerList[i] = undefined;
                CompoundWasPacked = true;
            }
        }
        if (CompoundWasPacked) {
            StickerList = Board.StickerList = StickerList.filter((Value) => Value != null);
        }
        else {
            StartIndex = nextCompoundIndex + 1;
        }
        nextCompoundIndex = StickerList.findIndex((Candidate, Index) => {
            var _a;
            return ((Index >= StartIndex) &&
                ValueIsCompound(Candidate) && (((_a = Candidate.StickerList) === null || _a === void 0 ? void 0 : _a.length) === 0));
        });
    }
}
/**** outerGeometryCoversInnerGeometry ****/
function outerGeometryCoversInnerGeometry(outerGeometry, innerGeometry) {
    return ((outerGeometry.x <= innerGeometry.x) &&
        (outerGeometry.x + outerGeometry.Width >= innerGeometry.x + innerGeometry.Width) &&
        (outerGeometry.y <= innerGeometry.y) &&
        (outerGeometry.y + outerGeometry.Height >= innerGeometry.y + innerGeometry.Height));
}
/**** packStickerIntoCompound ****/
function packStickerIntoCompound(Sticker, StickerGeometry, Compound, CompoundGeometry) {
    Compound.StickerList.unshift(Sticker);
    Sticker[$Container] = Compound;
    const { Anchors, Offsets } = Sticker; // reference, not copy!
    switch (Anchors[0]) {
        case 'left-width':
            Offsets[0] = StickerGeometry.x - CompoundGeometry.x;
            break;
        case 'width-right':
            Offsets[1] = CompoundGeometry.x + CompoundGeometry.Width - StickerGeometry.x - StickerGeometry.Width;
            break;
        case 'left-right':
            Offsets[0] = StickerGeometry.x - CompoundGeometry.x;
            Offsets[1] = CompoundGeometry.x + CompoundGeometry.Width - StickerGeometry.x - StickerGeometry.Width;
    }
    switch (Anchors[1]) {
        case 'top-height':
            Offsets[2] = StickerGeometry.y - CompoundGeometry.y;
            break;
        case 'height-bottom':
            Offsets[3] = CompoundGeometry.y + CompoundGeometry.Height - StickerGeometry.y - StickerGeometry.Height;
            break;
        case 'top-bottom':
            Offsets[2] = StickerGeometry.y - CompoundGeometry.y;
            Offsets[3] = CompoundGeometry.y + CompoundGeometry.Height - StickerGeometry.y - StickerGeometry.Height;
    }
}
/**** unpackCompoundsInBoard ****/
function unpackCompoundsInBoard(Board) {
    let StickerList = Board.StickerList;
    if (StickerList.length === 0) {
        return;
    }
    let { Width: BoardWidth, Height: BoardHeight } = GeometryOfBoard(Board);
    let i = -1;
    while (i < StickerList.length) {
        i++;
        const Sticker = StickerList[i];
        if (ValueIsCompound(Sticker) && (Sticker.StickerList.length > 0)) {
            const innerStickerList = Sticker.StickerList;
            StickerList.splice(i, 0, ...innerStickerList);
            const CompoundGeometry = GeometryOfSticker(Sticker);
            for (let j = i, k = j + innerStickerList.length; j < k; j++) {
                const innerSticker = StickerList[j]; // already in outer sticker list
                const innerGeometry = GeometryOfSticker(innerSticker);
                const { Anchors, Offsets } = innerSticker; // reference, not copy!
                switch (Anchors[0]) {
                    case 'left-width':
                        Offsets[0] = innerGeometry.x + CompoundGeometry.x;
                        break;
                    case 'width-right':
                        Offsets[1] = BoardWidth - CompoundGeometry.x - innerGeometry.x - innerGeometry.Width;
                        break;
                    case 'left-right':
                        Offsets[0] = innerGeometry.x + CompoundGeometry.x;
                        Offsets[1] = BoardWidth - CompoundGeometry.x - innerGeometry.x - innerGeometry.Width;
                }
                switch (Anchors[1]) {
                    case 'top-height':
                        Offsets[2] = innerGeometry.y + CompoundGeometry.y;
                        break;
                    case 'height-bottom':
                        Offsets[3] = BoardHeight - CompoundGeometry.y - innerGeometry.y - innerGeometry.Height;
                        break;
                    case 'top-bottom':
                        Offsets[2] = innerGeometry.y + CompoundGeometry.y;
                        Offsets[3] = BoardHeight - CompoundGeometry.y - innerGeometry.y - innerGeometry.Height;
                }
                innerSticker[$Container] = Board;
            }
            Sticker.StickerList = [];
        }
    }
}
//------------------------------------------------------------------------------
//--                              ProjectElement                              --
//------------------------------------------------------------------------------
class SIM_ProjectElement extends HTMLElement {
    constructor() {
        var _a, _b;
        super();
        Object.defineProperty(this, "_PropSet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const PropSet = this._PropSet = { Name: undefined, isBroken: false };
        /**** get id or name attribute ****/
        let Name = ((_b = (_a = this.getAttribute('id')) !== null && _a !== void 0 ? _a : this.getAttribute('name')) !== null && _b !== void 0 ? _b : '').trim();
        if (Name === '') {
            this._PropSet.Project = ProjectFailingWith(new Error('MissingProjectName:no project id or name given'));
            this._PropSet.isBroken = true;
            return;
        }
        if ((Name !== '') && !ValueIsName(Name)) {
            this._PropSet.Project = ProjectFailingWith(new Error('InvalidProjectName:the given project id or name is invalid'));
            this._PropSet.isBroken = true;
            return;
        }
        this._PropSet.Name = Name;
        let normalizedName = _normalizedName(Name);
        if (!(normalizedName in ProjectRegistry)) {
            this._PropSet.Project = ProjectFailingWith(new Error('NoSuchProject:a project with the name ' + quoted(Name) + ' does not exist'));
            this._PropSet.isBroken = true;
            return;
        }
        /**** with designer? ****/
        this._PropSet.withDesigner = false;
        switch (this.getAttribute('with-designer')) {
            case '':
            case 'true':
            case 'yes':
            case 'with-designer': this._PropSet.withDesigner = true;
        }
    }
    connectedCallback() {
        ;
        (async () => {
            if (!this._PropSet.isBroken) {
                await retrieveProject(this);
            }
            render(html `<${SIM_ProjectView} ...${this._PropSet} Base=${this}/>`, this);
        })();
    }
    disconnectedCallback() { render(null, this); }
}
//customElements.define('sim-project',SIM_ProjectElement)             // not yet
/**** retrieveProject ****/
async function retrieveProject(Element) {
    const PropSet = Element['_PropSet']; // *C* it's a hack, I know
    const Name = PropSet.Name;
    const normalizedName = _normalizedName(Name);
    /**** look for a local backup of the project ****/
    try {
        const JSONString = await ProjectStore.getItem(normalizedName);
        if (JSONString != null) {
            const Serialization = JSON.parse(JSONString);
            validateProjectDescriptor(Serialization);
            PropSet.Project = internalizedProject(Serialization, Name);
            return;
        }
    }
    catch (Signal) {
        console.warn('could not restore project "' + Name + '"', Signal);
    }
    /**** otherwise use the provided version ****/
    try { // nota bene: project was already validated during registration
        PropSet.Project = internalizedProject(ProjectRegistry[normalizedName], Name);
    }
    catch (Signal) {
        PropSet.Project = ProjectFailingWith(Signal);
    }
}
/**** ProjectFailingWith ****/
function ProjectFailingWith(Signal) {
    return internalizedProject({
        Script: 'throw new Error(' + quoted(Signal.message) + ')',
        BoardList: [{ StickerList: [] }],
    });
}
//------------------------------------------------------------------------------
//--                               SIM Startup                                --
//------------------------------------------------------------------------------
let ProjectStore;
/**** startup ****/
function startup() {
    localforage.ready(function () {
        ProjectStore = localforage.createInstance({
            name: 'smart-information-manager'
        });
        window.addEventListener('unhandledrejection', (Event) => {
            var _a, _b;
            console.error('caught unhandled error in Promise:', ((_a = Event.reason) === null || _a === void 0 ? void 0 : _a.stack) || ((_b = Event.reason) === null || _b === void 0 ? void 0 : _b.message), Event);
            Event.preventDefault();
        });
        customElements.define('sim-project', SIM_ProjectElement);
    });
}
/**** ActivationStack ****/
export function ActivationStack() {
    var _a;
    return (((_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.replace(/^[^\n]+\n[^\n]+/, '')) || '');
}
/**** sortedRoutes ****/
function sortedRoutes(RouteList) {
    return RouteList.sort(RouteComparator);
}
/**** RouteComparator ****/
function RouteComparator(RouteA, RouteB) {
    const RouteALength = RouteA.length;
    const RouteBLength = RouteB.length;
    const commonRouteLength = Math.min(RouteALength, RouteBLength);
    for (let i = 0, l = commonRouteLength; i < l; i++) {
        if (RouteA[i] < RouteB[i]) {
            return -1;
        }
        if (RouteA[i] > RouteB[i]) {
            return +1;
        }
    }
    if (RouteALength === RouteBLength) {
        return 0;
    }
    return (RouteALength < RouteBLength ? -1 : +1);
}
/**** CopyOf ****/
export function CopyOf(Value) {
    if ((Value === null) || (typeof Value !== 'object')) {
        return Value;
    }
    if (Array.isArray(Value)) {
        return [...Value];
    }
    else {
        return Object.assign({}, Value);
    }
}
const global = (Function('return this'))();
global.SIM = {
    render, html,
    createContext, toChildArray, cloneElement,
    createPortal,
    useId, useRef, useState, useEffect, useCallback, useMemo, useContext,
    fromLocalTo, fromViewportTo, fromDocumentTo,
    Marked,
    contextualAPI, useConsole,
};
/**** start SIM up ****/
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', startup);
}
else {
    startup();
}
