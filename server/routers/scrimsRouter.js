import { scrims } from "../util/scrims.js";
import { teams } from "../util/teams.js";
import { Router } from "express";




const router = Router();

let nextId = scrims.length + 1;

router.get('/api/scrims', (req, res) => {
    res.send({ data: scrims });
});



router.get('/api/scrims/:id', (req, res) => {
    const scrimId = Number(req.params.id);
    const foundScrim = scrims.find(scrim => scrim.id === scrimId);

    if (!foundScrim) {
        return res.status(404).send({ error: "Scrim not found" });
    }
    
    res.send({ data: foundScrim });
});



router.post('/api/scrims', (req, res) => {
    const challengerTeamId = req.body.challengerTeamId;
    const opponentTeamId = req.body.opponentTeamId;
    const date = req.body.date;

    if (!challengerTeamId || !opponentTeamId || !date) {
        return res.status(400).send({ error: "challengerTeamId, opponentTeamId and date are required" });
    }

    if (challengerTeamId === opponentTeamId) {
        return res.status(400).send({ error: "A team cannot challenge itself" });
    }

    const challengerTeam = teams.find(team => team.id === challengerTeamId);
    const opponentTeam = teams.find(team => team.id === opponentTeamId);

    if (!challengerTeam || !opponentTeam) {
        return res.status(404).send({ error: "One or both teams not found" });
    }

    const newScrim = {
        id: nextId,
        challengerTeamId: challengerTeamId,
        opponentTeamId: opponentTeamId,
        date: date,
        status: "pending"
    };
    nextId = nextId + 1;

    scrims.push(newScrim);
    res.status(201).send({ data: newScrim });

});








export default router;