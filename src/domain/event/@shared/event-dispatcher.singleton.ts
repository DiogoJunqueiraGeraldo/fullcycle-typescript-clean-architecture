import EventDispatcherAbstractFactory from "./event-dispatcher.abstract-factory";
import EventDispatcherInterface from "./event-dispatcher.interface";

type EventDispatcherCache = {
  [domain: string]: EventDispatcherInterface<any>;
};

export default class EventDispatcherSingleton {
  private static eventDispatcherCache: EventDispatcherCache = {};

  public static getEventDispatcher(domain: string) {
    if (!EventDispatcherSingleton.eventDispatcherCache[domain]) {
      EventDispatcherSingleton.eventDispatcherCache[domain] =
        EventDispatcherAbstractFactory.createEventDispatcher(domain);
    }

    return EventDispatcherSingleton.eventDispatcherCache[domain];
  }
}
