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
    const requestingTeamId = req.body.requestingTeamId;
    const invitedTeamId = req.body.invitedTeamId;
    const date = req.body.date;

    if (!requestingTeamId || !invitedTeamId || !date) {
        return res.status(400).send({ error: "requestingTeamId, invitedTeamId and date are required" });
    }

    if (requestingTeamId === invitedTeamId) {
        return res.status(400).send({ error: "A team cannot invite itself" });
    }

    const requestingTeam = teams.find(team => team.id === requestingTeamId);
    const invitedTeam = teams.find(team => team.id === invitedTeamId);

    if (!requestingTeam || !invitedTeam) {
        return res.status(404).send({ error: "One or both teams not found" });
    }

    const newScrim = {
        id: nextId,
        requestingTeamId: requestingTeamId,
        invitedTeamId: invitedTeamId,
        date: date,
        status: "pending"
    };
    nextId = nextId + 1;

    scrims.push(newScrim);
    res.status(201).send({ data: newScrim });

});








export default router;