import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';

export const metadata = {title: 'Typographie — Design system Vidomia'};

const FONTS = [
  {role: 'Titres & display', family: 'Schibsted Grotesk', token: '--font-family-heading', sample: 'Chiffrez vos travaux en 20 minutes.'},
  {role: 'Texte courant, étiquettes, boutons', family: 'Geist', token: '--font-family-body', sample: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'},
  {role: 'Accent serif éditorial', family: 'Cormorant Garamond italique 600', token: '--font-family-serif', sample: 'à votre métier.'},
  {role: 'Repères techniques (type tag) et code', family: 'Geist Mono 600', token: '--font-family-mono', sample: '20 MIN CHRONO · const silo = "blue";'},
];

const HEADINGS = [1, 2, 3, 4, 5, 6] as const;
const DISPLAYS = ['display-1', 'display-2', 'display-3'] as const;
const TEXTS = ['large', 'body', 'label', 'supporting', 'code', 'eyebrow', 'eyebrow-lines', 'tag'] as const;

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations"
        title="Typographie"
        lead="Quatre polices : Schibsted Grotesk, Geist, Cormorant Garamond et Geist Mono (repères techniques et code). Échelle géométrique Astryx (base 15 px, ratio 1,2) ; les titres display reprennent les clamp() Orbita."
      />

      <VStack gap={3}>
        <Heading level={2}>Familles</Heading>
        <Card padding={5}>
          <VStack gap={5}>
            {FONTS.map((f, i) => (
              <React.Fragment key={f.token}>
                {i > 0 ? <Divider /> : null}
                <HStack gap={6} vAlign="center" wrap="wrap">
                  <VStack gap={0.5} style={{minWidth: 260}}>
                    <Text type="label">{f.role}</Text>
                    <Text type="supporting">{f.family}</Text>
                    <Text type="code" size="sm" color="secondary">{f.token}</Text>
                  </VStack>
                  <Text
                    type="inherit"
                    style={{fontFamily: `var(${f.token})`, fontSize: 28, lineHeight: 1.2, fontStyle: f.token.includes('serif') ? 'italic' : undefined, fontWeight: f.token.includes('serif') ? 600 : f.token.includes('heading') ? 800 : 400}}>
                    {f.sample}
                  </Text>
                </HStack>
              </React.Fragment>
            ))}
          </VStack>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Display (titres Orbita)</Heading>
        <Text type="supporting">Heading sépare le niveau sémantique (h1…h6, pour le SEO) de l'apparence (type). C'est la convention « titre indépendant de la balise » d'Orbita.</Text>
        <Card padding={6}>
          <VStack gap={6}>
            {DISPLAYS.map((d) => (
              <VStack key={d} gap={1}>
                <Text type="tag" color="secondary">{d}</Text>
                <Heading level={2} type={d}>
                  Le chiffrage adapté <Text type="serif">à votre métier.</Text>
                </Heading>
              </VStack>
            ))}
          </VStack>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Niveaux de titre</Heading>
        <Card padding={6}>
          <VStack gap={4}>
            {HEADINGS.map((l) => (
              <HStack key={l} gap={4} vAlign="center">
                <Text type="tag" color="secondary" style={{width: 48}}>h{l}</Text>
                <Heading level={l}>Chiffrez vos travaux en 20 minutes</Heading>
              </HStack>
            ))}
          </VStack>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Types de texte</Heading>
        <Text type="supporting">Types Astryx natifs, plus les types ajoutés par le thème : eyebrow, eyebrow-lines (tête de section, avec tirets), serif, tag.</Text>
        <Card padding={6}>
          <VStack gap={4}>
            {TEXTS.map((t) => (
              <HStack key={t} gap={4} vAlign="center">
                <Text type="tag" color="secondary" style={{width: 96}}>{t}</Text>
                <Text type={t}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
              </HStack>
            ))}
            <HStack gap={4} vAlign="center">
              <Text type="tag" color="secondary" style={{width: 96}}>serif</Text>
              <Text type="body">
                Un mot <Text type="serif">signature</Text> dans une phrase.
              </Text>
            </HStack>
          </VStack>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Composition Orbita</Heading>
        <Card padding={8}>
          <VStack gap={5} hAlign="center" style={{textAlign: 'center'}}>
            <Text type="eyebrow">Notre approche</Text>
            <Heading level={2} type="display-2" justify="center">
              Le chiffrage adapté <Text type="serif">à votre métier.</Text>
            </Heading>
            <Text type="large" color="secondary" style={{maxWidth: 640}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </VStack>
        </Card>
      </VStack>
    </VStack>
  );
}
