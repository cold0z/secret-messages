const fetch = require("node-fetch");

const agents = [
  {
    name: "John Smith",
    id: "AG1907001",
    phone: "0661318816",
    email: "haddou.jihad@gmail.com",
  },
  {
    name: "Albert Einstein",
    id: "AG1907002",
    phone: "0661318816",
    email: "haddou.jihad@gmail.com",
  },
  {
    name: "Jeff Braun",
    id: "AG1907003",
    phone: "0661318816",
    email: "haddou.jihad@gmail.com",
  },
  {
    name: "Agent 007",
    id: "AG1907004",
    phone: "0661318816",
    email: "haddou.jihad@gmail.com",
  },
  {
    name: "Agent 008",
    id: "AG1907005",
    phone: "0661318816",
    email: "haddou.jihad@gmail.com",
  },
];

const getAgents = async () : Promise<any> => {
  return agents
};
const getAgent = async (code) : Promise<any> => {
  let agent = agents.find(agent => agent.id === code);
  return agent

};
export { getAgents,getAgent };
