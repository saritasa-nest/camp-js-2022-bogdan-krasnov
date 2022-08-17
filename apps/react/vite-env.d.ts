// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {

  /** Api base url. */
  readonly VITE_API_BASE: string;

  /** Api key. */
  readonly VITE_API_KEY: string;

}

interface ImportMeta {

  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
}
