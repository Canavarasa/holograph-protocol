'use strict';

const fs = require ('fs');
const HDWalletProvider = require ('truffle-hdwallet-provider');
const Web3 = require ('web3');
const {
    NETWORK,
    GAS,
    DEPLOYER
} = require ('../config/env');


const SAMPLE_ERC721 = 'SampleERC721';
const SAMPLE_ERC721_CONTRACT = JSON.parse (fs.readFileSync ('./build/combined.json')).contracts [SAMPLE_ERC721 + '.sol:' + SAMPLE_ERC721];

const HOLOGRAPH_ERC721 = 'HolographERC721';
const HOLOGRAPH_ERC721_CONTRACT = JSON.parse (fs.readFileSync ('./build/combined.json')).contracts [HOLOGRAPH_ERC721 + '.sol:' + HOLOGRAPH_ERC721];

const HOLOGRAPHER = 'Holographer';
const HOLOGRAPHER_CONTRACT = JSON.parse (fs.readFileSync ('./build/combined.json')).contracts [HOLOGRAPHER + '.sol:' + HOLOGRAPHER];

const network = JSON.parse (fs.readFileSync ('./networks.json', 'utf8')) [NETWORK];
const provider = new HDWalletProvider (DEPLOYER, network.rpc);
const web3 = new Web3 (provider);

const removeX = function (input) {
    if (input.startsWith ('0x')) {
        return input.substring (2);
    } else {
        return input;
    }
};

const hexify = function (input, prepend) {
	input = input.toLowerCase ().trim ();
	if (input.startsWith ('0x')) {
		input = input.substring (2);
	}
	input = input.replace (/[^0-9a-f]/g, '');
	if (prepend) {
	    input = '0x' + input;
	}
	return input;
};

const throwError = function (err) {
    process.stderr.write (err + '\n');
    process.exit (1);
};

const web3Error = function (err) {
    throwError (err.toString ())
};

async function main () {

    const ERC721_ADDRESS = fs.readFileSync ('./data/' + NETWORK + '.' + SAMPLE_ERC721 + '.address', 'utf8').trim ();

    const FACTORY = new web3.eth.Contract (
        SAMPLE_ERC721_CONTRACT.abi.concat (HOLOGRAPHER_CONTRACT.abi).concat (HOLOGRAPH_ERC721_CONTRACT.abi),
        ERC721_ADDRESS
    );


// Deployed HolographGenesis Contract : 0xF7341fFb78ff58ba396e50e3dCF3ac99AD05F9f0
// holographRegistryAddress 0x9dff1eb7d89d28aff0b130cc7a2ac72baa684d70
// holographRegistryProxyAddress 0x70f896931d2c2b3616cce5791fdcb20a15345e18
// holographFactoryAddress 0x12fc99a078efe6504a9f0f6e3ff1c33f781f6002
// secureStorageAddress 0x2257cb145f7575014f9fbe2105000f76574c87df
// secureStorageProxyAddress 0x6e8d0ac99507ced098a469230201d759f2ea0fdf
// holographFactoryProxyAddress 0xcdcfd9a0f416cb46aa822f7eff61ad1508cf89bc
// holographBridgeAddress 0x2aaaf19a7b3fe602cb612295b35be70b3dd10d65
// holographBridgeProxyAddress 0x5a2fa0c514fdb76e1b536b6d38c2b709578d1350
// holographAddress 0xb26340ef4f741ce120062ea904c6eea212d7ba41
// holographErc721Address 0x381031f2a18bd3dd9b7c826a39f49d116194c76d
//
//
// contractURI data:application/json;base64,eyJuYW1lIjoiU2FtcGxlIENvbGxlY3Rpb24iLCJkZXNjcmlwdGlvbiI6IlNhbXBsZSBDb2xsZWN0aW9uIiwic2VsbGVyX2ZlZV9iYXNpc19wb2ludHMiOjEwMDAsImZlZV9yZWNpcGllbnQiOiIzODEwMzFmMmExOGJkM2RkOWI3YzgyNmEzOWY0OWQxMTYxOTRjNzZkIn0
// name Sample Collection
// symbol SAMPLE
//
//
// Set HolographERC721 address to address type 0x0000000000000000000000000000000000486f6c6f6772617068455243373231

    console.log ("\n");

    console.log ('getHolographEnforcer', await FACTORY.methods.getHolographEnforcer ().call ({
        chainId: network.chain,
        from: provider.addresses [0],
        gas: web3.utils.toHex (1000000),
        gasPrice: web3.utils.toHex (web3.utils.toWei (GAS, 'gwei'))
    }).catch (web3Error));

    console.log ('getSecureStorage', await FACTORY.methods.getSecureStorage ().call ({
        chainId: network.chain,
        from: provider.addresses [0],
        gas: web3.utils.toHex (1000000),
        gasPrice: web3.utils.toHex (web3.utils.toWei (GAS, 'gwei'))
    }).catch (web3Error));

    console.log ('getSourceContract', await FACTORY.methods.getSourceContract ().call ({
        chainId: network.chain,
        from: provider.addresses [0],
        gas: web3.utils.toHex (1000000),
        gasPrice: web3.utils.toHex (web3.utils.toWei (GAS, 'gwei'))
    }).catch (web3Error));

    console.log ('test', await FACTORY.methods.test ().call ({
        chainId: network.chain,
        from: provider.addresses [0],
        gas: web3.utils.toHex (1000000),
        gasPrice: web3.utils.toHex (web3.utils.toWei (GAS, 'gwei'))
    }).catch (web3Error));

    console.log ('contractURI', await FACTORY.methods.contractURI ().call ({
        chainId: network.chain,
        from: provider.addresses [0],
        gas: web3.utils.toHex (1000000),
        gasPrice: web3.utils.toHex (web3.utils.toWei (GAS, 'gwei'))
    }).catch (web3Error));

    console.log ('name', await FACTORY.methods.name ().call ({
        chainId: network.chain,
        from: provider.addresses [0],
        gas: web3.utils.toHex (1000000),
        gasPrice: web3.utils.toHex (web3.utils.toWei (GAS, 'gwei'))
    }).catch (web3Error));

    console.log ('symbol', await FACTORY.methods.symbol ().call ({
        chainId: network.chain,
        from: provider.addresses [0],
        gas: web3.utils.toHex (1000000),
        gasPrice: web3.utils.toHex (web3.utils.toWei (GAS, 'gwei'))
    }).catch (web3Error));

    console.log ("\n");

    process.exit ();

}

main ();
