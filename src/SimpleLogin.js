const axios = require('axios')
const cfg = require('../config.json').API

const CheckNRAlias = async (key, noreplyAlias) => new Promise(async (resolve, reject) => {
    await axios.get(cfg.endpoint + "v2/aliases?page_id=0", {
        headers: {
            Authentication: key
        }
    }).then(result => {
        result.data.aliases.forEach((data, n) => {
            if (data.email.includes(noreplyAlias) ?? undefined !== undefined) {
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

const CheckNoReplyMail = async (key, hotmail) => new Promise(async (resolve, reject) => {
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
    })
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

module.exports = {
    CheckNRAlias,
    ToggleAlias,
    CheckNoReplyMail,
    AddMailBox,
    GetDomainSignedSuffix,
    CreateAlias
}