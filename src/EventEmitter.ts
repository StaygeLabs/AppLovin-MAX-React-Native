import { NativeModules, NativeEventEmitter } from "react-native";
import type { EventSubscription } from "react-native";
import type { AdEventObject, AdEventListener } from "./types/AdEvent";

const { AppLovinMAX } = NativeModules;

// Note that this is a singleton in ES6 module
const emitter = new NativeEventEmitter(AppLovinMAX);

const subscriptions: Record<string, EventSubscription> = { };

export const addEventListener = <T extends AdEventObject>(event: string, handler: AdEventListener<T>) => {
    const subscription: EventSubscription = emitter.addListener(event, handler);
    const currentSubscription = subscriptions[event];
    if (currentSubscription) {
        currentSubscription.remove();
    }
    subscriptions[event] = subscription;
}

export const removeEventListener = (event: string) => {
    const currentSubscription = subscriptions[event];
    if (currentSubscription) {
        currentSubscription.remove();
        delete subscriptions[event];
    }
}
