import {EventBus} from "./EventBus";
import {nanoid} from 'nanoid';

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6);
  protected props: object;
  protected refs: Record<string, Block> = {};
  public children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  
  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   * @returns {void}
   */
  constructor(propsWithChildren: object = {}) {
    const eventBus = new EventBus();

    const {props, children} = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: object) {
    const props: Record<string, object> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {props, children};
  }

  _removeEvents() {
    const {events = {}} = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _addEvents() {
    const {events = {}} = this.props as { events: Record<string, () => void> };
    
    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    
    const fragment = this.render();
    
    
    const newElement = fragment.firstElementChild as HTMLElement;
    
    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._removeEvents();
    
    this._element = newElement;

    this._addEvents();

  }

  protected compile(template: (context: object) => string, context: object) {

    interface contextAndStubs{
      __refs?: object;
      __children?: Array<object>;
    }

    const contextAndStubs: contextAndStubs = {...context, __refs: this.refs};


    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;
   
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contextAndStubs.__children?.forEach(({embed}: any) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: {[index: string | symbol]: object}) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;
