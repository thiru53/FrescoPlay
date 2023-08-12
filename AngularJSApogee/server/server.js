const express = require('express')
var bodyParser = require('body-parser')
var ObjectID = require('mongodb').ObjectID
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


var MongoClient = require('mongodb').MongoClient
let db;

MongoClient.connect('mongodb://localhost:27017/mail_app').then(res => {
    db = res.db('mail_app')
    autoSendInbox();
});

var autoId = 1;
function autoSendInbox() {
    var obj = {
        "header": {
            "from": "newaccount@webnxg.com",
            "date": "29/01/2020",
            "to": "newaccount@webnxg.com",
            "cc": "automate1@webnxg.com",
            "bcc": "automate3@webnxg.com",
            "subject": "automated subject"
        },
        "messageBody": "automated message " + autoId++,
        "type": "inbox"
    }
    add('ms1426478', obj)

}
setInterval(autoSendInbox, 960000);

function add(collectionName, data) {
    const collection = db.collection(collectionName)
    collection.insertOne(data)
}

function remove(collectionName, dataId) {
    const collection = db.collection(collectionName)
    collection.deleteOne({ _id: ObjectID(dataId) })
    client.close()
}

app.get('/', (req, res) => res.send('Hello World!'))

const apiS = [['/getInbox', 'inbox'], ['/getDraftMsg', 'draft'], ['/getSentMsg', 'sent']]
apiS.forEach(element => {
    app.post(element[0], (req, res) => {

        db.collection('m' + req.body.authKey).find({ type: element[1] }, { projection: { messageBody: 0, type: 0 } }).toArray(function (err, fetch) {
            if (err) throw err
            res.send(fetch)
        })

    })
})


app.post('/getMailInfo', (req, res) => {

    db.collection('m' + req.body.authKey).findOne({ _id: ObjectID(req.body._id) }, function (err, fetch) {
        if (err) throw err
        if (fetch.hasOwnProperty('readFlag')) {
            db.collection('m' + req.body.authKey).updateOne({ _id: ObjectID(fetch._id) }, { $set: { readFlag: true } }, function (err, result) {
                if (err) throw err
            })
        }
        res.send(fetch)
    })

})

app.post('/sendMail', (req, res) => {
    if (req.body.message._id) {
        db.collection('m' + req.body.authKey).deleteOne({ _id: ObjectID(req.body.message._id) }, function (err, fetch) {
            if (err) throw err

        })
    }
    let newObj = req.body.message;
    delete newObj._id;
    req.body.message.type = "sent";
    add('m' + req.body.authKey, req.body.message);

    res.sendStatus(200);
})

app.post('/deleteEmail', (req, res) => {
    db.collection('m' + req.body.authKey).deleteOne({ _id: ObjectID(req.body._id) }, function (err, fetch) {
        if (err) throw err
    })
    res.sendStatus(200);
})

app.post('/saveDraft', (req, res) => {

    if (req.body != null) {
        if (req.body.message._id != null) {
            req.body.message.type = "draft"
            var _id = req.body.message._id
            delete req.body.message._id

            db.collection('m' + req.body.authKey).updateOne({ _id: ObjectID(_id) }, { $set: req.body.message }, function (err, result) {
                if (err) throw err
            })
        }
        else {

            req.body.message.type = "draft";
            add('m' + req.body.authKey, req.body.message);
        }
        res.sendStatus(200)
    }
    else {
        res.sendStatus(400)

    }

})
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err)

})

app.listen(port, () => console.log(`listening on port ${port}!`))
