import * as React from 'react';

declare const SCOPE: unique symbol;

interface Computation<T = any> extends Scope {
    id?: string | undefined;
    /** @internal */
    _effect: boolean;
    /** @internal */
    _init: boolean;
    /** @internal */
    _value: T;
    /** @internal */
    _sources: Computation[] | null;
    /** @internal */
    _observers: Computation[] | null;
    /** @internal */
    _compute: (() => T) | null;
    /** @internal */
    _changed: (prev: T, next: T) => boolean;
    /** read */
    call(this: Computation<T>): T;
}
interface ReadSignal<T> {
    (): T;
    /** only available during dev. */
    node?: Computation;
}
interface WriteSignal<T> extends ReadSignal<T> {
    /** only available during dev. */
    node?: Computation;
    set: (value: T | NextValue<T>) => T;
}
interface NextValue<T> {
    (prevValue: T): T;
}
interface Scope {
    [SCOPE]: Scope | null;
    /** @internal */
    _state: number;
    /** @internal */
    _compute: unknown;
    /** @internal */
    _prevSibling: Scope | null;
    /** @internal */
    _nextSibling: Scope | null;
    /** @internal */
    _context: ContextRecord | null;
    /** @internal */
    _handlers: ErrorHandler<any>[] | null;
    /** @internal */
    _disposal: Disposable | Disposable[] | null;
    append(scope: Scope): void;
    dispose(): void;
}
interface Dispose {
    (): void;
}
interface Disposable extends Callable {
}
interface StopEffect {
    (): void;
}
interface Callable<This = unknown, Return = void> {
    call($this: This): Return;
}
type Maybe<T> = T | void | null | undefined | false;
type ContextRecord = Record<string | symbol, unknown>;
interface ErrorHandler<T = Error> {
    (error: T): void;
}

type Equals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;
type WritableKeys<T> = NonNullable<{
    [P in keyof T]-?: Equals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P>;
}>[keyof T];
type PickWritable<T> = Pick<T, WritableKeys<T>>;
type PickReadonly<T> = Omit<T, WritableKeys<T>>;

/**
Matches a [`class` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

@category Class
*/
type Constructor<T, Arguments extends unknown[] = any[]> = new(...arguments_: Arguments) => T;

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- It has to be an `interface` so that it can be merged.
	interface SymbolConstructor {
		readonly observable: symbol;
	}
}

/**
Remove spaces from the left side.
*/
type TrimLeft<V extends string> = V extends `${Whitespace}${infer R}` ? TrimLeft<R> : V;

/**
Remove spaces from the right side.
*/
type TrimRight<V extends string> = V extends `${infer R}${Whitespace}` ? TrimRight<R> : V;

/**
Remove leading and trailing spaces from a string.

@example
```
import type {Trim} from 'type-fest';

Trim<' foo '>
//=> 'foo'
```

@category String
@category Template literal
*/
type Trim<V extends string> = TrimLeft<TrimRight<V>>;

type UpperCaseCharacters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

type Whitespace =
	| '\u{9}' // '\t'
	| '\u{A}' // '\n'
	| '\u{B}' // '\v'
	| '\u{C}' // '\f'
	| '\u{D}' // '\r'
	| '\u{20}' // ' '
	| '\u{85}'
	| '\u{A0}'
	| '\u{1680}'
	| '\u{2000}'
	| '\u{2001}'
	| '\u{2002}'
	| '\u{2003}'
	| '\u{2004}'
	| '\u{2005}'
	| '\u{2006}'
	| '\u{2007}'
	| '\u{2008}'
	| '\u{2009}'
	| '\u{200A}'
	| '\u{2028}'
	| '\u{2029}'
	| '\u{202F}'
	| '\u{205F}'
	| '\u{3000}'
	| '\u{FEFF}';

type WordSeparators = '-' | '_' | Whitespace;

/**
Returns a boolean for whether the string is lowercased.
*/
type IsLowerCase<T extends string> = T extends Lowercase<T> ? true : false;

/**
Returns a boolean for whether the string is uppercased.
*/
type IsUpperCase<T extends string> = T extends Uppercase<T> ? true : false;

/**
Returns a boolean for whether the string is numeric.

This type is a workaround for [Microsoft/TypeScript#46109](https://github.com/microsoft/TypeScript/issues/46109#issuecomment-930307987).
*/
type IsNumeric<T extends string> = T extends `${number}`
	? Trim<T> extends T
		? true
		: false
	: false;

/**
Extract the keys from a type where the value type of the key extends the given `Condition`.

Internally this is used for the `ConditionalPick` and `ConditionalExcept` types.

@example
```
import type {ConditionalKeys} from 'type-fest';

interface Example {
	a: string;
	b: string | number;
	c?: string;
	d: {};
}

type StringKeysOnly = ConditionalKeys<Example, string>;
//=> 'a'
```

To support partial types, make sure your `Condition` is a union of undefined (for example, `string | undefined`) as demonstrated below.

@example
```
import type {ConditionalKeys} from 'type-fest';

type StringKeysAndUndefined = ConditionalKeys<Example, string | undefined>;
//=> 'a' | 'c'
```

@category Object
*/
type ConditionalKeys<Base, Condition> = NonNullable<
// Wrap in `NonNullable` to strip away the `undefined` type from the produced union.
{
	// Map through all the keys of the given base type.
	[Key in keyof Base]:
	// Pick only keys with types extending the given `Condition` type.
	Base[Key] extends Condition
	// Retain this key since the condition passes.
		? Key
	// Discard this key since the condition fails.
		: never;

	// Convert the produced object into a union type of the keys which passed the conditional test.
}[keyof Base]
>;

/**
Pick keys from the shape that matches the given `Condition`.

This is useful when you want to create a new type from a specific subset of an existing type. For example, you might want to pick all the primitive properties from a class and form a new automatically derived type.

@example
```
import type {Primitive, ConditionalPick} from 'type-fest';

class Awesome {
	name: string;
	successes: number;
	failures: bigint;

	run() {}
}

type PickPrimitivesFromAwesome = ConditionalPick<Awesome, Primitive>;
//=> {name: string; successes: number; failures: bigint}
```

@example
```
import type {ConditionalPick} from 'type-fest';

interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
}

type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}
```

@category Object
*/
type ConditionalPick<Base, Condition> = Pick<
Base,
ConditionalKeys<Base, Condition>
>;

// Transforms a string that is fully uppercase into a fully lowercase version. Needed to add support for SCREAMING_SNAKE_CASE, see https://github.com/sindresorhus/type-fest/issues/385
type UpperCaseToLowerCase<T extends string> = T extends Uppercase<T> ? Lowercase<T> : T;

// This implementation does not support SCREAMING_SNAKE_CASE, it is used internally by `SplitIncludingDelimiters`.
type SplitIncludingDelimiters_<Source extends string, Delimiter extends string> =
	Source extends '' ? [] :
		Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}` ?
			(
				Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
					? UsedDelimiter extends Delimiter
						? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
							? [...SplitIncludingDelimiters<FirstPart, Delimiter>, UsedDelimiter, ...SplitIncludingDelimiters<SecondPart, Delimiter>]
							: never
						: never
					: never
			) :
			[Source];

/**
Unlike a simpler split, this one includes the delimiter splitted on in the resulting array literal. This is to enable splitting on, for example, upper-case characters.

@category Template literal
*/
type SplitIncludingDelimiters<Source extends string, Delimiter extends string> = SplitIncludingDelimiters_<UpperCaseToLowerCase<Source>, Delimiter>;

/**
Format a specific part of the splitted string literal that `StringArrayToDelimiterCase<>` fuses together, ensuring desired casing.

@see StringArrayToDelimiterCase
*/
type StringPartToDelimiterCase<StringPart extends string, Start extends boolean, UsedWordSeparators extends string, UsedUpperCaseCharacters extends string, Delimiter extends string> =
	StringPart extends UsedWordSeparators ? Delimiter :
		Start extends true ? Lowercase<StringPart> :
			StringPart extends UsedUpperCaseCharacters ? `${Delimiter}${Lowercase<StringPart>}` :
				StringPart;

/**
Takes the result of a splitted string literal and recursively concatenates it together into the desired casing.

It receives `UsedWordSeparators` and `UsedUpperCaseCharacters` as input to ensure it's fully encapsulated.

@see SplitIncludingDelimiters
*/
type StringArrayToDelimiterCase<Parts extends readonly any[], Start extends boolean, UsedWordSeparators extends string, UsedUpperCaseCharacters extends string, Delimiter extends string> =
	Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
		? `${StringPartToDelimiterCase<FirstPart, Start, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter>}${StringArrayToDelimiterCase<RemainingParts, false, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter>}`
		: Parts extends [string]
			? string
			: '';

/**
Convert a string literal to a custom string delimiter casing.

This can be useful when, for example, converting a camel-cased object property to an oddly cased one.

@see KebabCase
@see SnakeCase

@example
```
import type {DelimiterCase} from 'type-fest';

// Simple

const someVariable: DelimiterCase<'fooBar', '#'> = 'foo#bar';

// Advanced

type OddlyCasedProperties<T> = {
	[K in keyof T as DelimiterCase<K, '#'>]: T[K]
};

interface SomeOptions {
	dryRun: boolean;
	includeFile: string;
	foo: number;
}

const rawCliOptions: OddlyCasedProperties<SomeOptions> = {
	'dry#run': true,
	'include#file': 'bar.js',
	foo: 123
};
```

@category Change case
@category Template literal
*/
type DelimiterCase<Value, Delimiter extends string> = string extends Value ? Value : Value extends string
	? StringArrayToDelimiterCase<
	SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
	true,
	WordSeparators,
	UpperCaseCharacters,
	Delimiter
	>
	: Value;

/**
Convert a string literal to kebab-case.

This can be useful when, for example, converting a camel-cased object property to a kebab-cased CSS class name or a command-line flag.

@example
```
import type {KebabCase} from 'type-fest';

// Simple

const someVariable: KebabCase<'fooBar'> = 'foo-bar';

// Advanced

type KebabCasedProperties<T> = {
	[K in keyof T as KebabCase<K>]: T[K]
};

interface CliOptions {
	dryRun: boolean;
	includeFile: string;
	foo: number;
}

const rawCliOptions: KebabCasedProperties<CliOptions> = {
	'dry-run': true,
	'include-file': 'bar.js',
	foo: 123
};
```

@category Change case
@category Template literal
*/
type KebabCase<Value> = DelimiterCase<Value, '-'>;

type Observable<T> = T | ReadSignal<T>;
type ObservableRecord<T> = {
    [P in keyof T]: Observable<T[P] | null>;
};
type Stringify<P> = P extends string ? P : never;
type LowercaseRecord<T> = {
    [P in keyof T as Lowercase<Stringify<P>>]?: T[P] | null;
};
type KebabCaseRecord<T> = {
    [P in keyof T as KebabCase<P>]: T[P] | null;
};
type ReadSignalRecord<Props = Record<string | symbol, any>> = {
    [Prop in keyof Props]: ReadSignal<Props[Prop]>;
};
type WriteSignalRecord<Props = Record<string | symbol, any>> = {
    [Prop in keyof Props]: WriteSignal<Props[Prop]>;
};
type AnyRecord = {
    [name: string]: any;
};
interface EventHandler<E> {
    (this: never, event: E): void;
}
type TargetedEventHandler<T extends EventTarget, E extends Event> = EventHandler<TargetedEvent<T, E>>;
type TargetedEvent<T extends EventTarget = EventTarget, E = Event> = Omit<E, 'currentTarget'> & {
    readonly currentTarget: T;
};

type AttrValue = string | number | boolean | null | undefined;
interface AttrsRecord {
    [attrName: string]: AttrValue;
}
interface HTMLAttrs extends HTMLAttrsRecord<HTMLProperties> {
}
type HTMLAttrsRecord<Props> = LowercaseRecord<ConditionalPick<Props, AttrValue>>;
interface HTMLProperties {
    accept?: string;
    acceptCharset?: string;
    accessKey?: string;
    action?: string;
    allow?: string;
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    alt?: string;
    as?: string;
    async?: boolean;
    autocomplete?: string;
    autoComplete?: string;
    autocorrect?: string;
    autoCorrect?: string;
    autofocus?: boolean;
    autoFocus?: boolean;
    autoPlay?: boolean;
    capture?: boolean | string;
    cellPadding?: number | string;
    cellSpacing?: number | string;
    charSet?: string;
    challenge?: string;
    checked?: boolean;
    cite?: string;
    class?: string;
    className?: string;
    cols?: number;
    colSpan?: number;
    content?: string;
    contentEditable?: boolean;
    contextMenu?: string;
    controls?: boolean;
    controlsList?: string;
    coords?: string;
    crossOrigin?: string;
    data?: string;
    dateTime?: string;
    default?: boolean;
    defaultChecked?: boolean;
    defaultValue?: string;
    defer?: boolean;
    dir?: 'auto' | 'rtl' | 'ltr';
    disabled?: boolean;
    disableRemotePlayback?: boolean;
    download?: any;
    decoding?: 'sync' | 'async' | 'auto';
    draggable?: boolean;
    encType?: string;
    enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    frameBorder?: number | string;
    headers?: string;
    height?: number | string;
    hidden?: boolean;
    high?: number;
    href?: string;
    hrefLang?: string;
    for?: string;
    htmlFor?: string;
    httpEquiv?: string;
    icon?: string;
    id?: string;
    inputMode?: string;
    integrity?: string;
    is?: string;
    keyParams?: string;
    keyType?: string;
    kind?: string;
    label?: string;
    lang?: string;
    list?: string;
    loading?: 'eager' | 'lazy';
    loop?: boolean;
    low?: number;
    manifest?: string;
    marginHeight?: number;
    marginWidth?: number;
    max?: number | string;
    maxLength?: number;
    media?: string;
    mediaGroup?: string;
    method?: string;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    muted?: boolean;
    name?: string;
    nomodule?: boolean;
    nonce?: string;
    noValidate?: boolean;
    open?: boolean;
    optimum?: number;
    part?: string;
    pattern?: string;
    ping?: string;
    placeholder?: string;
    playsInline?: boolean;
    poster?: string;
    preload?: string;
    radioGroup?: string;
    readonly?: boolean;
    readOnly?: boolean;
    referrerpolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
    rel?: string;
    required?: boolean;
    reversed?: boolean;
    role?: string;
    rows?: number;
    rowSpan?: number;
    sandbox?: string;
    scope?: string;
    scoped?: boolean;
    scrolling?: string;
    seamless?: boolean;
    selected?: boolean;
    shape?: string;
    size?: number;
    sizes?: string;
    slot?: string;
    span?: number;
    spellcheck?: boolean;
    spellCheck?: boolean;
    src?: string;
    srcset?: string;
    srcDoc?: string;
    srcLang?: string;
    srcSet?: string;
    start?: number;
    step?: number | string;
    style?: string;
    summary?: string;
    tabIndex?: number;
    target?: string;
    title?: string;
    type?: string;
    useMap?: string;
    value?: string | string[] | number;
    volume?: string | number;
    width?: number | string;
    wmode?: string;
    wrap?: string;
    autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    autoCapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    disablePictureInPicture?: boolean;
    results?: number;
    translate?: 'yes' | 'no';
    about?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
}
interface ARIAAttributes {
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    'aria-checked'?: 'true' | 'false' | 'mixed';
    'aria-disabled'?: 'true' | 'false';
    'aria-errormessage'?: string;
    'aria-expanded'?: 'true' | 'false';
    'aria-haspopup'?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    'aria-hidden'?: 'true' | 'false';
    'aria-invalid'?: 'grammar' | 'false' | 'spelling' | 'true';
    'aria-label'?: string;
    'aria-level'?: number;
    'aria-modal'?: 'true' | 'false';
    'aria-multiline'?: 'true' | 'false';
    'aria-multiselectable'?: 'true' | 'false';
    'aria-orientation'?: 'horizontal' | 'vertical';
    'aria-placeholder'?: string;
    'aria-pressed'?: 'true' | 'false' | 'mixed';
    'aria-readonly'?: 'true' | 'false';
    'aria-required'?: 'true' | 'false';
    'aria-selected'?: 'true' | 'false';
    'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';
    'aria-valuemin'?: number;
    'aria-valuemax'?: number;
    'aria-valuenow'?: number;
    'aria-valuetext'?: string;
    'aria-busy'?: 'true' | 'false';
    'aria-live'?: 'assertive' | 'polite' | 'off';
    'aria-relevant'?: 'all' | 'additions' | 'removals' | 'text' | 'additions text';
    'aria-atomic'?: 'true' | 'false';
    'aria-dropeffect'?: 'copy' | 'execute' | 'link' | 'move' | 'none' | 'popup';
    'aria-grabbed'?: 'true' | 'false';
    'aria-activedescendant'?: string;
    'aria-colcount'?: number;
    'aria-colindex'?: number;
    'aria-colspan'?: number;
    'aria-controls'?: string;
    'aria-describedby'?: string;
    'aria-description'?: string;
    'aria-details'?: string;
    'aria-flowto'?: string;
    'aria-labelledby'?: string;
    'aria-owns'?: string;
    'aria-posinet'?: number;
    'aria-rowcount'?: number;
    'aria-rowindex'?: number;
    'aria-rowspan'?: number;
    'aria-setsize'?: number;
    'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
    'aria-keyshortcuts'?: string;
    'aria-roledescription'?: string;
}
type CSSValue = string | number | false | null | undefined;
type AnyCSSProperty = {
    [key: string]: CSSValue;
};
type CSSProperties = AnyCSSProperty & {
    [P in keyof Omit<CSSStyleDeclaration, 'item' | 'setProperty' | 'removeProperty' | 'getPropertyValue' | 'getPropertyPriority'>]?: CSSValue;
} & {
    cssText?: string | null;
};
interface CSSStyles extends KebabCaseRecord<CSSProperties> {
}
interface ElementAttributesRecord extends ObservableRecord<HTMLAttrs>, ObservableRecord<ARIAAttributes>, ObservableRecord<AttrsRecord> {
}
interface ElementStylesRecord extends ObservableRecord<CSSStyles> {
}
type ElementCSSVarsRecord<CSSVars> = {
    [Var in keyof CSSVars as `--${Var & string}`]: Observable<CSSVars[Var]>;
};

/**
 * Converts objects into signals. The factory stores the initial object and enables producing new
 * objects where each value in the provided object becomes a signal.
 *
 * @example
 * ```ts
 * const factory = new State({
 *   foo: 0,
 *   bar: '...',
 *   get baz() {
 *     return this.foo + 1;
 *   }
 * });
 *
 * console.log(factory.record); // logs `{ foo: 0, bar: '...' }`
 *
 * const $state = factory.create();
 *
 * effect(() => console.log($state.foo()));
 * // Run effect ^
 * $state.foo.set(1);
 *
 * // Reset all values
 * factory.reset($state);
 * ```
 */
declare class State<Record extends AnyRecord> {
    readonly id: symbol;
    readonly record: Record;
    private _descriptors;
    constructor(record: Record);
    create(): Store<Record>;
    reset(record: Store<Record>, filter?: (key: keyof Record) => boolean): void;
}
type Store<T> = {
    readonly [P in keyof PickReadonly<T>]: ReadSignal<T[P]>;
} & {
    readonly [P in keyof PickWritable<T>]: WriteSignal<T[P]>;
};
type StateContext<T> = ReadSignalRecord<T extends State<infer Record> ? Record : T>;

declare const EVENT: Constructor<Event>;
declare const DOM_EVENT: unique symbol;
interface DOMEventInit<Detail = unknown> extends EventInit {
    readonly detail: Detail;
    readonly trigger?: Event;
}
declare class DOMEvent<Detail = unknown> extends EVENT {
    [DOM_EVENT]: boolean;
    /**
     * The event detail.
     */
    readonly detail: Detail;
    /**
     * The event trigger chain.
     */
    readonly triggers: EventTriggers;
    /**
     * The preceding event that was responsible for this event being fired.
     */
    get trigger(): Event | undefined;
    /**
     * The origin event that lead to this event being fired.
     */
    get originEvent(): Event | undefined;
    /**
     * Whether the origin event was triggered by the user.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted}
     */
    get isOriginTrusted(): boolean;
    constructor(type: string, ...init: Detail extends void | undefined | never ? [init?: Partial<DOMEventInit<Detail>>] : [init: DOMEventInit<Detail>]);
}
declare class EventTriggers implements Iterable<Event> {
    readonly chain: Event[];
    get source(): Event | undefined;
    get origin(): Event | undefined;
    /**
     * Appends the event to the end of the chain.
     */
    add(event: Event): void;
    /**
     * Removes the event from the chain and returns it (if found).
     */
    remove(event: Event): Event | undefined;
    /**
     * Returns whether the chain contains the given `event`.
     */
    has(event: Event): boolean;
    /**
     * Returns whether the chain contains the given event type.
     */
    hasType(type: string): boolean;
    /**
     * Returns the first event with the given `type` found in the chain.
     */
    findType(type: string): Event | undefined;
    /**
     * Walks an event chain on a given `event`, and invokes the given `callback` for each trigger event.
     */
    walk<T>(callback: (event: Event) => NonNullable<T> | void): [event: Event, value: NonNullable<T>] | undefined;
    [Symbol.iterator](): Iterator<Event>;
}
/**
 * Walks an event chain on a given `event`, and invokes the given `callback` for each trigger event.
 * @deprecated - Use `event.triggers.walk(callback)`
 */
declare function walkTriggerEventChain<T>(event: Event, callback: (event: Event) => NonNullable<T> | void): [event: Event, value: NonNullable<T>] | undefined;
/**
 * Attempts to find a trigger event with a given `eventType` on the event chain.
 * @deprecated - Use `event.triggers.findType('')`
 */
declare function findTriggerEvent(event: Event, type: string): Event | undefined;
/**
 * Whether a trigger event with the given `eventType` exists can be found in the event chain.
 * @deprecated - Use `event.triggers.hasType('')`
 */
declare function hasTriggerEvent(event: Event, type: string): boolean;
/**
 * Appends the given `trigger` to the event chain.
 * @deprecated - Use `event.triggers.add(event)`
 */
declare function appendTriggerEvent(event: DOMEvent, trigger?: Event): void;
type InferEventDetail<T> = T extends {
    detail: infer Detail;
} ? Detail : T extends DOMEvent<infer Detail> ? Detail : T extends DOMEventInit<infer Detail> ? Detail : unknown;
type EventCallback<T extends Event> = ((event: T) => void) | {
    handleEvent(event: T): void;
} | null;
declare class EventsTarget<Events> extends EventTarget {
    /** @internal type only */
    $ts__events?: Events;
    addEventListener<Type extends keyof Events>(type: Type & string, callback: EventCallback<Events[Type] & Event>, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener<Type extends keyof Events>(type: Type & string, callback: EventCallback<Events[Type] & Event>, options?: boolean | AddEventListenerOptions | undefined): void;
}
declare function isPointerEvent(event: Event | undefined): event is PointerEvent;
declare function isKeyboardEvent(event: Event | undefined): event is KeyboardEvent;
declare function isKeyboardClick(event: Event | undefined): boolean;

interface ServerElement extends Pick<HTMLElement, 'getAttribute' | 'setAttribute' | 'hasAttribute' | 'removeAttribute' | 'dispatchEvent' | 'addEventListener' | 'removeEventListener'> {
    readonly classList: Pick<HTMLElement['classList'], 'length' | 'add' | 'contains' | 'remove' | 'replace' | 'toggle' | 'toString'>;
    readonly style: Pick<HTMLElement['style'], 'length' | 'getPropertyValue' | 'removeProperty' | 'setProperty'> & {
        toString(): string;
    };
}

declare const ON_DISPATCH: unique symbol;

interface SetupCallback {
    (): void;
}
interface ElementCallback {
    (el: HTMLElement): any;
}
interface LifecycleHooks {
    onSetup?(): void;
    onAttach?(el: HTMLElement): void;
    onConnect?(el: HTMLElement): void;
    onDestroy?(el: HTMLElement): void;
}
interface InstanceInit<Props = {}> {
    scope?: Scope | null;
    props?: Readonly<Partial<Props>> | null;
}
declare class Instance<Props = {}, State = {}, Events = {}, CSSVars = {}> {
    /** @internal type only */
    $ts__events?: Events;
    /** @internal type only */
    $ts__vars?: CSSVars;
    [ON_DISPATCH]?: ((event: Event) => void) | null;
    readonly $el: WriteSignal<HTMLElement | null>;
    _el: HTMLElement | null;
    _scope: Scope | null;
    _attachScope: Scope | null;
    _connectScope: Scope | null;
    _component: Component | null;
    _destroyed: boolean;
    _props: WriteSignalRecord<Props>;
    _attrs: ElementAttributesRecord | null;
    _styles: ElementStylesRecord | null;
    _state: Readonly<State>;
    _$state: any;
    readonly _setupCallbacks: SetupCallback[];
    readonly _attachCallbacks: ElementCallback[];
    readonly _connectCallbacks: ElementCallback[];
    readonly _destroyCallbacks: ElementCallback[];
    constructor(Component: ComponentConstructor<Component<Props, State, any, any>>, scope: Scope, init?: InstanceInit<Props>);
    _setup(): void;
    _attach(el: HTMLElement | ServerElement): void;
    _detach(): void;
    _connect(): void;
    _disconnect(): void;
    _destroy(): void;
    _addHooks(target: LifecycleHooks): void;
    private _attachAttrs;
    private _attachStyles;
    private _setAttr;
    private _setStyle;
}
declare class ViewController<Props = {}, State = {}, Events = {}, CSSVars = {}> extends EventTarget {
    /** @internal */
    $$: Instance<Props, State, Events, CSSVars>;
    get el(): HTMLElement | null;
    get $el(): HTMLElement | null;
    get scope(): Scope;
    get attachScope(): Scope | null;
    get connectScope(): Scope | null;
    /** @internal */
    get $props(): ReadSignalRecord<Props>;
    /** @internal */
    get $state(): WriteSignalRecord<State>;
    get state(): Readonly<State>;
    constructor();
    attach({ $$ }: {
        $$: Instance<Props, State, Events, CSSVars>;
    }): this;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void;
    /**
     * The given callback is invoked when the component is ready to be set up.
     *
     * - This hook will run once.
     * - This hook is called both client-side and server-side.
     * - It's safe to use context inside this hook.
     * - The host element has not attached yet - wait for `onAttach`.
     */
    protected onSetup?(): void;
    /**
     * The given callback is invoked when the component instance has attached to a host element.
     *
     * - This hook can run more than once as the component attaches/detaches from a host element.
     * - This hook may be called while the host element is not connected to the DOM yet.
     * - This hook is called both client-side and server-side.
     */
    protected onAttach?(el: HTMLElement): void;
    /**
     * The given callback is invoked when the host element has connected to the DOM.
     *
     * - This hook can run more than once as the host disconnects and re-connects to the DOM.
     * - If a function is returned it will be invoked when the host disconnects from the DOM.
     */
    protected onConnect?(el: HTMLElement): void;
    /**
     * The given callback is invoked when the component is destroyed.
     *
     * - This hook will only run once when the component is finally destroyed.
     * - This hook may be called before being attached to a host element.
     * - This hook is called both client-side and server-side.
     */
    protected onDestroy?(): void;
    /**
     * This method can be used to specify attributes that should be set on the host element. Any
     * attributes that are assigned to a function will be considered a signal and updated accordingly.
     */
    protected setAttributes(attributes: ElementAttributesRecord): void;
    /**
     * This method can be used to specify styles that should set be set on the host element. Any
     * styles that are assigned to a function will be considered a signal and updated accordingly.
     */
    protected setStyles(styles: ElementStylesRecord): void;
    /**
     * This method is used to satisfy the CSS variables contract specified on the current
     * component. Other CSS variables can be set via the `setStyles` method.
     */
    protected setCSSVars(vars: ElementCSSVarsRecord<CSSVars>): void;
    /**
     * Type-safe utility for creating component DOM events.
     */
    createEvent<Type extends keyof Events = keyof Events>(type: Type & string, ...init: Events[Type] extends DOMEvent ? Events[Type]['detail'] extends void | undefined | never ? [init?: Partial<DOMEventInit<Events[Type]>['detail']>] : [init: DOMEventInit<Events[Type]['detail']>] : never): Events[Type];
    /**
     * Creates a `DOMEvent` and dispatches it from the host element. This method is typed to
     * match all component events.
     */
    dispatch<Type extends Event | keyof Events>(type: Type, ...init: Type extends Event ? [init?: never] : Type extends keyof Events ? Events[Type] extends DOMEvent ? Events[Type]['detail'] extends void | undefined | never ? [init?: Partial<DOMEventInit<Events[Type]['detail']>>] : [init: DOMEventInit<Events[Type]['detail']>] : [init?: never] : [init?: never]): boolean;
    dispatchEvent(event: Event): boolean;
    /**
     * Adds an event listener for the given `type` and returns a function which can be invoked to
     * remove the event listener.
     *
     * - The listener is removed if the current scope is disposed.
     * - This method is safe to use on the server (noop).
     */
    listen<E = Events & HTMLElementEventMap, Type extends keyof E = keyof E>(type: Type & string, handler: TargetedEventHandler<HTMLElement, E[Type] & Event>, options?: AddEventListenerOptions | boolean): Dispose;
}

declare class Component<Props = {}, State = {}, Events = {}, CSSVars = {}> extends ViewController<Props, State, Events, CSSVars> {
    subscribe(callback: (state: Readonly<State>) => Maybe<Dispose>): StopEffect;
    destroy(): void;
}
interface AnyComponent extends Component<any, any, any, any> {
}
interface ComponentConstructor<T extends Component = AnyComponent> {
    readonly props?: InferComponentProps<T>;
    readonly state?: State<InferComponentState<T>>;
    new (): T;
}
type InferComponentProps<T> = T extends Component<infer Props> ? Props : {};
type InferComponentState<T> = T extends Component<any, infer State> ? State : {};
type InferComponentEvents<T> = T extends Component<any, any, infer Events> ? Events : {};
type InferComponentCSSProps<T> = T extends Component<any, any, any, infer CSSVars> ? CSSVars : {};
type InferComponentCSSVars<Component extends AnyComponent, CSSProps = InferComponentCSSProps<Component>> = {
    [Var in WritableKeys<CSSProps> as `--${Var & string}`]: CSSProps[Var];
};

interface Context<T> {
    id: symbol;
    provide?: () => T;
}

interface DisposalBin {
    add(...callbacks: (() => any)[]): void;
    empty(): void;
}

interface DeferredPromise<ResolveType = void, RejectType = void> {
    promise: Promise<ResolveType | undefined>;
    resolve: (value?: ResolveType) => void;
    reject: (reason: RejectType) => void;
}

type SkipEmptyWord<Word extends string> = Word extends '' ? [] : [Word];

type RemoveLastCharacter<Sentence extends string, Character extends string> = Sentence extends `${infer LeftSide}${Character}`
	? SkipEmptyWord<LeftSide>
	: never;

/**
Split a string (almost) like Lodash's `_.words()` function.

- Split on each word that begins with a capital letter.
- Split on each {@link WordSeparators}.
- Split on numeric sequence.

@example
```
type Words0 = SplitWords<'helloWorld'>; // ['hello', 'World']
type Words1 = SplitWords<'helloWORLD'>; // ['hello', 'WORLD']
type Words2 = SplitWords<'hello-world'>; // ['hello', 'world']
type Words3 = SplitWords<'--hello the_world'>; // ['hello', 'the', 'world']
type Words4 = SplitWords<'lifeIs42'>; // ['life', 'Is', '42']
```

@internal
@category Change case
@category Template literal
*/
type SplitWords<
	Sentence extends string,
	LastCharacter extends string = '',
	CurrentWord extends string = '',
> = Sentence extends `${infer FirstCharacter}${infer RemainingCharacters}`
	? FirstCharacter extends WordSeparators
		// Skip word separator
		? [...SkipEmptyWord<CurrentWord>, ...SplitWords<RemainingCharacters>]
		: LastCharacter extends ''
			// Fist char of word
			? SplitWords<RemainingCharacters, FirstCharacter, FirstCharacter>
			// Case change: non-numeric to numeric, push word
			: [false, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
				? [...SkipEmptyWord<CurrentWord>, ...SplitWords<RemainingCharacters, FirstCharacter, FirstCharacter>]
				// Case change: numeric to non-numeric, push word
				: [true, false] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
					? [...SkipEmptyWord<CurrentWord>, ...SplitWords<RemainingCharacters, FirstCharacter, FirstCharacter>]
					// No case change: concat word
					: [true, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
						? SplitWords<RemainingCharacters, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
					// Case change: lower to upper, push word
						: [true, true] extends [IsLowerCase<LastCharacter>, IsUpperCase<FirstCharacter>]
							? [...SkipEmptyWord<CurrentWord>, ...SplitWords<RemainingCharacters, FirstCharacter, FirstCharacter>]
						// Case change: upper to lower, brings back the last character, push word
							: [true, true] extends [IsUpperCase<LastCharacter>, IsLowerCase<FirstCharacter>]
								? [...RemoveLastCharacter<CurrentWord, LastCharacter>, ...SplitWords<RemainingCharacters, FirstCharacter, `${LastCharacter}${FirstCharacter}`>]
							// No case change: concat word
								: SplitWords<RemainingCharacters, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
	: [...SkipEmptyWord<CurrentWord>];

/**
CamelCase options.

@see {@link CamelCase}
*/
type CamelCaseOptions = {
	/**
	Whether to preserved consecutive uppercase letter.

	@default true
	*/
	preserveConsecutiveUppercase?: boolean;
};

/**
Convert an array of words to camel-case.
*/
type CamelCaseFromArray<
	Words extends string[],
	Options extends CamelCaseOptions,
	OutputString extends string = '',
> = Words extends [
	infer FirstWord extends string,
	...infer RemainingWords extends string[],
]
	? Options['preserveConsecutiveUppercase'] extends true
		? `${Capitalize<FirstWord>}${CamelCaseFromArray<RemainingWords, Options>}`
		: `${Capitalize<Lowercase<FirstWord>>}${CamelCaseFromArray<RemainingWords, Options>}`
	: OutputString;

/**
Convert a string literal to camel-case.

This can be useful when, for example, converting some kebab-cased command-line flags or a snake-cased database result.

By default, consecutive uppercase letter are preserved. See {@link CamelCaseOptions.preserveConsecutiveUppercase preserveConsecutiveUppercase} option to change this behaviour.

@example
```
import type {CamelCase} from 'type-fest';

// Simple

const someVariable: CamelCase<'foo-bar'> = 'fooBar';

// Advanced

type CamelCasedProperties<T> = {
	[K in keyof T as CamelCase<K>]: T[K]
};

interface RawOptions {
	'dry-run': boolean;
	'full_family_name': string;
	foo: number;
	BAR: string;
	QUZ_QUX: number;
	'OTHER-FIELD': boolean;
}

const dbResult: CamelCasedProperties<RawOptions> = {
	dryRun: true,
	fullFamilyName: 'bar.js',
	foo: 123,
	bar: 'foo',
	quzQux: 6,
	otherField: false
};
```

@category Change case
@category Template literal
*/
type CamelCase<Type, Options extends CamelCaseOptions = {preserveConsecutiveUppercase: true}> = Type extends string
	? string extends Type
		? Type
		: Uncapitalize<CamelCaseFromArray<SplitWords<Type extends Uppercase<Type> ? Lowercase<Type> : Type>, Options>>
	: Type;

/**
Converts a string literal to pascal-case.

@example
```
import type {PascalCase} from 'type-fest';

// Simple

const someVariable: PascalCase<'foo-bar'> = 'FooBar';

// Advanced

type PascalCaseProps<T> = {
	[K in keyof T as PascalCase<K>]: T[K]
};

interface RawOptions {
	'dry-run': boolean;
	'full_family_name': string;
	foo: number;
}

const dbResult: CamelCasedProperties<ModelProps> = {
	DryRun: true,
	FullFamilyName: 'bar.js',
	Foo: 123
};
```

@category Change case
@category Template literal
*/
type PascalCase<Value, Options extends CamelCaseOptions = {preserveConsecutiveUppercase: true}> = CamelCase<Value, Options> extends string
	? Capitalize<CamelCase<Value, Options>>
	: CamelCase<Value, Options>;
type ReactProps<C extends Component, E = ReactEventCallbacks<InferComponentEvents<C>>> = Partial<InferComponentProps<C>> & E & {
    style?: ((React.CSSProperties & {
        [name: `--${string}`]: string | number | null | undefined;
    }) & Partial<InferComponentCSSVars<C>>) | undefined;
    part?: string | undefined;
};
type ReactElementProps<C extends Component, T extends HTMLElement | SVGElement = HTMLElement, E = ReactEventCallbacks<InferComponentEvents<C>>> = ReactProps<C, E> & Omit<T extends HTMLElement ? React.HTMLAttributes<T> : React.SVGAttributes<T>, 'style' | keyof E>;
type ReactEventCallbacks<E> = {
    [Type in keyof E as `on${PascalCase<Type & string>}`]?: InferEventDetail<E[Type]> extends void ? (nativeEvent: E[Type]) => void : (detail: InferEventDetail<E[Type]>, nativeEvent: E[Type]) => void;
};

export { type AnyRecord as A, type Context as C, DOMEvent as D, EventsTarget as E, type InferEventDetail as I, type ReadSignal as R, State as S, ViewController as V, type WriteSignal as W, type DeferredPromise as a, type Store as b, type Scope as c, type ReadSignalRecord as d, type Dispose as e, Component as f, type StateContext as g, type ReactElementProps as h, type ReactProps as i, hasTriggerEvent as j, findTriggerEvent as k, appendTriggerEvent as l, isPointerEvent as m, isKeyboardClick as n, isKeyboardEvent as o, type DisposalBin as p, walkTriggerEventChain as w };
