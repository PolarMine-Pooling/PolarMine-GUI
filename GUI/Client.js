const Ice = require("ice").Ice;
const Client = require("./generated/RPC").Client;

async function StatsRPC(endpoint) {
    let communicator;
    try {
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("stats:default -p 10000"); /* TODO: make not hard coded value */
        const Stats = await Client.StatsPrx.checkedCast(base);
        if(Stats) {
            if      (endpoint == "xchStatus") await Stats.xch();
            else if (endpoint == "hddStatus") await Stats.hdd();
            else if (endpoint == "active")    await Stats.active();
            else if (endpoint == "xchPC")     await Stats.XCHpc();
            else if (endpoint == "hddPC")     await Stats.HDDpc();
            else if (endpoint == "xchConfig") await Stats.CheckXCHConfigPath();
            else if (endpoint == "hddConfig") await Stats.CheckHDDConfigPath();
            else if (endpoint == "token")     await Stats.CheckToken();
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