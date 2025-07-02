const express = require('express');
const cors = require('cors');

module.exports = function (app){
    app.use(express.json());
    app.use(cors());
    
    console.log('=== Loading Routes ===');
    
    // Clear require cache to avoid stale modules
    delete require.cache[require.resolve('../routes/users')];
    delete require.cache[require.resolve('../routes/auth')];
    delete require.cache[require.resolve('../routes/players')];
    delete require.cache[require.resolve('../routes/stadiums')];
    
    try {
        console.log('Loading users...');
        const users = require('../routes/users');
        console.log('users type:', typeof users);
        console.log('users constructor:', users.constructor.name);
        console.log('is function?', typeof users === 'function');
        console.log('has stack property?', !!users.stack);
        app.use('/api/users', users);
        console.log('✅ Users loaded successfully');
    } catch (error) {
        console.error('❌ Error with users:', error.message);
    }
    
    try {
        console.log('Loading auth...');
        const auth = require('../routes/auth');
        console.log('auth type:', typeof auth);
        console.log('auth constructor:', auth.constructor.name);
        app.use('/api/auth', auth);
        console.log('✅ Auth loaded successfully');
    } catch (error) {
        console.error('❌ Error with auth:', error.message);
    }
    
    try {
        console.log('Loading players...');
        const players = require('../routes/players');
        console.log('players type:', typeof players);
        console.log('players constructor:', players.constructor.name);
        app.use('/api/players', players);
        console.log('✅ Players loaded successfully');
    } catch (error) {
        console.error('❌ Error with players:', error.message);
    }
    
    try {
        console.log('Loading stadiums...');
        const stadiums = require('../routes/stadiums');
        console.log('stadiums type:', typeof stadiums);
        console.log('stadiums constructor:', stadiums.constructor.name);
        app.use('/api/stadiums', stadiums);
        console.log('✅ Stadiums loaded successfully');
    } catch (error) {
        console.error('❌ Error with stadiums:', error.message);
    }
    
    console.log('=== Routes Loading Complete ===');

    try {
        console.log('Loading stadiums...');
        const stadiumsPath = require.resolve('../routes/stadiums');
        console.log('stadiums file path:', stadiumsPath);
        
        const stadiums = require('../routes/stadiums');
        console.log('stadiums type:', typeof stadiums);
        console.log('stadiums value:', stadiums);
        console.log('stadiums keys:', Object.keys(stadiums));
        app.use('/api/stadiums', stadiums);
        console.log('✅ Stadiums loaded successfully');
    } catch (error) {
        console.error('❌ Error with stadiums:', error.message);
    }
}