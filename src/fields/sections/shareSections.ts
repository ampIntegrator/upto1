import type {CollectionBeforeChangeHook, RequiredDataFromCollectionSlug} from 'payload';

/**
 * Case « Enregistrer dans les sections partagées » d'un bloc Section : à l'enregistrement de
 * la page, la section est copiée dans la collection « sections » et le bloc devient un bloc
 * « Section partagée » qui la référence. Les identifiants internes des rangées, colonnes et
 * contenus sont retirés de la copie (nouvelles tables, nouveaux identifiants).
 */
type Block = {blockType?: string; blockName?: string | null; id?: string; [key: string]: unknown};

function stripIds<T>(value: T): T {
  if (Array.isArray(value)) return value.map(stripIds) as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === 'id') continue;
      out[k] = stripIds(v);
    }
    return out as T;
  }
  return value;
}

export const shareSections: CollectionBeforeChangeHook = async ({data, req}) => {
  const sections = data?.sections;
  if (!Array.isArray(sections)) return data;
  const out: Block[] = [];
  let n = 0;
  for (const block of sections as Block[]) {
    n += 1;
    if (block?.blockType !== 'section' || !block.saveAsShared) {
      out.push(block);
      continue;
    }
    const {saveAsShared: _s, sharedTitle, id: _id, blockName, blockType: _t, ...fields} = block;
    const title = typeof sharedTitle === 'string' && sharedTitle.trim() ? sharedTitle.trim() : `${typeof data.title === 'string' ? data.title : 'Page'} · section ${n}`;
    const doc = await req.payload.create({collection: 'sections', data: {...stripIds(fields), title} as RequiredDataFromCollectionSlug<'sections'>, req, locale: req.locale === 'all' ? undefined : req.locale});
    out.push({blockType: 'sharedSection', blockName: blockName ?? title, section: doc.id});
  }
  return {...data, sections: out};
};
