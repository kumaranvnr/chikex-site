declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (config: GoogleIdConfiguration) => void;
                    prompt: (momentListener?: (promptMomentNotification: PromptMomentNotification) => void) => void;
                    renderButton: (parent: HTMLElement, options: GsiButtonConfiguration) => void;
                    disableAutoSelect: () => void;
                    storeCredential: (credentials: { id: string; password: string }) => void;
                    cancel: () => void;
                    onGoogleLibraryLoad: () => void;
                    revoke: (hint: string, callback: (done: RevocationResponse) => void) => void;
                };
                oauth2: {
                    initTokenClient: (config: TokenClientConfig) => TokenClient;
                    initCodeClient: (config: CodeClientConfig) => CodeClient;
                    revoke: (accessToken: string, done?: () => void) => void;
                    callback: (content: any) => void;
                };
            };
        };
    }

    interface GoogleIdConfiguration {
        client_id: string;
        auto_select?: boolean;
        callback?: (credentialResponse: CredentialResponse) => void;
        login_uri?: string;
        native_callback?: (response: { credential: string }) => void;
        cancel_on_tap_outside?: boolean;
        prompt_parent_id?: string;
        nonce?: string;
        context?: string;
        state_cookie_domain?: string;
        ux_mode?: string;
        allowed_parent_origin?: string | string[];
        intermediate_iframe_close_callback?: () => void;
    }

    interface CredentialResponse {
        credential: string;
        select_by: string;
    }

    interface PromptMomentNotification {
        isDisplayMoment: () => boolean;
        isDisplayed: () => boolean;
        isNotDisplayed: () => boolean;
        getNotDisplayedReason: () => string;
        isSkippedMoment: () => boolean;
        getSkippedReason: () => string;
        isDismissedMoment: () => boolean;
        getDismissedReason: () => string;
        getMomentType: () => string;
    }

    interface TokenClientConfig {
        client_id: string;
        scope: string;
        callback?: (response: TokenResponse) => void;
        error_callback?: (error: any) => void;
        state?: string;
        enable_granular_consent?: boolean;
        hosted_domain?: string;
        hint?: string;
        hd?: string;
    }

    interface TokenClient {
        requestAccessToken: (overrideConfig?: Partial<TokenClientConfig>) => void;
    }

    interface TokenResponse {
        access_token: string;
        expires_in: number;
        hd?: string;
        prompt: string;
        scope: string;
        state?: string;
        token_type: string;
    }

    interface CodeClientConfig {
        client_id: string;
        scope: string;
        redirect_uri?: string;
        callback?: (response: CodeResponse) => void;
        error_callback?: (error: any) => void;
        state?: string;
        enable_granular_consent?: boolean;
        hosted_domain?: string;
        hint?: string;
        hd?: string;
        ux_mode?: string;
        select_account?: boolean;
    }

    interface CodeClient {
        requestCode: () => void;
    }

    interface CodeResponse {
        code: string;
        scope: string;
        state?: string;
    }

    interface RevocationResponse {
        successful: boolean;
        error?: string;
    }

    interface GsiButtonConfiguration {
        type?: 'standard' | 'icon';
        theme?: 'outline' | 'filled_blue' | 'filled_black';
        size?: 'large' | 'medium' | 'small';
        text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
        shape?: 'rectangular' | 'pill' | 'circle' | 'square';
        logo_alignment?: 'left' | 'center';
        width?: string | number;
        locale?: string;
    }
}

export { };