export class GlobalSetting {
    website = {
        name: "",
        cover: ""
    }
    profile = {
        name: 'ldh',
        avatar: ""
    }

    toJSON() {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            a[b] = this[b];
            return a;
        }, {});
    }
}