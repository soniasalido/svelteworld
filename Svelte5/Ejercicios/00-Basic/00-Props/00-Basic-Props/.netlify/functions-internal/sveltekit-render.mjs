import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.C3hBUo-i.js","app":"_app/immutable/entry/app.BuyEBYsZ.js","imports":["_app/immutable/entry/start.C3hBUo-i.js","_app/immutable/chunks/entry.BHyVII5X.js","_app/immutable/chunks/runtime.sucA4RxE.js","_app/immutable/entry/app.BuyEBYsZ.js","_app/immutable/chunks/runtime.sucA4RxE.js","_app/immutable/chunks/render.DFoel0g4.js","_app/immutable/chunks/disclose-version.CkDn7PKQ.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
