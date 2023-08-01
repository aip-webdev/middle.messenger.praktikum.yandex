import { Indexed } from '../../types'

export const keys = (obj: unknown) => Object.keys(obj as Indexed)
