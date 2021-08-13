const Ice = require("ice").Ice;
const Client = require("./generated/RPC").Client;

(async function()
{
    let communicator;
    try
    {
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("update:default -p 10001");
        const Update = await Client.UpdatePrx.checkedCast(base);
        if(Update)
        {
            await Update.SetXCH(false);
        }
        else
        {
            console.log("Invalid Proxy");
        }
    }
    catch(ex) 
    {
        console.log(ex.toString());
        process.exitCode = 1;
    }
    finally
    {
        if(communicator)
        {
            await communicator.destroy();
        }
    }
}());