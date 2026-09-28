import {describe,it,expect} from 'vitest';
const transitions:any={AVAILABLE:['CLAIMED'],CLAIMED:['PICKUP_SCHEDULED'],PICKUP_SCHEDULED:['PICKED_UP'],PICKED_UP:['IN_TRANSIT'],IN_TRANSIT:['DELIVERED']};
describe('donation lifecycle',()=>{it('allows happy path',()=>{let s='AVAILABLE';for(const n of ['CLAIMED','PICKUP_SCHEDULED','PICKED_UP','IN_TRANSIT','DELIVERED']){expect(transitions[s]).toContain(n);s=n}});it('rejects invalid transition',()=>expect(transitions.AVAILABLE).not.toContain('DELIVERED'))});
