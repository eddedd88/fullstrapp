/**
 * Ported from typescript definitions at:
 * https://github.com/firebase/firebaseui-web/blob/master/types/index.d.ts
 */
declare module 'firebaseui' {
  import type { Auth as FirebaseAuth } from "firebase/auth";

  declare type CredentialHelperType = string;

  declare interface Callbacks {
    signInSuccessWithAuthResult(
      authResult: any,
      redirectUrl?: string
    ): boolean;
    signInFailure(error: AuthUIError): Promise<void>;
    uiShown(): void;
  }

  declare interface SignInOption {
    provider: string;
    authMethod?: string;
    clientId?: string;
    scopes?: string[];
    customParameters?: Object;
    requireDisplayName?: boolean;
    recaptchaParameters?: {
      type?: string;
      size?: string;
      badge?: string;
    };
    defaultCountry?: string;
    defaultNationalNumber?: string;
    loginHint?: string;
  }

  declare interface Config {
    acUiConfig?: Object;
    autoUpgradeAnonymousUsers?: boolean;
    callbacks?: Callbacks;
    credentialHelper?: CredentialHelperType;
    popupMode?: boolean;
    queryParameterForSignInSuccessUrl?: string;
    queryParameterForWidgetMode?: string;
    signInFlow?: string;
    signInOptions?: Array<string | SignInOption>;
    signInSuccessUrl?: string;
    siteName?: string;
    tosUrl?: string;
    widgetUrl?: string;
  }

  declare class AuthUI {
    static getInstance(appId?: string): AuthUI | null;
    constructor(auth: FirebaseAuth, appId?: string): AuthUI;
    disableAutoSignIn(): void;
    start(element: string | Element, config: Config): void;
    setConfig(config: Config): void;
    signIn(): void;
    reset(): void;
    delete(): Promise<void>;
    isPendingRedirect(): boolean;
  }

  declare class AuthUIError {
    constructor(): AuthUIError;
    code: string;
    message: string;
    credential: any | null;
    toJSON(): Object;
  }

  declare type CredentialHelper = {
    ACCOUNT_CHOOSER_COM: CredentialHelperType;
    GOOGLE_YOLO: CredentialHelperType;
    NONE: CredentialHelperType;
  }

  declare export var auth: {
    AuthUI: typeof AuthUI,
    AuthUIError: typeof AuthUIError,
    CredentialHelper: CredentialHelper
  }
}

declare module 'firebaseui/dist/firebaseui.css' {
  declare module.exports: any;
}
