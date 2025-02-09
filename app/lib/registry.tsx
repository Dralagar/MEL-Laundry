'use client'; // Ensure this is a client component

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    return <React.Fragment></React.Fragment>;
  });

  try {
    return <React.Fragment></React.Fragment>;
  } catch (error) {
    console.error('Styled-components error:', error);
    return <React.Fragment>{children}</React.Fragment>;
  }
}
