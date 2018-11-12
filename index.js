require(`dotenv`).config()
const Discord = require(`discord.js`);
const fetch = require(`node-fetch`);
let command;
const client = new Discord.Client();
const prefix = `!gib`;
const shibURL = `http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`;
const cadeURL = `http://shibe.online/api/cats?count=1&urls=true&httpsUrls=true`;
const birbURL = `http://shibe.online/api/birds?count=[1]&urls=true&httpsUrls=true`;

client.on(`ready`, () => {
    client.user.setActivity(`with my own feet`, {type: `PLAYING`});
});

client.on(`message`, msg => {
    if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        command = args.shift().toLowerCase();
        switch(command){
            case 'shib': case 'dog': case 'doggo': case 'doge': case 'shibe': case 'shiba':
                return new Promise((fulfill, reject) => {
                    getPic(shibURL).then((res) => {
                        if(res != ``){
                            fulfill(msg.channel.send({file: res}));
                        }else{
                            reject(msg.channel.send(`bot machine bronk`));
                        };
                    });
                });

            case 'cade': case 'cat': case 'cate': case 'catto': case 'kat': case 'caddo':
                return new Promise((fulfill, reject) => {
                    getPic(cadeURL).then((res) => {
                        if(res != ``){
                            fulfill(msg.channel.send({file: res}));
                        }else{
                            reject(msg.channel.send(`bot machine bronk`));
                        };
                    });
                });

            case 'birb': case 'bird': case 'birdo': case 'flapflap':
                return new Promise((fulfill, reject) => {
                    getPic(birbURL).then((res) => {
                        if(res != ``){
                            fulfill(msg.channel.send({file: res}));
                        }else{
                            reject(msg.channel.send(`bot machine bronk`));
                        };
                    });
                });
            default:
                msg.channel.send(`not a valid command, fucko.`);
        }

        function getPic(url){
            return new Promise((fulfill, reject) => {
                fetch(url).then(res => res.json()).then((out) => {
                    fulfill(out[0]);
                }).catch(err => { reject(err) });
            });
        };
    };
});

client.login(process.env.TOKEN);