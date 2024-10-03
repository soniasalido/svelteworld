

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Ci_uENT2.js","_app/immutable/chunks/disclose-version.CkDn7PKQ.js","_app/immutable/chunks/runtime.sucA4RxE.js","_app/immutable/chunks/render.DFoel0g4.js"];
export const stylesheets = [];
export const fonts = [];
