"use client"

import * as React from 'react';

const IS_SERVER = typeof document === "undefined";
const SCOPE = Symbol("SCOPE");
let scheduledEffects = false, runningEffects = false, currentScope = null, currentObserver = null, currentObservers = null, currentObserversIndex = 0, effects = [], defaultContext = {};
const NOOP = () => {
}, STATE_CLEAN = 0, STATE_CHECK = 1, STATE_DIRTY = 2, STATE_DISPOSED = 3;
function flushEffects() {
  scheduledEffects = true;
  queueMicrotask(runEffects);
}
function runEffects() {
  if (!effects.length) {
    scheduledEffects = false;
    return;
  }
  runningEffects = true;
  for (let i = 0; i < effects.length; i++) {
    if (effects[i]._state !== STATE_CLEAN)
      runTop(effects[i]);
  }
  effects = [];
  scheduledEffects = false;
  runningEffects = false;
}
function runTop(node) {
  let ancestors = [node];
  while (node = node[SCOPE]) {
    if (node._effect && node._state !== STATE_CLEAN)
      ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    updateCheck(ancestors[i]);
  }
}
function root(init) {
  const scope = createScope();
  return compute(scope, !init.length ? init : init.bind(null, dispose.bind(scope)), null);
}
function peek(fn) {
  return compute(currentScope, fn, null);
}
function untrack(fn) {
  return compute(null, fn, null);
}
function tick() {
  if (!runningEffects)
    runEffects();
}
function getScope() {
  return currentScope;
}
function scoped(run2, scope) {
  try {
    return compute(scope, run2, null);
  } catch (error) {
    handleError(scope, error);
    return;
  }
}
function getContext(key, scope = currentScope) {
  return scope?._context[key];
}
function setContext(key, value, scope = currentScope) {
  if (scope)
    scope._context = { ...scope._context, [key]: value };
}
function onDispose(disposable) {
  if (!disposable || !currentScope)
    return disposable || NOOP;
  const node = currentScope;
  if (!node._disposal) {
    node._disposal = disposable;
  } else if (Array.isArray(node._disposal)) {
    node._disposal.push(disposable);
  } else {
    node._disposal = [node._disposal, disposable];
  }
  return function removeDispose() {
    if (node._state === STATE_DISPOSED)
      return;
    disposable.call(null);
    if (isFunction$1(node._disposal)) {
      node._disposal = null;
    } else if (Array.isArray(node._disposal)) {
      node._disposal.splice(node._disposal.indexOf(disposable), 1);
    }
  };
}
function dispose(self = true) {
  if (this._state === STATE_DISPOSED)
    return;
  let head = self ? this._prevSibling || this[SCOPE] : this, current = this._nextSibling, next = null;
  while (current && current[SCOPE] === this) {
    dispose.call(current, true);
    disposeNode(current);
    next = current._nextSibling;
    current._nextSibling = null;
    current = next;
  }
  if (self)
    disposeNode(this);
  if (current)
    current._prevSibling = !self ? this : this._prevSibling;
  if (head)
    head._nextSibling = current;
}
function disposeNode(node) {
  node._state = STATE_DISPOSED;
  if (node._disposal)
    emptyDisposal(node);
  if (node._sources)
    removeSourceObservers(node, 0);
  if (node._prevSibling)
    node._prevSibling._nextSibling = null;
  node[SCOPE] = null;
  node._sources = null;
  node._observers = null;
  node._prevSibling = null;
  node._context = defaultContext;
  node._handlers = null;
}
function emptyDisposal(scope) {
  try {
    if (Array.isArray(scope._disposal)) {
      for (let i = scope._disposal.length - 1; i >= 0; i--) {
        const callable = scope._disposal[i];
        callable.call(callable);
      }
    } else {
      scope._disposal.call(scope._disposal);
    }
    scope._disposal = null;
  } catch (error) {
    handleError(scope, error);
  }
}
function compute(scope, compute2, observer) {
  const prevScope = currentScope, prevObserver = currentObserver;
  currentScope = scope;
  currentObserver = observer;
  try {
    return compute2.call(scope);
  } finally {
    currentScope = prevScope;
    currentObserver = prevObserver;
  }
}
function handleError(scope, error) {
  if (!scope || !scope._handlers)
    throw error;
  let i = 0, len = scope._handlers.length, coercedError = coerceError(error);
  for (i = 0; i < len; i++) {
    try {
      scope._handlers[i](coercedError);
      break;
    } catch (error2) {
      coercedError = coerceError(error2);
    }
  }
  if (i === len)
    throw coercedError;
}
function coerceError(error) {
  return error instanceof Error ? error : Error(JSON.stringify(error));
}
function read() {
  if (this._state === STATE_DISPOSED)
    return this._value;
  if (currentObserver && !this._effect) {
    if (!currentObservers && currentObserver._sources && currentObserver._sources[currentObserversIndex] == this) {
      currentObserversIndex++;
    } else if (!currentObservers)
      currentObservers = [this];
    else
      currentObservers.push(this);
  }
  if (this._compute)
    updateCheck(this);
  return this._value;
}
function write(newValue) {
  const value = isFunction$1(newValue) ? newValue(this._value) : newValue;
  if (this._changed(this._value, value)) {
    this._value = value;
    if (this._observers) {
      for (let i = 0; i < this._observers.length; i++) {
        notify(this._observers[i], STATE_DIRTY);
      }
    }
  }
  return this._value;
}
const ScopeNode = function Scope() {
  this[SCOPE] = null;
  this._nextSibling = null;
  this._prevSibling = null;
  if (currentScope)
    currentScope.append(this);
};
const ScopeProto = ScopeNode.prototype;
ScopeProto._context = defaultContext;
ScopeProto._handlers = null;
ScopeProto._compute = null;
ScopeProto._disposal = null;
ScopeProto.append = function(child) {
  child[SCOPE] = this;
  child._prevSibling = this;
  if (this._nextSibling) {
    if (child._nextSibling) {
      let tail = child._nextSibling;
      while (tail._nextSibling)
        tail = tail._nextSibling;
      tail._nextSibling = this._nextSibling;
      this._nextSibling._prevSibling = tail;
    } else {
      child._nextSibling = this._nextSibling;
      this._nextSibling._prevSibling = child;
    }
  }
  this._nextSibling = child;
  child._context = child._context === defaultContext ? this._context : { ...this._context, ...child._context };
  if (this._handlers) {
    child._handlers = !child._handlers ? this._handlers : [...child._handlers, ...this._handlers];
  }
};
ScopeProto.dispose = function() {
  dispose.call(this);
};
function createScope() {
  return new ScopeNode();
}
const ComputeNode = function Computation(initialValue, compute2, options) {
  ScopeNode.call(this);
  this._state = compute2 ? STATE_DIRTY : STATE_CLEAN;
  this._init = false;
  this._effect = false;
  this._sources = null;
  this._observers = null;
  this._value = initialValue;
  this.id = options?.id ?? (this._compute ? "computed" : "signal");
  if (compute2)
    this._compute = compute2;
  if (options && options.dirty)
    this._changed = options.dirty;
};
const ComputeProto = ComputeNode.prototype;
Object.setPrototypeOf(ComputeProto, ScopeProto);
ComputeProto._changed = isNotEqual;
ComputeProto.call = read;
function createComputation(initialValue, compute2, options) {
  return new ComputeNode(initialValue, compute2, options);
}
function isNotEqual(a, b) {
  return a !== b;
}
function isFunction$1(value) {
  return typeof value === "function";
}
function updateCheck(node) {
  if (node._state === STATE_CHECK) {
    for (let i = 0; i < node._sources.length; i++) {
      updateCheck(node._sources[i]);
      if (node._state === STATE_DIRTY) {
        break;
      }
    }
  }
  if (node._state === STATE_DIRTY)
    update(node);
  else
    node._state = STATE_CLEAN;
}
function cleanup(node) {
  if (node._nextSibling && node._nextSibling[SCOPE] === node)
    dispose.call(node, false);
  if (node._disposal)
    emptyDisposal(node);
  node._handlers = node[SCOPE] ? node[SCOPE]._handlers : null;
}
function update(node) {
  let prevObservers = currentObservers, prevObserversIndex = currentObserversIndex;
  currentObservers = null;
  currentObserversIndex = 0;
  try {
    cleanup(node);
    const result = compute(node, node._compute, node);
    if (currentObservers) {
      if (node._sources)
        removeSourceObservers(node, currentObserversIndex);
      if (node._sources && currentObserversIndex > 0) {
        node._sources.length = currentObserversIndex + currentObservers.length;
        for (let i = 0; i < currentObservers.length; i++) {
          node._sources[currentObserversIndex + i] = currentObservers[i];
        }
      } else {
        node._sources = currentObservers;
      }
      let source;
      for (let i = currentObserversIndex; i < node._sources.length; i++) {
        source = node._sources[i];
        if (!source._observers)
          source._observers = [node];
        else
          source._observers.push(node);
      }
    } else if (node._sources && currentObserversIndex < node._sources.length) {
      removeSourceObservers(node, currentObserversIndex);
      node._sources.length = currentObserversIndex;
    }
    if (!node._effect && node._init) {
      write.call(node, result);
    } else {
      node._value = result;
      node._init = true;
    }
  } catch (error) {
    if (!node._init && typeof node._value === "undefined") {
      console.error(
        `computed \`${node.id}\` threw error during first run, this can be fatal.

Solutions:

1. Set the \`initial\` option to silence this error`,
        "\n2. Or, use an `effect` if the return value is not being used",
        "\n\n",
        error
      );
    }
    handleError(node, error);
    if (node._state === STATE_DIRTY) {
      cleanup(node);
      if (node._sources)
        removeSourceObservers(node, 0);
    }
    return;
  }
  currentObservers = prevObservers;
  currentObserversIndex = prevObserversIndex;
  node._state = STATE_CLEAN;
}
function notify(node, state) {
  if (node._state >= state)
    return;
  if (node._effect && node._state === STATE_CLEAN) {
    effects.push(node);
    if (!scheduledEffects)
      flushEffects();
  }
  node._state = state;
  if (node._observers) {
    for (let i = 0; i < node._observers.length; i++) {
      notify(node._observers[i], STATE_CHECK);
    }
  }
}
function removeSourceObservers(node, index) {
  let source, swap;
  for (let i = index; i < node._sources.length; i++) {
    source = node._sources[i];
    if (source._observers) {
      swap = source._observers.indexOf(node);
      source._observers[swap] = source._observers[source._observers.length - 1];
      source._observers.pop();
    }
  }
}
function signal(initialValue, options) {
  const node = createComputation(initialValue, null, options), signal2 = read.bind(node);
  signal2.node = node;
  signal2[SCOPE] = true;
  signal2.set = write.bind(node);
  return signal2;
}
function isReadSignal(fn) {
  return isFunction$1(fn) && SCOPE in fn;
}
function computed(compute2, options) {
  const node = createComputation(
    options?.initial,
    compute2,
    options
  ), signal2 = read.bind(node);
  signal2[SCOPE] = true;
  signal2.node = node;
  return signal2;
}
function effect$1(effect2, options) {
  const signal2 = createComputation(
    null,
    function runEffect() {
      let effectResult = effect2();
      isFunction$1(effectResult) && onDispose(effectResult);
      return null;
    },
    { id: options?.id ?? "effect" }
  );
  signal2._effect = true;
  update(signal2);
  {
    return function stopEffect() {
      dispose.call(signal2, true);
    };
  }
}
function isWriteSignal(fn) {
  return isReadSignal(fn) && "set" in fn;
}
function noop(...args) {
}
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isNil(value) {
  return isNull(value) || isUndefined(value);
}
function isObject(value) {
  return value?.constructor === Object;
}
function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isString(value) {
  return typeof value === "string";
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isFunction(value) {
  return typeof value === "function";
}
function isArray(value) {
  return Array.isArray(value);
}
const effect = IS_SERVER ? serverEffect : effect$1;
function serverEffect(effect2, options) {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "test") {
    return effect$1(effect2, options);
  }
  return noop;
}
var _a$1;
const EVENT = IS_SERVER ? class Event2 {
} : Event, DOM_EVENT = Symbol("DOM_EVENT");
class DOMEvent extends EVENT {
  constructor(type, ...init) {
    super(type, init[0]);
    this[_a$1] = true;
    this.triggers = new EventTriggers();
    this.detail = init[0]?.detail;
    const trigger = init[0]?.trigger;
    if (trigger)
      this.triggers.add(trigger);
  }
  /**
   * The preceding event that was responsible for this event being fired.
   */
  get trigger() {
    return this.triggers.source;
  }
  /**
   * The origin event that lead to this event being fired.
   */
  get originEvent() {
    return this.triggers.origin;
  }
  /**
   * Whether the origin event was triggered by the user.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted}
   */
  get isOriginTrusted() {
    return this.triggers.origin?.isTrusted ?? false;
  }
}
_a$1 = DOM_EVENT;
class EventTriggers {
  constructor() {
    this.chain = [];
  }
  get source() {
    return this.chain[0];
  }
  get origin() {
    return this.chain[this.chain.length - 1];
  }
  /**
   * Appends the event to the end of the chain.
   */
  add(event) {
    this.chain.push(event);
    if (isDOMEvent(event)) {
      this.chain.push(...event.triggers);
    }
  }
  /**
   * Removes the event from the chain and returns it (if found).
   */
  remove(event) {
    return this.chain.splice(this.chain.indexOf(event), 1)[0];
  }
  /**
   * Returns whether the chain contains the given `event`.
   */
  has(event) {
    return this.chain.some((e) => e === event);
  }
  /**
   * Returns whether the chain contains the given event type.
   */
  hasType(type) {
    return !!this.findType(type);
  }
  /**
   * Returns the first event with the given `type` found in the chain.
   */
  findType(type) {
    return this.chain.find((e) => e.type === type);
  }
  /**
   * Walks an event chain on a given `event`, and invokes the given `callback` for each trigger event.
   */
  walk(callback) {
    for (const event of this.chain) {
      const returnValue = callback(event);
      if (returnValue)
        return [event, returnValue];
    }
  }
  [Symbol.iterator]() {
    return this.chain.values();
  }
}
function isDOMEvent(event) {
  return !!event?.[DOM_EVENT];
}
function walkTriggerEventChain(event, callback) {
  if (!isDOMEvent(event))
    return;
  return event.triggers.walk(callback);
}
function findTriggerEvent(event, type) {
  return isDOMEvent(event) ? event.triggers.findType(type) : void 0;
}
function hasTriggerEvent(event, type) {
  return !!findTriggerEvent(event, type);
}
function appendTriggerEvent(event, trigger) {
  if (trigger)
    event.triggers.add(trigger);
}
class EventsTarget extends EventTarget {
  addEventListener(type, callback, options) {
    return super.addEventListener(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    return super.removeEventListener(type, callback, options);
  }
}
function listenEvent(target, type, handler, options) {
  if (IS_SERVER)
    return noop;
  target.addEventListener(type, handler, options);
  return onDispose(() => target.removeEventListener(type, handler, options));
}
function isPointerEvent(event) {
  return !!event?.type.startsWith("pointer");
}
function isTouchEvent(event) {
  return !!event?.type.startsWith("touch");
}
function isMouseEvent(event) {
  return /^(click|mouse)/.test(event?.type ?? "");
}
function isKeyboardEvent(event) {
  return !!event?.type.startsWith("key");
}
function isKeyboardClick(event) {
  return isKeyboardEvent(event) && (event.key === "Enter" || event.key === " ");
}
function setAttribute(host, name, value) {
  if (!host)
    return;
  else if (!value && value !== "" && value !== 0) {
    host.removeAttribute(name);
  } else {
    const attrValue = value === true ? "" : value + "";
    if (host.getAttribute(name) !== attrValue) {
      host.setAttribute(name, attrValue);
    }
  }
}
function setStyle(host, property, value) {
  if (!host)
    return;
  else if (!value && value !== 0) {
    host.style.removeProperty(property);
  } else {
    host.style.setProperty(property, value + "");
  }
}
function unwrap(fn) {
  return isFunction(fn) ? fn() : fn;
}
function unwrapDeep(fn) {
  let value = fn;
  while (typeof value === "function")
    value = value.call(this);
  return value;
}
function createContext(provide) {
  return { id: Symbol(), provide };
}
function provideContext(context, value, scope = getScope()) {
  if (!scope) {
    throw Error("[maverick] attempting to provide context outside root");
  }
  const hasProvidedValue = !isUndefined(value);
  if (!hasProvidedValue && !context.provide) {
    throw Error("[maverick] context can not be provided without a value or `provide` function");
  }
  setContext(context.id, hasProvidedValue ? value : context.provide?.(), scope);
}
function useContext(context) {
  const value = getContext(context.id);
  if (isUndefined(value)) {
    throw Error("[maverick] attempting to use context without providing first");
  }
  return value;
}
function hasProvidedContext(context) {
  return !isUndefined(getContext(context.id));
}
const PROPS = /* @__PURE__ */ Symbol("PROPS");
const METHODS = /* @__PURE__ */ Symbol("METHODS");
const ON_DISPATCH = /* @__PURE__ */ Symbol("ON_DISPATCH");
var _a;
const EMPTY_PROPS = {};
class Instance {
  constructor(Component2, scope, init) {
    this[_a] = null;
    this.$el = signal(null);
    this.a = null;
    this.d = null;
    this.f = null;
    this.g = null;
    this.e = null;
    this.o = false;
    this.i = EMPTY_PROPS;
    this.b = null;
    this.c = null;
    this.l = [];
    this.m = [];
    this.j = [];
    this.n = [];
    this.d = scope;
    if (init?.scope)
      init.scope.append(scope);
    let stateFactory = Component2.state, props = Component2.props;
    if (stateFactory) {
      this.h = stateFactory.create();
      this.k = new Proxy(this.h, {
        get: (_, prop2) => this.h[prop2]()
      });
      provideContext(stateFactory, this.h);
    }
    if (props) {
      this.i = createInstanceProps(props);
      if (init?.props) {
        for (const prop2 of Object.keys(init.props)) {
          this.i[prop2]?.set(init.props[prop2]);
        }
      }
    }
    onDispose(this.p.bind(this));
  }
  w() {
    scoped(() => {
      for (const callback of this.l)
        callback();
    }, this.d);
  }
  x(el) {
    if (this.a)
      return;
    this.a = el;
    this.$el.set(el);
    {
      el.$$COMPONENT_NAME = this.e?.constructor.name;
    }
    scoped(() => {
      this.f = createScope();
      scoped(() => {
        for (const callback of this.m)
          callback(this.a);
        this.q();
        this.r();
      }, this.f);
    }, this.d);
    el.dispatchEvent(new Event("attached"));
  }
  s() {
    this.f?.dispose();
    this.f = null;
    this.g = null;
    if (this.a) {
      this.a.$$COMPONENT_NAME = null;
    }
    this.a = null;
    this.$el.set(null);
  }
  y() {
    if (!this.a || !this.f || !this.j.length)
      return;
    scoped(() => {
      this.g = createScope();
      scoped(() => {
        for (const callback of this.j)
          callback(this.a);
      }, this.g);
    }, this.f);
  }
  z() {
    this.g?.dispose();
    this.g = null;
  }
  p() {
    if (this.o)
      return;
    this.o = true;
    scoped(() => {
      for (const callback of this.n)
        callback(this.a);
    }, this.d);
    const el = this.a;
    this.s();
    this.d.dispose();
    this.l.length = 0;
    this.m.length = 0;
    this.j.length = 0;
    this.n.length = 0;
    this.e = null;
    this.b = null;
    this.c = null;
    this.i = EMPTY_PROPS;
    this.d = null;
    this.k = EMPTY_PROPS;
    this.h = null;
    if (el)
      delete el.$;
  }
  t(target) {
    if (target.onSetup)
      this.l.push(target.onSetup.bind(target));
    if (target.onAttach)
      this.m.push(target.onAttach.bind(target));
    if (target.onConnect)
      this.j.push(target.onConnect.bind(target));
    if (target.onDestroy)
      this.n.push(target.onDestroy.bind(target));
  }
  q() {
    if (!this.b)
      return;
    for (const name of Object.keys(this.b)) {
      if (IS_SERVER) {
        setAttribute(this.a, name, unwrapDeep.call(this.e, this.b[name]));
      } else if (isFunction(this.b[name])) {
        effect(this.u.bind(this, name));
      } else {
        setAttribute(this.a, name, this.b[name]);
      }
    }
  }
  r() {
    if (!this.c)
      return;
    for (const name of Object.keys(this.c)) {
      if (IS_SERVER) {
        setStyle(this.a, name, unwrapDeep.call(this.e, this.c[name]));
      } else if (isFunction(this.c[name])) {
        effect(this.v.bind(this, name));
      } else {
        setStyle(this.a, name, this.c[name]);
      }
    }
  }
  u(name) {
    setAttribute(this.a, name, this.b[name].call(this.e));
  }
  v(name) {
    setStyle(this.a, name, this.c[name].call(this.e));
  }
}
_a = ON_DISPATCH;
function createInstanceProps(props) {
  const $props = {};
  for (const name of Object.keys(props)) {
    const def = props[name];
    $props[name] = signal(def, def);
  }
  return $props;
}
let currentInstance = { $$: null };
function createComponent(Component2, init) {
  return root(() => {
    currentInstance.$$ = new Instance(Component2, getScope(), init);
    const component = new Component2();
    currentInstance.$$.e = component;
    currentInstance.$$ = null;
    return component;
  });
}
class ViewController extends EventTarget {
  constructor() {
    super();
    if (currentInstance.$$)
      this.attach(currentInstance);
  }
  get el() {
    return this.$$.a;
  }
  get $el() {
    return this.$$.$el();
  }
  get scope() {
    return this.$$.d;
  }
  get attachScope() {
    return this.$$.f;
  }
  get connectScope() {
    return this.$$.g;
  }
  /** @internal */
  get $props() {
    return this.$$.i;
  }
  /** @internal */
  get $state() {
    return this.$$.h;
  }
  get state() {
    return this.$$.k;
  }
  attach({ $$ }) {
    this.$$ = $$;
    $$.t(this);
    return this;
  }
  addEventListener(type, callback, options) {
    if (!this.el) {
      const name = this.constructor.name;
      console.warn(`[maverick] adding event listener to \`${name}\` before element is attached`);
    }
    this.listen(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    this.el?.removeEventListener(type, callback, options);
  }
  /**
   * This method can be used to specify attributes that should be set on the host element. Any
   * attributes that are assigned to a function will be considered a signal and updated accordingly.
   */
  setAttributes(attributes) {
    if (!this.$$.b)
      this.$$.b = {};
    Object.assign(this.$$.b, attributes);
  }
  /**
   * This method can be used to specify styles that should set be set on the host element. Any
   * styles that are assigned to a function will be considered a signal and updated accordingly.
   */
  setStyles(styles) {
    if (!this.$$.c)
      this.$$.c = {};
    Object.assign(this.$$.c, styles);
  }
  /**
   * This method is used to satisfy the CSS variables contract specified on the current
   * component. Other CSS variables can be set via the `setStyles` method.
   */
  setCSSVars(vars) {
    this.setStyles(vars);
  }
  /**
   * Type-safe utility for creating component DOM events.
   */
  createEvent(type, ...init) {
    return new DOMEvent(type, init[0]);
  }
  /**
   * Creates a `DOMEvent` and dispatches it from the host element. This method is typed to
   * match all component events.
   */
  dispatch(type, ...init) {
    if (IS_SERVER || !this.el)
      return false;
    const event = type instanceof Event ? type : new DOMEvent(type, init[0]);
    Object.defineProperty(event, "target", {
      get: () => this.$$.e
    });
    return untrack(() => {
      this.$$[ON_DISPATCH]?.(event);
      return this.el.dispatchEvent(event);
    });
  }
  dispatchEvent(event) {
    return this.dispatch(event);
  }
  /**
   * Adds an event listener for the given `type` and returns a function which can be invoked to
   * remove the event listener.
   *
   * - The listener is removed if the current scope is disposed.
   * - This method is safe to use on the server (noop).
   */
  listen(type, handler, options) {
    if (IS_SERVER || !this.el)
      return noop;
    return listenEvent(this.el, type, handler, options);
  }
}
class Component extends ViewController {
  subscribe(callback) {
    if (!this.state) {
      const name = this.constructor.name;
      throw Error(
        `[maverick] component \`${name}\` can not be subscribed to because it has no internal state`
      );
    }
    return scoped(() => effect(() => callback(this.state)), this.$$.d);
  }
  destroy() {
    this.$$.p();
  }
}
function prop(target, propertyKey, descriptor) {
  if (!target[PROPS])
    target[PROPS] = /* @__PURE__ */ new Set();
  target[PROPS].add(propertyKey);
}
function method(target, propertyKey, descriptor) {
  if (!target[METHODS])
    target[METHODS] = /* @__PURE__ */ new Set();
  target[METHODS].add(propertyKey);
}
class State {
  constructor(record) {
    this.id = Symbol("STATE");
    this.record = record;
    this.A = Object.getOwnPropertyDescriptors(record);
  }
  create() {
    const store = {}, state = new Proxy(store, { get: (_, prop2) => store[prop2]() });
    for (const name of Object.keys(this.record)) {
      const getter = this.A[name].get;
      store[name] = getter ? computed(getter.bind(state)) : signal(this.record[name]);
    }
    return store;
  }
  reset(record, filter) {
    for (const name of Object.keys(record)) {
      if (!this.A[name].get && (!filter || filter(name))) {
        record[name].set(this.record[name]);
      }
    }
  }
}
function useState(state) {
  return useContext(state);
}
function camelToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function kebabToCamelCase(str) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}
function kebabToPascalCase(str) {
  return kebabToTitleCase(str).replace(/\s/g, "");
}
function kebabToTitleCase(str) {
  return uppercaseFirstChar(str.replace(/-./g, (x) => " " + x[1].toUpperCase()));
}
function uppercaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const ReactScopeContext = React.createContext(null);
ReactScopeContext.displayName = "Scope";
function WithScope(scope, ...children) {
  return React.createElement(ReactScopeContext.Provider, { value: scope }, ...children);
}
function useReactScope() {
  return React.useContext(ReactScopeContext);
}
function useReactContext(context) {
  const scope = useReactScope();
  return React.useMemo(() => getContext(context.id, scope), [scope]);
}
const _ScopeProvider = class _ScopeProvider extends React.Component {
  constructor(props, context) {
    super(props);
    this.d = createScope();
    if (context)
      context.append(this.d);
    const Ctor = this.constructor;
    if (Ctor.F)
      provideContext(Ctor.F, Ctor.T?.(), this.d);
  }
  render() {
    return WithScope(this.d, this.props?.children);
  }
};
_ScopeProvider.contextType = ReactScopeContext;
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
const eventTypeToCallbackName = /* @__PURE__ */ new Map();
function createClientComponent(Component2, options) {
  const forwardComponent = React.forwardRef((props, forwardRef) => {
    let scope = React.useContext(ReactScopeContext), state = React.useRef();
    if (!state.current) {
      const _component2 = createComponent(Component2, {
        props,
        scope
      });
      _component2.$$.w();
      state.current = {
        a: null,
        i: /* @__PURE__ */ new Set(),
        J: {},
        e: _component2,
        Q: false,
        K: -1,
        E: -1
      };
      _component2.$$[ON_DISPATCH] = function dispatchCallback(event) {
        let callbackProp = eventTypeToCallbackName.get(event.type), args = !isUndefined(event.detail) ? [event.detail, event] : [event];
        if (!callbackProp) {
          eventTypeToCallbackName.set(
            event.type,
            callbackProp = `on${kebabToPascalCase(event.type)}`
          );
        }
        state.current.J[callbackProp]?.(...args);
      };
    }
    const onRefChange = React.useCallback((el) => {
      const $state = state.current;
      if (!$state.Q) {
        $state.a = el;
        return;
      }
      window.cancelAnimationFrame($state.K);
      $state.K = window.requestAnimationFrame(() => {
        $state.K = -1;
        if ($state.a === el)
          return;
        $state.a = el;
        const { e: _component2 } = $state;
        if (el) {
          _component2.$$.x(el);
          $state.E = window.requestAnimationFrame(() => {
            _component2.$$.y();
            $state.E = -1;
          });
        } else {
          window.cancelAnimationFrame($state.E);
          $state.E = -1;
          _component2.$$.s();
        }
      });
    }, []);
    const onAttach = React.useCallback(() => {
      const $state = state.current, { a: _el, e: _component2 } = $state;
      if (_el) {
        _component2.$$.x(_el);
        $state.E = window.requestAnimationFrame(() => {
          _component2.$$.y();
          $state.E = -1;
        });
      }
      setRef(forwardRef, _component2);
      $state.Q = true;
      return function onDetach() {
        const $state2 = state.current;
        window.cancelAnimationFrame($state2.E);
        $state2.E = -1;
        $state2.e.$$.s();
        $state2.Q = false;
      };
    }, []);
    React.useEffect(() => {
      return function onDestroy() {
        const { a: _el, e: _component2, K: _refChangeId, E: _connectId } = state.current;
        if (_el || !isFunction(props.children))
          return;
        window.cancelAnimationFrame(_refChangeId);
        window.cancelAnimationFrame(_connectId);
        _component2.$$[ON_DISPATCH] = null;
        _component2.$$.p();
        state.current.J = {};
        setRef(forwardRef, null);
      };
    }, []);
    React.useEffect(tick);
    let attrs = {}, { e: _component, i: _props } = state.current, { children, ...__props } = props;
    if (options.props.size) {
      let $props = _component.$$.i, seen = /* @__PURE__ */ new Set();
      let callbacks = {};
      state.current.J = callbacks;
      for (const prop2 of Object.keys(__props)) {
        if (options.props.has(prop2)) {
          $props[prop2].set(__props[prop2]);
          seen.add(prop2);
          _props.delete(prop2);
        } else if (!options.events?.has(prop2) && !options.eventsRE?.test(prop2)) {
          attrs[prop2] = __props[prop2];
        } else if (prop2.startsWith("on")) {
          callbacks[prop2] = __props[prop2];
        }
      }
      for (const prop2 of _props) {
        $props[prop2].set(Component2.props[prop2]);
      }
      state.current.i = seen;
    } else {
      let callbacks = {};
      state.current.J = callbacks;
      for (const prop2 of Object.keys(__props)) {
        if (!options.events?.has(prop2) && !options.eventsRE?.test(prop2)) {
          attrs[prop2] = __props[prop2];
        } else if (prop2.startsWith("on")) {
          callbacks[prop2] = __props[prop2];
        }
      }
    }
    return WithScope(
      _component.scope,
      React.createElement(AttachEffect, { effect: onAttach }),
      isFunction(children) ? children?.(
        {
          ...attrs,
          suppressHydrationWarning: true,
          ref: onRefChange
        },
        _component
      ) : children
    );
  });
  forwardComponent.displayName = Component2.name + "Bridge";
  return forwardComponent;
}
function AttachEffect({ effect: effect2 }) {
  React.useEffect(effect2, []);
  return null;
}
function escape(value, isAttr = false) {
  const type = typeof value;
  if (type !== "string") {
    if (!isAttr && type === "function")
      return escape(value());
    if (isAttr && type === "boolean")
      return value + "";
    return value;
  }
  const delimeter = isAttr ? '"' : "<", escapeDelimeter = isAttr ? "&quot;" : "&lt;";
  let iDelimeter = value.indexOf(delimeter), isAmpersand = value.indexOf("&");
  if (iDelimeter < 0 && isAmpersand < 0)
    return value;
  let left = 0, out = "";
  while (iDelimeter >= 0 && isAmpersand >= 0) {
    if (iDelimeter < isAmpersand) {
      if (left < iDelimeter)
        out += value.substring(left, iDelimeter);
      out += escapeDelimeter;
      left = iDelimeter + 1;
      iDelimeter = value.indexOf(delimeter, left);
    } else {
      if (left < isAmpersand)
        out += value.substring(left, isAmpersand);
      out += "&amp;";
      left = isAmpersand + 1;
      isAmpersand = value.indexOf("&", left);
    }
  }
  if (iDelimeter >= 0) {
    do {
      if (left < iDelimeter)
        out += value.substring(left, iDelimeter);
      out += escapeDelimeter;
      left = iDelimeter + 1;
      iDelimeter = value.indexOf(delimeter, left);
    } while (iDelimeter >= 0);
  } else
    while (isAmpersand >= 0) {
      if (left < isAmpersand)
        out += value.substring(left, isAmpersand);
      out += "&amp;";
      left = isAmpersand + 1;
      isAmpersand = value.indexOf("&", left);
    }
  return left < value.length ? out + value.substring(left) : out;
}
const SETUP = /* @__PURE__ */ Symbol("SETUP");
const classSplitRE = /\s+/;
function parseClassAttr(tokens, attrValue) {
  const classes = attrValue.trim().split(classSplitRE);
  for (const token of classes)
    tokens.add(token);
}
const styleSplitRE = /\s*:\s*/;
const stylesDelimeterRE = /\s*;\s*/;
function parseStyleAttr(tokens, attrValue) {
  const styles = attrValue.trim().split(stylesDelimeterRE);
  for (let i = 0; i < styles.length; i++) {
    if (styles[i] === "")
      continue;
    const [name, value] = styles[i].split(styleSplitRE);
    tokens.set(name, value);
  }
}
class MaverickServerElement {
  constructor(component) {
    this.keepAlive = false;
    this.forwardKeepAlive = true;
    this.attributes = new ServerAttributes();
    this.style = new ServerStyle();
    this.classList = new ServerClassList();
    this.$ = component;
  }
  get $props() {
    return this.$.$$.i;
  }
  get $state() {
    return this.$.$$.h;
  }
  get state() {
    return this.$.state;
  }
  setup() {
    const instance = this.$.$$;
    scoped(() => {
      if (this.hasAttribute("class")) {
        parseClassAttr(this.classList.tokens, this.getAttribute("class"));
      }
      if (this.hasAttribute("style")) {
        parseStyleAttr(this.style.tokens, this.getAttribute("style"));
      }
      instance.w();
      instance.x(this);
      if (this.classList.length > 0) {
        this.setAttribute("class", this.classList.toString());
      }
      if (this.style.length > 0) {
        this.setAttribute("style", this.style.toString());
      }
      if (this.keepAlive) {
        this.setAttribute("keep-alive", "");
      }
    }, instance.d);
  }
  getAttribute(name) {
    return this.attributes.getAttribute(name);
  }
  setAttribute(name, value) {
    this.attributes.setAttribute(name, value);
  }
  hasAttribute(name) {
    return this.attributes.hasAttribute(name);
  }
  removeAttribute(name) {
    return this.attributes.removeAttribute(name);
  }
  [SETUP]() {
  }
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent() {
    return false;
  }
  subscribe() {
    return noop;
  }
  destroy() {
    this.$.destroy();
  }
}
class ServerAttributes {
  constructor() {
    this.Z = /* @__PURE__ */ new Map();
  }
  get length() {
    return this.Z.size;
  }
  get tokens() {
    return this.Z;
  }
  getAttribute(name) {
    return this.Z.get(name) ?? null;
  }
  hasAttribute(name) {
    return this.Z.has(name);
  }
  setAttribute(name, value) {
    this.Z.set(name, value + "");
  }
  removeAttribute(name) {
    this.Z.delete(name);
  }
  toString() {
    if (this.Z.size === 0)
      return "";
    let result = "";
    for (const [name, value] of this.Z) {
      result += ` ${name}="${escape(value, true)}"`;
    }
    return result;
  }
}
class ServerStyle {
  constructor() {
    this.Z = /* @__PURE__ */ new Map();
  }
  get length() {
    return this.Z.size;
  }
  get tokens() {
    return this.Z;
  }
  getPropertyValue(prop2) {
    return this.Z.get(prop2) ?? "";
  }
  setProperty(prop2, value) {
    this.Z.set(prop2, value ?? "");
  }
  removeProperty(prop2) {
    const value = this.Z.get(prop2);
    this.Z.delete(prop2);
    return value ?? "";
  }
  toString() {
    if (this.Z.size === 0)
      return "";
    let result = "";
    for (const [name, value] of this.Z) {
      result += `${name}: ${value};`;
    }
    return result;
  }
}
class ServerClassList {
  constructor() {
    this.Z = /* @__PURE__ */ new Set();
  }
  get length() {
    return this.Z.size;
  }
  get tokens() {
    return this.Z;
  }
  add(...tokens) {
    for (const token of tokens) {
      this.Z.add(token);
    }
  }
  contains(token) {
    return this.Z.has(token);
  }
  remove(token) {
    this.Z.delete(token);
  }
  replace(token, newToken) {
    if (!this.Z.has(token))
      return false;
    this.Z.delete(token);
    this.Z.add(newToken);
    return true;
  }
  toggle(token, force) {
    if (force !== true && (this.Z.has(token) || force === false)) {
      this.Z.delete(token);
      return false;
    } else {
      this.Z.add(token);
      return true;
    }
  }
  toString() {
    return Array.from(this.Z).join(" ");
  }
}
const attrsToProps = {
  acceptcharset: "acceptCharset",
  "accept-charset": "acceptCharset",
  accesskey: "accessKey",
  allowfullscreen: "allowFullScreen",
  autocapitalize: "autoCapitalize",
  autocomplete: "autoComplete",
  autocorrect: "autoCorrect",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  autosave: "autoSave",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  charset: "charSet",
  class: "className",
  classid: "classID",
  classname: "className",
  colspan: "colSpan",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  controlslist: "controlsList",
  crossorigin: "crossOrigin",
  dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
  datetime: "dateTime",
  defaultchecked: "defaultChecked",
  defaultvalue: "defaultValue",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback",
  enctype: "encType",
  enterkeyhint: "enterKeyHint",
  fetchpriority: "fetchPriority",
  for: "htmlFor",
  formmethod: "formMethod",
  formaction: "formAction",
  formenctype: "formEncType",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  frameborder: "frameBorder",
  hreflang: "hrefLang",
  htmlfor: "htmlFor",
  httpequiv: "httpEquiv",
  "http-equiv": "httpEquiv",
  imagesizes: "imageSizes",
  imagesrcset: "imageSrcSet",
  innerhtml: "innerHTML",
  inputmode: "inputMode",
  itemid: "itemID",
  itemprop: "itemProp",
  itemref: "itemRef",
  itemscope: "itemScope",
  itemtype: "itemType",
  keyparams: "keyParams",
  keytype: "keyType",
  marginwidth: "marginWidth",
  marginheight: "marginHeight",
  maxlength: "maxLength",
  mediagroup: "mediaGroup",
  minlength: "minLength",
  nomodule: "noModule",
  novalidate: "noValidate",
  playsinline: "playsInline",
  radiogroup: "radioGroup",
  readonly: "readOnly",
  referrerpolicy: "referrerPolicy",
  rowspan: "rowSpan",
  spellcheck: "spellCheck",
  srcdoc: "srcDoc",
  srclang: "srcLang",
  srcset: "srcSet",
  tabindex: "tabIndex",
  usemap: "useMap"
};
function createServerComponent(Component2, options) {
  function ServerComponent(props) {
    let scope = React.useContext(ReactScopeContext), component = createComponent(Component2, { props, scope }), host = new MaverickServerElement(component), attrs = {}, { style = {}, children, forwardRef, ...__props } = props;
    if (options.props.size) {
      for (const prop2 of Object.keys(__props)) {
        if (!options.props.has(prop2))
          attrs[prop2] = __props[prop2];
      }
    } else {
      attrs = __props;
    }
    host.setup();
    if (host.hasAttribute("style")) {
      for (const [name, value] of host.style.tokens) {
        style[name.startsWith("--") ? name : kebabToCamelCase(name)] = value;
      }
      host.removeAttribute("style");
    }
    for (const [attrName, attrValue] of host.attributes.tokens) {
      const propName = attrsToProps[attrName];
      if (propName) {
        if (!(propName in attrs)) {
          attrs[propName] = attrValue;
        }
        host.removeAttribute(attrName);
      }
    }
    return WithScope(
      component.$$.d,
      isFunction(children) ? children?.(
        {
          ...Object.fromEntries(host.attributes.tokens),
          ...attrs,
          style
        },
        component
      ) : children,
      React.createElement(() => {
        host.destroy();
        return null;
      })
    );
  }
  ServerComponent.displayName = Component2.name + "Bridge";
  return ServerComponent;
}
function useStateContext(state) {
  return useReactContext(state);
}
function useSignal(signal2, key) {
  const [, scheduleReactUpdate] = React.useState();
  React.useEffect(() => {
    return effect$1(() => {
      signal2();
      scheduleReactUpdate({});
    });
  }, [key ?? signal2]);
  return signal2();
}
function ariaBool(value) {
  return value ? "true" : "false";
}
function createDisposalBin() {
  const disposal = /* @__PURE__ */ new Set();
  return {
    add(...callbacks) {
      for (const callback of callbacks)
        disposal.add(callback);
    },
    empty() {
      for (const callback of disposal)
        callback();
      disposal.clear();
    }
  };
}
function useDisposalBin() {
  const disposal = createDisposalBin();
  onDispose(disposal.empty);
  return disposal;
}
function deferredPromise() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
function waitTimeout(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
function animationFrameThrottle(func) {
  if (IS_SERVER)
    return noop;
  let id = -1, lastArgs;
  function throttle(...args) {
    lastArgs = args;
    if (id >= 0)
      return;
    id = window.requestAnimationFrame(() => {
      func.apply(this, lastArgs);
      id = -1;
      lastArgs = void 0;
    });
  }
  return throttle;
}
const requestIdleCallback = IS_SERVER ? noop : typeof window !== "undefined" ? "requestIdleCallback" in window ? window.requestIdleCallback : (cb) => window.setTimeout(cb, 1) : noop;
function waitIdlePeriod(callback, options) {
  if (IS_SERVER)
    return Promise.resolve();
  return new Promise((resolve) => {
    requestIdleCallback((deadline) => {
      callback?.(deadline);
      resolve();
    }, options);
  });
}
function useSignalRecord($state) {
  const [, scheduleReactUpdate] = React.useState(), tracking = React.useRef(null);
  if (tracking.current == null) {
    tracking.current = {
      state: {},
      $update: signal({}),
      props: /* @__PURE__ */ new Set()
    };
  }
  React.useEffect(() => {
    let { state, $update, props } = tracking.current;
    return effect(() => {
      for (const prop2 of props) {
        const value = $state[prop2]();
        state[prop2] = isArray(value) ? [...value] : value;
      }
      $update();
      scheduleReactUpdate({});
    });
  }, [$state]);
  return React.useMemo(() => {
    let { state, $update, props } = tracking.current, scheduledUpdate = false;
    props.clear();
    return new Proxy(state, {
      get(_, prop2) {
        if (!props.has(prop2) && prop2 in $state) {
          props.add(prop2);
          const value = $state[prop2]();
          state[prop2] = isArray(value) ? [...value] : value;
          if (!scheduledUpdate) {
            $update.set({});
            scheduledUpdate = true;
            queueMicrotask(() => scheduledUpdate = false);
          }
        }
        return state[prop2];
      },
      set(_, prop2, newValue) {
        if (!(prop2 in $state))
          state[prop2] = newValue;
        return true;
      }
    });
  }, [$state]);
}
function createReactComponent(Component2, options) {
  if (IS_SERVER) {
    return createServerComponent(Component2, {
      props: new Set(Object.keys(Component2.props || {}))
    });
  } else {
    return createClientComponent(Component2, {
      props: new Set(Object.keys(Component2.props || {})),
      events: new Set(options?.events),
      eventsRE: options?.eventsRegex
    });
  }
}

export { waitIdlePeriod as $, noop as A, createReactComponent as B, useReactContext as C, DOMEvent as D, composeRefs as E, useReactScope as F, hasTriggerEvent as G, walkTriggerEventChain as H, findTriggerEvent as I, appendTriggerEvent as J, isPointerEvent as K, isKeyboardClick as L, isKeyboardEvent as M, EventsTarget as N, waitTimeout as O, createContext as P, useContext as Q, Component as R, State as S, isTouchEvent as T, setStyle as U, ViewController as V, getScope as W, computed as X, root as Y, unwrap as Z, kebabToCamelCase as _, useSignal as a, provideContext as a0, uppercaseFirstChar as a1, prop as a2, method as a3, ariaBool as a4, isWriteSignal as a5, hasProvidedContext as a6, useState as a7, isMouseEvent as a8, useSignalRecord as b, isNumber as c, createScope as d, effect as e, isString as f, isObject as g, isBoolean as h, isUndefined as i, deferredPromise as j, isArray as k, listenEvent as l, camelToKebabCase as m, isFunction as n, useDisposalBin as o, peek as p, onDispose as q, isNil as r, signal as s, setAttribute as t, useStateContext as u, createDisposalBin as v, isNull as w, tick as x, scoped as y, animationFrameThrottle as z };
