import get from 'lodash.get'
import set from 'lodash.set'
import firebase from 'firebase/compat/app'

export function withDocumentDatesParsed<Data extends object>(
  data: Data,
  parseDates?: (keyof Data | string)[]
) {
  const doc = { ...data }
  parseDates?.forEach(dateField => {
    if (typeof dateField !== 'string') return

    const unparsedDate = get(doc, dateField)
    if (unparsedDate) {

      if ( unparsedDate instanceof firebase.firestore.Timestamp) {

        
        const parsedDate: Date | undefined = unparsedDate.toDate?.()
        if (parsedDate) {
          set(doc, dateField, parsedDate)
        }
      }
    }
  })

  return doc
}
