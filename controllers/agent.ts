import { Request, Response, NextFunction } from "express";
import { getAgents } from "../services/agent.service";

const agentList = async (req: Request, res: Response, next: NextFunction) => {
  /* Get list of agents */
  let respAgents = await getAgents();
  respAgents = respAgents.map((agent) => {
    return {
      id: agent.id,
      label: agent.id + " - " + agent.name.slice(-4),
    };
  });

  res.send(respAgents);
};

export { agentList };
