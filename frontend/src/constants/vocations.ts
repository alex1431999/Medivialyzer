import { Vocation, VocationIdentifier } from '../types/vocation.types.ts'

export const VOCATIONS: Record<VocationIdentifier, Vocation> = {
  KNIGHT: { id: 'KNIGHT', name: 'Knight', supplies: ['Ultimate healing rune'] },
  ARCHER: { id: 'ARCHER', name: 'Archer', supplies: [] },
  DRUID: { id: 'DRUID', name: 'Druid', supplies: [] },
  MAGE: { id: 'MAGE', name: 'Mage', supplies: [] },
}
