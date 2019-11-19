import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export const Store = {
    async setItem (id, obj) {
        await Storage.set({
            key: id,
            value: JSON.stringify(obj)
        });
    },
    async getItem (id) {
        const keys = await this.keys();
        if (keys.includes(id)) {
            const s = await Storage.get({ key: id });
            return JSON.parse(s.value);
        } else {
            return {};
        }
    },
    async removeItem (id) {
        //return await Storage.remove({ key: id });
    },
    async keys () {
        const temp = await Storage.keys();
        return temp.keys;
    },
    async clear () {
        //await Storage.clear();
    }
};
