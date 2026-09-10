/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/Button */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {Button} from '@/components/Button';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

const VARIANTS = ['primary', 'high', 'ghost', 'secondary', 'destructive'] as const;
const SIZES = ['md', 'lg'] as const;

function Matrix({arrow}: {arrow: boolean}) {
  return (
    <VStack gap={4}>
      {VARIANTS.map((v) => (
        <HStack key={v} gap={4} vAlign="center" wrap="wrap">
          <Text type="tag" color="secondary" style={{width: 96}}>{v}</Text>
          {SIZES.map((s) => (
            <Button key={s} label="Faire mon chiffrage" variant={v} size={s} arrow={arrow} />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

function Section({title, note, children}: {title: string; note?: string; children: React.ReactNode}) {
  return (
    <VStack gap={3}>
      <Heading level={3}>{title}</Heading>
      {note ? <Text type="supporting">{note}</Text> : null}
      {children}
    </VStack>
  );
}

export default function ButtonShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">Le bouton : angles vifs, Geist semi-gras, halo accent sur le primaire, fantôme bordé, variante high. Button ajoute le split-button : cellule flèche pleine hauteur, cadre intérieur qui s'ouvre au survol, flèche qui rebondit.</Text>

      <Section title="Bouton simple" note="Sans flèche : boutons de formulaires, de modales, de pieds de carte.">
        <Card padding={6}><Matrix arrow={false} /></Card>
      </Section>

      <Section title="Bouton simple · états et compléments" note="Icône Nucleo à gauche par sa clé (changeable en admin), écart icône-texte égal à la moitié du padding horizontal, chargement, désactivé, lien.">
        <Card padding={6}>
          <VStack gap={4}>
            {SIZES.map((s) => (
              <HStack key={s} gap={4} wrap="wrap" vAlign="center">
                <Text type="tag" color="secondary" style={{width: 96}}>{s}</Text>
                <Button label="Rechercher" variant="primary" size={s} iconKey="search" />
                <Button label="Télécharger" variant="ghost" size={s} iconKey="upload" />
                <Button label="Appeler" variant="secondary" size={s} iconKey="phone" />
              </HStack>
            ))}
            <HStack gap={4} wrap="wrap" vAlign="center">
              <Text type="tag" color="secondary" style={{width: 96}}>états</Text>
              <Button label="Envoi…" variant="primary" isLoading />
              <Button label="Indisponible" variant="primary" isDisabled />
              <Button label="Indisponible" variant="ghost" isDisabled />
              <Button label="Voir la méthode" variant="primary" href="/design" />
              <Button label="Voir la méthode" variant="ghost" href="/design" iconKey="external-link" />
            </HStack>
          </VStack>
        </Card>
      </Section>

      <Section title="Split-button" note="Signature Orbita, 27 des 34 boutons de la maquette. Survolez pour l'animation.">
        <Card padding={6}><Matrix arrow /></Card>
      </Section>

      <Section title="Split-button · états et compléments" note="Mêmes états avec la cellule flèche ; l'icône à gauche se combine avec la flèche.">
        <Card padding={6}>
          <HStack gap={4} wrap="wrap" vAlign="center">
            <Button label="Rechercher" variant="primary" arrow iconKey="search" />
            <Button label="Envoi…" variant="primary" arrow isLoading />
            <Button label="Indisponible" variant="primary" arrow isDisabled />
            <Button label="Voir la méthode" variant="ghost" arrow href="/design" />
          </HStack>
        </Card>
      </Section>

      <Section title="Sur nuit" note="Même composant dans une section nuit : ombre, fantôme et cadre suivent le mode.">
        <Theme theme={theme} mode="dark">
          <Card padding={6}>
            <HStack gap={4} wrap="wrap" vAlign="center">
              <Button label="Faire mon chiffrage" variant="primary" arrow />
              <Button label="Voir les tarifs" variant="high" arrow />
              <Button label="Demander une démo" variant="ghost" arrow />
              <Button label="En savoir plus" variant="ghost" iconKey="info" />
            </HStack>
          </Card>
        </Theme>
      </Section>

      <Section title="Mode bloc" note="Pleine largeur, libellé à gauche, flèche au bord droit. Cartes de prix, formulaires, drawer mobile.">
        <Card padding={6}>
          <VStack gap={3} maxWidth={420}>
            <Button label="Choisir Pro" variant="primary" arrow block />
            <Button label="Choisir Solo" variant="ghost" arrow block />
            <Button label="Choisir Agence" variant="primary" block />
          </VStack>
        </Card>
      </Section>
    </VStack>
  );
}
