import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface<T> {
  notify(event: EventInterface<T>): void;
  register(eventName: string, eventHandler: EventHandlerInterface<T>): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface<T>): void;
  unregisterAll(): void;
  getEventHandlers(eventName: string): EventHandlerInterface<T>[];
}
