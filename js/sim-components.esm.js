/*******************************************************************************
*                                                                              *
*              Components for the Smart Information Manager (SIM)              *
*                                                                              *
*******************************************************************************/
import { 
//  throwError,      // will be redefined locally because of TypeScript compiler
quoted, ValueIsBoolean, ValueIsNumber, ValueIsNumberInRange, ValueIsFiniteNumber, ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal, ValueIsCardinal, ValueIsString, ValueIsStringMatching, ValueIsText, ValueIsTextline, ValueIsListSatisfying, ValueIsPlainObject, ValueIsFunction, ValueIsColor, ValueIsEMailAddress, ValueIsURL, ValueIsOneOf, ValidatorForClassifier, acceptNil, rejectNil, expectValue, expectBoolean, allowOrdinal, expectText, allowTextline, expectTextline, allowPlainObject, expectPlainObject, allowFunction, expectFunction, } from 'javascript-interface-library';
const ValueIsPhoneNumber = ValueIsTextline; // *C* should be implemented
import { html } from 'htm/preact';
import { toChildArray } from 'preact';
import { useId, useRef, useState, useEffect, useCallback, useMemo } from 'preact/hooks';
import { useAutoAnimate } from 'auto-animate';
/**** for MarkdownView ****/
import { Marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import { markedHighlight } from 'marked-highlight';
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
/**** special Values ****/
export const SIM_empty = { Placeholder: '(empty)', disabled: false };
export const SIM_noSelection = { Placeholder: '(no Selection)', disabled: true };
export const SIM_multipleValues = { Placeholder: '(multiple Values)', disabled: false };
/**** ValueIsSpecial ****/
export function ValueIsSpecial(Value) {
    return ((Value === SIM_empty) || (Value === SIM_noSelection) ||
        (Value === SIM_multipleValues));
}
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
/**** ValueIsName ****/
const SIM_NamePattern = /^[-._\p{L}\d](?:[-._ \p{L}\d]*[-._\p{L}\d])?$/u;
export function ValueIsName(Value) {
    return ValueIsStringMatching(Value, SIM_NamePattern);
}
/**** allow/expect[ed]Name ****/
export const allowName = ValidatorForClassifier(ValueIsName, acceptNil, 'SIM name'), allowedName = allowName;
export const expectName = ValidatorForClassifier(ValueIsName, rejectNil, 'SIM name'), expectedName = expectName;
/**** ValueIsPath ****/
const SIM_PathPattern = /^[-._\p{L}](?:[-._ \p{L}]*[-._\p{L}])?(?:\/[-._\p{L}](?:[-._ \p{L}]*[-._\p{L}])?)*$/u;
export function ValueIsPath(Value) {
    return ValueIsStringMatching(Value, SIM_PathPattern);
}
/**** allow/expect[ed]Path ****/
export const allowPath = ValidatorForClassifier(ValueIsPath, acceptNil, 'SIM name path'), allowedPath = allowPath;
export const expectPath = ValidatorForClassifier(ValueIsPath, rejectNil, 'SIM name path'), expectedPath = expectPath;
/**** ValueIsLocation ****/
export function ValueIsLocation(Value) {
    return ValueIsFiniteNumber(Value);
}
/**** allow/expect[ed]Location ****/
export const allowLocation = ValidatorForClassifier(ValueIsLocation, acceptNil, 'SIM coordinate'), allowedLocation = allowLocation;
export const expectLocation = ValidatorForClassifier(ValueIsLocation, rejectNil, 'SIM coordinate'), expectedLocation = expectLocation;
/**** ValueIsDimension ****/
export function ValueIsDimension(Value) {
    return ValueIsFiniteNumber(Value) && (Value >= 0);
}
/**** allow/expect[ed]Dimension ****/
export const allowDimension = ValidatorForClassifier(ValueIsDimension, acceptNil, 'SIM dimension'), allowedDimension = allowDimension;
export const expectDimension = ValidatorForClassifier(ValueIsDimension, rejectNil, 'SIM dimension'), expectedDimension = expectDimension;
/**** ValueIsPosition ****/
export function ValueIsPosition(Value) {
    return ValueIsPlainObject(Value) && (ValueIsLocation(Value.x) && ValueIsLocation(Value.y));
}
/**** allow/expect[ed]Position ****/
export const allowPosition = ValidatorForClassifier(ValueIsPosition, acceptNil, 'SIM position'), allowedPosition = allowPosition;
export const expectPosition = ValidatorForClassifier(ValueIsPosition, rejectNil, 'SIM position'), expectedPosition = expectPosition;
/**** ValueIsSize ****/
export function ValueIsSize(Value) {
    return ValueIsPlainObject(Value) && (ValueIsDimension(Value.Width) && ValueIsDimension(Value.Height));
}
/**** allow/expect[ed]Size ****/
export const allowSize = ValidatorForClassifier(ValueIsSize, acceptNil, 'SIM size'), allowedSize = allowSize;
export const expectSize = ValidatorForClassifier(ValueIsSize, rejectNil, 'SIM size'), expectedSize = expectSize;
/**** ValueIsGeometry ****/
export function ValueIsGeometry(Value) {
    return ValueIsPlainObject(Value) && (ValueIsLocation(Value.x) && ValueIsDimension(Value.Width) &&
        ValueIsLocation(Value.y) && ValueIsDimension(Value.Height));
}
/**** allow/expect[ed]Geometry ****/
export const allowGeometry = ValidatorForClassifier(ValueIsGeometry, acceptNil, 'SIM geometry'), allowedGeometry = allowGeometry;
export const expectGeometry = ValidatorForClassifier(ValueIsGeometry, rejectNil, 'SIM geometry'), expectedGeometry = expectGeometry;
/**** ValueIsMIMEType ****/
const MIMEPattern = /^[a-z0-9]+([._+-][a-z0-9]+)*\/[a-z0-9]+([._+-][a-z0-9]+)*(\s*;\s*[a-z0-9-]+=[a-z0-9.+-]+)*$/i;
export function ValueIsMIMEType(Value) {
    return ValueIsStringMatching(Value, MIMEPattern);
}
/**** ValueIsTextFormat ****/
export const SIM_supportedTextFormats = [
    'application/javascript', 'application/typescript', 'application/json',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/html', 'text/markdown', 'text/plain'
];
export function ValueIsTextFormat(Value) {
    return ValueIsOneOf(Value, SIM_supportedTextFormats);
}
/**** ValueIsHTMLFormat ****/
export const SIM_supportedHTMLFormats = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/html', 'text/markdown', 'text/plain'
];
export function ValueIsHTMLFormat(Value) {
    return ValueIsOneOf(Value, SIM_supportedHTMLFormats);
}
/**** ValueIsMarkdownFormat ****/
export const SIM_supportedMarkdownFormats = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/markdown', 'text/plain'
];
export function ValueIsMarkdownFormat(Value) {
    return ValueIsOneOf(Value, SIM_supportedMarkdownFormats);
}
/**** ValueIsImageFormat ****/
export const SIM_supportedImageFormats = [
    'image/apng', 'image/avif', 'image/bmp', 'image/gif', 'image/jpeg',
    'image/png', 'image/svg+xml', 'image/webp'
];
export function ValueIsImageFormat(Value) {
    return ValueIsOneOf(Value, SIM_supportedImageFormats);
}
/**** ValueIsIdentifier ****/
const SIM_IdentifierPattern = /^[a-z$_][a-z$_0-9]*$/i;
export function ValueIsIdentifier(Value) {
    return ValueIsStringMatching(Value, SIM_IdentifierPattern);
}
/**** allow/expect[ed]Identifier ****/
export const allowIdentifier = ValidatorForClassifier(ValueIsIdentifier, acceptNil, 'SIM identifier'), allowedIdentifier = allowIdentifier;
export const expectIdentifier = ValidatorForClassifier(ValueIsIdentifier, rejectNil, 'SIM identifier'), expectedIdentifier = expectIdentifier;
/**** ValueIsIndexPath ****/
export function ValueIsIndexPath(Value) {
    return ValueIsListSatisfying(Value, ValueIsOrdinal);
}
/**** ValueIsVNode (not very specific yet) ****/
function ValueIsVNode(Value) {
    return (Value != null) && (Value.constructor === undefined);
}
//------------------------------------------------------------------------------
//--                             PropSet Parsing                              --
//------------------------------------------------------------------------------
/**** parsedPropSet ****/
export function parsedPropSet(PropSet, ...ParserList) {
    expectPlainObject('PropSet', PropSet);
    ParserList.forEach((Parser, Index) => {
        if (!ValueIsFunction(Parser))
            throwError(`InvalidArgument: PropSet parser argument #${Index + 1} is not a function`);
    });
    const Result = [], Error = undefined;
    const normalizedPropSet = {};
    Array.from(Object.keys(PropSet)).forEach((Key) => {
        let normalizedKey = Key.replace(/[-_]/g, '').trim().toLowerCase();
        normalizedPropSet[normalizedKey] = PropSet[Key];
    });
    const ContentList = normalizedPropSet.children;
    delete normalizedPropSet.children;
    delete normalizedPropSet['aim:rendercount'];
    ParserList.forEach((Parser) => Result.push(Parser(normalizedPropSet)));
    Result.push(normalizedPropSet, ContentList);
    return Result;
}
/**** parsedProp ****/
export function parsedProp(PropSet, Parser) {
    expectPlainObject('PropSet', PropSet);
    expectFunction('PropSet parser', Parser);
    const normalizedPropSet = {};
    Array.from(Object.keys(PropSet)).forEach((Key) => {
        let normalizedKey = Key.replace(/[-_]/g, '').trim().toLowerCase();
        normalizedPropSet[normalizedKey] = PropSet[Key];
    });
    delete normalizedPropSet.children;
    return Parser(normalizedPropSet);
}
/**** optionalAttribute ****/
export function optionalAttribute(PropSet, PropName, Validator, PropSetName) {
    expectPlainObject('PropSet', PropSet);
    //  expectAttrName    ('attribute name',PropName) // *C* to be implemented
    expectFunction('validator function', Validator);
    allowTextline('PropSet name', PropSetName);
    const Value = PropSet[PropName];
    if (Value == null) {
        return undefined;
    }
    if (Validator(Value) == true) {
        delete PropSet[PropName];
        return Value;
    }
    else {
        throwError((PropSetName == null ? '' : PropSetName + ' ') +
            'attribute ' + quoted(PropName) + ' is invalid');
    }
}
/**** mandatoryAttribute ****/
export function mandatoryAttribute(PropSet, PropName, Validator, PropSetName) {
    expectPlainObject('PropSet', PropSet);
    //  expectAttrName    ('attribute name',PropName) // *C* to be implemented
    expectFunction('validator function', Validator);
    allowTextline('PropSet name', PropSetName);
    const Value = PropSet[PropName];
    if (Value == null)
        throwError('attribute ' + quoted(PropName) + ' is missing');
    if (Validator(Value) == true) {
        delete PropSet[PropName];
        return Value;
    }
    else {
        throwError((PropSetName == null ? '' : PropSetName + ' ') +
            'attribute ' + quoted(PropName) + ' is invalid');
    }
}
/**** optional/mandatoryValue ****/
export function optionalValue(PropName, Validator) {
    return (PropSet) => optionalAttribute(PropSet, PropName, Validator);
}
export function mandatoryValue(PropName, Validator) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, Validator);
}
/**** optional/mandatoryBoolean ****/
export function optionalBoolean(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsBoolean);
}
export function mandatoryBoolean(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsBoolean);
}
/**** optional/mandatoryNumber ****/
export function optionalNumber(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsNumber);
}
export function mandatoryNumber(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsNumber);
}
/**** optional/mandatoryNumberInRange ****/
export function optionalNumberInRange(PropName, Minimum, Maximum, withMinimum, withMaximum) {
    return (PropSet) => optionalAttribute(PropSet, PropName, (Value) => ValueIsNumberInRange(Value, Minimum, Maximum, withMinimum, withMaximum));
}
export function mandatoryNumberInRange(PropName, Minimum, Maximum, withMinimum, withMaximum) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, (Value) => ValueIsNumberInRange(Value, Minimum, Maximum, withMinimum, withMaximum));
}
/**** optional/mandatoryInteger ****/
export function optionalInteger(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsInteger);
}
export function mandatoryInteger(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsInteger);
}
/**** optional/mandatoryIntegerInRange ****/
export function optionalIntegerInRange(PropName, Minimum, Maximum) {
    return (PropSet) => optionalAttribute(PropSet, PropName, (Value) => ValueIsIntegerInRange(Value, Minimum, Maximum));
}
export function mandatoryIntegerInRange(PropName, Minimum, Maximum) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, (Value) => ValueIsIntegerInRange(Value, Minimum, Maximum));
}
/**** optional/mandatoryOrdinal ****/
export function optionalOrdinal(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsOrdinal);
}
export function mandatoryOrdinal(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsOrdinal);
}
/**** optional/mandatoryCardinal ****/
export function optionalCardinal(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsCardinal);
}
export function mandatoryCardinal(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsCardinal);
}
/**** optional/mandatoryString ****/
export function optionalString(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsString);
}
export function mandatoryString(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsString);
}
/**** optional/mandatoryStringMatching ****/
export function optionalStringMatching(PropName, Pattern) {
    return (PropSet) => optionalAttribute(PropSet, PropName, (Value) => ValueIsStringMatching(Value, Pattern));
}
export function mandatoryStringMatching(PropName, Pattern) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, (Value) => ValueIsStringMatching(Value, Pattern));
}
/**** optional/mandatoryText ****/
export function optionalText(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsText);
}
export function mandatoryText(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsText);
}
/**** optional/mandatoryTextline ****/
export function optionalTextline(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsTextline);
}
export function mandatoryTextline(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsTextline);
}
/**** optional/mandatoryFunction ****/
export function optionalFunction(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsFunction);
}
export function mandatoryFunction(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsFunction);
}
/**** optional/mandatoryColor ****/
export function optionalColor(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsColor);
}
export function mandatoryColor(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsColor);
}
/**** optional/mandatoryEMailAddress ****/
export function optionalEMailAddress(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsEMailAddress);
}
export function mandatoryEMailAddress(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsEMailAddress);
}
/**** optional/mandatoryPhoneNumber ****/
export function optionalPhoneNumber(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsPhoneNumber);
}
export function mandatoryPhoneNumber(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsPhoneNumber);
}
/**** optional/mandatoryURL ****/
export function optionalURL(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, ValueIsURL);
}
export function mandatoryURL(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, ValueIsURL);
}
/**** optional/mandatoryPath ****/
export function optionalPath(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, (Value) => ValueIsPath(Value));
}
export function mandatoryPath(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, (Value) => ValueIsPath(Value));
}
/**** optional/mandatoryNameOrIndex ****/
export function optionalNameOrIndex(PropName) {
    return (PropSet) => optionalAttribute(PropSet, PropName, (Value) => ValueIsName(Value) || ValueIsOrdinal(Value));
}
export function mandatoryNameOrIndex(PropName) {
    return (PropSet) => mandatoryAttribute(PropSet, PropName, (Value) => ValueIsName(Value) || ValueIsOrdinal(Value));
}
//------------------------------------------------------------------------------
//--                                  Hooks                                   --
//------------------------------------------------------------------------------
/**** useOnlineStatus ****/
export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    return isOnline;
}
/**** useWindowSize ****/
export function useWindowSize() {
    const [Size, setSize] = useState({
        Width: window.innerWidth,
        Height: window.innerHeight
    });
    useEffect(() => {
        const handleResize = () => setSize({
            Width: window.innerWidth,
            Height: window.innerHeight
        });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return Size;
}
/**** useRerenderer ****/
export function useRerenderer() {
    const [State, setState] = useState({});
    function rerender() {
        setState({});
    }
    return rerender;
}
/**** useConfiguration (Configuration is an object of objects) ****/
export function useConfiguration(initialConfiguration = {}) {
    allowPlainObject('initial configuration', initialConfiguration);
    const ConfigurationRef = useRef();
    if (ConfigurationRef.current == null) {
        ConfigurationRef.current = deepCopyOf(initialConfiguration);
    }
    /**** "configure" merges two levels deep ****/
    const configure = useCallback((ChangeSet) => {
        allowPlainObject('configuration change set', ChangeSet);
        if (ChangeSet == null) {
            return;
        }
        for (const [Key, Value] of Object.entries(ChangeSet)) {
            if (Value === undefined) {
                delete ChangeSet[Key];
            }
            else {
                if (ValueIsPlainObject(Value)) {
                    if (ValueIsPlainObject(ConfigurationRef.current[Key])) {
                        Object.assign(ConfigurationRef.current[Key], Value);
                    }
                    else {
                        ConfigurationRef.current[Key] = Object.assign({}, Value);
                    }
                }
                else {
                    throwError('InvalidArgument: configuration[' + quoted(Key) + '] is no ' +
                        'plain JavaScript onject');
                }
            }
        }
    }, [initialConfiguration]);
    return [ConfigurationRef.current, configure];
}
export function useDragging({ ViewRef, Container, onlyFrom, neverFrom, onDragStart, onDragContinuation, onDragFinish, onDragCancellation }) {
    expectValue('preact component reference', ViewRef);
    if ((Container != null) && !ValueIsTextline(Container) && !(Container instanceof HTMLElement) && !ValueIsFunction(Container))
        throwError('InvalidArgument: "Container" is neither a CSS selector nor an HTML element or a function');
    if ((onlyFrom != null) && !ValueIsTextline(onlyFrom) && !(onlyFrom instanceof HTMLElement))
        throwError('InvalidArgument: "onlyFrom" is neither a CSS selector nor an HTML element');
    if ((neverFrom != null) && !ValueIsTextline(neverFrom) && !(neverFrom instanceof HTMLElement))
        throwError('InvalidArgument: "neverFrom" is neither a CSS selector nor an HTML element');
    allowFunction('"onDragStart" callback', onDragStart);
    allowFunction('"onDragContinuation" callback', onDragContinuation);
    allowFunction('"onDragFinish" callback', onDragFinish);
    allowFunction('"onDragCancellation" callback', onDragCancellation);
    const RecognizerMayDrag = ((onDragStart != null) && (onDragContinuation != null) &&
        (onDragFinish != null) && (onDragCancellation != null));
    /**** initialize recognition ****/
    let ContainerElement; // will be set in "onPointerDown"
    const StartPosition = useRef();
    const isDragging = useRef(false);
    /**** onPointerDown ****/
    const onPointerDown = (Event) => {
        var _a, _b;
        if ((ViewRef.current == null) || !(Event.target instanceof HTMLElement)) {
            return;
        }
        if ((Event.pointerType === 'mouse') && (Event.buttons !== 1)) {
            return;
        }
        if ((Event.pointerType === 'touch') && !Event.isPrimary) {
            return;
        }
        if ((Event.pointerType === 'pen') && (Event.buttons !== 1)) {
            return;
        }
        if (!RecognizerMayDrag) {
            return;
        }
        switch (true) {
            case Container == null:
                ContainerElement = ViewRef.current.parentElement;
                break;
            case ValueIsTextline(Container):
                ContainerElement = ViewRef.current.parentElement.closest(Container);
                break;
            case ValueIsFunction(Container):
                ContainerElement = Container();
                if (!(ContainerElement instanceof HTMLElement)) {
                    ContainerElement = undefined;
                }
                break;
            default:
                ContainerElement = Container;
        }
        if (ContainerElement == null) {
            return;
        }
        if ((onlyFrom != null) && !matchesSelector(Event.target, onlyFrom)) {
            return;
        }
        if ((neverFrom != null) && matchesSelector(Event.target, neverFrom)) {
            return;
        }
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerCancel);
        (_b = (_a = ViewRef.current).setPointerCapture) === null || _b === void 0 ? void 0 : _b.call(_a, Event.pointerId);
        const ContainerBox = ContainerElement.getBoundingClientRect();
        const StartX = Event.clientX - ContainerBox.left + ContainerElement.scrollLeft;
        const StartY = Event.clientY - ContainerBox.top + ContainerElement.scrollTop;
        StartPosition.current = { x: StartX, y: StartY };
        isDragging.current = true;
        onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(0, 0, StartX, StartY, Event);
    };
    /**** onPointerMove ****/
    const onPointerMove = (Event) => {
        if (isDragging.current === false) {
            return;
        }
        if (ContainerElement == null) {
            return;
        }
        onDragContinuation === null || onDragContinuation === void 0 ? void 0 : onDragContinuation.apply(null, CallbackArguments(ContainerElement, Event));
    };
    /**** finishDragging ****/
    const finishDragging = (Event, cancelled) => {
        if (isDragging.current === false) {
            return;
        }
        isDragging.current = false;
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerCancel);
        if (cancelled) {
            onDragContinuation === null || onDragContinuation === void 0 ? void 0 : onDragContinuation(0, 0, StartPosition.current.x, StartPosition.current.y, Event);
            return;
        }
        if ((ContainerElement != null) && RecognizerMayDrag) {
            onDragFinish === null || onDragFinish === void 0 ? void 0 : onDragFinish.apply(null, CallbackArguments(ContainerElement, Event));
        }
    };
    /**** onPointerUp ****/
    const onPointerUp = (Event) => {
        finishDragging(Event, false);
    };
    /**** onPointerCancel ****/
    const onPointerCancel = (Event) => {
        finishDragging(Event, true);
    };
    /**** CallbackArguments ****/
    const CallbackArguments = (Container, Event) => {
        const ContainerBox = Container.getBoundingClientRect();
        const x = Event.clientX - ContainerBox.left + Container.scrollLeft;
        const y = Event.clientY - ContainerBox.top + Container.scrollTop;
        const dx = x - StartPosition.current.x;
        const dy = y - StartPosition.current.y;
        return [dx, dy, x, y, Event];
    };
    /**** matchesSelector ****/
    function matchesSelector(Element, Selector) {
        switch (true) {
            case (Selector == null): return true;
            case (typeof Selector === 'string'): return Element.matches(Selector);
            default: return Element === Selector;
        }
    }
    return onPointerDown;
}
export function useClickDragging({ ViewRef, Container, onlyFrom, neverFrom, ClickRadius, MultiClickLimit, MultiClickTimeSpan, onClick, onDragStart, onDragContinuation, onDragFinish, onDragCancellation }) {
    expectValue('preact component reference', ViewRef);
    if ((Container != null) && !ValueIsTextline(Container) && !(Container instanceof HTMLElement) && !ValueIsFunction(Container))
        throwError('InvalidArgument: "Container" is neither a CSS selector nor an HTML element or a function');
    if ((onlyFrom != null) && !ValueIsTextline(onlyFrom) && !(onlyFrom instanceof HTMLElement))
        throwError('InvalidArgument: "onlyFrom" is neither a CSS selector nor an HTML element');
    if ((neverFrom != null) && !ValueIsTextline(neverFrom) && !(neverFrom instanceof HTMLElement))
        throwError('InvalidArgument: "neverFrom" is neither a CSS selector nor an HTML element');
    allowOrdinal('click radius', ClickRadius);
    allowOrdinal('multi-click limit', MultiClickLimit);
    allowOrdinal('multi-click timespan', MultiClickTimeSpan);
    allowFunction('"onClick" callback', onClick);
    allowFunction('"onDragStart" callback', onDragStart);
    allowFunction('"onDragContinuation" callback', onDragContinuation);
    allowFunction('"onDragFinish" callback', onDragFinish);
    allowFunction('"onDragCancellation" callback', onDragCancellation);
    /**** detect configured features and apply defaults ****/
    if (ClickRadius == null) {
        ClickRadius = 4;
    }
    if (MultiClickTimeSpan == null) {
        MultiClickTimeSpan = 300;
    }
    if (MultiClickLimit == null) {
        MultiClickLimit = (onClick == null ? 0 : 1);
    }
    const RecognizerMayClick = (MultiClickLimit > 0) && (onClick != null);
    const RecognizerMayDrag = ((onDragStart != null) && (onDragContinuation != null) &&
        (onDragFinish != null) // (onDragCancellation != null)
    );
    /**** initialize recognition ****/
    let ContainerElement; // will be set in "onPointerDown"
    const StartPosition = useRef();
    const isDragging = useRef(false);
    const lastClick = useRef({ Count: 0, Time: 0 });
    /**** onPointerDown ****/
    const onPointerDown = (Event) => {
        var _a, _b;
        if ((ViewRef.current == null) || !(Event.target instanceof HTMLElement)) {
            return;
        }
        if (!RecognizerMayClick && !RecognizerMayDrag) {
            return;
        }
        switch (true) {
            case Container == null:
                ContainerElement = ViewRef.current.parentElement;
                break;
            case ValueIsTextline(Container):
                ContainerElement = ViewRef.current.parentElement.closest(Container);
                break;
            case ValueIsFunction(Container):
                ContainerElement = Container();
                if (!(ContainerElement instanceof HTMLElement)) {
                    ContainerElement = undefined;
                }
                break;
            default:
                ContainerElement = Container;
        }
        if (ContainerElement == null) {
            return;
        }
        if ((onlyFrom != null) && !matchesSelector(Event.target, onlyFrom)) {
            return;
        }
        if ((neverFrom != null) && matchesSelector(Event.target, neverFrom)) {
            return;
        }
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerCancel);
        (_b = (_a = ViewRef.current).setPointerCapture) === null || _b === void 0 ? void 0 : _b.call(_a, Event.pointerId);
        const ContainerBox = ContainerElement.getBoundingClientRect();
        const StartX = Event.clientX - ContainerBox.left + ContainerElement.scrollLeft;
        const StartY = Event.clientY - ContainerBox.top + ContainerElement.scrollTop;
        StartPosition.current = { x: StartX, y: StartY };
        if (RecognizerMayClick) {
            isDragging.current = false;
        }
        else {
            isDragging.current = RecognizerMayDrag;
            if (RecognizerMayDrag && (ClickRadius === 0)) {
                onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(0, 0, StartX, StartY, Event);
            }
        }
    };
    /**** onPointerMove ****/
    const onPointerMove = (Event) => {
        if (!RecognizerMayDrag) {
            return;
        }
        if (ContainerElement == null) {
            return;
        }
        const [dx, dy, x, y] = CallbackArguments(ContainerElement, Event);
        if (isDragging.current === false) {
            if (dx * dx + dy * dy < ClickRadius * ClickRadius) {
                return;
            }
            else {
                isDragging.current = true;
                onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(dx, dy, x, y, Event);
            }
        }
        onDragContinuation === null || onDragContinuation === void 0 ? void 0 : onDragContinuation.apply(null, [dx, dy, x, y, Event]);
    };
    /**** finishDragging ****/
    const finishDragging = (Event, cancelled) => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerCancel);
        if (isDragging.current) {
            isDragging.current = false;
            if (RecognizerMayDrag && cancelled) {
                onDragContinuation === null || onDragContinuation === void 0 ? void 0 : onDragContinuation(0, 0, StartPosition.current.x, StartPosition.current.y, Event);
                return;
            }
            if ((ContainerElement != null) && RecognizerMayDrag) {
                onDragFinish === null || onDragFinish === void 0 ? void 0 : onDragFinish.apply(null, CallbackArguments(ContainerElement, Event));
            }
        }
    };
    /**** onPointerUp ****/
    const onPointerUp = (Event) => {
        if (isDragging.current === false) {
            if (RecognizerMayClick) {
                let { ClickCount, Time } = lastClick.current;
                const now = Date.now();
                ClickCount = (now - Time > MultiClickTimeSpan ? 1 : Math.min(ClickCount + 1, MultiClickLimit));
                lastClick.current = { ClickCount, Time: now };
                if (ContainerElement != null) {
                    const [dx, dy, x, y] = CallbackArguments(ContainerElement, Event);
                    onClick === null || onClick === void 0 ? void 0 : onClick.apply(null, [ClickCount, dx, dy, x, y, Event]);
                }
            }
        }
        finishDragging(Event, false);
    };
    /**** onPointerCancel ****/
    const onPointerCancel = (Event) => {
        if (isDragging.current === true) {
            finishDragging(Event, true);
        }
    };
    /**** CallbackArguments ****/
    const CallbackArguments = (Container, Event) => {
        const ContainerBox = Container.getBoundingClientRect();
        const x = Event.clientX - ContainerBox.left + Container.scrollLeft;
        const y = Event.clientY - ContainerBox.top + Container.scrollTop;
        const dx = x - StartPosition.current.x;
        const dy = y - StartPosition.current.y;
        return [dx, dy, x, y, Event];
    };
    /**** matchesSelector ****/
    function matchesSelector(Element, Selector) {
        switch (true) {
            case (Selector == null): return true;
            case (typeof Selector === 'string'): return Element.matches(Selector);
            default: return Element === Selector;
        }
    }
    return onPointerDown;
}
//----------------------------------------------------------------------------//
//                           Confirmation Handling                            //
//----------------------------------------------------------------------------//
export function OperationWasConfirmed(Message) {
    let ConfirmationCode = Math.round(Math.random() * 10000).toString();
    ConfirmationCode += '0000'.slice(ConfirmationCode.length);
    Message = (Message || 'This operation can not be undone.') + '\n\n' +
        'Please, enter the following number if you want to proceed:\n\n' +
        '   ' + ConfirmationCode + '\n\n' +
        'Otherwise, the operation will be cancelled';
    let UserInput = window.prompt(Message, '');
    if (UserInput === ConfirmationCode) {
        return true;
    }
    else {
        window.alert('Operation will be cancelled');
        return false;
    }
}
//------------------------------------------------------------------------------
//--                              Normalizations                              --
//------------------------------------------------------------------------------
/**** normalizedName ****/
export function normalizedName(Name) {
    expectName('name', Name);
    return _normalizedName(Name); // DRY
}
/**** _normalizedName ****/
export function _normalizedName(Name) {
    return Name.trim().replace(/\s+/g, ' ').replace(/[.]+/g, '.')
        .replace(/[-]+/g, '-').replace(/[_]+/g, '_').toLowerCase();
}
/**** normalizedPath ****/
export function normalizedPath(Path) {
    expectPath('path', Path);
    return _normalizedPath(Path); // DRY
}
/**** _normalizedPath ****/
export function _normalizedPath(Path) {
    return Path.trim().replace(/\s*(\/+\s*)+/g, '/').replace(/\s+/g, ' ')
        .replace(/[.]+/g, '.').replace(/[-]+/g, '-').replace(/[_]+/g, '_')
        .toLowerCase();
}
//------------------------------------------------------------------------------
//--                           Stylesheet Handling                            --
//------------------------------------------------------------------------------
/**** install stylesheet for SIM itself ****/
let StyleElement = document.getElementById('SIM-Components-Stylesheet');
if (StyleElement == null) {
    StyleElement = document.createElement('style');
    StyleElement.id = 'SIM-Components-Stylesheet';
    StyleElement.textContent = `
/*******************************************************************************
*                                                                              *
*              Components for the Smart Information Manager (SIM)              *
*                                                                              *
*******************************************************************************/

  :not(:defined) { visibility:hidden }

/**** some basic settings ****/

  .sim-component {
    display:block; position:relative;
    box-sizing:border-box;
  }



/**** some common settings ****/

  .disabled, [disabled] { opacity:0.4 }
  .readonly             { background:none }
  .pointer-unaware      { pointer-events:none }


    `.trim();
    document.head.prepend(StyleElement); // this stylesheet should be the 1st one
}
/**** installStylesheetFor ****/
export function installStylesheetFor(Name, Stylesheet, overwrite = false) {
    expectPath('stylesheet name', Name);
    expectText('stylesheet', Stylesheet); // *C* could this be validated?
    expectBoolean('mode flag', overwrite);
    const StylesheetId = 'Stylesheet-for-' + _normalizedName(Name);
    let StyleElement = document.head.querySelector('style[id="' + StylesheetId + '"]');
    if (StyleElement == null) {
        StyleElement = document.createElement('style');
        StyleElement.id = StylesheetId;
        StyleElement.textContent = Stylesheet;
        document.head.append(StyleElement);
    }
    else {
        if (overwrite) {
            StyleElement.textContent = Stylesheet;
        }
        else {
            console.warn('multiple definitions for stylesheet "' + Name + '"');
        }
    }
}
/**** uninstallStylesheetFor ****/
export function uninstallStylesheetFor(Name) {
    expectPath('stylesheet name', Name);
    const StylesheetId = 'Stylesheet-for-' + _normalizedName(Name);
    let StyleElement = document.head.querySelector('style[id="' + StylesheetId + '"]');
    if (StyleElement != null) {
        StyleElement.remove();
    }
}
//------------------------------------------------------------------------------
//--                              Error Handling                              --
//------------------------------------------------------------------------------
/**** ErrorIndicator ****/
export function SIM_ErrorIndicator(PropSet) {
    return safelyRendered(() => {
        let [ErrorToShow] = parsedPropSet(PropSet, optionalValue('error', (Value) => Value instanceof Error));
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
function ErrorMessageFor(ErrorToShow) {
    var _a, _b;
    let ErrorName = (_a = ErrorToShow.name) !== null && _a !== void 0 ? _a : '';
    let ErrorMessage = ErrorToShow.message;
    let StackTrace = (_b = ErrorToShow.stack) !== null && _b !== void 0 ? _b : '';
    const Title = ErrorName.replace(/([a-z])([A-Z])/g, '$1 $2');
    const Message = ErrorMessage[0].toUpperCase() + ErrorMessage.slice(1);
    if (StackTrace === '') {
        return `${Title}\n\n${Message}`;
    }
    else {
        return `${Title}\n\n${Message}\n\n${StackTrace}`;
    }
}
/**** safelyRendered ****/
export function safelyRendered(Renderer) {
    var _a;
    expectFunction('rendering function', Renderer);
    try {
        return Renderer();
    }
    catch (Signal) {
        const ComponentName = (_a = Renderer.name) !== null && _a !== void 0 ? _a : '';
        if (ComponentName.trim() === '') {
            console.warn('error while rendering a preact component: ' + Signal);
        }
        else {
            console.warn('error while rendering component ' + quoted(ComponentName) + ': ' +
                Signal);
        }
        return html `<${SIM_ErrorIndicator} error=${Signal}/>`;
    }
}
/**** fullsized ****/
export function fullsized(PropSet) {
    return safelyRendered(() => {
        let [Classes, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'));
        return html `<div class="sim-component fullsized ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
        ${ContentList}
      </>`;
    });
}
installStylesheetFor('sim-component.fullsized', `
    .sim-component.fullsized > * {
      display:block; position:relative;
      left:0px; top:0px; width:100% !important; height:100% !important;
    }
  `);
/**** centered ****/
export function centered(PropSet) {
    return safelyRendered(() => {
        let [Classes, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'));
        return html `<div class="sim-component centered ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
        ${ContentList}
      </>`;
    });
}
installStylesheetFor('sim-component.centered', `
    .sim-component.centered {
      display:flex ! important; flex-flow:column nowrap; align-items:center; justify-content:center;
      left:0px; top:0px; width:100% !important; height:100% !important;
    }
    .sim-component.centered > * {
      position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
  `);
/**** horizontal ****/
export function horizontal(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Gap, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalOrdinal('gap'));
        Gap = Gap !== null && Gap !== void 0 ? Gap : 0;
        return html `<div class="sim-component horizontal ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        style="gap:${Gap}px; ${Style !== null && Style !== void 0 ? Style : ''}" ...${RestProps}
      >${ContentList}</>`;
    });
}
installStylesheetFor('sim-component.horizontal', `
    .sim-component.horizontal {
      display:flex ! important; flex-flow:row nowrap; align-items:center;
      position:relative; left:0px; top:0px; width:100% !important; height:auto;
    }
    .sim-component.horizontal > * {
      position:relative; flex:0 0 auto;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
  `);
/**** vertical ****/
export function vertical(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Gap, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalOrdinal('gap'));
        Gap = Gap !== null && Gap !== void 0 ? Gap : 0;
        return html `<div class="sim-component vertical ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        style="gap:${Gap}px; ${Style !== null && Style !== void 0 ? Style : ''}" ...${RestProps}
      >${ContentList}</>`;
    });
}
installStylesheetFor('sim-component.vertical', `
    .sim-component.vertical {
      display:flex ! important; flex-flow:column nowrap; align-items:start;
      position:relative; left:0px; top:0px; width:auto; height:100% !important;
    }
    .sim-component.vertical > * {
      position:relative; flex:0 0 auto;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
  `);
/**** tabular (column classes may be "expanding" or "shrinking", see below) ****/
export function tabular(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Columns, RowGap, ColGap, ColClasses, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalCardinal('columns'), optionalOrdinal('rowgap'), optionalOrdinal('colgap'), optionalTextline('columnclasses'));
        Columns = Columns !== null && Columns !== void 0 ? Columns : 2;
        RowGap = RowGap !== null && RowGap !== void 0 ? RowGap : 0;
        ColGap = ColGap !== null && ColGap !== void 0 ? ColGap : 0;
        ColClasses = ColClasses !== null && ColClasses !== void 0 ? ColClasses : '';
        /**** prepare for explicit ColSpans ****/
        function ColSpanOfCell(TableCell) {
            if (typeof TableCell === 'string') {
                return 1;
            }
            else {
                let ColSpan = TableCell.props['colspan'];
                return (ValueIsOrdinal(ColSpan) ? ColSpan : 1);
            }
        }
        /**** arrange contents in a tabular manner ****/
        ContentList = toChildArray(ContentList).filter((Cell) => (Cell.type != null) || (Cell.trim() !== ''));
        const ContentCount = ContentList.length;
        const RowList = [[]];
        let RowIndex = 0, CellIndex = 0;
        ContentList.forEach((Cell, Index) => {
            RowList[RowIndex].push(Cell);
            CellIndex += ColSpanOfCell(Cell);
            if ((CellIndex >= Columns) && (Index < ContentCount - 1)) {
                RowList.push([]);
                RowIndex++;
                CellIndex = 0;
            }
        });
        const ColGroup = (ColClasses.trim() === ''
            ? ''
            : html `<colgroup>${ColClasses.split(' ').map((Class) => html `<col class="${Class}"/>`)}</>`);
        /**** now render the whole table ****/
        return html `<table class="sim-component tabular ${Classes !== null && Classes !== void 0 ? Classes : ''}" style="
        ${Style !== null && Style !== void 0 ? Style : ''};
        border-spacing:${ColGap}px ${RowGap}px;
        margin:-${RowGap}px -${ColGap}px -${RowGap}px -${ColGap}px
      " ...${RestProps}
      >${ColGroup}<tbody>
        ${(ContentCount > 0) && RowList.map((Row, i) => html `<tr>
          ${Row.map((Cell) => html `<td colspan=${ColSpanOfCell(Cell)}>${Cell}</>`)}
        </tr>`)}
      </tbody></table>`;
    });
}
installStylesheetFor('sim-component.tabular', `
    .sim-component.tabular {
      border:none;
      border-collapse:separate;
      border-spacing:0px;
    }
    .sim-component.tabular > tbody {
      position:relative;
      vertical-align:top;
    }
    .sim-component.tabular > tbody > tr > td {
      display:table-cell;
      margin:0px; padding:0px;
    }

    .sim-component.tabular > colgroup > col.expanding { width:100% }
    .sim-component.tabular > colgroup > col.shrinking { width:1px }
  `);
/**** selective ****/
export function selective(PropSet) {
    return safelyRendered(() => {
        let [Classes, activeIndex, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalOrdinal('activeindex'));
        ContentList = toChildArray(ContentList).filter((Content) => (typeof Content !== 'string') || (Content.trim() !== ''));
        const ContentCount = ContentList.length;
        activeIndex = (ContentCount === 0
            ? 0
            : Math.max(0, Math.min(activeIndex !== null && activeIndex !== void 0 ? activeIndex : 0, ContentCount - 1)));
        return html `<div class="sim-component selective ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        ...${RestProps}>${ContentList[activeIndex]}</>`;
    });
}
installStylesheetFor('sim-component.selective', `
    .sim-component.selective {
      display:block; position:relative;
      left:0px; top:0px; width:100% ! important; height:100% ! important;
    }

    .sim-component.selective > * {
      display:block; position:absolute;
      left:0px; top:0px; width:100% ! important; height:100% ! important;
    }
  `);
/**** stacked ****/
export function stacked(PropSet) {
    return safelyRendered(() => {
        let [Classes, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'));
        return html `<div class="sim-component stacked ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
        ${ContentList}
      </>`;
    });
}
installStylesheetFor('sim-component.stacked', `
    .sim-component.stacked {
      display:inline-block; position:relative;
    }
    .sim-component.stacked > *:first-child {
      position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
    .sim-component.stacked > *:not(:first-child) {
      position:absolute;
    }
  `);
/**** Dummy ****/
export function Dummy(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, visiblePattern, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('value'), optionalBoolean('visiblepattern'));
        return html `<div
        class="sim-component dummy ${visiblePattern ? 'visible-pattern' : ''} ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        ...${RestProps} dangerouslySetInnerHTML=${{ __html: Value !== null && Value !== void 0 ? Value : '' }}
      />`;
    });
}
installStylesheetFor('sim-component.dummy', `
    .sim-component.dummy.visible-pattern {
      background-image:repeating-linear-gradient(-45deg,
        rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
        rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
      ); background-size:11.31px 11.31px;
    }
  `);
/**** Outline ****/
export function Outline(PropSet) {
    return safelyRendered(() => {
        let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
        return html `<div class="sim-component outline ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
    });
}
installStylesheetFor('sim-component.outline', `
    .sim-component.outline {
      outline:dotted 1px blue;
      outline-offset:2px;
    }
  `);
/**** Spacer ****/
export function Spacer(PropSet) {
    return safelyRendered(() => {
        let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
        return html `<div class="sim-component spacer ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
    });
}
/**** expandingSpacer ****/
export function expandingSpacer(PropSet) {
    return safelyRendered(() => {
        let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
        return html `<div class="sim-component expanding-spacer ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
    });
}
installStylesheetFor('sim-component.expanding-spacer', `
    .sim-component.expanding-spacer {
      flex:1 0 auto ! important;
    }
  `);
/**** horizontalSeparator ****/
export function horizontalSeparator(PropSet) {
    return safelyRendered(() => {
        let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
        return html `<div class="sim-component horizontal-separator ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
    });
}
installStylesheetFor('sim-component.horizontal-separator', `
    .sim-component.horizontal-separator {
      width:100%; min-width:1px; min-height:1px;
    }
    .sim-component.horizontal-separator::before {
      content: "";
      position:absolute; left:0px; right:0px; width:100%; height:1px;
      top:50%; transform:translateY(-50%);
      background:gray;
    }
  `);
/**** verticalSeparator ****/
export function verticalSeparator(PropSet) {
    return safelyRendered(() => {
        let [Classes, RestProps] = parsedPropSet(PropSet, optionalTextline('class'));
        return html `<div class="sim-component vertical-separator ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}/>`;
    });
}
installStylesheetFor('sim-component.vertical-separator', `
    .sim-component.vertical-separator {
      height:100%; min-width:1px; min-height:1px;
    }
    .sim-component.vertical-separator::before {
      content: "";
      position:absolute; top:0px; bottom:0px; width:1px; height:100%;
      left:50%; transform:translateX(-50%);
      background:gray;
    }
  `);
/**** plainTextlineView ****/
function plainTextlineView(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('value'));
        return html `<div class=${Classes !== null && Classes !== void 0 ? Classes : ''} ...${RestProps}>
        ${Value !== null && Value !== void 0 ? Value : ContentList}
      </>`;
    });
}
/**** Title ****/
export function Title(PropSet) {
    var _a;
    PropSet = Object.assign(Object.assign({}, PropSet), { 'class': `sim-component title ${(_a = PropSet.class) !== null && _a !== void 0 ? _a : ''}` });
    return plainTextlineView(PropSet);
}
installStylesheetFor('sim-component.title', `
    .sim-component.title {
      font-size:22px; font-weight:bold; line-height:32px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
/**** Subtitle ****/
export function Subtitle(PropSet) {
    var _a;
    PropSet = Object.assign(Object.assign({}, PropSet), { 'class': `sim-component subtitle ${(_a = PropSet.class) !== null && _a !== void 0 ? _a : ''}` });
    return plainTextlineView(PropSet);
}
installStylesheetFor('sim-component.subtitle', `
    .sim-component.subtitle {
      font-size:18px; font-weight:bold; line-height:27px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
/**** Label ****/
export function Label(PropSet) {
    var _a;
    PropSet = Object.assign(Object.assign({}, PropSet), { 'class': `sim-component label ${(_a = PropSet.class) !== null && _a !== void 0 ? _a : ''}` });
    return plainTextlineView(PropSet);
}
installStylesheetFor('sim-component.label', `
    .sim-component.label {
      height:30px;
      font-size:14px; font-weight:bold; line-height:30px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
/**** plainTextView ****/
function plainTextView(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('value'));
        return html `<div class=${Classes !== null && Classes !== void 0 ? Classes : ''} ...${RestProps}>
        ${Value !== null && Value !== void 0 ? Value : ContentList}
      </>`;
    });
}
/**** Description ****/
export function Description(PropSet) {
    var _a;
    PropSet = Object.assign(Object.assign({}, PropSet), { 'class': `sim-component description ${(_a = PropSet.class) !== null && _a !== void 0 ? _a : ''}` });
    return plainTextlineView(PropSet);
}
installStylesheetFor('sim-component.description', `
    .sim-component.description {
      font-size:14px; font-weight:normal; line-height:21px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
/**** Fineprint ****/
export function Fineprint(PropSet) {
    var _a;
    PropSet = Object.assign(Object.assign({}, PropSet), { 'class': `sim-component fineprint ${(_a = PropSet.class) !== null && _a !== void 0 ? _a : ''}` });
    return plainTextlineView(PropSet);
}
installStylesheetFor('sim-component.fineprint', `
    .sim-component.fineprint {
      font-size:12px; font-weight:normal; line-height:18px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
/**** TextView ****/
export function TextView(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('value'));
        return html `<div class="sim-component textview ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>${Value !== null && Value !== void 0 ? Value : ''}</>`;
    });
}
installStylesheetFor('sim-component.textview', `
    .sim-component.textview {
      overflow:auto;
      font-size:14px; font-weight:normal; line-height:21px;
    }
  `);
/**** HTMLView ****/
export function HTMLView(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('value'));
        return html `<div class="sim-component htmlview ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}
        dangerouslySetInnerHTML=${{ __html: Value !== null && Value !== void 0 ? Value : '' }}
      />`;
    });
}
installStylesheetFor('sim-component.htmlview', `
    .sim-component.htmlview {
      overflow:auto;
      font-size:14px; font-weight:normal; line-height:21px;
    }
  `);
/**** MarkdownView ****/
// don't forget  <link rel="stylesheet" href="/css/katex.min.css"/>
export const MarkdownRenderer = new Marked();
MarkdownRenderer.setOptions({
    gfm: true, breaks: true, pedantic: false, smartypants: false
});
MarkdownRenderer.use(markedKatex({
    throwOnError: false, /*nonStandard:true,*/
}));
MarkdownRenderer.use(markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-', // CSS class prefix
    highlight(Code, Language, Info) {
        Language = hljs.getLanguage(Language) ? Language : 'plaintext';
        return hljs.highlight(Code, { language: Language }).value;
    }
}));
export function MarkdownView(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('value'));
        const HTMLContents = useMemo(() => MarkdownRenderer.paime(Value !== null && Value !== void 0 ? Value : ''), [Value]);
        return html `<div class="sim-component markdownview ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}
        dangerouslySetInnerHTML=${{ __html: HTMLContents }}
      />`;
    });
}
installStylesheetFor('sim-component.markdownview', `
    .sim-component.markdownview {
      overflow:auto;
      font-size:14px; font-weight:normal; line-height:21px;
    }

    .sim-component.markdownview > h1 { font-size:22px; font-weight:bold; line-height:1.5; margin:0px }
    .sim-component.markdownview > h2 { font-size:20px; font-weight:bold; line-height:1.5; margin:0px }
    .sim-component.markdownview > h3 { font-size:18px; font-weight:bold; line-height:1.5; margin:0px }
    .sim-component.markdownview > h4 { font-size:16px; font-weight:bold; line-height:1.5; margin:0px }
    .sim-component.markdownview > h5 { font-size:15px; font-weight:bold; line-height:1.5; margin:0px }
    .sim-component.markdownview > h6 { font-size:14px; font-weight:bold; line-height:1.5; margin:0px }

    .sim-component.markdownview > h1:not(:first-child) { margin-top:11px }
    .sim-component.markdownview > h2:not(:first-child) { margin-top:10px }
    .sim-component.markdownview > h3:not(:first-child) { margin-top:9px }
    .sim-component.markdownview > h4:not(:first-child) { margin-top:8px }
    .sim-component.markdownview > h5:not(:first-child) { margin-top:8px }
    .sim-component.markdownview > h6:not(:first-child) { margin-top:7px }

    .sim-component.markdownview > p { font-size:14px; font-weight:normal; line-height:1.5; margin:0px }
    .sim-component.markdownview > p:not(:first-child) { margin-top:7px }

    .sim-component.markdownview > ul { font-size:14px; font-weight:normal; line-height:1.5; margin:0px }
    .sim-component.markdownview > ul:not(:first-child) { margin-top:7px }

    .sim-component.markdownview > ol { font-size:14px; font-weight:normal; line-height:1.5; margin:0px }
    .sim-component.markdownview > ol:not(:first-child) { margin-top:7px }

    .sim-component.markdownview > li { margin-left:20px }
    .sim-component.markdownview > ul, .sim-markdownview > .sim-content ol { padding-left:0px }

    .sim-component.markdownview > blockquote {
      margin:7px 0px 0px 10px;
      padding:0px 0px 0px 6px;
      border:none; border-left:solid 4px lightgray;
    }

    .sim-component.markdownview > code {
      font-family:Menlo,Courier,monospace;
      font-size:13px; font-weight:normal; line-height:1.5; margin:0px;
      padding:2px; background-color:#EEEEEE;
    }

    .sim-component.markdownview > pre { background-color:#EEEEEE; padding:2px 0px 2px 6px }
    .sim-component.markdownview > pre:not(:first-child) { margin-top:7px }
    .sim-component.markdownview > pre > code { padding:0px }

  /**** Syntax Highlighing ****/

    .hljs {
      display:block;
      overflow-x:auto;
      padding:0.5em;
      background:#f0f0f0;
      color:#444444;
    }

    .hljs-comment, .hljs-quote                     { font-style:italic;  color:#999988 }
    .hljs-keyword, .hljs-selector-tag, .hljs-subst { font-weight:bold;   color:#333333 }
    .hljs-string,  .hljs-doctag                    { color:#dd1144 }
    .hljs-number                                   { color:#009999 }
    .hljs-title, .hljs-section, .hljs-selector-id  { font-weight:bold;   color:#990000 }
    .hljs-class .hljs-title, .hljs-type            { font-weight:bold;   color:#445588 }
    .hljs-variable, .hljs-template-variable        { color:#336699 }
    .hljs-attr                                     { color:#007700 }
    .hljs-tag, .hljs-name                          { font-weight:normal; color:#000080}
    .hljs-regexp                                   { color:#009926 }
    .hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-pseudo { color:#990073 }
    .hljs-built_in, .hljs-builtin-name             { color:#0086b3 }
    .hljs-deletion                                 { background:#ffdddd }
    .hljs-addition                                 { background:#ddffdd }
    .hljs-emphasis                                 { font-style:italic }
    .hljs-strong                                   { font-weight:bold }
    .hljs.language-html, .hljs.language-xml        { color:#333333 }
    .hljs.language-css .hljs-selector-class,
    .hljs.language-css .hljs-selector-tag,
    .hljs.language-css .hljs-attribute             { color:#1e347b }
    .hljs.language-javascript .hljs-keyword        { color:#0000aa }
    .hljs.language-typescript .hljs-keyword        { color:#0000aa }
    .hljs.language-java .hljs-keyword              { color:#bb9966 }
    .hljs.language-json .hljs-attribute            { color:#0000aa }
  `);
/**** ImageView ****/
export const SIM_ImageScalings = ['none', 'stretch', 'cover', 'contain'];
export const SIM_ImageAlignments = [
    'left top', 'center top', 'right top', 'left center', 'center center',
    'right center', 'left bottom', 'center bottom', 'right bottom'
];
function ValueIsImageScaling(Value) {
    return ValueIsOneOf(Value, SIM_ImageScalings);
}
function ValueIsImageAlignment(Value) {
    return ValueIsOneOf(Value, SIM_ImageAlignments);
}
export function ImageView(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, ImageScaling, ImageAlignment, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalURL('value'), optionalValue('scaling', ValueIsImageScaling), optionalValue('alignment', ValueIsImageAlignment));
        return html `<img class="sim-component imageview ${Classes !== null && Classes !== void 0 ? Classes : ''}" src=${Value !== null && Value !== void 0 ? Value : ''} style="
        object-fit:${ImageScaling !== null && ImageScaling !== void 0 ? ImageScaling : 'contain'};
        object-position:${ImageAlignment !== null && ImageAlignment !== void 0 ? ImageAlignment : 'center center'}; ${Style}
      " ...${RestProps}/>`;
    });
}
installStylesheetFor('sim-component.imageview', `
    .sim-component.imageview {
      object-fit:contain; object-position:center;
    }
  `);
/**** SVGView ****/
export function SVGView(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, ImageScaling, ImageAlignment, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalURL('value'), optionalValue('scaling', ValueIsImageScaling), optionalValue('alignment', ValueIsImageAlignment));
        const DataURL = useMemo(() => 'image/svg+xml;base64,' + btoa(Value !== null && Value !== void 0 ? Value : ''));
        return html `<img class="sim-component svgview ${Classes !== null && Classes !== void 0 ? Classes : ''}" src=${DataURL} style="
        object-fit:${ImageScaling !== null && ImageScaling !== void 0 ? ImageScaling : 'contain'};
        object-position:${ImageAlignment !== null && ImageAlignment !== void 0 ? ImageAlignment : 'center center'}; ${Style}
      " ...${RestProps}/>`;
    });
}
installStylesheetFor('sim-component.svgview', `
    .sim-component.svgview {
      object-fit:contain; object-position:center;
    }
  `);
/**** WebView ****/
export const SIM_DefaultSandboxPermissions = ('allow-downloads allow-forms allow-modals allow-orientation-lock ' +
    'allow-pointer-lock allow-popups allow-same-origin allow-scripts');
export const SIM_ReferrerPolicies = [
    'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin',
    'same-origin', 'strict-origin', 'strict-origin-when-cross-origin',
    'unsafe-url'
];
function ValueIsReferrerPolicy(Value) {
    return ValueIsOneOf(Value, SIM_ReferrerPolicies);
}
export function WebView(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, Permissions, allowsFullScreen, SandboxPermissions, ReferrerPolicy, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalURL('value'), optionalTextline('allow'), optionalBoolean('allowfullscreen'), optionalTextline('sandbox'), optionalValue('referrerpolicy', ValueIsReferrerPolicy));
        return html `<iframe class="sim-component webview ${Classes !== null && Classes !== void 0 ? Classes : ''}" src=${Value !== null && Value !== void 0 ? Value : ''}
        allow=${Permissions} allowfullscreen=${allowsFullScreen}
        sandbox=${SandboxPermissions} referrerpolicy=${ReferrerPolicy}
        ...${RestProps}
      />`;
    });
}
installStylesheetFor('sim-component.webview', `
    .sim-component.webview {
      overflow:auto;
    }
  `);
/**** Icon ****/
export function Icon(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, Color, active, disabled, onClick, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalURL('value'), optionalColor('color'), optionalBoolean('active'), optionalBoolean('disabled'), optionalFunction('onclick'));
        Value = Value !== null && Value !== void 0 ? Value : `${IconFolder}/circle-information.png`;
        Color = Color !== null && Color !== void 0 ? Color : 'black';
        const _onClick = useCallback((Event) => {
            if (disabled) {
                return consumingEvent(Event);
            }
            executeCallback('Icon callback "onClick"', onClick, Event);
        }, [disabled, onClick]);
        const Cursor = (disabled ? 'not-allowed' : (onClick == null) ? 'auto' : 'pointer');
        return html `<div
        class="sim-component icon ${disabled ? 'disabled' : ''} ${active ? 'active' : ''} ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        onClick=${_onClick} ...${RestProps}
      >
        <div style="
          -webkit-mask-image:url(${Value}); mask-image:url(${Value});
          background-color:${Color};
          cursor:${Cursor};
        "/>
      </>`;
    });
}
installStylesheetFor('sim-component.icon', `
    .sim-component.icon {
      width:24px ! important; height:24px ! important;
    }

    .sim-component.icon > div {
      width:24px; height:24px;
      overflow:hidden; pointer-events:auto;
      -webkit-mask-size:contain;           mask-size:contain;
      -webkit-mask-position:center center; mask-position:center center;
    }

    .sim-component.icon.active {
      background:#e8f0ff;
      outline:solid 2px lightgray; border-radius:4px;
    }
  `);
/**** FAIcon ****/
export const SIM_FAIconNames = [
    // modified version from https://gist.github.com/zwinnie/3ed8e7970240962bc29227533c3ae047
    'fa-500px', 'fa-address-book', 'fa-address-book-o', 'fa-address-card',
    'fa-address-card-o', 'fa-adjust', 'fa-adn', 'fa-align-center',
    'fa-align-justify', 'fa-align-left', 'fa-align-right', 'fa-amazon',
    'fa-ambulance', 'fa-american-sign-language-interpreting', 'fa-anchor',
    'fa-android', 'fa-angellist', 'fa-angle-double-down',
    'fa-angle-double-left', 'fa-angle-double-right', 'fa-angle-double-up',
    'fa-angle-down', 'fa-angle-left', 'fa-angle-right', 'fa-angle-up',
    'fa-apple', 'fa-archive', 'fa-area-chart', 'fa-arrow-circle-down',
    'fa-arrow-circle-left', 'fa-arrow-circle-o-down', 'fa-arrow-circle-o-left',
    'fa-arrow-circle-o-right', 'fa-arrow-circle-o-up', 'fa-arrow-circle-right',
    'fa-arrow-circle-up', 'fa-arrow-down', 'fa-arrow-left', 'fa-arrow-right',
    'fa-arrow-up', 'fa-arrows', 'fa-arrows-alt', 'fa-arrows-h', 'fa-arrows-v',
    'fa-asl-interpreting', 'fa-assistive-listening-systems', 'fa-asterisk',
    'fa-at', 'fa-audio-description', 'fa-automobile', 'fa-backward',
    'fa-balance-scale', 'fa-ban', 'fa-bandcamp', 'fa-bank', 'fa-bar-chart',
    'fa-bar-chart-o', 'fa-barcode', 'fa-bars', 'fa-bath', 'fa-bathtub',
    'fa-battery', 'fa-battery-0', 'fa-battery-1', 'fa-battery-2',
    'fa-battery-3', 'fa-battery-4', 'fa-battery-empty', 'fa-battery-full',
    'fa-battery-half', 'fa-battery-quarter', 'fa-battery-three-quarters',
    'fa-bed', 'fa-beer', 'fa-behance', 'fa-behance-square', 'fa-bell',
    'fa-bell-o', 'fa-bell-slash', 'fa-bell-slash-o', 'fa-bicycle',
    'fa-binoculars', 'fa-birthday-cake', 'fa-bitbucket', 'fa-bitbucket-square',
    'fa-bitcoin', 'fa-black-tie', 'fa-blind', 'fa-bluetooth', 'fa-bluetooth-b',
    'fa-bold', 'fa-bolt', 'fa-bomb', 'fa-book', 'fa-bookmark', 'fa-bookmark-o',
    'fa-braille', 'fa-briefcase', 'fa-btc', 'fa-bug', 'fa-building',
    'fa-building-o', 'fa-bullhorn', 'fa-bullseye', 'fa-bus', 'fa-buysellads',
    'fa-cab', 'fa-calculator', 'fa-calendar', 'fa-calendar-check-o',
    'fa-calendar-minus-o', 'fa-calendar-o', 'fa-calendar-plus-o',
    'fa-calendar-times-o', 'fa-camera', 'fa-camera-retro', 'fa-car',
    'fa-caret-down', 'fa-caret-left', 'fa-caret-right',
    'fa-caret-square-o-down', 'fa-caret-square-o-left',
    'fa-caret-square-o-right', 'fa-caret-square-o-up', 'fa-caret-up',
    'fa-cart-arrow-down', 'fa-cart-plus', 'fa-cc', 'fa-cc-amex',
    'fa-cc-diners-club', 'fa-cc-discover', 'fa-cc-jcb', 'fa-cc-mastercard',
    'fa-cc-paypal', 'fa-cc-stripe', 'fa-cc-visa', 'fa-certificate', 'fa-chain',
    'fa-chain-broken', 'fa-check', 'fa-check-circle', 'fa-check-circle-o',
    'fa-check-square', 'fa-check-square-o', 'fa-chevron-circle-down',
    'fa-chevron-circle-left', 'fa-chevron-circle-right', 'fa-chevron-circle-up',
    'fa-chevron-down', 'fa-chevron-left', 'fa-chevron-right', 'fa-chevron-up',
    'fa-child', 'fa-chrome', 'fa-circle', 'fa-circle-o', 'fa-circle-o-notch',
    'fa-circle-thin', 'fa-clipboard', 'fa-clock-o', 'fa-clone', 'fa-close',
    'fa-cloud', 'fa-cloud-download', 'fa-cloud-upload', 'fa-cny', 'fa-code',
    'fa-code-fork', 'fa-codepen', 'fa-codiepie', 'fa-coffee', 'fa-cog',
    'fa-cogs', 'fa-columns', 'fa-comment', 'fa-comment-o', 'fa-commenting',
    'fa-commenting-o', 'fa-comments', 'fa-comments-o', 'fa-compass',
    'fa-compress', 'fa-connectdevelop', 'fa-contao', 'fa-copy', 'fa-copyright',
    'fa-creative-commons', 'fa-credit-card', 'fa-credit-card-alt', 'fa-crop',
    'fa-crosshairs', 'fa-css3', 'fa-cube', 'fa-cubes', 'fa-cut', 'fa-cutlery',
    'fa-dashboard', 'fa-dashcube', 'fa-database', 'fa-deaf', 'fa-deafness',
    'fa-dedent', 'fa-delicious', 'fa-desktop', 'fa-deviantart', 'fa-diamond',
    'fa-digg', 'fa-dollar', 'fa-dot-circle-o', 'fa-download', 'fa-dribbble',
    'fa-drivers-license', 'fa-drivers-license-o', 'fa-dropbox', 'fa-drupal',
    'fa-edge', 'fa-edit', 'fa-eercast', 'fa-eject', 'fa-ellipsis-h',
    'fa-ellipsis-v', 'fa-empire', 'fa-envelope', 'fa-envelope-o',
    'fa-envelope-open', 'fa-envelope-open-o', 'fa-envelope-square', 'fa-envira',
    'fa-eraser', 'fa-etsy', 'fa-eur', 'fa-euro', 'fa-exchange',
    'fa-exclamation', 'fa-exclamation-circle', 'fa-exclamation-triangle',
    'fa-expand', 'fa-expeditedssl', 'fa-external-link',
    'fa-external-link-square', 'fa-eye', 'fa-eye-slash', 'fa-eyedropper',
    'fa-fa', 'fa-facebook', 'fa-facebook-f', 'fa-facebook-official',
    'fa-facebook-square', 'fa-fast-backward', 'fa-fast-forward', 'fa-fax',
    'fa-feed', 'fa-female', 'fa-fighter-jet', 'fa-file', 'fa-file-archive-o',
    'fa-file-audio-o', 'fa-file-code-o', 'fa-file-excel-o', 'fa-file-image-o',
    'fa-file-movie-o', 'fa-file-o', 'fa-file-pdf-o', 'fa-file-photo-o',
    'fa-file-picture-o', 'fa-file-powerpoint-o', 'fa-file-sound-o',
    'fa-file-text', 'fa-file-text-o', 'fa-file-video-o', 'fa-file-word-o',
    'fa-file-zip-o', 'fa-files-o', 'fa-film', 'fa-filter', 'fa-fire',
    'fa-fire-extinguisher', 'fa-firefox', 'fa-first-order', 'fa-flag',
    'fa-flag-checkered', 'fa-flag-o', 'fa-flash', 'fa-flask', 'fa-flickr',
    'fa-floppy-o', 'fa-folder', 'fa-folder-o', 'fa-folder-open',
    'fa-folder-open-o', 'fa-font', 'fa-font-awesome', 'fa-fonticons',
    'fa-fort-awesome', 'fa-forumbee', 'fa-forward', 'fa-foursquare',
    'fa-free-code-camp', 'fa-frown-o', 'fa-futbol-o', 'fa-gamepad', 'fa-gavel',
    'fa-gbp', 'fa-ge', 'fa-gear', 'fa-gears', 'fa-genderless', 'fa-get-pocket',
    'fa-gg', 'fa-gg-circle', 'fa-gift', 'fa-git', 'fa-git-square', 'fa-github',
    'fa-github-alt', 'fa-github-square', 'fa-gitlab', 'fa-gittip', 'fa-glass',
    'fa-glide', 'fa-glide-g', 'fa-globe', 'fa-google', 'fa-google-plus',
    'fa-google-plus-circle', 'fa-google-plus-official', 'fa-google-plus-square',
    'fa-google-wallet', 'fa-graduation-cap', 'fa-gratipay', 'fa-grav',
    'fa-group', 'fa-h-square', 'fa-hacker-news', 'fa-hand-grab-o',
    'fa-hand-lizard-o', 'fa-hand-o-down', 'fa-hand-o-left', 'fa-hand-o-right',
    'fa-hand-o-up', 'fa-hand-paper-o', 'fa-hand-peace-o', 'fa-hand-pointer-o',
    'fa-hand-rock-o', 'fa-hand-scissors-o', 'fa-hand-spock-o', 'fa-hand-stop-o',
    'fa-handshake-o', 'fa-hard-of-hearing', 'fa-hashtag', 'fa-hdd-o',
    'fa-header', 'fa-headphones', 'fa-heart', 'fa-heart-o', 'fa-heartbeat',
    'fa-history', 'fa-home', 'fa-hospital-o', 'fa-hotel', 'fa-hourglass',
    'fa-hourglass-1', 'fa-hourglass-2', 'fa-hourglass-3', 'fa-hourglass-end',
    'fa-hourglass-half', 'fa-hourglass-o', 'fa-hourglass-start', 'fa-houzz',
    'fa-html5', 'fa-i-cursor', 'fa-id-badge', 'fa-id-card', 'fa-id-card-o',
    'fa-ils', 'fa-image', 'fa-imdb', 'fa-inbox', 'fa-indent', 'fa-industry',
    'fa-info', 'fa-info-circle', 'fa-inr', 'fa-instagram', 'fa-institution',
    'fa-internet-explorer', 'fa-intersex', 'fa-ioxhost', 'fa-italic',
    'fa-joomla', 'fa-jpy', 'fa-jsfiddle', 'fa-key', 'fa-keyboard-o', 'fa-krw',
    'fa-language', 'fa-laptop', 'fa-lastfm', 'fa-lastfm-square', 'fa-leaf',
    'fa-leanpub', 'fa-legal', 'fa-lemon-o', 'fa-level-down', 'fa-level-up',
    'fa-life-bouy', 'fa-life-buoy', 'fa-life-ring', 'fa-life-saver',
    'fa-lightbulb-o', 'fa-line-chart', 'fa-link', 'fa-linkedin',
    'fa-linkedin-square', 'fa-linode', 'fa-linux', 'fa-list', 'fa-list-alt',
    'fa-list-ol', 'fa-list-ul', 'fa-location-arrow', 'fa-lock',
    'fa-long-arrow-down', 'fa-long-arrow-left', 'fa-long-arrow-right',
    'fa-long-arrow-up', 'fa-low-vision', 'fa-magic', 'fa-magnet',
    'fa-mail-forward', 'fa-mail-reply', 'fa-mail-reply-all', 'fa-male',
    'fa-map', 'fa-map-marker', 'fa-map-o', 'fa-map-pin', 'fa-map-signs',
    'fa-mars', 'fa-mars-double', 'fa-mars-stroke', 'fa-mars-stroke-h',
    'fa-mars-stroke-v', 'fa-maxcdn', 'fa-meanpath', 'fa-medium', 'fa-medkit',
    'fa-meetup', 'fa-meh-o', 'fa-mercury', 'fa-microchip', 'fa-microphone',
    'fa-microphone-slash', 'fa-minus', 'fa-minus-circle', 'fa-minus-square',
    'fa-minus-square-o', 'fa-mixcloud', 'fa-mobile', 'fa-mobile-phone',
    'fa-modx', 'fa-money', 'fa-moon-o', 'fa-mortar-board', 'fa-motorcycle',
    'fa-mouse-pointer', 'fa-music', 'fa-navicon', 'fa-neuter', 'fa-newspaper-o',
    'fa-object-group', 'fa-object-ungroup', 'fa-odnoklassniki',
    'fa-odnoklassniki-square', 'fa-opencart', 'fa-openid', 'fa-opera',
    'fa-optin-monster', 'fa-outdent', 'fa-pagelines', 'fa-paint-brush',
    'fa-paper-plane', 'fa-paper-plane-o', 'fa-paperclip', 'fa-paragraph',
    'fa-paste', 'fa-pause', 'fa-pause-circle', 'fa-pause-circle-o', 'fa-paw',
    'fa-paypal', 'fa-pencil', 'fa-pencil-square', 'fa-pencil-square-o',
    'fa-percent', 'fa-phone', 'fa-phone-square', 'fa-photo', 'fa-picture-o',
    'fa-pie-chart', 'fa-pied-piper', 'fa-pied-piper-alt', 'fa-pied-piper-pp',
    'fa-pinterest', 'fa-pinterest-p', 'fa-pinterest-square', 'fa-plane',
    'fa-play', 'fa-play-circle', 'fa-play-circle-o', 'fa-plug', 'fa-plus',
    'fa-plus-circle', 'fa-plus-square', 'fa-plus-square-o', 'fa-podcast',
    'fa-power-off', 'fa-print', 'fa-product-hunt', 'fa-puzzle-piece', 'fa-qq',
    'fa-qrcode', 'fa-question', 'fa-question-circle', 'fa-question-circle-o',
    'fa-quora', 'fa-quote-left', 'fa-quote-right', 'fa-ra', 'fa-random',
    'fa-ravelry', 'fa-rebel', 'fa-recycle', 'fa-reddit', 'fa-reddit-alien',
    'fa-reddit-square', 'fa-refresh', 'fa-registered', 'fa-remove', 'fa-renren',
    'fa-reorder', 'fa-repeat', 'fa-reply', 'fa-reply-all', 'fa-resistance',
    'fa-retweet', 'fa-rmb', 'fa-road', 'fa-rocket', 'fa-rotate-left',
    'fa-rotate-right', 'fa-rouble', 'fa-rss', 'fa-rss-square', 'fa-rub',
    'fa-ruble', 'fa-rupee', 'fa-s15', 'fa-safari', 'fa-save', 'fa-scissors',
    'fa-scribd', 'fa-search', 'fa-search-minus', 'fa-search-plus', 'fa-sellsy',
    'fa-send', 'fa-send-o', 'fa-server', 'fa-share', 'fa-share-alt',
    'fa-share-alt-square', 'fa-share-square', 'fa-share-square-o', 'fa-shekel',
    'fa-sheqel', 'fa-shield', 'fa-ship', 'fa-shirtsinbulk', 'fa-shopping-bag',
    'fa-shopping-basket', 'fa-shopping-cart', 'fa-shower', 'fa-sign-in',
    'fa-sign-language', 'fa-sign-out', 'fa-signal', 'fa-signing',
    'fa-simplybuilt', 'fa-sitemap', 'fa-skyatlas', 'fa-skype', 'fa-slack',
    'fa-sliders', 'fa-slideshare', 'fa-smile-o', 'fa-snapchat',
    'fa-snapchat-ghost', 'fa-snapchat-square', 'fa-snowflake-o',
    'fa-soccer-ball-o', 'fa-sort', 'fa-sort-alpha-asc', 'fa-sort-alpha-desc',
    'fa-sort-amount-asc', 'fa-sort-amount-desc', 'fa-sort-asc', 'fa-sort-desc',
    'fa-sort-down', 'fa-sort-numeric-asc', 'fa-sort-numeric-desc', 'fa-sort-up',
    'fa-soundcloud', 'fa-space-shuttle', 'fa-spinner', 'fa-spoon', 'fa-spotify',
    'fa-square', 'fa-square-o', 'fa-stack-exchange', 'fa-stack-overflow',
    'fa-star', 'fa-star-half', 'fa-star-half-empty', 'fa-star-half-full',
    'fa-star-half-o', 'fa-star-o', 'fa-steam', 'fa-steam-square',
    'fa-step-backward', 'fa-step-forward', 'fa-stethoscope', 'fa-sticky-note',
    'fa-sticky-note-o', 'fa-stop', 'fa-stop-circle', 'fa-stop-circle-o',
    'fa-street-view', 'fa-strikethrough', 'fa-stumbleupon',
    'fa-stumbleupon-circle', 'fa-subscript', 'fa-subway', 'fa-suitcase',
    'fa-sun-o', 'fa-superpowers', 'fa-superscript', 'fa-support', 'fa-table',
    'fa-tablet', 'fa-tachometer', 'fa-tag', 'fa-tags', 'fa-tasks', 'fa-taxi',
    'fa-telegram', 'fa-television', 'fa-tencent-weibo', 'fa-terminal',
    'fa-text-height', 'fa-text-width', 'fa-th', 'fa-th-large', 'fa-th-list',
    'fa-themeisle', 'fa-thermometer', 'fa-thermometer-0', 'fa-thermometer-1',
    'fa-thermometer-2', 'fa-thermometer-3', 'fa-thermometer-4',
    'fa-thermometer-empty', 'fa-thermometer-full', 'fa-thermometer-half',
    'fa-thermometer-quarter', 'fa-thermometer-three-quarters', 'fa-thumb-tack',
    'fa-thumbs-down', 'fa-thumbs-o-down', 'fa-thumbs-o-up', 'fa-thumbs-up',
    'fa-ticket', 'fa-times', 'fa-times-circle', 'fa-times-circle-o',
    'fa-times-rectangle', 'fa-times-rectangle-o', 'fa-tint', 'fa-toggle-down',
    'fa-toggle-left', 'fa-toggle-off', 'fa-toggle-on', 'fa-toggle-right',
    'fa-toggle-up', 'fa-trademark', 'fa-train', 'fa-transgender',
    'fa-transgender-alt', 'fa-trash', 'fa-trash-o', 'fa-tree', 'fa-trello',
    'fa-tripadvisor', 'fa-trophy', 'fa-truck', 'fa-try', 'fa-tty', 'fa-tumblr',
    'fa-tumblr-square', 'fa-turkish-lira', 'fa-tv', 'fa-twitch', 'fa-twitter',
    'fa-twitter-square', 'fa-umbrella', 'fa-underline', 'fa-undo',
    'fa-universal-access', 'fa-university', 'fa-unlink', 'fa-unlock',
    'fa-unlock-alt', 'fa-unsorted', 'fa-upload', 'fa-usb', 'fa-usd', 'fa-user',
    'fa-user-circle', 'fa-user-circle-o', 'fa-user-md', 'fa-user-o',
    'fa-user-plus', 'fa-user-secret', 'fa-user-times', 'fa-users', 'fa-vcard',
    'fa-vcard-o', 'fa-venus', 'fa-venus-double', 'fa-venus-mars', 'fa-viacoin',
    'fa-video', 'fa-video-square', 'fa-video-camera', 'fa-vimeo',
    'fa-vimeo-square', 'fa-vine', 'fa-vk', 'fa-volume-control-phone',
    'fa-volume-down', 'fa-volume-off', 'fa-volume-up', 'fa-warning',
    'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wheelchair',
    'fa-wheelchair-alt', 'fa-wifi', 'fa-wikipedia-w', 'fa-window-close',
    'fa-window-close-o', 'fa-window-maximize', 'fa-window-minimize',
    'fa-window-restore', 'fa-windows', 'fa-won', 'fa-wordpress',
    'fa-wpbeginner', 'fa-wpexplorer', 'fa-wpforms', 'fa-wrench', 'fa-xing',
    'fa-xing-square', 'fa-y-combinator', 'fa-y-combinator-square', 'fa-yahoo',
    'fa-yc', 'fa-yc-square', 'fa-yelp', 'fa-yen', 'fa-yoast', 'fa-youtube',
    'fa-youtube-play', 'fa-youtube-square',
];
export function FAIcon(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, Color, active, disabled, onClick, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsOneOf(Value, SIM_FAIconNames)), optionalColor('color'), optionalBoolean('active'), optionalBoolean('disabled'), optionalFunction('onclick'));
        Value = Value !== null && Value !== void 0 ? Value : 'fa-question-circle-o';
        Color = Color !== null && Color !== void 0 ? Color : 'black';
        const _onClick = useCallback((Event) => {
            if (disabled) {
                return consumingEvent(Event);
            }
            executeCallback('Icon callback "onClick"', onClick, Event);
        }, [disabled, onClick]);
        const Cursor = (disabled ? 'not-allowed' : (onClick == null) ? 'auto' : 'pointer');
        return html `<div class="sim-component fa-icon fa ${Value} ${disabled ? 'disabled' : ''} ${active ? 'active' : ''} ${Classes !== null && Classes !== void 0 ? Classes : ''}" style="
        color:${Color};
        cursor:${Cursor};
      " onClick=${_onClick} ...${RestProps}/>`;
    });
}
installStylesheetFor('sim-component.fa-icon', `
    .sim-component.fa-icon {
      width:24px ! important; height:24px ! important;
      font-size:24px; line-height:24px; text-align:center;
      pointer-events:auto;
    }

    .sim-component.fa-icon.active {
      background:#e8f0ff;
      outline:solid 2px lightgray; border-radius:4px;
    }
  `);
/**** Button ****/
export function Button(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('value'));
        if (Value == null) {
            return html `<button class="sim-component button ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
          ${ContentList}
        </>`;
        }
        else {
            return html `<button class="sim-component button ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}
          dangerouslySetInnerHTML=${{ __html: Value }}
        />`;
        }
    });
}
installStylesheetFor('sim-component.button', `
    .sim-component.button {
      height:30px;
      border:solid 1px black; border-radius:4px;
      background:white;
      font-weight:bold; color:black;
      cursor:pointer; pointer-events:auto;
    }
    .sim-component.button:disabled {
      cursor:not-allowed;
    }
  `);
/**** Checkbox ****/
export function Checkbox(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, disabled, onValueInput, onClick, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalValue('value', (Value) => ValueIsBoolean(Value) || ValueIsSpecial(Value)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('onclick'));
        const [actualValue, actualDisabling] = (ValueIsSpecial(Value)
            ? [undefined, disabled || Value.disabled]
            : [Value, disabled]);
        const checked = (actualValue == true);
        const indeterminate = (actualValue == null);
        const _onClick = useCallback((Event) => {
            consumeEvent(Event, actualDisabling);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('Checkbox callback "onClick"', onClick, Event);
            const Value = Event.target.checked;
            executeCallback('Checkbox callback "onValueInput"', onValueInput, Value, Event);
        }, [actualDisabling, onClick, onValueInput]);
        return html `<div class="sim-component checkbox ${actualDisabling ? 'disabled' : ''} ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        style=${Style}
      >
        <input type="checkbox"
          checked=${checked} indeterminate=${indeterminate}
          onClick=${_onClick} ...${RestProps}
        />
      </>`;
    });
}
installStylesheetFor('sim-component.checkbox', `
    .sim-component.checkbox {
      height:30px;
      min-width:20px; min-height:20px;
    }
    .sim-component.checkbox > input {
      position:absolute;
      left:50%; top:50%; width:100%; height:100%;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
    .sim-component.checkbox > input:disabled {
      cursor:not-allowed;
    }
  `);
/**** Radiobutton ****/
export function Radiobutton(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, disabled, onValueInput, onClick, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalValue('value', (Value) => ValueIsBoolean(Value) || ValueIsSpecial(Value)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('onclick'));
        Value = Value !== null && Value !== void 0 ? Value : SIM_empty;
        const [actualValue, actualDisabling] = (ValueIsSpecial(Value)
            ? [undefined, disabled || Value.disabled]
            : [Value, disabled]);
        const checked = (actualValue == true);
        const _onClick = useCallback((Event) => {
            consumeEvent(Event, actualDisabling);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('Radiobutton callback "onClick"', onClick, Event);
            const Value = Event.target.checked;
            executeCallback('Checkbox callback "onValueInput"', onValueInput, Value, Event);
        }, [actualDisabling, onClick, onValueInput]);
        return html `<div class="sim-component radiobutton ${actualDisabling ? 'disabled' : ''} ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        style=${Style}
      >
        <input type="radio" checked=${checked} onClick=${_onClick} ...${RestProps}/>
      </>`; // strange: needs explicit "onClick=${onClick}"
    });
}
installStylesheetFor('sim-component.radiobutton', `
    .sim-component.radiobutton {
      height:30px;
      min-width:20px; min-height:20px;
    }
    .sim-component.radiobutton > input {
      position:absolute;
      left:50%; top:50%; width:100%; height:100%;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
    .sim-component.radiobutton > input:disabled {
      cursor:not-allowed;
    }
  `);
/**** Gauge ****/
export function Gauge(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, Minimum, lowerBound, Optimum, upperBound, Maximum, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalNumber('value'), optionalNumber('min'), optionalNumber('low'), optionalNumber('opt'), optionalNumber('high'), optionalNumber('max'));
        return html `<div class="sim-component gauge ${Classes !== null && Classes !== void 0 ? Classes : ''}" style=${Style}>
        <meter
          value=${Value} min=${Minimum} low=${lowerBound} opt=${Optimum}
          high=${upperBound} max=${Maximum} ...${RestProps}
        />
      </>`;
    });
}
installStylesheetFor('sim-component.gauge', `
    .sim-component.gauge {
      height:30px;
      min-width:40px; min-height:20px;
    }
    .sim-component.gauge > meter {
      position:absolute;
      left:50%; top:50%; width:100%; height:16px;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
  `);
/**** Progressbar ****/
export function Progressbar(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, Maximum, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalNumber('value'), optionalNumber('max'));
        return html `<div class="sim-component progressbar ${Classes !== null && Classes !== void 0 ? Classes : ''}" style=${Style}>
        <progress value=${Value} max=${Maximum} ...${RestProps}/>
      </>`;
    });
}
installStylesheetFor('sim-component.progressbar', `
    .sim-component.progressbar {
      height:30px;
      min-width:40px; min-height:20px;
    }
    .sim-component.progressbar > progress {
      position:absolute;
      left:50%; top:50%; width:100%; height:16px;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
    .sim-component.progressbar > progress::-webkit-progress-bar {
      background-color:#EEEEEE;
      border:solid 1px #E0E0E0; border-radius:2px;
    }
    .sim-component.progressbar > progress::-webkit-progress-value,
    .sim-component.progressbar > progress::-moz-progress-bar {
      background-color:dodgerblue;
      border:none; border-radius:2px;
    }
  `);
/**** Slider ****/
export function Slider(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, Minimum, Stepping, Maximum, Hashmarks, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalValue('value', (Value) => ValueIsNumber(Value) || ValueIsSpecial(Value)), optionalNumber('min'), optionalValue('step', (Value) => ValueIsNumberInRange(Value, 0, Infinity, false, false)), optionalNumber('max'), optionalValue('hashmarks', (Value) => ValueIsListSatisfying(Value, ValueIsTextline)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = ((Value == null) || isNaN(Value) ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, disabled || ValueToShow.disabled]
            : [ValueToShow, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('Slider callback "onInput"', onInput, Event);
            let Value = shownValue.current = parseFloat(Event.target.value);
            executeCallback('Slider callback "onValueInput"', onValueInput, Value, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('slider callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let HashmarkList = '', HashmarkId;
        if ((Hashmarks != null) && (Hashmarks.length > 0)) {
            HashmarkId = internalId + '-Hashmarks';
            HashmarkList = html `\n<datalist id=${HashmarkId}>
          ${Hashmarks.map((Item) => {
                const Value = Item.replace(/:.*$/, '').trim();
                const Label = Item.replace(/^[^:]+:/, '').trim();
                return html `<option value=${Value}>${Label}</option>`;
            })}
        </datalist>`;
        }
        return html `<div class="sim-component slider ${Classes !== null && Classes !== void 0 ? Classes : ''}" style=${Style}>
        <input type="range" ref=${ViewRef} disabled=${actualDisabling}
          value=${actualValue} min=${Minimum} max=${Maximum} step=${Stepping}
          list=${HashmarkId}
          onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
        />${HashmarkList}
      </>`;
    });
}
installStylesheetFor('sim-component.slider', `
    .sim-component.slider {
      height:30px;
      min-width:40px; min-height:20px;
    }
    .sim-component.slider > input {
      position:absolute;
      left:50%; top:50%; width:100%;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
    .sim-component.slider > input:disabled {
      cursor:not-allowed;
    }
  `);
/**** TextlineInput ****/
export function TextlineInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, invalid, Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsTextline(Value) || ValueIsSpecial(Value)), optionalBoolean('invalid'), optionalTextline('placeholder'), optionalBoolean('readonly'), optionalOrdinal('minlength'), optionalOrdinal('maxlength'), optionalTextline('pattern'), optionalBoolean('spellcheck'), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsTextline)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualPlaceholder, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, ValueToShow === SIM_empty ? Placeholder !== null && Placeholder !== void 0 ? Placeholder : ValueToShow.Placeholder : ValueToShow.Placeholder, disabled || ValueToShow.disabled]
            : [ValueToShow, Placeholder, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('TextlineInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('TextlineInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('TextlineInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="text" class="sim-component textline-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${actualPlaceholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${actualDisabling} list=${SuggestionId}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.textline-input', `
    .sim-component.textline-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.textline-input:invalid, .sim-component.sim-textline-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .sim-component.textline-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.textline-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** PasswordInput ****/
export function PasswordInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, invalid, Placeholder, readonly, minLength, maxLength, Pattern, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsTextline(Value) || ValueIsSpecial(Value)), optionalBoolean('invalid'), optionalTextline('placeholder'), optionalBoolean('readonly'), optionalOrdinal('minlength'), optionalOrdinal('maxlength'), optionalTextline('pattern'), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualPlaceholder, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, ValueToShow === SIM_empty ? Placeholder !== null && Placeholder !== void 0 ? Placeholder : ValueToShow.Placeholder : ValueToShow.Placeholder, disabled || ValueToShow.disabled]
            : [ValueToShow, Placeholder, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('PasswordInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('PasswordInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('PasswordInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const rerender = useRerenderer();
        return html `<input type="password" class="sim-component password-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${actualPlaceholder}
        pattern=${Pattern} disabled=${actualDisabling}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />`;
    });
}
installStylesheetFor('sim-component.password-input', `
    .sim-component.password-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.password-input:invalid, .sim-component.sim-password-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .sim-component.password-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.password-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** NumberInput ****/
export function NumberInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, invalid, Placeholder, readonly, Minimum, Stepping, Maximum, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsNumber(Value) || ValueIsSpecial(Value)), optionalBoolean('invalid'), optionalTextline('placeholder'), optionalBoolean('readonly'), optionalNumber('min'), optionalValue('step', (Value) => ValueIsNumberInRange(Value, 0, Infinity, false, false)), optionalNumber('max'), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsNumber)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (ValueIsSpecial(Value) || (Value != null) && !isNaN(Value) ? Value : SIM_empty);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualPlaceholder, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, ValueToShow === SIM_empty ? Placeholder !== null && Placeholder !== void 0 ? Placeholder : ValueToShow.Placeholder : ValueToShow.Placeholder, disabled || ValueToShow.disabled]
            : [ValueToShow, Placeholder, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('NumberInput callback "onInput"', onInput, Event);
            const enteredValue = parseFloat(Event.target.value);
            shownValue.current = (isNaN(enteredValue) ? undefined : enteredValue);
            executeCallback('NumberInput callback "onValueInput"', onValueInput, shownValue.current, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('NumberInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="number" ref=${ViewRef}
        class="sim-component number-input ${Classes !== null && Classes !== void 0 ? Classes : ''} ${invalid ? 'invalid' : ''}"
        value=${actualValue} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} placeholder=${actualPlaceholder}
        disabled=${actualDisabling} list=${SuggestionId}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.number-input', `
    .sim-component.number-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.number-input:invalid, .sim-component.sim-number-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .sim-component.number-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.number-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** EMailAddressInput ****/
export function EMailAddressInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, multiple, invalid, Placeholder, readonly, minLength, maxLength, Pattern, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsEMailAddress(Value) || ValueIsSpecial(Value)), optionalBoolean('multiple'), optionalBoolean('invalid'), optionalTextline('placeholder'), optionalBoolean('readonly'), optionalOrdinal('minlength'), optionalOrdinal('maxlength'), optionalTextline('pattern'), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsEMailAddress)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualPlaceholder, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, ValueToShow === SIM_empty ? Placeholder !== null && Placeholder !== void 0 ? Placeholder : ValueToShow.Placeholder : ValueToShow.Placeholder, disabled || ValueToShow.disabled]
            : [ValueToShow, Placeholder, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('EMailAddressInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('EMailAddressInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('EMailAddressInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="email" class="sim-component emailaddress-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} minlength=${minLength} maxlength=${maxLength}
        multiple=${multiple} readOnly=${readonly} placeholder=${actualPlaceholder}
        pattern=${Pattern} disabled=${actualDisabling} list=${SuggestionId}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.emailaddress-input', `
    .sim-component.emailaddress-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.emailaddress-input:invalid, .sim-component.sim-emailaddress-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .sim-component.emailaddress-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.emailaddress-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** PhoneNumberInput ****/
export function PhoneNumberInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, invalid, Placeholder, readonly, minLength, maxLength, Pattern, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsPhoneNumber(Value) || ValueIsSpecial(Value)), optionalBoolean('invalid'), optionalTextline('placeholder'), optionalBoolean('readonly'), optionalOrdinal('minlength'), optionalOrdinal('maxlength'), optionalTextline('pattern'), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsPhoneNumber)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualPlaceholder, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, ValueToShow === SIM_empty ? Placeholder !== null && Placeholder !== void 0 ? Placeholder : ValueToShow.Placeholder : ValueToShow.Placeholder, disabled || ValueToShow.disabled]
            : [ValueToShow, Placeholder, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('PhoneNumberInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('PhoneNumberInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('PhoneNumberInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="tel" class="sim-component phonenumber-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${actualPlaceholder} pattern=${Pattern}
        disabled=${actualDisabling} list=${SuggestionId}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.phonenumber-input', `
    .sim-component.phonenumber-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.phonenumber-input:invalid, .sim-component.sim-phonenumber-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .sim-component.phonenumber-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.phonenumber-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** URLInput ****/
export function URLInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, invalid, Placeholder, readonly, minLength, maxLength, Pattern, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsURL(Value) || ValueIsSpecial(Value)), optionalBoolean('invalid'), optionalTextline('placeholder'), optionalBoolean('readonly'), optionalOrdinal('minlength'), optionalOrdinal('maxlength'), optionalTextline('pattern'), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsURL)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualPlaceholder, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, ValueToShow === SIM_empty ? Placeholder !== null && Placeholder !== void 0 ? Placeholder : ValueToShow.Placeholder : ValueToShow.Placeholder, disabled || ValueToShow.disabled]
            : [ValueToShow, Placeholder, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('URLInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('URLInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('URLInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="url" class="sim-component url-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${actualPlaceholder} pattern=${Pattern}
        disabled=${actualDisabling} list=${SuggestionId}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.url-input', `
    .sim-component.url-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.url-input:invalid, .sim-component.sim-url-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .sim-component.url-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.url-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** TimeInput ****/
export const SIM_TimePattern = '\\d{2}:\\d{2}';
export const SIM_TimeRegExp = /\d{2}:\d{2}/;
export function ValueIsTime(Value) {
    return ValueIsStringMatching(Value, SIM_TimeRegExp);
}
export function TimeInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, readonly, withSeconds, Minimum, Maximum, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsTime(Value) || ValueIsSpecial(Value)), optionalBoolean('readonly'), optionalBoolean('withseconds'), optionalValue('min', ValueIsTime), optionalValue('max', ValueIsTime), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsTime)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, disabled || ValueToShow.disabled]
            : [ValueToShow, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('TimeInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('TimeInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('TimeInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="time" class="sim-component time-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} min=${Minimum} max=${Maximum} step=${withSeconds ? 1 : 60}
        readOnly=${readonly} pattern=${SIM_TimePattern}
        disabled=${actualDisabling}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.time-input', `
    .sim-component.time-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.time-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.time-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** DateTimeInput ****/
export const SIM_DateTimePattern = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}';
export const SIM_DateTimeRegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
export function ValueIsDateTime(Value) {
    return ValueIsStringMatching(Value, SIM_DateTimeRegExp);
}
export function DateTimeInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, readonly, withSeconds, Minimum, Maximum, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsDateTime(Value) || ValueIsSpecial(Value)), optionalBoolean('readonly'), optionalBoolean('withseconds'), optionalValue('min', ValueIsDateTime), optionalValue('max', ValueIsDateTime), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsDateTime)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, disabled || ValueToShow.disabled]
            : [ValueToShow, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('DateTimeInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('DateTimeInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('DateTimeInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="datetime-local" class="sim-component datetime-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} min=${Minimum} max=${Maximum} step=${withSeconds ? 1 : 60}
        readOnly=${readonly} pattern=${SIM_TimePattern}
        disabled=${actualDisabling}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.datetime-input', `
    .sim-component.datetime-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.datetime-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.datetime-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** DateInput ****/
export const SIM_DatePattern = '\\d{4}-\\d{2}-\\d{2}';
export const SIM_DateRegExp = /\d{4}-\d{2}-\d{2}/;
export function ValueIsDate(Value) {
    return ValueIsStringMatching(Value, SIM_DateRegExp);
}
export function DateInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, readonly, Minimum, Maximum, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsDate(Value) || ValueIsSpecial(Value)), optionalBoolean('readonly'), optionalValue('min', ValueIsDate), optionalValue('max', ValueIsDate), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsDate)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, disabled || ValueToShow.disabled]
            : [ValueToShow, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('DateInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('DateInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('DateInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="date" class="sim-component date-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${SIM_TimePattern}
        disabled=${actualDisabling}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.date-input', `
    .sim-component.date-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.date-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.date-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** WeekInput ****/
export const SIM_WeekPattern = '\\d{4}-W\\d{2}';
export const SIM_WeekRegExp = /\d{4}-W\d{2}/;
export function ValueIsWeek(Value) {
    return ValueIsStringMatching(Value, SIM_WeekRegExp);
}
export function WeekInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, readonly, Minimum, Maximum, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsWeek(Value) || ValueIsSpecial(Value)), optionalBoolean('readonly'), optionalValue('min', ValueIsWeek), optionalValue('max', ValueIsWeek), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsWeek)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, disabled || ValueToShow.disabled]
            : [ValueToShow, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('WeekInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('WeekInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('WeekInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="week" class="sim-component week-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${SIM_TimePattern}
        disabled=${actualDisabling}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.week-input', `
    .sim-component.week-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.week-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.week-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** MonthInput ****/
export const SIM_MonthPattern = '\\d{4}-\\d{2}';
export const SIM_MonthRegExp = /\d{4}-\d{2}/;
export function ValueIsMonth(Value) {
    return ValueIsStringMatching(Value, SIM_MonthRegExp);
}
export function MonthInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, readonly, Minimum, Maximum, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsMonth(Value) || ValueIsSpecial(Value)), optionalBoolean('readonly'), optionalValue('min', ValueIsMonth), optionalValue('max', ValueIsMonth), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsMonth)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, disabled || ValueToShow.disabled]
            : [ValueToShow, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('MonthInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('MonthInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('MonthInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="month" class="sim-component month-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${SIM_TimePattern}
        disabled=${actualDisabling}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.month-input', `
    .sim-component.month-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.month-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.month-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** SearchInput ****/
export function SearchInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, invalid, Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsTextline(Value) || ValueIsSpecial(Value)), optionalBoolean('invalid'), optionalTextline('placeholder'), optionalBoolean('readonly'), optionalOrdinal('minlength'), optionalOrdinal('maxlength'), optionalTextline('pattern'), optionalBoolean('spellcheck'), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsTextline)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualPlaceholder, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, ValueToShow === SIM_empty ? Placeholder !== null && Placeholder !== void 0 ? Placeholder : ValueToShow.Placeholder : ValueToShow.Placeholder, disabled || ValueToShow.disabled]
            : [ValueToShow, Placeholder, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('SearchInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('SearchInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('SearchInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const internalId = useId();
        const rerender = useRerenderer();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="search" class="sim-component search-input ${Classes !== null && Classes !== void 0 ? Classes : ''}" ref=${ViewRef}
        value=${actualValue} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${actualPlaceholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${actualDisabling} list=${SuggestionId}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.search-input', `
    .sim-component.search-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.search-input:invalid, .sim-component.sim-search-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .sim-component.search-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.search-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** FileInput ****/
export function FileInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, Placeholder, multiple, FileTypes, disabled, onValueInput, onInput, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsTextline(Value) || ValueIsSpecial(Value)), optionalTextline('placeholder'), optionalBoolean('multiple'), optionalTextline('accept'), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        let ValueToShow = (Value == null ? SIM_empty : Value);
        const [actualValue, actualPlaceholder, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, ValueToShow === SIM_empty ? Placeholder !== null && Placeholder !== void 0 ? Placeholder : ValueToShow.Placeholder : ValueToShow.Placeholder, disabled || ValueToShow.disabled]
            : [ValueToShow, Placeholder, disabled]);
        /**** handle inputs ****/
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('FileInput callback "onInput"', onInput, Event);
            let ValueList = Array.from(Event.target.files);
            executeCallback('FileInput callback "onValueInput"', onValueInput, ValueList, Event);
            Event.target.value = '';
        }, [actualDisabling, onInput, onValueInput]);
        /**** actual rendering ****/
        return html `<label class="sim-component file-input ${Classes !== null && Classes !== void 0 ? Classes : ''}">
        ${actualValue == null
            ? html `<span>${actualPlaceholder !== null && actualPlaceholder !== void 0 ? actualPlaceholder : ''}</span>`
            : html `<span>${actualValue}</span>`}
        <input type="file" style="display:none"
          multiple=${multiple} accept=${FileTypes}
          disabled=${actualDisabling} onInput=${_onInput} ...${RestProps}
        />
      </label>`;
    });
}
installStylesheetFor('sim-component.file-input', `
    .sim-component.file-input {
      height:30px;
        min-width:60px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }
    .sim-component.file-input > * {
      width:100%;
    }

    .sim-component.file-input > input:disabled {
      cursor:not-allowed;
    }
  `);
/**** PseudoFileInput ****/
export function PseudoFileInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, IconURL, Color, multiple, FileTypes, disabled, onValueInput, onInput, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), mandatoryURL('icon'), optionalColor('color'), optionalBoolean('multiple'), optionalTextline('accept'), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** handle inputs ****/
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (disabled == true) {
                return;
            }
            executeCallback('PseudoFileInput callback "onInput"', onInput, Event);
            let ValueList = Array.from(Event.target.files);
            executeCallback('PseudoFileInput callback "onValueInput"', onValueInput, ValueList, Event);
            Event.target.value = '';
        }, [disabled, onInput, onValueInput]);
        /**** actual rendering ****/
        return html `<label
        class="sim-component pseudo-file-input ${disabled ? 'disabled' : ''} ${Classes !== null && Classes !== void 0 ? Classes : ''}"
      >
        <div style="${Style !== null && Style !== void 0 ? Style : ''};
          -webkit-mask-image:url(${IconURL}); mask-image:url(${IconURL});
          background-color:${Color !== null && Color !== void 0 ? Color : 'black'};
        "/>
        <input type="file" style="display:none"
          multiple=${multiple} accept=${FileTypes}
          disabled=${disabled} onInput=${_onInput} ...${RestProps}
        />
      </label>`;
    });
}
installStylesheetFor('sim-component.pseudo-file-input', `
    .sim-component.pseudo-file-input {
      display:flex ! important; justify-content:center; align-items:center;
      overflow:hidden;
    }
    .sim-component.pseudo-file-input > div {
      display:block; position:relative;
      width:24px; height:24px;
      -webkit-mask-size:contain;           mask-size:contain;
      -webkit-mask-position:center center; mask-position:center center;
    }

    .sim-component.pseudo-file-input > div.disabled {
      cursor:not-allowed;
    }
  `);
/**** ColorInput ****/
export function ColorInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, readonly, Suggestions, disabled, onValueInput, onInput, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalValue('value', (Value) => ValueIsColor(Value) || ValueIsSpecial(Value)), optionalBoolean('readonly'), optionalValue('suggestions', (Value) => ValueIsListSatisfying(Value, ValueIsColor)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        const [actualValue, actualDisabling] = (ValueIsSpecial(Value)
            ? [undefined, disabled || Value.disabled]
            : [Value, disabled]);
        /**** handle inputs ****/
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('ColorInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            executeCallback('ColorInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        /**** actual rendering ****/
        let minWidth = 40;
        const internalId = useId();
        let SuggestionList = '', SuggestionId;
        if ((Suggestions != null) && (Suggestions.length > 0)) {
            SuggestionId = internalId + '-Suggestions';
            minWidth += 20;
            SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
        }
        return html `<input type="color" class="sim-component color-input ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        style="min-width:${minWidth}px; ${Style}"
        value=${actualValue} readOnly=${Value} list=${SuggestionId}
        disabled=${actualDisabling} onInput=${_onInput} ...${RestProps}
      />${SuggestionList}`;
    });
}
installStylesheetFor('sim-component.color-input', `
    .sim-component.color-input {
      height:30px;
        min-width:40px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
    }

    .sim-component.color-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.color-input:disabled {
      cursor:not-allowed;
    }
  `);
/**** DropDown ****/
export function DropDown(PropSet) {
    return safelyRendered(() => {
        let [Classes, Value, Options, disabled, onValueInput, onInput, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalValue('value', (Value) => ValueIsTextline(Value) || ValueIsSpecial(Value)), mandatoryValue('options', (Value) => ValueIsListSatisfying(Value, ValueIsTextline)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        Options = Options !== null && Options !== void 0 ? Options : [];
        const [actualValue, actualDisabling] = (ValueIsSpecial(Value)
            ? [undefined, disabled || Value.disabled]
            : [Value, disabled]);
        /**** handle inputs ****/
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('DropDown callback "onInput"', onInput, Event);
            let Value = Event.target.value;
            executeCallback('DropDown callback "onValueInput"', onValueInput, Value, Event);
        }, [actualDisabling, onInput, onValueInput]);
        /**** actual rendering ****/
        return html `<select class="sim-component dropdown ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        disabled=${actualDisabling} onInput=${_onInput} ...${RestProps}
      >${Options.map((Option) => {
            let OptionValue = Option.replace(/:.*$/, '').trim();
            let OptionLabel = Option.replace(/^[^:]*:/, '').trim(); // allows for empty values
            const disabled = (OptionLabel[0] === '-');
            if (/^[-]+$/.test(OptionLabel)) {
                return html `<hr/>`;
            }
            else {
                if (OptionValue === Option) {
                    OptionValue = OptionValue.replace(/^-/, '');
                }
                if (disabled) {
                    OptionLabel = OptionLabel.replace(/^-/, '');
                }
                return html `<option value=${OptionValue}
              selected=${OptionValue === actualValue} disabled=${disabled}
            >${OptionLabel}</option>`;
            }
        })}</select>`;
    });
}
installStylesheetFor('sim-component.dropdown', `
    .sim-component.dropdown {
      height:30px;
        min-width:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .sim-component.dropdown:disabled {
      cursor:not-allowed;
    }
  `);
/**** PseudoDropDown ****/
export function PseudoDropDown(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, IconURL, Color, Options, disabled, onValueInput, onInput, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalValue('value', (Value) => ValueIsTextline(Value) || ValueIsSpecial(Value)), mandatoryURL('icon'), optionalColor('color'), mandatoryValue('options', (Value) => ValueIsListSatisfying(Value, ValueIsTextline)), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        const [actualValue, actualDisabling] = (ValueIsSpecial(Value)
            ? [undefined, disabled || Value.disabled]
            : [Value, disabled]);
        /**** handle inputs ****/
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('PseudoDropDown callback "onInput"', onInput, Event);
            let Value = Event.target.value;
            executeCallback('PseudoDropDown callback "onValueInput"', onValueInput, Value, Event);
        }, [actualDisabling, onInput, onValueInput]);
        /**** actual rendering ****/
        return html `<label
        class="sim-component pseudo-dropdown ${disabled ? 'disabled' : ''} ${Classes !== null && Classes !== void 0 ? Classes : ''}"
      >
        <div style="${Style !== null && Style !== void 0 ? Style : ''};
          -webkit-mask-image:url(${IconURL}); mask-image:url(${IconURL});
          background-color:${Color !== null && Color !== void 0 ? Color : 'black'};
        "/>
        <select
          disabled=${actualDisabling} onInput=${_onInput} ...${RestProps}
        >${Options.map((Option) => {
            let OptionValue = Option.replace(/:.*$/, '').trim();
            let OptionLabel = Option.replace(/^[^:]*:/, '').trim(); // allows for empty values
            const disabled = (OptionLabel[0] === '-');
            if (/^[-]+$/.test(OptionLabel)) {
                return html `<hr/>`;
            }
            else {
                if (OptionValue === Option) {
                    OptionValue = OptionValue.replace(/^-/, '');
                }
                if (disabled) {
                    OptionLabel = OptionLabel.replace(/^-/, '');
                }
                return html `<option value=${OptionValue}
                selected=${OptionValue === actualValue} disabled=${disabled}
              >${OptionLabel}</option>`;
            }
        })}</select>
      </label>`;
    });
}
installStylesheetFor('sim-component.pseudo-dropdown', `
    .sim-component.pseudo-dropdown {
      display:flex ! important; justify-content:center; align-items:center;
      overflow:hidden;
    }
    .sim-component.pseudo-dropdown > div {
      display:block; position:relative;
      width:24px; height:24px;
      -webkit-mask-size:contain;           mask-size:contain;
      -webkit-mask-position:center center; mask-position:center center;
    }
    .sim-component.pseudo-dropdown > select {
      display:block; position:absolute;
      left:0px; top:0px; right:0px; bottom:0px;
      opacity:0.01;
    }

    .sim-component.pseudo-dropdown > select:disabled {
      cursor:not-allowed;
    }
  `);
/**** TextInput ****/
export function TextInput(PropSet) {
    return safelyRendered(() => {
        let [Classes, Style, Value, invalid, Placeholder, readonly, minLength, maxLength, LineWrapping, Resizability, SpellChecking, disabled, onValueInput, onInput, onBlur, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), optionalText('style'), optionalValue('value', (Value) => ValueIsText(Value) || ValueIsSpecial(Value)), optionalBoolean('invalid'), optionalTextline('placeholder'), optionalBoolean('readonly'), optionalOrdinal('minlength'), optionalOrdinal('maxlength'), optionalBoolean('wrap'), optionalValue('resizability', (Value) => ValueIsOneOf(Value, ['none', 'horizontal', 'vertical', 'both'])), optionalBoolean('spellcheck'), optionalBoolean('disabled'), optionalFunction('onvalueinput'), optionalFunction('oninput'), optionalFunction('onblur'));
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** ignore external changes while this control is in use ****/
        const ViewRef = useRef();
        const shownValue = useRef();
        let ValueToShow = (Value == null ? SIM_empty : Value);
        if ((ViewRef.current != null) &&
            (document.activeElement === ViewRef.current)) {
            ValueToShow = shownValue.current;
        }
        else {
            shownValue.current = ValueToShow;
        }
        const [actualValue, actualPlaceholder, actualDisabling] = (ValueIsSpecial(ValueToShow)
            ? [undefined, ValueToShow === SIM_empty ? Placeholder !== null && Placeholder !== void 0 ? Placeholder : ValueToShow.Placeholder : ValueToShow.Placeholder, disabled || ValueToShow.disabled]
            : [ValueToShow, Placeholder, disabled]);
        const _onInput = useCallback((Event) => {
            consumeEvent(Event);
            if (actualDisabling == true) {
                return;
            }
            executeCallback('TextInput callback "onInput"', onInput, Event);
            const enteredValue = Event.target.value;
            shownValue.current = (enteredValue === '' ? SIM_empty : enteredValue);
            executeCallback('TextInput callback "onValueInput"', onValueInput, enteredValue, Event);
        }, [actualDisabling, onInput, onValueInput]);
        const _onBlur = useCallback((Event) => {
            rerender(); // because "ValueToShow" may now be different
            executeCallback('TextInput callback "onBlur"', onBlur, Event);
        }, [onBlur]);
        /**** actual rendering ****/
        const rerender = useRerenderer();
        const uniqueId = useId();
        return html `<textarea class="sim-component text-input ${Classes !== null && Classes !== void 0 ? Classes : ''}"
        key=${uniqueId} ref=${ViewRef}
        style="${LineWrapping == true
            ? 'overflow-wrap:break-word; hyphens:auto;'
            : 'white-space:pre;'} resize:${Resizability !== null && Resizability !== void 0 ? Resizability : 'none'}; ${Style}"
        value=${actualValue} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${actualPlaceholder}
        spellcheck=${SpellChecking} disabled=${actualDisabling}
        onInput=${_onInput} onBlur=${_onBlur} ...${RestProps}
      />`;
    });
}
installStylesheetFor('sim-component.text-input', `
    .sim-component.text-input {
      resize:none;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:4px 2px 0px 2px;
    }

    .sim-component.text-input:invalid, .sim-component.sim-text-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .sim-component.text-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .sim-component.text-input:disabled {
      cursor:not-allowed;
    }
  `);
//------------------------------------------------------------------------------
//--                                 TabStrip                                 --
//------------------------------------------------------------------------------
export function TabStrip(PropSet) {
    return safelyRendered(() => {
        let [Classes, activeIndex, GapIndex, disabled, onActivationChange, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), optionalOrdinal('activeindex'), optionalOrdinal('gapindex'), optionalBoolean('disabled'), optionalFunction('onactivationchange'));
        /**** allow setting "activeIndex" externally and changing it internally ****/
        const externalActiveIndex = useRef(activeIndex !== null && activeIndex !== void 0 ? activeIndex : 0);
        const internalActiveIndex = useRef(activeIndex !== null && activeIndex !== void 0 ? activeIndex : 0);
        if ((activeIndex != null) && (activeIndex !== externalActiveIndex.current)) {
            internalActiveIndex.current = activeIndex;
        }
        else {
            activeIndex = internalActiveIndex.current;
        }
        /**** handle clicks ****/
        const onClick = useCallback((Index, Event) => {
            if (disabled) {
                return consumingEvent(Event);
            }
            internalActiveIndex.current = activeIndex = Index;
            rerender();
            executeCallback('TabStrip callback "onActivationChange"', onActivationChange, Index);
        }, [disabled, onActivationChange]);
        /**** actual rendering ****/
        const rerender = useRerenderer();
        const TabList = toChildArray(ContentList).filter((Tab) => (Tab.type != null) || (Tab.trim() !== ''));
        return html `<div class="sim-component tabstrip ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
        ${TabList.map((Tab, i) => {
            const Gap = (i === GapIndex
                ? html `<div class="gap"/>`
                : '');
            if (i === activeIndex) {
                return html `${Gap}<div class="active tab">${Tab}</>`;
            }
            else {
                return html `${Gap}<div class="${disabled ? 'disabled' : ''} tab"
            onClick=${(Event) => onClick(i, Event)}>${Tab}</>`;
            }
        })}
      </>`;
    });
}
installStylesheetFor('sim-component.tabstrip', `
    .sim-component.tabstrip {
      display:flex ! important; flex-flow:row nowrap; align-items:center;
      font-size:14px; font-weight:bold;
    }

    .sim-component.tabstrip > .gap {
      flex:1 0 auto;
    }

    .sim-component.tabstrip > .tab {
      display:inline-block; position:relative;
      margin:4px 0px 4px 0px;
      border:none; border-bottom:solid 2px transparent;
      cursor:pointer; pointer-events:auto;
    }
    .sim-component.tabstrip > .tab:not(:first-child) {
      margin-left:20px;
    }
    .sim-component.tabstrip > .active.tab {
      border-bottom:solid 2px gray;
    }
    .sim-component.tabstrip > .disabled.tab {
      pointer-events:none;
    }
  `);
//------------------------------------------------------------------------------
//--                              AccordionFold                               --
//------------------------------------------------------------------------------
export function AccordionFold(PropSet) {
    return safelyRendered(() => {
        let [Classes, Header, expanded, disabled, onExpansionChange, RestProps, ContentList] = parsedPropSet(PropSet, optionalTextline('class'), mandatoryTextline('header'), optionalBoolean('expanded'), optionalBoolean('disabled'), optionalFunction('onexpansionchange'));
        //    expanded = expanded ?? false
        disabled = disabled !== null && disabled !== void 0 ? disabled : false;
        /**** allow setting "expanded" externally and changing it internally ****/
        const externalExpansion = useRef(expanded !== null && expanded !== void 0 ? expanded : false);
        const internalExpansion = useRef(expanded !== null && expanded !== void 0 ? expanded : false);
        if ((expanded != null) && (expanded !== externalExpansion.current)) {
            internalExpansion.current = expanded;
        }
        else {
            expanded = internalExpansion.current;
        }
        /**** handle clicks ****/
        const _onClick = useCallback((Event) => {
            consumeEvent(Event);
            if (disabled != true) {
                internalExpansion.current = expanded = !expanded;
                rerender();
                executeCallback('Fold callback "onExpansionChange"', onExpansionChange, expanded);
            }
        }, [disabled, onExpansionChange]);
        /**** actual rendering ****/
        const rerender = useRerenderer();
        return html `<div class="sim-component accordion-fold ${Classes !== null && Classes !== void 0 ? Classes : ''}">
        <div class="header">
          <div class="expander ${expanded ? 'expanded' : 'collapsed'}" onClick=${_onClick}/>
          <div class="title">${Header}</>
        </>${expanded ? html `<div class="content">${ContentList}</>` : ''}
      </>`;
    });
}
installStylesheetFor('sim-component.accordion-fold', `
    .sim-component.accordion-fold {
      display:inline-block; position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:100%; height:auto;
    }

    .sim-component.accordion-fold > .header {
      display:flex; flex-flow:row nowrap; align-items:center;
      position:relative; left:0px; top:0px; width:100%; height:30px;
      border:none; background:#EEEEEE;
      border-top:   solid 1px #FFFFFF;
      border-bottom:solid 1px #AAAAAA;
      pointer-events:none;
    }
    .sim-component.accordion-fold > .header > .expander {
      display:inline-block;
      position:relative; width:24px; height:24px;
      margin:3px 4px 3px 2px;
      border:none;
      cursor:pointer;
      user-select:none; pointer-events:auto;
    }
    .sim-component.accordion-fold > .header > .expander.expanded {
      background:url(${IconFolder}/caret-down.png);
      background-repeat:no-repeat;
      background-size:contain; background-position:center;
    }
    .sim-component.accordion-fold > .header > .expander.collapsed {
      background:url(${IconFolder}/caret-right.png);
      background-repeat:no-repeat;
      background-size:contain; background-position:center;
    }
    .sim-component.accordion-fold > .header > .title {
      display:inline-block;
      position:relative; width:auto; height:24px;
      margin:3px 4px 3px 4px;
      font-size:14px; font-weight:bold; color:black; line-height:24px;
    }

    .sim-component.accordion-fold > .content {
      display:inline-block;
      position:relative; width:100%; height:auto;
    }
  `);
let KeyCounter = 0;
const KeyMap = new WeakMap();
/**** Default_KeyOfFlatListItem ****/
function Default_KeyOfFlatListItem(Item, List, Index) {
    if (KeyMap.has(Item)) {
        return '' + KeyMap.get(Item);
    }
    else {
        KeyCounter++;
        KeyMap.set(Item, KeyCounter);
        return '' + KeyCounter;
    }
}
/**** Default_FlatListItemRenderer ****/
function Default_FlatListItemRenderer(Item, List, Index, isSelected = false, InsertionDirection = '') {
    if (typeof Item.toHTML === 'function') {
        return html `<div class="default" dangerouslySetInnerHTML=${{ __html: Item.toHTML() }}/>`;
    }
    else {
        return html `<div class="default">${'' + Item}</>`;
    }
}
export function FlatListView(PropSet) {
    return safelyRendered(() => {
        const [animatedElement] = useAutoAnimate();
        let [Classes, List, Placeholder, KeyOfListItem, ListItemRenderer, onListItemClick, selectedItems, SelectionLimit, onSelectionChange, onListItemMove, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), mandatoryValue('list', (Value) => ValueIsListSatisfying(Value, ValueIsPlainObject)), optionalTextline('placeholder'), optionalFunction('keyoflistitem'), optionalFunction('listitemrenderer'), optionalFunction('onlistitemclick'), optionalValue('selecteditems', (Value) => ValueIsListSatisfying(Value, ValueIsPlainObject)), optionalOrdinal('selectionlimit'), optionalFunction('onselectionchange'), optionalFunction('onlistitemmove'));
        const ListIsSelectable = (onSelectionChange != null);
        const ListIsSortable = ListIsSelectable && (onListItemMove != null);
        /**** validate "List" (reject double entries) ****/
        const ListItemSet = new Set();
        List.forEach((Item) => {
            if (ListItemSet.has(Item))
                throwError('InvalidArguments: the given "List" contains double entries');
            ListItemSet.add(Item);
        });
        /**** provide some defaults ****/
        KeyOfListItem = KeyOfListItem !== null && KeyOfListItem !== void 0 ? KeyOfListItem : Default_KeyOfFlatListItem;
        ListItemRenderer = ListItemRenderer !== null && ListItemRenderer !== void 0 ? ListItemRenderer : Default_FlatListItemRenderer;
        /**** sanitize "selectedItems" (ignore double entries) ****/
        const SelectionSet = new Set();
        if (ListIsSelectable) {
            if (selectedItems == null) {
                selectedItems = [];
            }
            else {
                selectedItems = selectedItems.filter((Item) => {
                    if (SelectionSet.has(Item)) {
                        return false;
                    }
                    else {
                        SelectionSet.add(Item);
                        return true;
                    }
                });
            }
            if (selectedItems.length > SelectionLimit) {
                selectedItems.slice(SelectionLimit).forEach((Item) => SelectionSet.delete(Item));
                selectedItems.length = SelectionLimit;
            }
        }
        /**** explicit rerendering ****/
        const [State, setState] = useState({
            dragging: false, DropTargetIndex: undefined, DropMode: undefined
        });
        function changeState(StateChanges) {
            setState((oldState) => (Object.assign(Object.assign({}, oldState), StateChanges)));
        }
        /**** onClick ****/
        const onClick = (Event) => {
            Event.stopImmediatePropagation();
            const Item = Event.target.Item;
            const Index = Event.target.Index;
            executeCallback('FlatListView callback "onListItemClick"', onListItemClick, Item, List, Index, Event);
            if (ListIsSelectable) {
                const additively = ((Event.pointerType !== 'mouse') || Event.ctrlKey || Event.metaKey);
                changeSelection(Item, List, Index, additively);
            }
        };
        /**** changeSelection ****/
        const changeSelection = (Item, List, Index, additively) => {
            if (SelectionLimit === 0) {
                return;
            }
            let newSelection = selectedItems;
            if (additively) {
                if (SelectionSet.has(Item)) { // deselect item
                    newSelection = selectedItems.filter((selectedItem) => selectedItem !== Item);
                }
                else { // select item (if possible)
                    if (selectedItems.length === SelectionLimit) {
                        return;
                    }
                    else {
                        newSelection = [...selectedItems, Item];
                    }
                }
            }
            else { // select item only
                newSelection = [Item];
            }
            executeCallback('FlatListView callback "onSelectionChange"', onSelectionChange, newSelection, List); // caller should update selection and rerender
        };
        /**** onDragStart ****/
        const onDragStart = useCallback((Event) => {
            const Item = Event.target.Item;
            const Index = Event.target.Index;
            if (!SelectionSet.has(Item)) { // auto-select dragged item
                const additively = (
                /* (Event.pointerType !== 'mouse') ||*/ Event.ctrlKey || Event.metaKey);
                changeSelection(Item, List, Index, additively);
            }
            // @ts-ignore TS18047 "Event.dataTransfer" should not be null
            Event.dataTransfer.effectAllowed = 'move';
            changeState({ dragging: true });
        }, [List, SelectionSet, changeSelection]);
        /**** onDragOver ****/
        const onDragOver = (Event) => {
            const Item = Event.target.Item;
            const Index = Event.target.Index;
            const hoveredElement = Event.target;
            const Limit = hoveredElement.getBoundingClientRect().top + hoveredElement.offsetHeight / 2;
            const DropMode = Event.clientY < Limit ? 'before' : 'after';
            if (SelectionSet.has(Item)) { // don't drop onto a selected item
                if (State.DropTargetItem != null) {
                    changeState({ DropTargetItem: undefined, DropMode: undefined });
                }
            }
            else {
                Event.preventDefault();
                if ((State.DropTargetItem !== Item) || (State.DropMode !== DropMode)) {
                    changeState({ DropTargetItem: Item, DropMode });
                }
            }
        };
        /**** onDragEnd ****/
        const onDragEnd = (Event) => {
            changeState({ dragging: false, DropTargetItem: undefined });
        };
        /**** onDrop ****/
        const onDrop = (Event) => {
            let { DropTargetItem, DropMode } = State;
            if (DropTargetItem != null) {
                const SelectionCount = selectedItems.length;
                /**** move selected items ****/
                const ItemsToMove = List.filter(// in original order!
                (Item) => SelectionSet.has(Item));
                const ItemsToRemain = List.filter((Item) => !SelectionSet.has(Item));
                const TargetIndex = ItemsToRemain.indexOf(DropTargetItem) + (DropMode === 'before' ? 0 : 1);
                ItemsToRemain.splice(TargetIndex, 0, ...ItemsToMove);
                List = ItemsToRemain;
                executeCallback('FlatListView callback "onListItemMove"', onListItemMove, List, ItemsToMove, DropTargetItem, DropMode); // caller should update list and rerender
            }
        };
        /**** actual rendering ****/
        if (List.length === 0) {
            return html `<div class="sim-component flatlistview placeholder ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
          <div dangerouslySetInnerHTML=${{ __html: Placeholder !== null && Placeholder !== void 0 ? Placeholder : '(empty)' }}/>
        </>`;
        }
        else {
            const { dragging, DropTargetItem, DropMode } = State;
            return html `<div class="sim-component flatlistview ${dragging ? 'dragging' : ''} ${Classes !== null && Classes !== void 0 ? Classes : ''}"
              onClick=${onClick}
          onDragStart=${ListIsSortable && onDragStart}
           onDragOver=${ListIsSortable && onDragOver}
            onDragEnd=${ListIsSortable && onDragEnd}
               onDrop=${ListIsSortable && onDrop}
          ref=${animatedElement} ...${RestProps}
        >
          ${List.map((Item, Index) => {
                const DOMRef = useRef();
                useEffect(() => {
                    DOMRef.current.Item = Item;
                    DOMRef.current.Index = Index;
                }, []);
                const Key = executedCallback('FlatListView callback "KeyOfListItem"', KeyOfListItem, Item, List, Index);
                const ItemIsSelected = SelectionSet.has(Item);
                const InsertionMode = (Item === DropTargetItem ? DropMode : '');
                return html `<div class=${'itemview' +
                    (ItemIsSelected ? ' selected' : '') +
                    (Item === DropTargetItem ? ` DropTarget ${DropMode}` : '')} key=${Key} ref=${DOMRef} draggable=${ListIsSortable}>
              ${executedCallback('FlatListView callback "ListItemRenderer"', ListItemRenderer, Item, List, Index, ItemIsSelected, InsertionMode)}
            </>`;
            })}
        </>`;
        }
    });
}
installStylesheetFor('sim-component.flatlistview', `
    .sim-component.flatlistview {
      display:flex ! important; flex-flow:column nowrap; align-items:stretch;
      overflow-x:auto; overflow-y:scroll;
      border:solid 1px #888888; border-radius:2px;
      background:#DDDDDD; padding:0px;
    }

    .sim-component.flatlistview > .itemview {
      display:block; position:relative; overflow:hidden; flex:0 0 auto;
      left:0px; top:0px; width:100%; height:auto; line-height:22px;
      background:white; color:black;
      border:none; border-bottom:solid 1px lightgray;
      padding:2px 4px 2px 4px;
      white-space:nowrap; text-overflow:ellipsis;
      user-select:none; pointer-events:auto;
    }
    .sim-component.flatlistview > .itemview:last-child {
      border:none; border-bottom:solid 1px transparent;
    }

    .sim-component.flatlistview > .itemview > .default {
      height:30px; line-height:29px; overflow:hidden; text-overflow:ellipsis;
      padding-left:4px; padding-right:4px;
    }

    .sim-component.flatlistview > .itemview * {
      pointer-events:none;
    }

    .sim-component.flatlistview > .itemview.selected {
      background:dodgerblue; color:white;
    }
    .sim-component.flatlistview.dragging > .itemview.selected {
      opacity:0.3;
    }

    .sim-component.flatlistview > .itemview.before {
      border-top:solid 20px #DDDDDD;
    }
    .sim-component.flatlistview > .itemview.after {
      border-bottom:solid 21px #DDDDDD;
    }

    .sim-component.flatlistview.placeholder {
      display:flex; flex-flow:column nowrap; align-items:center; justify-content:center;
      flex:1 0 auto; overflow:hidden;
      background-color:#EEEEEE;
    }
    .sim-component.flatlistview.placeholder > * {
      display:inline-block; position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
  `);
/**** Default_KeyOfNestedListItem ****/
function Default_KeyOfNestedListItem(Item) {
    if (KeyMap.has(Item)) {
        return '' + KeyMap.get(Item);
    }
    else {
        KeyCounter++;
        KeyMap.set(Item, KeyCounter);
        return '' + KeyCounter;
    }
}
/**** Default_NestedListItemRenderer ****/
function Default_NestedListItemRenderer(Item, isSelected = false, isPlain = false, isExpanded = false, InsertionDirection = '') {
    if (typeof Item.toHTML === 'function') {
        return html `<div class="default" dangerouslySetInnerHTML=${{ __html: Item.toHTML() }}/>`;
    }
    else {
        return html `<div class="default">${'' + Item}</>`;
    }
}
export function NestedListView(PropSet) {
    return safelyRendered(() => {
        const [animatedElement] = useAutoAnimate();
        let [Classes, List, Placeholder, KeyOfListItem, ListItemRenderer, ContentOfListItem, ContainerOfListItem, onListItemClick, ListItemMayBeSelected, selectedItems, SelectionLimit, onSelectionChange, ListItemMayBeExpanded, expandedItems, onExpansionChange, ListItemMayAccept, onListItemMove, RestProps] = parsedPropSet(PropSet, optionalTextline('class'), mandatoryValue('list', (Value) => ValueIsListSatisfying(Value, ValueIsPlainObject)), optionalTextline('placeholder'), optionalFunction('keyoflistitem'), optionalFunction('listitemrenderer'), optionalFunction('contentoflistitem'), optionalFunction('containeroflistitem'), optionalFunction('onlistitemclick'), optionalFunction('itemmaybeselected'), optionalValue('selecteditems', (Value) => ValueIsListSatisfying(Value, ValueIsPlainObject)), optionalOrdinal('selectionlimit'), optionalFunction('onselectionchange'), optionalFunction('itemmaybeexpanded'), optionalValue('expandeditems', (Value) => ValueIsListSatisfying(Value, ValueIsPlainObject)), optionalFunction('onexpansionchange'), optionalFunction('listitemmayaccept'), optionalFunction('onlistitemmove'));
        const ListIsSelectable = (onSelectionChange != null);
        const ListIsSortable = ListIsSelectable && (onListItemMove != null);
        /**** validate "List" (reject double entries) ****/
        const ListItemSet = new Set();
        function scanList(List) {
            List.forEach((Item) => {
                if (ListItemSet.has(Item))
                    throwError('InvalidArguments: the given "List" contains double entries');
                ListItemSet.add(Item);
                const innerList = executedCallback('NestedListView callback "ContentOfListItem"', ContentOfListItem, Item); // *C* should be validated
                if (innerList != null) {
                    scanList(innerList);
                }
            });
        }
        scanList(List);
        /**** provide some defaults ****/
        const emptyList = useRef([]); // makes it referentially stable
        const yeasayer = useRef(() => true); // dto.
        KeyOfListItem = KeyOfListItem !== null && KeyOfListItem !== void 0 ? KeyOfListItem : Default_KeyOfNestedListItem;
        ListItemRenderer = ListItemRenderer !== null && ListItemRenderer !== void 0 ? ListItemRenderer : Default_NestedListItemRenderer;
        ListItemMayBeSelected = ListItemMayBeSelected !== null && ListItemMayBeSelected !== void 0 ? ListItemMayBeSelected : yeasayer.current;
        ListItemMayBeExpanded = ListItemMayBeExpanded !== null && ListItemMayBeExpanded !== void 0 ? ListItemMayBeExpanded : yeasayer.current;
        expandedItems = expandedItems !== null && expandedItems !== void 0 ? expandedItems : emptyList.current;
        ListItemMayAccept = ListItemMayAccept !== null && ListItemMayAccept !== void 0 ? ListItemMayAccept : yeasayer.current;
        /**** Containment Test ****/
        function ItemContainsItem(ItemA, ItemB) {
            let Container = executedCallback('NestedListView callback "ContainerOfListItem"', ContainerOfListItem, ItemB); // *C* should be validated
            switch (Container) {
                case null:
                case undefined: return false;
                case ItemA: return true;
                default: return ItemContainsItem(ItemA, Container);
            }
        }
        /**** sanitize "selectedItems" (ignore double entries) ****/
        const SelectionSet = new Set();
        if (ListIsSelectable) {
            if (selectedItems == null) {
                selectedItems = [];
            }
            else {
                selectedItems = selectedItems.filter((Item) => {
                    if (SelectionSet.has(Item)) {
                        return false;
                    }
                    else {
                        SelectionSet.add(Item);
                        return true;
                    }
                });
                for (let i = selectedItems.length - 1; i >= 0; i--) {
                    const thisItem = selectedItems[i];
                    if (selectedItems.some((otherItem, j) => {
                        return (j !== i) && ItemContainsItem(otherItem, thisItem);
                    })) {
                        selectedItems.splice(i, 1);
                        SelectionSet.delete(thisItem);
                    }
                }
            }
            if (selectedItems.length > SelectionLimit) {
                selectedItems.slice(SelectionLimit).forEach((Item) => SelectionSet.delete(Item));
                selectedItems.length = SelectionLimit;
            }
        }
        /**** anyOuterItemIsSelected ****/
        function anyOuterItemIsSelected(Item) {
            return selectedItems.some((selectedItem) => ItemContainsItem(selectedItem, Item));
        }
        /**** deselectAllInnerItemsOf ****/
        function deselectAllInnerItemsOf(Item) {
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                const otherItem = selectedItems[i];
                if (ItemContainsItem(Item, otherItem)) {
                    selectedItems.splice(i, 1);
                    SelectionSet.delete(otherItem);
                }
            }
        }
        /**** changeSelection ****/
        function changeSelection(Item, additively) {
            if (SelectionLimit === 0) {
                return;
            }
            let newSelection = selectedItems;
            if (additively) {
                if (SelectionSet.has(Item)) { // deselect item
                    newSelection = selectedItems.filter((selectedItem) => selectedItem !== Item);
                }
                else { // select item - and deselect all inner items
                    if (selectedItems.length === SelectionLimit) {
                        return;
                    }
                    newSelection = [...selectedItems.filter((selectedItem) => !ItemContainsItem(Item, selectedItem)), Item];
                }
            }
            else { // select item only
                newSelection = [Item];
            }
            executeCallback('NestedListView callback "onSelectionChange"', onSelectionChange, newSelection); // caller should update selection and rerender
        }
        /**** sanitize "expandedItems" (ignore double entries) ****/
        const ExpansionMap = useMemo(() => {
            const ExpansionMap = new Map();
            if (expandedItems == null) {
                expandedItems = [];
            }
            else {
                expandedItems = expandedItems.filter((Item) => {
                    if (ExpansionMap.has(Item)) {
                        return false;
                    }
                    else {
                        ExpansionMap.set(Item, 'explicit');
                        return true;
                    }
                });
            }
            return ExpansionMap;
        }, [expandedItems]);
        /**** toggleExpansionOf ****/
        function toggleExpansionOf(Item) {
            if (ExpansionMap.has(Item)) {
                collapseItem(Item);
            }
            else {
                expandItem(Item);
            }
        }
        /**** expandItem - and all outer ones, explicitly ****/
        function expandItem(Item) {
            ExpansionMap.set(Item, 'explicit');
            let newExpansion = [...expandedItems, Item]; // explicit expansions only
            let Container = executedCallback('NestedListView callback "ContainerOfListItem"', ContainerOfListItem, Item); // *C* should be validated
            while (Container != null) {
                if (!ExpansionMap.has(Container)) {
                    ExpansionMap.set(Container, 'explicit');
                    newExpansion.push(Container);
                }
                Container = executedCallback('NestedListView callback "ContainerOfListItem"', ContainerOfListItem, Container); // *C* should be validated
            }
            executeCallback('NestedListView callback "onExpansionChange"', onExpansionChange, newExpansion); // caller should update expansion and rerender
        }
        /**** collapseItem - both explicitly or automatically expanded items ****/
        function collapseItem(Item) {
            ExpansionMap.delete(Item);
            const newExpansion = expandedItems.filter((expandedItem) => expandedItem !== Item);
            executeCallback('NestedListView callback "onExpansionChange"', onExpansionChange, newExpansion); // caller should update expansion and rerender
        }
        /**** autoExpandItem - and all outer ones (unless already expanded) ****/
        function autoExpandItem(Item) {
            if (!ExpansionMap.has(Item)) {
                ExpansionMap.set(Item, 'automatic');
            }
            let Container = executedCallback('NestedListView callback "ContainerOfListItem"', ContainerOfListItem, Item); // *C* should be validated
            while (Container != null) {
                if (!ExpansionMap.has(Container)) {
                    ExpansionMap.set(Container, 'automatic');
                }
                Container = executedCallback('NestedListView callback "ContainerOfListItem"', ContainerOfListItem, Container); // *C* should be validated
            }
        } // deliberately, no "onExpansionChange" callback here!
        /**** autoCollapseItem - and all outer ones (unless explicitly expanded) ****/
        function autoCollapseItem(Item) {
            if (ExpansionMap.get(Item) === 'automatic') {
                ExpansionMap.delete(Item);
            }
            let Container = executedCallback('NestedListView callback "ContainerOfListItem"', ContainerOfListItem, Item); // *C* should be validated
            while (Container != null) {
                if (ExpansionMap.get(Container) === 'automatic') {
                    ExpansionMap.delete(Container);
                }
                Container = executedCallback('NestedListView callback "ContainerOfListItem"', ContainerOfListItem, Container); // *C* should be validated
            }
        } // deliberately, no "onExpansionChange" callback here!
        /**** Drag-and-Drop Handling ****/
        const ListItemWithKey = useRef(new Object(null));
        const DragAndDropState = useRef({
            dragging: false,
            DropTargetItem: undefined, DropMode: undefined,
            DropTargetTimer: undefined,
        });
        /**** onDragStart ****/
        function onDragStart(Event) {
            const ComponentKey = Event.target.getAttribute('data-key');
            const Item = ListItemWithKey.current[ComponentKey];
            if (Item == null) {
                return;
            }
            if (!SelectionSet.has(Item)) { // auto-select dragged item
                changeSelection(Item, Event.shiftKey || Event.metaKey);
            }
            // @ts-ignore TS18047 "Event.dataTransfer" should not be null
            Event.dataTransfer.effectAllowed = 'move';
            ListContext.State.dragging = true;
            ListContext.State.DropTargetItem = undefined; // don't drop on dragged item
            ListContext.State.DropTargetTimer = undefined;
            rerender();
        }
        /**** onDragEnter ****/
        function onDragEnter(Event) {
            const ComponentKey = Event.target.getAttribute('data-key');
            const Item = ListItemWithKey.current[ComponentKey];
            const { DropTargetItem } = ListContext.State; // previously entered item
            if (DropTargetItem === Item) { // this item was already entered
                Event.preventDefault(); // marks this element as valid drop target
                handleDragOver(Event, Item);
            }
            else {
                if (DropTargetItem != null) { // leave previously entered item
                    handleDragLeave(Event);
                }
                if (Item == null) {
                    return;
                }
                if (!SelectionSet.has(Item) && !anyOuterItemIsSelected(Item)) {
                    if (executedCallback('NestedListView callback "ListItemMayAccept"', ListContext.ListItemMayAccept, Item, selectedItems) != true) {
                        return;
                    }
                    Event.preventDefault(); // marks this element as valid drop target
                    handleDragEnter(Event, Item); // incl. "handleDragOver"
                }
            }
        }
        /**** onDragOver ****/
        const onDragOver = onDragEnter;
        /**** onDragLeave ****/
        function onDragLeave(Event) {
            const ComponentKey = Event.target.getAttribute('data-key');
            const Item = ListItemWithKey.current[ComponentKey];
            const { DropTargetItem } = ListContext.State;
            if ((DropTargetItem === Item) || (Item == null)) {
                handleDragLeave(Event);
            } // explicitly leave this item
        }
        /**** onDragEnd ****/
        function onDragEnd(Event) {
            onDragLeave(Event); // DRY
            ListContext.State.dragging = false;
            ListContext.State.DropMode = undefined;
            rerender();
        }
        /**** handleDragEnter - n.b.: new item is entered before old one is left! ****/
        function handleDragEnter(Event, Item) {
            const { DropTargetTimer } = ListContext.State;
            if (DropTargetTimer != null) {
                clearTimeout(DropTargetTimer);
                ListContext.State.DropTargetTimer = undefined;
            }
            ListContext.State.DropTargetItem = Item;
            ListContext.State.DropTargetTimer = setTimeout(() => {
                ListContext.State.DropTargetTimer = undefined;
                if (ListContext.State.DropMode === 'after') {
                    autoExpandItem(Item);
                    rerender(); // since "autoExpandItem" does not rerender itself
                }
            }, 2000);
            let Container = executedCallback('NestedListView callback "ContainerOfListItem"', ContainerOfListItem, Item); // *C* should be validated
            if (Container != null) { // prevent the path to this item...
                autoExpandItem(Container); // ...to get auto-collapsed
                rerender(); // since "autoExpandItem" does not rerender itself
            }
            handleDragOver(Event, Item); // DRY
        }
        /**** handleDragOver ****/
        function handleDragOver(Event, Item) {
            const Limit = Event.target.getBoundingClientRect().top + Event.target.offsetHeight / 2;
            const DropMode = Event.clientY < Limit ? 'before' : 'after';
            if (ListContext.State.DropMode !== DropMode) {
                if ((DropMode === 'after') && (ListContext.State.DropTargetTimer == null)) {
                    ListContext.State.DropTargetTimer = setTimeout(() => {
                        ListContext.State.DropTargetTimer = undefined;
                        if (ListContext.State.DropMode === 'after') {
                            autoExpandItem(Item);
                            rerender(); // since "autoExpandItem" does not rerender itself
                        }
                    }, 2000);
                }
                ListContext.State.DropMode = DropMode;
                rerender();
            }
        }
        /**** handleDragLeave - n.b.: new item is entered before old one is left! ****/
        function handleDragLeave(Event) {
            const { DropTargetItem, DropTargetTimer } = ListContext.State;
            if (DropTargetTimer != null) {
                clearTimeout(DropTargetTimer);
                ListContext.State.DropTargetTimer = undefined;
            }
            if (DropTargetItem != null) {
                autoCollapseItem(DropTargetItem);
                ListContext.State.DropTargetItem = undefined;
            } // without explicit rerendering!
            setTimeout(rerender, 500); // wait for potential "autoExpandItem"
        }
        /**** onDrop ****/
        function onDrop(Event) {
            let { DropTargetItem, DropMode } = ListContext.State;
            if (DropTargetItem != null) {
                executeCallback('NestedListView callback "onListItemMove"', onListItemMove, selectedItems, DropTargetItem, DropMode); // caller should update its list and rerender
                ListContext.State.dragging = false;
                ListContext.State.DropTargetItem = undefined;
                ListContext.State.DropMode = undefined;
            }
        }
        /**** explicit rerendering ****/
        const [State, setState] = useState({ Rendering: 0 });
        function rerender() {
            setState((oldState) => ({ Rendering: oldState.Rendering + 1 }));
        }
        const ListContext = {
            List, ListIsSortable, KeyOfListItem, ListItemRenderer, ContentOfListItem,
            ListIsSelectable, ListItemMayBeSelected, onListItemClick,
            SelectionSet, anyOuterItemIsSelected, changeSelection,
            ExpansionMap: ExpansionMap, ListItemMayBeExpanded, toggleExpansionOf,
            ListItemWithKey: ListItemWithKey.current, ListItemMayAccept,
            State: DragAndDropState.current, rerender
        };
        /**** actual rendering ****/
        if (List.length === 0) {
            return html `<div class="sim-component nestedlistview placeholder ${Classes !== null && Classes !== void 0 ? Classes : ''}" ...${RestProps}>
          <div dangerouslySetInnerHTML=${{ __html: Placeholder !== null && Placeholder !== void 0 ? Placeholder : '(empty)' }}/>
        </>`;
        }
        else {
            const { dragging } = ListContext.State;
            return html `<div class="sim-component nestedlistview ${dragging ? 'dragging' : ''}"
          onDragStart=${onDragStart} onDragEnter=${onDragEnter} onDragOver=${onDragOver}
          onDragLeave=${onDragLeave} onDragEnd=${onDragEnd} onDrop=${onDrop}
          ref=${animatedElement} ...${RestProps}
        >
          <${NLV_ListView} List=${List}
            ListContext=${ListContext} Rendering=${State.Rendering}
          />
        </>`;
        }
    });
}
installStylesheetFor('sim-component.nestedlistview', `
    .sim-component.nestedlistview {
      overflow-x:auto; overflow-y:scroll;
      border:solid 1px #888888; border-radius:2px;
      background:#DDDDDD; padding:0px;
    }

  /**** actual ListView ****/

    .sim-component.nestedlistview .listview {
      display:flex; position:relative; flex-flow:column nowrap; align-items:stretch;
      overflow:visible;
      margin:0px; margin-left:10px;
    }
    .sim-component.nestedlistview > .listview {
      margin-left:0px;
    }

  /**** full ListItemView ****/

    .sim-component.nestedlistview .listitemview {
      display:block; position:relative; overflow:hidden; flex:0 0 auto;
      left:0px; top:0px; width:100%; height:auto; line-height:0px;
      background:white; color:black;
      border:none;
      white-space:nowrap; text-overflow:ellipsis;
      user-select:none; pointer-events:auto;
    }

  /**** LabelLine in ListItemView ****/

    .sim-component.nestedlistview .listitemview > .labelline {
      display:block; position:relative;
      width:100%;
      border:none;
      pointer-events:none;
    }
    .sim-component.nestedlistview .listitemview:not(:last-child) > .labelline {
      border-bottom:solid 1px lightgray;
    }

    .sim-component.nestedlistview .listitemview.before > .labelline {
      border-top:solid 20px #DDDDDD;
    }
    .sim-component.nestedlistview .listitemview.after > .labelline {
      border-bottom:solid 21px #DDDDDD;
    }

  /**** LabelLine ExpansionMarker ****/

    .sim-component.nestedlistview .listitemview > .labelline > .expansion-marker {
      display:inline-block; position:absolute;
      left:0px; top:0px; width:20px; height:30px; text-align:center;
      background:none !important;
      font-family:FontAwesome; font-size:22px; line-height:29px;
      pointer-events:auto;
    }
    .sim-component.nestedlistview .listitemview > .labelline > .expansion-marker.plain::after     { content:"\\f10c"; font-size:14px; position:relative; top:-3px }
    .sim-component.nestedlistview .listitemview > .labelline > .expansion-marker.collapsed::after { content:"\\f0da" }
    .sim-component.nestedlistview .listitemview > .labelline > .expansion-marker.expanded::after  { content:"\\f0d7" }

  /**** LabelLine LabelView ****/

    .sim-component.nestedlistview .listitemview > .labelline > .labelview {
      display:inline-block; position:relative;
      left:20px; top:0px; right:0px; bottom:0px;
      padding:0px; padding-left:4px; padding-right:4px;
      overflow:hidden; text-overflow:ellipsis;
      white-space:nowrap; line-height:30px;
    }
    .sim-component.nestedlistview .listitemview.selected > .labelline {
      background-color:dodgerblue; color:white;
    }
    .sim-component.nestedlistview .listitemview.selected > .listview .labelline {
      background-color:rgba(30,144,255, 0.3); color:black;
    }

  /**** Default LabelView ****/

    .sim-component.nestedlistview .listitemview > .labelline > .labelview > .default {
      height:30px; line-height:29px; overflow:hidden; text-overflow:ellipsis;
      padding-left:4px; padding-right:4px;
    }

  /**** Placeholder ****/

    .sim-component.nestedlistview.placeholder {
      display:flex; flex-flow:column nowrap; align-items:center; justify-content:center;
      flex:1 0 auto; overflow:hidden;
      background-color:#EEEEEE;
    }
    .sim-component.nestedlistview.placeholder > * {
      display:inline-block; position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
  `);
/**** ListView inside NestedListView ****/
function NLV_ListView(PropSet) {
    const [animatedElement] = useAutoAnimate();
    const { List, ListContext, Rendering } = PropSet;
    if (List == null) {
        debugger;
    }
    return html `<div class="listview" ref=${animatedElement}>${List.map((ListItem) => html `<${NLV_ListItemView}
        ListItem=${ListItem} ListContext=${ListContext} Rendering=${Rendering}
      />`)}</>`;
}
/**** ListItemView inside NestedListView ****/
function NLV_ListItemView(PropSet) {
    const [animatedElement] = useAutoAnimate();
    const { ListItem, ListContext, Rendering } = PropSet;
    const { KeyOfListItem, ContentOfListItem } = ListContext;
    const innerList = executedCallback('NestedListView callback "ContentOfListItem"', ListContext.ContentOfListItem, ListItem); // *C* should be validated
    const ListItemIsPlain = (innerList == null);
    const ListItemIsExpanded = ListContext.ExpansionMap.has(ListItem);
    const ListItemIsSelected = ListContext.SelectionSet.has(ListItem);
    /**** bind this component to the given ListItem ****/
    const ListItemKey = executedCallback('NestedListView callback "KeyOfListItem"', KeyOfListItem, ListItem);
    useEffect(() => {
        ListContext.ListItemWithKey[ListItemKey] = ListItem;
        //    return () => delete ListContext.ListItemWithKey[ListItemKey]
    }, []); // *C* this approach is not stable
    /**** onClick ****/
    const onClick = (Event) => {
        Event.stopPropagation();
        executeCallback('NestedListView callback "onListItemClick"', ListContext.onListItemClick, ListItem, Event);
        if (ListContext.anyOuterItemIsSelected(ListItem)) {
            return;
        }
        // do not select items inside other selected items!
        if (ListContext.ListIsSelectable) {
            if (executedCallback('NestedListView callback "ListItemMayBeSelected"', ListContext.ListItemMayBeSelected, ListItem) != true) {
                return;
            }
            const additively = ((Event.pointerType !== 'mouse') || Event.ctrlKey || Event.metaKey);
            ListContext.changeSelection(ListItem, additively);
        }
    };
    /**** onExpansionClick ****/
    const onExpansionClick = (Event) => {
        Event.stopPropagation();
        const innerList = executedCallback('NestedListView callback "ContentOfListItem"', ContentOfListItem, ListItem); // *C* should be validated
        if (innerList == null) {
            return;
        }
        ListContext.toggleExpansionOf(ListItem);
        ListContext.rerender();
    };
    /**** prepare expansion marker ****/
    let ExpansionIcon = (ListItemIsPlain
        ? 'plain'
        : ListItemIsExpanded ? 'expanded' : 'collapsed');
    let mayBeExpanded = executedCallback('NestedListView callback "ListItemMayBeExpanded"', ListContext.ListItemMayBeExpanded, ListItem);
    const ExpansionMarker = html `<div
      class="expansion-marker ${ExpansionIcon} ${mayBeExpanded ? '' : 'disabled'}"
      onClick=${mayBeExpanded && onExpansionClick}
    />`;
    /**** prepare Contents of expanded items ****/
    const Contents = (!ListItemIsPlain && ListItemIsExpanded &&
        !(ListContext.State.dragging && ListItemIsSelected)
        ? html `<${NLV_ListView} List=${innerList}
          ListContext=${ListContext} Rendering=${Rendering}
        />`
        : '');
    /**** finally render this item ****/
    const { DropTargetItem, DropMode } = ListContext.State;
    const ListItemIsDropTarget = (ListItem === DropTargetItem);
    const ListIsSortable = ListContext.ListIsSortable;
    return html `<div class=${'listitemview' +
        (ListItemIsSelected ? ' selected' : '') +
        (ListItemIsDropTarget ? ` DropTarget ${DropMode}` : '')} ref=${animatedElement} key=${ListItemKey} data-key=${ListItemKey}
        draggable=${ListIsSortable} onClick=${onClick}
    > <div class="labelline">
        ${ExpansionMarker}
        <div class="labelview">${ListContext.ListItemRenderer(ListItem, ListItemIsSelected, ListItemIsPlain, ListItemIsExpanded, ListItemIsDropTarget ? DropMode : '')}</>
      </>
      ${Contents}
    </>`;
}
/**** consume/consumingEvent ****/
export function consumeEvent(Event, completely = false) {
    Event.stopPropagation();
    if (completely == true) {
        Event.preventDefault();
    }
}
export const consumingEvent = consumeEvent;
/**** executeCallback ****/
export function executeCallback(Description, Callback, ...ArgList) {
    expectTextline('callback description', Description);
    allowFunction('callback', Callback);
    if (Callback != null) {
        try {
            return Callback(...ArgList);
        }
        catch (Signal) {
            throwError(`CallbackFailure: ${Description} failed with ${'' + Signal}`);
        }
    }
}
export const executedCallback = executeCallback;
/**** deepCopyOf ****/
export function deepCopyOf(Value) {
    if ((Value === null) || (typeof Value !== 'object')) {
        return Value;
    }
    if (Array.isArray(Value)) {
        return Value.map(deepCopyOf);
    }
    const Copy = {};
    for (const Key in Value) {
        if (Value.hasOwnProperty(Key)) {
            Copy[Key] = deepCopyOf(Value[Key]);
        }
    }
    return Copy;
}
