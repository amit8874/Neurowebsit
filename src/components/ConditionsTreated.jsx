import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Search, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Clock, 
  Stethoscope, 
  Info, 
  Calendar,
  AlertCircle,
  FileText
} from 'lucide-react';

// Import all 12 condition asset images
import aneurysmImg from '../assets/word_media_image10.webp';
import strokeImg from '../assets/Stroke.webp';
import avmImg from '../assets/Brain_AVM.png';
import davfImg from '../assets/dAVF.png';
import carotidImg from '../assets/Carotid_Stent.png';
import epistaxisImg from '../assets/Epistaxis.png';
import preopTumorImg from '../assets/Preop_Tumor_Embolization.png';
import mmaImg from '../assets/MMA_Embolization.png';
import venousImg from '../assets/Venous-Sinus.webp';
import spinalImg from '../assets/Spianal-Vascular.webp';
import ccfImg from '../assets/CCFs.webp';
import csfImg from '../assets/CSF-Leak.webp';

const conditionsData = [
  {
    id: 'aneurysm',
    category: 'Brain Arteries',
    categoryTag: 'Brain Arteries',
    title: 'Brain Aneurysm',
    image: aneurysmImg,
    description: 'A weak balloon-like bulge in a brain blood vessel. Sealed safely via pinhole keyhole coiling or flow diversion to prevent rupture.',
    overview: 'A brain aneurysm is an abnormal focal ballooning or dilation arising from a weakened layer of a cerebral artery wall. As blood pulses against this thinned pocket, it carries a persistent risk of catastrophic rupture causing subarachnoid hemorrhage. Most aneurysms are now treated entirely endovascularly without opening the skull, utilizing ultra-soft platinum micro-coils, stent-assisted coiling, or flow diverter (FD) stents.',
    symptoms: [
      'Sudden excruciating "thunderclap" headache (worst headache of life)',
      'Double vision, dilated pupil, or pain localized behind one eye',
      'Stiff neck, nausea, vomiting, or altered consciousness',
      'Incidental finding on brain MRI/CT performed for chronic headaches'
    ],
    diagnostics: 'CT Angiography (CTA), Magnetic Resonance Angiography (MRA), or 3D Digital Subtraction Angiography (DSA).',
    procedureName: 'Endovascular Micro-Coiling & Flow Diversion',
    procedureSteps: [
      { step: '1. Vascular Access', desc: 'A micro-puncture is made in the groin (femoral artery) or wrist (radial artery) under sterile cath lab conditions.' },
      { step: '2. Microcatheter Navigation', desc: 'Guided by high-resolution fluoroscopic roadmapping, a hair-thin microcatheter is steered into the intracranial aneurysm dome.' },
      { step: '3. Platinum Coiling / Flow Diverter', desc: 'Soft detachable platinum coils are delivered into the aneurysm sac to promote clotting, or a flow diverter stent is deployed across the neck to redirect blood flow.' },
      { step: '4. Angiographic Cure', desc: 'Final angiography confirms complete seal of the aneurysm with normal, uninterrupted parent vessel blood flow.' }
    ],
    benefits: [
      'No craniotomy or surgical skull opening required',
      'Preserves delicate brain tissue from surgical retraction',
      'Short 1-2 day hospital stay with minimal discomfort',
      'Rapid resumption of normal lifestyle within one week'
    ],
    recovery: 'Patients typically walk within hours, stay 24–48 hours in the hospital, and resume routine work within 7–10 days.'
  },
  {
    id: 'stroke',
    category: 'Stroke & Clots',
    categoryTag: 'Stroke & Clots',
    title: 'Brain Stroke (Acute Ischemic)',
    image: strokeImg,
    description: 'Sudden blood clot blocking arterial blood supply to the brain. Urgently restored via emergency mechanical thrombectomy.',
    overview: 'An acute ischemic stroke occurs when a blood clot suddenly travels into and lodges within a major brain artery (e.g., middle cerebral artery or internal carotid artery), starving billions of brain cells of oxygen. Every passing minute destroys ~1.9 million neurons. Mechanical thrombectomy is the gold-standard emergency intervention that physically removes the clot through endovascular catheters, reversing paralysis and saving lives.',
    symptoms: [
      'Sudden facial drooping or asymmetrical smile',
      'Sudden arm or leg weakness/numbness, especially on one side',
      'Slurred speech, inability to articulate words, or confusion',
      'Loss of balance, sudden dizziness, or vision loss in one eye'
    ],
    diagnostics: 'Emergency Non-contrast Brain CT, CT Angiography (CTA) with CT Perfusion, or Stroke MRI.',
    procedureName: 'Emergency Mechanical Thrombectomy',
    procedureSteps: [
      { step: '1. CODE FAST Pinhole Entry', desc: 'Immediate groin or wrist sheath insertion with zero delay upon arrival at the cath lab.' },
      { step: '2. Catheter Track to Brain', desc: 'A large-bore aspiration catheter and microcatheter system is tracked past the neck arteries to the face of the clot.' },
      { step: '3. Stent Retriever & Aspiration', desc: 'A specialized nitinol mesh stent retriever expands into the clot to entrap it, while powerful negative pressure vacuum aspiration is applied.' },
      { step: '4. Clot Extraction & Reperfusion', desc: 'The captured clot is extracted out of the body, immediately restoring robust arterial blood flow to the starving brain tissue.' }
    ],
    benefits: [
      'High rates of complete vessel recanalization (>85-90%)',
      'Significantly reduces long-term physical paralysis and disability',
      'Effective up to 24 hours in selected patients with salvageable brain tissue',
      'Immediate restoration of cerebral perfusion without brain surgery'
    ],
    recovery: 'Close monitoring in the Neuro-ICU for 24-48 hours, followed by targeted neuro-rehabilitation and physical therapy.'
  },
  {
    id: 'avm',
    category: 'AVM & Shunts',
    categoryTag: 'AVM & Shunts',
    title: 'Brain AVM (Arteriovenous Malformation)',
    image: avmImg,
    description: 'Abnormal tangled web of brain blood vessels connecting high-pressure arteries directly to veins. Cured with targeted liquid embolization.',
    overview: 'A brain arteriovenous malformation (AVM) is a congenital vascular anomaly where high-pressure arteries connect directly to fragile veins without an intervening capillary bed, creating a high-flow tangle known as a "nidus". Because veins lack muscular arterial walls, they dilate under high pressure and risk rupturing, causing intracranial hemorrhage, seizures, and severe neurological deficits. Endovascular liquid embolization uses specialized polymers (Onyx / Phil) to permanently seal the nidus from within.',
    symptoms: [
      'Sudden severe headache or brain hemorrhage',
      'Unprovoked epileptic seizures or convulsions',
      'Progressive muscle weakness, numbness, or tingling in limbs',
      'Persistent pulsating sounds in the head or chronic throbbing headaches'
    ],
    diagnostics: 'Comprehensive 6-vessel Cerebral Digital Subtraction Angiography (DSA) with 3D rotational imaging and contrast MRI.',
    procedureName: 'Superselective Microcatheter Liquid Embolization',
    procedureSteps: [
      { step: '1. Arterial Sheath Access', desc: 'Access obtained via femoral artery under general anesthesia for absolute patient immobility.' },
      { step: '2. Superselective Microcatheterization', desc: 'Ultra-flexible detachable-tip microcatheters navigate through tortuous feeder arteries right into the core of the AVM nidus.' },
      { step: '3. Provocative Testing & Roadmapping', desc: 'Superselective angiography confirms no critical brain tissue or cranial nerves are fed by the target pedicle.' },
      { step: '4. Liquid Polymer Occlusion', desc: 'Non-adhesive liquid embolic agent (Onyx or Phil) is meticulously injected, casting and permanently obliterating the abnormal vessel tangle.' }
    ],
    benefits: [
      'Minimally invasive obliteration of deep, surgically inoperable AVMs',
      'Can be curative or performed pre-operatively to make surgical resection safer',
      'Eliminates the high annual risk of life-threatening brain hemorrhages',
      'Zero incisions on the scalp or skull'
    ],
    recovery: '2 to 3 days hospital stay with routine post-procedure imaging, returning to normal non-strenuous activity within 1 to 2 weeks.'
  },
  {
    id: 'carotid',
    category: 'Brain Arteries',
    categoryTag: 'Brain Arteries',
    title: 'Carotid Artery Disease (Stenosis)',
    image: carotidImg,
    description: 'Severe narrowing of main neck arteries supplying the brain. Safely treated with balloon angioplasty and carotid stenting with filter protection.',
    overview: 'The carotid arteries are the primary blood conduits supplying blood from the heart to the brain. When cholesterol plaques accumulate inside these vessels (carotid stenosis), blood flow is restricted, and fragile plaque debris can break off and travel into cerebral vessels, causing transient ischemic attacks (TIAs) or massive strokes. Carotid angioplasty and stenting (CAS) with embolic protection expands the vessel and locks the plaque against the arterial wall, restoring full blood supply.',
    symptoms: [
      'Transient ischemic attack (TIA) or mini-stroke',
      'Temporary blindness in one eye like a shade being drawn (amaurosis fugax)',
      'Sudden transient weakness or numbness in one arm, leg, or face',
      'Asymptomatic carotid bruit detected during routine health checks'
    ],
    diagnostics: 'Carotid Duplex Ultrasound, CT Angiography (CTA) of Neck & Brain, or Diagnostic DSA.',
    procedureName: 'Carotid Angioplasty & Stenting (CAS) with Embolic Protection',
    procedureSteps: [
      { step: '1. Pinhole Access', desc: 'Performed under local anesthesia and mild sedation via femoral or radial artery.' },
      { step: '2. Embolic Protection Filter Placement', desc: 'An umbrella-shaped micro-filter is navigated past the narrowing and deployed distal to the lesion to capture any dislodged micro-debris.' },
      { step: '3. Stent Deployment', desc: 'A self-expanding nitinol carotid stent is precisely deployed across the plaque narrowing.' },
      { step: '4. Post-Dilatation & Filter Retrieval', desc: 'An angioplasty balloon expands the stent to optimal lumen diameter, and the protection filter is closed and retrieved with zero residue.' }
    ],
    benefits: [
      'Avoids open neck incision, neck scarring, and risk of cranial nerve palsy',
      'Performed with patient awake and comfortable under local anesthesia',
      'Embolic protection filter shields the brain from micro-emboli during stenting',
      'Discharge the very next day with immediate stroke risk reduction'
    ],
    recovery: 'Overnight hospital observation; patients walk comfortably the same evening and resume daily routines in 48 hours.'
  },
  {
    id: 'epistaxis',
    category: 'Embolization & Tumors',
    categoryTag: 'Embolization & Tumors',
    title: 'Epistaxis (Severe Intractable Nosebleeds)',
    image: epistaxisImg,
    description: 'Severe, life-threatening nasal bleeding resistant to nasal packing. Promptly halted via superselective transarterial microcatheter embolization.',
    overview: 'Epistaxis refers to acute bleeding from the nasal cavities. While anterior nosebleeds are common and self-limiting, severe posterior epistaxis arises from high-pressure arterial branches of the internal maxillary artery (principally the sphenopalatine artery) or facial arteries. When conventional therapies such as repeated anterior/posterior nasal packing and ENT cautery fail, endovascular transarterial embolization provides an immediate, minimally invasive, and definitive hemostatic cure without open surgery.',
    symptoms: [
      'Continuous, uncontrollable bleeding pouring from one or both nostrils',
      'Blood streaming down the back of the throat causing choking or nausea',
      'Failure of repeated painful nasal packing to stop hemorrhage',
      'Dizziness, low blood pressure, severe weakness, or anemia from rapid blood loss'
    ],
    diagnostics: 'Emergency ENT nasal endoscopy, Facial/Neck CT Angiography, and Diagnostic External Carotid Digital Subtraction Angiography (DSA).',
    procedureName: 'Transarterial Superselective Microcatheter Embolization',
    procedureSteps: [
      { step: '1. Pinhole Arterial Entry', desc: 'A tiny 4F/5F vascular sheath is placed in the femoral or radial artery under local anesthesia.' },
      { step: '2. Angiographic Roadmapping', desc: 'The diagnostic catheter maps the internal maxillary, sphenopalatine, and facial arterial branches, isolating the active bleeding site.' },
      { step: '3. Microcatheter Navigation', desc: 'A microcatheter (<1mm) is steered directly into the distal sphenopalatine and descending palatine arteries under real-time fluoroscopic roadmapping.' },
      { step: '4. Controlled Particle Embolization', desc: 'Calibrated microparticles (PVA particles, 300–500 µm) or micro-coils are slowly infused to seal the bleeding vessels while strictly preserving ophthalmic and facial nerve collaterals.' },
      { step: '5. Immediate Hemostasis Check', desc: 'Post-embolization angiography confirms complete cessation of bleed with prompt removal of bulky, suffocating nasal packing.' }
    ],
    benefits: [
      'Immediate 95%+ success rate in stopping life-threatening hemorrhage',
      'Eliminates the intense pain and airway obstruction of prolonged nasal packs',
      'Avoids open transantral or transoral arterial surgical ligation',
      'Minimal blood loss with rapid recovery under conscious sedation'
    ],
    recovery: 'Patients are observed for 24 hours without nasal packing and discharged home the next day in stable condition.'
  },
  {
    id: 'preop-tumor',
    category: 'Embolization & Tumors',
    categoryTag: 'Embolization & Tumors',
    title: 'Preoperative Tumor Embolization',
    image: preopTumorImg,
    description: 'Pre-surgical endovascular devascularization of hypervascular brain, skull base, and spinal tumors to dramatically reduce blood loss.',
    overview: 'Certain cranial, skull base, and spinal tumors (such as meningiomas, glomus jugulare tumors, hemangiopericytomas, juvenile nasopharyngeal angiofibroma [JNA], and spinal metastases) are enveloped by a massive, high-pressure network of feeding arteries. Preoperative tumor embolization is performed 24 to 72 hours before planned surgical resection to intentionally shut off the tumor\'s arterial blood supply. This transforms a hazardous, bloody operation into a controlled, clean, and complete surgical excision.',
    symptoms: [
      'Progressive headaches, cranial nerve palsies, or raised intracranial pressure',
      'Hearing loss, pulsatile whooshing tinnitus, or neck mass (glomus tumors)',
      'Severe recurrent nosebleeds and nasal obstruction (juvenile angiofibroma in teens)',
      'Localized back pain or spinal compression deficits (hypervascular spinal metastases)'
    ],
    diagnostics: 'Contrast Brain/Spine MRI, High-resolution 3D CT Skull Base, and Selective 6-vessel Digital Subtraction Angiography (DSA).',
    procedureName: 'Superselective Tumor Feeder Particle / Liquid Embolization',
    procedureSteps: [
      { step: '1. Pinhole Access', desc: 'Groin or wrist artery puncture performed under mild sedation or local anesthesia.' },
      { step: '2. Tumor Vascular Mapping', desc: 'High-speed 3D DSA identifies all arterial pedicles supplying the tumor from internal and external carotid branches.' },
      { step: '3. Superselective Microcatheterization', desc: 'Microcatheters are steered deep into the core of the tumor bed, away from normal brain and cranial nerve branches.' },
      { step: '4. Microparticle Infusion', desc: 'Spherical PVA microparticles (150–500 µm) or liquid embolic polymers are infused to systematically choke off tumor vessels from within.' },
      { step: '5. Verification of Devascularization', desc: 'Completion angiogram confirms >80–90% reduction in tumor vascularity, softening the tumor mass for the neurosurgeon.' }
    ],
    benefits: [
      'Reduces intraoperative surgical blood loss by up to 70–80%',
      'Significantly decreases surgery time and eliminates the need for heavy blood transfusions',
      'Softens tumor parenchyma, enabling cleaner, total surgical excision',
      'Protects adjacent critical cranial nerves and brain tissue from surgical traction'
    ],
    recovery: 'The patient rests comfortably in hospital overnight and proceeds to scheduled tumor excision within 24 to 72 hours.'
  },
  {
    id: 'mma',
    category: 'Embolization & Tumors',
    categoryTag: 'Embolization & Tumors',
    title: 'MMA Embolization (Subdural Hematoma)',
    image: mmaImg,
    description: 'Pinhole catheter intervention for Chronic Subdural Hematoma (cSDH) that stops persistent micro-bleeds and cures collections without skull drilling.',
    overview: 'Chronic Subdural Hematoma (cSDH) is a frequent and serious condition, particularly in elderly individuals and patients taking blood thinners. It is driven by fragile, abnormal neovascular capillaries on the outer dural membrane that continuously ooze blood, causing the subdural collection to expand and compress the brain. Middle Meningeal Artery (MMA) Embolization enters the middle meningeal artery branches and permanently shuts down these leaking capillary networks, allowing the hematoma to resorb naturally without open craniotomy or burr-hole surgery.',
    symptoms: [
      'Progressive gait unsteadiness, balance loss, or recurrent falls',
      'Gradual confusion, memory lapses, or personality changes in elders',
      'Persistent dull, worsening headache unresponsive to simple painkillers',
      'Sluggish responsiveness, one-sided arm/leg weakness, or speech slowing'
    ],
    diagnostics: 'Non-contrast CT Brain showing crescentic subdural fluid collection with mass effect, and Brain MRI.',
    procedureName: 'Endovascular Middle Meningeal Artery (MMA) Embolization',
    procedureSteps: [
      { step: '1. Wrist or Groin Entry', desc: 'Performed under local anesthesia and light sedation through a pinhole in the radial (wrist) or femoral artery.' },
      { step: '2. External Carotid Navigation', desc: 'A guide catheter navigates into the external carotid artery branches.' },
      { step: '3. Microcatheterization of MMA', desc: 'A microcatheter is steered into both anterior (frontal) and posterior (parietal) divisions of the middle meningeal artery.' },
      { step: '4. Targeted Embolic Occlusion', desc: 'PVA microparticles (150–250 µm) or liquid embolic agents are infused until the hypervascular capillary blush disappears.' },
      { step: '5. Collateral Preservation', desc: 'High-resolution imaging ensures ophthalmic and petrosal branches remain completely uncompromised.' }
    ],
    benefits: [
      'Avoids invasive surgical skull drilling (burr holes or craniotomy)',
      'Reduces hematoma recurrence rate from ~20-30% after surgery down to under 4%',
      'Safe for elderly patients, cardiac patients, and those on blood thinners',
      'Performed through a pinhole with discharge within 24 to 48 hours'
    ],
    recovery: 'Patients walk comfortably within hours, return home in 1–2 days, and the hematoma naturally reabsorbs over 4–8 weeks.'
  },
  {
    id: 'davf',
    category: 'AVM & Shunts',
    categoryTag: 'AVM & Shunts',
    title: 'Dural AV Fistulas (dAVFs)',
    image: davfImg,
    description: 'Abnormal direct connection between arteries and veins in the brain coverings. Completely sealed via endovascular catheter embolization.',
    overview: 'A Dural Arteriovenous Fistula (dAVF) is an abnormal direct connection (shunt) between meningeal arteries and dural venous sinuses located within the dura mater—the tough protective covering of the brain. When high-pressure arterial blood rushes into venous channels, it causes venous hypertension, brain swelling, hemorrhages, and pulsating sounds. Endovascular embolization navigates microcatheters directly to the fistulous pouch to cure the shunt permanently.',
    symptoms: [
      'Pulsatile tinnitus (rhythmic whooshing sound in the ear matching the heartbeat)',
      'Eye redness, chemosis, swelling, or double vision',
      'Progressive headaches, memory decline, or seizures',
      'Sudden hemorrhage or stroke-like symptoms due to cortical venous reflux'
    ],
    diagnostics: '6-vessel Cerebral Digital Subtraction Angiography (DSA) with high-speed selective views of meningeal arteries.',
    procedureName: 'Transarterial / Transvenous Fistula Embolization',
    procedureSteps: [
      { step: '1. Pinhole Access', desc: 'Arterial or venous pinhole puncture in the groin or wrist under general anesthesia.' },
      { step: '2. Superselective Shunt Access', desc: 'Microcatheters navigate through tiny meningeal branches or venous sinuses directly to the fistulous connection.' },
      { step: '3. Embolic Agent Deployment', desc: 'Liquid embolic agent (Onyx / Phil) or detachable micro-coils are injected to seal the exact fistula opening.' },
      { step: '4. Angiographic Cure', desc: 'Angiography confirms complete elimination of the shunt with restoration of normal brain venous drainage.' }
    ],
    benefits: [
      'Curative without requiring major open neurosurgical craniotomy',
      'Instantly silences disturbing pulsatile tinnitus and ear whooshing',
      'Eliminates the dangerous risk of venous brain hemorrhages',
      'Leaves no surgical scars with short 2-day recovery'
    ],
    recovery: '1 to 2 days hospital stay; symptoms such as pulsatile tinnitus often resolve immediately upon completion of the procedure.'
  },
  {
    id: 'venous',
    category: 'Venous & Pressure',
    categoryTag: 'Venous & Pressure',
    title: 'Venous Sinus Stenosis & IIH',
    image: venousImg,
    description: 'Narrowing of brain drainage veins causing skull pressure, severe headaches, and pulsatile tinnitus. Cured with venous sinus stenting.',
    overview: 'The brain produces cerebrospinal fluid (CSF) continuously, which drains through large dural venous channels (transverse and sigmoid sinuses). When these sinuses become narrowed (stenosis), venous outflow is choked off, leading to Idiopathic Intracranial Hypertension (IIH / pseudotumor cerebri). The elevated brain pressure causes intractable headaches, optic nerve swelling (papilledema), and impending vision loss. Venous sinus stenting restores smooth outflow and drops brain pressure back to normal.',
    symptoms: [
      'Chronic daily headaches that worsen upon lying down or straining',
      'Pulsatile tinnitus (whooshing heart-beat sound in one or both ears)',
      'Visual obscurations, temporary dimming of vision, or double vision',
      'Papilledema (swollen optic nerve heads) diagnosed by eye doctors'
    ],
    diagnostics: 'MR Venography (MRV), CT Venography (CTV), Lumbar Puncture, and Diagnostic Venous Manometry.',
    procedureName: 'Venous Sinus Manometry & Self-Expanding Stenting',
    procedureSteps: [
      { step: '1. Pinhole Venous Entry', desc: 'A tiny venous sheath is inserted into the femoral or internal jugular vein under light sedation.' },
      { step: '2. Intracranial Pressure Manometry', desc: 'A microcatheter measures real-time pressure gradients across the narrowed sinus segment to confirm hemodynamic significance.' },
      { step: '3. Self-Expanding Stent Placement', desc: 'A flexible, dedicated self-expanding venous stent is deployed across the narrowed transverse/sigmoid sinus.' },
      { step: '4. Post-Stent Pressure Normalization', desc: 'Repeat manometry verifies immediate pressure gradient elimination and restoration of laminar venous drainage.' }
    ],
    benefits: [
      'Protects vision from permanent optic nerve damage and blindness',
      'Immediate and lasting relief from agonizing pulsatile tinnitus and daily headaches',
      'Avoids permanent CSF surgical brain shunts (VP shunts) or optic nerve fenestration',
      'Minimally invasive pinhole procedure through a vein with minimal recovery'
    ],
    recovery: 'Overnight stay in the hospital; headache and tinnitus relief are typically felt within 24 to 48 hours.'
  },
  {
    id: 'ccf',
    category: 'AVM & Shunts',
    categoryTag: 'AVM & Shunts',
    title: 'Carotid-Cavernous Fistulas (CCFs)',
    image: ccfImg,
    description: 'Abnormal vascular short-circuit behind the eyeball causing bulging red eyes and vision impairment. Repaired with micro-coils and covered stents.',
    overview: 'A Carotid-Cavernous Fistula (CCF) is an abnormal communication between the internal or external carotid artery and the cavernous sinus venous network located directly behind the eye socket. High-pressure arterial blood surges into orbital veins, causing the eye to protrude (proptosis), turn bright red, swell, and pulse with the heartbeat. Endovascular intervention delivers micro-coils or covered stents to close the fistula and preserve vision.',
    symptoms: [
      'Bulging, protruding eyeball (proptosis) with eyelid swelling',
      'Severe eye redness, bloodshot conjunctiva, and pulsating eyeball',
      'Double vision (diplopia) or limitation of eye movement',
      'Bruit (whooshing or buzzing sound heard behind the eye)'
    ],
    diagnostics: 'Orbital Doppler Ultrasound, Brain and Orbital MRI/CT, and High-resolution Diagnostic Cerebral DSA.',
    procedureName: 'Transvenous / Transarterial Cavernous Sinus Coiling',
    procedureSteps: [
      { step: '1. Pinhole Access', desc: 'Femoral venous or arterial sheath insertion under general anesthesia.' },
      { step: '2. Cavernous Sinus Navigation', desc: 'A microcatheter enters the cavernous sinus via the inferior petrosal sinus or superior ophthalmic vein.' },
      { step: '3. Dense Detachable Coiling', desc: 'Soft platinum coils and liquid embolic agents are packed inside the sinus compartment to shut down the fistula.' },
      { step: '4. Flow Preservation', desc: 'Angiography confirms the carotid artery remains fully open while the fistula is completely occluded.' }
    ],
    benefits: [
      'Reverses alarming eyeball bulging and severe conjunctival redness',
      'Safeguards against irreversible optic nerve damage and vision loss',
      'High cure rate without surgical incisions around the eye socket',
      'Swift recovery with dramatic cosmetic and visual improvement'
    ],
    recovery: 'Hospital stay of 24–48 hours; orbital swelling and redness steadily regress over 1 to 3 weeks.'
  },
  {
    id: 'spinal',
    category: 'Spinal & CSF',
    categoryTag: 'Spinal Cord',
    title: 'Spinal Vascular Malformations',
    image: spinalImg,
    description: 'Abnormal tangled blood vessel connections around the spinal cord causing progressive leg weakness and sensory loss. Sealed via micro-embolization.',
    overview: 'Spinal vascular malformations include spinal dural arteriovenous fistulas (SDAVFs) and spinal AVMs. These rare conditions route abnormal high-pressure arterial blood into spinal cord veins, creating spinal venous hypertension and severe cord congestion. Over months, this causes progressive difficulty walking, lower limb numbness, and bowel/bladder dysfunction, often misdiagnosed as routine lumbar spinal stenosis or neuropathy.',
    symptoms: [
      'Progressive difficulty walking, leg stiffness, or dragging of feet',
      'Ascending numbness, tingling, or heaviness in both legs',
      'Bowel and bladder urgency, incontinence, or sexual dysfunction',
      'Symptoms worsening after exercise or prolonged standing'
    ],
    diagnostics: 'Spinal MRI/MRA showing cord edema and flow voids, followed by dedicated multi-level Spinal Digital Subtraction Angiography.',
    procedureName: 'Selective Spinal Microcatheter Embolization',
    procedureSteps: [
      { step: '1. Pinhole Arterial Access', desc: 'Groin puncture under conscious sedation or general anesthesia.' },
      { step: '2. Spinal DSA Mapping', desc: 'Catheters systematically check segmental intercostal and lumbar arteries to find the exact fistulous nidus.' },
      { step: '3. Superselective Microcatheter Entry', desc: 'A microcatheter enters the radiculomeningeal artery feeding the fistula, ensuring the anterior spinal artery is completely separate.' },
      { step: '4. Liquid Embolic Closure', desc: 'Liquid embolic agent (Onyx/Phil) is injected, penetrating the proximal draining vein and permanently eradicating the shunt.' }
    ],
    benefits: [
      'Arrests progressive spinal cord paralysis and leg weakness',
      'Completely avoids open spinal laminectomy and surgical bone removal',
      'Direct curative occlusion with immediate relief of spinal venous congestion',
      'Short 2-day hospital stay followed by targeted physical rehabilitation'
    ],
    recovery: '2 to 3 days hospital recovery; leg strength and sensory functions steadily recover over several months of rehabilitation.'
  },
  {
    id: 'csf',
    category: 'Spinal & CSF',
    categoryTag: 'CSF Leaks',
    title: 'CSF Leak & Spontaneous Intracranial Hypotension',
    image: csfImg,
    description: 'Spinal fluid leakage causing debilitating positional headaches. Accurately localized and sealed via targeted blood patches or micro-embolization.',
    overview: 'Cerebrospinal fluid (CSF) cushions and protects the brain and spinal cord. When a microscopic tear in the spinal dura or a CSF-venous fistula occurs, CSF continuously leaks out, causing low brain fluid pressure (Spontaneous Intracranial Hypotension). Patients experience severe headaches whenever they sit or stand upright that disappear only when lying flat. Targeted endovascular embolization or epidural patching permanently seals the leak.',
    symptoms: [
      'Severe positional headache: unbearable when upright, relieved almost instantly upon lying flat',
      'Neck stiffness, nausea, muffled hearing, or ringing in the ears',
      'Brain fog, fatigue, dizziness, and metallic taste in the mouth',
      'Subdural fluid collections developing secondary to brain sagging'
    ],
    diagnostics: 'Brain MRI with contrast (pachymeningeal enhancement), Spine MRI, and High-resolution Dynamic CT Myelography / Digital Subtraction Myelography.',
    procedureName: 'Targeted Transvenous Embolization / Epidural Blood Patch',
    procedureSteps: [
      { step: '1. Advanced Diagnostic Localization', desc: 'Dynamic myelography precisely pinpoints the exact spinal level of the dural tear or CSF-venous fistula.' },
      { step: '2. Pinhole Access', desc: 'Transvenous catheterization (for CSF-venous fistula) or fluoroscopy-guided spinal needle placement.' },
      { step: '3. Targeted Delivery', desc: 'Micro-coils and liquid embolic agents are deployed into the draining paraspinal vein, or autologous fibrin/blood patch is injected at the precise leak.' },
      { step: '4. Immediate Dural Pressure Restoration', desc: 'The leak is sealed watertight, allowing intracranial CSF volume and pressure to normalize immediately.' }
    ],
    benefits: [
      'Provides permanent resolution for patients disabled for months by upright headaches',
      'Avoids invasive spine surgery and extensive laminectomies',
      'Image-guided precision ensures targeted seal at the exact microscopic leak',
      'Virtually painless recovery with same-day or overnight observation'
    ],
    recovery: '24 hours of flat bedrest following the seal, with immediate relief of orthostatic headaches and return to routine life.'
  }
];

export default function ConditionsTreated({ onOpenBookingModal }) {
  const { siteInfo } = useData();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);

  const categories = [
    'All',
    'Brain Arteries',
    'Stroke & Clots',
    'AVM & Shunts',
    'Embolization & Tumors',
    'Venous & Pressure',
    'Spinal & CSF'
  ];

  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setIsExpanded(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsExpanded(false);
  };

  const filteredConditions = conditionsData.filter(item => {
    const matchesTab = activeTab === 'All' || item.categoryTag === activeTab;
    const query = searchQuery.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.procedureName.toLowerCase().includes(query) ||
      item.overview.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });

  const displayedConditions = isExpanded ? filteredConditions : filteredConditions.slice(0, 6);

  return (
    <section
      id="conditions-treated"
      className="relative overflow-hidden"
      style={{
        paddingTop: '45px',
        paddingBottom: '30px',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      {/* Background Blobs for Visual Ambience */}
      <div className="glow-blob glow-blob-teal" style={{ top: '15%', right: '2%', opacity: 0.12 }} />
      <div className="glow-blob glow-blob-blue" style={{ bottom: '10%', left: '2%', opacity: 0.12 }} />

      <div className="container relative z-10">

        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '36px' }}>
          <div className="flex items-center" style={{
            gap: '8px',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--accent-teal)',
            marginBottom: '12px'
          }}>
            <Sparkles size={16} fill="var(--accent-teal)" />
            <span>Three Pillars of the Specialty</span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Conditions Treated Through Interventional Neuroradiology
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '860px',
            lineHeight: '1.6',
            margin: 0
          }}>
            Click any condition to view detailed clinical explanations, diagnostic requirements, and step-by-step guides on <strong>how the minimally invasive endovascular procedure is performed</strong>.
          </p>
        </div>

        {/* Interactive Filter Bar & Search Input */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '40px',
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
          border: '1px solid var(--border-color)'
        }}>
          {/* Category Filter Pills */}
          <div className="flex" style={{ gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    border: isActive ? '1px solid var(--accent-teal)' : '1px solid var(--border-color)',
                    backgroundColor: isActive ? 'var(--accent-teal)' : 'var(--bg-secondary)',
                    color: isActive ? '#ffffff' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat === 'All' ? `All Conditions (${conditionsData.length})` : cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            width: '100%',
            maxWidth: '300px',
            gap: '8px'
          }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search condition, procedure..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.85rem',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* 3-Column Creative Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '28px'
        }} className="conditions-creative-grid">

          {displayedConditions.map((item) => (
            <div
              key={item.id}
              className="interactive-card"
              onClick={() => setSelectedCondition(item)}
              style={{
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
              }}
            >
              {/* Image Frame with Overlay Badge */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '210px',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px'
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.4s ease'
                  }}
                />

                {/* Category Badge Tag */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  color: '#ffffff',
                  backdropFilter: 'blur(6px)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}>
                  {item.categoryTag}
                </span>

                {/* Info badge button */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(6, 182, 212, 0.9)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Info size={12} />
                  Procedure Details
                </span>
              </div>

              {/* Card Body */}
              <div style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '10px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0,
                    fontWeight: 400
                  }}>
                    {item.description}
                  </p>
                </div>

                {/* Action Link Footer */}
                <div style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--accent-teal)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    View How It's Done
                    <ArrowRight size={14} />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenBookingModal) onOpenBookingModal();
                    }}
                    style={{
                      border: '1px solid var(--border-color)',
                      background: 'rgba(var(--primary-rgb), 0.05)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--accent-teal)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'var(--accent-teal)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.05)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    Book Consult
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>

        {/* See More / See Less Toggle Button */}
        {filteredConditions.length > 6 && (
          <div style={{ marginTop: '28px', textAlign: 'center' }}>
            <button
              onClick={() => {
                if (isExpanded) {
                  setIsExpanded(false);
                  const el = document.getElementById('conditions-treated');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setIsExpanded(true);
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--accent-teal)',
                color: 'var(--accent-teal)',
                backgroundColor: 'rgba(6, 182, 212, 0.06)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-teal)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.06)';
                e.currentTarget.style.color = 'var(--accent-teal)';
              }}
            >
              <span>{isExpanded ? 'See Less' : `See All ${filteredConditions.length} Conditions`}</span>
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}

      </div>

      {/* DETAILED CONDITION & PROCEDURE MODAL (POP-UP) */}
      {selectedCondition && (
        <div
          onClick={() => setSelectedCondition(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 10, 19, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '920px',
              maxHeight: '92vh',
              overflowY: 'auto',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              padding: '36px',
              textAlign: 'left'
            }}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCondition(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(var(--primary-rgb), 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'all 0.2s ease'
              }}
              aria-label="Close modal"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.05)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <X size={20} />
            </button>

            {/* Top Category Badge & Intervention Type */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                backgroundColor: 'rgba(6, 182, 212, 0.12)',
                color: 'var(--accent-teal)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(6, 182, 212, 0.25)'
              }}>
                {selectedCondition.categoryTag}
              </span>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Stethoscope size={14} color="var(--accent-teal)" />
                Interventional Neuroradiology Procedure Guide
              </span>
            </div>

            {/* Condition Header & Image Hero Split */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '28px',
              alignItems: 'center',
              marginBottom: '32px',
              paddingBottom: '24px',
              borderBottom: '1px solid var(--border-color)'
            }} className="condition-modal-hero">
              <div>
                <h2 style={{
                  fontSize: '2.1rem',
                  fontWeight: 800,
                  lineHeight: '1.25',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-primary)',
                  marginBottom: '10px'
                }}>
                  {selectedCondition.title}
                </h2>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.04)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent-teal)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '14px'
                }}>
                  <Activity size={16} />
                  <span>Procedure: {selectedCondition.procedureName}</span>
                </div>

                <p style={{
                  fontSize: '0.975rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.65',
                  margin: 0
                }}>
                  {selectedCondition.overview}
                </p>
              </div>

              {/* High Definition Medical Diagram Frame */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: '260px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img
                  src={selectedCondition.image}
                  alt={selectedCondition.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '220px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>

            {/* Clinical Content Tabs / Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* 1. Symptoms & Diagnostic Criteria */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }} className="condition-modal-cols">
                {/* Symptoms Box */}
                <div style={{
                  backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  border: '1px solid var(--border-color)'
                }}>
                  <h4 style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertCircle size={16} color="#e11d48" />
                    Warning Signs & Clinical Symptoms
                  </h4>
                  <ul style={{
                    paddingLeft: 0,
                    margin: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    {selectedCondition.symptoms.map((sym, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.88rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5'
                      }}>
                        <span style={{ color: 'var(--accent-teal)', marginTop: '2px' }}>•</span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diagnostics & Imaging */}
                <div style={{
                  backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <FileText size={16} color="var(--accent-teal)" />
                      Diagnostic & Imaging Workup
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      margin: '0 0 16px'
                    }}>
                      {selectedCondition.diagnostics}
                    </p>
                  </div>

                  <div style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(6, 182, 212, 0.08)',
                    border: '1px solid rgba(6, 182, 212, 0.2)'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-teal)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                      Standard Recovery
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {selectedCondition.recovery}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Step-by-Step: HOW THE PROCEDURE IS DONE */}
              <div style={{
                backgroundColor: 'rgba(6, 182, 212, 0.03)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}>
                <div style={{ marginBottom: '18px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-teal)'
                  }}>
                    Endovascular Technique
                  </span>
                  <h3 style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    margin: '4px 0 6px'
                  }}>
                    How The Procedure Is Done: Step-by-Step
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                    Performed in the dedicated Cath Lab using high-definition digital subtraction roadmapping under conscious sedation or anesthesia.
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px'
                }} className="procedure-steps-grid">
                  {selectedCondition.procedureSteps.map((st, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}
                    >
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: 'var(--accent-teal)'
                      }}>
                        {st.step}
                      </span>
                      <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.55',
                        margin: 0
                      }}>
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Why Minimally Invasive Endovascular Care? Key Benefits */}
              <div>
                <h4 style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <ShieldCheck size={16} color="var(--accent-teal)" />
                  Key Advantages of Endovascular Intervention
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px'
                }} className="benefits-grid">
                  {selectedCondition.benefits.map((ben, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <CheckCircle2 size={16} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {ben}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div style={{
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Clock size={16} color="var(--accent-teal)" />
                <span>Consultation fee: ₹{siteInfo?.consultationFee ?? 500} (Directly Reviewed by Dr Dewansh Mishra)</span>
              </div>

              <div className="flex" style={{ gap: '12px' }}>
                <button
                  onClick={() => setSelectedCondition(null)}
                  className="btn btn-secondary"
                  style={{ padding: '9px 20px', fontSize: '0.9rem' }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedCondition(null);
                    if (onOpenBookingModal) onOpenBookingModal();
                  }}
                  className="btn btn-primary"
                  style={{ padding: '9px 24px', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Calendar size={16} />
                  Book Consult for {selectedCondition.title}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        .conditions-creative-grid .interactive-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-teal) !important;
          box-shadow: var(--shadow-lg) !important;
        }

        .conditions-creative-grid .interactive-card:hover img {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .conditions-creative-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .condition-modal-hero {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .conditions-creative-grid {
            grid-template-columns: 1fr !important;
          }
          .condition-modal-cols {
            grid-template-columns: 1fr !important;
          }
          .procedure-steps-grid {
            grid-template-columns: 1fr !important;
          }
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
          #conditions-treated .section-title {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
