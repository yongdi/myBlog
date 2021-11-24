/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
const NodeCache = require('node-cache');
const myCache = new NodeCache();

module.exports = {
    keyNode: 'kc',
    keyLogin: 'kl',
    cache: myCache
}


