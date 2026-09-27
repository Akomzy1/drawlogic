import {readFile,writeFile,mkdir} from "node:fs/promises";
import {resolve,dirname} from "node:path";
import {pathToFileURL} from "node:url";
const C=resolve(process.env.DRAWLOGIC_CONTRACTS_ROOT||"contracts"),out="fixtures/core";
const {ddlHash,auditHash}=await import(pathToFileURL(C+"/scripts/jcs.mjs"));
const read=async f=>JSON.parse(await readFile(C+"/"+f,"utf8"));
const clone=structuredClone,T="2026-09-27T00:00:00Z",V="0.1.0";
const files=[];
async function save(path,value,schema){await mkdir(dirname(path),{recursive:true});await writeFile(path,JSON.stringify(value,null,2)+"\n");if(schema)files.push({path,schema});}
const stack=[{id:"gb-eng-residential",name:"GB-ENG Residential",version:V,layer:"jurisdiction",tier:1,signer:null},{id:"generic",name:"Generic",version:V,layer:"generic",tier:null,signer:null}];
const provenance={source:"user",confidence:1,verify:false};
const spec={
window_head:[["wall","masonry",102.5,0,0,500,500],["lintel","lintel",150,0,500,500,150],["tray","membrane",2,0,652,500,2],["frame","window_frame",70,180,0,70,500]],
window_jamb:[["outer","masonry",102.5,0,0,102.5,500],["closer","cavity_closer",50,102.5,0,50,500],["inner","masonry",100,152.5,0,100,500],["frame","window_frame",70,252.5,0,70,500]],
window_sill:[["wall","masonry",102.5,0,0,200,400],["sill","sill",50,-50,400,350,50],["tray","membrane",2,0,450,250,2],["frame","window_frame",70,100,452,70,300]],
door_threshold:[["slab","slab",150,0,0,600,150],["insulation","insulation",100,0,150,600,100],["threshold","threshold",25,500,250,150,25],["seal","membrane",2,500,275,150,2]],
eaves:[["wall","masonry",102.5,0,0,300,500],["insulation","insulation",100,102.5,0,100,500],["roof","roof_covering",25,-100,525,600,25],["gutter","gutter",80,-100,450,80,80]],
verge:[["wall","masonry",102.5,0,0,300,500],["roof","roof_covering",25,-50,525,500,25],["underlay","membrane",2,-50,520,500,2],["edge","verge_trim",20,-70,500,20,60]],
parapet:[["wall","masonry",102.5,0,0,300,600],["insulation","insulation",120,300,0,120,450],["upstand","upstand",2,420,300,2,150],["coping","coping",25,-25,600,475,25]],
warm_flat_roof_abutment:[["wall","masonry",102.5,0,0,300,650],["deck","deck",150,300,0,600,150],["insulation","insulation",120,300,150,600,120],["upstand","upstand",2,300,270,2,150]],
ground_floor_wall_dpc:[["wall","masonry",102.5,0,0,300,600],["dpc","dpc",2,0,150,300,2],["slab","slab",150,300,0,600,150],["insulation","insulation",100,300,150,600,100]],
cavity_closer:[["outer","masonry",102.5,0,0,102.5,500],["cavity","cavity",50,102.5,0,50,500],["closer","cavity_closer",50,102.5,0,50,100],["inner","masonry",100,152.5,0,100,500]],
wall_to_foundation:[["wall","masonry",102.5,150,300,300,600],["footing","foundation",300,0,0,600,300],["dpc","dpc",2,150,450,300,2],["ground","ground_line",1,-200,300,1000,1]],
balcony_threshold:[["slab","slab",150,0,0,800,150],["insulation","insulation",100,0,150,800,100],["threshold","threshold",25,500,250,150,25],["drain","drainage_channel",80,650,150,80,80]],
steel_beam_bearing:[["wall","masonry",102.5,0,0,300,500],["padstone","padstone",150,0,500,300,150],["beam","steel_beam",200,150,650,600,200],["bearing","bearing_zone",150,150,650,150,20]]
};
const names=Object.keys(spec);
const template=await read("examples/profile.gb-eng-residential.json");
function profile(id,type){
 const p=clone(template);p.metadata={...p.metadata,id,name:id,version:V,type,tier:type==="generic"?null:1,signers:[],publish:"private",scope:"Examiner-only input profile, not a published regulatory standard.",changelog:[{version:V,date:"2026-09-27",summary:"Independent Prompt 2 fixture input."}]};
 p.rules=[];p.required_constraints={};p.typical_details=[];p.applicable_documents=[];p.check_categories=["geometry","thermal","structural","fire_stopping","acoustic"];p.coverage={statement:"Unsigned examiner checks only; no structural, fire or acoustic assessment.",checks_available:["geometry","thermal"],checks_not_available:["structural","fire_stopping","acoustic"],rules_total:13,rules_verified:0,generated_at:T};
 for(const m of p.construction_defaults.materials)m.source_detail.profile={id,version:V};
 p.construction_defaults.typical_detail_ids=[];
 return p;
}
const gb=profile("gb-eng-residential","jurisdiction"),generic=profile("generic","generic");
delete generic.metadata.jurisdiction;
const details=[];
for(let n=0;n<names.length;n++){
 const type=names[n],rows=spec[type],id="10000000-0000-4000-8000-"+String(n+1).padStart(12,"0");
 const objects=rows.map(([id,cls,t,x,y,w,h])=>({id,class:cls,label:id.replaceAll("_"," "),material_id:cls==="cavity"?null:"mat_"+cls,thickness:t,height:h,level:null,base_offset:null,geometry:{kind:"rect",origin:[x,y],width:w,height:h},...provenance,rule_refs:[],layer_id:"detail"}));
 const materials=[...new Set(objects.map(o=>o.material_id).filter(Boolean))].map(id=>({id,name:id.slice(4).replaceAll("_"," "),category:"test_material",basis:"description_only",...provenance}));
 const rules=[generic,gb].map((p,i)=>{
 const rule={id:p.metadata.id+"-"+type+"-"+(i?"continuity":"geometry"),profile:{id:p.metadata.id,version:V},state:"unverified",signer:null,category:i?"thermal":"geometry",document:null,applies_to:{drawing_type:"detail",detail_type:type,object_class:objects[0].class},condition:{cmp:{left:{field:"height"},op:">=",right:{value:0,unit:"mm"}}},condition_text:objects[0].class+".height >= 0 mm",severity:"flag",auto_fix:null,message:"Examiner "+(i?"detail continuity":"geometry")+" rule requires professional verification.",why:"This unsigned fixture tests fail-closed dispatch, not a regulatory minimum.",judgement:false,modes:["draft","learn"],requires_inputs:["height"]};
 p.rules.push(rule);return rule;
 });
 objects[0].rule_refs=rules.map(r=>r.id);
 const ddl={ddl_version:V,drawing:{id,title:type.replaceAll("_"," "),discipline:"architecture",type:"detail",detail_type:type,mode:"draft",scale:10,units:"mm",jurisdiction:"GB-ENG",rev:"A",hash:"sha256:"+"0".repeat(64),parent_hash:null,profile_stack:clone(stack),card_id:"card-"+type,created_at:T},materials,objects,
 connections:[{id:"connection-1",kind:type==="steel_beam_bearing"?"bears_on":"abuts",from:objects[1].id,to:objects[0].id,...provenance}],
 constraints:[{id:"sum-thickness",type:"sum",of:objects.map(o=>o.id+".thickness"),equals:"assembly_total",...provenance}],
 dimensions:[{id:"assembly_total",kind:"linear",refs:objects.map(o=>o.id),value:null,driving:false,...provenance}],
 annotations:[{id:"note-supplied",kind:"note",text:"All dimensions are synthetic user-supplied test inputs, not design recommendations.",...provenance}],
 layers:[{id:"detail",name:"Detail",line_weight_mm:.35}],schedules:[],solver:{status:"unresolved",conflicts:[]},checks:null,stamp:null};
 ddl.drawing.hash=ddlHash(ddl);
 const resolved=clone(ddl);resolved.dimensions[0].value=objects.reduce((a,o)=>a+o.thickness,0);resolved.solver={status:"resolved",conflicts:[]};resolved.drawing.hash=ddlHash(resolved);
 const check={schema_version:V,run_id:"20000000-0000-4000-8000-"+String(n+1).padStart(12,"0"),drawing_id:id,drawing_hash:resolved.drawing.hash,mode:"draft",profile_versions:{"generic":V,"gb-eng-residential":V},
 results:rules.map((r,i)=>({id:"result-"+(i+1),rule_id:r.id,profile:r.profile,category:r.category,status:"flag",reason:"unverified",object_ids:[objects[0].id],message:r.message,document:null,rule_state:"unverified",signer:null,auto_fix:{available:false},resolution:null})),
 checks_not_performed:["structural","fire_stopping","acoustic"].map(category=>({category,label:category.replaceAll("_"," ")})),blocked:[],summary:{performed:2,passed:0,flagged:2,out_of_scope:0},generated_at:T};
 const card={schema_version:V,card_id:ddl.drawing.card_id,mode:"draft",status:"confirmed",confirmed_by:"fixture-user",confirmed_at:T,discipline:"architecture",drawing_type:"detail",detail_type:type,scale:10,units:"mm",jurisdiction:"GB-ENG",profile_stack:clone(stack),inputs:[{kind:"text",text:"Draw the supplied schematic "+type+" using only the supplied component dimensions."}],recognised:objects.map(o=>({key:o.id+".thickness",object_id:o.id,label:o.label,value:o.thickness,unit:"mm",...provenance})),missing:[],blocked:[],assumptions:[],created_at:T};
 const base=out+"/details/"+type;
 await save(base+"/input.ddl.json",ddl,"ddl");await save(base+"/resolved.ddl.json",resolved,"ddl");await save(base+"/expected.check.json",check,"check-result");await save(base+"/card.json",card,"interpretation");
 details.push({id:type,input:base+"/input.ddl.json",resolved:base+"/resolved.ddl.json",check:base+"/expected.check.json",card:base+"/card.json",clauses:["FR-22","FR-23","FR-30","FR-31","FR-40"]});
}
await save(out+"/profiles/generic.json",generic,"profile");await save(out+"/profiles/gb-eng-residential.json",gb,"profile");
const ng=profile("ng-la","jurisdiction");ng.metadata.jurisdiction="NG-LA";ng.rules=[];ng.coverage={...ng.coverage,rules_total:0,checks_available:[],statement:"No signed rules; jurisdiction material defaults only."};
const c=ng.construction_defaults;
c.materials=[["sandcrete","Sandcrete block","masonry"],["cement_render","Cement render and paint","render"],["rc","Reinforced concrete","concrete"],["alu","Aluminium","metal"],["tile","Ceramic or porcelain tile","tile"]].map(([id,name,category])=>({id,name,category,basis:"description_only",source:"profile",confidence:1,verify:false,source_detail:{profile:{id:"ng-la",version:V}}}));
const build=(id,name,mat)=>({id,name,plain_description:name,layers:[{role:"finish",material_id:mat,thickness:null}]});
c.walls=[build("ng_sandcrete_render","Sandcrete block with cement render and paint","sandcrete")];c.frame=build("ng_rc_frame","Reinforced concrete frame","rc");c.roofs=[build("ng_longspan_alu","Long-span aluminium roof","alu"),build("ng_flat_concrete","Concrete flat roof with parapet","rc")];c.floors=[build("ng_rc_floor","Reinforced concrete slab","rc")];c.windows=[build("ng_alu_sliding","Aluminium sliding window","alu")];c.doors=[build("ng_alu_door","Aluminium door","alu")];c.finishes={external:[build("ng_render","Cement render and paint","cement_render")],floor:[build("ng_floor_tile","Ceramic or porcelain tile","tile")]};
await save(out+"/profiles/ng-la.json",ng,"profile");
generic.construction_defaults_by_region={northern_europe:clone(gb.construction_defaults),west_africa_coastal:clone(ng.construction_defaults)};
await writeFile(out+"/profiles/generic.json",JSON.stringify(generic,null,2)+"\n");
const ideas=[];
for(const [name,jur,prompt] of [["kitchen-extension","GB-ENG","Extend my kitchen 3 m into the garden in Banbury with bifold doors."],["restaurant","GB-ENG","Plan an 80-cover restaurant with an open kitchen in Banbury."],["lekki-site","NG-LA","Place a duplex and boys quarters on my 60 by 120 ft Lekki plot."]]){
 const base=await read("examples/interpretation."+ (name==="restaurant"?"kitchen-extension":name)+".json");
 base.card_id="card-"+name;base.profile_stack=clone(stack);if(jur==="NG-LA")base.profile_stack[0]={...base.profile_stack[0],id:"ng-la",name:"NG-LA"};
 base.created_at=T;base.inputs=[{kind:"text",text:prompt}];base.jurisdiction=jur;base.jurisdiction_inferred=false;
 base.recognised=name==="restaurant"?[{key:"covers",label:"Seats",value:80,...provenance},{key:"kitchen",label:"Kitchen",value:"open",...provenance}]:base.recognised;
 base.assumptions=base.assumptions.filter(a=>a.key!=="jurisdiction");
 for(const a of base.assumptions){if(a.source_detail?.profile)a.source_detail.profile.version=V;if(a.source==="ai_inferred")a.verify=true;if(jur==="NG-LA"&&a.key==="wall_build_up")a.value="ng_sandcrete_render";}
 if(name==="restaurant")base.assumptions=base.assumptions.filter(a=>!["extension_width","roof_type"].includes(a.key));
 const request={mode:"idea",jurisdiction:jur,inputs:base.inputs,profile_stack:base.profile_stack};
 await save(out+"/idea/"+name+"/expected.card.json",base,"interpretation");
 await save(out+"/idea/"+name+"/request.json",request);await save(out+"/idea/"+name+"/assumptions.json",base.assumptions);
 ideas.push({id:name,request:out+"/idea/"+name+"/request.json",card:out+"/idea/"+name+"/expected.card.json"});
}
const learn=[];
for(const name of ["parapet","steel-beam-bearing"]){
 const c=await read("examples/critique.parapet.json");c.profile_stack=clone(stack);c.id="critique-"+name;c.exercise_id="exercise-"+name;c.created_at=T;c.generation_unlocked={unlocked:false,by:null};
 for(const p of c.points)if(p.source.kind==="rule"){p.source.rule_state="unverified";p.source.rule_id="gb-eng-residential-parapet-continuity";p.source.document=null;}
 if(name==="steel-beam-bearing"){
 c.detail_type="steel_beam_bearing";c.submission={description:"A steel beam rests on masonry. I have not provided a load, member size or connection design."};
 const blocked=["load","member_size","structural_connection"].map(kind=>({key:"beam."+kind,object_id:"beam",kind,request:"Supply the engineer's "+kind.replaceAll("_"," ")+".",why:"Drawing-level geometry cannot establish this engineering value."}));
 c.blocked=blocked;c.points=blocked.map((b,i)=>({id:"beam-"+i,grade:"red",title:b.kind.replaceAll("_"," "),reason:b.request,why:b.why,question:b.request,source:{kind:"general_good_practice",label_key:"learn.general_good_practice"},asks_for:[b],state:"raised",worked_answer_available:false}));
 c.inspiration=[{id:"load-path",title:"Trace the load path",typical_detail_id:null,principles:["Show where the beam bears and how its support is identified; obtain engineering values separately."],partial_diagram_asset_id:null},{id:"bearing-support",title:"Separate drawing from design",typical_detail_id:null,principles:["Label the support and leave missing engineering values as questions."],partial_diagram_asset_id:null}];
 }
 const request={exercise_id:c.exercise_id,detail_type:c.detail_type,submission:c.submission,cycle:0,profile_stack:c.profile_stack};
 await save(out+"/learn/"+name+"/request.json",request);await save(out+"/learn/"+name+"/expected.critique.json",c,"critique");
 learn.push({id:name,request:out+"/learn/"+name+"/request.json",expected:out+"/learn/"+name+"/expected.critique.json"});
}
const gate=await read("examples/signing-gate.parapet.json");
gate.set_id="fixture-review-set";gate.drawings_opened={total:1,opened:0};gate.evidence={items_opened:[],changes:[],assumptions_resolved:0,flags_accepted:0,time_in_review_s:0};
gate.flags={total:1,cleared_or_accepted:0,notes:[]};gate.signer_checks={credential_verified:true,verification_level:"verified",jurisdiction_match:true,discipline_match:true,second_factor:"not_requested"};
await save("trust/tests/fixtures/gate.initial.json",gate,"signing-gate");
const chain=[];for(let i=0;i<3;i++){
 const r={schema_version:V,id:"30000000-0000-4000-8000-"+String(i+1).padStart(12,"0"),chain_id:"fixture-chain",seq:i,drawing_id:gate.drawing_ids[0],actor:{kind:"user",id:"fixture-user"},action:["ddl.create","drawing.open","report.review"][i],before_hash:i?details.length&&"sha256:"+"a".repeat(64):null,after_hash:"sha256:"+"a".repeat(64),prev_hash:chain.at(-1)?.hash??null,ts:T,payload:{review_note:"Fixture review evidence",numeric:1}};
 r.hash=auditHash(r);chain.push(r);await save("trust/tests/fixtures/audit."+i+".json",r,"audit-record");
}
await save("trust/tests/fixtures/audit.chain.json",chain);
await save(out+"/manifest.json",{version:V,source_prd:"v0.2.14",contract_commit:"29d8c9a",details,ideas,learn,documents:files,notes:["FR-23 lists thirteen named details, despite the twelve label.","Profile fixtures are unsigned examiner inputs, not production profile authoring.","All dimensional inputs are explicitly synthetic and user supplied.","No provider calls or API keys are used."]});
console.log(JSON.stringify({details:details.length,ideas:ideas.length,learn:learn.length,documents:files.length}));
