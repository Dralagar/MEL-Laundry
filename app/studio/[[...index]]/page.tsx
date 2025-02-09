'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import StyledComponentsRegistry from '../../lib/registry'


export default function StudioPage() {
  return (
    <StyledComponentsRegistry>
      <NextStudio config={config} />
    </StyledComponentsRegistry>
  )
}   