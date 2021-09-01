const Ice = require("ice").Ice;
const Client = require("./generated/RPC").Client;

async function StatsRPC(endpoint) {
    let communicator;
    let res;
    try {
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("stats:default -p 10000"); /* TODO: make not hard coded value */
        const Stats = await Client.StatsPrx.checkedCast(base);
        if(Stats) {
            if      (endpoint == "xchStatus") res = await Stats.xch();
            else if (endpoint == "hddStatus") res = await Stats.hdd();
            else if (endpoint == "active")    res = await Stats.active();
            else if (endpoint == "xchPC")     res = await Stats.XCHpc();
            else if (endpoint == "hddPC")     res = await Stats.HDDpc();
            else if (endpoint == "xchConfig") res = await Stats.CheckXCHConfigPath();
            else if (endpoint == "hddConfig") res = await Stats.CheckHDDConfigPath();
            else if (endpoint == "token")     res = await Stats.CheckToken();
            else console.log("Invalid endpoint");
        }
        else console.log("Invalid Proxy");
    }
    catch(ex)  {
        console.log(ex.toString());
        process.exitCode = 1;
    }
    finally {
        if(communicator) {
            await communicator.destroy();
        }
    }
    return res;
}

async function UpdateRPC(endpoint, args) {
    let communicator;
    try {
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("update:default -p 10001"); /* TODO: make not hard coded value */
        const Update = await Client.UpdatePrx.checkedCast(base);
        if(Update) {
            if      (endpoint == "setXCH")               await Update.SetXCH(args);
            else if (endpoint == "setHDD")               await Update.SetHDD(args);
            else if (endpoint == "changeXCHConfigPath")  await Update.ChangeXCHConfigPath(args);
            else if (endpoint == "ChangeHDDConfigPath")  await Update.ChangeHDDConfigPath(args);
            else if (endpoint == "ChangeToken")          await Update.ChangeToken(args);
            else if (endpoint == "RestoreRewardAddress") await Update.RestoreRewardAddress();
            else console.log("Invalid endpoint");
        }
        else console.log("Invalid Proxy");
    }
    catch(ex)  {
        console.log(ex.toString());
        process.exitCode = 1;
    }
    finally {
        if(communicator) {
            await communicator.destroy();
        }
    }
}

let test;

async function Main() {
    test = await StatsRPC('xchStatus');
    await console.log('xchStatus:',test);

    test = await StatsRPC('hddStatus');
    await console.log('hddStatus:',test);

    test = await StatsRPC('active');
    await console.log('active:',test);

    test = await StatsRPC('xchPC');
    await console.log('xchPC:',test);

    test = await StatsRPC('hddPC');
    await console.log('hddPC:',test);

    test = await StatsRPC('xchConfig');
    await console.log('xchConfig:',test);

    test = await StatsRPC('hddConfig');
    await console.log('hddConfig:',test);

    test = await StatsRPC('token');
    await console.log('token:',test);
}


Main();


/*******
 * 
 * Client RPC
 *  UPDATE
 *   SetXCH
 *   SetHDD
 *   ChangeXCHConfig
 *   ChangeHDDConfig
 *   ChangeToken
 *   RestoreRewardAddress
 *  
 *  STATS
 *   xch
 *   hdd
 *   active
 *   XCHpc
 *   HDDpc
 *   CheckXCHConfigPath
 *   CheckHDDConfigPath
 *   CheckToken
 * 
 *******/