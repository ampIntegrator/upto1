/**
 * PostLayout — a post's body (mockup 18 .post-layout, 23 .case-main): a sidebar on the left
 * (the table of contents, or a case study's fact sheet) and the prose on the right, 760 px at
 * most. Below 1024 px the sidebar goes above the prose.
 */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {Container} from './Container';
import {Section} from './Section';
import styles from './PostLayout.module.css';

export type PostLayoutProps = {sidebar?: React.ReactNode; children: React.ReactNode};

export function PostLayout({sidebar, children}: PostLayoutProps) {
  return (
    <Section background="light" spacingTop={56} spacingBottom={96}>
      <Container>
        <VStack className={styles.grid} data-sidebar={sidebar ? true : undefined}>
          {sidebar ? <VStack as="aside" className={styles.sidebar}>{sidebar}</VStack> : null}
          <VStack as="article" className={styles.main}>
            {children}
          </VStack>
        </VStack>
      </Container>
    </Section>
  );
}
