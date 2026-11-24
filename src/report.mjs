export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","subject","priority"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.priority==='string' && row.priority.trim()) row.priority=Number(row.priority);
    if (!Number.isFinite(row.priority)) throw new Error('Expected a numeric metric');
  }
  return {urgent:rows.filter(r=>r.priority>=3).sort((a,b)=>b.priority-a.priority).map(r=>r.subject),histogram:rows.reduce((a,r)=>(a[r.priority]=(a[r.priority]||0)+1,a),{})};
}
