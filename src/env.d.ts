/// <reference types="vite/client" />

interface ImportMetaENV {
	readonly VITE_API: string
}

interface ImportMeta {
	readonly env: ImportMetaENV
}
