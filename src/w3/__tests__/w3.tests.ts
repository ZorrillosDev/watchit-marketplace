import {getNetworkSettings} from '@src/w3'
import {ChainId} from '@usedapp/core'
import {NetworkSetting} from "@w3/types";

describe('W3 lib', () => {
    it('should return corresponding Chain Settings', () => {
        const networkAllowedRK = ChainId.Rinkeby
        const settingsForAllowedNetworkRK: NetworkSetting = getNetworkSettings(networkAllowedRK)
        expect(settingsForAllowedNetworkRK.CHAIN_NAME).toBe('RINKEBY')

        const networkAllowedKV = ChainId.Kovan
        const settingsForAllowedNetworkKV: NetworkSetting = getNetworkSettings(networkAllowedKV)
        expect(settingsForAllowedNetworkKV.CHAIN_NAME).toBe('KOVAN')
    })

    it('should return default RINKEBY if not supported chain', () => {
        const networkAllowedRK = ChainId.Polygon
        const settingsForAllowedNetworkRK: NetworkSetting = getNetworkSettings(networkAllowedRK)
        expect(settingsForAllowedNetworkRK.CHAIN_NAME).toBe('RINKEBY')

    })

})
