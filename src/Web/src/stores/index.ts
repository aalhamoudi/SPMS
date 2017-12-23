import { AppStore } from './AppStore'

export { AppStore }

export class Stores {
    appStore: AppStore
}

export const stores : Stores = {
    appStore: new AppStore()
};