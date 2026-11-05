import { scrims } from "../util/scrims.js";
import { teams } from "../util/teams.js";
import { Router } from "express";





const router = Router();

let nextId = teams.length + 1;



function findTeam(id) {
    return teams.find(team => team.id === Number(id));
}

router.get('/api/teams', (req, res) => {
    res.send({ data: teams });
});



router.get('/api/teams/:id', (req, res) => {
    const foundTeam = findTeam(req.params.id);

    if (!foundTeam) {
        return res.status(404).send({ error: "Team not found" });
    }
    res.send({ data: foundTeam });
});


router.get('/api/teams/:id/scrims', (req, res) => {
    const foundTeam = findTeam(req.params.id);

    if (!foundTeam) {
        return res.status(404).send({ error: "Team not found" });
    }

    const teamScrims = scrims.filter(scrim =>
        scrim.requestingTeamId === foundTeam.id ||
        scrim.invitedTeamId === foundTeam.id
    );
    res.send({ data: teamScrims });
});



router.post('/api/teams', (req, res) => {
    const name = req.body.name;
    const captain = req.body.captain;
    const players = req.body.players;

    if (!name || !captain || !players) {
        return res.status(400).send({ error: "name, captain and players are required" });
    }


    const existingTeam = teams.find(team => team.name === name);
    if (existingTeam) {
        return res.status(409).send({ error: "A team with that name already exists" });
    }

    const newTeam = {
        id: nextId,
        name: name,
        captain: captain,
        players: players
    };
    nextId = nextId + 1;

    teams.push(newTeam);
    res.status(201).send({ data: newTeam });



});





export default router;