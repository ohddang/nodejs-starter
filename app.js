const express = require("express");

const app = express();

const members = require("./members");

app.use(express.json());

app.get('/api/members', (req, res) => {
  // res.send(members);
  const { team } = req.query;
  if(team) {
    const filteredMembers = members.filter(member => member.team === team);
    res.send(filteredMembers);
  } else {
    res.send(members);
  }
});

app.get('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const member = members.find(member => member.id === Number(id));
  if(member) {
    res.send(member);
  } else{
    res.status(404).send({message: 'Member not found'});
  }
});

app.get('/api/members?team=Engineering', (req, res) => {
  const { team } = req.query;
  const member = members.find(member => member.team === team);
  if(member) {
    res.send(member);
  } else{
    res.status(404).send({message: 'Member not found'});
  }
});

app.post('/api/members', (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});

app.listen(3000);
