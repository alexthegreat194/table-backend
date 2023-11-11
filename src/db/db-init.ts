import { db } from './db'
import { User } from '../entity/user'

db.initialize()
    .then(async () => {
        console.log("DB initialized")
    }).catch(err => console.log(err))