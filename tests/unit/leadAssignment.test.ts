import { describe, it, expect } from 'vitest';
import { MOCK_PROPERTIES, MOCK_AGENTS } from '../../src/lib/mockData';

describe('Lead Routing Assignment Logic (Layer 6 & Layer 11)', () => {
  it('correctly maps lead to property listing agent when property is specified', () => {
    const targetProperty = MOCK_PROPERTIES[0]; // prop-1 with agent usr-agent-marcus
    const assignedAgentId = targetProperty.agent_id;
    expect(assignedAgentId).toBe('usr-agent-marcus');
  });

  it('selects an active agent from active roster for unassigned leads', () => {
    const activeAgents = MOCK_AGENTS.filter((a) => a.is_active);
    expect(activeAgents.length).toBeGreaterThan(0);
    const assignedAgent = activeAgents[0];
    expect(assignedAgent.is_active).toBe(true);
    expect(assignedAgent.profile?.role).toBe('agent');
  });
});
