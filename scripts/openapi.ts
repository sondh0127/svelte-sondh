import 'zx/globals';

const content = await fs.readFileSync('.env', 'utf-8');

const regexKey = /VITE_SUPABASE_ANON_KEY=(.*)/gm;
const regexHost = /VITE_SUPABASE_URL=(.*)/gm;
const matchKey = regexKey.exec(content);
const matchHost = regexHost.exec(content);

if (matchKey && matchHost) {
	const key = matchKey[1];
	const host = matchHost[1];
	await $`pnpx openapi-typescript ${host}/rest/v1/?apikey=${key} --output src/types/supabase.ts`;
}
