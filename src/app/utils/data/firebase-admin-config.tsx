import { initializeApp, getApps, cert ,} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = require('./85e75920eb.json')
const firebaseAdminConfig = {
  credential: cert(serviceAccount),
  databaseURL: "https://cash-fit-2dc68-default-rtdb.firebaseio.com"
}

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig)
  }
}

customInitApp()

const db = getFirestore();

export { db }