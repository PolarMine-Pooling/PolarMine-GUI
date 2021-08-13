#pragma once

module Client {
    interface Stats {
        bool xch();
        bool hdd();

        bool active();
        int XCHpc();
        int HDDpc();

        string CheckXCHConfigPath();
        string CheckHDDConfigPath();
        string CheckToken();

        void shutdown();
    }
    interface Update {
        bool SetXCH(bool active);
        bool SetHDD(bool active);

        bool ChangeXCHConfigPath(string newPath);
        bool ChangeHDDConfigPath(string newPath);
        bool ChangeToken(string newToken);

        bool RestoreRewardAddress();

        void shutdown();
    }
}
