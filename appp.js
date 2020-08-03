const axios = require('axios');
const {to} = require('await-to-js');
const yargs = require('yargs');
const request = require('request');
async function func1()
{   let data = [];

    let [err, responce] = await to(axios.get('https://clist.by/get/events/'));

    if(err)
    {
        console.log("Error: ", err);
    }
    
    return responce.data;
}



async function main()
{
    let Con = await to(func1());
    let allContests = Con[1];

    let current_date = new Date();
    let past = [], cur = [], upc = [];


    for(let i=0; i<allContests.length; i++)
    {
        t1 = allContests[i]["start"];
        t1 = new Date(t1);

        t2 = allContests[i]["end"];
        t2 = new Date(t2);

        if( t2<current_date )
            past.push( allContests[i] );
        else if(current_date<=t1 )
            upc.push( allContests[i] );
        else
            cur.push( allContests[i] );
    }
    
    console.log("\n");


    yargs.version('1.1.0');

    yargs.command({
        command: 'past',
        describe: 'Contests which have finished',
        handler: function(){
            console.log(" PAST CONTESTS");
            console.log( " total conests : ",  past.length, "\n\n");
            console.log( past);
        }
    })

    yargs.command({
        command: 'running',
        describe: 'Currently runing contest',
        handler: function(){
            console.log("RUNNING CONTESTS");
            console.log( " total conests: ",  cur.length, "\n\n");
            console.log( cur);
        }
    })

    yargs.command({
        command: 'upcoming',
        describe: 'Upcoming contests',
        handler: function(){
            console.log( "UPCOMING CONTESTS");
            console.log( " total conests: ",  upc.length, "\n\n");
            console.log( upc);
        }
    })

    yargs.command({
        command: 'all',
        describe: 'All contests',
        handler: function(){
            console.log("ALL CONTESTS");
            console.log( " total conests: ", allContests.length, "\n\n");
            console.log( allContests );
        }
    })

    yargs.argv;
    console.log("\n");
}

main();