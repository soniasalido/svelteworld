

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CJQ4oBOL.js","_app/immutable/chunks/disclose-version.CkDn7PKQ.js","_app/immutable/chunks/runtime.sucA4RxE.js"];
export const stylesheets = [];
export const fonts = [];
