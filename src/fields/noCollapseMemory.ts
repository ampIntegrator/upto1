import type {PayloadHandler, SanitizedConfig} from 'payload';

/**
 * Pages and shared sections always open the same way (Nicolas, 21 Sept. 2026): every section
 * folded; inside a section, its settings folded and its rows open. Payload remembers, per user and
 * per document, which accordions were folded (document preferences, `fields.<path>.collapsed`), and
 * that memory wins over `initCollapsed`. So the preferences endpoint drops the `collapsed` entries
 * of these documents before storing: folding still works while editing, nothing is remembered.
 * Applied on the sanitised config (the preferences collection is added after the plugins).
 */
const KEYS = /^collection-(pages|sections)-/;

type Value = {fields?: Record<string, Record<string, unknown>>};

export function strippedCollapsed<T>(value: T): T {
  const v = value as Value | null;
  if (!v || typeof v !== 'object' || !v.fields) return value;
  const fields = Object.fromEntries(
    Object.entries(v.fields)
      .map(([path, prefs]) => [path, Object.fromEntries(Object.entries(prefs ?? {}).filter(([k]) => k !== 'collapsed'))] as const)
      .filter(([, prefs]) => Object.keys(prefs).length > 0),
  );
  return {...v, fields} as T;
}

export function withoutCollapseMemory(config: SanitizedConfig): SanitizedConfig {
  const preferences = config.collections.find((c) => c.slug === 'payload-preferences');
  const endpoint = Array.isArray(preferences?.endpoints) ? preferences.endpoints.find((e) => e.method === 'post' && e.path === '/:key') : undefined;
  if (!endpoint) return config;
  const original = endpoint.handler;
  const handler: PayloadHandler = async (req) => {
    const key = String(req.routeParams?.key ?? '');
    if (KEYS.test(key)) {
      const data = (await req.json?.().catch(() => ({}))) as {value?: unknown} | undefined;
      const cleaned = data && 'value' in data ? {...data, value: strippedCollapsed(data.value)} : strippedCollapsed(data);
      req.json = () => Promise.resolve(cleaned);
    }
    return original(req);
  };
  endpoint.handler = handler;
  return config;
}
