export type NPCName =
  | "Nah'Bob"
  | 'Haroun'
  | 'Alesar'
  | 'Yaman'
  | 'Aremis'
  | 'Evona'
  | 'Wulkan'
  | 'Annushka'
  | 'Bronislav'
  | 'Draculd'
  | 'Lona'
  | 'Andre'
  | 'Dianne'
  | 'Jodi'
  | 'Leunaurd'
  | 'Risdarick'
  | 'Dalos'
  | 'Edea'
  | 'Valandril'
  | 'Dosli'
  | 'Glorin'
  | 'Rorin'
  | 'Arses'
  | 'Hasain'
  | 'Horif'
  | 'Lihsha'
  | 'Lizbeth'
  | 'P.K.'
  | 'Astrid'
  | 'Cord'
  | 'Dietrich'
  | 'Aadim'
  | 'Asha'
  | 'Haffnal'
  | 'Noranim'
  | 'Ziyad'
  | 'Drolgruth'
  | 'Ellara'
  | 'Isolde'
  | 'Cedric'
  | 'Tristan'
  | 'Omar'

export type NPC = {
  name: NPCName
  location: string
  color?: string
}
