import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

type EventHandlersHashMap<T> = {
  [eventName: string]: EventHandlerInterface<T>[];
};

export default class EventDispatcher<T> implements EventDispatcherInterface<T> {
  private eventHandlers: EventHandlersHashMap<T> = {};

  notify(event: EventInterface<T>): void {
    /**
     * I hate this kind of tricky way to do things work
     * new joiners members may think this is just black magic
     */
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }
  register(eventName: string, eventHandler: EventHandlerInterface<T>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    // avoid duplicated handlers, this would probably lead to unexpected behaviour
    const handlerAlreadyRegistered = this.eventHandlers[eventName].some(
      (handler) => handler.constructor == eventHandler.constructor
    );

    if (!handlerAlreadyRegistered) {
      this.eventHandlers[eventName].push(eventHandler);
    }
  }
  unregister(eventName: string, eventHandler: EventHandlerInterface<T>): void {
    if (this.eventHandlers[eventName]) {
      const indexOf = this.eventHandlers[eventName].indexOf(eventHandler);
      if (indexOf >= 0) {
        this.eventHandlers[eventName].splice(indexOf, 1);
      }
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }

  public getEventHandlers(eventName: string): EventHandlerInterface<T>[] {
    // returns eventHandlers or empty array to avoid returning undefined
    return this.eventHandlers[eventName] || [];
  }
}
