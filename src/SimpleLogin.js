const axios = require('axios')
const cfg = require('../config.json').API

const CheckAlias = async (key, alias, page_id) => new Promise(async (resolve, reject) => {
    await axios.get(cfg.endpoint + `v2/aliases?page_id=${page_id}`, {
        headers: {
            Authentication: key
        }
    }).then(result => {
        result.data.aliases.forEach((data, n) => {
            if (data.email.includes(alias) ?? undefined !== undefined) {
                resolve(result.data.aliases[n])
            }
        })
        resolve(false)
    })
})

const ToggleAlias = async (key, alias) => new Promise(async (resolve, reject) => {
    await axios.post(cfg.endpoint + `aliases/${alias}/toggle`, {}, {
        headers: {
            Authentication: key
        }
    }).then(result => {
        resolve(result.data.enabled)
    })
})

const GetDomainSignedSuffix = async (key, domain) => new Promise(async (resolve, reject) => {
    await axios.get(cfg.endpoint + `v5/alias/options?hostname=` + domain, {
        headers: {
            Authentication: key
        }
    }).then(result => {
        result.data.suffixes.forEach((data, n) => {
            if (data.suffix.includes(domain)?? undefined !== undefined) {
                resolve(result.data.suffixes[n])
            }
        })
        reject(false)
    })
})

const AddReverseAlias = async (key, aliasid, contact) => new Promise(async (resolve, reject) => {
    await axios.post(cfg.endpoint + `aliases/${aliasid}/contacts`, {
        contact: contact
    }, {
        headers: {
            Authentication: key,
            'Content-Type': 'application/json'
        }
    }).then(result => {
        resolve(result.data)
    }).catch(err => reject(false))
})

const CheckMailBox = async (key, hotmail) => new Promise(async (resolve, reject) => {
    await axios.get(cfg.endpoint + `v2/mailboxes`, {
        headers: {
            Authentication: key
        }
    }).then(result => {
        result.data.mailboxes.forEach((data, n) => {
            if (data.email === hotmail) {
                resolve(result.data.mailboxes[n])
            }
        })
        resolve(false)
    })
})

const AddMailBox = async (key, hotmail) => new Promise(async (resolve, reject) => {
    await axios.post(cfg.endpoint + `mailboxes`, {
        email: hotmail
    }, {
        headers: {
            Authentication: key
        }
    }).then(result => {
        resolve(result.data)
    }).catch(err => reject(false))
})

const CreateAlias = async (key, suffix, mail, noreplyAlias, note) => new Promise(async (resolve, reject) => {
    await axios.post(cfg.endpoint + `v3/alias/custom/new`, {
        "alias_prefix": noreplyAlias,
        "signed_suffix": suffix,
        "mailbox_ids": [mail],
        note: note
    }, {
        headers: {
            Authentication: key,
            'Content-Type': 'application/json'
        }
    }).then(result => {
        resolve(result.data)
    }).catch(err => reject(false))
})

const DeleteReverseAlias = async(contactid) => new Promise(async (resolve, reject) => {
    await axios.delete(cfg.endpoint + `contacts/${contactid}`, {
        headers: {
            Authentication: cfg['api-key']
        }
    }).then(result => {
        resolve(result.data)
    }).catch(err => reject(false))
})

const GetContacts = async (aliasid, page_id) => new Promise(async (resolve, reject) => {
    await axios.get(cfg.endpoint + `aliases/${aliasid}/contacts?page_id=${page_id}`, {
        headers: {
            Authentication: cfg['api-key']
        }
    }).then(result => {
        resolve(result.data)
    }).catch(err => reject(false))
})

module.exports = {
    CheckAlias,
    ToggleAlias,
    CheckMailBox,
    AddMailBox,
    GetDomainSignedSuffix,
    CreateAlias,
    AddReverseAlias,
    DeleteReverseAlias,
    GetContacts
}