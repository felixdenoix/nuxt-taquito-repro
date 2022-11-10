<template>
  <div>Wallet Login</div>
  <button @click="handleLogin">Wallet login</button>
</template>

<script setup lang="ts">
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

const Tezos = new TezosToolkit('https://mainnet-tezos.giganode.io');
const wallet = new BeaconWallet({ name: 'Beacon Docs Taquito' });
Tezos.setWalletProvider(wallet);

const handleLogin = async () => {
  try {
    console.log('Requesting permissions...');
    const permissions = await wallet.client.requestPermissions();
    console.log('Got permissions:', permissions.address);
  } catch (error) {
    console.log('Got error:', error);
  }
};

</script>