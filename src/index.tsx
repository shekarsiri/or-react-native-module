import {
  NativeModules,
  requireNativeComponent,
  type TextInputProps,
  UIManager,
  type ViewProps,
} from 'react-native';

const { ORTrackerConnector } = NativeModules;

// const LINKING_ERROR =
//   `The package '@openreplay/react-native' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo Go\n';

// interface Options {
//   crashes?: boolean;
//   analytics?: boolean;
//   performances?: boolean;
//   logs?: boolean;
//   screen?: boolean;
//   debugLogs?: boolean;
// }

interface IORTrackerConnector {
  startSession: (
    projectKey: string,
    // optionsDict: Options,
    projectUrl?: string
  ) => Promise<string>;
  multiply: (a: number, b: number) => Promise<number>;
  setMetadata: (key: string, value: string) => void;
  event: (name: string, payload?: string) => void;
  setUserID: (userID: string) => void;
  userAnonymousID: (userID: string) => void;
  networkRequest: (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    requestJSON: string,
    responseJSON: string,
    status: number,
    duration: number
  ) => void;
}

const ReactNative = NativeModules.ORTrackerConnector as IORTrackerConnector;

const RnTrackerTouchTrackingView =
  UIManager.getViewManagerConfig('RnTrackerTouchView') != null
    ? requireNativeComponent<ViewProps>('RnTrackerTouchView')
    : () => {
        throw new Error('RnTrackerTouchView; >>>>> not found');
      };

const ORTrackedInput =
  UIManager.getViewManagerConfig('RnTrackedInput') != null
    ? requireNativeComponent<TextInputProps>('RnTrackedInput')
    : () => {
        throw new Error('RnTrackedInput; >>>>> not found');
      };

const ORSanitizedView =
  UIManager.getViewManagerConfig('RnSanitizedView') != null
    ? requireNativeComponent<ViewProps>('RnSanitizedView')
    : () => {
        throw new Error('RnSanitizedView; >>>>> not found');
      };

export function start(): Promise<string> {
  return ReactNative.startSession(
    '34LtpOwyUI2ELFUNVkMn',
    // {
    //   analytics: true,
    //   crashes: true,
    //   debugLogs: true,
    //   logs: true,
    //   performances: true,
    //   screen: true,
    // },
    'https://foss.openreplau.com/ingest'
  );
}

export function multiply(a: number, b: number): Promise<number> {
  return ReactNative.multiply(a, b);
}

export function setMetadata(key: string, value: string) {
  ReactNative.setMetadata(key, value);
}

export function setUserID(userID: string) {
  ReactNative.setUserID(userID);
}

export default {
  tracker: ORTrackerConnector as IORTrackerConnector,
  start,
  multiply,
  setMetadata,
  setUserID,
  ORTouchTrackingView: RnTrackerTouchTrackingView,
  ORTrackedInput: ORTrackedInput,
  ORSanitizedView: ORSanitizedView,
  CustomView: requireNativeComponent('RnCustomView'),
};
