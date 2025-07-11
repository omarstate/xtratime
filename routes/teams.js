const express = require('express');
const router = express.Router();
const { Team } = require('../models/team');
const mongoose = require('mongoose');

// Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        console.log(`Found ${teams.length} teams total`);
        res.send(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).send('Error fetching teams');
    }
});

// Get teams by league name
router.get('/league/:leagueName', async (req, res) => {
    try {
        const leagueName = req.params.leagueName;
        console.log('Searching for teams in league:', leagueName);
        
        // Search in all league fields (strLeague to strLeague7)
        const teams = await Team.find({
            $or: [
                { strLeague: { $regex: leagueName, $options: 'i' } },
                { strLeague2: { $regex: leagueName, $options: 'i' } },
                { strLeague3: { $regex: leagueName, $options: 'i' } },
                { strLeague4: { $regex: leagueName, $options: 'i' } },
                { strLeague5: { $regex: leagueName, $options: 'i' } },
                { strLeague6: { $regex: leagueName, $options: 'i' } },
                { strLeague7: { $regex: leagueName, $options: 'i' } }
            ]
        });
        
        console.log(`Found ${teams.length} teams for league "${leagueName}"`);
        if (teams.length === 0) {
            console.log('Available leagues in database:');
            const allTeams = await Team.find({}, 'strLeague strLeague2 strLeague3 strLeague4 strLeague5 strLeague6 strLeague7');
            const leagues = new Set();
            allTeams.forEach(team => {
                if (team.strLeague) leagues.add(team.strLeague);
                if (team.strLeague2) leagues.add(team.strLeague2);
                if (team.strLeague3) leagues.add(team.strLeague3);
                if (team.strLeague4) leagues.add(team.strLeague4);
                if (team.strLeague5) leagues.add(team.strLeague5);
                if (team.strLeague6) leagues.add(team.strLeague6);
                if (team.strLeague7) leagues.add(team.strLeague7);
            });
            console.log([...leagues]);
        }
        
        res.send(teams);
    } catch (error) {
        console.error('Error fetching teams by league:', error);
        res.status(500).send('Error fetching teams by league');
    }
});

// Get team by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Searching for team with ID:', id);

        let team;
        
        // First try to find by idTeam
        team = await Team.findOne({ idTeam: id });
        
        // If not found and ID looks like MongoDB ObjectId, try finding by _id
        if (!team && mongoose.Types.ObjectId.isValid(id)) {
            team = await Team.findById(id);
        }

        if (!team) {
            console.log('No team found with ID:', id);
            return res.status(404).send({
                message: 'Team not found',
                searchedId: id,
                tip: 'Make sure you are using the correct team ID. It should be either the idTeam value or a valid MongoDB ObjectId.'
            });
        }

        console.log('Found team:', team.strTeam);
        res.send(team);
    } catch (error) {
        console.error('Error fetching team by ID:', error);
        res.status(500).send({
            message: 'Error fetching team',
            error: error.message,
            searchedId: req.params.id
        });
    }
});

module.exports = router;